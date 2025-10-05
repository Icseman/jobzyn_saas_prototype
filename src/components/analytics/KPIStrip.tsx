import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Briefcase, 
  Target,
  Users,
  AlertTriangle,
  Calendar,
  UserCheck,
  MessageSquare,
  Timer
} from 'lucide-react'

interface KPIData {
  timeToFillMedianDays: { value: number; deltaPct: number }
  activeJobs: { value: number; deltaPct: number }
  offerRatePct: { value: number; deltaPct: number }
  hires: { value: number; deltaPct: number }
  agingOverThreshold: { value: number; deltaPct: number }
  interviewsScheduled: { value: number; deltaPct: number }
  applicantsPerJobMedian: { value: number; deltaPct: number }
  firstResponseMedianHours: { value: number; deltaPct: number }
}

interface KPIStripProps {
  data: KPIData
}

export const KPIStrip: React.FC<KPIStripProps> = ({ data }) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`
  }

  const formatHours = (hours: number) => {
    if (hours < 24) {
      return `${hours.toFixed(1)}h`
    } else {
      const days = Math.floor(hours / 24)
      const remainingHours = hours % 24
      return remainingHours > 0 ? `${days}d ${remainingHours.toFixed(0)}h` : `${days}d`
    }
  }

  const getTrendIcon = (delta: number) => {
    if (delta > 0) {
      return <TrendingUp className="h-3 w-3 text-green-600" />
    } else if (delta < 0) {
      return <TrendingDown className="h-3 w-3 text-red-600" />
    } else {
      return <div className="h-3 w-3 bg-gray-400 rounded-full"></div>
    }
  }

  const getTrendColor = (delta: number) => {
    if (delta > 0) {
      return 'text-green-600'
    } else if (delta < 0) {
      return 'text-red-600'
    } else {
      return 'text-gray-600'
    }
  }

  const getTrendBadgeVariant = (delta: number) => {
    if (delta > 0) {
      return 'default' as const
    } else if (delta < 0) {
      return 'destructive' as const
    } else {
      return 'secondary' as const
    }
  }

  // Primary KPIs
  const primaryKPIs = [
    {
      title: 'Time to Fill (Median)',
      value: `${data.timeToFillMedianDays.value} days`,
      delta: data.timeToFillMedianDays.deltaPct,
      icon: <Clock className="h-4 w-4" />,
      description: 'Median time to fill positions',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Jobs',
      value: formatNumber(data.activeJobs.value),
      delta: data.activeJobs.deltaPct,
      icon: <Briefcase className="h-4 w-4" />,
      description: 'Currently open positions',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Offer Rate',
      value: formatPercentage(data.offerRatePct.value),
      delta: data.offerRatePct.deltaPct,
      icon: <Target className="h-4 w-4" />,
      description: 'Percentage of interviews leading to offers',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Hires',
      value: formatNumber(data.hires.value),
      delta: data.hires.deltaPct,
      icon: <UserCheck className="h-4 w-4" />,
      description: 'Successful placements this period',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Aging Jobs',
      value: formatNumber(data.agingOverThreshold.value),
      delta: data.agingOverThreshold.deltaPct,
      icon: <AlertTriangle className="h-4 w-4" />,
      description: 'Jobs open over threshold',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Interviews Scheduled',
      value: formatNumber(data.interviewsScheduled.value),
      delta: data.interviewsScheduled.deltaPct,
      icon: <Calendar className="h-4 w-4" />,
      description: 'Interviews scheduled this period',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ]

  // Secondary KPIs
  const secondaryKPIs = [
    {
      title: 'Applicants per Job',
      value: formatNumber(data.applicantsPerJobMedian.value),
      delta: data.applicantsPerJobMedian.deltaPct,
      icon: <Users className="h-4 w-4" />,
      description: 'Median applicants per job',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50'
    },
    {
      title: 'Response Time',
      value: formatHours(data.firstResponseMedianHours.value),
      delta: data.firstResponseMedianHours.deltaPct,
      icon: <Timer className="h-4 w-4" />,
      description: 'Median response time to applicants',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    }
  ]

  const renderKPICard = (kpi: any, isSecondary = false) => (
    <Card key={kpi.title} className={`hover:shadow-md transition-shadow ${isSecondary ? 'opacity-90' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
            <div className={kpi.color}>
              {kpi.icon}
            </div>
          </div>
          <div className="flex items-center gap-1">
            {getTrendIcon(kpi.delta)}
            <Badge 
              variant={getTrendBadgeVariant(kpi.delta)}
              className="text-xs"
            >
              {kpi.delta > 0 ? '+' : ''}{kpi.delta.toFixed(1)}%
            </Badge>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="text-lg font-bold">{kpi.value}</div>
          <div className="text-xs text-muted-foreground">{kpi.title}</div>
          <div className="text-xs text-muted-foreground">{kpi.description}</div>
        </div>

        {/* Mini Sparkline */}
        <div className="mt-3 h-8 flex items-end gap-1">
          {[1, 2, 3, 4, 5, 6, 7].map((_, index) => {
            const height = Math.random() * 20 + 10
            return (
              <div
                key={index}
                className="bg-gray-300 rounded-t w-2"
                style={{ height: `${height}px` }}
              ></div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-4">
      {/* Primary KPIs */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Primary KPIs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {primaryKPIs.map(kpi => renderKPICard(kpi))}
        </div>
      </div>

      {/* Secondary KPIs */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Secondary KPIs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {secondaryKPIs.map(kpi => renderKPICard(kpi, true))}
        </div>
      </div>
    </div>
  )
}
