import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Card, CardContent } from '@/components/ui/card'
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
  Building2
} from 'lucide-react'
import 'leaflet/dist/leaflet.css'

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

interface CandidatesMapViewProps {
  candidates: Candidate[]
  onCandidateSelect: (candidate: Candidate) => void
  onViewProfile: (candidate: Candidate) => void
}

// Mock coordinates for major cities
const cityCoordinates: { [key: string]: [number, number] } = {
  'San Francisco, CA': [37.7749, -122.4194],
  'New York, NY': [40.7128, -74.0060],
  'Los Angeles, CA': [34.0522, -118.2437],
  'Chicago, IL': [41.8781, -87.6298],
  'Houston, TX': [29.7604, -95.3698],
  'Phoenix, AZ': [33.4484, -112.0740],
  'Philadelphia, PA': [39.9526, -75.1652],
  'San Antonio, TX': [29.4241, -98.4936],
  'San Diego, CA': [32.7157, -117.1611],
  'Dallas, TX': [32.7767, -96.7970],
  'Austin, TX': [30.2672, -97.7431],
  'Seattle, WA': [47.6062, -122.3321],
  'Boston, MA': [42.3601, -71.0589],
  'Denver, CO': [39.7392, -104.9903],
  'Atlanta, GA': [33.7490, -84.3880],
  'Miami, FL': [25.7617, -80.1918],
  'Portland, OR': [45.5152, -122.6784],
  'Las Vegas, NV': [36.1699, -115.1398],
  'Nashville, TN': [36.1627, -86.7816],
  'Detroit, MI': [42.3314, -83.0458],
  'Remote': [39.8283, -98.5795], // Center of US for remote workers
  'London, UK': [51.5074, -0.1278],
  'Toronto, ON': [43.6532, -79.3832],
  'Berlin, Germany': [52.5200, 13.4050],
  'Paris, France': [48.8566, 2.3522],
  'Amsterdam, Netherlands': [52.3676, 4.9041],
  'Sydney, Australia': [-33.8688, 151.2093],
  'Tokyo, Japan': [35.6762, 139.6503],
  'Singapore': [1.3521, 103.8198],
  'Dubai, UAE': [25.2048, 55.2708]
}

const getCandidateCoordinates = (candidate: Candidate): [number, number] => {
  const locationKey = `${candidate.personalInfo.location.city}, ${candidate.personalInfo.location.state}`
  return cityCoordinates[locationKey] || cityCoordinates['Remote']
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

const CandidateMarker: React.FC<{ candidate: Candidate; onSelect: (candidate: Candidate) => void; onViewProfile: (candidate: Candidate) => void }> = ({ 
  candidate, 
  onSelect, 
  onViewProfile 
}) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <Marker 
      position={getCandidateCoordinates(candidate)}
      eventHandlers={{
        click: () => onSelect(candidate),
        mouseover: () => setIsHovered(true),
        mouseout: () => setIsHovered(false)
      }}
    >
      <Popup className="candidate-popup">
        <div className="w-80 p-4">
          <div className="flex items-start gap-3 mb-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={candidate.personalInfo.profilePicture} alt={`${candidate.personalInfo.firstName} ${candidate.personalInfo.lastName}`} />
              <AvatarFallback className="text-sm font-medium">
                {candidate.personalInfo.firstName[0]}{candidate.personalInfo.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-foreground">
                {candidate.personalInfo.firstName} {candidate.personalInfo.lastName}
              </h3>
              <p className="text-xs text-muted-foreground mb-1">
                {candidate.professionalInfo.currentTitle}
              </p>
              <p className="text-xs text-muted-foreground">
                {candidate.professionalInfo.currentCompany}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant="secondary" className="text-xs">
                {candidate.aiInsights.matchingScore}% match
              </Badge>
            </div>
          </div>

          <div className="space-y-2 mb-3">
            <div className="flex items-center gap-2 text-xs">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">
                {candidate.personalInfo.location.city}, {candidate.personalInfo.location.state}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Briefcase className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">
                {candidate.professionalInfo.yearsExperience} years • {getExperienceLevel(candidate.professionalInfo.yearsExperience)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">
                Available: {candidate.professionalInfo.availability.replace('_', ' ')}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {candidate.skills.technical.slice(0, 4).map((skill) => (
              <Badge key={skill.name} variant="outline" className="text-xs">
                {skill.name}
              </Badge>
            ))}
            {candidate.skills.technical.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{candidate.skills.technical.length - 4} more
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              className="flex-1 h-8 text-xs"
              onClick={() => onViewProfile(candidate)}
            >
              <Eye className="h-3 w-3 mr-1" />
              View Profile
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 px-2"
              onClick={() => onSelect(candidate)}
            >
              <MessageSquare className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </Popup>
    </Marker>
  )
}

export const CandidatesMapView: React.FC<CandidatesMapViewProps> = ({
  candidates,
  onCandidateSelect,
  onViewProfile
}) => {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)

  // Group candidates by location for clustering
  const candidatesByLocation = candidates.reduce((acc, candidate) => {
    const locationKey = `${candidate.personalInfo.location.city}, ${candidate.personalInfo.location.state}`
    if (!acc[locationKey]) {
      acc[locationKey] = []
    }
    acc[locationKey].push(candidate)
    return acc
  }, {} as { [key: string]: Candidate[] })

  const handleCandidateSelect = (candidate: Candidate) => {
    setSelectedCandidate(candidate)
    onCandidateSelect(candidate)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Map Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Candidates Map</h2>
          <p className="text-sm text-muted-foreground">
            {candidates.length} candidates across {Object.keys(candidatesByLocation).length} locations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            <MapPin className="h-3 w-3 mr-1" />
            {Object.keys(candidatesByLocation).length} locations
          </Badge>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <MapContainer
          center={[39.8283, -98.5795]} // Center of US
          zoom={4}
          className="h-full w-full"
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {candidates.map((candidate) => (
            <CandidateMarker
              key={candidate.id}
              candidate={candidate}
              onSelect={handleCandidateSelect}
              onViewProfile={onViewProfile}
            />
          ))}
        </MapContainer>
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
