import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="tm-panel"
    >
      {lessonKeys.length > 0 && (
        <div className="tm-panel-header rounded-t-xl flex items-center gap-3">
          <span className="text-muted-foreground text-xs">Focus Keys</span>
          <div className="flex gap-1.5">
            {lessonKeys.map((key, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 bg-primary/15 border border-primary/20 rounded-md text-xs font-mono text-primary"
              >
                {key === ' ' ? 'Space' : key.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="font-mono text-lg leading-loose tracking-wide bg-muted/30 rounded-lg p-6 border border-border">
          {text.split('').map((char, idx) => {
            const isTyped = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const isCorrect = isTyped && typedText[idx] === char;
            const isIncorrect = isTyped && typedText[idx] !== char;
            
            return (
              <span
                key={idx}
                className={cn(
                  'transition-colors duration-100 rounded-sm',
                  isCorrect && 'text-accent',
                  isIncorrect && 'text-destructive bg-destructive/15',
                  isCurrent && 'bg-primary/20 text-primary typing-cursor border-b-2 border-primary',
                  !isTyped && !isCurrent && 'text-muted-foreground'
                )}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </div>
        
        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span className="uppercase tracking-wider">Progress</span>
            <span className="text-primary font-medium">{Math.round((currentIndex / text.length) * 100)}%</span>
          </div>
          <div className="tm-progress-track h-2">
            <div
              className="tm-progress-bar"
              style={{ width: `${(currentIndex / text.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TypingArea;
