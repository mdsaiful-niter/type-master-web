import React from 'react';
import { FingerType, Hand } from '@/lib/typingData';
import { cn } from '@/lib/utils';

interface HandDiagramProps {
  hand: Hand;
  activeFinger: FingerType | null;
}

interface FingerPath {
  path: string;
  finger: FingerType;
}

const leftHandFingers: FingerPath[] = [
  { path: "M 20 85 Q 15 60, 22 45 Q 25 35, 28 45 Q 35 65, 30 85 Z", finger: 'pinky-left' },
  { path: "M 35 85 Q 30 45, 38 25 Q 42 15, 46 25 Q 52 50, 48 85 Z", finger: 'ring-left' },
  { path: "M 52 85 Q 48 40, 55 15 Q 60 5, 65 15 Q 70 45, 68 85 Z", finger: 'middle-left' },
  { path: "M 72 85 Q 68 45, 75 25 Q 80 15, 85 25 Q 90 50, 88 85 Z", finger: 'index-left' },
  { path: "M 92 85 Q 100 75, 110 78 Q 115 82, 110 88 Q 100 92, 92 90 Z", finger: 'thumb' },
];

const rightHandFingers: FingerPath[] = [
  { path: "M 100 85 Q 105 60, 98 45 Q 95 35, 92 45 Q 85 65, 90 85 Z", finger: 'pinky-right' },
  { path: "M 85 85 Q 90 45, 82 25 Q 78 15, 74 25 Q 68 50, 72 85 Z", finger: 'ring-right' },
  { path: "M 68 85 Q 72 40, 65 15 Q 60 5, 55 15 Q 50 45, 52 85 Z", finger: 'middle-right' },
  { path: "M 48 85 Q 52 45, 45 25 Q 40 15, 35 25 Q 30 50, 32 85 Z", finger: 'index-right' },
  { path: "M 28 85 Q 20 75, 10 78 Q 5 82, 10 88 Q 20 92, 28 90 Z", finger: 'thumb' },
];

const HandDiagram: React.FC<HandDiagramProps> = ({ hand, activeFinger }) => {
  const fingers = hand === 'left' ? leftHandFingers : rightHandFingers;
  
  const isFingerActive = (finger: FingerType) => activeFinger === finger;

  return (
    <div className="tm-panel p-3">
      <div className="tm-panel-header -mx-3 -mt-3 mb-3 rounded-t-xl text-[10px]">
        {hand === 'left' ? 'Left Hand' : 'Right Hand'}
      </div>
      
      <svg viewBox="0 0 120 100" className="w-full h-auto" style={{ maxWidth: '180px' }}>
        {/* Palm */}
        <ellipse
          cx="60" cy="90" rx="45" ry="20"
          className="fill-hand-bg stroke-hand-outline"
          strokeWidth="1"
        />
        
        {/* Fingers */}
        {fingers.map((fingerData) => (
          <path
            key={fingerData.finger}
            d={fingerData.path}
            className={cn(
              'stroke-hand-outline transition-all duration-300',
              isFingerActive(fingerData.finger)
                ? 'fill-hand-highlight'
                : 'fill-hand-bg'
            )}
            strokeWidth="1"
            style={isFingerActive(fingerData.finger) ? {
              filter: 'drop-shadow(0 0 6px hsl(38 85% 55% / 0.4))'
            } : undefined}
          />
        ))}
        
        {/* Active dot */}
        {activeFinger && fingers.map((fingerData) => (
          isFingerActive(fingerData.finger) && (
            <circle
              key={`dot-${fingerData.finger}`}
              cx={hand === 'left' 
                ? (fingerData.finger === 'pinky-left' ? 25 
                  : fingerData.finger === 'ring-left' ? 42 
                  : fingerData.finger === 'middle-left' ? 60 
                  : fingerData.finger === 'index-left' ? 80 
                  : 105)
                : (fingerData.finger === 'pinky-right' ? 95 
                  : fingerData.finger === 'ring-right' ? 78 
                  : fingerData.finger === 'middle-right' ? 60 
                  : fingerData.finger === 'index-right' ? 40 
                  : 15)
              }
              cy="55"
              r="3.5"
              className="fill-primary animate-pulse"
            />
          )
        ))}
      </svg>
    </div>
  );
};

export default HandDiagram;
