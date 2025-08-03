import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Clock, 
  TrendingUp, 
  FileText,
  CheckCircle,
  AlertCircle,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface User {
  id: string;
  name: string;
  role: 'teacher' | 'admin' | 'interim';
  schoolId: string;
}

interface AdminInterfaceProps {
  user: User;
}

interface TeacherSummary {
  id: string;
  name: string;
  role: 'teacher' | 'interim';
  currentWeekHours: number;
  totalHours: number;
  goalHours: number;
  lastUpdate: string;
  status: 'complete' | 'incomplete' | 'overdue';
}

export function AdminInterface({ user }: AdminInterfaceProps) {
  const currentWeek = 42;
  
  // Mock data for teachers
  const teachers: TeacherSummary[] = [
    {
      id: '1',
      name: 'Marie Dubois',
      role: 'teacher',
      currentWeekHours: 24,
      totalHours: 486,
      goalHours: 846,
      lastUpdate: '2024-10-18',
      status: 'complete'
    },
    {
      id: '2',
      name: 'Jean Martin',
      role: 'teacher',
      currentWeekHours: 18,
      totalHours: 412,
      goalHours: 846,
      lastUpdate: '2024-10-17',
      status: 'incomplete'
    },
    {
      id: '3',
      name: 'Sophie Laurent',
      role: 'teacher',
      currentWeekHours: 26,
      totalHours: 498,
      goalHours: 846,
      lastUpdate: '2024-10-18',
      status: 'complete'
    },
    {
      id: '4',
      name: 'Profil Intérimaire #1',
      role: 'interim',
      currentWeekHours: 12,
      totalHours: 84,
      goalHours: 200,
      lastUpdate: '2024-10-16',
      status: 'overdue'
    }
  ];

  const schoolStats = {
    totalTeachers: teachers.length,
    activeTeachers: teachers.filter(t => t.status === 'complete').length,
    totalHours: teachers.reduce((sum, t) => sum + t.totalHours, 0),
    averageCompletion: Math.round(
      teachers.reduce((sum, t) => sum + (t.totalHours / t.goalHours), 0) / teachers.length * 100
    )
  };

  const getStatusBadge = (status: TeacherSummary['status']) => {
    switch (status) {
      case 'complete':
        return <Badge className="bg-green-100 text-green-800">Complété</Badge>;
      case 'incomplete':
        return <Badge variant="secondary">En cours</Badge>;
      case 'overdue':
        return <Badge variant="destructive">En retard</Badge>;
    }
  };

  const getStatusIcon = (status: TeacherSummary['status']) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'incomplete':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6 w-full max-w-none">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Administration</h1>
        <p className="text-slate-600">
          Vue d'ensemble de l'école - Semaine {currentWeek}
        </p>
      </div>

      {/* School Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">
              Enseignants
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {schoolStats.totalTeachers}
            </div>
            <p className="text-xs text-blue-700">
              {schoolStats.activeTeachers} actifs cette semaine
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900">
              Total Heures
            </CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {schoolStats.totalHours}h
            </div>
            <p className="text-xs text-green-700">
              Cumulées cette année
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-900">
              Progression Moyenne
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">
              {schoolStats.averageCompletion}%
            </div>
            <p className="text-xs text-orange-700">
              Des objectifs annuels
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">
              Rapports
            </CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Teachers Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Vue d'ensemble des Enseignants</CardTitle>
          <CardDescription>
            Suivi individuel des heures et de la progression
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-slate-100 text-slate-700">
                      {teacher.role === 'interim' ? 'INT' : getInitials(teacher.name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">
                        {teacher.role === 'interim' ? teacher.name : teacher.name}
                      </h3>
                      {teacher.role === 'interim' && (
                        <Badge variant="outline" className="text-xs">
                          Intérimaire
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">
                      Dernière mise à jour: {new Date(teacher.lastUpdate).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-sm font-medium">{teacher.currentWeekHours}h</div>
                    <div className="text-xs text-slate-500">Cette semaine</div>
                  </div>
                  
                  <div className="w-32">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{teacher.totalHours}h</span>
                      <span>{teacher.goalHours}h</span>
                    </div>
                    <Progress 
                      value={(teacher.totalHours / teacher.goalHours) * 100} 
                      className="h-2"
                    />
                    <div className="text-xs text-slate-500 mt-1 text-center">
                      {Math.round((teacher.totalHours / teacher.goalHours) * 100)}% complété
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {getStatusIcon(teacher.status)}
                    {getStatusBadge(teacher.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}