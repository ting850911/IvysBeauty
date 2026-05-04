"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Loader2, Store, ChevronDown } from "lucide-react";
import { DailyHour as SharedDailyHour } from "@ivysbeauty/shared";

export interface DailyHour extends SharedDailyHour {
  label: string;
}

export interface ScheduleLocation {
  id: string;
  name: string;
  openingHours: DailyHour[] | null;
  vacationDays: string[];
}

interface Props {
  initialLocations: ScheduleLocation[];
}

const DEFAULT_WEEKLY_HOURS: DailyHour[] = [
  { dayOfWeek: 1, isOpen: true, openTime: "11:00", closeTime: "20:00", hasBreak: false, breakStart: "13:00", breakEnd: "14:00", label: "週一" },
  { dayOfWeek: 2, isOpen: true, openTime: "11:00", closeTime: "20:00", hasBreak: false, breakStart: "13:00", breakEnd: "14:00", label: "週二" },
  { dayOfWeek: 3, isOpen: true, openTime: "11:00", closeTime: "20:00", hasBreak: false, breakStart: "13:00", breakEnd: "14:00", label: "週三" },
  { dayOfWeek: 4, isOpen: true, openTime: "11:00", closeTime: "20:00", hasBreak: false, breakStart: "13:00", breakEnd: "14:00", label: "週四" },
  { dayOfWeek: 5, isOpen: true, openTime: "11:00", closeTime: "20:00", hasBreak: false, breakStart: "13:00", breakEnd: "14:00", label: "週五" },
  { dayOfWeek: 6, isOpen: true, openTime: "11:00", closeTime: "20:00", hasBreak: false, breakStart: "13:00", breakEnd: "14:00", label: "週六" },
  { dayOfWeek: 0, isOpen: true, openTime: "11:00", closeTime: "20:00", hasBreak: false, breakStart: "13:00", breakEnd: "14:00", label: "週日" },
];

