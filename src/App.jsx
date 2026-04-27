import { useLayoutEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";

// PAGE COMPONENTS
import About from "./pages/About";
import Education from "./pages/Education";
import Projects from "./pages/Projects";
import ProjectCaseStudy from "./pages/ProjectCaseStudy";
import Contact from "./pages/Contact";
import { projects } from "./data/projects";

const SITE_URL = "https://thawzinhtun.com";
const DEFAULT_IMAGE = `${SITE_URL}/assets/thaw-zin-htun-profile.jpg`;

const staticSeo = {
  "/": {
    title: "Thaw Zin Htun | AI & Software Developer",
    description:
      "Thaw Zin Htun is an Applied Artificial Intelligence undergraduate at Singapore Institute of Technology and a software developer building AI tools, web applications, and data dashboards.",
    keywords:
      "Thaw Zin Htun, Thaw Zin, AI engineer, software developer, Applied Artificial Intelligence, Singapore Institute of Technology, Singapore Polytechnic, React developer, Python developer",
  },
  "/projects": {
    title: "Projects | Thaw Zin Htun",
    description:
      "Selected software, AI, and data projects by Thaw Zin Htun, including PulsePoint Fitness, SpeedUp, and FinSight Dashboard.",
    keywords:
      "Thaw Zin Htun projects, AI portfolio, software developer portfolio, PulsePoint Fitness, SpeedUp, FinSight Dashboard, React, Python, PHP",
  },
  "/education": {
    title: "Education & Skills | Thaw Zin Htun",
    description:
      "Education and technical skills of Thaw Zin Htun, an Applied Artificial Intelligence undergraduate at Singapore Institute of Technology and Singapore Polytechnic IT graduate.",
    keywords:
      "Thaw Zin Htun education, Singapore Institute of Technology, Singapore Polytechnic, Applied Artificial Intelligence, Diploma in Information Technology, AI skills, software skills",
  },
  "/contact": {
    title: "Contact | Thaw Zin Htun",
    description:
      "Contact Thaw Zin Htun for software development, AI engineering, project collaboration, internship, and portfolio inquiries.",
    keywords:
      "Contact Thaw Zin Htun, hire AI developer Singapore, software developer contact, portfolio contact",
  },
};

const setMetaContent = (selector, value) => {
  const element = document.head.querySelector(selector);
  if (element && value) element.setAttribute("content", value);
};

const setLinkHref = (selector, value) => {
  const element = document.head.querySelector(selector);
  if (element && value) element.setAttribute("href", value);
};

const getSeoForPath = (pathname) => {
  const projectMatch = pathname.match(/^\/projects\/([^/]+)$/);

  if (projectMatch) {
    const project = projects.find((item) => item.slug === projectMatch[1]);

    if (project) {
      return {
        title: `${project.title} | Thaw Zin Htun`,
        description: `${project.title} case study by Thaw Zin Htun: ${project.brief}`,
        keywords: `Thaw Zin Htun, ${project.title}, ${project.tags.join(
          ", ",
        )}, software developer, AI portfolio, project case study`,
        type: "article",
        project,
      };
    }
  }

  return staticSeo[pathname] || staticSeo["/"];
};

const buildStructuredData = (pathname, seo) => {
  const canonical = `${SITE_URL}${pathname}`;
  const person = {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Thaw Zin Htun",
    url: SITE_URL,
    image: DEFAULT_IMAGE,
    jobTitle: [
      "Applied Artificial Intelligence Undergraduate",
      "Software Developer",
      "AI Developer",
    ],
    description:
      "Applied Artificial Intelligence undergraduate at Singapore Institute of Technology and software developer building web applications, AI-powered tools, and data dashboards.",
    sameAs: [
      "https://www.linkedin.com/in/thawzin-htun/",
      "https://github.com/thawzin07",
      "https://www.facebook.com/thawzin.htun.01",
      "https://t.me/thawzin_htun7",
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Singapore Polytechnic",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Singapore Institute of Technology",
      },
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Software Development",
      "AI Engineering",
      "React",
      "Python",
      "PHP",
      "Node.js",
      "Streamlit",
      "Data Dashboards",
      "OpenAI API",
    ],
  };

  const webSite = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Thaw Zin Htun Portfolio",
    description: staticSeo["/"].description,
    publisher: { "@id": `${SITE_URL}/#person` },
  };

  const webPage = {
    "@type": seo.project ? "ProfilePage" : "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: seo.title,
    description: seo.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
  };

  const graph = [person, webSite, webPage];

  if (seo.project) {
    graph.push({
      "@type": "SoftwareSourceCode",
      "@id": `${canonical}#project`,
      name: seo.project.title,
      description: seo.project.brief,
      codeRepository: seo.project.github,
      url: canonical,
      creator: { "@id": `${SITE_URL}/#person` },
      programmingLanguage: seo.project.tags,
      applicationCategory: "Portfolio project",
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
};

function SeoManager() {
  const location = useLocation();
  const pathname = location.pathname;
  const seo = useMemo(() => getSeoForPath(pathname), [pathname]);

  useLayoutEffect(() => {
    const canonical = `${SITE_URL}${pathname}`;

    document.title = seo.title;
    setMetaContent('meta[name="description"]', seo.description);
    setMetaContent('meta[name="keywords"]', seo.keywords);
    setLinkHref('link[rel="canonical"]', canonical);
    setMetaContent('meta[property="og:title"]', seo.title);
    setMetaContent('meta[property="og:description"]', seo.description);
    setMetaContent('meta[property="og:type"]', seo.type || "website");
    setMetaContent('meta[property="og:url"]', canonical);
    setMetaContent('meta[property="og:image"]', DEFAULT_IMAGE);
    setMetaContent('meta[name="twitter:title"]', seo.title);
    setMetaContent('meta[name="twitter:description"]', seo.description);
    setMetaContent('meta[name="twitter:image"]', DEFAULT_IMAGE);

    let structuredData = document.getElementById("route-structured-data");
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.type = "application/ld+json";
      structuredData.id = "route-structured-data";
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify(buildStructuredData(pathname, seo));
  }, [pathname, seo]);

  return null;
}

// NAVBAR COMPONENT (Extracted for clarity)
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "About", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Education", path: "/education" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav id="desktop-nav">
        {!isHome && <div className="logo">Thaw Zin Htun</div>}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                to={link.path} 
                className={location.pathname === link.path ? "active" : ""}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav id="hamburger-nav">
        {!isHome && <div className="logo">Thaw Zin Htun</div>}
        <div className="hamburger-menu">
          <button
            className={`hamburger-icon ${isOpen ? "open" : ""}`}
            type="button"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            <span></span><span></span><span></span>
          </button>
          <div className={`menu-links ${isOpen ? "open" : ""}`}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  onClick={toggleMenu}
                  className={location.pathname === link.path ? "active" : ""}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

function AppContent() {
  const location = useLocation();
  const isAboutPage = location.pathname === "/";

  useLayoutEffect(() => {
    const html = document.documentElement;
    const previousScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    html.style.scrollBehavior = previousScrollBehavior;
  }, [location.pathname]);

  return (
    <>
      <SeoManager />
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/education" element={<Education />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {!isAboutPage && (
        <footer>
          <p>Copyright &#169; 2025 Thaw Zin Htun. All Rights Reserved.</p>
        </footer>
      )}
    </>
  );
}

// MAIN APP COMPONENT
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
