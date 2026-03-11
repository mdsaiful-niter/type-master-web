import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTypingStore } from '@/lib/typingStore';
import AppHeader from '@/components/AppHeader';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const CoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const { courses, setCourse, setLesson } = useTypingStore();

  const handleStartLesson = (courseId: string, lessonId: string) => {
    setCourse(courseId);
    setLesson(lessonId);
    navigate('/lesson');
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'beginner': return '🌱';
      case 'intermediate': return '📈';
      case 'advanced': return '🏆';
      default: return '📚';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors mb-4 inline-block">
              ← Back to Home
            </Link>
            <h2 className="text-3xl font-bold text-gradient-gold">Typing Courses</h2>
            <p className="text-muted-foreground mt-1">Select a course to begin your typing journey</p>
          </div>
          
          <div className="space-y-8">
            {courses.map((course, courseIdx) => {
              const completedCount = course.lessons.filter(l => l.completed).length;
              const progressPercent = (completedCount / course.lessons.length) * 100;
              
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: courseIdx * 0.1 }}
                  className="tm-panel"
                >
                  <div className="tm-panel-header rounded-t-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{getLevelIcon(course.level)}</span>
                      <div>
                        <h3 className="font-semibold normal-case tracking-normal">{course.title}</h3>
                        <p className="text-xs opacity-60 normal-case tracking-normal">{course.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-primary/15 text-primary border border-primary/20">
                        {course.level}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {completedCount}/{course.lessons.length}
                      </span>
                    </div>
                  </div>
                  
                  <div className="px-5 pt-5">
                    <div className="tm-progress-track h-1.5">
                      <div className="tm-progress-bar" style={{ width: `${progressPercent}%` }} />
                    </div>
                  </div>
                  
                  <div className="p-5 grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {course.lessons.map((lesson, idx) => (
                      <div
                        key={lesson.id}
                        onClick={() => handleStartLesson(course.id, lesson.id)}
                        className={cn('tm-lesson-card', lesson.completed && 'completed')}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                            Lesson {idx + 1}
                          </span>
                          {lesson.completed && <span className="text-accent text-sm">✓</span>}
                        </div>
                        
                        <h4 className="font-medium text-sm mb-1">{lesson.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{lesson.description}</p>
                        
                        {lesson.keys.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {lesson.keys.slice(0, 6).map((key, kidx) => (
                              <span key={kidx} className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono text-muted-foreground">
                                {key}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {lesson.completed && lesson.wpm !== undefined && (
                          <div className="flex gap-3 text-xs mt-1">
                            <span className="text-primary">{lesson.wpm} WPM</span>
                            <span className="text-accent">{lesson.accuracy}%</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CoursesPage;
