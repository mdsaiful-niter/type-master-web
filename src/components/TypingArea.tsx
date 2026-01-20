import React from 'react';
import { cn } from '@/lib/utils';

interface TypingAreaProps {
  text: string;
  currentIndex: number;
  typedText: string;
  lessonKeys?: string[];
}

const TypingArea: React.FC<TypingAreaProps> = ({
  text,
  currentIndex,
  typedText,
  lessonKeys = [],
}) => {
  return (
    <div className="tm-panel">
      {lessonKeys.length > 0 && (
        <div className="tm-panel-header rounded-t flex items-center gap-2">
          <span>Lesson Keys:</span>
          <div className="flex gap-2">
            {lessonKeys.map((key, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-white/20 rounded text-sm font-mono"
              >
                {key === ' ' ? 'Space' : key.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="font-mono text-xl leading-relaxed tracking-wide bg-card rounded-lg p-6 border-2 border-panel-border shadow-inner">
          {text.split('').map((char, idx) => {
            const isTyped = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const isCorrect = isTyped && typedText[idx] === char;
            const isIncorrect = isTyped && typedText[idx] !== char;
            
            return (
              <span
                key={idx}
                className={cn(
                  'transition-colors duration-100',
                  isCorrect && 'text-accent',
                  isIncorrect && 'text-destructive bg-destructive/20',
                  isCurrent && 'bg-key-next text-foreground typing-cursor border-b-2 border-primary',
                  !isTyped && !isCurrent && 'text-muted-foreground'
                )}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </div>
        
        {/* Progress indicator */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{Math.round((currentIndex / text.length) * 100)}%</span>
          </div>
          <div className="tm-progress-track h-3">
            <div
              className="tm-progress-bar"
              style={{ width: `${(currentIndex / text.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingArea;
