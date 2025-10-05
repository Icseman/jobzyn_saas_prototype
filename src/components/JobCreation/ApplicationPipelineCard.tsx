import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { 
  PlusIcon,
  TrashIcon,
  AlertCircleIcon,
  SmartphoneIcon,
  MonitorIcon,
  GripVerticalIcon,
  SaveIcon,
  CopyIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UploadIcon,
  UserIcon,
  BriefcaseIcon,
  FileTextIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-react'

interface ApplicationPipelineCardProps {
  data: ApplicationPipelineData
  onChange: (data: ApplicationPipelineData) => void
  onNext: () => void
  onPrevious: () => void
}

interface ApplicationPipelineData {
  applicationForm: {
    steps: Array<{
      id: string
      title: string
      description: string
      order: number
      enabled: boolean
      fields: Array<{
        id: string
        label: string
        type: 'text' | 'email' | 'tel' | 'url' | 'textarea' | 'select' | 'file' | 'checkbox'
        required: boolean
      enabled: boolean
        placeholder: string
        options?: string[]
    }>
    }>
  }
}

const initialData: ApplicationPipelineData = {
  applicationForm: {
    steps: [
      {
        id: 'personal',
        title: 'Personal Information',
        description: 'Basic contact and personal details',
        order: 1,
        enabled: true,
        fields: [
          {
            id: 'first-name',
            label: 'First Name',
            type: 'text',
            required: true,
            enabled: true,
            placeholder: 'Enter your first name'
          },
          {
            id: 'last-name',
            label: 'Last Name',
            type: 'text',
            required: true,
            enabled: true,
            placeholder: 'Enter your last name'
          },
          {
            id: 'email',
            label: 'Email Address',
            type: 'email',
            required: true,
            enabled: true,
            placeholder: 'your.email@example.com'
          },
          {
            id: 'phone',
            label: 'Phone Number',
            type: 'tel',
            required: true,
            enabled: true,
            placeholder: '+212 6XX XXX XXX'
          },
          {
            id: 'location',
            label: 'Current Location',
            type: 'text',
            required: false,
            enabled: true,
            placeholder: 'City, Country'
          },
          {
            id: 'linkedin',
            label: 'LinkedIn Profile',
            type: 'url',
            required: false,
            enabled: true,
            placeholder: 'https://linkedin.com/in/yourprofile'
          },
          {
            id: 'portfolio',
            label: 'Portfolio Website',
            type: 'url',
            required: false,
            enabled: true,
            placeholder: 'https://yourportfolio.com'
          }
        ]
      },
      {
        id: 'professional',
        title: 'Professional Information',
        description: 'Work experience and qualifications',
        order: 2,
        enabled: true,
        fields: [
          {
            id: 'position',
            label: 'Current Position',
            type: 'text',
            required: true,
            enabled: true,
            placeholder: 'e.g., Senior Developer'
          },
          {
            id: 'company',
            label: 'Current Company',
            type: 'text',
            required: false,
            enabled: true,
            placeholder: 'e.g., Tech Corp'
          },
          {
            id: 'experience',
            label: 'Years of Experience',
            type: 'select',
            required: true,
            enabled: true,
            placeholder: 'Select experience level',
            options: ['0-1 years', '2-3 years', '4-5 years', '6-8 years', '9-12 years', '13+ years']
          },
          {
            id: 'education',
            label: 'Education Level',
            type: 'select',
            required: true,
            enabled: true,
            placeholder: 'Select education level',
            options: ['High School', 'Associate Degree', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD', 'Other']
          },
          {
            id: 'skills',
            label: 'Key Skills',
            type: 'textarea',
            required: false,
            enabled: true,
            placeholder: 'React, TypeScript, Node.js, etc.'
          },
          {
            id: 'availability',
            label: 'Availability',
            type: 'select',
            required: false,
            enabled: true,
            placeholder: 'Select availability',
            options: ['Immediately', '2 weeks', '1 month', '2 months', '3+ months']
          },
          {
            id: 'notice',
            label: 'Notice Period',
            type: 'select',
            required: false,
            enabled: true,
            placeholder: 'Select notice period',
            options: ['No notice required', '2 weeks', '1 month', '2 months', '3 months']
          }
        ]
      },
      {
        id: 'documents',
        title: 'Documents & Cover Letter',
        description: 'Resume, portfolio, and cover letter',
        order: 3,
        enabled: true,
        fields: [
          {
            id: 'cover-letter',
            label: 'Cover Letter',
            type: 'textarea',
            required: true,
            enabled: true,
            placeholder: 'Tell us why you\'re interested in this position...'
          },
          {
            id: 'resume',
            label: 'Resume/CV',
            type: 'file',
            required: true,
            enabled: true,
            placeholder: 'Upload your resume (PDF, DOC, DOCX)'
          },
          {
            id: 'portfolio-file',
            label: 'Portfolio (Optional)',
            type: 'file',
            required: false,
            enabled: true,
            placeholder: 'Upload your portfolio (PDF, ZIP)'
          },
          {
            id: 'salary',
            label: 'Salary Expectation',
            type: 'text',
            required: false,
            enabled: true,
            placeholder: 'e.g., 45,000 - 60,000 MAD'
          },
          {
            id: 'source',
            label: 'How did you hear about this position?',
            type: 'select',
            required: false,
            enabled: true,
            placeholder: 'Select source',
            options: ['LinkedIn', 'Company Website', 'Job Board', 'Employee Referral', 'Recruiter', 'Other']
          },
          {
            id: 'additional',
            label: 'Additional Information',
            type: 'textarea',
            required: false,
            enabled: true,
            placeholder: 'Any additional information you\'d like to share...'
          }
        ]
      },
      {
        id: 'review',
        title: 'Review & Submit',
        description: 'Review your application and agree to terms',
        order: 4,
        enabled: true,
        fields: [
          {
            id: 'terms',
            label: 'I agree to the Terms of Service and Privacy Policy',
            type: 'checkbox',
            required: true,
            enabled: true,
            placeholder: ''
          },
          {
            id: 'consent',
            label: 'I consent to the processing of my personal data for recruitment purposes',
            type: 'checkbox',
            required: true,
            enabled: true,
            placeholder: ''
          }
        ]
      }
    ]
  }
}

// Live Responsive Application Form Preview Component - Matching Careers Page Design
const ApplicationFormPreview: React.FC<{
  steps: ApplicationPipelineData['applicationForm']['steps']
  viewport: 'mobile' | 'desktop'
  currentStep?: number
  onStepChange?: (step: number) => void
}> = ({ steps, viewport, currentStep = 0, onStepChange }) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const enabledSteps = steps.filter(step => step.enabled)
  const currentStepData = enabledSteps[currentStep]
  
  if (!currentStepData) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <AlertCircleIcon className="h-8 w-8 mx-auto mb-2" />
          <p>No application steps enabled</p>
        </div>
      </div>
    )
  }

  const progress = ((currentStep + 1) / enabledSteps.length) * 100

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    alert('Application submitted successfully!')
  }

  return (
    <div className={`${viewport === 'mobile' ? 'p-3' : 'p-4'} bg-gray-50 dark:bg-gray-900 min-h-screen sm:min-h-0`}>
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar - Matching Careers Page */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Application Progress</h2>
              <span className="text-sm text-gray-600 dark:text-gray-400">Step {currentStep + 1} of {enabledSteps.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Current Step Card - Matching Careers Page Design */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              {currentStep === 0 && <UserIcon className="h-5 w-5" />}
              {currentStep === 1 && <BriefcaseIcon className="h-5 w-5" />}
              {currentStep === 2 && <FileTextIcon className="h-5 w-5" />}
              {currentStep === 3 && <CheckCircleIcon className="h-5 w-5" />}
              {currentStepData.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Render fields based on current step */}
            {currentStepData.fields.filter(field => field.enabled).map((field) => (
              <div key={field.id} className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                
                {field.type === 'textarea' ? (
                  <Textarea
                    placeholder={field.placeholder}
                    rows={6}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    className="w-full"
                  />
                ) : field.type === 'select' ? (
                  <Select value={formData[field.id] || ''} onValueChange={(value) => handleFieldChange(field.id, value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option, index) => (
                        <SelectItem key={index} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : field.type === 'file' ? (
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <UploadIcon className="h-8 w-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {formData[field.id] ? formData[field.id].name : field.placeholder}
                    </p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>
                ) : field.type === 'checkbox' ? (
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      id={field.id} 
                      checked={formData[field.id] || false}
                      onCheckedChange={(checked) => handleFieldChange(field.id, checked)}
                    />
                    <Label htmlFor={field.id} className="text-sm text-gray-700 dark:text-gray-300">
                      {field.label}
                    </Label>
                  </div>
                ) : (
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    className="w-full"
                  />
                )}
              </div>
            ))}

            {/* Special handling for grid layouts in specific steps */}
            {currentStep === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Personal info fields in grid */}
              </div>
            )}
            
            {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Professional info fields in grid */}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation - Matching Careers Page */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => onStepChange?.(currentStep - 1)}
            disabled={currentStep === 0}
          >
            Previous
          </Button>

          {currentStep < enabledSteps.length - 1 ? (
            <Button
              onClick={() => onStepChange?.(currentStep + 1)}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export const ApplicationPipelineCard: React.FC<ApplicationPipelineCardProps> = ({ data, onChange, onNext, onPrevious }) => {
  const [localData, setLocalData] = useState<ApplicationPipelineData>(() => {
    const mergedData = { ...initialData, ...data }
    // Ensure steps are always present
    if (!mergedData.applicationForm.steps || mergedData.applicationForm.steps.length === 0) {
      mergedData.applicationForm.steps = initialData.applicationForm.steps
    }
    return mergedData
  })
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    'personal': true,
    'professional': true,
    'documents': true,
    'review': true
  })
  const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop'>('mobile')
  const [currentPreviewStep, setCurrentPreviewStep] = useState(0)

  // Ensure data is properly initialized
  useEffect(() => {
    if (!localData.applicationForm.steps || localData.applicationForm.steps.length === 0) {
      const updatedData = {
        ...localData,
        applicationForm: {
          ...localData.applicationForm,
          steps: initialData.applicationForm.steps
        }
      }
      setLocalData(updatedData)
      onChange(updatedData)
    }
  }, [])

  const updateData = (updates: Partial<ApplicationPipelineData>) => {
    const newData = { ...localData, ...updates }
    setLocalData(newData)
    onChange(newData)
  }

  const updateStep = (stepId: string, updates: Partial<ApplicationPipelineData['applicationForm']['steps'][0]>) => {
    const newSteps = localData.applicationForm.steps.map(step => 
      step.id === stepId ? { ...step, ...updates } : step
    )
    updateData({
      applicationForm: {
        ...localData.applicationForm,
        steps: newSteps
      }
    })
  }

  const updateStepField = (stepId: string, fieldId: string, updates: Partial<ApplicationPipelineData['applicationForm']['steps'][0]['fields'][0]>) => {
    const newSteps = localData.applicationForm.steps.map(step => {
      if (step.id === stepId) {
        return {
          ...step,
          fields: step.fields.map(field => 
            field.id === fieldId ? { ...field, ...updates } : field
          )
        }
      }
      return step
    })
    updateData({
      applicationForm: {
        ...localData.applicationForm,
        steps: newSteps
      }
    })
  }

  const addStepField = (stepId: string) => {
    const newSteps = localData.applicationForm.steps.map(step => {
      if (step.id === stepId) {
        return {
          ...step,
          fields: [...step.fields, {
            id: `field_${Date.now()}`,
            label: 'New Field',
            type: 'text' as const,
            required: false,
            enabled: true,
            placeholder: 'Enter value'
          }]
        }
      }
      return step
    })
    updateData({
      applicationForm: {
        ...localData.applicationForm,
        steps: newSteps
      }
    })
  }

  const removeStepField = (stepId: string, fieldId: string) => {
    const newSteps = localData.applicationForm.steps.map(step => {
      if (step.id === stepId) {
        return {
          ...step,
          fields: step.fields.filter(field => field.id !== fieldId)
        }
      }
      return step
    })
    updateData({
      applicationForm: {
        ...localData.applicationForm,
        steps: newSteps
      }
    })
  }

  const isFormValid = () => {
    return (localData.applicationForm.steps || []).some(step => step.enabled)
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const setFieldStatus = (stepId: string, fieldId: string, status: 'mandatory' | 'optional' | 'off') => {
    const updates = {
      required: status === 'mandatory',
      enabled: status !== 'off'
    }
    updateStepField(stepId, fieldId, updates)
  }

  const getFieldStatus = (field: any) => {
    if (!field.enabled) return 'off'
    return field.required ? 'mandatory' : 'optional'
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">CUSTOMIZE YOUR APPLICATION FORM</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Configure the fields and requirements for your job application
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <SaveIcon className="h-4 w-4 mr-2" />
              Save Template
            </Button>
            <Button variant="outline" size="sm">
              <CopyIcon className="h-4 w-4 mr-2" />
              Duplicate
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content - Responsive */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Left Panel - Form Configuration */}
        <div className="space-y-4 sm:space-y-6">
          {/* Form Sections */}
          {(localData.applicationForm.steps || [])
            .sort((a, b) => a.order - b.order)
            .map((step, _index) => {
              const sectionId = step.id.toLowerCase().replace(/\s+/g, '-')
              const isExpanded = expandedSections[sectionId]
              
              return (
                <Card key={step.id} className="border border-gray-200 dark:border-gray-700">
                  <CardHeader 
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => toggleSection(sectionId)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {isExpanded ? (
                            <ChevronUpIcon className="h-4 w-4 text-gray-500" />
                          ) : (
                            <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                          )}
                          <Badge variant="outline" className="text-xs">
                            {step.order}
          </Badge>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={step.enabled}
                          onCheckedChange={(checked) => updateStep(step.id, { enabled: !!checked })}
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Enabled</span>
                      </div>
        </div>
      </CardHeader>
      
                  {isExpanded && (
                    <CardContent className="pt-0">
        <div className="space-y-4">
                        {/* Step Configuration */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Step Title</Label>
                            <Input
                              value={step.title}
                              onChange={(e) => updateStep(step.id, { title: e.target.value })}
                              placeholder="Step title"
                              className="mt-1"
                            />
                </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</Label>
                            <Input
                              value={step.description}
                              onChange={(e) => updateStep(step.id, { description: e.target.value })}
                              placeholder="Step description"
                              className="mt-1"
                            />
            </div>
          </div>

                        {/* Fields */}
                        <div className="space-y-3">
            <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Fields ({step.fields.length})
                            </Label>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => addStepField(step.id)}
                            >
                <PlusIcon className="h-4 w-4 mr-2" />
                              Add Field
              </Button>
            </div>
            
                          <div className="space-y-3">
                            {step.fields.map((field, _fieldIndex) => {
                              const fieldStatus = getFieldStatus(field)
                              
                              return (
                                <div key={field.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <GripVerticalIcon className="h-4 w-4 text-gray-400 cursor-move" />
                                      <span className="font-medium text-gray-900 dark:text-white">{field.label}</span>
                                    </div>
                                    <div className="flex gap-1">
                                      <Button
                                        variant={fieldStatus === 'mandatory' ? 'default' : 'outline'}
                                        size="sm"
                                        className={`text-xs px-2 py-1 h-6 ${
                                          fieldStatus === 'mandatory' 
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                            : 'text-blue-600 hover:text-blue-700'
                                        }`}
                                        onClick={() => setFieldStatus(step.id, field.id, 'mandatory')}
                                      >
                                        Mandatory
                                      </Button>
                                      <Button
                                        variant={fieldStatus === 'optional' ? 'default' : 'outline'}
                                        size="sm"
                                        className={`text-xs px-2 py-1 h-6 ${
                                          fieldStatus === 'optional' 
                                            ? 'bg-green-600 hover:bg-green-700 text-white' 
                                            : 'text-green-600 hover:text-green-700'
                                        }`}
                                        onClick={() => setFieldStatus(step.id, field.id, 'optional')}
                                      >
                                        Optional
                                      </Button>
                                      <Button
                                        variant={fieldStatus === 'off' ? 'default' : 'outline'}
                                        size="sm"
                                        className={`text-xs px-2 py-1 h-6 ${
                                          fieldStatus === 'off' 
                                            ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                                            : 'text-gray-600 hover:text-gray-700'
                                        }`}
                                        onClick={() => setFieldStatus(step.id, field.id, 'off')}
                                      >
                                        Off
                                      </Button>
                                    </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                      <Label className="text-sm text-gray-600 dark:text-gray-400">Field Label</Label>
                  <Input
                                        value={field.label}
                                        onChange={(e) => updateStepField(step.id, field.id, { label: e.target.value })}
                                        placeholder="Field label"
                                        className="mt-1"
                                      />
                                    </div>
                                    <div>
                                      <Label className="text-sm text-gray-600 dark:text-gray-400">Field Type</Label>
                                      <Select
                                        value={field.type}
                                        onValueChange={(value) => updateStepField(step.id, field.id, { type: value as any })}
                                      >
                                        <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                                          <SelectItem value="email">Email</SelectItem>
                                          <SelectItem value="tel">Phone</SelectItem>
                                          <SelectItem value="url">URL</SelectItem>
                                          <SelectItem value="textarea">Textarea</SelectItem>
                                          <SelectItem value="select">Select</SelectItem>
                      <SelectItem value="file">File Upload</SelectItem>
                                          <SelectItem value="checkbox">Checkbox</SelectItem>
                    </SelectContent>
                  </Select>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <Label className="text-sm text-gray-600 dark:text-gray-400">Placeholder</Label>
                                    <Input
                                      value={field.placeholder}
                                      onChange={(e) => updateStepField(step.id, field.id, { placeholder: e.target.value })}
                                      placeholder="Field placeholder"
                                      className="mt-1"
                                    />
                                  </div>
                                  
                                  {field.type === 'select' && (
                                    <div>
                                      <Label className="text-sm text-gray-600 dark:text-gray-400">Options (one per line)</Label>
                                      <Textarea
                                        value={field.options?.join('\n') || ''}
                                        onChange={(e) => updateStepField(step.id, field.id, { 
                                          options: e.target.value.split('\n').filter(opt => opt.trim()) 
                                        })}
                                        placeholder="Option 1&#10;Option 2&#10;Option 3"
                                        rows={3}
                                        className="mt-1"
                                      />
                  </div>
                                  )}
                                  
                                  <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                                      onClick={() => removeStepField(step.id, field.id)}
                                      className="text-red-600 hover:text-red-700"
                  >
                                      <TrashIcon className="h-4 w-4 mr-2" />
                                      Remove Field
                  </Button>
                </div>
                                </div>
                              )
                            })}
                  </div>
              </div>
          </div>
                    </CardContent>
                  )}
                </Card>
              )
            })}
        </div>

        {/* Right Panel - Live Preview - Responsive */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Live Preview</h3>
            <div className="flex gap-2">
              <Button
                variant={previewMode === 'mobile' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewMode('mobile')}
                className="h-8 px-2 sm:px-3 text-xs sm:text-sm"
              >
                <SmartphoneIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span className="hidden sm:inline">Mobile</span>
                <span className="sm:hidden">Mob</span>
            </Button>
              <Button
                variant={previewMode === 'desktop' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewMode('desktop')}
                className="h-8 px-2 sm:px-3 text-xs sm:text-sm"
              >
                <MonitorIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span className="hidden sm:inline">Desktop</span>
                <span className="sm:hidden">Desk</span>
              </Button>
            </div>
          </div>
          
          {/* Responsive Preview Frame */}
          <div className="relative">
            {previewMode === 'mobile' ? (
              <div className="mx-auto w-72 sm:w-80 h-[500px] sm:h-[600px] bg-gray-900 dark:bg-gray-800 rounded-[1.5rem] sm:rounded-[2rem] p-1.5 sm:p-2 shadow-xl sm:shadow-2xl transition-all duration-300">
                <div className="w-full h-full bg-white dark:bg-gray-900 rounded-[1rem] sm:rounded-[1.5rem] overflow-hidden">
                  <ApplicationFormPreview 
                    steps={localData.applicationForm.steps} 
                    viewport="mobile" 
                    currentStep={currentPreviewStep}
                    onStepChange={setCurrentPreviewStep}
                  />
                </div>
                </div>
            ) : (
              <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-sm transition-all duration-300">
                <ApplicationFormPreview 
                  steps={localData.applicationForm.steps} 
                  viewport="desktop" 
                  currentStep={currentPreviewStep}
                  onStepChange={setCurrentPreviewStep}
                />
              </div>
            )}
          </div>
        </div>
            </div>
            
      {/* Bottom Actions */}
      <div className="mt-8 flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="outline" onClick={onPrevious}>
            <ChevronLeftIcon className="h-4 w-4 mr-2" />
            Previous: Role Details
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            Save Draft
          </Button>
          <Button 
            onClick={onNext} 
            disabled={!isFormValid()}
            className="min-w-32"
          >
            Next: Sourcing & Publishing
            <ChevronRightIcon className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}