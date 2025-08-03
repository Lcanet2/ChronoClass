import { User, Clock, BarChart3, Users, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface User {
  id: string;
  name: string;
  role: 'teacher' | 'admin' | 'interim';
  schoolId: string;
}

interface NavigationProps {
  user: User;
  activeView: string;
  onViewChange: (view: 'dashboard' | 'timesheet' | 'admin') => void;
}

export function Navigation({ user, activeView, onViewChange }: NavigationProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <nav className="bg-slate-800 shadow-lg border-b border-slate-600 w-full">
      <div className="w-full px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-400" />
              <h1 className="text-xl font-bold text-white">ChronoClass</h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewChange('dashboard')}
                className={`flex items-center space-x-2 text-white ${
                  activeView === 'dashboard' 
                    ? 'bg-white/20 hover:bg-white/30' 
                    : 'hover:bg-white/10'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Tableau de bord</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewChange('timesheet')}
                className={`flex items-center space-x-2 text-white ${
                  activeView === 'timesheet' 
                    ? 'bg-white/20 hover:bg-white/30' 
                    : 'hover:bg-white/10'
                }`}
              >
                <Clock className="h-4 w-4" />
                <span>Saisie des heures</span>
              </Button>
              
              {user.role === 'admin' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewChange('admin')}
                  className={`flex items-center space-x-2 text-white ${
                    activeView === 'admin' 
                      ? 'bg-white/20 hover:bg-white/30' 
                      : 'hover:bg-white/10'
                  }`}
                >
                  <Users className="h-4 w-4" />
                  <span>Administration</span>
                </Button>
              )}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 p-2 text-white hover:bg-white/10">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-blue-600 text-white">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline text-sm font-medium">
                  {user.role === 'interim' ? 'Profil Intérimaire' : user.name}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                Profil
              </DropdownMenuItem>
              <DropdownMenuItem>
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}