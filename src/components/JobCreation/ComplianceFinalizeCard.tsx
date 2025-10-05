import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { 
  ShieldIcon, 
  CheckCircleIcon, 
  AlertTriangleIcon, 
  EyeIcon,
  SaveIcon,
  CalendarIcon,
  SendIcon,
  FileTextIcon,
  ClockIcon,
  UserIcon,
  BuildingIcon,
  PlusIcon,
  TrashIcon,
  HistoryIcon,
  DownloadIcon,
  ShareIcon
} from 'lucide-react'

interface ComplianceFinalizeCardProps {
  data: ComplianceFinalizeData
  onChange: (data: ComplianceFinalizeData) => void
  onComplete: () => void
  onPrevious: () => void
}

export interface ComplianceFinalizeData {
  compliance: {
    laborDisclosures: {
      contractType: string
      payTransparency: boolean
      workingHours: string
      probationPeriod: string
    }
    gdprConsent: boolean
    cndpConsent: boolean
    eeoCompliance: boolean
    localLaborLaws: string[]
  }
  approvalChain: Array<{
    approver: string
    role: string
    email: string
    order: number
    status: 'pending' | 'approved' | 'rejected'
    comments: string
  }>
  preview: {
    publicView: string
    internalView: string
  }
  versioning: {
    version: string
    changeLog: Array<{
      date: string
      user: string
      changes: string
    }>
  }
  finalActions: {
    saveDraft: boolean
    schedulePublish: boolean
    publishNow: boolean
  }
}

