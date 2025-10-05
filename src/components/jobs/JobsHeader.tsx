import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { 
  SearchIcon, 
  PlusIcon, 
  MoreHorizontalIcon,
  DownloadIcon,
  UploadIcon,
  SettingsIcon,
  EyeIcon,
  PinIcon,
  ShareIcon,
  FilterIcon
} from 'lucide-react'
import { 
  headerVariants, 
  staggerContainer, 
  staggerItem, 
  buttonVariants,
  iconVariants,
  counterVariants
} from './animations'

interface JobsHeaderProps {
  totalJobs?: number
  selectedCount?: number
}

export const JobsHeader: React.FC<JobsHeaderProps> = ({ 
  totalJobs = 1284, 
  selectedCount = 0 
}) => {
  return (
    <motion.div 
      className="border-b bg-background py-4"
      variants={headerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div 
        className="flex items-center justify-between"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Left Section */}
        <motion.div className="flex items-center gap-4" variants={staggerItem}>
          <div>
            <h1 className="text-2xl font-semibold">Jobs</h1>
            <p className="text-sm text-muted-foreground">
              <motion.span 
                variants={counterVariants}
                initial="initial"
                animate="animate"
              >
                {totalJobs.toLocaleString()}
              </motion.span> total jobs
            </p>
          </div>
          
          {/* Global Search */}
          <div className="relative">
            <motion.div 
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              variants={iconVariants}
              whileHover="hover"
            >
              <SearchIcon className="h-4 w-4" />
            </motion.div>
            <Input 
              placeholder="Search jobs, clients, locations..." 
              className="pl-10 w-80"
            />
          </div>
        </motion.div>

        {/* Right Section */}
        <motion.div className="flex items-center gap-2" variants={staggerItem}>
          {/* Saved Views */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button variant="outline" size="sm">
                  <motion.div variants={iconVariants} whileHover="hover">
                    <EyeIcon className="h-4 w-4 mr-2" />
                  </motion.div>
                  Saved Views
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <PinIcon className="h-4 w-4 mr-2" />
                My Jobs
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PinIcon className="h-4 w-4 mr-2" />
                New This Week
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PinIcon className="h-4 w-4 mr-2" />
                Needs Attention
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusIcon className="h-4 w-4 mr-2" />
                Save Current View
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ShareIcon className="h-4 w-4 mr-2" />
                Share View
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Import */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button variant="outline" size="sm">
                  <motion.div variants={iconVariants} whileHover="hover">
                    <UploadIcon className="h-4 w-4 mr-2" />
                  </motion.div>
                  Import
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Import CSV</DropdownMenuItem>
              <DropdownMenuItem>LinkedIn Integration</DropdownMenuItem>
              <DropdownMenuItem>Indeed Integration</DropdownMenuItem>
              <DropdownMenuItem>ATS Integration</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Export */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button variant="outline" size="sm">
                  <motion.div variants={iconVariants} whileHover="hover">
                    <DownloadIcon className="h-4 w-4 mr-2" />
                  </motion.div>
                  Export
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export CSV</DropdownMenuItem>
              <DropdownMenuItem>Export JSON</DropdownMenuItem>
              <DropdownMenuItem>Export Selected</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Column Manager */}
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button variant="outline" size="sm">
              <motion.div variants={iconVariants} whileHover="hover">
                <SettingsIcon className="h-4 w-4 mr-2" />
              </motion.div>
              Columns
            </Button>
          </motion.div>

          {/* Bulk Actions (shown when rows selected) */}
          {selectedCount > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button variant="outline" size="sm">
                    <motion.div variants={iconVariants} whileHover="hover">
                      <MoreHorizontalIcon className="h-4 w-4 mr-2" />
                    </motion.div>
                    Bulk Actions ({selectedCount})
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Publish</DropdownMenuItem>
                <DropdownMenuItem>Unpublish</DropdownMenuItem>
                <DropdownMenuItem>Archive</DropdownMenuItem>
                <DropdownMenuItem>Close</DropdownMenuItem>
                <DropdownMenuItem>Reopen</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Assign Owner</DropdownMenuItem>
                <DropdownMenuItem>Add to Pipeline</DropdownMenuItem>
                <DropdownMenuItem>Add Tags</DropdownMenuItem>
                <DropdownMenuItem>Add Department</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Create Job */}
          <Link to="/create-job">
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button size="sm">
                <motion.div variants={iconVariants} whileHover="hover">
                  <PlusIcon className="h-4 w-4 mr-2" />
                </motion.div>
                Create Job
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
