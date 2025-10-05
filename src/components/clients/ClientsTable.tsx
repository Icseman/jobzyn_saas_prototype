import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  ExternalLink, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Archive,
  Phone,
  Mail,
  MapPin,
  Building2
} from "lucide-react"
import { Client } from './ClientsPage'
import { 
  staggerContainer, 
  staggerItem, 
  tableRowVariants, 
  buttonVariants,
  iconVariants
} from './animations'

interface ClientsTableProps {
  clients: Client[]
  onPreview: (client: Client) => void
  onEdit: (clientId: string) => void
  onArchive: (clientId: string) => void
}

export const ClientsTable = ({ clients, onPreview, onEdit, onArchive }: ClientsTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-orange-100 text-orange-800'
      case 'closed': return 'bg-orange-400 text-orange-800'
      case 'draft': return 'bg-orange-200 text-orange-800'
      default: return 'bg-orange-400 text-orange-800'
    }
  }

  const getJobCounts = (jobs: Client['jobs']) => {
    const openJobs = jobs.filter(job => job.status === 'open').length
    const totalJobs = jobs.length
    return { openJobs, totalJobs }
  }

  return (
    <motion.div 
      className="bg-card rounded-lg border"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Company</TableHead>
              <TableHead className="w-[120px]">Industry</TableHead>
              <TableHead className="w-[150px]">Location</TableHead>
              <TableHead className="w-[120px]">Jobs</TableHead>
              <TableHead className="w-[200px]">Contact Person</TableHead>
              <TableHead className="w-[120px]">Owner</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client, index) => {
              const { openJobs, totalJobs } = getJobCounts(client.jobs)
              
              return (
                <motion.tr 
                  key={client.id} 
                  className="hover:bg-muted/50"
                  variants={tableRowVariants}
                  whileHover="hover"
                  transition={{ delay: index * 0.05 }}
                >
                  {/* Company */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <motion.div 
                        className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center overflow-hidden"
                        variants={iconVariants}
                        whileHover="hover"
                      >
                        {client.logo ? (
                          <img 
                            src={client.logo} 
                            alt={`${client.name} logo`}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              console.log(`Failed to load logo for ${client.name}:`, client.logo)
                              e.currentTarget.style.display = 'none'
                              e.currentTarget.nextElementSibling.style.display = 'flex'
                            }}
                            onLoad={() => {
                              console.log(`Successfully loaded logo for ${client.name}`)
                            }}
                          />
                        ) : null}
                        <div className="w-full h-full flex items-center justify-center" style={{ display: client.logo ? 'none' : 'flex' }}>
                          <Building2 className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </motion.div>
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <ExternalLink className="h-3 w-3" />
                          <a 
                            href={client.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {client.website.replace('https://', '')}
                          </a>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Industry */}
                  <TableCell>
                    <Badge variant="secondary">{client.industry}</Badge>
                  </TableCell>

                  {/* Location */}
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span>{client.location.city}, {client.location.country}</span>
                    </div>
                  </TableCell>

                  {/* Jobs */}
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{openJobs} open</div>
                      <div className="text-muted-foreground">{totalJobs} total</div>
                    </div>
                  </TableCell>

                  {/* Contact Person */}
                  <TableCell>
                    <div>
                      <div className="font-medium text-sm">{client.contact.name}</div>
                      <div className="text-xs text-muted-foreground">{client.contact.title}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Mail className="h-3 w-3" />
                        <span>{client.contact.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span>{client.contact.phone}</span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Owner */}
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{client.owner.name}</div>
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onPreview(client)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(client.id)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onArchive(client.id)}
                          className="text-orange-600"
                        >
                          <Archive className="h-4 w-4 mr-2" />
                          Archive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              )
            })}
          </TableBody>
        </Table>
      </div>
      
      {clients.length === 0 && (
        <motion.div 
          className="text-center py-12"
          variants={staggerItem}
        >
          <motion.div variants={iconVariants} whileHover="hover">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          </motion.div>
          <h3 className="text-lg font-medium mb-2">No clients found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
        </motion.div>
      )}
    </motion.div>
  )
}
