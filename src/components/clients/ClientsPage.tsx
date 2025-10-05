import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SiteHeader } from "@/components/site-header"
import { ClientsHeader } from './ClientsHeader'
import { ClientsTable } from './ClientsTable'
import { ClientsCardView } from './ClientsCardView'
import { ClientsMapView } from './ClientsMapView'
import { ClientsFilters } from './ClientsFilters'
import { ClientCreationModal } from './ClientCreationModal'
import { ClientPreviewModal } from './ClientPreviewModal'
import clientsData from '../../app/clients/data.json'
import { 
  pageVariants, 
  staggerContainer, 
  viewTransitionVariants 
} from './animations'

export interface Client {
  id: string
  name: string
  logo: string
  industry: string
  website: string
  size: number
  location: {
    city: string
    country: string
  }
  owner: {
    id: string
    name: string
  }
  contact: {
    name: string
    title: string
    email: string
    phone: string
    linkedin: string
  }
  jobs: Array<{
    id: string
    title: string
    status: 'open' | 'closed' | 'draft'
    openingsTotal: number
    openingsFilled: number
  }>
  tags: string[]
  notes: string
  comments: Array<{
    id: string
    author: string
    content: string
    timestamp: string
    type: 'general' | 'meeting' | 'call' | 'email'
  }>
  files: Array<{
    id: string
    name: string
    type: string
    size: number
    uploadedBy: string
    uploadedAt: string
    url: string
  }>
  messages: Array<{
    id: string
    from: string
    to: string
    subject: string
    content: string
    timestamp: string
    type: 'email' | 'sms' | 'call' | 'meeting'
    status: 'sent' | 'received' | 'read' | 'unread'
  }>
}

export const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>(clientsData)
  const [filteredClients, setFilteredClients] = useState<Client[]>(clientsData)
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false)
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [industryFilter, setIndustryFilter] = useState('all')
  const [ownerFilter, setOwnerFilter] = useState('all')
  const [activeJobsOnly, setActiveJobsOnly] = useState(false)
  const [tagFilter, setTagFilter] = useState('all')
  const [activeView, setActiveView] = useState('table')

  const handleCreateClient = (newClient: Omit<Client, 'id'>) => {
    const client: Client = {
      ...newClient,
      id: `client-${Date.now()}`
    }
    setClients(prev => [client, ...prev])
    setFilteredClients(prev => [client, ...prev])
    setIsCreationModalOpen(false)
  }

  const handlePreviewClient = (client: Client) => {
    setSelectedClient(client)
    setIsPreviewModalOpen(true)
  }

  const handleEditClient = (clientId: string) => {
    // Implementation for editing client
    console.log('Edit client:', clientId)
  }

  const handleArchiveClient = (clientId: string) => {
    setClients(prev => prev.filter(client => client.id !== clientId))
    setFilteredClients(prev => prev.filter(client => client.id !== clientId))
  }

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(clients, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'clients-data.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  // Apply filters function
  const applyFilters = () => {
    let filtered = clients

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.location.country.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply industry filter
    if (industryFilter !== 'all') {
      filtered = filtered.filter(client => client.industry === industryFilter)
    }

    // Apply owner filter
    if (ownerFilter !== 'all') {
      filtered = filtered.filter(client => client.owner.name === ownerFilter)
    }

    // Apply active jobs filter
    if (activeJobsOnly) {
      filtered = filtered.filter(client => 
        client.jobs.some(job => job.status === 'open')
      )
    }

    // Apply tag filter
    if (tagFilter !== 'all') {
      filtered = filtered.filter(client => 
        client.tags.includes(tagFilter)
      )
    }

    setFilteredClients(filtered)
  }

  // Apply filters when any filter changes
  React.useEffect(() => {
    applyFilters()
  }, [searchTerm, industryFilter, ownerFilter, activeJobsOnly, tagFilter, clients])

  // Calculate stats
  const totalClients = clients.length
  const totalJobs = clients.reduce((sum, client) => sum + client.jobs.length, 0)
  const activeJobs = clients.reduce((sum, client) => 
    sum + client.jobs.filter(job => job.status === 'open').length, 0
  )
  const industriesCount = new Set(clients.map(client => client.industry)).size
  const ownersCount = new Set(clients.map(client => client.owner.name)).size
  const tagsCount = new Set(clients.flatMap(client => client.tags)).size

  return (
    <>
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-auto py-6">
              <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                  className="space-y-6"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                <motion.div variants={staggerContainer} initial="initial" animate="animate">
                <ClientsHeader
                  totalClients={totalClients}
                  totalJobs={totalJobs}
                  activeJobs={activeJobs}
                  industriesCount={industriesCount}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  industryFilter={industryFilter}
                  setIndustryFilter={setIndustryFilter}
                  onCreateClient={() => setIsCreationModalOpen(true)}
                  onExportJSON={handleExportJSON}
                  activeView={activeView}
                  setActiveView={setActiveView}
                />
                
                {/* New Filter Design */}
                <ClientsFilters
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  industryFilter={industryFilter}
                  setIndustryFilter={setIndustryFilter}
                  ownerFilter={ownerFilter}
                  setOwnerFilter={setOwnerFilter}
                  activeJobsOnly={activeJobsOnly}
                  setActiveJobsOnly={setActiveJobsOnly}
                  tagFilter={tagFilter}
                  setTagFilter={setTagFilter}
                  onApplyFilters={applyFilters}
                  totalClients={totalClients}
                  industriesCount={industriesCount}
                  ownersCount={ownersCount}
                  tagsCount={tagsCount}
                />
              </motion.div>
              
              {/* Main Content with View Transitions */}
              <div className="w-full">
                <AnimatePresence mode="wait">
                  {activeView === 'table' && (
                    <motion.div
                      key="table"
                      variants={viewTransitionVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <ClientsTable
                        clients={filteredClients}
                        onPreview={handlePreviewClient}
                        onEdit={handleEditClient}
                        onArchive={handleArchiveClient}
                      />
                    </motion.div>
                  )}
                  
                  {activeView === 'cards' && (
                    <motion.div
                      key="cards"
                      variants={viewTransitionVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <ClientsCardView
                        clients={filteredClients}
                        onPreview={handlePreviewClient}
                        onEdit={handleEditClient}
                        onArchive={handleArchiveClient}
                      />
                    </motion.div>
                  )}
                  
                  {activeView === 'map' && (
                    <motion.div
                      key="map"
                      variants={viewTransitionVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <ClientsMapView
                        clients={filteredClients}
                        onPreview={handlePreviewClient}
                        onEdit={handleEditClient}
                        onArchive={handleArchiveClient}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>

    {/* Modals */}
    <ClientCreationModal
      isOpen={isCreationModalOpen}
      onClose={() => setIsCreationModalOpen(false)}
      onCreateClient={handleCreateClient}
    />

    <ClientPreviewModal
      isOpen={isPreviewModalOpen}
      onClose={() => setIsPreviewModalOpen(false)}
      client={selectedClient}
      onEdit={handleEditClient}
      onArchive={handleArchiveClient}
    />
  </>
  )
}
