export type UserRole = 'admin' | 'staff' | 'client';

export interface User {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  status: 'active' | 'blocked';
  createdAt?: string; // stored as timestamp in Firestore, string in frontend state
}

export interface Vehicle {
  id: string;
  model: string;
  brand: string;
  category: string;
  pricePerDay: number;
  imageUrl: string;
  description: string;
  transmission: 'Automático' | 'Manual';
  seats: number;
  isAvailable: boolean;
}

export interface SearchParams {
  location: string;
  pickupDate: string;
  returnDate: string;
}