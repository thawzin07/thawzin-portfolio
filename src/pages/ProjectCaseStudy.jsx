import { Link, Navigate, useParams } from "react-router-dom";
import { projects, projectTypeColors } from "../data/projects";

const ProjectCaseStudy = () => {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const projectColor =
    projectTypeColors[project.status] || projectTypeColors[project.type];

  return (
    <section className="case-study-section" style={{ "--project-accent": projectColor }}>
      <div className="case-study-shell">
        <Link className="case-back-link" to="/projects">
          Back to Projects
        </Link>

        <div className="case-hero">
          <div className="case-hero-copy">
            <span className="project-status">{project.status}</span>
            <h1>{project.title}</h1>
            <p>{project.brief}</p>
            <div className="case-actions">
              {project.demo ? (
                <a
                  className="btn project-link project-link-primary"
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Demo
                </a>
              ) : null}
              <a
                className="btn project-link project-link-github"
                href={project.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              {project.video ? (
                <a
                  className="btn project-link project-link-video"
                  href={project.video}
                  target="_blank"
                  rel="noreferrer"
                >
                  YouTube
                </a>
              ) : null}
            </div>
          </div>

          <div className="case-hero-media">
            <img src={project.img} alt={`${project.title} main screenshot`} />
          </div>
        </div>

        <div className="case-study-grid">
          <article className="case-panel case-panel-wide">
            <span className="project-detail-label">My Role</span>
            <p>{project.role}</p>
            <span className="project-detail-label case-contribution-label">
              Contributions
            </span>
            <ul className="project-highlights">
              {project.contributions.map((contribution) => (
                <li key={contribution}>{contribution}</li>
              ))}
            </ul>
          </article>

          <article className="case-panel">
            <span className="project-detail-label">Tech Stack</span>
            <div className="tech-stack case-tech-stack">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </article>

          <article className="case-panel">
            <span className="project-detail-label">Branches Reviewed</span>
            <div className="case-branch-list">
              {project.branches.map((branch) => (
                <span key={branch}>{branch}</span>
              ))}
            </div>
          </article>
        </div>

        <div className="case-gallery-section">
          <div className="case-section-heading">
            <span className="project-detail-label">Screenshots</span>
            <h2>Project Gallery</h2>
          </div>
          <div className="case-gallery-grid">
            {project.gallery.map((image, index) => (
              <figure key={image} className="case-gallery-item">
                <img
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectCaseStudy;
