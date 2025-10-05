import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { 
  Edit3, 
  Save, 
  Eye, 
  Code,
  Palette,
  Type,
  Image,
  Video,
  Link
} from 'lucide-react'

export interface CustomCreativeSectionProps {
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

export const CustomCreativeSection: React.FC<CustomCreativeSectionProps> = ({
  data,
  settings,
  isSelected = false,
  onSelect,
  onSettingsChange
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [htmlContent, setHtmlContent] = useState(`<div class="text-center p-8">
  <h3 class="text-2xl font-bold mb-4">Our Core Values</h3>
  <p class="text-lg">Innovation, Collaboration, Excellence</p>
</div>`)
  const [previewMode, setPreviewMode] = useState<'visual' | 'code'>('visual')

  const customSections = data.customSections || []

  const getBackgroundClass = () => {
    switch (settings.background) {
      case 'gradient':
        return 'bg-gradient-to-br from-purple-50 to-pink-50'
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
      case 'zoom':
        return 'animate-zoom-in'
      default:
        return ''
    }
  }

  const handleSave = () => {
    // Save logic would go here
    console.log('Saving custom content:', htmlContent)
    setIsEditing(false)
  }

  const insertElement = (type: string) => {
    let element = ''
    switch (type) {
      case 'heading':
        element = '<h2 class="text-3xl font-bold mb-4">Your Heading</h2>'
        break
      case 'paragraph':
        element = '<p class="text-lg mb-4">Your paragraph text here...</p>'
        break
      case 'image':
        element = '<img src="https://via.placeholder.com/400x300" alt="Your image" class="rounded-lg shadow-lg" />'
        break
      case 'video':
        element = '<video controls class="rounded-lg shadow-lg"><source src="your-video.mp4" type="video/mp4"></video>'
        break
      case 'link':
        element = '<a href="#" class="text-blue-600 hover:text-blue-800 underline">Your link text</a>'
        break
    }
    setHtmlContent(prev => prev + '\n' + element)
  }

  return (
    <div 
      className={`${getBackgroundClass()} ${settings.spacing.padding} ${settings.spacing.margin} ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onSelect}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${getAnimationClass()}`}>
            Custom Creative Content
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create unique sections with our WYSIWYG editor
          </p>
        </div>

        {/* Editor Controls */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Edit3 className="h-5 w-5" />
                <span>Content Editor</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  variant={previewMode === 'visual' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewMode('visual')}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Visual
                </Button>
                <Button
                  variant={previewMode === 'code' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewMode('code')}
                >
                  <Code className="h-4 w-4 mr-2" />
                  Code
                </Button>
                {isEditing && (
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center space-x-2 mb-4 p-4 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700 mr-4">Insert:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => insertElement('heading')}
              >
                <Type className="h-4 w-4 mr-1" />
                Heading
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => insertElement('paragraph')}
              >
                <Type className="h-4 w-4 mr-1" />
                Text
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => insertElement('image')}
              >
                <Image className="h-4 w-4 mr-1" />
                Image
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => insertElement('video')}
              >
                <Video className="h-4 w-4 mr-1" />
                Video
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => insertElement('link')}
              >
                <Link className="h-4 w-4 mr-1" />
                Link
              </Button>
            </div>

            {/* Editor */}
            {previewMode === 'visual' ? (
              <div className="border border-gray-300 rounded-lg p-6 min-h-64 bg-white">
                <div 
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                  className="prose max-w-none"
                />
                {isEditing && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700">
                      Click "Code" mode to edit the HTML directly
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <Textarea
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                className="min-h-64 font-mono text-sm"
                placeholder="Enter your HTML content here..."
                onFocus={() => setIsEditing(true)}
              />
            )}
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border border-gray-200 rounded-lg p-8 bg-white">
              <div 
                dangerouslySetInnerHTML={{ __html: htmlContent }}
                className="prose max-w-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Existing Custom Sections */}
        {customSections.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Existing Custom Sections</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customSections.map((section: any, index: number) => (
                <Card key={index} className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div 
                      dangerouslySetInnerHTML={{ __html: section.html }}
                      className="prose max-w-none text-sm"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Settings Panel */}
      {isSelected && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 min-w-64 text-gray-900">
          <h3 className="font-semibold mb-3">Custom Creative Settings</h3>
          
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
