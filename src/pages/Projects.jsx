import "../App.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { projects, projectTypeColors, projectCategories } from "../data/projects";

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

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [cardMediaMode, setCardMediaMode] = useState({});

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter(
      (project) => project.categories && project.categories.includes(activeCategory)
    );
  }, [activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts = { All: projects.length };
    projectCategories.forEach((cat) => {
      if (cat !== "All") {
        counts[cat] = projects.filter(
          (p) => p.categories && p.categories.includes(cat)
        ).length;
      }
    });
    return counts;
  }, []);

  const toggleMediaMode = (slug, mode) => {
    setCardMediaMode((prev) => ({ ...prev, [slug]: mode }));
  };

  const openLightbox = (project, imageIndex = 0) => {
    const galleryItems =
      project.galleryItems ||
      (project.gallery || [project.img]).map((src, i) => ({
        src,
        title: `${project.title} (${i + 1}/${project.gallery?.length || 1})`,
        caption: "",
      }));

    setLightbox({
      projectTitle: project.title,
      items: galleryItems,
      index: imageIndex,
    });
  };

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const showPreviousImage = useCallback(() => {
    setLightbox((current) =>
      current
        ? {
            ...current,
            index: (current.index - 1 + current.items.length) % current.items.length,
          }
        : current,
    );
  }, []);

  const showNextImage = useCallback(() => {
    setLightbox((current) =>
      current
        ? {
            ...current,
            index: (current.index + 1) % current.items.length,
          }
        : current,
    );
  }, []);

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
  }, [lightbox, closeLightbox, showNextImage, showPreviousImage]);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-header">
        <p className="section__text__p1">Browse My Recent</p>
        <h1 className="title">Featured Projects</h1>
        <p className="projects-intro">
          Production-grade applications and prototypes across full-stack engineering,
          browser-based AI vision, and data analytics dashboards.
        </p>

        {/* Category Filter Pills */}
        <div className="project-filter-bar" role="tablist" aria-label="Project category filter">
          {projectCategories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={activeCategory === category}
              className={`filter-pill ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              <span>{category}</span>
              <span className="filter-count">{categoryCounts[category] || 0}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project) => {
          const accentColor =
            projectTypeColors[project.status] || projectTypeColors[project.type] || "#0984e3";
          const galleryCount = project.galleryItems?.length || project.gallery?.length || 1;
          const isVideoActive = cardMediaMode[project.slug] === "video" && Boolean(project.video);
          const videoEmbedUrl = isVideoActive ? getYouTubeEmbedUrl(project.video) : null;

          return (
            <article
              key={project.slug}
              className="project-card details-container"
              style={{
                "--project-accent": accentColor,
              }}
            >
              {/* Media Preview Showcase */}
              <div className="project-card-media-col">
                <div className="project-frame">
                  <div className="project-frame-bar">
                    <div className="frame-dots" aria-hidden="true">
                      <span className="frame-dot"></span>
                      <span className="frame-dot"></span>
                      <span className="frame-dot"></span>
                    </div>

                    {/* Live URL or Repository Address Bar */}
                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="frame-url-link"
                        title={`Open live site: ${project.demo}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="frame-lock" aria-hidden="true">🔒</span>
                        <span className="frame-url-text">{formatDisplayUrl(project.demo)}</span>
                        <span className="frame-arrow" aria-hidden="true">↗</span>
                      </a>
                    ) : project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="frame-url-link"
                        title={`View repository: ${project.github}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="frame-lock" aria-hidden="true">🔒</span>
                        <span className="frame-url-text">{formatDisplayUrl(project.github)}</span>
                        <span className="frame-arrow" aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <span className="frame-label">{project.title}</span>
                    )}

                    {/* Media Mode Toggle (for projects with a video demonstration) */}
                    {project.video && (
                      <div className="card-media-toggle-pill" role="group" aria-label="Media preview mode">
                        <button
                          type="button"
                          className={`media-toggle-btn ${!isVideoActive ? "active" : ""}`}
                          onClick={() => toggleMediaMode(project.slug, "screenshot")}
                          title="View project screenshot preview"
                        >
                          <span>Photos</span>
                        </button>
                        <button
                          type="button"
                          className={`media-toggle-btn ${isVideoActive ? "active" : ""}`}
                          onClick={() => toggleMediaMode(project.slug, "video")}
                          title="Watch embedded video demonstration"
                        >
                          <span className="toggle-play-icon" aria-hidden="true">▶</span>
                          <span>Video</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {isVideoActive && videoEmbedUrl ? (
                    <div className="card-video-container">
                      <div className="card-video-wrapper">
                        <iframe
                          src={videoEmbedUrl}
                          title={`${project.title} embedded demonstration`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="card-video-helper-strip">
                        <span>Walkthrough Video</span>
                        <div className="helper-strip-actions">
                          <a
                            href={project.video}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="video-strip-link"
                            title="Open video on YouTube"
                          >
                            Open on YouTube ↗
                          </a>
                          <button
                            type="button"
                            className="video-strip-btn"
                            onClick={() => toggleMediaMode(project.slug, "screenshot")}
                            title="Return to screenshot view"
                          >
                            ✕ Photos
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="project-img-wrapper project-image-button"
                      onClick={() => openLightbox(project, 0)}
                      aria-label={`Open interactive gallery for ${project.title}`}
                    >
                      <img
                        src={project.img}
                        alt={`${project.title} screenshot`}
                        className="project-img"
                        loading="lazy"
                      />
                      <div className="project-img-overlay">
                        <span className="project-gallery-badge">
                          <svg
                            viewBox="0 0 24 24"
                            width="14"
                            height="14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                          <span>{galleryCount} Screenshots &bull; Click to View</span>
                        </span>
                        {project.video && (
                          <span
                            role="button"
                            tabIndex={0}
                            className="project-gallery-badge project-video-badge-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMediaMode(project.slug, "video");
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.stopPropagation();
                                toggleMediaMode(project.slug, "video");
                              }
                            }}
                            title="Switch to video demonstration"
                          >
                            <span className="toggle-play-icon" aria-hidden="true">▶</span>
                            <span>Watch Video</span>
                          </span>
                        )}
                      </div>
                    </button>
                  )}
                </div>
              </div>

              {/* Project Card Info */}
              <div className="project-card-content-col">
                <div className="project-card-header">
                  <div className="project-meta-eyebrow">
                    <span className="project-status-pill">{project.status}</span>
                    <span className="project-meta-divider" aria-hidden="true">&bull;</span>
                    <span className="project-category-text">
                      {project.categories?.join(" • ")}
                    </span>
                  </div>
                  <h2 className="project-title">{project.title}</h2>
                </div>

                <p className="project-card-summary">{project.brief}</p>

                {project.highlight && (
                  <div className="project-key-highlight">
                    <span className="highlight-tag">Highlight</span>
                    <span className="highlight-desc">{project.highlight}</span>
                  </div>
                )}

                {/* Tech Stack Pills */}
                <div className="project-card-tags" aria-label="Key technologies used">
                  {project.tags.slice(0, 5).map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 5 && (
                    <span className="tag-pill tag-pill-more" title={project.tags.slice(5).join(", ")}>
                      +{project.tags.length - 5} more
                    </span>
                  )}
                </div>

                {/* Action Row */}
                <div className="project-actions">
                  <Link
                    className="project-primary-action"
                    to={`/projects/${project.slug}`}
                    aria-label={`Read full case study for ${project.title}`}
                  >
                    <span>View Case Study</span>
                    <svg
                      className="arrow-icon"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>

                  <div className="project-secondary-actions">
                    {project.demo && (
                      <a
                        className="project-secondary-link project-secondary-link-demo"
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open live interactive demo"
                      >
                        <span className="live-beacon" aria-hidden="true"></span>
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.github && (
                      <a
                        className="project-secondary-link project-secondary-link-github"
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View source repository on GitHub"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="14"
                          height="14"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        <span>GitHub</span>
                      </a>
                    )}
                    {project.video && (
                      <button
                        type="button"
                        className="project-secondary-link project-secondary-link-video"
                        onClick={() => toggleMediaMode(project.slug, "video")}
                        aria-label={`Show the embedded YouTube video for ${project.title}`}
                        title="Show embedded YouTube video in the project preview"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="14"
                          height="14"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                        <span>YouTube</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="projects-more-note">
        <span>More projects are in active development.</span>
        <p>
          I continuously refine and document practical software,
          Applied AI systems, and cloud-deployed applications.
        </p>
      </div>

      {/* Upgraded Lightbox with Title & Caption */}
      {lightbox ? (
        <div
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${lightbox.projectTitle} image viewer`}
          onClick={closeLightbox}
        >
          <div className="project-lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <div className="project-lightbox-toolbar">
              <div className="project-lightbox-header-copy">
                <strong>{lightbox.items[lightbox.index].title || lightbox.projectTitle}</strong>
                <span>
                  Screenshot {lightbox.index + 1} of {lightbox.items.length} &bull; {lightbox.projectTitle}
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
              {lightbox.items.length > 1 && (
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
                  src={lightbox.items[lightbox.index].src}
                  alt={lightbox.items[lightbox.index].title || `${lightbox.projectTitle} screenshot`}
                  className="project-lightbox-img"
                />
              </div>

              {lightbox.items.length > 1 && (
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

            {lightbox.items[lightbox.index].caption && (
              <div className="project-lightbox-caption">
                <p>{lightbox.items[lightbox.index].caption}</p>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Projects;
