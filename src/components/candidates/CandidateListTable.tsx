import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  ChevronUp, 
  ChevronDown, 
  MoreHorizontal, 
  Eye, 
  MessageSquare, 
  Calendar, 
  FileText, 
  Star,
  MapPin,
  Clock,
  Briefcase,
  GraduationCap,
  Zap,
  Target,
  TrendingUp,
  ExternalLink,
  Phone,
  Mail,
  Linkedin,
  Github,
  Globe
} from 'lucide-react';

interface Candidate {
  id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: {
      city: string;
      state: string;
      country: string;
      timezone: string;
    };
    profilePicture: string;
    linkedinUrl: string;
    githubUrl: string;
    portfolioUrl: string;
  };
  professionalInfo: {
    currentTitle: string;
    currentCompany: string;
    yearsExperience: number;
    availability: string;
    expectedSalary: {
      min: number;
      max: number;
      currency: string;
    };
    workAuthorization: string;
    remotePreference: string;
  };
  skills: {
    technical: Array<{
      name: string;
      level: string;
      years: number;
    }>;
    soft: string[];
    certifications: string[];
  };
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    graduationYear: number;
    gpa: number;
  }>;
  workHistory: Array<{
    company: string;
    title: string;
    startDate: string;
    endDate: string | null;
    current: boolean;
    description: string;
    achievements: string[];
  }>;
  documents: Array<{
    id: string;
    name: string;
    type: string;
    uploadDate: string;
    size: string;
    url: string;
    aiExtracted?: boolean;
    extractedSkills?: string[];
    extractedExperience?: number;
  }>;
  tags: Array<{
    name: string;
    color: string;
    category: string;
  }>;
  status: string;
  source: string;
  pipelineHistory: Array<{
    jobId: string;
    jobTitle: string;
    stage: string;
    appliedDate: string;
    lastActivity: string;
    status: string;
  }>;
  aiInsights: {
    matchingScore: number;
    jobMatches: Array<{
      jobId: string;
      jobTitle: string;
      matchScore: number;
      reasoning: string;
    }>;
    skillGaps: Array<{
      skill: string;
      importance: string;
      suggestion: string;
    }>;
    strengths: string[];
    similarCandidates: string[];
  };
  notes: Array<{
    id: string;
    content: string;
    author: string;
    authorName: string;
    createdAt: string;
    type: string;
    mentions: string[];
  }>;
  activityHistory: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
    user: string | null;
    userName: string;
  }>;
  lastActivity: string;
  createdAt: string;
  updatedAt: string;
}

interface CandidateListTableProps {
  candidates: Candidate[];
  selectedCandidates: string[];
  onCandidateSelect: (candidate: Candidate) => void;
  onSelectionChange: (selectedIds: string[]) => void;
  onViewFullProfile: (candidate: Candidate) => void;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSortChange: (field: string, order: 'asc' | 'desc') => void;
}

