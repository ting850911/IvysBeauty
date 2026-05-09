"use client";

import { useState } from "react";
import {
  Search,
  Pencil,
  Trash2,
  TrendingUp,
  UserCheck,
  Gift,
  AlertCircle,
  UserPlus,
  ChevronUp,
  ChevronDown,
  Calendar,
  MapPin,
  Clock,
  History
} from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { AdminModal, ModalField, ModalInput, ModalSelect, ModalTextarea } from "@/components/admin/shared/AdminModal";
import { AdminSheet } from "@/components/admin/shared/AdminSheet";

interface BookingItem {
  id: string;
  status: string;
  startTime: string;
  endTime: string;
  notes?: string | null;
  service: { name: string; price: number };
  location: { name: string };
}

interface Member {
  id: string;
  name: string;
  phone: string;
  email: string;
  birthday: string | null;
  level: string;
  points: number;
  prepaidBalance: number;
  cumulativeSpending: number;
  visitCount: number;
  lastVisit: string | null;
  status: string;
  memberNotes: string | null;
  bookings?: BookingItem[];
}

interface Props {
  initialMembers: Member[];
  stats: {
    total: number;
    newThisMonth: number;
    active: number;
    totalPrepaid: number;
  };
  upcomingBirthdays: Member[];
}

type SortKey = 'points' | 'cumulativeSpending' | 'visitCount';

