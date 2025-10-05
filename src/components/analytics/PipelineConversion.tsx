import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  TrendingDown, 
  Users, 
  Eye,
  Download,
  ChevronRight
} from 'lucide-react'

interface PipelineData {
  stages: Array<{
    name: string
    count: number
  }>
  dropOffReasons: Array<{
    reason: string
    count: number
  }>
  conversionByJob: Array<{
    jobId: string
    title: string
    applied: number
    screening: number
    interview: number
    offer: number
    hired: number
  }>
}

interface PipelineConversionProps {
  data: PipelineData
  onDrilldown: (type: string, data: any) => void
}

export const PipelineConversion: React.FC<PipelineConversionProps> = ({
  data,
  onDrilldown
}) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const calculateConversionRate = (current: number, previous: number) => {
    if (previous === 0) return 0
    return ((current / previous) * 100).toFixed(1)
  }

  const getStageLabel = (stage: string) => {
    const labels: { [key: string]: string } = {
      'applied': 'Applied',
      'screening': 'Screening',
      'interview': 'Interview',
      'offer': 'Offer',
      'hired': 'Hired'
    }
    return labels[stage] || stage
  }

  const getStageColor = (stage: string) => {
    const colors: { [key: string]: string } = {
      'applied': 'bg-blue-500',
      'screening': 'bg-yellow-500',
      'interview': 'bg-orange-500',
      'offer': 'bg-purple-500',
      'hired': 'bg-green-500'
    }
    return colors[stage] || 'bg-gray-500'
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Funnel Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Pipeline Funnel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.stages.map((stage, index) => {
              const nextStage = data.stages[index + 1]
              const conversionRate = nextStage ? calculateConversionRate(nextStage.count, stage.count) : 0
              const percentage = ((stage.count / data.stages[0].count) * 100).toFixed(1)
              
              return (
                <div key={stage.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 ${getStageColor(stage.name)} rounded-full flex items-center justify-center text-white text-xs font-medium`}>
                        {index + 1}
                      </div>
                      <span className="font-medium">{getStageLabel(stage.name)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{formatNumber(stage.count)}</span>
                      <Badge variant="outline">{percentage}%</Badge>
                    </div>
                  </div>
                  
                  <Progress value={parseFloat(percentage)} className="h-3" />
                  
                  {nextStage && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <TrendingDown className="h-3 w-3" />
                      <span>Conversion to {getStageLabel(nextStage.name)}: {conversionRate}%</span>
                    </div>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-between"
                    onClick={() => onDrilldown('stage', { stage: stage.name, count: stage.count })}
                  >
                    <span>View {getStageLabel(stage.name)} candidates</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Drop Off Reasons */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            Drop Off Reasons
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.dropOffReasons.map((reason, index) => {
              const totalDropOffs = data.dropOffReasons.reduce((sum, r) => sum + r.count, 0)
              const percentage = ((reason.count / totalDropOffs) * 100).toFixed(1)
              
              return (
                <div key={reason.reason} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium capitalize">{reason.reason.replace('_', ' ')}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{formatNumber(reason.count)}</span>
                      <Badge variant="outline">{percentage}%</Badge>
                    </div>
                  </div>
                  
                  <Progress value={parseFloat(percentage)} className="h-2" />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Conversion by Job */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Conversion by Job
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Job Title</th>
                  <th className="text-center p-2">Applied</th>
                  <th className="text-center p-2">Screening</th>
                  <th className="text-center p-2">Interview</th>
                  <th className="text-center p-2">Offer</th>
                  <th className="text-center p-2">Hired</th>
                  <th className="text-center p-2">Conversion Rate</th>
                  <th className="text-center p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.conversionByJob.map((job) => {
                  const conversionRate = ((job.hired / job.applied) * 100).toFixed(1)
                  
                  return (
                    <tr key={job.jobId} className="border-b">
                      <td className="p-2 font-medium">{job.title}</td>
                      <td className="text-center p-2">{formatNumber(job.applied)}</td>
                      <td className="text-center p-2">{formatNumber(job.screening)}</td>
                      <td className="text-center p-2">{formatNumber(job.interview)}</td>
                      <td className="text-center p-2">{formatNumber(job.offer)}</td>
                      <td className="text-center p-2">{formatNumber(job.hired)}</td>
                      <td className="text-center p-2">
                        <Badge variant="outline">{conversionRate}%</Badge>
                      </td>
                      <td className="text-center p-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDrilldown('job', job)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
