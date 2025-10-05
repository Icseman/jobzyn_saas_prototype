import React from 'react'
import { motion } from 'framer-motion'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Eye, Edit, Archive, MoreHorizontal, FileText, Calendar, User } from 'lucide-react'
import { Note, Client, Job, Candidate } from './NotesPage'
import { 
  staggerContainer, 
  tableRowVariants, 
  buttonVariants, 
  tagVariants 
} from './animations'

interface NotesTableProps {
  notes: Note[]
  clients: Client[]
  jobs: Job[]
  candidates: Candidate[]
  onPreview: (note: Note) => void
  onEdit: (note: Note) => void
  onArchive: (noteId: string) => void
}

export const NotesTable: React.FC<NotesTableProps> = ({
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

  const getPreviewContent = (content: string, maxLength: number = 100) => {
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
      className="rounded-md border"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Note</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Related Entity</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Visibility</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notes.map((note, index) => (
            <motion.tr 
              key={note.id} 
              className="hover:bg-muted/50"
              variants={tableRowVariants}
              whileHover="hover"
              transition={{ delay: index * 0.05 }}
            >
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium">{note.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {getPreviewContent(note.content)}
                  </div>
                  {note.attachments.length > 0 && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <FileText className="h-3 w-3" />
                      {note.attachments.length} attachment{note.attachments.length > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={note.owner.avatar} alt={note.owner.name} />
                    <AvatarFallback>
                      {note.owner.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{note.owner.name}</div>
                    {note.owner.id !== note.creator.id && (
                      <div className="text-xs text-muted-foreground">
                        Created by {note.creator.name}
                      </div>
                    )}
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="space-y-1">
                  {note.related.clientId && (
                    <div className="flex items-center gap-1 text-sm">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span className="font-medium">{getClientName(note.related.clientId)}</span>
                    </div>
                  )}
                  {note.related.jobId && (
                    <div className="flex items-center gap-1 text-sm">
                      <FileText className="h-3 w-3 text-muted-foreground" />
                      <span>{getJobTitle(note.related.jobId)}</span>
                    </div>
                  )}
                  {note.related.candidateId && (
                    <div className="flex items-center gap-1 text-sm">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span>{getCandidateName(note.related.candidateId)}</span>
                    </div>
                  )}
                  {!note.related.clientId && !note.related.jobId && !note.related.candidateId && (
                    <span className="text-muted-foreground text-sm">No related entity</span>
                  )}
                </div>
              </TableCell>

              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {note.tags.slice(0, 2).map((tag, tagIndex) => (
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
                  {note.tags.length > 2 && (
                    <motion.div variants={tagVariants}>
                      <Badge variant="outline" className="text-xs">
                        +{note.tags.length - 2}
                      </Badge>
                    </motion.div>
                  )}
                </div>
              </TableCell>

              <TableCell>
                <motion.div variants={tagVariants}>
                  <Badge className={getVisibilityColor(note.visibility)}>
                    {note.visibility}
                  </Badge>
                </motion.div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-1 text-sm">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  {formatDate(note.createdAt)}
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-1 text-sm">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  {formatDate(note.updatedAt)}
                </div>
              </TableCell>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm"
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
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  )
}
