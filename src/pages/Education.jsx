import { useLayoutEffect, useRef } from "react";
import "../App.css";
import {
  siBootstrap,
  siC,
  siCloudflare,
  siCloudinary,
  siCss,
  siDjango,
  siDocker,
  siExpress,
  siFastapi,
  siFirebase,
  siGit,
  siGithubactions,
  siGithub,
  siGooglecloud,
  siHtml5,
  siJavascript,
  siLinux,
  siMediapipe,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siNumpy,
  siOpencv,
  siPandas,
  siPhp,
  siPlotly,
  siPostgresql,
  siPython,
  siPytorch,
  siQuarto,
  siR,
  siReact,
  siRender,
  siSpringboot,
  siSqlite,
  siStreamlit,
  siStripe,
  siSupabase,
  siTailwindcss,
  siTensorflow,
  siTypescript,
  siVercel,
  siVite,
  siVuedotjs,
  siWordpress,
} from "simple-icons";
import awsLogo from "devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg";
import javaLogo from "devicon/icons/java/java-original.svg";
import kaggleLogo from "devicon/icons/kaggle/kaggle-original.svg";

const educationItems = [
  {
    title: "Bachelor of Science in Applied Artificial Intelligence",
    institution: "Singapore Institute of Technology (SIT)",
    period: "2028",
    badge: "Applied AI",
    description:
      "Current undergraduate studies focused on applied artificial intelligence, software systems, and practical AI-driven problem solving.",
  },
  {
    title: "Diploma in Information Technology",
    institution: "Singapore Polytechnic (SP)",
    period: "2025",
    badge: "Software Engineering",
    description:
      "Specialized in software engineering with a minor in 5G and AIoT, focused on practical application development and emerging connected systems.",
  },
  {
    title: "Bachelor of Engineering (Civil)",
    institution: "Mandalay Technological University (MTU), Myanmar",
    period: "2018-2020",
    badge: "Engineering Foundation",
    description:
      "Completed foundation-year engineering studies before transitioning into information technology.",
    supportingText:
      "Excellence merits in Engineering Mathematics, Physics, Chemistry, AutoCAD Drawing, and English.",
  },
  {
    title: "High School Diploma",
    institution: "Basic Education High School No. 4 Hlaing, Myanmar",
    period: "2018",
    badge: "O-Level Equivalent",
    description:
      "Distinctions in Maths, Physics, Chemistry, Biology, and Myanmar.",
  },
  {
    title: "Practical A+ Certificate",
    institution: "KMD Institute, Myanmar",
    period: "2018",
    badge: "IT Support",
    description:
      "Hands-on training in installation, configuration, maintenance, and troubleshooting of IT systems.",
  },
];

const skillGroups = [
  {
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "Java", "PHP", "C", "SQL", "R"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Vite", "Vue.js", "React Native", "Tailwind CSS", "Bootstrap", "HTML", "CSS", "Responsive UI"],
  },
  {
    title: "Backend & Data",
    skills: ["Node.js", "Express", "Django", "Spring Boot", "FastAPI", "Streamlit", "Supabase", "PostgreSQL", "MySQL", "SQLite", "MongoDB"],
  },
  {
    title: "AI & APIs",
    skills: ["OpenAI API", "Hugging Face", "LLM Integration", "TensorFlow", "PyTorch", "OpenCV", "MediaPipe", "Machine Learning", "REST APIs"],
  },
  {
    title: "Cloud & Tools",
    skills: ["AWS", "Google Cloud", "Vercel", "Cloudflare", "Render", "Docker", "Git", "GitHub Actions", "Firebase", "Cloudinary", "WordPress"],
  },
  {
    title: "Libraries & Platforms",
    skills: ["Pandas", "NumPy", "Plotly", "Quarto", "Kaggle", "yfinance", "Stripe", "GitHub Pages", "Linux VM"],
  },
  {
    title: "Methods",
    skills: ["SDLC", "Scrum", "Project Management", "Troubleshooting", "Client Communication"],
  },
];

