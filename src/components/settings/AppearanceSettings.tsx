import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Palette, 
  Sun, 
  Moon, 
  Monitor, 
  Eye, 
  Layout, 
  Type, 
  Sparkles,
  CheckCircle,
  Zap,
  Settings
} from 'lucide-react'

const AppearanceSettings: React.FC = () => {
  const [theme, setTheme] = useState('system')
  const [accentColor, setAccentColor] = useState('blue')
  const [fontSize, setFontSize] = useState('medium')
  const [density, setDensity] = useState('comfortable')
  const [animations, setAnimations] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)

  const accentColors = [
    { id: 'blue', name: 'Blue', color: 'bg-blue-500' },
    { id: 'purple', name: 'Purple', color: 'bg-purple-500' },
    { id: 'green', name: 'Green', color: 'bg-green-500' },
    { id: 'orange', name: 'Orange', color: 'bg-orange-500' },
    { id: 'red', name: 'Red', color: 'bg-red-500' },
    { id: 'pink', name: 'Pink', color: 'bg-pink-500' },
    { id: 'indigo', name: 'Indigo', color: 'bg-indigo-500' },
    { id: 'teal', name: 'Teal', color: 'bg-teal-500' }
  ]

  const themes = [
    { id: 'light', name: 'Light', icon: <Sun className="h-4 w-4" />, description: 'Clean and bright interface' },
    { id: 'dark', name: 'Dark', icon: <Moon className="h-4 w-4" />, description: 'Easy on the eyes' },
    { id: 'system', name: 'System', icon: <Monitor className="h-4 w-4" />, description: 'Follows your system preference' }
  ]

  const fontSizes = [
    { id: 'small', name: 'Small', description: 'Compact interface' },
    { id: 'medium', name: 'Medium', description: 'Balanced and readable' },
    { id: 'large', name: 'Large', description: 'Easy to read' },
    { id: 'extra-large', name: 'Extra Large', description: 'Maximum accessibility' }
  ]

  const densities = [
    { id: 'compact', name: 'Compact', description: 'More content, less spacing' },
    { id: 'comfortable', name: 'Comfortable', description: 'Balanced spacing' },
    { id: 'spacious', name: 'Spacious', description: 'More breathing room' }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Appearance & Theme</h2>
          <p className="text-muted-foreground">Customize your interface and visual preferences</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="h-3 w-3" />
            New
          </Badge>
        </div>
      </div>

      <Separator />

      {/* Theme Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Theme Selection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themes.map((themeOption) => (
              <div
                key={themeOption.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  theme === themeOption.id 
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setTheme(themeOption.id)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${
                    theme === themeOption.id ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                  }`}>
                    {themeOption.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{themeOption.name}</h3>
                    <p className="text-sm text-muted-foreground">{themeOption.description}</p>
                  </div>
                </div>
                {theme === themeOption.id && (
                  <div className="flex items-center gap-1 text-primary text-sm">
                    <CheckCircle className="h-4 w-4" />
                    Selected
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Accent Color */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Accent Color
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Choose your preferred accent color for buttons, links, and highlights
            </p>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {accentColors.map((color) => (
                <div
                  key={color.id}
                  className={`relative cursor-pointer rounded-lg p-2 transition-all ${
                    accentColor === color.id ? 'ring-2 ring-primary ring-offset-2' : ''
                  }`}
                  onClick={() => setAccentColor(color.id)}
                >
                  <div className={`w-8 h-8 rounded-full ${color.color} mx-auto`}></div>
                  <p className="text-xs text-center mt-1">{color.name}</p>
                  {accentColor === color.id && (
                    <div className="absolute -top-1 -right-1">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Typography */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="h-5 w-5" />
            Typography
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="font-size">Font Size</Label>
            <Select value={fontSize} onValueChange={setFontSize}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontSizes.map((size) => (
                  <SelectItem key={size.id} value={size.id}>
                    <div>
                      <div className="font-medium">{size.name}</div>
                      <div className="text-sm text-muted-foreground">{size.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="density">Interface Density</Label>
            <Select value={density} onValueChange={setDensity}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {densities.map((densityOption) => (
                  <SelectItem key={densityOption.id} value={densityOption.id}>
                    <div>
                      <div className="font-medium">{densityOption.name}</div>
                      <div className="text-sm text-muted-foreground">{densityOption.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Layout Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layout className="h-5 w-5" />
            Layout Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="animations">Enable Animations</Label>
              <p className="text-sm text-muted-foreground">Smooth transitions and micro-interactions</p>
            </div>
            <Switch
              id="animations"
              checked={animations}
              onCheckedChange={setAnimations}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="reduced-motion">Reduce Motion</Label>
              <p className="text-sm text-muted-foreground">Minimize animations for accessibility</p>
            </div>
            <Switch
              id="reduced-motion"
              checked={reducedMotion}
              onCheckedChange={setReducedMotion}
            />
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-6 border rounded-lg bg-muted/30">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-medium">SB</span>
                </div>
                <div>
                  <h3 className="font-medium">Salma Bennani</h3>
                  <p className="text-sm text-muted-foreground">Senior HR Business Partner</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm">Primary Action</Button>
                <Button variant="outline" size="sm">Secondary</Button>
                <Button variant="ghost" size="sm">Tertiary</Button>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="p-3 bg-card border rounded text-center">
                  <div className="text-2xl font-bold text-primary">24</div>
                  <div className="text-xs text-muted-foreground">Active Jobs</div>
                </div>
                <div className="p-3 bg-card border rounded text-center">
                  <div className="text-2xl font-bold text-primary">1,247</div>
                  <div className="text-xs text-muted-foreground">Candidates</div>
                </div>
                <div className="p-3 bg-card border rounded text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-xs text-muted-foreground">Interviews</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Advanced Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="high-contrast">High Contrast Mode</Label>
              <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
            </div>
            <Switch id="high-contrast" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="focus-indicators">Enhanced Focus Indicators</Label>
              <p className="text-sm text-muted-foreground">More visible focus outlines for keyboard navigation</p>
            </div>
            <Switch id="focus-indicators" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="color-blind-support">Color Blind Support</Label>
              <p className="text-sm text-muted-foreground">Use patterns and shapes alongside colors</p>
            </div>
            <Switch id="color-blind-support" />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">
          Reset to Defaults
        </Button>
        <Button>
          Save Preferences
        </Button>
      </div>
    </div>
  )
}

export default AppearanceSettings

