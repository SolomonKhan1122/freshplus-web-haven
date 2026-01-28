import { useState } from 'react';
import AdminLayout, { TopBar } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Settings,
  User,
  Bell,
  Shield,
  Mail,
  Building,
  Save,
  Plus,
  Trash2,
  Edit,
  Check,
  X
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useAdminAuth } from '@/lib/adminAuth';

// Mock team members
const MOCK_TEAM = [
  { id: '1', name: 'Admin User', email: 'admin@freshplus.com.au', role: 'admin', status: 'active' },
  { id: '2', name: 'Sarah Manager', email: 'sarah@freshplus.com.au', role: 'manager', status: 'active' },
  { id: '3', name: 'Mike Dispatcher', email: 'mike@freshplus.com.au', role: 'dispatcher', status: 'active' },
];

export default function SettingsPage() {
  const { user } = useAdminAuth();
  const [businessName, setBusinessName] = useState('Fresh+ Cleaning');
  const [businessEmail, setBusinessEmail] = useState('info@freshplus.com.au');
  const [businessPhone, setBusinessPhone] = useState('1300 123 456');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1000));
    setIsSaving(false);
    toast.success('Settings saved successfully');
  };

  const roleColors = {
    admin: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400',
    manager: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
    dispatcher: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
    cleaner: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
  };

  return (
    <AdminLayout>
      <TopBar title="Settings" subtitle="Manage your account and preferences" />
      
      <div className="p-6">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="general">
              <Building className="h-4 w-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="team">
              <User className="h-4 w-4 mr-2" />
              Team
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card className="bg-white dark:bg-slate-900 border-border/50">
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Update your business details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessEmail">Business Email</Label>
                    <Input
                      id="businessEmail"
                      type="email"
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessPhone">Business Phone</Label>
                    <Input
                      id="businessPhone"
                      value={businessPhone}
                      onChange={(e) => setBusinessPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="australia/melbourne">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="australia/melbourne">Australia/Melbourne</SelectItem>
                        <SelectItem value="australia/sydney">Australia/Sydney</SelectItem>
                        <SelectItem value="australia/brisbane">Australia/Brisbane</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleSave} disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-white dark:bg-slate-900 border-border/50">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive email alerts for new bookings</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get SMS alerts for urgent bookings</p>
                  </div>
                  <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sound Alerts</Label>
                    <p className="text-sm text-muted-foreground">Play sound when new booking arrives</p>
                  </div>
                  <Switch checked={soundAlerts} onCheckedChange={setSoundAlerts} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Management */}
          <TabsContent value="team" className="space-y-6">
            <Card className="bg-white dark:bg-slate-900 border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Manage your team and their permissions</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_TEAM.map(member => (
                    <div key={member.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className={cn(roleColors[member.role as keyof typeof roleColors])}>
                          {member.role}
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Roles Description */}
            <Card className="bg-white dark:bg-slate-900 border-border/50">
              <CardHeader>
                <CardTitle>Role Permissions</CardTitle>
                <CardDescription>What each role can access</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-red-500">Admin</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Full access to all features, settings, and data</p>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-blue-500">Manager</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Manage bookings, cleaners, customers, and view analytics</p>
                  </div>
                  <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-purple-500">Dispatcher</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">View and assign bookings, view cleaners</p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-emerald-500">Cleaner</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">View own schedule and update job status</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-white dark:bg-slate-900 border-border/50">
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button>Update Password</Button>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-900 border-border/50">
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-medium">Status</p>
                    <p className="text-sm text-muted-foreground">2FA is currently disabled</p>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
