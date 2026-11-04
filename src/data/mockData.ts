import type {
  ResumeSection,
  ResumeData,
  PortfolioProjectCard,
} from '../types/resume'

/**
 * Default Dummy Data Persona: Mohammed Shaheen
 * Senior Full-Stack Engineer from Ernakulam, Kerala, living in Bangalore, Karnataka.
 */

export const DEFAULT_SECTIONS: ResumeSection[] = [
  {
    id: 'profile',
    name: 'Profile & Contact',
    description: 'Personal details, title, and contact methods',
    iconName: 'User',
    isEnabled: true,
    column: 'sidebar',
  },
  {
    id: 'experience',
    name: 'Work Experience',
    description: 'Career history, key roles, and major achievements',
    iconName: 'Briefcase',
    isEnabled: true,
    column: 'main',
  },
  {
    id: 'projects',
    name: 'Featured Projects',
    description: 'Notable applications, open source, and web systems',
    iconName: 'FolderGit2',
    isEnabled: true,
    column: 'main',
  },
  {
    id: 'skills',
    name: 'Skills & Tech Stack',
    description: 'Core competencies, frameworks, and proficiencies',
    iconName: 'Cpu',
    isEnabled: true,
    column: 'sidebar',
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Academic background, university degrees, and coursework',
    iconName: 'GraduationCap',
    isEnabled: true,
    column: 'sidebar',
  },
  {
    id: 'certifications',
    name: 'Certifications & Honors',
    description: 'Industry credentials, licenses, and recognitions',
    iconName: 'Award',
    isEnabled: true,
    column: 'sidebar',
  },
]

export const MOCK_RESUME_DATA: ResumeData = {
  profile: {
    fullName: 'Mohammed Shaheen',
    headline: 'Senior Full-Stack Engineer & Cloud Systems Architect',
    email: 'mohammed.shaheen@devmail.io',
    phone: '+91 98460 12345',
    location: 'Bangalore, Karnataka (Hometown: Ernakulam, Kerala)',
    website: 'https://mohammedshaheen.dev',
    github: 'https://github.com/mohammedshaheen',
    linkedin: 'https://linkedin.com/in/mohammed-shaheen-dev',
    summary:
      'Product-minded Senior Full-Stack Engineer originally from Ernakulam, Kerala, currently based in Bangalore with 6+ years of experience designing scalable distributed web platforms, high-throughput cloud microservices, and reactive user interfaces. Proficient in TypeScript, React, Next.js, Node.js, Go, and AWS cloud infrastructure with a deep commitment to clean architecture and developer ergonomics.',
    avatarUrl: `${import.meta.env.BASE_URL}shaheen.jpg`,
    industry: 'software',
    cadTools: 'AutoCAD Electrical, MATLAB & Simulink, IoT Embedded Firmware',
    engineeringLicense: 'Chartered Engineer (IEI India #CE-94021) | IEEE Member',
    kaggleOrHuggingFace: 'https://huggingface.co/mohammedshaheen',
    figmaOrDribbble: 'https://figma.com/@mohammedshaheen',
    teamSizeOrBudget: '16 Engineers across Bangalore & Kochi | $4.2M Cloud Infra Budget',
  },
  experience: [
    {
      id: 'exp-1',
      company: 'Zephyr Cloud Technologies',
      role: 'Senior Full-Stack Architect',
      location: 'Bangalore, Karnataka',
      startDate: '2022',
      endDate: 'Present',
      current: true,
      description:
        'Directing the core edge-computing platform engineering squad serving over 35M daily API requests for high-growth enterprise clients across India and APAC.',
      highlights: [
        'Spearheaded migration to a zero-downtime multi-region Kubernetes cluster on AWS (EKS), cutting operational cloud spend by 28%.',
        'Reduced p99 GraphQL API latency by 45% through optimized Redis caching layers and Golang microservices.',
        'Mentored 10 mid-level and junior engineers, championing TypeScript strict mode and automated CI/CD gating.',
      ],
    },
    {
      id: 'exp-2',
      company: 'Infinita FinTech Systems',
      role: 'Full-Stack Software Engineer',
      location: 'Bangalore, Karnataka',
      startDate: '2020',
      endDate: '2022',
      current: false,
      description:
        'Architected real-time transaction reconciliation dashboards and payment gateway integrations handling high-concurrency merchant settlements.',
      highlights: [
        'Engineered high-frequency settlement service processing 100k+ transactions per minute with 99.99% uptime.',
        'Built an internal React component system with accessible design tokens adopted across 6 cross-functional product squads.',
        'Implemented automated Docker container pipelines reducing deployment cycles from 45 minutes to 6 minutes.',
      ],
    },
    {
      id: 'exp-3',
      company: 'Kochi CyberPark Innovations',
      role: 'Associate Software Engineer',
      location: 'Ernakulam, Kerala',
      startDate: '2018',
      endDate: '2020',
      current: false,
      description:
        'Engineered client-facing SaaS web applications and RESTful microservices using modern TypeScript, React, and Node.js.',
      highlights: [
        'Developed responsive customer analytics dashboards with live WebSocket telemetry graphs.',
        'Optimized PostgreSQL queries, indices, and schemas, reducing median query execution times by 40%.',
      ],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'OmniFlow - Visual Workflow Engine',
      description:
        'An open-source node-based automation orchestrator for microservices and data pipelines with real-time websocket monitoring and automated error remediation.',
      technologies: ['TypeScript', 'React', 'Tailwind CSS', 'Go', 'Redis', 'Docker'],
      liveUrl: 'https://omniflow-demo.dev',
      githubUrl: 'https://github.com/mohammedshaheen/omniflow',
    },
    {
      id: 'proj-2',
      name: 'PulseVector AI Observability',
      description:
        'Real-time token cost, embedding drift, and latency streaming observability suite for distributed multi-model LLM inference endpoints.',
      technologies: ['Next.js', 'FastAPI', 'Python', 'Tailwind CSS', 'PostgreSQL'],
      liveUrl: 'https://pulsevector.dev',
      githubUrl: 'https://github.com/mohammedshaheen/pulse-vector',
    },
    {
      id: 'proj-3',
      name: 'PayKiosk UPI Payment Mesh',
      description:
        'Ultra-low latency payment aggregation microservice supporting UPI dynamic QR generation, webhook fan-out, and automated ledger reconciliation.',
      technologies: ['Go', 'Kafka Protocols', 'PostgreSQL', 'Redis', 'Docker'],
      liveUrl: 'https://paykiosk.dev',
      githubUrl: 'https://github.com/mohammedshaheen/paykiosk',
    },
    {
      id: 'proj-4',
      name: 'Zenith UI Component Kit',
      description:
        'Accessible, ultra-lightweight React component primitive library with integrated dark-mode theming tokens, zero runtime dependencies, and WAI-ARIA compliance.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Storybook'],
      liveUrl: 'https://zenith-ui.dev',
      githubUrl: 'https://github.com/mohammedshaheen/zenith-ui',
    },
  ],
  skills: [
    {
      id: 'cat-1',
      categoryName: 'Languages & Core',
      skills: ['TypeScript', 'JavaScript (ESNext)', 'Go (Golang)', 'Python', 'SQL (PostgreSQL)', 'HTML5 / CSS3', 'Bash Scripting'],
    },
    {
      id: 'cat-2',
      categoryName: 'Frameworks & Libraries',
      skills: ['React 19', 'Next.js App Router', 'Node.js', 'Express', 'Tailwind CSS', 'Zustand', 'GraphQL', 'Vite'],
    },
    {
      id: 'cat-3',
      categoryName: 'Cloud & Infrastructure',
      skills: ['AWS (ECS, Lambda, S3, RDS)', 'Docker', 'Kubernetes', 'Redis', 'Apache Kafka', 'Terraform', 'GitHub Actions'],
    },
    {
      id: 'cat-4',
      categoryName: 'Architecture & Paradigms',
      skills: ['Microservices Architecture', 'Distributed Systems', 'REST & gRPC APIs', 'CI/CD Pipelines', 'Test-Driven Development'],
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'Cochin University of Science and Technology (CUSAT), Ernakulam',
      degree: 'Bachelor of Technology (B.Tech) in Computer Science & Engineering',
      fieldOfStudy: 'Distributed Systems, Cloud Architectures & Software Engineering',
      startDate: '2014',
      endDate: '2018',
      gpa: '8.8 / 10.0 CGPA (First Class with Distinction)',
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      title: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      issueDate: '2023',
      credentialUrl: 'https://aws.amazon.com/verification',
    },
    {
      id: 'cert-2',
      title: 'Certified Kubernetes Application Developer (CKAD)',
      issuer: 'Cloud Native Computing Foundation (CNCF)',
      issueDate: '2022',
      credentialUrl: 'https://cncf.io/verification',
    },
  ],
  customSections: {},
}

