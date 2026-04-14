import Link from 'next/link';
import React from 'react';

// --- Types ---
type Project = {
  id: string;
  name: string;
  description: string;
  path: string;
  accentColor: string;
};

// --- Data ---
// To extract this later: 
// 1. Create a file `src/data/projects.ts`
// 2. Export the `Project` type and `projects` array from that file
// 3. Import them here via `import { projects, type Project } from '@/data/projects'`
const projects: Project[] = [
  {
    id: 'rateministere',
    name: 'RateMinistere',
    description: 'The flagship platform and central namespace for the entire ecosystem.',
    path: '/rateministere',
    accentColor: 'bg-blue-500',
  },
  {
    id: 'caelum',
    name: 'Caelum',
    description: 'Next-generation cloud architecture and specialized developer tools.',
    path: '/caelum',
    accentColor: 'bg-indigo-500',
  },
  {
    id: 'release-panic-room',
    name: 'Release Panic Room',
    description: 'Emergency toolkit and dashboard for handling deployment disasters.',
    path: '/release-panic-room',
    accentColor: 'bg-rose-500',
  },
  {
    id: 'hidden-china-atlas',
    name: 'Hidden China Atlas',
    description: 'An interactive geographic atlas exploring undiscovered cultural sites.',
    path: '/hidden-china-atlas',
    accentColor: 'bg-amber-500',
  },
  {
    id: 'mari-msu-2026',
    name: 'Mari MSU 2026',
    description: 'Student portal, academic resources, and community hub for MSU.',
    path: '/mari-msu-2026',
    accentColor: 'bg-emerald-500',
  },
  {
    id: 'christmas-2025',
    name: 'Christmas 2025',
    description: 'Festive holiday countdowns and seasonal interactive experiences.',
    path: '/christmas-2025',
    accentColor: 'bg-red-500',
  },
  {
    id: 'code-share',
    name: 'Code Share',
    description: 'Real-time collaborative platform for sharing code snippets effortlessly.',
    path: '/code-share',
    accentColor: 'bg-violet-500',
  },
  {
    id: 'academic-tutoring',
    name: 'Academic Tutoring',
    description: 'A comprehensive platform connecting students with expert tutors.',
    path: '/academic-tutoring',
    accentColor: 'bg-cyan-500',
  },
  {
    id: 'zhich-pvp',
    name: 'Zhich PvP',
    description: 'Competitive multiplayer arena statistics and player leaderboards.',
    path: '/zhich-pvp',
    accentColor: 'bg-orange-500',
  },
  {
    id: '2d-shooter',
    name: '2D Shooter',
    description: 'Fast-paced web-based retro arcade action and survival game.',
    path: '/2d-shooter',
    accentColor: 'bg-fuchsia-500',
  },
];

// --- Components ---

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link 
      href={project.path} 
      className="group relative flex flex-col h-full outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950 rounded-2xl"
    >
      {/* Glow effect behind the card on hover */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-100 dark:from-neutral-800 dark:to-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" aria-hidden="true" />
      
      {/* Card Content */}
      <div className="relative flex flex-col h-full p-6 bg-white dark:bg-neutral-900/80 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1 overflow-hidden">
        
        {/* Playful top accent bar */}
        <div 
          className={`absolute top-0 left-0 w-full h-1 ${project.accentColor} opacity-80`} 
          aria-hidden="true"
        />
        
        <div className="flex items-center justify-between mb-4 mt-1">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {project.name}
          </h3>
          <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-neutral-800 flex items-center justify-center text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors shrink-0">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
        </div>
        
        <p className="text-gray-500 dark:text-neutral-400 leading-relaxed flex-grow text-sm sm:text-base">
          {project.description}
        </p>
      </div>
    </Link>
  );
}

// --- Main Page ---

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 font-sans selection:bg-blue-200 dark:selection:bg-blue-900/50 relative overflow-hidden">
      
      {/* Subtle Background Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 dark:bg-blue-900/10 blur-[100px]" />
        <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-purple-100/40 dark:bg-purple-900/10 blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-16 sm:py-24 md:py-32 flex flex-col min-h-screen">
        
        {/* Hero Section */}
        <header className="mb-16 md:mb-24 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 transition-transform hover:scale-105 cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            rateministere.com
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-[1.1]">
            Open Source <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-500 dark:from-blue-400 dark:to-violet-400">
              Project Hub
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-500 dark:text-neutral-400 max-w-2xl mx-auto md:mx-0 leading-relaxed">
            Welcome to the central portal for my open-source initiatives. Explore a collection of applications, tools, and creative experiments built for the modern web.
          </p>
        </header>

        {/* Projects Grid */}
        <main className="flex-grow z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </main>

        {/* Footer & About */}
        <footer className="mt-24 md:mt-32 pt-12 border-t border-gray-200 dark:border-neutral-800/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 z-10">
          <div className="max-w-md">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-3">
              About this hub
            </h2>
            <p className="text-sm text-gray-500 dark:text-neutral-400 leading-relaxed">
              This portal serves as the launchpad for all `rateministere.com` projects. 
              Each application is maintained independently but unified under this domain for easy access and discovery.
            </p>
          </div>
          <div className="text-sm text-gray-400 dark:text-neutral-500 font-medium">
            © {new Date().getFullYear()} RateMinistere. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
