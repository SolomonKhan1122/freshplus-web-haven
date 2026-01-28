import { useState, useEffect } from 'react';
import AdminLayout, { TopBar } from '@/components/admin/AdminLayout';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign,
  Users,
  Zap,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { format, subDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

interface AnalyticsData {
  totalRevenue: number;
  totalBookings: number;
  completedBookings: number;
  averageValue: number;
  conversionRate: number;
  repeatCustomerRate: number;
  bookingsByService: { name: string; count: number; revenue: number }[];
  revenueByDay: { date: string; revenue: number; bookings: number }[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30days');

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    try {
      setIsLoading(true);
      
      let startDate: Date;
      const endDate = new Date();
      
      switch (timeRange) {
        case '7days':
          startDate = subDays(endDate, 7);
          break;
        case '30days':
          startDate = subDays(endDate, 30);
          break;
        case 'thisMonth':
          startDate = startOfMonth(endDate);
          break;
        default:
          startDate = subDays(endDate, 30);
      }

      const { data: bookings, error } = await supabase
        .from('instant_bookings')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Calculate analytics
      const nonCancelled = bookings?.filter(b => b.status !== 'cancelled') || [];
      const completed = bookings?.filter(b => b.status === 'completed') || [];
      const totalRevenue = nonCancelled.reduce((sum, b) => sum + (b.final_price || 0), 0);
      const avgValue = nonCancelled.length > 0 ? totalRevenue / nonCancelled.length : 0;

      // Bookings by service
      const serviceMap = new Map<string, { count: number; revenue: number }>();
      nonCancelled.forEach(b => {
        const existing = serviceMap.get(b.service_type) || { count: 0, revenue: 0 };
        serviceMap.set(b.service_type, {
          count: existing.count + 1,
          revenue: existing.revenue + (b.final_price || 0)
        });
      });

      // Revenue by day
      const days = eachDayOfInterval({ start: startDate, end: endDate });
      const revenueByDay = days.map(day => {
        const dayBookings = nonCancelled.filter(b => 
          isSameDay(new Date(b.created_at), day)
        );
        return {
          date: format(day, 'MMM d'),
          revenue: dayBookings.reduce((sum, b) => sum + (b.final_price || 0), 0),
          bookings: dayBookings.length
        };
      });

      // Unique customers
      const uniqueEmails = new Set(bookings?.map(b => b.email) || []);
      const repeatCustomers = bookings?.filter(b => {
        const count = bookings.filter(ob => ob.email === b.email).length;
        return count > 1;
      });
      const repeatRate = uniqueEmails.size > 0 
        ? (new Set(repeatCustomers?.map(b => b.email)).size / uniqueEmails.size) * 100 
        : 0;

      setData({
        totalRevenue,
        totalBookings: bookings?.length || 0,
        completedBookings: completed.length,
        averageValue: avgValue,
        conversionRate: 85, // Placeholder
        repeatCustomerRate: repeatRate,
        bookingsByService: Array.from(serviceMap.entries()).map(([name, data]) => ({
          name: name.replace('-', ' '),
          count: data.count,
          revenue: data.revenue
        })),
        revenueByDay
      });
    } catch (error) {
      console.error('Error loading analytics:', error);
      toast.error('Failed to load analytics');
    } finally {
      setIsLoading(false);
    }
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, trend, color }: {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: any;
    trend?: { value: number; positive: boolean };
    color: string;
  }) => (
    <Card className="bg-white dark:bg-slate-900 border-border/50">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
            {subtitle && (
              <div className="flex items-center gap-2 mt-1">
                {trend && (
                  <span className={cn(
                    "flex items-center text-xs font-medium",
                    trend.positive ? "text-emerald-600" : "text-rose-600"
                  )}>
                    {trend.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {trend.value}%
                  </span>
                )}
                <span className="text-sm text-muted-foreground">{subtitle}</span>
              </div>
            )}
          </div>
          <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center", color)}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <AdminLayout>
      <TopBar title="Analytics" subtitle="Track your business performance" />
      
      <div className="p-6 space-y-6">
        {/* Time Range Selector */}
        <div className="flex justify-end">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Revenue"
            value={`$${data?.totalRevenue.toLocaleString() || 0}`}
            subtitle="vs last period"
            icon={DollarSign}
            trend={{ value: 18, positive: true }}
            color="bg-gradient-to-br from-emerald-500 to-green-600"
          />
          <StatCard
            title="Total Bookings"
            value={data?.totalBookings || 0}
            subtitle="new bookings"
            icon={Zap}
            trend={{ value: 12, positive: true }}
            color="bg-gradient-to-br from-blue-500 to-indigo-600"
          />
          <StatCard
            title="Avg. Booking Value"
            value={`$${Math.round(data?.averageValue || 0)}`}
            subtitle="per booking"
            icon={TrendingUp}
            color="bg-gradient-to-br from-purple-500 to-violet-600"
          />
          <StatCard
            title="Completed Jobs"
            value={data?.completedBookings || 0}
            subtitle="successfully done"
            icon={CheckCircle2}
            color="bg-gradient-to-br from-amber-500 to-orange-600"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <Card className="bg-white dark:bg-slate-900 border-border/50">
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Daily revenue over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-end gap-1">
                {data?.revenueByDay.slice(-14).map((day, i) => {
                  const maxRevenue = Math.max(...(data?.revenueByDay.map(d => d.revenue) || [1]));
                  const height = maxRevenue > 0 ? (day.revenue / maxRevenue) * 100 : 0;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div 
                        className="w-full bg-gradient-to-t from-emerald-500 to-green-400 rounded-t transition-all"
                        style={{ height: `${Math.max(height, 2)}%` }}
                      />
                      <span className="text-[10px] text-muted-foreground truncate w-full text-center">
                        {day.date.split(' ')[1]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Bookings by Service */}
          <Card className="bg-white dark:bg-slate-900 border-border/50">
            <CardHeader>
              <CardTitle>Bookings by Service</CardTitle>
              <CardDescription>Distribution of service types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data?.bookingsByService.map((service, i) => {
                  const total = data.bookingsByService.reduce((sum, s) => sum + s.count, 0);
                  const percentage = total > 0 ? (service.count / total) * 100 : 0;
                  const colors = [
                    'bg-emerald-500',
                    'bg-blue-500',
                    'bg-purple-500',
                    'bg-amber-500',
                    'bg-rose-500'
                  ];
                  return (
                    <div key={service.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium capitalize">{service.name}</span>
                        <span className="text-muted-foreground">{service.count} ({Math.round(percentage)}%)</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full rounded-full transition-all", colors[i % colors.length])}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card className="bg-white dark:bg-slate-900 border-border/50">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Key business indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30">
                <p className="text-3xl font-bold text-emerald-600">{Math.round(data?.conversionRate || 0)}%</p>
                <p className="text-sm text-muted-foreground mt-1">Conversion Rate</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30">
                <p className="text-3xl font-bold text-blue-600">{Math.round(data?.repeatCustomerRate || 0)}%</p>
                <p className="text-sm text-muted-foreground mt-1">Repeat Customers</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30">
                <p className="text-3xl font-bold text-purple-600">4.8</p>
                <p className="text-sm text-muted-foreground mt-1">Avg. Rating</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30">
                <p className="text-3xl font-bold text-amber-600">2.3 hrs</p>
                <p className="text-sm text-muted-foreground mt-1">Avg. Response Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
