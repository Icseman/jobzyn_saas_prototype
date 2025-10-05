# Careers Page Builder Documentation

## Overview

The Careers Page Builder is a comprehensive drag-and-drop interface that allows users to create, customize, and manage their company's careers page. It provides a visual editor with real-time preview capabilities, multiple themes, responsive design options, and extensive customization features.

## Table of Contents

1. [Features](#features)
2. [User Interface](#user-interface)
3. [Section Types](#section-types)
4. [Customization Options](#customization-options)
5. [Theme System](#theme-system)
6. [Responsive Design](#responsive-design)
7. [Technical Implementation](#technical-implementation)
8. [Usage Guide](#usage-guide)

## Features

### Core Functionality
- **Drag & Drop Interface**: Reorder sections using intuitive drag-and-drop functionality
- **Real-time Preview**: Live preview of changes with desktop, tablet, and mobile views
- **Section Management**: Add, remove, and configure multiple section types
- **Theme Customization**: Multiple built-in themes with consistent styling
- **Responsive Design**: Automatic adaptation to different screen sizes
- **Settings Panel**: Comprehensive configuration options for each section
- **Live Page Preview**: Direct link to view the actual careers page
- **Undo/Redo**: History management for changes
- **Save/Reset**: Persist changes or revert to defaults

### Advanced Features
- **Animation System**: Multiple animation effects for sections
- **Background Options**: Various background styles (gradient, light, white)
- **Spacing Controls**: Customizable padding and margins
- **Interactive Elements**: Hover effects, transitions, and micro-interactions
- **Content Management**: Dynamic content loading from data sources
- **Accessibility**: Proper ARIA labels and keyboard navigation

## User Interface

### Layout Structure
```
┌─────────────────────────────────────────────────────────────┐
│                    Header Controls                          │
├─────────────┬───────────────────────────────────────────────┤
│   Sidebar   │              Main Canvas                      │
│             │                                               │
│ • Sections  │  ┌─────────────────────────────────────────┐  │
│ • Templates │  │                                         │  │
│             │  │        Live Preview Area                │  │
│             │  │                                         │  │
│             │  │  [Section 1]                            │  │
│             │  │  [Section 2]                            │  │
│             │  │  [Section 3]                            │  │
│             │  │                                         │  │
│             │  └─────────────────────────────────────────┘  │
└─────────────┴───────────────────────────────────────────────┘
```

### Header Controls
- **Undo/Redo Buttons**: Navigate through change history
- **Reset Button**: Restore default configuration
- **Save Button**: Persist current changes
- **Preview Live Page**: Open actual careers page in new tab
- **Theme Selector**: Choose from 5 different themes
- **Preview Mode**: Switch between desktop, tablet, and mobile views

### Sidebar
- **Sections Tab**: Manage existing page sections
- **Templates Tab**: Add new sections from template library
- **Section Controls**: Visibility toggle, settings, and delete options

## Section Types

### 1. Hero Story Section
**Purpose**: Main landing section with company branding and call-to-action

**Features**:
- Dynamic title with typewriter effect
- Company logo display
- Subtitle and description text
- Company statistics display
- Primary and secondary call-to-action buttons
- Scroll indicator with animation
- Background video and image support

**Customization Options**:
- Background: Gradient, Video, Image, White
- Background Image Upload: File upload for custom background images
- Company Logo Upload: File upload for custom company logos
- Animation: Fade In, Slide Up, Zoom In, None
- Padding: Small, Medium, Large, Extra Large

### 2. Spotlight Job Section
**Purpose**: Highlight featured job opportunities

**Features**:
- Featured jobs grid layout
- Job cards with hover effects
- Like/unlike functionality
- Department filtering
- Location and employment type display
- Apply button integration

**Customization Options**:
- Background: Gradient, Light, White
- Animation: Slide Up, Fade In, Stagger
- Padding: Small, Medium, Large, Extra Large

### 3. Culture Mosaic Section
**Purpose**: Showcase company culture and team activities

**Features**:
- Interactive culture stories grid
- Department filtering (All, Engineering, Design, Product)
- Story cards with images and descriptions
- Team member highlights
- Load more functionality

**Customization Options**:
- Background: Gradient, Light, White
- Animation: Stagger, Fade In, Slide Up
- Padding: Small, Medium, Large, Extra Large

### 4. Benefits Experience Section
**Purpose**: Display company benefits and perks

**Features**:
- Benefits cards with icons
- Hover animations and effects
- Categorized benefits display
- Interactive elements
- Visual hierarchy

**Customization Options**:
- Background: Gradient, Light, White
- Animation: Hover Glow, Fade In, Slide Up
- Padding: Small, Medium, Large, Extra Large

### 5. Testimonials Carousel Section
**Purpose**: Showcase employee testimonials and reviews

**Features**:
- Carousel navigation
- Employee photos and quotes
- Company ratings display
- Smooth transitions
- Responsive layout

**Customization Options**:
- Background: Gradient, Light, White
- Animation: Fade In, Slide Up, Zoom In
- Padding: Small, Medium, Large, Extra Large

### 6. Fun Facts Section
**Purpose**: Display interesting company statistics and achievements

**Features**:
- Animated counters
- Statistical data visualization
- Achievement highlights
- Interactive elements
- Visual appeal

**Customization Options**:
- Background: Gradient, Light, White
- Animation: Zoom In, Fade In, Slide Up
- Padding: Small, Medium, Large, Extra Large

### 7. Apply/Contact Section
**Purpose**: Provide application and contact information

**Features**:
- Contact form integration
- Application process steps
- Contact information display
- Call-to-action buttons
- Social media links

**Customization Options**:
- Background: Gradient, Light, White
- Animation: Slide Up, Fade In, Zoom In
- Padding: Small, Medium, Large, Extra Large

### 8. Custom Creative Section
**Purpose**: Allow custom HTML content creation

**Features**:
- WYSIWYG editor
- HTML code editor
- Visual and code preview modes
- Element insertion tools
- Custom content support

**Customization Options**:
- Background: Gradient, Light, White
- Animation: Fade In, Slide Up, Zoom
- Padding: Small, Medium, Large, Extra Large

## Customization Options

### Background Styles
- **Gradient**: Various gradient combinations (blue-purple, purple-pink, green-blue)
- **Video**: Background video support
- **Image**: Custom image backgrounds with file upload and URL input
- **Light**: Light gray backgrounds
- **White**: Clean white backgrounds

### Image Upload Features
- **File Upload**: Direct file upload for images and logos
- **Image Preview**: Real-time preview of uploaded images
- **Format Support**: Support for common image formats (JPG, PNG, SVG, etc.)
- **Remove Option**: Easy removal of uploaded images
- **Fallback Support**: Default images when no custom image is uploaded

### Animation Effects
- **Fade In**: Smooth opacity transition
- **Slide Up**: Upward sliding motion
- **Zoom In**: Scale animation
- **Stagger**: Sequential element animation
- **Hover Glow**: Glowing hover effects
- **None**: No animation

### Spacing Options
- **Small**: Minimal padding/margins
- **Medium**: Standard spacing
- **Large**: Generous spacing
- **Extra Large**: Maximum spacing

### Typography
- Responsive text sizing
- Font weight variations
- Line height optimization
- Color contrast compliance

## Theme System

### Available Themes
1. **Light Theme**: Clean, minimal design with white backgrounds
2. **Gradient Theme**: Subtle gradient backgrounds throughout
3. **Ocean Theme**: Blue-cyan color scheme
4. **Sunset Theme**: Orange-pink color palette
5. **Forest Theme**: Green-emerald color scheme

### Theme Features
- Consistent color schemes
- Unified component styling
- Smooth transitions between themes
- Responsive theme adaptation
- Accessibility compliance

## Responsive Design

### Breakpoints
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

### Responsive Features
- **Flexible Layouts**: Grid and flexbox adaptations
- **Scalable Typography**: Responsive font sizes
- **Touch-Friendly**: Mobile-optimized interactions
- **Performance**: Optimized for all devices
- **Cross-Browser**: Compatible with modern browsers

### Preview Modes
- **Desktop View**: Full-width preview
- **Tablet View**: Constrained width with tablet proportions
- **Mobile View**: Mobile-optimized layout with scaling

## Technical Implementation

### Technology Stack
- **React**: Component-based architecture
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Shadcn/UI**: Component library
- **React Beautiful DnD**: Drag and drop functionality
- **Lucide React**: Icon system
- **Vite**: Build tool and development server

### Architecture
- **Component-Based**: Modular, reusable components
- **State Management**: React hooks for local state
- **Props Interface**: TypeScript interfaces for type safety
- **Event Handling**: Comprehensive event management
- **Performance**: Optimized rendering and updates

### Data Structure
```typescript
interface Section {
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
```

### File Structure
```
src/components/careers/
├── CareersPageBuilder.tsx          # Main builder component
├── CareersPage.tsx                # Live page component
├── CareersPageStatus.tsx          # Status indicator
└── sections/
    ├── HeroStorySection.tsx
    ├── SpotlightJobSection.tsx
    ├── CultureMosaicSection.tsx
    ├── BenefitsExperienceSection.tsx
    ├── TestimonialsCarouselSection.tsx
    ├── FunFactsSection.tsx
    ├── ApplyContactSection.tsx
    └── CustomCreativeSection.tsx
```

## Usage Guide

### Getting Started
1. Navigate to `/careers-builder` route
2. Select a theme from the header controls
3. Choose preview mode (desktop/tablet/mobile)
4. Start building your careers page

### Adding Sections
1. Click on "Templates" tab in sidebar
2. Choose desired section type
3. Drag section to canvas or click to add
4. Configure section settings

### Customizing Sections
1. Click on any section to select it
2. Use the settings panel that appears
3. Adjust background, animation, and spacing
4. Changes apply immediately in preview

### Managing Sections
1. Use drag-and-drop to reorder sections
2. Toggle visibility with eye icon
3. Access settings with gear icon
4. Delete sections with trash icon

### Saving Changes
1. Click "Save" button to persist changes
2. Use "Reset" to restore defaults
3. "Preview Live Page" opens actual careers page
4. Undo/Redo for change history

### Best Practices
- **Content First**: Plan your content before building
- **Mobile First**: Design for mobile, enhance for desktop
- **Performance**: Keep animations subtle and purposeful
- **Accessibility**: Ensure proper contrast and navigation
- **Consistency**: Use consistent spacing and typography

## Integration

### Routes
- `/careers-builder`: Builder interface (protected)
- `/careers`: Public careers page

### Data Sources
- Static data from `data.ts` file
- Configurable content management
- Extensible data structure

### Deployment
- Production-ready build process
- Optimized assets and code splitting
- SEO-friendly static generation
- Performance monitoring ready

## Future Enhancements

### Planned Features
- **Content Management**: Backend integration for dynamic content
- **Analytics**: Built-in analytics and tracking
- **A/B Testing**: Section variant testing
- **Export Options**: PDF and image export
- **Collaboration**: Multi-user editing capabilities
- **Templates**: Pre-built page templates
- **Custom CSS**: Advanced styling options
- **API Integration**: Job board and HR system integration

### Technical Roadmap
- **Performance**: Further optimization and lazy loading
- **Accessibility**: Enhanced screen reader support
- **Internationalization**: Multi-language support
- **Offline Support**: Progressive Web App features
- **Real-time**: Live collaboration features

---

*This documentation covers the current state of the Careers Page Builder as of the latest implementation. For technical support or feature requests, please refer to the development team.*
