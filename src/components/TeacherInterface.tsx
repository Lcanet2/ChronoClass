import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Save, 
  CheckCircle, 
  AlertTriangle, 
  BookOpen,
  Users,
  MessageSquare,
  ClipboardCheck,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  role: 'teacher' | 'admin' | 'interim';
  schoolId: string;
}

interface TeacherInterfaceProps {
  user: User;
}

type ActivityType = 'teaching' | 'support' | 'meetings' | 'followUp';

interface WeeklyHours {
  [week: number]: {
    [activity in ActivityType]: number;
  };
}

export function TeacherInterface({ user }: TeacherInterfaceProps) {
  const currentWeek = 42;
  
  const [weeklyHours, setWeeklyHours] = useState<WeeklyHours>({
    36: { teaching: 18, support: 4, meetings: 2, followUp: 1 },
    37: { teaching: 20, support: 3, meetings: 1, followUp: 2 },
    38: { teaching: 19, support: 4, meetings: 2.5, followUp: 0.5 },
    39: { teaching: 18.5, support: 4, meetings: 3, followUp: 1 },
    40: { teaching: 21, support: 2, meetings: 1.5, followUp: 1.5 },
    41: { teaching: 17, support: 5, meetings: 2, followUp: 2 },
    42: { teaching: 0, support: 0, meetings: 0, followUp: 0 },
  });

  const weeks = Array.from({ length: 20 }, (_, i) => 36 + i);
  
  const activityTypes = [
    { 
      key: 'teaching' as ActivityType, 
      label: 'Enseignement', 
      icon: BookOpen, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      key: 'support' as ActivityType, 
      label: 'Accompagnement', 
      icon: Users, 
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      key: 'meetings' as ActivityType, 
      label: 'Réunions', 
      icon: MessageSquare, 
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    { 
      key: 'followUp' as ActivityType, 
      label: 'Suivi', 
      icon: ClipboardCheck, 
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
  ];

  const handleHourChange = (week: number, activity: ActivityType, value: string) => {
    const numValue = parseFloat(value) || 0;
    if (numValue > 24) {
      toast.error('Maximum 24 heures par activité et par semaine');
      return;
    }

    setWeeklyHours(prev => ({
      ...prev,
      [week]: {
        ...prev[week],
        [activity]: numValue
      }
    }));
  };

  const getWeekTotal = (week: number) => {
    const weekData = weeklyHours[week];
    if (!weekData) return 0;
    return Object.values(weekData).reduce((sum, hours) => sum + hours, 0);
  };

  const saveWeek = (week: number) => {
    toast.success(`Semaine ${week} sauvegardée avec succès!`);
  };

  const isCurrentWeek = (week: number) => week === currentWeek;
  const isWeekComplete = (week: number) => getWeekTotal(week) > 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Saisie des Heures</h1>
        <p className="text-slate-600">
          Saisissez vos heures hebdomadaires par domaine d'activité
        </p>
      </div>

      {/* Current Week Progress */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span>Semaine Actuelle - {currentWeek}</span>
            <Badge variant="default" className="bg-blue-600">
              En cours
            </Badge>
          </CardTitle>
          <CardDescription>
            Total: {getWeekTotal(currentWeek)}h cette semaine
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Progression</span>
            <span className="text-sm font-medium">
              {getWeekTotal(currentWeek)} / 26h
            </span>
          </div>
          <Progress 
            value={(getWeekTotal(currentWeek) / 26) * 100} 
            className="mt-2"
          />
        </CardContent>
      </Card>

      {/* Timesheet Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tableau de Saisie</CardTitle>
          <CardDescription>
            Cliquez sur une cellule pour saisir vos heures (format décimal accepté)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* CORRECTION: Container avec padding et margin pour espacer le scroll */}
          <div 
            className="overflow-x-auto pb-8 mb-4" 
            style={{
              /* Personnalisation de la scrollbar */
              scrollbarWidth: 'thin',
              scrollbarColor: '#cbd5e1 #f1f5f9'
            }}
          >
            <style jsx>{`
              /* Webkit browsers (Chrome, Safari, Edge) */
              div::-webkit-scrollbar {
                height: 8px;
                margin-top: 16px;
              }
              
              div::-webkit-scrollbar-track {
                background: #f1f5f9;
                border-radius: 4px;
                margin-top: 16px;
              }
              
              div::-webkit-scrollbar-thumb {
                background: #cbd5e1;
                border-radius: 4px;
              }
              
              div::-webkit-scrollbar-thumb:hover {
                background: #94a3b8;
              }
            `}</style>
            
            <div className="min-w-max">
              {/* Header */}
              <div className="grid grid-cols-[250px,repeat(20,100px)] gap-2 mb-3">
                <div className="p-3 bg-slate-100 rounded-lg font-semibold text-sm">
                  Activités
                </div>
                {weeks.map(week => (
                  <div 
                    key={week}
                    className={`p-2 rounded-lg text-center text-xs font-medium ${
                      isCurrentWeek(week) 
                        ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' 
                        : 'bg-slate-50 text-slate-600'
                    }`}
                  >
                    <div>S{week}</div>
                    {isWeekComplete(week) && (
                      <CheckCircle className="h-3 w-3 text-green-500 mx-auto mt-1" />
                    )}
                  </div>
                ))}
              </div>

              {/* Activity Rows */}
              {activityTypes.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.key} className="grid grid-cols-[250px,repeat(20,100px)] gap-2 mb-2">
                    <div className={`p-3 rounded-lg flex items-center space-x-2 ${activity.bgColor}`}>
                      <Icon className={`h-4 w-4 ${activity.color}`} />
                      <span className="text-sm font-medium">{activity.label}</span>
                    </div>
                    {weeks.map(week => (
                      <div key={week} className="relative">
                        <Input
                          type="number"
                          step="0.5"
                          min="0"
                          max="24"
                          value={weeklyHours[week]?.[activity.key] || ''}
                          onChange={(e) => handleHourChange(week, activity.key, e.target.value)}
                          className={`h-12 text-center ${
                            isCurrentWeek(week) 
                              ? 'border-blue-300 focus:border-blue-500 bg-blue-50' 
                              : ''
                          }`}
                          placeholder="0"
                        />
                        {weeklyHours[week]?.[activity.key] > 20 && (
                          <AlertTriangle className="h-3 w-3 text-amber-500 absolute top-1 right-1" />
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}

              {/* Total Row */}
              <div className="grid grid-cols-[250px,repeat(20,100px)] gap-2 mt-4 pt-2 border-t">
                <div className="p-3 bg-slate-800 text-white rounded-lg font-semibold text-sm">
                  Total
                </div>
                {weeks.map(week => (
                  <div 
                    key={week}
                    className={`p-3 rounded-lg text-center font-bold ${
                      isCurrentWeek(week)
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {getWeekTotal(week) || 0}h
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Save Actions */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <div className="text-sm text-slate-600">
              Les modifications sont automatiquement sauvegardées
            </div>
            <Button 
              onClick={() => saveWeek(currentWeek)}
              className="flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Sauvegarder la semaine {currentWeek}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}