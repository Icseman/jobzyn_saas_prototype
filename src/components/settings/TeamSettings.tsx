import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { 
  Users, 
  Plus, 
  Mail, 
  Shield, 
  Crown,
  UserPlus,
  Settings,
  Trash2,
  Edit3,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react'

const TeamSettings: React.FC = () => {
  const [teamMembers] = useState([
    {
      id: '1',
      name: 'Salma Bennani',
      email: 'salma.bennani@jobzyn.com',
      role: 'Admin',
      status: 'active',
      lastActive: '2 minutes ago',
      avatar: '/src/Assets/salma.jpeg'
    },
    {
      id: '2',
      name: 'Youssef El Mansouri',
      email: 'youssef.mansouri@jobzyn.com',
      role: 'Recruiter',
      status: 'active',
      lastActive: '1 hour ago',
      avatar: null
    },
    {
      id: '3',
      name: 'Fatima Zahra',
      email: 'fatima.zahra@jobzyn.com',
      role: 'Sourcer',
      status: 'pending',
      lastActive: 'Never',
      avatar: null
    },
    {
      id: '4',
      name: 'Omar Benjelloun',
      email: 'omar.benjelloun@jobzyn.com',
      role: 'Recruiter',
      status: 'active',
      lastActive: '3 hours ago',
      avatar: null
    }
  ])

  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('recruiter')

  const roles = [
    { id: 'admin', name: 'Admin', description: 'Full access to all features and settings' },
    { id: 'recruiter', name: 'Recruiter', description: 'Manage jobs and candidates' },
    { id: 'sourcer', name: 'Sourcer', description: 'Find and source candidates' },
    { id: 'viewer', name: 'Viewer', description: 'Read-only access to data' }
  ]

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin': return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950'
      case 'recruiter': return 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950'
      case 'sourcer': return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950'
      case 'viewer': return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950'
      default: return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950'
      case 'pending': return 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950'
      case 'inactive': return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950'
      default: return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950'
    }
  }

  const handleInvite = () => {
    console.log('Inviting:', inviteEmail, inviteRole)
    setInviteEmail('')
    setInviteRole('recruiter')
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Team & Permissions</h2>
          <p className="text-muted-foreground">Manage team members and access permissions</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Crown className="h-3 w-3" />
            Admin
          </Badge>
        </div>
      </div>

      <Separator />

      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Total Members</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">{teamMembers.length} people</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Active</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400">
                  {teamMembers.filter(m => m.status === 'active').length} members
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 dark:bg-orange-950 rounded-lg">
                <Clock className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Pending</p>
                <p className="text-xs text-orange-600 dark:text-orange-400">
                  {teamMembers.filter(m => m.status === 'pending').length} invites
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 dark:bg-purple-950 rounded-lg">
                <Shield className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Admins</p>
                <p className="text-xs text-purple-600 dark:text-purple-400">
                  {teamMembers.filter(m => m.role.toLowerCase() === 'admin').length} members
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invite Team Member */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Invite Team Member
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="invite-email">Email Address</Label>
              <Input
                id="invite-email"
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="colleague@company.com"
              />
            </div>
            <div>
              <Label htmlFor="invite-role">Role</Label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      <div>
                        <div className="font-medium">{role.name}</div>
                        <div className="text-sm text-muted-foreground">{role.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleInvite} className="w-full gap-2" disabled={!inviteEmail}>
                <Mail className="h-4 w-4" />
                Send Invite
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.avatar || undefined} />
                    <AvatarFallback>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{member.name}</h3>
                      <Badge variant="outline" className={`text-xs ${getRoleColor(member.role)}`}>
                        {member.role}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${getStatusColor(member.status)}`}>
                        {member.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                    <p className="text-xs text-muted-foreground">Last active: {member.lastActive}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Edit3 className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Settings className="h-4 w-4" />
                    Permissions
                  </Button>
                  {member.role.toLowerCase() !== 'admin' && (
                    <Button variant="outline" size="sm" className="gap-2 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role Permissions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Role Permissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {roles.map((role) => (
              <div key={role.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-medium">{role.name}</h3>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </div>
                  <Badge variant="outline" className={getRoleColor(role.name)}>
                    {role.name}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span>View Jobs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span>Manage Candidates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {role.id === 'admin' || role.id === 'recruiter' ? (
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-gray-400" />
                    )}
                    <span>Create Jobs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {role.id === 'admin' ? (
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-gray-400" />
                    )}
                    <span>Team Settings</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">
          Export Team Data
        </Button>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Advanced Settings
        </Button>
      </div>
    </div>
  )
}

export default TeamSettings

