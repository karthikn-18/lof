import { useState, useCallback } from 'react';
import AppRoutes from './routes/AppRoutes';
import Preloader from './components/common/Preloader';
import SoundManager from './components/common/SoundManager';

const App = () => {
  const [contentVisible, setContentVisible] = useState(false);
  const handleDone = useCallback(() => setContentVisible(true), []);

  return (
    <>
      <Preloader onDone={handleDone} />
      <SoundManager />
      {/*
        AppRoutes is always mounted so Three.js contexts, lazy chunks, and
        model preloads all initialise DURING the preloader.  The wrapper is
        kept invisible (opacity 0, pointer-events none) until the preloader
        signals it is done, then fades in smoothly — no pop-in, no freeze.
      */}
      <div
        className="app-content"
        style={{
          opacity: contentVisible ? 1 : 0,
          pointerEvents: contentVisible ? 'auto' : 'none',
          transition: 'opacity 0.65s ease',
          willChange: 'opacity',
        }}
      >
        <AppRoutes />
      </div>
    </>
  );
};

export default App;
