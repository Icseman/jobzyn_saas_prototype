import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Play, 
  Heart, 
  MessageCircle,
  Filter,
  Grid3X3,
  List,
  Users,
  Calendar,
  MapPin
} from 'lucide-react'

export interface CultureMosaicSectionProps {
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

export const CultureMosaicSection: React.FC<CultureMosaicSectionProps> = ({
  data,
  settings,
  isSelected = false,
  onSelect,
  onSettingsChange,
  theme = 'light'
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const cultureData = data.culture || []
  
  const filters = [
    { id: 'all', label: 'All', count: cultureData.length },
    { id: 'All', label: 'All Teams', count: cultureData.filter((item: any) => item.department === 'All').length },
    { id: 'Engineering', label: 'Engineering', count: cultureData.filter((item: any) => item.department === 'Engineering').length },
    { id: 'Design', label: 'Design', count: cultureData.filter((item: any) => item.department === 'Design').length },
    { id: 'Product', label: 'Product', count: cultureData.filter((item: any) => item.department === 'Product').length }
  ]

  const filteredData = selectedFilter === 'all' 
    ? cultureData 
    : cultureData.filter((item: any) => item.department === selectedFilter)

  const getBackgroundClass = () => {
    switch (settings.background) {
      case 'gradient':
        return theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-purple-50 to-pink-50'
      case 'light':
        return theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
      default:
        return theme === 'dark' ? 'bg-gray-900' : 'bg-white'
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

  const renderCultureItem = (item: any, index: number) => {
    const isVideo = item.type === 'video'
    const isHovered = hoveredItem === item.src

    return (
      <Card
        key={`${item.src}-${index}`}
        className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
          viewMode === 'grid' ? 'aspect-square' : 'h-32'
        } ${getAnimationClass()}`}
        style={{ animationDelay: `${index * 100}ms` }}
        onMouseEnter={() => setHoveredItem(item.src)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <div className="relative h-full overflow-hidden">
          {/* Content Area */}
          <div className={`h-full bg-gradient-to-br ${
            index % 4 === 0 ? 'from-blue-400 to-blue-600' :
            index % 4 === 1 ? 'from-purple-400 to-purple-600' :
            index % 4 === 2 ? 'from-pink-400 to-pink-600' :
            'from-green-400 to-green-600'
          } flex items-center justify-center relative`}>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white/30 rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-white/30 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 border-white/20 rounded-full"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center text-white p-4">
              {isVideo ? (
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                    <Play className="h-8 w-8 ml-1" />
                  </div>
                  <h3 className="font-semibold text-lg">{item.caption}</h3>
                  <p className="text-sm opacity-90">Watch our story</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-lg">{item.caption}</h3>
                  <p className="text-sm opacity-90">{item.department} Team</p>
                </div>
              )}
            </div>

            {/* Hover Overlay */}
            {isHovered && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-center space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-bold text-white text-lg">{item.caption}</h4>
                    <p className="text-white/80 text-sm">
                      {isVideo ? 'Watch our team in action' : 'Meet our amazing team'}
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                      {isVideo ? 'Watch' : 'View'}
                    </Button>
                    <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-gray-900">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-gray-900">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Department Badge */}
            <div className="absolute top-3 left-3">
              <Badge className="bg-white/90 text-gray-900 text-xs">
                {item.department}
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    )
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
            Our Culture in Action
          </h2>
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            See what makes our workplace special through the eyes of our team
          </p>
        </div>

        {/* Filters and View Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-4 sm:space-y-0">
          {/* Filters */}
          <div className="flex flex-wrap items-center space-x-2">
            <Filter className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter(filter.id)}
                className="text-sm text-gray-900"
              >
                {filter.label}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {filter.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="text-gray-900"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="text-gray-900"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Culture Grid/List */}
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }>
          {filteredData.map((item: any, index: number) => renderCultureItem(item, index))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8 text-gray-900">
            Load More Stories
          </Button>
        </div>
      </div>

      {/* Settings Panel */}
      {isSelected && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 min-w-64 text-gray-900">
          <h3 className="font-semibold mb-3">Culture Mosaic Settings</h3>
          
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
