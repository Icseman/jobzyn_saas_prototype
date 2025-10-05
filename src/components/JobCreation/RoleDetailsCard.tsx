import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { 
  FileTextIcon, 
  ListIcon, 
  CheckSquareIcon, 
  StarIcon,
  UploadIcon,
  SparklesIcon,
  PlusIcon,
  TrashIcon,
  StarIcon as Star,
  StarIcon as StarEmpty
} from 'lucide-react'

interface RoleDetailsCardProps {
  data: RoleDetailsData
  onChange: (data: RoleDetailsData) => void
  onNext: () => void
  onPrevious: () => void
}

export interface RoleDetailsData {
  jobDescription: string
  responsibilities: string[]
  requirements: {
    mustHave: string[]
    niceToHave: string[]
  }
  skillsMatrix: Array<{
    skill: string
    category: 'hard' | 'soft'
    importance: 1 | 2 | 3 | 4 | 5
  }>
  benefits: Array<{
    benefit: string
    included: boolean
  }>
  attachments: Array<{
    name: string
    type: string
    size: string
    url: string
  }>
}

const initialData: RoleDetailsData = {
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
}

export const RoleDetailsCard: React.FC<RoleDetailsCardProps> = ({ data, onChange, onNext, onPrevious }) => {
  const [localData, setLocalData] = useState<RoleDetailsData>({ ...initialData, ...data })

  const updateData = (updates: Partial<RoleDetailsData>) => {
    const newData = { ...localData, ...updates }
    setLocalData(newData)
    onChange(newData)
  }

  const addResponsibility = () => {
    updateData({
      responsibilities: [...localData.responsibilities, '']
    })
  }

  const updateResponsibility = (index: number, value: string) => {
    const newResponsibilities = [...localData.responsibilities]
    newResponsibilities[index] = value
    updateData({ responsibilities: newResponsibilities })
  }

  const removeResponsibility = (index: number) => {
    if (localData.responsibilities.length > 1) {
      const newResponsibilities = localData.responsibilities.filter((_, i) => i !== index)
      updateData({ responsibilities: newResponsibilities })
    }
  }

  const addMustHaveRequirement = () => {
    updateData({
      requirements: {
        ...localData.requirements,
        mustHave: [...localData.requirements.mustHave, '']
      }
    })
  }

  const updateMustHaveRequirement = (index: number, value: string) => {
    const newMustHave = [...localData.requirements.mustHave]
    newMustHave[index] = value
    updateData({
      requirements: {
        ...localData.requirements,
        mustHave: newMustHave
      }
    })
  }

  const removeMustHaveRequirement = (index: number) => {
    if (localData.requirements.mustHave.length > 1) {
      const newMustHave = localData.requirements.mustHave.filter((_, i) => i !== index)
      updateData({
        requirements: {
          ...localData.requirements,
          mustHave: newMustHave
        }
      })
    }
  }

  const addNiceToHaveRequirement = () => {
    updateData({
      requirements: {
        ...localData.requirements,
        niceToHave: [...localData.requirements.niceToHave, '']
      }
    })
  }

  const updateNiceToHaveRequirement = (index: number, value: string) => {
    const newNiceToHave = [...localData.requirements.niceToHave]
    newNiceToHave[index] = value
    updateData({
      requirements: {
        ...localData.requirements,
        niceToHave: newNiceToHave
      }
    })
  }

  const removeNiceToHaveRequirement = (index: number) => {
    if (localData.requirements.niceToHave.length > 1) {
      const newNiceToHave = localData.requirements.niceToHave.filter((_, i) => i !== index)
      updateData({
        requirements: {
          ...localData.requirements,
          niceToHave: newNiceToHave
        }
      })
    }
  }

  const addSkill = () => {
    updateData({
      skillsMatrix: [...localData.skillsMatrix, { skill: '', category: 'hard', importance: 3 }]
    })
  }

  const updateSkill = (index: number, updates: Partial<RoleDetailsData['skillsMatrix'][0]>) => {
    const newSkills = [...localData.skillsMatrix]
    newSkills[index] = { ...newSkills[index], ...updates }
    updateData({ skillsMatrix: newSkills })
  }

  const removeSkill = (index: number) => {
    const newSkills = localData.skillsMatrix.filter((_, i) => i !== index)
    updateData({ skillsMatrix: newSkills })
  }

  const updateBenefit = (index: number, included: boolean) => {
    const newBenefits = [...localData.benefits]
    newBenefits[index] = { ...newBenefits[index], included }
    updateData({ benefits: newBenefits })
  }

  const addCustomBenefit = () => {
    updateData({
      benefits: [...localData.benefits, { benefit: '', included: false }]
    })
  }

  const updateCustomBenefit = (index: number, benefit: string) => {
    const newBenefits = [...localData.benefits]
    newBenefits[index] = { ...newBenefits[index], benefit }
    updateData({ benefits: newBenefits })
  }

  const removeCustomBenefit = (index: number) => {
    const newBenefits = localData.benefits.filter((_, i) => i !== index)
    updateData({ benefits: newBenefits })
  }

  const renderStars = (importance: number, onChange: (value: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star as 1 | 2 | 3 | 4 | 5)}
            className="text-yellow-400 hover:text-yellow-500 transition-colors"
          >
            {star <= importance ? (
              <Star className="h-4 w-4 fill-current" />
            ) : (
              <StarEmpty className="h-4 w-4" />
            )}
          </button>
        ))}
      </div>
    )
  }

  const isFormValid = () => {
    return localData.jobDescription.trim() && 
           localData.responsibilities.some(r => r.trim()) &&
           localData.requirements.mustHave.some(r => r.trim())
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileTextIcon className="h-5 w-5 text-primary" />
              Role Details & Description
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Create a compelling job description and define role requirements
            </p>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <SparklesIcon className="h-3 w-3" />
            AI Generator Available
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Job Description */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="jobDescription">Job Description</Label>
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
              <SparklesIcon className="h-3 w-3 mr-1" />
              AI Generate
            </Button>
          </div>
          <Textarea
            id="jobDescription"
            placeholder="Write a compelling job description that attracts the right candidates..."
            value={localData.jobDescription}
            onChange={(e) => updateData({ jobDescription: e.target.value })}
            className="min-h-32"
          />
        </div>

        {/* Responsibilities */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2">
            <ListIcon className="h-4 w-4" />
            Key Responsibilities
          </Label>
          {localData.responsibilities.map((responsibility, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder={`Responsibility ${index + 1}`}
                value={responsibility}
                onChange={(e) => updateResponsibility(index, e.target.value)}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeResponsibility(index)}
                disabled={localData.responsibilities.length === 1}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={addResponsibility} className="w-full">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Responsibility
          </Button>
        </div>

        {/* Requirements */}
        <div className="space-y-6">
          <div className="space-y-4">
            <Label className="flex items-center gap-2">
              <CheckSquareIcon className="h-4 w-4" />
              Must-Have Requirements
            </Label>
            {localData.requirements.mustHave.map((requirement, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`Must-have requirement ${index + 1}`}
                  value={requirement}
                  onChange={(e) => updateMustHaveRequirement(index, e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeMustHaveRequirement(index)}
                  disabled={localData.requirements.mustHave.length === 1}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={addMustHaveRequirement} className="w-full">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Must-Have Requirement
            </Button>
          </div>

          <div className="space-y-4">
            <Label className="flex items-center gap-2">
              <StarIcon className="h-4 w-4" />
              Nice-to-Have Requirements
            </Label>
            {localData.requirements.niceToHave.map((requirement, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`Nice-to-have requirement ${index + 1}`}
                  value={requirement}
                  onChange={(e) => updateNiceToHaveRequirement(index, e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeNiceToHaveRequirement(index)}
                  disabled={localData.requirements.niceToHave.length === 1}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={addNiceToHaveRequirement} className="w-full">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Nice-to-Have Requirement
            </Button>
          </div>
        </div>

        {/* Skills Matrix */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <StarIcon className="h-4 w-4" />
              Skills Matrix
            </Label>
            <Button variant="outline" size="sm" onClick={addSkill}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </div>
          
          {localData.skillsMatrix.map((skill, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 border rounded-lg">
              <Input
                placeholder="Skill name"
                value={skill.skill}
                onChange={(e) => updateSkill(index, { skill: e.target.value })}
              />
              <select
                value={skill.category}
                onChange={(e) => updateSkill(index, { category: e.target.value as 'hard' | 'soft' })}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="hard">Hard Skill</option>
                <option value="soft">Soft Skill</option>
              </select>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Importance:</span>
                {renderStars(skill.importance, (value) => updateSkill(index, { importance: value }))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeSkill(index)}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <CheckSquareIcon className="h-4 w-4" />
              Benefits & Perks
            </Label>
            <Button variant="outline" size="sm" onClick={addCustomBenefit}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Custom Benefit
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {localData.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg">
                <Checkbox
                  id={`benefit-${index}`}
                  checked={benefit.included}
                  onCheckedChange={(checked) => updateBenefit(index, !!checked)}
                />
                <div className="flex-1">
                  {benefit.benefit === '' ? (
                    <Input
                      placeholder="Custom benefit"
                      value={benefit.benefit}
                      onChange={(e) => updateCustomBenefit(index, e.target.value)}
                      className="border-none p-0 h-auto"
                    />
                  ) : (
                    <Label htmlFor={`benefit-${index}`} className="text-sm">
                      {benefit.benefit}
                    </Label>
                  )}
                </div>
                {benefit.benefit === '' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCustomBenefit(index)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Attachments */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2">
            <UploadIcon className="h-4 w-4" />
            Attachments
          </Label>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <UploadIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">
              Drop files here or click to upload
            </p>
            <p className="text-xs text-muted-foreground">
              PDF, DOC, DOCX, MP4, AVI (Max 10MB each)
            </p>
            <Button variant="outline" className="mt-2">
              <UploadIcon className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
          </div>
          
          {localData.attachments.length > 0 && (
            <div className="space-y-2">
              {localData.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileTextIcon className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{attachment.name}</p>
                      <p className="text-xs text-muted-foreground">{attachment.type} • {attachment.size}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* Actions */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={onPrevious}>
            Previous: Job Basics
          </Button>
          <Button 
            onClick={onNext} 
            disabled={!isFormValid()}
            className="min-w-32"
          >
            Next: Application & Pipeline
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}



