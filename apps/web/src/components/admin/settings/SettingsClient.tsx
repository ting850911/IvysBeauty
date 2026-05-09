"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// Sub-components
import { StoreInfoSection } from "./StoreInfoSection";
import { LocationSection } from "./LocationSection";
import { ServiceSection } from "./ServiceSection";
import { LocationEditModal } from "./LocationEditModal";
import { ServiceEditModal } from "./ServiceEditModal";
import { DeleteConfirmModal } from "../shared/DeleteConfirmModal";

// Types
import { AdminStoreInfo, AdminLocation, AdminService, LocationOption } from "./types";

interface Props {
  initialLocations: AdminLocation[];
  initialStoreInfo: AdminStoreInfo;
  initialServices: AdminService[];
}

export function SettingsClient({ initialLocations, initialStoreInfo, initialServices }: Props) {
  const router = useRouter();

  // Store Info State
  const [storeInfo, setStoreInfo] = useState<AdminStoreInfo>(initialStoreInfo);
  const [isSavingStoreInfo, setIsSavingStoreInfo] = useState(false);

  // Locations State
  const [locations, setLocations] = useState(initialLocations);
  const [isLocModalOpen, setIsLocModalOpen] = useState(false);
  const [editingLoc, setEditingLoc] = useState<Partial<AdminLocation> | null>(null);
  const [isSavingLoc, setIsSavingLoc] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleteLocModalOpen, setIsDeleteLocModalOpen] = useState(false);
  const [deletingLocId, setDeletingLocId] = useState<string | null>(null);
  const [isDeletingLoc, setIsDeletingLoc] = useState(false);

  // Services State
  const [services, setServices] = useState(initialServices);
  const [isSrvModalOpen, setIsSrvModalOpen] = useState(false);
  const [editingSrv, setEditingSrv] = useState<Partial<AdminService> | null>(null);
  const [isSavingSrv, setIsSavingSrv] = useState(false);
  const [deletingSrvId, setDeletingSrvId] = useState<string | null>(null);
  const [isDeletingSrv, setIsDeletingSrv] = useState(false);

  // Sync state when Server Component re-fetches data
  useEffect(() => {
    setLocations(initialLocations);
    setStoreInfo(initialStoreInfo);
    setServices(initialServices);
  }, [initialLocations, initialStoreInfo, initialServices]);

  // ---- STORE INFO ACTIONS ----
  const handleSaveStoreInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingStoreInfo(true);
    try {
      const res = await fetch('/api/admin/store-info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storeInfo),
      });

      if (res.ok) {
        router.refresh();
        alert("店家基本資料已儲存");
      } else {
        alert("儲存失敗");
      }
    } catch (err) {
      alert("系統錯誤");
    } finally {
      setIsSavingStoreInfo(false);
    }
  };

  // ---- LOCATION ACTIONS ----
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const currentCount = editingLoc?.imageUrls?.length || 0;
    const remaining = 3 - currentCount;
    if (remaining <= 0) return;

    setIsUploading(true);
    try {
      const uploadedUrls: string[] = [];
      const filesToUpload = Array.from(files).slice(0, remaining);

      for (const file of filesToUpload) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await res.json();
        if (result.success) {
          uploadedUrls.push(result.data.url);
        } else {
          alert(`圖片 ${file.name} 上傳失敗: ${result.error?.message || "未知錯誤"}`);
        }
      }

      if (uploadedUrls.length > 0) {
        setEditingLoc(prev => prev ? {
          ...prev,
          imageUrls: [...(prev.imageUrls || []), ...uploadedUrls]
        } : prev);
      }
    } catch (err) {
      console.error("[Upload Error]", err);
      alert("圖片上傳過程中發生系統錯誤");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const moveImage = (index: number, direction: 'left' | 'right') => {
    if (!editingLoc?.imageUrls) return;
    const newUrls = [...editingLoc.imageUrls];
    const targetIndex = direction === 'left' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newUrls.length) return;

    const temp = newUrls[index];
    newUrls[index] = newUrls[targetIndex];
    newUrls[targetIndex] = temp;

    setEditingLoc({ ...editingLoc, imageUrls: newUrls });
  };

  const handleOpenLocEdit = (loc?: AdminLocation) => {
    if (loc) {
      setEditingLoc({ ...loc, imageUrls: loc.imageUrls || [] });
    } else {
      setEditingLoc({ name: "", address: "", imageUrls: [] });
    }
    setIsLocModalOpen(true);
  };

  const handleSaveLoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLoc?.name || !editingLoc?.address) return;

    setIsSavingLoc(true);
    try {
      const isNew = !editingLoc.id;
      const url = isNew ? '/api/admin/locations' : `/api/admin/locations/${editingLoc.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingLoc.name,
          address: editingLoc.address,
          imageUrls: editingLoc.imageUrls || [],
        }),
      });

      if (res.ok) {
        setIsLocModalOpen(false);
        setEditingLoc(null);
        router.refresh();
      } else {
        const data = await res.json();
        alert(`儲存失敗: ${data.error}`);
      }
    } catch (err) {
      alert("系統錯誤");
    } finally {
      setIsSavingLoc(false);
    }
  };

  const toggleLocPublished = async (id: string) => {
    setLocations(locations.map(loc =>
      loc.id === id ? { ...loc, isPublished: !loc.isPublished } : loc
    ));
    // TODO: 串接 API
  };

  const confirmDeleteLoc = async () => {
    if (!deletingLocId) return;
    setIsDeletingLoc(true);
    try {
      const res = await fetch(`/api/admin/locations/${deletingLocId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setIsDeleteLocModalOpen(false);
        setDeletingLocId(null);
        router.refresh();
      } else {
        alert("刪除失敗");
      }
    } catch (err) {
      alert("系統錯誤");
    } finally {
      setIsDeletingLoc(false);
    }
  };

  // ---- SERVICE ACTIONS ----
  const handleOpenSrvEdit = (srv?: AdminService) => {
    if (srv) {
      setEditingSrv(srv);
    } else {
      setEditingSrv({ name: "", price: 0, duration: 60, isPublished: true, locations: [] });
    }
    setIsSrvModalOpen(true);
  };

  const handleLocationToggle = (loc: LocationOption) => {
    if (!editingSrv) return;
    const currentLocs = editingSrv.locations || [];
    const exists = currentLocs.some(l => l.id === loc.id);

    if (exists) {
      setEditingSrv({ ...editingSrv, locations: currentLocs.filter(l => l.id !== loc.id) });
    } else {
      setEditingSrv({ ...editingSrv, locations: [...currentLocs, loc] });
    }
  };

  const handleSaveSrv = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSrv) return;

    setIsSavingSrv(true);
    const isNew = !editingSrv.id;
    const url = isNew ? "/api/admin/services" : `/api/admin/services/${editingSrv.id}`;
    const method = isNew ? "POST" : "PUT";

    const payload = {
      ...editingSrv,
      locationIds: editingSrv.locations?.map(l => l.id) || [],
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsSrvModalOpen(false);
        setEditingSrv(null);
        router.refresh();
      } else {
        const data = await res.json();
        alert(`儲存失敗: ${data.error}`);
      }
    } catch (err) {
      alert("系統錯誤");
    } finally {
      setIsSavingSrv(false);
    }
  };

  const toggleSrvPublished = async (id: string, currentStatus: boolean) => {
    setServices(services.map(srv =>
      srv.id === id ? { ...srv, isPublished: !currentStatus } : srv
    ));

    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !currentStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      router.refresh();
    } catch (err) {
      alert("狀態更新失敗");
      setServices(services.map(srv =>
        srv.id === id ? { ...srv, isPublished: currentStatus } : srv
      ));
    }
  };

  const handleDeleteSrv = async () => {
    if (!deletingSrvId) return;
    setIsDeletingSrv(true);
    try {
      const res = await fetch(`/api/admin/services/${deletingSrvId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setDeletingSrvId(null);
        router.refresh();
      } else {
        alert("刪除失敗");
      }
    } catch (err) {
      alert("系統錯誤");
    } finally {
      setIsDeletingSrv(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="space-y-12 animate-fade-in">
        {/* 1. Store Info Block */}
        <StoreInfoSection
          storeInfo={storeInfo}
          setStoreInfo={setStoreInfo}
          handleSaveStoreInfo={handleSaveStoreInfo}
          isSavingStoreInfo={isSavingStoreInfo}
        />

        <div className="h-px bg-border/50 w-full mb-8"></div>

        {/* 2. Locations Block */}
        <LocationSection
          locations={locations}
          handleOpenLocEdit={handleOpenLocEdit}
          toggleLocPublished={toggleLocPublished}
          setDeletingLocId={setDeletingLocId}
          setIsDeleteLocModalOpen={setIsDeleteLocModalOpen}
        />

        <div className="h-px bg-border/50 w-full mb-8"></div>

        {/* 3. Services Block */}
        <ServiceSection
          services={services}
          handleOpenSrvEdit={handleOpenSrvEdit}
          toggleSrvPublished={toggleSrvPublished}
          setDeletingSrvId={setDeletingSrvId}
        />
      </div>

      {/* --- MODALS --- */}

      <LocationEditModal
        isOpen={isLocModalOpen}
        onClose={() => setIsLocModalOpen(false)}
        editingLoc={editingLoc}
        setEditingLoc={setEditingLoc}
        isSavingLoc={isSavingLoc}
        handleSaveLoc={handleSaveLoc}
        isUploading={isUploading}
        fileInputRef={fileInputRef}
        handleFileUpload={handleFileUpload}
        moveImage={moveImage}
      />

      <DeleteConfirmModal
        isOpen={isDeleteLocModalOpen}
        onClose={() => setIsDeleteLocModalOpen(false)}
        onConfirm={confirmDeleteLoc}
        isLoading={isDeletingLoc}
        title="確定要刪除嗎？"
        description="此動作無法還原，請確認是否要刪除這間分店。"
      />

      <ServiceEditModal
        isOpen={isSrvModalOpen}
        onClose={() => setIsSrvModalOpen(false)}
        editingSrv={editingSrv}
        setEditingSrv={setEditingSrv}
        isSavingSrv={isSavingSrv}
        handleSaveSrv={handleSaveSrv}
        locations={locations}
        handleLocationToggle={handleLocationToggle}
      />

      <DeleteConfirmModal
        isOpen={!!deletingSrvId}
        onClose={() => setDeletingSrvId(null)}
        onConfirm={handleDeleteSrv}
        isLoading={isDeletingSrv}
        title="確定要刪除此服務嗎？"
        description="刪除後將無法復原。若該服務已有預約紀錄，建議將其「下架」而非刪除，以保留歷史紀錄。"
      />
    </div>
  );
}
