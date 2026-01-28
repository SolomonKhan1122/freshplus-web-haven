import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout, { TopBar } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft,
  Phone, 
  Mail,
  Star,
  Briefcase,
  DollarSign,
  Calendar,
  Clock,
  Edit,
  MapPin,
  TrendingUp,
  Award,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

// Mock cleaner data
const MOCK_CLEANER = {
  id: '1',
  full_name: 'Maria Santos',
  email: 'maria@freshplus.com.au',
  phone: '0412 345 678',
  hourly_rate: 35,
  status: 'active',
  profile_photo: null,
  notes: 'Experienced in end of lease cleaning. Speaks English, Spanish, and Portuguese.',
  skills: ['End of Lease', 'Deep Cleaning', 'Commercial', 'Residential'],
  rating: 4.9,
  total_jobs: 156,
  created_at: '2024-01-15',
  earnings_this_month: 2450,
  earnings_total: 18750
};

const MOCK_SCHEDULE = [
  { date: '2024-01-28', time: '9:00 AM', customer: 'John Smith', service: 'End of Lease', location: 'Richmond', status: 'confirmed' },
  { date: '2024-01-28', time: '2:00 PM', customer: 'Sarah Johnson', service: 'Deep Clean', location: 'South Yarra', status: 'pending' },
  { date: '2024-01-29', time: '10:00 AM', customer: 'Mike Wilson', service: 'Residential', location: 'Carlton', status: 'confirmed' },
];

const MOCK_PERFORMANCE = {
  jobsCompleted: 156,
  onTimeRate: 98,
  customerSatisfaction: 97,
  repeatCustomers: 45
};

export default function CleanerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const cleaner = MOCK_CLEANER;

  const statusConfig = {
    active: { label: 'Active', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' },
    inactive: { label: 'Inactive', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' },
    on_leave: { label: 'On Leave', color: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400' }
  };

  return (
    <AdminLayout>
      <TopBar title="Cleaner Profile" />
      
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/admin/cleaners')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1 flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={cleaner.profile_photo || ''} />
              <AvatarFallback className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 text-xl font-semibold">
                {cleaner.full_name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{cleaner.full_name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={statusConfig[cleaner.status as keyof typeof statusConfig].color}>
                  {statusConfig[cleaner.status as keyof typeof statusConfig].label}
                </Badge>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-medium">{cleaner.rating}</span>
                </div>
              </div>
            </div>
          </div>
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white dark:bg-slate-900 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Jobs</p>
                  <p className="text-xl font-bold">{cleaner.total_jobs}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-slate-900 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">This Month</p>
                  <p className="text-xl font-bold">${cleaner.earnings_this_month}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-slate-900 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Earnings</p>
                  <p className="text-xl font-bold">${cleaner.earnings_total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-slate-900 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-950 flex items-center justify-center">
                  <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Hourly Rate</p>
                  <p className="text-xl font-bold">${cleaner.hourly_rate}/hr</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="schedule" className="space-y-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-4">
            <Card className="bg-white dark:bg-slate-900 border-border/50">
              <CardHeader>
                <CardTitle>Upcoming Jobs</CardTitle>
                <CardDescription>Scheduled appointments for this cleaner</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_SCHEDULE.map((job, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
                      <div className="flex-shrink-0 text-center">
                        <p className="text-lg font-bold">{format(new Date(job.date), 'd')}</p>
                        <p className="text-xs text-muted-foreground">{format(new Date(job.date), 'MMM')}</p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{job.customer}</p>
                          <Badge variant="secondary" className="text-xs">{job.service}</Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {job.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </span>
                        </div>
                      </div>
                      <Badge variant={job.status === 'confirmed' ? 'default' : 'secondary'}>
                        {job.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-white dark:bg-slate-900 border-border/50">
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">On-Time Rate</span>
                      <span className="font-medium">{MOCK_PERFORMANCE.onTimeRate}%</span>
                    </div>
                    <Progress value={MOCK_PERFORMANCE.onTimeRate} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Customer Satisfaction</span>
                      <span className="font-medium">{MOCK_PERFORMANCE.customerSatisfaction}%</span>
                    </div>
                    <Progress value={MOCK_PERFORMANCE.customerSatisfaction} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Repeat Customers</span>
                      <span className="font-medium">{MOCK_PERFORMANCE.repeatCustomers}%</span>
                    </div>
                    <Progress value={MOCK_PERFORMANCE.repeatCustomers} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-900 border-border/50">
                <CardHeader>
                  <CardTitle>Skills & Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {cleaner.skills.map(skill => (
                      <Badge key={skill} variant="outline" className="px-3 py-1">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card className="bg-white dark:bg-slate-900 border-border/50">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium">{cleaner.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="font-medium">{cleaner.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {cleaner.notes && (
              <Card className="bg-white dark:bg-slate-900 border-border/50">
                <CardHeader>
                  <CardTitle>Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{cleaner.notes}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
