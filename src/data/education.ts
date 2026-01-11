export interface EducationItem {
  degree: string;
  institution: string;
  location?: string;
  range: string;
  url?: string;
  summary?: string;
  achievements: string[];
}

export const education: EducationItem[] = [
  {
    degree: "Master's Degree in Computer Science",
    institution: 'Università degli Studi di Salerno',
    range: 'Dec 2022 — Oct 2025',
    url: 'https://web.unisa.it/en/home',
    summary: '**Final Grade:** 110/110 with honors',
    achievements: [
      'Major in Software Engineering & IT Management',
    ],
  },
  {
    degree: "Bachelor's degree in Computer Science",
    institution: 'Università degli Studi di Salerno',
    range: 'Sep 2019 — Dec 2022',
    url: 'https://web.unisa.it/en/home',
    summary: '**Final Grade:** 110/110 with honors',
    achievements: [
      '**Apple Foundation Program:** Secured admission (ranked Top 10 among 65+ applicants) to develop an AR iOS game using Swift and ARKit within a 4-week intensive framework.',
    ],
  },
];
