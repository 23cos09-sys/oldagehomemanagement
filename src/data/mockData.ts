import { Resident, Staff, Medication, Event, Donation, InventoryItem, Activity, User } from '@/types';

export const currentUser: User = {
  id: 'u1',
  name: 'Meera Sharma',
  email: 'meera@example.com',
  role: 'admin',
};

export const users: User[] = [
  currentUser,
  { id: 'u2', name: 'Ravi Kumar', email: 'ravi@example.com', role: 'staff' },
  { id: 'u3', name: 'Anita Desai', email: 'anita@example.com', role: 'volunteer' },
];

export const residents: Resident[] = [
  {
    id: 'r1', name: 'Kamala Devi', age: 78, gender: 'Female', roomNumber: '101',
    admissionDate: '2023-03-15', medicalConditions: ['Diabetes', 'Arthritis'],
    medications: ['Metformin 500mg', 'Ibuprofen 200mg'],
    emergencyContact: { name: 'Suresh Devi', phone: '9876543210', relation: 'Son' },
    notes: 'Prefers morning walks. Enjoys reading.', assignedStaffId: 'u2',
  },
  {
    id: 'r2', name: 'Ramesh Prasad', age: 82, gender: 'Male', roomNumber: '102',
    admissionDate: '2022-11-01', medicalConditions: ['Hypertension'],
    medications: ['Amlodipine 5mg'],
    emergencyContact: { name: 'Priya Prasad', phone: '9876543211', relation: 'Daughter' },
    notes: 'Enjoys chess and gardening.', assignedStaffId: 'u2',
  },
  {
    id: 'r3', name: 'Savitri Bai', age: 75, gender: 'Female', roomNumber: '103',
    admissionDate: '2024-01-10', medicalConditions: ['Osteoporosis'],
    medications: ['Calcium 500mg', 'Vitamin D3'],
    emergencyContact: { name: 'Amit Bai', phone: '9876543212', relation: 'Nephew' },
    notes: 'Loves music and singing bhajans.',
  },
  {
    id: 'r4', name: 'Gopal Rao', age: 88, gender: 'Male', roomNumber: '104',
    admissionDate: '2021-06-20', medicalConditions: ['Dementia', 'Heart Disease'],
    medications: ['Donepezil 10mg', 'Aspirin 75mg'],
    emergencyContact: { name: 'Lakshmi Rao', phone: '9876543213', relation: 'Wife' },
    notes: 'Requires assistance with daily activities.',
  },
  {
    id: 'r5', name: 'Padma Iyer', age: 71, gender: 'Female', roomNumber: '105',
    admissionDate: '2024-06-05', medicalConditions: ['Asthma'],
    medications: ['Salbutamol inhaler'],
    emergencyContact: { name: 'Venkat Iyer', phone: '9876543214', relation: 'Son' },
    notes: 'Active and participates in yoga sessions.',
  },
];

export const staff: Staff[] = [
  { id: 'u2', name: 'Ravi Kumar', phone: '9988776655', email: 'ravi@example.com', role: 'staff', assignedResidentIds: ['r1', 'r2'], joinDate: '2022-05-01' },
  { id: 's2', name: 'Sunita Patel', phone: '9988776656', email: 'sunita@example.com', role: 'staff', assignedResidentIds: ['r3', 'r4'], joinDate: '2023-01-15' },
  { id: 's3', name: 'Deepak Nair', phone: '9988776657', email: 'deepak@example.com', role: 'staff', assignedResidentIds: ['r5'], joinDate: '2024-02-01' },
];

export const medications: Medication[] = [
  { id: 'm1', residentId: 'r1', residentName: 'Kamala Devi', medicineName: 'Metformin 500mg', dosage: '1 tablet', schedule: 'Twice daily', time: '08:00', given: true, givenAt: '2026-03-10T08:05:00', givenBy: 'Ravi Kumar' },
  { id: 'm2', residentId: 'r1', residentName: 'Kamala Devi', medicineName: 'Ibuprofen 200mg', dosage: '1 tablet', schedule: 'After meals', time: '13:00', given: false },
  { id: 'm3', residentId: 'r2', residentName: 'Ramesh Prasad', medicineName: 'Amlodipine 5mg', dosage: '1 tablet', schedule: 'Once daily', time: '09:00', given: true, givenAt: '2026-03-10T09:02:00', givenBy: 'Ravi Kumar' },
  { id: 'm4', residentId: 'r3', residentName: 'Savitri Bai', medicineName: 'Calcium 500mg', dosage: '1 tablet', schedule: 'Once daily', time: '10:00', given: false },
  { id: 'm5', residentId: 'r3', residentName: 'Savitri Bai', medicineName: 'Vitamin D3', dosage: '1 capsule', schedule: 'Once daily', time: '10:00', given: false },
  { id: 'm6', residentId: 'r4', residentName: 'Gopal Rao', medicineName: 'Donepezil 10mg', dosage: '1 tablet', schedule: 'Once daily', time: '21:00', given: false },
  { id: 'm7', residentId: 'r4', residentName: 'Gopal Rao', medicineName: 'Aspirin 75mg', dosage: '1 tablet', schedule: 'Once daily', time: '08:00', given: true, givenAt: '2026-03-10T08:10:00', givenBy: 'Sunita Patel' },
];

