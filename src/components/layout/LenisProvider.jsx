import { useEffect } from 'react';
import useLenis from '../../hooks/useLenis';
import SmoothScrollContext from '../../context/SmoothScrollContext';

const LenisProvider = ({ children }) => {
  const lenis = useLenis();

  return <SmoothScrollContext.Provider value={lenis}>{children}</SmoothScrollContext.Provider>;
};

export default LenisProvider;
