import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  MapPin, 
  Clock, 
  Users, 
  ArrowRight,
  Heart,
  Share2,
  Calendar
} from 'lucide-react'

export interface SpotlightJobSectionProps {
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

export const SpotlightJobSection: React.FC<SpotlightJobSectionProps> = ({
  data,
  settings,
  isSelected = false,
  onSelect,
  onSettingsChange,
  theme = 'light'
}) => {
  const navigate = useNavigate()
  const [hoveredJob, setHoveredJob] = useState<string | null>(null)
  const [likedJobs, setLikedJobs] = useState<Set<string>>(new Set())

  const featuredJobs = data.jobs?.filter((job: any) => job.featured) || []

  const handleLike = (jobId: string) => {
    const newLikedJobs = new Set(likedJobs)
    if (newLikedJobs.has(jobId)) {
      newLikedJobs.delete(jobId)
    } else {
      newLikedJobs.add(jobId)
    }
    setLikedJobs(newLikedJobs)
  }

  const handleJobClick = (jobId: string) => {
    navigate(`/careers/job/${jobId}`)
  }

  const getBackgroundClass = () => {
    switch (settings.background) {
      case 'gradient':
        return theme === 'dark' 
          ? 'bg-gradient-to-r from-gray-800 to-gray-900'
          : 'bg-gradient-to-r from-blue-50 to-indigo-100'
      case 'light':
        return theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
      default:
        return theme === 'dark' ? 'bg-gray-900' : 'bg-white'
    }
  }

  const getAnimationClass = () => {
    switch (settings.animation) {
      case 'slideUp':
        return 'animate-slide-up'
      case 'fadeIn':
        return 'animate-fade-in'
      case 'stagger':
        return 'animate-stagger'
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
        <div className="text-center mb-12">
          <h2 className={`text-4xl md:text-5xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4 ${getAnimationClass()}`}>
            Featured Opportunities
          </h2>
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Discover exciting roles that could be your next career adventure
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredJobs.map((job: any, index: number) => (
            <Card
              key={job.id}
              className={`group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                hoveredJob === job.id ? 'shadow-2xl scale-105' : ''
              } ${getAnimationClass()}`}
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredJob(job.id)}
              onMouseLeave={() => setHoveredJob(null)}
              onClick={() => handleJobClick(job.id)}
            >
              <div className="relative overflow-hidden">
                {/* Job Image/Background */}
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleLike(job.id)
                      }}
                    >
                      <Heart 
                        className={`h-4 w-4 ${likedJobs.has(job.id) ? 'fill-red-500 text-red-500' : ''}`} 
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 text-white"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Department Badge */}
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-white/90 text-gray-900 hover:bg-white">
                      {job.department}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Job Title */}
                    <div>
                      <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'} transition-colors`}>
                        {job.title}
                      </h3>
                      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mt-2 line-clamp-2`}>
                        {job.snippet}
                      </p>
                    </div>

                    {/* Job Details */}
                    <div className={`flex items-center space-x-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Full-time</span>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    {hoveredJob === job.id && (
                      <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                        <div className="text-center space-y-4">
                          <div className="space-y-2">
                            <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Why You'll Love This Role</h4>
                            <ul className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} space-y-1`}>
                              <li>• Work with cutting-edge technology</li>
                              <li>• Collaborative team environment</li>
                              <li>• Growth opportunities</li>
                              <li>• Competitive benefits</li>
                            </ul>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button 
                              className="flex-1"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleJobClick(job.id)
                              }}
                            >
                              Apply Now
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button variant="outline">
                              <Calendar className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Apply Button */}
                    <Button 
                      className="w-full group-hover:bg-blue-600 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleJobClick(job.id)
                      }}
                    >
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Jobs CTA */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8 text-gray-900">
            View All Open Positions
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Settings Panel */}
      {isSelected && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 min-w-64 text-gray-900">
          <h3 className="font-semibold mb-3">Spotlight Job Settings</h3>
          
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
                <option value="slideUp">Slide Up</option>
                <option value="fadeIn">Fade In</option>
                <option value="stagger">Stagger</option>
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
