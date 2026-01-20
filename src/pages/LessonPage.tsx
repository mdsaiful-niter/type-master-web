import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTypingStore } from '@/lib/typingStore';
import { keyToFingerMap, FingerType, Hand } from '@/lib/typingData';
import AppHeader from '@/components/AppHeader';
import Keyboard from '@/components/Keyboard';
import HandDiagram from '@/components/HandDiagram';
import TypingArea from '@/components/TypingArea';
import ProgressPanel from '@/components/ProgressPanel';

const LessonPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    courses,
    currentCourseId,
    currentLessonId,
    currentText,
    typedText,
    currentIndex,
    isTyping,
    isPaused,
    stats,
    startTyping,
    handleKeyPress,
    pauseTyping,
    resumeTyping,
    resetSession,
    completeLesson,
    setLesson,
  } = useTypingStore();

  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [nextKey, setNextKey] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [activeFinger, setActiveFinger] = useState<{ finger: FingerType; hand: Hand } | null>(null);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [showCompleted, setShowCompleted] = useState(false);

  // Get current course and lesson
  const course = courses.find(c => c.id === currentCourseId);
  const lesson = course?.lessons.find(l => l.id === currentLessonId);
  const lessonIndex = course?.lessons.findIndex(l => l.id === currentLessonId) ?? -1;

  // Initialize
  useEffect(() => {
    if (lesson && !isTyping && !showCompleted) {
      const exercise = lesson.exercises[exerciseIndex] || lesson.exercises[0];
      if (exercise) {
        startTyping(exercise);
      }
    }
  }, [lesson, exerciseIndex, showCompleted]);

  // Update next key highlight
  useEffect(() => {
    if (currentText && currentIndex < currentText.length) {
      const next = currentText[currentIndex];
      setNextKey(next);
      const fingerInfo = keyToFingerMap[next.toLowerCase()] || keyToFingerMap[' '];
      setActiveFinger(fingerInfo || null);
    } else {
      setNextKey(null);
      setActiveFinger(null);
    }
  }, [currentText, currentIndex]);

  // Keyboard handler
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isPaused || !isTyping || showCompleted) return;
    
    // Prevent default for space to avoid scrolling
    if (e.key === ' ') {
      e.preventDefault();
    }

    // Only handle printable characters and space
    if (e.key.length === 1 || e.key === ' ') {
      const key = e.key;
      setActiveKey(key);
      
      const result = handleKeyPress(key);
      
      if (!result.correct) {
        setErrorKey(currentText[currentIndex]);
        setTimeout(() => setErrorKey(null), 300);
      }
      
      if (result.completed) {
        // Check if there are more exercises
        if (lesson && exerciseIndex < lesson.exercises.length - 1) {
          // Next exercise
          setTimeout(() => {
            setExerciseIndex(prev => prev + 1);
          }, 1000);
        } else {
          // Lesson complete
          completeLesson();
          setShowCompleted(true);
        }
      }
      
      setTimeout(() => setActiveKey(null), 100);
    }
  }, [isPaused, isTyping, showCompleted, handleKeyPress, currentText, currentIndex, lesson, exerciseIndex, completeLesson]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleReset = () => {
    setExerciseIndex(0);
    setShowCompleted(false);
    resetSession();
    if (lesson) {
      startTyping(lesson.exercises[0]);
    }
  };

  const handleNextLesson = () => {
    if (course && lessonIndex < course.lessons.length - 1) {
      const nextLesson = course.lessons[lessonIndex + 1];
      setExerciseIndex(0);
      setShowCompleted(false);
      setLesson(nextLesson.id);
    }
  };

  const handlePrevLesson = () => {
    if (course && lessonIndex > 0) {
      const prevLesson = course.lessons[lessonIndex - 1];
      setExerciseIndex(0);
      setShowCompleted(false);
      setLesson(prevLesson.id);
    }
  };

  if (!lesson || !course) {
    return (
      <div className="min-h-screen flex flex-col">
        <AppHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="tm-panel p-8 text-center">
            <h2 className="text-xl font-bold mb-4">No Lesson Selected</h2>
            <p className="text-muted-foreground mb-4">Please select a lesson from the courses page.</p>
            <Link to="/courses" className="tm-button tm-button-primary">
              Go to Courses
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (showCompleted) {
    return (
      <div className="min-h-screen flex flex-col">
        <AppHeader />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="tm-panel p-8 text-center max-w-lg">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">Lesson Completed!</h2>
            <p className="text-muted-foreground mb-6">{lesson.title}</p>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="tm-panel p-4">
                <div className="text-2xl font-bold text-primary">{stats.wpm}</div>
                <div className="text-xs text-muted-foreground">WPM</div>
              </div>
              <div className="tm-panel p-4">
                <div className="text-2xl font-bold text-accent">{stats.accuracy}%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
              <div className="tm-panel p-4">
                <div className="text-2xl font-bold text-destructive">{stats.errors}</div>
                <div className="text-xs text-muted-foreground">Errors</div>
              </div>
            </div>
            
            <div className="flex gap-3 justify-center">
              <button onClick={handleReset} className="tm-button">
                Try Again
              </button>
              {lessonIndex < course.lessons.length - 1 ? (
                <button onClick={handleNextLesson} className="tm-button tm-button-primary">
                  Next Lesson →
                </button>
              ) : (
                <Link to="/courses" className="tm-button tm-button-primary">
                  Back to Courses
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-1 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-4 flex items-center gap-2 text-sm">
            <Link to="/courses" className="text-primary hover:underline">
              Courses
            </Link>
            <span className="text-muted-foreground">→</span>
            <span className="text-muted-foreground">{course.title}</span>
            <span className="text-muted-foreground">→</span>
            <span className="font-medium">{lesson.title}</span>
            <span className="text-muted-foreground ml-4">
              Exercise {exerciseIndex + 1} of {lesson.exercises.length}
            </span>
          </div>
          
          {/* Main Layout: Two columns */}
          <div className="grid grid-cols-[1fr_280px] gap-4">
            {/* Left: Main typing area */}
            <div className="space-y-4">
              {/* Typing Area */}
              <TypingArea
                text={currentText}
                currentIndex={currentIndex}
                typedText={typedText}
                lessonKeys={lesson.keys}
              />
              
              {/* Keyboard */}
              <Keyboard
                activeKey={activeKey}
                nextKey={nextKey}
                errorKey={errorKey}
              />
              
              {/* Hands */}
              <div className="grid grid-cols-2 gap-4">
                <HandDiagram
                  hand="left"
                  activeFinger={activeFinger?.hand === 'left' ? activeFinger.finger : null}
                />
                <HandDiagram
                  hand="right"
                  activeFinger={activeFinger?.hand === 'right' ? activeFinger.finger : null}
                />
              </div>
            </div>
            
            {/* Right: Progress Panel */}
            <ProgressPanel
              stats={stats}
              isPaused={isPaused}
              onPause={pauseTyping}
              onResume={resumeTyping}
              onReset={handleReset}
              onNext={lessonIndex < course.lessons.length - 1 ? handleNextLesson : undefined}
              onBack={lessonIndex > 0 ? handlePrevLesson : undefined}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LessonPage;
