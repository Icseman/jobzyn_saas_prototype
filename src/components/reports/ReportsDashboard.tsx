import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Briefcase,
  Users,
  Calendar,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';

interface DashboardData {
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
}

interface ReportsDashboardProps {
  data: DashboardData;
}

export const ReportsDashboard: React.FC<ReportsDashboardProps> = ({ data }) => {
  const getChangeIcon = (change: string) => {
    if (change.startsWith('+')) {
      return <TrendingUp className="h-4 w-4 text-orange-600" />;
    } else if (change.startsWith('-')) {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    } else {
      return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getChangeColor = (change: string) => {
    if (change.startsWith('+')) {
      return 'text-orange-600 bg-orange-100';
    } else if (change.startsWith('-')) {
      return 'text-red-600 bg-red-100';
    } else {
      return 'text-gray-600 bg-gray-100';
    }
  };

  const overviewCards = [
    {
      title: 'Jobs Open',
      value: data.overview.jobsOpen.current,
      previous: data.overview.jobsOpen.previous,
      change: data.overview.jobsOpen.change,
      icon: Briefcase,
      description: 'Active job postings'
    },
    {
      title: 'Candidates Added',
      value: data.overview.candidatesAdded.current,
      previous: data.overview.candidatesAdded.previous,
      change: data.overview.candidatesAdded.change,
      icon: Users,
      description: 'New candidates in database'
    },
    {
      title: 'Interviews Scheduled',
      value: data.overview.interviewsScheduled.current,
      previous: data.overview.interviewsScheduled.previous,
      change: data.overview.interviewsScheduled.change,
      icon: Calendar,
      description: 'Interviews booked'
    },
    {
      title: 'Hires Made',
      value: data.overview.hiresMade.current,
      previous: data.overview.hiresMade.previous,
      change: data.overview.hiresMade.change,
      icon: CheckCircle,
      description: 'Successful placements'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
        {overviewCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div
              key={index}
              className="cursor-pointer"
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {card.title}
                    </CardTitle>
                    <div >
                      <IconComponent className="h-4 w-4 text-orange-600" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-baseline space-x-2">
                        <span 
                          className="text-2xl font-bold text-gray-900"
                        >
                        {card.value.toLocaleString()}
                      </span>
                      <div>
                        <Badge className={`text-xs ${getChangeColor(card.change)}`}>
                          <div className="flex items-center space-x-1">
                            {getChangeIcon(card.change)}
                            <span>{card.change}</span>
                          </div>
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{card.description}</p>
                    <div className="text-xs text-gray-400">
                      Previous: {card.previous.toLocaleString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Quick Stats Grid */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
        {/* Conversion Rate */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Overall Conversion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                    <div 
                      className="text-3xl font-bold text-orange-600"
                    >
                    {((data.overview.hiresMade.current / data.overview.candidatesAdded.current) * 100).toFixed(1)}%
                  </div>
                  <p className="text-sm text-gray-500">Candidate to Hire</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Applications to Interviews</span>
                    <span>
                      {((data.overview.interviewsScheduled.current / data.overview.candidatesAdded.current) * 100).toFixed(1)}%
                    </span>
                  </div>
                    <div>
                    <Progress
                      value={(data.overview.interviewsScheduled.current / data.overview.candidatesAdded.current) * 100}
                      className="h-2"
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Interviews to Hires</span>
                    <span>
                      {((data.overview.hiresMade.current / data.overview.interviewsScheduled.current) * 100).toFixed(1)}%
                    </span>
                  </div>
                    <div>
                    <Progress
                      value={(data.overview.hiresMade.current / data.overview.interviewsScheduled.current) * 100}
                      className="h-2"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Trends */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Performance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="text-center p-3 bg-orange-50 rounded-lg"
                  >
                      <div 
                        className="text-lg font-semibold text-orange-600"
                      >
                      {data.overview.jobsOpen.current}
                    </div>
                    <div className="text-xs text-gray-600">Active Jobs</div>
                    <div className="text-xs text-orange-600 mt-1">
                      {data.overview.jobsOpen.change} vs last period
                    </div>
                  </div>
                  <div
                    className="text-center p-3 bg-orange-50 rounded-lg"
                  >
                      <div 
                        className="text-lg font-semibold text-orange-600"
                      >
                      {(data.overview.candidatesAdded.current / data.overview.jobsOpen.current).toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-600">Candidates per Job</div>
                    <div className="text-xs text-orange-600 mt-1">
                      Avg. applications
                    </div>
                  </div>
                </div>
                <div
                  className="pt-2 border-t"
                >
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Hiring Velocity</span>
                    <span className="font-semibold text-orange-600">
                      {data.overview.hiresMade.current} hires this period
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-1">
                    <span className="text-gray-600">Interview Load</span>
                    <span className="font-semibold text-orange-600">
                      {data.overview.interviewsScheduled.current} scheduled
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Key Performance Indicators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div 
                className="text-center"
              >
                <div 
                  className="text-2xl font-bold text-orange-600"
                >
                  {((data.overview.hiresMade.current / data.overview.jobsOpen.current) * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Job Fill Rate</div>
                <div className="text-xs text-gray-500 mt-1">
                  Hires per active job
                </div>
              </div>
              <div 
                className="text-center"
              >
                <div 
                  className="text-2xl font-bold text-orange-600"
                >
                  {(data.overview.candidatesAdded.current / data.overview.hiresMade.current).toFixed(0)}
                </div>
                <div className="text-sm text-gray-600">Candidates per Hire</div>
                <div className="text-xs text-gray-500 mt-1">
                  Application volume needed
                </div>
              </div>
              <div 
                className="text-center"
              >
                <div 
                  className="text-2xl font-bold text-orange-600"
                >
                  {((data.overview.interviewsScheduled.current / data.overview.candidatesAdded.current) * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Interview Rate</div>
                <div className="text-xs text-gray-500 mt-1">
                  Applications to interviews
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
