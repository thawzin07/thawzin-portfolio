# Thaw Zin Htun Portfolio

Personal portfolio website for Thaw Zin Htun, an Applied Artificial Intelligence undergraduate and software developer. The site showcases selected projects, education, skills, social links, and a contact form.

Live site: [https://thawzinhtun.com/](https://thawzinhtun.com/)

## Links

- Portfolio: [https://thawzinhtun.com/](https://thawzinhtun.com/)
- LinkedIn: [https://www.linkedin.com/in/thawzin-htun/](https://www.linkedin.com/in/thawzin-htun/)
- Telegram: [https://t.me/thawzin_htun7](https://t.me/thawzin_htun7)
- Facebook: [https://www.facebook.com/thawzin.htun.01](https://www.facebook.com/thawzin.htun.01)

## Pages

- Home: [https://thawzinhtun.com/](https://thawzinhtun.com/)
- Education: [https://thawzinhtun.com/education](https://thawzinhtun.com/education)
- Projects: [https://thawzinhtun.com/projects](https://thawzinhtun.com/projects)
- Contact: [https://thawzinhtun.com/contact](https://thawzinhtun.com/contact)

## Featured Projects

- PulsePoint Fitness: full-stack gym membership platform with PHP, MySQL, Bootstrap, Stripe, admin workflows, and security basics.
- SpeedUp: AI learning platform using OpenAI, Node.js, Firebase, Cloudinary, and a Render-hosted backend.
- Financial Trend Analysis Dashboard: Python and Streamlit dashboard for stock trends, RSI, and financial market analysis.
  - Live demo: [https://finsight-dashboard-yflq.onrender.com/](https://finsight-dashboard-yflq.onrender.com/)

## Tech Stack

- React 19
- Vite
- React Router
- Cloudflare Workers / Static Assets
- Cloudflare custom domain
- Resend email API for the contact form

## Features

- Clean browser routes without hash URLs
- Responsive portfolio pages
- Project image lightbox with keyboard navigation
- Contact form served through a Cloudflare Worker
- SEO metadata, Open Graph tags, Twitter card tags, JSON-LD structured data
- `robots.txt` and `sitemap.xml`

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

## Environment Variables

The contact form expects these variables in Cloudflare:

```text
RESEND_API_KEY
CONTACT_TO_EMAIL
CONTACT_FROM_EMAIL
```

For local frontend testing, see `.env.example`.

## Deployment

The site is deployed on Cloudflare using the custom domain:

[https://thawzinhtun.com/](https://thawzinhtun.com/)

Cloudflare serves the built assets from `build/` and runs `src/worker.js` for `/api/contact`.
