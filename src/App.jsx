import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";

// PAGE COMPONENTS
import Home from "./pages/Home";
import Education from "./pages/Education";
import ProjectCaseStudy from "./pages/ProjectCaseStudy";
import Contact from "./pages/Contact";
import { projects } from "./data/projects";

export const SITE_URL = "https://thawzinhtun.com";
export const DEFAULT_IMAGE = `${SITE_URL}/assets/thaw-zin-htun-profile.jpg`;

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const staticSeo = {
  "/": {
    title: "Thaw Zin Htun | AI & Software Developer",
    description:
      "Thaw Zin Htun is an Applied Artificial Intelligence undergraduate at Singapore Institute of Technology and a software developer building AI tools, web applications, and data dashboards.",
  },
  "/education": {
    title: "Education & Skills | Thaw Zin Htun",
    description:
      "Education and technical skills of Thaw Zin Htun, an Applied Artificial Intelligence undergraduate at Singapore Institute of Technology and Singapore Polytechnic IT graduate.",
  },
  "/contact": {
    title: "Contact | Thaw Zin Htun",
    description:
      "Contact Thaw Zin Htun for software development, AI engineering, project collaboration, internship, and portfolio inquiries.",
  },
};

const normalizePathname = (pathname) => pathname.replace(/\/+$/, "") || "/";

const setMetaContent = (selector, value) => {
  const element = document.head.querySelector(selector);
  if (element && value) element.setAttribute("content", value);
};

const setLinkHref = (selector, value) => {
  const element = document.head.querySelector(selector);
  if (element && value) element.setAttribute("href", value);
};

export const getSeoForPath = (pathname) => {
  const normalizedPathname = normalizePathname(pathname);
  const projectMatch = normalizedPathname.match(/^\/projects\/([^/]+)$/);

  if (projectMatch) {
    const project = projects.find((item) => item.slug === projectMatch[1]);

    if (project) {
      return {
        title: `${project.title} | Thaw Zin Htun`,
        description:
          project.seoDescription || `${project.title} case study by Thaw Zin Htun. ${project.brief}`,
        type: "article",
        project,
      };
    }
  }

  return staticSeo[normalizedPathname] || staticSeo["/"];
};

