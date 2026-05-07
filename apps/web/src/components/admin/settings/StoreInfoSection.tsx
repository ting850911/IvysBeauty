"use client";

import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminStoreInfo } from "./types";
import { useRouter } from "next/navigation";

interface StoreInfoSectionProps {
  storeInfo: AdminStoreInfo;
  setStoreInfo: (info: AdminStoreInfo) => void;
  handleSaveStoreInfo: (e: React.FormEvent) => void;
  isSavingStoreInfo: boolean;
}

export function StoreInfoSection({
  storeInfo,
  setStoreInfo,
  handleSaveStoreInfo,
  isSavingStoreInfo,
}: StoreInfoSectionProps) {
  const [isSaving, setIsSaving] = useState(false);

  const router = useRouter();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/home-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...storeInfo,
        }),
      });

      if (res.ok) {
        alert("預約需知儲存成功！");
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
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">1</div>
        <h5>聯絡資訊</h5>
      </div>
      <form onSubmit={handleSaveStoreInfo} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">主要聯絡手機</label>
            <input
              type="text"
              value={storeInfo.phone || ""}
              onChange={e => setStoreInfo({ ...storeInfo, phone: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              placeholder="例如：0912-345-678"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">LINE 官方帳號</label>
            <input
              type="text"
              value={storeInfo.line || ""}
              onChange={e => setStoreInfo({ ...storeInfo, line: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              placeholder="例如：@ivysbeauty"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Instagram 連結</label>
            <input
              type="text"
              value={storeInfo.instagram || ""}
              onChange={e => setStoreInfo({ ...storeInfo, instagram: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              placeholder="https://instagram.com/..."
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Threads 連結</label>
            <input
              type="text"
              value={storeInfo.threads || ""}
              onChange={e => setStoreInfo({ ...storeInfo, threads: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              placeholder="https://threads.net/..."
            />
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4 mt-10">
          <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">2</div>
          <h5>匯款資訊 (用於預約通知)</h5>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">銀行代碼</label>
            <input
              type="text"
              value={storeInfo.bankCode || ""}
              onChange={e => setStoreInfo({ ...storeInfo, bankCode: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              placeholder="例如：013"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">銀行名稱</label>
            <input
              type="text"
              value={storeInfo.bankName || ""}
              onChange={e => setStoreInfo({ ...storeInfo, bankName: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              placeholder="例如：國泰世華"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">匯款帳號</label>
            <input
              type="text"
              value={storeInfo.bankAccount || ""}
              onChange={e => setStoreInfo({ ...storeInfo, bankAccount: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              placeholder="例如：1234-5678-..."
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">帳戶名稱</label>
            <input
              type="text"
              value={storeInfo.bankAccountName || ""}
              onChange={e => setStoreInfo({ ...storeInfo, bankAccountName: e.target.value })}
              className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              placeholder="例如：IvysBeauty Studio"
            />
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
      </form>
    </div>
  );
}
