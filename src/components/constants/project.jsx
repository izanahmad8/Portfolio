// previewImages drives the in-modal carousel. Left empty where no real
// screenshots exist yet — the Preview button hides itself when it is empty.
const project = [
  {
    name: "VYARA",
    tagline: "Multi-Tenant Shop Management SaaS",
    duration: "Aug 2026",
    status: "Production",
    briefDesc:
      "A multi-tenant shop management platform covering inventory, billing, payments and invoicing.",
    desc: [
      "Built and deployed a shop management SaaS with 39 REST endpoints using Next.js, Express.js and PostgreSQL for inventory, billing, payments and invoicing.",
      "Designed an 8-table PostgreSQL schema with 17 indexes and row-level locking to prevent stock inconsistencies during concurrent sales.",
      "Implemented JWT authentication with email verification, password reset, session revocation and tenant-scoped API access.",
      "Generated invoice PDFs and 3 date-range reports with server-side pagination, search and filtering.",
    ],
    tech: [
      "Next.js",
      "Express.js",
      "Node.js",
      "PostgreSQL",
      "JWT",
      "Tailwind CSS",
    ],
    liveLink: "https://vyara.dpdns.org",
    previewImages: [],
  },
  {
    name: "MoneyMap",
    tagline: "Expense Tracking Mobile App",
    duration: "Jul 2025 – Aug 2025",
    briefDesc: "A mobile-first expense tracker with monthly summaries.",
    desc: [
      "Created a mobile-first expense tracker using React Native, Spring Boot, Spring Data JPA and PostgreSQL, with 5+ REST APIs for transactions, categories and monthly summaries.",
    ],
    tech: [
      "React Native",
      "Spring Boot",
      "Spring Data JPA",
      "PostgreSQL",
      "REST APIs",
    ],
    githubLink: "https://github.com/izanahmad8/MoneyMap",
    previewImages: [],
  },
  {
    name: "BookWorm",
    tagline: "Social Book-Sharing App",
    duration: "Aug 2025",
    briefDesc: "A social platform for posting and rating books.",
    desc: [
      "Developed a social book-sharing app using the MERN stack and Expo, enabling users to post and rate books.",
      "Implemented JWT-based authentication for session handling.",
      "Added server-side pagination and image optimization to reduce data load time.",
    ],
    tech: ["React Native", "Expo", "Node.js", "Express.js", "MongoDB"],
    githubLink: "https://github.com/izanahmad8/BookWorm",
    previewImages: [],
  },
  {
    name: "Borcelle Kitchen",
    tagline: "Food Ordering Web Application",
    duration: "May 2024 – Jun 2024",
    briefDesc: "An online food ordering platform with payments and an admin panel.",
    desc: [
      "Launched a MERN food-ordering application serving 30+ users, with JWT and bcrypt authentication and role-based admin access.",
      "Integrated Razorpay payments and order management, and built an admin dashboard for orders and inventory.",
    ],
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "bcrypt",
      "Razorpay",
    ],
    githubLink: "https://github.com/izanahmad8/Borcelle",
    liveLink: "https://borcelle-kitchen.vercel.app/",
    previewImages: [],
  },
];

export { project };
