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
  MessageSquareIcon,
  CreditCardIcon,
  ChevronDownIcon,
  UserIcon
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
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={jobsynLogo} 
              alt="Jobzyn" 
              className="h-6 w-auto"
            />
          </div>
          
          {/* Navigation Menu */}
          <div className="flex items-center gap-4 ml-6">
            {/* Pricing */}
            <Button variant="ghost" size="sm" asChild>
              <Link to="/pricing" className="flex items-center gap-2">
                <CreditCardIcon className="h-4 w-4" />
                Pricing
              </Link>
            </Button>

            {/* Contact Us */}
            <Button variant="ghost" size="sm" asChild>
              <Link to="/contact" className="flex items-center gap-2">
                <MessageSquareIcon className="h-4 w-4" />
                Contact Us
              </Link>
            </Button>
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

              {/* Dark/Light Mode Toggle */}
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
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <img
                    src={avatarImage}
                    alt="User Avatar"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center gap-2">
                    <CreditCardIcon className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2">
                  <LogOutIcon className="h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
    </>
  )
}