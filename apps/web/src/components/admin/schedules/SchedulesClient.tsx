'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Store,
  Calendar,
  Save,
  X,
  Loader2
} from 'lucide-react';
import { AdminModal } from '../shared/AdminModal';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  getDay,
  startOfWeek,
  endOfWeek
} from 'date-fns';

export interface DailyHour {
  dayOfWeek: number;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  hasBreak: boolean;
  breakStart: string;
  breakEnd: string;
  label?: string;
}

export interface ScheduleLocation {
  id: string;
  name: string;
  openingHours: {
    all: DailyHour[];
    overrides: Record<string, DailyHour>;
  };
}

interface SchedulesClientProps {
  initialLocations: ScheduleLocation[];
}

const WEEKDAY_LABELS = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];

export function SchedulesClient({ initialLocations }: SchedulesClientProps) {
  const [selectedLocationId, setSelectedLocationId] = useState(initialLocations[0]?.id);
  const selectedLoc = useMemo(() =>
    initialLocations.find(l => l.id === selectedLocationId)
    , [selectedLocationId, initialLocations]);

  const [allHours, setAllHours] = useState<DailyHour[]>([]);
  const [overrides, setOverrides] = useState<Record<string, DailyHour>>({});
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [isSaving, setIsSaving] = useState(false);
  const [editingDate, setEditingDate] = useState<Date | null>(null);
  const [dateConfig, setDateConfig] = useState<DailyHour | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      const monthStr = format(currentMonth, 'yyyy-MM');
      try {
        const res = await fetch(`/api/admin/schedules?locationId=${selectedLocationId}&month=${monthStr}`);
        if (res.ok) {
          const data = await res.json();
          const rawAll = data.all || [];
          
          // Ensure we have 7 days initialized
          const finalAll = [1, 2, 3, 4, 5, 6, 0].map(dow => {
            const existing = rawAll.find((h: any) => h.dayOfWeek === dow);
            return existing || {
              dayOfWeek: dow,
              isOpen: true,
              openTime: "11:00",
              closeTime: "20:00",
              hasBreak: false,
              breakStart: "12:00",
              breakEnd: "13:00"
            };
          });
          
          setAllHours(finalAll);
          setOverrides(data.overrides || {});
        }
      } catch (error) {
        console.error("Failed to fetch schedule:", error);
      }
    };

    if (selectedLocationId) {
      fetchSchedule();
    }
  }, [selectedLocationId, currentMonth]);

  const handleSave = async () => {
    setIsSaving(true);
    const monthStr = format(currentMonth, 'yyyy-MM');
    try {
      const res = await fetch(`/api/admin/schedules`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locationId: selectedLocationId,
          month: monthStr,
          all: allHours,
          overrides
        }),
      });
      if (res.ok) {
        alert("排程設定已儲存");
      }
    } catch (error) {
      alert("儲存失敗");
    } finally {
      setIsSaving(false);
    }
  };

  const getDayConfig = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    if (overrides[dateStr]) return overrides[dateStr];
    const dow = getDay(date);
    return allHours?.find(h => h.dayOfWeek === dow);
  };

  const openDatePopup = (date: Date) => {
    const config = getDayConfig(date);
    if (config) {
      setEditingDate(date);
      setDateConfig({ ...config });
    }
  };

  const saveDateOverride = () => {
    if (!editingDate || !dateConfig) return;
    const dateStr = format(editingDate, "yyyy-MM-dd");
    setOverrides(prev => ({ ...prev, [dateStr]: dateConfig }));
    setEditingDate(null);
  };

  // Calendar Helpers
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const locationOptions = initialLocations.map((loc) => (
    <option key={loc.id} value={loc.id}>
      {loc.name}
    </option>
  ));

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocationId(e.target.value);
  };


  if (!selectedLoc) return null;

  return (
    <main className="max-w-5xl mx-auto py-2">
      {/* Top Header */}
      <div className='mb-6'>
        <select
          name={`location`}
          aria-label="選擇據點"
          className="w-fit h-10 bg-white rounded-full px-6 pr-10 shadow-sm appearance-none cursor-pointer transition-all outline-none"
          value={selectedLocationId}
          onChange={handleLocationChange}
          style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '14px' }}
        >
          {locationOptions}
        </select>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left: Main Calendar */}
        <div className="flex-1 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-center gap-2 p-2">
            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 text-primary/60 hover:text-primary cursor-pointer"><ChevronLeft size={16} /></button>
            <p className='text-primary'>{format(currentMonth, 'yyyy / MM')}</p>
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 text-primary/60 hover:text-primary cursor-pointer"><ChevronRight size={16} /></button>
          </div>

          <div className="grid grid-cols-7 border-b border-border/50 bg-muted/30">
            {WEEKDAY_LABELS.map(label => (
              <div key={label} className="py-3 text-center text-sm">{label}</div>
            ))}
          </div>

          <div className="flex-1 grid grid-cols-7">
            {calendarDays.map((day) => {
              const config = getDayConfig(day);
              const isCurrentMonth = isSameMonth(day, monthStart);
              const isToday = isSameDay(day, new Date());
              const isOff = config && !config.isOpen;

              return (
                <div
                  key={day.toString()}
                  onClick={() => isCurrentMonth && openDatePopup(day)}
                  className={`relative p-2 border-b border-r border-border/50 transition-all duration-200 ${!isCurrentMonth ? "opacity-40 grayscale pointer-events-none" : "hover:bg-primary/5 cursor-pointer"}`}
                >
                  <span className={`text-xs ${isToday ? "text-primary bg-muted/60 w-6 h-6 rounded-full flex items-center justify-center" : ""}`}>{format(day, 'd')}</span>
                  {isCurrentMonth && config && (
                    <div className="mt-2 space-y-1">
                      {isOff ? (
                        <div className="text-xs py-1 px-1.5 rounded-md text-center border-muted border border-dashed text-muted-foreground">休息</div>
                      ) : (
                        <>
                          <div className="text-xs bg-[#F0F7F0] text-[#2D5A27] border border-[#D5E6D5]/50 whitespace-nowrap overflow-hidden text-ellipsis px-1 rounded-sm">
                            {config.openTime?.slice(0, 5)} - {config.closeTime?.slice(0, 5)}
                          </div>
                          {config.hasBreak && (
                            <div className="text-xs bg-[#FFF4E6] text-[#A35200] border border-[#FFE8CC]/50 whitespace-nowrap overflow-hidden text-ellipsis px-1 rounded-sm">
                              {config.breakStart?.slice(0, 5)} - {config.breakEnd?.slice(0, 5)}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar: All (Monthly Template) */}
        <div className="w-full lg:w-[320px] shrink-0 space-y-6">
          <div className="bg-background rounded-3xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3"><Store className="text-primary" size={18} /><h6>固定週休日</h6></div>
            <div className="grid grid-cols-4 gap-2.5">
              {[1, 2, 3, 4, 5, 6, 0].map(dow => {
                const config = (allHours || []).find(h => h.dayOfWeek === dow);
                const isOff = config && !config.isOpen;
                return (
                  <button key={dow} onClick={() => {
                    const n = [...allHours];
                    const idx = n.findIndex(h => h.dayOfWeek === dow);
                    if (idx > -1) n[idx].isOpen = !n[idx].isOpen;
                    setAllHours(n);
                  }} className={`rounded-3xl text-sm p-1 cursor-pointer transition-colors ${isOff ? "bg-primary text-white" : "bg-muted hover:bg-muted/80"}`}>{WEEKDAY_LABELS[dow]}</button>
                );
              })}
            </div>
          </div>

          <div className="bg-background rounded-3xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-3"><Clock size={18} className="text-primary" /><h6>固定營業時間</h6></div>
            <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3">
              <div className="flex flex-col gap-2">
                <label className="text-xs">開始時間</label>
                <input type="time" value={(allHours.find(h => h.isOpen)?.openTime || "11:00").slice(0, 5)} onChange={(e) => setAllHours(prev => prev.map(h => ({ ...h, openTime: e.target.value })))} className="h-9 bg-white border border-border/80 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-center shadow-sm" />
              </div>
              <div className="pb-2.5">-</div>
              <div className="flex flex-col gap-2">
                <label className="text-xs">結束時間</label>
                <input type="time" value={(allHours.find(h => h.isOpen)?.closeTime || "20:00").slice(0, 5)} onChange={(e) => setAllHours(prev => prev.map(h => ({ ...h, closeTime: e.target.value })))} className="h-9 bg-white border border-border/80 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-center shadow-sm" />
              </div>
            </div>
          </div>

          <div className="bg-background rounded-3xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-primary" />
                <h6>固定午休時間</h6>
              </div>
              <input
                type="checkbox"
                checked={allHours.length > 0 && allHours.every(h => !h.isOpen || h.hasBreak)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setAllHours(prev => prev.map(h => ({ ...h, hasBreak: isChecked })));
                }}
                className="w-5 h-5 rounded border-border text-primary accent-primary cursor-pointer"
              />
            </div>
            <div className={`grid grid-cols-[1fr_auto_1fr] items-end gap-3 transition-all duration-300 ${allHours.some(h => h.hasBreak) ? "opacity-100" : "opacity-30 pointer-events-none grayscale"}`}>
              <div className="flex flex-col gap-2"><label className="text-xs">開始時間</label><input type="time" value={(allHours.find(h => h.hasBreak)?.breakStart || "12:00").slice(0, 5)} onChange={(e) => setAllHours(prev => prev.map(h => ({ ...h, breakStart: e.target.value, hasBreak: true })))} className="h-9 bg-white border border-border/80 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-center shadow-sm" /></div>
              <div className="pb-2.5">-</div>
              <div className="flex flex-col gap-2"><label className="text-xs">結束時間</label><input type="time" value={(allHours.find(h => h.hasBreak)?.breakEnd || "13:00").slice(0, 5)} onChange={(e) => setAllHours(prev => prev.map(h => ({ ...h, breakEnd: e.target.value, hasBreak: true })))} className="h-9 bg-white border border-border/80 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-center shadow-sm" /></div>
            </div>
          </div>

          <div className="pt-6 flex md:justify-end justify-center">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="gap-2 rounded-full px-8 shadow-lg shadow-accent-primary/10"
            >
              {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {isSaving ? "儲存中..." : "儲存 "}
            </Button>
          </div>
        </div>
      </div>

      {/* Date Override Modal */}
      <AdminModal
        isOpen={!!editingDate}
        onClose={() => setEditingDate(null)}
        onConfirm={saveDateOverride}
        title={editingDate ? `${format(editingDate, "yyyy/MM/dd")}` : ""}
        maxWidth="max-w-md"
        confirmText="儲存"
      >
        {dateConfig && (
          <div className="space-y-6">
            {/* Status Toggle */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${!dateConfig.isOpen ? "bg-primary text-white" : "bg-white shadow-sm"}`}>
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold">是否營業</p>
                  <p className="text-xs text-muted-foreground">{dateConfig.isOpen ? "營業中" : "休假"}</p>
                </div>
              </div>
              <button
                onClick={() => setDateConfig({ ...dateConfig, isOpen: !dateConfig.isOpen })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${dateConfig.isOpen ? "bg-primary" : "bg-muted"}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${dateConfig.isOpen ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>

            <div className={`space-y-6 transition-all duration-300 ${!dateConfig.isOpen ? "opacity-30 pointer-events-none grayscale" : "opacity-100"}`}>
              {/* Business Hours */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <Clock size={16} /> 營業時段
                </div>
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                  <input
                    type="time"
                    value={dateConfig.openTime?.slice(0, 5)}
                    onChange={(e) => setDateConfig({ ...dateConfig, openTime: e.target.value })}
                    className="h-9 bg-white border border-border/80 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-center shadow-sm text-foreground"
                  />
                  <span className="text-muted-foreground">-</span>
                  <input
                    type="time"
                    value={dateConfig.closeTime?.slice(0, 5)}
                    onChange={(e) => setDateConfig({ ...dateConfig, closeTime: e.target.value })}
                    className="h-9 bg-white border border-border/80 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-center shadow-sm text-foreground"
                  />
                </div>
              </div>

              {/* Break Time */}
              <div className="pt-4 border-t border-border/50 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <Clock size={16} /> 休息時段
                  </div>
                  <input
                    type="checkbox"
                    checked={dateConfig.hasBreak}
                    onChange={(e) => setDateConfig({ ...dateConfig, hasBreak: e.target.checked })}
                    className="w-5 h-5 rounded border-border text-primary accent-primary cursor-pointer"
                  />
                </div>

                <div className={`grid grid-cols-[1fr_auto_1fr] items-center gap-3 transition-all ${!dateConfig.hasBreak ? "opacity-30 pointer-events-none" : ""}`}>
                  <input
                    type="time"
                    value={dateConfig.breakStart?.slice(0, 5)}
                    onChange={(e) => setDateConfig({ ...dateConfig, breakStart: e.target.value })}
                    className="h-9 bg-white border border-border/80 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-center shadow-sm text-foreground"
                  />
                  <span className="text-muted-foreground">-</span>
                  <input
                    type="time"
                    value={dateConfig.breakEnd?.slice(0, 5)}
                    onChange={(e) => setDateConfig({ ...dateConfig, breakEnd: e.target.value })}
                    className="h-9 bg-white border border-border/80 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-center shadow-sm text-foreground"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </AdminModal>
    </main>
  );
}
