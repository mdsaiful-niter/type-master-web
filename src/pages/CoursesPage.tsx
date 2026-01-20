import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTypingStore } from '@/lib/typingStore';
import AppHeader from '@/components/AppHeader';
import { cn } from '@/lib/utils';

const CoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const { courses, setCourse, setLesson, currentCourseId } = useTypingStore();

  const handleStartLesson = (courseId: string, lessonId: string) => {
    setCourse(courseId);
    setLesson(lessonId);
    navigate('/lesson');
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-amber-100 text-amber-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-muted text-muted-foreground';
    }
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
          {/* Page Header */}
          <div className="mb-8">
            <Link to="/" className="tm-button text-sm mb-4 inline-block">
              ← Back to Home
            </Link>
            <h2 className="text-2xl font-bold">Typing Courses</h2>
            <p className="text-muted-foreground">Select a course to begin your typing journey</p>
          </div>
          
          {/* Course List */}
          <div className="space-y-8">
            {courses.map((course) => {
              const completedCount = course.lessons.filter(l => l.completed).length;
              const progressPercent = (completedCount / course.lessons.length) * 100;
              
              return (
                <div key={course.id} className="tm-panel">
                  {/* Course Header */}
                  <div className="tm-panel-header rounded-t flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{getLevelIcon(course.level)}</span>
                      <div>
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-xs opacity-80">{course.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={cn('px-2 py-1 rounded text-xs font-medium', getLevelColor(course.level))}>
                        {course.level.toUpperCase()}
                      </span>
                      <span className="text-sm">
                        {completedCount}/{course.lessons.length} completed
                      </span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="px-4 pt-4">
                    <div className="tm-progress-track h-2">
                      <div
                        className="tm-progress-bar"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Lesson Grid */}
                  <div className="p-4 grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {course.lessons.map((lesson, idx) => (
                      <div
                        key={lesson.id}
                        onClick={() => handleStartLesson(course.id, lesson.id)}
                        className={cn(
                          'tm-lesson-card',
                          lesson.completed && 'completed'
                        )}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-xs text-muted-foreground">
                            Lesson {idx + 1}
                          </span>
                          {lesson.completed && (
                            <span className="text-accent text-lg">✓</span>
                          )}
                        </div>
                        
                        <h4 className="font-medium mb-1">{lesson.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          {lesson.description}
                        </p>
                        
                        {lesson.keys.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {lesson.keys.slice(0, 6).map((key, kidx) => (
                              <span
                                key={kidx}
                                className="px-2 py-0.5 bg-muted rounded text-xs font-mono"
                              >
                                {key}
                              </span>
                            ))}
                            {lesson.keys.length > 6 && (
                              <span className="text-xs text-muted-foreground">
                                +{lesson.keys.length - 6} more
                              </span>
                            )}
                          </div>
                        )}
                        
                        {lesson.completed && lesson.wpm !== undefined && (
                          <div className="flex gap-3 text-xs">
                            <span className="text-primary">
                              {lesson.wpm} WPM
                            </span>
                            <span className="text-accent">
                              {lesson.accuracy}% accuracy
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CoursesPage;
