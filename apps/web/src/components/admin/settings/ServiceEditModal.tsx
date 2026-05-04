"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminService, AdminLocation, LocationOption } from "./types";
import { AdminModal } from "../shared/AdminModal";

interface ServiceEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingSrv: Partial<AdminService> | null;
  setEditingSrv: (srv: Partial<AdminService>) => void;
  isSavingSrv: boolean;
  handleSaveSrv: (e: React.FormEvent) => void;
  locations: AdminLocation[];
  handleLocationToggle: (loc: LocationOption) => void;
}

export function ServiceEditModal({
  isOpen,
  onClose,
  editingSrv,
  setEditingSrv,
  isSavingSrv,
  handleSaveSrv,
  locations,
  handleLocationToggle,
}: ServiceEditModalProps) {
  if (!editingSrv) return null;

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={editingSrv.id ? "編輯服務" : "新增服務"}
      maxWidth="max-w-lg"
      formId="srv-form"
      isLoading={isSavingSrv}
    >
      <form onSubmit={handleSaveSrv} id="srv-form">
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">服務名稱</label>
            <input
              type="text"
              required
              value={editingSrv.name || ""}
              onChange={e => setEditingSrv({ ...editingSrv, name: e.target.value })}
              className="w-full h-11 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm text-sm"
              placeholder="例如：韓式手工霧眉"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">價格 (NT$)</label>
              <input
                type="number"
                required
                min={0}
                value={editingSrv.price || 0}
                onChange={e => setEditingSrv({ ...editingSrv, price: parseInt(e.target.value) || 0 })}
                className="w-full h-11 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium">時長 (分鐘)</label>
              <input
                type="number"
                required
                min={15}
                step={15}
                value={editingSrv.duration || 60}
                onChange={e => setEditingSrv({ ...editingSrv, duration: parseInt(e.target.value) || 60 })}
                className="w-full h-11 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm font-mono text-sm"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">提供此服務的地點</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto custom-scrollbar">
              {locations.map(loc => {
                const isSelected = (editingSrv.locations || []).some(l => l.id === loc.id);
                return (
                  <label key={loc.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${isSelected ? 'border-primary bg-primary/5' : 'border-border bg-background hover:bg-muted/50'}`}>
                    <input type="checkbox" checked={isSelected} onChange={() => handleLocationToggle(loc)} className="w-4 h-4 rounded text-primary focus:ring-primary/20 border-border/80" />
                    <span className={`text-xs ${isSelected ? 'font-medium text-primary' : 'text-foreground'}`}>{loc.name}</span>
                  </label>
                );
              })}
              {locations.length === 0 && <div className="col-span-full text-xs text-muted-foreground py-2 text-center">尚無任何分店</div>}
            </div>
          </div>
        </div>
      </form>
    </AdminModal>
  );
}
