import SectionHeader from '../../components/common/SectionHeader';
import SEO from '../../components/common/SEO';
import { siteConfig } from '../../data/siteConfig';

const Contact = () => (
  <>
    <SEO
      title={`Contact | ${siteConfig.title}`}
      description="Get in touch to start your premium web experience with LOF."
      url={`${siteConfig.url}/contact`}
      image={siteConfig.socialImage}
    />

    <section className="section contact-hero">
      <SectionHeader title="Start your next project" subTitle="Let’s build something premium" />
      <p className="lead-copy">Share your goals and we’ll create a modern website that feels sophisticated and fast.</p>
    </section>

    <section className="section contact-form-section">
      <div className="row gx-5 gy-4">
        <div className="col-lg-6">
          <form className="contact-form">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" placeholder="Your name" />

            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="you@example.com" />

            <label htmlFor="message">Message</label>
            <textarea id="message" rows="6" placeholder="Tell us about your project."></textarea>

            <button type="submit" className="btn btn-primary custom-btn">
              Send message
            </button>
          </form>
        </div>

        <div className="col-lg-6 contact-details">
          <div>
            <h3>Let's connect</h3>
            <p>hello@yourdomain.com</p>
            <p>+1 123 456 7890</p>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Contact;
