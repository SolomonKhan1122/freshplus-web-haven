import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout, { TopBar } from '@/components/admin/AdminLayout';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ArrowLeft,
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  Zap,
  Save,
  Edit3,
  ExternalLink,
  Copy
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { BOOKING_STATUS_CONFIG, BookingStatus } from '@/lib/adminTypes';

interface CustomerBooking {
  id: string;
  created_at: string;
  status: BookingStatus;
  service_name: string;
  final_price: number;
  preferred_date: string;
  address: string;
  suburb: string;
}

export default function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>(); // id is email
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<{
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    suburb: string;
    address: string;
    postcode: string;
  } | null>(null);
  const [bookings, setBookings] = useState<CustomerBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (id) loadCustomer(id);
  }, [id]);

  const loadCustomer = async (email: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('instant_bookings')
        .select('*')
        .eq('email', email)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        const latest = data[0];
        setCustomer({
          email: latest.email,
          first_name: latest.first_name,
          last_name: latest.last_name,
          phone: latest.phone,
          suburb: latest.suburb,
          address: latest.address,
          postcode: latest.postcode
        });
        setBookings(data.map(b => ({
          id: b.id,
          created_at: b.created_at,
          status: b.status,
          service_name: b.service_name,
          final_price: b.final_price,
          preferred_date: b.preferred_date,
          address: b.address,
          suburb: b.suburb
        })));
      }
    } catch (error) {
      console.error('Error loading customer:', error);
      toast.error('Failed to load customer');
      navigate('/admin/customers');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <TopBar title="Customer Details" />
        <div className="p-6 space-y-6">
          <Skeleton className="h-8 w-48" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Skeleton className="h-64 lg:col-span-2" />
            <Skeleton className="h-64" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!customer) return null;

  const totalSpent = bookings.reduce((sum, b) => sum + b.final_price, 0);

  return (
    <AdminLayout>
      <TopBar title="Customer Details" />
      
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/admin/customers')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Avatar className="h-14 w-14">
            <AvatarFallback className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 text-lg font-semibold">
              {customer.first_name[0]}{customer.last_name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{customer.first_name} {customer.last_name}</h1>
            <p className="text-muted-foreground">{customer.suburb}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Booking History */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white dark:bg-slate-900 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-emerald-500" />
                  Booking History ({bookings.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bookings.map(booking => {
                    const statusConfig = BOOKING_STATUS_CONFIG[booking.status];
                    return (
                      <div 
                        key={booking.id} 
                        className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => navigate(`/admin/booking/${booking.id}`)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-lg font-bold">{format(new Date(booking.preferred_date), 'd')}</p>
                            <p className="text-xs text-muted-foreground">{format(new Date(booking.preferred_date), 'MMM')}</p>
                          </div>
                          <div>
                            <p className="font-medium">{booking.service_name}</p>
                            <p className="text-sm text-muted-foreground">{booking.address}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-semibold text-emerald-600">${booking.final_price}</p>
                          <Badge variant="outline" className={cn(statusConfig.color, statusConfig.bgColor)}>
                            {statusConfig.label}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="bg-white dark:bg-slate-900 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit3 className="h-5 w-5 text-amber-500" />
                  Customer Notes
                </CardTitle>
                <CardDescription>Private notes about this customer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Add notes about this customer..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Notes
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card className="bg-white dark:bg-slate-900 border-border/50">
              <CardContent className="p-6 space-y-4">
                <div className="text-center p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30">
                  <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    ${totalSpent.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Total Spent</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{bookings.length}</p>
                  <p className="text-sm text-muted-foreground mt-1">Total Bookings</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="bg-white dark:bg-slate-900 border-border/50">
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm truncate">{customer.email}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(customer.email, 'Email')}>
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{customer.phone}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => window.open(`tel:${customer.phone}`)}>
                    <Phone className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm truncate">{customer.suburb} {customer.postcode}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
