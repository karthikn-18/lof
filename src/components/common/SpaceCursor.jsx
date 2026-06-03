import { useEffect, useRef } from 'react';

/**
 * Water-trail cursor.
 * On every pointer movement we spawn a chain of soft round droplets along
 * the travel path. Each droplet stays put where it was born, briefly
 * distorts the content behind it via backdrop-filter (the "wet glass"
 * effect), then fades out over ~1.4 seconds. Nothing is rendered when
 * the cursor is idle.
 *
 * The droplets are recycled from a fixed-size pool so we never thrash the
 * DOM at 60fps.
 */
const POOL_SIZE = 60;
const TRAIL_LIFE = 1.1;          // seconds — shorter life feels crisper
const SPAWN_GAP_PX = 18;         // wider gap → fewer, more distinct beads
const FADE_IN_SECS = 0.06;       // tiny ease-in so spawns don't pop

const SpaceCursor = () => {
  const blobsRef = useRef([]);

  useEffect(() => {
    // skip on touch / no-hover devices
    if (
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) {
      return;
    }

    // recyclable droplet slots. `born < 0` marks a dead slot.
    const slots = Array.from({ length: POOL_SIZE }, () => ({
      x: 0,
      y: 0,
      born: -1,
      size: 0,
    }));
    let nextSlot = 0;

    const spawn = (x, y) => {
      const slot = slots[nextSlot];
      slot.x = x;
      slot.y = y;
      slot.born = performance.now() / 1000;
      // smaller beads so each droplet looks like a water bead, not a smear
      slot.size = 28 + Math.random() * 16;
      nextSlot = (nextSlot + 1) % POOL_SIZE;
    };

    let lastX = null;
    let lastY = null;

    const onMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      if (lastX === null) {
        spawn(x, y);
      } else {
        // interpolate so fast flicks still produce an unbroken trail
        const dx = x - lastX;
        const dy = y - lastY;
        const dist = Math.hypot(dx, dy);
        const steps = Math.max(1, Math.floor(dist / SPAWN_GAP_PX));
        for (let i = 1; i <= steps; i++) {
          const t = i / steps;
          spawn(lastX + dx * t, lastY + dy * t);
        }
      }
      lastX = x;
      lastY = y;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    let raf;
    const loop = () => {
      const now = performance.now() / 1000;

      for (let i = 0; i < POOL_SIZE; i++) {
        const el = blobsRef.current[i];
        if (!el) continue;
        const s = slots[i];
        const age = now - s.born;

        if (s.born < 0 || age > TRAIL_LIFE) {
          if (el.style.opacity !== '0') el.style.opacity = '0';
          continue;
        }

        // tiny fade-in, then a smooth ease-out — capped at 0.38 so the
        // bead stays glassy-transparent rather than opaque
        const fadeIn = Math.min(1, age / FADE_IN_SECS);
        const t = age / TRAIL_LIFE;
        const fadeOut = (1 - t) * (1 - t);
        const opacity = 0.38 * fadeIn * fadeOut;

        // minimal expansion — real water beads barely grow
        const size = s.size * (1 + t * 0.15);
        el.style.transform = `translate(${s.x - size / 2}px, ${s.y - size / 2}px)`;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.opacity = `${opacity}`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <div className="cursor-smudge-layer" aria-hidden="true">
      {/* SVG filter that warps the backdrop like a water droplet —
         turbulence creates a noise map, displacementMap uses it to
         offset pixels of the layer behind so content stays SHARP but
         appears refracted (the way light bends through real water) */}
      <svg className="cursor-svg-defs" aria-hidden="true">
        <defs>
          <filter id="cursor-water-refraction">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018 0.022"
              numOctaves="2"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="10"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      {Array.from({ length: POOL_SIZE }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            blobsRef.current[i] = el;
          }}
          className="cursor-smudge-blob"
          style={{ opacity: 0 }}
        />
      ))}
    </div>
  );
};

export default SpaceCursor;
