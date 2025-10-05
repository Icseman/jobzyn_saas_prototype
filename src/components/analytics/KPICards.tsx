import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Target, 
  Star,
  Activity,
  Building2,
  UserCheck,
  Calendar
} from 'lucide-react'

interface OverviewData {
  totalJobs: number
  activeJobs: number
  completedJobs: number
  totalCandidates: number
  placedCandidates: number
  activeClients: number
  totalUsers: number
  monthlyActiveUsers: number
  avgTimeToFill: number
  placementRate: number
  clientSatisfaction: number
  platformUptime: number
  apiRequests: number
  monthlyApiRequests: number
}

interface KPICardsProps {
  data: OverviewData
}

export const KPICards: React.FC<KPICardsProps> = ({ data }) => {
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

  const getTrendIcon = (value: number, threshold: number) => {
    if (value >= threshold) {
      return <TrendingUp className="h-4 w-4 text-green-600" />
    } else {
      return <TrendingDown className="h-4 w-4 text-red-600" />
    }
  }

  const getTrendColor = (value: number, threshold: number) => {
    return value >= threshold ? 'text-green-600' : 'text-red-600'
  }

  const kpiCards = [
    {
      title: 'Total API Requests',
      value: formatNumber(data.apiRequests),
      icon: <Activity className="h-5 w-5" />,
      change: '+12.5%',
      trend: 'up',
      description: 'Total API requests processed',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Monthly API Requests',
      value: formatNumber(data.monthlyApiRequests),
      icon: <TrendingUp className="h-5 w-5" />,
      change: '+8.3%',
      trend: 'up',
      description: 'Current month API requests',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Placements',
      value: formatNumber(data.placedCandidates),
      icon: <UserCheck className="h-5 w-5" />,
      change: '+15.2%',
      trend: 'up',
      description: 'Candidates successfully placed',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Placement Rate',
      value: `${data.placementRate}%`,
      icon: <Target className="h-5 w-5" />,
      change: '+2.1%',
      trend: 'up',
      description: 'Success rate of placements',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Active Jobs',
      value: formatNumber(data.activeJobs),
      icon: <Briefcase className="h-5 w-5" />,
      change: '+5.7%',
      trend: 'up',
      description: 'Currently open positions',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'Total Users',
      value: formatNumber(data.totalUsers),
      icon: <Users className="h-5 w-5" />,
      change: '+18.4%',
      trend: 'up',
      description: 'Total platform users',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50'
    },
    {
      title: 'Monthly Active Users',
      value: formatNumber(data.monthlyActiveUsers),
      icon: <Activity className="h-5 w-5" />,
      change: '+12.3%',
      trend: 'up',
      description: 'Active users this month',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'Avg Time to Fill',
      value: `${data.avgTimeToFill} days`,
      icon: <Clock className="h-5 w-5" />,
      change: '-3.2%',
      trend: 'down',
      description: 'Average hiring time',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Client Satisfaction',
      value: `${data.clientSatisfaction}/5`,
      icon: <Star className="h-5 w-5" />,
      change: '+0.3',
      trend: 'up',
      description: 'Average client rating',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Platform Uptime',
      value: `${data.platformUptime}%`,
      icon: <Activity className="h-5 w-5" />,
      change: '+0.2%',
      trend: 'up',
      description: 'Platform availability',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      title: 'Active Clients',
      value: formatNumber(data.activeClients),
      icon: <Building2 className="h-5 w-5" />,
      change: '+7.8%',
      trend: 'up',
      description: 'Current client partnerships',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {kpiCards.map((card, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${card.bgColor}`}>
              <div className={card.color}>
                {card.icon}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={card.trend === 'up' ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {card.change}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  vs last period
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
