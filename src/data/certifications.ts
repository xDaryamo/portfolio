import type { ImageMetadata } from 'astro';
import rha294Image from '../assets/certs/rha-294.png';
import rha104Image from '../assets/certs/rha-104.png';

export interface CertificationItem {
  title: string;
  issuer: string;
  id?: string;
  date: string;
  url?: string;
  attachment?: string;
  image?: ImageMetadata;
}

export const certifications: CertificationItem[] = [
  {
    title: 'Red Hat Enterprise Linux Automation with Ansible',
    issuer: 'Red Hat',
    id: 'RH294 - RHA (Ver. 9.0)',
    date: 'Jan 2026',
    url: '/certs/rha294.pdf',
    attachment: '/certs/rha294.pdf',
    image: rha294Image,
  },
  {
    title: 'Getting Started with Linux Fundamentals',
    issuer: 'Red Hat',
    id: 'RH104 - RHA (Ver. 9.1)',
    date: 'Nov 2025',
    url: '/certs/rha104.pdf',
    attachment: '/certs/rha104.pdf',
    image: rha104Image,
  },
];
