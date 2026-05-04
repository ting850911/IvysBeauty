export interface AdminStoreInfo {
  phone: string | null;
  line: string | null;
  instagram: string | null;
  facebook: string | null;
  bankCode: string | null;
  bankName: string | null;
  bankAccount: string | null;
  bankAccountName: string | null;
}

export interface AdminLocation {
  id: string;
  name: string;
  address: string;
  imageUrls?: string[];
  isPublished: boolean;
  openingHours: any;
  vacationDays: string[];
}

export interface LocationOption {
  id: string;
  name: string;
}

export interface AdminService {
  id: string;
  name: string;
  price: number;
  duration: number;
  isPublished: boolean;
  locations: LocationOption[];
}
