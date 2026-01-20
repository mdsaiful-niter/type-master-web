import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { courses, Lesson, Course } from './typingData';

export interface TypingStats {
  wpm: number;
  accuracy: number;
  errors: number;
  totalChars: number;
  correctChars: number;
  startTime: number | null;
  endTime: number | null;
}

export interface HistoryEntry {
  date: string;
  lessonId: string;
  lessonTitle: string;
  wpm: number;
  accuracy: number;
  errors: number;
  duration: number;
}

export interface Settings {
  soundEnabled: boolean;
  keyboardLayout: 'qwerty';
  lessonSpeed: 'slow' | 'normal' | 'fast';
  showFingerHints: boolean;
}

interface TypingState {
  // Course progress
  courses: Course[];
  currentCourseId: string | null;
  currentLessonId: string | null;
  
  // Current session
  currentText: string;
  typedText: string;
  currentIndex: number;
  isTyping: boolean;
  isPaused: boolean;
  stats: TypingStats;
  
  // History
  history: HistoryEntry[];
  errorFrequency: Record<string, number>;
  
  // Settings
  settings: Settings;
  
  // Actions
  setCourse: (courseId: string) => void;
  setLesson: (lessonId: string) => void;
  startTyping: (text: string) => void;
  handleKeyPress: (key: string) => { correct: boolean; completed: boolean };
  pauseTyping: () => void;
  resumeTyping: () => void;
  resetSession: () => void;
  completeLesson: () => void;
  updateSettings: (settings: Partial<Settings>) => void;
  getProgress: () => { completed: number; total: number; percentage: number };
}

const defaultStats: TypingStats = {
  wpm: 0,
  accuracy: 100,
  errors: 0,
  totalChars: 0,
  correctChars: 0,
  startTime: null,
  endTime: null,
};

const defaultSettings: Settings = {
  soundEnabled: true,
  keyboardLayout: 'qwerty',
  lessonSpeed: 'normal',
  showFingerHints: true,
};

export const useTypingStore = create<TypingState>()(
  persist(
    (set, get) => ({
      courses: courses,
      currentCourseId: null,
      currentLessonId: null,
      
      currentText: '',
      typedText: '',
      currentIndex: 0,
      isTyping: false,
      isPaused: false,
      stats: { ...defaultStats },
      
      history: [],
      errorFrequency: {},
      
      settings: { ...defaultSettings },
      
      setCourse: (courseId: string) => {
        set({ currentCourseId: courseId, currentLessonId: null });
      },
      
      setLesson: (lessonId: string) => {
        const state = get();
        const course = state.courses.find(c => c.id === state.currentCourseId);
        const lesson = course?.lessons.find(l => l.id === lessonId);
        
        if (lesson) {
          set({ 
            currentLessonId: lessonId,
            currentText: lesson.exercises[0] || '',
            typedText: '',
            currentIndex: 0,
            isTyping: false,
            isPaused: false,
            stats: { ...defaultStats },
          });
        }
      },
      
      startTyping: (text: string) => {
        set({
          currentText: text,
          typedText: '',
          currentIndex: 0,
          isTyping: true,
          isPaused: false,
          stats: {
            ...defaultStats,
            startTime: Date.now(),
            totalChars: text.length,
          },
        });
      },
      
      handleKeyPress: (key: string) => {
        const state = get();
        if (!state.isTyping || state.isPaused) {
          return { correct: false, completed: false };
        }
        
        const expectedChar = state.currentText[state.currentIndex];
        const correct = key === expectedChar;
        
        const newStats = { ...state.stats };
        newStats.totalChars = state.currentText.length;
        
        if (correct) {
          newStats.correctChars++;
        } else {
          newStats.errors++;
          // Track error frequency
          const errorFreq = { ...state.errorFrequency };
          errorFreq[expectedChar] = (errorFreq[expectedChar] || 0) + 1;
          set({ errorFrequency: errorFreq });
        }
        
        // Calculate WPM and accuracy
        const elapsedMinutes = (Date.now() - (newStats.startTime || Date.now())) / 60000;
        const wordsTyped = (state.currentIndex + 1) / 5;
        newStats.wpm = elapsedMinutes > 0 ? Math.round(wordsTyped / elapsedMinutes) : 0;
        newStats.accuracy = Math.round((newStats.correctChars / (state.currentIndex + 1)) * 100);
        
        const newIndex = state.currentIndex + 1;
        const completed = newIndex >= state.currentText.length;
        
        if (completed) {
          newStats.endTime = Date.now();
        }
        
        set({
          typedText: state.typedText + key,
          currentIndex: newIndex,
          stats: newStats,
          isTyping: !completed,
        });
        
        return { correct, completed };
      },
      
      pauseTyping: () => {
        set({ isPaused: true });
      },
      
      resumeTyping: () => {
        set({ isPaused: false });
      },
      
      resetSession: () => {
        const state = get();
        set({
          typedText: '',
          currentIndex: 0,
          isTyping: false,
          isPaused: false,
          stats: { ...defaultStats, totalChars: state.currentText.length },
        });
      },
      
      completeLesson: () => {
        const state = get();
        if (!state.currentCourseId || !state.currentLessonId) return;
        
        // Update lesson as completed
        const updatedCourses = state.courses.map(course => {
          if (course.id === state.currentCourseId) {
            return {
              ...course,
              lessons: course.lessons.map(lesson => {
                if (lesson.id === state.currentLessonId) {
                  return {
                    ...lesson,
                    completed: true,
                    wpm: state.stats.wpm,
                    accuracy: state.stats.accuracy,
                  };
                }
                return lesson;
              }),
            };
          }
          return course;
        });
        
        // Find lesson title
        const course = state.courses.find(c => c.id === state.currentCourseId);
        const lesson = course?.lessons.find(l => l.id === state.currentLessonId);
        
        // Add to history
        const historyEntry: HistoryEntry = {
          date: new Date().toISOString(),
          lessonId: state.currentLessonId,
          lessonTitle: lesson?.title || 'Unknown',
          wpm: state.stats.wpm,
          accuracy: state.stats.accuracy,
          errors: state.stats.errors,
          duration: (state.stats.endTime || Date.now()) - (state.stats.startTime || Date.now()),
        };
        
        set({
          courses: updatedCourses,
          history: [...state.history, historyEntry],
        });
      },
      
      updateSettings: (newSettings: Partial<Settings>) => {
        set(state => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },
      
      getProgress: () => {
        const state = get();
        const totalLessons = state.courses.reduce((acc, c) => acc + c.lessons.length, 0);
        const completedLessons = state.courses.reduce(
          (acc, c) => acc + c.lessons.filter(l => l.completed).length,
          0
        );
        return {
          completed: completedLessons,
          total: totalLessons,
          percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
        };
      },
    }),
    {
      name: 'typing-master-storage',
      partialize: (state) => ({
        courses: state.courses,
        history: state.history,
        errorFrequency: state.errorFrequency,
        settings: state.settings,
      }),
    }
  )
);
