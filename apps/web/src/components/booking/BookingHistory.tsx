"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { useAuth } from "@/contexts/AuthContext";
import { CompleteProfileForm } from "@/components/auth/CompleteProfileForm";
import Image from "next/image";
import bgImg2 from "@/assets/background_2.png";

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

  // Profile guard: require phone and birthday before they can book
  if (!user.phone || !user.birthday) {
    return (
      <div className="animate-fade-in pt-8">
        <CompleteProfileForm />
      </div>
    );
  }

  const getStatusTag = (status: HistoryBooking["status"]) => {
    switch (status) {
      case "PENDING":
        return <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-600 border border-yellow-500/20">待匯款</span>;
      case "CONFIRMED":
        return <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 border border-green-500/20">預約成功</span>;
      case "CANCELLED":
        return <span className="px-3 py-1 rounded-full bg-gray-500/10 text-gray-600 border border-gray-500/20">已取消</span>;
      case "DONE":
        return <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20">已完成</span>;
      case "MISSED":
        return <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-600 border border-red-500/20">未出席</span>;
      default:
        return <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground">{status}</span>;
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
        <h2>我的預約紀錄</h2>
        <p>查看您的歷史預約與待付款項目</p>
        <div className='flex flex-col items-center gap-1'>
          <h5>匯款保留通知</h5>
          <div className='mt-4 bg-background rounded-xl p-4 border border-border/50 space-y-1.5 shadow-sm'>
            <p>銀行代碼：{storeInfo?.bankCode || "013"} {storeInfo?.bankName || "國泰世華"}</p>
            <p>匯款帳號：{storeInfo?.bankAccount || "1234-5678-9012-345"}</p>
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
        <div className="grid gap-6 md:grid-cols-2">
          {bookings.map((booking) => {
            const startDate = new Date(booking.startTime);
            const dateString = formatInTimeZone(startDate, "Asia/Taipei", "yyyy-MM-dd");
            const timeString = formatInTimeZone(startDate, "Asia/Taipei", "HH:mm");

            return (
              <div key={booking.id} className="relative bg-surface rounded-3xl p-6 md:p-8 border border-border/60 shadow-sm transition-all hover:shadow-md hover:border-primary/30 group">
                <div className="pl-2">
                  <div className="flex justify-between items-start mb-6 gap-4">
                    <div>
                      <h4>{booking.service.name}</h4>
                      <p>{booking.location.name}</p>
                    </div>
                    {getStatusTag(booking.status)}
                  </div>

                  <div className="bg-background/50 rounded-2xl p-4 border border-border/60 mb-6 flex flex-col sm:flex-row justify-between">
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
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mt-4">
                      <p className="font-bold text-primary mb-1 flex items-center gap-1">待匯款訂金: NT$ {(booking.service.price * 0.3).toLocaleString()}
                      </p>
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
