import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Play, 
  Users, 
  ArrowRight,
  Sparkles,
  Star,
  Upload,
  X
} from 'lucide-react'

export interface HeroStorySectionProps {
  data: any
  settings: {
    background: string
    backgroundImage?: string
    backgroundColor?: string
    logoImage?: string
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

export const HeroStorySection: React.FC<HeroStorySectionProps> = ({
  data,
  settings,
  isSelected = false,
  onSelect,
  onSettingsChange,
  theme = 'light'
}) => {
  const [currentText, setCurrentText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showElements, setShowElements] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const logoFileRef = useRef<HTMLInputElement>(null)
  const backgroundFileRef = useRef<HTMLInputElement>(null)

  const heroData = data.hero || {
    title: "Join Our Adventure",
    subtitle: "Build the future with us",
    ctaPrimary: "Apply Now",
    ctaSecondary: "Meet the Team"
  }

  const handleImageUpload = (file: File, type: 'logo' | 'background') => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string
      if (type === 'logo') {
        onSettingsChange?.({ logoImage: imageUrl })
      } else {
        onSettingsChange?.({ backgroundImage: imageUrl })
      }
    }
    reader.readAsDataURL(file)
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleImageUpload(file, 'logo')
    }
  }

  const handleBackgroundUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleImageUpload(file, 'background')
    }
  }

  useEffect(() => {
    // Typewriter effect
    setIsTyping(true)
    let index = 0
    const typewriter = setInterval(() => {
      if (index < heroData.title.length) {
        setCurrentText(heroData.title.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(typewriter)
      }
    }, 100)

    // Show other elements after typing starts
    setTimeout(() => setShowElements(true), 500)

    return () => clearInterval(typewriter)
  }, [heroData.title])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      // Hide scroll indicator when user scrolls past the hero section
      if (scrollY > windowHeight * 0.5) {
        setShowScrollIndicator(false)
      } else {
        setShowScrollIndicator(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getBackgroundClass = () => {
    switch (settings.background) {
      case 'gradient':
        return theme === 'dark' 
          ? 'bg-gradient-to-br from-blue-800 via-purple-800 to-indigo-900'
          : 'bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800'
      case 'video':
        return theme === 'dark' ? 'bg-gray-900' : 'bg-gray-800'
      case 'image':
        return 'bg-cover bg-center bg-no-repeat'
      case 'solid':
        return ''
      default:
        return theme === 'dark' ? 'bg-gray-900' : 'bg-white'
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

  return (
    <div 
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${getBackgroundClass()} ${settings.spacing.padding} ${settings.spacing.margin} ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onSelect}
      style={{ 
        paddingBottom: '4rem',
        backgroundImage: settings.background === 'image' ? `url('${settings.backgroundImage || '/api/placeholder/1920/1080'}')` : undefined,
        backgroundColor: settings.background === 'solid' ? settings.backgroundColor : undefined
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Shapes */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-16 h-16 bg-yellow-400/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-40 w-24 h-24 bg-purple-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-12 h-12 bg-blue-400/20 rounded-full animate-bounce"></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6">
        {/* Company Logo */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <img 
            src={settings.logoImage || "/src/Assets/jobsyn_recruitment.svg"} 
            alt="Company Logo" 
            className="h-12 w-auto sm:h-16 md:h-20"
          />
        </div>
        {/* Main Title with Typewriter Effect */}
        <div className="mb-6 sm:mb-8">
          <h1 className={`text-4xl sm:text-6xl md:text-8xl font-bold ${theme === 'dark' ? 'text-white' : 'text-white'} mb-4 ${getAnimationClass()}`}>
            {isTyping ? (
              <span className="relative">
                {currentText}
                <span className="animate-pulse">|</span>
              </span>
            ) : (
              heroData.title
            )}
          </h1>
          
          {showElements && (
            <div className={`space-y-4 ${getAnimationClass()}`}>
              <p className={`text-lg sm:text-xl md:text-2xl ${theme === 'dark' ? 'text-white/90' : 'text-white/90'} font-light`}>
                {heroData.subtitle}
              </p>
              
              {/* Decorative Elements */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8">
                <div className={`flex items-center space-x-2 ${theme === 'dark' ? 'text-white/80' : 'text-white/80'}`}>
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs sm:text-sm">4.9/5 Rating</span>
                </div>
                <div className={`hidden sm:block w-px h-6 ${theme === 'dark' ? 'bg-white/30' : 'bg-white/30'}`}></div>
                <div className={`flex items-center space-x-2 ${theme === 'dark' ? 'text-white/80' : 'text-white/80'}`}>
                  <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm">120+ Team Members</span>
                </div>
                <div className={`hidden sm:block w-px h-6 ${theme === 'dark' ? 'bg-white/30' : 'bg-white/30'}`}></div>
                <div className={`flex items-center space-x-2 ${theme === 'dark' ? 'text-white/80' : 'text-white/80'}`}>
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                  <span className="text-xs sm:text-sm">Innovation First</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA Buttons */}
        {showElements && (
          <div className={`flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6 ${getAnimationClass()}`}>
            <Button 
              size="lg" 
              className={`${theme === 'dark' ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-white text-gray-900 hover:bg-gray-100'} px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto`}
            >
              {heroData.ctaPrimary}
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className={`bg-transparent ${theme === 'dark' ? 'border-white text-white hover:bg-white hover:text-gray-900' : 'border-white text-white hover:bg-white hover:text-gray-900'} px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105 w-full sm:w-auto`}
            >
              <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              {heroData.ctaSecondary}
            </Button>
          </div>
        )}

        {/* Scroll Indicator - Positioned outside main content */}
        {showElements && showScrollIndicator && (
          <div className={`fixed bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none ${getAnimationClass()}`}>
            <div className={`flex flex-col items-center space-y-1 sm:space-y-2 ${theme === 'dark' ? 'text-white/60' : 'text-white/60'}`}>
              <span className="text-xs sm:text-sm">Scroll to explore</span>
              <div className={`w-5 h-8 sm:w-6 sm:h-10 border-2 ${theme === 'dark' ? 'border-white/30' : 'border-white/30'} rounded-full flex justify-center`}>
                <div className={`w-1 h-2 sm:h-3 ${theme === 'dark' ? 'bg-white/60' : 'bg-white/60'} rounded-full mt-1 sm:mt-2 animate-bounce`}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Settings Panel */}
      {isSelected && (
        <div className={`absolute top-4 right-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg shadow-lg p-4 min-w-64`}>
          <h3 className="font-semibold mb-3">Hero Story Settings</h3>
          
          <div className="space-y-3">
            <div>
              <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Background</label>
              <select 
                className={`w-full mt-1 p-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md`}
                value={settings.background}
                onChange={(e) => onSettingsChange?.({ background: e.target.value })}
              >
                <option value="gradient">Gradient</option>
                <option value="video">Video</option>
                <option value="image">Image</option>
                <option value="solid">Solid Color</option>
                <option value="white">White</option>
              </select>
            </div>
            
            {settings.background === 'solid' && (
              <div>
                <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Background Color</label>
                <div className="mt-1 flex items-center space-x-2">
                  <input
                    type="color"
                    value={settings.backgroundColor || '#ffffff'}
                    onChange={(e) => onSettingsChange?.({ backgroundColor: e.target.value })}
                    className={`w-12 h-8 border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} rounded cursor-pointer`}
                  />
                  <input
                    type="text"
                    value={settings.backgroundColor || '#ffffff'}
                    onChange={(e) => onSettingsChange?.({ backgroundColor: e.target.value })}
                    placeholder="#ffffff"
                    className={`flex-1 p-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md text-sm`}
                  />
                </div>
              </div>
            )}
            
            {settings.background === 'image' && (
              <div>
                <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Background Image</label>
                <div className="mt-1 space-y-2">
                  <input 
                    type="file"
                    ref={backgroundFileRef}
                    onChange={handleBackgroundUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => backgroundFileRef.current?.click()}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                  {settings.backgroundImage && (
                    <div className={`flex items-center justify-between p-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded`}>
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} truncate`}>
                        {settings.backgroundImage.includes('data:') ? 'Uploaded Image' : 'Custom URL'}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => onSettingsChange?.({ backgroundImage: '' })}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div>
              <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Company Logo</label>
              <div className="mt-1 space-y-2">
                <input 
                  type="file"
                  ref={logoFileRef}
                  onChange={handleLogoUpload}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => logoFileRef.current?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Logo
                </Button>
                {settings.logoImage && (
                  <div className={`flex items-center justify-between p-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded`}>
                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} truncate`}>
                      {settings.logoImage.includes('data:') ? 'Uploaded Logo' : 'Custom Logo'}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onSettingsChange?.({ logoImage: '' })}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Animation</label>
              <select 
                className={`w-full mt-1 p-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-md`}
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
              <label className="text-sm font-medium text-gray-700">Padding</label>
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
