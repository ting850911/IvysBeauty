"use client";

import { Plus, MapPin, Clock, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminLocation } from "./types";

interface LocationSectionProps {
  locations: AdminLocation[];
  handleOpenLocEdit: (loc?: AdminLocation) => void;
  toggleLocPublished: (id: string) => void;
  setDeletingLocId: (id: string) => void;
  setIsDeleteLocModalOpen: (open: boolean) => void;
}

export function LocationSection({
  locations,
  handleOpenLocEdit,
  toggleLocPublished,
  setDeletingLocId,
  setIsDeleteLocModalOpen,
}: LocationSectionProps) {
  return (
    <div className="pb-6 border-b border-border/40">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">3</div>
          <h5>分店據點管理</h5>
        </div>
        <Button className="rounded-full gap-2 px-6" onClick={() => handleOpenLocEdit()}>
          <Plus size={16} className="mr-1" />
          新增分店
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {locations.map((loc) => {
          return (
            <div key={loc.id} className="bg-background rounded-xl shadow-md flex flex-col relative overflow-hidden">
              {loc.imageUrls && loc.imageUrls.length > 0 && (
                <div className="w-full h-40 relative bg-muted/50 border-b border-border/50">
                  <img src={loc.imageUrls[0]} alt={loc.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                  {loc.imageUrls.length > 1 && (
                    <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-md">
                      +{loc.imageUrls.length - 1}
                    </div>
                  )}
                </div>
              )}
              <div className="p-6 flex flex-col flex-1 gap-4">
                <h6>{loc.name}</h6>
                <div className="flex items-start gap-3 text-sm">
                  <MapPin size={16} className="shrink-0 mt-0.5 opacity-70" />
                  <span className="leading-relaxed">{loc.address}</span>
                </div>
                <hr className="border-border/40" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={loc.isPublished}
                      onClick={() => toggleLocPublished(loc.id)}
                      className={`relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${loc.isPublished ? 'bg-primary' : 'bg-muted'}`}
                    >
                      <span className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-sm ring-0 transition-transform ${loc.isPublished ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                    <span className="text-sm">上架顯示</span>
                  </div>
                  <div className="flex items-center justify-end gap-3">
                    <button onClick={() => handleOpenLocEdit(loc)} className="hover:text-primary transition-colors" title="編輯據點"><Pencil size={16} /></button>
                    <button onClick={() => { setDeletingLocId(loc.id); setIsDeleteLocModalOpen(true); }} className="hover:text-destructive transition-colors" title="刪除據點"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div >
  );
}