export function SchedulesClient({ initialLocations }: Props) {
  const router = useRouter();

  const [selectedLocationId, setSelectedLocationId] = useState<string>(
    initialLocations.length > 0 ? initialLocations[0].id : ""
  );

  const selectedLoc = initialLocations.find((l) => l.id === selectedLocationId);

  // States for the currently selected location
  const [weeklyHours, setWeeklyHours] = useState<DailyHour[]>(DEFAULT_WEEKLY_HOURS);
  const [selectedVacationDates, setSelectedVacationDates] = useState<Date[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // When selected location changes, load its data
  useEffect(() => {
    if (selectedLoc) {
      if (Array.isArray(selectedLoc.openingHours)) {
        setWeeklyHours(JSON.parse(JSON.stringify(selectedLoc.openingHours)));
      } else {
        setWeeklyHours(JSON.parse(JSON.stringify(DEFAULT_WEEKLY_HOURS)));
      }
      setSelectedVacationDates(selectedLoc.vacationDays?.map((d) => new Date(d)) || []);
    }
  }, [selectedLocationId, initialLocations]); // re-run if server updates data too

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLocationId) return;

    setIsSaving(true);
    try {
      // Clean up openingHours: remove breakStart/breakEnd if hasBreak is false
      const cleanedHours = weeklyHours.map(day => {
        const cleaned = { ...day };
        if (!cleaned.hasBreak) {
          delete cleaned.breakStart;
          delete cleaned.breakEnd;
        }
        return cleaned;
      });

      const res = await fetch(`/api/admin/locations/${selectedLocationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          openingHours: cleanedHours,
          vacationDays: selectedVacationDates.map((d) => d.toISOString()),
        }),
      });

      if (res.ok) {
        router.refresh();
        alert("儲存成功");
      } else {
        const data = await res.json();
        alert(`儲存失敗: ${data.error}`);
      }
    } catch (err) {
      alert("系統錯誤");
    } finally {
      setIsSaving(false);
    }
  };

  if (!initialLocations.length) {
    return (
      <div className="max-w-5xl mx-auto py-20 text-center text-muted-foreground animate-fade-in">
        請先至「分店管理」新增至少一間分店。
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-2">
      <div className="space-y-8 animate-fade-in">
        {/* Store Selector */}
        <div className="w-full max-w-xs">
          <label className="text-sm text-foreground mb-2 block">選擇店面</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
              <Store size={16} />
            </div>
            <select
              value={selectedLocationId}
              onChange={(e) => setSelectedLocationId(e.target.value)}
              className="w-full h-10 pl-10 pr-10 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none shadow-sm cursor-pointer"
            >
              {initialLocations.map(loc => (
                <option key={loc.id} value={loc.id}>{loc.name}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-muted-foreground">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8">
          {/* Left: Weekly Hours */}
          <div className="bg-background/10 rounded-[24px] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border/50">
              <h5>常態營業時間</h5>
              <p className="text-xs max-w-md leading-relaxed">設定每週的營業時間與休息時間</p>
            </div>
            <div className="p-6">
              <div className="space-y-1 overflow-x-auto">
                {weeklyHours.map((day, idx) => (
                  <div key={day.dayOfWeek} className="flex flex-wrap lg:flex-nowrap items-center gap-3 py-3 border-b border-border/40 last:border-0">
                    {/* Day */}
                    <div className="shrink-0 text-sm text-foreground">
                      {day.label}
                    </div>
                    {/* Toggle */}
                    <div className="w-12 shrink-0">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={day.isOpen}
                        onClick={() => {
                          const newHours = [...weeklyHours];
                          newHours[idx].isOpen = !newHours[idx].isOpen;
                          setWeeklyHours(newHours);
                        }}
                        className={`relative inline-flex h-[22px] w-[38px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${day.isOpen ? "bg-primary" : "bg-muted"
                          }`}
                      >
                        <span
                          className={`pointer-events-none block h-4 w-4 rounded-full bg-background shadow-sm ring-0 transition-transform ${day.isOpen ? "translate-x-4" : "translate-x-0"
                            }`}
                        />
                      </button>
                    </div>

                    {day.isOpen ? (
                      <>
                        {/* Open/Close Time */}
                        <div className="flex items-center gap-2">
                          <input
                            type="time"
                            value={day.openTime}
                            onChange={(e) => {
                              const newHours = [...weeklyHours];
                              newHours[idx].openTime = e.target.value;
                              setWeeklyHours(newHours);
                            }}
                            className="h-9 bg-background border border-border/80 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-center shadow-sm text-foreground"
                          />
                          <span className="text-muted-foreground">-</span>
                          <input
                            type="time"
                            value={day.closeTime}
                            onChange={(e) => {
                              const newHours = [...weeklyHours];
                              newHours[idx].closeTime = e.target.value;
                              setWeeklyHours(newHours);
                            }}
                            className="h-9 bg-background border border-border/80 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-center shadow-sm text-foreground"
                          />
                        </div>

                        {/* Break Time */}
                        <div className="flex items-center gap-3 ml-auto shrink-0">
                          <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <input
                              type="checkbox"
                              checked={day.hasBreak || false}
                              onChange={(e) => {
                                const newHours = [...weeklyHours];
                                newHours[idx].hasBreak = e.target.checked;
                                if (e.target.checked && !newHours[idx].breakStart) {
                                  newHours[idx].breakStart = "13:00";
                                  newHours[idx].breakEnd = "14:00";
                                }
                                setWeeklyHours(newHours);
                              }}
                              className="w-[14px] h-[14px] rounded-[3px] border-border text-primary focus:ring-primary"
                            />
                            休息時間
                          </label>
                          <div className={`flex items-center gap-2 transition-opacity ${day.hasBreak ? "opacity-100" : "opacity-30 pointer-events-none"}`}>
                            <input
                              type="time"
                              value={day.breakStart || "13:00"}
                              onChange={(e) => {
                                const newHours = [...weeklyHours];
                                newHours[idx].breakStart = e.target.value;
                                setWeeklyHours(newHours);
                              }}
                              className="w-[100px] h-9 bg-background border border-border/80 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-center shadow-sm text-foreground"
                            />
                            <span className="text-muted-foreground">-</span>
                            <input
                              type="time"
                              value={day.breakEnd || "14:00"}
                              onChange={(e) => {
                                const newHours = [...weeklyHours];
                                newHours[idx].breakEnd = e.target.value;
                                setWeeklyHours(newHours);
                              }}
                              className="w-[100px] h-9 bg-background border border-border/80 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-center shadow-sm text-foreground"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex-1 flex items-center ml-2">
                        <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-lg">休息日</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Vacation Days Calendar */}
          <div className="bg-background/10 rounded-[24px] shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-border/50">
              <h5>非常態休假設定</h5>
              <p className="text-xs max-w-md leading-relaxed">設定特殊休假日 (可複選)</p>
            </div>
            <div className="p-6 flex flex-col items-center">
              <Calendar
                mode="multiple"
                selected={selectedVacationDates}
                onSelect={(dates) => setSelectedVacationDates((dates as Date[]) || [])}
                className="pointer-events-auto"
              />
            </div>
            {/* Selected Dates Display */}
            {selectedVacationDates.length > 0 && (
              <div className="p-4 bg-muted/30 border-t border-border/50 h-full">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">已選擇日期</span>
                  <button
                    type="button"
                    onClick={() => setSelectedVacationDates([])}
                    className="text-xs text-primary hover:text-primary/80 hover:underline cursor-pointer"
                  >
                    清除全部
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedVacationDates.sort((a, b) => a.getTime() - b.getTime()).map((date, i) => (
                    <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-primary/10 text-primary rounded-lg text-xs border border-primary/20">
                      <span>{date.getMonth() + 1}/{date.getDate()}</span>
                      <button
                        type="button"
                        onClick={() => setSelectedVacationDates(prev => prev.filter(d => d.getTime() !== date.getTime()))}
                        className="hover:text-primary/70 transition-colors cursor-pointer"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end items-center gap-3 mt-6">
          <Button variant="outline" type="button" className="rounded-full px-6 bg-background shadow-sm cursor-pointer" onClick={() => router.back()}>
            取消
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="rounded-full px-6 hover:bg-primary/90 text-primary-foreground cursor-pointer">
            {isSaving ? <Loader2 size={16} className="animate-spin mr-2" /> : null}
            儲存
          </Button>
        </div>
      </div>
    </div>
  );
}
