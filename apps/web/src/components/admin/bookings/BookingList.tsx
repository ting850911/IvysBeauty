"use client";

import { format, parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { BookingStatus } from "@ivysbeauty/shared";

export interface AdminBooking {
  id: string;
  status: BookingStatus;
  startTime: string;
  location: { name: string };
  service: { name: string; price: number };
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  notes?: string;
  createdAt: string;
}

interface BookingListProps {
  bookings: AdminBooking[];
  onStatusChange: (id: string, newStatus: BookingStatus) => void;
  isLoadingAction: string | null;
}

export function BookingList({ bookings, onStatusChange, isLoadingAction }: BookingListProps) {
  if (bookings.length === 0) {
    return (
      <div className="bg-surface rounded-3xl p-10 border border-border/50 text-center flex flex-col items-center">
        <p>目前沒有符合條件的預約紀錄</p>
      </div>
    );
  }

  // 預先計算好該列表需要顯示哪些欄位（O(N) 效能優化）
  // 這樣能避免在 JSX 裡重複迭代陣列，也保證混雜狀態時 table 的 <th> 與 <td> 數量絕對一致
  const hasStatusCol = bookings.some(b => b.status === "PENDING" || b.status === "CONFIRMED");
  const hasConfirmedCol = bookings.some(b => b.status === "CONFIRMED");
  const hasPendingCol = bookings.some(b => b.status === "PENDING");
  const hasFeeCol = bookings.some(b => b.status !== "CONFIRMED" && b.status !== "PENDING");

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-2">
      {/* Mobile Cards View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {bookings.map((booking) => {
          const dateObj = parseISO(booking.startTime.toString());
          const dateString = formatInTimeZone(dateObj, "Asia/Taipei", "yyyy-MM-dd");
          const timeString = formatInTimeZone(dateObj, "Asia/Taipei", "HH:mm");

          return (
            <div key={booking.id} className="bg-secondary/40 rounded-2xl p-5 grid gap-2 shadow-sm relative">
              <div className="border-b border-border/60 pb-2 text-sm">
                {booking.location.name}
              </div>
              <div>{dateString} {timeString}</div>
              <div>{booking.customer.name} <strong className="">{booking.customer.phone || "無"}</strong></div>
              <div>{booking.service.name}</div>
              {booking.notes && (
                <div className="text-xs text-primary mt-1 truncate max-w-[190px]" title={booking.notes}>
                  {booking.notes}
                </div>
              )}

              {(booking.status == "PENDING" || booking.status == "CONFIRMED") && <div className="absolute top-3 right-2 min-w-[6rem] text-sm">
                <select
                  name={`status-${booking.id}`}
                  aria-label="更新預約狀態"
                  className="w-full bg-transparent border border-border/60 rounded-full px-3 py-1 appearance-none"
                  value={booking.status}
                  onChange={(e) => onStatusChange(booking.id, e.target.value as BookingStatus)}
                  disabled={isLoadingAction === booking.id}
                  style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
                >
                  <option value="PENDING">待確認</option>
                  <option value="CONFIRMED">已確認</option>
                  <option value="DONE">已完成</option>
                  <option value="CANCELLED">已取消</option>
                  <option value="MISSED">未出席</option>
                </select>
                {isLoadingAction === booking.id && (
                  <span className="mt-1 text-xs text-primary whitespace-nowrap">更新中...</span>
                )}
              </div>}
              <div className="absolute bottom-5 right-5 text-sm">
                {hasConfirmedCol && `應收: ${Math.max(0, booking.service.price - Math.max(2000, booking.service.price * 0.3))}元`}
                {hasPendingCol && `訂金: ${Math.max(2000, booking.service.price * 0.3)}元`}
                {hasFeeCol && `費用: ${booking.service.price}元`}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block w-full overflow-x-auto pb-4">
        <table className="w-full min-w-[800px] text-left border-collapse">
          <thead>
            <tr className="border-b border-border/60 text-sm">
              <th className="py-4 px-4 pl-6">日期 / 時間</th>
              <th className="py-4 px-4">客人</th>
              <th className="py-4 px-4">項目</th>
              <th className="py-4 px-4">地點</th>
              {hasStatusCol && <th className="py-4 px-4">狀態</th>}
              {hasConfirmedCol && <th className="py-4 px-4">應收費用</th>}
              {hasPendingCol && <th className="py-4 px-4">訂金</th>}
              {hasFeeCol && <th className="py-4 px-4">費用</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 overflow-y-auto whitespace-nowrap">
            {bookings.map((booking) => {
              const dateObj = parseISO(booking.startTime.toString());
              const dateString = formatInTimeZone(dateObj, "Asia/Taipei", "yyyy-MM-dd");
              const timeString = formatInTimeZone(dateObj, "Asia/Taipei", "HH:mm");

              return (
                <tr key={booking.id} className="group text-sm">
                  <td className="py-5 px-4 pl-6">
                    <div>{dateString}</div>
                    <div className="mt-0.5">{timeString}</div>
                  </td>
                  <td className="py-5 px-4">
                    <div>{booking.customer.name}</div>
                    <div className="mt-0.5 flex items-center gap-1 font-bold text-sm">
                      {booking.customer.phone || "無"}
                    </div>
                  </td>
                  <td className="py-5 px-4">
                    <div>{booking.service.name}</div>
                    {booking.notes && (
                      <div className="text-xs text-primary mt-1 truncate max-w-[200px]" title={booking.notes}>
                        {booking.notes}
                      </div>
                    )}
                  </td>
                  <td className="py-5 px-4">
                    {booking.location.name}
                  </td>
                  {hasStatusCol && (
                    <td className="py-5 px-4 pr-6">
                      {(booking.status == "PENDING" || booking.status == "CONFIRMED") ? (
                        <div className="relative">
                          <select
                            name={`status-${booking.id}`}
                            aria-label="更新預約狀態"
                            className="bg-transparent border border-border/60 hover:border-foreground/30 rounded-full px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer text-center w-24"
                            value={booking.status}
                            onChange={(e) => onStatusChange(booking.id, e.target.value as BookingStatus)}
                            disabled={isLoadingAction === booking.id}
                            style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center', backgroundSize: '12px' }}
                          >
                            <option value="PENDING">待確認</option>
                            <option value="CONFIRMED">已確認</option>
                            <option value="DONE">已完成</option>
                            <option value="CANCELLED">已取消</option>
                            <option value="MISSED">未出席</option>
                          </select>
                          {isLoadingAction === booking.id && (
                            <span className="absolute right-0 top-full mt-1 text-xs text-primary whitespace-nowrap">更新中...</span>
                          )}
                        </div>
                      ) : (
                        <div>-</div>
                      )}
                    </td>
                  )}
                  {hasConfirmedCol && (
                    <td className="py-5 px-4">
                      {booking.status === "CONFIRMED" ? Math.max(0, booking.service.price - Math.max(2000, booking.service.price * 0.3)) : "-"}
                    </td>
                  )}
                  {hasPendingCol && (
                    <td className="py-5 px-4">
                      {booking.status === "PENDING" ? Math.max(2000, booking.service.price * 0.3) : "-"}
                    </td>
                  )}
                  {hasFeeCol && (
                    <td className="py-5 px-4">
                      {booking.status !== "PENDING" && booking.status !== "CONFIRMED" ? booking.service.price : "-"}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
