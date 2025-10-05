import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { 
  ExternalLink, 
  MapPin, 
  Users, 
  Building2, 
  Mail, 
  Phone, 
  Linkedin,
  Briefcase,
  Plus,
  MessageSquare,
  Archive,
  Edit,
  Upload,
  X,
  FileText
} from "lucide-react"
import { Client } from './ClientsPage'
import { useState } from 'react'

interface ClientPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  client: Client | null
  onEdit: (clientId: string) => void
  onArchive: (clientId: string) => void
}

export const ClientPreviewModal = ({ 
  isOpen, 
  onClose, 
  client, 
  onEdit, 
  onArchive 
}: ClientPreviewModalProps) => {
  const [newComment, setNewComment] = useState('')
  const [commentType, setCommentType] = useState<'general' | 'meeting' | 'call' | 'email'>('general')
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [newMessage, setNewMessage] = useState({
    to: '',
    subject: '',
    content: '',
    type: 'email' as 'email' | 'sms' | 'call' | 'meeting'
  })

  if (!client) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const openJobs = client.jobs.filter(job => job.status === 'open')
  const totalJobs = client.jobs.length

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: `comment-${Date.now()}`,
        author: client.owner.name,
        content: newComment.trim(),
        timestamp: new Date().toISOString(),
        type: commentType
      }
      // In a real app, this would update the client data via API
      console.log('Adding comment:', comment)
      setNewComment('')
    }
  }

  const handleRemoveComment = (commentId: string) => {
    // In a real app, this would remove the comment via API
    console.log('Removing comment:', commentId)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles(prev => [...prev, ...files])
    // In a real app, this would upload files via API
    console.log('Uploading files:', files)
  }

  const handleRemoveFile = (fileId: string) => {
    // In a real app, this would remove the file via API
    console.log('Removing file:', fileId)
  }

  const handleAddMessage = () => {
    if (newMessage.to.trim() && newMessage.subject.trim() && newMessage.content.trim()) {
      const message = {
        id: `msg-${Date.now()}`,
        from: client.owner.name,
        to: newMessage.to.trim(),
        subject: newMessage.subject.trim(),
        content: newMessage.content.trim(),
        timestamp: new Date().toISOString(),
        type: newMessage.type,
        status: 'sent' as const
      }
      // In a real app, this would send the message via API
      console.log('Sending message:', message)
      setNewMessage({
        to: '',
        subject: '',
        content: '',
        type: 'email'
      })
    }
  }

  const handleRemoveMessage = (messageId: string) => {
    // In a real app, this would remove the message via API
    console.log('Removing message:', messageId)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              {client.logo ? (
                <img 
                  src={client.logo} 
                  alt={`${client.name} logo`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextElementSibling.style.display = 'flex'
                  }}
                />
              ) : null}
              <div className="w-full h-full flex items-center justify-center" style={{ display: client.logo ? 'none' : 'flex' }}>
                <Building2 className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
            <div>
              <div className="text-xl font-bold">{client.name}</div>
              <div className="text-sm text-muted-foreground">{client.industry}</div>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
              <a 
                href={client.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {client.website}
              </a>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(client.id)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Job
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  onArchive(client.id)
                  onClose()
                }}
                className="text-red-600 hover:text-red-700"
              >
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </Button>
            </div>
          </div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="jobs">Jobs</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              {/* Overview Section */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{client.location.city}, {client.location.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{client.size} employees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Owner: {client.owner.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{openJobs.length} open jobs</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {client.tags.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {client.tags.map(tag => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes Section */}
              {client.notes && (
                <div>
                  <h3 className="font-semibold mb-3">Notes</h3>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">{client.notes}</p>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Jobs Tab */}
            <TabsContent value="jobs" className="space-y-4">
              <div>
                <h3 className="font-semibold mb-3">Jobs ({totalJobs})</h3>
                <div className="space-y-3">
                  {client.jobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{job.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getStatusColor(job.status)}>
                              {job.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {job.openingsFilled}/{job.openingsTotal} filled
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{job.openingsTotal} openings</div>
                          <div className="text-xs text-muted-foreground">
                            {job.openingsFilled} filled
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {client.jobs.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Briefcase className="h-8 w-8 mx-auto mb-2" />
                      <p>No jobs found for this client</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-4">
              <div>
                <h3 className="font-semibold mb-3">Contact Information</h3>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">{client.contact.name}</h4>
                      <p className="text-sm text-muted-foreground">{client.contact.title}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a 
                          href={`mailto:${client.contact.email}`}
                          className="text-sm text-primary hover:underline"
                        >
                          {client.contact.email}
                        </a>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a 
                          href={`tel:${client.contact.phone}`}
                          className="text-sm text-primary hover:underline"
                        >
                          {client.contact.phone}
                        </a>
                      </div>
                      
                      {client.contact.linkedin && (
                        <div className="flex items-center gap-2">
                          <Linkedin className="h-4 w-4 text-muted-foreground" />
                          <a 
                            href={client.contact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline"
                          >
                            LinkedIn Profile
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Comments Tab */}
            <TabsContent value="comments" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Add Comment</Label>
                  <div className="flex gap-2">
                    <Select value={commentType} onValueChange={(value: any) => setCommentType(value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="call">Call</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1"
                    />
                    <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                      Add
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Comments ({client.comments.length})</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {client.comments.map(comment => (
                      <div key={comment.id} className="p-3 border rounded-lg bg-muted/30">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {comment.type}
                            </Badge>
                            <span className="text-sm font-medium">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(comment.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveComment(comment.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    ))}
                    {client.comments.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No comments yet. Add one above to get started.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Files Tab */}
            <TabsContent value="files" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Upload Files</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                    <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop files here, or click to select
                    </p>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                      Choose Files
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Files ({client.files.length})</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {client.files.map(file => (
                      <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(file.size / 1024).toFixed(1)} KB • {file.uploadedBy}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFile(file.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    {client.files.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No files uploaded yet. Upload some files above to get started.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Send Message</Label>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="messageTo">To</Label>
                        <Input
                          id="messageTo"
                          value={newMessage.to}
                          onChange={(e) => setNewMessage(prev => ({ ...prev, to: e.target.value }))}
                          placeholder="Recipient email/phone"
                        />
                      </div>
                      <div>
                        <Label htmlFor="messageType">Type</Label>
                        <Select value={newMessage.type} onValueChange={(value: any) => setNewMessage(prev => ({ ...prev, type: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="sms">SMS</SelectItem>
                            <SelectItem value="call">Call</SelectItem>
                            <SelectItem value="meeting">Meeting</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="messageSubject">Subject</Label>
                      <Input
                        id="messageSubject"
                        value={newMessage.subject}
                        onChange={(e) => setNewMessage(prev => ({ ...prev, subject: e.target.value }))}
                        placeholder="Message subject"
                      />
                    </div>
                    <div>
                      <Label htmlFor="messageContent">Content</Label>
                      <Textarea
                        id="messageContent"
                        value={newMessage.content}
                        onChange={(e) => setNewMessage(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Message content..."
                        rows={3}
                      />
                    </div>
                    <Button 
                      onClick={handleAddMessage} 
                      disabled={!newMessage.to.trim() || !newMessage.subject.trim() || !newMessage.content.trim()}
                    >
                      Send Message
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Message History ({client.messages.length})</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {client.messages.map(message => (
                      <div key={message.id} className="p-3 border rounded-lg bg-muted/30">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {message.type}
                            </Badge>
                            <span className="text-sm font-medium">{message.from} → {message.to}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(message.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveMessage(message.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-sm font-medium mb-1">{message.subject}</p>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    ))}
                    {client.messages.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No messages yet. Send one above to get started.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  )
}
