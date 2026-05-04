"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AdminModal } from "../shared/AdminModal";
import { DeleteConfirmModal } from "../shared/DeleteConfirmModal";
import { Plus, Pencil, Trash2, Loader2, X, ImagePlus } from "lucide-react";
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
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeUploadIndex, setActiveUploadIndex] = useState<number | null>(null);

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
    setActiveUploadIndex(null);
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
    const file = e.target.files?.[0];
    if (!file || activeUploadIndex === null) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (result.success) {
        setEditingItem(prev => {
          if (!prev) return prev;
          const newUrls = [...(prev.imageUrls || [])];
          newUrls[activeUploadIndex] = result.data.url;
          return { ...prev, imageUrls: newUrls };
        });
      } else {
        alert(`圖片上傳失敗: ${result.error?.message || "未知錯誤"}`);
      }
    } catch (err) {
      console.error("[Upload Error]", err);
      alert("圖片上傳過程中發生系統錯誤");
    } finally {
      setIsUploading(false);
      setActiveUploadIndex(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const validUrls = (editingItem.imageUrls || []).filter(url => !!url);
    if (validUrls.length === 0) {
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
      imageUrls: validUrls,
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
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/portfolio/${deletingId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setDeletingId(null);
        router.refresh();
      } else {
        alert("刪除失敗");
      }
    } catch (err) {
      alert("系統錯誤");
    } finally {
      setIsDeleting(false);
    }
  };

  const genderMap: Record<string, string> = {
    "FEMALE": "女性",
    "MALE": "男性",
    "UNISEX": "中性"
  };

  return (
    <div className="max-w-5xl mx-auto py-2">
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <Button onClick={() => handleOpenEdit()} className="rounded-full gap-2 px-6">
          <Plus size={18} className="mr-2" />
          新增作品
        </Button>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolios.map((item) => (
            <div key={item.id} className="bg-background rounded-[24px] border border-border/80 p-6 flex gap-6 hover:shadow-soft transition-all duration-300 relative group">
              {/* Image */}
              <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-2xl overflow-hidden relative border border-border/50">
                {item.imageUrls && item.imageUrls[0] ? (
                  <Image
                    src={item.imageUrls[0]}
                    alt={item.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <ImagePlus size={18} className="mb-1 text-primary/70" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold tracking-wide text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Tags Area */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.service && (
                      <span className="px-3 py-1 bg-surface text-foreground rounded-full text-xs tracking-wider border border-border/80">
                        {item.service.name}
                      </span>
                    )}
                    {item.location && (
                      <span className="px-3 py-1 bg-surface text-foreground rounded-full text-xs tracking-wider border border-border/80">
                        {item.location.name}
                      </span>
                    )}
                    <span className="px-3 py-1 bg-surface text-foreground rounded-full text-xs tracking-wider border border-border/80">
                      {genderMap[item.gender]}
                    </span>
                    {item.tags?.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-surface text-foreground rounded-full text-xs tracking-wider border border-border/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="flex items-center gap-4 text-muted-foreground">
                  <button onClick={() => handleOpenEdit(item)} className="hover:text-primary transition-colors cursor-pointer">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => setDeletingId(item.id)} className="hover:text-destructive transition-colors cursor-pointer">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {portfolios.length === 0 && (
          <div className="text-center py-20 bg-surface/30 rounded-[24px] border border-border/50 border-dashed">
            <p className="text-muted-foreground tracking-widest">目前尚無作品，請點擊右上角新增作品。</p>
          </div>
        )}
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && editingItem && (
        <AdminModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={editingItem.id ? "編輯作品" : "新增作品"}
          maxWidth="max-w-2xl"
          formId="portfolio-form"
          isLoading={isSaving}
          confirmDisabled={isUploading}
        >
          <form onSubmit={handleSave} id="portfolio-form" className="space-y-3">
            {/* Top Grid: Images and Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
              {/* Left Column: Image Uploads */}
              <div className="md:col-span-2 space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">作品圖片</label>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md">(最多 2 張)</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[0, 1].map((idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -top-1 -left-1 w-6 h-6 bg-primary text-white text-[10px] flex items-center justify-center rounded-md font-bold z-10 shadow-sm">
                        {idx + 1}
                      </div>

                      <div
                        onClick={() => {
                          if (!isUploading) {
                            setActiveUploadIndex(idx);
                            fileInputRef.current?.click();
                          }
                        }}
                        className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative overflow-hidden
                          ${editingItem.imageUrls?.[idx] ? 'border-transparent' : 'border-border hover:border-primary/50 bg-muted/20 hover:bg-primary/5'}
                          ${isUploading && activeUploadIndex === idx ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                      >
                        {editingItem.imageUrls?.[idx] ? (
                          <>
                            <Image
                              src={editingItem.imageUrls[idx]}
                              alt={`Preview ${idx + 1}`}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              unoptimized
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <ImagePlus size={18} className="mb-1 text-primary/70" />
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const newUrls = [...(editingItem.imageUrls || [])];
                                newUrls[idx] = "";
                                setEditingItem({ ...editingItem, imageUrls: newUrls });
                              }}
                              className="absolute top-2 right-2 w-6 h-6 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            >
                              <X size={12} />
                            </button>
                          </>
                        ) : isUploading && activeUploadIndex === idx ? (
                          <Loader2 size={24} className="animate-spin text-primary" />
                        ) : (
                          <div className="flex flex-col items-center text-muted-foreground p-1 text-center">
                            <ImagePlus size={18} className="mb-1 text-primary/70" />
                            <span className="text-sm">上傳圖片</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground/60 text-center">支援 JPG、PNG，單張檔案大小不超過 5MB</p>
              </div>

              {/* Right Column: Title, Description, Tags */}
              <div className="md:col-span-3 space-y-3">
                <div>
                  <label className="text-sm font-medium">作品標題</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title || ""}
                    onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    placeholder="例如：韓系霧眉"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">作品描述</label>
                    <span className="text-[10px] text-muted-foreground/60">{(editingItem.description || "").length} / 100</span>
                  </div>
                  <textarea
                    rows={4}
                    maxLength={100}
                    value={editingItem.description || ""}
                    onChange={e => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    placeholder="例如：自然韓系霧眉，柔順線條..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">自訂標籤 (選填)</label>
                  <div className="w-full px-4 py-3 rounded-xl border border-border bg-background flex flex-wrap gap-2 min-h-12 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm">
                    {editingItem.tags?.map((tag, idx) => (
                      <span key={idx} className="flex items-center gap-1.5 bg-primary/5 text-primary px-3 py-1 rounded-full text-xs font-medium border border-primary/10">
                        {tag}
                        <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-destructive transition-colors">
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={tagInput}
                      onChange={e => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      placeholder={editingItem.tags?.length ? "" : "輸入標籤後按 Enter 加入"}
                      className="flex-1 min-w-[120px] bg-transparent focus:outline-none text-sm px-1 placeholder:text-muted-foreground/40"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <label className="text-sm font-medium">項目</label>
                <select
                  value={editingItem.service?.id || ""}
                  onChange={e => {
                    const srv = serviceOptions.find(s => s.id === e.target.value);
                    setEditingItem({ ...editingItem, service: srv || null });
                  }}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm appearance-none cursor-pointer"
                >
                  <option value="">選擇項目</option>
                  {serviceOptions.map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">地點</label>
                <select
                  value={editingItem.location?.id || ""}
                  onChange={e => {
                    const loc = locationOptions.find(l => l.id === e.target.value);
                    setEditingItem({ ...editingItem, location: loc || null });
                  }}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm appearance-none cursor-pointer"
                >
                  <option value="">選擇地點</option>
                  {locationOptions.map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">性別</label>
                <select
                  value={editingItem.gender || "FEMALE"}
                  onChange={e => setEditingItem({ ...editingItem, gender: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm appearance-none cursor-pointer"
                >
                  <option value="">選擇性別</option>
                  <option value="FEMALE">女性</option>
                  <option value="MALE">男性</option>
                  <option value="UNISEX">中性</option>
                </select>
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
          </form>
        </AdminModal>
      )}

      {/* Delete Confirm Modal */}
      <DeleteConfirmModal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="確定要刪除此作品嗎？"
        description="刪除後將無法復原，包含圖片與關聯資訊將一併移除。"
      />
    </div>
  );
}