const skillIcons = {
  JavaScript: { icon: siJavascript },
  TypeScript: { icon: siTypescript },
  Python: { icon: siPython },
  Java: { src: javaLogo },
  PHP: { icon: siPhp },
  C: { icon: siC },
  SQL: { symbol: "database" },
  R: { icon: siR },
  React: { icon: siReact },
  "Next.js": { icon: siNextdotjs },
  Vite: { icon: siVite },
  "Vue.js": { icon: siVuedotjs },
  "React Native": { icon: siReact },
  "Tailwind CSS": { icon: siTailwindcss },
  Bootstrap: { icon: siBootstrap },
  HTML: { icon: siHtml5 },
  CSS: { icon: siCss },
  "Responsive UI": { symbol: "devices" },
  "Node.js": { icon: siNodedotjs },
  Express: { icon: siExpress },
  Django: { icon: siDjango },
  "Spring Boot": { icon: siSpringboot },
  FastAPI: { icon: siFastapi },
  Streamlit: { icon: siStreamlit },
  Supabase: { icon: siSupabase },
  PostgreSQL: { icon: siPostgresql },
  MySQL: { icon: siMysql },
  SQLite: { icon: siSqlite },
  MongoDB: { icon: siMongodb },
  "OpenAI API": { symbol: "sparkle" },
  "Hugging Face": { src: "/huggingface-logo.svg" },
  "LLM Integration": { symbol: "workflow" },
  TensorFlow: { icon: siTensorflow },
  PyTorch: { icon: siPytorch },
  OpenCV: { icon: siOpencv },
  MediaPipe: { icon: siMediapipe },
  "Machine Learning": { symbol: "neural" },
  "REST APIs": { symbol: "code" },
  AWS: { src: awsLogo },
  "Google Cloud": { icon: siGooglecloud },
  Vercel: { icon: siVercel },
  Cloudflare: { icon: siCloudflare },
  Render: { icon: siRender },
  Docker: { icon: siDocker },
  Git: { icon: siGit },
  "GitHub Actions": { icon: siGithubactions },
  Firebase: { icon: siFirebase },
  Cloudinary: { icon: siCloudinary },
  WordPress: { icon: siWordpress },
  Pandas: { icon: siPandas },
  NumPy: { icon: siNumpy },
  Plotly: { icon: siPlotly },
  Quarto: { icon: siQuarto },
  Kaggle: { src: kaggleLogo },
  yfinance: { symbol: "chart" },
  Stripe: { icon: siStripe },
  "GitHub Pages": { icon: siGithub },
  "Linux VM": { icon: siLinux },
  SDLC: { symbol: "cycle" },
  Scrum: { symbol: "workflow" },
  "Project Management": { symbol: "clipboard" },
  Troubleshooting: { symbol: "wrench" },
  "Client Communication": { symbol: "message" },
};

const genericSkillMarks = {
  database: (
    <>
      <ellipse cx="12" cy="5" rx="7" ry="3" />
      <path d="M5 5v14c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
      <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
    </>
  ),
  devices: (
    <>
      <rect x="3" y="4" width="13" height="12" rx="1.5" />
      <path d="M7 20h5m-2.5-4v4m6-8h5v8h-7v-5" />
    </>
  ),
  sparkle: (
    <>
      <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
      <path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" />
    </>
  ),
  workflow: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M8.5 6h7M7.5 8l3 7m6-7-3 7" />
    </>
  ),
  neural: (
    <>
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="5" cy="6" r="1.5" />
      <circle cx="19" cy="6" r="1.5" />
      <circle cx="5" cy="18" r="1.5" />
      <circle cx="19" cy="18" r="1.5" />
      <path d="m7 7 3.3 3.3M17 7l-3.3 3.3M7 17l3.3-3.3M17 17l-3.3-3.3" />
    </>
  ),
  code: (
    <>
      <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-12-2 14" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V5m0 15h17" />
      <path d="m7 15 4-4 3 2 5-6" />
      <path d="M16 7h3v3" />
    </>
  ),
  cycle: (
    <>
      <path d="M20 7v5h-5M4 17v-5h5" />
      <path d="M5.5 9a7 7 0 0 1 11.8-2L20 12M4 12l2.7 5a7 7 0 0 0 11.8-2" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="5" width="14" height="16" rx="2" />
      <path d="M9 5V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1m-6 6h6m-6 4h6" />
    </>
  ),
  wrench: (
    <>
      <path d="M14 6a5 5 0 0 0-6 6L3 17a2 2 0 0 0 3 3l5-5a5 5 0 0 0 6-6l-3 3-3-3 3-3Z" />
    </>
  ),
  message: (
    <>
      <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.5 8.5 0 0 1-3.5-.8L4 20l1.4-3.5A7.1 7.1 0 0 1 4 12c0-4.2 3.6-7 8-7s8 2.3 8 6.5Z" />
      <path d="M8 12h.01M12 12h.01M16 12h.01" />
    </>
  ),
};

