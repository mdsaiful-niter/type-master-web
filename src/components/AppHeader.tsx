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
    <header className="border-b border-border backdrop-blur-xl sticky top-0 z-50"
            style={{ background: 'hsl(225 20% 7% / 0.85)' }}>
      <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center group-hover:border-primary/40 transition-colors">
            <span className="text-primary font-bold text-sm">TM</span>
          </div>
          <div>
            <h1 className="text-base font-bold text-gradient-gold">Typing Master</h1>
            <p className="text-[10px] text-muted-foreground tracking-widest uppercase">Web Edition</p>
          </div>
        </Link>
        
        {/* Navigation */}
        <nav className="flex items-center gap-1 bg-muted/50 rounded-lg p-1 border border-border">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'px-4 py-1.5 text-sm rounded-md transition-all duration-200 font-medium',
                location.pathname === item.path
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        {/* Progress */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Progress</div>
            <div className="text-sm font-semibold text-primary">{progress.completed}/{progress.total}</div>
          </div>
          <div className="w-20 tm-progress-track h-2">
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
