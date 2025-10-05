import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeftIcon,
  MapPinIcon,
  ClockIcon,
  UsersIcon,
  DollarSignIcon,
  BriefcaseIcon,
  CalendarIcon,
  StarIcon,
  HeartIcon,
  ShareIcon,
  BuildingIcon,
  GlobeIcon,
  PhoneIcon,
  MailIcon,
  LinkedinIcon,
  CheckCircleIcon,
  ExternalLinkIcon
} from 'lucide-react'
import { careersData } from '../../app/careers/data'
import { JobApplicationForm } from './JobApplicationForm'

interface JobDetail {
  id: string
  title: string
  department: string
  location: string
  snippet: string
  featured: boolean
  image: string
  // Extended job details
  description: string
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
  salaryRange: string
  employmentType: string
  experienceLevel: string
  postedDate: string
  applicationDeadline: string
  company: {
    name: string
    logo: string
    website: string
    description: string
    size: string
    industry: string
  }
  hiringManager: {
    name: string
    title: string
    avatar: string
    email: string
  }
}

// Mock detailed job data - in production this would come from an API
const mockJobDetails: Record<string, JobDetail> = {
  'job-101': {
    id: 'job-101',
    title: 'Senior UX Designer',
    department: 'Design',
    location: 'Casablanca',
    snippet: 'Lead design initiatives and create amazing user experiences',
    featured: true,
    image: 'job1.jpg',
    description: 'We are looking for a Senior UX Designer to join our growing design team. You will be responsible for leading design initiatives, conducting user research, and creating intuitive user experiences that delight our customers.',
    requirements: [
      '5+ years of UX design experience',
      'Proficiency in Figma, Sketch, or Adobe XD',
      'Strong portfolio demonstrating user-centered design',
      'Experience with user research and usability testing',
      'Knowledge of design systems and component libraries',
      'Excellent communication and collaboration skills',
      'Bachelor\'s degree in Design, HCI, or related field'
    ],
    responsibilities: [
      'Lead design projects from concept to completion',
      'Conduct user research and usability testing',
      'Create wireframes, prototypes, and high-fidelity designs',
      'Collaborate with product managers and developers',
      'Maintain and evolve our design system',
      'Mentor junior designers',
      'Present design solutions to stakeholders'
    ],
    benefits: [
      'Competitive salary and equity package',
      'Comprehensive health insurance',
      'Flexible working hours',
      'Professional development budget',
      'Modern office with great amenities',
      'Team building activities',
      'Annual company retreat'
    ],
    salaryRange: '45,000 - 65,000 MAD',
    employmentType: 'Full-time',
    experienceLevel: 'Senior',
    postedDate: '2024-01-15',
    applicationDeadline: '2024-02-15',
    company: {
      name: 'Jobzyn',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
      website: 'https://jobzyn.com',
      description: 'Jobzyn is a leading recruitment platform connecting talented professionals with amazing opportunities.',
      size: '50-100 employees',
      industry: 'Technology'
    },
    hiringManager: {
      name: 'Sarah Alami',
      title: 'Head of Design',
      avatar: '/avatars/sarah.jpg',
      email: 'sarah.alami@jobzyn.com'
    }
  },
  'job-102': {
    id: 'job-102',
    title: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    snippet: 'Build scalable applications with modern technologies',
    featured: false,
    image: 'job2.jpg',
    description: 'Join our engineering team as a Full Stack Developer and help us build the next generation of recruitment technology. You will work on both frontend and backend systems using modern technologies.',
    requirements: [
      '3+ years of full-stack development experience',
      'Proficiency in React, Node.js, and TypeScript',
      'Experience with databases (PostgreSQL, MongoDB)',
      'Knowledge of cloud platforms (AWS, Azure)',
      'Experience with CI/CD pipelines',
      'Strong problem-solving skills',
      'Bachelor\'s degree in Computer Science or related field'
    ],
    responsibilities: [
      'Develop and maintain web applications',
      'Write clean, maintainable code',
      'Collaborate with cross-functional teams',
      'Participate in code reviews',
      'Optimize application performance',
      'Implement security best practices',
      'Mentor junior developers'
    ],
    benefits: [
      'Remote-first culture',
      'Competitive salary and stock options',
      'Health and dental insurance',
      'Learning and development budget',
      'Flexible PTO policy',
      'Home office setup allowance',
      'Annual team meetups'
    ],
    salaryRange: '40,000 - 55,000 MAD',
    employmentType: 'Full-time',
    experienceLevel: 'Mid',
    postedDate: '2024-01-20',
    applicationDeadline: '2024-02-20',
    company: {
      name: 'Jobzyn',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
      website: 'https://jobzyn.com',
      description: 'Jobzyn is a leading recruitment platform connecting talented professionals with amazing opportunities.',
      size: '50-100 employees',
      industry: 'Technology'
    },
    hiringManager: {
      name: 'Ahmed Benali',
      title: 'Engineering Manager',
      avatar: '/avatars/ahmed.jpg',
      email: 'ahmed.benali@jobzyn.com'
    }
  },
  'job-103': {
    id: 'job-103',
    title: 'Product Manager',
    department: 'Product',
    location: 'Casablanca',
    snippet: 'Drive product strategy and work with cross-functional teams',
    featured: true,
    image: 'job3.jpg',
    description: 'We are seeking a Product Manager to lead our product strategy and work closely with engineering, design, and business teams to deliver exceptional products.',
    requirements: [
      '4+ years of product management experience',
      'Experience in B2B SaaS products',
      'Strong analytical and problem-solving skills',
      'Experience with agile development methodologies',
      'Excellent communication and leadership skills',
      'Technical background preferred',
      'MBA or relevant degree preferred'
    ],
    responsibilities: [
      'Define product strategy and roadmap',
      'Work with stakeholders to gather requirements',
      'Prioritize features and manage backlog',
      'Collaborate with engineering and design teams',
      'Analyze user feedback and metrics',
      'Present product updates to leadership',
      'Manage product launches and releases'
    ],
    benefits: [
      'Competitive salary and equity',
      'Comprehensive benefits package',
      'Professional development opportunities',
      'Flexible work arrangements',
      'Modern office environment',
      'Team collaboration tools',
      'Career growth opportunities'
    ],
    salaryRange: '50,000 - 70,000 MAD',
    employmentType: 'Full-time',
    experienceLevel: 'Senior',
    postedDate: '2024-01-18',
    applicationDeadline: '2024-02-18',
    company: {
      name: 'Jobzyn',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
      website: 'https://jobzyn.com',
      description: 'Jobzyn is a leading recruitment platform connecting talented professionals with amazing opportunities.',
      size: '50-100 employees',
      industry: 'Technology'
    },
    hiringManager: {
      name: 'Fatima Zahra',
      title: 'VP of Product',
      avatar: '/avatars/fatima.jpg',
      email: 'fatima.zahra@jobzyn.com'
    }
  }
}

