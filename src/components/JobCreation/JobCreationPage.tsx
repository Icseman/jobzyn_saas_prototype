import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { SiteHeader } from '@/components/site-header'
import { 
  CheckCircleIcon, 
  CircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  SaveIcon,
  EyeIcon
} from 'lucide-react'
import { JobBasicsCard, JobBasicsData } from './JobBasicsCard'
import { RoleDetailsCard, RoleDetailsData } from './RoleDetailsCard'
import { ApplicationPipelineCard, ApplicationPipelineData } from './ApplicationPipelineCard'
import { SourcingPublishingCard, SourcingPublishingData } from './SourcingPublishingCard'
import { ComplianceFinalizeCard, ComplianceFinalizeData } from './ComplianceFinalizeCard'
import { JobCreationFooter } from './JobCreationFooter'

interface JobCreationData {
  jobBasics: JobBasicsData
  roleDetails: RoleDetailsData
  applicationPipeline: ApplicationPipelineData
  sourcingPublishing: SourcingPublishingData
  complianceFinalize: ComplianceFinalizeData
}

const initialData: JobCreationData = {
  jobBasics: {
    jobTitle: '',
    department: '',
    seniorityLevel: '',
    priority: 'medium',
    numberOfOpenings: 1,
    employmentType: 'full-time',
    workModel: 'hybrid',
    locations: [{ city: '', state: '', country: 'Morocco', remoteOk: false }],
    salaryRange: {
      min: 0,
      max: 0,
      currency: 'MAD',
      payPeriod: 'monthly',
      equity: false,
      bonus: false
    },
    jobOwner: {
      name: '',
      email: '',
      avatar: '',
      initials: ''
    },
    hiringTeam: [],
    visibility: 'public'
  },
  roleDetails: {
    jobDescription: '',
    responsibilities: [''],
    requirements: {
      mustHave: [''],
      niceToHave: ['']
    },
    skillsMatrix: [],
    benefits: [
      { benefit: 'Health Insurance', included: false },
      { benefit: 'Paid Time Off', included: false },
      { benefit: 'Work Visa Sponsorship', included: false },
      { benefit: 'Relocation Assistance', included: false },
      { benefit: 'Professional Development', included: false },
      { benefit: 'Flexible Working Hours', included: false },
      { benefit: 'Remote Work Options', included: false },
      { benefit: 'Company Equipment', included: false },
      { benefit: 'Gym Membership', included: false },
      { benefit: 'Transportation Allowance', included: false }
    ],
    attachments: []
  },
  applicationPipeline: {
    applicationForm: {
      requiredFields: ['name', 'email', 'phone', 'resume'],
      customQuestions: []
    },
    knockoutRules: [],
    consentCheckboxes: [
      { label: 'I consent to the processing of my personal data (GDPR)', required: true, type: 'gdpr' },
      { label: 'I consent to the processing of my personal data (CNDP)', required: true, type: 'cndp' },
      { label: 'I confirm I meet the Equal Employment Opportunity requirements', required: true, type: 'eeo' }
    ],
    pipeline: {
      template: 'default',
      stages: [
        { name: 'Applied', order: 1, owner: '', slaDays: 0, description: 'Initial application received' },
        { name: 'Screening', order: 2, owner: '', slaDays: 3, description: 'Initial candidate screening' },
        { name: 'Interview', order: 3, owner: '', slaDays: 7, description: 'Technical/HR interview' },
        { name: 'Offer', order: 4, owner: '', slaDays: 5, description: 'Job offer extended' },
        { name: 'Hired', order: 5, owner: '', slaDays: 0, description: 'Candidate hired' }
      ]
    },
    automation: {
      autoEmails: [
        { trigger: 'application_received', template: 'Application Confirmation', enabled: true },
        { trigger: 'rejection', template: 'Rejection Email', enabled: true },
        { trigger: 'interview_invite', template: 'Interview Invitation', enabled: true }
      ],
      autoTagging: [],
      autoTasks: []
    }
  },
  sourcingPublishing: {
    sourcingChannels: {
      internalTalentPool: false,
      referralProgram: false,
      resumeImport: false,
      agenciesPartners: false,
      linkedin: true,
      indeed: true,
      googleJobs: true,
      nicheBoards: [],
      chromeExtension: false
    },
    publishing: {
      companyCareersSite: true,
      jobBoards: ['linkedin', 'indeed', 'glassdoor'],
      socialSharing: {
        linkedin: true,
        twitter: false,
        whatsapp: false
      },
      trackingLinks: {
        utmSource: '',
        utmMedium: 'job-posting',
        utmCampaign: ''
      },
      schedulePublish: false,
      publishDate: '',
      publishTime: ''
    },
    customBoards: []
  },
  complianceFinalize: {
    compliance: {
      laborDisclosures: {
        contractType: '',
        payTransparency: false,
        workingHours: '',
        probationPeriod: ''
      },
      gdprConsent: true,
      cndpConsent: true,
      eeoCompliance: true,
      localLaborLaws: []
    },
    approvalChain: [
      { approver: '', role: 'Hiring Manager', email: '', order: 1, status: 'pending', comments: '' },
      { approver: '', role: 'HR Manager', email: '', order: 2, status: 'pending', comments: '' },
      { approver: '', role: 'Finance Director', email: '', order: 3, status: 'pending', comments: '' }
    ],
    preview: {
      publicView: '',
      internalView: ''
    },
    versioning: {
      version: '1.0',
      changeLog: []
    },
    finalActions: {
      saveDraft: false,
      schedulePublish: false,
      publishNow: false
    }
  }
}

