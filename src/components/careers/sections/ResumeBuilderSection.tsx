import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  FileText, 
  Download, 
  Eye, 
  Edit,
  Plus,
  Trash2,
  Save,
  Upload
} from 'lucide-react'

export interface ResumeBuilderSectionProps {
  data: any
  settings: {
    background: string
    animation: string
    spacing: {
      padding: string
      margin: string
    }
  }
  isSelected?: boolean
  onSelect?: () => void
  onSettingsChange?: (settings: any) => void
}

export const ResumeBuilderSection: React.FC<ResumeBuilderSectionProps> = ({
  data,
  settings,
  isSelected = false,
  onSelect,
  onSettingsChange
}) => {
  const [activeTab, setActiveTab] = useState<'builder' | 'templates' | 'preview'>('builder')
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: []
  })

  const getBackgroundClass = () => {
    switch (settings.background) {
      case 'gradient':
        return 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      case 'light':
        return 'bg-gray-50'
      default:
        return 'bg-white'
    }
  }

  const getSectionAnimationClass = () => {
    switch (settings.animation) {
      case 'fadeIn':
        return 'animate-fade-in'
      case 'slideUp':
        return 'animate-slide-up'
      case 'zoom':
        return 'animate-zoom-in'
      default:
        return ''
    }
  }

  const handleAddExperience = () => {
    const newExperience = {
      id: Date.now(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
    }))
  }

  const handleAddEducation = () => {
    const newEducation = {
      id: Date.now(),
      degree: '',
      school: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: ''
    }
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }))
  }

  const handleAddSkill = () => {
    const newSkill = {
      id: Date.now(),
      name: '',
      level: 'intermediate'
    }
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }))
  }

  const handleAddProject = () => {
    const newProject = {
      id: Date.now(),
      name: '',
      description: '',
      technologies: '',
      url: '',
      github: ''
    }
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }))
  }

  const handleDeleteItem = (section: string, id: number) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((item: any) => item.id !== id)
    }))
  }

  const handleInputChange = (section: string, id: number, field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map((item: any) => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }))
  }

  const handlePersonalInfoChange = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }))
  }

  return (
    <div 
      className={`relative ${getBackgroundClass()} ${settings.spacing.padding} ${settings.spacing.margin} ${getSectionAnimationClass()} ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onSelect}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Resume Builder
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create a professional resume that stands out to employers. Build, customize, and download your resume in minutes.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            <button
              onClick={() => setActiveTab('builder')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'builder'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Edit className="h-4 w-4 inline mr-2" />
              Builder
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'templates'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileText className="h-4 w-4 inline mr-2" />
              Templates
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'preview'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Eye className="h-4 w-4 inline mr-2" />
              Preview
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'builder' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Personal Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={resumeData.personalInfo.name}
                    onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={resumeData.personalInfo.email}
                    onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={resumeData.personalInfo.location}
                    onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="New York, NY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                  <input
                    type="url"
                    value={resumeData.personalInfo.linkedin}
                    onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://linkedin.com/in/johndoe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio</label>
                  <input
                    type="url"
                    value={resumeData.personalInfo.portfolio}
                    onChange={(e) => handlePersonalInfoChange('portfolio', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://johndoe.com"
                  />
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Summary</h3>
              <textarea
                value={resumeData.summary}
                onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Write a brief summary of your professional background and key achievements..."
              />
            </div>

            {/* Experience */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Work Experience</h3>
                <Button onClick={handleAddExperience} size="sm" className="text-gray-900">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Experience
                </Button>
              </div>
              {resumeData.experience.map((exp: any) => (
                <Card key={exp.id} className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-medium text-gray-900">Experience Entry</h4>
                      <Button
                        onClick={() => handleDeleteItem('experience', exp.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) => handleInputChange('experience', exp.id, 'title', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Software Engineer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleInputChange('experience', exp.id, 'company', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Tech Company Inc."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => handleInputChange('experience', exp.id, 'location', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="San Francisco, CA"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => handleInputChange('experience', exp.id, 'startDate', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Jan 2020"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <input
                          type="text"
                          value={exp.endDate}
                          onChange={(e) => handleInputChange('experience', exp.id, 'endDate', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Present"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => handleInputChange('experience', exp.id, 'current', e.target.checked)}
                          className="mr-2"
                        />
                        <label className="text-sm font-medium text-gray-700">Currently working here</label>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => handleInputChange('experience', exp.id, 'description', e.target.value)}
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Describe your key responsibilities and achievements..."
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Education */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Education</h3>
                <Button onClick={handleAddEducation} size="sm" className="text-gray-900">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education
                </Button>
              </div>
              {resumeData.education.map((edu: any) => (
                <Card key={edu.id} className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-medium text-gray-900">Education Entry</h4>
                      <Button
                        onClick={() => handleDeleteItem('education', edu.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleInputChange('education', edu.id, 'degree', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Bachelor of Science in Computer Science"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">School</label>
                        <input
                          type="text"
                          value={edu.school}
                          onChange={(e) => handleInputChange('education', edu.id, 'school', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="University of California"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          value={edu.location}
                          onChange={(e) => handleInputChange('education', edu.id, 'location', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Berkeley, CA"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">GPA</label>
                        <input
                          type="text"
                          value={edu.gpa}
                          onChange={(e) => handleInputChange('education', edu.id, 'gpa', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="3.8/4.0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <input
                          type="text"
                          value={edu.startDate}
                          onChange={(e) => handleInputChange('education', edu.id, 'startDate', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Sep 2016"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <input
                          type="text"
                          value={edu.endDate}
                          onChange={(e) => handleInputChange('education', edu.id, 'endDate', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="May 2020"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={edu.description}
                        onChange={(e) => handleInputChange('education', edu.id, 'description', e.target.value)}
                        rows={2}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Relevant coursework, honors, or achievements..."
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Skills */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Skills</h3>
                <Button onClick={handleAddSkill} size="sm" className="text-gray-900">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Skill
                </Button>
              </div>
              {resumeData.skills.map((skill: any) => (
                <Card key={skill.id} className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => handleInputChange('skills', skill.id, 'name', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="JavaScript"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                          <select
                            value={skill.level}
                            onChange={(e) => handleInputChange('skills', skill.id, 'level', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="expert">Expert</option>
                          </select>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleDeleteItem('skills', skill.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 ml-4"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Projects */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Projects</h3>
                <Button onClick={handleAddProject} size="sm" className="text-gray-900">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              </div>
              {resumeData.projects.map((project: any) => (
                <Card key={project.id} className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-medium text-gray-900">Project Entry</h4>
                      <Button
                        onClick={() => handleDeleteItem('projects', project.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                        <input
                          type="text"
                          value={project.name}
                          onChange={(e) => handleInputChange('projects', project.id, 'name', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="E-commerce Website"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Technologies</label>
                        <input
                          type="text"
                          value={project.technologies}
                          onChange={(e) => handleInputChange('projects', project.id, 'technologies', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="React, Node.js, MongoDB"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Live URL</label>
                        <input
                          type="url"
                          value={project.url}
                          onChange={(e) => handleInputChange('projects', project.id, 'url', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://project.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                        <input
                          type="url"
                          value={project.github}
                          onChange={(e) => handleInputChange('projects', project.id, 'github', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://github.com/username/project"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={project.description}
                        onChange={(e) => handleInputChange('projects', project.id, 'description', e.target.value)}
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Describe the project, your role, and key achievements..."
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="text-gray-900">
                <Save className="h-5 w-5 mr-2" />
                Save Resume
              </Button>
              <Button size="lg" variant="outline" className="text-gray-900">
                <Download className="h-5 w-5 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Choose a Template</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Modern', description: 'Clean and contemporary design' },
                { name: 'Professional', description: 'Traditional business style' },
                { name: 'Creative', description: 'Bold and artistic layout' },
                { name: 'Minimalist', description: 'Simple and elegant' },
                { name: 'Technical', description: 'Perfect for developers' },
                { name: 'Executive', description: 'Senior-level presentation' }
              ].map((template, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="aspect-[3/4] bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                      <FileText className="h-12 w-12 text-gray-400" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{template.name}</h4>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Resume Preview</h3>
              <Button size="sm" className="text-gray-900">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                {/* Resume Preview Content */}
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {resumeData.personalInfo.name || 'Your Name'}
                  </h1>
                  <div className="text-gray-600 space-y-1">
                    <p>{resumeData.personalInfo.email || 'your.email@example.com'}</p>
                    <p>{resumeData.personalInfo.phone || '+1 (555) 123-4567'}</p>
                    <p>{resumeData.personalInfo.location || 'Your Location'}</p>
                    {resumeData.personalInfo.linkedin && (
                      <p>LinkedIn: {resumeData.personalInfo.linkedin}</p>
                    )}
                    {resumeData.personalInfo.portfolio && (
                      <p>Portfolio: {resumeData.personalInfo.portfolio}</p>
                    )}
                  </div>
                </div>

                {resumeData.summary && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Professional Summary</h2>
                    <p className="text-gray-700">{resumeData.summary}</p>
                  </div>
                )}

                {resumeData.experience.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Work Experience</h2>
                    {resumeData.experience.map((exp: any) => (
                      <div key={exp.id} className="mb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">{exp.title || 'Job Title'}</h3>
                            <p className="text-gray-600">{exp.company || 'Company Name'}</p>
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            <p>{exp.startDate || 'Start Date'} - {exp.endDate || 'End Date'}</p>
                            <p>{exp.location || 'Location'}</p>
                          </div>
                        </div>
                        {exp.description && (
                          <p className="text-gray-700 mt-2">{exp.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {resumeData.education.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Education</h2>
                    {resumeData.education.map((edu: any) => (
                      <div key={edu.id} className="mb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">{edu.degree || 'Degree'}</h3>
                            <p className="text-gray-600">{edu.school || 'School Name'}</p>
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            <p>{edu.startDate || 'Start Date'} - {edu.endDate || 'End Date'}</p>
                            {edu.gpa && <p>GPA: {edu.gpa}</p>}
                          </div>
                        </div>
                        {edu.description && (
                          <p className="text-gray-700 mt-2">{edu.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {resumeData.skills.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill: any) => (
                        <span key={skill.id} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {skill.name || 'Skill Name'} ({skill.level || 'Level'})
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {resumeData.projects.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Projects</h2>
                    {resumeData.projects.map((project: any) => (
                      <div key={project.id} className="mb-4">
                        <h3 className="font-semibold text-gray-900">{project.name || 'Project Name'}</h3>
                        {project.technologies && (
                          <p className="text-sm text-gray-600 mb-1">Technologies: {project.technologies}</p>
                        )}
                        {project.description && (
                          <p className="text-gray-700">{project.description}</p>
                        )}
                        <div className="flex space-x-4 mt-2">
                          {project.url && (
                            <a href={project.url} className="text-blue-600 text-sm hover:underline">Live Demo</a>
                          )}
                          {project.github && (
                            <a href={project.github} className="text-blue-600 text-sm hover:underline">GitHub</a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Settings Panel */}
      {isSelected && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 min-w-64 text-gray-900">
          <h3 className="font-semibold mb-3">Resume Builder Settings</h3>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Background</label>
              <select 
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={settings.background}
                onChange={(e) => onSettingsChange?.({ background: e.target.value })}
              >
                <option value="white">White</option>
                <option value="light">Light Gray</option>
                <option value="gradient">Gradient</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Animation</label>
              <select 
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={settings.animation}
                onChange={(e) => onSettingsChange?.({ animation: e.target.value })}
              >
                <option value="fadeIn">Fade In</option>
                <option value="slideUp">Slide Up</option>
                <option value="zoom">Zoom In</option>
                <option value="none">None</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">Spacing</label>
              <select 
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={settings.spacing.padding}
                onChange={(e) => onSettingsChange?.({ 
                  spacing: { ...settings.spacing, padding: e.target.value }
                })}
              >
                <option value="py-8">Small</option>
                <option value="py-12">Medium</option>
                <option value="py-16">Large</option>
                <option value="py-20">Extra Large</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


