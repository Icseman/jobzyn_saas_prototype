import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Star, 
  Clock, 
  Mail, 
  Phone,
  ExternalLink,
  Eye,
  MessageSquare,
  Calendar,
  TrendingUp,
  Award,
  Users,
  Building2,
  Heart,
  Share2,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'

interface Candidate {
  id: string
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    location: {
      city: string
      state: string
      country: string
      timezone: string
    }
    profilePicture: string
    linkedinUrl: string
    githubUrl: string
    portfolioUrl: string
  }
  professionalInfo: {
    currentTitle: string
    currentCompany: string
    yearsExperience: number
    availability: string
    expectedSalary: {
      min: number
      max: number
      currency: string
    }
    workAuthorization: string
    remotePreference: string
  }
  skills: {
    technical: Array<{
      name: string
      level: string
      years: number
    }>
    soft: string[]
    certifications: string[]
  }
  education: Array<{
    institution: string
    degree: string
    field: string
    graduationYear: number
    gpa: number
  }>
  workHistory: Array<{
    company: string
    title: string
    startDate: string
    endDate: string | null
    current: boolean
    description: string
    achievements: string[]
  }>
  documents: Array<{
    id: string
    name: string
    type: string
    uploadDate: string
    size: string
    url: string
    aiExtracted?: boolean
    extractedSkills?: string[]
    extractedExperience?: number
  }>
  tags: Array<{
    name: string
    color: string
    category: string
  }>
  status: string
  source: string
  pipelineHistory: Array<{
    jobId: string
    jobTitle: string
    stage: string
    appliedDate: string
    lastActivity: string
    status: string
  }>
  aiInsights: {
    matchingScore: number
    jobMatches: Array<{
      jobId: string
      jobTitle: string
      matchScore: number
      reasoning: string
    }>
    skillGaps: Array<{
      skill: string
      importance: string
      suggestion: string
    }>
    strengths: string[]
    similarCandidates: string[]
  }
  notes: Array<{
    id: string
    content: string
    author: string
    authorName: string
    createdAt: string
    type: string
    mentions: string[]
  }>
  activityHistory: Array<{
    id: string
    type: string
    description: string
    timestamp: string
    user: string | null
    userName: string
  }>
  lastActivity: string
  createdAt: string
  updatedAt: string
}

interface CandidatesCardsViewProps {
  candidates: Candidate[]
  onCandidateSelect: (candidate: Candidate) => void
  onViewProfile: (candidate: Candidate) => void
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
    case 'inactive': return 'bg-destructive/10 text-destructive border-destructive/20 dark:bg-destructive/20 dark:text-destructive dark:border-destructive/30'
    case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
    default: return 'bg-muted text-muted-foreground border-border'
  }
}

const getAvailabilityColor = (availability: string) => {
  switch (availability) {
    case 'immediate': return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
    case '1_week':
    case '2_weeks': return 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary'
    case '1_month':
    case '2_months': return 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
    default: return 'bg-muted text-muted-foreground'
  }
}

const getExperienceLevel = (years: number) => {
  if (years < 2) return 'Junior'
  if (years < 5) return 'Mid-level'
  if (years < 8) return 'Senior'
  return 'Lead/Principal'
}

const getSkillLevelColor = (level: string) => {
  switch (level) {
    case 'expert': return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
    case 'advanced': return 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary'
    case 'intermediate': return 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
    case 'beginner': return 'bg-muted text-muted-foreground'
    default: return 'bg-muted text-muted-foreground'
  }
}

