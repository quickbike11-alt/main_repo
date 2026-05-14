export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
}

export interface Bike {
  _id: string;
  name: string;
  brand: string;
  images: string[];
  pricing: { perHour: number; perDay: number; deposit: number };
  location: { area: string; landmark: string };
  specifications: { engine: string; mileage: string; fuelType: string };
  isAvailable: boolean;
  isHourlyAvailable: boolean;
}

export interface CartItem {
  bike: Bike;
  startDate: string;
  endDate: string;
  duration: { value: number; unit: 'hours' | 'days' };
}

export interface Booking {
  _id: string;
  bookingId: string;
  bike: Bike;
  startDate: string;
  endDate: string;
  duration: { value: number; unit: string };
  totalAmount: number;
  deposit: number;
  status: string;
  payment: { status: string };
  createdAt: string;
}
