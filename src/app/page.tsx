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
  { id: 'rateministere', name: 'RateMinistere', description: 'The flagship platform and central namespace for the entire ecosystem.', path: '/rateministere', year: '2026' },
  { id: 'caelum', name: 'Caelum', description: 'Next-generation cloud architecture and specialized developer tools.', path: '/caelum', year: '2026' },
  { id: 'release-panic-room', name: 'Release Panic Room', description: 'Emergency toolkit and dashboard for handling deployment disasters.', path: '/release-panic-room', year: '2026' },
  { id: 'hidden-china-atlas', name: 'Hidden China Atlas', description: 'An interactive geographic atlas exploring undiscovered cultural sites.', path: '/hidden-china-atlas', year: '2026' },
  { id: 'mari-msu-2026', name: 'Mari MSU 2026', description: 'Student portal, academic resources, and community hub for MSU.', path: '/mari-msu-2026', year: '2026' },
  { id: 'christmas-2025', name: 'Christmas 2025', description: 'Festive holiday countdowns and seasonal interactive experiences.', path: '/christmas-2025', year: '2025' },
  { id: 'code-share', name: 'Code Share', description: 'Real-time collaborative platform for sharing code snippets effortlessly.', path: '/code-share', year: '2025' },
  { id: 'academic-tutoring', name: 'Academic Tutoring', description: 'A comprehensive platform connecting students with expert tutors.', path: '/academic-tutoring', year: '2025' },
  { id: 'zhich-pvp', name: 'Zhich PvP', description: 'Competitive multiplayer arena statistics and player leaderboards.', path: '/zhich-pvp', year: '2026' },
  { id: '2d-shooter', name: '2D Shooter', description: 'Fast-paced web-based retro arcade action and survival game.', path: '/2d-shooter', year: '2026' },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-white selection:bg-primary selection:text-white">
      {/* Hero Section */}
      <section className="relative w-full h-[100svh] min-h-[600px] flex flex-col justify-end p-6 md:p-12 lg:p-24 overflow-hidden">
        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl pb-12 md:pb-0">
          <p className="text-primary font-bold tracking-widest uppercase text-sm md:text-base mb-6 flex items-center gap-3 animate-reveal">
            <span className="w-8 h-[2px] bg-primary"></span>
            RateMinistere
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-8 animate-reveal delay-100">
            Digital craftsmanship <br />
            <span className="text-muted/80 italic font-normal">in the open.</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center animate-reveal delay-200">
            <p className="text-lg md:text-xl text-muted max-w-xl font-body font-light leading-relaxed">
              The flagship platform and central namespace for our entire ecosystem. Next-generation tools, platforms, and interactive experiences.
            </p>
            <a 
              href="#projects" 
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primary-hover transition-colors duration-300 flex-shrink-0 group"
            >
              Explore Index
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Project Index */}
      <section id="projects" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 animate-reveal delay-300">
            <div>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">Index</h2>
              <p className="text-muted max-w-md font-light">A comprehensive directory of applications, tools, and creative experiments built for the modern web.</p>
            </div>
            <div className="text-sm font-mono text-muted uppercase tracking-widest">
              {projects.length} Projects Total
            </div>
          </div>

          <div className="border-t border-border">
            {projects.map((project, idx) => (
              <Link 
                key={project.id} 
                href={project.path}
                className="group flex flex-col md:flex-row md:items-center justify-between py-8 md:py-10 border-b border-border hover:border-primary transition-colors duration-500"
              >
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 w-full md:w-2/3">
                  <span className="font-mono text-xs md:text-sm text-muted/40 group-hover:text-primary transition-colors w-8">
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl md:text-4xl font-semibold group-hover:text-primary transform group-hover:translate-x-2 transition-all duration-500">
                      {project.name}
                    </h3>
                    <p className="text-muted font-light text-sm md:text-base mt-3 md:mt-2 line-clamp-2 md:line-clamp-1 transform group-hover:translate-x-2 transition-all duration-500 delay-75">
                      {project.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between md:justify-end gap-8 mt-6 md:mt-0 w-full md:w-1/3">
                  <span className="font-mono text-sm text-muted/60">{project.year}</span>
                  <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-500 transform group-hover:-rotate-45">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 lg:px-24 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 bg-background">
        <p className="font-display font-bold text-xl tracking-tight">RateMinistere</p>
        <p className="text-sm text-muted font-light">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </footer>
    </main>
  );
}