import { Link } from "react-router-dom";
import About from "./About";
import Education from "./Education";
import Projects from "./Projects";

const Home = () => {
  return (
    <main className="home-page">
      <About />
      <Projects />
      <Education />

      <section id="home-contact-cta" className="home-contact-cta">
        <p className="section__text__p1">Have a project in mind?</p>
        <h2 className="title">Let&apos;s build something useful.</h2>
        <p>
          I enjoy working on practical software, AI-powered tools, and data-focused
          applications.
        </p>
        <Link className="btn btn-color-1" to="/contact">
          Get in touch
        </Link>
      </section>
    </main>
  );
};

export default Home;
