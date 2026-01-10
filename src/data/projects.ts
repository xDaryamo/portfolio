import type { ImageMetadata } from 'astro';
import retoscaImage from '../assets/projects/retosca.jpg';

export interface Project {
  title: string;
  description: string;
  tech: string[];
  date: string;
  github?: string;
  external?: string;
  image?: string | ImageMetadata;
  isPrivate?: boolean;
  privateReason?: string;
  links?: { label: string; url: string }[];
}

export const projects: Project[] = [
  {
    title: 'Homelab',
    description:
      'A personal homelab configuration and documentation repository. Managing self-hosted services, network configuration, and automation scripts.',
    tech: ['Kubernetes', 'Flux CD', 'Ansible', 'Docker', 'Linux'],
    date: '2025-01',
    github: 'https://github.com/xDaryamo/homelab',
    external: 'https://github.com/xDaryamo/homelab'
  },
  {
    title: 'Puccini TOSCA Compiler',
    description:
      'Contributed to the Go implementation of the open-source Puccini TOSCA compiler by implementing the grammar specification for TOSCA 2.0. This work involved mapping the new standard definitions into the existing codebase to enable validation of updated topology templates. Following the successful integration of my work, I was invited by the project creator to become a core maintainer of the repository.',
    tech: ['Go', 'TOSCA', 'JavaScript', 'Open Source'],
    date: '2025-10',
    github: 'https://github.com/tliron/go-puccini',
    external: 'https://github.com/tliron/go-puccini',
    links: [
      { label: 'Pull Request', url: 'https://github.com/tliron/go-puccini/pull/149' }
    ]
  },
  {
    title: 'ReTOSCA',
    description:
      'Developed a proof-of-concept (PoC) to reverse engineer Terraform (AWS) configurations into TOSCA 2.0, translating intent via a deterministic pipeline and exploring an AI (RAG) based approach.',
    tech: ['Python', 'Go', 'Terraform', 'TOSCA', 'RAG', 'AI'],
    date: '2025-10',
    github: 'https://github.com/xDaryamo/ReTOSCA',
    external: '#',
    image: retoscaImage,
    isPrivate: true,
    privateReason: 'Repo private for paper publication',
    links: [
      { label: 'Master Thesis', url: '/projects/retosca/master-thesis.pdf' },
      { label: 'Thesis Presentation', url: '/projects/retosca/presentation.pdf' }
    ]
  },
  {
    title: 'CodeSmile',
    description:
      'Machine Learning-Specific Code Smell Detection Tool. Enhanced architecture to object-oriented design and created an integrated test suite (82% coverage). Developed a microservices-based web app with an AI module for dataset augmentation to fine-tune Qwen2.5-Coder.',
    tech: ['Python', 'TypeScript', 'FastAPI', 'Docker', 'AI', 'Microservices'],
    date: '2025-02',
    github: 'https://github.com/xDaryamo/smell_ai',
    external: 'https://github.com/xDaryamo/smell_ai',
    links: [
      { label: 'Presentation', url: '/projects/codesmile/presentation.pdf' }
    ]
  },
  {
    title: 'Shenron 3 CTF',
    description:
      'Penetration Testing & Vulnerability Assessment. Executed a black-box penetration test on the Shenron 3 virtual machine using tools like Nmap, Nikto, OWASP ZAP, and WPScan. Produced a detailed remediation report with prioritized recommendations.',
    tech: ['Penetration Testing', 'Linux', 'Network Security', 'Vulnerability Assessment'],
    date: '2024-10',
    external: 'https://www.vulnhub.com/entry/shenron-3,682/',
    links: [
      { label: 'Presentation', url: '/projects/shenron-3/presentation.pdf' },
      { label: 'Summary', url: '/projects/shenron-3/summary.pdf' },
      { label: 'Report', url: '/projects/shenron-3/report.pdf' }
    ]
  },
  {
    title: 'MedChain',
    description:
      'Implemented a permissioned blockchain network with Hyperledger Fabric and HL7 FHIR standards for secure healthcare data management. Streamlined deployment using Fablo for automated configuration.',
    tech: ['Go', 'React', 'Docker', 'Blockchain', 'Hyperledger Fabric', 'Node.js'],
    date: '2024-07',
    github: 'https://github.com/xDaryamo/MedChain',
    external: 'https://github.com/xDaryamo/MedChain',
    links: [
      { label: 'Presentation', url: '/projects/medchain/presentation.pdf' },
    ]
  },
  {
    title: 'Marmolada Glacier Analysis',
    description:
      'Analyzed Marmolada Glacier melting trends (1985-2020) using GIS and remote sensing. Linked glacier changes to climate data (temperature and precipitation) using Google Earth Engine and ERA5 datasets.',
    tech: ['Google Earth Engine', 'QGIS', 'Python', 'Remote Sensing'],
    date: '2024-02',
    github: 'https://github.com/LucoMoro/Marmolada-Glacier-Melting-Analysis',
    external: 'https://github.com/LucoMoro/Marmolada-Glacier-Melting-Analysis',
    links: [
      { label: 'Report', url: '/projects/marmolada/report.pdf' },
      { label: 'Presentation', url: '/projects/marmolada/presentation.pdf' },
    ]
  },
  {
    title: 'beehAIve',
    description:
      'Co-led development of an AI-driven web app for beehive monitoring, integrating ML for predictive analytics on bee health (83% accuracy). Managed the project using Scrum methodology.',
    tech: ['Project Management', 'Scrum', 'Software Development', 'AI', 'Python'],
    date: '2024-01',
    github: 'https://github.com/XJustUnluckyX/beehAIve',
    external: 'https://github.com/XJustUnluckyX/beehAIve',
    links: [
      { label: 'Presentations', url: 'https://drive.google.com/drive/u/2/folders/1LRugpbhaU0F-XmvlSPzlSKPXn-wo-VL_' },
      { label: 'Video Demo', url: '/projects/beeh-aive/demo.mp4' },
    ]
  },
  {
    title: 'Apache Commons Validator',
    description:
      'Software Dependability Analysis. Boosted dependability with static analysis (SonarCloud), CI/CD enhancements, refactoring, and EcoCode. Achieved a 13% boost in test coverage.',
    tech: ['Java', 'Docker', 'SonarCloud', 'CI/CD'],
    date: '2023-09',
    github: 'https://github.com/xDaryamo/commons-validator',
    external: 'https://github.com/xDaryamo/commons-validator',
    links: [
      { label: 'Report', url: '/projects/commons-validator/report.pdf' },
      { label: 'Presentation', url: '/projects/commons-validator/presentation.pdf' }
    ]
  },
  {
    title: 'NewLang Compiler',
    description:
      'Developed a Java-based compiler for NewLang, utilizing JFlex for lexical analysis and JavaCup for syntactic parsing. Implemented semantic checks and code generation logic for translation to C.',
    tech: ['Java', 'C', 'JFlex', 'JavaCUP', 'Compiler Design'],
    date: '2023-02',
    github: 'https://github.com/xDaryamo/NewLang-Compiler',
    external: 'https://github.com/xDaryamo/NewLang-Compiler'
  },
  {
    title: 'NFR Security Extraction',
    description:
      'Bachelor\'s Degree Thesis. Developed a tool to automatically extract and classify non-functional security requirements from documents using NLP and machine learning (TF-IDF, Hugging Face).',
    tech: ['Python', 'NLP', 'Machine Learning', 'Jupyter', 'AI'],
    date: '2022-12',
    github: 'https://github.com/xDaryamo/NFR-Security-Extraction-Classification',
    external: 'https://github.com/xDaryamo/NFR-Security-Extraction-Classification',
    links: [
      { label: 'Thesis', url: '/projects/nfr-security/bachelor-thesis.pdf' },
      { label: 'Presentation', url: '/projects/nfr-security/presentation.pdf' },
    ]
  },
  {
    title: 'AiRHockey',
    description:
      'Developed a 1v1 AR AirHockey iOS game using Swift and ARKit, enabling AR gaming between two devices.',
    tech: ['Swift', 'ARKit', 'iOS', 'Augmented Reality'],
    date: '2022-08',
    github: 'https://github.com/AurySepe/AiRHockey',
    external: 'https://github.com/AurySepe/AiRHockey'
  },
  {
    title: 'MoneyArt',
    description:
      'Digital art auction platform. Deployed Java and Solidity for smart contracts on Ethereum. Collaborated in the full lifecycle from requirements analysis to deployment and testing.',
    tech: ['Java', 'Solidity', 'Ethereum', 'JavaScript', 'Smart Contracts'],
    date: '2022-01',
    github: 'https://github.com/luigi-bozzoli/MoneyArt',
    external: 'https://github.com/luigi-bozzoli/MoneyArt',
    links: [
      { label: 'Presentation', url: '/projects/moneyart/presentation.pdf' },
      { label: 'Video Demo', url: '/projects/moneyart/demo.mp4' },
    ]
  }
];
