import React from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { HeroStorySection } from './sections/HeroStorySection'
import { SpotlightJobSection } from './sections/SpotlightJobSection'
import { CultureMosaicSection } from './sections/CultureMosaicSection'
import { BenefitsExperienceSection } from './sections/BenefitsExperienceSection'
import { TestimonialsCarouselSection } from './sections/TestimonialsCarouselSection'
import { FunFactsSection } from './sections/FunFactsSection'
import { ApplyContactSection } from './sections/ApplyContactSection'
import { CustomCreativeSection } from './sections/CustomCreativeSection'
import { careersData } from '../../app/careers/data'

export const CareersPage: React.FC = () => {
  const { theme } = useTheme()
  
  // Default sections for the careers page - respects user theme
  const defaultSections = [
    {
      id: 'hero-1',
      type: 'hero-story',
      title: 'Hero Story',
      visible: true,
      settings: {
        background: 'gradient',
        animation: 'fadeIn',
        spacing: { padding: 'py-20', margin: 'my-0' }
      }
    },
    {
      id: 'spotlight-1',
      type: 'spotlight-job',
      title: 'Spotlight Job',
      visible: true,
      settings: {
        background: 'white',
        animation: 'slideUp',
        spacing: { padding: 'py-16', margin: 'my-8' }
      }
    },
    {
      id: 'culture-1',
      type: 'culture-mosaic',
      title: 'Culture Mosaic',
      visible: true,
      settings: {
        background: 'light',
        animation: 'stagger',
        spacing: { padding: 'py-16', margin: 'my-8' }
      }
    },
    {
      id: 'benefits-1',
      type: 'benefits-experience',
      title: 'Benefits Experience',
      visible: true,
      settings: {
        background: 'white',
        animation: 'hoverGlow',
        spacing: { padding: 'py-16', margin: 'my-8' }
      }
    },
    {
      id: 'testimonials-1',
      type: 'testimonials-carousel',
      title: 'Testimonials Carousel',
      visible: true,
      settings: {
        background: 'light',
        animation: 'fadeIn',
        spacing: { padding: 'py-16', margin: 'my-8' }
      }
    },
    {
      id: 'funfacts-1',
      type: 'fun-facts',
      title: 'Fun Facts',
      visible: true,
      settings: {
        background: 'white',
        animation: 'zoomIn',
        spacing: { padding: 'py-16', margin: 'my-8' }
      }
    },
    {
      id: 'apply-1',
      type: 'apply-contact',
      title: 'Apply / Contact',
      visible: true,
      settings: {
        background: 'light',
        animation: 'slideUp',
        spacing: { padding: 'py-16', margin: 'my-8' }
      }
    }
  ]

  const renderSection = (section: any) => {
    const sectionProps = {
      data: careersData,
      settings: section.settings,
      isSelected: false,
      onSelect: () => {},
      onSettingsChange: () => {},
      theme: theme
    }

    switch (section.type) {
      case 'hero-story':
        return <HeroStorySection key={section.id} {...sectionProps} />
      case 'spotlight-job':
        return <SpotlightJobSection key={section.id} {...sectionProps} />
      case 'culture-mosaic':
        return <CultureMosaicSection key={section.id} {...sectionProps} />
      case 'benefits-experience':
        return <BenefitsExperienceSection key={section.id} {...sectionProps} />
      case 'testimonials-carousel':
        return <TestimonialsCarouselSection key={section.id} {...sectionProps} />
      case 'fun-facts':
        return <FunFactsSection key={section.id} {...sectionProps} />
      case 'apply-contact':
        return <ApplyContactSection key={section.id} {...sectionProps} />
      case 'custom-creative':
        return <CustomCreativeSection key={section.id} {...sectionProps} />
      default:
        return null
    }
  }

  return (
    <div className={`min-h-screen bg-background text-foreground careers-page ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Fixed Header with Logo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-sm">
        <div className="flex items-center justify-center h-16 px-4">
          <img 
            src="/src/Assets/jobsyn_recruitment.svg" 
            alt="Jobzyn Logo" 
            className="h-8 w-auto"
          />
        </div>
      </header>
      
      {/* Content with top padding to account for fixed header */}
      <div className="pt-16">
        {defaultSections.map(renderSection)}
      </div>
    </div>
  )
}
