"use client";

import { HeroData, HomeContent } from "./types";
import { Button } from "@/components/ui/button";
import { ImagePlus, Save, Loader2, Trash2, Pencil } from "lucide-react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface HeroFormProps {
  initialData: HeroData;
  allContent: HomeContent; // We need the full object to save back to Prisma Json
  onChange: (data: HeroData) => void;
}

export function HeroForm({ initialData, allContent, onChange }: HeroFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/home-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...allContent,
          hero: initialData
        }),
      });

      if (res.ok) {
        alert("Hero 區塊儲存成功！");
        router.refresh();
      } else {
        const error = await res.json();
        alert(`儲存失敗: ${error.message || "未知錯誤"}`);
      }
    } catch (error) {
      console.error(error);
      alert("儲存過程中發生系統錯誤");
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const currentCount = initialData.imageUrls?.length || 0;
    const remaining = 3 - currentCount;
    if (remaining <= 0) return;

    setIsUploading(true);
    try {
      const uploadedUrls: string[] = [];
      const filesToUpload = Array.from(files).slice(0, remaining);

      for (const file of filesToUpload) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await res.json();
        if (result.success) {
          uploadedUrls.push(result.data.url);
        } else {
          alert(`圖片 ${file.name} 上傳失敗: ${result.error?.message || "未知錯誤"}`);
        }
      }

      if (uploadedUrls.length > 0) {
        onChange({
          ...initialData,
          imageUrls: [...(initialData.imageUrls || []), ...uploadedUrls]
        });
      }
    } catch (err) {
      console.error("[Upload Error]", err);
      alert("圖片上傳過程中發生系統錯誤");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const moveImage = (index: number, direction: 'left' | 'right') => {
    const newUrls = [...(initialData.imageUrls || [])];
    const targetIndex = direction === 'left' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newUrls.length) return;

    const temp = newUrls[index];
    newUrls[index] = newUrls[targetIndex];
    newUrls[targetIndex] = temp;

    onChange({ ...initialData, imageUrls: newUrls });
  };

  const removeImage = (index: number) => {
    const newUrls = (initialData.imageUrls || []).filter((_, i) => i !== index);
    onChange({ ...initialData, imageUrls: newUrls });
  };

  return (
    <div className="bg-background rounded-3xl p-6 space-y-6 animate-fade-in flex flex-col">
      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <h5>Hero 區塊內容設定</h5>
          <p className="text-sm">編輯首頁第一屏主要區塊，建議使用高品質圖片與簡潔有力的文字吸引訪客預約。</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider">標語</label>
            <input
              className="w-full rounded-xl px-4 py-2.5 text-sm border border-border"
              value={initialData.eyebrow}
              onChange={e => onChange({ ...initialData, eyebrow: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider">主標題</label>
            <input
              className="w-full rounded-xl px-4 py-2.5 text-sm border border-border"
              value={initialData.title}
              onChange={e => onChange({ ...initialData, title: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider">描述</label>
            <textarea
              className="w-full rounded-xl px-4 py-2.5 text-sm border border-border min-h-[100px]"
              value={initialData.description}
              onChange={e => onChange({ ...initialData, description: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider flex items-center justify-between">
              <span>Banner 圖片 ({initialData.imageUrls?.length || 0}/3)</span>
              <span className="text-[10px] text-muted-foreground font-normal">建議尺寸 1920x1080</span>
            </label>

            <div className="grid grid-cols-4 gap-3">
              {/* Image Previews */}
              {initialData.imageUrls?.map((url, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-border group bg-muted">
                  <img src={url} alt={`Preview ${idx}`} className="w-full h-full object-cover" />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                    <div className="flex gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => moveImage(idx, 'left')}
                        className="w-7 h-7 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center disabled:opacity-20 transition-colors"
                      >
                        <Pencil size={12} className="rotate-[-90deg] text-white" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === (initialData.imageUrls?.length || 0) - 1}
                        onClick={() => moveImage(idx, 'right')}
                        className="w-7 h-7 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center disabled:opacity-20 transition-colors"
                      >
                        <Pencil size={12} className="rotate-[90deg] text-white" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="w-7 h-7 bg-destructive/80 hover:bg-destructive rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Upload Box */}
              {(!initialData.imageUrls || initialData.imageUrls.length < 3) && (
                <div
                  onClick={() => !isUploading && fileInputRef.current?.click()}
                  className={`aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all border-border/60 hover:border-primary/50 hover:bg-primary/5 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isUploading ? (
                    <Loader2 size={16} className="animate-spin text-primary" />
                  ) : (
                    <div className="flex flex-col items-center text-muted-foreground p-1 text-center">
                      <ImagePlus size={18} className="mb-1 text-primary/70" />
                      <span className="text-sm">上傳圖片</span>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="gap-2 rounded-full px-8 shadow-lg shadow-accent-primary/10"
        >
          {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {isSaving ? "儲存中..." : "儲存 "}
        </Button>
      </div>
    </div>
  );
}