export function MembersClient({ initialMembers, stats, upcomingBirthdays }: Props) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' } | null>(null);

  // Edit Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Partial<Member> | null>(null);

  // History Sheet states
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [viewingMember, setViewingMember] = useState<Member | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);

  const [isSaving, setIsSaving] = useState(false);

  const handleOpenEdit = (member: Member) => {
    setEditingMember({ ...member });
    setIsEditModalOpen(true);
  };

  const handleOpenHistory = (member: Member) => {
    setViewingMember(member);
    setIsSheetOpen(true);
  };

  const handleOpenDelete = (id: string) => {
    setMemberToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleSort = (key: SortKey) => {
    let direction: 'asc' | 'desc' = 'desc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (key: SortKey) => {
    const isActive = sortConfig?.key === key;
    if (isActive && sortConfig?.direction === 'asc') {
      return <ChevronUp size={14} className="ml-1 inline-block" />;
    }
    return <ChevronDown size={14} className={`ml-1 inline-block ${!isActive ? 'opacity-20' : ''}`} />;
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember || !editingMember.id) return;

    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/members/${editingMember.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingMember),
      });

      if (res.ok) {
        setIsEditModalOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.error("Save member error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!memberToDelete) return;

    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/members/${memberToDelete}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setIsDeleteDialogOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.error("Delete member error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Filter and Sort members
  const processedMembers = initialMembers
    .filter(m => {
      if (!searchTerm) return true;
      const s = searchTerm.toLowerCase();
      return (
        m.name.toLowerCase().includes(s) ||
        m.phone.includes(searchTerm) ||
        m.email.toLowerCase().includes(s)
      );
    })
    .sort((a, b) => {
      if (!sortConfig) return 0;
      const { key, direction } = sortConfig;
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DONE': return 'admin-tag-success';
      case 'CONFIRMED': return 'admin-tag-info';
      case 'CANCELLED': return 'admin-tag-danger';
      case 'PENDING': return 'admin-tag-warning';
      default: return 'admin-tag-muted';
    }
  };

  const statusMap: Record<string, string> = {
    'DONE': '已完成',
    'CONFIRMED': '已預約',
    'CANCELLED': '已取消',
    'PENDING': '審核中',
    'MISSED': '未到店'
  };

  return (
    <main className="flex-1 p-4 md:p-8 overflow-auto">
      {/* Main Content */}
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard
            title="本月新增會員"
            value={stats.newThisMonth.toLocaleString()}
            unit="人"
            trend="+15.2%"
            icon={<UserPlus className="text-primary" size={24} />}
          />
          <StatCard
            title="活躍會員"
            value={stats.active.toLocaleString()}
            unit="人"
            trend="+4.7%"
            icon={<UserCheck className="text-primary" size={24} />}
          />

          {/* Upcoming Birthdays Card */}
          <div className="md:col-span-2 bg-white/80 backdrop-blur-md rounded-[32px] p-6 border border-border/40 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h6 className="flex items-center gap-2">
                <Gift size={18} className="text-accent-secondary" />
                即將生日會員
              </h6>
              <button className="text-xs text-primary hover:underline">查看全部</button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {upcomingBirthdays.slice(0, 4).map((member) => (
                <div key={member.id} className="flex items-center justify-between group cursor-pointer hover:bg-surface/30 p-2 -mx-2 rounded-2xl transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent-secondary/10 flex items-center justify-center text-accent-secondary text-sm border border-accent-secondary/20">
                      {member.name[0]}
                    </div>
                    <div>
                      <p className="text-sm">{member.name}</p>
                      <p className="text-xs">{member.phone}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" size={18} />
          <input
            type="text"
            placeholder="搜尋會員"
            className="w-fit pl-12 pr-4 py-3 border border-border/40 rounded-full text-sm focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Member Table */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl border border-border/40 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-background">
                  <th className="px-3 py-5 text-xs whitespace-nowrap">會員</th>
                  <th className="px-3 py-5 text-xs whitespace-nowrap">聯絡方式</th>
                  <th className="px-3 py-5 text-xs whitespace-nowrap">等級</th>
                  <th
                    className={`px-3 py-5 text-xs whitespace-nowrap cursor-pointer hover:text-primary transition-colors ${sortConfig?.key === 'points' ? 'text-primary font-bold' : ''}`}
                    onClick={() => handleSort('points')}
                  >
                    點數{renderSortIcon('points')}
                  </th>
                  <th
                    className={`px-3 py-5 text-xs whitespace-nowrap cursor-pointer hover:text-primary transition-colors ${sortConfig?.key === 'cumulativeSpending' ? 'text-primary font-bold' : ''}`}
                    onClick={() => handleSort('cumulativeSpending')}
                  >
                    累積消費{renderSortIcon('cumulativeSpending')}
                  </th>
                  <th
                    className={`px-3 py-5 text-xs whitespace-nowrap cursor-pointer hover:text-primary transition-colors ${sortConfig?.key === 'visitCount' ? 'text-primary font-bold' : ''}`}
                    onClick={() => handleSort('visitCount')}
                  >
                    到店次數{renderSortIcon('visitCount')}
                  </th>
                  <th className="px-3 py-5 text-xs whitespace-nowrap">上次到店</th>
                  <th className="px-3 py-5 text-xs whitespace-nowrap">狀態</th>
                  <th className="px-3 py-5 text-xs whitespace-nowrap text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {processedMembers.length > 0 ? (
                  processedMembers.map((member) => (
                    <tr key={member.id} className="text-sm whitespace-nowrap group">
                      <td className="px-3 py-5">
                        <button
                          onClick={() => handleOpenHistory(member)}
                          className="hover:text-primary"
                        >
                          {member.name}
                        </button>
                      </td>
                      <td className="px-3 py-5">
                        <p className="font-bold">{member.phone}</p>
                        <p className="text-xs mt-0.5 text-ellipsis overflow-hidden max-w-[10rem] opacity-60">{member.email || '-'}</p>
                      </td>
                      <td className="px-3 py-5">
                        <span className={`admin-tag ${member.level === 'VIP會員' ? 'admin-tag-primary' :
                          member.level === '白金會員' ? 'admin-tag-primary' :
                            'admin-tag-muted'
                          }`}>
                          {member.level}
                        </span>
                      </td>
                      <td className="px-3 py-5 text-primary">
                        {member.points.toLocaleString()}
                      </td>
                      <td className="px-3 py-5 text-primary">
                        {member.cumulativeSpending.toLocaleString()}
                      </td>
                      <td className="px-3 py-5">
                        {member.visitCount}
                      </td>
                      <td className="px-3 py-5 text-xs">
                        {member.lastVisit ? format(new Date(member.lastVisit), 'yyyy/MM/dd') : '-'}
                      </td>
                      <td className="px-3 py-5 text-xs">
                        <span className={`admin-tag ${member.status === '啟用中' ? 'admin-tag-success' :
                          member.status === '黑名單' ? 'admin-tag-danger' :
                            'admin-tag-warning'
                          }`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-3 py-5">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => handleOpenEdit(member)}
                            className="hover:text-primary transition-colors"
                            title="編輯會員"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleOpenDelete(member.id)}
                            className="hover:text-destructive transition-colors"
                            title="刪除會員"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="px-6 py-20 text-center">
                      <p className="text-muted-foreground font-medium italic">找不到符合條件的會員</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* History Sheet - Click Name to View */}
      <AdminSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title="預約紀錄"
        description={viewingMember?.name ? `${viewingMember.name} 的歷史行程` : ""}
      >
        <div className="space-y-0 pb-12 relative">
          {(!viewingMember?.bookings || viewingMember.bookings.length === 0) ? (
            <div className="text-center py-20 bg-surface/30 rounded-3xl border border-dashed border-border/40">
              <History size={32} className="mx-auto mb-4 text-muted-foreground opacity-20" />
              <p className="text-sm text-muted-foreground italic">目前尚無預約紀錄</p>
            </div>
          ) : (
            <div className="space-y-3">
              {viewingMember.bookings.map((booking) => (
                <div key={booking.id} className="grid gap-2 pb-2 border-b border-border">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground/70">
                      {format(new Date(booking.startTime), 'yyyy/MM/dd')}
                    </span>
                    <span className={`admin-tag ${getStatusColor(booking.status)}`}>
                      {statusMap[booking.status]}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm font-bold">
                    <span>{booking.service?.name}</span>
                    <span className="text-primary">
                      ${booking.service?.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      {format(new Date(booking.startTime), 'HH:mm')}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={12} />
                      {booking.location?.name}
                    </div>
                  </div>

                  {booking.notes && (
                    <div className="px-2 py-1 bg-surface/50 rounded-md">
                      <p className="text-xs italic">
                        備註：{booking.notes}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </AdminSheet>

      {/* Edit Modal - Center Backdrop */}
      <AdminModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="編輯會員"
        formId="edit-member-form"
        isLoading={isSaving}
      >
        <form id="edit-member-form" onSubmit={handleSaveMember} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ModalField label="會員">
              <ModalInput readOnly value={editingMember?.name || ""} />
            </ModalField>
            <ModalField label="電話">
              <ModalInput readOnly value={editingMember?.phone || ""} />
            </ModalField>
            <ModalField label="Email">
              <ModalInput readOnly value={editingMember?.email || ""} />
            </ModalField>
            <ModalField label="生日">
              <ModalInput
                value={editingMember?.birthday || ""}
                placeholder="YYYY-MM-DD"
                onChange={(e) => setEditingMember({ ...editingMember, birthday: e.target.value })}
              />
            </ModalField>
            <ModalField label="等級">
              <ModalSelect
                value={editingMember?.level || "一般會員"}
                onChange={(e) => setEditingMember({ ...editingMember, level: e.target.value })}
              >
                <option>一般會員</option>
                <option>白金會員</option>
                <option>VIP會員</option>
              </ModalSelect>
            </ModalField>
            <ModalField label="狀態">
              <ModalSelect
                value={editingMember?.status || "啟用中"}
                onChange={(e) => setEditingMember({ ...editingMember, status: e.target.value })}
              >
                <option>啟用中</option>
                <option>停用</option>
                <option>黑名單</option>
              </ModalSelect>
            </ModalField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ModalField label="點數">
              <ModalInput
                type="number"
                value={editingMember?.points || 0}
                onChange={(e) => setEditingMember({ ...editingMember, points: parseInt(e.target.value) || 0 })}
              />
            </ModalField>
          </div>

          <ModalField label="小筆記">
            <ModalTextarea
              rows={4}
              value={editingMember?.memberNotes || ""}
              onChange={(e) => setEditingMember({ ...editingMember, memberNotes: e.target.value })}
            />
          </ModalField>
        </form>
      </AdminModal>

      {/* Delete Confirmation Modal */}
      <AdminModal
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="確認刪除會員？"
        confirmText="確定刪除"
        confirmVariant="destructive"
        isLoading={isSaving}
        maxWidth="max-w-md"
      >
        <div className="space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} />
          </div>
          <div className="text-center space-y-2">
            <p className="text-sm font-medium px-4">
              此操作將永久刪除 <span className="font-bold text-rose-500">{initialMembers.find(m => m.id === memberToDelete)?.name}</span> 的所有資料與紀錄，且無法復原。
            </p>
          </div>
        </div>
      </AdminModal>
    </main>
  );
}

function StatCard({ title, value, unit, trend, icon }: { title: string, value: string, unit: string, trend: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-6 border border-border/40 shadow-sm group hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-2xl bg-surface flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs">
          <TrendingUp size={10} />
          {trend}
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest mb-1">{title}</p>
        <div className="flex items-baseline gap-1">
          <h4 className="text-2xl font-black">{value}</h4>
          <span className="text-xs">{unit}</span>
        </div>
        <p className="text-xs mt-2 font-medium">較上月 <span className="text-emerald-600">{trend}</span></p>
      </div>
    </div>
  );
}
