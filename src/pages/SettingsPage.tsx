import React, { useState } from 'react'
import { SiteHeader } from '@/components/site-header'
import { PageTransition } from '@/components/PageTransition'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Zap, 
  CreditCard, 
  Users, 
  Settings as SettingsIcon,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Info,
  Sparkles,
  Crown,
  Star,
  Edit3,
  Save,
  Briefcase,
  MessageSquare,
  Smartphone,
  Clock
} from 'lucide-react'

interface SettingsSection {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  badge?: string
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline'
  isNew?: boolean
  isPremium?: boolean
}

const settingsSections: SettingsSection[] = [
  {
    id: 'profile',
    title: 'Profile & Account',
    description: 'Manage your personal information and account details',
    icon: <User className="h-5 w-5" />
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Control how and when you receive notifications',
    icon: <Bell className="h-5 w-5" />,
    badge: '12',
    badgeVariant: 'destructive'
  },
  {
    id: 'security',
    title: 'Security & Privacy',
    description: 'Manage your security settings and privacy preferences',
    icon: <Shield className="h-5 w-5" />,
    badge: '2FA',
    badgeVariant: 'secondary'
  },
  {
    id: 'appearance',
    title: 'Appearance & Theme',
    description: 'Customize your interface and visual preferences',
    icon: <Palette className="h-5 w-5" />,
    isNew: true
  },
  {
    id: 'integrations',
    title: 'Integrations',
    description: 'Connect with third-party tools and services',
    icon: <Zap className="h-5 w-5" />,
    badge: '5',
    badgeVariant: 'secondary'
  },
  {
    id: 'billing',
    title: 'Billing & Subscription',
    description: 'Manage your subscription and payment methods',
    icon: <CreditCard className="h-5 w-5" />,
    badge: 'Pro',
    badgeVariant: 'default',
    isPremium: true
  },
  {
    id: 'team',
    title: 'Team & Permissions',
    description: 'Manage team members and access permissions',
    icon: <Users className="h-5 w-5" />,
    badge: 'Admin',
    badgeVariant: 'outline'
  },
  {
    id: 'advanced',
    title: 'Advanced Settings',
    description: 'API keys, system preferences, and advanced configurations',
    icon: <SettingsIcon className="h-5 w-5" />
  }
]

