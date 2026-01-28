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
  DollarSign,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Edit,
  Trash2,
  Eye,
  Menu,
  X,
  LogOut,
  Users,
  MessageSquare,
  TrendingUp,
  Search,
  Filter,
  Send,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { getServiceDisplayName } from '@/lib/serviceMapping';

interface Quote {
  id: string;
  name: string;
  address: string;
  city: string;
  postcode: string;
  phone1: string;
  phone2: string | null;
  email: string;
  property_type: string | null;
  services: string[];
  preferred_date: string | null;
  job_description: string | null;
  terms_accepted: boolean;
  status: string;
  admin_notes: string | null;
  quote_amount: number | null;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
}

const AdminQuotes = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAdminAuth();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    loadQuotes();
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    filterQuotes();
  }, [quotes, searchTerm, statusFilter]);

  const loadQuotes = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuotes(data || []);
    } catch (error) {
      console.error('Error loading quotes:', error);
      toast.error('Failed to load quotes');
    } finally {
      setIsLoading(false);
    }
  };

  const filterQuotes = () => {
    let filtered = quotes;

    if (searchTerm) {
      filtered = filtered.filter(quote =>
        quote.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.phone1.includes(searchTerm) ||
        quote.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(quote => quote.status === statusFilter);
    }

    setFilteredQuotes(filtered);
  };

  const updateQuote = async (quoteId: string, updates: Partial<Quote>) => {
    try {
      const { error } = await supabase
        .from('quotes')
        .update({ 
          ...updates,
          updated_at: new Date().toISOString() 
        })
        .eq('id', quoteId);

      if (error) throw error;
      
      toast.success('Quote updated successfully');
      loadQuotes();
    } catch (error) {
      console.error('Error updating quote:', error);
      toast.error('Failed to update quote');
    }
  };

  const deleteQuote = async (quoteId: string) => {
    if (!confirm('Are you sure you want to delete this quote? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('quotes')
        .delete()
        .eq('id', quoteId);

      if (error) throw error;
      
      toast.success('Quote deleted successfully');
      loadQuotes();
    } catch (error) {
      console.error('Error deleting quote:', error);
      toast.error('Failed to delete quote');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'quoted': return 'bg-purple-100 text-purple-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const sendQuoteEmail = (quote: Quote) => {
    const subject = `FreshPlus Cleaning Quote - ${quote.name}`;
    const body = `Dear ${quote.name},

Thank you for your interest in FreshPlus Cleaning services.

Services requested: ${quote.services.map(service => getServiceDisplayName(service)).join(', ')}
${quote.quote_amount ? `Quote Amount: $${quote.quote_amount}` : ''}

We look forward to serving you!

Best regards,
FreshPlus Cleaning Team
Phone: +61 403 971 720
Email: infofreshplusclean@gmail.com`;

    window.open(`mailto:${quote.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const navigationItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: TrendingUp },
    { label: 'Instant Bookings', path: '/admin/instant-bookings', icon: Zap },
    { label: 'Bookings', path: '/admin/bookings', icon: Calendar },
    { label: 'Quotes', path: '/admin/quotes', icon: DollarSign, active: true },
    { label: 'Contact Messages', path: '/admin/contacts', icon: MessageSquare },
    { label: 'Settings', path: '/admin/settings', icon: Users },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading quotes...</div>
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
              <h2 className="text-2xl font-bold text-gray-900">Quote Requests</h2>
            </div>
            <div className="text-sm text-gray-500">
              {filteredQuotes.length} of {quotes.length} quotes
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 bg-white border-b">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search quotes..."
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
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="quoted">Quoted</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={loadQuotes} variant="outline">
              Refresh Data
            </Button>
          </div>
        </div>

        {/* Quotes Table */}
        <div className="p-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Services</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Quote Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQuotes.map((quote) => (
                    <TableRow key={quote.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{quote.name}</p>
                          <p className="text-sm text-gray-500">{quote.email}</p>
                          <p className="text-sm text-gray-500">{quote.phone1}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {quote.services.slice(0, 2).map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {getServiceDisplayName(service)}
                            </Badge>
                          ))}
                          {quote.services.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{quote.services.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{quote.city}</p>
                          <p className="text-sm text-gray-500">{quote.postcode}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {quote.quote_amount ? (
                          <p className="font-medium text-green-600">${quote.quote_amount}</p>
                        ) : (
                          <p className="text-gray-400">Not quoted</p>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(quote.status)}>
                          {quote.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-500">
                          {format(new Date(quote.created_at), 'MMM dd, yyyy')}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedQuote(quote)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Quote Request Details - {selectedQuote?.name}</DialogTitle>
                              </DialogHeader>
                              {selectedQuote && (
                                <div className="space-y-6">
                                  <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                      <div>
                                        <label className="text-sm font-medium text-gray-700">Customer Name</label>
                                        <p className="text-gray-900">{selectedQuote.name}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-gray-700">Email</label>
                                        <p className="text-gray-900">{selectedQuote.email}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-gray-700">Primary Phone</label>
                                        <p className="text-gray-900">{selectedQuote.phone1}</p>
                                      </div>
                                      {selectedQuote.phone2 && (
                                        <div>
                                          <label className="text-sm font-medium text-gray-700">Secondary Phone</label>
                                          <p className="text-gray-900">{selectedQuote.phone2}</p>
                                        </div>
                                      )}
                                    </div>
                                    
                                    <div className="space-y-4">
                                      <div>
                                        <label className="text-sm font-medium text-gray-700">Address</label>
                                        <p className="text-gray-900">{selectedQuote.address}</p>
                                        <p className="text-gray-900">{selectedQuote.city}, {selectedQuote.postcode}</p>
                                      </div>
                                      {selectedQuote.property_type && (
                                        <div>
                                          <label className="text-sm font-medium text-gray-700">Property Type</label>
                                          <p className="text-gray-900 capitalize">{selectedQuote.property_type.replace('-', ' ')}</p>
                                        </div>
                                      )}
                                      {selectedQuote.preferred_date && (
                                        <div>
                                          <label className="text-sm font-medium text-gray-700">Preferred Date</label>
                                          <p className="text-gray-900">{format(new Date(selectedQuote.preferred_date), 'PPP')}</p>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div>
                                    <label className="text-sm font-medium text-gray-700">Requested Services</label>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                      {selectedQuote.services.map((service, index) => (
                                        <Badge key={index} variant="secondary">
                                          {getServiceDisplayName(service)}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>

                                  {selectedQuote.job_description && (
                                    <div>
                                      <label className="text-sm font-medium text-gray-700">Job Description</label>
                                      <p className="text-gray-900 bg-gray-50 p-3 rounded-lg mt-1">{selectedQuote.job_description}</p>
                                    </div>
                                  )}

                                  <div className="border-t pt-6">
                                    <h4 className="text-lg font-medium text-gray-900 mb-4">Quote Management</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium text-gray-700">Status</label>
                                        <Select
                                          value={selectedQuote.status}
                                          onValueChange={(status) => {
                                            setSelectedQuote({ ...selectedQuote, status });
                                          }}
                                        >
                                          <SelectTrigger className="mt-1">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="contacted">Contacted</SelectItem>
                                            <SelectItem value="quoted">Quoted</SelectItem>
                                            <SelectItem value="accepted">Accepted</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-gray-700">Quote Amount ($)</label>
                                        <Input
                                          type="number"
                                          value={selectedQuote.quote_amount || ''}
                                          onChange={(e) => setSelectedQuote({ 
                                            ...selectedQuote, 
                                            quote_amount: parseFloat(e.target.value) || null 
                                          })}
                                          placeholder="Enter quote amount"
                                          className="mt-1"
                                        />
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-gray-700">Assigned To</label>
                                        <Input
                                          value={selectedQuote.assigned_to || ''}
                                          onChange={(e) => setSelectedQuote({ 
                                            ...selectedQuote, 
                                            assigned_to: e.target.value 
                                          })}
                                          placeholder="Assign staff member"
                                          className="mt-1"
                                        />
                                      </div>
                                    </div>
                                    
                                    <div className="mt-4">
                                      <label className="text-sm font-medium text-gray-700">Admin Notes</label>
                                      <Textarea
                                        value={selectedQuote.admin_notes || ''}
                                        onChange={(e) => setSelectedQuote({ 
                                          ...selectedQuote, 
                                          admin_notes: e.target.value 
                                        })}
                                        placeholder="Add internal notes..."
                                        className="mt-1"
                                      />
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-2 mt-6">
                                      <Button
                                        onClick={() => {
                                          updateQuote(selectedQuote.id, {
                                            status: selectedQuote.status,
                                            quote_amount: selectedQuote.quote_amount,
                                            assigned_to: selectedQuote.assigned_to,
                                            admin_notes: selectedQuote.admin_notes
                                          });
                                        }}
                                      >
                                        Save Changes
                                      </Button>
                                      <Button
                                        variant="outline"
                                        onClick={() => sendQuoteEmail(selectedQuote)}
                                      >
                                        <Send className="h-4 w-4 mr-2" />
                                        Send Quote Email
                                      </Button>
                                      <Button
                                        variant="outline"
                                        onClick={() => window.open(`mailto:${selectedQuote.email}`)}
                                      >
                                        <Mail className="h-4 w-4 mr-2" />
                                        Email Customer
                                      </Button>
                                      <Button
                                        variant="outline"
                                        onClick={() => window.open(`tel:${selectedQuote.phone1}`)}
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
                            onClick={() => deleteQuote(quote.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredQuotes.length === 0 && (
                <div className="text-center py-12">
                  <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No quote requests found</p>
                  <p className="text-gray-400">Quote requests will appear here when customers submit the quote form</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminQuotes;
