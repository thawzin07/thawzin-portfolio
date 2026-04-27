import "../App.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projects, projectTypeColors } from "../data/projects";

const Projects = () => {
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = (project, imageIndex = 0) => {
    const images = project.gallery || [project.img];
    setLightbox({
      title: project.title,
      images,
      index: imageIndex,
    });
  };

  const closeLightbox = () => setLightbox(null);

  const showPreviousImage = () => {
    setLightbox((current) =>
      current
        ? {
            ...current,
            index: (current.index - 1 + current.images.length) % current.images.length,
          }
        : current,
    );
  };

  const showNextImage = () => {
    setLightbox((current) =>
      current
        ? {
            ...current,
            index: (current.index + 1) % current.images.length,
          }
        : current,
    );
  };

  useEffect(() => {
    if (!lightbox) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPreviousImage();
      if (event.key === "ArrowRight") showNextImage();
    };

    document.body.classList.add("lightbox-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("lightbox-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightbox]);

  return (
    <section id="projects-page" className="projects-section">
      <div className="projects-header">
        <p className="section__text__p1">Browse My Recent</p>
        <h1 className="title">Projects</h1>
        <p className="projects-intro">
          Selected work across full-stack development, AI-assisted features,
          deployment, and data-focused web applications.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <article
            key={project.title}
            className="project-card details-container color-container"
            style={{
              "--project-accent":
                projectTypeColors[project.status] || projectTypeColors[project.type],
            }}
          >
            <button
              type="button"
              className="project-img-wrapper project-image-button"
              onClick={() => openLightbox(project)}
              aria-label={`View ${project.title} screenshot full screen`}
            >
              <img src={project.img} alt={project.title} className="project-img" />
            </button>

            <div className="project-card-heading">
              <span className="project-status">{project.status}</span>
              <h2 className="project-title">{project.title}</h2>
            </div>

            <p className="project-description project-card-summary">{project.brief}</p>

            <div className="project-actions">
              <Link
                className="btn project-link project-link-case"
                to={`/projects/${project.slug}`}
              >
                Case Study
              </Link>
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
          </article>
        ))}
      </div>

      {lightbox ? (
        <div
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${lightbox.title} image viewer`}
          onClick={closeLightbox}
        >
          <div className="project-lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <div className="project-lightbox-toolbar">
              <div>
                <strong>{lightbox.title}</strong>
                <span>
                  {lightbox.index + 1} / {lightbox.images.length}
                </span>
              </div>
              <button type="button" onClick={closeLightbox} aria-label="Close image viewer">
                Close
              </button>
            </div>

            <div className="project-lightbox-stage">
              {lightbox.images.length > 1 ? (
                <button
                  type="button"
                  className="project-lightbox-nav project-lightbox-prev"
                  onClick={showPreviousImage}
                  aria-label="Previous image"
                >
                  ‹
                </button>
              ) : null}

              <img
                src={lightbox.images[lightbox.index]}
                alt={`${lightbox.title} screenshot ${lightbox.index + 1}`}
                className="project-lightbox-img"
              />

              {lightbox.images.length > 1 ? (
                <button
                  type="button"
                  className="project-lightbox-nav project-lightbox-next"
                  onClick={showNextImage}
                  aria-label="Next image"
                >
                  ›
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Projects;
