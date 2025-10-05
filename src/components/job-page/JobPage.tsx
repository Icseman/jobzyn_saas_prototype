import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SiteHeader } from '@/components/site-header'
import { JobHeader } from './JobHeader'
import { FloatingCandidateList } from './FloatingCandidateList'
import { CandidateProfile } from './CandidateProfile'
import { CandidateOverview } from './CandidateOverview'
import { pageVariants, staggerContainer } from '../jobs/animations'

interface Job {
  id: string
  title: string
  client: string
  owner: {
    name: string
    avatar: string
    initials: string
  }
  openings: {
    filled: number
    total: number
  }
  applicants: {
    total: number
    unread: number
  }
  status: 'open' | 'draft' | 'on-hold' | 'closed'
  location: {
    city: string
    state: string
    country: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  workModel: 'onsite' | 'remote' | 'hybrid'
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship'
  salaryRange: string
  seniority: string
  lastActivity: string
  age: number
  priority: 'low' | 'medium' | 'high' | 'urgent'
  tags: string[]
  published: boolean
  pipelineStages: Array<{
    stage: string
    count: number
    color: string
  }>
}

interface Candidate {
  id: string
  name: string
  title: string
  avatar?: string
  initials: string
  tags: string[]
  source: string
  appliedDate: string
  status: 'qualified' | 'disqualified'
  stage: string
  resume?: string
  email?: string
  phone?: string
  location?: string
  experience?: Array<{
    company: string
    position: string
    duration: string
    description: string
  }>
  education?: Array<{
    institution: string
    degree: string
    year: string
  }>
  skills?: string[]
}

const mockJob: Job = {
  id: 'job-001',
  title: 'Director of Finance',
  client: 'Microsoft',
  owner: {
    name: 'Sarah Johnson',
    avatar: '',
    initials: 'SJ'
  },
  openings: {
    filled: 1,
    total: 2
  },
  applicants: {
    total: 7,
    unread: 3
  },
  status: 'open',
  location: {
    city: 'New York',
    state: 'NY',
    country: 'United States',
    coordinates: {
      lat: 40.7128,
      lng: -74.0060
    }
  },
  workModel: 'onsite',
  employmentType: 'full-time',
  salaryRange: '$120,000 - $150,000',
  seniority: 'Senior',
  lastActivity: '2 hours ago',
  age: 15,
  priority: 'high',
  tags: ['finance', 'leadership', 'management'],
  published: true,
  pipelineStages: [
    { stage: 'All', count: 7, color: 'bg-gray-500' },
    { stage: 'Sourced', count: 0, color: 'bg-blue-500' },
    { stage: 'Applied', count: 1, color: 'bg-green-500' },
    { stage: 'Phone Screen', count: 1, color: 'bg-yellow-500' },
    { stage: 'Assessment', count: 1, color: 'bg-orange-500' },
    { stage: 'Interview', count: 1, color: 'bg-purple-500' },
    { stage: 'Offer', count: 1, color: 'bg-pink-500' },
    { stage: 'Hired', count: 1, color: 'bg-emerald-500' },
    { stage: 'Disqualified', count: 1, color: 'bg-red-500' }
  ]
}

const mockCandidates: Candidate[] = [
  {
    id: 'candidate-001',
    name: 'Amina El Mansouri',
    title: 'Directrice Financière Senior',
    initials: 'AE',
    tags: ['#finance', '#leadership', '#strategy'],
    source: 'LinkedIn',
    appliedDate: '2 days ago',
    status: 'qualified',
    stage: 'Applied',
    email: 'amina.elmansouri@email.com',
    phone: '+212 6 12 34 56 71',
    location: 'Casablanca, Morocco',
    avatar: '/src/Assets/team/Aya Birouk.jpeg',
    experience: [
      {
        company: 'Attijariwafa Bank',
        position: 'Directrice Financière Senior',
        duration: '2020 - Present',
        description: 'Dirigé la stratégie financière pour la division banque d\'investissement, gérant un portefeuille de 2B+ MAD. Implémenté des initiatives de réduction des coûts économisant 50M MAD annuellement.'
      },
      {
        company: 'BMCE Bank',
        position: 'Manager Financier',
        duration: '2017 - 2020',
        description: 'Géré la planification financière et l\'analyse pour les opérations bancaires commerciales. Développé des modèles de prévision améliorant la précision de 25%.'
      }
    ],
    education: [
      {
        institution: 'Université Mohammed V',
        degree: 'Master en Finance',
        year: '2017'
      },
      {
        institution: 'Université Hassan II',
        degree: 'Licence en Économie',
        year: '2015'
      }
    ],
    skills: ['Modélisation Financière', 'Gestion des Risques', 'Leadership d\'Équipe', 'Planification Stratégique', 'Excel', 'SQL']
  },
  {
    id: 'candidate-002',
    name: 'Youssef Benali',
    title: 'VP Finance',
    initials: 'YB',
    tags: ['#finance', '#operations', '#analytics'],
    source: 'Indeed',
    appliedDate: '1 week ago',
    status: 'qualified',
    stage: 'Phone Screen',
    email: 'youssef.benali@email.com',
    phone: '+212 6 12 34 56 72',
    location: 'Rabat, Morocco',
    avatar: '/src/Assets/team/Karim Baggari .jpeg',
    experience: [
      {
        company: 'Banque Centrale Populaire',
        position: 'VP Finance',
        duration: '2019 - Present',
        description: 'Supervisé les opérations financières pour des fonds d\'investissement de 500M+ MAD. Dirigé une équipe de 15 analystes et implémenté des systèmes de reporting automatisés.'
      },
      {
        company: 'Crédit du Maroc',
        position: 'Analyste Financier Senior',
        duration: '2016 - 2019',
        description: 'Effectué des analyses financières pour la division gestion de patrimoine. Développé des outils de reporting client et des cadres d\'évaluation des risques.'
      }
    ],
    education: [
      {
        institution: 'École Nationale de Commerce et de Gestion',
        degree: 'Master en Finance',
        year: '2016'
      },
      {
        institution: 'Université Ibn Zohr',
        degree: 'Licence en Mathématiques',
        year: '2014'
      }
    ],
    skills: ['Analyse Financière', 'Gestion de Portefeuille', 'Évaluation des Risques', 'Gestion d\'Équipe', 'Python', 'R']
  },
  {
    id: 'candidate-003',
    name: 'Fatima Zahra Alaoui',
    title: 'Directrice Finance',
    initials: 'FA',
    tags: ['#finance', '#technology', '#innovation'],
    source: 'Glassdoor',
    appliedDate: '3 days ago',
    status: 'qualified',
    stage: 'Assessment',
    email: 'fatima.alaoui@email.com',
    phone: '+212 6 12 34 56 73',
    location: 'Marrakech, Morocco',
    avatar: '/src/Assets/team/Salma Bennani.jpeg',
    experience: [
      {
        company: 'Maroc Telecom',
        position: 'Directrice Finance',
        duration: '2018 - Present',
        description: 'Dirigé les initiatives financières numériques et la transformation technologique. Implémenté des systèmes de finance automatisés et des outils d\'analyse prédictive.'
      },
      {
        company: 'Orange Maroc',
        position: 'Manager Financier',
        duration: '2015 - 2018',
        description: 'Géré la planification financière pour les projets technologiques. Développé des modèles financiers pour les investissements en infrastructure.'
      }
    ],
    education: [
      {
        institution: 'École Mohammadia d\'Ingénieurs',
        degree: 'Master en Ingénierie Financière',
        year: '2015'
      },
      {
        institution: 'Université Cadi Ayyad',
        degree: 'Licence en Informatique',
        year: '2013'
      }
    ],
    skills: ['Finance Digitale', 'Analyse Prédictive', 'Gestion de Projets', 'Technologies Financières', 'Python', 'Machine Learning']
  },
  {
    id: 'candidate-004',
    name: 'Hassan Tazi',
    title: 'Directeur Financier en Chef',
    initials: 'HT',
    tags: ['#finance', '#executive', '#strategy'],
    source: 'LinkedIn',
    appliedDate: '5 days ago',
    status: 'qualified',
    stage: 'Interview',
    email: 'hassan.tazi@email.com',
    phone: '+212 6 12 34 56 74',
    location: 'Fès, Morocco',
    avatar: '/src/Assets/team/Abdellah Maarifa  .jpeg',
    experience: [
      {
        company: 'OCP Group',
        position: 'Directeur Financier en Chef',
        duration: '2017 - Present',
        description: 'Dirigé la stratégie financière globale pour le groupe OCP, gérant un budget de 3B+ MAD. Supervisé les opérations financières dans 15 pays.'
      },
      {
        company: 'Office Chérifien des Phosphates',
        position: 'Directeur Financier',
        duration: '2014 - 2017',
        description: 'Géré la planification financière stratégique et les relations avec les investisseurs. Dirigé les acquisitions et les partenariats stratégiques.'
      }
    ],
    education: [
      {
        institution: 'École Hassania des Travaux Publics',
        degree: 'Master en Gestion',
        year: '2014'
      },
      {
        institution: 'Université Sidi Mohamed Ben Abdellah',
        degree: 'Licence en Économie',
        year: '2012'
      }
    ],
    skills: ['Stratégie Financière', 'Relations Investisseurs', 'Acquisitions', 'Gestion Internationale', 'Leadership']
  },
  {
    id: 'candidate-005',
    name: 'Khadija El Fassi',
    title: 'Manager Financier Senior',
    initials: 'KE',
    tags: ['#finance', '#consulting', '#advisory'],
    source: 'Indeed',
    appliedDate: '1 day ago',
    status: 'qualified',
    stage: 'Offer',
    email: 'khadija.elfassi@email.com',
    phone: '+212 6 12 34 56 75',
    location: 'Agadir, Morocco',
    avatar: '/src/Assets/team/Souhaila Mouchtanim  .jpeg',
    experience: [
      {
        company: 'Deloitte Maroc',
        position: 'Manager Financier Senior',
        duration: '2019 - Present',
        description: 'Fourni des services de conseil financier aux clients Fortune 500 au Maroc. Spécialisée dans les projets de transformation financière et l\'optimisation des processus.'
      },
      {
        company: 'PwC Maroc',
        position: 'Consultante Financière',
        duration: '2016 - 2019',
        description: 'Conseillé les entreprises sur les stratégies financières et les restructurations. Développé des cadres d\'évaluation des risques et des systèmes de reporting.'
      }
    ],
    education: [
      {
        institution: 'École Supérieure de Commerce de Casablanca',
        degree: 'Master en Finance',
        year: '2016'
      },
      {
        institution: 'Université Ibn Tofail',
        degree: 'Licence en Gestion',
        year: '2014'
      }
    ],
    skills: ['Conseil Financier', 'Transformation', 'Optimisation', 'Gestion des Risques', 'Reporting']
  },
  {
    id: 'candidate-006',
    name: 'Omar Benjelloun',
    title: 'Directeur Finance',
    initials: 'OB',
    tags: ['#finance', '#banking', '#risk'],
    source: 'LinkedIn',
    appliedDate: '4 days ago',
    status: 'qualified',
    stage: 'Hired',
    email: 'omar.benjelloun@email.com',
    phone: '+212 6 12 34 56 76',
    location: 'Tanger, Morocco',
    avatar: '/src/Assets/team/Oussama El Hajjami .jpeg',
    experience: [
      {
        company: 'Banque Populaire',
        position: 'Directeur Finance',
        duration: '2018 - Present',
        description: 'Dirigé les opérations financières pour la région du Nord du Maroc. Géré les risques financiers et développé des stratégies de croissance régionale.'
      },
      {
        company: 'Crédit Agricole du Maroc',
        position: 'Manager Financier',
        duration: '2015 - 2018',
        description: 'Supervisé la planification financière pour les activités agricoles et rurales. Développé des produits financiers spécialisés pour le secteur agricole.'
      }
    ],
    education: [
      {
        institution: 'École Nationale Supérieure d\'Informatique et d\'Analyse des Systèmes',
        degree: 'Master en Systèmes d\'Information',
        year: '2015'
      },
      {
        institution: 'Université Abdelmalek Essaâdi',
        degree: 'Licence en Informatique',
        year: '2013'
      }
    ],
    skills: ['Gestion des Risques', 'Finance Agricole', 'Stratégie Régionale', 'Produits Financiers', 'Analyse']
  },
  {
    id: 'candidate-007',
    name: 'Naima Chraibi',
    title: 'Manager Financier Senior',
    initials: 'NC',
    tags: ['#finance', '#healthcare', '#pharma'],
    source: 'Glassdoor',
    appliedDate: '6 days ago',
    status: 'disqualified',
    stage: 'Disqualified',
    email: 'naima.chraibi@email.com',
    phone: '+212 6 12 34 56 77',
    location: 'Casablanca, Morocco',
    avatar: '/src/Assets/team/Nada Zaakoun.jpeg',
    experience: [
      {
        company: 'Laboratoires Pharmascience',
        position: 'Manager Financier Senior',
        duration: '2017 - Present',
        description: 'Géré la planification financière pour les opérations pharmaceutiques. Supervisé les investissements en R&D et les partenariats stratégiques.'
      },
      {
        company: 'Cooper Pharma',
        position: 'Analyste Financier',
        duration: '2014 - 2017',
        description: 'Effectué des analyses financières pour les projets de développement de médicaments. Développé des modèles de coûts pour les essais cliniques.'
      }
    ],
    education: [
      {
        institution: 'École Supérieure de Technologie',
        degree: 'Master en Gestion',
        year: '2014'
      },
      {
        institution: 'Université Hassan II',
        degree: 'Licence en Pharmacie',
        year: '2012'
      }
    ],
    skills: ['Finance Pharmaceutique', 'R&D', 'Essais Cliniques', 'Partenariats', 'Analyse de Coûts']
  }
]

export const JobPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>()
  const navigate = useNavigate()
  const [job, setJob] = useState<Job | null>(null)
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [activeStage, setActiveStage] = useState('Applied')
  const [showCandidateOverview, setShowCandidateOverview] = useState(false)
  const [showFloatingCandidates, setShowFloatingCandidates] = useState(true)
  const [candidateListPosition, setCandidateListPosition] = useState<'left' | 'right'>('left')

