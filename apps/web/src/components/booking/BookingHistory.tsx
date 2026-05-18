"use client";

import { useEffect, useState } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { useAuth } from "@/contexts/AuthContext";

interface HistoryBooking {
  id: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "DONE" | "MISSED";
  startTime: string;
  location: { name: string };
  service: { name: string; price: number };
}

export function BookingHistory() {
  const { user, isInitializing } = useAuth();
  const [bookings, setBookings] = useState<HistoryBooking[]>([]);
  const [storeInfo, setStoreInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      try {
        const [bookingsRes, storeRes] = await Promise.all([
          fetch(`/api/history?customerId=${user.id}`),
          fetch(`/api/store-info`)
        ]);

        const bookingsData = await bookingsRes.json();
        const storeData = await storeRes.json();

        if (bookingsData.success) {
          setBookings(bookingsData.data);
        }
        if (storeData.success) {
          setStoreInfo(storeData.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  if (isInitializing || !user) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const getStatusTag = (status: HistoryBooking["status"]) => {
    switch (status) {
      case "PENDING":
        return <span className="admin-tag admin-tag-warning">待匯款</span>;
      case "CONFIRMED":
        return <span className="admin-tag admin-tag-success">預約成功</span>;
      case "CANCELLED":
        return <span className="admin-tag admin-tag-muted">已取消</span>;
      case "DONE":
        return <span className="admin-tag admin-tag-success">已完成</span>;
      case "MISSED":
        return <span className="admin-tag admin-tag-danger">未出席</span>;
      default:
        return <span className="admin-tag admin-tag-muted">{status}</span>;
    }
  };


  if (loading) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center p-10 space-y-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground text-sm font-medium animate-pulse">正在載入您的預約紀錄...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="mb-12 text-center animate-fade-up space-y-4">
        <p className="text-eyebrow">History</p>
        <h4>我的預約紀錄</h4>
        <p>查看您的歷史預約與待付款項目</p>
        <div className='flex flex-col items-center gap-1'>
          <h5>匯款保留通知</h5>
          <div className='mt-4 bg-background rounded-xl p-4 border border-border/50 space-y-1.5 shadow-sm'>
            <p>銀行代碼：{storeInfo?.bankCode || "-"} {storeInfo?.bankName || "(未設定)"}</p>
            <p>匯款帳號：{storeInfo?.bankAccount || "請洽店家確認"}</p>
            <p>帳戶名稱：{storeInfo?.bankAccountName || "IvysBeauty Studio"}</p>
          </div>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-surface rounded-3xl p-10 border border-border/50 text-center flex flex-col items-center">
          <h5 className="mb-2">目前沒有預約紀錄</h5>
          <p className="text-muted-foreground mb-6">您還沒有預約過任何服務，快去預約專屬服務吧！</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {bookings.map((booking) => {
            const startDate = new Date(booking.startTime);
            const dateString = formatInTimeZone(startDate, "Asia/Taipei", "yyyy-MM-dd");
            const timeString = formatInTimeZone(startDate, "Asia/Taipei", "HH:mm");

            return (
              <div key={booking.id} className="relative bg-surface rounded-3xl p-6 md:p-8 shadow-md transition-all group">
                <div className="pl-2">
                  <div className="flex justify-between items-start mb-6 gap-4">
                    <div>
                      <h6>{booking.service.name}</h6>
                      <p className="text-sm">{booking.location.name}</p>
                    </div>
                    {getStatusTag(booking.status)}
                  </div>

                  <div className="bg-background/50 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row justify-between">
                    <div>
                      <p className="text-sm mb-1">預約時間</p>
                      <p>{dateString} <span className="text-primary font-bold">{timeString}</span></p>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-sm mb-1">服務總價</p>
                      <p className="font-bold text-lg leading-none">NT$ {booking.service.price.toLocaleString()}</p>
                    </div>
                  </div>

                  {booking.status === "PENDING" && (
                    <div className="text-sm bg-background rounded-2xl p-4 mt-4 shadow-md">
                      <h6 className="text-primary mb-1">待匯款訂金: NT$ {Math.max(2000, booking.service.price * 0.3).toLocaleString()}</h6>
                      <p>提醒您，預約單送出後請於 24 小時內完成匯款，以免系統自動取消釋放名額。</p>
                    </div>
                  )}
                  {booking.status === "CONFIRMED" && (
                    <div className="mt-4 pt-4 border-t border-border/50 text-center">
                      期待您的蒞臨！若需改期請提前與我們聯繫。
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