const CandidateCard: React.FC<{
  candidate: Candidate
  onSelect: (candidate: Candidate) => void
  onViewProfile: (candidate: Candidate) => void
}> = ({ candidate, onSelect, onViewProfile }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card 
      className={`transition-all duration-200 hover:shadow-lg cursor-pointer ${
        isHovered ? 'ring-2 ring-primary/20' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(candidate)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={candidate.personalInfo.profilePicture} alt={`${candidate.personalInfo.firstName} ${candidate.personalInfo.lastName}`} />
              <AvatarFallback className="text-sm font-medium">
                {candidate.personalInfo.firstName[0]}{candidate.personalInfo.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                {candidate.personalInfo.firstName} {candidate.personalInfo.lastName}
              </h3>
              <p className="text-xs text-muted-foreground">
                {candidate.professionalInfo.currentTitle}
              </p>
              <p className="text-xs text-muted-foreground">
                {candidate.professionalInfo.currentCompany}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Badge className={`text-xs ${getStatusColor(candidate.status)}`}>
              {candidate.status}
            </Badge>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        {/* Location and Experience */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{candidate.personalInfo.location.city}, {candidate.personalInfo.location.state}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="h-3 w-3" />
            <span>{candidate.professionalInfo.yearsExperience} years</span>
          </div>
        </div>

        {/* Availability */}
        <div className="flex items-center gap-2">
          <Badge className={`text-xs ${getAvailabilityColor(candidate.professionalInfo.availability)}`}>
            <Clock className="h-3 w-3 mr-1" />
            {candidate.professionalInfo.availability.replace('_', ' ')}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {getExperienceLevel(candidate.professionalInfo.yearsExperience)}
          </Badge>
        </div>

        {/* Top Skills */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Top Skills</p>
          <div className="flex flex-wrap gap-1">
            {candidate.skills.technical.slice(0, 4).map((skill) => (
              <Badge 
                key={skill.name} 
                variant="outline" 
                className={`text-xs ${getSkillLevelColor(skill.level)}`}
              >
                {skill.name}
              </Badge>
            ))}
            {candidate.skills.technical.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{candidate.skills.technical.length - 4}
              </Badge>
            )}
          </div>
        </div>

        {/* AI Match Score */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-medium">{candidate.aiInsights.matchingScore}% Match</span>
          </div>
          <div className="flex items-center gap-1">
            <Badge variant="secondary" className="text-xs">
              {candidate.pipelineHistory.length} applications
            </Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <Button 
            size="sm" 
            className="flex-1 h-8 text-xs"
            onClick={(e) => {
              e.stopPropagation()
              onViewProfile(candidate)
            }}
          >
            <Eye className="h-3 w-3 mr-1" />
            View Profile
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 px-3"
            onClick={(e) => {
              e.stopPropagation()
              onSelect(candidate)
            }}
          >
            <MessageSquare className="h-3 w-3" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 px-3"
            onClick={(e) => {
              e.stopPropagation()
              // Handle contact action
            }}
          >
            <Mail className="h-3 w-3" />
          </Button>
        </div>

        {/* Tags */}
        {candidate.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {candidate.tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag.name} 
                variant="secondary" 
                className="text-xs"
                style={{ backgroundColor: tag.color + '20', color: tag.color }}
              >
                {tag.name}
              </Badge>
            ))}
            {candidate.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{candidate.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export const CandidatesCardsView: React.FC<CandidatesCardsViewProps> = ({
  candidates,
  onCandidateSelect,
  onViewProfile
}) => {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)

  const handleCandidateSelect = (candidate: Candidate) => {
    setSelectedCandidate(candidate)
    onCandidateSelect(candidate)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Cards Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Candidates Cards</h2>
          <p className="text-sm text-muted-foreground">
            {candidates.length} candidates • Click on any card to view details
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            <Users className="h-3 w-3 mr-1" />
            {candidates.length} total
          </Badge>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {candidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onSelect={handleCandidateSelect}
              onViewProfile={onViewProfile}
            />
          ))}
        </div>
      </div>

      {/* Selected Candidate Info */}
      {selectedCandidate && (
        <div className="border-t border-border bg-background p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={selectedCandidate.personalInfo.profilePicture} alt={`${selectedCandidate.personalInfo.firstName} ${selectedCandidate.personalInfo.lastName}`} />
              <AvatarFallback className="text-sm font-medium">
                {selectedCandidate.personalInfo.firstName[0]}{selectedCandidate.personalInfo.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-foreground">
                {selectedCandidate.personalInfo.firstName} {selectedCandidate.personalInfo.lastName}
              </h3>
              <p className="text-xs text-muted-foreground">
                {selectedCandidate.professionalInfo.currentTitle} at {selectedCandidate.professionalInfo.currentCompany}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`text-xs ${getStatusColor(selectedCandidate.status)}`}>
                {selectedCandidate.status}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {selectedCandidate.aiInsights.matchingScore}% match
              </Badge>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
