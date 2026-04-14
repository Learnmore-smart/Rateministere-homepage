import Link from 'next/link';
import React from 'react';

// --- Types ---
type Project = {
  id: string;
  name: string;
  description: string;
  path: string;
  year: string;
};

// --- Data ---
const projects: Project[] = [
  { id: 'hidden-china-atlas', name: 'Hidden China Atlas', description: 'An interactive geographic atlas exploring undiscovered cultural sites.', path: '/hidden-china-atlas', year: '2026' },
  { id: 'release-panic-room', name: 'Release Panic Room', description: 'Emergency toolkit and dashboard for handling deployment disasters.', path: '/release-panic-room', year: '2026' },
  { id: 'rateministere', name: 'RateMinistere', description: 'The flagship platform and central namespace for the entire ecosystem.', path: '/rateministere', year: '2026' },
  { id: 'caelum', name: 'Caelum', description: 'Next-generation cloud architecture and specialized developer tools.', path: '/caelum', year: '2026' },
  { id: 'mari-msu-2026', name: 'Mari MSU 2026', description: 'Student portal, academic resources, and community hub for MSU.', path: '/mari-msu-2026', year: '2026' },
  { id: 'christmas-2025', name: 'Christmas 2025', description: 'Festive holiday countdowns and seasonal interactive experiences.', path: '/christmas-2025', year: '2025' },
  { id: 'code-share', name: 'Code Share', description: 'Real-time collaborative platform for sharing code snippets effortlessly.', path: '/code-share', year: '2025' },
  { id: 'academic-tutoring', name: 'Academic Tutoring', description: 'A comprehensive platform connecting students with expert tutors.', path: '/academic-tutoring', year: '2025' },
  { id: 'zhich-pvp', name: 'Zhich PvP', description: 'Competitive multiplayer arena statistics and player leaderboards.', path: '/zhich-pvp', year: '2026' },
  { id: '2d-shooter', name: '2D Shooter', description: 'Fast-paced web-based retro arcade action and survival game.', path: '/2d-shooter', year: '2026' },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative grid-lines">
      {/* Top Banner for LearnX */}
      <div className="w-full bg-primary text-background border-b border-border flex justify-between items-center px-4 py-3 font-body text-xs md:text-sm uppercase tracking-widest sticky top-0 z-50 shadow-sm">
        <span className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-background opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-background"></span>
          </span>
          Ongoing Project
        </span>
        <a 
          href="https://www.learnx.pro" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <span className="font-bold">LearnX</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative w-full flex-grow flex flex-col justify-center min-h-[85svh] px-4 md:px-8 py-20 border-b border-border overflow-hidden">
        {/* Abstract typography background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.02] select-none">
          <h1 className="font-display text-[20vw] leading-none whitespace-nowrap">INDEX SYSTEM</h1>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex items-start gap-4 animate-reveal-up">
            <span className="text-primary font-display text-4xl md:text-6xl leading-none mt-2">01</span>
            <div>
              <h2 className="font-body text-xs md:text-sm tracking-[0.3em] text-muted uppercase mb-4 md:mb-6 font-bold">Central Namespace</h2>
              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold leading-[0.85] tracking-tighter uppercase text-text">
                Rate<br/>Ministere
              </h1>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-16 md:mt-24 animate-reveal-up delay-200">
            <div className="md:col-span-5 md:col-start-8 flex flex-col gap-8">
              <p className="font-body text-sm md:text-base leading-relaxed text-muted font-medium">
                The flagship platform and central namespace for our entire ecosystem. Next-generation tools, platforms, and interactive experiences crafted with absolute precision.
              </p>
              <a 
                href="#projects" 
                className="inline-flex items-center justify-between px-8 py-5 border border-border bg-surface hover:bg-primary hover:text-background hover:border-primary transition-all duration-300 group uppercase font-body text-sm font-bold tracking-widest w-full sm:w-auto shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] hover:shadow-[0px_0px_0px_0px_rgba(17,17,17,1)] hover:translate-y-1 hover:translate-x-1"
              >
                Explore Index
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Project Index */}
      <section id="projects" className="w-full relative bg-background">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-4 p-6 md:p-8 lg:p-12 border-b md:border-b-0 md:border-r border-border flex flex-col justify-between sticky top-[48px] md:h-[calc(100vh-48px)]">
              <div className="animate-reveal-up delay-300">
                <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6 uppercase">Directory</h2>
                <p className="font-body text-sm text-muted leading-relaxed max-w-sm">A comprehensive directory of applications, tools, and creative experiments built for the modern web.</p>
              </div>
              <div className="font-body text-xs text-muted uppercase tracking-widest mt-12 md:mt-0 font-bold">
                [{projects.length} Entries Available]
              </div>
            </div>
            
            <div className="md:col-span-8 animate-reveal-up delay-400">
              {projects.map((project, idx) => (
                <Link 
                  key={project.id} 
                  href={project.path}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 md:p-8 lg:p-12 border-b border-border last:border-b-0 hover:bg-surface transition-colors duration-200"
                >
                  <div className="flex items-start gap-6 md:gap-8">
                    <span className="font-body text-xs font-bold text-muted/40 mt-1 md:mt-2 group-hover:text-primary transition-colors">
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl md:text-4xl font-bold uppercase group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <p className="font-body text-xs md:text-sm text-muted mt-3 max-w-md leading-relaxed group-hover:text-text transition-colors">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8 mt-8 sm:mt-0 self-start sm:self-auto ml-10 sm:ml-0">
                    <span className="font-body text-xs font-bold text-muted group-hover:text-primary transition-colors">[{project.year}]</span>
                    <div className="w-12 h-12 rounded-none border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-background transition-all duration-300 transform group-hover:-rotate-45">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-border text-background p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 font-body text-xs uppercase tracking-widest font-bold">
        <div className="flex items-center gap-4">
          <span className="text-primary">RateMinistere</span>
          <span className="opacity-50">//</span>
          <span>System Active</span>
        </div>
        <div className="opacity-50">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </footer>
    </main>
  );
}
