import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Eye, Edit, Archive, MoreHorizontal, FileText, Calendar, User, Building2, Briefcase } from 'lucide-react'
import { Note, Client, Job, Candidate } from './NotesPage'
import { 
  gridVariants, 
  gridItemVariants, 
  noteCardVariants, 
  buttonVariants, 
  tagVariants 
} from './animations'

interface NotesCardViewProps {
  notes: Note[]
  clients: Client[]
  jobs: Job[]
  candidates: Candidate[]
  onPreview: (note: Note) => void
  onEdit: (note: Note) => void
  onArchive: (noteId: string) => void
}

export const NotesCardView: React.FC<NotesCardViewProps> = ({
  notes,
  clients,
  jobs,
  candidates,
  onPreview,
  onEdit,
  onArchive
}) => {
  const getClientName = (clientId: string | null) => {
    if (!clientId) return null
    return clients.find(client => client.id === clientId)?.name
  }

  const getJobTitle = (jobId: string | null) => {
    if (!jobId) return null
    return jobs.find(job => job.id === jobId)?.title
  }

  const getCandidateName = (candidateId: string | null) => {
    if (!candidateId) return null
    return candidates.find(candidate => candidate.id === candidateId)?.name
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getPreviewContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  }

  const getVisibilityColor = (visibility: string) => {
    switch (visibility) {
      case 'private':
        return 'bg-red-100 text-red-800'
      case 'team':
        return 'bg-blue-100 text-blue-800'
      case 'public':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No notes found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      variants={gridVariants}
      initial="initial"
      animate="animate"
    >
      {notes.map((note, index) => (
        <motion.div
          key={note.id}
          variants={gridItemVariants}
          transition={{ delay: index * 0.05 }}
        >
          <Card 
            className="hover:shadow-md transition-shadow h-full"
            whileHover="hover"
            variants={noteCardVariants}
          >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm leading-tight mb-1 line-clamp-2">
                    {note.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <motion.div variants={tagVariants}>
                      <Badge className={getVisibilityColor(note.visibility)}>
                        {note.visibility}
                      </Badge>
                    </motion.div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {formatDate(note.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onPreview(note)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit(note)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onArchive(note.id)}
                    className="text-red-600"
                  >
                    <Archive className="h-4 w-4 mr-2" />
                    Archive
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="space-y-3">
              {/* Content Preview */}
              <p className="text-sm text-muted-foreground line-clamp-3">
                {getPreviewContent(note.content)}
              </p>

              {/* Owner */}
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={note.owner.avatar} alt={note.owner.name} />
                  <AvatarFallback className="text-xs">
                    {note.owner.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{note.owner.name}</p>
                  {note.owner.id !== note.creator.id && (
                    <p className="text-xs text-muted-foreground truncate">
                      Created by {note.creator.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Related Entities */}
              {(note.related.clientId || note.related.jobId || note.related.candidateId) && (
                <div className="space-y-1">
                  {note.related.clientId && (
                    <div className="flex items-center gap-2 text-xs">
                      <Building2 className="h-3 w-3 text-muted-foreground" />
                      <span className="font-medium">{getClientName(note.related.clientId)}</span>
                    </div>
                  )}
                  {note.related.jobId && (
                    <div className="flex items-center gap-2 text-xs">
                      <Briefcase className="h-3 w-3 text-muted-foreground" />
                      <span>{getJobTitle(note.related.jobId)}</span>
                    </div>
                  )}
                  {note.related.candidateId && (
                    <div className="flex items-center gap-2 text-xs">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span>{getCandidateName(note.related.candidateId)}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Tags */}
              {note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {note.tags.slice(0, 3).map((tag, tagIndex) => (
                    <motion.div
                      key={tag}
                      variants={tagVariants}
                      transition={{ delay: tagIndex * 0.05 }}
                    >
                      <Badge variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    </motion.div>
                  ))}
                  {note.tags.length > 3 && (
                    <motion.div variants={tagVariants}>
                      <Badge variant="outline" className="text-xs">
                        +{note.tags.length - 3}
                      </Badge>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Attachments */}
              {note.attachments.length > 0 && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <FileText className="h-3 w-3" />
                  {note.attachments.length} attachment{note.attachments.length > 1 ? 's' : ''}
                </div>
              )}

              {/* Last Updated */}
              <div className="flex items-center gap-1 text-xs text-muted-foreground pt-2 border-t">
                <Calendar className="h-3 w-3" />
                Updated {formatDate(note.updatedAt)}
              </div>
            </div>
          </CardContent>
        </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
