import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Users, 
  Briefcase, 
  DollarSign,
  Clock,
  Star,
  Activity,
  Trophy,
  Medal,
  Award
} from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
    metrics: {
      placements: number
      apiCalls: number
      candidatesScreened: number
      interviews: number
      avgTimeToFill: number
      clientSatisfaction: number
      productivity: number
    }
  trend: 'up' | 'down' | 'stable'
  change: string
}

interface TeamPerformanceProps {
  teamData: TeamMember[]
  topPerformers: TeamMember[]
}

export const TeamPerformance: React.FC<TeamPerformanceProps> = ({
  teamData,
  topPerformers
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
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 2:
        return <Award className="h-5 w-5 text-orange-500" />
      default:
        return <Award className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Top Performers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformers.map((member, index) => (
              <div key={member.id} className="flex items-center gap-4 p-3 rounded-lg border">
                <div className="flex items-center gap-3 flex-1">
                  {getRankIcon(index)}
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.role}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{member.metrics.placements} placements</div>
                  <div className="text-sm text-muted-foreground">
                    {formatNumber(member.metrics.apiCalls)}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {getTrendIcon(member.trend)}
                  <span className={`text-sm font-medium ${getTrendColor(member.trend)}`}>
                    {member.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamData.map((member) => (
              <div key={member.id} className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{member.name}</div>
                    <div className="text-xs text-muted-foreground">{member.role}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(member.trend)}
                    <span className={`text-xs font-medium ${getTrendColor(member.trend)}`}>
                      {member.change}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3 text-blue-500" />
                      <span className="text-muted-foreground">Placements</span>
                    </div>
                    <div className="font-medium">{member.metrics.placements}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-green-500" />
                      <span className="text-muted-foreground">API Calls</span>
                    </div>
                    <div className="font-medium">{formatNumber(member.metrics.apiCalls)}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-purple-500" />
                      <span className="text-muted-foreground">Screened</span>
                    </div>
                    <div className="font-medium">{member.metrics.candidatesScreened}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-orange-500" />
                      <span className="text-muted-foreground">Avg Time</span>
                    </div>
                    <div className="font-medium">{member.metrics.avgTimeToFill}d</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Productivity</span>
                    <span className="font-medium">{member.metrics.productivity}%</span>
                  </div>
                  <Progress value={member.metrics.productivity} className="h-1" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Client Satisfaction</span>
                    <span className="font-medium">{member.metrics.clientSatisfaction}/5</span>
                  </div>
                  <Progress value={(member.metrics.clientSatisfaction / 5) * 100} className="h-1" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Team Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {teamData.reduce((sum, member) => sum + member.metrics.placements, 0)}
              </div>
              <div className="text-sm text-blue-600">Total Placements</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {formatNumber(teamData.reduce((sum, member) => sum + member.metrics.apiCalls, 0))}
              </div>
              <div className="text-sm text-green-600">Total API Calls</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {(teamData.reduce((sum, member) => sum + member.metrics.productivity, 0) / teamData.length).toFixed(1)}%
              </div>
              <div className="text-sm text-purple-600">Avg Productivity</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {(teamData.reduce((sum, member) => sum + member.metrics.clientSatisfaction, 0) / teamData.length).toFixed(1)}/5
              </div>
              <div className="text-sm text-orange-600">Avg Satisfaction</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
