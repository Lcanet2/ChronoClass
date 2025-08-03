import { useState } from 'react';
import { Dashboard } from '@/components/Dashboard';
import { TeacherInterface } from '@/components/TeacherInterface';
import { AdminInterface } from '@/components/AdminInterface';
import { Navigation } from '@/components/Navigation';
import { Toaster } from '@/components/ui/sonner';

type UserRole = 'teacher' | 'admin' | 'interim';
type ActiveView = 'dashboard' | 'timesheet' | 'admin';

interface User {
  id: string;
  name: string;
  role: UserRole;
  schoolId: string;
}

function App() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [currentUser] = useState<User>({
    id: '1',
    name: 'Marie Dubois',
    role: 'teacher',
    schoolId: 'school-1'
  });

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard user={currentUser} />;
      case 'timesheet':
        return <TeacherInterface user={currentUser} />;
      case 'admin':
        return <AdminInterface user={currentUser} />;
      default:
        return <Dashboard user={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 w-full">
      <Navigation 
        user={currentUser} 
        activeView={activeView} 
        onViewChange={setActiveView} 
      />
      <main className="px-8 py-8 w-full">
        {renderActiveView()}
      </main>
      <Toaster />
    </div>
  );
}

export default App;