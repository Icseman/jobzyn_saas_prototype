import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Users,
  Star,
  TrendingUp,
  Target
} from 'lucide-react';

interface ClientPerformanceData {
  clients: Array<{
    id: string;
    name: string;
    jobsPosted: number;
    candidatesSubmitted: number;
    interviewsScheduled: number;
    hiresMade: number;
    interviewToHireRatio: number;
    satisfactionScore: number;
    engagementLevel: string;
  }>;
  overallMetrics: {
    totalClients: number;
    activeClients: number;
    averageSatisfaction: number;
    totalJobsPosted: number;
  };
}

interface ClientPerformanceReportProps {
  data: ClientPerformanceData;
}

export const ClientPerformanceReport: React.FC<ClientPerformanceReportProps> = ({ data }) => {
  const getEngagementColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-orange-600 bg-orange-100';
      case 'low':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getSatisfactionColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600 bg-green-100';
    if (score >= 4.0) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Client Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <Users className="h-4 w-4 mr-2 text-orange-600" />
            Client Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead className="text-center">Jobs Posted</TableHead>
                <TableHead className="text-center">Candidates Submitted</TableHead>
                <TableHead className="text-center">Interviews</TableHead>
                <TableHead className="text-center">Hires</TableHead>
                <TableHead className="text-center">Interview/Hire Ratio</TableHead>
                <TableHead className="text-center">Satisfaction</TableHead>
                <TableHead className="text-center">Engagement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell className="text-center">
                    {client.jobsPosted.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {client.candidatesSubmitted.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {client.interviewsScheduled.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {client.hiresMade.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {client.interviewToHireRatio.toFixed(1)}:1
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={`text-xs ${getSatisfactionColor(client.satisfactionScore)}`}>
                      <Star className="h-3 w-3 mr-1" />
                      {client.satisfactionScore.toFixed(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={`text-xs ${getEngagementColor(client.engagementLevel)}`}>
                      {client.engagementLevel}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Overall Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {data.overallMetrics.totalClients}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                In database
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {data.overallMetrics.activeClients}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                With active jobs
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Average Satisfaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {data.overallMetrics.averageSatisfaction.toFixed(1)}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Out of 5.0
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Jobs Posted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {data.overallMetrics.totalJobsPosted}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                This period
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

