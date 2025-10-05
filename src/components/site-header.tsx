import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/contexts/ThemeContext"
import { useAuth } from "@/contexts/AuthContext"
import { 
  BellIcon, 
  InboxIcon, 
  SunIcon, 
  MoonIcon, 
  LogOutIcon,
  LayoutDashboardIcon,
  ListIcon,
  UsersIcon,
  UserCheckIcon,
  CalendarIcon,
  PlusIcon,
  UserPlusIcon,
  BarChartIcon,
  ClipboardListIcon,
  FileIcon,
  PaletteIcon,
  FileTextIcon,
  MessageSquareIcon,
  StickyNoteIcon,
  MailIcon,
  SettingsIcon,
  HelpCircleIcon,
  SearchIcon,
  ChevronDownIcon,
  WrenchIcon,
  UserIcon,
  CreditCardIcon,
  ShieldIcon
} from "lucide-react"
import { CareersPageStatus } from "@/components/careers/CareersPageStatus"
import SearchModal from "@/components/SearchModal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"
import { useState } from "react"
import jobsynLogo from "@/Assets/jobsyn_recruitment.svg"
import avatarImage from "@/Assets/avatar.jpeg"

export function SiteHeader() {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 group-has-data-[collapsible=icon]/sidebar-wrapper:h-16 flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        {/* Jobzyn Logo */}
        <div className="flex items-center">
          <img 
            src={jobsynLogo} 
            alt="Jobzyn" 
            className="h-6 w-auto"
          />
        </div>
        
        {/* Navigation Menu */}
        <div className="flex items-center gap-1 ml-6">
          {/* Main Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <LayoutDashboardIcon className="h-4 w-4" />
                Main Actions
                <ChevronDownIcon className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Core Workflow</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/dashboard" className="flex items-center gap-2">
                  <LayoutDashboardIcon className="h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/jobs" className="flex items-center gap-2">
                  <ListIcon className="h-4 w-4" />
                  Jobs
                  <Badge variant="secondary" className="ml-auto">24</Badge>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/candidates" className="flex items-center gap-2">
                  <UsersIcon className="h-4 w-4" />
                  Candidates
                  <Badge variant="secondary" className="ml-auto">1,247</Badge>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/clients" className="flex items-center gap-2">
                  <UserCheckIcon className="h-4 w-4" />
                  Clients
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/calendar" className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Calendar
                  <Badge variant="secondary" className="ml-auto">7</Badge>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/employees" className="flex items-center gap-2">
                  <UsersIcon className="h-4 w-4" />
                  Employees
                  <Badge variant="secondary" className="ml-auto">127</Badge>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Quick Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <PlusIcon className="h-4 w-4" />
                Quick Actions
                <ChevronDownIcon className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>Frequently Used</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/create-job" className="flex items-center gap-2">
                  <PlusIcon className="h-4 w-4" />
                  Create Job
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/candidates/add" className="flex items-center gap-2">
                  <UserPlusIcon className="h-4 w-4" />
                  Add Candidate
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Insights & Resources */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <BarChartIcon className="h-4 w-4" />
                Insights
                <ChevronDownIcon className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Analytics & Tools</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/analytics" className="flex items-center gap-2">
                  <BarChartIcon className="h-4 w-4" />
                  Analytics
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/reports" className="flex items-center gap-2">
                  <ClipboardListIcon className="h-4 w-4" />
                  Reports
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center gap-2">
                  <FileIcon className="h-4 w-4" />
                  Templates
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem asChild>
                    <Link to="/templates/jobs">Job Descriptions</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/templates/emails">Email Templates</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/templates/interviews">Interview Guides</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/templates/offers">Offer Letters</Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Tools */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <WrenchIcon className="h-4 w-4" />
                Tools
                <ChevronDownIcon className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Builder Tools</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/careers-builder" className="flex items-center gap-2">
                  <PaletteIcon className="h-4 w-4" />
                  Careers Page Builder
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/resume-builder" className="flex items-center gap-2">
                  <FileTextIcon className="h-4 w-4" />
                  Resume Builder
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Communication */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <MessageSquareIcon className="h-4 w-4" />
                Communication
                <ChevronDownIcon className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Messages & Notes</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center gap-2">
                  <MessageSquareIcon className="h-4 w-4" />
                  Messages
                  <Badge variant="secondary" className="ml-auto">5</Badge>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem asChild>
                    <Link to="/messages/team">Team Chat</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/messages/clients">Client Messages</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/messages/candidates">Candidate Messages</Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem asChild>
                <Link to="/notes" className="flex items-center gap-2">
                  <StickyNoteIcon className="h-4 w-4" />
                  Notes
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/mailbox" className="flex items-center gap-2">
                  <MailIcon className="h-4 w-4" />
                  Mailbox
                  <Badge variant="secondary" className="ml-auto">12</Badge>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Utility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <SettingsIcon className="h-4 w-4" />
                Utility
                <ChevronDownIcon className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>Settings & Help</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center gap-2">
                  <SettingsIcon className="h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/help" className="flex items-center gap-2">
                  <HelpCircleIcon className="h-4 w-4" />
                  Get Help
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsSearchModalOpen(true)} className="flex items-center gap-2">
                <SearchIcon className="h-4 w-4" />
                Search
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Right side controls */}
        <div className="ml-auto flex items-center gap-4 mr-0">
          {/* Careers Page Status */}
          <CareersPageStatus />
          
          {/* Separator */}
          <div className="h-6 w-px bg-border" />
          
          {/* Communication & Utility Buttons */}
          <div className="flex items-center gap-1">
            {/* Inbox */}
            <Button variant="ghost" size="sm" className="relative">
              <InboxIcon className="h-4 w-4" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
              >
                3
              </Badge>
            </Button>
            
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <BellIcon className="h-4 w-4" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
              >
                7
              </Badge>
            </Button>
            
            {/* Theme Toggle */}
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === 'dark' ? (
                <SunIcon className="h-4 w-4" />
              ) : (
                <MoonIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {/* Separator */}
          <div className="h-6 w-px bg-border" />
          
          {/* User Avatar */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full p-0 overflow-hidden">
                <img 
                  src={avatarImage} 
                  alt="User Avatar" 
                  className="h-full w-full object-cover"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end">
              <div className="flex items-center gap-3 p-3 border-b">
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  <img 
                    src={avatarImage} 
                    alt="User Avatar" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-medium text-sm">{user?.name || 'User'}</p>
                  <p className="text-xs text-muted-foreground">{user?.email || 'user@example.com'}</p>
                </div>
              </div>
              
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4" />
                  Profile Settings
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem asChild>
                <Link to="/billing" className="flex items-center gap-2">
                  <CreditCardIcon className="h-4 w-4" />
                  Billing & Plans
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem asChild>
                <Link to="/security" className="flex items-center gap-2">
                  <ShieldIcon className="h-4 w-4" />
                  Security
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center gap-2">
                  <SettingsIcon className="h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem asChild>
                <Link to="/help" className="flex items-center gap-2">
                  <HelpCircleIcon className="h-4 w-4" />
                  Help & Support
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-600 focus:text-red-600">
                <LogOutIcon className="h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
    </header>
  )
}
