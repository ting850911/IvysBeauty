"use client";

import { HeroData, HomeContent } from "./types";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "../shared/ImageUpload";
import { AdminCard, AdminCardHeader, AdminCardContent, AdminCardFooter, AdminField, AdminInput, AdminTextarea } from "../shared/AdminCard";

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
    <AdminCard>
      <AdminCardHeader
        title="Hero 區塊內容設定"
        description="編輯首頁第一屏主要區塊，建議使用高品質圖片與簡潔有力的文字吸引訪客預約。"
      />

      <AdminCardContent>
        <AdminField label="小標">
          <AdminInput
            value={initialData.eyebrow}
            onChange={e => onChange({ ...initialData, eyebrow: e.target.value })}
            placeholder="例如：優質美睫服務"
          />
        </AdminField>

        <AdminField label="主標題">
          <AdminInput
            value={initialData.title}
            onChange={e => onChange({ ...initialData, title: e.target.value })}
            placeholder="例如：Ivy's Beauty"
          />
        </AdminField>

        <AdminField label="描述內容">
          <AdminTextarea
            value={initialData.description}
            onChange={e => onChange({ ...initialData, description: e.target.value })}
            placeholder="請輸入首頁介紹文字..."
            rows={4}
          />
        </AdminField>

        <AdminField
          label={
            <div className="flex items-center justify-between w-full">
              <span>Banner 圖片 ({initialData.imageUrls?.length || 0}/3)</span>
              <span className="text-[10px] text-muted-foreground font-normal">建議尺寸 1920x1080</span>
            </div>
          }
        >
          <ImageUpload
            imageUrls={initialData.imageUrls || []}
            maxImages={3}
            isUploading={isUploading}
            onUpload={handleFileUpload}
            onRemove={removeImage}
            onMove={moveImage}
            fileInputRef={fileInputRef}
          />
        </AdminField>
      </AdminCardContent>

      <AdminCardFooter>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="gap-2 rounded-full px-8 shadow-lg shadow-primary/10"
        >
          {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {isSaving ? "儲存中..." : "儲存設定"}
        </Button>
      </AdminCardFooter>
    </AdminCard>
  );
}
