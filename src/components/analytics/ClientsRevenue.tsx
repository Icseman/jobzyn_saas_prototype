import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Building2, 
  TrendingUp,
  Clock,
  Briefcase,
  DollarSign,
  Eye,
  ExternalLink,
  Users
} from 'lucide-react'

interface ClientsData {
  topByHires: Array<{
    clientId: string
    name: string
    hires: number
    revenue: number
  }>
  timeToFillByClient: Array<{
    clientId: string
    name: string
    medianDays: number
  }>
  activeJobsByClient: Array<{
    clientId: string
    name: string
    openJobs: number
    totalJobs: number
  }>
}

interface ClientsRevenueProps {
  data: ClientsData
  onDrilldown: (type: string, data: any) => void
}

export const ClientsRevenue: React.FC<ClientsRevenueProps> = ({
  data,
  onDrilldown
}) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getClientLogo = (clientName: string) => {
    const logos: { [key: string]: string } = {
      'Microsoft': 'https://logo.clearbit.com/microsoft.com',
      'Johnson & Johnson': 'https://logo.clearbit.com/jnj.com',
      'Tesla': 'https://logo.clearbit.com/tesla.com',
      'Goldman Sachs': 'https://logo.clearbit.com/goldmansachs.com',
      'Coursera': 'https://logo.clearbit.com/coursera.org'
    }
    return logos[clientName] || 'https://logo.clearbit.com/example.com'
  }

  const getClientInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2)
  }

  const getPerformanceColor = (hires: number) => {
    if (hires >= 3) return 'text-green-600'
    if (hires >= 2) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getPerformanceBadgeVariant = (hires: number) => {
    if (hires >= 3) return 'default' as const
    if (hires >= 2) return 'secondary' as const
    return 'destructive' as const
  }

  const getTimeToFillColor = (days: number) => {
    if (days <= 25) return 'text-green-600'
    if (days <= 35) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getTimeToFillBadgeVariant = (days: number) => {
    if (days <= 25) return 'default' as const
    if (days <= 35) return 'secondary' as const
    return 'destructive' as const
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Clients by Hires */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Top Clients by Hires
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.topByHires.map((client, index) => (
              <div key={client.clientId} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={getClientLogo(client.name)} />
                      <AvatarFallback>
                        {getClientInitials(client.name)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{client.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatCurrency(client.revenue)} revenue
                    </div>
                  </div>
                  <Badge variant={getPerformanceBadgeVariant(client.hires)}>
                    {client.hires} hires
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-green-500" />
                      <span className="text-muted-foreground">Hires</span>
                    </div>
                    <div className="font-medium">{formatNumber(client.hires)}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-blue-500" />
                      <span className="text-muted-foreground">Revenue</span>
                    </div>
                    <div className="font-medium">{formatCurrency(client.revenue)}</div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => onDrilldown('client', client)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View client details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Time to Fill by Client */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Time to Fill by Client
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.timeToFillByClient.map((client) => (
              <div key={client.clientId} className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={getClientLogo(client.name)} />
                    <AvatarFallback>
                      {getClientInitials(client.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{client.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Median time to fill
                    </div>
                  </div>
                  <Badge variant={getTimeToFillBadgeVariant(client.medianDays)}>
                    {client.medianDays} days
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Time to Fill</span>
                    <span className={`font-medium ${getTimeToFillColor(client.medianDays)}`}>
                      {client.medianDays} days
                    </span>
                  </div>
                  <Progress 
                    value={Math.min((client.medianDays / 50) * 100, 100)} 
                    className="h-2" 
                  />
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => onDrilldown('timeToFill', client)}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  View time to fill details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Jobs by Client */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Active Jobs by Client
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Client</th>
                  <th className="text-center p-2">Open Jobs</th>
                  <th className="text-center p-2">Total Jobs</th>
                  <th className="text-center p-2">Fill Rate</th>
                  <th className="text-center p-2">Status</th>
                  <th className="text-center p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.activeJobsByClient.map((client) => {
                  const fillRate = ((client.totalJobs - client.openJobs) / client.totalJobs * 100).toFixed(1)
                  const isActive = client.openJobs > 0
                  
                  return (
                    <tr key={client.clientId} className="border-b">
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={getClientLogo(client.name)} />
                            <AvatarFallback>
                              {getClientInitials(client.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{client.name}</span>
                        </div>
                      </td>
                      <td className="text-center p-2">{formatNumber(client.openJobs)}</td>
                      <td className="text-center p-2">{formatNumber(client.totalJobs)}</td>
                      <td className="text-center p-2">
                        <Badge variant="outline">{fillRate}%</Badge>
                      </td>
                      <td className="text-center p-2">
                        <Badge variant={isActive ? 'default' : 'secondary'}>
                          {isActive ? 'Active' : 'Complete'}
                        </Badge>
                      </td>
                      <td className="text-center p-2">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDrilldown('jobs', client)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDrilldown('external', client)}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Summary */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Revenue Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(data.topByHires.reduce((sum, client) => sum + client.revenue, 0))}
              </div>
              <div className="text-sm text-green-600">Total Revenue</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {data.topByHires.length}
              </div>
              <div className="text-sm text-blue-600">Active Clients</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {formatCurrency(data.topByHires.reduce((sum, client) => sum + client.revenue, 0) / data.topByHires.length)}
              </div>
              <div className="text-sm text-purple-600">Avg Revenue per Client</div>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {data.topByHires.reduce((sum, client) => sum + client.hires, 0)}
              </div>
              <div className="text-sm text-orange-600">Total Hires</div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900">Client Performance Insights</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Top Revenue Client</div>
                <div className="font-medium">
                  {data.topByHires[0]?.name} - {formatCurrency(data.topByHires[0]?.revenue || 0)}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Fastest Time to Fill</div>
                <div className="font-medium">
                  {data.timeToFillByClient.reduce((min, client) => 
                    client.medianDays < min.medianDays ? client : min
                  ).name} - {data.timeToFillByClient.reduce((min, client) => 
                    client.medianDays < min.medianDays ? client : min
                  ).medianDays} days
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
