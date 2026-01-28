// Admin Dashboard Types

// Booking Statuses
export type BookingStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'assigned' 
  | 'on_the_way' 
  | 'in_progress' 
  | 'quality_check' 
  | 'completed' 
  | 'cancelled' 
  | 'rescheduled';

export const BOOKING_STATUS_CONFIG: Record<BookingStatus, { label: string; color: string; bgColor: string }> = {
  pending: { label: 'Pending', color: 'text-amber-700', bgColor: 'bg-amber-50 border-amber-200' },
  confirmed: { label: 'Confirmed', color: 'text-blue-700', bgColor: 'bg-blue-50 border-blue-200' },
  assigned: { label: 'Assigned', color: 'text-indigo-700', bgColor: 'bg-indigo-50 border-indigo-200' },
  on_the_way: { label: 'On the Way', color: 'text-purple-700', bgColor: 'bg-purple-50 border-purple-200' },
  in_progress: { label: 'In Progress', color: 'text-cyan-700', bgColor: 'bg-cyan-50 border-cyan-200' },
  quality_check: { label: 'Quality Check', color: 'text-teal-700', bgColor: 'bg-teal-50 border-teal-200' },
  completed: { label: 'Completed', color: 'text-emerald-700', bgColor: 'bg-emerald-50 border-emerald-200' },
  cancelled: { label: 'Cancelled', color: 'text-red-700', bgColor: 'bg-red-50 border-red-200' },
  rescheduled: { label: 'Rescheduled', color: 'text-orange-700', bgColor: 'bg-orange-50 border-orange-200' },
};

// Service Types
export type ServiceType = 'residential' | 'end-of-lease' | 'deep-cleaning' | 'commercial';

// Instant Booking
export interface InstantBooking {
  id: string;
  created_at: string;
  status: BookingStatus;
  service_type: ServiceType;
  service_name: string;
  bedrooms: number;
  bathrooms: number;
  property_type: string;
  furnished: string | null;
  selected_extras: Record<string, number>;
  original_price: number;
  discount_amount: number;
  final_price: number;
  preferred_date: string;
  preferred_time: string;
  same_day_booking: boolean;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  suburb: string;
  postcode: string;
  comments: string | null;
  assigned_cleaner_id: string | null;
  internal_notes: string | null;
}

// Cleaner
export interface Cleaner {
  id: string;
  user_id: string | null;
  full_name: string;
  email: string;
  phone: string;
  hourly_rate: number;
  status: 'active' | 'inactive' | 'on_leave';
  profile_photo: string | null;
  notes: string | null;
  skills: string[];
  rating: number;
  total_jobs: number;
  created_at: string;
  updated_at: string;
}

// Cleaner Assignment
export interface CleanerAssignment {
  id: string;
  booking_id: string;
  cleaner_id: string;
  assigned_at: string;
  status: 'assigned' | 'started' | 'completed' | 'cancelled';
  notes: string | null;
  earnings: number;
  cleaner?: Cleaner;
}

// Customer
export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string | null;
  suburb: string | null;
  postcode: string | null;
  notes: string | null;
  tags: string[];
  total_bookings: number;
  total_spent: number;
  created_at: string;
  updated_at: string;
}

// Invoice
export interface Invoice {
  id: string;
  booking_id: string;
  customer_id: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  due_date: string;
  paid_date: string | null;
  pdf_url: string | null;
  created_at: string;
  updated_at: string;
}

// Activity Log
export interface ActivityLog {
  id: string;
  user_id: string | null;
  action_type: string;
  entity_type: string;
  entity_id: string;
  details: Record<string, any>;
  created_at: string;
  user?: {
    full_name: string;
    email: string;
  };
}

// Dashboard Stats
export interface DashboardStats {
  totalInstantBookings: number;
  pendingInstantBookings: number;
  confirmedToday: number;
  inProgressToday: number;
  completedThisWeek: number;
  instantBookingsRevenue: number;
  revenueThisMonth: number;
  activeCleaners: number;
  totalCustomers: number;
  newCustomersThisMonth: number;
}

// Analytics Data
export interface AnalyticsData {
  bookingsByService: { name: string; value: number }[];
  revenueByMonth: { month: string; revenue: number }[];
  bookingsByStatus: { status: string; count: number }[];
  topCleaners: { name: string; jobs: number; rating: number }[];
  conversionRate: number;
  averageBookingValue: number;
  popularExtras: { name: string; count: number }[];
}

// User Role
export type UserRole = 'admin' | 'manager' | 'dispatcher' | 'cleaner';

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  permissions: string[];
  is_active: boolean;
  created_at: string;
  last_login: string | null;
}

// Permission Configuration
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: ['*'], // Full access
  manager: [
    'bookings:view', 'bookings:edit', 'bookings:assign',
    'cleaners:view', 'cleaners:edit',
    'customers:view', 'customers:edit',
    'analytics:view',
    'settings:view',
  ],
  dispatcher: [
    'bookings:view', 'bookings:assign',
    'cleaners:view',
    'customers:view',
  ],
  cleaner: [
    'bookings:view_own',
    'profile:edit_own',
  ],
};

// Filter Options
export interface BookingFilters {
  status?: BookingStatus[];
  serviceType?: ServiceType[];
  dateRange?: { from: Date; to: Date };
  search?: string;
  cleanerId?: string;
}

// Pagination
export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

// Sort Options
export interface SortState {
  column: string;
  direction: 'asc' | 'desc';
}
