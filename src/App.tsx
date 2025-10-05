import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { AuthProvider } from '@/contexts/AuthContext'
import LoginPage from '@/pages/LoginPage'
import SignUpPage from '@/pages/SignUpPage'
import DashboardPage from '@/pages/DashboardPage'
import { JobsPage } from '@/components/jobs/JobsPage'
import { JobPage } from '@/components/job-page/JobPage'
import { JobCreationPage } from '@/components/JobCreation/JobCreationPage'
import { ClientsPage } from '@/components/clients/ClientsPage'
import { NotesPage } from '@/components/notes/NotesPage'
import { CalendarPage } from '@/components/calendar/CalendarPage'
import { AnalyticsPage } from '@/components/analytics/AnalyticsPage'
import { CandidateDatabasePage } from '@/components/candidates/CandidateDatabasePage'
import { ReportsPage } from '@/components/reports/ReportsPage'
import { CareersPageBuilder } from '@/components/careers/CareersPageBuilder'
import { CareersPage } from '@/components/careers/CareersPage'
import { JobDetailPage } from '@/components/careers/JobDetailPage'
import { ResumeBuilderPage } from '@/pages/ResumeBuilderPage'
import { MailboxPage } from '@/pages/MailboxPage'
import SettingsPage from '@/pages/SettingsPage'
import EmployeesPage from '@/pages/EmployeesPage'
import ProtectedRoute from '@/components/ProtectedRoute'
import HeroSection from '@/components/LandingPage/Components/Herosection'

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/sign-in" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/jobs" 
              element={
                <ProtectedRoute>
                  <JobsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/jobs/:jobId" 
              element={
                <ProtectedRoute>
                  <JobPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-job" 
              element={
                <ProtectedRoute>
                  <JobCreationPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/clients" 
              element={
                <ProtectedRoute>
                  <ClientsPage />
                </ProtectedRoute>
              } 
            />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <NotesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <CalendarPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <AnalyticsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidates"
          element={
            <ProtectedRoute>
              <CandidateDatabasePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ReportsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/careers-builder"
          element={
            <ProtectedRoute>
              <CareersPageBuilder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/careers"
          element={<CareersPage />}
        />
        <Route
          path="/careers/job/:jobId"
          element={<JobDetailPage />}
        />
        <Route
          path="/resume-builder"
          element={
            <ProtectedRoute>
              <ResumeBuilderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mailbox"
          element={
            <ProtectedRoute>
              <MailboxPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <EmployeesPage />
            </ProtectedRoute>
          }
        />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
