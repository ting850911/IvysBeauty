"use client";

import React from "react";
import { Loader2, Pencil, Trash2, ImagePlus } from "lucide-react";

interface ImageUploadProps {
  imageUrls: string[];
  maxImages?: number;
  isUploading: boolean;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
  onMove?: (index: number, direction: 'left' | 'right') => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export function ImageUpload({
  imageUrls,
  maxImages = 3,
  isUploading,
  onUpload,
  onRemove,
  onMove,
  fileInputRef,
}: ImageUploadProps) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-1">
      {/* Image Previews */}
      {imageUrls.map((url, idx) => (
        <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-border group bg-muted shadow-sm">
          <img src={url} alt={`Preview ${idx}`} className="w-full h-full object-cover" />

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
            {onMove && (
              <div className="flex gap-1">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => onMove(idx, 'left')}
                  className="w-7 h-7 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center disabled:opacity-20"
                >
                  <Pencil size={12} className="rotate-[-90deg] text-white" />
                </button>
                <button
                  type="button"
                  disabled={idx === imageUrls.length - 1}
                  onClick={() => onMove(idx, 'right')}
                  className="w-7 h-7 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center disabled:opacity-20"
                >
                  <Pencil size={12} className="rotate-[90deg] text-white" />
                </button>
              </div>
            )}
            <button
              type="button"
              onClick={() => onRemove(idx)}
              className="w-7 h-7 bg-destructive/80 hover:bg-destructive rounded-full flex items-center justify-center text-white"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>
      ))}

      {/* Compact Upload Box */}
      {imageUrls.length < maxImages && (
        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all border-border/60 hover:border-primary/50 hover:bg-primary/5 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isUploading ? (
            <Loader2 size={16} className="animate-spin text-primary" />
          ) : (
            <div className="flex flex-col items-center p-1 text-center">
              <ImagePlus size={18} className="mb-1 text-primary/70" />
              <span className="text-xs">上傳圖片</span>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            multiple
            onChange={onUpload}
          />
        </div>
      )}
    </div>
  );
}
