import React, { useState, useEffect } from 'react';
import { SiteHeader } from '../site-header';
import { PageTransition } from '@/components/PageTransition';
import { ReportsDashboard } from './ReportsDashboard';
import { JobPerformanceReport } from './JobPerformanceReport';
import { CandidatePipelineReport } from './CandidatePipelineReport';
import { RecruiterActivityReport } from './RecruiterActivityReport';
import { ClientPerformanceReport } from './ClientPerformanceReport';
import { SourceEffectivenessReport } from './SourceEffectivenessReport';
import { TimeToHireCostReport } from './TimeToHireCostReport';
import { DiversityInclusionReport } from './DiversityInclusionReport';
import { ExportSharingOptions } from './ExportSharingOptions';
import { AIInsightsRecommendations } from './AIInsightsRecommendations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  Download,
  Share2,
  Settings,
  Filter,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { tabAnimation } from '@/utils/animations';

interface ReportsData {
  meta: {
    generatedAt: string;
    timezone: string;
    reportPeriod: {
      from: string;
      to: string;
    };
    compareTo: {
      from: string;
      to: string;
    };
  };
  dashboard: {
    overview: {
      jobsOpen: {
        current: number;
        previous: number;
        change: string;
      };
      candidatesAdded: {
        current: number;
        previous: number;
        change: string;
      };
      interviewsScheduled: {
        current: number;
        previous: number;
        change: string;
      };
      hiresMade: {
        current: number;
        previous: number;
        change: string;
      };
    };
    quickFilters: {
      timeRanges: string[];
      selectedRange: string;
    };
  };
  jobPerformance: any;
  candidatePipeline: any;
  recruiterActivity: any;
  clientPerformance: any;
  sourceEffectiveness: any;
  timeToHireCost: any;
  diversityInclusion: any;
  exportSharing: any;
  aiInsights: any;
}

export const ReportsPage: React.FC = () => {
  const [reportsData, setReportsData] = useState<ReportsData | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timeRange, setTimeRange] = useState('monthly');
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  useEffect(() => {
    loadReportsData();
  }, [timeRange]);

  const loadReportsData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/src/app/reports/data.json');
      const data = await response.json();
      setReportsData(data);
    } catch (error) {
      console.error('Error loading reports data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setLastRefresh(new Date());
    loadReportsData();
  };

  const handleExport = (format: string) => {
    console.log(`Exporting reports as ${format}`);
    // Implement export functionality
  };

  const handleShare = () => {
    console.log('Sharing reports');
    // Implement sharing functionality
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center h-screen px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading reports...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!reportsData) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center h-screen px-6">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-gray-600">Failed to load reports data</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
        <SiteHeader />
        <PageTransition>
          <main className="flex-1 overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-auto py-6">
                <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
                      <p className="text-gray-600 mt-1">
                        Comprehensive recruitment insights and performance metrics
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm" onClick={handleRefresh}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleShare}>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button size="sm" onClick={() => handleExport('PDF')}>
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>

                  {/* Last Updated */}
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Last updated: {lastRefresh.toLocaleString()}</span>
                    <span className="mx-2">•</span>
                    <span>Report period: {reportsData.meta.reportPeriod.from} to {reportsData.meta.reportPeriod.to}</span>
                  </div>

                  {/* Tabs */}
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                    <TabsList className="grid w-full grid-cols-6 mb-6">
                      <TabsTrigger value="dashboard" className="flex items-center">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Dashboard
                      </TabsTrigger>
                      <TabsTrigger value="job-performance" className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Job Performance
                      </TabsTrigger>
                      <TabsTrigger value="candidate-pipeline" className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Pipeline
                      </TabsTrigger>
                      <TabsTrigger value="recruiter-activity" className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Recruiter Activity
                      </TabsTrigger>
                      <TabsTrigger value="client-performance" className="flex items-center">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Client Performance
                      </TabsTrigger>
                      <TabsTrigger value="source-effectiveness" className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Source Effectiveness
                      </TabsTrigger>
                    </TabsList>

                    <div className="flex-1">
                      <TabsContent value="dashboard" className="h-full">
                        <div
                          className="h-full"
                        >
                          <ReportsDashboard data={reportsData.dashboard} />
                        </div>
                      </TabsContent>

                      <TabsContent value="job-performance" className="h-full">
                        <div
                          className="h-full"
                        >
                          <JobPerformanceReport data={reportsData.jobPerformance} />
                        </div>
                      </TabsContent>

                      <TabsContent value="candidate-pipeline" className="h-full">
                        <div
                          className="h-full"
                        >
                          <CandidatePipelineReport data={reportsData.candidatePipeline} />
                        </div>
                      </TabsContent>

                      <TabsContent value="recruiter-activity" className="h-full">
                        <div
                          className="h-full"
                        >
                          <RecruiterActivityReport data={reportsData.recruiterActivity} />
                        </div>
                      </TabsContent>

                      <TabsContent value="client-performance" className="h-full">
                        <div
                          className="h-full"
                        >
                          <ClientPerformanceReport data={reportsData.clientPerformance} />
                        </div>
                      </TabsContent>

                      <TabsContent value="source-effectiveness" className="h-full">
                        <div
                          className="h-full"
                        >
                          <SourceEffectivenessReport data={reportsData.sourceEffectiveness} />
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </main>
        </PageTransition>
    </div>
  );
};