import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users,
  TrendingDown,
  ArrowRight,
  Target,
  AlertTriangle
} from 'lucide-react';

interface CandidatePipelineData {
  stages: Array<{
    name: string;
    count: number;
    dropOffRate: number;
  }>;
  stageMovement: Array<{
    from: string;
    to: string;
    count: number;
    rate: number;
  }>;
}

interface CandidatePipelineReportProps {
  data: CandidatePipelineData;
}

export const CandidatePipelineReport: React.FC<CandidatePipelineReportProps> = ({ data }) => {
  const getDropOffColor = (rate: number) => {
    if (rate >= 80) return 'text-red-600 bg-red-100';
    if (rate >= 60) return 'text-orange-600 bg-orange-100';
    return 'text-green-600 bg-green-100';
  };

  const getStageIcon = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'applied':
        return <Users className="h-4 w-4 text-orange-600" />;
      case 'screened':
        return <Target className="h-4 w-4 text-orange-600" />;
      case 'interviewed':
        return <Users className="h-4 w-4 text-orange-600" />;
      case 'offered':
        return <Target className="h-4 w-4 text-orange-600" />;
      case 'hired':
        return <Target className="h-4 w-4 text-orange-600" />;
      case 'rejected':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Users className="h-4 w-4 text-orange-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Pipeline Stages */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <Users className="h-4 w-4 mr-2 text-orange-600" />
            Candidate Pipeline Stages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.stages.map((stage, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStageIcon(stage.name)}
                  <span className="font-medium">{stage.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-xl font-bold text-orange-600">
                      {stage.count.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">candidates</div>
                  </div>
                  {stage.dropOffRate > 0 && (
                    <Badge className={`text-xs ${getDropOffColor(stage.dropOffRate)}`}>
                      <TrendingDown className="h-3 w-3 mr-1" />
                      {stage.dropOffRate.toFixed(1)}%
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stage Movement */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <ArrowRight className="h-4 w-4 mr-2 text-orange-600" />
            Stage Movement Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.stageMovement.map((movement, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{movement.from}</span>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900">{movement.to}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-orange-600">
                      {movement.count.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">candidates</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Conversion Rate</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={movement.rate} className="w-24 h-2" />
                    <span className="text-sm font-medium text-orange-600">
                      {movement.rate.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Pipeline Health Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {((data.stages.find(s => s.name === 'Hired')?.count || 0) / (data.stages.find(s => s.name === 'Applied')?.count || 1) * 100).toFixed(1)}%
              </div>
              <p className="text-sm text-gray-500">
                Overall conversion rate
              </p>
              <div className="mt-4">
                <Progress 
                  value={(data.stages.find(s => s.name === 'Hired')?.count || 0) / (data.stages.find(s => s.name === 'Applied')?.count || 1) * 100} 
                  className="h-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">
              Bottleneck Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.stages
                .filter(stage => stage.dropOffRate > 70)
                .map((stage, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-red-50 rounded">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium text-red-700">
                      High drop-off at {stage.name}
                    </span>
                    <Badge className="text-xs bg-red-100 text-red-700">
                      {stage.dropOffRate.toFixed(1)}%
                    </Badge>
                  </div>
                ))}
              {data.stages.filter(stage => stage.dropOffRate > 70).length === 0 && (
                <div className="text-center text-sm text-gray-500">
                  No significant bottlenecks detected
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-600">
            Conversion Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-orange-600">
                {data.stages.find(s => s.name === 'Applied')?.count.toLocaleString() || 0}
              </div>
              <div className="text-xs text-gray-600">Total Applications</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-orange-600">
                {data.stages.find(s => s.name === 'Screened')?.count.toLocaleString() || 0}
              </div>
              <div className="text-xs text-gray-600">Screened</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-orange-600">
                {data.stages.find(s => s.name === 'Interviewed')?.count.toLocaleString() || 0}
              </div>
              <div className="text-xs text-gray-600">Interviewed</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-orange-600">
                {data.stages.find(s => s.name === 'Hired')?.count.toLocaleString() || 0}
              </div>
              <div className="text-xs text-gray-600">Hired</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