const steps = [
  { 
    id: 1, 
    title: 'Job Basics', 
    description: 'Job Basics & Hiring Team',
    slogan: 'Define the foundation of your role'
  },
  { 
    id: 2, 
    title: 'Role Details', 
    description: 'Role Details & Description',
    slogan: 'Craft compelling job descriptions'
  },
  { 
    id: 3, 
    title: 'Application', 
    description: 'Application & Pipeline',
    slogan: 'Set up your hiring process'
  },
  { 
    id: 4, 
    title: 'Sourcing', 
    description: 'Sourcing & Publishing',
    slogan: 'Reach the right candidates'
  },
  { 
    id: 5, 
    title: 'Finalize', 
    description: 'Compliance & Finalize',
    slogan: 'Review and launch your job'
  }
]

export const JobCreationPage: React.FC = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [jobData, setJobData] = useState<JobCreationData>(initialData)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [lastSavedData, setLastSavedData] = useState<JobCreationData>(initialData)

  // Track unsaved changes
  useEffect(() => {
    const hasChanges = JSON.stringify(jobData) !== JSON.stringify(lastSavedData)
    setHasUnsavedChanges(hasChanges)
  }, [jobData, lastSavedData])

  // Auto-save functionality
  useEffect(() => {
    if (hasUnsavedChanges) {
      const autoSaveTimer = setTimeout(() => {
        handleSaveDraft()
      }, 30000) // Auto-save every 30 seconds

      return () => clearTimeout(autoSaveTimer)
    }
  }, [hasUnsavedChanges])

  const updateJobData = (stepData: Partial<JobCreationData>) => {
    setJobData(prev => ({ ...prev, ...stepData }))
  }

  const markStepCompleted = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps(prev => [...prev, step])
    }
  }

  const goToNextStep = () => {
    markStepCompleted(currentStep)
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (step: number) => {
    setCurrentStep(step)
  }

  const handleComplete = () => {
    markStepCompleted(currentStep)
    // Here you would typically save the job and redirect
    console.log('Job creation completed:', jobData)
    alert('Job created successfully!')
    navigate('/jobs')
  }

  const handleSaveDraft = () => {
    // Save to localStorage or send to API
    localStorage.setItem('jobDraft', JSON.stringify(jobData))
    setLastSavedData(jobData)
    setHasUnsavedChanges(false)
    console.log('Draft saved:', jobData)
  }

  const handlePreview = () => {
    // Open preview modal or navigate to preview page
    console.log('Preview job:', jobData)
    alert('Preview functionality would open here')
  }

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm(
        'You have unsaved changes. Are you sure you want to cancel? All changes will be lost.'
      )
      if (!confirmed) return
    }
    navigate('/jobs')
  }

  const progressPercentage = (currentStep / steps.length) * 100

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <JobBasicsCard
            data={jobData.jobBasics}
            onChange={(data) => updateJobData({ jobBasics: data })}
            onNext={goToNextStep}
          />
        )
      case 2:
        return (
          <RoleDetailsCard
            data={jobData.roleDetails}
            onChange={(data) => updateJobData({ roleDetails: data })}
            onNext={goToNextStep}
            onPrevious={goToPreviousStep}
          />
        )
      case 3:
        return (
          <ApplicationPipelineCard
            data={jobData.applicationPipeline}
            onChange={(data) => updateJobData({ applicationPipeline: data })}
            onNext={goToNextStep}
            onPrevious={goToPreviousStep}
          />
        )
      case 4:
        return (
          <SourcingPublishingCard
            data={jobData.sourcingPublishing}
            onChange={(data) => updateJobData({ sourcingPublishing: data })}
            onNext={goToNextStep}
            onPrevious={goToPreviousStep}
          />
        )
      case 5:
        return (
          <ComplianceFinalizeCard
            data={jobData.complianceFinalize}
            onChange={(data) => updateJobData({ complianceFinalize: data })}
            onComplete={handleComplete}
            onPrevious={goToPreviousStep}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="flex-1">
          <div className="h-full flex flex-col">
            <div className="flex-1 py-6">
              <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-6">
                <div className="flex min-h-[calc(100vh-8rem)] bg-background">
                  <div className="flex-1 flex flex-col min-h-0 pb-20"> {/* Added pb-20 for footer space */}
                    {/* Header */}
                    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                      <div className="container mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h1 className="text-2xl font-bold">Create New Job</h1>
                            <p className="text-sm text-muted-foreground">
                              Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={handleSaveDraft}>
                              <SaveIcon className="h-4 w-4 mr-2" />
                              Save Draft
                            </Button>
                            <Button variant="outline" size="sm" onClick={handlePreview}>
                              <EyeIcon className="h-4 w-4 mr-2" />
                              Preview
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="border-b bg-muted/50">
                      <div className="container mx-auto px-6 py-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}% Complete</span>
                          </div>
                          <Progress value={progressPercentage} className="h-2" />
                        </div>
                      </div>
                    </div>

                    {/* Step Navigation */}
                    <div className="border-b bg-background">
                      <div className="container mx-auto px-6 py-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">Job Creation Steps</h3>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <CheckCircleIcon className="h-3 w-3" />
                            {completedSteps.length} of {steps.length} completed
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                          {steps.map((step, index) => (
                            <Card 
                              key={step.id} 
                              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                                currentStep === step.id
                                  ? 'ring-2 ring-primary bg-primary/5'
                                  : completedSteps.includes(step.id)
                                  ? 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800'
                                  : 'hover:bg-muted/50'
                              }`}
                              onClick={() => goToStep(step.id)}
                            >
                              <CardContent className="p-4">
                                <div className="flex flex-col items-center text-center gap-2">
                                  <div className="flex items-center gap-2 mb-1">
                                    {completedSteps.includes(step.id) ? (
                                      <CheckCircleIcon className="h-5 w-5 text-emerald-600" />
                                    ) : (
                                      <CircleIcon className={`h-5 w-5 ${
                                        currentStep === step.id ? 'text-primary' : 'text-muted-foreground'
                                      }`} />
                                    )}
                                    <h4 className={`font-medium text-sm ${
                                      currentStep === step.id ? 'text-primary' : 'text-foreground'
                                    }`}>
                                      {step.title}
                                    </h4>
                                  </div>
                                  <p className="text-xs text-muted-foreground">
                                    {step.slogan}
                                  </p>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="container mx-auto px-6 py-8 flex-1">
                      <div className="max-w-6xl mx-auto">
                        {renderCurrentStep()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sticky Footer */}
                <JobCreationFooter
                  hasUnsavedChanges={hasUnsavedChanges}
                  currentStep={currentStep}
                  totalSteps={steps.length}
                  onSaveDraft={handleSaveDraft}
                  onPreview={handlePreview}
                  onCancel={handleCancel}
                  onPrevious={currentStep > 1 ? goToPreviousStep : undefined}
                  onNext={currentStep < steps.length ? goToNextStep : undefined}
                  isNextDisabled={currentStep === steps.length}
                  isPreviousDisabled={currentStep === 1}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
