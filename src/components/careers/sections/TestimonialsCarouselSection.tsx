import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  ChevronLeft, 
  ChevronRight, 
  Quote,
  Star,
  Play,
  Pause
} from 'lucide-react'

export interface TestimonialsCarouselSectionProps {
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

export const TestimonialsCarouselSection: React.FC<TestimonialsCarouselSectionProps> = ({
  data,
  settings,
  isSelected = false,
  onSelect,
  onSettingsChange
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  const testimonialsData = data.testimonials || []

  useEffect(() => {
    if (isAutoPlaying && !isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonialsData.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, isHovered, testimonialsData.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length)
  }

  const getBackgroundClass = () => {
    switch (settings.background) {
      case 'gradient':
        return 'bg-gradient-to-br from-indigo-50 to-purple-50'
      case 'light':
        return 'bg-gray-50'
      default:
        return 'bg-white'
    }
  }

  const getAnimationClass = () => {
    switch (settings.animation) {
      case 'fadeIn':
        return 'animate-fade-in'
      case 'slideUp':
        return 'animate-slide-up'
      case 'zoom':
        return 'animate-zoom-in'
      default:
        return ''
    }
  }

  if (testimonialsData.length === 0) {
    return (
      <div className={`${getBackgroundClass()} ${settings.spacing.padding} ${settings.spacing.margin}`}>
        <div className="text-center py-16">
          <p className="text-gray-500">No testimonials available</p>
        </div>
      </div>
    )
  }

  const currentTestimonial = testimonialsData[currentIndex]

  return (
    <div 
      className={`${getBackgroundClass()} ${settings.spacing.padding} ${settings.spacing.margin} ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onSelect}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${getAnimationClass()}`}>
            What Our Team Says
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from the people who make our company great
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Testimonial */}
          <Card className="max-w-4xl mx-auto shadow-2xl">
            <CardContent className="p-12 text-center">
              {/* Quote Icon */}
              <div className="mb-8">
                <Quote className="h-16 w-16 text-blue-500 mx-auto" />
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-2xl md:text-3xl font-light text-gray-700 mb-8 leading-relaxed">
                "{currentTestimonial.quote}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center justify-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={`/avatars/${currentTestimonial.photo}`} />
                  <AvatarFallback className="bg-blue-500 text-white text-lg">
                    {currentTestimonial.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <h4 className="text-xl font-bold text-gray-900">{currentTestimonial.name}</h4>
                  <p className="text-gray-600">{currentTestimonial.role}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="lg"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Auto-play Toggle */}
          <Button
            variant="outline"
            size="sm"
            className="absolute top-4 right-4 bg-white/90 hover:bg-white"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          >
            {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>

        {/* Testimonial Thumbnails */}
        <div className="flex justify-center space-x-4 mt-12">
          {testimonialsData.map((testimonial: any, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 ${
                index === currentIndex 
                  ? 'scale-110 ring-2 ring-blue-500' 
                  : 'hover:scale-105'
              }`}
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={`/avatars/${testimonial.photo}`} />
                <AvatarFallback className="bg-gray-200 text-gray-600">
                  {testimonial.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </button>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonialsData.map((_, index: number) => (
            <div
              key={index}
              className={`h-2 w-8 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Settings Panel */}
      {isSelected && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 min-w-64 text-gray-900">
          <h3 className="font-semibold mb-3">Testimonials Settings</h3>
          
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
                <option value="fadeIn">Fade In</option>
                <option value="slideUp">Slide Up</option>
                <option value="zoom">Zoom In</option>
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