const useSkillIconRef = (isOutline) => {
  const iconRef = useRef(null);

  useLayoutEffect(() => {
    const svg = iconRef.current;
    const mark = svg?.querySelector("[data-skill-mark]");
    if (!svg || !mark) return;

    const bounds = mark.getBBox();
    const viewBox = svg.viewBox.baseVal;
    if (!bounds.width || !bounds.height || !viewBox.width || !viewBox.height) return;

    const scaleX = svg.clientWidth / viewBox.width;
    const scaleY = svg.clientHeight / viewBox.height;
    const stroke = isOutline ? Number.parseFloat(getComputedStyle(svg).strokeWidth) || 0 : 0;
    const scaleToHeight = 28 / ((bounds.height + stroke) * scaleY);
    const scaleToWidth = 28 / ((bounds.width + stroke) * scaleX);

    svg.style.transform = `scale(${Math.min(scaleToHeight, scaleToWidth)})`;
  }, [isOutline]);

  return iconRef;
};

const SkillIcon = ({ skill }) => {
  const logo = skillIcons[skill];
  const iconRef = useSkillIconRef(!logo?.src && !logo?.icon);

  if (logo?.src) {
    return (
      <img
        className="skill-logo skill-logo-image"
        src={logo.src}
        alt=""
      />
    );
  }

  if (logo?.icon) {
    return (
      <svg
        className="skill-logo skill-logo-brand"
        viewBox="0 0 24 24"
        ref={iconRef}
        style={{ color: `#${logo.icon.hex}` }}
        focusable="false"
      >
        <path data-skill-mark fill="currentColor" d={logo.icon.path} />
      </svg>
    );
  }

  return (
    <svg
      className="skill-logo skill-logo-generic"
      viewBox="0 0 24 24"
      ref={iconRef}
      focusable="false"
    >
      <g data-skill-mark>{genericSkillMarks[logo?.symbol] ?? genericSkillMarks.workflow}</g>
    </svg>
  );
};

const Education = () => {
  return (
    <section id="education" className="education-section">
      <div className="education-header">
        <p className="section__text__p1">Explore My</p>
        <h1 className="title">Education & Skills</h1>
        <p className="education-intro">
          My pathway connects Applied Artificial Intelligence, software
          engineering, web development, and hands-on systems work through
          studies at Singapore Institute of Technology and Singapore
          Polytechnic.
        </p>
      </div>

      <div className="education-layout">
        <div className="education-panel details-container">
          <div className="education-panel-heading">
            <span className="panel-kicker">Learning Path</span>
            <h2 className="education-sub-title">Education</h2>
          </div>

          <div className="timeline-container">
            {educationItems.map((item) => (
              <article
                key={item.title}
                className={`education-item${item.period === "Current" ? " education-item-current" : ""}`}
              >
                <div className="timeline-marker" aria-hidden="true"></div>

                <div className="education-item-content">
                  <div className="education-item-header">
                    <div>
                      <h3>{item.title}</h3>
                      <p className="education-school">{item.institution}</p>
                    </div>
                    <span className="education-period">{item.period}</span>
                  </div>

                  <span className="education-badge">{item.badge}</span>
                  <p className="education-description">{item.description}</p>

                  {item.supportingText && (
                    <p className="education-supporting">{item.supportingText}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="education-panel skills-panel details-container">
          <div className="education-panel-heading">
            <span className="panel-kicker">Toolbox</span>
            <h2 className="education-sub-title">Technical Skills</h2>
          </div>

          <div className="skill-group-list">
            {skillGroups.map((group) => (
              <div key={group.title} className="skill-group">
                <h3>{group.title}</h3>
                <div className="skills-badge-container">
                  {group.skills.map((skill) => {
                    return (
                      <article key={skill} className="skill-card">
                        <span className="skill-icon" aria-hidden="true">
                          <SkillIcon skill={skill} />
                        </span>
                        <span className="skill-card-name">{skill}</span>
                      </article>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Education;