const initialData: ComplianceFinalizeData = {
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

export const ComplianceFinalizeCard: React.FC<ComplianceFinalizeCardProps> = ({ data, onChange, onComplete, onPrevious }) => {
  const [localData, setLocalData] = useState<ComplianceFinalizeData>({ ...initialData, ...data })

  const updateData = (updates: Partial<ComplianceFinalizeData>) => {
    const newData = { ...localData, ...updates }
    setLocalData(newData)
    onChange(newData)
  }

  const updateCompliance = (updates: Partial<ComplianceFinalizeData['compliance']>) => {
    updateData({
      compliance: {
        ...localData.compliance,
        ...updates
      }
    })
  }

  const updateLaborDisclosures = (updates: Partial<ComplianceFinalizeData['compliance']['laborDisclosures']>) => {
    updateData({
      compliance: {
        ...localData.compliance,
        laborDisclosures: {
          ...localData.compliance.laborDisclosures,
          ...updates
        }
      }
    })
  }

  const updateApprover = (index: number, updates: Partial<ComplianceFinalizeData['approvalChain'][0]>) => {
    const newApprovers = [...localData.approvalChain]
    newApprovers[index] = { ...newApprovers[index], ...updates }
    updateData({ approvalChain: newApprovers })
  }

  const addApprover = () => {
    updateData({
      approvalChain: [...localData.approvalChain, {
        approver: '',
        role: '',
        email: '',
        order: localData.approvalChain.length + 1,
        status: 'pending',
        comments: ''
      }]
    })
  }

  const removeApprover = (index: number) => {
    if (localData.approvalChain.length > 1) {
      const newApprovers = localData.approvalChain.filter((_, i) => i !== index)
      updateData({ approvalChain: newApprovers })
    }
  }

  const addChangeLogEntry = () => {
    updateData({
      versioning: {
        ...localData.versioning,
        changeLog: [...localData.versioning.changeLog, {
          date: new Date().toISOString().split('T')[0],
          user: 'Current User',
          changes: ''
        }]
      }
    })
  }

  const updateChangeLogEntry = (index: number, updates: Partial<ComplianceFinalizeData['versioning']['changeLog'][0]>) => {
    const newChangeLog = [...localData.versioning.changeLog]
    newChangeLog[index] = { ...newChangeLog[index], ...updates }
    updateData({
      versioning: {
        ...localData.versioning,
        changeLog: newChangeLog
      }
    })
  }

  const removeChangeLogEntry = (index: number) => {
    const newChangeLog = localData.versioning.changeLog.filter((_, i) => i !== index)
    updateData({
      versioning: {
        ...localData.versioning,
        changeLog: newChangeLog
      }
    })
  }

  const getStatusColor = (status: ComplianceFinalizeData['approvalChain'][0]['status']) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    }
  }

  const isFormValid = () => {
    return localData.compliance.gdprConsent &&
           localData.compliance.cndpConsent &&
           localData.compliance.eeoCompliance &&
           localData.approvalChain.every(approver => approver.approver && approver.email)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ShieldIcon className="h-5 w-5 text-primary" />
              Compliance, Approvals & Finalize
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Ensure compliance, get approvals, and publish your job posting
            </p>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <CheckCircleIcon className="h-3 w-3" />
            Final Step
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Compliance Fields */}
        <div className="space-y-6">
          <Label className="flex items-center gap-2">
            <ShieldIcon className="h-4 w-4" />
            Compliance & Legal Requirements
          </Label>

          {/* Labor Disclosures */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Local Labor Disclosures</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="contractType" className="text-xs">Contract Type</Label>
                <Select value={localData.compliance.laborDisclosures.contractType} onValueChange={(value) => updateLaborDisclosures({ contractType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select contract type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="permanent">Permanent</SelectItem>
                    <SelectItem value="fixed-term">Fixed-term</SelectItem>
                    <SelectItem value="temporary">Temporary</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="workingHours" className="text-xs">Working Hours</Label>
                <Input
                  id="workingHours"
                  placeholder="40 hours/week"
                  value={localData.compliance.laborDisclosures.workingHours}
                  onChange={(e) => updateLaborDisclosures({ workingHours: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="probationPeriod" className="text-xs">Probation Period</Label>
                <Input
                  id="probationPeriod"
                  placeholder="3 months"
                  value={localData.compliance.laborDisclosures.probationPeriod}
                  onChange={(e) => updateLaborDisclosures({ probationPeriod: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="payTransparency"
                  checked={localData.compliance.laborDisclosures.payTransparency}
                  onCheckedChange={(checked) => updateLaborDisclosures({ payTransparency: !!checked })}
                />
                <Label htmlFor="payTransparency" className="text-sm">
                  Pay Transparency Disclosure Required
                </Label>
              </div>
            </div>
          </div>

          {/* Legal Compliance */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Legal Compliance</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <Checkbox
                  id="gdprConsent"
                  checked={localData.compliance.gdprConsent}
                  onCheckedChange={(checked) => updateCompliance({ gdprConsent: !!checked })}
                />
                <Label htmlFor="gdprConsent" className="text-sm">
                  GDPR Consent
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <Checkbox
                  id="cndpConsent"
                  checked={localData.compliance.cndpConsent}
                  onCheckedChange={(checked) => updateCompliance({ cndpConsent: !!checked })}
                />
                <Label htmlFor="cndpConsent" className="text-sm">
                  CNDP Consent
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <Checkbox
                  id="eeoCompliance"
                  checked={localData.compliance.eeoCompliance}
                  onCheckedChange={(checked) => updateCompliance({ eeoCompliance: !!checked })}
                />
                <Label htmlFor="eeoCompliance" className="text-sm">
                  EEO Compliance
                </Label>
              </div>
            </div>
          </div>
        </div>

        {/* Approval Chain */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              Approval Chain
            </Label>
            <Button variant="outline" size="sm" onClick={addApprover}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Approver
            </Button>
          </div>
          
          {localData.approvalChain.map((approver, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 border rounded-lg">
              <div className="space-y-2">
                <Label className="text-xs">Approver Name</Label>
                <Input
                  placeholder="John Doe"
                  value={approver.approver}
                  onChange={(e) => updateApprover(index, { approver: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Role</Label>
                <Input
                  placeholder="Hiring Manager"
                  value={approver.role}
                  onChange={(e) => updateApprover(index, { role: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Email</Label>
                <Input
                  type="email"
                  placeholder="john@company.com"
                  value={approver.email}
                  onChange={(e) => updateApprover(index, { email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(approver.status)}>
                    {approver.status}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeApprover(index)}
                    disabled={localData.approvalChain.length === 1}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2">
            <EyeIcon className="h-4 w-4" />
            Job Posting Preview
          </Label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Public View</Label>
              <div className="p-4 border rounded-lg bg-muted/50 min-h-32">
                <div className="space-y-2">
                  <h3 className="font-semibold">Senior Frontend Developer</h3>
                  <p className="text-sm text-muted-foreground">Atlas Technologies • Casablanca, Morocco</p>
                  <p className="text-sm">We are seeking a talented Senior Frontend Developer to join our dynamic team...</p>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">React</Badge>
                    <Badge variant="secondary" className="text-xs">TypeScript</Badge>
                    <Badge variant="secondary" className="text-xs">Remote</Badge>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <EyeIcon className="h-4 w-4 mr-2" />
                Preview Public View
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Internal Pipeline View</Label>
              <div className="p-4 border rounded-lg bg-muted/50 min-h-32">
                <div className="space-y-2">
                  <h3 className="font-semibold">Senior Frontend Developer</h3>
                  <p className="text-sm text-muted-foreground">Atlas Technologies • 47 applicants • 2 hours ago</p>
                  <div className="flex gap-2">
                    <Badge className="bg-green-100 text-green-800">Open</Badge>
                    <Badge variant="secondary">High Priority</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Owner: Amina Alami • Team: 3 members</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <EyeIcon className="h-4 w-4 mr-2" />
                Preview Internal View
              </Button>
            </div>
          </div>
        </div>

        {/* Versioning & Change Log */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <HistoryIcon className="h-4 w-4" />
              Versioning & Change Log
            </Label>
            <Button variant="outline" size="sm" onClick={addChangeLogEntry}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-3 border rounded-lg">
              <Badge variant="outline">Version {localData.versioning.version}</Badge>
              <span className="text-sm text-muted-foreground">Current version</span>
            </div>
            
            {localData.versioning.changeLog.map((entry, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 border rounded-lg">
                <Input
                  type="date"
                  value={entry.date}
                  onChange={(e) => updateChangeLogEntry(index, { date: e.target.value })}
                />
                <Input
                  placeholder="User name"
                  value={entry.user}
                  onChange={(e) => updateChangeLogEntry(index, { user: e.target.value })}
                />
                <div className="flex gap-2">
                  <Input
                    placeholder="Changes made"
                    value={entry.changes}
                    onChange={(e) => updateChangeLogEntry(index, { changes: e.target.value })}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeChangeLogEntry(index)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Actions */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2">
            <SendIcon className="h-4 w-4" />
            Final Actions
          </Label>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <SaveIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <h3 className="font-medium mb-2">Save Draft</h3>
              <p className="text-sm text-muted-foreground mb-3">Save as draft for later editing</p>
              <Button variant="outline" className="w-full">
                <SaveIcon className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg text-center">
              <CalendarIcon className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <h3 className="font-medium mb-2">Schedule Publish</h3>
              <p className="text-sm text-muted-foreground mb-3">Schedule for later publication</p>
              <Button variant="outline" className="w-full">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Schedule
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg text-center">
              <SendIcon className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <h3 className="font-medium mb-2">Publish Now</h3>
              <p className="text-sm text-muted-foreground mb-3">Publish immediately to all channels</p>
              <Button 
                className="w-full"
                onClick={onComplete}
                disabled={!isFormValid()}
              >
                <SendIcon className="h-4 w-4 mr-2" />
                Publish Now
              </Button>
            </div>
          </div>
        </div>

        {/* Compliance Summary */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2">
            <CheckCircleIcon className="h-4 w-4" />
            Compliance Summary
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <ShieldIcon className="h-4 w-4 text-green-600" />
                <Label className="text-sm font-medium">Legal Compliance</Label>
              </div>
              <div className="space-y-1">
                {localData.compliance.gdprConsent && <Badge variant="secondary" className="text-xs">GDPR ✓</Badge>}
                {localData.compliance.cndpConsent && <Badge variant="secondary" className="text-xs">CNDP ✓</Badge>}
                {localData.compliance.eeoCompliance && <Badge variant="secondary" className="text-xs">EEO ✓</Badge>}
                {localData.compliance.laborDisclosures.contractType && (
                  <Badge variant="secondary" className="text-xs">Labor Disclosures ✓</Badge>
                )}
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <UserIcon className="h-4 w-4 text-blue-600" />
                <Label className="text-sm font-medium">Approval Status</Label>
              </div>
              <div className="space-y-1">
                {localData.approvalChain.map((approver, index) => (
                  <Badge key={index} className={getStatusColor(approver.status)}>
                    {approver.role}: {approver.status}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Actions */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={onPrevious}>
            Previous: Sourcing & Publishing
          </Button>
          <div className="flex gap-2">
            <Button variant="outline">
              <DownloadIcon className="h-4 w-4 mr-2" />
              Export Job
            </Button>
            <Button variant="outline">
              <ShareIcon className="h-4 w-4 mr-2" />
              Share Preview
            </Button>
            <Button 
              onClick={onComplete}
              disabled={!isFormValid()}
              className="min-w-32"
            >
              <SendIcon className="h-4 w-4 mr-2" />
              Complete & Publish
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}



