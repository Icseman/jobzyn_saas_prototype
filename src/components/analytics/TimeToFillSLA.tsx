import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  Clock, 
  AlertTriangle,
  TrendingUp,
  Users,
  Eye,
  Download
} from 'lucide-react'

interface SLAData {
  breachesByStage: Array<{
    stage: string
    breaches: number
    total: number
    breachRate: number
  }>
  firstResponseHoursByOwner: Array<{
    ownerId: string
    name: string
    medianHours: number
  }>
  timeToFillByClient: Array<{
    clientId: string
    name: string
    medianDays: number
  }>
  timeToFillTrend: Array<{
    date: string
    medianDays: number
  }>
}

interface TimeToFillSLAProps {
  data: SLAData
  onDrilldown: (type: string, data: any) => void
}

export const TimeToFillSLA: React.FC<TimeToFillSLAProps> = ({
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

  const getBreachColor = (rate: number) => {
    if (rate > 5) return 'text-red-600'
    if (rate > 2) return 'text-orange-600'
    return 'text-green-600'
  }

  const getBreachBadgeVariant = (rate: number) => {
    if (rate > 5) return 'destructive' as const
    if (rate > 2) return 'default' as const
    return 'secondary' as const
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* SLA Breaches */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            SLA Breaches by Stage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.breachesByStage.map((stage) => (
              <div key={stage.stage} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium capitalize">{stage.stage}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{formatNumber(stage.breaches)}</span>
                    <Badge variant={getBreachBadgeVariant(stage.breachRate)}>
                      {stage.breachRate.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{formatNumber(stage.breaches)} breaches out of {formatNumber(stage.total)}</span>
                    <span className={getBreachColor(stage.breachRate)}>
                      {stage.breachRate.toFixed(1)}% breach rate
                    </span>
                  </div>
                  <Progress value={stage.breachRate} className="h-2" />
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => onDrilldown('breaches', stage)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View breach details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Response Time Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            First Response Time by Owner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.firstResponseHoursByOwner.map((owner) => {
              const isSlow = owner.medianHours > 12
              const isFast = owner.medianHours < 6
              
              return (
                <div key={owner.ownerId} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{owner.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{formatHours(owner.medianHours)}</span>
                      <Badge variant={isSlow ? 'destructive' : isFast ? 'default' : 'secondary'}>
                        {isSlow ? 'Slow' : isFast ? 'Fast' : 'Normal'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Median response time</span>
                      <span className={isSlow ? 'text-red-600' : isFast ? 'text-green-600' : 'text-gray-600'}>
                        {owner.medianHours.toFixed(1)} hours
                      </span>
                    </div>
                    <Progress 
                      value={Math.min((owner.medianHours / 24) * 100, 100)} 
                      className="h-2" 
                    />
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => onDrilldown('owner', owner)}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    View owner profile
                  </Button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Time to Fill Trend */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Time to Fill Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Trend Line Chart */}
            <div className="h-64 flex items-end justify-between gap-2 p-4 bg-gray-50 rounded-lg">
              {data.timeToFillTrend.map((point, index) => {
                const maxDays = Math.max(...data.timeToFillTrend.map(p => p.medianDays))
                const height = (point.medianDays / maxDays) * 200
                
                return (
                  <div key={index} className="flex flex-col items-center gap-2 flex-1">
                    <div 
                      className="bg-blue-500 rounded-t w-full transition-all duration-300 hover:bg-blue-600"
                      style={{ height: `${height}px` }}
                      title={`${point.medianDays} days`}
                    ></div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Target Band */}
            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm font-medium">Target Band: 20-30 days</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-sm font-medium">Warning: 30-40 days</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm font-medium">Critical: 40+ days</span>
              </div>
            </div>

            {/* Time to Fill by Client */}
            <div className="mt-4">
              <h4 className="font-medium mb-3">Time to Fill by Client</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.timeToFillByClient.map((client) => {
                  const isSlow = client.medianDays > 35
                  const isFast = client.medianDays < 25
                  
                  return (
                    <div key={client.clientId} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <span className="font-medium">{client.name}</span>
                        <div className="text-sm text-muted-foreground">
                          {client.medianDays} days median
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={isSlow ? 'destructive' : isFast ? 'default' : 'secondary'}>
                          {isSlow ? 'Slow' : isFast ? 'Fast' : 'Normal'}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDrilldown('client', client)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
