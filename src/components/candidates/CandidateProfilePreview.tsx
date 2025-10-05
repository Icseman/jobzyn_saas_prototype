import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Download,
  ExternalLink,
  Linkedin,
  Github,
  Globe,
  Star,
  Zap,
  Target,
  TrendingUp,
  Clock,
  Briefcase,
  GraduationCap,
  Award,
  Users,
  Eye,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  XCircle
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
    profilePicture?: string;
    linkedinUrl?: string;
    githubUrl?: string;
    portfolioUrl?: string;
  };
  professionalInfo: {
    currentTitle: string;
    currentCompany: string;
    yearsExperience: number;
    summary: string;
  };
  skills: {
    technical: Array<{
      name: string;
      level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
      years: number;
    }>;
    certifications: string[];
  };
  education: Array<{
    degree: string;
    field: string;
    institution: string;
    graduationYear: number;
    gpa?: string;
  }>;
  availability: string;
  expectedSalary?: {
    min: number;
    max: number;
    currency: string;
  };
  workAuthorization: string;
  remotePreference: string;
  status: 'active' | 'inactive' | 'pending' | 'rejected';
  tags: Array<{
    name: string;
    color?: string;
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
  };
  pipelineHistory: Array<{
    jobTitle: string;
    company: string;
    appliedDate: string;
    status: 'applied' | 'screening' | 'interview' | 'offer' | 'rejected' | 'hired';
  }>;
  documents: Array<{
    name: string;
    type: string;
    uploadedDate: string;
    aiExtracted: boolean;
  }>;
}

interface CandidateProfilePreviewProps {
  candidate: Candidate;
  onClose: () => void;
  onViewFullProfile: () => void;
}

