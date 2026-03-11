import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTypingStore } from '@/lib/typingStore';
import { keyToFingerMap, FingerType, Hand, practiceTexts } from '@/lib/typingData';
import AppHeader from '@/components/AppHeader';
import Keyboard from '@/components/Keyboard';
import HandDiagram from '@/components/HandDiagram';
import TypingArea from '@/components/TypingArea';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type PracticeMode = 'words' | 'sentences' | 'paragraphs';

const PracticePage: React.FC = () => {
  const {
    currentText, typedText, currentIndex, isTyping, isPaused, stats,
    startTyping, handleKeyPress, pauseTyping, resumeTyping, resetSession,
  } = useTypingStore();

  const [mode, setMode] = useState<PracticeMode>('words');
  const [textIndex, setTextIndex] = useState(0);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [nextKey, setNextKey] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [activeFinger, setActiveFinger] = useState<{ finger: FingerType; hand: Hand } | null>(null);
  const [completed, setCompleted] = useState(false);

  const texts = practiceTexts[mode];

  useEffect(() => {
    if (!isTyping && !completed) startTyping(texts[textIndex]);
  }, [mode, textIndex, completed]);

  useEffect(() => {
    if (currentText && currentIndex < currentText.length) {
      const next = currentText[currentIndex];
      setNextKey(next);
      setActiveFinger(keyToFingerMap[next.toLowerCase()] || keyToFingerMap[' '] || null);
    } else {
      setNextKey(null);
      setActiveFinger(null);
    }
  }, [currentText, currentIndex]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isPaused || !isTyping || completed) return;
    if (e.key === ' ') e.preventDefault();
    if (e.key.length === 1 || e.key === ' ') {
      setActiveKey(e.key);
      const result = handleKeyPress(e.key);
      if (!result.correct) { setErrorKey(currentText[currentIndex]); setTimeout(() => setErrorKey(null), 300); }
      if (result.completed) setCompleted(true);
      setTimeout(() => setActiveKey(null), 100);
    }
  }, [isPaused, isTyping, completed, handleKeyPress, currentText, currentIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleModeChange = (m: PracticeMode) => { setMode(m); setTextIndex(0); setCompleted(false); resetSession(); };
  const handleNextText = () => { setTextIndex((textIndex + 1) % texts.length); setCompleted(false); resetSession(); };
  const handleReset = () => { setCompleted(false); resetSession(); startTyping(texts[textIndex]); };
  const handleRandomText = () => { setTextIndex(Math.floor(Math.random() * texts.length)); setCompleted(false); resetSession(); };

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors mb-4 inline-block">← Back to Home</Link>
            <h2 className="text-3xl font-bold text-gradient-gold">Typing Practice</h2>
            <p className="text-muted-foreground mt-1">Free practice to improve your speed</p>
          </div>
          
          {/* Mode */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="tm-panel mb-6">
            <div className="tm-panel-header rounded-t-xl">Practice Mode</div>
            <div className="p-4 flex items-center gap-3">
              {(['words', 'sentences', 'paragraphs'] as PracticeMode[]).map((m) => (
                <button key={m} onClick={() => handleModeChange(m)} className={cn('tm-button text-sm', mode === m && 'tm-button-primary')}>
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
              <div className="ml-auto flex gap-2">
                <button onClick={handleRandomText} className="tm-button text-sm">🎲 Random</button>
                <button onClick={handleNextText} className="tm-button text-sm">Next →</button>
              </div>
            </div>
          </motion.div>
          
          {/* Stats */}
          <div className="tm-panel mb-6">
            <div className="p-4 flex items-center justify-around">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-gold">{stats.wpm}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">WPM</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">{stats.accuracy}%</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Accuracy</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold text-destructive">{stats.errors}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Errors</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="flex gap-2">
                {isPaused ? (
                  <button onClick={resumeTyping} className="tm-button tm-button-primary text-sm">Resume</button>
                ) : (
                  <button onClick={pauseTyping} className="tm-button text-sm">Pause</button>
                )}
                <button onClick={handleReset} className="tm-button text-sm">Restart</button>
              </div>
            </div>
          </div>
          
          {completed && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="tm-panel mb-6 p-6 text-center border-primary/20">
              <div className="text-4xl mb-2">🎉</div>
              <h3 className="text-xl font-bold mb-2 text-gradient-gold">Great job!</h3>
              <p className="text-muted-foreground mb-4">Speed: {stats.wpm} WPM • Accuracy: {stats.accuracy}%</p>
              <div className="flex gap-3 justify-center">
                <button onClick={handleReset} className="tm-button">Try Again</button>
                <button onClick={handleNextText} className="tm-button tm-button-primary">Next Text →</button>
              </div>
            </motion.div>
          )}
          
          <TypingArea text={currentText} currentIndex={currentIndex} typedText={typedText} />
          
          <div className="mt-6 grid grid-cols-[1fr_auto_1fr] gap-4 items-start">
            <HandDiagram hand="left" activeFinger={activeFinger?.hand === 'left' ? activeFinger.finger : null} />
            <Keyboard activeKey={activeKey} nextKey={nextKey} errorKey={errorKey} />
            <HandDiagram hand="right" activeFinger={activeFinger?.hand === 'right' ? activeFinger.finger : null} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PracticePage;
