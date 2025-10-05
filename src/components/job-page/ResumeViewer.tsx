import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  AwardIcon,
  BookOpenIcon,
  BriefcaseIcon,
  LightbulbIcon,
  StarIcon,
} from 'lucide-react'
import { 
  staggerContainer, 
  staggerItem, 
  cardVariants 
} from '../jobs/animations'

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

interface ResumeViewerProps {
  candidate: Candidate
}

export const ResumeViewer: React.FC<ResumeViewerProps> = ({ candidate }) => {
  return (
    <motion.div
      className="h-full overflow-y-auto"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
              <motion.div
                className="max-w-4xl mx-auto bg-card shadow-2xl rounded-xl p-6 border border-border"
                variants={cardVariants}
                whileHover="hover"
              >
        {/* Enhanced Resume Header */}
        <motion.div
          className="text-center mb-12 pb-8 border-b-2 border-primary/20"
          variants={staggerItem}
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {candidate.name.toUpperCase()}
          </h1>
          <h2 className="text-2xl font-semibold text-primary mb-6">
            {candidate.title.toUpperCase()}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-muted-foreground">
            <div className="flex items-center justify-center space-x-2">
              <MapPinIcon className="h-5 w-5" />
              <span className="text-lg">{candidate.location}</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <PhoneIcon className="h-5 w-5" />
              <span className="text-lg">{candidate.phone}</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <MailIcon className="h-5 w-5" />
              <span className="text-lg">{candidate.email}</span>
            </div>
          </div>
        </motion.div>

        {/* Professional Summary */}
        <motion.div
          className="mb-10"
          variants={staggerItem}
        >
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
            <BriefcaseIcon className="h-6 w-6 mr-3 text-primary" />
            PROFESSIONAL SUMMARY
          </h2>
          <div className="bg-muted/30 rounded-lg p-6">
            <p className="text-muted-foreground leading-relaxed text-lg">
              Accomplished finance professional with {candidate.experience?.length || 0}+ years of experience 
              in strategic financial planning, team leadership, and operational excellence. Proven track record 
              of driving cost optimization initiatives, implementing automated reporting systems, and managing 
              multi-million dollar budgets across diverse industries including technology, banking, and consulting.
            </p>
          </div>
        </motion.div>

        {/* Core Competencies */}
        <motion.div
          className="mb-10"
          variants={staggerItem}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <StarIcon className="h-6 w-6 mr-3 text-primary" />
            CORE COMPETENCIES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3 text-lg">Financial Management</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills?.slice(0, 4).map((skill, index) => (
                  <motion.div
                    key={skill}
                    variants={staggerItem}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Badge variant="secondary" className="text-sm px-3 py-1 bg-primary/10 text-primary border-primary/20">
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3 text-lg">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills?.slice(4, 8).map((skill, index) => (
                  <motion.div
                    key={skill}
                    variants={staggerItem}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Badge variant="outline" className="text-sm px-3 py-1">
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Professional Experience */}
        <motion.div
          className="mb-10"
          variants={staggerItem}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <BriefcaseIcon className="h-6 w-6 mr-3 text-primary" />
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-8">
            {candidate.experience?.map((exp, index) => (
              <motion.div
                key={index}
                className="relative pl-8 border-l-4 border-primary/30"
                variants={staggerItem}
                transition={{ delay: index * 0.1 }}
              >
                <div className="absolute -left-3 top-0 w-6 h-6 bg-primary rounded-full border-4 border-card"></div>
                <div className="bg-muted/20 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{exp.position}</h3>
                      <p className="text-lg font-semibold text-primary">{exp.company}</p>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                      {exp.duration}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          className="mb-10"
          variants={staggerItem}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <BookOpenIcon className="h-6 w-6 mr-3 text-primary" />
            EDUCATION
          </h2>
          <div className="space-y-4">
            {candidate.education?.map((edu, index) => (
              <motion.div
                key={index}
                className="flex justify-between items-center p-4 bg-muted/20 rounded-lg border border-border/50"
                variants={staggerItem}
                transition={{ delay: index * 0.1 }}
              >
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{edu.degree}</h3>
                  <p className="text-primary font-medium">{edu.institution}</p>
                </div>
                <span className="text-sm font-medium text-muted-foreground bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {edu.year}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Skills */}
        <motion.div
          className="mb-10"
          variants={staggerItem}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <LightbulbIcon className="h-6 w-6 mr-3 text-primary" />
            TECHNICAL EXPERTISE
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {candidate.skills?.map((skill, index) => (
              <motion.div
                key={skill}
                className="flex items-center space-x-2 p-3 bg-muted/20 rounded-lg"
                variants={staggerItem}
                transition={{ delay: index * 0.05 }}
              >
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground font-medium">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          className="mb-6"
          variants={staggerItem}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <AwardIcon className="h-6 w-6 mr-3 text-primary" />
            CERTIFICATIONS & ACHIEVEMENTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              className="flex items-center space-x-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
              variants={staggerItem}
            >
              <AwardIcon className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-700 dark:text-green-300">CFA Charterholder</h3>
                <p className="text-sm text-green-600 dark:text-green-400">Chartered Financial Analyst</p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center space-x-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg"
              variants={staggerItem}
            >
              <AwardIcon className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-blue-700 dark:text-blue-300">CPA Certified</h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">Certified Public Accountant</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
