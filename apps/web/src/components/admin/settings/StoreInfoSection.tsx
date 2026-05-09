"use client";

import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminStoreInfo } from "./types";
import { useRouter } from "next/navigation";
import { AdminField, AdminInput } from "@/components/ui/admin-field";

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
    <div className="pb-6 border-b border-border/40">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">1</div>
        <h5>聯絡資訊</h5>
      </div>
      <form onSubmit={handleSaveStoreInfo} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          <AdminField label="聯絡手機">
            <AdminInput
              type="text"
              value={storeInfo.phone || ""}
              onChange={e => setStoreInfo({ ...storeInfo, phone: e.target.value })}
              placeholder="0912-345-678"
            />
          </AdminField>

          <AdminField label="LINE 官方帳號">
            <AdminInput
              type="text"
              value={storeInfo.line || ""}
              onChange={e => setStoreInfo({ ...storeInfo, line: e.target.value })}
              placeholder="https://line.me/R/ti/p/@016qduiu"
            />
          </AdminField>

          <AdminField label="Instagram 連結">
            <AdminInput
              type="text"
              value={storeInfo.instagram || ""}
              onChange={e => setStoreInfo({ ...storeInfo, instagram: e.target.value })}
              placeholder="https://www.instagram.com/..."
            />
          </AdminField>

          <AdminField label="Threads 連結">
            <AdminInput
              type="text"
              value={storeInfo.threads || ""}
              onChange={e => setStoreInfo({ ...storeInfo, threads: e.target.value })}
              placeholder="https://www.threads.com/..."
            />
          </AdminField>
        </div>

        <div className="flex items-center gap-3 mb-4 mt-10">
          <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">2</div>
          <h5>匯款資訊 (用於預約通知)</h5>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          <AdminField label="銀行代碼">
            <AdminInput
              type="text"
              value={storeInfo.bankCode || ""}
              onChange={e => setStoreInfo({ ...storeInfo, bankCode: e.target.value })}
              placeholder="例如：013"
            />
          </AdminField>

          <AdminField label="銀行名稱">
            <AdminInput
              type="text"
              value={storeInfo.bankName || ""}
              onChange={e => setStoreInfo({ ...storeInfo, bankName: e.target.value })}
              placeholder="例如：國泰世華"
            />
          </AdminField>

          <AdminField label="匯款帳號">
            <AdminInput
              type="text"
              value={storeInfo.bankAccount || ""}
              onChange={e => setStoreInfo({ ...storeInfo, bankAccount: e.target.value })}
              placeholder="例如：1234-5678-..."
            />
          </AdminField>

          <AdminField label="帳戶名稱">
            <AdminInput
              type="text"
              value={storeInfo.bankAccountName || ""}
              onChange={e => setStoreInfo({ ...storeInfo, bankAccountName: e.target.value })}
              placeholder="例如：IvysBeauty Studio"
            />
          </AdminField>
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
