import React from 'react';
import { Link } from 'react-router-dom';
import { useTypingStore, Settings } from '@/lib/typingStore';
import AppHeader from '@/components/AppHeader';
import { cn } from '@/lib/utils';

const SettingsPage: React.FC = () => {
  const { settings, updateSettings } = useTypingStore();

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link to="/" className="tm-button text-sm mb-4 inline-block">
              ← Back to Home
            </Link>
            <h2 className="text-2xl font-bold">Settings</h2>
            <p className="text-muted-foreground">Customize your typing experience</p>
          </div>
          
          {/* Settings Sections */}
          <div className="space-y-6">
            {/* Keyboard Layout */}
            <div className="tm-panel">
              <div className="tm-panel-header rounded-t">
                Keyboard Layout
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Select your keyboard layout. Currently, only QWERTY is supported.
                </p>
                <div className="flex gap-3">
                  <button
                    className={cn(
                      'tm-button',
                      settings.keyboardLayout === 'qwerty' && 'tm-button-primary'
                    )}
                    onClick={() => updateSettings({ keyboardLayout: 'qwerty' })}
                  >
                    QWERTY
                  </button>
                  <button className="tm-button opacity-50 cursor-not-allowed" disabled>
                    DVORAK (Coming Soon)
                  </button>
                  <button className="tm-button opacity-50 cursor-not-allowed" disabled>
                    COLEMAK (Coming Soon)
                  </button>
                </div>
              </div>
            </div>
            
            {/* Sound Settings */}
            <div className="tm-panel">
              <div className="tm-panel-header rounded-t">
                Sound Effects
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Enable or disable sound effects during typing.
                </p>
                <div className="flex items-center gap-4">
                  <button
                    className={cn(
                      'tm-button',
                      settings.soundEnabled && 'tm-button-primary'
                    )}
                    onClick={() => updateSettings({ soundEnabled: true })}
                  >
                    🔊 Sound ON
                  </button>
                  <button
                    className={cn(
                      'tm-button',
                      !settings.soundEnabled && 'tm-button-primary'
                    )}
                    onClick={() => updateSettings({ soundEnabled: false })}
                  >
                    🔇 Sound OFF
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Note: Visual feedback is always enabled for typing correctness.
                </p>
              </div>
            </div>
            
            {/* Lesson Speed */}
            <div className="tm-panel">
              <div className="tm-panel-header rounded-t">
                Lesson Speed
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Adjust how quickly new characters appear or lessons progress.
                </p>
                <div className="flex gap-3">
                  {(['slow', 'normal', 'fast'] as const).map((speed) => (
                    <button
                      key={speed}
                      className={cn(
                        'tm-button flex-1',
                        settings.lessonSpeed === speed && 'tm-button-primary'
                      )}
                      onClick={() => updateSettings({ lessonSpeed: speed })}
                    >
                      <div className="text-center">
                        <div className="text-lg">
                          {speed === 'slow' ? '🐢' : speed === 'normal' ? '🚶' : '🏃'}
                        </div>
                        <div className="text-sm capitalize">{speed}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Finger Hints */}
            <div className="tm-panel">
              <div className="tm-panel-header rounded-t">
                Finger Hints
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Show color-coded finger zones on the keyboard.
                </p>
                <div className="flex items-center gap-4">
                  <button
                    className={cn(
                      'tm-button',
                      settings.showFingerHints && 'tm-button-primary'
                    )}
                    onClick={() => updateSettings({ showFingerHints: true })}
                  >
                    Show Finger Colors
                  </button>
                  <button
                    className={cn(
                      'tm-button',
                      !settings.showFingerHints && 'tm-button-primary'
                    )}
                    onClick={() => updateSettings({ showFingerHints: false })}
                  >
                    Hide Finger Colors
                  </button>
                </div>
                
                {/* Color Legend */}
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-3">Finger Color Legend</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium mb-2">Left Hand</h5>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-finger-pinky-left border" />
                          <span>Pinky</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-finger-ring-left border" />
                          <span>Ring</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-finger-middle-left border" />
                          <span>Middle</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-finger-index-left border" />
                          <span>Index</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Right Hand</h5>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-finger-index-right border" />
                          <span>Index</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-finger-middle-right border" />
                          <span>Middle</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-finger-ring-right border" />
                          <span>Ring</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-finger-pinky-right border" />
                          <span>Pinky</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-finger-thumb border" />
                    <span>Thumbs (Space bar)</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* About */}
            <div className="tm-panel">
              <div className="tm-panel-header rounded-t">
                About Typing Master Web
              </div>
              <div className="p-6 text-sm text-muted-foreground">
                <p className="mb-2">
                  Typing Master Web Edition is a comprehensive typing tutor designed to help you
                  learn touch typing and improve your typing speed and accuracy.
                </p>
                <p>
                  Based on the classic Typing Master desktop application, this web version
                  brings the same effective learning methodology to your browser.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
