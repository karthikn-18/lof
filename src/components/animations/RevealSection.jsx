import { useEffect, useRef } from 'react';
import { fadeInUp } from '../../animations/gsap';

const RevealSection = ({ children, delay = 0 }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      fadeInUp(ref.current, delay);
    }
  }, [delay]);

  return (
    <section ref={ref} className="reveal-section">
      {children}
    </section>
  );
};

export default RevealSection;
