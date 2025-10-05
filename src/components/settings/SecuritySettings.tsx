import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Shield, 
  Key, 
  Smartphone, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Download,
  Trash2,
  Plus,
  QrCode,
  Lock,
  Unlock,
  Activity
} from 'lucide-react'

interface SecuritySession {
  id: string
  device: string
  location: string
  lastActive: string
  current: boolean
  trusted: boolean
}

const SecuritySettings: React.FC = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isEnabling2FA, setIsEnabling2FA] = useState(false)
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [backupCodes] = useState([
    'ABC123DEF', 'GHI456JKL', 'MNO789PQR', 'STU012VWX', 'YZA345BCD'
  ])

  const [sessions] = useState<SecuritySession[]>([
    {
      id: '1',
      device: 'iPhone 15 Pro',
      location: 'Casablanca, Morocco',
      lastActive: '2 minutes ago',
      current: true,
      trusted: true
    },
    {
      id: '2',
      device: 'MacBook Pro',
      location: 'Casablanca, Morocco',
      lastActive: '1 hour ago',
      current: false,
      trusted: true
    },
    {
      id: '3',
      device: 'Chrome Browser',
      location: 'Rabat, Morocco',
      lastActive: '3 days ago',
      current: false,
      trusted: false
    },
    {
      id: '4',
      device: 'Safari Browser',
      location: 'Unknown Location',
      lastActive: '1 week ago',
      current: false,
      trusted: false
    }
  ])

  const handlePasswordChange = async () => {
    setIsChangingPassword(true)
    // Simulate API call
    setTimeout(() => {
      setIsChangingPassword(false)
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      console.log('Password changed successfully')
    }, 2000)
  }

  const handle2FAToggle = async () => {
    setIsEnabling2FA(true)
    // Simulate API call
    setTimeout(() => {
      setIsEnabling2FA(false)
      setTwoFactorEnabled(!twoFactorEnabled)
      console.log('2FA toggled')
    }, 1500)
  }

  const revokeSession = (sessionId: string) => {
    console.log('Revoking session:', sessionId)
  }

  const downloadBackupCodes = () => {
    console.log('Downloading backup codes')
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Security & Privacy</h2>
          <p className="text-muted-foreground">Manage your security settings and privacy preferences</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Shield className="h-3 w-3" />
            2FA Enabled
          </Badge>
        </div>
      </div>

      <Separator />

      {/* Security Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Security Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="font-medium text-emerald-900 dark:text-emerald-100">Password Strength</p>
                <p className="text-sm text-emerald-700 dark:text-emerald-300">Strong</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <Shield className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900 dark:text-blue-100">2FA Status</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">Enabled</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="font-medium text-orange-900 dark:text-orange-100">Last Login</p>
                <p className="text-sm text-orange-700 dark:text-orange-300">2 minutes ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Password Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="current-password">Current Password</Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  placeholder="Enter current password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  placeholder="Enter new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                placeholder="Confirm new password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handlePasswordChange}
              disabled={isChangingPassword || !passwordData.currentPassword || !passwordData.newPassword || passwordData.newPassword !== passwordData.confirmPassword}
              className="gap-2"
            >
              {isChangingPassword ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Changing...
                </>
              ) : (
                <>
                  <Key className="h-4 w-4" />
                  Change Password
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${twoFactorEnabled ? 'bg-emerald-50 dark:bg-emerald-950' : 'bg-gray-50 dark:bg-gray-950'}`}>
                {twoFactorEnabled ? (
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-gray-600" />
                )}
              </div>
              <div>
                <h3 className="font-medium">Authenticator App</h3>
                <p className="text-sm text-muted-foreground">
                  {twoFactorEnabled ? 'Enabled via Google Authenticator' : 'Not enabled'}
                </p>
              </div>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={handle2FAToggle}
              disabled={isEnabling2FA}
            />
          </div>

          {twoFactorEnabled && (
            <>
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <QrCode className="h-4 w-4 text-blue-600" />
                  <h4 className="font-medium text-blue-900 dark:text-blue-100">Setup Instructions</h4>
                </div>
                <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>1. Open your authenticator app (Google Authenticator, Authy, etc.)</li>
                  <li>2. Scan the QR code or enter the secret key</li>
                  <li>3. Enter the 6-digit code to verify setup</li>
                </ol>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Backup Codes</h4>
                    <p className="text-sm text-muted-foreground">Use these codes if you lose access to your authenticator</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={downloadBackupCodes} className="gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {backupCodes.map((code, index) => (
                    <div key={index} className="p-2 bg-muted rounded text-center font-mono text-sm">
                      {code}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Active Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    session.current 
                      ? 'bg-emerald-50 dark:bg-emerald-950' 
                      : session.trusted 
                        ? 'bg-blue-50 dark:bg-blue-950' 
                        : 'bg-orange-50 dark:bg-orange-950'
                  }`}>
                    {session.current ? (
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                    ) : session.trusted ? (
                      <Lock className="h-4 w-4 text-blue-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{session.device}</h3>
                      {session.current && (
                        <Badge variant="secondary" className="text-xs">Current</Badge>
                      )}
                      {session.trusted && (
                        <Badge variant="outline" className="text-xs">Trusted</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {session.location} • {session.lastActive}
                    </p>
                  </div>
                </div>
                {!session.current && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => revokeSession(session.id)}
                    className="gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Revoke
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Privacy Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="profile-visibility">Profile Visibility</Label>
              <p className="text-sm text-muted-foreground">Control who can see your profile information</p>
            </div>
            <Switch id="profile-visibility" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="activity-status">Activity Status</Label>
              <p className="text-sm text-muted-foreground">Show when you're online or recently active</p>
            </div>
            <Switch id="activity-status" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="data-analytics">Data Analytics</Label>
              <p className="text-sm text-muted-foreground">Allow usage data to improve our services</p>
            </div>
            <Switch id="data-analytics" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">
          Export Data
        </Button>
        <Button variant="destructive">
          Delete Account
        </Button>
      </div>
    </div>
  )
}

export default SecuritySettings

