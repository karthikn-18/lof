import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

const useLenis = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      direction: 'vertical',
      gestureDirection: 'vertical',
      infinite: false,
      lerp: 0.08,
      smoothWheel: true,
      normalizeWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.1,
      autoResize: true,
    });

    let rafId;

    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    lenisRef.current = lenis;
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
};

export default useLenis;
