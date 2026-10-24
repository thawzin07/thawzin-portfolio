import { useCallback, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { projects, projectTypeColors } from "../data/projects";

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/,
  );
  return match ? `https://www.youtube.com/embed/${match[1]}?rel=0` : null;
};

const formatDisplayUrl = (url) => {
  if (!url) return "";
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
};

const ProjectCaseStudy = () => {
  const { slug } = useParams();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const project = currentIndex !== -1 ? projects[currentIndex] : null;

  const prevProject =
    currentIndex !== -1
      ? projects[(currentIndex - 1 + projects.length) % projects.length]
      : null;
  const nextProject =
    currentIndex !== -1
      ? projects[(currentIndex + 1) % projects.length]
      : null;

  const galleryItems =
    project?.galleryItems ||
    (project?.gallery || (project?.img ? [project.img] : [])).map((src, i) => ({
      src,
      title: `${project?.title || "Project"} Screenshot ${i + 1}`,
      caption: "",
    }));

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPreviousImage = useCallback(() => {
    setLightboxIndex((current) =>
      current !== null ? (current - 1 + galleryItems.length) % galleryItems.length : null,
    );
  }, [galleryItems.length]);

  const showNextImage = useCallback(() => {
    setLightboxIndex((current) =>
      current !== null ? (current + 1) % galleryItems.length : null,
    );
  }, [galleryItems.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

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
  }, [lightboxIndex, closeLightbox, showNextImage, showPreviousImage]);

  if (!project || !prevProject || !nextProject) {
    return <Navigate to="/#projects" replace />;
  }

  const projectColor =
    projectTypeColors[project.status] || projectTypeColors[project.type] || "#0984e3";
  const github = project.github || project.caseStudyGithub;
  const videoEmbedUrl = getYouTubeEmbedUrl(project.video);

  const scrollToVideo = (e) => {
    e.preventDefault();
    const element = document.getElementById("demo-video");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="case-study-section" style={{ "--project-accent": projectColor }}>
      <div className="case-study-shell">
        {/* Breadcrumb Navigation */}
        <div className="case-breadcrumb-bar">
          <Link className="case-back-link" to="/#projects">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Back to Projects</span>
          </Link>
        </div>

        {/* Case Study Hero */}
        <header className="case-hero">
          <div className="case-hero-copy">
            <div className="case-badge-row">
              <span className="project-status">{project.status}</span>
              {project.categories?.map((cat) => (
                <span key={cat} className="project-category-chip">
                  {cat}
                </span>
              ))}
            </div>

            <h1 className="case-title">{project.title}</h1>
            <p className="case-lead">{project.brief}</p>

            {/* Quick Specs Matrix */}
            <div className="case-specs-matrix">
              <div className="spec-card">
                <span className="spec-label">Role</span>
                <strong className="spec-value">{project.role.split(" across ")[0] || "Full-Stack Developer"}</strong>
              </div>
              <div className="spec-card">
                <span className="spec-label">Context</span>
                <strong className="spec-value">{project.status}</strong>
              </div>
              <div className="spec-card">
                <span className="spec-label">Deployment</span>
                <strong className="spec-value">{project.demo ? "Live Production" : "Repository Verified"}</strong>
              </div>
            </div>

            <div className="case-actions">
              {project.demo && (
                <a
                  className="btn project-link project-link-primary"
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="live-beacon" aria-hidden="true"></span>
                  <span>Live Demo</span>
                </a>
              )}
              {github && (
                <a
                  className="btn project-link project-link-github"
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub Repository</span>
                </a>
              )}
              {project.video && (
                <a
                  className="btn project-link project-link-video"
                  href="#demo-video"
                  onClick={scrollToVideo}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span>Watch Video Demo</span>
                </a>
              )}
            </div>
          </div>

          <div className="case-hero-media">
            <div className="case-preview-frame">
              <div className="case-preview-bar">
                <div className="preview-bar-dots" aria-hidden="true">
                  <span className="dot dot-close"></span>
                  <span className="dot dot-min"></span>
                  <span className="dot dot-max"></span>
                </div>

                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="preview-url-link"
                    title={`Open live demo: ${project.demo}`}
                  >
                    <span className="preview-lock-icon" aria-hidden="true">🔒</span>
                    <span className="preview-url-text">{formatDisplayUrl(project.demo)}</span>
                    <svg
                      className="preview-external-icon"
                      viewBox="0 0 24 24"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                ) : project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="preview-url-link"
                    title={`View repository: ${project.github}`}
                  >
                    <span className="preview-lock-icon" aria-hidden="true">🔒</span>
                    <span className="preview-url-text">{formatDisplayUrl(project.github)}</span>
                    <svg
                      className="preview-external-icon"
                      viewBox="0 0 24 24"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                ) : (
                  <div className="preview-url-pill">
                    <span className="preview-lock-icon" aria-hidden="true">🔒</span>
                    <span className="preview-url-text">{project.title}</span>
                  </div>
                )}

                <span className="preview-status-indicator">
                  <span className="live-beacon" aria-hidden="true"></span>
                  <span>Live App</span>
                </span>
              </div>

              <button
                type="button"
                className="case-hero-img-button"
                onClick={() => openLightbox(0)}
                aria-label="View hero image full screen"
              >
                <img src={project.img} alt={`${project.title} main interface preview`} />
                <span className="hero-img-zoom-cue">🔍 Click to zoom</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dual Problem vs Solution Section */}
        <section className="case-problem-solution-section">
          <div className="case-dual-grid">
            {project.problem && (
              <div className="case-dual-card problem-card">
                <div className="dual-card-header">
                  <span className="dual-card-icon" aria-hidden="true">🎯</span>
                  <div>
                    <span className="dual-card-eyebrow">The Challenge</span>
                    <h3>Problem Statement</h3>
                  </div>
                </div>
                <p className="dual-card-body">{project.problem}</p>
              </div>
            )}

            <div className="case-dual-card solution-card">
              <div className="dual-card-header">
                <span className="dual-card-icon" aria-hidden="true">💡</span>
                <div>
                  <span className="dual-card-eyebrow">Engineered Solution</span>
                  <h3>Key Innovation</h3>
                </div>
              </div>
              <p className="dual-card-body">{project.highlight || project.brief}</p>
            </div>
          </div>
        </section>

        {/* Narrative Grid: Role, Deliverables, Architecture */}
        <div className="case-study-grid">
          {/* Role and Detailed Contributions */}
          <article className="case-panel case-panel-wide">
            <div className="case-panel-header">
              <span className="project-detail-label">Engineering Ownership</span>
              <h2>My Role & Key Contributions</h2>
            </div>
            <div className="case-role-statement">
              <strong>Role Overview:</strong> <span>{project.role}</span>
            </div>

            <span className="project-detail-label case-contribution-label">
              Detailed Deliverables & Engineering Accomplishments
            </span>
            <div className="case-deliverables-grid">
              {project.contributions.map((contribution, idx) => (
                <div key={contribution} className="deliverable-card">
                  <span className="deliverable-number">0{idx + 1}</span>
                  <p className="deliverable-text">{contribution}</p>
                </div>
              ))}
            </div>
          </article>

          {/* Categorized Tech Stack */}
          <article className="case-panel case-panel-wide">
            <div className="case-panel-header">
              <span className="project-detail-label">System Architecture</span>
              <h2>Technologies & Tools</h2>
            </div>

            {project.categorizedTags ? (
              <div className="case-tech-categories-grid">
                {Object.entries(project.categorizedTags).map(([category, tags]) => (
                  <div key={category} className="case-tech-category-card">
                    <h3 className="category-title">{category}</h3>
                    <div className="category-tags">
                      {tags.map((tag) => (
                        <span key={tag} className="tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="tech-stack case-tech-stack">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>

          {/* Branches / Verification Panel */}
          {project.branches && project.branches.length > 0 && (
            <article className="case-panel case-panel-branches">
              <div className="case-panel-header">
                <span className="project-detail-label">Code Verification</span>
                <h3>Branches & Commit History</h3>
              </div>
              <p className="case-branches-sub">
                Primary development, feature, and deployment branches verified for this project:
              </p>
              <div className="case-branch-list">
                {project.branches.map((branch) => (
                  <span key={branch} className="branch-tag">
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
                      <path d="M11.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122V6A2.5 2.5 0 0110 8.5H6a1 1 0 00-1 1v1.128a2.251 2.251 0 11-1.5 0V5.372a2.25 2.25 0 111.5 0v1.836A2.492 2.492 0 016 7h4a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zM3.5 3.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z" />
                    </svg>
                    <span>{branch}</span>
                  </span>
                ))}
              </div>
            </article>
          )}
        </div>

        {/* Embedded Video Demo Section (if available) */}
        {videoEmbedUrl && (
          <section className="case-video-section" id="demo-video">
            <div className="case-section-heading">
              <div className="case-video-heading-row">
                <div>
                  <span className="project-detail-label">Demonstration</span>
                  <h2>Live Product Walkthrough</h2>
                </div>
                <a
                  href={project.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-video-external-link"
                  title="Open video in external YouTube tab"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span>Open on YouTube</span>
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
              <p className="case-section-sub">
                A recorded product walkthrough demonstrating user flows, system interactions, and core features.
              </p>
            </div>

            <div className="case-video-frame">
              <div className="case-video-wrapper">
                <iframe
                  src={videoEmbedUrl}
                  title={`${project.title} video demonstration`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="case-video-caption-bar">
                <span>Recorded live demonstration of system features and interactions.</span>
                <a
                  href={project.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Watch this demonstration directly on YouTube"
                >
                  Watch directly on YouTube ↗
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Interactive Captioned Gallery */}
        <section className="case-gallery-section">
          <div className="case-section-heading">
            <span className="project-detail-label">Visual Walkthrough</span>
            <h2>Interface & Feature Gallery</h2>
            <p className="case-section-sub">
              Detailed screenshots of user flows and technical modules. Click any image to view full resolution.
            </p>
          </div>
          <div className="case-gallery-grid">
            {galleryItems.map((item, index) => (
              <figure
                key={item.src}
                className="case-gallery-card"
                onClick={() => openLightbox(index)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openLightbox(index);
                }}
                aria-label={`View full resolution image: ${item.title}`}
              >
                <div className="case-gallery-img-container">
                  <img src={item.src} alt={item.title} loading="lazy" />
                  <div className="case-gallery-zoom-badge">
                    <span>🔍 Full View</span>
                  </div>
                </div>
                <figcaption className="case-gallery-caption">
                  <strong className="caption-title">{item.title}</strong>
                  {item.caption && <p className="caption-text">{item.caption}</p>}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Bottom Pagination / Next-Prev Project Navigation */}
        <nav className="case-pagination-nav" aria-label="Projects pagination">
          <Link
            to={`/projects/${prevProject.slug}`}
            className="case-nav-card prev"
            style={{ "--nav-accent": projectTypeColors[prevProject.status] || "#0984e3" }}
          >
            <span className="case-nav-arrow" aria-hidden="true">&#8592;</span>
            <div className="case-nav-copy">
              <span className="case-nav-label">Previous Project</span>
              <strong className="case-nav-title">{prevProject.title}</strong>
            </div>
          </Link>

          <Link to="/#projects" className="case-nav-all-btn">
            Browse All Projects
          </Link>

          <Link
            to={`/projects/${nextProject.slug}`}
            className="case-nav-card next"
            style={{ "--nav-accent": projectTypeColors[nextProject.status] || "#0984e3" }}
          >
            <div className="case-nav-copy">
              <span className="case-nav-label">Next Project</span>
              <strong className="case-nav-title">{nextProject.title}</strong>
            </div>
            <span className="case-nav-arrow" aria-hidden="true">&#8594;</span>
          </Link>
        </nav>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null ? (
        <div
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} screenshot ${lightboxIndex + 1}`}
          onClick={closeLightbox}
        >
          <div className="project-lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <div className="project-lightbox-toolbar">
              <div className="project-lightbox-header-copy">
                <strong>{galleryItems[lightboxIndex].title}</strong>
                <span>
                  {lightboxIndex + 1} of {galleryItems.length} &bull; {project.title}
                </span>
              </div>
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={closeLightbox}
                aria-label="Close image viewer"
              >
                &times; Close
              </button>
            </div>

            <div className="project-lightbox-stage">
              {galleryItems.length > 1 && (
                <button
                  type="button"
                  className="project-lightbox-nav project-lightbox-prev"
                  onClick={showPreviousImage}
                  aria-label="Previous image"
                >
                  &#8249;
                </button>
              )}

              <div className="lightbox-img-wrapper">
                <img
                  src={galleryItems[lightboxIndex].src}
                  alt={galleryItems[lightboxIndex].title}
                  className="project-lightbox-img"
                />
              </div>

              {galleryItems.length > 1 && (
                <button
                  type="button"
                  className="project-lightbox-nav project-lightbox-next"
                  onClick={showNextImage}
                  aria-label="Next image"
                >
                  &#8250;
                </button>
              )}
            </div>

            {galleryItems[lightboxIndex].caption && (
              <div className="project-lightbox-caption">
                <p>{galleryItems[lightboxIndex].caption}</p>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default ProjectCaseStudy;
