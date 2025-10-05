import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BarChart3, 
  Clock, 
  Users, 
  Briefcase,
  AlertTriangle,
  Trophy,
  Building2,
  Calendar,
  MessageSquare,
  Shield
} from 'lucide-react'

interface DashboardSection {
  id: string
  title: string
  icon: React.ReactNode
  component: React.ReactNode
  description: string
}

interface DashboardGridProps {
  sections: DashboardSection[]
  onSectionClick: (sectionId: string) => void
}

export const DashboardGrid: React.FC<DashboardGridProps> = ({
  sections,
  onSectionClick
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sections.map((section) => (
        <Card 
          key={section.id} 
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onSectionClick(section.id)}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {section.icon}
              {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {section.description}
            </p>
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Dashboard sections configuration
export const dashboardSections = [
  {
    id: 'pipeline',
    title: 'Pipeline & Conversion',
    icon: <BarChart3 className="h-5 w-5" />,
    description: 'Track candidate flow through hiring stages with conversion rates and drop-off analysis.'
  },
  {
    id: 'timeToFill',
    title: 'Time to Fill & SLA',
    icon: <Clock className="h-5 w-5" />,
    description: 'Monitor hiring speed, SLA compliance, and response times across teams and clients.'
  },
  {
    id: 'sourcing',
    title: 'Sourcing Performance',
    icon: <Users className="h-5 w-5" />,
    description: 'Analyze source channel effectiveness, cost per hire, and quality metrics.'
  },
  {
    id: 'jobsHealth',
    title: 'Jobs Health',
    icon: <Briefcase className="h-5 w-5" />,
    description: 'Monitor job aging, status distribution, priority levels, and fill rates.'
  },
  {
    id: 'ownerPerformance',
    title: 'Owner & Team Performance',
    icon: <Trophy className="h-5 w-5" />,
    description: 'Track individual and team performance, workload distribution, and round-robin balance.'
  },
  {
    id: 'clients',
    title: 'Clients & Revenue',
    icon: <Building2 className="h-5 w-5" />,
    description: 'Analyze client performance, revenue impact, and time-to-fill by client.'
  },
  {
    id: 'calendar',
    title: 'Calendar & Interviews',
    icon: <Calendar className="h-5 w-5" />,
    description: 'Monitor interview scheduling, no-show rates, and resource utilization.'
  },
  {
    id: 'notes',
    title: 'Notes & Collaboration',
    icon: <MessageSquare className="h-5 w-5" />,
    description: 'Track note creation, mentions activity, and collaboration engagement.'
  },
  {
    id: 'compliance',
    title: 'Compliance & Data Quality',
    icon: <Shield className="h-5 w-5" />,
    description: 'Monitor GDPR compliance, data quality, and audit log flags.'
  }
]
