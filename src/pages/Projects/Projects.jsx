import SectionHeader from '../../components/common/SectionHeader';
import SEO from '../../components/common/SEO';
import { siteConfig } from '../../data/siteConfig';
import { projects } from '../../data/projects';

const Projects = () => (
  <>
    <SEO
      title={`Projects | ${siteConfig.title}`}
      description="Browse a premium showcase of modern web projects featuring immersive interfaces and fast performance."
      url={`${siteConfig.url}/projects`}
      image={siteConfig.socialImage}
    />

    <section className="section projects-hero">
      <SectionHeader title="Featured work" subTitle="Portfolio highlights" />
      <p className="lead-copy">A selection of modern digital experiences designed to engage and convert.</p>
    </section>

    <section className="section project-grid">
      <div className="row gx-4 gy-4">
        {projects.map((project) => (
          <div key={project.id} className="col-md-6 col-lg-4">
            <article className="project-card">
              <span className="project-type">{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </article>
          </div>
        ))}
      </div>
    </section>
  </>
);

export default Projects;