export const buildStructuredData = (
  pathname,
  seo,
  projectImage = seo.project?.img
    ? new URL(seo.project.img, `${SITE_URL}/`).href
    : DEFAULT_IMAGE,
) => {
  const normalizedPathname = normalizePathname(pathname);
  const canonical = `${SITE_URL}${normalizedPathname}`;
  const projectItemList = {
    "@type": "ItemList",
    "@id": `${SITE_URL}/#project-list`,
    name: "Portfolio Projects",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      url: `${SITE_URL}/projects/${project.slug}`,
    })),
  };

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

  const getPageType = () => {
    if (normalizedPathname === "/") return "ProfilePage";
    if (normalizedPathname === "/education") return "AboutPage";
    if (normalizedPathname === "/contact") return "ContactPage";
    return "WebPage";
  };

  const getMainEntity = () => {
    if (normalizedPathname === "/") return { "@id": `${SITE_URL}/#person` };
    if (seo.project) return { "@id": `${canonical}#project` };
    return undefined;
  };

  const pageType = getPageType();
  const mainEntity = getMainEntity();

  const webPage = {
    "@type": pageType,
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: seo.title,
    description: seo.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
    ...(normalizedPathname === "/" ? { hasPart: { "@id": projectItemList["@id"] } } : {}),
    ...(mainEntity ? { mainEntity } : {}),
  };

  const graph = [person, webSite, webPage];

  if (normalizedPathname === "/") {
    graph.push(projectItemList);
  }

  if (seo.project) {
    graph.push({
      "@type": "SoftwareSourceCode",
      "@id": `${canonical}#project`,
      name: seo.project.title,
      description: seo.project.brief,
      codeRepository: seo.project.github,
      url: canonical,
      image: projectImage,
      creator: { "@id": `${SITE_URL}/#person` },
      ...(seo.project.programmingLanguages?.length
        ? { programmingLanguage: seo.project.programmingLanguages }
        : {}),
      keywords: seo.project.tags,
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
};

function SeoManager() {
  const location = useLocation();
  const pathname = normalizePathname(location.pathname);
  const seo = useMemo(() => getSeoForPath(pathname), [pathname]);

  useIsomorphicLayoutEffect(() => {
    const canonical = `${SITE_URL}${pathname}`;
    const image = seo.project?.img
      ? new URL(seo.project.img, `${SITE_URL}/`).href
      : DEFAULT_IMAGE;
    const imageAlt = seo.project
      ? `${seo.project.title} application screenshot`
      : "Profile photo of Thaw Zin Htun";

    document.title = seo.title;
    setMetaContent('meta[name="description"]', seo.description);
    setLinkHref('link[rel="canonical"]', canonical);
    setMetaContent('meta[property="og:title"]', seo.title);
    setMetaContent('meta[property="og:description"]', seo.description);
    setMetaContent('meta[property="og:type"]', seo.type || "website");
    setMetaContent('meta[property="og:url"]', canonical);
    setMetaContent('meta[property="og:image"]', image);
    setMetaContent('meta[property="og:image:alt"]', imageAlt);
    setMetaContent(
      'meta[property="og:image:type"]',
      image.toLowerCase().includes(".png") ? "image/png" : "image/jpeg",
    );
    setMetaContent('meta[name="twitter:title"]', seo.title);
    setMetaContent('meta[name="twitter:description"]', seo.description);
    setMetaContent('meta[name="twitter:image"]', image);
    setMetaContent('meta[name="twitter:image:alt"]', imageAlt);

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
  const [showHomeLogo, setShowHomeLogo] = useState(false);
  const [activeHomeSection, setActiveHomeSection] = useState("home");
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isHome) {
      return undefined;
    }

    const updateLogoVisibility = () => {
      const projectsSection = document.getElementById("projects");
      const navHeight = document.querySelector("nav")?.getBoundingClientRect().height || 64;
      const triggerPoint = projectsSection
        ? projectsSection.offsetTop - navHeight * 1.25
        : window.innerHeight * 0.75;

      setShowHomeLogo(window.scrollY >= triggerPoint);
    };

    updateLogoVisibility();
    window.addEventListener("scroll", updateLogoVisibility, { passive: true });
    window.addEventListener("resize", updateLogoVisibility);

    return () => {
      window.removeEventListener("scroll", updateLogoVisibility);
      window.removeEventListener("resize", updateLogoVisibility);
    };
  }, [isHome]);

  useEffect(() => {
    if (!isHome) {
      return undefined;
    }

    const sections = [
      { id: "profile", name: "home" },
      { id: "projects", name: "projects" },
      { id: "education", name: "education" },
      { id: "home-contact-cta", name: "contact" },
    ];

    const updateActiveSection = () => {
      const nav = document.getElementById("desktop-nav");
      const navHeight = nav?.getBoundingClientRect().height || 64;
      const activationPoint = navHeight + Math.min(420, window.innerHeight * 0.55);
      let nextSection = sections[0].name;

      sections.forEach(({ id, name }) => {
        const section = document.getElementById(id);

        if (section && section.getBoundingClientRect().top <= activationPoint) {
          nextSection = name;
        }
      });

      const isAtPageEnd =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;

      if (isAtPageEnd) {
        nextSection = "contact";
      }

      setActiveHomeSection((currentSection) =>
        currentSection === nextSection ? currentSection : nextSection,
      );
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [isHome, location.hash]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/#projects", section: "projects" },
    { name: "Education", path: "/#education", section: "education" },
    { name: "Contact", path: "/contact" },
  ];

  const isLinkActive = (link) => {
    if (link.name === "Home") {
      return location.pathname === "/" && activeHomeSection === "home";
    }

    if (link.section === "projects") {
      return (
        location.pathname === "/projects" ||
        location.pathname.startsWith("/projects/") ||
        (location.pathname === "/" && activeHomeSection === "projects")
      );
    }

    if (link.section === "education") {
      return (
        location.pathname === "/education" ||
        (location.pathname === "/" && activeHomeSection === "education")
      );
    }

    if (link.name === "Contact") {
      return (
        location.pathname === "/contact" ||
        (location.pathname === "/" && activeHomeSection === "contact")
      );
    }

    return location.pathname === link.path;
  };

  return (
    <>
      <nav id="desktop-nav">
        <div
          className={`logo logo-home ${isHome && !showHomeLogo ? "logo-home-hidden" : ""}`}
        >
          Thaw Zin Htun
        </div>
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                to={link.path} 
                className={isLinkActive(link) ? "active" : ""}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav id="hamburger-nav">
        <div
          className={`logo logo-home ${isHome && !showHomeLogo ? "logo-home-hidden" : ""}`}
        >
          Thaw Zin Htun
        </div>
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
                  className={isLinkActive(link) ? "active" : ""}
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

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > window.innerHeight * 0.7);

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    if (location.pathname === "/" && location.hash) {
      navigate("/", { replace: true });
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      className={`scroll-top-button ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      ↑
    </button>
  );
}

export function AppContent() {
  const location = useLocation();

  useIsomorphicLayoutEffect(() => {
    const html = document.documentElement;
    const previousScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    const hash = location.hash.replace(/^#/, "");

    if (hash) {
      const frame = window.requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });

      html.style.scrollBehavior = previousScrollBehavior;
      return () => window.cancelAnimationFrame(frame);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    html.style.scrollBehavior = previousScrollBehavior;
  }, [location.pathname, location.hash]);

  return (
    <>
      <SeoManager />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/education" element={<Education />} />
        <Route path="/projects" element={<Navigate to="/#projects" replace />} />
        <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <ScrollToTopButton />
      <footer>
        <p>Copyright &#169; 2025 Thaw Zin Htun. All Rights Reserved.</p>
      </footer>
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
