import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Heart, 
  Brain, 
  Clock, 
  TrendingUp,
  Sparkles,
  Zap,
  Shield,
  Gift
} from 'lucide-react'

export interface BenefitsExperienceSectionProps {
  data: any
  settings: {
    background: string
    animation: string
    spacing: {
      padding: string
      margin: string
    }
  }
  isSelected?: boolean
  onSelect?: () => void
  onSettingsChange?: (settings: any) => void
  theme?: 'light' | 'dark'
}

export const BenefitsExperienceSection: React.FC<BenefitsExperienceSectionProps> = ({
  data,
  settings,
  isSelected = false,
  onSelect,
  onSettingsChange,
  theme = 'light'
}) => {
  const [hoveredBenefit, setHoveredBenefit] = useState<string | null>(null)

  const benefitsData = data.benefits || []

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'health.svg':
        return <Heart className="h-8 w-8" />
      case 'learning.svg':
        return <Brain className="h-8 w-8" />
      case 'flexibility.svg':
        return <Clock className="h-8 w-8" />
      case 'growth.svg':
        return <TrendingUp className="h-8 w-8" />
      default:
        return <Gift className="h-8 w-8" />
    }
  }

  const getAnimationClass = (animation: string) => {
    switch (animation) {
      case 'hoverGlow':
        return 'hover:shadow-glow hover:shadow-blue-500/50'
      case 'hoverSpin':
        return 'hover:rotate-12'
      case 'hoverLift':
        return 'hover:-translate-y-2'
      default:
        return 'hover:scale-105'
    }
  }

  const getBackgroundClass = () => {
    switch (settings.background) {
      case 'gradient':
        return 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      case 'light':
        return 'bg-gray-50'
      default:
        return 'bg-white'
    }
  }

  const getSectionAnimationClass = () => {
    switch (settings.animation) {
      case 'stagger':
        return 'animate-stagger'
      case 'fadeIn':
        return 'animate-fade-in'
      case 'slideUp':
        return 'animate-slide-up'
      default:
        return ''
    }
  }

  return (
    <div 
      className={`${getBackgroundClass()} ${settings.spacing.padding} ${settings.spacing.margin} ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onSelect}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4 ${getSectionAnimationClass()}`}>
            Why You'll Love Working Here
          </h2>
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            We believe in taking care of our team with comprehensive benefits and perks
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefitsData.map((benefit: any, index: number) => (
            <Card
              key={benefit.title}
              className={`group cursor-pointer transition-all duration-300 ${getAnimationClass(benefit.animation)} ${
                hoveredBenefit === benefit.title ? 'shadow-2xl scale-105' : ''
              } ${getSectionAnimationClass()}`}
              style={{ animationDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredBenefit(benefit.title)}
              onMouseLeave={() => setHoveredBenefit(null)}
            >
              <CardContent className="p-8 text-center">
                {/* Icon */}
                <div className="mb-6">
                  <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
                    hoveredBenefit === benefit.title 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
                      : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                  }`}>
                    {getIcon(benefit.icon)}
                  </div>
                </div>

                {/* Title */}
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'} mb-3 transition-colors`}>
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-6 leading-relaxed`}>
                  {benefit.description}
                </p>

                {/* Hover Effect */}
                {hoveredBenefit === benefit.title && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center space-y-3">
                      <Sparkles className="h-8 w-8 text-blue-500 mx-auto" />
                      <p className="text-sm font-medium text-blue-600">Learn More</p>
                    </div>
                  </div>
                )}

                {/* Learn More Button */}
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Perks */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">And So Much More</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Zap className="h-6 w-6" />, text: "Flexible Hours" },
              { icon: <Shield className="h-6 w-6" />, text: "Health Insurance" },
              { icon: <Gift className="h-6 w-6" />, text: "Annual Bonus" },
              { icon: <Sparkles className="h-6 w-6" />, text: "Team Events" }
            ].map((perk, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-white/50 transition-colors">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  {perk.icon}
                </div>
                <span className="text-sm font-medium text-gray-700">{perk.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {isSelected && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 min-w-64 text-gray-900">
          <h3 className="font-semibold mb-3">Benefits Settings</h3>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Background</label>
              <select 
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={settings.background}
                onChange={(e) => onSettingsChange?.({ background: e.target.value })}
              >
                <option value="white">White</option>
                <option value="light">Light Gray</option>
                <option value="gradient">Gradient</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Animation</label>
              <select 
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={settings.animation}
                onChange={(e) => onSettingsChange?.({ animation: e.target.value })}
              >
                <option value="stagger">Stagger</option>
                <option value="fadeIn">Fade In</option>
                <option value="slideUp">Slide Up</option>
                <option value="none">None</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Spacing</label>
              <select 
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={settings.spacing.padding}
                onChange={(e) => onSettingsChange?.({ 
                  spacing: { ...settings.spacing, padding: e.target.value }
                })}
              >
                <option value="py-12">Small</option>
                <option value="py-16">Medium</option>
                <option value="py-20">Large</option>
                <option value="py-24">Extra Large</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
