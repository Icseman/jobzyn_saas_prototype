import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Users, 
  Briefcase, 
  Globe, 
  Calendar,
  TrendingUp,
  Award,
  Target,
  Zap
} from 'lucide-react'

export interface FunFactsSectionProps {
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
}

export const FunFactsSection: React.FC<FunFactsSectionProps> = ({
  data,
  settings,
  isSelected = false,
  onSelect,
  onSettingsChange
}) => {
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({})
  const [isVisible, setIsVisible] = useState(false)

  const funFactsData = data.funFacts || []

  const getIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'employees':
        return <Users className="h-8 w-8" />
      case 'projects completed':
        return <Briefcase className="h-8 w-8" />
      case 'countries':
        return <Globe className="h-8 w-8" />
      case 'years experience':
        return <Calendar className="h-8 w-8" />
      default:
        return <TrendingUp className="h-8 w-8" />
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('fun-facts-section')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      funFactsData.forEach((fact: any, index: number) => {
        setTimeout(() => {
          animateValue(fact.label, fact.value)
        }, index * 200)
      })
    }
  }, [isVisible, funFactsData])

  const animateValue = (label: string, targetValue: number) => {
    const duration = 2000
    const startTime = Date.now()
    const startValue = 0

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart)
      
      setAnimatedValues(prev => ({
        ...prev,
        [label]: currentValue
      }))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }

  const getBackgroundClass = () => {
    switch (settings.background) {
      case 'gradient':
        return 'bg-gradient-to-br from-green-50 to-blue-50'
      case 'light':
        return 'bg-gray-50'
      default:
        return 'bg-white'
    }
  }

  const getAnimationClass = () => {
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
      id="fun-facts-section"
      className={`${getBackgroundClass()} ${settings.spacing.padding} ${settings.spacing.margin} ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onSelect}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${getAnimationClass()}`}>
            By the Numbers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our journey in numbers - milestones that tell our story
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {funFactsData.map((fact: any, index: number) => (
            <Card
              key={fact.label}
              className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-105 ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-8 text-center">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {getIcon(fact.label)}
                  </div>
                </div>

                {/* Animated Number */}
                <div className="mb-4">
                  <span className="text-4xl md:text-5xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {animatedValues[fact.label] || 0}
                    {fact.label.toLowerCase().includes('years') && '+'}
                    {fact.label.toLowerCase().includes('employees') && '+'}
                    {fact.label.toLowerCase().includes('projects') && '+'}
                    {fact.label.toLowerCase().includes('countries') && '+'}
                  </span>
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                  {fact.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
                  {fact.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Achievements */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Recent Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Award className="h-6 w-6" />, text: "Best Workplace 2024", subtext: "Industry Recognition" },
              { icon: <Target className="h-6 w-6" />, text: "95% Goal Achievement", subtext: "Team Performance" },
              { icon: <Zap className="h-6 w-6" />, text: "Innovation Award", subtext: "Technology Excellence" }
            ].map((achievement, index) => (
              <div key={index} className="flex flex-col items-center space-y-3 p-6 rounded-lg hover:bg-white/50 transition-colors">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                  {achievement.icon}
                </div>
                <div>
                  <span className="text-lg font-semibold text-gray-900">{achievement.text}</span>
                  <p className="text-sm text-gray-600">{achievement.subtext}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {isSelected && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 min-w-64 text-gray-900">
          <h3 className="font-semibold mb-3">Fun Facts Settings</h3>
          
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
