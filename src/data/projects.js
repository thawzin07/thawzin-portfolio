import pulsepointHomeImg from "../assets/pulsepoint-home.png";
import pulsepointBookingImg from "../assets/pulsepoint-booking.png";
import pulsepointChatbotImg from "../assets/pulsepoint-chatbot.png";
import pulsepointDashboardImg from "../assets/pulsepoint-dashboard.png";
import speedupHomeImg from "../assets/speedup-home.png";
import speedupPracticeImg from "../assets/speedup-practice.png";
import speedupTutorImg from "../assets/speedup-tutor.png";
import speedupDashboardImg from "../assets/speedup-dashboard.png";
import finsightRsiChartImg from "../assets/finsight-rsi-chart.png";
import finsightDashboardInputImg from "../assets/finsight-dashboard-input.png";
import finsightAiAssistantImg from "../assets/finsight-ai-assistant.png";
import finsightNewsFeedImg from "../assets/finsight-news-feed.png";
import healthNexusLandingImg from "../assets/health-nexus-landing.png";
import healthNexusModulesImg from "../assets/health-nexus-modules.png";
import healthNexusHealthCheckImg from "../assets/health-nexus-health-check.png";
import healthNexusAssessmentListImg from "../assets/health-nexus-assessment-list.png";
import healthNexusAssessmentGuideImg from "../assets/health-nexus-assessment-guide.png";

export const projectTypeColors = {
  "Academic Project": "#0f8a7a",
  "Hackathon Project": "#c26431",
  "Commercial Project": "#dc2626",
};

export const projectCategories = [
  "All",
  "Applied AI",
  "Full-Stack",
  "Data & Analytics",
];

