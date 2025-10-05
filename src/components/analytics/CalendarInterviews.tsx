import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  Clock,
  Users,
  AlertTriangle,
  TrendingUp,
  Eye,
  Download,
  Video,
  Phone,
  MapPin
} from 'lucide-react'

interface CalendarData {
  interviewsPerDay: Array<{
    date: string
    count: number
  }>
  noShowRatePct: number
  schedulingLatencyHoursMedian: number
  roomUtilizationPct: number
  interviewTypes: Array<{
    type: string
    count: number
    noShowRate: number
  }>
}

interface CalendarInterviewsProps {
  data: CalendarData
  onDrilldown: (type: string, data: any) => void
}

export const CalendarInterviews: React.FC<CalendarInterviewsProps> = ({
  data,
  onDrilldown
}) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
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

  const getInterviewTypeIcon = (type: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'phone': <Phone className="h-4 w-4" />,
      'video': <Video className="h-4 w-4" />,
      'onsite': <MapPin className="h-4 w-4" />
    }
    return icons[type] || <Calendar className="h-4 w-4" />
  }

  const getInterviewTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'phone': 'text-blue-600',
      'video': 'text-green-600',
      'onsite': 'text-purple-600'
    }
    return colors[type] || 'text-gray-600'
  }

  const getInterviewTypeBgColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'phone': 'bg-blue-50',
      'video': 'bg-green-50',
      'onsite': 'bg-purple-50'
    }
    return colors[type] || 'bg-gray-50'
  }

  const getNoShowRateColor = (rate: number) => {
    if (rate > 10) return 'text-red-600'
    if (rate > 5) return 'text-orange-600'
    return 'text-green-600'
  }

  const getNoShowRateBadgeVariant = (rate: number) => {
    if (rate > 10) return 'destructive' as const
    if (rate > 5) return 'default' as const
    return 'secondary' as const
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Interviews per Day */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Interviews per Day
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Line Chart */}
            <div className="h-64 flex items-end justify-between gap-1 p-4 bg-gray-50 rounded-lg">
              {data.interviewsPerDay.slice(-14).map((day, index) => {
                const maxCount = Math.max(...data.interviewsPerDay.slice(-14).map(d => d.count))
                const height = (day.count / maxCount) * 200
                
                return (
                  <div key={index} className="flex flex-col items-center gap-1 flex-1">
                    <div 
                      className="bg-blue-500 rounded-t w-full transition-all duration-300 hover:bg-blue-600"
                      style={{ height: `${height}px` }}
                      title={`${day.count} interviews on ${new Date(day.date).toLocaleDateString()}`}
                    ></div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">
                  {formatNumber(data.interviewsPerDay.reduce((sum, day) => sum + day.count, 0))}
                </div>
                <div className="text-xs text-blue-600">Total Interviews</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">
                  {(data.interviewsPerDay.reduce((sum, day) => sum + day.count, 0) / data.interviewsPerDay.length).toFixed(1)}
                </div>
                <div className="text-xs text-green-600">Avg per Day</div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => onDrilldown('calendar', data.interviewsPerDay)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View calendar details
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Interview Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Interview Types
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.interviewTypes.map((type) => {
              const totalInterviews = data.interviewTypes.reduce((sum, t) => sum + t.count, 0)
              const percentage = ((type.count / totalInterviews) * 100).toFixed(1)
              
              return (
                <div key={type.type} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getInterviewTypeBgColor(type.type)}`}>
                      <div className={getInterviewTypeColor(type.type)}>
                        {getInterviewTypeIcon(type.type)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium capitalize">{type.type}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatNumber(type.count)} interviews
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{percentage}%</Badge>
                      <Badge variant={getNoShowRateBadgeVariant(type.noShowRate)}>
                        {type.noShowRate.toFixed(1)}% no-show
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Distribution</span>
                      <span className="font-medium">{percentage}%</span>
                    </div>
                    <Progress value={parseFloat(percentage)} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="space-y-1">
                      <div className="text-muted-foreground">Total Count</div>
                      <div className="font-medium">{formatNumber(type.count)}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-muted-foreground">No-Show Rate</div>
                      <div className={`font-medium ${getNoShowRateColor(type.noShowRate)}`}>
                        {type.noShowRate.toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => onDrilldown('type', type)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View {type.type} interviews
                  </Button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Interview Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* No-Show Rate */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">
                  <span className={getNoShowRateColor(data.noShowRatePct)}>
                    {data.noShowRatePct.toFixed(1)}%
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">No-Show Rate</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Target: &lt;5%</span>
                  <Badge variant={getNoShowRateBadgeVariant(data.noShowRatePct)}>
                    {data.noShowRatePct > 5 ? 'Above Target' : 'Within Target'}
                  </Badge>
                </div>
                <Progress value={Math.min(data.noShowRatePct, 20)} className="h-2" />
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => onDrilldown('noShow', { rate: data.noShowRatePct })}
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                View no-show analysis
              </Button>
            </div>

            {/* Scheduling Latency */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2 text-blue-600">
                  {formatHours(data.schedulingLatencyHoursMedian)}
                </div>
                <div className="text-sm text-muted-foreground">Scheduling Latency</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Target: &lt;24h</span>
                  <Badge variant={data.schedulingLatencyHoursMedian > 24 ? 'destructive' : 'default'}>
                    {data.schedulingLatencyHoursMedian > 24 ? 'Above Target' : 'Within Target'}
                  </Badge>
                </div>
                <Progress value={Math.min((data.schedulingLatencyHoursMedian / 48) * 100, 100)} className="h-2" />
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => onDrilldown('latency', { hours: data.schedulingLatencyHoursMedian })}
              >
                <Clock className="h-4 w-4 mr-2" />
                View scheduling analysis
              </Button>
            </div>

            {/* Room Utilization */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2 text-green-600">
                  {data.roomUtilizationPct.toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">Room Utilization</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Target: 60-80%</span>
                  <Badge variant={
                    data.roomUtilizationPct >= 60 && data.roomUtilizationPct <= 80 ? 'default' : 'secondary'
                  }>
                    {data.roomUtilizationPct >= 60 && data.roomUtilizationPct <= 80 ? 'Optimal' : 'Suboptimal'}
                  </Badge>
                </div>
                <Progress value={data.roomUtilizationPct} className="h-2" />
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => onDrilldown('rooms', { utilization: data.roomUtilizationPct })}
              >
                <MapPin className="h-4 w-4 mr-2" />
                View room utilization
              </Button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900">Interview Insights</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Most Popular Type</div>
                <div className="font-medium">
                  {data.interviewTypes.reduce((max, type) => 
                    type.count > max.count ? type : max
                  ).type} - {data.interviewTypes.reduce((max, type) => 
                    type.count > max.count ? type : max
                  ).count} interviews
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Best No-Show Rate</div>
                <div className="font-medium">
                  {data.interviewTypes.reduce((min, type) => 
                    type.noShowRate < min.noShowRate ? type : min
                  ).type} - {data.interviewTypes.reduce((min, type) => 
                    type.noShowRate < min.noShowRate ? type : min
                  ).noShowRate.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
