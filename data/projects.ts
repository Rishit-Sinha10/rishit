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
  liveUrl: string;
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
      "Core flow is usable as a daily habit rather than a quarterly chore.",
      "Taught me that a good finance experience depends on clarity and pacing, not features.",
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
      "Surfaced a simpler mental model for planning study time.",
      "Main lesson: the product needs to stay quiet and predictable, not feature-heavy.",
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
        color: "000000",
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
    status: "In dev",
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
      "Best AI features reduce setup overhead, not add UI surface area.",
      "Lesson: focus on the smallest useful loop before expanding the product.",
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
        color: "000000",
        category: "backend",
      },
      { name: "MongoDB", slug: "mongodb", category: "database" },
      {
        name: "Mongoose",
        slug: "mongoosedotws",
        color: "880000",
        category: "backend",
      },
    ],
  },
];
