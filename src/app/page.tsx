"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Github, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

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
  { id: 'hidden-china-atlas', name: { en: 'Hidden China Atlas', zh: '隐藏中国地图集' }, description: { en: 'Interactive geographic atlas.', zh: '互动地理图集。' }, path: '/hidden-china-atlas', year: '2026' },
  { id: 'release-panic-room', name: { en: 'Release Panic Room', zh: '发布恐慌室' }, description: { en: 'A last minute stress game.', zh: '一款刺激最后一刻压力的游戏。' }, path: '/release-panic-room', year: '2026' },
  { id: 'rateministere', name: { en: 'RateMinistere', zh: 'RateMinistere' }, description: { en: 'Voting teacher platform.', zh: '教师投票平台' }, path: '/rateministere', year: '2026' },
  { id: 'caelum', name: { en: 'Caelum', zh: 'Caelum' }, description: { en: 'Windows Note taking app.', zh: 'Windows 笔记应用程序。' }, path: 'https://github.com/Learnmore-smart/Caelum', year: '2026' },
  { id: 'mari-msu-2026', name: { en: 'Mari MSU 2026', zh: 'Mari MSU 2026' }, description: { en: 'Student Portal Design.', zh: '学生门户网站设计。' }, path: '/mari-msu-2026', year: '2026' },
  { id: 'christmas-2025', name: { en: 'Christmas 2025', zh: '2025年圣诞节' }, description: { en: 'Festive holiday countdowns.', zh: '节日倒计时。' }, path: '/christmas-2025', year: '2025' },
  { id: 'code-share', name: { en: 'Code Share', zh: '代码分享' }, description: { en: 'Invite code share system.', zh: '邀请码分享系统。' }, path: '/code-share', year: '2025' },
  { id: 'academic-tutoring', name: { en: 'Academic Tutoring', zh: '学术辅导' }, description: { en: "A landing page for tutors.", zh: "连接导师的landing page。" }, path: '/academic-tutoring', year: '2025' },
  { id: 'zhich-pvp', name: { en: 'Zhich PvP', zh: 'Zhich PvP' }, description: { en: 'Multiplayer arena statistics.', zh: '多人竞技场统计。' }, path: '/zhich-pvp', year: '2026' },
  { id: '2d-shooter', name: { en: '2D Shooter', zh: '2D射击游戏' }, description: { en: '2D simple shooting game.', zh: '2D简单射击游戏。' }, path: '/2d-shooter', year: '2026' },
];

const dict = {
  en: {
    role: "Creative Developer",
    location: "Montreal, QC",
    ongoing: "Available for new opportunities",
    description: "I build tools, platforms, and interactive experiences crafted with precision. Obsessed with detail, motion, and digital brutalism.",
    explore: "View Index",
    featuredTitle: "SELECTED WORKS",
    directory: "Archive",
    background: "Background",
    techSkills: "Capabilities",
    switchLang: "ZH",
    socials: "Network",
    learnxDesc: "Exam prediction, smart planning, and clear progress tracking for students.",
    pianoDesc: "A piano channel built for beginners — simple practice routines, first pieces, and step-by-step progress.",
    bio: "Currently studying at Marianopolis College in Montreal. Fluent in English, French, Mandarin; conversational in Spanish."
  },
  zh: {
    role: "创意开发者",
    location: "魁北克省蒙特利尔",
    ongoing: "欢迎合作",
    description: "我致力于打造精密的工具、平台和互动体验。痴迷于细节、动效与数字粗野主义。",
    explore: "查看索引",
    featuredTitle: "精选项目",
    directory: "归档项目",
    background: "背景",
    techSkills: "技术能力",
    switchLang: "EN",
    socials: "社交网络",
    learnxDesc: "面向学生的考试预测平台，帮助你制定学习计划并清晰追踪进度。",
    pianoDesc: "面向初学者的钢琴频道：简单的练习方法、入门曲目与循序渐进的进步记录。",
    bio: "目前在蒙特利尔 Marianopolis College 就读。精通英语、法语、普通话，西班牙语可进行日常交流。"
  }
};

