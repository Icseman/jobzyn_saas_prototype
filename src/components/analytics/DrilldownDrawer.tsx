import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  X, 
  Download, 
  ExternalLink,
  Eye,
  FileText,
  Users,
  Calendar,
  Briefcase
} from 'lucide-react'

interface DrilldownData {
  type: string
  title: string
  summary: string
  data: any[]
  columns: Array<{
    key: string
    label: string
    type: 'text' | 'number' | 'date' | 'badge' | 'action'
  }>
  actions: Array<{
    label: string
    icon: React.ReactNode
    onClick: () => void
  }>
}

interface DrilldownDrawerProps {
  isOpen: boolean
  onClose: () => void
  data: DrilldownData | null
}

export const DrilldownDrawer: React.FC<DrilldownDrawerProps> = ({
  isOpen,
  onClose,
  data
}) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const renderCellValue = (value: any, column: any) => {
    switch (column.type) {
      case 'number':
        return formatNumber(value)
      case 'date':
        return formatDate(value)
      case 'badge':
        return (
          <Badge variant="outline">
            {typeof value === 'object' ? value.label || value.value : value}
          </Badge>
        )
      case 'action':
        return (
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        )
      default:
        return value
    }
  }

  if (!data) return null

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {getTypeIcon(data.type)}
            {data.title}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Summary */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-muted-foreground">{data.summary}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {data.actions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={action.onClick}
                className="flex items-center gap-2"
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {/* Export functionality */}}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>

          {/* Data Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  {data.columns.map((column) => (
                    <TableHead key={column.key}>{column.label}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.map((row, index) => (
                  <TableRow key={index}>
                    {data.columns.map((column) => (
                      <TableCell key={column.key}>
                        {renderCellValue(row[column.key], column)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Quick Actions */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="ghost" size="sm" className="justify-start">
                <FileText className="h-4 w-4 mr-2" />
                View Details
              </Button>
              <Button variant="ghost" size="sm" className="justify-start">
                <Users className="h-4 w-4 mr-2" />
                View Related
              </Button>
              <Button variant="ghost" size="sm" className="justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Follow-up
              </Button>
              <Button variant="ghost" size="sm" className="justify-start">
                <Briefcase className="h-4 w-4 mr-2" />
                Create Task
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

const getTypeIcon = (type: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    'stage': <Users className="h-5 w-5" />,
    'job': <Briefcase className="h-5 w-5" />,
    'owner': <Users className="h-5 w-5" />,
    'client': <FileText className="h-5 w-5" />,
    'source': <ExternalLink className="h-5 w-5" />,
    'breaches': <AlertTriangle className="h-5 w-5" />,
    'aging': <Calendar className="h-5 w-5" />,
    'status': <Badge className="h-5 w-5" />,
    'priority': <AlertTriangle className="h-5 w-5" />,
    'pool': <Users className="h-5 w-5" />,
    'timeToFill': <Calendar className="h-5 w-5" />,
    'jobs': <Briefcase className="h-5 w-5" />,
    'external': <ExternalLink className="h-5 w-5" />,
    'calendar': <Calendar className="h-5 w-5" />,
    'type': <Users className="h-5 w-5" />,
    'noShow': <AlertTriangle className="h-5 w-5" />,
    'latency': <Calendar className="h-5 w-5" />,
    'rooms': <FileText className="h-5 w-5" />,
    'notes': <FileText className="h-5 w-5" />,
    'jobNotes': <FileText className="h-5 w-5" />,
    'clientNotes': <FileText className="h-5 w-5" />,
    'mentions': <Users className="h-5 w-5" />,
    'attachments': <FileText className="h-5 w-5" />,
    'consent': <Shield className="h-5 w-5" />,
    'missingFields': <AlertTriangle className="h-5 w-5" />,
    'posting': <FileText className="h-5 w-5" />,
    'audit': <AlertTriangle className="h-5 w-5" />,
    'export': <Download className="h-5 w-5" />
  }
  return icons[type] || <FileText className="h-5 w-5" />
}