export const JobDetailPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>()
  const navigate = useNavigate()
  const [isLiked, setIsLiked] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const job = jobId ? mockJobDetails[jobId] : null

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
            <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/careers')} className="w-full">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Careers
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: job.snippet,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      // You could show a toast notification here
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/careers')}
                className="flex items-center gap-2"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Back to Careers
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <img 
                src="/src/Assets/jobsyn_recruitment.svg" 
                alt="Jobzyn Logo" 
                className="h-8 w-auto"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLike}
                className={isLiked ? 'text-red-500 border-red-500' : ''}
              >
                <HeartIcon className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
              >
                <ShareIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Job Header */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="secondary" className="text-sm">
                    {job.department}
                  </Badge>
                  {job.featured && (
                    <Badge variant="default" className="text-sm bg-primary">
                      <StarIcon className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {job.title}
                </h1>
                
                <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <BriefcaseIcon className="h-4 w-4" />
                    {job.employmentType}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSignIcon className="h-4 w-4" />
                    {job.salaryRange}
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    Posted {formatDate(job.postedDate)}
                  </div>
                </div>
                
                <p className="text-lg text-gray-700">
                  {job.snippet}
                </p>
              </div>
              
              <div className="ml-6">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src={job.company.logo} 
                    alt={`${job.company.name} logo`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.nextElementSibling.style.display = 'flex'
                    }}
                  />
                  <div className="w-full h-full flex items-center justify-center" style={{ display: job.company.logo ? 'none' : 'flex' }}>
                    <BuildingIcon className="h-8 w-8 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="overview">Job Overview</TabsTrigger>
              <TabsTrigger value="application">Apply Now</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Job Description */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Job Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">
                        {job.description}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Responsibilities */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Responsibilities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {job.responsibilities.map((responsibility, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircleIcon className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Requirements */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {job.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircleIcon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Benefits */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Benefits & Perks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {job.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircleIcon className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Company Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle>About {job.company.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                          <img 
                            src={job.company.logo} 
                            alt={`${job.company.name} logo`}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                              e.currentTarget.nextElementSibling.style.display = 'flex'
                            }}
                          />
                          <div className="w-full h-full flex items-center justify-center" style={{ display: job.company.logo ? 'none' : 'flex' }}>
                            <BuildingIcon className="h-6 w-6 text-gray-400" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold">{job.company.name}</h3>
                          <p className="text-sm text-gray-600">{job.company.size}</p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700">
                        {job.company.description}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <GlobeIcon className="h-4 w-4 text-gray-500" />
                        <a 
                          href={job.company.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline flex items-center gap-1"
                        >
                          Visit Website
                          <ExternalLinkIcon className="h-3 w-3" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Hiring Manager */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Hiring Manager</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                          <img 
                            src={job.hiringManager.avatar} 
                            alt={job.hiringManager.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                              e.currentTarget.nextElementSibling.style.display = 'flex'
                            }}
                          />
                          <div className="w-full h-full flex items-center justify-center" style={{ display: job.hiringManager.avatar ? 'none' : 'flex' }}>
                            <UsersIcon className="h-6 w-6 text-gray-400" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold">{job.hiringManager.name}</h3>
                          <p className="text-sm text-gray-600">{job.hiringManager.title}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MailIcon className="h-4 w-4 text-gray-500" />
                        <a 
                          href={`mailto:${job.hiringManager.email}`}
                          className="text-sm text-primary hover:underline"
                        >
                          {job.hiringManager.email}
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Job Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Job Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Experience Level</span>
                        <span className="text-sm font-medium">{job.experienceLevel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Employment Type</span>
                        <span className="text-sm font-medium">{job.employmentType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Salary Range</span>
                        <span className="text-sm font-medium">{job.salaryRange}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Application Deadline</span>
                        <span className="text-sm font-medium">{formatDate(job.applicationDeadline)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Apply Button */}
                  <Button 
                    size="lg" 
                    className="w-full"
                    onClick={() => setActiveTab('application')}
                  >
                    Apply for this Position
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="application">
              <JobApplicationForm job={job} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
