import React from 'react';
import { keyboardLayout, FingerType } from '@/lib/typingData';
import { cn } from '@/lib/utils';

interface KeyboardProps {
  activeKey: string | null;
  nextKey: string | null;
  errorKey: string | null;
  showFingerColors?: boolean;
}

const fingerColorClass: Record<FingerType, string> = {
  'pinky-left': 'finger-pinky-left',
  'ring-left': 'finger-ring-left',
  'middle-left': 'finger-middle-left',
  'index-left': 'finger-index-left',
  'thumb': 'finger-thumb',
  'index-right': 'finger-index-right',
  'middle-right': 'finger-middle-right',
  'ring-right': 'finger-ring-right',
  'pinky-right': 'finger-pinky-right',
};

const getKeyDisplay = (key: string): string => {
  if (key === ' ') return 'Space';
  return key.toUpperCase();
};

const Keyboard: React.FC<KeyboardProps> = ({
  activeKey,
  nextKey,
  errorKey,
  showFingerColors = true,
}) => {
  const isKeyActive = (key: string) => {
    return activeKey?.toLowerCase() === key.toLowerCase();
  };

  const isKeyNext = (key: string) => {
    return nextKey?.toLowerCase() === key.toLowerCase();
  };

  const isKeyError = (key: string) => {
    return errorKey?.toLowerCase() === key.toLowerCase();
  };

  return (
    <div className="tm-panel p-4">
      <div className="tm-panel-header -mx-4 -mt-4 mb-4 rounded-t">
        Keyboard
      </div>
      
      <div className="space-y-2">
        {/* Number row */}
        <div className="flex justify-center gap-1">
          {keyboardLayout[0].map((keyData, idx) => (
            <div
              key={`num-${idx}`}
              className={cn(
                'tm-key w-10 h-10',
                showFingerColors && fingerColorClass[keyData.finger],
                isKeyActive(keyData.key) && 'active',
                isKeyNext(keyData.key) && 'next',
                isKeyError(keyData.key) && 'error'
              )}
            >
              {getKeyDisplay(keyData.key)}
            </div>
          ))}
          <div className="tm-key w-16 h-10 text-xs">Backspace</div>
        </div>

        {/* Tab + QWERTY row */}
        <div className="flex justify-center gap-1">
          <div className="tm-key w-14 h-10 text-xs">Tab</div>
          {keyboardLayout[1].map((keyData, idx) => (
            <div
              key={`qwerty-${idx}`}
              className={cn(
                'tm-key w-10 h-10',
                showFingerColors && fingerColorClass[keyData.finger],
                isKeyActive(keyData.key) && 'active',
                isKeyNext(keyData.key) && 'next',
                isKeyError(keyData.key) && 'error'
              )}
            >
              {getKeyDisplay(keyData.key)}
            </div>
          ))}
        </div>

        {/* Caps + Home row */}
        <div className="flex justify-center gap-1">
          <div className="tm-key w-16 h-10 text-xs">Caps</div>
          {keyboardLayout[2].map((keyData, idx) => (
            <div
              key={`home-${idx}`}
              className={cn(
                'tm-key w-10 h-10',
                showFingerColors && fingerColorClass[keyData.finger],
                isKeyActive(keyData.key) && 'active',
                isKeyNext(keyData.key) && 'next',
                isKeyError(keyData.key) && 'error',
                // Home row indicators for F and J
                (keyData.key === 'F' || keyData.key === 'J') && 'relative'
              )}
            >
              {getKeyDisplay(keyData.key)}
              {(keyData.key === 'F' || keyData.key === 'J') && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-foreground/50 rounded" />
              )}
            </div>
          ))}
          <div className="tm-key w-20 h-10 text-xs">Enter</div>
        </div>

        {/* Shift + ZXCV row */}
        <div className="flex justify-center gap-1">
          <div className="tm-key w-20 h-10 text-xs">Shift</div>
          {keyboardLayout[3].map((keyData, idx) => (
            <div
              key={`zxcv-${idx}`}
              className={cn(
                'tm-key w-10 h-10',
                showFingerColors && fingerColorClass[keyData.finger],
                isKeyActive(keyData.key) && 'active',
                isKeyNext(keyData.key) && 'next',
                isKeyError(keyData.key) && 'error'
              )}
            >
              {getKeyDisplay(keyData.key)}
            </div>
          ))}
          <div className="tm-key w-24 h-10 text-xs">Shift</div>
        </div>

        {/* Space bar row */}
        <div className="flex justify-center gap-1">
          <div className="tm-key w-16 h-10 text-xs">Ctrl</div>
          <div className="tm-key w-12 h-10 text-xs">Win</div>
          <div className="tm-key w-12 h-10 text-xs">Alt</div>
          <div
            className={cn(
              'tm-key h-10 flex-1 max-w-xs',
              showFingerColors && 'finger-thumb',
              isKeyActive(' ') && 'active',
              isKeyNext(' ') && 'next',
              isKeyError(' ') && 'error'
            )}
          >
            Space
          </div>
          <div className="tm-key w-12 h-10 text-xs">Alt</div>
          <div className="tm-key w-12 h-10 text-xs">Win</div>
          <div className="tm-key w-16 h-10 text-xs">Ctrl</div>
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
