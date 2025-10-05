import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SiteHeader } from "@/components/site-header"
import { NotesHeader } from './NotesHeader'
import { NotesTable } from './NotesTable'
import { NotesCardView } from './NotesCardView'
import { NoteCreationModal } from './NoteCreationModal'
import { NotePreviewModal } from './NotePreviewModal'
import { NotesFilters } from './NotesFilters'
import { 
  pageVariants, 
  staggerContainer 
} from './animations'
import notesData from '../../app/notes/data.json'

export interface Note {
  id: string
  title: string
  content: string
  owner: {
    id: string
    name: string
    avatar: string
  }
  creator: {
    id: string
    name: string
    avatar: string
  }
  related: {
    clientId: string | null
    jobId: string | null
    candidateId: string | null
  }
  tags: string[]
  attachments: Array<{
    id: string
    name: string
    url: string
    type: string
    size: number
  }>
  visibility: 'private' | 'team' | 'public'
  createdAt: string
  updatedAt: string
}

export interface Client {
  id: string
  name: string
  logo: string
}

export interface Job {
  id: string
  title: string
  status: string
}

export interface Candidate {
  id: string
  name: string
}

export const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(notesData as Note[])
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(notesData as Note[])
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    owner: '',
    client: '',
    job: '',
    candidate: '',
    tags: [] as string[],
    dateRange: '',
    visibility: ''
  })
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false)
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [currentView, setCurrentView] = useState<'table' | 'cards'>('cards')

  // Mock data for related entities
  const clients: Client[] = [
    { id: 'client-001', name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com' },
    { id: 'client-002', name: 'Johnson & Johnson', logo: 'https://logo.clearbit.com/jnj.com' },
    { id: 'client-003', name: 'Tesla', logo: 'https://logo.clearbit.com/tesla.com' },
    { id: 'client-004', name: 'Goldman Sachs', logo: 'https://logo.clearbit.com/goldmansachs.com' },
    { id: 'client-005', name: 'Coursera', logo: 'https://logo.clearbit.com/coursera.org' }
  ]

  const jobs: Job[] = [
    { id: 'job-101', title: 'Frontend Developer', status: 'open' },
    { id: 'job-102', title: 'Product Designer', status: 'closed' },
    { id: 'job-201', title: 'Senior Nurse', status: 'open' },
    { id: 'job-202', title: 'Medical Technician', status: 'open' },
    { id: 'job-301', title: 'Solar Engineer', status: 'open' },
    { id: 'job-302', title: 'Project Manager', status: 'closed' },
    { id: 'job-401', title: 'Financial Analyst', status: 'open' },
    { id: 'job-402', title: 'Risk Manager', status: 'open' },
    { id: 'job-501', title: 'Software Instructor', status: 'open' },
    { id: 'job-502', title: 'Curriculum Developer', status: 'draft' }
  ]

  const candidates: Candidate[] = [
    { id: 'cand-101', name: 'Sara Ahmed' },
    { id: 'cand-201', name: 'Mohamed El Fassi' },
    { id: 'cand-301', name: 'Aicha Mansouri' }
  ]

  // Calculate stats
  const stats = {
    totalNotes: notes.length,
    notesLinkedToJobs: notes.filter(note => note.related.jobId).length,
    notesLinkedToClients: notes.filter(note => note.related.clientId).length,
    notesCreatedThisWeek: notes.filter(note => {
      const noteDate = new Date(note.createdAt)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return noteDate >= weekAgo
    }).length
  }

  // Filter notes based on search and filters
  useEffect(() => {
    let filtered = notes

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        note.owner.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Owner filter
    if (filters.owner && filters.owner !== 'all') {
      filtered = filtered.filter(note => note.owner.id === filters.owner)
    }

    // Client filter
    if (filters.client && filters.client !== 'all') {
      filtered = filtered.filter(note => note.related.clientId === filters.client)
    }

    // Job filter
    if (filters.job && filters.job !== 'all') {
      filtered = filtered.filter(note => note.related.jobId === filters.job)
    }

    // Candidate filter
    if (filters.candidate && filters.candidate !== 'all') {
      filtered = filtered.filter(note => note.related.candidateId === filters.candidate)
    }

    // Tags filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter(note =>
        filters.tags.some(tag => note.tags.includes(tag))
      )
    }

    // Visibility filter
    if (filters.visibility && filters.visibility !== 'all') {
      filtered = filtered.filter(note => note.visibility === filters.visibility)
    }

    setFilteredNotes(filtered)
  }, [notes, searchTerm, filters])

  const handleCreateNote = (newNote: Partial<Note>) => {
    const note: Note = {
      id: `note-${Date.now()}`,
      title: newNote.title || '',
      content: newNote.content || '',
      owner: newNote.owner || { id: 'user-123', name: 'Anwar Bahou', avatar: '' },
      creator: newNote.creator || { id: 'user-123', name: 'Anwar Bahou', avatar: '' },
      related: newNote.related || { clientId: null, jobId: null, candidateId: null },
      tags: newNote.tags || [],
      attachments: newNote.attachments || [],
      visibility: newNote.visibility || 'team',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    setNotes(prev => [note, ...prev])
    setIsCreationModalOpen(false)
  }

  const handlePreviewNote = (note: Note) => {
    setSelectedNote(note)
    setIsPreviewModalOpen(true)
  }

  const handleEditNote = (note: Note) => {
    // TODO: Implement edit functionality
    console.log('Edit note:', note)
  }

  const handleArchiveNote = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId))
  }

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(filteredNotes, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'notes-export.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
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
                  <motion.div 
                    className="flex h-[calc(100vh-8rem)] bg-background"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    <div className="flex-1 flex flex-col min-h-0">
                      <motion.div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">Notes ({filteredNotes.length})</h2>
                      </motion.div>

                      <NotesHeader
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        onCreateNote={() => setIsCreationModalOpen(true)}
                        onExportJSON={handleExportJSON}
                        stats={stats}
                        showFilters={showFilters}
                        onToggleFilters={() => setShowFilters(!showFilters)}
                        currentView={currentView}
                        onViewChange={setCurrentView}
                      />

                      <NotesFilters
                        isOpen={showFilters}
                        filters={filters}
                        onFiltersChange={setFilters}
                        clients={clients}
                        jobs={jobs}
                        candidates={candidates}
                        notes={notes}
                      />

                      {currentView === 'cards' ? (
                        <NotesCardView
                          notes={filteredNotes}
                          clients={clients}
                          jobs={jobs}
                          candidates={candidates}
                          onPreview={handlePreviewNote}
                          onEdit={handleEditNote}
                          onArchive={handleArchiveNote}
                        />
                      ) : (
                        <NotesTable
                          notes={filteredNotes}
                          clients={clients}
                          jobs={jobs}
                          candidates={candidates}
                          onPreview={handlePreviewNote}
                          onEdit={handleEditNote}
                          onArchive={handleArchiveNote}
                        />
                      )}
                    </div>
                  </motion.div>

                  <NoteCreationModal
                    isOpen={isCreationModalOpen}
                    onClose={() => setIsCreationModalOpen(false)}
                    onCreateNote={handleCreateNote}
                    clients={clients}
                    jobs={jobs}
                    candidates={candidates}
                  />

                  <NotePreviewModal
                    isOpen={isPreviewModalOpen}
                    onClose={() => setIsPreviewModalOpen(false)}
                    note={selectedNote}
                    clients={clients}
                    jobs={jobs}
                    candidates={candidates}
                    onEdit={handleEditNote}
                    onArchive={handleArchiveNote}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </main>
    </div>
  )
}
