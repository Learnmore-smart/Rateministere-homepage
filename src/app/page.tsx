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
  { id: 'release-panic-room', name: { en: 'Release Panic Room', zh: '发布恐慌室' }, description: { en: 'Emergency toolkit and dashboard for handling deployment disasters.', zh: '用于处理部署灾难的应急工具包和仪表板。' }, path: '/release-panic-room', year: '2026' },
  { id: 'rateministere', name: { en: 'RateMinistere', zh: 'RateMinistere' }, description: { en: 'The flagship platform and central namespace for the entire ecosystem.', zh: '整个生态系统的旗舰平台和中央命名空间。' }, path: '/rateministere', year: '2026' },
  { id: 'caelum', name: { en: 'Caelum', zh: 'Caelum' }, description: { en: 'Next-generation cloud architecture and specialized developer tools.', zh: '下一代云架构和专业开发人员工具。' }, path: '/caelum', year: '2026' },
  { id: 'mari-msu-2026', name: { en: 'Mari MSU 2026', zh: 'Mari MSU 2026' }, description: { en: 'Student portal, academic resources, and community hub for MSU.', zh: '密歇根州立大学的学生门户、学术资源和社区中心。' }, path: '/mari-msu-2026', year: '2026' },
  { id: 'christmas-2025', name: { en: 'Christmas 2025', zh: '2025年圣诞节' }, description: { en: 'Festive holiday countdowns and seasonal interactive experiences.', zh: '节日倒计时和季节性互动体验。' }, path: '/christmas-2025', year: '2025' },
  { id: 'code-share', name: { en: 'Code Share', zh: '代码分享' }, description: { en: 'Real-time collaborative platform for sharing code snippets effortlessly.', zh: '轻松共享代码片段的实时协作平台。' }, path: '/code-share', year: '2025' },
  { id: 'academic-tutoring', name: { en: 'Academic Tutoring', zh: '学术辅导' }, description: { en: 'A comprehensive platform connecting students with expert tutors.', zh: '连接学生和专家导师的综合平台。' }, path: '/academic-tutoring', year: '2025' },
  { id: 'zhich-pvp', name: { en: 'Zhich PvP', zh: 'Zhich PvP' }, description: { en: 'Competitive multiplayer arena statistics and player leaderboards.', zh: '竞技多人竞技场统计和玩家排行榜。' }, path: '/zhich-pvp', year: '2026' },
  { id: '2d-shooter', name: { en: '2D Shooter', zh: '2D射击游戏' }, description: { en: 'Fast-paced web-based retro arcade action and survival game.', zh: '快节奏的基于网络的复古街机动作和生存游戏。' }, path: '/2d-shooter', year: '2026' },
];

