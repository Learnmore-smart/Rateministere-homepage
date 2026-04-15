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
    ongoing: "Ongoing Project",
    indexSystem: "INDEX SYSTEM",
    centralNamespace: "Central Namespace",
    title: ["Rate", "Ministere"],
    description: "The flagship platform and central namespace for our entire ecosystem. Next-generation tools, platforms, and interactive experiences crafted with absolute precision.",
    explore: "Explore Index",
    directory: "Directory",
    directoryDesc: "A comprehensive directory of applications, tools, and creative experiments built for the modern web.",
    entriesAvailable: "Entries Available",
    systemActive: "System Active",
    rights: "All rights reserved.",
    switchLang: "中文 (CHINESE)",
    socials: "Social Links",
    connect: "Connect"
  },
  zh: {
    ongoing: "进行中的项目",
    indexSystem: "索引系统",
    centralNamespace: "中央命名空间",
    title: ["Rate", "Ministere"],
    description: "我们整个生态系统的旗舰平台和中央命名空间。以绝对精度打造的下一代工具、平台和互动体验。",
    explore: "探索索引",
    directory: "目录",
    directoryDesc: "为现代网络构建的应用程序、工具和创意实验的综合目录。",
    entriesAvailable: "个可用条目",
    systemActive: "系统运行中",
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
    <main className="min-h-screen flex flex-col relative grid-lines">
      {/* Top Banner for LearnX */}
      <div className="w-full bg-primary text-background border-b border-border flex justify-between items-center px-4 py-3 font-body text-xs md:text-sm uppercase tracking-widest sticky top-0 z-50 shadow-sm">
        <span className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-background opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-background"></span>
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
          <h1 className="font-display text-[20vw] leading-none whitespace-nowrap">
            {mounted ? t.indexSystem : dict.en.indexSystem}
          </h1>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex items-start gap-4 animate-reveal-up">
            <span className="text-primary font-display text-4xl md:text-6xl leading-none mt-2">01</span>
            <div>
              <h2 className="font-body text-xs md:text-sm tracking-[0.3em] text-muted uppercase mb-4 md:mb-6 font-bold">
                {mounted ? t.centralNamespace : dict.en.centralNamespace}
              </h2>
              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold leading-[0.85] tracking-tighter uppercase text-text">
                {t.title[0]}<br/>{t.title[1]}
              </h1>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-16 md:mt-24 animate-reveal-up delay-200">
            <div className="md:col-span-5 md:col-start-8 flex flex-col gap-8">
              <p className="font-body text-sm md:text-base leading-relaxed text-muted font-medium">
                {mounted ? t.description : dict.en.description}
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a 
                  href="#projects" 
                  className="inline-flex items-center justify-between px-8 py-5 border border-border bg-surface hover:bg-primary hover:text-background hover:border-primary transition-all duration-300 group uppercase font-body text-sm font-bold tracking-widest w-full sm:w-auto shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] hover:shadow-[0px_0px_0px_0px_rgba(17,17,17,1)] hover:translate-y-1 hover:translate-x-1"
                >
                  {mounted ? t.explore : dict.en.explore}
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
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
                <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6 uppercase">
                  {mounted ? t.directory : dict.en.directory}
                </h2>
                <p className="font-body text-sm text-muted leading-relaxed max-w-sm">
                  {mounted ? t.directoryDesc : dict.en.directoryDesc}
                </p>
              </div>
              <div className="font-body text-xs text-muted uppercase tracking-widest mt-12 md:mt-0 font-bold">
                {mounted ? (
                  lang === 'en' ? `[${projects.length} ${t.entriesAvailable}]` : `[${projects.length} ${t.entriesAvailable}]`
                ) : `[${projects.length} ${dict.en.entriesAvailable}]`}
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
                        {mounted ? project.name[lang] : project.name.en}
                      </h3>
                      <p className="font-body text-xs md:text-sm text-muted mt-3 max-w-md leading-relaxed group-hover:text-text transition-colors">
                        {mounted ? project.description[lang] : project.description.en}
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
      <footer className="w-full bg-border text-background p-6 md:p-8 flex flex-col gap-10 font-body text-xs uppercase tracking-widest font-bold">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 w-full max-w-7xl mx-auto">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="text-primary">RateMinistere</span>
              <span className="opacity-50">//</span>
              <span>{mounted ? t.systemActive : dict.en.systemActive}</span>
            </div>
            <div className="opacity-50 text-[10px]">
              © {new Date().getFullYear()} {mounted ? t.rights : dict.en.rights}
            </div>
          </div>

          {/* Social Links & Language Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-10">
            <div className="flex items-center gap-5">
              <span className="opacity-50 mr-2">{mounted ? t.connect : dict.en.connect}:</span>
              <a href="https://www.linkedin.com/in/noah-zixin-zhang-656a13367/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="https://x.com/Learnmore_smart" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="X (Twitter)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
              <a href="https://www.instagram.com/learnmore_smart/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>

            <button 
              onClick={toggleLanguage}
              className="px-4 py-2 border border-background/20 hover:bg-background hover:text-border hover:border-background transition-all duration-300"
            >
              {mounted ? t.switchLang : dict.en.switchLang}
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
