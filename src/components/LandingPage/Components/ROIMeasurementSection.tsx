import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ROIMeasurementSectionProps {
  isActive?: boolean;
}

const ROIMeasurementSection: React.FC<ROIMeasurementSectionProps> = ({ isActive = false }) => {
  // Mock data for the chart
  const chartData = [
    { date: 'Oct 9', organic: 12000, nonOrganic: 8000 },
    { date: 'Oct 10', organic: 15000, nonOrganic: 12000 },
    { date: 'Oct 11', organic: 18000, nonOrganic: 10000 },
    { date: 'Oct 12', organic: 14000, nonOrganic: 16000 },
    { date: 'Oct 13', organic: 20000, nonOrganic: 14000 },
    { date: 'Oct 14', organic: 16000, nonOrganic: 18000 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-green-600">
            <span className="font-medium">Organic Hires:</span> {payload[0].value.toLocaleString()}
          </p>
          <p className="text-blue-600">
            <span className="font-medium">Non-Organic Hires:</span> {payload[1].value.toLocaleString()}
          </p>
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
              Can you accurately measure your recruitment ROI while protecting candidate privacy?
            </h2>
            
            {/* Body Text */}
            <p className="text-lg text-gray-600 leading-relaxed">
              Attracting top talent is great, but getting precise insights while protecting candidate confidentiality is even better. 
              Our privacy-preserving measurement and analytics technologies provide reliable data you can trust, 
              from all recruitment channels, platforms, and devices.
            </p>
            
            {/* Call-to-Action Links */}
            <div className="space-y-4">
              <a 
                href="#" 
                className="block text-lg text-gray-900 hover:text-blue-600 transition-colors duration-200 underline decoration-2 underline-offset-4 hover:decoration-blue-600"
              >
                Discover our analytics and measurement suites →
              </a>
              <a 
                href="#" 
                className="block text-lg text-gray-900 hover:text-blue-600 transition-colors duration-200 underline decoration-2 underline-offset-4 hover:decoration-blue-600"
              >
                Explore our AI-powered candidate matching →
              </a>
              <a 
                href="#" 
                className="block text-lg text-gray-900 hover:text-blue-600 transition-colors duration-200 underline decoration-2 underline-offset-4 hover:decoration-blue-600"
              >
                Learn about our privacy-first approach →
              </a>
            </div>
          </div>

          {/* Right Section - Chart */}
          <div className="relative">
            <div className={`bg-gray-50 rounded-2xl p-8 border border-gray-200 shadow-sm transition-all duration-1000 ${
              isActive ? 'transform scale-105 shadow-xl' : 'transform scale-100'
            }`}>
              {/* Chart Header */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Hiring Performance Analytics</h3>
                
                {/* Legend */}
                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
                    <span className="text-sm font-medium text-gray-700">Organic Hires</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                    <span className="text-sm font-medium text-gray-700">Non-Organic Hires</span>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="nonOrganic" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
                    <Bar dataKey="organic" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROIMeasurementSection;
