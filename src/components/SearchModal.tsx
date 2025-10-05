import React, { useState, useEffect, useRef } from 'react'
import { Search, X, Command, ArrowRight, Sparkles, Zap, Users, Calendar, Plus, FileText, BarChart, Settings, HelpCircle, Briefcase, UserPlus, MessageSquare, ClipboardList, FileIcon, PaletteIcon, MailIcon, StickyNoteIcon, CreditCardIcon, ShieldIcon, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useNavigate } from 'react-router-dom'

interface SearchResult {
  id: string
  title: string
  description: string
  type: 'page' | 'action'
  icon: React.ReactNode
  path?: string
  action?: () => void
  category: string
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const searchResults: SearchResult[] = [
    // Pages
    {
      id: 'dashboard',
      title: 'Dashboard',
      description: 'Overview of recruitment activities and metrics',
      type: 'page',
      icon: <BarChart className="h-4 w-4" />,
      path: '/dashboard',
      category: 'Pages'
    },
    {
      id: 'jobs',
      title: 'Jobs',
      description: 'Manage job postings and applications',
      type: 'page',
      icon: <Briefcase className="h-4 w-4" />,
      path: '/jobs',
      category: 'Pages'
    },
    {
      id: 'candidates',
      title: 'Candidates',
      description: 'Browse and manage candidate database',
      type: 'page',
      icon: <Users className="h-4 w-4" />,
      path: '/candidates',
      category: 'Pages'
    },
    {
      id: 'clients',
      title: 'Clients',
      description: 'Manage client relationships and accounts',
      type: 'page',
      icon: <User className="h-4 w-4" />,
      path: '/clients',
      category: 'Pages'
    },
    {
      id: 'calendar',
      title: 'Calendar',
      description: 'Schedule and manage interviews',
      type: 'page',
      icon: <Calendar className="h-4 w-4" />,
      path: '/calendar',
      category: 'Pages'
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'View recruitment performance metrics',
      type: 'page',
      icon: <BarChart className="h-4 w-4" />,
      path: '/analytics',
      category: 'Pages'
    },
    {
      id: 'careers-builder',
      title: 'Careers Page Builder',
      description: 'Design and customize careers pages',
      type: 'page',
      icon: <PaletteIcon className="h-4 w-4" />,
      path: '/careers/builder',
      category: 'Pages'
    },
    {
      id: 'resume-builder',
      title: 'Resume Builder',
      description: 'Create and edit resume templates',
      type: 'page',
      icon: <FileText className="h-4 w-4" />,
      path: '/resume-builder',
      category: 'Pages'
    },
    {
      id: 'notes',
      title: 'Notes',
      description: 'Collaborative notes and documentation',
      type: 'page',
      icon: <StickyNoteIcon className="h-4 w-4" />,
      path: '/notes',
      category: 'Pages'
    },
    {
      id: 'mailbox',
      title: 'Mailbox',
      description: 'Email communication center',
      type: 'page',
      icon: <MailIcon className="h-4 w-4" />,
      path: '/mailbox',
      category: 'Pages'
    },
    {
      id: 'reports',
      title: 'Reports',
      description: 'Generate and view recruitment reports',
      type: 'page',
      icon: <FileIcon className="h-4 w-4" />,
      path: '/reports',
      category: 'Pages'
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Configure application preferences',
      type: 'page',
      icon: <Settings className="h-4 w-4" />,
      path: '/settings',
      category: 'Pages'
    },

    // Actions
    {
      id: 'create-job',
      title: 'Create Job',
      description: 'Post a new job opening',
      type: 'action',
      icon: <Plus className="h-4 w-4" />,
      path: '/jobs/create',
      category: 'Actions'
    },
    {
      id: 'create-talent',
      title: 'Add Candidate',
      description: 'Add a new candidate to the database',
      type: 'action',
      icon: <UserPlus className="h-4 w-4" />,
      path: '/candidates/create',
      category: 'Actions'
    },
    {
      id: 'schedule-meeting',
      title: 'Schedule Meeting',
      description: 'Create a new calendar event',
      type: 'action',
      icon: <Calendar className="h-4 w-4" />,
      path: '/calendar/create',
      category: 'Actions'
    },
    {
      id: 'create-client',
      title: 'Add Client',
      description: 'Add a new client to the system',
      type: 'action',
      icon: <User className="h-4 w-4" />,
      path: '/clients/create',
      category: 'Actions'
    },
    {
      id: 'send-message',
      title: 'Send Message',
      description: 'Compose and send a message',
      type: 'action',
      icon: <MessageSquare className="h-4 w-4" />,
      path: '/mailbox/compose',
      category: 'Actions'
    },
    {
      id: 'create-note',
      title: 'Create Note',
      description: 'Add a new collaborative note',
      type: 'action',
      icon: <StickyNoteIcon className="h-4 w-4" />,
      path: '/notes/create',
      category: 'Actions'
    },
    {
      id: 'generate-report',
      title: 'Generate Report',
      description: 'Create a new recruitment report',
      type: 'action',
      icon: <FileIcon className="h-4 w-4" />,
      path: '/reports/create',
      category: 'Actions'
    },
    {
      id: 'bulk-import',
      title: 'Bulk Import',
      description: 'Import multiple candidates or jobs',
      type: 'action',
      icon: <ClipboardList className="h-4 w-4" />,
      category: 'Actions'
    },
    {
      id: 'ai-match',
      title: 'AI Talent Matching',
      description: 'Use AI to match candidates with jobs',
      type: 'action',
      icon: <Sparkles className="h-4 w-4" />,
      category: 'Actions'
    },
    {
      id: 'quick-hire',
      title: 'Quick Hire',
      description: 'Fast-track hiring process',
      type: 'action',
      icon: <Zap className="h-4 w-4" />,
      category: 'Actions'
    },
    {
      id: 'export-data',
      title: 'Export Data',
      description: 'Export candidate or job data',
      type: 'action',
      icon: <FileIcon className="h-4 w-4" />,
      category: 'Actions'
    },
    {
      id: 'billing',
      title: 'Billing & Subscription',
      description: 'Manage subscription and payments',
      type: 'action',
      icon: <CreditCardIcon className="h-4 w-4" />,
      path: '/billing',
      category: 'Actions'
    },
    {
      id: 'security',
      title: 'Security Settings',
      description: 'Configure security and privacy',
      type: 'action',
      icon: <ShieldIcon className="h-4 w-4" />,
      path: '/security',
      category: 'Actions'
    }
  ]

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredResults([])
      setSelectedIndex(0)
      return
    }

    const filtered = searchResults.filter(result =>
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.description.toLowerCase().includes(query.toLowerCase()) ||
      result.category.toLowerCase().includes(query.toLowerCase())
    )

    setFilteredResults(filtered)
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, filteredResults.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredResults[selectedIndex]) {
          handleResultClick(filteredResults[selectedIndex])
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredResults, selectedIndex, onClose])

  const handleResultClick = (result: SearchResult) => {
    if (result.path) {
      navigate(result.path)
    }
    onClose()
    setQuery('')
  }

  const groupedResults = filteredResults.reduce((acc, result) => {
    if (!acc[result.category]) {
      acc[result.category] = []
    }
    acc[result.category].push(result)
    return acc
  }, {} as Record<string, SearchResult[]>)

  // Remove dark overlay when modal opens
  useEffect(() => {
    if (isOpen) {
      const overlay = document.querySelector('[data-radix-dialog-overlay]')
      if (overlay) {
        overlay.style.backgroundColor = 'transparent'
        overlay.style.backdropFilter = 'none'
      }
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 bg-background/95 backdrop-blur-sm border-border/50">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Search className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold">Search Everything</DialogTitle>
              <DialogDescription>Find pages, actions, and features instantly</DialogDescription>
            </div>
          </div>
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for pages, actions, or features..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-12 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              <kbd className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">⌘</kbd>
              <kbd className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">K</kbd>
            </div>
          </div>
        </DialogHeader>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto px-6">
          {query.trim() === '' ? (
            <div className="py-8 text-center">
              <div className="p-3 bg-muted/50 rounded-lg w-fit mx-auto mb-3">
                <Sparkles className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-2">Start typing to search</p>
              <p className="text-sm text-muted-foreground/70">Try "create job", "dashboard", or "calendar"</p>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="py-8 text-center">
              <div className="p-3 bg-muted/50 rounded-lg w-fit mx-auto mb-3">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-2">No results found</p>
              <p className="text-sm text-muted-foreground/70">Try different keywords</p>
            </div>
          ) : (
            <div className="pb-2">
              {Object.entries(groupedResults).map(([category, results]) => (
                <div key={category} className="mb-4">
                  <div className="px-2 py-2">
                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {category}
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {results.map((result, index) => {
                      const globalIndex = filteredResults.indexOf(result)
                      const isSelected = globalIndex === selectedIndex
                      
                      return (
                        <button
                          key={result.id}
                          onClick={() => handleResultClick(result)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                            isSelected 
                              ? 'bg-primary/10 text-primary' 
                              : 'hover:bg-muted/50 text-foreground'
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${
                            result.type === 'page' 
                              ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' 
                              : 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
                          }`}>
                            {result.icon}
                          </div>
                          <div className="flex-1 text-left">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{result.title}</span>
                              <Badge 
                                variant="secondary" 
                                className={`text-xs ${
                                  result.type === 'page' 
                                    ? 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400' 
                                    : 'bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400'
                                }`}
                              >
                                {result.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{result.description}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">↑↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">↵</kbd>
                Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Esc</kbd>
                Close
              </span>
            </div>
            <span>{filteredResults.length} results</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SearchModal
