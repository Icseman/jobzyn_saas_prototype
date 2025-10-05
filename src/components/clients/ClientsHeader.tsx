import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Building2, 
  Users, 
  Briefcase, 
  TrendingUp,
  Plus,
  Download,
  Search,
  TableIcon,
  ColumnsIcon,
  MapIcon
} from "lucide-react"
import { 
  headerVariants, 
  staggerContainer, 
  staggerItem, 
  statsCardVariants, 
  buttonVariants,
  iconVariants,
  counterVariants
} from './animations'

interface ClientsHeaderProps {
  totalClients: number
  totalJobs: number
  activeJobs: number
  industriesCount: number
  searchTerm: string
  setSearchTerm: (term: string) => void
  industryFilter: string
  setIndustryFilter: (industry: string) => void
  onCreateClient: () => void
  onExportJSON: () => void
  activeView: string
  setActiveView: (view: string) => void
}

export const ClientsHeader = ({
  totalClients,
  totalJobs,
  activeJobs,
  industriesCount,
  searchTerm,
  setSearchTerm,
  industryFilter,
  setIndustryFilter,
  onCreateClient,
  onExportJSON,
  activeView,
  setActiveView
}: ClientsHeaderProps) => {
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

  return (
    <motion.div 
      className="space-y-6"
      variants={headerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Header Toolbar */}
      <motion.div 
        className="flex items-center justify-between"
        variants={staggerItem}
      >
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">Clients ({totalClients})</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button onClick={onCreateClient} className="flex items-center gap-2">
              <motion.div variants={iconVariants} whileHover="hover">
                <Plus className="h-4 w-4" />
              </motion.div>
              New Client
            </Button>
          </motion.div>
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button variant="outline" onClick={onExportJSON} className="flex items-center gap-2">
              <motion.div variants={iconVariants} whileHover="hover">
                <Download className="h-4 w-4" />
              </motion.div>
              Export JSON
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div 
        className="flex items-center gap-4"
        variants={staggerItem}
      >
        <div className="relative flex-1 max-w-md">
          <motion.div 
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
            variants={iconVariants}
            whileHover="hover"
          >
            <Search className="h-4 w-4 text-muted-foreground" />
          </motion.div>
          <Input
            placeholder="Search by company name, contact, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={industryFilter} onValueChange={setIndustryFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by industry" />
          </SelectTrigger>
          <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
            {industries.map(industry => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* Stats Widgets */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div 
          className="bg-card p-6 rounded-lg border"
          variants={statsCardVariants}
          whileHover="hover"
        >
          <div className="flex items-center gap-3">
            <motion.div 
              className="p-2 bg-orange-100 rounded-lg"
              variants={iconVariants}
              whileHover="hover"
            >
              <Building2 className="h-5 w-5 text-orange-600" />
            </motion.div>
            <div>
              <p className="text-sm text-muted-foreground">Total Clients</p>
              <motion.p 
                className="text-2xl font-bold"
                variants={counterVariants}
                initial="initial"
                animate="animate"
              >
                {totalClients}
              </motion.p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-card p-6 rounded-lg border"
          variants={statsCardVariants}
          whileHover="hover"
        >
          <div className="flex items-center gap-3">
            <motion.div 
              className="p-2 bg-orange-200 rounded-lg"
              variants={iconVariants}
              whileHover="hover"
            >
              <Briefcase className="h-5 w-5 text-orange-600" />
            </motion.div>
            <div>
              <p className="text-sm text-muted-foreground">Total Jobs</p>
              <motion.p 
                className="text-2xl font-bold"
                variants={counterVariants}
                initial="initial"
                animate="animate"
              >
                {totalJobs}
              </motion.p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-card p-6 rounded-lg border"
          variants={statsCardVariants}
          whileHover="hover"
        >
          <div className="flex items-center gap-3">
            <motion.div 
              className="p-2 bg-orange-100 rounded-lg"
              variants={iconVariants}
              whileHover="hover"
            >
              <Users className="h-5 w-5 text-orange-600" />
            </motion.div>
            <div>
              <p className="text-sm text-muted-foreground">Active Jobs</p>
              <motion.p 
                className="text-2xl font-bold"
                variants={counterVariants}
                initial="initial"
                animate="animate"
              >
                {activeJobs}
              </motion.p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-card p-6 rounded-lg border"
          variants={statsCardVariants}
          whileHover="hover"
        >
          <div className="flex items-center gap-3">
            <motion.div 
              className="p-2 bg-orange-300 rounded-lg"
              variants={iconVariants}
              whileHover="hover"
            >
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </motion.div>
            <div>
              <p className="text-sm text-muted-foreground">Industries</p>
              <motion.p 
                className="text-2xl font-bold"
                variants={counterVariants}
                initial="initial"
                animate="animate"
              >
                {industriesCount}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* View Toggle */}
      <motion.div 
        className="flex items-center justify-between"
        variants={staggerItem}
      >
        <Tabs value={activeView} onValueChange={setActiveView}>
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="table" className="flex items-center gap-2">
              <motion.div variants={iconVariants} whileHover="hover">
                <TableIcon className="h-4 w-4" />
              </motion.div>
              Table
            </TabsTrigger>
            <TabsTrigger value="cards" className="flex items-center gap-2">
              <motion.div variants={iconVariants} whileHover="hover">
                <ColumnsIcon className="h-4 w-4" />
              </motion.div>
              Cards
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <motion.div variants={iconVariants} whileHover="hover">
                <MapIcon className="h-4 w-4" />
              </motion.div>
              Map
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
