import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  Send, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Upload,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

export interface ApplyContactSectionProps {
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

export const ApplyContactSection: React.FC<ApplyContactSectionProps> = ({
  data,
  settings,
  isSelected = false,
  onSelect,
  onSettingsChange
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    message: '',
    resume: null as File | null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const contactData = data.contact || {
    formFields: ['Name', 'Email', 'Message'],
    ctaText: 'Submit Application',
    mapLocation: 'Casablanca'
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, resume: file }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        message: '',
        resume: null
      })
    }, 3000)
  }

  const getBackgroundClass = () => {
    switch (settings.background) {
      case 'gradient':
        return 'bg-gradient-to-br from-blue-50 to-indigo-100'
      case 'light':
        return 'bg-gray-50'
      default:
        return 'bg-white'
    }
  }

  const getAnimationClass = () => {
    switch (settings.animation) {
      case 'fadeIn':
        return 'animate-fade-in'
      case 'slideUp':
        return 'animate-slide-up'
      case 'stagger':
        return 'animate-stagger'
      default:
        return ''
    }
  }

  return (
    <div 
      className={`${getBackgroundClass()} ${settings.spacing.padding} ${settings.spacing.margin} ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onSelect}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${getAnimationClass()}`}>
            Ready to Join Us?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start your journey with us today. We're excited to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Apply Now
              </CardTitle>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you soon
              </p>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Application Submitted!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for your interest. We'll be in touch soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        className="mt-1"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="mt-1"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="mt-1"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">Position of Interest</Label>
                      <Input
                        id="position"
                        type="text"
                        value={formData.position}
                        onChange={(e) => handleInputChange('position', e.target.value)}
                        className="mt-1"
                        placeholder="e.g., Software Engineer"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="mt-1"
                      rows={4}
                      placeholder="Tell us about yourself and why you're interested in joining our team..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="resume">Resume/CV</Label>
                    <div className="mt-1">
                      <Input
                        id="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        {contactData.ctaText}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Office Location */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Our Office
                    </h3>
                    <p className="text-gray-600">
                      {contactData.mapLocation}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Visit us for a coffee and chat about opportunities
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Methods */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Get in Touch
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-600">careers@company.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-600">+212 5XX XXX XXX</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-600">Mon-Fri, 9AM-6PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Apply */}
            <Card className="shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">
                  Quick Apply
                </h3>
                <p className="text-blue-100 mb-4">
                  Don't see the perfect role? Send us your resume anyway!
                </p>
                <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-gray-900">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Resume
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {isSelected && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 min-w-64 text-gray-900">
          <h3 className="font-semibold mb-3">Apply/Contact Settings</h3>
          
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
                <option value="stagger">Stagger</option>
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
                <option value="py-12">Small</option>
                <option value="py-16">Medium</option>
                <option value="py-20">Large</option>
                <option value="py-24">Extra Large</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
