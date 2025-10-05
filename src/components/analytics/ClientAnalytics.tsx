import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Building2, 
  Briefcase, 
  DollarSign,
  Clock,
  Star,
  Users,
  Target,
  Award,
  Crown
} from 'lucide-react'

interface Client {
  id: string
  name: string
  logo: string
  industry: string
    metrics: {
      totalJobs: number
      activeJobs: number
      completedJobs: number
      placements: number
      apiCalls: number
      avgTimeToFill: number
      satisfaction: number
      retentionRate: number
    }
  trend: 'up' | 'down' | 'stable'
  change: string
}

interface SalaryTrend {
  role: string
  avgSalary: number
  trend: string
}

interface ClientAnalyticsProps {
  clientData: Client[]
  topClients: Client[]
  salaryTrends: SalaryTrend[]
}

export const ClientAnalytics: React.FC<ClientAnalyticsProps> = ({
  clientData,
  topClients,
  salaryTrends
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />
      case 'stable':
        return <Minus className="h-4 w-4 text-gray-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      case 'stable':
        return 'text-gray-600'
      default:
        return 'text-gray-600'
    }
  }

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 1:
        return <Award className="h-5 w-5 text-gray-400" />
      case 2:
        return <Target className="h-5 w-5 text-orange-500" />
      default:
        return <Target className="h-5 w-5 text-gray-400" />
    }
  }

  const getIndustryColor = (industry: string) => {
    switch (industry.toLowerCase()) {
      case 'technology':
        return 'bg-blue-100 text-blue-800'
      case 'healthcare':
        return 'bg-green-100 text-green-800'
      case 'finance':
        return 'bg-purple-100 text-purple-800'
      case 'automotive':
        return 'bg-orange-100 text-orange-800'
      case 'education':
        return 'bg-pink-100 text-pink-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Clients */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5" />
            Top Clients
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topClients.map((client, index) => (
              <div key={client.id} className="flex items-center gap-4 p-4 rounded-lg border">
                <div className="flex items-center gap-3 flex-1">
                  {getRankIcon(index)}
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={client.logo} />
                    <AvatarFallback>
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{client.name}</div>
                    <div className="flex items-center gap-2">
                      <Badge className={getIndustryColor(client.industry)}>
                        {client.industry}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {client.metrics.totalJobs} jobs
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{formatNumber(client.metrics.apiCalls)}</div>
                  <div className="text-sm text-muted-foreground">
                    {client.metrics.placements} placements
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {getTrendIcon(client.trend)}
                  <span className={`text-sm font-medium ${getTrendColor(client.trend)}`}>
                    {client.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Client Performance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Client Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clientData.map((client) => (
                <div key={client.id} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={client.logo} />
                      <AvatarFallback>
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{client.name}</div>
                      <div className="text-xs text-muted-foreground">{client.industry}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(client.trend)}
                      <span className={`text-xs font-medium ${getTrendColor(client.trend)}`}>
                        {client.change}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-3 w-3 text-blue-500" />
                        <span className="text-muted-foreground">Jobs</span>
                      </div>
                      <div className="font-medium">{client.metrics.totalJobs}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-green-500" />
                        <span className="text-muted-foreground">Placements</span>
                      </div>
                      <div className="font-medium">{client.metrics.placements}</div>
                    </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-purple-500" />
                      <span className="text-muted-foreground">API Calls</span>
                    </div>
                    <div className="font-medium">{formatNumber(client.metrics.apiCalls)}</div>
                  </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-orange-500" />
                        <span className="text-muted-foreground">Avg Time</span>
                      </div>
                      <div className="font-medium">{client.metrics.avgTimeToFill}d</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Satisfaction</span>
                      <span className="font-medium">{client.metrics.satisfaction}/5</span>
                    </div>
                    <Progress value={(client.metrics.satisfaction / 5) * 100} className="h-1" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Retention Rate</span>
                      <span className="font-medium">{client.metrics.retentionRate}%</span>
                    </div>
                    <Progress value={client.metrics.retentionRate} className="h-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Salary Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Salary Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salaryTrends.map((trend, index) => {
                const isPositive = trend.trend.startsWith('+')
                const trendColor = isPositive ? 'text-green-600' : 'text-red-600'
                
                return (
                  <div key={trend.role} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-sm">{trend.role}</div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{formatCurrency(trend.avgSalary)}</span>
                        <Badge 
                          variant={isPositive ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {trend.trend}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            index < 3 ? 'bg-blue-500' : 
                            index < 6 ? 'bg-green-500' : 
                            'bg-gray-500'
                          }`}
                          style={{ 
                            width: `${Math.min((trend.avgSalary / 120000) * 100, 100)}%` 
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {((trend.avgSalary / 120000) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Client Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {clientData.length}
              </div>
              <div className="text-sm text-blue-600">Active Clients</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {formatNumber(clientData.reduce((sum, client) => sum + client.metrics.apiCalls, 0))}
              </div>
              <div className="text-sm text-green-600">Total API Calls</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {(clientData.reduce((sum, client) => sum + client.metrics.satisfaction, 0) / clientData.length).toFixed(1)}/5
              </div>
              <div className="text-sm text-purple-600">Avg Satisfaction</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {(clientData.reduce((sum, client) => sum + client.metrics.retentionRate, 0) / clientData.length).toFixed(1)}%
              </div>
              <div className="text-sm text-orange-600">Avg Retention</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
