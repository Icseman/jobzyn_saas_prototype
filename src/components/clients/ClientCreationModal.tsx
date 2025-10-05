import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Check, Building2, User, Settings } from "lucide-react"
import { Client } from './ClientsPage'

interface ClientCreationModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateClient: (client: Omit<Client, 'id'>) => void
}

export const ClientCreationModal = ({ isOpen, onClose, onCreateClient }: ClientCreationModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    industry: '',
    website: '',
    size: '',
    location: {
      city: '',
      country: ''
    },
    contact: {
      name: '',
      title: '',
      email: '',
      phone: '',
      linkedin: ''
    },
    owner: {
      id: 'user-123',
      name: 'Anwar Bahou'
    },
    tags: [] as string[],
    notes: '',
    jobs: [] as Client['jobs'],
    comments: [] as Client['comments'],
    files: [] as Client['files'],
    messages: [] as Client['messages']
  })

  const [newTag, setNewTag] = useState('')
  const [currentStep, setCurrentStep] = useState(1)

  const industries = [
    'Software',
    'Healthcare',
    'Energy',
    'Finance',
    'Education',
    'Manufacturing',
    'Retail',
    'Consulting'
  ]

  const owners = [
    { id: 'user-123', name: 'Anwar Bahou' },
    { id: 'user-124', name: 'Fatima Alami' },
    { id: 'user-125', name: 'Youssef Tazi' },
    { id: 'user-126', name: 'Karim El Fassi' },
    { id: 'user-127', name: 'Nadia Berrada' }
  ]

  const steps = [
    { 
      id: 1, 
      title: 'Company Info', 
      description: 'Basic company details',
      icon: Building2,
      fields: ['name', 'industry', 'website']
    },
    { 
      id: 2, 
      title: 'Contact Person', 
      description: 'Primary contact details',
      icon: User,
      fields: ['contact.name', 'contact.title', 'contact.email']
    },
    { 
      id: 3, 
      title: 'Additional Info', 
      description: 'Owner, tags & notes',
      icon: Settings,
      fields: ['owner', 'tags', 'notes']
    }
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNestedInputChange = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev],
        [field]: value
      }
    }))
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }


  const handleSubmit = () => {
    const clientData = {
      ...formData,
      size: parseInt(formData.size) || 0,
      website: formData.website.startsWith('http') ? formData.website : `https://${formData.website}`
    }
    onCreateClient(clientData)
    handleClose()
  }

  const handleClose = () => {
    setFormData({
      name: '',
      logo: '',
      industry: '',
      website: '',
      size: '',
      location: {
        city: '',
        country: ''
      },
      contact: {
        name: '',
        title: '',
        email: '',
        phone: '',
        linkedin: ''
      },
      owner: {
        id: 'user-123',
        name: 'Anwar Bahou'
      },
      tags: [],
      notes: '',
      jobs: [],
      comments: [],
      files: [],
      messages: []
    })
    setNewTag('')
    setCurrentStep(1)
    onClose()
  }

  const isStepValid = (step: number) => {
    const stepConfig = steps.find(s => s.id === step)
    if (!stepConfig) return false

    switch (step) {
      case 1:
        return formData.name && formData.industry && formData.website
      case 2:
        return formData.contact.name && formData.contact.title && formData.contact.email
      case 3:
        return true
      default:
        return false
    }
  }

  const getStepProgress = () => {
    const completedSteps = steps.filter(step => step.id < currentStep).length
    const currentStepData = steps.find(s => s.id === currentStep)
    return {
      completed: completedSteps,
      total: steps.length,
      current: currentStepData?.title || '',
      description: currentStepData?.description || ''
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="max-w-lg overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Create New Client
          </SheetTitle>
        </SheetHeader>

        {/* Enhanced Step Indicator */}
        <div className="mb-6">
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1 bg-muted rounded-full h-2 mr-4">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(getStepProgress().completed / getStepProgress().total) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              {getStepProgress().completed}/{getStepProgress().total}
            </span>
          </div>

          {/* Step Navigation */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isCompleted = step.id < currentStep
              const isCurrent = step.id === currentStep
              const isUpcoming = step.id > currentStep

              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200
                      ${isCompleted ? 'bg-primary text-primary-foreground' : ''}
                      ${isCurrent ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2' : ''}
                      ${isUpcoming ? 'bg-muted text-muted-foreground' : ''}
                    `}>
                      {isCompleted ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </div>
                    <div className="mt-2 text-center">
                      <p className={`text-xs font-medium ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-2 ${
                      step.id < currentStep ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Current Step Content */}
        <div className="space-y-4">

        {/* Step 1: Company Info */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="h-4 w-4 text-primary" />
              <h3 className="text-lg font-semibold">Company Information</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Company Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter company name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map(industry => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Website *</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="size">Company Size</Label>
                <Input
                  id="size"
                  type="number"
                  value={formData.size}
                  onChange={(e) => handleInputChange('size', e.target.value)}
                  placeholder="Number of employees"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.location.city}
                  onChange={(e) => handleNestedInputChange('location', 'city', e.target.value)}
                  placeholder="Enter city"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.location.country}
                  onChange={(e) => handleNestedInputChange('location', 'country', e.target.value)}
                  placeholder="Enter country"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Contact Person */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <User className="h-4 w-4 text-primary" />
              <h3 className="text-lg font-semibold">Contact Person</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Full Name *</Label>
                <Input
                  id="contactName"
                  value={formData.contact.name}
                  onChange={(e) => handleNestedInputChange('contact', 'name', e.target.value)}
                  placeholder="Enter full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactTitle">Job Title *</Label>
                <Input
                  id="contactTitle"
                  value={formData.contact.title}
                  onChange={(e) => handleNestedInputChange('contact', 'title', e.target.value)}
                  placeholder="Enter job title"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contact.email}
                  onChange={(e) => handleNestedInputChange('contact', 'email', e.target.value)}
                  placeholder="Enter email address"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Phone</Label>
                <Input
                  id="contactPhone"
                  value={formData.contact.phone}
                  onChange={(e) => handleNestedInputChange('contact', 'phone', e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactLinkedin">LinkedIn URL</Label>
              <Input
                id="contactLinkedin"
                value={formData.contact.linkedin}
                onChange={(e) => handleNestedInputChange('contact', 'linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>
        )}

        {/* Step 3: Additional */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="h-4 w-4 text-primary" />
              <h3 className="text-lg font-semibold">Additional Information</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="owner">Account Owner</Label>
              <Select value={formData.owner.id} onValueChange={(value) => {
                const owner = owners.find(o => o.id === value)
                if (owner) {
                  handleInputChange('owner', owner)
                }
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select account owner" />
                </SelectTrigger>
                <SelectContent>
                  {owners.map(owner => (
                    <SelectItem key={owner.id} value={owner.id}>
                      {owner.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                />
                <Button type="button" onClick={handleAddTag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => handleRemoveTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Add any additional notes..."
                rows={3}
              />
            </div>
          </div>
        )}

        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4 border-t mt-6">
          <div>
            {currentStep > 1 && (
              <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                Previous
              </Button>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            {currentStep < 3 ? (
              <Button 
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!isStepValid(currentStep)}
              >
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                Create Client
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
