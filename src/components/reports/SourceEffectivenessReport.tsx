import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  TrendingUp,
  DollarSign,
  Clock,
  Target
} from 'lucide-react';

interface SourceEffectivenessData {
  sources: Array<{
    name: string;
    applications: number;
    hires: number;
    hireRate: number;
    qualityScore: number;
    timeToFill: number;
    costPerHire: number;
  }>;
  performanceMetrics: {
    bestPerformingSource: string;
    highestVolumeSource: string;
    mostCostEffective: string;
    fastestTimeToFill: string;
  };
}

interface SourceEffectivenessReportProps {
  data: SourceEffectivenessData;
}

export const SourceEffectivenessReport: React.FC<SourceEffectivenessReportProps> = ({ data }) => {
  const getHireRateColor = (rate: number) => {
    if (rate >= 3.0) return 'text-green-600 bg-green-100';
    if (rate >= 2.0) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getQualityColor = (score: number) => {
    if (score >= 8.5) return 'text-green-600 bg-green-100';
    if (score >= 7.0) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getTimeColor = (days: number) => {
    if (days <= 20) return 'text-green-600 bg-green-100';
    if (days <= 30) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Source Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-orange-600" />
            Source Channel Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead className="text-center">Applications</TableHead>
                <TableHead className="text-center">Hires</TableHead>
                <TableHead className="text-center">Hire Rate</TableHead>
                <TableHead className="text-center">Quality Score</TableHead>
                <TableHead className="text-center">Time to Fill</TableHead>
                <TableHead className="text-center">Cost per Hire</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.sources.map((source) => (
                <TableRow key={source.name}>
                  <TableCell className="font-medium">{source.name}</TableCell>
                  <TableCell className="text-center">
                    {source.applications.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {source.hires.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={`text-xs ${getHireRateColor(source.hireRate)}`}>
                      {source.hireRate.toFixed(2)}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={`text-xs ${getQualityColor(source.qualityScore)}`}>
                      <Target className="h-3 w-3 mr-1" />
                      {source.qualityScore.toFixed(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={`text-xs ${getTimeColor(source.timeToFill)}`}>
                      <Clock className="h-3 w-3 mr-1" />
                      {source.timeToFill} days
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center">
                      <DollarSign className="h-3 w-3 mr-1 text-gray-500" />
                      <span className="text-sm">
                        {source.costPerHire === 0 ? 'Free' : `$${source.costPerHire.toLocaleString()}`}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Performance Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Best Performing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">
                {data.performanceMetrics.bestPerformingSource}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Highest hire rate
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Highest Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">
                {data.performanceMetrics.highestVolumeSource}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Most applications
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Most Cost Effective
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">
                {data.performanceMetrics.mostCostEffective}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Best ROI
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Fastest Time to Fill
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">
                {data.performanceMetrics.fastestTimeToFill}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Quickest hires
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ROI Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-600">
            ROI Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                ${data.sources.reduce((sum, s) => sum + s.costPerHire, 0) / data.sources.length}
              </div>
              <div className="text-sm text-gray-600">Average Cost per Hire</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {(data.sources.reduce((sum, s) => sum + s.hireRate, 0) / data.sources.length).toFixed(2)}%
              </div>
              <div className="text-sm text-gray-600">Average Hire Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {(data.sources.reduce((sum, s) => sum + s.qualityScore, 0) / data.sources.length).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Average Quality Score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

