export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "DONE" | "MISSED";

export interface DailyHour {
  label?: string;
  dayOfWeek: number;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  hasBreak: boolean;
  breakStart: string;
  breakEnd: string;
}

export interface User {
  id?: string;
  email: string;
  name: string;
  phone?: string;
  birthday?: string;
  role?: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  imageUrls?: string[];
  isPublished?: boolean;
  openingHours?: {
    all: DailyHour[];
    overrides: Record<string, DailyHour>;
  };
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
}

export interface BookingData {
  location: Location['id'] | null;
  service: Service['id'] | null;
  price: Service['price'];
  date: string | null;
  time: string | null;
  customerName: User['name'];
  customerPhone: User['phone'];
  remarks: string;
}


