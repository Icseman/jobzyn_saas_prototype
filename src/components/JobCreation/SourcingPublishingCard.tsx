import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { 
  UsersIcon, 
  GlobeIcon, 
  ShareIcon, 
  UploadIcon,
  LinkIcon,
  CalendarIcon,
  PlusIcon,
  TrashIcon,
  ExternalLinkIcon,
  ChromeIcon,
  LinkedinIcon,
  TwitterIcon,
  MessageCircleIcon,
  BarChart3Icon,
  ClockIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  MonitorIcon,
  AwardIcon,
  UserCheckIcon,
  SearchIcon,
  SparklesIcon,
  UserIcon
} from 'lucide-react'

interface SourcingPublishingCardProps {
  data: SourcingPublishingData
  onChange: (data: SourcingPublishingData) => void
  onNext: () => void
  onPrevious: () => void
}

export interface SourcingPublishingData {
  sourcingChannels: {
    internalTalentPool: boolean
    referralProgram: boolean
    resumeImport: boolean
    agenciesPartners: boolean
    linkedin: boolean
    indeed: boolean
    googleJobs: boolean
    nicheBoards: string[]
    chromeExtension: boolean
  }
  publishing: {
    companyCareersSite: boolean
    jobBoards: string[]
    socialSharing: {
      linkedin: boolean
      twitter: boolean
      whatsapp: boolean
    }
    trackingLinks: {
      utmSource: string
      utmMedium: string
      utmCampaign: string
    }
    schedulePublish: boolean
    publishDate: string
    publishTime: string
  }
  customBoards: Array<{
    name: string
    url: string
    enabled: boolean
  }>
}

const initialData: SourcingPublishingData = {
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
}

