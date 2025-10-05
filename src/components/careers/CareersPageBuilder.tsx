import React, { useState, useCallback } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTheme } from '@/contexts/ThemeContext'
import { SiteHeader } from '@/components/site-header'
import { 
  Save, 
  RotateCcw, 
  Eye, 
  Undo, 
  Redo, 
  Palette, 
  Monitor, 
  Tablet, 
  Smartphone,
  Plus,
  Settings,
  Move,
  Trash2,
  Film,
  Star,
  Palette as PaletteIcon,
  Gem,
  MessageCircle,
  BarChart3,
  FileText,
  Sparkles,
  ExternalLink,
  Sun,
  FileText as FileTextIcon,
  X,
  GripVertical
} from 'lucide-react'
import { HeroStorySection } from './sections/HeroStorySection'
import { SpotlightJobSection } from './sections/SpotlightJobSection'
import { CultureMosaicSection } from './sections/CultureMosaicSection'
import { BenefitsExperienceSection } from './sections/BenefitsExperienceSection'
import { TestimonialsCarouselSection } from './sections/TestimonialsCarouselSection'
import { FunFactsSection } from './sections/FunFactsSection'
import { ApplyContactSection } from './sections/ApplyContactSection'
import { CustomCreativeSection } from './sections/CustomCreativeSection'
import { ResumeBuilderSection } from './sections/ResumeBuilderSection'
import { careersData } from '../../app/careers/data'

export interface Section {
  id: string
  type: string
  title: string
  visible: boolean
  settings: {
    background: string
    animation: string
    spacing: {
      padding: string
      margin: string
    }
  }
}

export interface CareersPageBuilderProps {
  className?: string
}

const sectionTemplates = [
  {
    id: 'hero-story',
    title: 'Hero Story',
    description: 'Full-screen immersive hero with animated text',
    icon: Film,
    component: HeroStorySection
  },
  {
    id: 'spotlight-job',
    title: 'Spotlight Job',
    description: 'Featured job with interactive hover effects',
    icon: Star,
    component: SpotlightJobSection
  },
  {
    id: 'culture-mosaic',
    title: 'Culture Mosaic',
    description: 'Masonry grid of team photos and events',
    icon: PaletteIcon,
    component: CultureMosaicSection
  },
  {
    id: 'benefits-experience',
    title: 'Benefits Experience',
    description: 'Interactive icon cards with hover animations',
    icon: Gem,
    component: BenefitsExperienceSection
  },
  {
    id: 'testimonials-carousel',
    title: 'Testimonials Carousel',
    description: '3D carousel of employee quotes',
    icon: MessageCircle,
    component: TestimonialsCarouselSection
  },
  {
    id: 'fun-facts',
    title: 'Fun Facts',
    description: 'Animated counters and statistics',
    icon: BarChart3,
    component: FunFactsSection
  },
  {
    id: 'apply-contact',
    title: 'Apply / Contact',
    description: 'Interactive application form',
    icon: FileText,
    component: ApplyContactSection
  },
  {
    id: 'custom-creative',
    title: 'Custom Creative',
    description: 'WYSIWYG editor for custom content',
    icon: Sparkles,
    component: CustomCreativeSection
  },
  {
    id: 'resume-builder',
    title: 'Resume Builder',
    description: 'Professional resume creation tool',
    icon: FileTextIcon,
    component: ResumeBuilderSection
  }
]