export default function Home() {
  const [lang, setLang] = useState<'en' | 'zh'>('en');
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const yImage1 = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);
  const yImage2 = useTransform(smoothProgress, [0, 1], ["0%", "-20%"]);

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
  const toggleLanguage = () => setLang((prev) => (prev === 'en' ? 'zh' : 'en'));

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="relative w-full min-h-screen selection:bg-accent selection:text-white">
      <div className="noise-overlay" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-start z-50 mix-blend-difference text-[#F2F1EB]">
        <div className="flex flex-col gap-1 text-xs uppercase tracking-widest font-body">
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            {t.ongoing}
          </span>
        </div>

        <button
          onClick={toggleLanguage}
          className="text-xs uppercase tracking-widest font-body hover:text-accent transition-colors"
        >
          {t.switchLang}
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-[100svh] flex flex-col justify-end px-6 md:px-12 pb-12 md:pb-24 pt-32 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col gap-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full border-b-2 border-text pb-6 md:pb-12 gap-8">
            <h1 className="text-[14vw] md:text-[10vw] leading-[0.85] tracking-[-0.03em] uppercase">
              NOAH ZIXIN <br />
              <span className="text-accent italic pr-4">ZHANG</span>
            </h1>

            <div className="max-w-xs md:max-w-sm flex flex-col gap-4 text-sm md:text-base font-body leading-relaxed">
              <span className="uppercase font-display tracking-widest text-xs opacity-50 border-b border-text/20 pb-2">{t.role}</span>
              <p>{t.description}</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Section */}
      <section className="relative w-full bg-text text-background py-32 px-6 md:px-12 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center gap-6 mb-20 md:mb-32"
          >
            <h2 className="text-5xl md:text-8xl tracking-tight uppercase">
              {t.featuredTitle}
            </h2>
            <div className="h-0.5 flex-1 bg-background opacity-20 hidden md:block" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 md:gap-32">
            {/* Project 1 */}
            <a href="https://www.learnx.pro" target="_blank" rel="noreferrer" className="flex flex-col gap-6 group">
              <div className="overflow-hidden bg-background/5 aspect-[16/10] relative cursor-pointer border border-background/10">
                <motion.div style={{ y: yImage1 }} className="absolute inset-[-20%] w-[140%] h-[140%]">
                  <img
                    src="/LearnX.png"
                    alt="LearnX"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105 ease-out"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-text/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="flex justify-between items-start pt-4 border-t border-background/20">
                <div className="flex flex-col gap-2">
                  <h3 className="text-3xl md:text-5xl uppercase tracking-tight">LearnX</h3>
                  <p className="font-body text-sm md:text-base opacity-70 max-w-sm">{t.learnxDesc}</p>
                </div>
                <div className="p-4 bg-background text-text rounded-full group-hover:bg-accent group-hover:text-white transition-colors">
                  <ArrowUpRight size={24} />
                </div>
              </div>
            </a>

            {/* Project 2 */}
            <a href="https://youtube.com/@NoahsPianoJourney?sub_confirmation=1" target="_blank" rel="noreferrer" className="flex flex-col gap-6 lg:mt-32 group">
              <div className="overflow-hidden bg-background/5 aspect-[16/10] relative cursor-pointer border border-background/10">
                <motion.div style={{ y: yImage2 }} className="absolute inset-[-20%] w-[140%] h-[140%]">
                  <img
                    src="/Noah-Piano-Journey.png"
                    alt="Noah's Piano Journey"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105 ease-out"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-text/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="flex justify-between items-start pt-4 border-t border-background/20">
                <div className="flex flex-col gap-2">
                  <h3 className="text-3xl md:text-5xl uppercase tracking-tight">Noah&apos;s Piano Journey</h3>
                  <p className="font-body text-sm md:text-base opacity-70 max-w-sm">{t.pianoDesc}</p>
                </div>
                <div className="p-4 bg-background text-text rounded-full group-hover:bg-accent group-hover:text-white transition-colors">
                  <ArrowUpRight size={24} />
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Index Section */}
      <section className="relative w-full py-32 px-6 md:px-12 bg-background">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex justify-between items-end border-b-2 border-text pb-6 mb-12">
            <h2 className="text-4xl md:text-6xl tracking-tight uppercase">{t.directory}</h2>
            <span className="font-body text-sm md:text-base opacity-50 uppercase tracking-widest">{projects.length} Entries</span>
          </div>

          <div className="flex flex-col">
            {projects.map((project, idx) => (
              <a
                href={project.path}
                key={project.id}
                target="_blank"
                rel="noreferrer"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="group flex flex-col md:flex-row md:items-center justify-between py-6 md:py-8 border-b border-text/20 hover:bg-text hover:text-background px-4 md:px-8 transition-all duration-300 -mx-4 md:-mx-8 cursor-pointer"
                >
                  <div className="flex items-center gap-8 md:gap-16 w-full md:w-auto">
                    <span className="font-body text-xs md:text-sm opacity-40 group-hover:opacity-60">{(idx + 1).toString().padStart(2, '0')}</span>
                    <h3 className="text-2xl md:text-4xl uppercase tracking-tight group-hover:translate-x-4 transition-transform duration-300">
                      {project.name[lang]}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-8 md:gap-16 mt-4 md:mt-0 pl-12 md:pl-0">
                    <p className="font-body text-xs md:text-sm opacity-60 group-hover:opacity-80 max-w-xs">
                      {project.description[lang]}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="font-body text-xs md:text-sm uppercase tracking-widest">{project.year}</span>
                      <ArrowUpRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </div>
                </motion.div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / About */}
      <footer className="w-full bg-surface py-24 md:py-32 px-6 md:px-12 border-t border-text/10">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">

          <div className="col-span-1 md:col-span-4 flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <h4 className="font-body text-xs uppercase tracking-widest opacity-50 border-b border-text/20 pb-2">{t.background}</h4>
              <p className="font-body text-sm leading-relaxed max-w-xs">
                {t.bio}
              </p>
              <div className="flex items-center gap-2 mt-2 opacity-60">
                <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                <span className="text-xs uppercase tracking-widest font-body">{t.location}</span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-body text-xs uppercase tracking-widest opacity-50 border-b border-text/20 pb-2">{t.socials}</h4>
              <div className="flex gap-6">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors" title="GitHub">
                  <Github size={20} />
                </a>
                <a href="https://x.com/Learnmore_smart" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors" title="X (Twitter)">
                  <Twitter size={20} />
                </a>
                <a href="https://www.instagram.com/learnmore_smart/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors" title="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="https://youtube.com/@NoahsPianoJourney?sub_confirmation=1" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors" title="YouTube">
                  <Youtube size={20} />
                </a>
                <a href="mailto:hello@example.com" className="hover:text-accent transition-colors" title="Email">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-8 flex flex-col justify-between">
            <div className="flex flex-col gap-4 mt-24 md:mt-0 max-w-full">
              <h4 className="font-body text-xs uppercase tracking-widest opacity-50 border-b border-text/20 pb-2">{t.techSkills}</h4>
              <div className="flex flex-wrap gap-x-2 gap-y-3">
                {['React', 'Next.js', 'TypeScript', 'JavaScript', 'C#', 'Node.js', 'Tailwind', 'CSS Modules', 'Framer Motion', 'Google Cloud', 'AWS', 'Figma', 'UI/UX'].map(skill => (
                  <span key={skill} className="font-body text-xs md:text-sm border border-text/20 px-3 py-1 rounded-full uppercase tracking-wider hover:bg-text hover:text-background transition-colors cursor-default whitespace-nowrap">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-auto">
              <h2 className="text-[8vw] md:text-[6vw] leading-[0.8] tracking-tight uppercase break-words hover:text-accent transition-colors cursor-pointer w-fit">
                <a href="mailto:hello@example.com">SAY HELLO ↗</a>
              </h2>
              <div className="flex justify-between items-center border-t border-text/20 pt-4 font-body text-xs uppercase tracking-widest opacity-50">
                <span>© 2026 Noah Zixin Zhang</span>
                <span>All Rights Reserved</span>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
