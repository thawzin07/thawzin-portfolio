import "../App.css";

import { useEffect, useState } from "react";

import facebookIcon from "../assets/icon-facebook.png";
import githubIcon from "../assets/icon-github.png";
import linkedinIcon from "../assets/icon-linkedin.png";
import telegramIcon from "../assets/icon-telegram.png";
import countryCallingCodes from "../data/countryCallingCodes";

const CONTACT_API_URL =
  import.meta.env.VITE_CONTACT_API_URL || "/api/contact";
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    if (document.querySelector("script[data-turnstile-script]")) return;

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    script.dataset.turnstileScript = "true";
    document.body.appendChild(script);
  }, []);

  const contactLinks = [
    {
      title: "LinkedIn",
      detail: "Lets Connect!",
      href: "https://www.linkedin.com/in/thawzin-htun/",
      icon: linkedinIcon,
    },
    {
      title: "GitHub",
      detail: "Explore my Projects!",
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
      title: "Telegram",
      detail: "Social and updates",
      href: "https://t.me/thawzin_htun7",
      icon: telegramIcon,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus(null);

    const formData = new FormData(e.target);
    const payload = {
      name: formData.get("name")?.trim(),
      email: formData.get("email")?.trim(),
      countryCode: formData.get("countryCode"),
      phone: formData.get("phone")?.trim(),
      query: formData.get("query")?.trim(),
      website: formData.get("website")?.trim(),
      turnstileToken: formData.get("cf-turnstile-response") || undefined,
    };

    try {
      setIsSubmitting(true);

      const res = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let responseBody = {};
      try {
        responseBody = await res.json();
      } catch {
        responseBody = {};
      }

      if (!res.ok) {
        const detail =
          typeof responseBody.detail === "string"
            ? responseBody.detail
            : "Please check the form and try again.";
        throw new Error(detail);
      }

      setFormStatus({
        type: "success",
        message: "Message sent successfully. Thanks for reaching out.",
      });
      e.target.reset();
      window.turnstile?.reset?.();
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error(err);
      }
      setFormStatus({
        type: "error",
        message: err.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
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
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              autoComplete="name"
              minLength="2"
              maxLength="80"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              autoComplete="email"
              maxLength="254"
              required
            />
            <input
              type="text"
              name="website"
              className="contact-honeypot"
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="phone-group">
              <select
                name="countryCode"
                defaultValue="+65"
                aria-label="Country calling code"
                className="country-code-select"
                required
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
                autoComplete="tel-national"
                maxLength="32"
                pattern="[0-9()+ .-]*"
                title="Use numbers, spaces, brackets, plus, dot, or dash only."
              />
            </div>

            <textarea
              name="query"
              rows="5"
              placeholder="Your Queries"
              minLength="10"
              maxLength="2000"
              required
            ></textarea>

            {TURNSTILE_SITE_KEY ? (
              <div className="turnstile-container">
                <div
                  className="cf-turnstile"
                  data-sitekey={TURNSTILE_SITE_KEY}
                ></div>
              </div>
            ) : null}

            {formStatus ? (
              <p
                className={`form-status form-status-${formStatus.type}`}
                role="status"
                aria-live="polite"
              >
                {formStatus.message}
              </p>
            ) : null}

            <div className="form-buttons">
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send"}
              </button>
              <button type="reset" className="btn btn-secondary" disabled={isSubmitting}>
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