export const MOCK_PORTFOLIO_CARDS: PortfolioProjectCard[] = [
  {
    id: 'port-1',
    title: 'OmniFlow Visual Automation Canvas',
    description:
      'Node-based microservice orchestrator with live WebSocket execution graphs, drag-and-drop workflow pipelines, and automated error remediation.',
    imageUrl:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Go', 'WebSockets'],
    linkUrl: 'https://github.com/mohammedshaheen/omniflow',
    badge: 'Open Source',
  },
  {
    id: 'port-2',
    title: 'PulseVector AI Observability Suite',
    description:
      'Real-time token cost, embedding drift, and latency streaming observability suite for distributed multi-model LLM clusters with live telemetry graphs.',
    imageUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    tags: ['Next.js', 'FastAPI', 'Tailwind CSS', 'PostgreSQL', 'Redis'],
    linkUrl: 'https://github.com/mohammedshaheen/pulse-vector',
    badge: 'SaaS Platform',
  },
  {
    id: 'port-3',
    title: 'PayKiosk UPI Payment Mesh',
    description:
      'High-throughput payment aggregation microservice handling dynamic QR code generation, webhook fan-out, and sub-100ms merchant settlements.',
    imageUrl:
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    tags: ['Go', 'Kafka', 'PostgreSQL', 'Redis', 'Docker'],
    linkUrl: 'https://github.com/mohammedshaheen/paykiosk',
    badge: 'FinTech',
  },
  {
    id: 'port-4',
    title: 'Zenith UI Primitive & Design System',
    description:
      'Zero-dependency accessible component library featuring strict WAI-ARIA compliance, tokenized design primitives, and seamless dark-mode theming.',
    imageUrl:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    tags: ['Design System', 'Figma', 'TypeScript', 'Tailwind CSS'],
    linkUrl: 'https://github.com/mohammedshaheen/zenith-ui',
    badge: 'Design System',
  },
]

// Aliases matching store convention
export const INITIAL_RESUME_DATA = MOCK_RESUME_DATA
export const INITIAL_PORTFOLIO_CARDS = MOCK_PORTFOLIO_CARDS

export default {
  DEFAULT_SECTIONS,
  MOCK_RESUME_DATA,
  INITIAL_RESUME_DATA,
  MOCK_PORTFOLIO_CARDS,
  INITIAL_PORTFOLIO_CARDS,
}
