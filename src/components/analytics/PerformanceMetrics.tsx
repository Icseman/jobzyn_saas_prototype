import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Briefcase, 
  DollarSign,
  Target,
  Zap,
  AlertTriangle
} from 'lucide-react'

interface ConversionFunnel {
  stages: Array<{
    stage: string
    count: number
    percentage: number
  }>
}

interface IndustryBreakdown {
  industry: string
  jobs: number
  placements: number
  apiCalls: number
}

interface SkillGap {
  skill: string
  demand: number
  supply: number
  gap: number
}

interface PerformanceMetricsProps {
  conversionFunnel: ConversionFunnel
  industryBreakdown: IndustryBreakdown[]
  skillGaps: SkillGap[]
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  conversionFunnel,
  industryBreakdown,
  skillGaps
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

  const getConversionRate = (current: number, previous: number) => {
    if (previous === 0) return 0
    return ((current / previous) * 100).toFixed(1)
  }

  return (
    <div className="space-y-6">
      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Conversion Funnel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversionFunnel.stages.map((stage, index) => {
              const nextStage = conversionFunnel.stages[index + 1]
              const conversionRate = nextStage ? getConversionRate(nextStage.count, stage.count) : 0
              
              return (
                <div key={stage.stage} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <span className="font-medium">{stage.stage}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{formatNumber(stage.count)}</span>
                      <Badge variant="outline">{stage.percentage}%</Badge>
                    </div>
                  </div>
                  
                  <Progress value={stage.percentage} className="h-2" />
                  
                  {nextStage && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <TrendingDown className="h-3 w-3" />
                      <span>Conversion to {nextStage.stage}: {conversionRate}%</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Industry Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Top Industries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {industryBreakdown.map((industry, index) => {
              const totalApiCalls = industryBreakdown.reduce((sum, ind) => sum + ind.apiCalls, 0)
              const apiCallsPercentage = (industry.apiCalls / totalApiCalls * 100).toFixed(1)
              
              return (
                <div key={industry.industry} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-blue-500' :
                        index === 1 ? 'bg-green-500' :
                        index === 2 ? 'bg-purple-500' :
                        index === 3 ? 'bg-orange-500' :
                        'bg-gray-500'
                      }`}></div>
                      <span className="font-medium">{industry.industry}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{formatNumber(industry.apiCalls)}</span>
                      <Badge variant="outline">{apiCallsPercentage}%</Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{industry.jobs} jobs • {industry.placements} placements</span>
                      <span>{apiCallsPercentage}% of total API calls</span>
                    </div>
                    <Progress value={parseFloat(apiCallsPercentage)} className="h-1" />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Skill Gaps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Critical Skill Gaps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skillGaps.map((skill, index) => {
              const gapPercentage = (skill.gap / skill.demand * 100).toFixed(1)
              
              return (
                <div key={skill.skill} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <span className="font-medium">{skill.skill}</span>
                    </div>
                    <Badge variant="destructive">{skill.gap} gap</Badge>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Demand: {skill.demand}</span>
                      <span>Supply: {skill.supply}</span>
                      <span>Gap: {gapPercentage}%</span>
                    </div>
                    <div className="flex gap-1">
                      <div 
                        className="h-2 bg-red-500 rounded-l"
                        style={{ width: `${(skill.supply / skill.demand * 100)}%` }}
                      ></div>
                      <div 
                        className="h-2 bg-orange-500 rounded-r"
                        style={{ width: `${(skill.gap / skill.demand * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
