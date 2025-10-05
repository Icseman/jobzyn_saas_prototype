import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  MessageSquare, 
  Paperclip,
  AtSign,
  TrendingUp,
  Eye,
  Download,
  FileText,
  Users,
  Calendar
} from 'lucide-react'

interface NotesData {
  notesCreated: number
  notesLinkedToJobs: number
  notesLinkedToClients: number
  mentions: number
  attachments: number
  notesOverTime: Array<{
    date: string
    count: number
  }>
}

interface NotesCollaborationProps {
  data: NotesData
  onDrilldown: (type: string, data: any) => void
}

export const NotesCollaboration: React.FC<NotesCollaborationProps> = ({
  data,
  onDrilldown
}) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const formatPercentage = (num: number, total: number) => {
    return ((num / total) * 100).toFixed(1)
  }

  const getEngagementColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getEngagementBadgeVariant = (percentage: number) => {
    if (percentage >= 80) return 'default' as const
    if (percentage >= 60) return 'secondary' as const
    return 'destructive' as const
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Notes Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Notes Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Notes Over Time Chart */}
            <div className="h-48 flex items-end justify-between gap-1 p-4 bg-gray-50 rounded-lg">
              {data.notesOverTime.slice(-14).map((day, index) => {
                const maxCount = Math.max(...data.notesOverTime.slice(-14).map(d => d.count))
                const height = (day.count / maxCount) * 150
                
                return (
                  <div key={index} className="flex flex-col items-center gap-1 flex-1">
                    <div 
                      className="bg-blue-500 rounded-t w-full transition-all duration-300 hover:bg-blue-600"
                      style={{ height: `${height}px` }}
                      title={`${day.count} notes on ${new Date(day.date).toLocaleDateString()}`}
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
                  {formatNumber(data.notesCreated)}
                </div>
                <div className="text-xs text-blue-600">Total Notes</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">
                  {(data.notesCreated / data.notesOverTime.length).toFixed(1)}
                </div>
                <div className="text-xs text-green-600">Avg per Day</div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => onDrilldown('notes', data.notesOverTime)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View notes timeline
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Collaboration Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Collaboration Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Notes Linked to Jobs */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-50">
                  <FileText className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Notes Linked to Jobs</div>
                  <div className="text-sm text-muted-foreground">
                    {formatNumber(data.notesLinkedToJobs)} out of {formatNumber(data.notesCreated)}
                  </div>
                </div>
                <Badge variant="outline">
                  {formatPercentage(data.notesLinkedToJobs, data.notesCreated)}%
                </Badge>
              </div>
              
              <Progress value={parseFloat(formatPercentage(data.notesLinkedToJobs, data.notesCreated))} className="h-2" />
              
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => onDrilldown('jobNotes', { count: data.notesLinkedToJobs })}
              >
                <Eye className="h-4 w-4 mr-2" />
                View job-linked notes
              </Button>
            </div>

            {/* Notes Linked to Clients */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-50">
                  <Users className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Notes Linked to Clients</div>
                  <div className="text-sm text-muted-foreground">
                    {formatNumber(data.notesLinkedToClients)} out of {formatNumber(data.notesCreated)}
                  </div>
                </div>
                <Badge variant="outline">
                  {formatPercentage(data.notesLinkedToClients, data.notesCreated)}%
                </Badge>
              </div>
              
              <Progress value={parseFloat(formatPercentage(data.notesLinkedToClients, data.notesCreated))} className="h-2" />
              
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => onDrilldown('clientNotes', { count: data.notesLinkedToClients })}
              >
                <Eye className="h-4 w-4 mr-2" />
                View client-linked notes
              </Button>
            </div>

            {/* Mentions */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-50">
                  <AtSign className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Mentions Activity</div>
                  <div className="text-sm text-muted-foreground">
                    {formatNumber(data.mentions)} mentions in notes
                  </div>
                </div>
                <Badge variant="outline">
                  {formatPercentage(data.mentions, data.notesCreated)}%
                </Badge>
              </div>
              
              <Progress value={parseFloat(formatPercentage(data.mentions, data.notesCreated))} className="h-2" />
              
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => onDrilldown('mentions', { count: data.mentions })}
              >
                <Eye className="h-4 w-4 mr-2" />
                View mentions activity
              </Button>
            </div>

            {/* Attachments */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50">
                  <Paperclip className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Attachments Uploaded</div>
                  <div className="text-sm text-muted-foreground">
                    {formatNumber(data.attachments)} files attached
                  </div>
                </div>
                <Badge variant="outline">
                  {formatPercentage(data.attachments, data.notesCreated)}%
                </Badge>
              </div>
              
              <Progress value={parseFloat(formatPercentage(data.attachments, data.notesCreated))} className="h-2" />
              
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => onDrilldown('attachments', { count: data.attachments })}
              >
                <Eye className="h-4 w-4 mr-2" />
                View attachments
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Engagement Summary */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Collaboration Engagement Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {formatNumber(data.notesCreated)}
              </div>
              <div className="text-sm text-blue-600">Total Notes</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {formatPercentage(data.notesLinkedToJobs + data.notesLinkedToClients, data.notesCreated * 2)}%
              </div>
              <div className="text-sm text-green-600">Linkage Rate</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {formatNumber(data.mentions)}
              </div>
              <div className="text-sm text-purple-600">Mentions</div>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {formatNumber(data.attachments)}
              </div>
              <div className="text-sm text-orange-600">Attachments</div>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Engagement Score */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-gray-600" />
                <span className="font-medium">Engagement Score</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Overall Score</span>
                  <span className="font-medium">
                    {formatPercentage(data.notesLinkedToJobs + data.notesLinkedToClients + data.mentions + data.attachments, data.notesCreated * 4)}%
                  </span>
                </div>
                <Progress 
                  value={parseFloat(formatPercentage(data.notesLinkedToJobs + data.notesLinkedToClients + data.mentions + data.attachments, data.notesCreated * 4))} 
                  className="h-2" 
                />
              </div>
              
              <div className="mt-3 text-sm text-muted-foreground">
                Based on notes linkage, mentions, and attachments
              </div>
            </div>

            {/* Activity Insights */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">Activity Insights</span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div>
                  <div className="text-muted-foreground">Peak Activity Day</div>
                  <div className="font-medium">
                    {data.notesOverTime.reduce((max, day) => 
                      day.count > max.count ? day : max
                    ).date} - {data.notesOverTime.reduce((max, day) => 
                      day.count > max.count ? day : max
                    ).count} notes
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Average Daily Notes</div>
                  <div className="font-medium">
                    {(data.notesCreated / data.notesOverTime.length).toFixed(1)} notes/day
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Collaboration Rate</div>
                  <div className="font-medium">
                    {formatPercentage(data.mentions, data.notesCreated)}% of notes have mentions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
