'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { BookingData, Location, Service } from '@ivysbeauty/shared';

const INITIAL_DATA: BookingData = {
  location: null,
  service: null,
  price: 0,
  date: null,
  time: null,
  customerName: '',
  customerPhone: '',
  remarks: '',
};

interface BookingContextType {
  data: BookingData;
  step: number;
  isFetchingSlots: boolean;
  updateLocation: (id: Location['id']) => void;
  updateService: (id: Service['id'], price: number) => void;
  updateDateTime: (date: string | null, time: string | null) => void;
  updateCustomerInfo: (info: Partial<BookingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<BookingData>({
    location: null,
    service: null,
    price: 0,
    date: null,
    time: null,
    customerName: '',
    customerPhone: '',
    remarks: '',
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [isFetchingSlots, setIsFetchingSlots] = useState(false);

  // 1. 更新地點 ID
  const updateLocation = (id: string) => {
    setData((prev) => ({ ...prev, location: id, date: null, time: null }));
  };

  // 2. 更新服務 ID
  const updateService = (id: string, price: number) => {
    setData((prev) => ({ ...prev, service: id, price, date: null, time: null }));
  };

  // 3. 更新時間
  const updateDateTime = (date: string | null, time: string | null) => {
    setData((prev) => ({ ...prev, date, time }));
  };

  // 4. 更新客戶基本資訊
  const updateCustomerInfo = (info: Partial<BookingData>) => {
    setData((prev) => ({ ...prev, ...info }));
  };

  // 5. 抓取可用時段 (邏輯從原本的 useEffect 移過來)
  useEffect(() => {
    if (data.location && data.service && data.date) {
      const fetchSlots = async () => {
        setIsFetchingSlots(true);
        try {
          const res = await fetch(
            `/api/booking/available-slots?locationId=${data.location}&serviceId=${data.service}&date=${data.date}`
          );
          const json = await res.json();
          setAvailableSlots(json.slots || []);
        } finally {
          setIsFetchingSlots(false);
        }
      };
      fetchSlots();
    }
  }, [data.location, data.service, data.date]);

  return (
    <BookingContext.Provider
      value={{
        data,
        step,
        isFetchingSlots,
        updateLocation,
        updateService,
        updateDateTime,
        updateCustomerInfo,
        nextStep: () => setStep((s) => s + 1),
        prevStep: () => setStep((s) => s - 1),
        resetBooking: () => {
          setStep(1);
          setData({ ...INITIAL_DATA });
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within BookingProvider');
  return context;
};
