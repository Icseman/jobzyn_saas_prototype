import React, { useState, useEffect } from 'react';
import { SiteHeader } from '../site-header';
import { PageTransition } from '@/components/PageTransition';
import { CandidateListTable } from './CandidateListTable';
import { CandidateProfilePreview } from './CandidateProfilePreview';
import { AdvancedFilters } from './AdvancedFilters';
import { ActionsToolbar } from './ActionsToolbar';
import { CandidateProfilePage } from './CandidateProfilePage';
import { CandidatesMapView } from './CandidatesMapView';
import { CandidatesCardsView } from './CandidatesCardsView';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Users, 
  Star, 
  Clock,
  MapPin,
  Briefcase,
  GraduationCap,
  FileText,
  MessageSquare,
  Calendar,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Target,
  Zap
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

interface CandidateData {
  meta: {
    totalCandidates: number;
    lastUpdated: string;
    aiProcessingStatus: string;
    dataQualityScore: number;
  };
  candidates: Candidate[];
  filters: {
    skills: string[];
    locations: string[];
    experienceLevels: string[];
    availability: string[];
    workAuthorization: string[];
    remotePreference: string[];
    tags: string[];
  };
  savedFilters: Array<{
    id: string;
    name: string;
    description: string;
    filters: any;
    createdBy: string;
    createdAt: string;
    isShared: boolean;
  }>;
}

