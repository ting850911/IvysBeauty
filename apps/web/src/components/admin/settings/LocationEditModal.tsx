"use client";

import { Loader2, Pencil, Trash2, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminLocation } from "./types";
import { RefObject } from "react";
import { AdminModal } from "../shared/AdminModal";

interface LocationEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingLoc: Partial<AdminLocation> | null;
  setEditingLoc: (loc: Partial<AdminLocation>) => void;
  isSavingLoc: boolean;
  handleSaveLoc: (e: React.FormEvent) => void;
  isUploading: boolean;
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  moveImage: (index: number, direction: 'left' | 'right') => void;
}

export function LocationEditModal({
  isOpen,
  onClose,
  editingLoc,
  setEditingLoc,
  isSavingLoc,
  handleSaveLoc,
  isUploading,
  fileInputRef,
  handleFileUpload,
  moveImage,
}: LocationEditModalProps) {
  if (!editingLoc) return null;

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={editingLoc.id ? "編輯分店" : "新增分店"}
      maxWidth="max-w-lg"
      formId="loc-form"
      isLoading={isSavingLoc}
    >
      <form onSubmit={handleSaveLoc} id="loc-form" className="space-y-3">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center justify-between">
            <span>分店照片 ({editingLoc.imageUrls?.length || 0}/3)</span>
            <span className="text-[10px] text-muted-foreground font-normal">建議尺寸 800x600</span>
          </label>

          <div className="grid grid-cols-4 gap-3">
            {/* Image Previews */}
            {editingLoc.imageUrls?.map((url, idx) => (
              <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-border group bg-muted">
                <img src={url} alt={`Preview ${idx}`} className="w-full h-full object-cover" />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                  <div className="flex gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveImage(idx, 'left')}
                      className="w-7 h-7 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center disabled:opacity-20"
                    >
                      <Pencil size={12} className="rotate-[-90deg] text-white" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === (editingLoc.imageUrls?.length || 0) - 1}
                      onClick={() => moveImage(idx, 'right')}
                      className="w-7 h-7 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center disabled:opacity-20"
                    >
                      <Pencil size={12} className="rotate-[90deg] text-white" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newUrls = [...(editingLoc.imageUrls || [])];
                      newUrls.splice(idx, 1);
                      setEditingLoc({ ...editingLoc, imageUrls: newUrls });
                    }}
                    className="w-7 h-7 bg-destructive/80 hover:bg-destructive rounded-full flex items-center justify-center text-white"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}

            {/* Compact Upload Box */}
            {(!editingLoc.imageUrls || editingLoc.imageUrls.length < 3) && (
              <div
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className={`aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all border-border/60 hover:border-primary/50 hover:bg-primary/5 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isUploading ? (
                  <Loader2 size={16} className="animate-spin text-primary" />
                ) : (
                  <div className="flex flex-col items-center text-muted-foreground p-1 text-center">
                    <ImagePlus size={18} className="mb-1 text-primary/70" />
                    <span className="text-sm">上傳圖片</span>
                  </div>
                )}
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" multiple onChange={handleFileUpload} />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">分店名稱</label>
            <input
              required
              type="text"
              value={editingLoc.name || ""}
              onChange={e => setEditingLoc({ ...editingLoc, name: e.target.value })}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              placeholder="例如：宜蘭工作室"
            />
          </div>
          <div>
            <label className="text-sm font-medium">完整地址</label>
            <input
              required
              type="text"
              value={editingLoc.address || ""}
              onChange={e => setEditingLoc({ ...editingLoc, address: e.target.value })}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              placeholder="例如：宜蘭縣宜蘭市中山路三段 88 號 2F"
            />
          </div>
        </div>
      </form>
    </AdminModal>
  );
}
