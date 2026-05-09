"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { CompleteProfileForm } from "@/components/auth/CompleteProfileForm";
import { BookingProcess } from "@/components/booking/BookingProcess";

export function BookingContainer() {
  const { user, isInitializing } = useAuth();

  const router = useRouter();

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
