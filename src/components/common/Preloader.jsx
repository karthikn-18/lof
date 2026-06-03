import { useEffect, useRef, useState } from 'react';
import '../../styles/preloader.css';
import logoUrl from '../../assets/Logo/log-header-logo.svg';
import preloaderSoundUrl from '../../assets/sounds/preloader.mp3';

/* Tech / sci-fi preloader.
   Bar and number are updated via refs (no React re-renders at 60 fps).
   Bar uses transform:scaleX — compositor-only, zero layout cost.

   Timing strategy:
     Phase 1 (0 → 88%): ease-out fill over PHASE1_MS — feels like the app
       is loading quickly.
     Phase 2 (88% → 100%): slow linear creep over PHASE2_MS — gives the
       impression of waiting on the last heavy assets (WebGL shader
       compilation, model parsing).
   Total ≥ TOTAL_MS before the screen is dismissed.  This ensures Three.js
   contexts and the Home bundle are ready before the preloader fades out,
   eliminating the "frozen blank screen" that appeared when RAMP_MS was 1.5s.
*/

const PHASE1_TARGET = 0.88;   // fill to 88 % in phase 1
const PHASE1_MS    = 2000;    // ms for phase 1
const PHASE2_MS    = 1800;    // ms to creep from 88 % to 100 %
const TOTAL_MS     = PHASE1_MS + PHASE2_MS; // 3800 ms total

// ease-out: fast start, decelerates toward the end (mimics "loaded most
// things quickly, waiting on last heavy assets")
const easeOut = (t) => 1 - Math.pow(1 - t, 2.5);

const Preloader = ({ onDone = () => {} }) => {
  const [done, setDone]       = useState(false);
  const [removed, setRemoved] = useState(false);
  const numRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const sound = new Audio(preloaderSoundUrl);
    sound.volume = 1.0;
    sound.preload = 'auto';

    let playing = false;
    const tryPlay = () => {
      if (playing) return;
      const p = sound.play();
      if (p && typeof p.then === 'function') {
        p.then(() => {
          playing = true;
          EVENTS.forEach(ev => window.removeEventListener(ev, tryPlay));
        }).catch(() => {});
      }
    };
    const EVENTS = ['click','keydown','pointermove','scroll','wheel','touchstart'];
    tryPlay();
    EVENTS.forEach(ev => window.addEventListener(ev, tryPlay));

    const start = performance.now();
    let raf;
    let finished = false;
    let lastDisplayed = -1;

    const tick = (now) => {
      const elapsed = now - start;

      // Two-phase progress value (0 → 1)
      let progress;
      if (elapsed < PHASE1_MS) {
        const t = elapsed / PHASE1_MS;
        progress = easeOut(t) * PHASE1_TARGET;
      } else {
        const t = Math.min(1, (elapsed - PHASE1_MS) / PHASE2_MS);
        progress = PHASE1_TARGET + t * (1 - PHASE1_TARGET);
      }

      const pct = progress * 100;

      // scaleX update — compositor-only, never triggers layout
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      // number: only write when integer changes (cheap textContent)
      const display = Math.min(100, Math.floor(pct));
      if (display !== lastDisplayed && numRef.current) {
        numRef.current.textContent = display.toString().padStart(2, '0');
        lastDisplayed = display;
      }

      if (elapsed >= TOTAL_MS) {
        if (numRef.current) numRef.current.textContent = '100';
        if (barRef.current) barRef.current.style.transform = 'scaleX(1)';
        finished = true;

        // Notify App so it can start fading in the page content in parallel
        // with the preloader's own fade-out.
        onDone();
        setDone(true);

        // Fade the sound out alongside the visual fade
        const fadeStart = performance.now();
        const startVol = sound.volume;
        const fadeStep = () => {
          const ft = (performance.now() - fadeStart) / 700;
          if (ft >= 1) { sound.pause(); sound.src = ''; return; }
          sound.volume = startVol * (1 - ft);
          requestAnimationFrame(fadeStep);
        };
        requestAnimationFrame(fadeStep);

        // Remove from DOM after transition completes
        setTimeout(() => setRemoved(true), 650);
        return;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      if (!finished) cancelAnimationFrame(raf);
      try { sound.pause(); sound.src = ''; } catch { /* ignore */ }
      EVENTS.forEach(ev => window.removeEventListener(ev, tryPlay));
    };
  }, [onDone]);

  if (removed) return null;

  return (
    <div
      className={`preloader${done ? ' preloader--done' : ''}`}
      role="status"
      aria-label="Loading"
    >
      <span className="preloader-bracket preloader-bracket--tl" />
      <span className="preloader-bracket preloader-bracket--tr" />
      <span className="preloader-bracket preloader-bracket--bl" />
      <span className="preloader-bracket preloader-bracket--br" />

      <div className="preloader-grid" />
      <div className="preloader-scan" />

      <div className="preloader-ring preloader-ring--a" />
      <div className="preloader-ring preloader-ring--b" />
      <div className="preloader-ring preloader-ring--c" />

      <div className="preloader-core">
        <img
          className="preloader-logo"
          src={logoUrl}
          alt="Lab of Future"
        />

        <div className="preloader-eyebrow">
          <span className="preloader-dot" />
          INITIATING&nbsp;THE&nbsp;FUTURE
          <span className="preloader-dot" />
        </div>

        <div className="preloader-readout">
          <span ref={numRef} className="preloader-num">00</span>
          <span className="preloader-percent">%</span>
        </div>

        <div className="preloader-bar">
          <div ref={barRef} className="preloader-bar-fill" />
          <div className="preloader-bar-track" />
        </div>

        <div className="preloader-meta">
          <span>FUTURE.SYS</span>
          <span className="preloader-sep" />
          <span>UPLINK&nbsp;01</span>
          <span className="preloader-sep" />
          <span>NODE&nbsp;0xF1</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
