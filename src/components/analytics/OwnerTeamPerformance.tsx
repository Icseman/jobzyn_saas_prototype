import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Trophy, 
  Medal,
  Award,
  Users,
  Clock,
  Briefcase,
  TrendingUp,
  Eye,
  User
} from 'lucide-react'

interface OwnerPerformanceData {
  leaderboard: Array<{
    ownerId: string
    name: string
    hires: number
    offers: number
    interviews: number
    medianResponseHours: number
    avgTimeToFill: number
  }>
  workload: Array<{
    ownerId: string
    name: string
    jobs: number
    inProcessCandidates: number
    capacity: number
  }>
  roundRobinBalance: Array<{
    poolId: string
    name: string
    members: number
    assignments: number
    balance: number
  }>
}

interface OwnerTeamPerformanceProps {
  data: OwnerPerformanceData
  onDrilldown: (type: string, data: any) => void
}

export const OwnerTeamPerformance: React.FC<OwnerTeamPerformanceProps> = ({
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

  const getPerformanceColor = (hires: number) => {
    if (hires >= 4) return 'text-green-600'
    if (hires >= 2) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getPerformanceBadgeVariant = (hires: number) => {
    if (hires >= 4) return 'default' as const
    if (hires >= 2) return 'secondary' as const
    return 'destructive' as const
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Performance Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.leaderboard.map((owner, index) => (
              <div key={owner.ownerId} className="space-y-3">
                <div className="flex items-center gap-3">
                  {getRankIcon(index)}
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://images.unsplash.com/photo-${1500000000000 + index * 100000000}?w=32&h=32&fit=crop&crop=face`} />
                    <AvatarFallback>
                      {owner.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{owner.name}</div>
                    <div className="text-sm text-muted-foreground">Rank #{index + 1}</div>
                  </div>
                  <Badge variant={getPerformanceBadgeVariant(owner.hires)}>
                    {owner.hires} hires
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3 text-blue-500" />
                      <span className="text-muted-foreground">Offers</span>
                    </div>
                    <div className="font-medium">{formatNumber(owner.offers)}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-green-500" />
                      <span className="text-muted-foreground">Interviews</span>
                    </div>
                    <div className="font-medium">{formatNumber(owner.interviews)}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-orange-500" />
                      <span className="text-muted-foreground">Response Time</span>
                    </div>
                    <div className="font-medium">{formatHours(owner.medianResponseHours)}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-purple-500" />
                      <span className="text-muted-foreground">Avg Time to Fill</span>
                    </div>
                    <div className="font-medium">{owner.avgTimeToFill}d</div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => onDrilldown('owner', owner)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View owner profile
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Workload Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.workload.map((owner) => {
              const workloadPercentage = ((owner.jobs + owner.inProcessCandidates) / owner.capacity) * 100
              const isOverloaded = workloadPercentage > 100
              const isNearCapacity = workloadPercentage > 80
              
              return (
                <div key={owner.ownerId} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://images.unsplash.com/photo-${1500000000000 + Math.random() * 100000000}?w=32&h=32&fit=crop&crop=face`} />
                      <AvatarFallback>
                        {owner.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{owner.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Capacity: {owner.capacity}
                      </div>
                    </div>
                    <Badge variant={isOverloaded ? 'destructive' : isNearCapacity ? 'default' : 'secondary'}>
                      {workloadPercentage.toFixed(0)}%
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Current Load</span>
                      <span className="font-medium">
                        {owner.jobs + owner.inProcessCandidates} / {owner.capacity}
                      </span>
                    </div>
                    <Progress 
                      value={Math.min(workloadPercentage, 100)} 
                      className={`h-2 ${isOverloaded ? 'bg-red-500' : isNearCapacity ? 'bg-yellow-500' : 'bg-green-500'}`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="space-y-1">
                      <div className="text-muted-foreground">Jobs</div>
                      <div className="font-medium">{formatNumber(owner.jobs)}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-muted-foreground">Candidates in Process</div>
                      <div className="font-medium">{formatNumber(owner.inProcessCandidates)}</div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => onDrilldown('workload', owner)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    View workload details
                  </Button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Round Robin Balance */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Round Robin Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.roundRobinBalance.map((pool) => (
              <div key={pool.poolId} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{pool.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {pool.members} members • {pool.assignments} assignments
                    </div>
                  </div>
                  <Badge variant={pool.balance > 0.8 ? 'default' : 'secondary'}>
                    {(pool.balance * 100).toFixed(0)}% balanced
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Balance Score</span>
                    <span className="font-medium">{(pool.balance * 100).toFixed(0)}%</span>
                  </div>
                  <Progress value={pool.balance * 100} className="h-2" />
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">Pool Members</div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: pool.members }, (_, i) => (
                      <div key={i} className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => onDrilldown('pool', pool)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View pool details
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900">Team Performance Summary</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Total Hires</div>
                <div className="font-medium text-lg">
                  {data.leaderboard.reduce((sum, owner) => sum + owner.hires, 0)}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Total Offers</div>
                <div className="font-medium text-lg">
                  {data.leaderboard.reduce((sum, owner) => sum + owner.offers, 0)}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Avg Response Time</div>
                <div className="font-medium text-lg">
                  {formatHours(data.leaderboard.reduce((sum, owner) => sum + owner.medianResponseHours, 0) / data.leaderboard.length)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
