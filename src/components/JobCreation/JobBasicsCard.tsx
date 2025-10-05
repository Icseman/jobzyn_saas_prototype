import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { 
  UsersIcon, 
  MapPinIcon, 
  DollarSignIcon, 
  BuildingIcon, 
  UserIcon,
  PlusIcon,
  SparklesIcon,
  EyeIcon,
  EyeOffIcon,
  GlobeIcon,
  LockIcon,
  UserCheckIcon
} from 'lucide-react'

interface JobBasicsCardProps {
  data: JobBasicsData
  onChange: (data: JobBasicsData) => void
  onNext: () => void
}

export interface JobBasicsData {
  jobTitle: string
  department: string
  seniorityLevel: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  numberOfOpenings: number
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance'
  workModel: 'onsite' | 'remote' | 'hybrid'
  locations: Array<{
    city: string
    state: string
    country: string
    remoteOk: boolean
  }>
  salaryRange: {
    min: number
    max: number
    currency: string
    payPeriod: 'monthly' | 'yearly'
    equity: boolean
    bonus: boolean
  }
  jobOwner: {
    name: string
    email: string
    avatar: string
    initials: string
  }
  hiringTeam: Array<{
    name: string
    email: string
    role: string
    avatar: string
    initials: string
  }>
  visibility: 'public' | 'private' | 'client-access'
}

const initialData: JobBasicsData = {
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
}

