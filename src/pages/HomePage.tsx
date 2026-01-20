import React from 'react';
import { Link } from 'react-router-dom';
import { useTypingStore } from '@/lib/typingStore';
import AppHeader from '@/components/AppHeader';

const HomePage: React.FC = () => {
  const { getProgress } = useTypingStore();
  const progress = getProgress();

  const menuItems = [
    {
      icon: '📚',
      title: 'Start Course',
      description: 'Learn touch typing with structured lessons',
      path: '/courses',
      color: 'bg-blue-100',
    },
    {
      icon: '⌨️',
      title: 'Typing Practice',
      description: 'Free practice with words, sentences, and paragraphs',
      path: '/practice',
      color: 'bg-green-100',
    },
    {
      icon: '📊',
      title: 'Progress & Reports',
      description: 'View your typing statistics and history',
      path: '/progress',
      color: 'bg-amber-100',
    },
    {
      icon: '⚙️',
      title: 'Settings',
      description: 'Customize your learning experience',
      path: '/settings',
      color: 'bg-purple-100',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="tm-panel p-8 mb-8 text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-5xl">⌨️</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">Welcome to Typing Master</h2>
            <p className="text-muted-foreground text-lg mb-4">
              Learn to type faster and more accurately with our comprehensive typing course
            </p>
            
            {progress.percentage > 0 && (
              <div className="max-w-md mx-auto">
                <div className="flex justify-between text-sm mb-2">
                  <span>Course Progress</span>
                  <span>{progress.completed} of {progress.total} lessons completed</span>
                </div>
                <div className="tm-progress-track h-4">
                  <div
                    className="tm-progress-bar"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
              </div>
            )}
          </div>
          
          {/* Menu Grid */}
          <div className="grid grid-cols-2 gap-6">
            {menuItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <div className="tm-menu-item h-full">
                  <div className={`w-16 h-16 rounded-lg ${item.color} flex items-center justify-center text-3xl`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <span className="text-2xl text-muted-foreground">→</span>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Tips Section */}
          <div className="tm-panel mt-8 p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span>💡</span> Typing Tips
            </h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-muted rounded">
                <strong>Posture</strong>
                <p className="text-muted-foreground mt-1">Sit up straight with feet flat on the floor</p>
              </div>
              <div className="p-3 bg-muted rounded">
                <strong>Home Row</strong>
                <p className="text-muted-foreground mt-1">Keep fingers on ASDF and JKL; keys</p>
              </div>
              <div className="p-3 bg-muted rounded">
                <strong>Practice</strong>
                <p className="text-muted-foreground mt-1">15-30 minutes daily brings best results</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="tm-panel rounded-none p-4 text-center text-sm text-muted-foreground">
        Typing Master Web Edition • Learn to type like a pro
      </footer>
    </div>
  );
};

export default HomePage;
