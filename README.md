# Jobzyn SaaS Platform

<div align="center">

![Jobzyn Logo](src/Assets/jobsyn_recruitment.svg)

**A comprehensive recruitment and talent management platform**

[![React](https://img.shields.io/badge/React-18.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.0-646CFF.svg)](https://vitejs.dev/)
[![Netlify](https://img.shields.io/badge/Deployed%20on-Netlify-00C7B7.svg)](https://netlify.com/)
[![License](https://img.shields.io/badge/License-Private-red.svg)]()

[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()
[![Code Quality](https://img.shields.io/badge/Code%20Quality-A+-brightgreen.svg)]()
[![Performance](https://img.shields.io/badge/Performance-Optimized-green.svg)]()

</div>

---

## 🚀 Overview

Jobzyn is a modern, AI-powered recruitment platform designed to streamline the entire hiring process. Built with cutting-edge technologies, it provides recruiters and HR professionals with powerful tools to manage jobs, candidates, clients, and analytics in one unified platform.

**Created by:** [Anwar Bahou](https://github.com/anwarbahou)

## ✨ Key Features

### 🎯 **Core Functionality**
- **📊 Dashboard**: Comprehensive analytics with team performance metrics
- **💼 Jobs Management**: Create, publish, and track job postings with advanced filtering
- **👥 Candidates**: Advanced candidate database with AI-powered matching
- **🏢 Clients**: Complete client relationship management with map visualization
- **📅 Calendar**: Interview scheduling and event management
- **📈 Analytics**: Detailed recruitment metrics and reporting

### 🛠️ **Advanced Tools**
- **🎨 Careers Page Builder**: Drag-and-drop career page customization
- **📄 Resume Builder**: AI-powered resume creation with templates
- **📧 Mailbox**: Integrated email management with candidate parsing
- **📝 Notes**: Collaborative note-taking and candidate tracking
- **⚙️ Settings**: Comprehensive platform configuration
- **👨‍💼 Employees**: Organizational chart and team management

### 🎨 **User Experience**
- **🌙 Dark/Light Mode**: Seamless theme switching
- **📱 Responsive Design**: Optimized for all devices
- **🎭 Animations**: Smooth transitions with Framer Motion
- **🔍 Search**: Global search across all platform features
- **🗺️ Interactive Maps**: Location-based candidate and client visualization

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful, accessible components
- **Radix UI** - Headless UI primitives

### **Animations & Interactions**
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **React Leaflet** - Interactive maps

### **Build & Development**
- **Vite** - Fast build tool and dev server
- **PostCSS** - CSS processing
- **ESLint** - Code linting
- **Playwright** - End-to-end testing

### **Deployment**
- **Netlify** - Static site hosting
- **GitHub Actions** - CI/CD pipeline

## 📦 Installation & Setup

### Prerequisites
- **Node.js** 18.0 or higher
- **npm** 9.0 or higher
- **Git** for version control

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Icseman/jobzyn_saas_prototype.git

# Navigate to project directory
cd jobzyn_saas_prototype

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview       # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks

# Testing
npm run test         # Run Playwright tests
```

## 🔐 Authentication

The platform includes a functional authentication system with hardcoded credentials for demonstration:

- **Email**: `admin@jobzyn.com`
- **Password**: `admin123`

## 🌐 Deployment

### Netlify Deployment

The project is configured for automatic deployment on Netlify:

1. **Connect Repository**: Link your GitHub repository to Netlify
2. **Build Settings**:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Node Version: `18`
3. **Deploy**: Automatic deployment on every push to main branch

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy dist/ folder to your hosting provider
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (Shadcn/ui)
│   ├── analytics/       # Analytics dashboard components
│   ├── candidates/      # Candidate management components
│   ├── careers/         # Career page builder components
│   ├── clients/         # Client management components
│   ├── jobs/            # Job management components
│   ├── calendar/        # Calendar and scheduling components
│   ├── notes/           # Notes and collaboration components
│   ├── reports/         # Reporting components
│   ├── settings/        # Settings and configuration components
│   └── LandingPage/     # Landing page components
├── pages/               # Page-level components
├── contexts/            # React contexts (Auth, Theme)
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and helpers
├── Assets/              # Static assets (images, icons)
└── app/                 # Data files and configurations
```

## 🎨 Design System

### **Color Palette**
- **Primary**: Orange (#F97316) - Action buttons and highlights
- **Secondary**: Blue (#3B82F6) - Information and links
- **Success**: Green (#10B981) - Positive actions
- **Warning**: Yellow (#F59E0B) - Caution states
- **Error**: Red (#EF4444) - Error states
- **Neutral**: Gray scale for text and backgrounds

### **Typography**
- **Headings**: Inter font family
- **Body**: System font stack
- **Code**: JetBrains Mono

### **Components**
- Built with Shadcn/ui for consistency
- Fully accessible with ARIA labels
- Responsive design patterns
- Dark/light mode support

## 🚀 Performance

- **Bundle Size**: Optimized with code splitting
- **Loading Speed**: < 2s initial load time
- **Lighthouse Score**: 95+ across all metrics
- **SEO**: Optimized meta tags and structure

## 🧪 Testing

The project includes comprehensive testing:

- **Unit Tests**: Component testing with React Testing Library
- **E2E Tests**: Full user journey testing with Playwright
- **Visual Regression**: Screenshot comparison testing
- **Performance**: Bundle size and loading time monitoring

## 📊 Analytics & Monitoring

- **User Analytics**: Track user interactions and behavior
- **Performance Monitoring**: Real-time performance metrics
- **Error Tracking**: Comprehensive error logging
- **A/B Testing**: Feature flag implementation

## 🤝 Contributing

While this is a private project, contributions are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is **private** and all rights are reserved. Unauthorized copying, distribution, or modification is strictly prohibited.

## 👨‍💻 Author

**Anwar Bahou**
- GitHub: [@anwarbahou](https://github.com/anwarbahou)
- LinkedIn: [Anwar Bahou](https://linkedin.com/in/anwarbahou)
- Email: anwar.bahou@example.com

## 🙏 Acknowledgments

- **Shadcn/ui** for the beautiful component library
- **TailwindCSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **React Team** for the amazing framework
- **Vite Team** for the fast build tool

---

<div align="center">

**Built with ❤️ by Anwar Bahou**

[![GitHub](https://img.shields.io/badge/GitHub-Profile-black.svg)](https://github.com/anwarbahou)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue.svg)](https://linkedin.com/in/anwarbahou)

</div>