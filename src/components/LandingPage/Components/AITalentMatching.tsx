import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface AITalentMatchingProps {
  isActive?: boolean;
}

const AITalentMatching: React.FC<AITalentMatchingProps> = ({ isActive = false }) => {
  // Mock data for the pie chart
  const pieData = [
    { name: 'Perfect Match', value: 35, color: '#10b981' },
    { name: 'Good Match', value: 28, color: '#3b82f6' },
    { name: 'Fair Match', value: 22, color: '#f59e0b' },
    { name: 'Poor Match', value: 15, color: '#ef4444' },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{payload[0].name}</p>
          <p className="text-gray-600">
            <span className="font-medium">{payload[0].value}%</span> of candidates
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Section - Text Content */}
          <div className="space-y-8">
            {/* Main Headline */}
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              How does AI-powered talent matching revolutionize your hiring process?
            </h2>
            
            {/* Body Text */}
            <p className="text-lg text-gray-600 leading-relaxed">
              Finding the right candidate is no longer about luck. Our advanced AI algorithms analyze skills, 
              experience, and cultural fit to deliver precise matches. Reduce time-to-hire by 70% while 
              improving candidate quality and retention rates across all your open positions.
            </p>
            
            {/* Call-to-Action Links */}
            <div className="space-y-4">
              <a 
                href="#" 
                className="block text-lg text-gray-900 hover:text-purple-600 transition-colors duration-200 underline decoration-2 underline-offset-4 hover:decoration-purple-600"
              >
                Explore our AI matching algorithms →
              </a>
              <a 
                href="#" 
                className="block text-lg text-gray-900 hover:text-purple-600 transition-colors duration-200 underline decoration-2 underline-offset-4 hover:decoration-purple-600"
              >
                See matching accuracy reports →
              </a>
              <a 
                href="#" 
                className="block text-lg text-gray-900 hover:text-purple-600 transition-colors duration-200 underline decoration-2 underline-offset-4 hover:decoration-purple-600"
              >
                Try our smart screening tools →
              </a>
            </div>
          </div>

          {/* Right Section - Chart */}
          <div className="relative">
            <div className={`bg-white rounded-2xl p-8 border border-gray-200 shadow-sm transition-all duration-1000 ${
              isActive ? 'transform scale-105 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50' : 'transform scale-100'
            }`}>
              {/* Chart Header */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Match Quality Distribution</h3>
                <p className="text-sm text-gray-600">Candidate matching accuracy across all positions</p>
              </div>

              {/* Chart */}
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      formatter={(value, entry: any) => (
                        <span style={{ color: entry.color, fontSize: '14px' }}>
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITalentMatching;