const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('profile')
  const [isLoading, setIsLoading] = useState(false)

  const handleSectionChange = (sectionId: string) => {
    setIsLoading(true)
    setActiveSection(sectionId)
    // Simulate loading delay for smooth transition
    setTimeout(() => setIsLoading(false), 300)
  }

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Profile & Account</h2>
                <p className="text-muted-foreground">Manage your personal information and account details</p>
              </div>
              <Button className="gap-2">
                <Edit3 className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">First Name</label>
                      <input 
                        type="text" 
                        defaultValue="Salma" 
                        className="w-full p-3 border border-border rounded-lg mt-1 bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Last Name</label>
                      <input 
                        type="text" 
                        defaultValue="Bennani" 
                        className="w-full p-3 border border-border rounded-lg mt-1 bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <input 
                      type="email" 
                      defaultValue="salma.bennani@jobzyn.com" 
                      className="w-full p-3 border border-border rounded-lg mt-1 bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Phone</label>
                    <input 
                      type="tel" 
                      defaultValue="+212 6 12 34 56 78" 
                      className="w-full p-3 border border-border rounded-lg mt-1 bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Professional Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Job Title</label>
                    <input 
                      type="text" 
                      defaultValue="Senior HR Business Partner" 
                      className="w-full p-3 border border-border rounded-lg mt-1 bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Company</label>
                    <input 
                      type="text" 
                      defaultValue="JOBZYN" 
                      className="w-full p-3 border border-border rounded-lg mt-1 bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Location</label>
                    <input 
                      type="text" 
                      defaultValue="Casablanca, Morocco" 
                      className="w-full p-3 border border-border rounded-lg mt-1 bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Bio & About
                </CardTitle>
              </CardHeader>
              <CardContent>
                <textarea 
                  defaultValue="Experienced HR professional with expertise in talent acquisition, employee relations, and strategic workforce planning. Passionate about creating inclusive work environments and driving organizational growth through people."
                  className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/20 h-24 resize-none"
                />
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        )
      case 'notifications':
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
                <p className="text-muted-foreground">Control how and when you receive notifications</p>
              </div>
              <Badge variant="destructive" className="gap-1">
                <Bell className="h-3 w-3" />
                12 Unread
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Email Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">New Job Applications</h3>
                      <p className="text-sm text-muted-foreground">Get notified when candidates apply</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">Interview Scheduled</h3>
                      <p className="text-sm text-muted-foreground">Notifications for upcoming interviews</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">Team Messages</h3>
                      <p className="text-sm text-muted-foreground">Messages from team members</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Push Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">Mobile Alerts</h3>
                      <p className="text-sm text-muted-foreground">Push notifications on mobile</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">Desktop Notifications</h3>
                      <p className="text-sm text-muted-foreground">Browser notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">Sound Alerts</h3>
                      <p className="text-sm text-muted-foreground">Play sound for notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Quiet Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">Enable Quiet Hours</h3>
                      <p className="text-sm text-muted-foreground">Silence notifications during set hours</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Start Time</label>
                    <select className="w-full p-3 border border-border rounded-lg mt-1 bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/20">
                      <option>22:00</option>
                      <option>23:00</option>
                      <option>00:00</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">End Time</label>
                    <select className="w-full p-3 border border-border rounded-lg mt-1 bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/20">
                      <option>08:00</option>
                      <option>09:00</option>
                      <option>10:00</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
              <Button variant="outline">Reset</Button>
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save Preferences
              </Button>
            </div>
          </div>
        )
      case 'security':
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Security & Privacy</h2>
            <p className="text-muted-foreground">Manage your security settings and privacy preferences</p>
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                      <span className="font-medium text-emerald-900 dark:text-emerald-100">Two-Factor Authentication</span>
                    </div>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">Enabled via Google Authenticator</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Current Password</label>
                    <input type="password" className="w-full p-2 border rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">New Password</label>
                    <input type="password" className="w-full p-2 border rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Confirm New Password</label>
                    <input type="password" className="w-full p-2 border rounded-md" />
                  </div>
                  <Button className="w-full">Change Password</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case 'appearance':
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Appearance & Theme</h2>
            <p className="text-muted-foreground">Customize your interface and visual preferences</p>
            <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg cursor-pointer hover:border-primary">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                        <span className="font-medium">Light</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Clean and bright interface</p>
                    </div>
                    <div className="p-4 border rounded-lg cursor-pointer hover:border-primary">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-4 h-4 bg-gray-800 rounded"></div>
                        <span className="font-medium">Dark</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Easy on the eyes</p>
                    </div>
                    <div className="p-4 border rounded-lg cursor-pointer hover:border-primary border-primary bg-primary/5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-4 h-4 bg-gray-400 rounded"></div>
                        <span className="font-medium">System</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Follows your system preference</p>
                    </div>
                  </div>
                  <Button className="w-full">Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case 'integrations':
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Integrations</h2>
            <p className="text-muted-foreground">Connect with third-party tools and services</p>
            <Card>
              <CardHeader>
                <CardTitle>Available Integrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <MessageSquare className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Slack</h3>
                        <p className="text-sm text-muted-foreground">Get notifications in Slack channels</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-50 dark:bg-green-950 rounded-lg">
                        <Calendar className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Google Calendar</h3>
                        <p className="text-sm text-muted-foreground">Sync interviews and meetings</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">LinkedIn</h3>
                        <p className="text-sm text-muted-foreground">Import candidate profiles</p>
                      </div>
                    </div>
                    <Button size="sm">Connect</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case 'billing':
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Billing & Subscription</h2>
            <p className="text-muted-foreground">Manage your subscription and payment methods</p>
            <Card>
              <CardHeader>
                <CardTitle>Subscription Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">Professional Plan</h3>
                      <p className="text-sm text-muted-foreground">Next billing: February 15, 2024</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">$49</div>
                      <div className="text-sm text-muted-foreground">/month</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm">Unlimited job postings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm">Advanced candidate management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm">Team collaboration tools</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm">Analytics & reporting</span>
                    </div>
                  </div>
                  <Button className="w-full">Manage Subscription</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case 'team':
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Team & Permissions</h2>
            <p className="text-muted-foreground">Manage team members and access permissions</p>
            <Card>
              <CardHeader>
                <CardTitle>Team Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-medium">SB</span>
                      </div>
                      <div>
                        <h3 className="font-medium">Salma Bennani</h3>
                        <p className="text-sm text-muted-foreground">salma.bennani@jobzyn.com</p>
                      </div>
                    </div>
                    <Badge variant="outline">Admin</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <span className="text-muted-foreground font-medium">YM</span>
                      </div>
                      <div>
                        <h3 className="font-medium">Youssef El Mansouri</h3>
                        <p className="text-sm text-muted-foreground">youssef.mansouri@jobzyn.com</p>
                      </div>
                    </div>
                    <Badge variant="outline">Recruiter</Badge>
                  </div>
                  <Button className="w-full">Invite Team Member</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case 'advanced':
        return (
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Advanced Settings</h2>
            <p className="text-muted-foreground">API keys, system preferences, and advanced configurations</p>
            <Card>
              <CardHeader>
                <CardTitle>Advanced Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">API Key</label>
                    <div className="flex items-center gap-2 mt-1">
                      <input 
                        type="password" 
                        defaultValue="sk-1234567890abcdef" 
                        className="flex-1 p-2 border rounded-md font-mono"
                      />
                      <Button size="sm" variant="outline">Copy</Button>
                      <Button size="sm" variant="outline">Regenerate</Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Use this key to authenticate API requests. Keep it secure.
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">1,247</div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">API Requests</div>
                    </div>
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg text-center">
                      <div className="text-2xl font-bold text-emerald-600">Active</div>
                      <div className="text-sm text-emerald-700 dark:text-emerald-300">Status</div>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg text-center">
                      <div className="text-2xl font-bold text-orange-600">1000</div>
                      <div className="text-sm text-orange-700 dark:text-orange-300">Rate Limit</div>
                    </div>
                  </div>
                  <Button className="w-full">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return (
          <div className="p-6">
            <p className="text-muted-foreground">Select a settings category to get started.</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageTransition>
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <SettingsIcon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Settings</h1>
                <p className="text-muted-foreground">Manage your account preferences and configurations</p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Card className="border-border/50 hover:border-primary/50 transition-colors">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Account Status</p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400">Active</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-border/50 hover:border-primary/50 transition-colors">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <Crown className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Plan</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400">Professional</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-border/50 hover:border-primary/50 transition-colors">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <Star className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Features</p>
                      <p className="text-xs text-purple-600 dark:text-purple-400">Unlocked</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-border/50 hover:border-primary/50 transition-colors">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <Sparkles className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Last Updated</p>
                      <p className="text-xs text-orange-600 dark:text-orange-400">2 days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Settings Navigation */}
            <div className="lg:col-span-2">
              <Card className="sticky top-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Settings Categories</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {settingsSections.map((section) => (
                      <Button
                        key={section.id}
                        variant={activeSection === section.id ? "secondary" : "ghost"}
                        className={`w-full justify-start h-auto p-3 rounded-lg mx-2 mb-1 ${
                          activeSection === section.id 
                            ? 'bg-primary/10 text-primary border border-primary/20' 
                            : 'hover:bg-muted/50'
                        }`}
                        onClick={() => handleSectionChange(section.id)}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div className={`p-2 rounded-lg ${
                            activeSection === section.id 
                              ? 'bg-primary/20 text-primary' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {section.icon}
                          </div>
                          <div className="flex-1 text-left">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{section.title}</span>
                              {section.isNew && (
                                <Badge variant="secondary" className="text-xs px-1 py-0">
                                  <Sparkles className="h-2 w-2 mr-1" />
                                  New
                                </Badge>
                              )}
                              {section.isPremium && (
                                <Badge variant="default" className="text-xs px-1 py-0">
                                  <Crown className="h-2 w-2 mr-1" />
                                  Pro
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                              {section.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {section.badge && (
                              <Badge 
                                variant={section.badgeVariant || 'secondary'} 
                                className="text-xs px-1 py-0"
                              >
                                {section.badge}
                              </Badge>
                            )}
                            <ChevronRight className="h-3 w-3 text-muted-foreground" />
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              <Card className="min-h-[500px] max-h-[calc(100vh-200px)] overflow-hidden">
                <CardContent className="p-0 h-full">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-[500px]">
                      <div className="flex flex-col items-center gap-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <p className="text-muted-foreground">Loading settings...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full overflow-y-auto">
                      {renderSectionContent()}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </PageTransition>
    </div>
  )
}

export default SettingsPage