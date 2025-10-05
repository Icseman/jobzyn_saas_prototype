import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
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
  XCircle,
  Send,
  Upload,
  Heart,
  Share2,
  Bookmark,
  MoreHorizontal,
  ChevronRight,
  Activity,
  BarChart3,
  Brain,
  Lightbulb,
  AlertTriangle,
  ThumbsUp,
  MessageCircle,
  AtSign
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

interface CandidateProfilePageProps {
  candidate: Candidate;
  onClose: () => void;
}

export const CandidateProfilePage: React.FC<CandidateProfilePageProps> = ({
  candidate,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'immediate':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case '1_week':
      case '2_weeks':
        return 'bg-orange-200 text-orange-800 border-orange-200';
      case '1_month':
      case '2_months':
        return 'bg-orange-300 text-orange-800 border-orange-200';
      default:
        return 'bg-orange-400 text-orange-800 border-orange-200';
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
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'inactive':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatSalary = (salary: { min: number; max: number; currency: string }) => {
    return `${salary.currency} ${salary.min.toLocaleString()} - ${salary.max.toLocaleString()}`;
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      // In a real app, this would save to the backend
      console.log('Adding note:', newNote);
      setNewNote('');
      setIsAddingNote(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full max-w-6xl h-[90vh] bg-white rounded-lg shadow-xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-orange-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">Candidate Profile</h1>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={candidate.personalInfo.profilePicture} />
              <AvatarFallback className="text-xl">
                {candidate.personalInfo.firstName[0]}{candidate.personalInfo.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground">
                {candidate.personalInfo.firstName} {candidate.personalInfo.lastName}
              </h2>
              <p className="text-lg text-muted-foreground">{candidate.professionalInfo.currentTitle}</p>
              <p className="text-muted-foreground">{candidate.professionalInfo.currentCompany}</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(candidate.status)}
                  <span className="text-sm text-muted-foreground capitalize">{candidate.status}</span>
                </div>
                <Badge className={`text-xs ${getAvailabilityColor(candidate.professionalInfo.availability)}`}>
                  {getAvailabilityText(candidate.professionalInfo.availability)}
                </Badge>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchScoreColor(candidate.aiInsights.matchingScore)}`}>
                  AI Match: {candidate.aiInsights.matchingScore}%
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
              <Button size="sm">
                <Target className="h-4 w-4 mr-2" />
                Add to Pipeline
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-6 mx-6 mt-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-auto p-6">
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Contact Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Mail className="h-5 w-5 mr-2 text-blue-500" />
                        Contact Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{candidate.personalInfo.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{candidate.personalInfo.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {candidate.personalInfo.location.city}, {candidate.personalInfo.location.state}
                        </span>
                      </div>
                      <div className="flex space-x-2 pt-2">
                        {candidate.personalInfo.linkedinUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={candidate.personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer">
                              <Linkedin className="h-4 w-4 mr-2" />
                              LinkedIn
                            </a>
                          </Button>
                        )}
                        {candidate.personalInfo.githubUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={candidate.personalInfo.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4 mr-2" />
                              GitHub
                            </a>
                          </Button>
                        )}
                        {candidate.personalInfo.portfolioUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={candidate.personalInfo.portfolioUrl} target="_blank" rel="noopener noreferrer">
                              <Globe className="h-4 w-4 mr-2" />
                              Portfolio
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Professional Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Briefcase className="h-5 w-5 mr-2 text-green-500" />
                        Professional Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Experience</span>
                        <span className="text-sm font-medium">
                          {candidate.professionalInfo.yearsExperience} years
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Salary Expectation</span>
                        <span className="text-sm font-medium">
                          {formatSalary(candidate.professionalInfo.expectedSalary)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Work Authorization</span>
                        <span className="text-sm font-medium">
                          {candidate.professionalInfo.workAuthorization}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Remote Preference</span>
                        <span className="text-sm font-medium capitalize">
                          {candidate.professionalInfo.remotePreference}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Source</span>
                        <span className="text-sm font-medium capitalize">
                          {candidate.source}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Tags */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Star className="h-5 w-5 mr-2 text-yellow-500" />
                      Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {candidate.tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className={`border-${tag.color}-200 text-${tag.color}-800`}
                        >
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Notes */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <MessageCircle className="h-5 w-5 mr-2 text-purple-500" />
                        Notes & Collaboration
                      </CardTitle>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setIsAddingNote(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Note
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isAddingNote && (
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Add a note about this candidate..."
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          rows={3}
                        />
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={handleAddNote}>
                            <Send className="h-4 w-4 mr-2" />
                            Add Note
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => {
                              setIsAddingNote(false);
                              setNewNote('');
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-3">
                      {candidate.notes.map((note) => (
                        <div key={note.id} className="border rounded-lg p-3">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">{note.authorName}</span>
                              <Badge variant="outline" className="text-xs">
                                {note.type}
                              </Badge>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(note.createdAt)}
                            </span>
                          </div>
                          <p className="text-sm text-foreground">{note.content}</p>
                          {note.mentions.length > 0 && (
                            <div className="flex items-center space-x-1 mt-2">
                              <AtSign className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                Mentioned: {note.mentions.join(', ')}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="space-y-6">
                {/* Work History */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Briefcase className="h-5 w-5 mr-2 text-blue-500" />
                      Work History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {candidate.workHistory.map((work, index) => (
                        <div key={index} className="border-l-4 border-orange-200 pl-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-foreground">{work.title}</h4>
                              <p className="text-sm text-muted-foreground">{work.company}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">
                                {formatDate(work.startDate)} - {work.endDate ? formatDate(work.endDate) : 'Present'}
                              </p>
                              {work.current && (
                                <Badge variant="secondary" className="text-xs">
                                  Current
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-foreground mb-3">{work.description}</p>
                          {work.achievements.length > 0 && (
                            <div>
                              <p className="text-sm font-medium text-muted-foreground mb-1">Key Achievements:</p>
                              <ul className="text-sm text-foreground space-y-1">
                                {work.achievements.map((achievement, idx) => (
                                  <li key={idx} className="flex items-start space-x-2">
                                    <ChevronRight className="h-3 w-3 text-muted-foreground mt-1 flex-shrink-0" />
                                    <span>{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Education */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <GraduationCap className="h-5 w-5 mr-2 text-green-500" />
                      Education
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {candidate.education.map((edu, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <GraduationCap className="h-5 w-5 text-green-500 mt-1" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                            <p className="text-sm text-muted-foreground">{edu.field}</p>
                            <p className="text-sm text-muted-foreground">{edu.institution} • {edu.graduationYear}</p>
                            {edu.gpa && (
                              <p className="text-sm text-muted-foreground">GPA: {edu.gpa}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-6">
                {/* Technical Skills */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-purple-500" />
                      Technical Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {candidate.skills.technical.map((skill, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="text-xs text-muted-foreground">({skill.years} years)</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Progress 
                              value={
                                skill.level === 'expert' ? 100 :
                                skill.level === 'advanced' ? 80 :
                                skill.level === 'intermediate' ? 60 : 40
                              } 
                              className="w-20" 
                            />
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                skill.level === 'expert' ? 'border-orange-200 text-orange-800' :
                                skill.level === 'advanced' ? 'border-orange-300 text-orange-800' :
                                skill.level === 'intermediate' ? 'border-orange-400 text-orange-800' :
                                'border-orange-500 text-orange-800'
                              }`}
                            >
                              {skill.level}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Soft Skills */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-pink-500" />
                      Soft Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.soft.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Certifications */}
                {candidate.skills.certifications.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Award className="h-5 w-5 mr-2 text-yellow-500" />
                        Certifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {candidate.skills.certifications.map((cert, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <Award className="h-5 w-5 text-yellow-500" />
                            <span className="text-sm font-medium">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="documents" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-blue-500" />
                        Documents
                      </CardTitle>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Document
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {candidate.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {doc.type} • {doc.size} • {formatDate(doc.uploadDate)}
                              </p>
                            </div>
                            {doc.aiExtracted && (
                              <Badge variant="outline" className="text-xs">
                                <Zap className="h-3 w-3 mr-1" />
                                AI Processed
                              </Badge>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ai-insights" className="space-y-6">
                {/* AI Matching Score */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="h-5 w-5 mr-2 text-purple-500" />
                      AI Matching Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-2xl font-bold ${getMatchScoreColor(candidate.aiInsights.matchingScore)}`}>
                        {candidate.aiInsights.matchingScore}%
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Overall Match Score</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Job Matches */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2 text-green-500" />
                      Top Job Matches
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {candidate.aiInsights.jobMatches.map((match, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-semibold text-foreground">{match.jobTitle}</h4>
                            <p className="text-sm text-muted-foreground">{match.reasoning}</p>
                          </div>
                          <div className="text-right">
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchScoreColor(match.matchScore)}`}>
                              {match.matchScore}%
                            </div>
                            <Button variant="outline" size="sm" className="mt-2">
                              View Job
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Strengths */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ThumbsUp className="h-5 w-5 mr-2 text-green-500" />
                      Key Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {candidate.aiInsights.strengths.map((strength, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Skill Gaps */}
                {candidate.aiInsights.skillGaps.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                        Skill Development Opportunities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {candidate.aiInsights.skillGaps.map((gap, index) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-foreground">{gap.skill}</h4>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${
                                  gap.importance === 'high' ? 'border-orange-500 text-orange-800' :
                                  gap.importance === 'medium' ? 'border-orange-400 text-orange-800' :
                                  'border-orange-300 text-orange-800'
                                }`}
                              >
                                {gap.importance} priority
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{gap.suggestion}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                {/* Activity Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-blue-500" />
                      Activity Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {candidate.activityHistory.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm text-foreground">{activity.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(activity.timestamp)} • {activity.userName}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Pipeline History */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-green-500" />
                      Pipeline History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {candidate.pipelineHistory.map((pipeline, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-semibold text-foreground">{pipeline.jobTitle}</h4>
                            <p className="text-sm text-muted-foreground capitalize">{pipeline.stage}</p>
                            <p className="text-xs text-muted-foreground">
                              Applied: {formatDate(pipeline.appliedDate)}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                pipeline.status === 'in_progress' ? 'border-orange-300 text-orange-800' :
                                pipeline.status === 'completed' ? 'border-orange-200 text-orange-800' :
                                'border-orange-500 text-orange-800'
                              }`}
                            >
                              {pipeline.status}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">
                              Last: {formatDate(pipeline.lastActivity)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
