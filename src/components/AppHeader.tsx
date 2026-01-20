import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTypingStore } from '@/lib/typingStore';

const AppHeader: React.FC = () => {
  const location = useLocation();
  const { getProgress } = useTypingStore();
  const progress = getProgress();
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/courses', label: 'Courses' },
    { path: '/practice', label: 'Practice' },
    { path: '/progress', label: 'Progress' },
    { path: '/settings', label: 'Settings' },
  ];

  return (
    <header className="tm-panel border-b-2 rounded-none">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">TM</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Typing Master</h1>
            <p className="text-xs text-muted-foreground">Web Edition</p>
          </div>
        </Link>
        
        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'tm-button text-sm',
                location.pathname === item.path && 'tm-button-primary'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        {/* Progress indicator */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Overall Progress</div>
            <div className="text-sm font-medium">{progress.completed}/{progress.total} lessons</div>
          </div>
          <div className="w-24 tm-progress-track h-4">
            <div
              className="tm-progress-bar"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
