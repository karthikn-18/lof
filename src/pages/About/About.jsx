import SectionHeader from '../../components/common/SectionHeader';
import SEO from '../../components/common/SEO';
import { siteConfig } from '../../data/siteConfig';

const About = () => (
  <>
    <SEO
      title={`About | ${siteConfig.title}`}
      description="Learn more about our design process, values, and premium approach to user experience."
      url={`${siteConfig.url}/about`}
      image={siteConfig.socialImage}
    />

    <section className="section about-hero">
      <div className="container-fluid">
        <SectionHeader title="Crafting thoughtful digital experiences" subTitle="Our approach" />
        <p className="lead-copy">
          We combine elegant design systems, 3D visuals, and performance-first engineering for websites that delight.
        </p>
      </div>
    </section>

    <section className="section about-values">
      <div className="row gx-5 gy-4">
        <div className="col-lg-4">
          <article>
            <h3>Value-driven design</h3>
            <p>Every interaction is created to support your brand, tell a story, and convert visitors into customers.</p>
          </article>
        </div>
        <div className="col-lg-4">
          <article>
            <h3>Performance-first</h3>
            <p>We optimize bundles, lazy-load assets, and use GPU-friendly animation patterns for smooth experiences.</p>
          </article>
        </div>
        <div className="col-lg-4">
          <article>
            <h3>Scalable systems</h3>
            <p>Modular components, clean architecture, and reusable styles keep your codebase maintainable.</p>
          </article>
        </div>
      </div>
    </section>
  </>
);

export default About;
