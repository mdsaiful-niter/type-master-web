import React from 'react';
import { Link } from 'react-router-dom';
import { useTypingStore, HistoryEntry } from '@/lib/typingStore';
import AppHeader from '@/components/AppHeader';

const ProgressPage: React.FC = () => {
  const { history, errorFrequency, getProgress, courses } = useTypingStore();
  const progress = getProgress();

  // Calculate averages
  const averageWpm = history.length > 0
    ? Math.round(history.reduce((sum, h) => sum + h.wpm, 0) / history.length)
    : 0;
  
  const averageAccuracy = history.length > 0
    ? Math.round(history.reduce((sum, h) => sum + h.accuracy, 0) / history.length)
    : 0;

  // Get recent history (last 10)
  const recentHistory = [...history].reverse().slice(0, 10);

  // Get most problematic keys
  const sortedErrors = Object.entries(errorFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Format duration
  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link to="/" className="tm-button text-sm mb-4 inline-block">
              ← Back to Home
            </Link>
            <h2 className="text-2xl font-bold">Progress & Reports</h2>
            <p className="text-muted-foreground">Track your typing improvement over time</p>
          </div>
          
          {/* Overview Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="tm-panel p-6 text-center">
              <div className="text-4xl font-bold text-primary">{progress.completed}</div>
              <div className="text-sm text-muted-foreground mt-1">Lessons Completed</div>
            </div>
            <div className="tm-panel p-6 text-center">
              <div className="text-4xl font-bold text-accent">{averageWpm}</div>
              <div className="text-sm text-muted-foreground mt-1">Average WPM</div>
            </div>
            <div className="tm-panel p-6 text-center">
              <div className="text-4xl font-bold text-accent">{averageAccuracy}%</div>
              <div className="text-sm text-muted-foreground mt-1">Average Accuracy</div>
            </div>
            <div className="tm-panel p-6 text-center">
              <div className="text-4xl font-bold">{history.length}</div>
              <div className="text-sm text-muted-foreground mt-1">Total Sessions</div>
            </div>
          </div>
          
          <div className="grid grid-cols-[1fr_300px] gap-6">
            {/* History Table */}
            <div className="tm-panel">
              <div className="tm-panel-header rounded-t">
                Recent Sessions
              </div>
              
              {recentHistory.length > 0 ? (
                <div className="overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 text-sm font-medium">Date</th>
                        <th className="text-left p-3 text-sm font-medium">Lesson</th>
                        <th className="text-center p-3 text-sm font-medium">WPM</th>
                        <th className="text-center p-3 text-sm font-medium">Accuracy</th>
                        <th className="text-center p-3 text-sm font-medium">Errors</th>
                        <th className="text-center p-3 text-sm font-medium">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentHistory.map((entry, idx) => (
                        <tr key={idx} className="border-t border-border hover:bg-muted/30">
                          <td className="p-3 text-sm text-muted-foreground">
                            {formatDate(entry.date)}
                          </td>
                          <td className="p-3 text-sm font-medium">{entry.lessonTitle}</td>
                          <td className="p-3 text-sm text-center text-primary font-medium">
                            {entry.wpm}
                          </td>
                          <td className="p-3 text-sm text-center text-accent font-medium">
                            {entry.accuracy}%
                          </td>
                          <td className="p-3 text-sm text-center text-destructive">
                            {entry.errors}
                          </td>
                          <td className="p-3 text-sm text-center text-muted-foreground">
                            {formatDuration(entry.duration)}
                          </td>
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
            
            {/* Side Panel */}
            <div className="space-y-6">
              {/* Course Progress */}
              <div className="tm-panel">
                <div className="tm-panel-header rounded-t">
                  Course Progress
                </div>
                <div className="p-4 space-y-4">
                  {courses.map((course) => {
                    const completed = course.lessons.filter(l => l.completed).length;
                    const percent = (completed / course.lessons.length) * 100;
                    
                    return (
                      <div key={course.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{course.title}</span>
                          <span className="text-muted-foreground">
                            {completed}/{course.lessons.length}
                          </span>
                        </div>
                        <div className="tm-progress-track h-3">
                          <div
                            className="tm-progress-bar"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Problem Keys */}
              <div className="tm-panel">
                <div className="tm-panel-header rounded-t">
                  Keys to Practice
                </div>
                <div className="p-4">
                  {sortedErrors.length > 0 ? (
                    <div className="space-y-2">
                      {sortedErrors.map(([key, count]) => (
                        <div key={key} className="flex items-center gap-3">
                          <span className="w-10 h-10 tm-key flex-shrink-0">
                            {key === ' ' ? '⎵' : key.toUpperCase()}
                          </span>
                          <div className="flex-1">
                            <div className="tm-progress-track h-2">
                              <div
                                className="h-full rounded-sm bg-destructive"
                                style={{
                                  width: `${Math.min((count / sortedErrors[0][1]) * 100, 100)}%`,
                                }}
                              />
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground w-8 text-right">
                            {count}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground text-sm">
                      No error data yet. Keep practicing!
                    </p>
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
