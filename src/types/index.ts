export type UserRole = 'admin' | 'staff' | 'volunteer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Resident {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  photo?: string;
  roomNumber: string;
  admissionDate: string;
  medicalConditions: string[];
  medications: string[];
  emergencyContact: { name: string; phone: string; relation: string };
  notes: string;
  assignedStaffId?: string;
}

export interface Staff {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  assignedResidentIds: string[];
  joinDate: string;
}

export interface Medication {
  id: string;
  residentId: string;
  residentName: string;
  medicineName: string;
  dosage: string;
  schedule: string;
  time: string;
  given: boolean;
  givenAt?: string;
  givenBy?: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  description: string;
  type: 'doctor_visit' | 'volunteer' | 'celebration' | 'daily_program';
  participants: string[];
}

export interface Donation {
  id: string;
  donorName: string;
  contact: string;
  amount: number;
  date: string;
  paymentMethod: 'cash' | 'bank_transfer' | 'cheque' | 'online';
  notes?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'medicine' | 'food' | 'equipment';
  quantity: number;
  unit: string;
  minStock: number;
  lastRestocked: string;
}

export interface Activity {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
}
