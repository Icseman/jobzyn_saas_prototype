import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Edit, 
  Archive, 
  Copy, 
  Calendar, 
  User, 
  Building2, 
  Briefcase, 
  FileText, 
  Eye,
  Download,
  ExternalLink
} from 'lucide-react'
import { Note, Client, Job, Candidate } from './NotesPage'
import { 
  modalVariants, 
  overlayVariants, 
  staggerContainer, 
  staggerItem, 
  buttonVariants,
  tagVariants,
  viewTransitionVariants
} from './animations'

interface NotePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  note: Note | null
  clients: Client[]
  jobs: Job[]
  candidates: Candidate[]
  onEdit: (note: Note) => void
  onArchive: (noteId: string) => void
}

export const NotePreviewModal: React.FC<NotePreviewModalProps> = ({
  isOpen,
  onClose,
  note,
  clients,
  jobs,
  candidates,
  onEdit,
  onArchive
}) => {
  const [activeTab, setActiveTab] = useState('overview')

  if (!note) return null

  const getClientName = (clientId: string | null) => {
    if (!clientId) return null
    return clients.find(client => client.id === clientId)
  }

  const getJobTitle = (jobId: string | null) => {
    if (!jobId) return null
    return jobs.find(job => job.id === jobId)
  }

  const getCandidateName = (candidateId: string | null) => {
    if (!candidateId) return null
    return candidates.find(candidate => candidate.id === candidateId)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
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

  const handleDuplicate = () => {
    // TODO: Implement duplicate functionality
    console.log('Duplicate note:', note)
  }

  const handleDownloadAttachment = (attachment: any) => {
    // TODO: Implement download functionality
    console.log('Download attachment:', attachment)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="max-w-3xl overflow-y-auto">
        <SheetHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <SheetTitle className="text-left">{note.title}</SheetTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={getVisibilityColor(note.visibility)}>
                    {note.visibility}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(note.createdAt)}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(note)}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={handleDuplicate}>
                <Copy className="h-4 w-4 mr-1" />
                Duplicate
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onArchive(note.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Archive className="h-4 w-4 mr-1" />
                Archive
              </Button>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="relationships">Relationships</TabsTrigger>
              <TabsTrigger value="attachments">Attachments</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {/* Owner Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Owner Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={note.owner.avatar} alt={note.owner.name} />
                      <AvatarFallback>
                        {note.owner.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{note.owner.name}</div>
                      {note.owner.id !== note.creator.id && (
                        <div className="text-sm text-muted-foreground">
                          Created by {note.creator.name}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-wrap">{note.content}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {note.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Timestamps */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Timestamps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Created</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(note.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Last Updated</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(note.updatedAt)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="relationships" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Entities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Client */}
                  {note.related.clientId && (
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="font-medium">Client</div>
                        <div className="text-sm text-muted-foreground">
                          {getClientName(note.related.clientId)?.name}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  {/* Job */}
                  {note.related.jobId && (
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <Briefcase className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="font-medium">Job</div>
                        <div className="text-sm text-muted-foreground">
                          {getJobTitle(note.related.jobId)?.title}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  {/* Candidate */}
                  {note.related.candidateId && (
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="font-medium">Candidate</div>
                        <div className="text-sm text-muted-foreground">
                          {getCandidateName(note.related.candidateId)?.name}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  {!note.related.clientId && !note.related.jobId && !note.related.candidateId && (
                    <div className="text-center py-8 text-muted-foreground">
                      No related entities
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attachments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Attachments</CardTitle>
                </CardHeader>
                <CardContent>
                  {note.attachments.length > 0 ? (
                    <div className="space-y-3">
                      {note.attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{attachment.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {formatFileSize(attachment.size)} • {attachment.type}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDownloadAttachment(attachment)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No attachments
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Created Activity */}
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <div className="font-medium">Note created</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(note.createdAt)}
                        </div>
                      </div>
                    </div>

                    {/* Updated Activity */}
                    {note.updatedAt !== note.createdAt && (
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <div className="font-medium">Note updated</div>
                          <div className="text-sm text-muted-foreground">
                            {formatDate(note.updatedAt)}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Future: Comments, mentions, etc. */}
                    <div className="text-center py-4 text-muted-foreground">
                      No additional activity
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  )
}
