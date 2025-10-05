import React, { useState } from 'react'
import { SiteHeader } from '../site-header'
import { PageTransition } from '@/components/PageTransition'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Briefcase, 
  Building2, 
  Calendar,
  FileText,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  DollarSign,
  UserCheck,
  UserX,
  Mail,
  Phone,
  MapPin,
  Star,
  Eye,
  MousePointer,
  Download,
  Filter,
  RefreshCw,
  Settings,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  AlertCircle,
  XCircle,
  Zap,
  Brain,
  Shield,
  Globe,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  ExternalLink
} from 'lucide-react'
import analyticsData from '../../app/analytics/data.json'

export interface AnalyticsData {
  meta: {
    generatedAt: string
    timezone: string
    range: { from: string; to: string }
    compareTo: { from: string; to: string }
  }
  kpis: {
    timeToFillMedianDays: { value: number; deltaPct: number }
    activeJobs: { value: number; deltaPct: number }
    offerRatePct: { value: number; deltaPct: number }
    hires: { value: number; deltaPct: number }
    agingOverThreshold: { value: number; deltaPct: number }
    interviewsScheduled: { value: number; deltaPct: number }
    applicantsPerJobMedian: { value: number; deltaPct: number }
    firstResponseMedianHours: { value: number; deltaPct: number }
  }
  pipeline: {
    stages: Array<{ name: string; count: number }>
    dropOffReasons: Array<{ reason: string; count: number }>
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
  sla: {
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
  sourcing: {
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
  jobsHealth: {
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
  ownerPerformance: {
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
  clients: {
    topByHires: Array<{
      clientId: string
      name: string
      hires: number
      revenue: number
    }>
    timeToFillByClient: Array<{
      clientId: string
      name: string
      medianDays: number
    }>
    activeJobsByClient: Array<{
      clientId: string
      name: string
      openJobs: number
      totalJobs: number
    }>
  }
  calendar: {
    interviewsPerDay: Array<{
      date: string
      count: number
    }>
    noShowRatePct: number
    schedulingLatencyHoursMedian: number
    roomUtilizationPct: number
    interviewTypes: Array<{
      type: string
      count: number
      noShowRate: number
    }>
  }
  notes: {
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
  compliance: {
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
}

export const AnalyticsPage: React.FC = () => {
  const [data, setData] = useState<AnalyticsData>(analyticsData as AnalyticsData)
  const [activeTab, setActiveTab] = useState('overview')

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getDeltaIcon = (delta: number) => {
    if (delta > 0) return <ArrowUpRight className="h-4 w-4 text-emerald-600" />
    if (delta < 0) return <ArrowDownRight className="h-4 w-4 text-red-600" />
    return <div className="h-4 w-4" />
  }

  const getDeltaColor = (delta: number) => {
    if (delta > 0) return 'text-emerald-600'
    if (delta < 0) return 'text-red-600'
    return 'text-muted-foreground'
  }

  const KPICard = ({ title, value, delta, icon: Icon, format = 'number' }: {
    title: string
    value: number
    delta: number
    icon: React.ComponentType<{ className?: string }>
    format?: 'number' | 'currency' | 'percentage' | 'days' | 'hours'
  }) => {
    const formatValue = () => {
      switch (format) {
        case 'currency': return formatCurrency(value)
        case 'percentage': return `${value.toFixed(1)}%`
        case 'days': return `${value} days`
        case 'hours': return `${value.toFixed(1)}h`
        default: return formatNumber(value)
      }
    }

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{title}</p>
                <p className="text-2xl font-bold">{formatValue()}</p>
              </div>
            </div>
            <div className={`flex items-center gap-1 ${getDeltaColor(delta)}`}>
              {getDeltaIcon(delta)}
              <span className="text-sm font-medium">{Math.abs(delta).toFixed(1)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const MetricCard = ({ title, value, subtitle, icon: Icon, color = 'primary' }: {
    title: string
    value: string | number
    subtitle?: string
    icon: React.ComponentType<{ className?: string }>
    color?: 'primary' | 'emerald' | 'orange' | 'red' | 'blue'
  }) => {
    const colorClasses = {
      primary: 'text-primary bg-primary/10',
      emerald: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950',
      orange: 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950',
      red: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950',
      blue: 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950'
    }

    return (
      <Card className="hover:shadow-sm transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-lg font-semibold">{value}</p>
              {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-background">
        <SiteHeader />
        <PageTransition>
          <main className="flex-1 overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-auto py-6">
              <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
                      <p className="text-muted-foreground mt-1">
                        Comprehensive insights across your recruitment platform
                      </p>
                    </div>
                  <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                    </div>
                  </div>

                  {/* Date Range & Filters */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              {new Date(data.meta.range.from).toLocaleDateString()} - {new Date(data.meta.range.to).toLocaleDateString()}
                            </span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            vs Previous Period
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2" />
                            Filters
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Main KPI Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <KPICard
                      title="Time to Fill"
                      value={data.kpis.timeToFillMedianDays.value}
                      delta={data.kpis.timeToFillMedianDays.deltaPct}
                      icon={Clock}
                      format="days"
                    />
                    <KPICard
                      title="Active Jobs"
                      value={data.kpis.activeJobs.value}
                      delta={data.kpis.activeJobs.deltaPct}
                      icon={Briefcase}
                    />
                    <KPICard
                      title="Offer Rate"
                      value={data.kpis.offerRatePct.value}
                      delta={data.kpis.offerRatePct.deltaPct}
                      icon={Target}
                      format="percentage"
                    />
                    <KPICard
                      title="Total Hires"
                      value={data.kpis.hires.value}
                      delta={data.kpis.hires.deltaPct}
                      icon={UserCheck}
                    />
                  </div>

                  {/* Secondary KPIs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <KPICard
                      title="Interviews Scheduled"
                      value={data.kpis.interviewsScheduled.value}
                      delta={data.kpis.interviewsScheduled.deltaPct}
                      icon={Calendar}
                    />
                    <KPICard
                      title="Avg Applicants/Job"
                      value={data.kpis.applicantsPerJobMedian.value}
                      delta={data.kpis.applicantsPerJobMedian.deltaPct}
                      icon={Users}
                    />
                    <KPICard
                      title="First Response Time"
                      value={data.kpis.firstResponseMedianHours.value}
                      delta={data.kpis.firstResponseMedianHours.deltaPct}
                      icon={Mail}
                      format="hours"
                    />
                    <KPICard
                      title="Aging Jobs"
                      value={data.kpis.agingOverThreshold.value}
                      delta={data.kpis.agingOverThreshold.deltaPct}
                      icon={AlertCircle}
                    />
                  </div>

                  {/* Detailed Analytics Tabs */}
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-6">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="candidates">Candidates</TabsTrigger>
                      <TabsTrigger value="jobs">Jobs</TabsTrigger>
                      <TabsTrigger value="clients">Clients</TabsTrigger>
                      <TabsTrigger value="careers">Careers Page</TabsTrigger>
                      <TabsTrigger value="performance">Performance</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Pipeline Conversion */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <BarChart3 className="h-5 w-5" />
                              Pipeline Conversion
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {data.pipeline.stages.map((stage, index) => {
                              const prevCount = index > 0 ? data.pipeline.stages[index - 1].count : stage.count
                              const conversionRate = prevCount > 0 ? (stage.count / prevCount) * 100 : 100
                              
                              return (
                                <div key={stage.name} className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium capitalize">{stage.name}</span>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-semibold">{formatNumber(stage.count)}</span>
                                      {index > 0 && (
                                        <Badge variant="secondary" className="text-xs">
                                          {conversionRate.toFixed(1)}%
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                  <Progress value={conversionRate} className="h-2" />
                                </div>
                              )
                            })}
                          </CardContent>
                        </Card>

                        {/* Top Performing Jobs */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Star className="h-5 w-5" />
                              Top Performing Jobs
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {data.pipeline.conversionByJob.slice(0, 5).map((job) => {
                              const conversionRate = (job.hired / job.applied) * 100
                              return (
                                <div key={job.jobId} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                                  <div className="flex-1">
                                    <p className="font-medium text-sm">{job.title}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {job.applied} applied → {job.hired} hired
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <Badge variant="secondary" className="text-xs">
                                      {conversionRate.toFixed(1)}%
                                    </Badge>
                                  </div>
                                </div>
                              )
                            })}
                          </CardContent>
                        </Card>
                      </div>

                      {/* Team Performance */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Team Performance Leaderboard
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {data.ownerPerformance.leaderboard.map((member, index) => (
                              <div key={member.ownerId} className="flex items-center justify-between p-4 rounded-lg border">
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                                    {index + 1}
                                  </div>
                    <div>
                                    <p className="font-medium">{member.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {member.interviews} interviews • {member.offers} offers • {member.hires} hires
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-medium">{member.avgTimeToFill} days avg</p>
                                  <p className="text-xs text-muted-foreground">{member.medianResponseHours}h response</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Candidates Tab */}
                    <TabsContent value="candidates" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <MetricCard
                          title="Total Candidates"
                          value={formatNumber(data.pipeline.stages[0].count)}
                          subtitle="In pipeline"
                          icon={Users}
                          color="blue"
                        />
                        <MetricCard
                          title="Interview Rate"
                          value={`${((data.pipeline.stages[2].count / data.pipeline.stages[0].count) * 100).toFixed(1)}%`}
                          subtitle="Applied to interview"
                          icon={UserCheck}
                          color="emerald"
                        />
                        <MetricCard
                          title="Hire Rate"
                          value={`${((data.pipeline.stages[4].count / data.pipeline.stages[0].count) * 100).toFixed(1)}%`}
                          subtitle="Applied to hired"
                          icon={Target}
                          color="primary"
                        />
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <PieChart className="h-5 w-5" />
                              Drop-off Reasons
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {data.pipeline.dropOffReasons.map((reason) => (
                              <div key={reason.reason} className="flex items-center justify-between">
                                <span className="text-sm capitalize">{reason.reason.replace('_', ' ')}</span>
                                <Badge variant="outline">{reason.count}</Badge>
                              </div>
                            ))}
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Activity className="h-5 w-5" />
                              Sourcing Quality
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {data.sourcing.qualityBySource.map((source) => (
                              <div key={source.source} className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium capitalize">{source.source}</span>
                                  <span className="text-sm text-muted-foreground">
                                    {(source.passRateToOffer * 100).toFixed(1)}% to offer
                                  </span>
                                </div>
                                <Progress value={source.passRateToOffer * 100} className="h-2" />
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    {/* Jobs Tab */}
                    <TabsContent value="jobs" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <MetricCard
                          title="Job Fill Rate"
                          value={`${((data.jobsHealth.filledVsTotal.filter(j => j.status === 'filled').length / data.jobsHealth.filledVsTotal.length) * 100).toFixed(1)}%`}
                          subtitle="Successfully filled"
                          icon={CheckCircle}
                          color="emerald"
                        />
                        <MetricCard
                          title="Avg Time to Fill"
                          value={`${data.kpis.timeToFillMedianDays.value} days`}
                          subtitle="Median across all jobs"
                          icon={Clock}
                          color="blue"
                        />
                        <MetricCard
                          title="High Priority Jobs"
                          value={data.jobsHealth.prioritySplit.find(p => p.priority === 'high')?.count || 0}
                          subtitle="Requiring attention"
                          icon={AlertCircle}
                          color="red"
                        />
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Clock className="h-5 w-5" />
                              Job Aging Analysis
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {data.jobsHealth.agingBuckets.map((bucket) => (
                              <div key={bucket.bucket} className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium">{bucket.bucket} days</span>
                                  <span className="text-sm text-muted-foreground">{bucket.count} jobs</span>
                                </div>
                                <Progress value={bucket.percentage} className="h-2" />
                              </div>
                            ))}
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Briefcase className="h-5 w-5" />
                              Job Status Distribution
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {data.jobsHealth.statusSplit.map((status) => (
                              <div key={status.status} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className={`w-3 h-3 rounded-full ${
                                    status.status === 'open' ? 'bg-emerald-500' :
                                    status.status === 'draft' ? 'bg-yellow-500' :
                                    status.status === 'on_hold' ? 'bg-orange-500' : 'bg-gray-500'
                                  }`} />
                                  <span className="text-sm font-medium capitalize">{status.status.replace('_', ' ')}</span>
                                </div>
                                <div className="text-right">
                                  <span className="text-sm font-semibold">{status.count}</span>
                                  <span className="text-xs text-muted-foreground ml-2">({status.percentage.toFixed(1)}%)</span>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    {/* Clients Tab */}
                    <TabsContent value="clients" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <MetricCard
                          title="Total Revenue"
                          value={formatCurrency(data.clients.topByHires.reduce((sum, client) => sum + client.revenue, 0))}
                          subtitle="This period"
                          icon={DollarSign}
                          color="emerald"
                        />
                        <MetricCard
                          title="Active Clients"
                          value={data.clients.activeJobsByClient.length}
                          subtitle="With open positions"
                          icon={Building2}
                          color="blue"
                        />
                        <MetricCard
                          title="Avg Time to Fill"
                          value={`${Math.round(data.clients.timeToFillByClient.reduce((sum, client) => sum + client.medianDays, 0) / data.clients.timeToFillByClient.length)} days`}
                          subtitle="Across all clients"
                          icon={Clock}
                          color="orange"
                      />
                    </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Building2 className="h-5 w-5" />
                              Top Clients by Revenue
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {data.clients.topByHires.map((client) => (
                              <div key={client.clientId} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                                    <Building2 className="h-4 w-4 text-muted-foreground" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-sm">{client.name}</p>
                                    <p className="text-xs text-muted-foreground">{client.hires} hires</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold text-sm">{formatCurrency(client.revenue)}</p>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Activity className="h-5 w-5" />
                              Client Performance
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {data.clients.timeToFillByClient.map((client) => (
                              <div key={client.clientId} className="flex items-center justify-between">
                                <span className="text-sm font-medium">{client.name}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">{client.medianDays} days</span>
                                  <Badge variant={client.medianDays <= 30 ? 'default' : 'secondary'} className="text-xs">
                                    {client.medianDays <= 30 ? 'Fast' : 'Normal'}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    {/* Careers Page Tab */}
                    <TabsContent value="careers" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <MetricCard
                          title="Page Views"
                          value="12.5K"
                          subtitle="This month"
                          icon={Eye}
                          color="blue"
                        />
                        <MetricCard
                          title="Application Rate"
                          value="8.2%"
                          subtitle="Views to applications"
                          icon={MousePointer}
                          color="emerald"
                        />
                        <MetricCard
                          title="Conversion Rate"
                          value="2.1%"
                          subtitle="Applications to hires"
                          icon={Target}
                          color="primary"
                        />
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Globe className="h-5 w-5" />
                              Traffic Sources
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Direct</span>
                                <span className="text-sm text-muted-foreground">45%</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Google Search</span>
                                <span className="text-sm text-muted-foreground">32%</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Social Media</span>
                                <span className="text-sm text-muted-foreground">15%</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Referrals</span>
                                <span className="text-sm text-muted-foreground">8%</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Heart className="h-5 w-5" />
                              Engagement Metrics
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Avg. Session Duration</span>
                                <span className="text-sm text-muted-foreground">3m 24s</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Bounce Rate</span>
                                <span className="text-sm text-muted-foreground">28%</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Pages per Session</span>
                                <span className="text-sm text-muted-foreground">2.3</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Return Visitors</span>
                                <span className="text-sm text-muted-foreground">34%</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                    </div>
                    </TabsContent>

                    {/* Performance Tab */}
                    <TabsContent value="performance" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <MetricCard
                          title="SLA Compliance"
                          value="94.2%"
                          subtitle="Within target timeframes"
                          icon={Shield}
                          color="emerald"
                        />
                        <MetricCard
                          title="No-Show Rate"
                          value={`${data.calendar.noShowRatePct}%`}
                          subtitle="Interview attendance"
                          icon={UserX}
                          color="orange"
                        />
                        <MetricCard
                          title="Response Time"
                          value={`${data.kpis.firstResponseMedianHours}h`}
                          subtitle="Median first response"
                          icon={Mail}
                          color="blue"
                        />
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Calendar className="h-5 w-5" />
                              Interview Analytics
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {data.calendar.interviewTypes.map((type) => (
                              <div key={type.type} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className={`w-3 h-3 rounded-full ${
                                    type.type === 'phone' ? 'bg-blue-500' :
                                    type.type === 'video' ? 'bg-emerald-500' : 'bg-orange-500'
                                  }`} />
                                  <span className="text-sm font-medium capitalize">{type.type}</span>
                                </div>
                                <div className="text-right">
                                  <span className="text-sm font-semibold">{type.count}</span>
                                  <span className="text-xs text-muted-foreground ml-2">({type.noShowRate}% no-show)</span>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <FileText className="h-5 w-5" />
                              Collaboration Metrics
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Notes Created</span>
                                <span className="text-sm text-muted-foreground">{data.notes.notesCreated}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Mentions</span>
                                <span className="text-sm text-muted-foreground">{data.notes.mentions}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Attachments</span>
                                <span className="text-sm text-muted-foreground">{data.notes.attachments}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Linked to Jobs</span>
                                <span className="text-sm text-muted-foreground">{data.notes.notesLinkedToJobs}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </main>
        </PageTransition>
    </div>
  )
}