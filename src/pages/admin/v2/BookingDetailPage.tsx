import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout, { TopBar } from '@/components/admin/AdminLayout';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ArrowLeft,
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  Clock,
  Zap,
  User,
  Home,
  DollarSign,
  FileText,
  Save,
  MessageSquare,
  Package,
  CheckCircle2,
  AlertCircle,
  Edit3,
  Printer,
  ExternalLink,
  Copy,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';
import { BOOKING_STATUS_CONFIG, BookingStatus } from '@/lib/adminTypes';
import { extraServices } from '@/lib/pricing-data';

interface InstantBooking {
  id: string;
  created_at: string;
  status: BookingStatus;
  service_type: string;
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
  assigned_cleaner_id: string | null;
  internal_notes: string | null;
}

// Status Badge Component
function StatusBadge({ status, size = 'default' }: { status: BookingStatus; size?: 'sm' | 'default' }) {
  const config = BOOKING_STATUS_CONFIG[status] || BOOKING_STATUS_CONFIG.pending;
  return (
    <Badge 
      variant="outline" 
      className={cn(
        "font-medium", 
        config.color, 
        config.bgColor,
        size === 'sm' && "text-xs px-2 py-0.5"
      )}
    >
      {config.label}
    </Badge>
  );
}

// Info Card Component
function InfoCard({ icon: Icon, label, value, action }: {
  icon: any;
  label: string;
  value: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-background">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium text-sm truncate">{value}</p>
      </div>
      {action}
    </div>
  );
}