export const CareersPageBuilder: React.FC<CareersPageBuilderProps> = ({ className }) => {
  const { theme } = useTheme()
  const [sections, setSections] = useState<Section[]>([
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
        animation: 'fadeIn',
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
        animation: 'slideUp',
        spacing: { padding: 'py-16', margin: 'my-8' }
      }
    },
    {
      id: 'fun-facts-1',
      type: 'fun-facts',
      title: 'Fun Facts',
      visible: true,
      settings: {
        background: 'white',
        animation: 'zoom',
        spacing: { padding: 'py-16', margin: 'my-8' }
      }
    },
    {
      id: 'apply-contact-1',
      type: 'apply-contact',
      title: 'Apply / Contact',
      visible: true,
      settings: {
        background: 'light',
        animation: 'slideUp',
        spacing: { padding: 'py-16', margin: 'my-8' }
      }
    },
    {
      id: 'custom-creative-1',
      type: 'custom-creative',
      title: 'Custom Creative',
      visible: true,
      settings: {
        background: 'white',
        animation: 'fadeIn',
        spacing: { padding: 'py-16', margin: 'my-8' }
      }
    }
  ])

  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [builderTheme, setBuilderTheme] = useState<'light' | 'gradient' | 'ocean' | 'sunset' | 'forest'>('light')
  const [history, setHistory] = useState<Section[][]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isCustomizationPanelOpen, setIsCustomizationPanelOpen] = useState(false)
  const [customizingSectionId, setCustomizingSectionId] = useState<string | null>(null)

  const addToHistory = useCallback((newSections: Section[]) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push([...newSections])
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }, [history, historyIndex])

  const handleDragEnd = useCallback((result: any) => {
    if (!result.destination) return

    const newSections = Array.from(sections)
    const [reorderedItem] = newSections.splice(result.source.index, 1)
    newSections.splice(result.destination.index, 0, reorderedItem)

    addToHistory(newSections)
    setSections(newSections)
  }, [sections, addToHistory])

  const addSection = useCallback((templateId: string) => {
    const template = sectionTemplates.find(t => t.id === templateId)
    if (!template) return

    const newSection: Section = {
      id: `${templateId}-${Date.now()}`,
      type: templateId,
      title: template.title,
      visible: true,
      settings: {
        background: 'white',
        animation: 'fadeIn',
        spacing: { padding: 'py-16', margin: 'my-8' }
      }
    }

    const newSections = [...sections, newSection]
    addToHistory(newSections)
    setSections(newSections)
  }, [sections, addToHistory])

  const removeSection = useCallback((sectionId: string) => {
    const newSections = sections.filter(s => s.id !== sectionId)
    addToHistory(newSections)
    setSections(newSections)
    if (selectedSection === sectionId) {
      setSelectedSection(null)
    }
  }, [sections, selectedSection, addToHistory])

  const updateSectionSettings = useCallback((sectionId: string, settings: Partial<Section['settings']>) => {
    const newSections = sections.map(s => 
      s.id === sectionId 
        ? { ...s, settings: { ...s.settings, ...settings } }
        : s
    )
    addToHistory(newSections)
    setSections(newSections)
  }, [sections, addToHistory])

  const toggleSectionVisibility = useCallback((sectionId: string) => {
    const newSections = sections.map(s => 
      s.id === sectionId 
        ? { ...s, visible: !s.visible }
        : s
    )
    addToHistory(newSections)
    setSections(newSections)
  }, [sections, addToHistory])

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setSections(history[historyIndex - 1])
    }
  }, [historyIndex, history])

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setSections(history[historyIndex + 1])
    }
  }, [historyIndex, history])

  const reset = useCallback(() => {
    const defaultSections: Section[] = [
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
      }
    ]
    addToHistory(defaultSections)
    setSections(defaultSections)
  }, [addToHistory])

  const save = useCallback(() => {
    // Save logic would go here
    console.log('Saving careers page:', sections)
  }, [sections])

  const handlePreviewPage = () => {
    window.open('/careers', '_blank')
  }

  const openCustomizationPanel = useCallback((sectionId: string) => {
    setCustomizingSectionId(sectionId)
    setIsCustomizationPanelOpen(true)
  }, [])

  const closeCustomizationPanel = useCallback(() => {
    setIsCustomizationPanelOpen(false)
    setCustomizingSectionId(null)
  }, [])

  const handleMoveSection = useCallback((sectionId: string, direction: 'up' | 'down') => {
    const currentIndex = sections.findIndex(s => s.id === sectionId)
    if (currentIndex === -1) return

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= sections.length) return

    const newSections = [...sections]
    const [movedSection] = newSections.splice(currentIndex, 1)
    newSections.splice(newIndex, 0, movedSection)

    addToHistory(newSections)
    setSections(newSections)
  }, [sections, addToHistory])

  const themeConfig = {
    light: { bg: 'bg-gray-50', sidebar: 'bg-white border-gray-200', canvas: 'bg-gray-100', preview: 'bg-white' },
    gradient: { bg: 'bg-gradient-to-br from-blue-50 to-purple-50', sidebar: 'bg-white/90 border-gray-200', canvas: 'bg-gradient-to-br from-blue-100 to-purple-100', preview: 'bg-white' },
    ocean: { bg: 'bg-gradient-to-br from-blue-50 to-cyan-50', sidebar: 'bg-white/90 border-blue-200', canvas: 'bg-gradient-to-br from-blue-100 to-cyan-100', preview: 'bg-white' },
    sunset: { bg: 'bg-gradient-to-br from-orange-50 to-pink-50', sidebar: 'bg-white/90 border-orange-200', canvas: 'bg-gradient-to-br from-orange-100 to-pink-100', preview: 'bg-white' },
    forest: { bg: 'bg-gradient-to-br from-green-50 to-emerald-50', sidebar: 'bg-white/90 border-green-200', canvas: 'bg-gradient-to-br from-green-100 to-emerald-100', preview: 'bg-white' }
  }

  const getThemeForSections = () => {
    // Map builder themes to actual theme values that affect content colors
    switch (builderTheme) {
      case 'light':
        return 'light'
      case 'gradient':
      case 'ocean':
      case 'sunset':
      case 'forest':
        return 'dark'
      default:
        return 'light'
    }
  }

  const renderSection = (section: Section) => {
    const template = sectionTemplates.find(t => t.id === section.type)
    if (!template) return null

    const SectionComponent = template.component
    return (
      <SectionComponent
        key={section.id}
        data={careersData}
        settings={section.settings}
        isSelected={selectedSection === section.id}
        onSelect={() => setSelectedSection(section.id)}
        onSettingsChange={(settings) => updateSectionSettings(section.id, settings)}
        theme={getThemeForSections()}
      />
    )
  }

  const getPreviewClass = () => {
    switch (previewMode) {
      case 'tablet': return 'max-w-3xl mx-auto'
      case 'mobile': return 'max-w-sm mx-auto border border-gray-300 rounded-lg overflow-hidden'
      default: return 'w-full'
    }
  }

  const getPreviewStyles = () => {
    switch (previewMode) {
      case 'tablet': return { maxWidth: '768px', margin: '0 auto' }
      case 'mobile': return { maxWidth: '375px', margin: '0 auto', minHeight: '667px' }
      default: return { width: '100%' }
    }
  }

  return (
    <div className={`flex flex-col h-screen ${themeConfig[builderTheme].bg} ${theme === 'dark' ? 'dark' : ''} ${className}`}>
      {/* Site Header - Top Element */}
      <div className="sticky top-0 z-50 bg-background border-b border-border">
        <SiteHeader />
      </div>
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 lg:w-80 md:w-64 sm:w-56 bg-background border-border border-r flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Careers Page Builder</h2>
        </div>

        <Tabs defaultValue="sections" className="flex-1 flex flex-col px-2">
          <TabsList className="grid w-full grid-cols-2 my-2">
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="sections" className="flex-1 overflow-y-auto px-4">
            <div className="space-y-2">
              <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-700'} mb-3`}>Page Sections</h3>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="sections">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                      {sections.map((section, index) => (
                        <Draggable key={section.id} draggableId={section.id} index={index}>
                          {(provided, snapshot) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`cursor-pointer transition-all ${
                                selectedSection === section.id ? 'ring-2 ring-blue-500' : ''
                              } ${snapshot.isDragging ? 'shadow-lg' : ''}`}
                            >
                              <CardContent className="p-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <div {...provided.dragHandleProps}>
                                      <Move className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">{section.title}</p>
                                      <p className="text-xs text-gray-500">{section.type}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => toggleSectionVisibility(section.id)}
                                    >
                                      <Eye className={`h-4 w-4 ${section.visible ? 'text-green-500' : 'text-gray-400'}`} />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => openCustomizationPanel(section.id)}
                                    >
                                      <Settings className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeSection(section.id)}
                                    >
                                      <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="flex-1 overflow-y-auto px-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Add Section</h3>
              {sectionTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => addSection(template.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 flex items-center justify-center text-blue-600">
                        <template.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{template.title}</p>
                        <p className="text-xs text-gray-500">{template.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-background border-b border-border p-2 lg:p-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-2 lg:space-y-0">
            <div className="flex items-center space-x-2 lg:space-x-4 flex-wrap">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={undo} disabled={historyIndex <= 0}>
                  <Undo className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={redo} disabled={historyIndex >= history.length - 1}>
                  <Redo className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" size="sm" onClick={reset}>
                <RotateCcw className="h-4 w-4 mr-1 lg:mr-2" />
                <span className="hidden sm:inline">Reset</span>
              </Button>
              <Button size="sm" onClick={save}>
                <Save className="h-4 w-4 mr-1 lg:mr-2" />
                <span className="hidden sm:inline">Save</span>
              </Button>
              <Button variant="default" size="sm" onClick={handlePreviewPage}>
                <ExternalLink className="h-4 w-4 mr-1 lg:mr-2" />
                <span className="hidden lg:inline">Preview Live Page</span>
                <span className="lg:hidden">Preview</span>
              </Button>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:space-x-4">
              <div className="flex items-center space-x-2">
                <span className={`text-xs lg:text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`}>Theme:</span>
                <div className="flex space-x-1">
                  {(['light', 'gradient', 'ocean', 'sunset', 'forest'] as const).map((themeOption) => (
                    <Button
                      key={themeOption}
                      variant={builderTheme === themeOption ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setBuilderTheme(themeOption)}
                      className="h-6 lg:h-8 px-1 lg:px-2"
                      title={themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
                    >
                      {themeOption === 'light' && <Sun className="h-3 w-3 lg:h-4 lg:w-4" />}
                      {themeOption === 'gradient' && <Palette className="h-3 w-3 lg:h-4 lg:w-4" />}
                      {themeOption === 'ocean' && <div className="h-3 w-3 lg:h-4 lg:w-4 bg-blue-500 rounded" />}
                      {themeOption === 'sunset' && <div className="h-3 w-3 lg:h-4 lg:w-4 bg-orange-500 rounded" />}
                      {themeOption === 'forest' && <div className="h-3 w-3 lg:h-4 lg:w-4 bg-green-500 rounded" />}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className={`text-xs lg:text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`}>Preview:</span>
                <div className="flex space-x-1">
                  {(['desktop', 'tablet', 'mobile'] as const).map((mode) => (
                    <Button
                      key={mode}
                      variant={previewMode === mode ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPreviewMode(mode)}
                      className="h-6 lg:h-8 px-1 lg:px-2"
                      title={mode.charAt(0).toUpperCase() + mode.slice(1)}
                    >
                      {mode === 'desktop' && <Monitor className="h-3 w-3 lg:h-4 lg:w-4" />}
                      {mode === 'tablet' && <Tablet className="h-3 w-3 lg:h-4 lg:w-4" />}
                      {mode === 'mobile' && <Smartphone className="h-3 w-3 lg:h-4 lg:w-4" />}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-y-auto bg-background p-2 lg:p-4">
          <div 
            className={`${getPreviewClass()} ${themeConfig[builderTheme].preview} min-h-full shadow-lg transition-all duration-300 ${previewMode === 'mobile' ? 'mobile-preview' : ''} careers-page ${getThemeForSections() === 'dark' ? 'dark' : ''}`}
            style={getPreviewStyles()}
          >
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="canvas">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {sections.filter(s => s.visible).map((section, index) => (
                      <Draggable key={section.id} draggableId={section.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="relative group"
                          >
                            {renderSection(section)}
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="flex space-x-1">
                                <Button 
                                  variant="secondary" 
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    openCustomizationPanel(section.id)
                                  }}
                                  title="Customize Section"
                                >
                                  <Settings className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="secondary" 
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleMoveSection(section.id, 'up')
                                  }}
                                  title="Move Up"
                                >
                                  <Move className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="secondary" 
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleSectionVisibility(section.id)
                                  }}
                                  title={section.visible ? "Hide Section" : "Show Section"}
                                >
                                  <Eye className={`h-4 w-4 ${section.visible ? 'text-green-500' : 'text-gray-400'}`} />
                                </Button>
                                <Button 
                                  variant="secondary" 
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    removeSection(section.id)
                                  }}
                                  title="Delete Section"
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
          </div>
        </div>
      </div>
      </div>

      {/* Customization Panel */}
      {isCustomizationPanelOpen && customizingSectionId && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={closeCustomizationPanel}>
          <div 
            className="absolute right-0 top-0 h-full w-96 bg-background border-l border-border shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Customize Section</h3>
                <Button variant="ghost" size="sm" onClick={closeCustomizationPanel}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-4 space-y-6 overflow-y-auto h-full">
              {(() => {
                const section = sections.find(s => s.id === customizingSectionId)
                if (!section) return null

                return (
                  <>
                    <div>
                      <Label className="text-sm font-medium">Section Title</Label>
                      <Input
                        value={section.title}
                        onChange={(e) => {
                          const newSections = sections.map(s => 
                            s.id === customizingSectionId 
                              ? { ...s, title: e.target.value }
                              : s
                          )
                          addToHistory(newSections)
                          setSections(newSections)
                        }}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Background</Label>
                      <Select
                        value={section.settings.background}
                        onValueChange={(value) => updateSectionSettings(customizingSectionId, { background: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="white">White</SelectItem>
                          <SelectItem value="light">Light Gray</SelectItem>
                          <SelectItem value="gradient">Gradient</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Animation</Label>
                      <Select
                        value={section.settings.animation}
                        onValueChange={(value) => updateSectionSettings(customizingSectionId, { animation: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fadeIn">Fade In</SelectItem>
                          <SelectItem value="slideUp">Slide Up</SelectItem>
                          <SelectItem value="slideDown">Slide Down</SelectItem>
                          <SelectItem value="zoom">Zoom</SelectItem>
                          <SelectItem value="stagger">Stagger</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Padding</Label>
                      <Select
                        value={section.settings.spacing.padding}
                        onValueChange={(value) => updateSectionSettings(customizingSectionId, { 
                          spacing: { ...section.settings.spacing, padding: value }
                        })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="py-8">Small (py-8)</SelectItem>
                          <SelectItem value="py-12">Medium (py-12)</SelectItem>
                          <SelectItem value="py-16">Large (py-16)</SelectItem>
                          <SelectItem value="py-20">Extra Large (py-20)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Margin</Label>
                      <Select
                        value={section.settings.spacing.margin}
                        onValueChange={(value) => updateSectionSettings(customizingSectionId, { 
                          spacing: { ...section.settings.spacing, margin: value }
                        })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="my-0">None (my-0)</SelectItem>
                          <SelectItem value="my-4">Small (my-4)</SelectItem>
                          <SelectItem value="my-8">Medium (my-8)</SelectItem>
                          <SelectItem value="my-12">Large (my-12)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMoveSection(customizingSectionId, 'up')}
                          disabled={sections.findIndex(s => s.id === customizingSectionId) === 0}
                        >
                          Move Up
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMoveSection(customizingSectionId, 'down')}
                          disabled={sections.findIndex(s => s.id === customizingSectionId) === sections.length - 1}
                        >
                          Move Down
                        </Button>
                      </div>
                    </div>
                  </>
                )
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
