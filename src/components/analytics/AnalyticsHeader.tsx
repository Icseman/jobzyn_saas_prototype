import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { 
  Calendar, 
  Download, 
  RefreshCw, 
  Filter,
  Search,
  X,
  Save,
  Mail,
  Settings,
  ChevronDown
} from 'lucide-react'

interface AnalyticsHeaderProps {
  onDateRangeChange: (range: string) => void
  onCompareToggle: (enabled: boolean) => void
  onSegmentChange: (segment: string) => void
  onFilterChange: (filters: string[]) => void
  onSearchChange: (query: string) => void
  onSaveView: () => void
  onExportPNG: () => void
  onExportCSV: () => void
  onScheduleEmail: () => void
}

export const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({
  onDateRangeChange,
  onCompareToggle,
  onSegmentChange,
  onFilterChange,
  onSearchChange,
  onSaveView,
  onExportPNG,
  onExportCSV,
  onScheduleEmail
}) => {
  const [dateRange, setDateRange] = useState('last-30-days')
  const [compareEnabled, setCompareEnabled] = useState(true)
  const [segment, setSegment] = useState('team')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'last-7-days', label: 'Last 7 days' },
    { value: 'last-30-days', label: 'Last 30 days' },
    { value: 'quarter-to-date', label: 'Quarter to date' },
    { value: 'custom', label: 'Custom' }
  ]

  const segmentOptions = [
    { value: 'team', label: 'Team' },
    { value: 'owner', label: 'Owner' },
    { value: 'client', label: 'Client' },
    { value: 'job-status', label: 'Job Status' },
    { value: 'meeting-type', label: 'Meeting Type' },
    { value: 'source-channel', label: 'Source Channel' }
  ]

  const filterOptions = [
    'Clients', 'Jobs', 'Owners', 'Industries', 'Locations', 
    'Work Model', 'Employment Type', 'Tags'
  ]

  const handleFilterAdd = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      const newFilters = [...activeFilters, filter]
      setActiveFilters(newFilters)
      onFilterChange(newFilters)
    }
  }

  const handleFilterRemove = (filter: string) => {
    const newFilters = activeFilters.filter(f => f !== filter)
    setActiveFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleClearAllFilters = () => {
    setActiveFilters([])
    onFilterChange([])
  }

  return (
    <div className="space-y-4">
      {/* Header Toolbar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Left Section - Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <h2 className="text-2xl font-bold">Analytics</h2>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Select value={dateRange} onValueChange={(value) => {
                  setDateRange(value)
                  onDateRangeChange(value)
                }}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {dateRangeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="compare-toggle"
                  checked={compareEnabled}
                  onCheckedChange={(checked) => {
                    setCompareEnabled(checked)
                    onCompareToggle(checked)
                  }}
                />
                <Label htmlFor="compare-toggle" className="text-sm">
                  Compare to previous period
                </Label>
              </div>

              <div className="flex items-center gap-2">
                <Select value={segment} onValueChange={(value) => {
                  setSegment(value)
                  onSegmentChange(value)
                }}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {segmentOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={onSaveView}>
                <Save className="h-4 w-4 mr-2" />
                Save View
              </Button>
              <Button variant="outline" size="sm" onClick={onExportPNG}>
                <Download className="h-4 w-4 mr-2" />
                Export PNG
              </Button>
              <Button variant="outline" size="sm" onClick={onExportCSV}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" size="sm" onClick={onScheduleEmail}>
                <Mail className="h-4 w-4 mr-2" />
                Schedule Email
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Multi-select Filters */}
            <div className="flex flex-wrap gap-2 items-center">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Filters:</span>
              
              {filterOptions.map(filter => (
                <Button
                  key={filter}
                  variant={activeFilters.includes(filter) ? "default" : "outline"}
                  size="sm"
                  onClick={() => activeFilters.includes(filter) 
                    ? handleFilterRemove(filter) 
                    : handleFilterAdd(filter)
                  }
                >
                  {filter}
                </Button>
              ))}
            </div>

            {/* Search and Clear */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search in dashboards..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    onSearchChange(e.target.value)
                  }}
                  className="pl-10 w-64"
                />
              </div>
              
              {activeFilters.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearAllFilters}
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFilters.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex flex-wrap gap-2">
                {activeFilters.map(filter => (
                  <Badge
                    key={filter}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {filter}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleFilterRemove(filter)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}