export const SourcingPublishingCard: React.FC<SourcingPublishingCardProps> = ({ data, onChange, onNext, onPrevious }) => {
  const [localData, setLocalData] = useState<SourcingPublishingData>({ ...initialData, ...data })

  const updateData = (updates: Partial<SourcingPublishingData>) => {
    const newData = { ...localData, ...updates }
    setLocalData(newData)
    onChange(newData)
  }

  const updateSourcingChannel = (channel: keyof SourcingPublishingData['sourcingChannels'], value: boolean | string[]) => {
    updateData({
      sourcingChannels: {
        ...localData.sourcingChannels,
        [channel]: value
      }
    })
  }

  const updatePublishing = (updates: Partial<SourcingPublishingData['publishing']>) => {
    updateData({
      publishing: {
        ...localData.publishing,
        ...updates
      }
    })
  }

  const updateSocialSharing = (platform: keyof SourcingPublishingData['publishing']['socialSharing'], value: boolean) => {
    updateData({
      publishing: {
        ...localData.publishing,
        socialSharing: {
          ...localData.publishing.socialSharing,
          [platform]: value
        }
      }
    })
  }

  const updateTrackingLinks = (field: keyof SourcingPublishingData['publishing']['trackingLinks'], value: string) => {
    updateData({
      publishing: {
        ...localData.publishing,
        trackingLinks: {
          ...localData.publishing.trackingLinks,
          [field]: value
        }
      }
    })
  }

  const addCustomBoard = () => {
    updateData({
      customBoards: [...localData.customBoards, { name: '', url: '', enabled: true }]
    })
  }

  const updateCustomBoard = (index: number, updates: Partial<SourcingPublishingData['customBoards'][0]>) => {
    const newBoards = [...localData.customBoards]
    newBoards[index] = { ...newBoards[index], ...updates }
    updateData({ customBoards: newBoards })
  }

  const removeCustomBoard = (index: number) => {
    const newBoards = localData.customBoards.filter((_, i) => i !== index)
    updateData({ customBoards: newBoards })
  }

  const isFormValid = () => {
    return Object.values(localData.sourcingChannels).some(value => 
      typeof value === 'boolean' ? value : value.length > 0
    ) && localData.publishing.jobBoards.length > 0
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Candidate Sourcing & Publishing</h2>
        <p className="text-muted-foreground">
          Choose your sourcing channels and reach the right candidates
        </p>
      </div>

      {/* Sourcing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Free Job Boards Card */}
        <Card className="hover:shadow-md transition-shadow flex flex-col">
          <CardContent className="p-6 flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-black/10 rounded-lg">
                <MonitorIcon className="h-6 w-6 text-black" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Free job boards</h3>
                <p className="text-sm text-muted-foreground">
                  Post your job to Jobzyn's network of free job boards and start getting candidates.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4 flex-1">
              <div className="text-center">
                <div className="text-2xl font-bold text-black">17</div>
                <div className="text-xs text-muted-foreground">active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-black/80">356</div>
                <div className="text-xs text-muted-foreground">candidates</div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full text-orange-600 hover:text-orange-700 mt-auto">
              Post to free job boards
            </Button>
          </CardContent>
        </Card>

        {/* Premium Job Boards Card */}
        <Card className="hover:shadow-md transition-shadow flex flex-col">
          <CardContent className="p-6 flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-black/20 rounded-lg">
                <MonitorIcon className="h-6 w-6 text-black" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Premium job boards</h3>
                <p className="text-sm text-muted-foreground">
                  Use premium job boards to increase visibility and collect more candidates. We'll even recommend the best performers.
                </p>
              </div>
            </div>
            
            <div className="mb-4 flex-1">
              <div className="text-sm text-muted-foreground">2 job boards recommended</div>
            </div>
            
            <Button variant="outline" className="w-full text-orange-600 hover:text-orange-700 mt-auto">
              Boost visibility
            </Button>
          </CardContent>
        </Card>

        {/* Referrals Card */}
        <Card className="hover:shadow-md transition-shadow flex flex-col">
          <CardContent className="p-6 flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-black/30 rounded-lg">
                <AwardIcon className="h-6 w-6 text-black" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Referrals</h3>
                <p className="text-sm text-muted-foreground">
                  Send an email to your employees inviting them to submit referrals in Jobzyn Referrals or add a custom reward.
                </p>
              </div>
            </div>
            
            <div className="mb-4 flex-1">
              <div className="text-sm text-muted-foreground">18 candidates referred</div>
            </div>
            
            <Button variant="outline" className="w-full text-orange-600 hover:text-orange-700 mt-auto">
              Edit Referrals settings
            </Button>
          </CardContent>
        </Card>

        {/* Resurfaced Candidates Card */}
        <Card className="hover:shadow-md transition-shadow flex flex-col">
          <CardContent className="p-6 flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-black/40 rounded-lg">
                <UserCheckIcon className="h-6 w-6 text-black" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Resurfaced candidates</h3>
                <p className="text-sm text-muted-foreground">
                  Search for candidates who have applied to similar jobs at your company in the past and who match this job's requirements and location.
                </p>
              </div>
            </div>
            
            <div className="mb-4 flex-1">
              <div className="text-sm text-muted-foreground">26 candidates found</div>
            </div>
            
            <Button variant="outline" className="w-full text-orange-600 hover:text-orange-700 mt-auto">
              Search with AI
            </Button>
          </CardContent>
        </Card>

        {/* Passive Candidates Card */}
        <Card className="hover:shadow-md transition-shadow flex flex-col">
          <CardContent className="p-6 flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-black/50 rounded-lg">
                <SearchIcon className="h-6 w-6 text-black" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Passive candidates</h3>
                <p className="text-sm text-muted-foreground">
                  Search for candidates on job platforms, social media and databases who match this job's requirements and location.
                </p>
              </div>
            </div>
            
            <div className="mb-4 flex-1">
              <div className="text-sm text-muted-foreground">168 candidates found</div>
            </div>
            
            <Button variant="outline" className="w-full text-orange-600 hover:text-orange-700 mt-auto">
              Search with AI
            </Button>
          </CardContent>
        </Card>

        {/* Invite Recruiters Card */}
        <Card className="hover:shadow-md transition-shadow flex flex-col">
          <CardContent className="p-6 flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-black/60 rounded-lg">
                <UserIcon className="h-6 w-6 text-black" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Invite recruiters</h3>
                <p className="text-sm text-muted-foreground">
                  Add external recruiters to your job and allow them to add candidates into Jobzyn easily.
                </p>
              </div>
            </div>
            
            <div className="mb-4 flex-1">
              <div className="text-sm text-muted-foreground">14 candidates by 2 recruiters</div>
            </div>
            
            <Button variant="outline" className="w-full text-orange-600 hover:text-orange-700 mt-auto">
              Invite more
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrevious}>
          Previous: Application & Pipeline
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!isFormValid()}
          className="min-w-32"
        >
          Next: Compliance & Finalize
        </Button>
      </div>
    </div>
  )
}



