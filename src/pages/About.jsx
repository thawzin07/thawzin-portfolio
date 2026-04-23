import "../App.css";
// 1. Import your assets
import profilePic from "../assets/profile-pic.jpg";
import facebookIcon from "../assets/facebook.png";
import githubIcon from "../assets/github.png";
import linkedinIcon from "../assets/linkedin.png";
import resumePdf from "../assets/Resume.pdf";
import telegramIcon from "../assets/telegram.png";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/thawzin-htun/",
    icon: linkedinIcon,
  },
  {
    name: "GitHub",
    href: "https://github.com/thawzin07",
    icon: githubIcon,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/thawzin.htun.01",
    icon: facebookIcon,
  },
  {
    name: "Telegram",
    href: "https://t.me/thawzin_htun7",
    icon: telegramIcon,
  },
];

const About = () => {
  return (
    <section id="profile">
      <div className="section__pic-container">
        {/* 2. Use the variable name, NOT a string */}
        <img src={profilePic} alt="ThawZin Htun profile picture" />
      </div>
      <div className="section__text">
        <p className="section__text__p1">Hello, I'm</p>
        <h1 className="title">ThawZin Htun</h1>
        <p className="profile-intro">
          I am an Applied Artificial Intelligence undergraduate and software
          developer who enjoys building practical web applications, AI-powered
          tools, and user-focused systems that solve real problems.
        </p>
        
        <div className="btn-container">
          <button
            className="btn btn-color-2"
            onClick={() => window.open(resumePdf, "_blank", "noopener,noreferrer")}
          >
            Resume
          </button>
          {/* ... contact button ... */}
        </div>

        <div id="socials-container">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              className="social-icon-wrapper"
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.name}
              title={social.name}
            >
              <img src={social.icon} alt="" className="social-icon" />
              <span>{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