export const CandidateDatabasePage: React.FC = () => {
  const [candidateData, setCandidateData] = useState<CandidateData | null>(null);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showProfilePreview, setShowProfilePreview] = useState(false);
  const [showFullProfile, setShowFullProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<any>({});
  const [viewMode, setViewMode] = useState<'list' | 'cards' | 'map'>('list');
  const [sortBy, setSortBy] = useState<string>('lastActivity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCandidateData();
  }, []);

  useEffect(() => {
    if (candidateData) {
      applyFiltersAndSearch();
    }
  }, [candidateData, searchQuery, activeFilters, sortBy, sortOrder]);

  const loadCandidateData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/src/app/candidates/data.json');
      const data = await response.json();
      setCandidateData(data);
    } catch (error) {
      console.error('Error loading candidate data:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSearch = () => {
    if (!candidateData) return;

    let filtered = [...candidateData.candidates];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(candidate => 
        candidate.personalInfo.firstName.toLowerCase().includes(query) ||
        candidate.personalInfo.lastName.toLowerCase().includes(query) ||
        candidate.personalInfo.email.toLowerCase().includes(query) ||
        candidate.professionalInfo.currentTitle.toLowerCase().includes(query) ||
        candidate.professionalInfo.currentCompany.toLowerCase().includes(query) ||
        candidate.skills.technical.some(skill => skill.name.toLowerCase().includes(query)) ||
        candidate.skills.soft.some(skill => skill.toLowerCase().includes(query))
      );
    }

    // Apply filters
    if (activeFilters.skills && activeFilters.skills.length > 0) {
      filtered = filtered.filter(candidate =>
        activeFilters.skills.some((skill: string) =>
          candidate.skills.technical.some(s => s.name === skill)
        )
      );
    }

    if (activeFilters.location && activeFilters.location.length > 0) {
      filtered = filtered.filter(candidate =>
        activeFilters.location.includes(`${candidate.personalInfo.location.city}, ${candidate.personalInfo.location.state}`) ||
        activeFilters.location.includes('Remote')
      );
    }

    if (activeFilters.experienceMin) {
      filtered = filtered.filter(candidate =>
        candidate.professionalInfo.yearsExperience >= activeFilters.experienceMin
      );
    }

    if (activeFilters.availability && activeFilters.availability.length > 0) {
      filtered = filtered.filter(candidate =>
        activeFilters.availability.includes(candidate.professionalInfo.availability)
      );
    }

    if (activeFilters.tags && activeFilters.tags.length > 0) {
      filtered = filtered.filter(candidate =>
        activeFilters.tags.some((tag: string) =>
          candidate.tags.some(t => t.name === tag)
        )
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'name':
          aValue = `${a.personalInfo.firstName} ${a.personalInfo.lastName}`;
          bValue = `${b.personalInfo.firstName} ${b.personalInfo.lastName}`;
          break;
        case 'experience':
          aValue = a.professionalInfo.yearsExperience;
          bValue = b.professionalInfo.yearsExperience;
          break;
        case 'lastActivity':
          aValue = new Date(a.lastActivity).getTime();
          bValue = new Date(b.lastActivity).getTime();
          break;
        case 'matchingScore':
          aValue = a.aiInsights.matchingScore;
          bValue = b.aiInsights.matchingScore;
          break;
        default:
          aValue = a.lastActivity;
          bValue = b.lastActivity;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredCandidates(filtered);
  };

  const handleCandidateSelect = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowProfilePreview(true);
  };

  const handleViewFullProfile = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowFullProfile(true);
    setShowProfilePreview(false);
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action}`, selectedCandidates);
    // Implement bulk actions
  };

  const handleExport = (format: 'csv' | 'excel') => {
    console.log(`Exporting candidates as ${format}`);
    // Implement export functionality
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

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'immediate':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300';
      case '1_week':
      case '2_weeks':
        return 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary';
      case '1_month':
      case '2_months':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center h-screen px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading candidate database...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!candidateData) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center h-screen px-6">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <p className="text-muted-foreground">Failed to load candidate data</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
        <SiteHeader />
        <PageTransition>
          <main className="flex-1 overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-auto py-6">
                <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="space-y-6">
                  {/* Header */}
                  <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">Candidate Database</h1>
                    <p className="text-muted-foreground mt-1">
                      {candidateData.meta.totalCandidates.toLocaleString()} candidates • 
                      AI Processing: {candidateData.meta.aiProcessingStatus} • 
                      Data Quality: {candidateData.meta.dataQualityScore}%
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    {/* View Switcher */}
                    <div className="flex items-center bg-muted rounded-lg p-1">
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                        className="h-8 px-3"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        List
                      </Button>
                      <Button
                        variant={viewMode === 'cards' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('cards')}
                        className="h-8 px-3"
                      >
                        <Users className="h-4 w-4 mr-1" />
                        Cards
                      </Button>
                      <Button
                        variant={viewMode === 'map' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('map')}
                        className="h-8 px-3"
                      >
                        <MapPin className="h-4 w-4 mr-1" />
                        Map
                      </Button>
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Import
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Candidate
                    </Button>
                  </div>
                </div>

                {/* Search and Filters */}
                <div className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search candidates by name, skills, company, or keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

                  {/* Stats Cards */}
                  <div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center">
                          <Users className="h-8 w-8 text-primary" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-muted-foreground">Total Candidates</p>
                            <p className="text-2xl font-bold text-foreground">
                              {candidateData.meta.totalCandidates.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center">
                          <Star className="h-8 w-8 text-amber-600" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-muted-foreground">Top Talent</p>
                            <p className="text-2xl font-bold text-foreground">
                              {candidateData.candidates.filter(c => 
                                c.tags.some(tag => tag.name === 'Top Talent')
                              ).length}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center">
                          <TrendingUp className="h-8 w-8 text-emerald-600" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-muted-foreground">Avg Match Score</p>
                            <p className="text-2xl font-bold text-foreground">
                              {Math.round(
                                candidateData.candidates.reduce((sum, c) => sum + c.aiInsights.matchingScore, 0) / 
                                candidateData.candidates.length
                              )}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center">
                          <Zap className="h-8 w-8 text-primary" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-muted-foreground">AI Processed</p>
                            <p className="text-2xl font-bold text-foreground">
                              {candidateData.candidates.filter(c => 
                                c.documents.some(doc => doc.aiExtracted)
                              ).length}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

                  {/* Candidate Views */}
                  <div className="h-[calc(100vh-20rem)]">
                    {viewMode === 'list' && (
                      <CandidateListTable
                        candidates={filteredCandidates}
                        selectedCandidates={selectedCandidates}
                        onCandidateSelect={handleCandidateSelect}
                        onSelectionChange={setSelectedCandidates}
                        onViewFullProfile={handleViewFullProfile}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        onSortChange={(field, order) => {
                          setSortBy(field);
                          setSortOrder(order);
                        }}
                      />
                    )}
                    
                    {viewMode === 'cards' && (
                      <CandidatesCardsView
                        candidates={filteredCandidates}
                        onCandidateSelect={handleCandidateSelect}
                        onViewProfile={handleViewFullProfile}
                      />
                    )}
                    
                    {viewMode === 'map' && (
                      <CandidatesMapView
                        candidates={filteredCandidates}
                        onCandidateSelect={handleCandidateSelect}
                        onViewProfile={handleViewFullProfile}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

          {/* Profile Preview Sidebar */}
          {showProfilePreview && selectedCandidate && (
            <CandidateProfilePreview
              candidate={selectedCandidate}
              onClose={() => setShowProfilePreview(false)}
              onViewFullProfile={() => handleViewFullProfile(selectedCandidate)}
            />
          )}
          {/* Full Profile Modal */}
          {showFullProfile && selectedCandidate && (
            <CandidateProfilePage
              candidate={selectedCandidate}
              onClose={() => setShowFullProfile(false)}
            />
          )}
        </PageTransition>
    </div>
  );
};
