import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Users,
  Calendar,
  CheckCircle,
  TrendingUp,
  Target
} from 'lucide-react';

interface RecruiterActivityData {
  recruiters: Array<{
    id: string;
    name: string;
    candidatesAdded: number;
    candidatesContacted: number;
    interviewsConducted: number;
    hiresMade: number;
    productivityScore: number;
  }>;
  workloadDistribution: {
    totalCandidates: number;
    averagePerRecruiter: number;
    workloadBalance: number;
  };
}

interface RecruiterActivityReportProps {
  data: RecruiterActivityData;
}

export const RecruiterActivityReport: React.FC<RecruiterActivityReportProps> = ({ data }) => {
  const getProductivityColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Recruiter Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <Users className="h-4 w-4 mr-2 text-orange-600" />
            Recruiter Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recruiter</TableHead>
                <TableHead className="text-center">Candidates Added</TableHead>
                <TableHead className="text-center">Contacted</TableHead>
                <TableHead className="text-center">Interviews</TableHead>
                <TableHead className="text-center">Hires</TableHead>
                <TableHead className="text-center">Productivity Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.recruiters.map((recruiter) => (
                <TableRow key={recruiter.id}>
                  <TableCell className="font-medium">{recruiter.name}</TableCell>
                  <TableCell className="text-center">
                    {recruiter.candidatesAdded.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {recruiter.candidatesContacted.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {recruiter.interviewsConducted.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {recruiter.hiresMade.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={`text-xs ${getProductivityColor(recruiter.productivityScore)}`}>
                      {recruiter.productivityScore}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Workload Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Workload Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {data.workloadDistribution.workloadBalance.toFixed(1)}%
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Distribution efficiency
              </p>
              <div className="mt-4">
                <Progress value={data.workloadDistribution.workloadBalance} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Average per Recruiter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {data.workloadDistribution.averagePerRecruiter.toFixed(0)}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Candidates managed
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Candidates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {data.workloadDistribution.totalCandidates.toLocaleString()}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Across all recruiters
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

