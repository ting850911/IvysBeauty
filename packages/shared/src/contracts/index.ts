import type { Booking, Location, Service, User } from '@ivysbeauty/database';

export interface AvailableSlotResponse {
  date: string; // YYYY-MM-DD
  slots: {
    startTime: string; // ISO String
    endTime: string;   // ISO String
    available: boolean;
  }[];
}

// 包含 Relation 回傳的完整 Booking 面貌
export interface BookingResponse extends Booking {
  service: Service;
  location: Location;
  customer: Pick<User, 'id' | 'name' | 'phone' | 'email'>;
}

export interface UploadResponse {
  url: string;
}

export * from "./models";
