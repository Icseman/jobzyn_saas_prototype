import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  DollarSign,
  Target,
  Users,
  Eye,
  Download,
  ExternalLink
} from 'lucide-react'

interface SourcingData {
  channels: Array<{
    name: string
    applicants: number
    offers: number
    hires: number
    spend: number
    costPerHire: number
  }>
  qualityBySource: Array<{
    source: string
    passRateToInterview: number
    passRateToOffer: number
  }>
}

interface SourcingPerformanceProps {
  data: SourcingData
  onDrilldown: (type: string, data: any) => void
}

export const SourcingPerformance: React.FC<SourcingPerformanceProps> = ({
  data,
  onDrilldown
}) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercentage = (num: number) => {
    return `${(num * 100).toFixed(1)}%`
  }

  const getSourceColor = (source: string) => {
    const colors: { [key: string]: string } = {
      'linkedin': 'bg-blue-500',
      'indeed': 'bg-purple-500',
      'referral': 'bg-green-500',
      'glassdoor': 'bg-orange-500',
      'company_website': 'bg-gray-500'
    }
    return colors[source] || 'bg-gray-500'
  }

  const getSourceLabel = (source: string) => {
    const labels: { [key: string]: string } = {
      'linkedin': 'LinkedIn',
      'indeed': 'Indeed',
      'referral': 'Referral',
      'glassdoor': 'Glassdoor',
      'company_website': 'Company Website'
    }
    return labels[source] || source
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Source Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Source Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.channels.map((channel) => {
              const totalApplicants = data.channels.reduce((sum, c) => sum + c.applicants, 0)
              const applicantPercentage = ((channel.applicants / totalApplicants) * 100).toFixed(1)
              const hireRate = ((channel.hires / channel.applicants) * 100).toFixed(1)
              
              return (
                <div key={channel.name} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 ${getSourceColor(channel.name)} rounded`}></div>
                      <span className="font-medium">{getSourceLabel(channel.name)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{applicantPercentage}%</Badge>
                      <Badge variant="secondary">{hireRate}% hire rate</Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Applicants</div>
                      <div className="font-medium">{formatNumber(channel.applicants)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Hires</div>
                      <div className="font-medium">{formatNumber(channel.hires)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Offers</div>
                      <div className="font-medium">{formatNumber(channel.offers)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Cost per Hire</div>
                      <div className="font-medium">
                        {channel.costPerHire > 0 ? formatCurrency(channel.costPerHire) : 'Free'}
                      </div>
                    </div>
                  </div>
                  
                  <Progress value={parseFloat(applicantPercentage)} className="h-2" />
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => onDrilldown('source', channel)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View jobs from {getSourceLabel(channel.name)}
                  </Button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quality by Source */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Quality by Source
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.qualityBySource.map((source) => (
              <div key={source.source} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 ${getSourceColor(source.source)} rounded`}></div>
                    <span className="font-medium">{getSourceLabel(source.source)}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Pass Rate to Interview</span>
                    <span className="text-sm font-medium">{formatPercentage(source.passRateToInterview)}</span>
                  </div>
                  <Progress value={source.passRateToInterview * 100} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Pass Rate to Offer</span>
                    <span className="text-sm font-medium">{formatPercentage(source.passRateToOffer)}</span>
                  </div>
                  <Progress value={source.passRateToOffer * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cost Analysis */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Cost Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Source</th>
                  <th className="text-center p-2">Applicants</th>
                  <th className="text-center p-2">Hires</th>
                  <th className="text-center p-2">Spend</th>
                  <th className="text-center p-2">Cost per Hire</th>
                  <th className="text-center p-2">Cost per Applicant</th>
                  <th className="text-center p-2">ROI</th>
                  <th className="text-center p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.channels.map((channel) => {
                  const costPerApplicant = channel.applicants > 0 ? channel.spend / channel.applicants : 0
                  const roi = channel.hires > 0 ? ((channel.hires * 50000) - channel.spend) / channel.spend : 0
                  
                  return (
                    <tr key={channel.name} className="border-b">
                      <td className="p-2 font-medium">{getSourceLabel(channel.name)}</td>
                      <td className="text-center p-2">{formatNumber(channel.applicants)}</td>
                      <td className="text-center p-2">{formatNumber(channel.hires)}</td>
                      <td className="text-center p-2">{formatCurrency(channel.spend)}</td>
                      <td className="text-center p-2">
                        {channel.costPerHire > 0 ? formatCurrency(channel.costPerHire) : 'Free'}
                      </td>
                      <td className="text-center p-2">
                        {costPerApplicant > 0 ? formatCurrency(costPerApplicant) : 'Free'}
                      </td>
                      <td className="text-center p-2">
                        <Badge variant={roi > 0 ? 'default' : 'destructive'}>
                          {roi > 0 ? '+' : ''}{(roi * 100).toFixed(0)}%
                        </Badge>
                      </td>
                      <td className="text-center p-2">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDrilldown('source', channel)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDrilldown('export', channel)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900">Top Performing Sources</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Best Quality</div>
                <div className="font-medium">
                  {data.qualityBySource[0] ? getSourceLabel(data.qualityBySource[0].source) : 'N/A'}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Lowest Cost</div>
                <div className="font-medium">
                  {data.channels.find(c => c.costPerHire === 0) ? 'Referral' : 'N/A'}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Highest Volume</div>
                <div className="font-medium">
                  {data.channels.reduce((max, channel) => 
                    channel.applicants > max.applicants ? channel : max
                  ).name}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