export const JobBasicsCard: React.FC<JobBasicsCardProps> = ({ data, onChange, onNext }) => {
  const [localData, setLocalData] = useState<JobBasicsData>({ ...initialData, ...data })

  const updateData = (updates: Partial<JobBasicsData>) => {
    const newData = { ...localData, ...updates }
    setLocalData(newData)
    onChange(newData)
  }

  const addLocation = () => {
    updateData({
      locations: [...localData.locations, { city: '', state: '', country: 'Morocco', remoteOk: false }]
    })
  }

  const updateLocation = (index: number, updates: Partial<JobBasicsData['locations'][0]>) => {
    const newLocations = [...localData.locations]
    newLocations[index] = { ...newLocations[index], ...updates }
    updateData({ locations: newLocations })
  }

  const removeLocation = (index: number) => {
    if (localData.locations.length > 1) {
      const newLocations = localData.locations.filter((_, i) => i !== index)
      updateData({ locations: newLocations })
    }
  }

  const addHiringTeamMember = () => {
    updateData({
      hiringTeam: [...localData.hiringTeam, { name: '', email: '', role: '', avatar: '', initials: '' }]
    })
  }

  const updateHiringTeamMember = (index: number, updates: Partial<JobBasicsData['hiringTeam'][0]>) => {
    const newTeam = [...localData.hiringTeam]
    newTeam[index] = { ...newTeam[index], ...updates }
    updateData({ hiringTeam: newTeam })
  }

  const removeHiringTeamMember = (index: number) => {
    const newTeam = localData.hiringTeam.filter((_, i) => i !== index)
    updateData({ hiringTeam: newTeam })
  }

  const getPriorityColor = (priority: JobBasicsData['priority']) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    }
  }

  const isFormValid = () => {
    return localData.jobTitle && 
           localData.department && 
           localData.seniorityLevel && 
           localData.jobOwner.name &&
           localData.locations.some(loc => loc.city && loc.state)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BuildingIcon className="h-5 w-5 text-primary" />
              Job Basics & Hiring Team
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Define the core job information and assemble your hiring team
            </p>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <SparklesIcon className="h-3 w-3" />
            AI Assist Available
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Job Title with AI Suggest */}
        <div className="space-y-2">
          <Label htmlFor="jobTitle" className="flex items-center gap-2">
            Job Title
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
              <SparklesIcon className="h-3 w-3 mr-1" />
              AI Suggest
            </Button>
          </Label>
          <Input
            id="jobTitle"
            placeholder="e.g., Senior Frontend Developer"
            value={localData.jobTitle}
            onChange={(e) => updateData({ jobTitle: e.target.value })}
            className="text-lg"
          />
        </div>

        {/* Department and Seniority */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="department">Department / Function</Label>
            <Select value={localData.department} onValueChange={(value) => updateData({ department: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="hr">Human Resources</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seniorityLevel">Seniority Level</Label>
            <Select value={localData.seniorityLevel} onValueChange={(value) => updateData({ seniorityLevel: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select seniority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="intern">Intern</SelectItem>
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="mid">Mid-level</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
                <SelectItem value="lead">Lead</SelectItem>
                <SelectItem value="principal">Principal</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
                <SelectItem value="director">Director</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Priority and Openings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select value={localData.priority} onValueChange={(value: JobBasicsData['priority']) => updateData({ priority: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
            <Badge className={getPriorityColor(localData.priority)}>
              {localData.priority.charAt(0).toUpperCase() + localData.priority.slice(1)} Priority
            </Badge>
          </div>

          <div className="space-y-2">
            <Label htmlFor="numberOfOpenings">Number of Openings</Label>
            <Input
              id="numberOfOpenings"
              type="number"
              min="1"
              value={localData.numberOfOpenings}
              onChange={(e) => updateData({ numberOfOpenings: parseInt(e.target.value) || 1 })}
            />
          </div>
        </div>

        {/* Employment Type and Work Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="employmentType">Employment Type</Label>
            <Select value={localData.employmentType} onValueChange={(value: JobBasicsData['employmentType']) => updateData({ employmentType: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="workModel">Work Model</Label>
            <Select value={localData.workModel} onValueChange={(value: JobBasicsData['workModel']) => updateData({ workModel: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="onsite">Onsite</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Locations */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2">
            <MapPinIcon className="h-4 w-4" />
            Location(s)
          </Label>
          {localData.locations.map((location, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 border rounded-lg">
              <Input
                placeholder="City"
                value={location.city}
                onChange={(e) => updateLocation(index, { city: e.target.value })}
              />
              <Input
                placeholder="State/Province"
                value={location.state}
                onChange={(e) => updateLocation(index, { state: e.target.value })}
              />
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Country"
                  value={location.country}
                  onChange={(e) => updateLocation(index, { country: e.target.value })}
                />
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`remote-${index}`}
                    checked={location.remoteOk}
                    onCheckedChange={(checked) => updateLocation(index, { remoteOk: !!checked })}
                  />
                  <Label htmlFor={`remote-${index}`} className="text-xs">Remote OK</Label>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeLocation(index)}
                  disabled={localData.locations.length === 1}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={addLocation} className="w-full">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Another Location
          </Button>
        </div>

        {/* Salary & Compensation */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2">
            <DollarSignIcon className="h-4 w-4" />
            Salary & Compensation
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="salaryMin">Minimum Salary</Label>
              <Input
                id="salaryMin"
                type="number"
                placeholder="30000"
                value={localData.salaryRange.min}
                onChange={(e) => updateData({ 
                  salaryRange: { ...localData.salaryRange, min: parseInt(e.target.value) || 0 }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salaryMax">Maximum Salary</Label>
              <Input
                id="salaryMax"
                type="number"
                placeholder="50000"
                value={localData.salaryRange.max}
                onChange={(e) => updateData({ 
                  salaryRange: { ...localData.salaryRange, max: parseInt(e.target.value) || 0 }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={localData.salaryRange.currency} onValueChange={(value) => updateData({ 
                salaryRange: { ...localData.salaryRange, currency: value }
              })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MAD">MAD (Moroccan Dirham)</SelectItem>
                  <SelectItem value="USD">USD (US Dollar)</SelectItem>
                  <SelectItem value="EUR">EUR (Euro)</SelectItem>
                  <SelectItem value="GBP">GBP (British Pound)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="payPeriod">Pay Period</Label>
              <Select value={localData.salaryRange.payPeriod} onValueChange={(value: JobBasicsData['salaryRange']['payPeriod']) => updateData({ 
                salaryRange: { ...localData.salaryRange, payPeriod: value }
              })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="equity"
                  checked={localData.salaryRange.equity}
                  onCheckedChange={(checked) => updateData({ 
                    salaryRange: { ...localData.salaryRange, equity: !!checked }
                  })}
                />
                <Label htmlFor="equity">Equity/Stock Options</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="bonus"
                  checked={localData.salaryRange.bonus}
                  onCheckedChange={(checked) => updateData({ 
                    salaryRange: { ...localData.salaryRange, bonus: !!checked }
                  })}
                />
                <Label htmlFor="bonus">Performance Bonus</Label>
              </div>
            </div>
          </div>
        </div>

        {/* Job Owner */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2">
            <UserIcon className="h-4 w-4" />
            Job Owner (Primary Recruiter)
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="jobOwnerName">Name</Label>
              <Input
                id="jobOwnerName"
                placeholder="John Doe"
                value={localData.jobOwner.name}
                onChange={(e) => updateData({ 
                  jobOwner: { ...localData.jobOwner, name: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobOwnerEmail">Email</Label>
              <Input
                id="jobOwnerEmail"
                type="email"
                placeholder="john@company.com"
                value={localData.jobOwner.email}
                onChange={(e) => updateData({ 
                  jobOwner: { ...localData.jobOwner, email: e.target.value }
                })}
              />
            </div>
          </div>
        </div>

        {/* Hiring Team */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <UsersIcon className="h-4 w-4" />
              Hiring Team Members
            </Label>
            <Button variant="outline" size="sm" onClick={addHiringTeamMember}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </div>
          
          {localData.hiringTeam.map((member, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 border rounded-lg">
              <Input
                placeholder="Name"
                value={member.name}
                onChange={(e) => updateHiringTeamMember(index, { name: e.target.value })}
              />
              <Input
                placeholder="Email"
                type="email"
                value={member.email}
                onChange={(e) => updateHiringTeamMember(index, { email: e.target.value })}
              />
              <div className="flex gap-2">
                <Input
                  placeholder="Role"
                  value={member.role}
                  onChange={(e) => updateHiringTeamMember(index, { role: e.target.value })}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeHiringTeamMember(index)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Visibility */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            {localData.visibility === 'public' ? <GlobeIcon className="h-4 w-4" /> : 
             localData.visibility === 'private' ? <LockIcon className="h-4 w-4" /> : 
             <UserCheckIcon className="h-4 w-4" />}
            Visibility
          </Label>
          <Select value={localData.visibility} onValueChange={(value: JobBasicsData['visibility']) => updateData({ visibility: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">
                <div className="flex items-center gap-2">
                  <GlobeIcon className="h-4 w-4" />
                  Public - Visible to everyone
                </div>
              </SelectItem>
              <SelectItem value="private">
                <div className="flex items-center gap-2">
                  <LockIcon className="h-4 w-4" />
                  Private - Internal only
                </div>
              </SelectItem>
              <SelectItem value="client-access">
                <div className="flex items-center gap-2">
                  <UserCheckIcon className="h-4 w-4" />
                  Client Access - Specific clients only
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Actions */}
        <div className="flex justify-end">
          <Button 
            onClick={onNext} 
            disabled={!isFormValid()}
            className="min-w-32"
          >
            Next: Role Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}



