import React from 'react';
import { Link } from 'react-router-dom';
import { useTypingStore } from '@/lib/typingStore';
import AppHeader from '@/components/AppHeader';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const { getProgress } = useTypingStore();
  const progress = getProgress();

  const menuItems = [
    {
      icon: '📚',
      title: 'Start Course',
      description: 'Learn touch typing with structured lessons',
      path: '/courses',
    },
    {
      icon: '⌨️',
      title: 'Typing Practice',
      description: 'Free practice with words, sentences, and paragraphs',
      path: '/practice',
    },
    {
      icon: '📊',
      title: 'Progress & Reports',
      description: 'View your typing statistics and history',
      path: '/progress',
    },
    {
      icon: '⚙️',
      title: 'Settings',
      description: 'Customize your learning experience',
      path: '/settings',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="tm-panel p-10 mb-10 text-center relative overflow-hidden"
          >
            {/* Decorative gradient orb */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-20 blur-3xl" 
                 style={{ background: 'radial-gradient(circle, hsl(38 85% 55%), transparent)' }} />
            
            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <span className="text-4xl">⌨️</span>
              </div>
              <h2 className="text-4xl font-bold mb-3 text-gradient-gold">Typing Master</h2>
              <p className="text-muted-foreground text-lg mb-6 max-w-md mx-auto">
                Master the art of touch typing with precision and speed
              </p>
              
              {progress.percentage > 0 && (
                <div className="max-w-sm mx-auto">
                  <div className="flex justify-between text-sm mb-2 text-muted-foreground">
                    <span>Course Progress</span>
                    <span className="text-primary font-medium">{progress.completed} / {progress.total}</span>
                  </div>
                  <div className="tm-progress-track h-3">
                    <div
                      className="tm-progress-bar"
                      style={{ width: `${progress.percentage}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Menu Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 gap-5"
          >
            {menuItems.map((menuItem) => (
              <motion.div key={menuItem.path} variants={item}>
                <Link to={menuItem.path}>
                  <div className="tm-menu-item h-full group">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-2xl border border-primary/10 group-hover:border-primary/30 transition-colors">
                      {menuItem.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold mb-1">{menuItem.title}</h3>
                      <p className="text-sm text-muted-foreground">{menuItem.description}</p>
                    </div>
                    <span className="text-xl text-muted-foreground group-hover:text-primary transition-colors">→</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Tips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="tm-panel mt-10 p-6"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-primary">
              <span>💡</span> Quick Tips
            </h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              {[
                { title: 'Posture', desc: 'Sit up straight with feet flat on the floor' },
                { title: 'Home Row', desc: 'Keep fingers on ASDF and JKL; keys' },
                { title: 'Practice', desc: '15-30 minutes daily brings best results' },
              ].map((tip) => (
                <div key={tip.title} className="p-4 bg-muted/50 rounded-lg border border-border">
                  <strong className="text-foreground">{tip.title}</strong>
                  <p className="text-muted-foreground mt-1">{tip.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      
      <footer className="border-t border-border p-4 text-center text-sm text-muted-foreground">
        Typing Master Web Edition • Master your keyboard
      </footer>
    </div>
  );
};

export default HomePage;
