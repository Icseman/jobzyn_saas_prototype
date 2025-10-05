import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ExternalLink, 
  Eye, 
  EyeOff, 
  Globe, 
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  TrendingUp,
  Activity,
  ChevronDown,
  Zap,
  BarChart3
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CareersPageStatusProps {
  className?: string
}

export function CareersPageStatus({ className }: CareersPageStatusProps) {
  const [isOnline, setIsOnline] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const [lastChecked, setLastChecked] = useState<Date>(new Date())
  const [applicationsToday, setApplicationsToday] = useState(12)
  const [pageViews, setPageViews] = useState(247)

  // Simulate checking if careers page is online
  useEffect(() => {
    const checkStatus = () => {
      setIsOnline(Math.random() > 0.1) // 90% chance of being online
      setLastChecked(new Date())
      // Simulate some activity
      setApplicationsToday(prev => prev + Math.floor(Math.random() * 3))
      setPageViews(prev => prev + Math.floor(Math.random() * 5))
    }

    checkStatus()
    const interval = setInterval(checkStatus, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const handleViewPage = () => {
    window.open('/careers', '_blank')
  }

  const handleSettings = () => {
    window.open('/careers-builder', '_blank')
  }

  const handleAnalytics = () => {
    window.open('/analytics', '_blank')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={`flex items-center gap-2 h-8 px-3 ${className}`}>
          {/* Status Indicator */}
          <div className="flex items-center gap-1">
            <div className={`h-2 w-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-destructive'}`} />
            <span className="text-xs font-medium">
              {isOnline ? 'Live' : 'Offline'}
            </span>
          </div>
          
          {/* Quick Stats */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="h-3 w-3" />
            <span>{applicationsToday}</span>
          </div>
          
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          Careers Page Status
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Status Overview */}
        <div className="p-3 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isOnline ? (
                <CheckCircle className="h-4 w-4 text-emerald-500" />
              ) : (
                <XCircle className="h-4 w-4 text-destructive" />
              )}
              <span className="text-sm font-medium">
                {isOnline ? 'Page is Live' : 'Page is Offline'}
              </span>
            </div>
            <Badge variant={isVisible ? "default" : "secondary"}>
              {isVisible ? 'Visible' : 'Hidden'}
            </Badge>
          </div>
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
              <Users className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Applications Today</p>
                <p className="text-sm font-semibold">{applicationsToday}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <div>
                <p className="text-xs text-muted-foreground">Page Views</p>
                <p className="text-sm font-semibold">{pageViews}</p>
              </div>
            </div>
          </div>
          
          {/* Last Updated */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Last checked: {lastChecked.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        {/* Actions */}
        <DropdownMenuItem onClick={handleToggleVisibility} className="flex items-center gap-2">
          {isVisible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
          {isVisible ? 'Hide Page' : 'Show Page'}
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={handleViewPage} className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          View Careers Page
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={handleSettings} className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Edit Page Design
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={handleAnalytics} className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          View Analytics
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="flex items-center gap-2 text-emerald-600">
          <Zap className="h-4 w-4" />
          Quick Actions
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


