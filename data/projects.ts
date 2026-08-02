export type SkillCategory =
  "frontend" | "backend" | "database" | "devops" | "AI";

export type Skill = {
  name: string;
  slug: string;
  color?: string;
  category: SkillCategory;
};
export type ProjectCaseStudy = {
  id: string;
  title: string;
  tagline: string;
  status: "Live" | "In dev";
  summary: string[];
  problem: string | string[];
  solution: string|string[];
  features: Array<{ label: string; detail: string|string[]}>;
  architecture: {
    flow: string[];
  };
  codeSnippet?: { language: string; filename: string; code: string };
  results: string[];
  liveUrl: string | null;
  githubUrl: string;
  accent: string;
  skills: Skill[];
};

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: "financinno",
    title: "FinanCinno",
    tagline:
      "A personal finance workspace that makes budgeting feel calm instead of chaotic.",
    status: "Live",
    summary: [
      "Financcino is a full-stack personal finance application that lets users log expenses, upload and process receipts, set budgets, and get spending insights through analytics dashboards and an AI chatbot. It's the most security- and backend-hardened project in the portfolio set, with rate limiting, security headers, and structured input validation already in place — details that matter a lot for a finance-adjacent app and are worth highlighting explicitly.",
    ],
    problem: [
      "Logging expenses by hand is tedious enough that most people stop doing it within weeks.",
      "Receipts pile up physically or in photo albums with no structured way to extract the data.",
      "Without categorized analytics, people can see that they overspent, but not where or why.",
      "Budgeting tools rarely connect budget limits to real-time actual spending in a way that's visible before the money's already gone.",
    ],
    solution: [
      "Structured expense logging — add, edit, delete, and categorize expenses (Food, Transport, Utilities, etc.), filterable by date/category/amount.",
      "Receipt upload and processing — image upload (via Multer) with OCR-based automatic expense extraction, removing manual entry for anything with a receipt.",
      "Budget management — set per-category budget limits with budget-vs-actual comparison and alerts, so overspending is visible before it happens, not after.",
      "Analytics dashboards — interactive Recharts-based visualizations for category breakdowns and monthly/yearly trends.",
      "AI chatbot — financial advice and spending-pattern analysis based on the user's own logged data, rather than generic tips.",
      "Security-first backend — Helmet security headers, express-rate-limit, express-validator input validation, and JWT + Clerk auth, which matters more here than in most portfolio projects since the data is financial.",
    ],
    features: [
      {
        label: "Expense Management",
        detail: [
          "Log transactions in a few taps so spending tracking stays effortless.",
          "Add/edit/delete/categorize expenses; filter by date, category, amount; real-time tracking",
        ],
      },
      {
        label: "Recipet Proccessing",
        detail: [
          "Flags spending drift and surfaces practical nudges without overwhelming the user.",
          "Upload JPG/PNG receipts, automatic expense extraction, bulk upload, receipt storage/retrieval",
        ],
      },
      {
        label: "Analytics And Reporting",
        detail: [
          "Interactive charts (Recharts), category-wise breakdowns, monthly/yearly trend views",
          "Turns raw activity into plain-English snapshots for the week or month.",
        ],
      },
      {
        label: "Budget Management",
        detail: [
          "Per-category budget limits, budget-vs-actual comparison, alerts and notifications",
          "Keeps the surface focused on the next best action instead of dense dashboards.",
        ],
      },
      {
        label: "Auth & Security",
        detail: [
          "JWT-based auth + Clerk integration, role-based access control, bcrypt hashing, rate limiting on API endpoints",
          "",
        ],
      },
    ],
    architecture: {
      flow: [
        "Financcino follows a secure MERN architecture where a React + Vite frontend communicates with a security-hardened Express.js backend through REST APIs for all financial operations.",
        "Users authenticate using Clerk, which manages secure sign-in, session handling, and protected access before requests reach the backend.",
        "Authenticated requests are validated through JWT middleware, while Helmet, Express Rate Limiting, and Express Validator provide layered protection against common security threats and invalid input.",
        "The backend routes requests through dedicated controllers for authentication, expenses, categories, receipts, analytics, chatbot, and budget management, keeping business logic modular and maintainable.",
        "Expense receipts are uploaded through a Multer-based file processing pipeline, where OCR extracts structured transaction data that can be reviewed and stored as expense records.",
        "Mongoose models interact with MongoDB to manage users, expenses, categories, receipts, budgets, transactions, and analytics, ensuring efficient data persistence and retrieval.",
        "The React frontend updates dashboards, expense tracking, analytics charts, and chatbot interactions dynamically using REST APIs, Context API, and custom hooks without requiring page reloads.",
        "This layered architecture separates authentication, security, business logic, file processing, and data persistence, resulting in a scalable, secure, and maintainable personal finance platform.",
      ],
    },
    codeSnippet: {
      language: "javascript",
      filename: "routes/transactions.js",
      code: `router.post("/api/transactions", requireAuth, async (req, res) => {
  const { amount, category, description, date } = req.body;

  const transaction = await db.transactions.create({
    userId: req.auth.userId,
    amount,
    category,
    description,
    date: new Date(date),
  });

  // Auto-update budget coaching
  const budget = await db.budgets.findByUserAndCategory(
    req.auth.userId, category
  );
  if (budget && budget.spent + amount > budget.limit) {
    transaction.coaching = {
      type: "warning",
      message: \`You've used \${Math.round(((budget.spent + amount) / budget.limit) * 100)}% of your \${category} budget.\`
    };
  }

  res.json({ transaction });
});`,
    },
    results: [
      "Achieved a Lighthouse Performance score of 90/100",
     "Scored 96/100 for Accessibility and 100/100 for SEO",
     "First Contentful Paint (FCP): 0.9 s",
     "Largest Contentful Paint (LCP): 1.6 s",
    ],
    liveUrl: "https://finan-cino.vercel.app/",
    githubUrl: "https://github.com/Rishit-Sinha10/Financcino",
    accent: "#4b5563",
    skills: [
      { name: "React", slug: "react", category: "frontend" },
      { name: "Node.js", slug: "nodedotjs", category: "backend" },
      { name: "Express", slug: "express", category: "backend" },
      { name: "Tailwindcss", slug: "Tailwindcss", category: "frontend" },
      { name: "Axios", slug: "Axios", category: "frontend" },
      { name: "Mongoose", slug: "mongoosedotws", category: "backend" },
      { name: "Jest", slug: "Jest", category: "backend" },
      { name: "MongoDB", slug: "mongodb", category: "database" },
      { name: "Clerk", slug: "clerk", category: "devops" },
      { name: "Vercel", slug: "vercel", category: "devops" },
      { name: "Render", slug: "render", category: "devops" },
    ],
  },
  {
    id: "notemog",
    title: "NoteMog",
    tagline:
      "An AI-powered study planner that organizes routines, notes, and goals without friction.",
    status: "Live",
    summary: [
      "NoteMog is a MERN-stack study planning platform aimed at helping students organize notes, build study schedules, and track learning progress in one place, with AI-driven study plan generation as its core differentiator. The frontend — dashboard, planner, note management, and calendar UI — is fully built; the backend API and AI integration are actively being developed on top of a complete database schema.This project is a good one to talk about in-progress and honestly: it shows you can plan and build a full data model and frontend experience before backend logic catches up, which is a realistic way real product teams often build (schema-first, UI-first, then wire up the API).",
    ],
    problem: [
      "No intelligence layer. Existing planners require the student to manually prioritize; there's no system using the student's own notes/goals to suggest what to focus on next.",
      "No connection between notes and planning. Study plans are made independently of the actual material being studied, so plans go stale or feel arbitrary.",
    ],
    solution: [
      "A smart note system for organizing notes by subject, with AI-generated summaries planned to condense material automatically.",
      "A drag-and-drop study planner with calendar-based scheduling (FullCalendar), priority tagging, and deadline tracking.",
      "An AI study plan generator (in progress) intended to turn a student's goals and notes into an actual day-by-day schedule, rather than leaving prioritization entirely manual",
      "A progress and analytics dashboard (Chart.js) surfacing study time, task completion, and per-subject progress.",
      "Clerk-based authentication with JWT session handling and bcrypt password hashing for account security.",
    ],
    features: [
      {
        label: "Note Management",
        detail: [
          "Create/organize/categorize notes by subject with rich text editing",
          "Search and filtering",
        ],
      },
      {
        label: "Study Planner",
        detail: [
          "Drag-and-drop task management, calendar-based scheduling (FullCalendar)",
          "Priority-based organization and deadline tracking",
        ],
      },
      {
        label: "Progress And Analytics",
        detail: [
          "Real-time performance metrics and Chart.js visualizations",
          "Task completion and study-time tracking",
        ],
      },
      {
        label: "Subject Management",
        detail:
          "Organize by subject/course, allocate study time, subject-level recommendations",
      },
    ],
    architecture: {
      flow: [
        "Users access NoteMog through a React + Vite frontend, where they can manage notes, study plans, tasks, subjects, and AI-generated summaries from a unified dashboard.",
        "Authentication is handled by Clerk, providing secure sign-in, session management, and protected routes before any API requests reach the backend.",
        "Authenticated requests are sent to the Express.js REST API, where Clerk and JWT middleware validate the user's identity and authorize access.",
        "The backend routes requests through dedicated controllers for each domain entity—Users, Notes, Plans, Tasks, Subjects, and Summaries—keeping the application modular and maintainable.",
        "Business logic is executed inside the controllers, while Mongoose models handle communication with MongoDB for persistent data storage.",
        "MongoDB stores all application data, including user profiles, notes, study plans, tasks, subjects, and AI-generated summaries.",
        "After processing, the backend returns structured JSON responses to the frontend, allowing React to update the interface in real time without full page reloads.",
        "This domain-driven architecture separates authentication, business logic, and data persistence, making NoteMog scalable, easy to extend, and maintainable as new features are added.",
      ],
    },
    results: [
      "Achieved a Lighthouse Performance score of 96/100",
     "Scored 97/100 for Accessibility and 91/100 for SEO",
     "Speed Index (SI): 1.1 s",
     "First Contentful Paint (LCP): 0.9 s",
    ],
    liveUrl: "https://lumina-nine-tan.vercel.app/",
    githubUrl: "https://github.com/Rishit-Sinha10/NoteMog",
    accent: "#6b7280",
    skills: [
      { name: "React", slug: "react", category: "frontend" },
      { name: "Chart.Js", slug: "Chart.Js", category: "frontend" },
      { name: "Tailwindcss", slug: "Tailwindcss", category: "frontend" },
      { name: "Mongoose", slug: "mongoosedotws", category: "backend" },
      { name: "Eslint", slug: "Eslint", category: "devops" },
      { name: "Node.js", slug: "nodedotjs", category: "backend" },
      { name: "MongoDB", slug: "mongodb", category: "database" },
      { name: "Tailwind CSS", slug: "tailwindcss", category: "frontend" },
      { name: "Vercel", slug: "vercel", category: "devops" },
      { name: "Render", slug: "render", category: "devops" },
    ],
  },
  {
    id: "Flux",
    title: "Flux",
    tagline:
      "A real-time streaming platform with integrated chat, moderation, and low-latency playback.",
    status: "Live",
    summary: [
      "Flux is a full-stack SaaS live streaming platform built for content creators, educators, and gaming streamers to broadcast video, engage viewers in real time, and track performance — all from one platform. It combines a custom RTMP ingestion pipeline with HLS delivery for low-latency broadcasting, a Socket.IO-powered live chat layer, an AI chatbot (Gemini), and a full analytics/security stack, all wrapped in a modern React frontend.",
    ],
    problem: [
      "Enterprise streaming infra (e.g. custom RTMP/CDN setups) is powerful but too complex and costly for individual creators to self-host.",
      "Consumer platforms (Twitch, YouTube Live) offer polish but no ownership, no custom monetization control, and no direct access to the underlying data or infrastructure.",
    ],
    solution: [
      "A custom RTMP ingestion server (Node-Media-Server) accepts broadcasts directly from OBS or any RTMP-compatible software.",
      "FFmpeg transcodes incoming streams to HLS in 2-second segments, enabling adaptive-bitrate playback with sub-second latency for viewers.",
      "Socket.IO powers real-time chat, live viewer counts, and notifications, decoupled from the media pipeline so chat and stream health don't block each other.",
    ],
    features: [
      {
        label: "Streaming & Broadcasting",
        detail: "RTMP ingestion (port 1935) + multi-bitrate HLS delivery",
      },
      {
        label: "Real-Time Engagement",
        detail:
          "Hosts can manage chat flow without losing focus on the broadcast.",
      },
      {
        label: "Creator Tools & Discovery",
        detail: "Creator profiles, stream configuration, RTMP key generation",
      },
      {
        label: "AI Integration",
        detail:
          "Groundwork for AI-assisted content moderation and sentiment analysis",
      },
      {
        label: "Replay support",
        detail:
          "Chat history persists so post-stream review stays connected to context.",
      },
    ],
    architecture: {
      flow: [
        "Flux uses a layered architecture that separates media streaming from application logic, allowing both services to scale independently.",
        "The client is built with React 19, Vite, Tailwind CSS, Chakra UI, Axios, and the Socket.IO client for responsive real-time interactions.",
        "Users interact with the Express.js API over HTTPS for authentication, stream management, payments, and analytics, while WebSockets power live chat and real-time updates.",
        "A dedicated media server powered by Node-Media-Server receives RTMP streams, processes them with FFmpeg, and converts them into HLS segments for adaptive playback.",
        "The API server provides REST endpoints, Socket.IO communication, Clerk/JWT authentication with role-based access control, and rate limiting for security and reliability.",
        "MongoDB acts as the shared persistence layer, storing users, streams, chat messages, payments, analytics, followers, and chat rooms.",
        "By decoupling the streaming pipeline from the API layer, Flux achieves better fault tolerance, easier horizontal scaling, and uninterrupted live streaming even during backend maintenance.",
      ],
    },
    codeSnippet: {
      language: "javascript",
      filename: "server/socket.js",
      code: `io.on("connection", (socket) => {
  socket.on("join-room", async ({ roomId, username }) => {
    socket.join(roomId);
    const history = await db.messages.find({ roomId })
      .sort({ createdAt: -1 }).limit(50).lean();
    socket.emit("chat-history", history.reverse());
    io.to(roomId).emit("user-joined", { username, count: getRoomCount(roomId) });
  });

  socket.on("send-message", async ({ roomId, username, text }) => {
    const msg = await db.messages.create({ roomId, username, text });
    io.to(roomId).emit("new-message", {
      id: msg._id, username: msg.username, text: msg.text, createdAt: msg.createdAt
    });
  });

  socket.on("moderate", ({ roomId, messageId, action }) => {
    if (action === "delete") {
      db.messages.deleteById(messageId);
      io.to(roomId).emit("message-deleted", { messageId });
    }
  });
});`,
    },
    results: [
      "Interaction model is much clearer than a chat widget beside a stream.",
      "60–70% payload size reduction via gzip compression",
      "Rate limiting (100 req/15min) implemented for API abuse protection",
      "Connection pooling reduced per-request connection overhead",
      "Multi-bitrate adaptive streaming (360p/720p/1080p) for varying viewer bandwidth",
      "Lesson: event state needs to be explicit from the start if moderation is part of the flow.",
    ],
    liveUrl: "https://echo-rizz.vercel.app/",
    githubUrl: "https://github.com/Rishit-Sinha10/P1",
    accent: "#374151",
    skills: [
      { name: "React", slug: "react", category: "frontend" },
      { name: "Vite", slug: "Vite", category: "frontend" },
      { name: "Axios", slug: "Axios", category: "frontend" },
      { name: "ChakraUI", slug: "ChakraUI", category: "frontend" },
      { name: "Tailwindcss", slug: "Tailwindcss", category: "frontend" },
      {
        name: "Socket.IO",
        slug: "socketdotio",
        category: "backend",
      },
      { name: "Mongoose", slug: "mongoosedotws", category: "database" },
      { name: "Node.js", slug: "nodedotjs", category: "backend" },
      { name: "MongoDB", slug: "mongodb", category: "database" },
      { name: "Bun", slug: "bun", category: "devops" },
      { name: "Vercel", slug: "vercel", category: "devops" },
      { name: "Render", slug: "render", category: "devops" },
    ],
  },
  {
    id: "zecoai",
    title: "ZecoAI",
    tagline:
      "A collaborative coding environment with built-in AI assistance and sandboxed execution.",
    status: "Live",
    summary: [
      "ZecoAI is a full-stack, browser-based code editor that combines the editing experience of VS Code with AI-assisted code review, instant multi-language code execution, and persistent AI chat history — all backed by a cloud database.It was built to explore how developers could get real-time feedback and run code without leaving the browser, while keeping their project history and conversations saved across sessions.The project spans a complete product surface: authentication, project/file management, a Monaco-based editor, a code execution pipeline, and an AI chat system — making it a strong demonstration of end-to-end full-stack ownership rather than a single isolated feature",
    ],
    problem: [
      "A Monaco-powered editor (the same engine behind VS Code) for a familiar, professional editing experience.",
      "A direct integration with Judge0, letting users execute code in 80+ languages instantly, in-browser, without local setup.",
      "A Groq-powered AI chat layer that reviews code and answers natural-language questions about it, with full conversation history stored in MongoDB so context isn't lost between sessions.",
      "Clerk-based authentication (OAuth, email, MFA) so every user's projects, files, and chat history are private and persistent across devices.",
    ],
    solution:
      "Developers frequently juggle multiple tools while working: a code editor, a separate terminal/sandbox to test snippets, and a browser tab for AI assistance (ChatGPT, etc.), with no shared context between them.This creates friction, especially for Learners who want instant feedback on code without setting up a local environment.There was no single, lightweight web tool that unified editing, execution, and AI-assisted feedback with memory of past sessions.Anyone iterating on small projects who loses previous AI conversations and code context once a chat or browser tab closes.",
    features: [
      {
        label: "AI code assistance",
        detail: "Monaco Editor integration with full syntax highlighting",
      },
      {
        label: "Sandboxed execution",
        detail:
          "Run and test code in isolated environments without local setup overhead.",
      },
      {
        label: "Real-time collaboration",
        detail:
          "Multiple users can edit and see changes in the same workspace simultaneously.",
      },
      {
        label: "Enterprise Grade Authentication",
        detail:
          "Enterprise-grade authentication via Clerk (OAuth, email/password, MFA)",
      },
    ],
    architecture: {
      flow: [
        "ZecoAI follows a modern decoupled architecture where the React frontend communicates with an Express.js backend through REST APIs.",
        "The frontend is built using React, Vite, TypeScript, Tailwind CSS, and Monaco Editor, providing a fast and responsive coding environment.",
        "Authentication and user management are handled by Clerk, allowing secure sign-in, protected routes, and session management.",
        "The Express.js backend manages business logic, project operations, file management, AI requests, and integrations with external services.",
        "MongoDB Atlas stores user projects, files, chat history, and application metadata using Mongoose ODM.",
        "Judge0 API executes user code inside isolated environments and returns compilation and runtime results securely.",
        "Groq AI powers intelligent code reviews, debugging assistance, explanations, and interactive AI conversations.",
        "This architecture keeps the frontend lightweight while delegating authentication, execution, storage, and AI capabilities to specialized services, making ZecoAI scalable and maintainable.",
      ],
    },
    results: [
      "41 unique users explored the platform",
      "290 total page views across the application",
      "7.1 pages viewed per visitor, indicating deep feature exploration",
      "46% bounce rate"
    ],
    liveUrl: "https://zecoai.vercel.app/",
    githubUrl: "https://github.com/Rishit-Sinha10/ZecoAI",
    accent: "#9ca3af",
    skills: [
      { name: "React", slug: "react", category: "frontend" },
      { name: "Axios", slug: "Axios", category: "frontend" },
      { name: "Tailwindcss", slug: "Tailwindcss", category: "frontend" },
      { name: "Vercel", slug: "vercel", category: "devops" },
      { name: "clerk", slug: "clerk", category: "backend" },
      { name: "Render", slug: "render", category: "devops" },
      { name: "Bun", slug: "Bun", category: "devops" },
      { name: "Node.js", slug: "nodedotjs", category: "backend" },
      {
        name: "Express",
        slug: "express",
        category: "backend",
      },
      { name: "MongoDB", slug: "mongodb", category: "database" },
      {
        name: "Mongoose",
        slug: "mongoosedotws",
        category: "backend",
      },
    ],
  },
  {
  id: "TuxHuzz",
  title: "TuxHuzz",
  tagline:
    "A Clash Royale companion app that tracks player stats, analyzes decks, and roasts your gameplay with AI.",
  status: "Live",
  summary: [
    "TuxHuzz is a full-stack Clash Royale stats tracker and deck analyzer built on top of the official Clash Royale API. Users can look up any player by tag to see live trophy counts, level, win/loss history, and battle stats, or pull up clan info and compare members. Beyond raw stats, the app runs an 8-card deck through a rule-based analysis engine that scores elixir curve, win conditions, and air/splash coverage, then surfaces strengths, weaknesses, and concrete suggestions. A lighter, more playful feature — AI 'roasts' — uses Groq to generate personalized (and increasingly savage) commentary on a player's performance based on their real stats.",
  ],
  problem: [
    "A Flask/Python backend that talks directly to the official Clash Royale API for players, clans, and card data.",
    "A rule-based DeckAnalyzer service that scores an 8-card deck against configurable thresholds (elixir cost, air defense, splash damage, win-condition count) and generates human-readable suggestions.",
    "A Groq-powered 'roast' endpoint with selectable intensity (fun / savage / nuclear) that turns a player's win rate, trophy history, and three-crown rate into personalized AI commentary.",
    "JWT-based authentication (Flask-JWT-Extended) plus a SQL database (via SQLAlchemy, supporting MySQL/Postgres) to persist users and card data.",
  ],
  solution:
    "In-game Clash Royale stats screens are limited — players can't easily see deep trends in their own stats, get objective feedback on their deck composition, or share a fun, personalized summary of their play. Serious players and casual clashers alike often bounce between third-party stat sites, spreadsheets, and Discord chats to figure out what's actually wrong with a deck, with no single tool tying stats, analysis, and personality together. TuxHuzz unifies player/clan lookup, rule-based deck analysis, and AI-generated commentary into one dashboard, so anyone can paste in a player tag and immediately get both hard numbers and an easy-to-digest verdict.",
  features: [
    {
      label: "Player & clan lookup",
      detail:
        "Search any player tag to view live trophies, level, win/loss record, and clan membership pulled straight from the Clash Royale API.",
    },
    {
      label: "Rule-based deck analyzer",
      detail:
        "Scores an 8-card deck on elixir curve, win conditions, and air/splash coverage, returning strengths, weaknesses, and an overall rating.",
    },
    {
      label: "AI-powered roasts",
      detail:
        "Groq-generated, stat-driven roasts of a player's performance with selectable intensity: fun, savage, or nuclear.",
    },
    {
      label: "Stats dashboard & charts",
      detail:
        "React + Chart.js dashboard visualizing win rate, trophy trends, and deck metrics at a glance.",
    },
  ],
  architecture: {
    flow: [
      "TuxHuzz follows a decoupled architecture with a React (Vite) frontend calling a Flask REST API backend.",
      "The frontend is built with React, React Router, and Chart.js/react-chartjs-2 for the stats dashboard and deck charts.",
      "The Flask backend is organized around blueprints — auth, players, cards, and roast — each handling a distinct slice of functionality.",
      "Flask-JWT-Extended handles authentication and protects routes, while SQLAlchemy (MySQL/Postgres-compatible) persists users and seeded card data.",
      "A ClashRoyaleAPI service wraps calls to the official Clash Royale API for player, clan, and card data.",
      "A DeckAnalyzer service applies configurable thresholds to score deck composition and generate suggestions.",
      "A roast service calls the Groq API to turn a player's real stats into personalized AI commentary, with a graceful fallback message if Groq is unavailable.",
      "This separation keeps game-data fetching, analysis logic, and AI generation independently testable while the frontend stays a thin presentation layer.",
    ],
  },
  results: [
        "29 git clones in the last 14 days",
        "20 unique cloners",
        "6 total repo page views in the last 14 days",
        "1 unique visitor",
  ],
  liveUrl: "https://deploysus.vercel.app/",
  githubUrl: "https://github.com/Rishit-Sinha10/clash_royale",
  accent: "#9ca3af",
  skills: [
    { name: "React", slug: "react", category: "frontend" },
    { name: "Vite", slug: "vite", category: "frontend" },
    { name: "Chart.js", slug: "chartdotjs", category: "frontend" },
    { name: "React Router", slug: "reactrouter", category: "frontend" },
    { name: "Vercel", slug: "vercel", category: "devops" },
    { name: "Python", slug: "python", category: "backend" },
    { name: "Flask", slug: "flask", category: "backend" },
    { name: "Render", slug: "Render", category: "devops" },
    { name: "MySQL", slug: "mysql", category: "database" },
    { name: "SQLAlchemy", slug: "sqlalchemy", category: "backend" },
   ],
  },
  {
  id: "VRTX",
  title: "VRTX",
  tagline:
    "A premium football tactical workspace for building, saving, and sharing formation lineups on an interactive pitch.",
  status:"In dev",
  summary: [
    "VRTX is an early-stage, full-stack football platform with a polished Next.js frontend and an Express backend split into separate workspaces. The current build ships a responsive football pitch with a formation-based lineup builder (7 formations, drag-and-drop player placement), with Firebase auth at the core and a protected API boundary between the client and the Express API. The long-term vision is a differentiated product that combines modern sports UX with coaching-level tactical depth.",
  ],
  problem: [
    "Football fans, coaches, and analysts lack a fast, polished way to build and tweak tactical lineups and share them with others.",
    "Existing tactical editors feel clunky, dated, or bloated, with no premium, SaaS-grade experience designed around quick formation switching and visual player placement.",
    "A Next.js 16 App Router frontend (React 19, Tailwind CSS v4) driving an interactive, drag-and-drop pitch UI.",
    "An Express 5 (ESM) backend, kept in a separate workspace, exposing a protected API boundary gated by Firebase-verified auth.",
  ],
  solution:
    "A full-stack web app that puts an interactive football pitch at the center: users pick a formation, place players visually, and (on the roadmap) save, share, and revisit lineups. The architecture is built to scale cleanly from a lineup editor into a full tactical workspace with teams, player search, shareable links, and future real-time collaboration and AI insights.",
  features: [
    {
      label: "Interactive pitch",
      detail:
        "A responsive, visual football pitch that serves as the core surface for building and editing lineups.",
    },
    {
      label: "Formation selector",
      detail:
        "7 formation presets — 4-3-3, 4-3-3 Attack, 4-3-3 Holding, 4-4-2, 4-5-1, 4-2-1-3, and 4-2-3-1.",
    },
    {
      label: "Drag-and-drop lineup building",
      detail:
        "Players can be placed and repositioned directly on the pitch to build out a tactical setup.",
    },
    {
      label: "Firebase-gated API",
      detail:
        "Firebase Authentication on the client backs a protected API boundary, so only verified users can reach gated Express routes.",
    },
    {
      label: "Roadmap",
      detail:
        "Saved lineups, custom teams, player search, shareable lineup URLs, real-time collaboration, and AI-driven tactical analysis.",
    },
  ],
  architecture: {
    flow: [
      "VRTX is a monorepo with two workspaces: /frontend (Next.js 16 App Router, React 19, Tailwind CSS v4) and /backend (Express 5, ESM).",
      "Firebase handles authentication on the client, issuing credentials that gate access to the Express API.",
      "A protected API boundary sits between the Next.js frontend and the Express backend so only authenticated requests reach sensitive routes.",
      "The frontend is organized around a product-oriented structure — app, components, features, lib, services, and types — supporting the interactive pitch and formation logic.",
      "Bun is used as the package manager and lockfile across both workspaces.",
      "The planned data layer is Supabase + Prisma + PostgreSQL, with Vercel targeted for the frontend and Render for the API once deployed.",
    ],
  },
  results: [
    "5 commits",
    "1 star",
    "0 forks",
    "0 open issues or pull requests",
    "No live deployment yet — pre-release / portfolio-stage build",
  ],
  liveUrl: null,
  githubUrl: "https://github.com/Rishit-Sinha10/VRTX",
  accent: "#059669",
  skills: [
    { name: "Next.js", slug: "nextdotjs", category: "frontend" },
    { name: "Tailwind CSS", slug: "tailwindcss", category: "frontend" },
    { name: "Node.js", slug: "nodedotjs", category: "backend" },
    { name: "Express", slug: "express", category: "backend" },
    { name: "Firebase", slug: "firebase", category: "backend" },
    { name: "Bun", slug: "bun", category: "devops" },
  ],
},
];
