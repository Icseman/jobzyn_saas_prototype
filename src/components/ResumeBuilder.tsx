import React, { useState, useEffect, useRef, useCallback } from 'react'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus, GripVertical, Trash2, Download, Edit, FileText, GraduationCap, Briefcase, User, Star, ZoomIn, ZoomOut, RotateCcw, Users, Search, Palette as PaletteIcon, Grid3X3, Upload, X } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'

interface BlockData {
  id: string
  type: 'header' | 'summary' | 'experience' | 'education' | 'skills'
  data: any
}

interface ResumeData {
  id: string
  templateId: string
  blocks: BlockData[]
  updatedAt: string
}

interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  location: string
  linkedin?: string
  title: string
  summary: string
  experience: Array<{
    id: string
    title: string
    company: string
    period: string
    description: string
  }>
  education: Array<{
    id: string
    degree: string
    school: string
    period: string
  }>
  skills: string[]
}

interface CanvasState {
  zoom: number
  panX: number
  panY: number
  isDragging: boolean
  lastMouseX: number
  lastMouseY: number
  backgroundColor: string
  showGrid: boolean
}

const templates = {
  casablanca: {
    name: 'Casablanca',
    city: 'Casablanca',
    description: 'Modern business style inspired by Morocco\'s economic capital',
    styles: {
      container: 'max-w-2xl mx-auto p-8 bg-white text-gray-900',
      header: 'text-center mb-8',
      name: 'text-3xl font-bold text-blue-900 mb-2',
      title: 'text-xl text-blue-600 mb-3',
      contact: 'text-sm text-gray-600 space-x-6',
      section: 'mb-6',
      sectionTitle: 'text-xl font-bold text-blue-900 mb-3 border-l-4 border-blue-500 pl-3',
      summary: 'text-base text-gray-700 leading-relaxed',
      experience: 'mb-4',
      expHeader: 'flex justify-between items-start mb-2',
      expTitle: 'font-semibold text-gray-900 text-lg',
      expCompany: 'text-base text-blue-600',
      expPeriod: 'text-sm text-gray-500',
      expDesc: 'text-sm text-gray-700 mt-2',
      education: 'mb-4',
      eduHeader: 'flex justify-between items-start mb-2',
      eduDegree: 'font-semibold text-gray-900 text-lg',
      eduSchool: 'text-base text-blue-600',
      eduPeriod: 'text-sm text-gray-500',
      skills: 'flex flex-wrap gap-2',
      skillTag: 'bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm'
    }
  },
  marrakech: {
    name: 'Marrakech',
    city: 'Marrakech',
    description: 'Vibrant and artistic design reflecting the Red City\'s culture',
    styles: {
      container: 'max-w-2xl mx-auto p-6 bg-gradient-to-br from-red-50 to-orange-50 text-gray-900',
      header: 'text-center mb-8',
      name: 'text-3xl font-bold text-red-800 mb-2',
      title: 'text-xl text-orange-600 mb-3',
      contact: 'text-sm text-gray-600 space-x-4',
      section: 'mb-6',
      sectionTitle: 'text-lg font-bold text-red-800 mb-3 border-l-4 border-red-500 pl-3',
      summary: 'text-base text-gray-700 leading-relaxed',
      experience: 'mb-4 bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-300',
      expHeader: 'flex justify-between items-start mb-2',
      expTitle: 'font-semibold text-red-800',
      expCompany: 'text-base text-orange-600',
      expPeriod: 'text-sm text-gray-500',
      expDesc: 'text-sm text-gray-700 mt-2',
      education: 'mb-4 bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-300',
      eduHeader: 'flex justify-between items-start mb-2',
      eduDegree: 'font-semibold text-red-800',
      eduSchool: 'text-base text-orange-600',
      eduPeriod: 'text-sm text-gray-500',
      skills: 'flex flex-wrap gap-2',
      skillTag: 'bg-gradient-to-r from-red-100 to-orange-100 text-red-800 px-3 py-1 rounded-full text-sm'
    }
  },
  rabat: {
    name: 'Rabat',
    city: 'Rabat',
    description: 'Elegant and professional style for the capital city',
    styles: {
      container: 'max-w-2xl mx-auto p-8 bg-white text-gray-900',
      header: 'text-center mb-8',
      name: 'text-3xl font-bold text-gray-800 mb-2',
      title: 'text-xl text-gray-600 mb-3',
      contact: 'text-sm text-gray-500 space-x-6',
      section: 'mb-6',
      sectionTitle: 'text-xl font-bold text-gray-800 mb-3 border-b-2 border-gray-300 pb-2',
      summary: 'text-base text-gray-700 leading-relaxed',
      experience: 'mb-4',
      expHeader: 'flex justify-between items-start mb-2',
      expTitle: 'font-semibold text-gray-900 text-lg',
      expCompany: 'text-base text-gray-600',
      expPeriod: 'text-sm text-gray-500',
      expDesc: 'text-sm text-gray-700 mt-2',
      education: 'mb-4',
      eduHeader: 'flex justify-between items-start mb-2',
      eduDegree: 'font-semibold text-gray-900 text-lg',
      eduSchool: 'text-base text-gray-600',
      eduPeriod: 'text-sm text-gray-500',
      skills: 'flex flex-wrap gap-2',
      skillTag: 'bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm'
    }
  },
  fez: {
    name: 'Fez',
    city: 'Fez',
    description: 'Traditional and sophisticated design inspired by the ancient medina',
    styles: {
      container: 'max-w-2xl mx-auto p-6 bg-gradient-to-br from-amber-50 to-yellow-50 text-gray-900',
      header: 'text-center mb-8',
      name: 'text-3xl font-bold text-amber-800 mb-2',
      title: 'text-xl text-yellow-700 mb-3',
      contact: 'text-sm text-gray-600 space-x-4',
      section: 'mb-6',
      sectionTitle: 'text-lg font-bold text-amber-800 mb-3',
      summary: 'text-base text-gray-700 leading-relaxed italic',
      experience: 'mb-4 bg-white p-4 rounded-lg shadow-sm border border-amber-200',
      expHeader: 'flex justify-between items-start mb-2',
      expTitle: 'font-semibold text-amber-800',
      expCompany: 'text-base text-yellow-700',
      expPeriod: 'text-sm text-gray-500',
      expDesc: 'text-sm text-gray-700 mt-2',
      education: 'mb-4 bg-white p-4 rounded-lg shadow-sm border border-amber-200',
      eduHeader: 'flex justify-between items-start mb-2',
      eduDegree: 'font-semibold text-amber-800',
      eduSchool: 'text-base text-yellow-700',
      eduPeriod: 'text-sm text-gray-500',
      skills: 'flex flex-wrap gap-2',
      skillTag: 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 px-3 py-1 rounded-full text-sm'
    }
  },
  agadir: {
    name: 'Agadir',
    city: 'Agadir',
    description: 'Fresh and coastal style reflecting the beach city\'s vibe',
    styles: {
      container: 'max-w-2xl mx-auto p-6 bg-gradient-to-br from-cyan-50 to-blue-50 text-gray-900',
      header: 'text-center mb-8',
      name: 'text-3xl font-bold text-cyan-800 mb-2',
      title: 'text-xl text-blue-600 mb-3',
      contact: 'text-sm text-gray-600 space-x-4',
      section: 'mb-6',
      sectionTitle: 'text-lg font-bold text-cyan-800 mb-3',
      summary: 'text-base text-gray-700 leading-relaxed',
      experience: 'mb-4 bg-white p-4 rounded-lg shadow-sm',
      expHeader: 'flex justify-between items-start mb-2',
      expTitle: 'font-semibold text-cyan-800',
      expCompany: 'text-base text-blue-600',
      expPeriod: 'text-sm text-gray-500',
      expDesc: 'text-sm text-gray-700 mt-2',
      education: 'mb-4 bg-white p-4 rounded-lg shadow-sm',
      eduHeader: 'flex justify-between items-start mb-2',
      eduDegree: 'font-semibold text-cyan-800',
      eduSchool: 'text-base text-blue-600',
      eduPeriod: 'text-sm text-gray-500',
      skills: 'flex flex-wrap gap-2',
      skillTag: 'bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 px-3 py-1 rounded-full text-sm'
    }
  },
  tangier: {
    name: 'Tangier',
    city: 'Tangier',
    description: 'International and cosmopolitan style for the gateway to Europe',
    styles: {
      container: 'max-w-2xl mx-auto p-8 bg-white text-gray-900',
      header: 'text-center mb-8',
      name: 'text-3xl font-bold text-indigo-900 mb-2',
      title: 'text-xl text-indigo-600 mb-3',
      contact: 'text-sm text-gray-600 space-x-6',
      section: 'mb-6',
      sectionTitle: 'text-xl font-bold text-indigo-900 mb-3 border-l-4 border-indigo-500 pl-3',
      summary: 'text-base text-gray-700 leading-relaxed',
      experience: 'mb-4',
      expHeader: 'flex justify-between items-start mb-2',
      expTitle: 'font-semibold text-gray-900 text-lg',
      expCompany: 'text-base text-indigo-600',
      expPeriod: 'text-sm text-gray-500',
      expDesc: 'text-sm text-gray-700 mt-2',
      education: 'mb-4',
      eduHeader: 'flex justify-between items-start mb-2',
      eduDegree: 'font-semibold text-gray-900 text-lg',
      eduSchool: 'text-base text-indigo-600',
      eduPeriod: 'text-sm text-gray-500',
      skills: 'flex flex-wrap gap-2',
      skillTag: 'bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm'
    }
  },
  meknes: {
    name: 'Meknes',
    city: 'Meknes',
    description: 'Royal and majestic design inspired by the imperial city',
    styles: {
      container: 'max-w-2xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-900',
      header: 'text-center mb-8',
      name: 'text-3xl font-bold text-purple-800 mb-2',
      title: 'text-xl text-indigo-600 mb-3',
      contact: 'text-sm text-gray-600 space-x-4',
      section: 'mb-6',
      sectionTitle: 'text-lg font-bold text-purple-800 mb-3',
      summary: 'text-base text-gray-700 leading-relaxed',
      experience: 'mb-4 bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-300',
      expHeader: 'flex justify-between items-start mb-2',
      expTitle: 'font-semibold text-purple-800',
      expCompany: 'text-base text-indigo-600',
      expPeriod: 'text-sm text-gray-500',
      expDesc: 'text-sm text-gray-700 mt-2',
      education: 'mb-4 bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-300',
      eduHeader: 'flex justify-between items-start mb-2',
      eduDegree: 'font-semibold text-purple-800',
      eduSchool: 'text-base text-indigo-600',
      eduPeriod: 'text-sm text-gray-500',
      skills: 'flex flex-wrap gap-2',
      skillTag: 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 px-3 py-1 rounded-full text-sm'
    }
  },
  ouarzazate: {
    name: 'Ouarzazate',
    city: 'Ouarzazate',
    description: 'Desert-inspired design with warm earth tones',
    styles: {
      container: 'max-w-2xl mx-auto p-6 bg-gradient-to-br from-orange-50 to-amber-50 text-gray-900',
      header: 'text-center mb-8',
      name: 'text-3xl font-bold text-orange-800 mb-2',
      title: 'text-xl text-amber-700 mb-3',
      contact: 'text-sm text-gray-600 space-x-4',
      section: 'mb-6',
      sectionTitle: 'text-lg font-bold text-orange-800 mb-3',
      summary: 'text-base text-gray-700 leading-relaxed',
      experience: 'mb-4 bg-white p-4 rounded-lg shadow-sm border border-orange-200',
      expHeader: 'flex justify-between items-start mb-2',
      expTitle: 'font-semibold text-orange-800',
      expCompany: 'text-base text-amber-700',
      expPeriod: 'text-sm text-gray-500',
      expDesc: 'text-sm text-gray-700 mt-2',
      education: 'mb-4 bg-white p-4 rounded-lg shadow-sm border border-orange-200',
      eduHeader: 'flex justify-between items-start mb-2',
      eduDegree: 'font-semibold text-orange-800',
      eduSchool: 'text-base text-amber-700',
      eduPeriod: 'text-sm text-gray-500',
      skills: 'flex flex-wrap gap-2',
      skillTag: 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 px-3 py-1 rounded-full text-sm'
    }
  },
  chefchaouen: {
    name: 'Chefchaouen',
    city: 'Chefchaouen',
    description: 'Serene blue design inspired by the Blue Pearl of Morocco',
    styles: {
      container: 'max-w-2xl mx-auto p-6 bg-gradient-to-br from-sky-50 to-blue-50 text-gray-900',
      header: 'text-center mb-8',
      name: 'text-3xl font-bold text-sky-800 mb-2',
      title: 'text-xl text-blue-600 mb-3',
      contact: 'text-sm text-gray-600 space-x-4',
      section: 'mb-6',
      sectionTitle: 'text-lg font-bold text-sky-800 mb-3',
      summary: 'text-base text-gray-700 leading-relaxed',
      experience: 'mb-4 bg-white p-4 rounded-lg shadow-sm border-l-4 border-sky-300',
      expHeader: 'flex justify-between items-start mb-2',
      expTitle: 'font-semibold text-sky-800',
      expCompany: 'text-base text-blue-600',
      expPeriod: 'text-sm text-gray-500',
      expDesc: 'text-sm text-gray-700 mt-2',
      education: 'mb-4 bg-white p-4 rounded-lg shadow-sm border-l-4 border-sky-300',
      eduHeader: 'flex justify-between items-start mb-2',
      eduDegree: 'font-semibold text-sky-800',
      eduSchool: 'text-base text-blue-600',
      eduPeriod: 'text-sm text-gray-500',
      skills: 'flex flex-wrap gap-2',
      skillTag: 'bg-gradient-to-r from-sky-100 to-blue-100 text-sky-800 px-3 py-1 rounded-full text-sm'
    }
  },
  essaouira: {
    name: 'Essaouira',
    city: 'Essaouira',
    description: 'Artistic and bohemian style reflecting the coastal art city',
    styles: {
      container: 'max-w-2xl mx-auto p-6 bg-gradient-to-br from-teal-50 to-green-50 text-gray-900',
      header: 'text-center mb-8',
      name: 'text-3xl font-bold text-teal-800 mb-2',
      title: 'text-xl text-green-600 mb-3',
      contact: 'text-sm text-gray-600 space-x-4',
      section: 'mb-6',
      sectionTitle: 'text-lg font-bold text-teal-800 mb-3',
      summary: 'text-base text-gray-700 leading-relaxed italic',
      experience: 'mb-4 bg-white p-4 rounded-lg shadow-sm border border-teal-200',
      expHeader: 'flex justify-between items-start mb-2',
      expTitle: 'font-semibold text-teal-800',
      expCompany: 'text-base text-green-600',
      expPeriod: 'text-sm text-gray-500',
      expDesc: 'text-sm text-gray-700 mt-2',
      education: 'mb-4 bg-white p-4 rounded-lg shadow-sm border border-teal-200',
      eduHeader: 'flex justify-between items-start mb-2',
      eduDegree: 'font-semibold text-teal-800',
      eduSchool: 'text-base text-green-600',
      eduPeriod: 'text-sm text-gray-500',
      skills: 'flex flex-wrap gap-2',
      skillTag: 'bg-gradient-to-r from-teal-100 to-green-100 text-teal-800 px-3 py-1 rounded-full text-sm'
    }
  }
}

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Ahmed Benali',
    email: 'ahmed.benali@email.com',
    phone: '+212 6 12 34 56 78',
    location: 'Casablanca, Morocco',
    linkedin: 'linkedin.com/in/ahmedbenali',
    title: 'Senior Software Engineer',
    summary: 'Experienced software engineer with 5+ years of expertise in full-stack development, cloud architecture, and team leadership. Passionate about building scalable solutions and mentoring junior developers.',
    experience: [
      {
        id: 'exp-1',
        title: 'Senior Software Engineer',
        company: 'Tech Corp Morocco',
        period: '2021 - Present',
        description: 'Led development of microservices architecture, improved system performance by 40%, and mentored 3 junior developers.'
      },
      {
        id: 'exp-2',
        title: 'Software Engineer',
        company: 'StartupXYZ',
        period: '2019 - 2021',
        description: 'Developed full-stack web applications using React, Node.js, and PostgreSQL. Collaborated with cross-functional teams to deliver features on time.'
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'Bachelor of Science in Computer Science',
        school: 'Mohammed V University',
        period: '2015 - 2019'
      }
    ],
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL']
  },
  {
    id: '2',
    name: 'Fatima Zahra',
    email: 'fatima.zahra@email.com',
    phone: '+212 6 87 65 43 21',
    location: 'Rabat, Morocco',
    linkedin: 'linkedin.com/in/fatimazahra',
    title: 'UX/UI Designer',
    summary: 'Creative UX/UI designer with 4+ years of experience in user-centered design, prototyping, and design systems. Passionate about creating intuitive and beautiful user experiences.',
    experience: [
      {
        id: 'exp-1',
        title: 'Senior UX/UI Designer',
        company: 'Design Studio Morocco',
        period: '2022 - Present',
        description: 'Lead design initiatives for mobile and web applications, created design systems, and conducted user research to improve product usability.'
      },
      {
        id: 'exp-2',
        title: 'UX Designer',
        company: 'Digital Agency',
        period: '2020 - 2022',
        description: 'Designed user interfaces for various clients, created wireframes and prototypes, and collaborated with development teams.'
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'Master of Design',
        school: 'École Supérieure des Arts Visuels',
        period: '2018 - 2020'
      }
    ],
    skills: ['Figma', 'Adobe Creative Suite', 'Sketch', 'Prototyping', 'User Research', 'Design Systems', 'HTML/CSS', 'JavaScript']
  },
  {
    id: '3',
    name: 'Youssef Alami',
    email: 'youssef.alami@email.com',
    phone: '+212 6 11 22 33 44',
    location: 'Marrakech, Morocco',
    linkedin: 'linkedin.com/in/youssefalami',
    title: 'Product Manager',
    summary: 'Strategic product manager with 6+ years of experience in product strategy, roadmap planning, and cross-functional team leadership. Expert in agile methodologies and data-driven decision making.',
    experience: [
      {
        id: 'exp-1',
        title: 'Senior Product Manager',
        company: 'Tech Startup Morocco',
        period: '2021 - Present',
        description: 'Led product strategy and roadmap for B2B SaaS platform, increased user engagement by 60%, and managed a team of 8 developers and designers.'
      },
      {
        id: 'exp-2',
        title: 'Product Manager',
        company: 'E-commerce Platform',
        period: '2019 - 2021',
        description: 'Managed product development lifecycle, coordinated with engineering and design teams, and launched 3 major product features.'
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'MBA in Technology Management',
        school: 'Al Akhawayn University',
        period: '2017 - 2019'
      }
    ],
    skills: ['Product Strategy', 'Agile', 'Scrum', 'Data Analysis', 'User Research', 'Roadmap Planning', 'Stakeholder Management', 'A/B Testing']
  }
]

