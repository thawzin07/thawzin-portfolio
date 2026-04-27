import { useLayoutEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";

// PAGE COMPONENTS
import About from "./pages/About";
import Education from "./pages/Education";
import Projects from "./pages/Projects";
import ProjectCaseStudy from "./pages/ProjectCaseStudy";
import Contact from "./pages/Contact";

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
