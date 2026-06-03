import { Link } from 'react-router-dom';
import SectionHeader from '../../components/common/SectionHeader';

const NotFound = () => (
  <section className="section notfound-section">
    <SectionHeader title="Page not found" subTitle="404 error" />
    <p className="lead-copy">The page you are looking for does not exist or has moved.</p>
    <Link to="/" className="btn btn-primary custom-btn">
      Return home
    </Link>
  </section>
);

export default NotFound;
