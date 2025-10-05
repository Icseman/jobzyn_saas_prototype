import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { 
  MoreHorizontalIcon,
  MailIcon,
  CalendarIcon,
  MessageSquareIcon,
  MergeIcon,
  HandIcon,
  ChevronDownIcon,
  DownloadIcon,
  PrinterIcon,
  MaximizeIcon,
  ZoomInIcon,
  ZoomOutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  MapPinIcon,
  PhoneIcon,
  UsersIcon,
  CheckCircleIcon,
  FileTextIcon
} from 'lucide-react'
import { ResumeViewer } from './ResumeViewer'
import { 
  staggerContainer, 
  staggerItem, 
  buttonVariants, 
  tagVariants 
} from '../jobs/animations'

interface Candidate {
  id: string
  name: string
  title: string
  avatar?: string
  initials: string
  tags: string[]
  source: string
  appliedDate: string
  status: 'qualified' | 'disqualified'
  stage: string
  email?: string
  phone?: string
  location?: string
  experience?: Array<{
    company: string
    position: string
    duration: string
    description: string
  }>
  education?: Array<{
    institution: string
    degree: string
    year: string
  }>
  skills?: string[]
}

interface CandidateProfileProps {
  candidate: Candidate
  onClose: () => void
}

export const CandidateProfile: React.FC<CandidateProfileProps> = ({ candidate, onClose }) => {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <motion.div
      className="h-full flex flex-col bg-card overflow-y-auto"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >

      {/* Orange Gradient Header */}
      <div className="w-full h-[90px] bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 relative overflow-hidden">
        {/* White decorative shapes */}
        <div className="absolute top-2 left-4 w-16 h-16 bg-white/20 rounded-full blur-sm"></div>
        <div className="absolute top-4 right-8 w-12 h-12 bg-white/15 rounded-lg rotate-45 blur-sm"></div>
        <div className="absolute bottom-2 left-1/4 w-20 h-8 bg-white/10 rounded-full blur-sm"></div>
        <div className="absolute bottom-1 right-1/3 w-14 h-14 bg-white/20 rounded-full blur-sm"></div>
        <div className="absolute top-1/2 left-8 w-10 h-10 bg-white/15 rounded-full blur-sm"></div>
        <div className="absolute top-1/3 right-1/4 w-18 h-6 bg-white/10 rounded-full blur-sm"></div>
        
        {/* Vector-like lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-white/20"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/20"></div>
        <div className="absolute top-0 left-0 w-px h-full bg-white/10"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-white/10"></div>
        
        {/* Action Buttons Container */}
        <div className="absolute inset-0 flex items-center justify-between px-6">
          {/* Left side - All buttons */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/80 border border-primary/20 hover:border-primary/40"
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Tag
              </Button>
              <Button
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground h-8 px-3 text-xs font-medium shadow-md hover:shadow-lg transition-all duration-200"
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
              >
                Move to Phone Screen
                <ChevronDownIcon className="h-3 w-3 ml-1" />
              </Button>
              
              {/* Icon Action Buttons */}
              <div className="flex items-center space-x-1 ml-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 h-8 w-8 hover:bg-muted/80"
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonVariants}
                >
                  <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 h-8 w-8 hover:bg-blue-500/10 hover:text-blue-600"
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonVariants}
                >
                  <MailIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 h-8 w-8 hover:bg-green-500/10 hover:text-green-600"
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonVariants}
                >
                  <CalendarIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 h-8 w-8 hover:bg-purple-500/10 hover:text-purple-600"
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonVariants}
                >
                  <MessageSquareIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 h-8 w-8 hover:bg-orange-500/10 hover:text-orange-600"
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonVariants}
                >
                  <MergeIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 h-8 w-8 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonVariants}
                >
                  <HandIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right side - empty for now */}
          <div></div>
        </div>
      </div>

      {/* Enhanced Candidate Header */}
      <motion.div
        className="relative px-8 py-4 border-b border-border bg-gradient-to-r from-card to-muted/20"
        variants={staggerItem}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative flex items-start space-x-6">
          <div className="relative">
            <Avatar className="h-24 w-24 ring-4 ring-primary/20 shadow-lg">
              <AvatarImage src={candidate.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-2xl font-bold">
                {candidate.initials}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-card flex items-center justify-center">
              <CheckCircleIcon className="h-4 w-4 text-white" />
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">{candidate.name}</h2>
                <p className="text-xl text-muted-foreground mb-3">{candidate.title}</p>
                <TooltipProvider>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground overflow-hidden">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center space-x-1 min-w-0 flex-1 cursor-help">
                          <MapPinIcon className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{candidate.location}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{candidate.location}</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center space-x-1 min-w-0 flex-1 cursor-help">
                          <MailIcon className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{candidate.email}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{candidate.email}</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center space-x-1 min-w-0 flex-1 cursor-help">
                          <PhoneIcon className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{candidate.phone}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{candidate.phone}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </div>
            </div>

            {/* Follow and Source Info */}
            <div className="flex items-center space-x-3 mb-4 justify-start">
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs bg-background hover:bg-muted border-border"
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
              >
                <UsersIcon className="h-3 w-3 mr-1" />
                0 Follow
              </Button>
              <span className="text-xs text-muted-foreground px-2 py-1 bg-muted/50 rounded-md">
                {candidate.source} • {candidate.appliedDate}
              </span>
            </div>

          </div>
        </div>
      </motion.div>

      {/* Enhanced Tabs */}
      <motion.div
        className="flex-1 flex flex-col"
        variants={staggerItem}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="px-6 pt-4">
            <TabsList className="grid w-full grid-cols-5 bg-muted/50 p-1 rounded-lg">
              <TabsTrigger 
                value="profile" 
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm font-medium"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger 
                value="timeline" 
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm font-medium"
              >
                Timeline
              </TabsTrigger>
              <TabsTrigger 
                value="communication" 
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm font-medium"
              >
                Communication
              </TabsTrigger>
              <TabsTrigger 
                value="review" 
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm font-medium"
              >
                Review
              </TabsTrigger>
              <TabsTrigger 
                value="comments" 
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm font-medium"
              >
                Comments
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="profile" className="flex-1 mt-0">
            <motion.div
              className="h-full flex flex-col"
              variants={staggerItem}
            >
              {/* Enhanced Resume Section */}
              <div className="flex-1 p-8">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-foreground flex items-center">
                      <FileTextIcon className="h-6 w-6 mr-3 text-primary" />
                      Professional Resume
                    </h3>
                    
                    {/* Enhanced Resume Controls */}
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-2 bg-muted/50 rounded-lg p-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 h-8 w-8 hover:bg-background"
                          whileHover="hover"
                          whileTap="tap"
                          variants={buttonVariants}
                        >
                          <ChevronLeftIcon className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-muted-foreground px-2">Page 1 of 2</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 h-8 w-8 hover:bg-background"
                          whileHover="hover"
                          whileTap="tap"
                          variants={buttonVariants}
                        >
                          <ChevronRightIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center space-x-1 bg-muted/50 rounded-lg p-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 h-8 w-8 hover:bg-background"
                          whileHover="hover"
                          whileTap="tap"
                          variants={buttonVariants}
                        >
                          <ZoomOutIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 h-8 w-8 hover:bg-background"
                          whileHover="hover"
                          whileTap="tap"
                          variants={buttonVariants}
                        >
                          <ZoomInIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="px-3 h-8 text-sm hover:bg-background"
                          whileHover="hover"
                          whileTap="tap"
                          variants={buttonVariants}
                        >
                          Page Width
                          <ChevronDownIcon className="h-4 w-4 ml-1" />
                        </Button>
                      </div>

                      <div className="flex items-center space-x-1 bg-muted/50 rounded-lg p-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 h-8 w-8 hover:bg-background"
                          whileHover="hover"
                          whileTap="tap"
                          variants={buttonVariants}
                        >
                          <DownloadIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 h-8 w-8 hover:bg-background"
                          whileHover="hover"
                          whileTap="tap"
                          variants={buttonVariants}
                        >
                          <PrinterIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 h-8 w-8 hover:bg-background"
                          whileHover="hover"
                          whileTap="tap"
                          variants={buttonVariants}
                        >
                          <MaximizeIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Resume Viewer */}
                <div className="flex-1">
                  <ResumeViewer candidate={candidate} />
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="timeline" className="flex-1 p-6">
            <div className="text-center py-8 text-muted-foreground">
              <p>Timeline content will be displayed here</p>
            </div>
          </TabsContent>

          <TabsContent value="communication" className="flex-1 p-6">
            <div className="text-center py-8 text-muted-foreground">
              <p>Communication history will be displayed here</p>
            </div>
          </TabsContent>

          <TabsContent value="review" className="flex-1 p-6">
            <div className="text-center py-8 text-muted-foreground">
              <p>Review and feedback will be displayed here</p>
            </div>
          </TabsContent>

          <TabsContent value="comments" className="flex-1 p-6">
            <div className="text-center py-8 text-muted-foreground">
              <p>Comments and notes will be displayed here</p>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
