import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  LineChart, 
  PieChart,
  Activity,
  Target,
  Users
} from 'lucide-react'

interface TimeSeriesData {
  apiRequests: Array<{
    month: string
    requests: number
    target: number
  }>
  placements: Array<{
    month: string
    placements: number
    target: number
  }>
  users: Array<{
    month: string
    newUsers: number
    activeUsers: number
    sessions: number
  }>
}

interface ChartsSectionProps {
  timeSeriesData: TimeSeriesData
  selectedMetric: 'apiRequests' | 'placements' | 'users'
  selectedPeriod: '7d' | '30d' | '90d' | '1y'
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({
  timeSeriesData,
  selectedMetric,
  selectedPeriod
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

  const getCurrentValue = () => {
    switch (selectedMetric) {
      case 'apiRequests':
        return formatNumber(timeSeriesData.apiRequests[timeSeriesData.apiRequests.length - 1]?.requests || 0)
      case 'placements':
        return formatNumber(timeSeriesData.placements[timeSeriesData.placements.length - 1]?.placements || 0)
      case 'users':
        return formatNumber(timeSeriesData.users[timeSeriesData.users.length - 1]?.activeUsers || 0)
      default:
        return '0'
    }
  }

  const getPreviousValue = () => {
    switch (selectedMetric) {
      case 'apiRequests':
        return formatNumber(timeSeriesData.apiRequests[timeSeriesData.apiRequests.length - 2]?.requests || 0)
      case 'placements':
        return formatNumber(timeSeriesData.placements[timeSeriesData.placements.length - 2]?.placements || 0)
      case 'users':
        return formatNumber(timeSeriesData.users[timeSeriesData.users.length - 2]?.activeUsers || 0)
      default:
        return '0'
    }
  }

  const calculateGrowthRate = () => {
    const current = timeSeriesData.apiRequests[timeSeriesData.apiRequests.length - 1]?.requests || 0
    const previous = timeSeriesData.apiRequests[timeSeriesData.apiRequests.length - 2]?.requests || 0
    if (previous === 0) return 0
    return ((current - previous) / previous * 100).toFixed(1)
  }

  const getMetricIcon = () => {
    switch (selectedMetric) {
      case 'apiRequests':
        return <Activity className="h-5 w-5" />
      case 'placements':
        return <Target className="h-5 w-5" />
      case 'users':
        return <Users className="h-5 w-5" />
      default:
        return <BarChart3 className="h-5 w-5" />
    }
  }

  const getMetricLabel = () => {
    switch (selectedMetric) {
      case 'apiRequests':
        return 'API Requests'
      case 'placements':
        return 'Placements'
      case 'users':
        return 'Active Users'
      default:
        return 'Metric'
    }
  }

  // Mock chart data - in a real app, you'd use a charting library like Chart.js or Recharts
  const renderMockChart = () => {
    const data = selectedMetric === 'apiRequests' ? timeSeriesData.apiRequests : 
                 selectedMetric === 'placements' ? timeSeriesData.placements : 
                 timeSeriesData.users

    return (
      <div className="h-64 flex items-end justify-between gap-2 p-4">
        {data.slice(-6).map((item, index) => {
          const value = selectedMetric === 'apiRequests' ? item.requests : 
                       selectedMetric === 'placements' ? item.placements : 
                       item.activeUsers
          const maxValue = Math.max(...data.slice(-6).map(d => 
            selectedMetric === 'apiRequests' ? d.requests : 
            selectedMetric === 'placements' ? d.placements : 
            d.activeUsers
          ))
          const height = (value / maxValue) * 200

          return (
            <div key={index} className="flex flex-col items-center gap-2 flex-1">
              <div 
                className="bg-orange-500 rounded-t w-full transition-all duration-300 hover:bg-orange-600"
                style={{ height: `${height}px` }}
                title={`${selectedMetric === 'apiRequests' ? formatNumber(value) : formatNumber(value)}`}
              ></div>
              <span className="text-xs text-muted-foreground">
                {new Date(item.month).toLocaleDateString('en-US', { month: 'short' })}
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Chart */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {getMetricIcon()}
              {getMetricLabel()} Trend
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              {selectedPeriod}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div>
                <div className="text-3xl font-bold">{getCurrentValue()}</div>
                <div className="text-sm text-muted-foreground">
                  Current {getMetricLabel().toLowerCase()}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {parseFloat(calculateGrowthRate()) >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-orange-600" />
                )}
                <span className={`text-sm font-medium ${
                  parseFloat(calculateGrowthRate()) >= 0 ? 'text-orange-600' : 'text-orange-600'
                }`}>
                  {calculateGrowthRate()}%
                </span>
              </div>
            </div>
            {renderMockChart()}
          </div>
        </CardContent>
      </Card>

      {/* Secondary Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Key Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Target Achievement</span>
              <Badge variant="outline">87%</Badge>
            </div>
            <div className="w-full bg-orange-200 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '87%' }}></div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Conversion Rate</span>
              <Badge variant="outline">18.7%</Badge>
            </div>
            <div className="w-full bg-orange-200 rounded-full h-2">
              <div className="bg-orange-400 h-2 rounded-full" style={{ width: '18.7%' }}></div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Client Satisfaction</span>
              <Badge variant="outline">4.6/5</Badge>
            </div>
            <div className="w-full bg-orange-200 rounded-full h-2">
              <div className="bg-orange-300 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Team Productivity</span>
              <Badge variant="outline">87.3%</Badge>
            </div>
            <div className="w-full bg-orange-200 rounded-full h-2">
              <div className="bg-orange-600 h-2 rounded-full" style={{ width: '87.3%' }}></div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              <div className="flex justify-between mb-1">
                <span>Previous Period</span>
                <span>{getPreviousValue()}</span>
              </div>
              <div className="flex justify-between">
                <span>Growth Rate</span>
                <span className={parseFloat(calculateGrowthRate()) >= 0 ? 'text-orange-600' : 'text-orange-600'}>
                  {calculateGrowthRate()}%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
