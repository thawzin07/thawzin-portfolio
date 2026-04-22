import "../App.css";

const educationItems = [
  {
    title: "Bachelor of Science in Applied Artificial Intelligence",
    institution: "Singapore Institute of Technology",
    period: "Current",
    badge: "Applied AI",
    description:
      "Current undergraduate studies focused on applied artificial intelligence, software systems, and practical AI-driven problem solving.",
  },
  {
    title: "Diploma in Information Technology",
    institution: "Singapore Polytechnic",
    period: "Diploma, 2025",
    badge: "Software Engineering",
    description:
      "Specialized in software engineering with a minor in 5G and AIoT, focused on practical application development and emerging connected systems.",
  },
  {
    title: "Bachelor of Engineering (Civil)",
    institution: "Mandalay Technological University",
    period: "Foundation Year, 2020",
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
      "Equivalent to IGCSE O-levels, with distinctions in Math, Physics, Chemistry, Biology, and Myanmar.",
  },
  {
    title: "Practical A+ Certificate",
    institution: "KMD Institute",
    period: "Certificate",
    badge: "IT Support",
    description:
      "Hands-on training in installation, configuration, maintenance, and troubleshooting of IT systems.",
  },
];

const skillGroups = [
  {
    title: "Programming",
    skills: ["JavaScript", "Python", "Java", "C", "SQL"],
  },
  {
    title: "Web Development",
    skills: ["React", "Node.js", "MongoDB", "HTML/CSS", "Git"],
  },
  {
    title: "AI & Emerging Tech",
    skills: ["Machine Learning", "AI Integration", "5G", "AIoT"],
  },
];

const Education = () => {
  return (
    <section id="education" className="education-section">
      <div className="education-header">
        <p className="section__text__p1">Explore My</p>
        <h1 className="title">Education & Skills</h1>
        <p className="education-intro">
          An applied AI and software-focused pathway shaped by engineering
          foundations, hands-on systems training, and practical development.
        </p>
      </div>

      <div className="education-layout">
        <div className="education-panel details-container">
          <div className="education-panel-heading">
            <span className="panel-kicker">Learning Path</span>
            <h2 className="education-sub-title">Formal Education</h2>
          </div>

          <div className="timeline-container">
            {educationItems.map((item) => (
              <article key={item.title} className="education-item">
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
                  {group.skills.map((skill) => (
                    <span key={skill} className="skill-badge">
                      {skill}
                    </span>
                  ))}
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
