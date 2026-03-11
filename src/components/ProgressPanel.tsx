import React from 'react';
import { TypingStats } from '@/lib/typingStore';
import { motion } from 'framer-motion';

interface ProgressPanelProps {
  stats: TypingStats;
  isPaused: boolean;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onNext?: () => void;
  onBack?: () => void;
  showNavigation?: boolean;
}

const formatTime = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const ProgressPanel: React.FC<ProgressPanelProps> = ({
  stats,
  isPaused,
  onPause,
  onResume,
  onReset,
  onNext,
  onBack,
  showNavigation = true,
}) => {
  const elapsedTime = stats.startTime
    ? (stats.endTime || Date.now()) - stats.startTime
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="tm-panel h-full flex flex-col"
    >
      <div className="tm-panel-header rounded-t-xl">
        Your Progress
      </div>
      
      <div className="flex-1 p-4 space-y-4">
        {/* Stats */}
        <div className="space-y-3">
          {/* WPM */}
          <div className="tm-panel p-4 stat-card">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Speed</div>
            <div className="text-3xl font-bold text-gradient-gold">{stats.wpm}<span className="text-sm text-muted-foreground ml-1">wpm</span></div>
            <div className="tm-progress-track h-1.5 mt-3">
              <div className="tm-progress-bar" style={{ width: `${Math.min(stats.wpm, 100)}%` }} />
            </div>
          </div>
          
          {/* Accuracy */}
          <div className="tm-panel p-4 stat-card">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Accuracy</div>
            <div className="text-3xl font-bold text-accent">{stats.accuracy}<span className="text-sm text-muted-foreground ml-0.5">%</span></div>
            <div className="tm-progress-track h-1.5 mt-3">
              <div className="tm-progress-bar" style={{ width: `${stats.accuracy}%`, background: 'linear-gradient(90deg, hsl(160 55% 45%), hsl(160 60% 55%))' }} />
            </div>
          </div>
          
          {/* Errors */}
          <div className="tm-panel p-4 stat-card">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Errors</div>
            <div className="text-3xl font-bold text-destructive">{stats.errors}</div>
          </div>
          
          {/* Timer */}
          <div className="tm-panel p-4 stat-card">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
              {isPaused ? 'Paused' : 'Elapsed'}
            </div>
            <div className="text-2xl font-mono font-bold text-foreground/80">
              {formatTime(elapsedTime)}
            </div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="space-y-2">
          {isPaused ? (
            <button onClick={onResume} className="tm-button tm-button-primary w-full">
              Resume
            </button>
          ) : (
            <button onClick={onPause} className="tm-button w-full">
              Pause
            </button>
          )}
          <button onClick={onReset} className="tm-button w-full">
            Restart
          </button>
        </div>
      </div>
      
      {showNavigation && (
        <div className="p-4 border-t border-border flex gap-2">
          <button onClick={onBack} className="tm-button flex-1" disabled={!onBack}>
            ← Back
          </button>
          <button onClick={onNext} className="tm-button tm-button-primary flex-1" disabled={!onNext}>
            Next →
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ProgressPanel;
