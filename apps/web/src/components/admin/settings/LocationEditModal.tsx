"use client";

import { AdminLocation } from "./types";
import { RefObject } from "react";
import { AdminModal, ModalField, ModalInput } from "../shared/AdminModal";
import { ImageUpload } from "../shared/ImageUpload";

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
      <form onSubmit={handleSaveLoc} id="loc-form" className="space-y-6">
        <ModalField
          label={`分店照片 (${editingLoc.imageUrls?.length || 0}/3)`}
        >
          <ImageUpload
            imageUrls={editingLoc.imageUrls || []}
            isUploading={isUploading}
            onUpload={handleFileUpload}
            onRemove={(idx) => {
              const newUrls = [...(editingLoc.imageUrls || [])];
              newUrls.splice(idx, 1);
              setEditingLoc({ ...editingLoc, imageUrls: newUrls });
            }}
            onMove={moveImage}
            fileInputRef={fileInputRef}
          />
          <p className="text-xs mt-2 px-1">最多上傳 3 張。</p>
        </ModalField>

        <div className="space-y-4">
          <ModalField label="分店名稱">
            <ModalInput
              required
              value={editingLoc.name || ""}
              onChange={e => setEditingLoc({ ...editingLoc, name: e.target.value })}
              placeholder="例如：宜蘭工作室"
            />
          </ModalField>
          <ModalField label="完整地址">
            <ModalInput
              required
              value={editingLoc.address || ""}
              onChange={e => setEditingLoc({ ...editingLoc, address: e.target.value })}
              placeholder="例如：宜蘭縣宜蘭市中山路三段 88 號 2F"
            />
          </ModalField>
        </div>
      </form>
    </AdminModal>
  );
}
