import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Bell, 
  Mail, 
  Smartphone, 
  Desktop, 
  Calendar, 
  Users, 
  Briefcase, 
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  Volume2,
  VolumeX,
  Settings,
  Save
} from 'lucide-react'

interface NotificationPreference {
  id: string
  title: string
  description: string
  email: boolean
  push: boolean
  inApp: boolean
  frequency: 'immediate' | 'daily' | 'weekly' | 'never'
  icon: React.ReactNode
  category: 'urgent' | 'important' | 'normal' | 'low'
}

const NotificationSettings: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false)
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    {
      id: 'new-applications',
      title: 'New Job Applications',
      description: 'Get notified when candidates apply to your job postings',
      email: true,
      push: true,
      inApp: true,
      frequency: 'immediate',
      icon: <Briefcase className="h-4 w-4" />,
      category: 'urgent'
    },
    {
      id: 'interview-scheduled',
      title: 'Interview Scheduled',
      description: 'Notifications for upcoming interviews and meetings',
      email: true,
      push: true,
      inApp: true,
      frequency: 'immediate',
      icon: <Calendar className="h-4 w-4" />,
      category: 'urgent'
    },
    {
      id: 'candidate-updates',
      title: 'Candidate Status Updates',
      description: 'Updates when candidates move through your pipeline',
      email: false,
      push: true,
      inApp: true,
      frequency: 'daily',
      icon: <Users className="h-4 w-4" />,
      category: 'important'
    },
    {
      id: 'team-messages',
      title: 'Team Messages',
      description: 'Messages from your team members and collaborators',
      email: true,
      push: true,
      inApp: true,
      frequency: 'immediate',
      icon: <MessageSquare className="h-4 w-4" />,
      category: 'important'
    },
    {
      id: 'system-updates',
      title: 'System Updates',
      description: 'Important system updates and maintenance notifications',
      email: true,
      push: false,
      inApp: true,
      frequency: 'daily',
      icon: <Settings className="h-4 w-4" />,
      category: 'normal'
    },
    {
      id: 'weekly-reports',
      title: 'Weekly Reports',
      description: 'Weekly summary of your recruitment activities',
      email: true,
      push: false,
      inApp: false,
      frequency: 'weekly',
      icon: <CheckCircle className="h-4 w-4" />,
      category: 'low'
    }
  ])

  const [globalSettings, setGlobalSettings] = useState({
    doNotDisturb: false,
    quietHours: { enabled: false, start: '22:00', end: '08:00' },
    soundEnabled: true,
    vibrationEnabled: true
  })

  const updatePreference = (id: string, field: keyof NotificationPreference, value: any) => {
    setPreferences(prev => 
      prev.map(pref => 
        pref.id === id ? { ...pref, [field]: value } : pref
      )
    )
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'urgent': return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950'
      case 'important': return 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950'
      case 'normal': return 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950'
      case 'low': return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950'
      default: return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'urgent': return <AlertTriangle className="h-3 w-3" />
      case 'important': return <Clock className="h-3 w-3" />
      case 'normal': return <Bell className="h-3 w-3" />
      case 'low': return <VolumeX className="h-3 w-3" />
      default: return <Bell className="h-3 w-3" />
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      console.log('Notification preferences saved:', { preferences, globalSettings })
    }, 1500)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
          <p className="text-muted-foreground">Control how and when you receive notifications</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="destructive" className="gap-1">
            <Bell className="h-3 w-3" />
            12 Unread
          </Badge>
          <Button onClick={handleSave} className="gap-2" disabled={isSaving}>
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Preferences
              </>
            )}
          </Button>
        </div>
      </div>

      <Separator />

      {/* Global Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Global Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="do-not-disturb">Do Not Disturb</Label>
                  <p className="text-sm text-muted-foreground">Pause all notifications</p>
                </div>
                <Switch
                  id="do-not-disturb"
                  checked={globalSettings.doNotDisturb}
                  onCheckedChange={(checked) => 
                    setGlobalSettings({...globalSettings, doNotDisturb: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="sound">Sound Notifications</Label>
                  <p className="text-sm text-muted-foreground">Play sound for notifications</p>
                </div>
                <Switch
                  id="sound"
                  checked={globalSettings.soundEnabled}
                  onCheckedChange={(checked) => 
                    setGlobalSettings({...globalSettings, soundEnabled: checked})
                  }
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="vibration">Vibration</Label>
                  <p className="text-sm text-muted-foreground">Vibrate for mobile notifications</p>
                </div>
                <Switch
                  id="vibration"
                  checked={globalSettings.vibrationEnabled}
                  onCheckedChange={(checked) => 
                    setGlobalSettings({...globalSettings, vibrationEnabled: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="quiet-hours">Quiet Hours</Label>
                  <p className="text-sm text-muted-foreground">Silence notifications during set hours</p>
                </div>
                <Switch
                  id="quiet-hours"
                  checked={globalSettings.quietHours.enabled}
                  onCheckedChange={(checked) => 
                    setGlobalSettings({
                      ...globalSettings, 
                      quietHours: {...globalSettings.quietHours, enabled: checked}
                    })
                  }
                />
              </div>
            </div>
          </div>
          
          {globalSettings.quietHours.enabled && (
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <Label htmlFor="quiet-start">Start Time</Label>
                <Select 
                  value={globalSettings.quietHours.start}
                  onValueChange={(value) => 
                    setGlobalSettings({
                      ...globalSettings, 
                      quietHours: {...globalSettings.quietHours, start: value}
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({length: 24}, (_, i) => {
                      const hour = i.toString().padStart(2, '0')
                      return (
                        <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                          {hour}:00
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="quiet-end">End Time</Label>
                <Select 
                  value={globalSettings.quietHours.end}
                  onValueChange={(value) => 
                    setGlobalSettings({
                      ...globalSettings, 
                      quietHours: {...globalSettings.quietHours, end: value}
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({length: 24}, (_, i) => {
                      const hour = i.toString().padStart(2, '0')
                      return (
                        <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                          {hour}:00
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {preferences.map((preference) => (
              <div key={preference.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${getCategoryColor(preference.category)}`}>
                      {preference.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-foreground">{preference.title}</h3>
                        <Badge variant="outline" className={`text-xs ${getCategoryColor(preference.category)}`}>
                          {getCategoryIcon(preference.category)}
                          <span className="ml-1 capitalize">{preference.category}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{preference.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor={`${preference.id}-email`} className="text-sm">Email</Label>
                    </div>
                    <Switch
                      id={`${preference.id}-email`}
                      checked={preference.email}
                      onCheckedChange={(checked) => 
                        updatePreference(preference.id, 'email', checked)
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor={`${preference.id}-push`} className="text-sm">Push</Label>
                    </div>
                    <Switch
                      id={`${preference.id}-push`}
                      checked={preference.push}
                      onCheckedChange={(checked) => 
                        updatePreference(preference.id, 'push', checked)
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Desktop className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor={`${preference.id}-inapp`} className="text-sm">In-App</Label>
                    </div>
                    <Switch
                      id={`${preference.id}-inapp`}
                      checked={preference.inApp}
                      onCheckedChange={(checked) => 
                        updatePreference(preference.id, 'inApp', checked)
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`${preference.id}-frequency`} className="text-sm">Frequency</Label>
                    <Select 
                      value={preference.frequency}
                      onValueChange={(value) => 
                        updatePreference(preference.id, 'frequency', value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Channels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Notification Channels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-muted-foreground">salma.bennani@jobzyn.com</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Daily Digest</span>
                  <span className="text-emerald-600">Active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Urgent Alerts</span>
                  <span className="text-emerald-600">Active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Weekly Reports</span>
                  <span className="text-emerald-600">Active</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-50 dark:bg-green-950 rounded-lg">
                  <Smartphone className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium">Mobile Push</h3>
                  <p className="text-sm text-muted-foreground">iPhone 15 Pro</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>New Applications</span>
                  <span className="text-emerald-600">Active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Interview Reminders</span>
                  <span className="text-emerald-600">Active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Team Messages</span>
                  <span className="text-emerald-600">Active</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <Desktop className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-medium">Desktop</h3>
                  <p className="text-sm text-muted-foreground">macOS Safari</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Browser Notifications</span>
                  <span className="text-emerald-600">Active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Sound Alerts</span>
                  <span className="text-emerald-600">Active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Badge Count</span>
                  <span className="text-emerald-600">Active</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default NotificationSettings