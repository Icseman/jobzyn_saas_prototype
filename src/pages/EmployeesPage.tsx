import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Users, 
  Building2, 
  UserPlus, 
  TrendingUp, 
  ChevronRight,
  Settings,
  Search,
  Filter,
  Plus
} from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { PageTransition } from '@/components/PageTransition';
import PeopleDirectory from '@/components/employees/PeopleDirectory';
import OrgChart from '@/components/employees/OrgChart';
import Onboarding from '@/components/employees/Onboarding';
import Performance from '@/components/employees/Performance';

const EmployeesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('people-directory');

  const tabs = [
    {
      id: 'people-directory',
      title: 'People Directory',
      description: 'Browse and manage employee profiles',
      icon: Users,
      component: PeopleDirectory
    },
    {
      id: 'org-chart',
      title: 'Org Chart',
      description: 'Visualize organizational structure',
      icon: Building2,
      component: OrgChart
    },
    {
      id: 'onboarding',
      title: 'Onboarding',
      description: 'Manage new employee processes',
      icon: UserPlus,
      component: Onboarding
    },
    {
      id: 'performance',
      title: 'Performance',
      description: 'Track employee performance metrics',
      icon: TrendingUp,
      component: Performance
    }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || PeopleDirectory;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageTransition>
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Employees</h1>
                <p className="text-muted-foreground">Manage your team and organizational structure</p>
              </div>
            </div>
            
          </div>

          {/* Top Navigation */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 overflow-x-auto">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "outline"}
                    className={`flex-shrink-0 gap-2 ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.title}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Content Area */}
          <Card className="min-h-[500px] max-h-[calc(100vh-200px)] overflow-hidden">
            <CardContent className="p-0 h-full">
              <div className="h-full overflow-y-auto">
                <ActiveComponent />
              </div>
            </CardContent>
          </Card>
        </div>
      </PageTransition>
    </div>
  );
};

export default EmployeesPage;
