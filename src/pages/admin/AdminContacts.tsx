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
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  FileText,
  Trash2,
  Eye,
  Menu,
  X,
  LogOut,
  Users,
  DollarSign,
  TrendingUp,
  Search,
  Filter,
  Send,
  Reply,
  CheckCircle,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  admin_notes: string | null;
  replied_by: string | null;
  reply_sent_at: string | null;
  created_at: string;
  updated_at: string;
}

const AdminContacts = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAdminAuth();
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    loadContacts();
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    filterContacts();
  }, [contacts, searchTerm, statusFilter]);

  const loadContacts = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error loading contact messages:', error);
      toast.error('Failed to load contact messages');
    } finally {
      setIsLoading(false);
    }
  };

  const filterContacts = () => {
    let filtered = contacts;

    if (searchTerm) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (contact.phone && contact.phone.includes(searchTerm)) ||
        (contact.subject && contact.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
        contact.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(contact => contact.status === statusFilter);
    }

    setFilteredContacts(filtered);
  };

  const updateContactStatus = async (contactId: string, status: string, adminNotes?: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ 
          status, 
          admin_notes: adminNotes,
          updated_at: new Date().toISOString() 
        })
        .eq('id', contactId);

      if (error) throw error;
      
      toast.success('Contact message updated successfully');
      loadContacts();
    } catch (error) {
      console.error('Error updating contact message:', error);
      toast.error('Failed to update contact message');
    }
  };

  const markAsReplied = async (contactId: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ 
          status: 'replied',
          replied_by: user?.full_name || 'Admin',
          reply_sent_at: new Date().toISOString(),
          updated_at: new Date().toISOString() 
        })
        .eq('id', contactId);

      if (error) throw error;
      
      toast.success('Marked as replied');
      loadContacts();
    } catch (error) {
      console.error('Error marking as replied:', error);
      toast.error('Failed to update status');
    }
  };

  const deleteContact = async (contactId: string) => {
    if (!confirm('Are you sure you want to delete this contact message? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', contactId);

      if (error) throw error;
      
      toast.success('Contact message deleted successfully');
      loadContacts();
    } catch (error) {
      console.error('Error deleting contact message:', error);
      toast.error('Failed to delete contact message');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-red-100 text-red-800';
      case 'read': return 'bg-blue-100 text-blue-800';
      case 'replied': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const composeReply = (contact: ContactMessage) => {
    const subject = `Re: ${contact.subject || 'Your inquiry to FreshPlus Cleaning'}`;
    const body = `Dear ${contact.name},

Thank you for contacting FreshPlus Cleaning. We appreciate your inquiry.

Original message:
"${contact.message}"

[Please compose your response here]

Best regards,
${user?.full_name || 'FreshPlus Team'}
FreshPlus Cleaning
Phone: +61 403 971 720
Email: infofreshplusclean@gmail.com`;

    window.open(`mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
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
    { label: 'Quotes', path: '/admin/quotes', icon: DollarSign },
    { label: 'Contact Messages', path: '/admin/contacts', icon: MessageSquare, active: true },
    { label: 'Settings', path: '/admin/settings', icon: Users },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading contact messages...</div>
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
              <h2 className="text-2xl font-bold text-gray-900">Contact Messages</h2>
            </div>
            <div className="text-sm text-gray-500">
              {filteredContacts.length} of {contacts.length} messages
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 bg-white border-b">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search messages..."
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
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="replied">Replied</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={loadContacts} variant="outline">
              Refresh Data
            </Button>
          </div>
        </div>

        {/* Contact Messages Table */}
        <div className="p-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contact</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Message Preview</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Received</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.map((contact) => (
                    <TableRow key={contact.id} className={contact.status === 'unread' ? 'bg-blue-50' : ''}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{contact.name}</p>
                          <p className="text-sm text-gray-500">{contact.email}</p>
                          {contact.phone && (
                            <p className="text-sm text-gray-500">{contact.phone}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-gray-900">
                          {contact.subject || 'No Subject'}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-600 max-w-xs truncate">
                          {contact.message}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(contact.status)}>
                          {contact.status.toUpperCase()}
                        </Badge>
                        {contact.replied_by && (
                          <p className="text-xs text-gray-500 mt-1">
                            Replied by {contact.replied_by}
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-500">
                          {format(new Date(contact.created_at), 'MMM dd, yyyy')}
                        </p>
                        <p className="text-xs text-gray-400">
                          {format(new Date(contact.created_at), 'HH:mm')}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedContact(contact);
                                  // Mark as read when opened
                                  if (contact.status === 'unread') {
                                    updateContactStatus(contact.id, 'read');
                                  }
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Contact Message from {selectedContact?.name}</DialogTitle>
                              </DialogHeader>
                              {selectedContact && (
                                <div className="space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium text-gray-700">Name</label>
                                      <p className="text-gray-900">{selectedContact.name}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-700">Email</label>
                                      <p className="text-gray-900">{selectedContact.email}</p>
                                    </div>
                                    {selectedContact.phone && (
                                      <div>
                                        <label className="text-sm font-medium text-gray-700">Phone</label>
                                        <p className="text-gray-900">{selectedContact.phone}</p>
                                      </div>
                                    )}
                                    <div>
                                      <label className="text-sm font-medium text-gray-700">Received</label>
                                      <p className="text-gray-900">{format(new Date(selectedContact.created_at), 'PPP p')}</p>
                                    </div>
                                  </div>

                                  {selectedContact.subject && (
                                    <div>
                                      <label className="text-sm font-medium text-gray-700">Subject</label>
                                      <p className="text-gray-900 font-medium">{selectedContact.subject}</p>
                                    </div>
                                  )}

                                  <div>
                                    <label className="text-sm font-medium text-gray-700">Message</label>
                                    <div className="bg-gray-50 p-4 rounded-lg mt-1">
                                      <p className="text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
                                    </div>
                                  </div>

                                  <div className="border-t pt-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium text-gray-700">Status</label>
                                        <Select
                                          value={selectedContact.status}
                                          onValueChange={(status) => {
                                            setSelectedContact({ ...selectedContact, status });
                                          }}
                                        >
                                          <SelectTrigger className="mt-1">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="unread">Unread</SelectItem>
                                            <SelectItem value="read">Read</SelectItem>
                                            <SelectItem value="replied">Replied</SelectItem>
                                            <SelectItem value="archived">Archived</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>
                                    
                                    <div className="mt-4">
                                      <label className="text-sm font-medium text-gray-700">Admin Notes</label>
                                      <Textarea
                                        value={selectedContact.admin_notes || ''}
                                        onChange={(e) => setSelectedContact({ 
                                          ...selectedContact, 
                                          admin_notes: e.target.value 
                                        })}
                                        placeholder="Add internal notes..."
                                        className="mt-1"
                                      />
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-2 mt-6">
                                      <Button
                                        onClick={() => {
                                          updateContactStatus(
                                            selectedContact.id,
                                            selectedContact.status,
                                            selectedContact.admin_notes
                                          );
                                        }}
                                      >
                                        Save Changes
                                      </Button>
                                      <Button
                                        variant="outline"
                                        onClick={() => {
                                          composeReply(selectedContact);
                                          markAsReplied(selectedContact.id);
                                        }}
                                      >
                                        <Reply className="h-4 w-4 mr-2" />
                                        Reply
                                      </Button>
                                      <Button
                                        variant="outline"
                                        onClick={() => window.open(`mailto:${selectedContact.email}`)}
                                      >
                                        <Mail className="h-4 w-4 mr-2" />
                                        Email
                                      </Button>
                                      {selectedContact.phone && (
                                        <Button
                                          variant="outline"
                                          onClick={() => window.open(`tel:${selectedContact.phone}`)}
                                        >
                                          <Phone className="h-4 w-4 mr-2" />
                                          Call
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          {contact.status === 'unread' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateContactStatus(contact.id, 'read')}
                              title="Mark as read"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => deleteContact(contact.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredContacts.length === 0 && (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No contact messages found</p>
                  <p className="text-gray-400">Contact messages will appear here when customers reach out</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminContacts;
