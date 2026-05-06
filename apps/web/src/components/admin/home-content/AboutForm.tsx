"use client";

import { AboutData, HomeContent } from "./types";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="bg-background rounded-3xl p-6 space-y-6 animate-fade-in flex flex-col">
      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <h5>About 區塊內容設定</h5>
          <p className="text-sm">介紹您的品牌理念與工作室特色。</p>
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
              className="w-full rounded-xl px-4 py-2.5 text-sm border border-border min-h-[150px]"
              value={initialData.description}
              onChange={e => onChange({ ...initialData, description: e.target.value })}
            />
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
