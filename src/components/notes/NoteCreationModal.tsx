import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Upload, X, Plus, Save, FileText, User, Building2, Briefcase } from 'lucide-react'
import { Note, Client, Job, Candidate } from './NotesPage'
import { 
  modalVariants, 
  overlayVariants, 
  staggerContainer, 
  staggerItem, 
  buttonVariants,
  tagVariants
} from './animations'

interface NoteCreationModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateNote: (note: Partial<Note>) => void
  clients: Client[]
  jobs: Job[]
  candidates: Candidate[]
}

export const NoteCreationModal: React.FC<NoteCreationModalProps> = ({
  isOpen,
  onClose,
  onCreateNote,
  clients,
  jobs,
  candidates
}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    clientId: '',
    jobId: '',
    candidateId: '',
    tags: [] as string[],
    visibility: 'team' as 'private' | 'team' | 'public',
    attachments: [] as Array<{ id: string; name: string; url: string; type: string; size: number }>
  })

  const [newTag, setNewTag] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles(prev => [...prev, ...files])
    
    // Add to form data
    const newAttachments = files.map(file => ({
      id: `file-${Date.now()}-${Math.random()}`,
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
      size: file.size
    }))
    
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments]
    }))
  }

  const handleRemoveFile = (fileId: string) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter(file => file.id !== fileId)
    }))
    setUploadedFiles(prev => prev.filter((_, index) => 
      formData.attachments.findIndex(f => f.id === fileId) !== index
    ))
  }

  const handleSubmit = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      return
    }

    const noteData: Partial<Note> = {
      title: formData.title,
      content: formData.content,
      related: {
        clientId: formData.clientId === 'none' ? null : formData.clientId,
        jobId: formData.jobId === 'none' ? null : formData.jobId,
        candidateId: formData.candidateId === 'none' ? null : formData.candidateId
      },
      tags: formData.tags,
      visibility: formData.visibility,
      attachments: formData.attachments,
      owner: {
        id: 'user-123',
        name: 'Anwar Bahou',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      },
      creator: {
        id: 'user-123',
        name: 'Anwar Bahou',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      }
    }

    onCreateNote(noteData)
    handleClose()
  }

  const handleClose = () => {
    setFormData({
      title: '',
      content: '',
      clientId: '',
      jobId: '',
      candidateId: '',
      tags: [],
      visibility: 'team',
      attachments: []
    })
    setNewTag('')
    setUploadedFiles([])
    onClose()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Create New Note</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Note Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Note Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter note title..."
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  placeholder="Write your note content here..."
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="visibility">Visibility</Label>
                <Select
                  value={formData.visibility}
                  onValueChange={(value) => handleInputChange('visibility', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="team">Team</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Relationships Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Relationships
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Select
                  value={formData.clientId}
                  onValueChange={(value) => handleInputChange('clientId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a client (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No client</SelectItem>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        <div className="flex items-center gap-2">
                          <img src={client.logo} alt={client.name} className="w-4 h-4" />
                          {client.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="job">Job</Label>
                <Select
                  value={formData.jobId}
                  onValueChange={(value) => handleInputChange('jobId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a job (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No job</SelectItem>
                    {jobs.map((job) => (
                      <SelectItem key={job.id} value={job.id}>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          {job.title}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="candidate">Candidate</Label>
                <Select
                  value={formData.candidateId}
                  onValueChange={(value) => handleInputChange('candidateId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a candidate (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No candidate</SelectItem>
                    {candidates.map((candidate) => (
                      <SelectItem key={candidate.id} value={candidate.id}>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {candidate.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tags and Attachments Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Tags & Attachments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <Button onClick={handleAddTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => handleRemoveTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="attachments">Attachments</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload files or drag and drop
                      </p>
                    </div>
                  </label>
                </div>
                {formData.attachments.length > 0 && (
                  <div className="space-y-2">
                    {formData.attachments.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFile(file.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!formData.title.trim() || !formData.content.trim()}>
              <Save className="h-4 w-4 mr-2" />
              Create Note
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
