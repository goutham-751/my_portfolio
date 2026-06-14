export const projects = [
  {
    id: 'campushire',
    title: 'CampusHire.AI',
    type: 'Full-Stack AI SaaS',
    label: 'Featured',
    stack: ['React.js', 'FastAPI', 'Llama-3', 'Framer Motion', 'Python'],
    headline: 'An AI-native recruitment platform replacing manual resume screening and mock interviews.',
    bullets: [
      'Real-time ATS resume analysis with scoring, parsing, and feedback',
      'AI-powered interview simulation with live speech analytics integration',
      'Multi-agent workflow (Llama-3) for automated candidate evaluation and ranking',
      'Responsive frontend with Framer Motion-driven live feedback visualization',
      'RESTful APIs for resume scoring, interview orchestration, and state management',
    ],
    github: 'https://campushire-ai.vercel.app/',
  },
  {
    id: 'rag-api',
    title: 'Multi-Tenant RAG API',
    type: 'Backend SaaS Infrastructure',
    label: 'Production-Ready',
    stack: ['FastAPI', 'ChromaDB', 'LangChain', 'Docker', 'HuggingFace', 'Groq', 'SentenceTransformers'],
    headline: 'Production-grade, multi-tenant RAG API with enterprise security and hybrid vector search.',
    bullets: [
      'Natural language querying over private documents — zero hallucination via Groq LLM',
      'Multi-tenant data isolation using persistent ChromaDB + SQLite/SQLModel',
      'Hybrid retrieval: Dense Embeddings (SentenceTransformers) + Sparse BM25 + Reciprocal Rank Fusion',
      'Deployed via Docker on HuggingFace Spaces with bcrypt auth, rate limiting, TTL caching',
    ],
    github: 'https://damn0898-multi-tenant-rag-api.hf.space/docs',
  },
  {
    id: 'pricepilot',
    title: 'PricePilot.AI',
    type: 'Data Intelligence Platform',
    label: 'Full-Stack',
    stack: ['React', 'FastAPI', 'Supabase', 'PostgreSQL', 'Python'],
    headline: 'Pricing intelligence engine synthesizing competitor signals and demand forecasts into revenue-optimizing decisions.',
    bullets: [
      'Synthesizes competitor pricing, market trends, and demand signals in real time',
      'Price elasticity analysis and accurate demand prediction pipeline',
      'Supabase (PostgreSQL) for large-scale historical pricing data at query speed',
      'Executive-facing React dashboard with live analytics and recommendation cards',
    ],
    github: 'https://github.com/goutham-751/PricePilot-AI',
  },
  {
    id: 'predictive-maintenance',
    title: 'Predictive Maintenance System',
    type: 'Industrial ML System',
    label: 'ML Engineering',
    stack: ['Python', 'FastAPI', 'Streamlit', 'Scikit-learn'],
    headline: 'End-to-end ML system for forecasting industrial machine failure and estimating remaining useful life.',
    bullets: [
      'Classifies failure probability + regresses Remaining Useful Life (RUL) from raw sensor streams',
      'Class-imbalance techniques (SMOTE/weighted loss) to enhance accuracy on skewed datasets',
      'FastAPI backend serving trained models at production inference speed',
      'Real-time + batch prediction visualized in interactive Streamlit dashboard',
    ],
    github: 'https://github.com/goutham-751/Predictive-Maintenance-of-Industrial-Machines-Using-Sensor-Based-Failure-Prediction',
  },
];

export const skills = {
  frameworks: ["Express.js", "LangChain", "React", "Streamlit", "FastAPI", "Pytorch", "Tensorflow", "Node.js"],
  libraries: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Bootstrap", "TensorFlow", "Scikit-learn", "spaCy"],
  languages: ["Python", "JavaScript", "Java", "C/C++", "R", "MATLAB", "SQL", "RESTful APIs"],
  tools: ["AWS", "GitHub", "Git", "Docker"],
  databases: ["Supabase", "MySQL", "PostgreSQL"],
  analytics: ["Tableau", "MS-Excel"]
};

export const experience = [
  {
    id: 1,
    role: 'Summer Research Intern',
    org: 'IGCAR — Indira Gandhi Centre for Atomic Research',
    division: 'Health & Industrial Safety Division, Department of Atomic Energy',
    period: 'Jun 2025 – Jul 2025',
    location: 'Kalpakkam, Chennai',
    bullets: [
      'Radiological data analysis for dose mapping using statistical modeling',
      'Data preprocessing, spatial analysis, and anomaly detection on monitoring data',
      'Descriptive statistics and trend analysis to evaluate radiation exposure patterns',
      'Contributed to safety assessment models for industrial and healthcare environments',
    ],
    tags: ['Python', 'Statistical Modeling', 'Anomaly Detection', 'Spatial Analysis'],
  },
  {
    id: 2,
    role: 'Treasurer',
    org: 'CyberSecurity Student Community, VITC',
    period: 'Jun 2025 – Present',
    location: 'VIT Chennai',
    bullets: [
      'Manage financial budgeting and event expenses across community operations',
      'Run hands-on CTF workshops for a 200+ member community',
      'Coordinate events and mentor junior contributors in cybersecurity fundamentals',
    ],
    tags: ['Leadership', 'CTF', 'Community', 'Cybersecurity'],
  },
];

export const awards = [
  {
    id: 1,
    title: '₹50,000 Bounty — DEFY 26 University Hackathon',
    date: 'January 2026',
    project: 'ParaCipher',
    description: 'A decentralized blockchain application automating insurance payments for gig workers via smart contracts on the Shardeum network.',
    awardedBy: 'ThinkRoot Ventures × Shardeum',
    tags: ['Blockchain', 'Smart Contracts', 'DeFi', 'Shardeum'],
  },
];