"use client";

import { AdminService, AdminLocation, LocationOption } from "./types";
import { AdminModal, ModalField, ModalInput } from "../shared/AdminModal";

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
        <div className="space-y-4">
          <ModalField label="服務名稱">
            <ModalInput
              required
              value={editingSrv.name || ""}
              onChange={e => setEditingSrv({ ...editingSrv, name: e.target.value })}
              placeholder="例如：韓式手工霧眉"
            />
          </ModalField>

          <div className="grid grid-cols-2 gap-4">
            <ModalField label="價格 (NT$)">
              <ModalInput
                type="number"
                required
                min={0}
                value={editingSrv.price || 0}
                onChange={e => setEditingSrv({ ...editingSrv, price: parseInt(e.target.value) || 0 })}
                className="font-mono"
              />
            </ModalField>
            <ModalField label="時長 (分鐘)">
              <ModalInput
                type="number"
                required
                min={15}
                step={15}
                value={editingSrv.duration || 60}
                onChange={e => setEditingSrv({ ...editingSrv, duration: parseInt(e.target.value) || 60 })}
                className="font-mono"
              />
            </ModalField>
          </div>

          <ModalField label="提供此服務的地點">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto custom-scrollbar">
              {locations.map(loc => {
                const isSelected = (editingSrv.locations || []).some(l => l.id === loc.id);
                return (
                  <label key={loc.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${isSelected ? 'border-primary bg-primary/5 shadow-sm' : 'border-border bg-background hover:bg-muted/50'}`}>
                    <input type="checkbox" checked={isSelected} onChange={() => handleLocationToggle(loc)} className="w-4 h-4 rounded text-primary focus:ring-primary/20 border-border/80" />
                    <span className={`text-xs ${isSelected ? 'font-medium text-primary' : 'text-foreground'}`}>{loc.name}</span>
                  </label>
                );
              })}
              {locations.length === 0 && <div className="col-span-full text-xs text-muted-foreground py-2 text-center">尚無任何分店</div>}
            </div>
          </ModalField>
        </div>
      </form>
    </AdminModal>
  );
}
