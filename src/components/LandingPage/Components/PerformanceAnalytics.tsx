import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PerformanceAnalyticsProps {
  isActive?: boolean;
}

const PerformanceAnalytics: React.FC<PerformanceAnalyticsProps> = ({ isActive = false }) => {
  // Mock data for the line chart
  const lineData = [
    { month: 'Jan', timeToHire: 45, costPerHire: 3500, qualityScore: 78 },
    { month: 'Feb', timeToHire: 42, costPerHire: 3200, qualityScore: 82 },
    { month: 'Mar', timeToHire: 38, costPerHire: 2900, qualityScore: 85 },
    { month: 'Apr', timeToHire: 35, costPerHire: 2600, qualityScore: 88 },
    { month: 'May', timeToHire: 32, costPerHire: 2400, qualityScore: 91 },
    { month: 'Jun', timeToHire: 28, costPerHire: 2200, qualityScore: 94 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-blue-600">
              <span className="font-medium">Time to Hire:</span> {payload[0].value} days
            </p>
            <p className="text-green-600">
              <span className="font-medium">Cost per Hire:</span> ${payload[1].value.toLocaleString()}
            </p>
            <p className="text-purple-600">
              <span className="font-medium">Quality Score:</span> {payload[2].value}%
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Section - Text Content */}
          <div className="space-y-8">
            {/* Main Headline */}
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              What happens when you optimize your entire recruitment funnel?
            </h2>
            
            {/* Body Text */}
            <p className="text-lg text-gray-600 leading-relaxed">
              Transform your hiring metrics with comprehensive analytics that track every step of your recruitment process. 
              Our platform provides real-time insights into time-to-hire, cost-per-hire, and candidate quality, 
              helping you make data-driven decisions that improve outcomes month after month.
            </p>
            
            {/* Call-to-Action Links */}
            <div className="space-y-4">
              <a 
                href="#" 
                className="block text-lg text-gray-900 hover:text-emerald-600 transition-colors duration-200 underline decoration-2 underline-offset-4 hover:decoration-emerald-600"
              >
                View detailed performance metrics →
              </a>
              <a 
                href="#" 
                className="block text-lg text-gray-900 hover:text-emerald-600 transition-colors duration-200 underline decoration-2 underline-offset-4 hover:decoration-emerald-600"
              >
                Access recruitment funnel analytics →
              </a>
              <a 
                href="#" 
                className="block text-lg text-gray-900 hover:text-emerald-600 transition-colors duration-200 underline decoration-2 underline-offset-4 hover:decoration-emerald-600"
              >
                Download performance reports →
              </a>
            </div>
          </div>

          {/* Right Section - Chart */}
          <div className="relative">
            <div className={`bg-gray-50 rounded-2xl p-8 border border-gray-200 shadow-sm transition-all duration-1000 ${
              isActive ? 'transform scale-105 shadow-xl bg-gradient-to-br from-emerald-50 to-green-50' : 'transform scale-100'
            }`}>
              {/* Chart Header */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recruitment Performance Trends</h3>
                <p className="text-sm text-gray-600">6-month improvement trajectory</p>
              </div>

              {/* Chart */}
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="timeToHire" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      name="Time to Hire (days)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="costPerHire" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                      name="Cost per Hire ($)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="qualityScore" 
                      stroke="#8b5cf6" 
                      strokeWidth={3}
                      dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                      name="Quality Score (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;
