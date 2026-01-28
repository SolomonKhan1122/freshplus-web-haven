import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout, { TopBar } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  Plus, 
  Phone, 
  Mail,
  Star,
  Briefcase,
  DollarSign,
  Calendar,
  MoreHorizontal,
  Edit,
  Trash2,
  UserPlus,
  Users,
  TrendingUp,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Cleaner } from '@/lib/adminTypes';

// Mock data for cleaners (since table doesn't exist yet)
const MOCK_CLEANERS: Cleaner[] = [
  {
    id: '1',
    user_id: null,
    full_name: 'Maria Santos',
    email: 'maria@freshplus.com.au',
    phone: '0412 345 678',
    hourly_rate: 35,
    status: 'active',
    profile_photo: null,
    notes: 'Experienced in end of lease cleaning',
    skills: ['End of Lease', 'Deep Cleaning', 'Commercial'],
    rating: 4.9,
    total_jobs: 156,
    created_at: '2024-01-15',
    updated_at: '2024-01-20'
  },
  {
    id: '2',
    user_id: null,
    full_name: 'David Chen',
    email: 'david@freshplus.com.au',
    phone: '0423 456 789',
    hourly_rate: 32,
    status: 'active',
    profile_photo: null,
    notes: 'Specializes in residential cleaning',
    skills: ['Residential', 'Carpet Cleaning'],
    rating: 4.7,
    total_jobs: 98,
    created_at: '2024-02-01',
    updated_at: '2024-02-10'
  },
  {
    id: '3',
    user_id: null,
    full_name: 'Sarah Johnson',
    email: 'sarah@freshplus.com.au',
    phone: '0434 567 890',
    hourly_rate: 38,
    status: 'active',
    profile_photo: null,
    notes: 'Team leader, 5+ years experience',
    skills: ['All Services', 'Team Lead'],
    rating: 4.95,
    total_jobs: 234,
    created_at: '2023-06-15',
    updated_at: '2024-01-05'
  },
  {
    id: '4',
    user_id: null,
    full_name: 'Michael Brown',
    email: 'michael@freshplus.com.au',
    phone: '0445 678 901',
    hourly_rate: 30,
    status: 'on_leave',
    profile_photo: null,
    notes: 'On annual leave until Feb 15',
    skills: ['Residential', 'Windows'],
    rating: 4.6,
    total_jobs: 67,
    created_at: '2024-03-01',
    updated_at: '2024-03-10'
  }
];

// Cleaner Card Component
function CleanerCard({ cleaner, onClick }: { cleaner: Cleaner; onClick: () => void }) {
  const statusConfig = {
    active: { label: 'Active', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' },
    inactive: { label: 'Inactive', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' },
    on_leave: { label: 'On Leave', color: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400' }
  };

  const config = statusConfig[cleaner.status];

  return (
    <Card 
      className="bg-white dark:bg-slate-900 border-border/50 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={cleaner.profile_photo || ''} />
            <AvatarFallback className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 text-lg font-semibold">
              {cleaner.full_name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-lg truncate">{cleaner.full_name}</h3>
              <Badge variant="outline" className={cn("ml-2", config.color)}>
                {config.label}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-amber-500 mb-2">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-medium">{cleaner.rating}</span>
              <span className="text-muted-foreground text-sm">({cleaner.total_jobs} jobs)</span>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {cleaner.skills.slice(0, 3).map(skill => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                <span>${cleaner.hourly_rate}/hr</span>
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="h-3 w-3" />
                <span>{cleaner.total_jobs} completed</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Add Cleaner Dialog
function AddCleanerDialog({ onAdd }: { onAdd: (cleaner: Partial<Cleaner>) => void }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    hourly_rate: 30,
    status: 'active' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ full_name: '', email: '', phone: '', hourly_rate: 30, status: 'active' });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Cleaner
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Cleaner</DialogTitle>
            <DialogDescription>
              Add a new cleaner to your team.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.full_name}
                onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="rate">Hourly Rate ($)</Label>
                <Input
                  id="rate"
                  type="number"
                  value={formData.hourly_rate}
                  onChange={(e) => setFormData(prev => ({ ...prev, hourly_rate: Number(e.target.value) }))}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(v: any) => setFormData(prev => ({ ...prev, status: v }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="on_leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Cleaner</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function CleanersPage() {
  const navigate = useNavigate();
  const [cleaners, setCleaners] = useState<Cleaner[]>(MOCK_CLEANERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filtered cleaners
  const filteredCleaners = cleaners.filter(cleaner => {
    const matchesSearch = 
      cleaner.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cleaner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cleaner.phone.includes(searchQuery);
    
    const matchesStatus = statusFilter === 'all' || cleaner.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Stats
  const activeCleaners = cleaners.filter(c => c.status === 'active').length;
  const totalJobs = cleaners.reduce((sum, c) => sum + c.total_jobs, 0);
  const avgRating = cleaners.reduce((sum, c) => sum + c.rating, 0) / cleaners.length;

  const handleAddCleaner = (newCleaner: Partial<Cleaner>) => {
    const cleaner: Cleaner = {
      id: Math.random().toString(36).substr(2, 9),
      user_id: null,
      full_name: newCleaner.full_name || '',
      email: newCleaner.email || '',
      phone: newCleaner.phone || '',
      hourly_rate: newCleaner.hourly_rate || 30,
      status: newCleaner.status || 'active',
      profile_photo: null,
      notes: null,
      skills: [],
      rating: 5.0,
      total_jobs: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setCleaners(prev => [...prev, cleaner]);
    toast.success('Cleaner added successfully');
  };

  return (
    <AdminLayout>
      <TopBar 
        title="Cleaners" 
        subtitle={`${activeCleaners} active cleaners`} 
      />
      
      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white dark:bg-slate-900 border-border/50">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                <Users className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Cleaners</p>
                <p className="text-2xl font-bold">{cleaners.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-slate-900 border-border/50">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Now</p>
                <p className="text-2xl font-bold">{activeCleaners}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-slate-900 border-border/50">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center">
                <Star className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Rating</p>
                <p className="text-2xl font-bold">{avgRating.toFixed(1)}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-slate-900 border-border/50">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Jobs</p>
                <p className="text-2xl font-bold">{totalJobs}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white dark:bg-slate-900 border-border/50">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cleaners..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px] h-10">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="on_leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
              <AddCleanerDialog onAdd={handleAddCleaner} />
            </div>
          </CardContent>
        </Card>

        {/* Cleaners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCleaners.map(cleaner => (
            <CleanerCard 
              key={cleaner.id} 
              cleaner={cleaner}
              onClick={() => navigate(`/admin/cleaner/${cleaner.id}`)}
            />
          ))}
        </div>

        {filteredCleaners.length === 0 && (
          <Card className="bg-white dark:bg-slate-900 border-border/50">
            <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Users className="h-12 w-12 mb-4 opacity-50" />
              <p className="text-lg font-medium">No cleaners found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
