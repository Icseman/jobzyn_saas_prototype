import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Plus, 
  Users, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  Building2
} from 'lucide-react';

const mockEmployees = [
  {
    id: '1',
    name: 'Simo Zizi',
    department: 'Executive',
    role: 'Chief Executive Officer',
    email: 'simo.zizi@jobzyn.com',
    phone: '+212 6 12 34 56 71',
    location: 'Casablanca, Morocco',
    status: 'Active',
    avatar: '/src/Assets/team/Simo Zizi.jpeg'
  },
  {
    id: '2',
    name: 'Abdelbassite Badou',
    department: 'Engineering',
    role: 'CTO',
    email: 'abdelbassite.badou@jobzyn.com',
    phone: '+212 6 12 34 56 72',
    location: 'Casablanca, Morocco',
    status: 'Active',
    avatar: '/src/Assets/team/Abdelbassite Badou.jpeg'
  },
  {
    id: '3',
    name: 'Salma Bennani',
    department: 'HR',
    role: 'HR Business Partner',
    email: 'salma.bennani@jobzyn.com',
    phone: '+212 6 12 34 56 73',
    location: 'Casablanca, Morocco',
    status: 'Active',
    avatar: '/src/Assets/team/Salma Bennani.jpeg'
  },
  {
    id: '4',
    name: 'Souhaila Mouchtanim',
    department: 'Partnerships',
    role: 'Partnerships Manager',
    email: 'souhaila.mouchtanim@jobzyn.com',
    phone: '+212 6 12 34 56 74',
    location: 'Casablanca, Morocco',
    status: 'Active',
    avatar: '/src/Assets/team/Souhaila Mouchtanim  .jpeg'
  },
  {
    id: '5',
    name: 'Karim Baggari',
    department: 'Engineering',
    role: 'Full Stack Engineer',
    email: 'karim.baggari@jobzyn.com',
    phone: '+212 6 12 34 56 75',
    location: 'Casablanca, Morocco',
    status: 'Active',
    avatar: '/src/Assets/team/Karim Baggari .jpeg'
  },
  {
    id: '6',
    name: 'Abdellah Maarifa',
    department: 'Engineering',
    role: 'Full Stack Engineer',
    email: 'abdellah.maarifa@jobzyn.com',
    phone: '+212 6 12 34 56 76',
    location: 'Casablanca, Morocco',
    status: 'Active',
    avatar: '/src/Assets/team/Abdellah Maarifa  .jpeg'
  },
  {
    id: '7',
    name: 'Aya Birouk',
    department: 'Engineering',
    role: 'AI & ML Engineer',
    email: 'aya.birouk@jobzyn.com',
    phone: '+212 6 12 34 56 77',
    location: 'Casablanca, Morocco',
    status: 'Active',
    avatar: '/src/Assets/team/Aya Birouk.jpeg'
  },
  {
    id: '8',
    name: 'Nassim Jadid',
    department: 'Engineering',
    role: 'AI & ML Engineer',
    email: 'nassim.jadid@jobzyn.com',
    phone: '+212 6 12 34 56 78',
    location: 'Casablanca, Morocco',
    status: 'Active',
    avatar: '/src/Assets/team/Nassim Jadid.jpeg'
  },
  {
    id: '9',
    name: 'Oussama El Hajjami',
    department: 'Marketing',
    role: 'Marketing Manager',
    email: 'oussama.elhajjami@jobzyn.com',
    phone: '+212 6 12 34 56 79',
    location: 'Casablanca, Morocco',
    status: 'Active',
    avatar: '/src/Assets/team/Oussama El Hajjami .jpeg'
  },
  {
    id: '10',
    name: 'Nada Zaakoun',
    department: 'Marketing',
    role: 'Marketing Operations',
    email: 'nada.zaakoun@jobzyn.com',
    phone: '+212 6 12 34 56 80',
    location: 'Casablanca, Morocco',
    status: 'Active',
    avatar: '/src/Assets/team/Nada Zaakoun.jpeg'
  },
  {
    id: '11',
    name: 'Soukeina Er-rafay',
    department: 'Marketing',
    role: 'Marketing Operations',
    email: 'soukeina.errafay@jobzyn.com',
    phone: '+212 6 12 34 56 81',
    location: 'Casablanca, Morocco',
    status: 'Active',
    avatar: '/src/Assets/team/Soukeina Er-rafay.jpeg'
  },
  {
    id: '12',
    name: 'El Hassan El Asri',
    department: 'Legal',
    role: 'Jurist',
    email: 'elhassan.elasri@jobzyn.com',
    phone: '+212 6 12 34 56 82',
    location: 'Casablanca, Morocco',
    status: 'Active',
    avatar: '/src/Assets/team/El Hassan El Asri.jpeg'
  }
];

const PeopleDirectory: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">People Directory</h2>
          <p className="text-muted-foreground">Browse and manage employee profiles</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search employees by name, department, or role..."
          className="pl-10"
        />
      </div>

      {/* Employee Cards */}
      <div className="space-y-4">
        {mockEmployees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
                    <img 
                      src={employee.avatar} 
                      alt={employee.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{employee.name}</h3>
                    <p className="text-sm text-muted-foreground">{employee.role}</p>
                    <p className="text-xs text-muted-foreground">{employee.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{employee.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm mt-1">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{employee.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm mt-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{employee.location}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-sm px-3 py-1">
                    {employee.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PeopleDirectory;
