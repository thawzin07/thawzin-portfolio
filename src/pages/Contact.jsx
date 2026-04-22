import "../App.css";

import facebookIcon from "../assets/facebook.png";
import githubIcon from "../assets/github.png";
import instagramIcon from "../assets/instagram.png";
import linkedinIcon from "../assets/linkedin.png";
import countryCallingCodes from "../data/countryCallingCodes";

const Contact = () => {
  const contactLinks = [
    {
      title: "LinkedIn",
      detail: "Professional profile",
      href: "https://www.linkedin.com/in/thawzin-htun/",
      icon: linkedinIcon,
    },
    {
      title: "GitHub",
      detail: "Code and projects",
      href: "https://github.com/thawzin07",
      icon: githubIcon,
    },
    {
      title: "Facebook",
      detail: "Social and updates",
      href: "https://www.facebook.com/thawzin.htun.01",
      icon: facebookIcon,
    },
    {
      title: "Instagram",
      detail: "Social and updates",
      href: "https://www.instagram.com/thawzin_htun7/",
      icon: instagramIcon,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      countryCode: formData.get("countryCode"),
      phone: formData.get("phone"),
      query: formData.get("query"),
    };

    try {
      const res = await fetch("http://localhost:8000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to send");

      alert("Message sent successfully!");
      e.target.reset();
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact">
      <div className="contact-header">
        <p className="section__text__p1">Get In Touch</p>
        <h1 className="title">Contact Me</h1>
      </div>

      <div className="contact-wrapper">
        <div className="contact-form-container details-container">
          <h2 className="sub-title">Send a Message</h2>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />

            <div className="phone-group">
              <select
                name="countryCode"
                defaultValue="+65"
                aria-label="Country calling code"
                className="country-code-select"
              >
                {countryCallingCodes.map((country) => (
                  <option
                    key={`${country.iso2}-${country.dialCode}-${country.country}`}
                    value={country.dialCode}
                  >
                    {country.iso2} {country.dialCode} - {country.country}
                  </option>
                ))}
              </select>

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number (Optional)"
              />
            </div>

            <textarea
              name="query"
              rows="5"
              placeholder="Your Queries"
              required
            ></textarea>

            <div className="form-buttons">
              <button type="submit" className="btn btn-primary">
                Send
              </button>
              <button type="reset" className="btn btn-secondary">
                Clear
              </button>
            </div>
          </form>
        </div>

        <aside className="contact-side-panel">
          <div className="contact-link-list">
            {contactLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="contact-mini-card"
              >
                <img src={link.icon} alt="" className="contact-mini-icon" />
                <span>
                  <strong>{link.title}</strong>
                  <small>{link.detail}</small>
                </span>
              </a>
            ))}
          </div>

          <div className="support-note">
            <div>
              <h2>Support My Work</h2>
              <p>Optional support for future projects and experiments.</p>
            </div>
            <a
              href="https://www.buymeacoffee.com/thawzin"
              target="_blank"
              rel="noreferrer"
              className="support-link"
            >
              Buy Me a Coffee
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Contact;
