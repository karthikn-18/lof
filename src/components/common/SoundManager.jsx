import { useEffect, useRef } from 'react';
import bgMusicUrl from '../../assets/sounds/background-music.mp3';
import clickUrl from '../../assets/sounds/mouse-click.mp3';

/**
 * Site-wide audio:
 *  - Background music: looped, quiet ambient volume.
 *  - Mouse click: pooled clicks for rapid-fire.
 *
 *  Browsers block unmuted audio autoplay until a user gesture, so the bg
 *  music re-attempts on every interaction until one actually succeeds.
 */
const SoundManager = () => {
  const startedRef = useRef(false);

  useEffect(() => {
    const bgMusic = new Audio(bgMusicUrl);
    bgMusic.loop = true;
    bgMusic.volume = 0.18; // quiet ambient
    bgMusic.preload = 'auto';

    const clickPool = Array.from({ length: 4 }, () => {
      const a = new Audio(clickUrl);
      a.volume = 0.6;
      return a;
    });
    let clickIdx = 0;

    const tryStartBg = () => {
      if (startedRef.current) return;
      const p = bgMusic.play();
      if (p && typeof p.then === 'function') {
        p.then(() => {
          startedRef.current = true;
        }).catch(() => {
          /* still blocked — try again on the next interaction */
        });
      } else {
        startedRef.current = true;
      }
    };

    const onClick = () => {
      tryStartBg();
      const a = clickPool[clickIdx];
      clickIdx = (clickIdx + 1) % clickPool.length;
      try {
        a.currentTime = 0;
        a.play().catch(() => {});
      } catch {
        /* ignore */
      }
    };

    window.addEventListener('click', onClick);
    window.addEventListener('keydown', tryStartBg);
    window.addEventListener('scroll', tryStartBg, { passive: true });
    window.addEventListener('wheel', tryStartBg, { passive: true });
    window.addEventListener('touchstart', tryStartBg, { passive: true });

    return () => {
      window.removeEventListener('click', onClick);
      window.removeEventListener('keydown', tryStartBg);
      window.removeEventListener('scroll', tryStartBg);
      window.removeEventListener('wheel', tryStartBg);
      window.removeEventListener('touchstart', tryStartBg);
      try {
        bgMusic.pause();
        bgMusic.src = '';
      } catch {
        /* ignore */
      }
    };
  }, []);

  return null;
};

export default SoundManager;
