import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  AlertTriangle,
  CheckCircle,
  FileText,
  Eye,
  Download,
  TrendingUp,
  Users,
  Database
} from 'lucide-react'

interface ComplianceData {
  consentCoveragePct: number
  missingFieldsRatePct: number
  postingCompliancePct: number
  auditFlags: number
  gdprConsent: Array<{
    status: string
    count: number
    percentage: number
  }>
  missingFields: Array<{
    field: string
    missing: number
    total: number
  }>
  auditLog: Array<{
    date: string
    action: string
    user: string
    flagged: boolean
  }>
}

interface ComplianceDataQualityProps {
  data: ComplianceData
  onDrilldown: (type: string, data: any) => void
}

export const ComplianceDataQuality: React.FC<ComplianceDataQualityProps> = ({
  data,
  onDrilldown
}) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`
  }

  const getComplianceColor = (percentage: number) => {
    if (percentage >= 95) return 'text-green-600'
    if (percentage >= 85) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getComplianceBadgeVariant = (percentage: number) => {
    if (percentage >= 95) return 'default' as const
    if (percentage >= 85) return 'secondary' as const
    return 'destructive' as const
  }

  const getConsentColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'granted': 'text-green-600',
      'denied': 'text-red-600',
      'pending': 'text-yellow-600'
    }
    return colors[status] || 'text-gray-600'
  }

  const getConsentBgColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'granted': 'bg-green-50',
      'denied': 'bg-red-50',
      'pending': 'bg-yellow-50'
    }
    return colors[status] || 'bg-gray-50'
  }

  const getConsentIcon = (status: string) => {
    switch (status) {
      case 'granted':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'denied':
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case 'pending':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* GDPR Consent Coverage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            GDPR Consent Coverage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Overall Coverage */}
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold mb-2">
                <span className={getComplianceColor(data.consentCoveragePct)}>
                  {formatPercentage(data.consentCoveragePct)}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">Consent Coverage</div>
              <Badge variant={getComplianceBadgeVariant(data.consentCoveragePct)} className="mt-2">
                {data.consentCoveragePct >= 95 ? 'Excellent' : data.consentCoveragePct >= 85 ? 'Good' : 'Needs Attention'}
              </Badge>
            </div>

            {/* Consent Breakdown */}
            <div className="space-y-3">
              {data.gdprConsent.map((consent) => (
                <div key={consent.status} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getConsentBgColor(consent.status)}`}>
                      {getConsentIcon(consent.status)}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium capitalize">{consent.status}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatNumber(consent.count)} candidates
                      </div>
                    </div>
                    <Badge variant="outline">{formatPercentage(consent.percentage)}</Badge>
                  </div>
                  
                  <Progress value={consent.percentage} className="h-2" />
                </div>
              ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => onDrilldown('consent', data.gdprConsent)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View consent details
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Quality */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Quality
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Missing Fields Rate */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Missing Fields Rate</div>
                  <div className="text-sm text-muted-foreground">
                    Fields missing across all records
                  </div>
                </div>
                <Badge variant={getComplianceBadgeVariant(100 - data.missingFieldsRatePct)}>
                  {formatPercentage(data.missingFieldsRatePct)}
                </Badge>
              </div>
              
              <Progress value={data.missingFieldsRatePct} className="h-2" />
            </div>

            {/* Missing Fields Breakdown */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Missing Fields Breakdown</h4>
              {data.missingFields.map((field) => {
                const missingRate = ((field.missing / field.total) * 100).toFixed(1)
                
                return (
                  <div key={field.field} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium capitalize">
                        {field.field.replace('_', ' ')}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {field.missing}/{field.total}
                        </span>
                        <Badge variant="outline">{missingRate}%</Badge>
                      </div>
                    </div>
                    
                    <Progress value={parseFloat(missingRate)} className="h-1" />
                  </div>
                )
              })}
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => onDrilldown('missingFields', data.missingFields)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View missing fields details
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Posting Compliance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Posting Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold mb-2">
                <span className={getComplianceColor(data.postingCompliancePct)}>
                  {formatPercentage(data.postingCompliancePct)}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">Posting Compliance</div>
              <Badge variant={getComplianceBadgeVariant(data.postingCompliancePct)} className="mt-2">
                {data.postingCompliancePct >= 95 ? 'Compliant' : data.postingCompliancePct >= 85 ? 'Mostly Compliant' : 'Non-Compliant'}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Compliance Rate</span>
                <span className="font-medium">{formatPercentage(data.postingCompliancePct)}</span>
              </div>
              <Progress value={data.postingCompliancePct} className="h-2" />
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-800">
                <strong>Compliance includes:</strong>
                <ul className="mt-1 ml-4 list-disc">
                  <li>Salary range disclosure</li>
                  <li>Location information</li>
                  <li>Employment type</li>
                  <li>Required qualifications</li>
                </ul>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => onDrilldown('posting', { compliance: data.postingCompliancePct })}
            >
              <Eye className="h-4 w-4 mr-2" />
              View posting compliance details
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Audit Log Flags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold mb-2">
                <span className={data.auditFlags > 0 ? 'text-red-600' : 'text-green-600'}>
                  {formatNumber(data.auditFlags)}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">Audit Flags</div>
              <Badge variant={data.auditFlags > 0 ? 'destructive' : 'default'} className="mt-2">
                {data.auditFlags > 0 ? 'Action Required' : 'All Clear'}
              </Badge>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm">Recent Audit Events</h4>
              {data.auditLog.slice(0, 3).map((log, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className={`p-1 rounded ${log.flagged ? 'bg-red-100' : 'bg-green-100'}`}>
                    {log.flagged ? (
                      <AlertTriangle className="h-3 w-3 text-red-600" />
                    ) : (
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{log.action.replace('_', ' ')}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(log.date).toLocaleDateString()} • {log.user}
                    </div>
                  </div>
                  <Badge variant={log.flagged ? 'destructive' : 'secondary'}>
                    {log.flagged ? 'Flagged' : 'Normal'}
                  </Badge>
                </div>
              ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => onDrilldown('audit', data.auditLog)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View full audit log
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Summary */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Compliance & Data Quality Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {formatPercentage(data.consentCoveragePct)}
              </div>
              <div className="text-sm text-green-600">Consent Coverage</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {formatPercentage(data.postingCompliancePct)}
              </div>
              <div className="text-sm text-blue-600">Posting Compliance</div>
            </div>
            
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {formatPercentage(data.missingFieldsRatePct)}
              </div>
              <div className="text-sm text-red-600">Missing Fields Rate</div>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {formatNumber(data.auditFlags)}
              </div>
              <div className="text-sm text-orange-600">Audit Flags</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900">Compliance Status</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Overall Compliance Score</div>
                <div className="font-medium">
                  {formatPercentage((data.consentCoveragePct + data.postingCompliancePct + (100 - data.missingFieldsRatePct)) / 3)}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Risk Level</div>
                <div className="font-medium">
                  {data.auditFlags > 5 ? 'High' : data.auditFlags > 0 ? 'Medium' : 'Low'}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
