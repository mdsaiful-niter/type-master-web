import React from 'react';
import { Link } from 'react-router-dom';
import { useTypingStore } from '@/lib/typingStore';
import AppHeader from '@/components/AppHeader';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const SettingsPage: React.FC = () => {
  const { settings, updateSettings } = useTypingStore();

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors mb-4 inline-block">← Back to Home</Link>
            <h2 className="text-3xl font-bold text-gradient-gold">Settings</h2>
            <p className="text-muted-foreground mt-1">Customize your typing experience</p>
          </div>
          
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Keyboard Layout */}
            <div className="tm-panel">
              <div className="tm-panel-header rounded-t-xl">Keyboard Layout</div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-4">Currently, only QWERTY is supported.</p>
                <div className="flex gap-3">
                  <button className={cn('tm-button', settings.keyboardLayout === 'qwerty' && 'tm-button-primary')} onClick={() => updateSettings({ keyboardLayout: 'qwerty' })}>QWERTY</button>
                  <button className="tm-button opacity-30 cursor-not-allowed" disabled>DVORAK</button>
                  <button className="tm-button opacity-30 cursor-not-allowed" disabled>COLEMAK</button>
                </div>
              </div>
            </div>
            
            {/* Sound */}
            <div className="tm-panel">
              <div className="tm-panel-header rounded-t-xl">Sound Effects</div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-4">Toggle typing sound effects.</p>
                <div className="flex items-center gap-3">
                  <button className={cn('tm-button', settings.soundEnabled && 'tm-button-primary')} onClick={() => updateSettings({ soundEnabled: true })}>🔊 On</button>
                  <button className={cn('tm-button', !settings.soundEnabled && 'tm-button-primary')} onClick={() => updateSettings({ soundEnabled: false })}>🔇 Off</button>
                </div>
              </div>
            </div>
            
            {/* Speed */}
            <div className="tm-panel">
              <div className="tm-panel-header rounded-t-xl">Lesson Speed</div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-4">Adjust lesson progression speed.</p>
                <div className="flex gap-3">
                  {(['slow', 'normal', 'fast'] as const).map((speed) => (
                    <button key={speed} className={cn('tm-button flex-1', settings.lessonSpeed === speed && 'tm-button-primary')} onClick={() => updateSettings({ lessonSpeed: speed })}>
                      <div className="text-center">
                        <div className="text-lg">{speed === 'slow' ? '🐢' : speed === 'normal' ? '🚶' : '🏃'}</div>
                        <div className="text-sm capitalize">{speed}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Finger Hints */}
            <div className="tm-panel">
              <div className="tm-panel-header rounded-t-xl">Finger Hints</div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-4">Show color-coded finger zones on the keyboard.</p>
                <div className="flex items-center gap-3">
                  <button className={cn('tm-button', settings.showFingerHints && 'tm-button-primary')} onClick={() => updateSettings({ showFingerHints: true })}>Show Colors</button>
                  <button className={cn('tm-button', !settings.showFingerHints && 'tm-button-primary')} onClick={() => updateSettings({ showFingerHints: false })}>Hide Colors</button>
                </div>
                
                <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
                  <h4 className="font-medium mb-3 text-sm text-primary">Finger Legend</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium mb-2 text-xs text-muted-foreground uppercase tracking-wider">Left Hand</h5>
                      <div className="space-y-1.5">
                        {[['finger-pinky-left', 'Pinky'], ['finger-ring-left', 'Ring'], ['finger-middle-left', 'Middle'], ['finger-index-left', 'Index']].map(([cls, label]) => (
                          <div key={cls} className="flex items-center gap-2">
                            <div className={`w-5 h-5 rounded bg-${cls} border border-border`} />
                            <span className="text-xs">{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2 text-xs text-muted-foreground uppercase tracking-wider">Right Hand</h5>
                      <div className="space-y-1.5">
                        {[['finger-index-right', 'Index'], ['finger-middle-right', 'Middle'], ['finger-ring-right', 'Ring'], ['finger-pinky-right', 'Pinky']].map(([cls, label]) => (
                          <div key={cls} className="flex items-center gap-2">
                            <div className={`w-5 h-5 rounded bg-${cls} border border-border`} />
                            <span className="text-xs">{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-finger-thumb border border-border" />
                    <span className="text-xs">Thumbs (Space)</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* About */}
            <div className="tm-panel">
              <div className="tm-panel-header rounded-t-xl">About</div>
              <div className="p-6 text-sm text-muted-foreground space-y-2">
                <p>Typing Master Web Edition — a comprehensive typing tutor to help you master touch typing.</p>
                <p>Based on the classic Typing Master desktop application.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