const dict = {
  en: {
    ongoing: "Available for opportunities",
    indexSystem: "NOAH ZHANG",
    centralNamespace: "Software Developer",
    title: ["Noah", "Zhang"],
    description: "Software Developer, Creator of LearnX, and Content Creator. I build tools, platforms, and interactive experiences crafted with precision.",
    explore: "View Projects",
    directory: "Projects",
    directoryDesc: "A collection of applications, tools, and creative experiments built for the modern web.",
    entriesAvailable: "Projects Available",
    systemActive: "Montreal, QC",
    rights: "All rights reserved.",
    switchLang: "中文 (CHINESE)",
    socials: "Social Links",
    connect: "Connect"
  },
  zh: {
    ongoing: "欢迎合作",
    indexSystem: "NOAH ZHANG",
    centralNamespace: "软件开发者",
    title: ["Noah", "Zhang"],
    description: "软件开发者、LearnX 创始人、内容创作者。我致力于打造精密的工具、平台和互动体验。",
    explore: "查看项目",
    directory: "项目集",
    directoryDesc: "为现代网络构建的应用程序、工具和创意实验的集合。",
    entriesAvailable: "个项目",
    systemActive: "魁北克省蒙特利尔",
    rights: "版权所有。",
    switchLang: "ENGLISH (EN)",
    socials: "社交链接",
    connect: "联系我"
  }
};

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
    <main className="min-h-screen flex flex-col relative soft-bg">
      {/* Top Banner for LearnX */}
      <div className="w-full bg-primary/10 text-primary border-b border-primary/20 flex justify-between items-center px-6 py-3 font-body text-xs md:text-sm font-medium tracking-wide sticky top-0 z-50 backdrop-blur-md">
        <span className="flex items-center gap-3">
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
          className="flex items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <span className="font-bold">LearnX</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative w-full flex-grow flex flex-col justify-center min-h-[85svh] px-6 md:px-12 py-24 overflow-hidden bg-background">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03] select-none">
          <h1 className="font-display text-[15vw] leading-none whitespace-nowrap text-primary">
            {mounted ? t.indexSystem : dict.en.indexSystem}
          </h1>
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center gap-8">
          <div className="animate-reveal-up flex flex-col items-center">
            <h2 className="font-body text-sm tracking-[0.2em] text-primary uppercase mb-6 font-medium">
              {mounted ? t.centralNamespace : dict.en.centralNamespace}
            </h2>
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-tight tracking-tight text-text">
              {t.title[0]} {t.title[1]}
            </h1>
          </div>
          
          <div className="flex flex-col items-center gap-10 mt-8 animate-reveal-up delay-200 max-w-2xl mx-auto">
            <p className="font-body text-base md:text-lg leading-relaxed text-muted font-light">
              {mounted ? t.description : dict.en.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <a 
                href="#projects" 
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-full hover:bg-primary-hover hover:-translate-y-1 transition-all duration-300 group font-body text-sm font-medium tracking-wide w-full sm:w-auto shadow-lg shadow-primary/20"
              >
                {mounted ? t.explore : dict.en.explore}
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a 
                href="#featured" 
                className="inline-flex items-center justify-center px-8 py-4 bg-surface text-text rounded-full hover:bg-border hover:-translate-y-1 transition-all duration-300 font-body text-sm font-medium tracking-wide w-full sm:w-auto"
              >
                {lang === 'en' ? 'Featured Ventures' : '特色项目'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Ventures Section */}
      <section id="featured" className="w-full relative bg-surface py-24 md:py-32">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
          <div className="mb-16 md:mb-24 animate-reveal-up">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {lang === 'en' ? 'Featured Ventures' : '特色项目'}
            </h2>
            <p className="font-body text-base text-muted max-w-xl">
              {lang === 'en' 
                ? 'Highlighting my main ongoing projects and creative pursuits.'
                : '突出展示我正在进行的主要项目和创意追求。'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* LearnX */}
            <div className="flex flex-col gap-6 group animate-reveal-up delay-100">
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-background relative shadow-md">
                <img
                  src="https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=a%20modern%20clean%20educational%20technology%20platform%20interface%20with%20pastel%20blue%20accents%20and%20soft%20shadows&image_size=landscape_4_3"
                  alt="LearnX"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors">LearnX</h3>
                <p className="font-body text-sm text-muted leading-relaxed">
                  {lang === 'en'
                    ? 'A comprehensive platform connecting students with expert tutors. Built with React, Node.js, and a focus on seamless user experience.'
                    : '一个连接学生和专家导师的综合平台。使用 React、Node.js 构建，专注于无缝的用户体验。'}
                </p>
                <a href="https://www.learnx.pro" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 font-body text-sm font-bold text-primary hover:text-primary-hover transition-colors">
                  {lang === 'en' ? 'Visit LearnX' : '访问 LearnX'}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>
              </div>
            </div>

            {/* Noah's Piano Journey */}
            <div className="flex flex-col gap-6 group animate-reveal-up delay-200">
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-background relative shadow-md">
                <img
                  src="https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=a%20grand%20piano%20keys%20in%20soft%20pastel%20lighting%20cinematic%20composition&image_size=landscape_4_3"
                  alt="Noah's Piano Journey"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors">Noah's Piano Journey</h3>
                <p className="font-body text-sm text-muted leading-relaxed">
                  {lang === 'en'
                    ? 'A personal documentation of my musical progress, exploring classical pieces and contemporary arrangements through performance and theory.'
                    : '我音乐进步的个人记录，通过表演和理论探索古典乐曲和现代改编。'}
                </p>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 font-body text-sm font-bold text-primary hover:text-primary-hover transition-colors">
                  {lang === 'en' ? 'Watch on YouTube' : '在 YouTube 观看'}
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
      <section id="about" className="w-full relative bg-background py-24 md:py-32 border-b border-border">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1 animate-reveal-up">
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-6">
                {lang === 'en' ? 'Background' : '背景'}
              </h2>
              <div className="flex flex-col gap-8">
                <div>
                  <h4 className="font-body text-sm font-bold text-primary uppercase tracking-wider mb-2">Location</h4>
                  <p className="font-body text-base text-text">Montreal, QC</p>
                </div>
                <div>
                  <h4 className="font-body text-sm font-bold text-primary uppercase tracking-wider mb-2">Education</h4>
                  <p className="font-body text-base text-text">Marianopolis College</p>
                </div>
                <div>
                  <h4 className="font-body text-sm font-bold text-primary uppercase tracking-wider mb-2">Languages</h4>
                  <p className="font-body text-base text-text">English, French, Mandarin</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 animate-reveal-up delay-200">
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-6">
                {lang === 'en' ? 'Technical Skills' : '技术技能'}
              </h2>
              <div className="flex flex-wrap gap-3">
                {['React', 'Next.js', 'Node.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Git', 'Figma'].map((skill) => (
                  <span key={skill} className="px-5 py-2.5 bg-surface text-text rounded-full font-body text-sm font-medium hover:bg-primary hover:text-white transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="mt-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-6">
                  {lang === 'en' ? 'Interests' : '兴趣爱好'}
                </h2>
                <p className="font-body text-base leading-relaxed text-muted max-w-2xl">
                  {lang === 'en' 
                    ? 'Beyond coding, I am deeply passionate about music, specifically playing the piano. I also enjoy creating content, exploring new technologies, and building products that make a positive impact.'
                    : '除了编程，我非常热爱音乐，特别是弹钢琴。我也喜欢创作内容、探索新技术，以及构建能产生积极影响的产品。'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Index */}
      <section id="projects" className="w-full relative bg-surface py-24 md:py-32">
        <div className="max-w-5xl mx-auto w-full px-6 md:px-12">
          <div className="flex flex-col items-center text-center mb-16 md:mb-24 animate-reveal-up">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {mounted ? t.directory : dict.en.directory}
            </h2>
            <p className="font-body text-base text-muted leading-relaxed max-w-xl mb-8">
              {mounted ? t.directoryDesc : dict.en.directoryDesc}
            </p>
            <div className="font-body text-xs text-primary bg-primary/10 px-4 py-2 rounded-full uppercase tracking-widest font-bold">
              {mounted ? (
                lang === 'en' ? `${projects.length} ${t.entriesAvailable}` : `${projects.length} ${t.entriesAvailable}`
              ) : `${projects.length} ${dict.en.entriesAvailable}`}
            </div>
          </div>
          
          <div className="flex flex-col gap-4 animate-reveal-up delay-200">
            {projects.map((project, idx) => (
              <Link 
                key={project.id} 
                href={project.path}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 md:p-8 bg-background rounded-2xl hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border border-transparent hover:border-primary/20"
              >
                <div className="flex items-start gap-6">
                  <span className="font-body text-sm font-medium text-muted/50 mt-1 md:mt-2 group-hover:text-primary transition-colors">
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-bold group-hover:text-primary transition-colors">
                      {mounted ? project.name[lang] : project.name.en}
                    </h3>
                    <p className="font-body text-sm text-muted mt-2 max-w-lg leading-relaxed group-hover:text-text transition-colors">
                      {mounted ? project.description[lang] : project.description.en}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 mt-6 sm:mt-0 self-start sm:self-auto ml-12 sm:ml-0">
                  <span className="font-body text-sm font-medium text-muted group-hover:text-primary transition-colors">{project.year}</span>
                  <div className="w-10 h-10 rounded-full bg-surface text-text flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-background border-t border-border text-text py-12 px-6 md:px-12 font-body">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 w-full max-w-5xl mx-auto">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="font-display font-bold text-xl">Noah Zhang</span>
              <span className="text-muted/30">|</span>
              <span className="text-sm text-muted">{mounted ? t.systemActive : dict.en.systemActive}</span>
            </div>
            <div className="text-xs text-muted">
              © {new Date().getFullYear()} {mounted ? t.rights : dict.en.rights}
            </div>
          </div>

          {/* Social Links & Language Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-10">
            <div className="flex items-center gap-5">
              <a href="mailto:hello@example.com" className="text-muted hover:text-primary transition-colors" aria-label="Email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/noah-zixin-zhang-656a13367/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="https://x.com/Learnmore_smart" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors" aria-label="X (Twitter)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
              <a href="https://www.instagram.com/learnmore_smart/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>

            <button 
              onClick={toggleLanguage}
              className="px-4 py-2 text-sm font-medium text-muted bg-surface rounded-full hover:bg-primary hover:text-white transition-all duration-300"
            >
              {mounted ? t.switchLang : dict.en.switchLang}
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
