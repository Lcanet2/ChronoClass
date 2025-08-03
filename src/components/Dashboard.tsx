import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Target, 
  TrendingUp, 
  Calendar,
  BookOpen,
  Users,
  MessageSquare,
  ClipboardCheck
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  role: 'teacher' | 'admin' | 'interim';
  schoolId: string;
}

interface DashboardProps {
  user: User;
}

export function Dashboard({ user }: DashboardProps) {
  const currentWeek = 42;
  const currentYear = 2024;
  
  // Mock data
  const weeklyStats = {
    teaching: 18.5,
    support: 4.0,
    meetings: 2.5,
    followUp: 1.0,
    total: 26.0
  };

  const yearlyGoals = {
    teaching: 648,
    support: 108,
    meetings: 54,
    followUp: 36,
    total: 846
  };

  const yearlyProgress = {
    teaching: 324,
    support: 52,
    meetings: 28,
    followUp: 18,
    total: 422
  };

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.round((current / goal) * 100);
  };

  const activityTypes = [
    { 
      key: 'teaching' as keyof typeof weeklyStats, 
      label: 'Enseignement', 
      icon: BookOpen, 
      color: 'bg-blue-500' 
    },
    { 
      key: 'support' as keyof typeof weeklyStats, 
      label: 'Accompagnement', 
      icon: Users, 
      color: 'bg-green-500' 
    },
    { 
      key: 'meetings' as keyof typeof weeklyStats, 
      label: 'Réunions', 
      icon: MessageSquare, 
      color: 'bg-orange-500' 
    },
    { 
      key: 'followUp' as keyof typeof weeklyStats, 
      label: 'Suivi', 
      icon: ClipboardCheck, 
      color: 'bg-purple-500' 
    },
  ];

  return (
    <div className="space-y-8 w-full max-w-none">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">
          Bonjour {user.role === 'interim' ? 'Profil Intérimaire' : user.name.split(' ')[0]} 👋
        </h1>
        <p className="text-slate-600">
          Voici un aperçu de votre activité pour la semaine {currentWeek} de {currentYear}
        </p>
      </div>

      {/* Current Week Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8 w-full">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">
              Semaine Actuelle
            </CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {weeklyStats.total}h
            </div>
            <p className="text-xs text-blue-700">
              Semaine {currentWeek}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900">
              Objectif Annuel
            </CardTitle>
            <Target className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {yearlyGoals.total}h
            </div>
            <p className="text-xs text-green-700">
              {getProgressPercentage(yearlyProgress.total, yearlyGoals.total)}% complété
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-900">
              Progression
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">
              {yearlyProgress.total}h
            </div>
            <p className="text-xs text-orange-700">
              Réalisées à ce jour
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">
              Moyenne
            </CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {Math.round((yearlyProgress.total / currentWeek) * 10) / 10}h
            </div>
            <p className="text-xs text-purple-700">
              Par semaine
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Activity Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Répartition des Activités</CardTitle>
            <CardDescription>
              Heures par domaine d'activité cette semaine
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {activityTypes.map((activity) => {
              const Icon = activity.icon;
              const hours = weeklyStats[activity.key];
              return (
                <div key={activity.key} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${activity.color}`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium text-base">{activity.label}</span>
                  </div>
                  <Badge variant="secondary" className="bg-slate-100 text-base px-3 py-1">
                    {hours}h
                  </Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progression Annuelle</CardTitle>
            <CardDescription>
              Avancement vers vos objectifs annuels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {activityTypes.map((activity) => {
              const current = yearlyProgress[activity.key];
              const goal = yearlyGoals[activity.key];
              const percentage = getProgressPercentage(current, goal);
              const Icon = activity.icon;
              
              return (
                <div key={activity.key} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className="h-5 w-5 text-slate-600" />
                      <span className="text-base font-medium">{activity.label}</span>
                    </div>
                    <span className="text-base text-slate-600">
                      {current}h / {goal}h
                    </span>
                  </div>
                  <Progress value={percentage} className="h-3" />
                  <div className="text-sm text-slate-500 text-right">
                    {percentage}% complété
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}