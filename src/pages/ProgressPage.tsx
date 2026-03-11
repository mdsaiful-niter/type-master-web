import React from 'react';
import { Link } from 'react-router-dom';
import { useTypingStore } from '@/lib/typingStore';
import AppHeader from '@/components/AppHeader';
import { motion } from 'framer-motion';

const ProgressPage: React.FC = () => {
  const { history, errorFrequency, getProgress, courses } = useTypingStore();
  const progress = getProgress();

  const averageWpm = history.length > 0 ? Math.round(history.reduce((sum, h) => sum + h.wpm, 0) / history.length) : 0;
  const averageAccuracy = history.length > 0 ? Math.round(history.reduce((sum, h) => sum + h.accuracy, 0) / history.length) : 0;
  const recentHistory = [...history].reverse().slice(0, 10);
  const sortedErrors = Object.entries(errorFrequency).sort(([, a], [, b]) => b - a).slice(0, 8);

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  const formatDuration = (ms: number) => { const s = Math.floor(ms / 1000); return `${Math.floor(s / 60)}m ${s % 60}s`; };

  const statCards = [
    { label: 'Lessons Done', value: progress.completed, color: 'text-gradient-gold' },
    { label: 'Avg WPM', value: averageWpm, color: 'text-gradient-gold' },
    { label: 'Avg Accuracy', value: `${averageAccuracy}%`, color: 'text-accent' },
    { label: 'Total Sessions', value: history.length, color: 'text-foreground' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors mb-4 inline-block">← Back to Home</Link>
            <h2 className="text-3xl font-bold text-gradient-gold">Progress & Reports</h2>
            <p className="text-muted-foreground mt-1">Track your typing improvement over time</p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {statCards.map((card, i) => (
              <motion.div key={card.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="tm-panel p-6 text-center stat-card">
                <div className={`text-4xl font-bold ${card.color}`}>{card.value}</div>
                <div className="text-[10px] text-muted-foreground mt-2 uppercase tracking-wider">{card.label}</div>
              </motion.div>
            ))}
          </div>
          
          <div className="grid grid-cols-[1fr_300px] gap-6">
            {/* History */}
            <div className="tm-panel">
              <div className="tm-panel-header rounded-t-xl">Recent Sessions</div>
              {recentHistory.length > 0 ? (
                <div className="overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/30">
                        {['Date', 'Lesson', 'WPM', 'Accuracy', 'Errors', 'Duration'].map(h => (
                          <th key={h} className="text-left p-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {recentHistory.map((entry, idx) => (
                        <tr key={idx} className="border-t border-border hover:bg-muted/20 transition-colors">
                          <td className="p-3 text-sm text-muted-foreground">{formatDate(entry.date)}</td>
                          <td className="p-3 text-sm font-medium">{entry.lessonTitle}</td>
                          <td className="p-3 text-sm text-primary font-medium">{entry.wpm}</td>
                          <td className="p-3 text-sm text-accent font-medium">{entry.accuracy}%</td>
                          <td className="p-3 text-sm text-destructive">{entry.errors}</td>
                          <td className="p-3 text-sm text-muted-foreground">{formatDuration(entry.duration)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <div className="text-4xl mb-4">📊</div>
                  <p>No sessions recorded yet.</p>
                  <p className="text-sm mt-2">Complete some lessons to see your progress!</p>
                </div>
              )}
            </div>
            
            {/* Side */}
            <div className="space-y-6">
              <div className="tm-panel">
                <div className="tm-panel-header rounded-t-xl">Course Progress</div>
                <div className="p-4 space-y-4">
                  {courses.map((course) => {
                    const done = course.lessons.filter(l => l.completed).length;
                    return (
                      <div key={course.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{course.title}</span>
                          <span className="text-muted-foreground text-xs">{done}/{course.lessons.length}</span>
                        </div>
                        <div className="tm-progress-track h-2">
                          <div className="tm-progress-bar" style={{ width: `${(done / course.lessons.length) * 100}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="tm-panel">
                <div className="tm-panel-header rounded-t-xl">Keys to Practice</div>
                <div className="p-4">
                  {sortedErrors.length > 0 ? (
                    <div className="space-y-2">
                      {sortedErrors.map(([key, count]) => (
                        <div key={key} className="flex items-center gap-3">
                          <span className="w-9 h-9 tm-key flex-shrink-0 text-xs">{key === ' ' ? '⎵' : key.toUpperCase()}</span>
                          <div className="flex-1">
                            <div className="tm-progress-track h-1.5">
                              <div className="h-full rounded-full bg-destructive" style={{ width: `${Math.min((count / sortedErrors[0][1]) * 100, 100)}%` }} />
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground w-6 text-right">{count}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground text-sm">No error data yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProgressPage;
