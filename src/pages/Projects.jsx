import "../App.css";
import { useEffect, useState } from "react";
import project1Img from "../assets/project-1.png";
import project2Img from "../assets/project-2.png";
import project3Img1 from "../assets/project3-1.png";
import project3Img2 from "../assets/project3-2.png";
import project3Img3 from "../assets/project3-3.png";
import project3Img4 from "../assets/project3-4.png";

const projectTypeColors = {
  "Academic Project": "#0f8a7a",
  "Hackathon Project": "#c26431",
  "Commercial Project": "#dc2626",
};

const Projects = () => {
  const [lightbox, setLightbox] = useState(null);

  const myProjects = [
    {
      title: "PulsePoint Fitness",
      type: "Academic Project",
      status: "Academic Project",
      img: project1Img,
      brief:
        "A full-stack gym membership platform built with plain PHP and MySQL, combining member services, admin operations, Stripe billing, and AI-supported assistance.",
      role:
        "Full-stack PHP/MVC owner across core app architecture, booking, Stripe billing, AI assistance, security, and VM deployment.",
      contributions: [
        "Scaffolded the PHP MVC baseline with routing, controllers, models, views, setup docs, and the booking/waitlist flow.",
        "Implemented Stripe membership billing, payment reconciliation, checkout notifications, and member billing dashboard updates.",
        "Built the OpenAI gym-scoped chatbot with persistent history, UI polish, route wiring, config, and accessibility fixes.",
        "Hardened validation/security with prepared statements, CSRF, escaping, role checks, SQL asset cleanup, and VM GitHub Actions deployment.",
      ],
      tags: ["PHP 8", "MySQL 8", "Bootstrap 5", "Stripe", "Security", "AI"],
      github:
        "https://github.com/thawzin07/SIT_Tri2_WebSystemsAndTechnologiesGroupProject",
      demo: "http://34.142.168.168/",
      video: "https://www.youtube.com/watch?v=bDHM5iRpshQ",
    },
    {
      title: "SpeedUp",
      type: "GreyMatter DL Week project",
      status: "Hackathon Project",
      img: project2Img,
      brief:
        "An adaptive AI learning platform that analyzes uploaded study material, generates practice content, and gives students explainable study guidance over time.",
      role:
        "AI practice/tutor workflow, auth/storage integration, responsive UI, and deployment reliability contributor.",
      contributions: [
        "Set up Firebase authentication guards/sign-out behavior and Cloudinary-backed study material upload/storage wiring.",
        "Built AI tutor context/history behavior plus quiz and flashcard generation from selected study sources.",
        "Reworked practice source selection/deletion, flashcard counts, user-scoped local state, and fallback reliability across accounts.",
        "Added Render backend and GitHub Pages deployment config, production API routing, health-check fixes, mobile navigation, and account deletion/file-upload repairs.",
      ],
      tags: ["OpenAI", "Node.js", "Firebase", "Cloudinary", "GitHub Pages"],
      github: "https://github.com/GreyMatter-DLWeek/speedup",
      demo: "https://greymatter-dlweek.github.io/speedup/",
      video: "https://www.youtube.com/watch?v=2yiJaj0OX4U",
    },
    {
      title: "Financial Trend Analysis Dashboard",
      type: "Academic Project",
      status: "Academic Project",
      img: project3Img1,
      gallery: [project3Img1, project3Img2, project3Img3, project3Img4],
      brief:
        "A collaborative Python and Streamlit dashboard for analyzing live financial market data, stock prices, RSI, and key technical indicators.",
      role:
        "Streamlit dashboard developer focused on stock input/session state, RSI analysis, AI assistance, and Render deployment.",
      contributions: [
        "Set up the project environment and developed core dashboard features around user-selected stock analysis.",
        "Added universal stock input with session storage so ticker choices persist across dashboard views.",
        "Improved RSI and persistent chart behavior, removed the candlestick flow, added market news, and moved the AI chatbot into the RSI workflow.",
        "Cleaned Streamlit menus/comments/calculation modules and added Render/runtime/OpenAI deployment configuration, API handler updates, and dependency fixes.",
      ],
      tags: ["Python", "Streamlit", "Pandas", "yfinance", "RSI", "SMA/EMA"],
      github: "https://github.com/thawzin07/SIT_Tri1_ProgramFund_Python",
      demo: "https://finsight-dashboard-yflq.onrender.com/",
    },
  ];

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
          Selected work across full-stack development, deployment, and
          performance-focused web presentation.
        </p>
      </div>

      <div className="projects-grid">
        {myProjects.map((project) => (
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

            {project.gallery ? (
              <div className="project-gallery" aria-label={`${project.title} screenshots`}>
                {project.gallery.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    className="project-gallery-button"
                    onClick={() => openLightbox(project, index)}
                    aria-label={`View ${project.title} screenshot ${index + 1} full screen`}
                  >
                    <img
                      src={image}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="project-gallery-img"
                    />
                  </button>
                ))}
              </div>
            ) : null}

            <div className="project-actions">
              {project.demo ? (
                <a
                  className="btn project-link project-link-primary"
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Demo
                </a>
              ) : (
                <span className="btn project-link project-link-disabled">
                  Live Demo
                </span>
              )}
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

            <div className="project-card-heading">
              <span className="project-status">{project.status}</span>
              <h2 className="project-title">{project.title}</h2>
            </div>

            <div className="project-detail-block">
              <span className="project-detail-label">Brief</span>
              <p className="project-description">{project.brief}</p>
            </div>

            <div className="project-detail-block">
              <span className="project-detail-label">My Role</span>
              <p className="project-description">{project.role}</p>
            </div>

            <ul className="project-highlights">
              <span className="project-detail-label">My Contributions</span>
              {project.contributions.map((contribution) => (
                <li key={contribution}>{contribution}</li>
              ))}
            </ul>

            <div className="tech-stack">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
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