export const projects = [
  {
    slug: "sit-health-nexus",
    title: "SIT Health Nexus",
    seoDescription:
      "SIT Health Nexus combines falls efficacy surveys, guided participant tasks, and browser-based MediaPipe movement analysis in a functional health assessment platform.",
    type: "Academic Project",
    status: "Academic Project",
    categories: ["Applied AI", "Full-Stack"],
    highlight: "100% in-browser MediaPipe pose tracking with WebAuthn & Render single-origin architecture.",
    img: healthNexusLandingImg,
    gallery: [
      healthNexusLandingImg,
      healthNexusModulesImg,
      healthNexusHealthCheckImg,
      healthNexusAssessmentListImg,
      healthNexusAssessmentGuideImg,
    ],
    galleryItems: [
      {
        src: healthNexusLandingImg,
        title: "Platform Landing & Screening Hub",
        caption: "Participant entrance presenting health modules, falls efficacy self-reporting, and guided assessments.",
      },
      {
        src: healthNexusModulesImg,
        title: "Movement Health Modules",
        caption: "Modular assessment catalog separating functional mobility, balance metrics, and clinical questionnaires.",
      },
      {
        src: healthNexusHealthCheckImg,
        title: "Pre-Assessment Safety Check",
        caption: "Safety screening questionnaire validating participant physical readiness before starting camera tasks.",
      },
      {
        src: healthNexusAssessmentListImg,
        title: "Task Selection & Guidelines",
        caption: "Instructional workflow detailing distance requirements and camera angle setup for accurate pose tracking.",
      },
      {
        src: healthNexusAssessmentGuideImg,
        title: "Real-Time Camera & Pose Detection",
        caption: "Client-side MediaPipe Pose Landmarker calculating joint angles directly in browser without uploading raw video.",
      },
    ],
    problem:
      "Participants and healthcare administrators needed a unified, privacy-compliant portal to discover movement-health modules, complete guided assessments on standard webcams, configure assessment parameters, and analyze test sessions without uploading sensitive video footage to external servers.",
    brief:
      "An AI-enabled functional-health platform combining physical performance, self-reported falls efficacy, and browser-side movement analysis. Its React/Vite client and Express API share a Render origin, while MongoDB Atlas stores accounts, assessment modules, sessions, and results.",
    role:
      "Full-stack contributor across participant and admin flows, browser-based pose assessment, API and database integration, account security, and Render deployment reliability.",
    contributions: [
      "Built participant flows for assessment discovery, sign-in, pre-assessment health checks, guided tasks, and results history.",
      "Integrated MediaPipe Pose Landmarker so camera-based pose inference runs in the browser; video frames are not sent to the server.",
      "Connected the React/Vite app to an Express API and MongoDB Atlas for accounts, assessment definitions, sessions, and results.",
      "Developed admin workflows for account management, module configuration, results review, and CSV export.",
      "Hardened auth and API access with role and ownership checks, rate limits, passkey challenge binding, result protection, and audit logging.",
      "Documented the single-origin Render deployment and switched keep-warm monitoring from GitHub Actions to UptimeRobot.",
    ],
    tags: [
      "React 19",
      "TypeScript",
      "Vite",
      "MediaPipe",
      "Node.js",
      "Express",
      "MongoDB Atlas",
      "WebAuthn",
      "Docker Compose",
      "Render",
      "UptimeRobot",
    ],
    categorizedTags: {
      "Frontend & Vision": ["React 19", "TypeScript", "Vite", "MediaPipe Pose Landmarker"],
      "Backend & Security": ["Node.js", "Express", "MongoDB Atlas", "WebAuthn"],
      "DevOps & Reliability": ["Docker Compose", "Render (Single-Origin)", "UptimeRobot"],
    },
    demo: "https://sit-health-nexus.onrender.com/",
    branches: ["main"],
  },
  {
    slug: "pulsepoint",
    title: "PulsePoint Fitness",
    seoDescription:
      "PulsePoint Fitness is an academic gym platform for class bookings, waitlists, recurring membership billing, admin workflows, and an OpenAI-powered gym assistant.",
    type: "Academic Project",
    status: "Academic Project",
    categories: ["Full-Stack", "Applied AI"],
    highlight: "Custom PHP MVC architecture, OpenAI gym assistant, and Stripe-integrated membership billing.",
    img: pulsepointHomeImg,
    gallery: [
      pulsepointHomeImg,
      pulsepointBookingImg,
      pulsepointChatbotImg,
      pulsepointDashboardImg,
    ],
    galleryItems: [
      {
        src: pulsepointHomeImg,
        title: "Gym Portal & Membership Tiers",
        caption: "Responsive homepage showcasing training facilities, instructor profiles, and subscription tiers.",
      },
      {
        src: pulsepointBookingImg,
        title: "Class Booking & Waitlist Flow",
        caption: "Interactive calendar system handling real-time capacity management, reservation locks, and waitlists.",
      },
      {
        src: pulsepointChatbotImg,
        title: "Gym-Scoped OpenAI Assistant",
        caption: "Context-aware AI chatbot helping members check gym guidelines, workout suggestions, and scheduling.",
      },
      {
        src: pulsepointDashboardImg,
        title: "Member & Billing Dashboard",
        caption: "Self-service dashboard showing Stripe subscription status, active bookings, payment receipts, and profile settings.",
      },
    ],
    problem:
      "Gym members and staff required an end-to-end management platform for class bookings, automatic waitlists, recurring billing, and 24/7 AI-assisted support without relying on bloated full-stack frameworks or high-cost infrastructure.",
    brief:
      "A production-oriented academic gym management platform built with plain PHP, MySQL, Bootstrap, and vanilla JavaScript, covering member bookings, waitlists, admin workflows, database-backed operations, and an OpenAI chatbot.",
    role:
      "Full-stack PHP/MVC contributor and deployment owner across core architecture, booking workflows, AI assistance, security hardening, and the migration from Google Cloud VM hosting to InfinityFree.",
    contributions: [
      "Scaffolded the PHP MVC baseline with routing, controllers, models, views, setup docs, and the booking/waitlist flow.",
      "Implemented Stripe membership billing, payment reconciliation, checkout notifications, and member billing dashboard updates.",
      "Built the OpenAI gym-scoped chatbot with persistent history, UI polish, route wiring, config, and accessibility fixes.",
      "Hardened validation and security with prepared statements, CSRF, escaping, role checks, SQL asset cleanup, production error handling, clean URL routing, and shared-host configuration.",
      "Migrated the public showcase after Google Cloud credits expired, configured the PHP/MySQL deployment on zero-cost InfinityFree hosting, and verified the live public routes.",
    ],
    tags: [
      "PHP 8",
      "MySQL 8",
      "Custom MVC",
      "Bootstrap 5",
      "Stripe",
      "OpenAI API",
      "PHPMailer",
      "GitHub Actions",
      "Google Cloud VM",
      "InfinityFree",
    ],
    categorizedTags: {
      "Backend & Architecture": ["PHP 8", "MySQL 8", "Custom MVC Router", "Prepared Statements / CSRF"],
      "Frontend & UI": ["Bootstrap 5", "Vanilla JavaScript", "Responsive CSS3"],
      "APIs & Services": ["OpenAI API", "Stripe Checkout & Billing", "PHPMailer"],
      "Hosting & Deployment": ["InfinityFree", "Google Cloud VM (historical)", "GitHub Actions"],
    },
    github:
      "https://github.com/thawzin07/SIT_Tri2_WebSystemsAndTechnologiesGroupProject",
    demo: "https://websys.infinityfree.me/",
    video: "https://www.youtube.com/watch?v=bDHM5iRpshQ",
    branches: ["main", "thawzin-dev", "vm_hosting"],
  },
  {
    slug: "speedup",
    title: "SpeedUp",
    seoDescription:
      "SpeedUp turns uploaded study materials into adaptive quizzes, flashcards, and explainable AI tutoring through a collaborative learning platform.",
    type: "GreyMatter DL Week project",
    status: "Hackathon Project",
    categories: ["Applied AI", "Full-Stack"],
    highlight: "Adaptive learning engine parsing PDFs/DOCX with instant AI quizzes, flashcards & tutor chat.",
    img: speedupHomeImg,
    gallery: [
      speedupHomeImg,
      speedupPracticeImg,
      speedupTutorImg,
      speedupDashboardImg,
    ],
    galleryItems: [
      {
        src: speedupHomeImg,
        title: "Study Material Ingestion Hub",
        caption: "Document ingestion pipeline supporting multi-format lecture slides, notes, and study guides.",
      },
      {
        src: speedupPracticeImg,
        title: "Adaptive Practice Quizzes",
        caption: "Dynamic question generator creating multiple-choice quizzes directly from extracted lecture concepts.",
      },
      {
        src: speedupTutorImg,
        title: "Explainable AI Study Tutor",
        caption: "Conversational AI tutor referencing specific sections of uploaded materials to explain difficult topics.",
      },
      {
        src: speedupDashboardImg,
        title: "Progress Analytics & Flashcards",
        caption: "Mastery tracker monitoring student retention, active flashcard decks, and quiz accuracy over time.",
      },
    ],
    problem:
      "Students often struggle to synthesize dense lecture slides and documents into effective study material, needing a rapid way to transform multi-format files into self-testing quizzes, flashcards, and personalized AI explanations without manual deck creation.",
    brief:
      "An adaptive AI learning platform that analyzes uploaded study material, generates practice content, and gives students explainable study guidance over time.",
    role:
      "AI practice/tutor workflow, auth/storage integration, responsive UI, and deployment reliability contributor.",
    contributions: [
      "Set up Firebase authentication guards/sign-out behavior and Cloudinary-backed study material upload/storage wiring.",
      "Built AI tutor context/history behavior plus quiz and flashcard generation from selected study sources.",
      "Reworked practice source selection/deletion, flashcard counts, user-scoped local state, and fallback reliability across accounts.",
      "Added Render backend and GitHub Pages deployment config, production API routing, health-check fixes, mobile navigation, and account deletion/file-upload repairs.",
    ],
    tags: [
      "Node.js",
      "Express",
      "Firebase Auth",
      "Cloudinary",
      "Multer",
      "SQLite",
      "PDF Parse",
      "Mammoth (DOCX)",
      "JSZip",
      "Render",
      "GitHub Pages",
    ],
    categorizedTags: {
      "Document Parsing & AI": ["PDF Parse", "Mammoth (DOCX)", "JSZip", "AI Quiz Generation"],
      "Backend & Storage": ["Node.js", "Express", "SQLite", "Multer", "Cloudinary"],
      "Authentication & Client": ["Firebase Auth", "Responsive Web UI", "State Synchronization"],
      "Deployment": ["Render Backend", "GitHub Pages Client"],
    },
    github: "https://github.com/GreyMatter-DLWeek/speedup",
    demo: "https://greymatter-dlweek.github.io/speedup/",
    video: "https://www.youtube.com/watch?v=2yiJaj0OX4U",
    branches: ["thawzin-dev", "hosting"],
  },
  {
    slug: "finsight",
    title: "Financial Trend Analysis Dashboard",
    seoDescription:
      "The Financial Trend Analysis Dashboard by Thaw Zin Htun is a Python Streamlit app for stock analysis with RSI, interactive charts, market news, and an AI assistant.",
    type: "Academic Project",
    status: "Academic Project",
    categories: ["Data & Analytics", "Applied AI"],
    highlight: "Stateful Streamlit market analytics with real-time RSI, financial news aggregation & AI insights.",
    img: finsightRsiChartImg,
    gallery: [
      finsightRsiChartImg,
      finsightDashboardInputImg,
      finsightAiAssistantImg,
      finsightNewsFeedImg,
    ],
    galleryItems: [
      {
        src: finsightRsiChartImg,
        title: "Technical RSI & Momentum Charting",
        caption: "Interactive Plotly chart mapping Relative Strength Index overbought/oversold boundaries against price action.",
      },
      {
        src: finsightDashboardInputImg,
        title: "Universal Stock Input & Session Cache",
        caption: "Cross-tab session state ensuring user ticker selections and date ranges persist seamlessly.",
      },
      {
        src: finsightAiAssistantImg,
        title: "AI Market Technical Assistant",
        caption: "Integrated OpenAI assistant generating plain-English interpretations of current technical indicators.",
      },
      {
        src: finsightNewsFeedImg,
        title: "Live Market News Aggregator",
        caption: "Automated RSS financial feed parsing real-time market sentiment alongside technical charts.",
      },
    ],
    problem:
      "Retail traders and student analysts needed a streamlined, interactive tool to examine stock market trends, technical indicators (such as RSI and moving averages), live company news, and AI-driven market context in one cohesive interface without complex subscription software.",
    brief:
      "A collaborative Python and Streamlit dashboard for analyzing live financial market data, stock prices, RSI, and key technical indicators.",
    role:
      "Streamlit dashboard developer focused on stock input/session state, RSI analysis, AI assistance, and Render deployment.",
    contributions: [
      "Set up the project environment and developed core dashboard features around user-selected stock analysis.",
      "Added universal stock input with session storage so ticker choices persist across dashboard views.",
      "Improved RSI and persistent chart behavior, removed the candlestick flow, added market news, and moved the AI chatbot into the RSI workflow.",
      "Cleaned Streamlit menus/comments/calculation modules and added Render/runtime/OpenAI deployment configuration, API handler updates, and dependency fixes.",
    ],
    tags: [
      "Python 3.11",
      "Streamlit",
      "Pandas",
      "NumPy",
      "yfinance",
      "Plotly",
      "Matplotlib",
      "OpenAI API",
      "feedparser",
      "RSI",
      "SMA/EMA",
      "Render",
    ],
    categorizedTags: {
      "Data & Quant Analysis": ["Python 3.11", "Pandas", "NumPy", "yfinance", "RSI / SMA / EMA Formulas"],
      "Interactive Visualization": ["Streamlit", "Plotly", "Matplotlib"],
      "AI & Feeds": ["OpenAI API", "feedparser (Financial RSS)"],
      "Cloud Deployment": ["Render Web Service", "Streamlit Cloud Config"],
    },
    github: "https://github.com/thawzin07/SIT_Tri1_ProgramFund_Python",
    demo: "https://finsight-dashboard-yflq.onrender.com/",
    branches: ["thawzin"],
  },
];