const defaultBlocks: BlockData[] = [
  {
    id: 'header-1',
    type: 'header',
      data: {
        name: 'Ahmed Benali',
        title: 'Senior Software Engineer',
        email: 'ahmed.benali@email.com',
        phone: '+212 6 12 34 56 78',
        location: 'Casablanca, Morocco',
        linkedin: 'linkedin.com/in/ahmedbenali',
        profilePicture: '',
        companyLogo: ''
      }
  },
  {
    id: 'summary-1',
    type: 'summary',
    data: {
      content: 'Experienced software engineer with 5+ years of expertise in full-stack development, cloud architecture, and team leadership. Passionate about building scalable solutions and mentoring junior developers.'
    }
  },
  {
    id: 'experience-1',
    type: 'experience',
    data: {
      items: [
        {
          id: 'exp-1',
          title: 'Senior Software Engineer',
          company: 'Tech Corp Morocco',
          period: '2021 - Present',
          description: 'Led development of microservices architecture, improved system performance by 40%, and mentored 3 junior developers.'
        },
        {
          id: 'exp-2',
          title: 'Software Engineer',
          company: 'StartupXYZ',
          period: '2019 - 2021',
          description: 'Developed full-stack web applications using React, Node.js, and PostgreSQL. Collaborated with cross-functional teams to deliver features on time.'
        }
      ]
    }
  },
  {
    id: 'education-1',
    type: 'education',
    data: {
      items: [
        {
          id: 'edu-1',
          degree: 'Bachelor of Science in Computer Science',
          school: 'Mohammed V University',
          period: '2015 - 2019'
        }
      ]
    }
  },
  {
    id: 'skills-1',
    type: 'skills',
    data: {
      items: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL']
    }
  }
]

