import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Calendar, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Clock,
  Users,
  CalendarDays,
  CalendarRange
} from 'lucide-react'

interface Stats {
  totalEvents: number
  todayEvents: number
  thisWeekEvents: number
  interviews: number
}

interface CalendarHeaderProps {
  currentView: 'day' | 'week' | 'month' | 'agenda' | 'timeline'
  onViewChange: (view: 'day' | 'week' | 'month' | 'agenda' | 'timeline') => void
  currentDate: Date
  onDateChange: (date: Date) => void
  timezone: string
  onTimezoneChange: (timezone: string) => void
  onCreateEvent: () => void
  onJumpToToday: () => void
  stats: Stats
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentView,
  onViewChange,
  currentDate,
  onDateChange,
  timezone,
  onTimezoneChange,
  onCreateEvent,
  onJumpToToday,
  stats
}) => {
  const formatDateRange = () => {
    switch (currentView) {
      case 'day':
        return currentDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      case 'week':
        const weekStart = new Date(currentDate)
        weekStart.setDate(currentDate.getDate() - currentDate.getDay())
        const weekEnd = new Date(weekStart)
        weekEnd.setDate(weekStart.getDate() + 6)
        
        return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
      case 'month':
        return currentDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long'
        })
      case 'agenda':
        return 'Agenda View'
      case 'timeline':
        return 'Timeline View'
      default:
        return ''
    }
  }

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    
    switch (currentView) {
      case 'day':
        newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1))
        break
      case 'week':
        newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7))
        break
      case 'month':
        newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1))
        break
      case 'agenda':
      case 'timeline':
        newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1))
        break
    }
    
    onDateChange(newDate)
  }

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between p-6">
        {/* Left Section - Simplified */}
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Calendar</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {formatDateRange()}
            </p>
          </div>
          
          {/* Navigation - Minimal */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => navigateDate('prev')} className="h-8 w-8 p-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigateDate('next')} className="h-8 w-8 p-0">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={onJumpToToday} className="h-8 px-3 text-xs">
              Today
            </Button>
          </div>
        </div>

        {/* Center Section - Clean View Switcher */}
        <div className="flex items-center bg-muted rounded-lg p-1">
          <Button
            variant={currentView === 'day' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('day')}
            className="h-8 px-3 text-xs"
          >
            Day
          </Button>
          <Button
            variant={currentView === 'week' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('week')}
            className="h-8 px-3 text-xs"
          >
            Week
          </Button>
          <Button
            variant={currentView === 'month' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('month')}
            className="h-8 px-3 text-xs"
          >
            Month
          </Button>
          <Button
            variant={currentView === 'agenda' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('agenda')}
            className="h-8 px-3 text-xs"
          >
            Agenda
          </Button>
        </div>

        {/* Right Section - Minimal */}
        <div className="flex items-center gap-3">
          {/* Timezone - Simplified */}
          <Select value={timezone} onValueChange={onTimezoneChange}>
            <SelectTrigger className="w-32 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Africa/Casablanca">Casablanca</SelectItem>
              <SelectItem value="Europe/London">London</SelectItem>
              <SelectItem value="America/New_York">New York</SelectItem>
              <SelectItem value="Asia/Dubai">Dubai</SelectItem>
            </SelectContent>
          </Select>

          {/* New Meeting Button - Clean */}
          <Button onClick={onCreateEvent} size="sm" className="h-8 px-4">
            <Plus className="h-4 w-4 mr-1" />
            New Meeting
          </Button>
        </div>
      </div>

      {/* Stats Row - Simplified */}
      <div className="px-6 pb-4">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">Total:</span>
            <span className="font-medium">{stats.totalEvents}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span className="text-muted-foreground">Today:</span>
            <span className="font-medium">{stats.todayEvents}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-muted-foreground">This Week:</span>
            <span className="font-medium">{stats.thisWeekEvents}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-muted-foreground">Interviews:</span>
            <span className="font-medium">{stats.interviews}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
