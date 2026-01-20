import React from 'react';
import { TypingStats } from '@/lib/typingStore';

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
    <div className="tm-panel h-full flex flex-col">
      <div className="tm-panel-header rounded-t">
        Your Progress
      </div>
      
      <div className="flex-1 p-4 space-y-6">
        {/* Stats Display */}
        <div className="space-y-4">
          {/* WPM */}
          <div className="tm-panel p-3">
            <div className="text-xs text-muted-foreground mb-1">Speed (WPM)</div>
            <div className="text-3xl font-bold text-primary">{stats.wpm}</div>
            <div className="tm-progress-track h-2 mt-2">
              <div
                className="tm-progress-bar"
                style={{ width: `${Math.min(stats.wpm, 100)}%` }}
              />
            </div>
          </div>
          
          {/* Accuracy */}
          <div className="tm-panel p-3">
            <div className="text-xs text-muted-foreground mb-1">Accuracy</div>
            <div className="text-3xl font-bold text-accent">{stats.accuracy}%</div>
            <div className="tm-progress-track h-2 mt-2">
              <div
                className="tm-progress-bar"
                style={{ width: `${stats.accuracy}%` }}
              />
            </div>
          </div>
          
          {/* Errors */}
          <div className="tm-panel p-3">
            <div className="text-xs text-muted-foreground mb-1">Errors</div>
            <div className="text-3xl font-bold text-destructive">{stats.errors}</div>
          </div>
          
          {/* Timer */}
          <div className="tm-panel p-3">
            <div className="text-xs text-muted-foreground mb-1">
              {isPaused ? 'Time (paused)' : 'Time'}
            </div>
            <div className="text-2xl font-mono font-bold">
              {formatTime(elapsedTime)}
            </div>
          </div>
        </div>
        
        {/* Control Buttons */}
        <div className="space-y-2">
          {isPaused ? (
            <button
              onClick={onResume}
              className="tm-button tm-button-primary w-full"
            >
              Resume
            </button>
          ) : (
            <button
              onClick={onPause}
              className="tm-button w-full"
            >
              Pause
            </button>
          )}
          
          <button
            onClick={onReset}
            className="tm-button w-full"
          >
            Restart
          </button>
        </div>
      </div>
      
      {/* Navigation */}
      {showNavigation && (
        <div className="p-4 border-t border-panel-border flex gap-2">
          <button
            onClick={onBack}
            className="tm-button flex-1"
            disabled={!onBack}
          >
            ← Back
          </button>
          <button
            onClick={onNext}
            className="tm-button tm-button-primary flex-1"
            disabled={!onNext}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default ProgressPanel;
