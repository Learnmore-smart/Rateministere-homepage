"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';

// --- Types ---
type LocalizedString = {
  en: string;
  zh: string;
};

type Project = {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  path: string;
  year: string;
};

// --- Data ---
const projects: Project[] = [
  { id: 'hidden-china-atlas', name: { en: 'Hidden China Atlas', zh: '隐藏中国地图集' }, description: { en: 'An interactive geographic atlas exploring undiscovered cultural sites.', zh: '一个探索未发现文化遗址的互动地理图集。' }, path: '/hidden-china-atlas', year: '2026' },
  { id: 'release-panic-room', name: { en: 'Release Panic Room', zh: '发布恐慌室' }, description: { en: 'A game to stimulate last minute stress and find your character.', zh: '一款刺激最后一刻压力并寻找你角色的游戏。' }, path: '/release-panic-room', year: '2026' },
  { id: 'rateministere', name: { en: 'RateMinistere', zh: 'RateMinistere' }, description: { en: 'A voting teacher platform - I got called by director and got my graduate speech (I was selected) cancelled.', zh: '一个教师投票平台 - 我被校长叫去谈话，导致我（被选中的）毕业演讲被取消了' }, path: '/rateministere', year: '2026' },
  { id: 'caelum', name: { en: 'Caelum', zh: 'Caelum' }, description: { en: 'Windows Note taking app.', zh: 'Windows 笔记应用程序。' }, path: '/caelum', year: '2026' },
  { id: 'mari-msu-2026', name: { en: 'Mari MSU 2026', zh: 'Mari MSU 2026' }, description: { en: 'Student Portal Design.', zh: '学生门户网站设计。' }, path: '/mari-msu-2026', year: '2026' },
  { id: 'christmas-2025', name: { en: 'Christmas 2025', zh: '2025年圣诞节' }, description: { en: 'Festive holiday countdowns and seasonal interactive experiences.', zh: '节日倒计时和季节性互动体验。' }, path: '/christmas-2025', year: '2025' },
  { id: 'code-share', name: { en: 'Code Share', zh: '代码分享' }, description: { en: 'Trae Invite code share system...', zh: 'Trae 邀请码分享系统...' }, path: '/code-share', year: '2025' },
  { id: 'academic-tutoring', name: { en: 'Academic Tutoring', zh: '学术辅导' }, description: { en: "A landing page connecting students and expert tutors. it's just a landing page...", zh: "连接学生和专家导师的landing page。it's just landing page..." }, path: '/academic-tutoring', year: '2025' },
  { id: 'zhich-pvp', name: { en: 'Zhich PvP', zh: 'Zhich PvP' }, description: { en: 'Competitive multiplayer arena statistics and player leaderboards.', zh: '竞技多人竞技场统计和玩家排行榜。' }, path: '/zhich-pvp', year: '2026' },
  { id: '2d-shooter', name: { en: '2D Shooter', zh: '2D射击游戏' }, description: { en: '2D simple shooting game.', zh: '2D简单射击游戏。' }, path: '/2d-shooter', year: '2026' },
];

const dict = {
  en: {
    ongoing: "STATUS: AVAILABLE",
    indexSystem: "LEARNMORE_SMART",
    centralNamespace: "Software Developer",
    title: ["Learnmore_", "smart"],
    description: "Software Developer, Creator of LearnX, and Content Creator. I build tools, platforms, and interactive experiences crafted with precision.",
    explore: "./view_projects.sh",
    directory: "ls -la ./projects",
    directoryDesc: "A collection of applications, tools, and creative experiments built for the modern web.",
    entriesAvailable: "Projects Available",
    systemActive: "Montreal, QC",
    rights: "All rights reserved.",
    switchLang: "lang=zh",
    socials: "Social Links",
    connect: "Connect",
    featuredTitle: "cat ./featured_ventures.md",
    background: "whoami --background",
    techSkills: "cat ./skills.json",
    interests: "cat ./interests.txt"
  },
  zh: {
    ongoing: "STATUS: 欢迎合作",
    indexSystem: "LEARNMORE_SMART",
    centralNamespace: "软件开发者",
    title: ["Learnmore_", "smart"],
    description: "软件开发者、LearnX 创始人、内容创作者。我致力于打造精密的工具、平台和互动体验。",
    explore: "./view_projects.sh",
    directory: "ls -la ./projects",
    directoryDesc: "为现代网络构建的应用程序、工具和创意实验的集合。",
    entriesAvailable: "个项目",
    systemActive: "魁北克省蒙特利尔",
    rights: "版权所有。",
    switchLang: "lang=en",
    socials: "社交链接",
    connect: "联系我",
    featuredTitle: "cat ./featured_ventures.md",
    background: "whoami --background",
    techSkills: "cat ./skills.json",
    interests: "cat ./interests.txt"
  }
};

