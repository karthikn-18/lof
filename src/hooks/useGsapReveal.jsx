import { useEffect } from 'react';
import { fadeInUp } from '../animations/gsap';

const useGsapReveal = (ref, delay = 0) => {
  useEffect(() => {
    if (!ref.current) return;
    fadeInUp(ref.current, delay);
  }, [ref, delay]);
};

export default useGsapReveal;