export default function BookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<InstantBooking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [internalNotes, setInternalNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (id) {
      loadBooking(id);
    }
  }, [id]);

  const loadBooking = async (bookingId: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('instant_bookings')
        .select('*')
        .eq('id', bookingId)
        .single();

      if (error) throw error;
      setBooking(data);
      setInternalNotes(data.internal_notes || '');
    } catch (error) {
      console.error('Error loading booking:', error);
      toast.error('Failed to load booking details');
      navigate('/admin/instant-bookings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: BookingStatus) => {
    if (!booking) return;
    
    try {
      const { error } = await supabase
        .from('instant_bookings')
        .update({ status: newStatus })
        .eq('id', booking.id);

      if (error) throw error;

      setBooking(prev => prev ? { ...prev, status: newStatus } : null);
      toast.success(`Status updated to ${BOOKING_STATUS_CONFIG[newStatus].label}`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleSaveNotes = async () => {
    if (!booking) return;

    try {
      setIsSaving(true);
      const { error } = await supabase
        .from('instant_bookings')
        .update({ internal_notes: internalNotes })
        .eq('id', booking.id);

      if (error) throw error;

      setBooking(prev => prev ? { ...prev, internal_notes: internalNotes } : null);
      toast.success('Notes saved successfully');
    } catch (error) {
      console.error('Error saving notes:', error);
      toast.error('Failed to save notes');
    } finally {
      setIsSaving(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const getExtraServiceName = (id: string): string => {
    const extra = extraServices.find(e => e.id === id);
    return extra?.name || id;
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <TopBar title="Booking Details" />
        <div className="p-6 space-y-6">
          <Skeleton className="h-8 w-48" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!booking) {
    return null;
  }

  const selectedExtrasCount = Object.values(booking.selected_extras || {}).reduce((sum, qty) => sum + qty, 0);

  return (
    <AdminLayout>
      <TopBar 
        title="Booking Details" 
        subtitle={`#${booking.id.slice(0, 8).toUpperCase()}`} 
      />
      
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigate('/admin/instant-bookings')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">
                {booking.first_name} {booking.last_name}
              </h1>
              <p className="text-muted-foreground">{booking.service_name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select value={booking.status} onValueChange={(v) => handleStatusChange(v as BookingStatus)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(BOOKING_STATUS_CONFIG).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    <span className="flex items-center gap-2">
                      <span className={cn("w-2 h-2 rounded-full", config.bgColor.split(' ')[0])} />
                      {config.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <StatusBadge status={booking.status} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Details Card */}
            <Card className="bg-white dark:bg-slate-900 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-emerald-500" />
                  Service Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30">
                    <p className="text-xs text-muted-foreground">Service Type</p>
                    <p className="font-semibold text-emerald-700 dark:text-emerald-400">{booking.service_name}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30">
                    <p className="text-xs text-muted-foreground">Bedrooms</p>
                    <p className="font-semibold text-blue-700 dark:text-blue-400">{booking.service_size}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30">
                    <p className="text-xs text-muted-foreground">Bathrooms</p>
                    <p className="font-semibold text-purple-700 dark:text-purple-400">{booking.bathrooms}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30">
                    <p className="text-xs text-muted-foreground">Property Type</p>
                    <p className="font-semibold text-amber-700 dark:text-amber-400 capitalize">{booking.property_type}</p>
                  </div>
                </div>

                {booking.furnished && (
                  <div className="flex items-center gap-2 text-sm">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <span className="capitalize">{booking.furnished}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Selected Extras */}
            {selectedExtrasCount > 0 && (
              <Card className="bg-white dark:bg-slate-900 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-blue-500" />
                    Selected Extras ({selectedExtrasCount})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(booking.selected_extras || {}).map(([extraId, quantity]) => (
                      quantity > 0 && (
                        <div key={extraId} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                          <span className="font-medium">{getExtraServiceName(extraId)}</span>
                          <Badge variant="secondary">x{quantity}</Badge>
                        </div>
                      )
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Pricing Card */}
            <Card className="bg-white dark:bg-slate-900 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  Pricing Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Original Price</span>
                    <span className="font-medium">${booking.original_price.toFixed(2)}</span>
                  </div>
                  {booking.discount_amount > 0 && (
                    <div className="flex justify-between py-2 text-emerald-600">
                      <span>Discount Applied</span>
                      <span className="font-medium">-${booking.discount_amount.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between py-2">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      ${booking.final_price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments */}
            {booking.comments && (
              <Card className="bg-white dark:bg-slate-900 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-purple-500" />
                    Customer Comments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-wrap">{booking.comments}</p>
                </CardContent>
              </Card>
            )}

            {/* Internal Notes */}
            <Card className="bg-white dark:bg-slate-900 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit3 className="h-5 w-5 text-amber-500" />
                  Internal Notes
                </CardTitle>
                <CardDescription>Private notes for team members only</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Add notes about this booking..."
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
                <Button onClick={handleSaveNotes} disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Notes'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="bg-white dark:bg-slate-900 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-500" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <InfoCard
                  icon={User}
                  label="Full Name"
                  value={`${booking.first_name} ${booking.last_name}`}
                />
                <InfoCard
                  icon={Phone}
                  label="Phone"
                  value={booking.phone}
                  action={
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => window.open(`tel:${booking.phone}`)}>
                      <Phone className="h-4 w-4" />
                    </Button>
                  }
                />
                <InfoCard
                  icon={Mail}
                  label="Email"
                  value={booking.email}
                  action={
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => window.open(`mailto:${booking.email}`)}>
                      <Mail className="h-4 w-4" />
                    </Button>
                  }
                />
                <InfoCard
                  icon={MapPin}
                  label="Address"
                  value={`${booking.address}, ${booking.suburb} ${booking.postcode}`}
                  action={
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(`${booking.address}, ${booking.suburb} ${booking.postcode}`)}`)}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  }
                />
              </CardContent>
            </Card>

            {/* Schedule Card */}
            <Card className="bg-white dark:bg-slate-900 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-500" />
                  Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <InfoCard
                  icon={Calendar}
                  label="Preferred Date"
                  value={format(parseISO(booking.preferred_date), 'EEEE, MMMM d, yyyy')}
                />
                <InfoCard
                  icon={Clock}
                  label="Preferred Time"
                  value={booking.preferred_time}
                />
                {booking.same_day_booking && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400">
                    <Zap className="h-4 w-4" />
                    <span className="text-sm font-medium">Same Day Booking</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card className="bg-white dark:bg-slate-900 border-border/50">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => window.open(`tel:${booking.phone}`)}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call Customer
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => window.open(`mailto:${booking.email}`)}>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => copyToClipboard(booking.phone, 'Phone number')}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Phone
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => copyToClipboard(`${booking.address}, ${booking.suburb} ${booking.postcode}`, 'Address')}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Address
                </Button>
              </CardContent>
            </Card>

            {/* Booking Info Card */}
            <Card className="bg-muted/30 border-border/50">
              <CardContent className="pt-6 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booking ID</span>
                  <span className="font-mono">{booking.id.slice(0, 8).toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span>{format(new Date(booking.created_at), 'MMM d, yyyy HH:mm')}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
