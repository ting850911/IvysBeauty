"use client";

import { useState, useMemo } from "react";
import { BookingList, AdminBooking } from "../bookings/BookingList";
import { isToday, isAfter, isBefore, addDays, endOfDay, parseISO, format } from "date-fns";
import { toDate, formatInTimeZone } from "date-fns-tz";
import { zhTW } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { BookingStatus } from "@ivysbeauty/shared";

interface Props {
  initialBookings: AdminBooking[];
}

const STATUS_OPTIONS = [
  { value: "PENDING", label: "待確認" },
  { value: "CONFIRMED", label: "已確認" },
  { value: "DONE", label: "已完成" },
  { value: "CANCELLED", label: "已取消" },
  { value: "MISSED", label: "未出席" }
];

export function DashboardClient({ initialBookings }: Props) {
  const [bookings, setBookings] = useState<AdminBooking[]>(initialBookings);
  const [isLoadingAction, setIsLoadingAction] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState<string>("PENDING");
  const [locationFilter, setLocationFilter] = useState<string>("全部地點");

  const router = useRouter();

  const handleStatusChange = async (id: string, newStatus: BookingStatus) => {
    if (!confirm(`確定要將此訂單狀態更改為 ${newStatus} 嗎？`)) return;

    try {
      setIsLoadingAction(id);
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "更新失敗");
      }

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === id ? { ...booking, status: newStatus } : booking
        )
      );

      // Refresh router to potentially clear server cache
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(`更新失敗: ${err.message}`);
      }
    } finally {
      setIsLoadingAction(null);
    }
  };

  // Filters
  const locations = useMemo(() => {
    const locs = Array.from(new Set(bookings.map(b => b.location.name)));
    return ["全部地點", ...locs];
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      let statusMatch = b.status === statusFilter;

      let locMatch = true;
      if (locationFilter !== "全部地點") locMatch = b.location.name === locationFilter;

      return statusMatch && locMatch;
    });
  }, [bookings, statusFilter, locationFilter]);

  // Groupings
  const today = toDate(new Date(), { timeZone: "Asia/Taipei" });
  const nextWeekEnd = endOfDay(addDays(today, 7));

  const todayBookings = useMemo(() => {
    return filteredBookings
      .filter(b => isToday(parseISO(b.startTime.toString())))
      .sort((a, b) => parseISO(a.startTime.toString()).getTime() - parseISO(b.startTime.toString()).getTime());
  }, [filteredBookings]);

  const upcomingBookings = useMemo(() => {
    return filteredBookings
      .filter(b => {
        const date = parseISO(b.startTime.toString());
        return isAfter(date, endOfDay(today)) && isBefore(date, nextWeekEnd);
      })
      .sort((a, b) => parseISO(a.startTime.toString()).getTime() - parseISO(b.startTime.toString()).getTime());
  }, [filteredBookings, today, nextWeekEnd]);

  // Date formatted strings
  const todayFormatted = formatInTimeZone(today, "Asia/Taipei", "yyyy-MM-dd EEEE", { locale: zhTW });
  const nextWeekStartFormatted = formatInTimeZone(addDays(today, 1), "Asia/Taipei", "yyyy-MM-dd");
  const nextWeekEndFormatted = formatInTimeZone(nextWeekEnd, "Asia/Taipei", "yyyy-MM-dd");

  const isListView = statusFilter !== "CONFIRMED";
  const currentStatusOption = STATUS_OPTIONS.find(opt => opt.value === statusFilter);
  const currentStatusLabel = currentStatusOption?.label || statusFilter;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in py-2">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap gap-2 pb-2 sm:pb-0 w-full">
          {STATUS_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setStatusFilter(opt.value)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm transition-colors ${statusFilter === opt.value
                ? "bg-surface text-primary"
                : "bg-surface/50 text-muted-foreground"
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-nowrap text-muted-foreground tracking-wider">地點</span>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="cursor-pointer bg-transparent border border-border/60 rounded-full px-5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer hover:border-foreground/30 transition-colors pr-8"
            style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '14px' }}
          >
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-16 animate-fade-in">
        {isListView ? (
          <section>
            <div className="flex justify-between items-end border-b border-border/40 pb-4 mb-4">
              <div>
                <p className="text-eyebrow">
                  {statusFilter}
                </p>
                <div className="flex items-baseline gap-3">
                  <h4>{currentStatusLabel}清單</h4>
                </div>
              </div>
              <div className="text-muted-foreground text-sm flex items-center justify-center font-serif text-lg">
                {filteredBookings.length}
              </div>
            </div>
            <BookingList
              bookings={[...filteredBookings].sort((a, b) => parseISO(b.startTime.toString()).getTime() - parseISO(a.startTime.toString()).getTime())}
              onStatusChange={handleStatusChange}
              isLoadingAction={isLoadingAction}
            />
          </section>
        ) : (
          <>
            {/* Today Section */}
            <section>
              <div className="flex justify-between items-end border-b border-border/40 pb-4 mb-4">
                <div>
                  <p className="text-eyebrow">TODAY</p>
                  <div className="flex items-baseline gap-3">
                    <h4>今日預約</h4>
                    <span className="text-xs text-muted-foreground tracking-wide">{todayFormatted}</span>
                  </div>
                </div>
                <div className="text-muted-foreground text-sm flex items-center justify-center font-serif text-lg">
                  {todayBookings.length}
                </div>
              </div>

              <BookingList
                bookings={todayBookings}
                onStatusChange={handleStatusChange}
                isLoadingAction={isLoadingAction}
              />
            </section>

            {/* Upcoming Section */}
            <section>
              <div className="flex justify-between items-end border-b border-border/40 pb-4 mb-4">
                <div>
                  <p className="text-eyebrow">UPCOMING</p>
                  <div className="flex items-baseline gap-3">
                    <h4>未來一週</h4>
                    <span className="text-xs text-muted-foreground tracking-wide">{nextWeekStartFormatted} ~ {nextWeekEndFormatted}</span>
                  </div>
                </div>
                <div className="text-muted-foreground text-sm flex items-center justify-center font-serif text-lg">
                  {upcomingBookings.length}
                </div>
              </div>

              <BookingList
                bookings={upcomingBookings}
                onStatusChange={handleStatusChange}
                isLoadingAction={isLoadingAction}
              />
            </section>
          </>
        )}
      </div>
    </div>
  );
}
