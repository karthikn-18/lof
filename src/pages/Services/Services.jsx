import SectionHeader from '../../components/common/SectionHeader';
import SEO from '../../components/common/SEO';
import Button from '../../components/common/Button';
import { siteConfig } from '../../data/siteConfig';
import { services } from '../../data/services';

const Services = () => (
  <>
    <SEO
      title={`Services | ${siteConfig.title}`}
      description="Explore our premium service offerings for modern React websites and digital product experiences."
      url={`${siteConfig.url}/services`}
      image={siteConfig.socialImage}
    />

    <section className="section services-hero">
      <SectionHeader title="Services built for modern brands" subTitle="Strategy, design, and delivery" />
      <p className="lead-copy">
        Our offering spans product strategy, interface design, motion systems, and React engineering for premium launches.
      </p>
    </section>

    <section className="section services-grid">
      <div className="row gx-4 gy-4">
        {services.map((service) => (
          <div key={service.id} className="col-lg-4">
            <article className="service-card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          </div>
        ))}
      </div>
    </section>

    <section className="section cta-section">
      <div className="cta-card">
        <h3>Ready to launch your premium product?</h3>
        <Button to="/contact">Start the conversation</Button>
      </div>
    </section>
  </>
);

export default Services;
