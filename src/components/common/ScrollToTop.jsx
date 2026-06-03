import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SmoothScrollContext from '../../context/SmoothScrollContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const lenis = useContext(SmoothScrollContext);

  useEffect(() => {
    if (lenis?.current?.scrollTo) {
      lenis.current.scrollTo('top', {
        lerp: 0.08,
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, lenis]);

  return null;
};

export default ScrollToTop;
