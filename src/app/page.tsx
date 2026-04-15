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
    ongoing: "Available for new opportunities",
    indexSystem: "Learnmore_smart",
    centralNamespace: "Software Developer",
    description: "Software Developer, Creator of LearnX, and Content Creator. I build tools, platforms, and interactive experiences crafted with precision.",
    explore: "View Projects",
    directory: "Project Index",
    directoryDesc: "A collection of applications, tools, and creative experiments built for the modern web.",
    entriesAvailable: "Projects Available",
    systemActive: "Montreal, QC",
    rights: "All rights reserved.",
    switchLang: "ZH",
    socials: "Social Links",
    connect: "Connect",
    featuredTitle: "Featured Ventures",
    background: "Background",
    techSkills: "Technical Skills",
    interests: "Interests"
  },
  zh: {
    ongoing: "欢迎合作",
    indexSystem: "Learnmore_smart",
    centralNamespace: "软件开发者",
    description: "软件开发者、LearnX 创始人、内容创作者。我致力于打造精密的工具、平台和互动体验。",
    explore: "查看项目",
    directory: "项目索引",
    directoryDesc: "为现代网络构建的应用程序、工具和创意实验的集合。",
    entriesAvailable: "个项目",
    systemActive: "魁北克省蒙特利尔",
    rights: "版权所有。",
    switchLang: "EN",
    socials: "社交链接",
    connect: "联系我",
    featuredTitle: "精选项目",
    background: "背景",
    techSkills: "技术栈",
    interests: "兴趣"
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
    <main className="min-h-screen flex flex-col bg-background text-text font-body">
      
      {/* Top Nav Bar */}
      <nav className="w-full flex justify-between items-center px-6 md:px-12 py-6 text-sm font-medium sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/40">
        <span className="flex items-center gap-3 text-primary">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          {mounted ? t.ongoing : dict.en.ongoing}
        </span>
        <div className="flex items-center gap-6">
          <a 
            href="https://www.learnx.pro" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors text-muted"
          >
            LearnX
          </a>
          <button 
            onClick={toggleLanguage}
            className="text-muted hover:text-primary transition-colors uppercase text-xs tracking-wider"
          >
            {mounted ? t.switchLang : dict.en.switchLang}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full flex flex-col justify-center min-h-[80svh] px-6 md:px-12 py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto w-full animate-reveal-up">
          <h2 className="text-sm md:text-base tracking-[0.2em] text-muted uppercase mb-4 font-medium">
            {mounted ? t.centralNamespace : dict.en.centralNamespace}
          </h2>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold leading-tight tracking-tight text-text mb-8">
            {mounted ? t.indexSystem : dict.en.indexSystem}
          </h1>
          <p className="text-lg md:text-2xl leading-relaxed text-muted max-w-2xl font-light">
            {mounted ? t.description : dict.en.description}
          </p>

          <div className="mt-12 flex items-center gap-6">
            <a 
              href="#projects" 
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-background hover:bg-primary-hover transition-colors rounded-full text-sm font-medium tracking-wide"
            >
              {mounted ? t.explore : dict.en.explore}
            </a>
          </div>
        </div>
      </section>

      {/* Featured Ventures Section */}
      <section id="featured" className="w-full py-24 md:py-32 bg-surface">
        <div className="max-w-6xl mx-auto w-full px-6 md:px-12">
          <div className="mb-16 animate-reveal-up">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {mounted ? t.featuredTitle : dict.en.featuredTitle}
            </h2>
            <p className="text-muted text-lg">
              {lang === 'en' ? 'Highlighting my main ongoing projects and creative pursuits.' : '突出展示我正在进行的主要项目和创意追求。'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* LearnX */}
            <div className="group animate-reveal-up delay-100 flex flex-col">
              <div className="w-full aspect-video bg-background relative overflow-hidden mb-6 rounded-lg shadow-sm">
                <img
                  src="/LearnX.png"
                  alt="LearnX"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-bold text-text mb-3">LearnX</h3>
              <p className="text-muted leading-relaxed mb-6 flex-grow">
                {lang === 'en'
                  ? 'Built for students preparing for agent exams — focused on exam prediction, smart planning, and clear progress tracking.'
                  : '面向学生的特工考试预测平台，帮助你制定学习计划并清晰追踪进度。'}
              </p>
              <a href="https://www.learnx.pro" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors group-hover:underline underline-offset-4">
                {lang === 'en' ? 'Visit LearnX' : '访问 LearnX'} &rarr;
              </a>
            </div>

            {/* Learnmore_smart's Piano Journey */}
            <div className="group animate-reveal-up delay-200 flex flex-col">
              <div className="w-full aspect-video bg-background relative overflow-hidden mb-6 rounded-lg shadow-sm">
                <img
                  src="/Noah-Piano-Journey.png"
                  alt="YouTube Channel"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-bold text-text mb-3">Piano Journey</h3>
              <p className="text-muted leading-relaxed mb-6 flex-grow">
                {lang === 'en'
                  ? 'A piano channel built for beginners — simple practice routines, first pieces, and step-by-step progress.'
                  : '面向初学者的钢琴频道：简单的练习方法、入门曲目与循序渐进的进步记录。'}
              </p>
              <a href="https://youtube.com/@NoahsPianoJourney?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors group-hover:underline underline-offset-4">
                {lang === 'en' ? 'Watch Channel' : '观看频道'} &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills & Background */}
      <section id="about" className="w-full py-24 md:py-32">
        <div className="max-w-6xl mx-auto w-full px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1 animate-reveal-up">
              <h2 className="text-2xl font-bold text-text mb-6">
                {mounted ? t.background : dict.en.background}
              </h2>
              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-muted mb-1">Location</h4>
                  <p className="text-text">Montreal, QC</p>
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-muted mb-1">Education</h4>
                  <p className="text-text">Marianopolis College</p>
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-muted mb-1">Languages</h4>
                  <p className="text-text">English, French, Mandarin</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 animate-reveal-up delay-200 flex flex-col gap-12">
              <div>
                <h2 className="text-2xl font-bold text-text mb-6">
                  {mounted ? t.techSkills : dict.en.techSkills}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {['React', 'Next.js', 'Node.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Git', 'Figma'].map((skill) => (
                    <span key={skill} className="px-4 py-2 bg-surface text-text text-sm rounded-full border border-border/50">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-text mb-4">
                  {mounted ? t.interests : dict.en.interests}
                </h2>
                <p className="text-lg leading-relaxed text-muted max-w-2xl">
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
      <section id="projects" className="w-full py-24 md:py-32 bg-surface border-t border-border/50">
        <div className="max-w-4xl mx-auto w-full px-6 md:px-12">
          <div className="mb-16 animate-reveal-up">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {mounted ? t.directory : dict.en.directory}
            </h2>
            <p className="text-lg text-muted mb-4">
              {mounted ? t.directoryDesc : dict.en.directoryDesc}
            </p>
          </div>
          
          <div className="flex flex-col gap-4 animate-reveal-up delay-200">
            {projects.map((project) => (
              <Link 
                key={project.id} 
                href={project.path}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-background rounded-xl border border-border/40 hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-text group-hover:text-primary transition-colors mb-2">
                      {mounted ? project.name[lang] : project.name.en}
                    </h3>
                    <p className="text-muted leading-relaxed">
                      {mounted ? project.description[lang] : project.description.en}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mt-4 sm:mt-0 self-start sm:self-auto ml-0">
                  <span className="text-sm font-medium text-muted bg-surface px-3 py-1 rounded-full">{project.year}</span>
                  <span className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-6 md:px-12 border-t border-border/40 bg-background">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 w-full max-w-6xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-bold text-xl tracking-tight text-text">Learnmore_smart</span>
            <div className="text-sm text-muted">
              © 2026 Noah Zixin Zhang. {mounted ? t.rights : dict.en.rights}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
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
            <a href="https://youtube.com/@NoahsPianoJourney?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors" aria-label="YouTube">
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
        </div>
      </footer>
    </main>
  );
}
