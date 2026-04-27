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

export const projectTypeColors = {
  "Academic Project": "#0f8a7a",
  "Hackathon Project": "#c26431",
  "Commercial Project": "#dc2626",
};

export const projects = [
  {
    slug: "pulsepoint",
    title: "PulsePoint Fitness",
    type: "Academic Project",
    status: "Academic Project",
    img: pulsepointHomeImg,
    gallery: [
      pulsepointHomeImg,
      pulsepointBookingImg,
      pulsepointChatbotImg,
      pulsepointDashboardImg,
    ],
    problem:
      "The project needed a complete gym management platform that could handle member bookings, billing, admin operations, notifications, and user support without relying on a heavy framework.",
    brief:
      "A full-stack gym membership platform built with plain PHP and MySQL, combining member services, admin operations, Stripe billing, and AI-supported assistance.",
    role:
      "Full-stack PHP/MVC owner across core app architecture, booking, Stripe billing, AI assistance, security, and VM deployment.",
    contributions: [
      "Scaffolded the PHP MVC baseline with routing, controllers, models, views, setup docs, and the booking/waitlist flow.",
      "Implemented Stripe membership billing, payment reconciliation, checkout notifications, and member billing dashboard updates.",
      "Built the OpenAI gym-scoped chatbot with persistent history, UI polish, route wiring, config, and accessibility fixes.",
      "Hardened validation/security with prepared statements, CSRF, escaping, role checks, SQL asset cleanup, and VM GitHub Actions deployment.",
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
    ],
    github:
      "https://github.com/thawzin07/SIT_Tri2_WebSystemsAndTechnologiesGroupProject",
    demo: "http://34.142.168.168/",
    video: "https://www.youtube.com/watch?v=bDHM5iRpshQ",
    branches: ["thawzin-dev", "vm_hosting"],
  },
  {
    slug: "speedup",
    title: "SpeedUp",
    type: "GreyMatter DL Week project",
    status: "Hackathon Project",
    img: speedupHomeImg,
    gallery: [speedupHomeImg, speedupPracticeImg, speedupTutorImg, speedupDashboardImg],
    problem:
      "Students needed a faster way to turn their own uploaded study material into useful practice, AI explanations, and study workflows while keeping account data separated and reliable.",
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
      "Firebase Admin",
      "Cloudinary",
      "Multer",
      "SQLite",
      "PDF Parse",
      "Mammoth",
      "JSZip",
      "Render",
      "GitHub Pages",
    ],
    github: "https://github.com/GreyMatter-DLWeek/speedup",
    demo: "https://greymatter-dlweek.github.io/speedup/",
    video: "https://www.youtube.com/watch?v=2yiJaj0OX4U",
    branches: ["thawzin-dev", "hosting"],
  },
  {
    slug: "finsight",
    title: "Financial Trend Analysis Dashboard",
    type: "Academic Project",
    status: "Academic Project",
    img: finsightRsiChartImg,
    gallery: [
      finsightRsiChartImg,
      finsightDashboardInputImg,
      finsightAiAssistantImg,
      finsightNewsFeedImg,
    ],
    problem:
      "The team needed a clear dashboard for exploring stock trends, RSI behavior, market context, and AI-assisted explanations from one Streamlit interface.",
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
    github: "https://github.com/thawzin07/SIT_Tri1_ProgramFund_Python",
    demo: "https://finsight-dashboard-yflq.onrender.com/",
    branches: ["thawzin"],
  },
];
