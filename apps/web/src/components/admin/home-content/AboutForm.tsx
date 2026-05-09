"use client";

import { AboutData, HomeContent } from "./types";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminCard, AdminCardHeader, AdminCardContent, AdminCardFooter, AdminField, AdminInput, AdminTextarea } from "../shared/AdminCard";

interface AboutFormProps {
  initialData: AboutData;
  allContent: HomeContent;
  onChange: (data: AboutData) => void;
}

export function AboutForm({ initialData, allContent, onChange }: AboutFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/home-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...allContent,
          about: initialData
        }),
      });

      if (res.ok) {
        alert("About 區塊儲存成功！");
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

  return (
    <AdminCard>
      <AdminCardHeader
        title="About 區塊內容設定"
        description="介紹您的品牌理念與工作室特色。"
      />

      <AdminCardContent>
        <AdminField label="小標">
          <AdminInput
            value={initialData.eyebrow}
            onChange={e => onChange({ ...initialData, eyebrow: e.target.value })}
            placeholder="例如：關於我們"
          />
        </AdminField>

        <AdminField label="主標題">
          <AdminInput
            value={initialData.title}
            onChange={e => onChange({ ...initialData, title: e.target.value })}
            placeholder="例如：最懂妳的美睫專家"
          />
        </AdminField>

        <AdminField label="詳細介紹">
          <AdminTextarea
            value={initialData.description}
            onChange={e => onChange({ ...initialData, description: e.target.value })}
            placeholder="請輸入品牌故事或工作室介紹..."
            rows={6}
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
