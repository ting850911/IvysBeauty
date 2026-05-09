"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  AdminModal,
  ModalField,
  ModalInput,
  ModalSelect,
  ModalTextarea
} from "../shared/AdminModal";
import { ImageUpload } from "../shared/ImageUpload";
import { Plus, Pencil, Trash2, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export interface OptionItem {
  id: string;
  name: string;
}

export interface AdminPortfolio {
  id: string;
  title: string;
  imageUrls: string[];
  description: string;
  gender: string;
  tags: string[];
  location: OptionItem | null;
  service: OptionItem | null;
  createdAt: string;
}

interface Props {
  initialPortfolios: AdminPortfolio[];
  locationOptions: OptionItem[];
  serviceOptions: OptionItem[];
}

export function PortfolioClient({ initialPortfolios, locationOptions, serviceOptions }: Props) {
  const router = useRouter();
  const [portfolios, setPortfolios] = useState(initialPortfolios);

  useEffect(() => {
    setPortfolios(initialPortfolios);
  }, [initialPortfolios]);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<AdminPortfolio> | null>(null);

  // Tag input state
  const [tagInput, setTagInput] = useState("");

  // Loading & Action states
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleOpenEdit = (item?: AdminPortfolio) => {
    if (item) {
      setEditingItem({
        ...item,
        imageUrls: item.imageUrls || []
      });
    } else {
      setEditingItem({
        title: "",
        imageUrls: [],
        description: "",
        gender: "FEMALE",
        tags: [],
        location: null,
        service: null,
      });
    }
    setTagInput("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === "Enter") {
      e.preventDefault();
      if (tagInput.trim()) {
        const newTag = tagInput.trim();
        if (editingItem && !editingItem.tags?.includes(newTag)) {
          setEditingItem({
            ...editingItem,
            tags: [...(editingItem.tags || []), newTag]
          });
        }
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    if (editingItem && editingItem.tags) {
      setEditingItem({
        ...editingItem,
        tags: editingItem.tags.filter(tag => tag !== tagToRemove)
      });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const newUrls = [...(editingItem?.imageUrls || [])];

      // Upload files sequentially or in parallel
      for (let i = 0; i < files.length; i++) {
        if (newUrls.length >= 2) break;

        const formData = new FormData();
        formData.append("file", files[i]);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await res.json();
        if (result.success) {
          newUrls.push(result.data.url);
        }
      }

      setEditingItem(prev => prev ? { ...prev, imageUrls: newUrls } : prev);
    } catch (err) {
      console.error("[Upload Error]", err);
      alert("圖片上傳過程中發生錯誤");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if ((editingItem.imageUrls || []).length === 0) {
      alert("請至少上傳一張作品圖片");
      return;
    }

    let finalTags = [...(editingItem.tags || [])];
    if (tagInput.trim() && !finalTags.includes(tagInput.trim())) {
      finalTags.push(tagInput.trim());
    }

    setIsSaving(true);
    const isNew = !editingItem.id;
    const url = isNew ? "/api/admin/portfolio" : `/api/admin/portfolio/${editingItem.id}`;
    const method = isNew ? "POST" : "PUT";

    const payload = {
      ...editingItem,
      tags: finalTags,
      locationId: editingItem.location?.id || null,
      serviceId: editingItem.service?.id || null,
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        handleCloseModal();
        router.refresh();
      } else {
        const data = await res.json();
        alert(`儲存失敗: ${data.error}`);
      }
    } catch (err) {
      alert("系統錯誤");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    setIsSaving(true);

    try {
      const res = await fetch(`/api/admin/portfolio/${deletingId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setIsDeleteDialogOpen(false);
        setDeletingId(null);
        router.refresh();
      }
    } catch (err) {
      alert("系統錯誤");
    } finally {
      setIsSaving(false);
    }
  };

  const genderMap: Record<string, string> = {
    "FEMALE": "女性",
    "MALE": "男性",
    "UNISEX": "中性"
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="space-y-8 animate-fade-in">
        {/* Header Area */}
        <div className="flex justify-start">
          <Button onClick={() => handleOpenEdit()} className="rounded-full gap-2 px-6 shadow-sm hover:shadow-md transition-all">
            <Plus size={18} />
            新增作品
          </Button>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolios.map((item) => (
            <div key={item.id} className="bg-white/80 backdrop-blur-md rounded-3xl border border-border/40 p-6 flex gap-6 hover:shadow-soft transition-all duration-300 relative group">
              {/* Image Thumbnail */}
              <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-3xl overflow-hidden relative border border-border/20 shadow-inner">
                {item.imageUrls && item.imageUrls[0] ? (
                  <Image
                    src={item.imageUrls[0]}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-surface flex items-center justify-center">
                    <Trash2 size={24} className="text-muted-foreground/20" />
                  </div>
                )}
              </div>

              {/* Content Info */}
              <div className="flex-1 flex flex-col justify-between gap-2">
                <div>
                  <h5>{item.title}</h5>
                  <p className="text-sm leading-relaxed mb-2 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.service && (
                      <span className="admin-tag admin-tag-primary">
                        {item.service.name}
                      </span>
                    )}
                    {item.location && (
                      <span className="admin-tag admin-tag-primary">
                        {item.location.name}
                      </span>
                    )}
                    <span className="admin-tag admin-tag-primary">
                      {genderMap[item.gender]}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                  <button onClick={() => handleOpenEdit(item)} className="hover:text-primary transition-colors">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => { setDeletingId(item.id); setIsDeleteDialogOpen(true); }} className="hover:text-destructive transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {portfolios.length === 0 && (
          <div className="bg-surface rounded-3xl p-10 border border-border/50 text-center flex flex-col items-center">
            <h5 className="mb-2">目前尚無作品</h5>
            <p className="tracking-widest text-sm italic">目前尚無作品，點擊上方按鈕開始創作吧！</p>
          </div>
        )}
      </div>

      {/* Edit/Create Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingItem?.id ? "編輯作品" : "新增作品"}
        formId="portfolio-form"
        isLoading={isSaving}
        confirmDisabled={isUploading}
      >
        <form onSubmit={handleSave} id="portfolio-form" className="space-y-6">
          <ModalField label={`作品圖片 (${editingItem?.imageUrls?.length || 0}/2)`}>
            <ImageUpload
              imageUrls={editingItem?.imageUrls || []}
              maxImages={2}
              isUploading={isUploading}
              fileInputRef={fileInputRef}
              onUpload={handleFileUpload}
              onRemove={(idx) => {
                const newUrls = [...(editingItem?.imageUrls || [])];
                newUrls.splice(idx, 1);
                setEditingItem(prev => prev ? { ...prev, imageUrls: newUrls } : prev);
              }}
              onMove={(idx, dir) => {
                const urls = [...(editingItem?.imageUrls || [])];
                const targetIdx = dir === 'left' ? idx - 1 : idx + 1;
                [urls[idx], urls[targetIdx]] = [urls[targetIdx], urls[idx]];
                setEditingItem(prev => prev ? { ...prev, imageUrls: urls } : prev);
              }}
            />
          </ModalField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <ModalField label="作品標題">
                <ModalInput
                  required
                  value={editingItem?.title || ""}
                  onChange={e => setEditingItem(prev => prev ? { ...prev, title: e.target.value } : prev)}
                  placeholder="例如：韓系霧眉作品"
                />
              </ModalField>

              <ModalField label="自訂標籤 (Enter 加入)">
                <div className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background shadow-sm flex flex-wrap gap-2 min-h-[44px] focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                  {editingItem?.tags?.map((tag, idx) => (
                    <span key={idx} className="flex items-center gap-1 bg-primary/5 text-primary px-2 py-0.5 rounded-full text-xs font-medium border border-primary/10">
                      {tag}
                      <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-destructive">
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder={editingItem?.tags?.length ? "" : "輸入標籤..."}
                    className="flex-1 min-w-[80px] bg-transparent focus:outline-none text-sm"
                  />
                </div>
              </ModalField>
            </div>

            <ModalField label="作品描述">
              <ModalTextarea
                rows={5}
                maxLength={100}
                value={editingItem?.description || ""}
                onChange={e => setEditingItem(prev => prev ? { ...prev, description: e.target.value } : prev)}
                placeholder="介紹一下這個作品吧..."
              />
            </ModalField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <ModalField label="施作項目">
              <ModalSelect
                value={editingItem?.service?.id || ""}
                onChange={e => {
                  const srv = serviceOptions.find(s => s.id === e.target.value);
                  setEditingItem(prev => prev ? { ...prev, service: srv || null } : prev);
                }}
              >
                <option value="">選擇項目</option>
                {serviceOptions.map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.name}</option>
                ))}
              </ModalSelect>
            </ModalField>

            <ModalField label="施作地點">
              <ModalSelect
                value={editingItem?.location?.id || ""}
                onChange={e => {
                  const loc = locationOptions.find(l => l.id === e.target.value);
                  setEditingItem(prev => prev ? { ...prev, location: loc || null } : prev);
                }}
              >
                <option value="">選擇地點</option>
                {locationOptions.map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.name}</option>
                ))}
              </ModalSelect>
            </ModalField>

            <ModalField label="適用性別">
              <ModalSelect
                value={editingItem?.gender || "FEMALE"}
                onChange={e => setEditingItem(prev => prev ? { ...prev, gender: e.target.value } : prev)}
              >
                <option value="FEMALE">女性</option>
                <option value="MALE">男性</option>
                <option value="UNISEX">中性</option>
              </ModalSelect>
            </ModalField>
          </div>
        </form>
      </AdminModal>

      {/* Delete Confirmation */}
      <AdminModal
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="確定要刪除此作品嗎？"
        confirmText="確定刪除"
        confirmVariant="destructive"
        isLoading={isSaving}
        maxWidth="max-w-md"
      >
        <div className="space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} />
          </div>
          <p className="text-sm font-medium text-center px-4">
            刪除後將無法復原，包含圖片與關聯資訊將一併從資料庫中永久移除。
          </p>
        </div>
      </AdminModal>
    </div >
  );
}