  useEffect(() => {
    // In a real app, fetch job data based on jobId
    setJob(mockJob)
    setCandidates(mockCandidates)
    setSelectedCandidate(mockCandidates[0])
  }, [jobId])

  const handleStageChange = (stage: string) => {
    setActiveStage(stage)
    // Filter candidates based on stage
    if (stage === 'All') {
      setCandidates(mockCandidates)
    } else {
      setCandidates(mockCandidates.filter(c => c.stage === stage))
    }
  }

  const handleCandidateSelect = (candidate: Candidate) => {
    setSelectedCandidate(candidate)
    setShowCandidateOverview(true)
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <motion.main
        className="flex-1 overflow-hidden"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-auto py-6">
            <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                className="flex flex-col w-full"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {/* Job Header */}
                <JobHeader
                  job={job}
                  activeStage={activeStage}
                  onStageChange={handleStageChange}
                />
                
                {/* Main Content Area */}
                <div className="flex-1 mt-6">
                  {/* Main Content Area */}
                  <div className="flex-1 overflow-y-auto min-w-0">
                    {selectedCandidate && (
                      <CandidateProfile
                        candidate={selectedCandidate}
                        onClose={() => setShowCandidateOverview(false)}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.main>

      {/* Candidate Overview Sheet */}
      {selectedCandidate && (
        <CandidateOverview
          candidate={selectedCandidate}
          open={showCandidateOverview}
          onClose={() => setShowCandidateOverview(false)}
        />
      )}

      {/* Floating Candidates List */}
      <FloatingCandidateList
        candidates={candidates}
        selectedCandidate={selectedCandidate}
        onCandidateSelect={handleCandidateSelect}
        activeStage={activeStage}
        isVisible={showFloatingCandidates}
        onToggleVisibility={() => setShowFloatingCandidates(!showFloatingCandidates)}
        position={candidateListPosition}
        onPositionChange={setCandidateListPosition}
      />
    </div>
  )
}
