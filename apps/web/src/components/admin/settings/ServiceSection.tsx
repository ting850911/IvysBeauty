"use client";

import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminService } from "./types";

interface ServiceSectionProps {
  services: AdminService[];
  handleOpenSrvEdit: (srv?: AdminService) => void;
  toggleSrvPublished: (id: string, currentStatus: boolean) => void;
  setDeletingSrvId: (id: string) => void;
}

export function ServiceSection({
  services,
  handleOpenSrvEdit,
  toggleSrvPublished,
  setDeletingSrvId,
}: ServiceSectionProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">4</div>
          <h5>服務項目管理</h5>
        </div>
        <Button className="rounded-full gap-2 px-6" onClick={() => handleOpenSrvEdit()}>
          <Plus size={16} className="mr-1" />
          新增服務項目
        </Button>
      </div>

      <div className="rounded-xl overflow-hidden shadow-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-background text-xs whitespace-nowrap">
              <th className="px-5 py-3">服務名稱</th>
              <th className="px-5 py-3">時長</th>
              <th className="px-5 py-3">價格</th>
              <th className="px-5 py-3">提供地點</th>
              <th className="px-5 py-3 text-center">上架</th>
              <th className="px-5 py-3 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {services.map((srv) => (
              <tr key={srv.id} className="text-sm">
                <td className="px-5 py-4">{srv.name}</td>
                <td className="px-5 py-4">{srv.duration} 分鐘</td>
                <td className="px-5 py-4">NT$ {srv.price.toLocaleString()}</td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1">
                    {srv.locations.length > 0 ? srv.locations.map(loc => (
                      <span key={loc.id} className="admin-tag admin-tag-info">
                        {loc.name}
                      </span>
                    )) : (
                      <span className="text-xs text-muted-foreground/50">尚未指派</span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-4 text-center">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={srv.isPublished}
                    onClick={() => toggleSrvPublished(srv.id, srv.isPublished)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${srv.isPublished ? 'bg-primary' : 'bg-muted'}`}
                  >
                    <span className={`pointer-events-none block h-4 w-4 rounded-full bg-background shadow-sm ring-0 transition-transform ${srv.isPublished ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button onClick={() => handleOpenSrvEdit(srv)} className="hover:text-primary transition-colors" title="編輯服務"><Pencil size={16} /></button>
                    <button onClick={() => setDeletingSrvId(srv.id)} className="hover:text-destructive transition-colors" title="刪除服務"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-sm text-muted-foreground">
                  尚無服務項目，請點擊上方按鈕新增。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
