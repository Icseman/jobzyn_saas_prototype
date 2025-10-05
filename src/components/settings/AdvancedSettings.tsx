import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Settings, 
  Key, 
  Database, 
  Download, 
  Upload,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Shield,
  Activity
} from 'lucide-react'

const AdvancedSettings: React.FC = () => {
  const [apiKey, setApiKey] = useState('sk-1234567890abcdef')
  const [showApiKey, setShowApiKey] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)

  const [systemSettings, setSystemSettings] = useState({
    debugMode: false,
    analytics: true,
    errorReporting: true,
    performanceMonitoring: true,
    autoBackup: true,
    dataRetention: '2_years'
  })

  const [apiUsage] = useState({
    requests: 1247,
    limit: 10000,
    resetDate: '2024-02-01'
  })

  const handleRegenerateApiKey = () => {
    setIsRegenerating(true)
    setTimeout(() => {
      setApiKey('sk-' + Math.random().toString(36).substring(2, 15))
      setIsRegenerating(false)
    }, 2000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Advanced Settings</h2>
          <p className="text-muted-foreground">API keys, system preferences, and advanced configurations</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Settings className="h-3 w-3" />
            Advanced
          </Badge>
        </div>
      </div>

      <Separator />

      {/* API Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="api-key">API Key</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="api-key"
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  readOnly
                  className="font-mono"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(apiKey)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRegenerateApiKey}
                  disabled={isRegenerating}
                >
                  {isRegenerating ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Use this key to authenticate API requests. Keep it secure and never share it publicly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900 dark:text-blue-100">Requests</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">{apiUsage.requests.toLocaleString()}</div>
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  of {apiUsage.limit.toLocaleString()} this month
                </div>
              </div>
              
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span className="font-medium text-emerald-900 dark:text-emerald-100">Status</span>
                </div>
                <div className="text-2xl font-bold text-emerald-600">Active</div>
                <div className="text-sm text-emerald-700 dark:text-emerald-300">
                  Resets on {apiUsage.resetDate}
                </div>
              </div>
              
              <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span className="font-medium text-orange-900 dark:text-orange-100">Rate Limit</span>
                </div>
                <div className="text-2xl font-bold text-orange-600">1000</div>
                <div className="text-sm text-orange-700 dark:text-orange-300">
                  requests per hour
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            System Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="debug-mode">Debug Mode</Label>
              <p className="text-sm text-muted-foreground">Enable detailed logging and error information</p>
            </div>
            <Switch
              id="debug-mode"
              checked={systemSettings.debugMode}
              onCheckedChange={(checked) => 
                setSystemSettings({...systemSettings, debugMode: checked})
              }
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="analytics">Analytics</Label>
              <p className="text-sm text-muted-foreground">Collect usage data to improve our services</p>
            </div>
            <Switch
              id="analytics"
              checked={systemSettings.analytics}
              onCheckedChange={(checked) => 
                setSystemSettings({...systemSettings, analytics: checked})
              }
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="error-reporting">Error Reporting</Label>
              <p className="text-sm text-muted-foreground">Automatically report errors to help us fix issues</p>
            </div>
            <Switch
              id="error-reporting"
              checked={systemSettings.errorReporting}
              onCheckedChange={(checked) => 
                setSystemSettings({...systemSettings, errorReporting: checked})
              }
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="performance-monitoring">Performance Monitoring</Label>
              <p className="text-sm text-muted-foreground">Monitor application performance and speed</p>
            </div>
            <Switch
              id="performance-monitoring"
              checked={systemSettings.performanceMonitoring}
              onCheckedChange={(checked) => 
                setSystemSettings({...systemSettings, performanceMonitoring: checked})
              }
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="auto-backup">Automatic Backup</Label>
              <p className="text-sm text-muted-foreground">Automatically backup your data daily</p>
            </div>
            <Switch
              id="auto-backup"
              checked={systemSettings.autoBackup}
              onCheckedChange={(checked) => 
                setSystemSettings({...systemSettings, autoBackup: checked})
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="data-retention">Data Retention Period</Label>
              <Select 
                value={systemSettings.dataRetention} 
                onValueChange={(value) => 
                  setSystemSettings({...systemSettings, dataRetention: value})
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6_months">6 Months</SelectItem>
                  <SelectItem value="1_year">1 Year</SelectItem>
                  <SelectItem value="2_years">2 Years</SelectItem>
                  <SelectItem value="5_years">5 Years</SelectItem>
                  <SelectItem value="forever">Forever</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-1">
                How long to keep inactive candidate data
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Storage Usage</Label>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span>Used: 2.3 GB</span>
                  <span>Limit: 10 GB</span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{width: '23%'}}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">23% of storage used</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export All Data
            </Button>
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Import Data
            </Button>
            <Button variant="outline" className="gap-2 text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4" />
              Clear Cache
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security & Compliance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security & Compliance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span className="font-medium text-emerald-900 dark:text-emerald-100">GDPR Compliance</span>
                </div>
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                  Your data is processed in compliance with GDPR regulations
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900 dark:text-blue-100">SOC 2 Type II</span>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Certified for security, availability, and confidentiality
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-purple-600" />
                  <span className="font-medium text-purple-900 dark:text-purple-100">Encryption</span>
                </div>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  All data encrypted in transit and at rest
                </p>
              </div>
              
              <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span className="font-medium text-orange-900 dark:text-orange-100">Audit Logs</span>
                </div>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  All actions are logged for security auditing
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">
          Reset to Defaults
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Settings
        </Button>
        <Button>
          Save Changes
        </Button>
      </div>
    </div>
  )
}

export default AdvancedSettings