export const events: Event[] = [
  { id: 'e1', name: 'Dr. Mehta Visit', date: '2026-03-12', time: '10:00', description: 'Monthly health check-up for all residents', type: 'doctor_visit', participants: ['r1', 'r2', 'r3', 'r4', 'r5'] },
  { id: 'e2', name: 'Holi Celebration', date: '2026-03-14', time: '11:00', description: 'Festival of colours with music and sweets', type: 'celebration', participants: ['r1', 'r2', 'r3', 'r5'] },
  { id: 'e3', name: 'Yoga Session', date: '2026-03-10', time: '07:00', description: 'Daily morning yoga and breathing exercises', type: 'daily_program', participants: ['r1', 'r3', 'r5'] },
  { id: 'e4', name: 'Volunteer Reading Hour', date: '2026-03-11', time: '15:00', description: 'Volunteers read stories and newspapers', type: 'volunteer', participants: ['r1', 'r4'] },
  { id: 'e5', name: 'Music Therapy', date: '2026-03-13', time: '16:00', description: 'Group music session with local musicians', type: 'daily_program', participants: ['r2', 'r3', 'r5'] },
];

export const donations: Donation[] = [
  { id: 'd1', donorName: 'Rajesh Gupta', contact: 'rajesh@email.com', amount: 50000, date: '2026-03-01', paymentMethod: 'bank_transfer' },
  { id: 'd2', donorName: 'Priya Foundation', contact: 'info@priyafoundation.org', amount: 150000, date: '2026-02-15', paymentMethod: 'cheque' },
  { id: 'd3', donorName: 'Amit Shah', contact: '9876543220', amount: 25000, date: '2026-02-28', paymentMethod: 'online' },
  { id: 'd4', donorName: 'Sundar Trust', contact: 'sundar@trust.org', amount: 200000, date: '2026-01-20', paymentMethod: 'bank_transfer' },
  { id: 'd5', donorName: 'Local Community', contact: 'community@local.org', amount: 15000, date: '2026-03-05', paymentMethod: 'cash' },
];

export const inventory: InventoryItem[] = [
  { id: 'i1', name: 'Metformin 500mg', category: 'medicine', quantity: 120, unit: 'tablets', minStock: 50, lastRestocked: '2026-03-01' },
  { id: 'i2', name: 'Blood Pressure Monitor', category: 'equipment', quantity: 3, unit: 'units', minStock: 2, lastRestocked: '2026-01-15' },
  { id: 'i3', name: 'Rice (Basmati)', category: 'food', quantity: 25, unit: 'kg', minStock: 10, lastRestocked: '2026-03-05' },
  { id: 'i4', name: 'Disposable Gloves', category: 'equipment', quantity: 8, unit: 'boxes', minStock: 15, lastRestocked: '2026-02-20' },
  { id: 'i5', name: 'Calcium 500mg', category: 'medicine', quantity: 45, unit: 'tablets', minStock: 50, lastRestocked: '2026-02-28' },
  { id: 'i6', name: 'Cooking Oil', category: 'food', quantity: 10, unit: 'litres', minStock: 5, lastRestocked: '2026-03-03' },
  { id: 'i7', name: 'Wheelchair', category: 'equipment', quantity: 4, unit: 'units', minStock: 2, lastRestocked: '2025-12-10' },
  { id: 'i8', name: 'Bandages', category: 'medicine', quantity: 12, unit: 'rolls', minStock: 20, lastRestocked: '2026-02-10' },
];

export const activities: Activity[] = [
  { id: 'a1', action: 'Medication administered', user: 'Ravi Kumar', timestamp: '2026-03-10T08:05:00', details: 'Metformin 500mg given to Kamala Devi' },
  { id: 'a2', action: 'Resident admitted', user: 'Meera Sharma', timestamp: '2026-03-09T14:30:00', details: 'New resident Padma Iyer admitted to Room 105' },
  { id: 'a3', action: 'Donation received', user: 'Meera Sharma', timestamp: '2026-03-05T11:00:00', details: '₹15,000 received from Local Community' },
  { id: 'a4', action: 'Inventory alert', user: 'System', timestamp: '2026-03-08T06:00:00', details: 'Disposable Gloves stock below minimum level' },
  { id: 'a5', action: 'Event created', user: 'Meera Sharma', timestamp: '2026-03-07T10:00:00', details: 'Holi Celebration scheduled for March 14' },
];
