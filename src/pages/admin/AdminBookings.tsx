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
import {
  Calendar,
  Phone,
  Mail,
  MapPin,
  Clock,
  FileText,
  Edit,
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
  Filter
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { getServiceDisplayName } from '@/lib/serviceMapping';

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  address: string;
  service_date: string;
  service_time: string;
  special_instructions: string | null;
  status: string;
  admin_notes: string | null;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
}

const AdminBookings = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAdminAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
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
  }, [bookings, searchTerm, statusFilter]);

  const loadBookings = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('bookings')
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

  const filterBookings = () => {
    let filtered = bookings;

    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.phone.includes(searchTerm) ||
        booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    setFilteredBookings(filtered);
  };

  const updateBookingStatus = async (bookingId: string, status: string, adminNotes?: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status, 
          admin_notes: adminNotes,
          updated_at: new Date().toISOString() 
        })
        .eq('id', bookingId);

      if (error) throw error;
      
      toast.success('Booking status updated successfully');
      loadBookings();
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Failed to update booking status');
    }
  };

  const deleteBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('bookings')
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

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const navigationItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: TrendingUp },
    { label: 'Bookings', path: '/admin/bookings', icon: Calendar, active: true },
    { label: 'Quotes', path: '/admin/quotes', icon: DollarSign },
    { label: 'Contact Messages', path: '/admin/contacts', icon: MessageSquare },
    { label: 'Settings', path: '/admin/settings', icon: Users },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading bookings...</div>
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
                item.active ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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
              <h2 className="text-2xl font-bold text-gray-900">Bookings Management</h2>
            </div>
            <div className="text-sm text-gray-500">
              {filteredBookings.length} of {bookings.length} bookings
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 bg-white border-b">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search bookings..."
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
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{booking.name}</p>
                          <p className="text-sm text-gray-500">{booking.email}</p>
                          <p className="text-sm text-gray-500">{booking.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{getServiceDisplayName(booking.service)}</p>
                          <p className="text-sm text-gray-500 max-w-xs truncate">{booking.address}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{format(new Date(booking.service_date), 'MMM dd, yyyy')}</p>
                          <p className="text-sm text-gray-500">{booking.service_time}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-500">
                          {format(new Date(booking.created_at), 'MMM dd, yyyy')}
                        </p>
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
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Booking Details - {selectedBooking?.name}</DialogTitle>
                              </DialogHeader>
                              {selectedBooking && (
                                <div className="space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium text-gray-700">Customer Name</label>
                                      <p className="text-gray-900">{selectedBooking.name}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-700">Email</label>
                                      <p className="text-gray-900">{selectedBooking.email}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-700">Phone</label>
                                      <p className="text-gray-900">{selectedBooking.phone}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-700">Service</label>
                                      <p className="text-gray-900">{getServiceDisplayName(selectedBooking.service)}</p>
                                    </div>
                                    <div className="col-span-2">
                                      <label className="text-sm font-medium text-gray-700">Address</label>
                                      <p className="text-gray-900">{selectedBooking.address}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-700">Service Date</label>
                                      <p className="text-gray-900">{format(new Date(selectedBooking.service_date), 'PPP')}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-700">Service Time</label>
                                      <p className="text-gray-900">{selectedBooking.service_time}</p>
                                    </div>
                                  </div>
                                  
                                  {selectedBooking.special_instructions && (
                                    <div>
                                      <label className="text-sm font-medium text-gray-700">Special Instructions</label>
                                      <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedBooking.special_instructions}</p>
                                    </div>
                                  )}

                                  <div className="border-t pt-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium text-gray-700">Current Status</label>
                                        <Select
                                          value={selectedBooking.status}
                                          onValueChange={(status) => {
                                            updateBookingStatus(selectedBooking.id, status);
                                            setSelectedBooking({ ...selectedBooking, status });
                                          }}
                                        >
                                          <SelectTrigger>
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
                                          onChange={(e) => setSelectedBooking({ ...selectedBooking, assigned_to: e.target.value })}
                                          placeholder="Assign staff member"
                                        />
                                      </div>
                                    </div>
                                    
                                    <div className="mt-4">
                                      <label className="text-sm font-medium text-gray-700">Admin Notes</label>
                                      <Textarea
                                        value={selectedBooking.admin_notes || ''}
                                        onChange={(e) => setSelectedBooking({ ...selectedBooking, admin_notes: e.target.value })}
                                        placeholder="Add internal notes..."
                                        className="mt-1"
                                      />
                                    </div>
                                    
                                    <div className="flex space-x-2 mt-4">
                                      <Button
                                        onClick={() => {
                                          updateBookingStatus(
                                            selectedBooking.id,
                                            selectedBooking.status,
                                            selectedBooking.admin_notes
                                          );
                                        }}
                                      >
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
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No bookings found</p>
                  <p className="text-gray-400">Bookings will appear here when customers submit the booking form</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
