import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import LenisProvider from './LenisProvider';
import ScrollToTop from '../common/ScrollToTop';
import SpaceCursor from '../common/SpaceCursor';

const MainLayout = () => (
  <LenisProvider>
    <ScrollToTop />
    <SpaceCursor />
    <Header />
    <main className="site-main" role="main">
      <Outlet />
    </main>
    <Footer />
  </LenisProvider>
);

export default MainLayout;
