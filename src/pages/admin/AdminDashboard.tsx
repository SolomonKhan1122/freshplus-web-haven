import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/lib/adminAuth';
import { supabase } from '@/lib/supabase';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Users,
  MessageSquare,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  LogOut,
  Menu,
  X,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';

interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  completedBookings: number;
  totalQuotes: number;
  pendingQuotes: number;
  totalContacts: number;
  unreadContacts: number;
  revenueEstimate: number;
  // Instant Bookings stats
  totalInstantBookings: number;
  pendingInstantBookings: number;
  instantBookingsRevenue: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAdminAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    totalQuotes: 0,
    pendingQuotes: 0,
    totalContacts: 0,
    unreadContacts: 0,
    revenueEstimate: 0,
    totalInstantBookings: 0,
    pendingInstantBookings: 0,
    instantBookingsRevenue: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    loadDashboardStats();
  }, [isAuthenticated, navigate]);

  const loadDashboardStats = async () => {
    try {
      setIsLoading(true);

      // Get bookings stats
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('status');

      if (bookingsError) throw bookingsError;

      // Get quotes stats
      const { data: quotes, error: quotesError } = await supabase
        .from('quotes')
        .select('status, quote_amount');

      if (quotesError) throw quotesError;

      // Get contact messages stats
      const { data: contacts, error: contactsError } = await supabase
        .from('contact_messages')
        .select('status');

      if (contactsError) throw contactsError;

      // Get instant bookings stats
      const { data: instantBookings, error: instantBookingsError } = await supabase
        .from('instant_bookings')
        .select('status, final_price');

      if (instantBookingsError) throw instantBookingsError;

      // Calculate stats
      const totalBookings = bookings?.length || 0;
      const pendingBookings = bookings?.filter(b => b.status === 'pending').length || 0;
      const completedBookings = bookings?.filter(b => b.status === 'completed').length || 0;

      const totalQuotes = quotes?.length || 0;
      const pendingQuotes = quotes?.filter(q => q.status === 'pending').length || 0;

      const totalContacts = contacts?.length || 0;
      const unreadContacts = contacts?.filter(c => c.status === 'unread').length || 0;

      const revenueEstimate = quotes?.reduce((sum, quote) => {
        return sum + (quote.quote_amount || 0);
      }, 0) || 0;

      // Instant bookings calculations
      const totalInstantBookings = instantBookings?.length || 0;
      const pendingInstantBookings = instantBookings?.filter(b => b.status === 'pending').length || 0;
      const instantBookingsRevenue = instantBookings?.filter(b => b.status !== 'cancelled').reduce((sum, b) => {
        return sum + (b.final_price || 0);
      }, 0) || 0;

      setStats({
        totalBookings,
        pendingBookings,
        completedBookings,
        totalQuotes,
        pendingQuotes,
        totalContacts,
        unreadContacts,
        revenueEstimate,
        totalInstantBookings,
        pendingInstantBookings,
        instantBookingsRevenue
      });
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
      toast.error('Failed to load dashboard statistics');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const navigationItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: TrendingUp, active: true },
    { label: 'Instant Bookings', path: '/admin/instant-bookings', icon: Zap },
    { label: 'Bookings', path: '/admin/bookings', icon: Calendar },
    { label: 'Quotes', path: '/admin/quotes', icon: DollarSign },
    { label: 'Contact Messages', path: '/admin/contacts', icon: MessageSquare },
    { label: 'Settings', path: '/admin/settings', icon: Users },
  ];

  const StatCard = ({ title, value, subtitle, icon: Icon, color, onClick }: {
    title: string;
    value: number | string;
    subtitle?: string;
    icon: any;
    color: string;
    onClick?: () => void;
  }) => (
    <Card 
      className={`hover:shadow-lg transition-all duration-200 ${onClick ? 'cursor-pointer hover:scale-105' : ''}`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading dashboard...</div>
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
              <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <StatCard
              title="Instant Bookings"
              value={stats.totalInstantBookings}
              subtitle={`${stats.pendingInstantBookings} pending`}
              icon={Zap}
              color="bg-emerald-500"
              onClick={() => navigate('/admin/instant-bookings')}
            />
            <StatCard
              title="Total Bookings"
              value={stats.totalBookings}
              subtitle={`${stats.pendingBookings} pending`}
              icon={Calendar}
              color="bg-blue-500"
              onClick={() => navigate('/admin/bookings')}
            />
            <StatCard
              title="Quote Requests"
              value={stats.totalQuotes}
              subtitle={`${stats.pendingQuotes} pending`}
              icon={DollarSign}
              color="bg-green-500"
              onClick={() => navigate('/admin/quotes')}
            />
            <StatCard
              title="Contact Messages"
              value={stats.totalContacts}
              subtitle={`${stats.unreadContacts} unread`}
              icon={MessageSquare}
              color="bg-purple-500"
              onClick={() => navigate('/admin/contacts')}
            />
            <StatCard
              title="Instant Revenue"
              value={`$${stats.instantBookingsRevenue.toLocaleString()}`}
              subtitle="From instant bookings"
              icon={TrendingUp}
              color="bg-orange-500"
              onClick={() => navigate('/admin/instant-bookings')}
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-500" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-blue-900">New booking received</p>
                      <p className="text-sm text-blue-700">Carpet cleaning - John Smith</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">New</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-900">Quote request submitted</p>
                      <p className="text-sm text-green-700">Multiple services - Sarah Johnson</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Pending</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <p className="font-medium text-purple-900">Contact message</p>
                      <p className="text-sm text-purple-700">General inquiry - Mike Wilson</p>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">Unread</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    className="w-full justify-start bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                    variant="outline"
                    onClick={() => navigate('/admin/instant-bookings')}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Instant Bookings ({stats.pendingInstantBookings} pending)
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => navigate('/admin/bookings')}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Manage Bookings ({stats.pendingBookings} pending)
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => navigate('/admin/quotes')}
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    Review Quotes ({stats.pendingQuotes} pending)
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => navigate('/admin/contacts')}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Read Messages ({stats.unreadContacts} unread)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
