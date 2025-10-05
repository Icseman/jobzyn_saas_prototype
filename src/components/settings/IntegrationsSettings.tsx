import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Zap, 
  Plus, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  Settings,
  Trash2,
  RefreshCw,
  Mail,
  Calendar,
  Users,
  FileText,
  MessageSquare,
  BarChart,
  Shield
} from 'lucide-react'

interface Integration {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  status: 'connected' | 'disconnected' | 'error'
  lastSync?: string
  category: 'communication' | 'productivity' | 'analytics' | 'hr'
  premium?: boolean
}

const IntegrationsSettings: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get notifications and updates in your Slack channels',
      icon: <MessageSquare className="h-5 w-5" />,
      status: 'connected',
      lastSync: '2 minutes ago',
      category: 'communication'
    },
    {
      id: 'outlook',
      name: 'Microsoft Outlook',
      description: 'Sync calendar events and send emails directly',
      icon: <Mail className="h-5 w-5" />,
      status: 'connected',
      lastSync: '1 hour ago',
      category: 'communication'
    },
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      description: 'Sync interviews and meetings with Google Calendar',
      icon: <Calendar className="h-5 w-5" />,
      status: 'connected',
      lastSync: '30 minutes ago',
      category: 'productivity'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      description: 'Import candidate profiles and job postings',
      icon: <Users className="h-5 w-5" />,
      status: 'disconnected',
      category: 'hr'
    },
    {
      id: 'workday',
      name: 'Workday',
      description: 'Sync employee data and organizational structure',
      icon: <FileText className="h-5 w-5" />,
      status: 'error',
      lastSync: 'Failed 2 hours ago',
      category: 'hr',
      premium: true
    },
    {
      id: 'tableau',
      name: 'Tableau',
      description: 'Export recruitment analytics and reports',
      icon: <BarChart className="h-5 w-5" />,
      status: 'disconnected',
      category: 'analytics',
      premium: true
    }
  ])

  const availableIntegrations = [
    {
      id: 'teams',
      name: 'Microsoft Teams',
      description: 'Video calls and team collaboration',
      icon: <Users className="h-5 w-5" />,
      category: 'communication'
    },
    {
      id: 'zoom',
      name: 'Zoom',
      description: 'Schedule and manage video interviews',
      icon: <Calendar className="h-5 w-5" />,
      category: 'productivity'
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'CRM integration for candidate management',
      icon: <Users className="h-5 w-5" />,
      category: 'hr',
      premium: true
    },
    {
      id: 'greenhouse',
      name: 'Greenhouse',
      description: 'Advanced ATS integration',
      icon: <FileText className="h-5 w-5" />,
      category: 'hr',
      premium: true
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950'
      case 'error': return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950'
      case 'disconnected': return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950'
      default: return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4" />
      case 'error': return <AlertCircle className="h-4 w-4" />
      case 'disconnected': return <AlertCircle className="h-4 w-4" />
      default: return <AlertCircle className="h-4 w-4" />
    }
  }

  const connectIntegration = (id: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, status: 'connected' as const, lastSync: 'Just now' }
          : integration
      )
    )
  }

  const disconnectIntegration = (id: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, status: 'disconnected' as const, lastSync: undefined }
          : integration
      )
    )
  }

  const addIntegration = (integration: Omit<Integration, 'status'>) => {
    const newIntegration: Integration = {
      ...integration,
      status: 'disconnected'
    }
    setIntegrations(prev => [...prev, newIntegration])
  }

  const connectedCount = integrations.filter(i => i.status === 'connected').length
  const errorCount = integrations.filter(i => i.status === 'error').length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Integrations</h2>
          <p className="text-muted-foreground">Connect with third-party tools and services</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Zap className="h-3 w-3" />
            {connectedCount} Connected
          </Badge>
          {errorCount > 0 && (
            <Badge variant="destructive" className="gap-1">
              <AlertCircle className="h-3 w-3" />
              {errorCount} Errors
            </Badge>
          )}
        </div>
      </div>

      <Separator />

      {/* Integration Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Connected</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400">{connectedCount} services</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <Zap className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Available</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">{availableIntegrations.length} services</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 dark:bg-orange-950 rounded-lg">
                <RefreshCw className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Last Sync</p>
                <p className="text-xs text-orange-600 dark:text-orange-400">2 minutes ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 dark:bg-purple-950 rounded-lg">
                <Shield className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Security</p>
                <p className="text-xs text-purple-600 dark:text-purple-400">All secure</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connected Integrations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Connected Integrations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {integrations.filter(i => i.status === 'connected').map((integration) => (
              <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                    {integration.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{integration.name}</h3>
                      {integration.premium && (
                        <Badge variant="default" className="text-xs">Pro</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                    {integration.lastSync && (
                      <p className="text-xs text-emerald-600 dark:text-emerald-400">
                        Last sync: {integration.lastSync}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Settings className="h-4 w-4" />
                    Configure
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => disconnectIntegration(integration.id)} className="gap-2">
                    <Trash2 className="h-4 w-4" />
                    Disconnect
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Integration Issues */}
      {integrations.filter(i => i.status === 'error').length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              Integration Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {integrations.filter(i => i.status === 'error').map((integration) => (
                <div key={integration.id} className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-950">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                      {integration.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{integration.name}</h3>
                        {integration.premium && (
                          <Badge variant="default" className="text-xs">Pro</Badge>
                        )}
                      </div>
                      <p className="text-sm text-red-700 dark:text-red-300">{integration.description}</p>
                      <p className="text-xs text-red-600 dark:text-red-400">
                        Error: {integration.lastSync}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => connectIntegration(integration.id)} className="gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Retry
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => disconnectIntegration(integration.id)} className="gap-2">
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Integrations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Available Integrations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableIntegrations.map((integration) => (
              <div key={integration.id} className="p-4 border rounded-lg hover:border-primary/50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    {integration.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{integration.name}</h3>
                      {integration.premium && (
                        <Badge variant="default" className="text-xs">Pro</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{integration.description}</p>
                    <Button 
                      size="sm" 
                      onClick={() => addIntegration(integration)}
                      className="gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Disconnected Integrations */}
      {integrations.filter(i => i.status === 'disconnected').length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Disconnected Integrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {integrations.filter(i => i.status === 'disconnected').map((integration) => (
                <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 dark:bg-gray-950 rounded-lg">
                      {integration.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{integration.name}</h3>
                        {integration.premium && (
                          <Badge variant="default" className="text-xs">Pro</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => connectIntegration(integration.id)}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Connect
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">
          <ExternalLink className="h-4 w-4 mr-2" />
          Browse Marketplace
        </Button>
        <Button>
          <RefreshCw className="h-4 w-4 mr-2" />
          Sync All
        </Button>
      </div>
    </div>
  )
}

export default IntegrationsSettings