export const CandidateProfilePreview: React.FC<CandidateProfilePreviewProps> = ({
  candidate,
  onClose,
  onViewFullProfile
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'immediate':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800';
      case '1_week':
      case '2_weeks':
        return 'bg-primary/10 text-primary border-primary/20 dark:bg-primary/20 dark:text-primary dark:border-primary/30';
      case '1_month':
      case '2_months':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800';
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
      default:
        return availability;
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950';
    if (score >= 80) return 'text-primary bg-primary/10 dark:text-primary dark:bg-primary/20';
    if (score >= 70) return 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950';
    return 'text-destructive bg-destructive/10 dark:text-destructive dark:bg-destructive/20';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case 'inactive':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatSalary = (salary?: { min: number; max: number; currency: string }) => {
    if (!salary) return 'Not specified';
    return `${salary.currency} ${salary.min.toLocaleString()} - ${salary.max.toLocaleString()}`;
  };

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent side="right" className="w-96 p-0">
        <div className="h-full flex flex-col">
          {/* Header */}
          <SheetHeader className="p-4 border-b border-border">
            <SheetTitle className="text-lg font-semibold text-foreground">Candidate Profile</SheetTitle>
          </SheetHeader>
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              {/* Candidate Info */}
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={candidate.personalInfo.profilePicture} />
                  <AvatarFallback className="text-lg">
                    {candidate.personalInfo.firstName[0]}{candidate.personalInfo.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    {candidate.personalInfo.firstName} {candidate.personalInfo.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">{candidate.professionalInfo.currentTitle}</p>
                  <p className="text-sm text-muted-foreground/70">{candidate.professionalInfo.currentCompany}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {getStatusIcon(candidate.status)}
                    <span className="text-xs text-muted-foreground capitalize">{candidate.status}</span>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="flex space-x-2 mb-4">
                <Button size="sm" variant="outline" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
                <Button size="sm" variant="outline">
                  <FileText className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4 mt-4">
                  {/* Contact Information */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{candidate.personalInfo.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{candidate.personalInfo.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {candidate.personalInfo.location.city}, {candidate.personalInfo.location.state}
                        </span>
                      </div>
                      <div className="flex space-x-2 pt-2">
                        {candidate.personalInfo.linkedinUrl && (
                          <a 
                            href={candidate.personalInfo.linkedinUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        )}
                        {candidate.personalInfo.githubUrl && (
                          <a 
                            href={candidate.personalInfo.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                        {candidate.personalInfo.portfolioUrl && (
                          <a 
                            href={candidate.personalInfo.portfolioUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            <Globe className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Professional Information */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium">Professional Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Experience</span>
                        <span className="text-sm font-medium">{candidate.professionalInfo.yearsExperience} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Availability</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getAvailabilityColor(candidate.availability)}`}>
                          {getAvailabilityText(candidate.availability)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Salary Expectation</span>
                        <span className="text-sm font-medium">{formatSalary(candidate.expectedSalary)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Work Authorization</span>
                        <span className="text-sm font-medium">{candidate.workAuthorization}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Remote Preference</span>
                        <span className="text-sm font-medium">{candidate.remotePreference}</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* AI Insights */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center">
                        <Zap className="h-4 w-4 mr-2 text-primary" />
                        AI Insights
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Overall Match Score</span>
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${getMatchScoreColor(candidate.aiInsights.matchingScore)}`}>
                          {candidate.aiInsights.matchingScore}%
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Top Job Matches</p>
                        <div className="space-y-1">
                          {candidate.aiInsights.jobMatches.map((match, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{match.jobTitle}</span>
                              <span className="font-medium">{match.matchScore}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Skill Gaps</p>
                        <div className="space-y-2">
                          {candidate.aiInsights.skillGaps.map((gap, index) => (
                            <div key={index} className="text-sm">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{gap.skill}</span>
                                <Badge variant="outline" className="text-xs">
                                  {gap.importance}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">{gap.suggestion}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Tags */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium">Tags</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {candidate.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="skills" className="space-y-4 mt-4">
                  {/* Technical Skills */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium">Technical Skills</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {candidate.skills.technical.map((skill, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="text-xs text-muted-foreground ml-2">({skill.years} years)</span>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              skill.level === 'expert' ? 'border-emerald-200 text-emerald-800' :
                              skill.level === 'advanced' ? 'border-primary/30 text-primary' :
                              skill.level === 'intermediate' ? 'border-amber-400 text-amber-800' :
                              'border-muted text-muted-foreground'
                            }`}
                          >
                            {skill.level}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                  
                  {/* Certifications */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium">Certifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {candidate.skills.certifications.map((cert, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Award className="h-4 w-4 text-amber-600" />
                            <span className="text-sm">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Education */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium">Education</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {candidate.education.map((edu, index) => (
                          <div key={index}>
                            <div className="flex items-center space-x-2 mb-1">
                              <GraduationCap className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium">{edu.degree}</span>
                            </div>
                            <div className="text-sm text-muted-foreground ml-6">
                              {edu.field} • {edu.institution} • {edu.graduationYear}
                              {edu.gpa && <span> • GPA: {edu.gpa}</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="activity" className="space-y-4 mt-4">
                  {/* Pipeline History */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium">Pipeline History</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {candidate.pipelineHistory.map((pipeline, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">{pipeline.jobTitle}</p>
                            <p className="text-xs text-muted-foreground">{pipeline.company}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">{formatDate(pipeline.appliedDate)}</p>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                pipeline.status === 'in_progress' ? 'border-primary/30 text-primary' :
                                pipeline.status === 'completed' ? 'border-emerald-200 text-emerald-800' :
                                'border-destructive/30 text-destructive'
                              }`}
                            >
                              {pipeline.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                  
                  {/* Documents */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium">Documents</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {candidate.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{doc.name}</span>
                            {doc.aiExtracted && (
                              <Zap className="h-3 w-3 text-primary" />
                            )}
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Footer Actions */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Button size="sm" className="flex-1">
                <Target className="h-4 w-4 mr-2" />
                Add to Pipeline
              </Button>
              <Button size="sm" variant="outline" onClick={onViewFullProfile}>
                <Eye className="h-4 w-4 mr-2" />
                Full Profile
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};