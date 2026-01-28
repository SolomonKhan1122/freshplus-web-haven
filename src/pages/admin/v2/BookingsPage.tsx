import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout, { TopBar } from '@/components/admin/AdminLayout';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  Clock,
  Zap,
  User,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Download,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { format, isToday, isTomorrow, parseISO } from 'date-fns';
import { BOOKING_STATUS_CONFIG, BookingStatus, ServiceType } from '@/lib/adminTypes';

interface InstantBooking {
  id: string;
  created_at: string;
  status: BookingStatus;
  service_type: ServiceType;
  service_name: string;
  service_size: number; // bedrooms
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
}

// Status Badge Component
function StatusBadge({ status }: { status: BookingStatus }) {
  const config = BOOKING_STATUS_CONFIG[status] || BOOKING_STATUS_CONFIG.pending;
  return (
    <Badge variant="outline" className={cn("font-medium", config.color, config.bgColor)}>
      {config.label}
    </Badge>
  );
}

// Date Display Component
function DateDisplay({ date, time }: { date: string; time: string }) {
  const dateObj = parseISO(date);
  const isDateToday = isToday(dateObj);
  const isDateTomorrow = isTomorrow(dateObj);

  return (
    <div className="flex flex-col">
      <span className={cn(
        "font-medium",
        isDateToday && "text-emerald-600 dark:text-emerald-400",
        isDateTomorrow && "text-blue-600 dark:text-blue-400"
      )}>
        {isDateToday ? 'Today' : isDateTomorrow ? 'Tomorrow' : format(dateObj, 'EEE, MMM d')}
      </span>
      <span className="text-xs text-muted-foreground">{time}</span>
    </div>
  );
}

export default function BookingsPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<InstantBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const pageSize = 15;

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('instant_bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error loading bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setIsLoading(false);
    }
  };

  // Filtered and paginated bookings
  const filteredBookings = useMemo(() => {
    let result = bookings;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(booking => 
        booking.first_name.toLowerCase().includes(query) ||
        booking.last_name.toLowerCase().includes(query) ||
        booking.email.toLowerCase().includes(query) ||
        booking.phone.includes(query) ||
        booking.suburb.toLowerCase().includes(query) ||
        booking.address.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(booking => booking.status === statusFilter);
    }

    // Service filter
    if (serviceFilter !== 'all') {
      result = result.filter(booking => booking.service_type === serviceFilter);
    }

    return result;
  }, [bookings, searchQuery, statusFilter, serviceFilter]);

  const paginatedBookings = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredBookings.slice(start, start + pageSize);
  }, [filteredBookings, page]);

  const totalPages = Math.ceil(filteredBookings.length / pageSize);

  const handleStatusChange = async (bookingId: string, newStatus: BookingStatus) => {
    try {
      const { error } = await supabase
        .from('instant_bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);

      if (error) throw error;

      setBookings(prev => prev.map(b => 
        b.id === bookingId ? { ...b, status: newStatus } : b
      ));
      toast.success(`Booking status updated to ${BOOKING_STATUS_CONFIG[newStatus].label}`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update booking status');
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setServiceFilter('all');
    setPage(1);
  };

  const hasActiveFilters = searchQuery || statusFilter !== 'all' || serviceFilter !== 'all';

  return (
    <AdminLayout>
      <TopBar 
        title="Instant Bookings" 
        subtitle={`${filteredBookings.length} bookings found`} 
      />
      
      <div className="p-6 space-y-6">
        {/* Filters Card */}
        <Card className="bg-white dark:bg-slate-900 border-border/50">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, phone, or location..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
                  className="pl-10 h-10"
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
                <SelectTrigger className="w-full md:w-[180px] h-10">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {Object.entries(BOOKING_STATUS_CONFIG).map(([key, config]) => (
                    <SelectItem key={key} value={key}>{config.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Service Filter */}
              <Select value={serviceFilter} onValueChange={(v) => { setServiceFilter(v); setPage(1); }}>
                <SelectTrigger className="w-full md:w-[180px] h-10">
                  <SelectValue placeholder="All Services" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="end-of-lease">End of Lease</SelectItem>
                  <SelectItem value="deep-cleaning">Deep Cleaning</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={loadBookings} className="h-10 w-10">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                {hasActiveFilters && (
                  <Button variant="outline" onClick={clearFilters} className="h-10">
                    <X className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Table */}
        <Card className="bg-white dark:bg-slate-900 border-border/50">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))}
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <Zap className="h-12 w-12 mb-4 opacity-50" />
                <p className="text-lg font-medium">No bookings found</p>
                <p className="text-sm">Try adjusting your filters</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableHead className="font-semibold">Customer</TableHead>
                    <TableHead className="font-semibold">Service</TableHead>
                    <TableHead className="font-semibold">Property</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Price</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedBookings.map((booking) => (
                    <TableRow 
                      key={booking.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => navigate(`/admin/booking/${booking.id}`)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-semibold">
                            {booking.first_name.charAt(0)}{booking.last_name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{booking.first_name} {booking.last_name}</p>
                            <p className="text-xs text-muted-foreground">{booking.suburb}, {booking.postcode}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{booking.service_name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{booking.service_type.replace('-', ' ')}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <span>{booking.service_size} bed</span>
                          <span className="text-muted-foreground">•</span>
                          <span>{booking.bathrooms} bath</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DateDisplay date={booking.preferred_date} time={booking.preferred_time} />
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-emerald-600 dark:text-emerald-400">
                          ${booking.final_price}
                        </div>
                        {booking.discount_amount > 0 && (
                          <p className="text-xs text-muted-foreground line-through">
                            ${booking.original_price}
                          </p>
                        )}
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <StatusBadge status={booking.status} />
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => navigate(`/admin/booking/${booking.id}`)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => window.open(`tel:${booking.phone}`)}>
                              <Phone className="h-4 w-4 mr-2" />
                              Call Customer
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => window.open(`mailto:${booking.email}`)}>
                              <Mail className="h-4 w-4 mr-2" />
                              Email Customer
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel className="text-xs text-muted-foreground">Change Status</DropdownMenuLabel>
                            {Object.entries(BOOKING_STATUS_CONFIG).map(([key, config]) => (
                              <DropdownMenuItem 
                                key={key}
                                onClick={() => handleStatusChange(booking.id, key as BookingStatus)}
                                disabled={booking.status === key}
                              >
                                <span className={cn("w-2 h-2 rounded-full mr-2", config.bgColor.split(' ')[0])} />
                                {config.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, filteredBookings.length)} of {filteredBookings.length}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium px-2">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
