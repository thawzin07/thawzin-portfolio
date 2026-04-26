import "../App.css";
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
  const myProjects = [
    {
      title: "PulsePoint Fitness",
      type: "Academic Project",
      status: "Academic Project",
      img: project1Img,
      description:
        "A full-stack gym membership platform built with plain PHP and MySQL, combining member services, admin operations, Stripe billing, and AI-supported assistance.",
      highlights: [
        "Public pages for plans, trainers, schedules, locations, contact, and FAQs",
        "Member registration, login, profiles, memberships, bookings, and waitlists",
        "Admin dashboard with CRUD for users, plans, trainers, classes, locations, bookings, and messages",
        "Stripe checkout, webhook processing, payment history, and retry/resume payment flows",
        "Security basics including password hashing, prepared statements, CSRF tokens, escaping, and role checks",
      ],
      tags: ["PHP 8", "MySQL 8", "Bootstrap 5", "Stripe", "Security", "AI"],
      github:
        "https://github.com/thawzin07/SIT_Tri2_WebSystemsAndTechnologiesGroupProject",
      demo: "http://34.142.168.168/",
    },
    {
      title: "SpeedUp",
      type: "GreyMatter DL Week project",
      status: "Hackathon Project",
      img: project2Img,
      description:
        "An adaptive AI learning platform that analyzes uploaded study material, generates practice content, and gives students explainable study guidance over time.",
      highlights: [
        "OpenAI-powered tutor with Clear / Still confused clarification loops",
        "Context-grounded quiz and flashcard generation from uploaded or pasted study content",
        "Firebase auth and Firestore persistence with Cloudinary file storage",
        "Node.js and Express backend on Render with frontend hosted on GitHub Pages",
      ],
      tags: ["OpenAI", "Node.js", "Firebase", "Cloudinary", "GitHub Pages"],
      github: "https://github.com/GreyMatter-DLWeek/speedup",
      demo: "https://greymatter-dlweek.github.io/speedup/",
    },
    {
      title: "Financial Trend Analysis Dashboard",
      type: "Academic Project",
      status: "Academic Project",
      img: project3Img1,
      gallery: [project3Img1, project3Img2, project3Img3, project3Img4],
      description:
        "A collaborative Python and Streamlit dashboard for analyzing live financial market data, stock prices, RSI, and key technical indicators.",
      highlights: [
        "Streamlit dashboard with sidebar navigation for stock analysis views",
        "Live financial data workflow using Python data-analysis libraries",
        "Technical indicators including RSI, stock price trends, and moving-average style analysis",
        "Team-based programming fundamentals project with modular Python files and tests",
      ],
      tags: ["Python", "Streamlit", "Pandas", "yfinance", "RSI", "SMA/EMA"],
      github: "https://github.com/thawzin07/SIT_Tri1_ProgramFund_Python",
      demo: "https://finsight-dashboard-yflq.onrender.com/",
    },
  ];

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
            <div className="project-img-wrapper">
              <img src={project.img} alt={project.title} className="project-img" />
            </div>

            {project.gallery ? (
              <div className="project-gallery" aria-label={`${project.title} screenshots`}>
                {project.gallery.map((image, index) => (
                  <img
                    key={image}
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="project-gallery-img"
                  />
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
            </div>

            <div className="project-card-heading">
              <span className="project-status">{project.status}</span>
              <h2 className="project-title">{project.title}</h2>
            </div>

            <p className="project-description">{project.description}</p>

            <ul className="project-highlights">
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
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
    </section>
  );
};

export default Projects;
