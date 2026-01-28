import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/lib/adminAuth';
import { supabase } from '@/lib/supabase';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { extraServices } from '@/lib/pricing-data';
import {
  Zap,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Trash2,
  Eye,
  Menu,
  X,
  LogOut,
  Users,
  DollarSign,
  MessageSquare,
  TrendingUp,
  Search,
  Filter,
  Home,
  Package,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface InstantBooking {
  id: string;
  created_at: string;
  updated_at: string;
  service_type: string;
  service_name: string;
  service_size: number | null;
  property_type: string | null;
  furnished: 'furnished' | 'empty' | null;
  bathrooms: number;
  selected_extras: Record<string, number>;
  bundle_selected: boolean;
  original_price: number;
  discount_amount: number;
  final_price: number;
  same_day_booking: boolean;
  preferred_date: string | null;
  preferred_time: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  suburb: string;
  postcode: string;
  comments: string | null;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  admin_notes: string | null;
  assigned_to: string | null;
}

const AdminInstantBookings = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAdminAuth();
  const [bookings, setBookings] = useState<InstantBooking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<InstantBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<InstantBooking | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    loadBookings();
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    filterBookings();
  }, [bookings, searchTerm, statusFilter, serviceFilter]);

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
      console.error('Error loading instant bookings:', error);
      toast.error('Failed to load instant bookings');
    } finally {
      setIsLoading(false);
    }
  };

  const filterBookings = () => {
    let filtered = bookings;

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(booking =>
        booking.first_name.toLowerCase().includes(search) ||
        booking.last_name.toLowerCase().includes(search) ||
        booking.email.toLowerCase().includes(search) ||
        booking.phone.includes(searchTerm) ||
        booking.address.toLowerCase().includes(search) ||
        booking.suburb.toLowerCase().includes(search) ||
        booking.service_name.toLowerCase().includes(search)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    if (serviceFilter !== 'all') {
      filtered = filtered.filter(booking => booking.service_type === serviceFilter);
    }

    setFilteredBookings(filtered);
  };

  const updateBooking = async (bookingId: string, updates: Partial<InstantBooking>) => {
    try {
      const { error } = await supabase
        .from('instant_bookings')
        .update({ 
          ...updates,
          updated_at: new Date().toISOString() 
        })
        .eq('id', bookingId);

      if (error) throw error;
      
      toast.success('Booking updated successfully');
      loadBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Failed to update booking');
    }
  };

  const deleteBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('instant_bookings')
        .delete()
        .eq('id', bookingId);

      if (error) throw error;
      
      toast.success('Booking deleted successfully');
      loadBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast.error('Failed to delete booking');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getServiceColor = (serviceType: string) => {
    switch (serviceType) {
      case 'residential': return 'bg-blue-100 text-blue-700';
      case 'end-of-lease': return 'bg-purple-100 text-purple-700';
      case 'deep-cleaning': return 'bg-pink-100 text-pink-700';
      case 'commercial': return 'bg-slate-100 text-slate-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getExtraName = (extraId: string): string => {
    const extra = extraServices.find(e => e.id === extraId);
    return extra?.name || extraId;
  };

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const navigationItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: TrendingUp },
    { label: 'Instant Bookings', path: '/admin/instant-bookings', icon: Zap, active: true },
    { label: 'Bookings', path: '/admin/bookings', icon: Calendar },
    { label: 'Quotes', path: '/admin/quotes', icon: DollarSign },
    { label: 'Contact Messages', path: '/admin/contacts', icon: MessageSquare },
    { label: 'Settings', path: '/admin/settings', icon: Users },
  ];

  const formatServiceName = (booking: InstantBooking) => {
    let name = booking.service_name;
    if (booking.service_size) {
      name += ` (${booking.service_size} bed)`;
    }
    return name;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading instant bookings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">FreshPlus Admin</h1>
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="mt-6">
          {navigationItems.map((item) => (
            <Button
              key={item.path}
              variant={item.active ? "secondary" : "ghost"}
              className={`w-full justify-start px-6 py-3 mb-1 ${
                item.active ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-900">{user?.full_name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
            <Badge variant="outline" className="mt-2 text-xs">
              {user?.role?.toUpperCase()}
            </Badge>
          </div>
          <Button
            variant="outline"
            className="w-full mt-4 text-red-600 border-red-200 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="lg:hidden mr-4" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-emerald-600" />
                <h2 className="text-2xl font-bold text-gray-900">Instant Bookings</h2>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {filteredBookings.length} of {bookings.length} bookings
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="p-6 bg-white border-b">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-yellow-700">{bookings.filter(b => b.status === 'pending').length}</p>
              <p className="text-sm text-yellow-600">Pending</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-700">{bookings.filter(b => b.status === 'confirmed').length}</p>
              <p className="text-sm text-blue-600">Confirmed</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-orange-700">{bookings.filter(b => b.status === 'in_progress').length}</p>
              <p className="text-sm text-orange-600">In Progress</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-700">{bookings.filter(b => b.status === 'completed').length}</p>
              <p className="text-sm text-green-600">Completed</p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-emerald-700">
                ${bookings.filter(b => b.status !== 'cancelled').reduce((sum, b) => sum + b.final_price, 0).toLocaleString()}
              </p>
              <p className="text-sm text-emerald-600">Total Revenue</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 bg-white border-b">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger>
                <Home className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="end-of-lease">End of Lease</SelectItem>
                <SelectItem value="deep-cleaning">Deep Cleaning</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={loadBookings} variant="outline">
              Refresh Data
            </Button>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="p-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{booking.first_name} {booking.last_name}</p>
                          <p className="text-sm text-gray-500">{booking.email}</p>
                          <p className="text-sm text-gray-500">{booking.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <Badge className={getServiceColor(booking.service_type)}>
                            {booking.service_type.replace(/-/g, ' ')}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">{formatServiceName(booking)}</p>
                          {booking.same_day_booking && (
                            <Badge className="bg-amber-100 text-amber-700 mt-1">Same Day</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{booking.property_type || 'N/A'}</p>
                          <p className="text-sm text-gray-500">{booking.suburb} {booking.postcode}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-bold text-emerald-600">${booking.final_price}</p>
                          {booking.discount_amount > 0 && (
                            <p className="text-xs text-gray-500">Saved ${booking.discount_amount}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          {booking.preferred_date ? (
                            <>
                              <p className="font-medium">{format(new Date(booking.preferred_date), 'MMM dd, yyyy')}</p>
                              <p className="text-sm text-gray-500">{booking.preferred_time || 'Flexible'}</p>
                            </>
                          ) : (
                            <p className="text-gray-400">Not specified</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedBooking(booking)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <Zap className="h-5 w-5 text-emerald-600" />
                                  Booking Details - {selectedBooking?.first_name} {selectedBooking?.last_name}
                                </DialogTitle>
                              </DialogHeader>
                              {selectedBooking && (
                                <div className="space-y-6">
                                  {/* Service & Property Info */}
                                  <div className="grid grid-cols-2 gap-6">
                                    <Card>
                                      <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-gray-500">Service Details</CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-2">
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Service:</span>
                                          <Badge className={getServiceColor(selectedBooking.service_type)}>
                                            {selectedBooking.service_name}
                                          </Badge>
                                        </div>
                                        {selectedBooking.service_size && (
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">Bedrooms:</span>
                                            <span className="font-medium">{selectedBooking.service_size}</span>
                                          </div>
                                        )}
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Bathrooms:</span>
                                          <span className="font-medium">{selectedBooking.bathrooms}</span>
                                        </div>
                                        {selectedBooking.same_day_booking && (
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">Same Day:</span>
                                            <Badge className="bg-amber-100 text-amber-700">Yes (+$40)</Badge>
                                          </div>
                                        )}
                                      </CardContent>
                                    </Card>

                                    <Card>
                                      <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-gray-500">Property Details</CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-2">
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Type:</span>
                                          <span className="font-medium capitalize">{selectedBooking.property_type || 'N/A'}</span>
                                        </div>
                                        {selectedBooking.furnished && (
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">Furnished:</span>
                                            <span className="font-medium capitalize">{selectedBooking.furnished}</span>
                                          </div>
                                        )}
                                        <div className="pt-2 border-t">
                                          <p className="text-gray-900">{selectedBooking.address}</p>
                                          <p className="text-gray-600">{selectedBooking.suburb}, {selectedBooking.postcode}</p>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>

                                  {/* Pricing Breakdown */}
                                  <Card className="bg-emerald-50 border-emerald-200">
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-sm font-medium text-emerald-700 flex items-center gap-2">
                                        <DollarSign className="h-4 w-4" />
                                        Pricing Breakdown
                                      </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                          <p className="text-sm text-gray-600">Original Price</p>
                                          <p className="text-lg font-medium text-gray-500 line-through">${selectedBooking.original_price}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm text-gray-600">Discount</p>
                                          <p className="text-lg font-medium text-emerald-600">-${selectedBooking.discount_amount}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm text-gray-600">Final Price</p>
                                          <p className="text-2xl font-bold text-emerald-700">${selectedBooking.final_price}</p>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Selected Extras */}
                                  {(Object.keys(selectedBooking.selected_extras).length > 0 || selectedBooking.bundle_selected) && (
                                    <Card>
                                      <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
                                          <Package className="h-4 w-4" />
                                          Selected Extras
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        {selectedBooking.bundle_selected && (
                                          <div className="mb-3 p-2 bg-purple-50 rounded-lg border border-purple-200">
                                            <Badge className="bg-purple-100 text-purple-700">Bond Back Bundle Selected</Badge>
                                          </div>
                                        )}
                                        <div className="flex flex-wrap gap-2">
                                          {Object.entries(selectedBooking.selected_extras).map(([extraId, qty]) => (
                                            qty > 0 && (
                                              <Badge key={extraId} variant="outline" className="text-sm">
                                                {getExtraName(extraId)} {qty > 1 && `x${qty}`}
                                              </Badge>
                                            )
                                          ))}
                                        </div>
                                      </CardContent>
                                    </Card>
                                  )}

                                  {/* Contact Info */}
                                  <Card>
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-sm font-medium text-gray-500">Customer Contact</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <p className="text-sm text-gray-500">Name</p>
                                          <p className="font-medium">{selectedBooking.first_name} {selectedBooking.last_name}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm text-gray-500">Email</p>
                                          <p className="font-medium">{selectedBooking.email}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm text-gray-500">Phone</p>
                                          <p className="font-medium">{selectedBooking.phone}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm text-gray-500">Preferred Date</p>
                                          <p className="font-medium">
                                            {selectedBooking.preferred_date 
                                              ? format(new Date(selectedBooking.preferred_date), 'PPP')
                                              : 'Not specified'
                                            }
                                            {selectedBooking.preferred_time && ` - ${selectedBooking.preferred_time}`}
                                          </p>
                                        </div>
                                      </div>
                                      {selectedBooking.comments && (
                                        <div className="mt-4 pt-4 border-t">
                                          <p className="text-sm text-gray-500">Customer Comments</p>
                                          <p className="mt-1 p-2 bg-gray-50 rounded-lg">{selectedBooking.comments}</p>
                                        </div>
                                      )}
                                    </CardContent>
                                  </Card>

                                  {/* Admin Section */}
                                  <Card className="border-2 border-gray-200">
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-sm font-medium text-gray-700">Admin Controls</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <label className="text-sm font-medium text-gray-700">Status</label>
                                          <Select
                                            value={selectedBooking.status}
                                            onValueChange={(status: InstantBooking['status']) => {
                                              setSelectedBooking({ ...selectedBooking, status });
                                            }}
                                          >
                                            <SelectTrigger className="mt-1">
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="pending">Pending</SelectItem>
                                              <SelectItem value="confirmed">Confirmed</SelectItem>
                                              <SelectItem value="in_progress">In Progress</SelectItem>
                                              <SelectItem value="completed">Completed</SelectItem>
                                              <SelectItem value="cancelled">Cancelled</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium text-gray-700">Assigned To</label>
                                          <Input
                                            value={selectedBooking.assigned_to || ''}
                                            onChange={(e) => setSelectedBooking({ 
                                              ...selectedBooking, 
                                              assigned_to: e.target.value 
                                            })}
                                            placeholder="Assign staff member"
                                            className="mt-1"
                                          />
                                        </div>
                                      </div>
                                      
                                      <div>
                                        <label className="text-sm font-medium text-gray-700">Admin Notes</label>
                                        <Textarea
                                          value={selectedBooking.admin_notes || ''}
                                          onChange={(e) => setSelectedBooking({ 
                                            ...selectedBooking, 
                                            admin_notes: e.target.value 
                                          })}
                                          placeholder="Add internal notes..."
                                          className="mt-1"
                                        />
                                      </div>
                                      
                                      <div className="flex flex-wrap gap-2 pt-4 border-t">
                                        <Button
                                          className="bg-emerald-600 hover:bg-emerald-700"
                                          onClick={() => {
                                            updateBooking(selectedBooking.id, {
                                              status: selectedBooking.status,
                                              assigned_to: selectedBooking.assigned_to,
                                              admin_notes: selectedBooking.admin_notes
                                            });
                                          }}
                                        >
                                          <CheckCircle className="h-4 w-4 mr-2" />
                                          Save Changes
                                        </Button>
                                        <Button
                                          variant="outline"
                                          onClick={() => window.open(`mailto:${selectedBooking.email}`)}
                                        >
                                          <Mail className="h-4 w-4 mr-2" />
                                          Email Customer
                                        </Button>
                                        <Button
                                          variant="outline"
                                          onClick={() => window.open(`tel:${selectedBooking.phone}`)}
                                        >
                                          <Phone className="h-4 w-4 mr-2" />
                                          Call Customer
                                        </Button>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Timestamps */}
                                  <div className="text-xs text-gray-400 flex justify-between">
                                    <span>Created: {format(new Date(selectedBooking.created_at), 'PPp')}</span>
                                    <span>Updated: {format(new Date(selectedBooking.updated_at), 'PPp')}</span>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => deleteBooking(booking.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredBookings.length === 0 && (
                <div className="text-center py-12">
                  <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No instant bookings found</p>
                  <p className="text-gray-400">Instant bookings will appear here when customers use the instant pricing form</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminInstantBookings;
