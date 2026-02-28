export const projects = [
  {
    id: 1,
    title: "CAMPUSHIRE.AI",
    subtitle: "AI-Powered Resume & Interview Platform",
    description: "Full-stack web app using React and FastAPI that leverages Groq AI and spaCy NLP to intelligently parse resumes, perform ATS scoring against job descriptions, and generate personalized interview questions. Features voice-based interview simulations, resume optimization feedback, and automated technical assessment generation.",
    techStack: ["React", "Python", "FastAPI", "Groq AI", "spaCy NLP", "Speech Recognition"],
    githubLink: "https://github.com/goutham-751/CAMPUSHIRE.AI1",
    demoLink: "https://github.com/goutham-751/CAMPUSHIRE.AI1",
    color: "#7c3aed",
    icon: "🚀"
  },
  {
    id: 2,
    title: "PricePilot AI",
    subtitle: "Pricing Intelligence Platform",
    description: "Full-stack pricing intelligence platform that analyzes competitor pricing, market trends, and demand signals to generate revenue-optimizing price recommendations. FastAPI services for data ingestion, forecasting, and decision logic with a React dashboard. Historical analytics pipeline for demand prediction and price elasticity analysis with Supabase DB.",
    techStack: ["React", "Python", "FastAPI", "Supabase", "Machine Learning"],
    githubLink: "https://github.com/goutham-751/PricePilot-AI",
    demoLink: "https://github.com/goutham-751/PricePilot-AI",
    color: "#06b6d4",
    icon: "📊"
  },
  {
    id: 3,
    title: "Predictive Maintenance",
    subtitle: "Industrial Machine Failure Prediction",
    description: "End-to-end predictive maintenance system using machine learning to predict machine failure and estimate remaining useful life (RUL) from sensor data. Applied classification and regression with class-imbalance handling. FastAPI backend + interactive Streamlit dashboard for real-time and batch predictions.",
    techStack: ["Python", "Streamlit", "FastAPI", "Machine Learning", "Sensor Data"],
    githubLink: "https://github.com/goutham-751/Predictive-Maintenance-of-Industrial-Machines-Using-Sensor-Based-Failure-Prediction",
    demoLink: "https://github.com/goutham-751/Predictive-Maintenance-of-Industrial-Machines-Using-Sensor-Based-Failure-Prediction",
    color: "#f59e0b",
    icon: "⚙️"
  },
  {
    id: 4,
    title: "Neural Network Research",
    subtitle: "Reliability & Calibration of Self-Supervised NNs",
    description: "Ongoing research on reliability and calibration of self-supervised neural networks on tabular data. Investigating how uncertainty quantification and calibration techniques improve model trustworthiness in real-world deployments. Research-grade implementation exploring novel methodologies for tabular ML.",
    techStack: ["Python", "PyTorch", "Research", "TensorFlow", "Tabular ML"],
    githubLink: "https://github.com/goutham-751/Reliability-and-Calibration-of-Self-supervised-Neural-networks-on-Tabular-data-",
    demoLink: "https://github.com/goutham-751/Reliability-and-Calibration-of-Self-supervised-Neural-networks-on-Tabular-data-",
    color: "#ec4899",
    icon: "🧠"
  }
];

export const skills = {
  languages: ["Python", "JavaScript", "Java", "C/C++", "SQL", "R"],
  frameworks: ["React", "Streamlit", "FastAPI"],
  tools: ["AWS", "GitHub", "Docker", "VS Code", "PyCharm"],
  libraries: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Bootstrap", "TensorFlow"]
};

export const experience = [
  {
    id: 1,
    role: "Research Intern",
    org: "IGCAR — Indira Gandhi Centre for Atomic Research",
    period: "Jun 2025 – Jul 2025",
    location: "Kalpakkam, Chennai",
    points: [
      "Worked in the Health & Industrial Safety Division, Dept. of Atomic Energy",
      "Performed dose mapping and radiological safety assessment through data collection and preprocessing",
      "Applied descriptive statistics for trend and variability analysis in radiological monitoring data"
    ]
  },
  {
    id: 2,
    role: "Treasurer, CyberSecurity Student Community",
    org: "Vellore Institute of Technology, Chennai",
    period: "Jun 2025 – Present",
    location: "Chennai",
    points: [
      "Handle event expenses and oversee financial budgeting for 200+ member community",
      "Run hands-on workshops and CTFs; oversee educational content",
      "Coordinate events and mentor junior contributors in cybersecurity fundamentals"
    ]
  }
];

export const awards = [
  {
    id: 1,
    title: "Bounty Award — DEFY 26 Hackathon",
    org: "ThinkRoot Ventures & Shardeum",
    prize: "₹50,000 Bounty",
    description: "Won at DEFY 26 University Hackathon for ParaCipher — a decentralized blockchain application automating insurance payments for gig workers through smart contracts."
  }
];