const TerminalHeader = () => (
  <div className="terminal-header">
    <div className="flex gap-2">
      <div className="terminal-dot close"></div>
      <div className="terminal-dot minimize"></div>
      <div className="terminal-dot maximize"></div>
    </div>
    <div className="mx-auto text-xs text-muted font-body tracking-wider">bash - learnmore_smart</div>
  </div>
);

export default function Home() {
  const [lang, setLang] = useState<'en' | 'zh'>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const userLang = navigator.language;
    if (userLang.toLowerCase().includes('zh')) {
      setLang('zh');
    } else {
      setLang('en');
    }
  }, []);

  const t = dict[lang];

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'zh' : 'en'));
  };

  return (
    <main className="min-h-screen flex flex-col relative soft-bg text-text selection:bg-primary selection:text-background font-body">
      
      {/* Top Nav Bar */}
      <div className="w-full bg-surface/80 border-b border-border flex justify-between items-center px-6 py-3 text-xs md:text-sm font-medium tracking-widest sticky top-0 z-50 backdrop-blur-md">
        <span className="flex items-center gap-3 text-primary">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          {mounted ? t.ongoing : dict.en.ongoing}
        </span>
        <a 
          href="https://www.learnx.pro" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-primary transition-colors text-muted"
        >
          <span>LearnX</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative w-full flex-grow flex flex-col justify-center min-h-[85svh] px-4 md:px-12 py-16 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.02] select-none">
          <h1 className="text-[15vw] leading-none whitespace-nowrap text-primary font-bold">
            {mounted ? t.indexSystem : dict.en.indexSystem}
          </h1>
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto terminal-window animate-reveal-scale">
          <TerminalHeader />
          <div className="p-6 md:p-10 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="text-primary text-sm mb-4">
                <span className="text-muted">learnmore_smart@system:~$</span> ./init_profile.sh
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-text">
                <span className="text-primary">&lt;</span>
                {mounted ? t.indexSystem : dict.en.indexSystem}
                <span className="text-primary">/&gt;</span>
              </h1>
              <h2 className="text-sm md:text-base tracking-[0.2em] text-muted uppercase mt-2">
                {mounted ? t.centralNamespace : dict.en.centralNamespace}
              </h2>
            </div>
            
            <div className="mt-4 delay-200">
              <p className="text-base md:text-lg leading-relaxed text-muted max-w-2xl">
                <span className="text-primary">const</span> <span className="text-text">bio</span> = <span className="text-[#c3e88d]">"{mounted ? t.description : dict.en.description}"</span>;
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-8">
              <a 
                href="#projects" 
                className="inline-flex items-center justify-center px-6 py-3 bg-primary/10 text-primary border border-primary/30 rounded hover:bg-primary/20 transition-all duration-300 group text-sm font-medium tracking-wide w-full sm:w-auto"
              >
                <span className="mr-2">&gt;</span> {mounted ? t.explore : dict.en.explore}
                <span className="inline-block w-2 h-4 bg-primary ml-2 animate-cursor-blink"></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Ventures Section */}
      <section id="featured" className="w-full relative py-24 border-t border-border bg-background/50">
        <div className="max-w-6xl mx-auto w-full px-6 md:px-12">
          <div className="mb-12 animate-reveal-up">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
              <span className="text-primary">$</span> {mounted ? t.featuredTitle : dict.en.featuredTitle}
            </h2>
            <p className="text-sm text-muted">
              // {lang === 'en' ? 'Highlighting my main ongoing projects and creative pursuits.' : '突出展示我正在进行的主要项目和创意追求。'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LearnX */}
            <div className="terminal-window group animate-reveal-up delay-100 flex flex-col h-full">
              <TerminalHeader />
              <div className="p-6 flex flex-col flex-grow gap-4">
                <div className="w-full aspect-video border border-border bg-surface/50 relative overflow-hidden mb-2">
                  <img
                    src="/learnx.png"
                    alt="LearnX"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                <h3 className="text-xl font-bold text-primary">LearnX</h3>
                <p className="text-sm text-muted leading-relaxed flex-grow">
                  {lang === 'en'
                    ? 'A comprehensive platform connecting students with expert tutors. Built with React, Node.js, and a focus on seamless user experience.'
                    : '一个连接学生和专家导师的综合平台。使用 React、Node.js 构建，专注于无缝的用户体验。'}
                </p>
                <a href="https://www.learnx.pro" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-text hover:text-primary transition-colors border border-border px-4 py-2 rounded self-start hover:border-primary/50">
                  ./run_learnx.sh
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>
              </div>
            </div>

            {/* Learnmore_smart's Piano Journey */}
            <div className="terminal-window group animate-reveal-up delay-200 flex flex-col h-full">
              <TerminalHeader />
              <div className="p-6 flex flex-col flex-grow gap-4">
                <div className="w-full aspect-video border border-border bg-surface/50 relative overflow-hidden mb-2">
                  <img
                    src="/ytb.png"
                    alt="YouTube Channel"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                <h3 className="text-xl font-bold text-primary">Piano_Journey.mp4</h3>
                <p className="text-sm text-muted leading-relaxed flex-grow">
                  {lang === 'en'
                    ? 'A personal documentation of my musical progress, exploring classical pieces and contemporary arrangements through performance and theory.'
                    : '我音乐进步的个人记录，通过表演和理论探索古典乐曲和现代改编。'}
                </p>
                <a href="https://youtube.com/@NoahsPianoJourney?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-text hover:text-primary transition-colors border border-border px-4 py-2 rounded self-start hover:border-primary/50">
                  ./play_video.sh
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills & Background */}
      <section id="about" className="w-full relative py-24 border-t border-border">
        <div className="max-w-6xl mx-auto w-full px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 animate-reveal-up terminal-window flex flex-col">
              <TerminalHeader />
              <div className="p-6 flex flex-col gap-6">
                <h2 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                  <span className="text-muted">$</span> {mounted ? t.background : dict.en.background}
                </h2>
                <div className="flex flex-col gap-4 text-sm">
                  <div className="flex flex-col">
                    <span className="text-muted">location:</span>
                    <span className="text-text">"Montreal, QC"</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted">education:</span>
                    <span className="text-text">"Marianopolis College"</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted">languages:</span>
                    <span className="text-text">["English", "French", "Mandarin"]</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 animate-reveal-up delay-200 terminal-window flex flex-col">
              <TerminalHeader />
              <div className="p-6 flex flex-col gap-8">
                <div>
                  <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                    <span className="text-muted">$</span> {mounted ? t.techSkills : dict.en.techSkills}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Next.js', 'Node.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Git', 'Figma'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-surface border border-border text-primary text-xs rounded hover:bg-primary/10 transition-colors cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <span className="text-muted">$</span> {mounted ? t.interests : dict.en.interests}
                  </h2>
                  <p className="text-sm leading-relaxed text-muted">
                    {lang === 'en' 
                      ? 'Beyond coding, I am deeply passionate about music, specifically playing the piano. I also enjoy creating content, exploring new technologies, and building products that make a positive impact.'
                      : '除了编程，我非常热爱音乐，特别是弹钢琴。我也喜欢创作内容、探索新技术，以及构建能产生积极影响的产品。'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Index */}
      <section id="projects" className="w-full relative py-24 border-t border-border bg-background/50">
        <div className="max-w-4xl mx-auto w-full px-6 md:px-12">
          <div className="mb-12 animate-reveal-up">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
              <span className="text-primary">$</span> {mounted ? t.directory : dict.en.directory}
            </h2>
            <p className="text-sm text-muted mb-4">
              // {mounted ? t.directoryDesc : dict.en.directoryDesc}
            </p>
            <div className="text-xs text-primary/70">
              total {projects.length}
            </div>
          </div>
          
          <div className="terminal-window">
            <TerminalHeader />
            <div className="flex flex-col animate-reveal-up delay-200">
              {projects.map((project, idx) => (
                <Link 
                  key={project.id} 
                  href={project.path}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-6 border-b border-border last:border-b-0 hover:bg-surface/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-xs text-muted/50 mt-1 w-6 text-right">
                      {idx}
                    </span>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted">-rw-r--r--</span>
                        <h3 className="text-base font-bold text-text group-hover:text-primary transition-colors">
                          {project.id}.tsx
                        </h3>
                      </div>
                      <p className="text-xs text-muted mt-2 max-w-lg leading-relaxed">
                        // {mounted ? project.description[lang] : project.description.en}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 mt-4 sm:mt-0 self-start sm:self-auto ml-10 sm:ml-0">
                    <span className="text-xs text-muted">[{project.year}]</span>
                    <span className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-surface border-t border-border py-8 px-6 md:px-12 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full max-w-6xl mx-auto">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="font-bold text-lg text-text">Noah Zhang</span>
              <span className="text-border">|</span>
              <span className="text-xs text-muted">{mounted ? t.systemActive : dict.en.systemActive}</span>
            </div>
            <div className="text-xs text-muted/60">
              © {new Date().getFullYear()} {mounted ? t.rights : dict.en.rights}
            </div>
          </div>

          {/* Social Links & Language Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-8">
            <div className="flex items-center gap-4">
              <a href="mailto:hello@example.com" className="text-muted hover:text-primary transition-colors" aria-label="Email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/noah-zixin-zhang-656a13367/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="https://x.com/Learnmore_smart" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors" aria-label="X (Twitter)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
              <a href="https://youtube.com/@NoahsPianoJourney?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
              <a href="https://www.instagram.com/learnmore_smart/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>

            <button 
              onClick={toggleLanguage}
              className="text-xs font-bold text-primary border border-border px-3 py-1.5 rounded hover:bg-primary/10 transition-all duration-300 uppercase"
            >
              $ {mounted ? t.switchLang : dict.en.switchLang}
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}