export const CandidateListTable: React.FC<CandidateListTableProps> = ({
  candidates,
  selectedCandidates,
  onCandidateSelect,
  onSelectionChange,
  onViewFullProfile,
  sortBy,
  sortOrder,
  onSortChange
}) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(candidates.map(c => c.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectCandidate = (candidateId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedCandidates, candidateId]);
    } else {
      onSelectionChange(selectedCandidates.filter(id => id !== candidateId));
    }
  };

  const handleSort = (field: string) => {
    const newOrder = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
    onSortChange(field, newOrder);
  };

  const toggleRowExpansion = (candidateId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(candidateId)) {
      newExpanded.delete(candidateId);
    } else {
      newExpanded.add(candidateId);
    }
    setExpandedRows(newExpanded);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'immediate':
        return 'bg-primary/10 text-primary border-primary/20 dark:bg-primary/20 dark:text-primary dark:border-primary/30';
      case '1_week':
      case '2_weeks':
        return 'bg-secondary text-secondary-foreground border-border';
      case '1_month':
      case '2_months':
        return 'bg-accent text-accent-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'immediate':
        return 'Immediate';
      case '1_week':
        return '1 Week';
      case '2_weeks':
        return '2 Weeks';
      case '1_month':
        return '1 Month';
      case '2_months':
        return '2 Months';
      case '3_months':
        return '3 Months';
      default:
        return availability;
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
    if (score >= 80) return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
    return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const SortButton: React.FC<{ field: string; children: React.ReactNode }> = ({ field, children }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-auto p-0 font-medium hover:bg-transparent"
      onClick={() => handleSort(field)}
    >
      <span className="flex items-center space-x-1">
        <span>{children}</span>
        {sortBy === field && (
          sortOrder === 'asc' ? 
            <ChevronUp className="h-4 w-4" /> : 
            <ChevronDown className="h-4 w-4" />
        )}
      </span>
    </Button>
  );

  return (
    <div className="h-full overflow-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-background z-10">
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedCandidates.length === candidates.length && candidates.length > 0}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead className="w-12"></TableHead>
            <TableHead>
              <SortButton field="name">Candidate</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="experience">Experience</SortButton>
            </TableHead>
            <TableHead>Skills</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>
              <SortButton field="matchingScore">AI Match</SortButton>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>
              <SortButton field="lastActivity">Last Activity</SortButton>
            </TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((candidate) => {
            const isExpanded = expandedRows.has(candidate.id);
            const isSelected = selectedCandidates.includes(candidate.id);
            
            return (
              <React.Fragment key={candidate.id}>
                <TableRow 
                  className={`cursor-pointer hover:bg-muted/50 ${isSelected ? 'bg-primary/10 dark:bg-primary/20' : ''}`}
                  onClick={() => onCandidateSelect(candidate)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => handleSelectCandidate(candidate.id, checked as boolean)}
                    />
                  </TableCell>
                  
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRowExpansion(candidate.id)}
                    >
                      {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                    </Button>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={candidate.personalInfo.profilePicture} />
                        <AvatarFallback>
                          {candidate.personalInfo.firstName[0]}{candidate.personalInfo.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground">
                          {candidate.personalInfo.firstName} {candidate.personalInfo.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">{candidate.professionalInfo.currentTitle}</div>
                        <div className="text-sm text-muted-foreground/70">{candidate.professionalInfo.currentCompany}</div>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {candidate.professionalInfo.yearsExperience} years
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.technical.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill.name}
                        </Badge>
                      ))}
                      {candidate.skills.technical.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{candidate.skills.technical.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {candidate.personalInfo.location.city}, {candidate.personalInfo.location.state}
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge className={`text-xs ${getAvailabilityColor(candidate.professionalInfo.availability)}`}>
                      {getAvailabilityText(candidate.professionalInfo.availability)}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchScoreColor(candidate.aiInsights.matchingScore)}`}>
                        {candidate.aiInsights.matchingScore}%
                      </div>
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {candidate.tags.slice(0, 2).map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className={`text-xs border-${tag.color}-200 text-${tag.color}-800`}
                        >
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {formatDate(candidate.lastActivity)}
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewFullProfile(candidate)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Full Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Interview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" />
                          View Documents
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Target className="h-4 w-4 mr-2" />
                          Add to Pipeline
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                
                {/* Expanded Row */}
                {isExpanded && (
                  <TableRow>
                    <TableCell colSpan={11} className="bg-muted/30 p-0">
                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Contact Information */}
                          <div>
                            <h4 className="font-medium text-foreground mb-3">Contact Information</h4>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{candidate.personalInfo.email}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{candidate.personalInfo.phone}</span>
                              </div>
                              {candidate.personalInfo.linkedinUrl && (
                                <div className="flex items-center space-x-2">
                                  <Linkedin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                  <a 
                                    href={candidate.personalInfo.linkedinUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                                  >
                                    LinkedIn Profile
                                  </a>
                                </div>
                              )}
                              {candidate.personalInfo.githubUrl && (
                                <div className="flex items-center space-x-2">
                                  <Github className="h-4 w-4 text-muted-foreground" />
                                  <a 
                                    href={candidate.personalInfo.githubUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-sm text-muted-foreground hover:underline"
                                  >
                                    GitHub Profile
                                  </a>
                                </div>
                              )}
                              {candidate.personalInfo.portfolioUrl && (
                                <div className="flex items-center space-x-2">
                                  <Globe className="h-4 w-4 text-green-600 dark:text-green-400" />
                                  <a 
                                    href={candidate.personalInfo.portfolioUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-sm text-green-600 hover:underline dark:text-green-400"
                                  >
                                    Portfolio
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Skills & Education */}
                          <div>
                            <h4 className="font-medium text-foreground mb-3">Skills & Education</h4>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">Technical Skills</p>
                                <div className="flex flex-wrap gap-1">
                                  {candidate.skills.technical.map((skill, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {skill.name} ({skill.level})
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              {candidate.education.length > 0 && (
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground mb-1">Education</p>
                                  <div className="text-sm text-muted-foreground">
                                    {candidate.education[0].degree} in {candidate.education[0].field}<br />
                                    {candidate.education[0].institution} ({candidate.education[0].graduationYear})
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* AI Insights & Pipeline */}
                          <div>
                            <h4 className="font-medium text-foreground mb-3">AI Insights & Pipeline</h4>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground mb-1">Top Job Matches</p>
                                <div className="space-y-1">
                                  {candidate.aiInsights.jobMatches.slice(0, 2).map((match, index) => (
                                    <div key={index} className="text-sm">
                                      <span className="font-medium">{match.jobTitle}</span>
                                      <span className={`ml-2 px-2 py-1 rounded text-xs ${getMatchScoreColor(match.matchScore)}`}>
                                        {match.matchScore}%
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              {candidate.pipelineHistory.length > 0 && (
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground mb-1">Current Pipeline</p>
                                  <div className="text-sm text-muted-foreground">
                                    {candidate.pipelineHistory[0].jobTitle} - {candidate.pipelineHistory[0].stage}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t">
                          <Button variant="outline" size="sm" onClick={() => onViewFullProfile(candidate)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Full Profile
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Send Message
                          </Button>
                          <Button variant="outline" size="sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule Interview
                          </Button>
                          <Button size="sm">
                            <Target className="h-4 w-4 mr-2" />
                            Add to Pipeline
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
      
      {candidates.length === 0 && (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-muted-foreground mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No candidates found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
          </div>
        </div>
      )}
    </div>
  );
};
