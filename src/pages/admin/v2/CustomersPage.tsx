import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout, { TopBar } from '@/components/admin/AdminLayout';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Search, 
  Phone, 
  Mail, 
  MapPin,
  DollarSign,
  Calendar,
  UserCircle,
  Users,
  TrendingUp,
  Star,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  suburb: string;
  total_bookings: number;
  total_spent: number;
  last_booking: string;
}

export default function CustomersPage() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 15;

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setIsLoading(true);
      
      // Get customers from instant_bookings (aggregated)
      const { data: bookings, error } = await supabase
        .from('instant_bookings')
        .select('first_name, last_name, email, phone, suburb, final_price, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Aggregate by email
      const customerMap = new Map<string, Customer>();
      bookings?.forEach(booking => {
        const existing = customerMap.get(booking.email);
        if (existing) {
          existing.total_bookings += 1;
          existing.total_spent += booking.final_price || 0;
          if (new Date(booking.created_at) > new Date(existing.last_booking)) {
            existing.last_booking = booking.created_at;
          }
        } else {
          customerMap.set(booking.email, {
            id: booking.email,
            first_name: booking.first_name,
            last_name: booking.last_name,
            email: booking.email,
            phone: booking.phone,
            suburb: booking.suburb,
            total_bookings: 1,
            total_spent: booking.final_price || 0,
            last_booking: booking.created_at
          });
        }
      });

      setCustomers(Array.from(customerMap.values()));
    } catch (error) {
      console.error('Error loading customers:', error);
      toast.error('Failed to load customers');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCustomers = useMemo(() => {
    if (!searchQuery) return customers;
    const query = searchQuery.toLowerCase();
    return customers.filter(c => 
      c.first_name.toLowerCase().includes(query) ||
      c.last_name.toLowerCase().includes(query) ||
      c.email.toLowerCase().includes(query) ||
      c.phone.includes(query) ||
      c.suburb.toLowerCase().includes(query)
    );
  }, [customers, searchQuery]);

  const paginatedCustomers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredCustomers.slice(start, start + pageSize);
  }, [filteredCustomers, page]);

  const totalPages = Math.ceil(filteredCustomers.length / pageSize);

  // Stats
  const totalRevenue = customers.reduce((sum, c) => sum + c.total_spent, 0);
  const repeatCustomers = customers.filter(c => c.total_bookings > 1).length;

  return (
    <AdminLayout>
      <TopBar 
        title="Customers" 
        subtitle={`${customers.length} total customers`} 
      />
      
      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white dark:bg-slate-900 border-border/50">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                <Users className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold">{customers.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-slate-900 border-border/50">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                <Star className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Repeat Customers</p>
                <p className="text-2xl font-bold">{repeatCustomers}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-slate-900 border-border/50">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-slate-900 border-border/50">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Value</p>
                <p className="text-2xl font-bold">
                  ${customers.length > 0 ? Math.round(totalRevenue / customers.length) : 0}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="bg-white dark:bg-slate-900 border-border/50">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                  className="pl-10 h-10"
                />
              </div>
              <Button variant="outline" size="icon" onClick={loadCustomers}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="bg-white dark:bg-slate-900 border-border/50">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Last Booking</TableHead>
                    <TableHead className="w-[60px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedCustomers.map((customer) => (
                    <TableRow key={customer.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 text-sm">
                              {customer.first_name[0]}{customer.last_name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{customer.first_name} {customer.last_name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <p className="flex items-center gap-1">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            {customer.email}
                          </p>
                          <p className="flex items-center gap-1 text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {customer.phone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{customer.suburb}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{customer.total_bookings}</Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-emerald-600">
                        ${customer.total_spent.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(customer.last_booking), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => navigate(`/admin/customer/${customer.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, filteredCustomers.length)} of {filteredCustomers.length}
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium px-2">Page {page} of {totalPages}</span>
                  <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
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
