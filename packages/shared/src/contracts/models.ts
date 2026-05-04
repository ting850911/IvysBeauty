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


