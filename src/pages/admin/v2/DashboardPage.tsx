import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout, { TopBar } from '@/components/admin/AdminLayout';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Zap, 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Sparkles,
  UserCircle,
  MessageSquare,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { format, formatDistanceToNow, isToday, startOfWeek, startOfMonth } from 'date-fns';

interface DashboardStats {
  totalInstantBookings: number;
  pendingInstantBookings: number;
  confirmedToday: number;
  completedThisWeek: number;
  instantBookingsRevenue: number;
  revenueThisMonth: number;
  totalContacts: number;
  unreadContacts: number;
}

interface ActivityItem {
  id: string;
  type: 'booking' | 'contact' | 'status_change';
  title: string;
  description: string;
  time: string;
  status?: string;
}

// Stat Card Component
function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  trendValue,
  onClick,
  loading,
  accentColor = 'emerald'
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: any;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  onClick?: () => void;
  loading?: boolean;
  accentColor?: 'emerald' | 'blue' | 'purple' | 'amber' | 'rose';
}) {
  const colorClasses = {
    emerald: 'from-emerald-500 to-green-600 shadow-emerald-500/25',
    blue: 'from-blue-500 to-indigo-600 shadow-blue-500/25',
    purple: 'from-purple-500 to-violet-600 shadow-purple-500/25',
    amber: 'from-amber-500 to-orange-600 shadow-amber-500/25',
    rose: 'from-rose-500 to-pink-600 shadow-rose-500/25',
  };

  if (loading) {
    return (
      <Card className="bg-white dark:bg-slate-900 border-border/50">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-12 w-12 rounded-xl" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className={cn(
        "bg-white dark:bg-slate-900 border-border/50 transition-all duration-200",
        onClick && "cursor-pointer hover:shadow-lg hover:scale-[1.02] hover:border-emerald-200 dark:hover:border-emerald-800"
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {subtitle && (
              <div className="flex items-center gap-2">
                {trend && trendValue && (
                  <span className={cn(
                    "flex items-center text-xs font-medium",
                    trend === 'up' && "text-emerald-600",
                    trend === 'down' && "text-rose-600",
                    trend === 'neutral' && "text-muted-foreground"
                  )}>
                    {trend === 'up' && <ArrowUpRight className="h-3 w-3" />}
                    {trend === 'down' && <ArrowDownRight className="h-3 w-3" />}
                    {trendValue}
                  </span>
                )}
                <span className="text-sm text-muted-foreground">{subtitle}</span>
              </div>
            )}
          </div>
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
            colorClasses[accentColor]
          )}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Activity Item Component
function ActivityItemCard({ item }: { item: ActivityItem }) {
  const getIcon = () => {
    switch (item.type) {
      case 'booking': return <Zap className="h-4 w-4" />;
      case 'contact': return <MessageSquare className="h-4 w-4" />;
      case 'status_change': return <RefreshCw className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = () => {
    switch (item.status) {
      case 'pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400';
      case 'confirmed': return 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400';
      case 'completed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400';
      case 'unread': return 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
      <div className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full",
        item.type === 'booking' && "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
        item.type === 'contact' && "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
        item.type === 'status_change' && "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
      )}>
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium text-foreground truncate">{item.title}</p>
          {item.status && (
            <Badge variant="secondary" className={cn("text-xs", getStatusColor())}>
              {item.status}
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground truncate">{item.description}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {formatDistanceToNow(new Date(item.time), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
}

// Quick Action Button
function QuickActionButton({ 
  icon: Icon, 
  label, 
  count, 
  onClick, 
  variant = 'default' 
}: {
  icon: any;
  label: string;
  count?: number;
  onClick: () => void;
  variant?: 'default' | 'primary';
}) {
  return (
    <Button
      variant={variant === 'primary' ? 'default' : 'outline'}
      className={cn(
        "w-full justify-start h-auto py-4 px-4",
        variant === 'primary' && "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
      )}
      onClick={onClick}
    >
      <Icon className="h-5 w-5 mr-3" />
      <div className="flex-1 text-left">
        <span className="font-medium">{label}</span>
        {count !== undefined && count > 0 && (
          <span className="ml-2 text-xs opacity-80">({count} pending)</span>
        )}
      </div>
      <ArrowRight className="h-4 w-4 opacity-50" />
    </Button>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalInstantBookings: 0,
    pendingInstantBookings: 0,
    confirmedToday: 0,
    completedThisWeek: 0,
    instantBookingsRevenue: 0,
    revenueThisMonth: 0,
    totalContacts: 0,
    unreadContacts: 0,
  });
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);

      // Fetch instant bookings
      const { data: instantBookings, error: bookingsError } = await supabase
        .from('instant_bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (bookingsError) throw bookingsError;

      // Fetch contacts
      const { data: contacts, error: contactsError } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (contactsError) throw contactsError;

      // Calculate stats
      const now = new Date();
      const weekStart = startOfWeek(now);
      const monthStart = startOfMonth(now);

      const pendingInstant = instantBookings?.filter(b => b.status === 'pending').length || 0;
      const confirmedToday = instantBookings?.filter(b => 
        b.status === 'confirmed' && isToday(new Date(b.created_at))
      ).length || 0;
      const completedThisWeek = instantBookings?.filter(b => 
        b.status === 'completed' && new Date(b.created_at) >= weekStart
      ).length || 0;

      const totalRevenue = instantBookings?.filter(b => b.status !== 'cancelled')
        .reduce((sum, b) => sum + (b.final_price || 0), 0) || 0;
      
      const monthlyRevenue = instantBookings?.filter(b => 
        b.status !== 'cancelled' && new Date(b.created_at) >= monthStart
      ).reduce((sum, b) => sum + (b.final_price || 0), 0) || 0;

      const unreadContacts = contacts?.filter(c => c.status === 'unread').length || 0;

      setStats({
        totalInstantBookings: instantBookings?.length || 0,
        pendingInstantBookings: pendingInstant,
        confirmedToday,
        completedThisWeek,
        instantBookingsRevenue: totalRevenue,
        revenueThisMonth: monthlyRevenue,
        totalContacts: contacts?.length || 0,
        unreadContacts,
      });

      // Build activity feed
      const activityItems: ActivityItem[] = [];

      // Add recent bookings
      instantBookings?.slice(0, 5).forEach(booking => {
        activityItems.push({
          id: booking.id,
          type: 'booking',
          title: `${booking.first_name} ${booking.last_name}`,
          description: `${booking.service_name} - ${booking.suburb}`,
          time: booking.created_at,
          status: booking.status,
        });
      });

      // Add recent contacts
      contacts?.slice(0, 3).forEach(contact => {
        activityItems.push({
          id: contact.id,
          type: 'contact',
          title: contact.name || 'Anonymous',
          description: contact.message?.substring(0, 50) + '...' || 'No message',
          time: contact.created_at,
          status: contact.status,
        });
      });

      // Sort by time
      activityItems.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
      setActivities(activityItems.slice(0, 8));

    } catch (error) {
      console.error('Error loading dashboard:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <TopBar 
        title="Dashboard" 
        subtitle={`Welcome back! Here's what's happening today, ${format(new Date(), 'EEEE, MMMM d')}`} 
      />
      
      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Instant Bookings"
            value={stats.totalInstantBookings}
            subtitle={`${stats.pendingInstantBookings} pending`}
            icon={Zap}
            trend="up"
            trendValue="+12%"
            onClick={() => navigate('/admin/instant-bookings')}
            loading={isLoading}
            accentColor="emerald"
          />
          <StatCard
            title="Today's Confirmed"
            value={stats.confirmedToday}
            subtitle="Confirmed for today"
            icon={Calendar}
            loading={isLoading}
            accentColor="blue"
          />
          <StatCard
            title="Completed This Week"
            value={stats.completedThisWeek}
            subtitle="Jobs completed"
            icon={CheckCircle2}
            trend="up"
            trendValue="+8%"
            loading={isLoading}
            accentColor="purple"
          />
          <StatCard
            title="Revenue"
            value={`$${stats.instantBookingsRevenue.toLocaleString()}`}
            subtitle={`$${stats.revenueThisMonth.toLocaleString()} this month`}
            icon={DollarSign}
            trend="up"
            trendValue="+18%"
            loading={isLoading}
            accentColor="amber"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Feed */}
          <Card className="lg:col-span-2 bg-white dark:bg-slate-900 border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                <CardDescription>Latest bookings and messages</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={loadDashboardData}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              <ScrollArea className="h-[400px]">
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="flex items-start gap-4 p-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-48" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : activities.length > 0 ? (
                  <div className="space-y-1">
                    {activities.map(item => (
                      <ActivityItemCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
                    <Clock className="h-12 w-12 mb-4 opacity-50" />
                    <p>No recent activity</p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white dark:bg-slate-900 border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              <CardDescription>Manage your business</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <QuickActionButton
                icon={Zap}
                label="Instant Bookings"
                count={stats.pendingInstantBookings}
                onClick={() => navigate('/admin/instant-bookings')}
                variant="primary"
              />
              <QuickActionButton
                icon={MessageSquare}
                label="Messages"
                count={stats.unreadContacts}
                onClick={() => navigate('/admin/contacts')}
              />
              <QuickActionButton
                icon={Users}
                label="Manage Cleaners"
                onClick={() => navigate('/admin/cleaners')}
              />
              <QuickActionButton
                icon={UserCircle}
                label="View Customers"
                onClick={() => navigate('/admin/customers')}
              />
              <QuickActionButton
                icon={TrendingUp}
                label="Analytics"
                onClick={() => navigate('/admin/analytics')}
              />
            </CardContent>
          </Card>
        </div>

        {/* Performance Overview */}
        <Card className="bg-white dark:bg-slate-900 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              Performance Overview
            </CardTitle>
            <CardDescription>Key metrics at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30">
                <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {Math.round((stats.completedThisWeek / Math.max(stats.totalInstantBookings, 1)) * 100)}%
                </p>
                <p className="text-sm text-muted-foreground mt-1">Completion Rate</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  ${stats.totalInstantBookings > 0 ? Math.round(stats.instantBookingsRevenue / stats.totalInstantBookings) : 0}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Avg. Booking Value</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30">
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {stats.pendingInstantBookings}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Pending Action</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30">
                <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                  {stats.unreadContacts}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Unread Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
