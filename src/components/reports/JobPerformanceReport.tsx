import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Briefcase,
  Users,
  Calendar,
  CheckCircle,
  TrendingUp,
  Clock,
  Target
} from 'lucide-react';

interface JobPerformanceData {
  jobs: Array<{
    id: string;
    title: string;
    applicationsReceived: number;
    shortlistedCandidates: number;
    interviewsScheduled: number;
    hiresMade: number;
    conversionRate: number;
    timeToFill: number;
  }>;
  conversionFunnel: {
    apply: number;
    shortlist: number;
    interview: number;
    hire: number;
  };
}

interface JobPerformanceReportProps {
  data: JobPerformanceData;
}

export const JobPerformanceReport: React.FC<JobPerformanceReportProps> = ({ data }) => {
  const getConversionRate = (stage: number, total: number) => {
    return ((stage / total) * 100).toFixed(1);
  };

  const getPerformanceColor = (rate: number) => {
    if (rate >= 2.0) return 'text-green-600 bg-green-100';
    if (rate >= 1.5) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getTimeToFillColor = (days: number) => {
    if (days <= 25) return 'text-green-600 bg-green-100';
    if (days <= 35) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Conversion Funnel */}
       <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
               <div>
                <Target className="h-4 w-4 mr-2 text-orange-600" />
              </div>
              Conversion Funnel Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Funnel Visualization */}
               <div 
                 className="space-y-3"
               >
                 <div 
                   className="flex items-center justify-between p-4 bg-orange-50 rounded-lg"
                 >
                  <div className="flex items-center space-x-3">
               <div>
                      <Users className="h-4 w-4 text-orange-600" />
                    </div>
                    <span className="font-medium">Applied</span>
                  </div>
                  <div className="text-right">
                     <div 
                       className="text-xl font-bold text-orange-600"
                     >
                      {data.conversionFunnel.apply.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">100%</div>
                  </div>
                </div>
                
                 <div 
                   className="flex items-center justify-between p-4 bg-orange-50 rounded-lg"
                 >
                  <div className="flex items-center space-x-3">
               <div>
                      <Briefcase className="h-4 w-4 text-orange-600" />
                    </div>
                    <span className="font-medium">Shortlisted</span>
                  </div>
                  <div className="text-right">
                     <div 
                       className="text-xl font-bold text-orange-600"
                     >
                      {data.conversionFunnel.shortlist.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {getConversionRate(data.conversionFunnel.shortlist, data.conversionFunnel.apply)}%
                    </div>
                  </div>
                </div>
                
                 <div 
                   className="flex items-center justify-between p-4 bg-orange-50 rounded-lg"
                 >
                  <div className="flex items-center space-x-3">
               <div>
                      <Calendar className="h-4 w-4 text-orange-600" />
                    </div>
                    <span className="font-medium">Interviewed</span>
                  </div>
                  <div className="text-right">
                     <div 
                       className="text-xl font-bold text-orange-600"
                     >
                      {data.conversionFunnel.interview.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {getConversionRate(data.conversionFunnel.interview, data.conversionFunnel.apply)}%
                    </div>
                  </div>
                </div>
                
                 <div 
                   className="flex items-center justify-between p-4 bg-orange-50 rounded-lg"
                 >
                  <div className="flex items-center space-x-3">
               <div>
                      <CheckCircle className="h-4 w-4 text-orange-600" />
                    </div>
                    <span className="font-medium">Hired</span>
                  </div>
                  <div className="text-right">
                     <div 
                       className="text-xl font-bold text-orange-600"
                     >
                      {data.conversionFunnel.hire.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {getConversionRate(data.conversionFunnel.hire, data.conversionFunnel.apply)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversion Rates */}
               <div 
                 className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t"
               >
                <div className="text-center">
                  <div className="text-lg font-semibold text-orange-600">
                    {getConversionRate(data.conversionFunnel.shortlist, data.conversionFunnel.apply)}%
                  </div>
                  <div className="text-xs text-gray-600">Apply → Shortlist</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-orange-600">
                    {getConversionRate(data.conversionFunnel.interview, data.conversionFunnel.shortlist)}%
                  </div>
                  <div className="text-xs text-gray-600">Shortlist → Interview</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-orange-600">
                    {getConversionRate(data.conversionFunnel.hire, data.conversionFunnel.interview)}%
                  </div>
                  <div className="text-xs text-gray-600">Interview → Hire</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-orange-600">
                    {getConversionRate(data.conversionFunnel.hire, data.conversionFunnel.apply)}%
                  </div>
                  <div className="text-xs text-gray-600">Overall Conversion</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Performance Table */}
       <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
               <div>
                <Briefcase className="h-4 w-4 mr-2 text-orange-600" />
              </div>
              Individual Job Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead className="text-center">Applications</TableHead>
                  <TableHead className="text-center">Shortlisted</TableHead>
                  <TableHead className="text-center">Interviews</TableHead>
                  <TableHead className="text-center">Hires</TableHead>
                  <TableHead className="text-center">Conversion Rate</TableHead>
                  <TableHead className="text-center">Time to Fill</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.jobs.map((job, index) => (
                   <tr 
                     key={job.id}
                     className="hover:bg-orange-50"
                   >
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell className="text-center">
                      {job.applicationsReceived.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      {job.shortlistedCandidates.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      {job.interviewsScheduled.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      {job.hiresMade.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={`text-xs ${getPerformanceColor(job.conversionRate)}`}>
                        {job.conversionRate.toFixed(2)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={`text-xs ${getTimeToFillColor(job.timeToFill)}`}>
                        <Clock className="h-3 w-3 mr-1" />
                        {job.timeToFill} days
                      </Badge>
                    </TableCell>
                  </tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
         <div 
           className="grid grid-cols-1 md:grid-cols-3 gap-6"
         >
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">
                Average Conversion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                 <div 
                   className="text-2xl font-bold text-orange-600"
                 >
                  {(data.jobs.reduce((sum, job) => sum + job.conversionRate, 0) / data.jobs.length).toFixed(2)}%
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Across all jobs
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">
                Average Time to Fill
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                 <div 
                   className="text-2xl font-bold text-orange-600"
                 >
                  {(data.jobs.reduce((sum, job) => sum + job.timeToFill, 0) / data.jobs.length).toFixed(0)} days
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  From posting to hire
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                 <div 
                   className="text-2xl font-bold text-orange-600"
                 >
                  {data.jobs.reduce((sum, job) => sum + job.applicationsReceived, 0).toLocaleString()}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Across all active jobs
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};