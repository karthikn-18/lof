import { useState, useCallback } from 'react';
import AppRoutes from './routes/AppRoutes';
import Preloader from './components/common/Preloader';
import SoundManager from './components/common/SoundManager';
import ErrorBoundary from './components/common/ErrorBoundary';

const App = () => {
  const [contentVisible, setContentVisible] = useState(false);
  const handleDone = useCallback(() => setContentVisible(true), []);

  return (
    <ErrorBoundary>
      <Preloader onDone={handleDone} />
      <SoundManager />
      <div
        className="app-content"
        style={{
          opacity: contentVisible ? 1 : 0,
          pointerEvents: contentVisible ? 'auto' : 'none',
          transition: 'opacity 0.65s ease',
          willChange: 'opacity',
        }}
      >
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
};

export default App;