const SortableBlock: React.FC<{ block: BlockData; isSelected: boolean; onSelect: () => void; onDelete: () => void }> = ({ block, isSelected, onSelect, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: block.id })
  const style = { transform: CSS.Transform.toString(transform), transition }

  const getIcon = () => {
    switch (block.type) {
      case 'header': return <User className="h-4 w-4" />
      case 'summary': return <FileText className="h-4 w-4" />
      case 'experience': return <Briefcase className="h-4 w-4" />
      case 'education': return <GraduationCap className="h-4 w-4" />
      case 'skills': return <Star className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
        isSelected 
          ? 'border-primary bg-primary/10' 
          : 'border-border hover:border-border/80 bg-card'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div {...attributes} {...listeners} className="cursor-grab">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
          {getIcon()}
          <span className="font-medium capitalize text-foreground">{block.type}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}

const BlockEditor: React.FC<{ block: BlockData; onUpdate: (data: any) => void }> = ({ block, onUpdate }) => {
  const updateData = (updates: any) => {
    onUpdate({ ...block.data, ...updates })
  }

  const handleImageUpload = (file: File, type: 'profilePicture' | 'companyLogo') => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string
      updateData({ [type]: imageUrl })
    }
    reader.readAsDataURL(file)
  }

  switch (block.type) {
    case 'header':
      return (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Profile Picture</label>
            <div className="mt-1 space-y-2">
              <input 
                type="file"
                id="profile-picture"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    handleImageUpload(file, 'profilePicture')
                  }
                }}
                accept="image/*"
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('profile-picture')?.click()}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Photo
              </Button>
              {block.data.profilePicture && (
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-xs text-gray-600 truncate">
                    {block.data.profilePicture.includes('data:') ? 'Uploaded Image' : 'Custom URL'}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => updateData({ profilePicture: '' })}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Company Logo</label>
            <div className="mt-1 space-y-2">
              <input 
                type="file"
                id="company-logo"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    handleImageUpload(file, 'companyLogo')
                  }
                }}
                accept="image/*"
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('company-logo')?.click()}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Company Logo
              </Button>
              {block.data.companyLogo && (
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-xs text-gray-600 truncate">
                    {block.data.companyLogo.includes('data:') ? 'Uploaded Logo' : 'Custom URL'}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => updateData({ companyLogo: '' })}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <Input
              value={block.data.name || ''}
              onChange={(e) => updateData({ name: e.target.value })}
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Professional Title</label>
            <Input
              value={block.data.title || ''}
              onChange={(e) => updateData({ title: e.target.value })}
              placeholder="e.g., Software Engineer"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                value={block.data.email || ''}
                onChange={(e) => updateData({ email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input
                value={block.data.phone || ''}
                onChange={(e) => updateData({ phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Location</label>
              <Input
                value={block.data.location || ''}
                onChange={(e) => updateData({ location: e.target.value })}
                placeholder="City, State"
              />
            </div>
            <div>
              <label className="text-sm font-medium">LinkedIn</label>
              <Input
                value={block.data.linkedin || ''}
                onChange={(e) => updateData({ linkedin: e.target.value })}
                placeholder="linkedin.com/in/username"
              />
            </div>
          </div>
        </div>
      )

    case 'summary':
      return (
        <div>
          <label className="text-sm font-medium">Professional Summary</label>
          <Textarea
            value={block.data.content || ''}
            onChange={(e) => updateData({ content: e.target.value })}
            placeholder="Write a brief summary of your professional background and key strengths..."
            rows={4}
          />
        </div>
      )

    case 'experience':
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Work Experience</h3>
            <Button
              size="sm"
              onClick={() => {
                const newItem = {
                  id: `exp-${Date.now()}`,
                  title: '',
                  company: '',
                  period: '',
                  description: ''
                }
                updateData({ items: [...(block.data.items || []), newItem] })
              }}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Experience
            </Button>
          </div>
          {(block.data.items || []).map((item: any, index: number) => (
            <Card key={item.id} className="p-4">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium">Job Title</label>
                    <Input
                      value={item.title || ''}
                      onChange={(e) => {
                        const items = [...(block.data.items || [])]
                        items[index] = { ...item, title: e.target.value }
                        updateData({ items })
                      }}
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Company</label>
                    <Input
                      value={item.company || ''}
                      onChange={(e) => {
                        const items = [...(block.data.items || [])]
                        items[index] = { ...item, company: e.target.value }
                        updateData({ items })
                      }}
                      placeholder="Company Name"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Period</label>
                  <Input
                    value={item.period || ''}
                    onChange={(e) => {
                      const items = [...(block.data.items || [])]
                      items[index] = { ...item, period: e.target.value }
                      updateData({ items })
                    }}
                    placeholder="2021 - Present"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={item.description || ''}
                    onChange={(e) => {
                      const items = [...(block.data.items || [])]
                      items[index] = { ...item, description: e.target.value }
                      updateData({ items })
                    }}
                    placeholder="Describe your key achievements and responsibilities..."
                    rows={3}
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const items = (block.data.items || []).filter((_: any, i: number) => i !== index)
                    updateData({ items })
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )

    case 'education':
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Education</h3>
            <Button
              size="sm"
              onClick={() => {
                const newItem = {
                  id: `edu-${Date.now()}`,
                  degree: '',
                  school: '',
                  period: ''
                }
                updateData({ items: [...(block.data.items || []), newItem] })
              }}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Education
            </Button>
          </div>
          {(block.data.items || []).map((item: any, index: number) => (
            <Card key={item.id} className="p-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Degree</label>
                  <Input
                    value={item.degree || ''}
                    onChange={(e) => {
                      const items = [...(block.data.items || [])]
                      items[index] = { ...item, degree: e.target.value }
                      updateData({ items })
                    }}
                    placeholder="Bachelor of Science in Computer Science"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium">School</label>
                    <Input
                      value={item.school || ''}
                      onChange={(e) => {
                        const items = [...(block.data.items || [])]
                        items[index] = { ...item, school: e.target.value }
                        updateData({ items })
                      }}
                      placeholder="University Name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Period</label>
                    <Input
                      value={item.period || ''}
                      onChange={(e) => {
                        const items = [...(block.data.items || [])]
                        items[index] = { ...item, period: e.target.value }
                        updateData({ items })
                      }}
                      placeholder="2015 - 2019"
                    />
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const items = (block.data.items || []).filter((_: any, i: number) => i !== index)
                    updateData({ items })
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )

    case 'skills':
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Skills</h3>
            <Button
              size="sm"
              onClick={() => {
                const skill = prompt('Enter a skill:')
                if (skill) {
                  updateData({ items: [...(block.data.items || []), skill] })
                }
              }}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Skill
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(block.data.items || []).map((skill: string, index: number) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer hover:bg-red-100"
                onClick={() => {
                  const items = (block.data.items || []).filter((_: string, i: number) => i !== index)
                  updateData({ items })
                }}
              >
                {skill} ×
              </Badge>
            ))}
          </div>
        </div>
      )

    default:
      return <div>Unknown block type</div>
  }
}

const ResumePreview: React.FC<{ blocks: BlockData[]; templateId: string }> = ({ blocks, templateId }) => {
  const template = templates[templateId as keyof typeof templates] || templates.casablanca
  const styles = template.styles

  const renderBlock = (block: BlockData) => {
    switch (block.type) {
      case 'header':
        return (
          <div className={styles.header}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                {block.data.profilePicture && (
                  <img 
                    src={block.data.profilePicture} 
                    alt="Profile" 
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                  />
                )}
                <div className="flex-1">
                  <h1 className={styles.name}>{block.data.name || 'Your Name'}</h1>
                  <h2 className={styles.title}>{block.data.title || 'Professional Title'}</h2>
                  <div className={styles.contact}>
                    {block.data.email && <span>{block.data.email}</span>}
                    {block.data.phone && <span>{block.data.phone}</span>}
                    {block.data.location && <span>{block.data.location}</span>}
                    {block.data.linkedin && <span>{block.data.linkedin}</span>}
                  </div>
                </div>
              </div>
              {block.data.companyLogo && (
                <div className="flex-shrink-0">
                  <img 
                    src={block.data.companyLogo} 
                    alt="Company Logo" 
                    className="h-16 w-auto object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        )

      case 'summary':
        return (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Summary</h3>
            <p className={styles.summary}>{block.data.content || 'Write your professional summary here...'}</p>
          </div>
        )

      case 'experience':
        return (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Experience</h3>
            {(block.data.items || []).map((item: any) => (
              <div key={item.id} className={styles.experience}>
                <div className={styles.expHeader}>
                  <div>
                    <div className={styles.expTitle}>{item.title || 'Job Title'}</div>
                    <div className={styles.expCompany}>{item.company || 'Company Name'}</div>
                  </div>
                  <div className={styles.expPeriod}>{item.period || 'Period'}</div>
                </div>
                <div className={styles.expDesc}>{item.description || 'Job description...'}</div>
              </div>
            ))}
          </div>
        )

      case 'education':
        return (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Education</h3>
            {(block.data.items || []).map((item: any) => (
              <div key={item.id} className={styles.education}>
                <div className={styles.eduHeader}>
                  <div>
                    <div className={styles.eduDegree}>{item.degree || 'Degree'}</div>
                    <div className={styles.eduSchool}>{item.school || 'School Name'}</div>
                  </div>
                  <div className={styles.eduPeriod}>{item.period || 'Period'}</div>
                </div>
              </div>
            ))}
          </div>
        )

      case 'skills':
        return (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Skills</h3>
            <div className={styles.skills}>
              {(block.data.items || []).map((skill: string, index: number) => (
                <span key={index} className={styles.skillTag}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={styles.container} style={{ minHeight: '297mm', width: '210mm' }}>
      {blocks.map(renderBlock)}
    </div>
  )
}

const FigmaCanvas: React.FC<{ 
  children: React.ReactNode
  canvasState: CanvasState
  onCanvasStateChange: (state: Partial<CanvasState>) => void
}> = ({ children, canvasState, onCanvasStateChange }) => {
  const canvasRef = useRef<HTMLDivElement>(null)

  // Add native wheel event listener for better touchpad support
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleNativeWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      
      const rect = canvas.getBoundingClientRect()
      if (!rect) return
      
      // Get mouse position relative to canvas
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      
      // Calculate zoom factor - use smaller increments for smoother touchpad experience
      const zoomFactor = e.deltaY > 0 ? 0.95 : 1.05
      const newZoom = Math.max(0.1, Math.min(3, canvasState.zoom * zoomFactor))
      
      // Only update if zoom actually changed
      if (Math.abs(newZoom - canvasState.zoom) > 0.001) {
        // Calculate the point to zoom towards (mouse position)
        const zoomPointX = (mouseX - canvasState.panX) / canvasState.zoom
        const zoomPointY = (mouseY - canvasState.panY) / canvasState.zoom
        
        // Adjust pan to keep the zoom point under the mouse
        const newPanX = mouseX - zoomPointX * newZoom
        const newPanY = mouseY - zoomPointY * newZoom
        
        onCanvasStateChange({ 
          zoom: newZoom,
          panX: newPanX,
          panY: newPanY
        })
      }
    }

    // Add event listener with passive: false to allow preventDefault
    canvas.addEventListener('wheel', handleNativeWheel, { passive: false })
    
    return () => {
      canvas.removeEventListener('wheel', handleNativeWheel)
    }
  }, [canvasState.zoom, canvasState.panX, canvasState.panY, onCanvasStateChange])


  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Only handle left mouse button for dragging
    if (e.button === 0) {
      e.preventDefault()
      e.stopPropagation()
      onCanvasStateChange({ 
        isDragging: true, 
        lastMouseX: e.clientX, 
        lastMouseY: e.clientY 
      })
    }
  }, [onCanvasStateChange])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (canvasState.isDragging) {
      e.preventDefault()
      e.stopPropagation()
      
      const deltaX = e.clientX - canvasState.lastMouseX
      const deltaY = e.clientY - canvasState.lastMouseY
      
      onCanvasStateChange({
        panX: canvasState.panX + deltaX,
        panY: canvasState.panY + deltaY,
        lastMouseX: e.clientX,
        lastMouseY: e.clientY
      })
    }
  }, [canvasState, onCanvasStateChange])

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (canvasState.isDragging) {
      e.preventDefault()
      e.stopPropagation()
      onCanvasStateChange({ isDragging: false })
    }
  }, [canvasState.isDragging, onCanvasStateChange])

  const handleMouseLeave = useCallback(() => {
    if (canvasState.isDragging) {
      onCanvasStateChange({ isDragging: false })
    }
  }, [canvasState.isDragging, onCanvasStateChange])

  const resetView = useCallback(() => {
    onCanvasStateChange({ zoom: 1, panX: 0, panY: 0 })
  }, [onCanvasStateChange])

  const zoomIn = useCallback(() => {
    const newZoom = Math.min(3, canvasState.zoom + 0.1)
    onCanvasStateChange({ zoom: newZoom })
  }, [canvasState.zoom, onCanvasStateChange])

  const zoomOut = useCallback(() => {
    const newZoom = Math.max(0.1, canvasState.zoom - 0.1)
    onCanvasStateChange({ zoom: newZoom })
  }, [canvasState.zoom, onCanvasStateChange])

  return (
    <div 
      className="relative w-full h-full overflow-hidden"
      style={{ 
        backgroundColor: canvasState.backgroundColor,
        backgroundImage: canvasState.showGrid ? `
          linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
        ` : 'none',
        backgroundSize: '20px 20px'
      }}
    >
      <div 
        ref={canvasRef}
        className={`w-full h-full select-none ${canvasState.isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `translate(${canvasState.panX}px, ${canvasState.panY}px) scale(${canvasState.zoom})`,
          transformOrigin: '0 0'
        }}
      >
        <div className="flex items-center justify-center min-h-full p-8">
          {children}
        </div>
      </div>
      
      <div className="absolute top-4 right-4 flex gap-2 bg-card/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-border">
        <div className="flex items-center gap-1">
          <PaletteIcon className="h-4 w-4 text-muted-foreground" />
          <input
            type="color"
            value={canvasState.backgroundColor}
            onChange={(e) => onCanvasStateChange({ backgroundColor: e.target.value })}
            className="w-8 h-8 rounded border border-border cursor-pointer"
            title="Canvas Background Color"
          />
        </div>
        <Button
          variant={canvasState.showGrid ? "default" : "outline"}
          size="sm"
          onClick={() => onCanvasStateChange({ showGrid: !canvasState.showGrid })}
          title={canvasState.showGrid ? "Hide Grid" : "Show Grid"}
        >
          <Grid3X3 className="h-4 w-4" />
        </Button>
        <div className="w-px h-8 bg-border"></div>
        <Button
          variant="outline"
          size="sm"
          onClick={zoomOut}
          disabled={canvasState.zoom <= 0.1}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span className="px-2 py-1 text-sm bg-muted rounded border border-border min-w-[60px] text-center text-foreground">
          {Math.round(canvasState.zoom * 100)}%
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={zoomIn}
          disabled={canvasState.zoom >= 3}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={resetView}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export const ResumeBuilder: React.FC = () => {
  const [resume, setResume] = useState<ResumeData>({
    id: 'resume-1',
    templateId: 'casablanca',
    blocks: defaultBlocks,
    updatedAt: new Date().toISOString()
  })
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null)
  const [lastSaved, setLastSaved] = useState<string | null>(null)
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [canvasState, setCanvasState] = useState<CanvasState>({
    zoom: 1,
    panX: 0,
    panY: 0,
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0,
    backgroundColor: '#f3f4f6',
    showGrid: true
  })
  const previewRef = useRef<HTMLDivElement>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  useEffect(() => {
    const saved = localStorage.getItem('resume-builder-data')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setResume(parsed)
        setLastSaved(parsed.updatedAt)
      } catch (error) {
        console.error('Failed to load saved resume:', error)
      }
    }
  }, [])

  useEffect(() => {
    const updatedResume = { ...resume, updatedAt: new Date().toISOString() }
    setResume(updatedResume)
    localStorage.setItem('resume-builder-data', JSON.stringify(updatedResume))
    setLastSaved(updatedResume.updatedAt)
  }, [resume.blocks, resume.templateId])

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      setResume(prev => ({
        ...prev,
        blocks: arrayMove(prev.blocks, prev.blocks.findIndex(b => b.id === active.id), prev.blocks.findIndex(b => b.id === over.id))
      }))
    }
  }

  const addBlock = (type: BlockData['type']) => {
    const newBlock: BlockData = {
      id: `${type}-${Date.now()}`,
      type,
      data: type === 'skills' ? { items: [] } : type === 'experience' || type === 'education' ? { items: [] } : {}
    }
    setResume(prev => ({ ...prev, blocks: [...prev.blocks, newBlock] }))
    setSelectedBlock(newBlock.id)
  }

  const updateBlock = (blockId: string, data: any) => {
    setResume(prev => ({
      ...prev,
      blocks: prev.blocks.map(block => block.id === blockId ? { ...block, data } : block)
    }))
  }

  const deleteBlock = (blockId: string) => {
    setResume(prev => ({
      ...prev,
      blocks: prev.blocks.filter(block => block.id !== blockId)
    }))
    if (selectedBlock === blockId) {
      setSelectedBlock(null)
    }
  }

  const exportToPDF = async () => {
    if (!previewRef.current) return

    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      })
      
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const imgWidth = 210
      const pageHeight = 297
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      
      let position = 0
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }
      
      pdf.save('resume.pdf')
    } catch (error) {
      console.error('Failed to export PDF:', error)
      alert('Failed to export PDF. Please try again.')
    }
  }

  const applyCandidateData = (candidate: Candidate) => {
    const newBlocks: BlockData[] = [
      {
        id: 'header-1',
        type: 'header',
        data: {
          name: candidate.name,
          title: candidate.title,
          email: candidate.email,
          phone: candidate.phone,
          location: candidate.location,
          linkedin: candidate.linkedin
        }
      },
      {
        id: 'summary-1',
        type: 'summary',
        data: {
          content: candidate.summary
        }
      },
      {
        id: 'experience-1',
        type: 'experience',
        data: {
          items: candidate.experience
        }
      },
      {
        id: 'education-1',
        type: 'education',
        data: {
          items: candidate.education
        }
      },
      {
        id: 'skills-1',
        type: 'skills',
        data: {
          items: candidate.skills
        }
      }
    ]
    setResume(prev => ({ ...prev, blocks: newBlocks }))
  }

  const applyTemplateToCandidates = () => {
    selectedCandidates.forEach(candidateId => {
      const candidate = mockCandidates.find(c => c.id === candidateId)
      if (candidate) {
        applyCandidateData(candidate)
      }
    })
  }

  const filteredCandidates = mockCandidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedBlockData = resume.blocks.find(b => b.id === selectedBlock)

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Site Header - Top Element */}
      <div className="sticky top-0 z-50 bg-background border-b border-border">
        <SiteHeader />
      </div>
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-80 border-r border-border p-4 overflow-y-auto bg-card">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Resume Builder</h2>
            <Badge variant="outline" className="text-xs">
              {lastSaved ? `Saved ${new Date(lastSaved).toLocaleTimeString()}` : 'Unsaved'}
            </Badge>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2 text-foreground">Candidates</h3>
            <div className="mb-3">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filteredCandidates.map(candidate => (
                <div
                  key={candidate.id}
                  className={`p-3 rounded border cursor-pointer transition-colors ${
                    selectedCandidates.includes(candidate.id)
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-border/80 bg-card'
                  }`}
                  onClick={() => {
                    if (selectedCandidates.includes(candidate.id)) {
                      setSelectedCandidates(prev => prev.filter(id => id !== candidate.id))
                    } else {
                      setSelectedCandidates(prev => [...prev, candidate.id])
                    }
                  }}
                >
                  <div className="flex items-start gap-2">
                    <Checkbox
                      checked={selectedCandidates.includes(candidate.id)}
                      onChange={() => {}}
                    />
                    <div className="flex-1">
                      <div className="font-medium text-sm text-foreground">{candidate.name}</div>
                      <div className="text-xs text-muted-foreground">{candidate.title}</div>
                      <div className="text-xs text-muted-foreground/70">{candidate.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {selectedCandidates.length > 0 && (
              <div className="mt-3">
                <Button
                  onClick={applyTemplateToCandidates}
                  className="w-full"
                  size="sm"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Apply Template to {selectedCandidates.length} Candidate{selectedCandidates.length > 1 ? 's' : ''}
                </Button>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2 text-foreground">Moroccan Templates</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {Object.entries(templates).map(([id, template]) => (
                <div
                  key={id}
                  className={`p-2 rounded border cursor-pointer transition-colors ${
                    resume.templateId === id 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover:border-border/80 bg-card'
                  }`}
                  onClick={() => setResume(prev => ({ ...prev, templateId: id }))}
                >
                  <div className="font-medium text-sm text-foreground">{template.name}</div>
                  <div className="text-xs text-muted-foreground">{template.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2 text-foreground">Add Blocks</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={() => addBlock('header')}>
                <User className="h-3 w-3 mr-1" />
                Header
              </Button>
              <Button variant="outline" size="sm" onClick={() => addBlock('summary')}>
                <FileText className="h-3 w-3 mr-1" />
                Summary
              </Button>
              <Button variant="outline" size="sm" onClick={() => addBlock('experience')}>
                <Briefcase className="h-3 w-3 mr-1" />
                Experience
              </Button>
              <Button variant="outline" size="sm" onClick={() => addBlock('education')}>
                <GraduationCap className="h-3 w-3 mr-1" />
                Education
              </Button>
              <Button variant="outline" size="sm" onClick={() => addBlock('skills')} className="col-span-2">
                <Star className="h-3 w-3 mr-1" />
                Skills
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2 text-foreground">Blocks</h3>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={resume.blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-2">
                  {resume.blocks.map(block => (
                    <SortableBlock
                      key={block.id}
                      block={block}
                      isSelected={selectedBlock === block.id}
                      onSelect={() => setSelectedBlock(block.id)}
                      onDelete={() => deleteBlock(block.id)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>

          <Button onClick={exportToPDF} className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="flex-1 relative">
          <FigmaCanvas
            canvasState={canvasState}
            onCanvasStateChange={(state) => setCanvasState(prev => ({ ...prev, ...state }))}
          >
            <div className="bg-white shadow-lg rounded-lg overflow-hidden" style={{ width: '210mm', minHeight: '297mm' }}>
              <div ref={previewRef}>
                <ResumePreview blocks={resume.blocks} templateId={resume.templateId} />
              </div>
            </div>
          </FigmaCanvas>
          
          {/* Help message when no block is selected */}
          {!selectedBlockData && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-6 text-center shadow-lg">
                <Edit className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg font-medium mb-2 text-foreground">Select a Block to Edit</h3>
                <p className="text-sm text-muted-foreground">Click on any block in the left sidebar to start editing its content.</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Only show when a block is selected */}
        {selectedBlockData && (
          <div className="w-80 border-l border-border p-4 overflow-y-auto bg-card animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold capitalize text-foreground">{selectedBlockData.type} Editor</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedBlock(null)}
                  className="h-8 w-8 p-0 hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <BlockEditor
                block={selectedBlockData}
                onUpdate={(data) => updateBlock(selectedBlockData.id, data)}
              />
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}
