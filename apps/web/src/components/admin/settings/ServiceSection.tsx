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
    <div className="mb-12">
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

      <div className="bg-background rounded-2xl border border-border/50 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface/50 border-b border-border/50 text-muted-foreground text-xs tracking-widest font-medium">
              <th className="px-5 py-3 font-medium whitespace-nowrap">服務名稱</th>
              <th className="px-5 py-3 font-medium whitespace-nowrap">時長</th>
              <th className="px-5 py-3 font-medium whitespace-nowrap">價格</th>
              <th className="px-5 py-3 font-medium whitespace-nowrap">提供地點</th>
              <th className="px-5 py-3 font-medium whitespace-nowrap text-center">上架</th>
              <th className="px-5 py-3 font-medium whitespace-nowrap text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {services.map((srv) => (
              <tr key={srv.id} className="hover:bg-black/[0.01] transition-colors text-sm">
                <td className="px-5 py-4 font-bold text-foreground">{srv.name}</td>
                <td className="px-5 py-4 text-muted-foreground">{srv.duration} 分鐘</td>
                <td className="px-5 py-4 font-mono font-medium text-foreground">NT$ {srv.price.toLocaleString()}</td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1">
                    {srv.locations.length > 0 ? srv.locations.map(loc => (
                      <span key={loc.id} className="text-[10px] px-1.5 py-0.5 bg-surface text-muted-foreground rounded border border-border/50">
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
                  <div className="flex items-center justify-end gap-3 text-muted-foreground">
                    <button onClick={() => handleOpenSrvEdit(srv)} className="hover:text-primary transition-colors cursor-pointer"><Pencil size={16} /></button>
                    <button onClick={() => setDeletingSrvId(srv.id)} className="hover:text-destructive transition-colors cursor-pointer"><Trash2 size={16} /></button>
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
