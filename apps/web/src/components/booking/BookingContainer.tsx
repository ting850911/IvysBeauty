"use client";

import { useAuth } from "@/contexts/AuthContext";
import { BookingProcess } from "@/components/booking/BookingProcess";

export function BookingContainer() {
  const { user, isInitializing } = useAuth();

  if (isInitializing || !user) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Once authenticated and profile is fully completed
  return (
    <div className="space-y-10 animate-fade-in">
      <div className="mb-12 text-center animate-fade-up space-y-4">
        <p className="text-eyebrow">Reservation</p>
        <h4>線上預約</h4>
        <p>請跟隨下方步驟，完成預約</p>
      </div>

      <BookingProcess />
    </div>
  );
}
