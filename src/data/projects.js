export const projects = [
  {
    id: 'campushire',
    title: 'CAMPUSHIRE.AI',
    type: 'AI-Powered Resume & Interview Platform',
    stack: ['React', 'Python', 'NLP', 'RESTful APIs', 'Agentic AI'],
    bullets: [
      'Engineered a full-stack AI recruitment platform that automated candidate screening by architecting a high-performance FastAPI backend using PyPDF2 to map unstructured resumes into a standardized competency matrix.',
      'Automated multi-dimensional candidate evaluation workflows by integrating the Groq LPU API and Llama-3.3-70b to orchestrate a simultaneous, 3-persona multi-agent interview simulation.',
      'Achieved live behavioral profiling during mock interviews by designing a responsive React 18 workspace that utilized native Web Audio APIs and Framer Motion to calculate vocal pacing and filler-word density in real-time.',
      'Ensured high availability and prevented API crashes during hallucinated AI responses by implementing strict JSON schema validation via Pydantic and custom telemetry middleware within the RESTful architecture.'
    ],
    link: 'https://campushire-ai.vercel.app/'
  },
  {
    id: 'rag-api',
    title: 'Ragnium- A Multi-Tenant RAG API Platform',
    type: 'SaaS Platform',
    stack: ['React', 'Python', 'Docker', 'Langchain', 'ChromaDB', 'FastAPI', 'LLM'],
    bullets: [
      'Built a multi-tenant RAG-as-a-Service API serving isolated AI environments per tenant, achieving <50ms cached query response times and 97%+ retrieval accuracy, by implementing hybrid vector search with ChromaDB, tenant-scoped collections, and an in-memory SHA-256 query cache.',
      'Engineered a secure SaaS authentication system supporting JWT + API key dual-auth for N concurrent tenants with zero cross-tenant data leakage, by designing row-level tenant isolation with Supabase Auth (ES256), hashed API keys (SHA-256), and per-tenant rate limiting.',
      'Deployed an enterprise-grade RAG backend to HuggingFace Spaces, achieving highly accurate context retrieval via hybrid search (Dense Embeddings + BM25 + RRF) while ensuring security and performance through bcrypt API auth, rate limiting, and in-memory TTL caching.'
    ],
    link: 'https://multi-tenant-rag-api.vercel.app/'
  },
  {
    id: 'pricepilot',
    title: 'PRICEPILOT.AI',
    type: 'Pricing Intelligence Platform',
    stack: ['React', 'Python', 'FastAPI', 'Supabase'],
    bullets: [
      'Architected PricePilot AI: Built a full-stack pricing intelligence platform (React, FastAPI) that synthesizes competitor pricing, market trends, and demand signals to generate revenue-optimizing recommendations.',
      'Engineered Backend Pipelines: Developed high-throughput FastAPI services responsible for scalable data ingestion, demand forecasting, and executing complex pricing decision logic.',
      'Constructed Predictive Analytics: Designed a comprehensive historical analytics pipeline to perform price elasticity analysis and accurate demand prediction.',
      'Managed Cloud Database Architecture: Integrated Supabase (PostgreSQL) to securely store and query large-scale historical pricing data, seamlessly serving an executive-facing React dashboard.'
    ],
    link: 'https://github.com/goutham-751/PricePilot-AI'
  },
];

export const experience = [
  {
    id: 'itechfoundry',
    role: 'SDE Intern',
    company: 'ItechFoundry Private Limited',
    period: '06/2026 – Present',
    location: 'Remote',
    bullets: [
      'Architected KAIROS Platform: Accomplished the deployment of a highly scalable AI educational platform, as measured by the dynamic generation of 9+ distinct learning artifact types (quizzes, mind maps, etc.) across a complex 6-tier curriculum hierarchy, by architecting a Multi-LLM Provider Factory pattern in Python/FastAPI to seamlessly orchestrate Claude, OpenAI, and Groq APIs.',
      
      'Engineered Hallucination Checker Agent: Ensured high-fidelity and factually accurate AI content generation, as measured by a fully automated 4-metric scoring system that successfully blocks unverified outputs before presentation, by engineering a customized validation pipeline that cross-references LLM outputs against ground-truth source materials.',
      
      'Managed Database Architecture: Maintained strict data integrity across a deeply nested platform architecture, as measured by zero orphaned records during massive curriculum hierarchy modifications, by architecting an asynchronous PostgreSQL 16 schema utilizing SQLAlchemy 2.0 with advanced cascade-delete relationships.',
      
      'Constructed Full-Stack Interface: Delivered a highly responsive, modern frontend workspace, as measured by seamless user navigation through deep cascaded data structures and secure sandboxed iframe previews, by developing a React 19 application utilizing asynchronous state management and a custom glassmorphism design system.'
    ],

  },
  {
    id: 'igcar',
    role: 'Summer Research Intern',
    company: 'IGCAR (Indira Gandhi Centre for Atomic Research)',
    period: '06/2025 – 07/2025',
    location: 'Kalpakkam, Chennai',
    bullets: [
      'Completed internship at Indira Gandhi Centre for Atomic Research (IGCAR), Department of Atomic Energy in the Health & Industrial Safety Division.',
      'Conducted radiological data analysis for dose mapping using statistical modeling.',
      'Performed data preprocessing, spatial analysis, and anomaly detection on monitoring data.',
      'Applied descriptive statistics & trend analysis to evaluate radiation exposure patterns.',
      'Contributed to safety assessment models for industrial and healthcare environments.'
    ],
  },
  {
    id: 'vitc',
    role: 'Treasurer',
    company: 'CyberSecurity Student Community, VITC',
    period: '06/2025 – 06/2026',
    location: 'VIT Chennai',
    bullets: [
      'Handled event expenses and oversee the financial budgeting for the event.',
      'Run hands-on workshops/CTFs; oversee content for a 200+ member community.',
      'Coordinate events and mentor junior contributors in cybersecurity fundamentals.'
    ],
  },
];

export const research = {
  title: 'CalibSSL: Reliability and Calibration of Self-Supervised Neural Networks on Tabular Data (Under review)',
  period: '01/2026 – Present',
  bullets: [
    'Designed a calibration-aware training objective combining cross-entropy with entropy-based confidence penalty to reduce prediction overconfidence.',
    'Implemented ViME (Value Imputation and Mask Estimation) for self-supervised pretraining on unlabeled tabular data.',
    'Benchmarked against 6 baselines (RF, XGBoost, MLP variants) across 5 datasets and 5 label-scarcity settings (5%–100%).',
    'Built a complete experimental pipeline with statistical significance testing (paired t-tests, Wilcoxon, Friedman) and publication-ready visualizations.'
  ]
};

export const about = {
  name: 'Goutham Kumar',
  title: 'Full-Stack Developer & AI Engineer',
  summary: 'Computer science engineering student specializing in AI and machine learning with strong foundations in data structures & algorithms, statistics, and software development. Proficient in Java, Python, machine learning, agentic AI, and full-stack development. Experienced in building AI-powered applications, predictive models, REST APIs, and scalable web solutions through internships and projects.'
};