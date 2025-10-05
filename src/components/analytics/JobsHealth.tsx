import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  Clock, 
  Briefcase,
  AlertTriangle,
  CheckCircle,
  Eye,
  Download,
  TrendingUp
} from 'lucide-react'

interface JobsHealthData {
  agingBuckets: Array<{
    bucket: string
    count: number
    percentage: number
  }>
  statusSplit: Array<{
    status: string
    count: number
    percentage: number
  }>
  prioritySplit: Array<{
    priority: string
    count: number
    percentage: number
  }>
  filledVsTotal: Array<{
    jobId: string
    title: string
    filled: number
    total: number
    status: string
  }>
}

interface JobsHealthProps {
  data: JobsHealthData
  onDrilldown: (type: string, data: any) => void
}

export const JobsHealth: React.FC<JobsHealthProps> = ({
  data,
  onDrilldown
}) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const getAgingColor = (bucket: string) => {
    const colors: { [key: string]: string } = {
      '0-14': 'bg-green-500',
      '15-30': 'bg-yellow-500',
      '31-45': 'bg-orange-500',
      '46+': 'bg-red-500'
    }
    return colors[bucket] || 'bg-gray-500'
  }

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'open': 'bg-green-500',
      'draft': 'bg-gray-500',
      'on_hold': 'bg-yellow-500',
      'closed': 'bg-blue-500'
    }
    return colors[status] || 'bg-gray-500'
  }

  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      'high': 'bg-red-500',
      'normal': 'bg-blue-500',
      'low': 'bg-gray-500'
    }
    return colors[priority] || 'bg-gray-500'
  }

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      'open': 'Open',
      'draft': 'Draft',
      'on_hold': 'On Hold',
      'closed': 'Closed'
    }
    return labels[status] || status
  }

  const getPriorityLabel = (priority: string) => {
    const labels: { [key: string]: string } = {
      'high': 'High',
      'normal': 'Normal',
      'low': 'Low'
    }
    return labels[priority] || priority
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Aging Buckets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Aging Buckets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.agingBuckets.map((bucket) => (
              <div key={bucket.bucket} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 ${getAgingColor(bucket.bucket)} rounded`}></div>
                    <span className="font-medium">{bucket.bucket} days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{formatNumber(bucket.count)}</span>
                    <Badge variant="outline">{bucket.percentage.toFixed(1)}%</Badge>
                  </div>
                </div>
                
                <Progress value={bucket.percentage} className="h-2" />
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => onDrilldown('aging', bucket)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View jobs in {bucket.bucket} days bucket
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status Split */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Status Split
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.statusSplit.map((status) => (
              <div key={status.status} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 ${getStatusColor(status.status)} rounded`}></div>
                    <span className="font-medium">{getStatusLabel(status.status)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{formatNumber(status.count)}</span>
                    <Badge variant="outline">{status.percentage.toFixed(1)}%</Badge>
                  </div>
                </div>
                
                <Progress value={status.percentage} className="h-2" />
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => onDrilldown('status', status)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View {getStatusLabel(status.status).toLowerCase()} jobs
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Priority Split */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Priority Split
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.prioritySplit.map((priority) => (
              <div key={priority.priority} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 ${getPriorityColor(priority.priority)} rounded`}></div>
                    <span className="font-medium">{getPriorityLabel(priority.priority)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{formatNumber(priority.count)}</span>
                    <Badge variant="outline">{priority.percentage.toFixed(1)}%</Badge>
                  </div>
                </div>
                
                <Progress value={priority.percentage} className="h-2" />
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => onDrilldown('priority', priority)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View {getPriorityLabel(priority.priority).toLowerCase()} priority jobs
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filled vs Total */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Filled vs Total
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.filledVsTotal.map((job) => {
              const fillRate = ((job.filled / job.total) * 100).toFixed(1)
              const isComplete = job.filled === job.total
              
              return (
                <div key={job.jobId} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{job.title}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {job.filled}/{job.total}
                      </span>
                      <Badge variant={isComplete ? 'default' : 'secondary'}>
                        {fillRate}%
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{job.filled} filled out of {job.total} total</span>
                      <span className={isComplete ? 'text-green-600' : 'text-orange-600'}>
                        {isComplete ? 'Complete' : 'In Progress'}
                      </span>
                    </div>
                    <Progress value={parseFloat(fillRate)} className="h-2" />
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => onDrilldown('job', job)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View job details
                  </Button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Health Summary */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Jobs Health Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {data.statusSplit.find(s => s.status === 'open')?.count || 0}
              </div>
              <div className="text-sm text-green-600">Active Jobs</div>
            </div>
            
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {data.agingBuckets.find(b => b.bucket === '31-45')?.count || 0}
              </div>
              <div className="text-sm text-yellow-600">At Risk (31-45 days)</div>
            </div>
            
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {data.agingBuckets.find(b => b.bucket === '46+')?.count || 0}
              </div>
              <div className="text-sm text-red-600">Critical (46+ days)</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {data.prioritySplit.find(p => p.priority === 'high')?.count || 0}
              </div>
              <div className="text-sm text-blue-600">High Priority</div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-orange-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <span className="font-medium text-orange-900">Attention Required</span>
            </div>
            <div className="text-sm text-orange-800">
              {data.agingBuckets.find(b => b.bucket === '46+')?.count || 0} jobs have been open for more than 46 days. 
              Consider reviewing requirements or expanding the search criteria.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
