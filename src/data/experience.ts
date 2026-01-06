export interface Job {
  title: string;
  company: string;
  location: string;
  range: string;
  url: string;
  summary: string;
  achievements: string[];
  tech: string[];
}

export const jobs: Job[] = [
  {
    title: 'Senior Engineer',
    company: 'Company A',
    location: 'New York, NY',
    range: '2023 - Present',
    url: '#',
    summary:
      'Lead engineer delivering high-quality production code for diverse high-profile clients. Spearhead technical implementation while fostering a collaborative environment.',
    achievements: [
      'Deliver robust production code for clients like Harvard Business School and Everytown for Gun Safety.',
      'Bridge the gap between creative and engineering to transform concepts into reality.',
      'Mentor junior developers and lead knowledge-sharing sessions.',
    ],
    tech: ['TypeScript', 'React', 'Node.js', 'Accessibility'],
  },
  {
    title: 'Engineer',
    company: 'Company B',
    location: 'Remote',
    range: '2020 - 2023',
    url: '#',
    summary:
      'Developed and maintained responsive client websites, ensuring pixel-perfect execution across all devices and browsers.',
    achievements: [
      'Built and maintained sites for major clients including JetBlue and Lovesac.',
      'Ensured cross-browser compatibility and mobile responsiveness through rigorous testing.',
      'Optimized legacy codebases using modern HTML/CSS practices.',
    ],
    tech: ['HTML', 'Sass', 'JavaScript', 'jQuery'],
  },
  {
    title: 'Junior Engineer',
    company: 'Company C',
    location: 'San Francisco, CA',
    range: '2018 - 2020',
    url: '#',
    summary:
      'Architected and implemented the front-end of the company’s first mobile application, laying the groundwork for future mobile initiatives.',
    achievements: [
      'Built front-end architecture for both iOS and Android platforms.',
      'Collaborated directly with clients to translate requirements into technical solutions.',
      'Optimized application performance and responsiveness.',
    ],
    tech: ['iOS', 'Android', 'Mobile Architecture'],
  },
];
