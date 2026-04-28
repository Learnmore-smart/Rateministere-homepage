"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Github, Instagram, Mail, Twitter, Youtube } from "lucide-react";

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

const projects: Project[] = [
  {
    id: "waste-your-tokens",
    name: { en: "Waste Your Tokens", zh: "Waste Your Tokens" },
    description: {
      en: "A website to help you waste tokens.",
      zh: "一个帮你浪费词元的网站。",
    },
    path: "/waste-your-tokens",
    year: "2026",
  },
  {
    id: "enforcer",
    name: { en: "Enforcer", zh: "Enforcer" },
    description: {
      en: "A Windows app built in 24 hours with Kimi Xu, Yu He Wang, Kevin Wang to help students focus on study.",
      zh: "与 Kimi Xu, Yu He Wang, Kevin Wang 在24小时内构建的 Windows 应用，帮助学生专注学习。",
    },
    path: "https://www.rateministere.com/Enforcer",
    year: "2026",
  },
  {
    id: "hidden-china-atlas",
    name: { en: "Hidden China Atlas", zh: "隐藏中国地图集" },
    description: { en: "Interactive geographic atlas.", zh: "互动地理图集。" },
    path: "/hidden-china-atlas",
    year: "2026",
  },
  {
    id: "release-panic-room",
    name: { en: "Release Panic Room", zh: "发布恐慌室" },
    description: { en: "A last minute stress game.", zh: "一款刺激最后一刻压力的游戏。" },
    path: "/release-panic-room",
    year: "2026",
  },
  {
    id: "rateministere",
    name: { en: "RateMinistere", zh: "RateMinistere" },
    description: { en: "Voting teacher platform.", zh: "教师投票平台" },
    path: "/rateministere",
    year: "2026",
  },
  {
    id: "caelum",
    name: { en: "Caelum", zh: "Caelum" },
    description: { en: "Windows note taking app.", zh: "Windows 笔记应用程序。" },
    path: "https://github.com/Learnmore-smart/Caelum",
    year: "2026",
  },
  {
    id: "mari-msu-2026",
    name: { en: "Mari MSU 2026", zh: "Mari MSU 2026" },
    description: { en: "Student portal design.", zh: "学生门户网站设计。" },
    path: "/mari-msu-2026",
    year: "2026",
  },
  {
    id: "christmas-2025",
    name: { en: "Christmas 2025", zh: "2025年圣诞节" },
    description: { en: "Festive holiday countdowns.", zh: "节日倒计时。" },
    path: "/christmas-2025",
    year: "2025",
  },
  {
    id: "code-share",
    name: { en: "Code Share", zh: "代码分享" },
    description: { en: "Invite code share system.", zh: "邀请码分享系统。" },
    path: "/code-share",
    year: "2025",
  },
  {
    id: "academic-tutoring",
    name: { en: "Academic Tutoring", zh: "学术辅导" },
    description: { en: "A landing page for tutors.", zh: "连接导师的landing page。" },
    path: "/academic-tutoring",
    year: "2025",
  },
  {
    id: "zhich-pvp",
    name: { en: "Zhich PvP", zh: "Zhich PvP" },
    description: { en: "Multiplayer arena statistics.", zh: "多人竞技场统计。" },
    path: "/zhich-pvp",
    year: "2026",
  },
  {
    id: "2d-shooter",
    name: { en: "2D Shooter", zh: "2D射击游戏" },
    description: { en: "2D simple shooting game.", zh: "2D简单射击游戏。" },
    path: "/2d-shooter",
    year: "2026",
  },
];

const dict = {
  en: {
    role: "Creative Developer",
    location: "Montreal, QC",
    ongoing: "Available",
    description:
      "I build tools, platforms, and interactive experiences crafted with precision. Focused on clarity, motion, and systems that feel effortless.",
    explore: "View work",
    featuredTitle: "Selected",
    directory: "Archive",
    background: "Background",
    techSkills: "Capabilities",
    switchLang: "ZH",
    socials: "Network",
    learnxDesc: "Exam prediction, smart planning, and clear progress tracking for students.",
    pianoDesc:
      "A piano channel built for beginners — simple practice routines, first pieces, and step-by-step progress.",
    bio: "Currently studying at Marianopolis College in Montreal. Fluent in English, French, Mandarin; conversational in Spanish.",
    cta: "Say hello",
  },
  zh: {
    role: "创意开发者",
    location: "魁北克省蒙特利尔",
    ongoing: "欢迎合作",
    description: "我致力于打造精密的工具、平台和互动体验。专注于清晰、动效与自然顺滑的系统体验。",
    explore: "查看作品",
    featuredTitle: "精选",
    directory: "归档",
    background: "背景",
    techSkills: "能力",
    switchLang: "EN",
    socials: "社交网络",
    learnxDesc: "面向学生的考试预测平台，帮助你制定学习计划并清晰追踪进度。",
    pianoDesc: "面向初学者的钢琴频道：简单的练习方法、入门曲目与循序渐进的进步记录。",
    bio: "目前在蒙特利尔 Marianopolis College 就读。精通英语、法语、普通话，西班牙语可进行日常交流。",
    cta: "联系我",
  },
};

const isExternalLink = (href: string) => /^https?:\/\//.test(href);

export default function Home() {
  const [lang, setLang] = useState<"en" | "zh">("en");

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.6,
  });

  const yImage1 = useTransform(smoothProgress, [0, 1], ["0%", "10%"]);
  const yImage2 = useTransform(smoothProgress, [0, 1], ["0%", "-10%"]);

  useEffect(() => {
    const userLang = navigator.language;
    setLang(userLang.toLowerCase().includes("zh") ? "zh" : "en");
  }, []);

  const t = useMemo(() => dict[lang], [lang]);
  const toggleLanguage = () => setLang((prev) => (prev === "en" ? "zh" : "en"));

  return (
    <div className="relative min-h-screen bg-background text-text">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(11,95,255,0.10),transparent_55%),radial-gradient(900px_circle_at_85%_35%,rgba(16,17,20,0.06),transparent_55%)]"
      />

      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-screen-2xl px-6 md:px-12">
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-border/70 bg-background/70 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Link href="/" className="flex items-baseline gap-3">
              <span className="font-display text-sm tracking-tight">Noah Zixin Zhang</span>
              <span className="hidden sm:inline font-body text-[11px] uppercase tracking-[0.26em] text-muted">
                Portfolio
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <span className="hidden md:flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-body text-[11px] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {t.ongoing}
              </span>

              <button
                type="button"
                onClick={toggleLanguage}
                className="rounded-full border border-border bg-surface px-3 py-1 font-body text-[11px] uppercase tracking-[0.26em] text-muted transition-colors hover:text-text"
              >
                {t.switchLang}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative">
        <section className="pt-28 md:pt-32 pb-16 md:pb-24">
          <div className="mx-auto max-w-screen-2xl px-6 md:px-12">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="md:col-span-7"
              >
                <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">
                  {t.role} · {t.location}
                </div>

                <h1 className="mt-6 font-display text-[12vw] leading-[0.95] tracking-[-0.05em] sm:text-6xl md:text-7xl">
                  Noah Zixin <span className="text-accent">Zhang</span>
                </h1>

                <p className="mt-6 max-w-xl font-body text-sm leading-relaxed text-muted md:text-base">
                  {t.description}
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Link
                    href="#work"
                    className="inline-flex items-center gap-2 rounded-full bg-text px-5 py-2.5 font-body text-[11px] uppercase tracking-[0.26em] text-background transition-colors hover:bg-accent"
                  >
                    {t.explore}
                    <ArrowUpRight size={16} />
                  </Link>

                  <Link
                    href="#archive"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 font-body text-[11px] uppercase tracking-[0.26em] text-text transition-colors hover:border-text/30"
                  >
                    {t.directory}
                  </Link>
                </div>
              </motion.div>

              <motion.aside
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="md:col-span-5"
              >
                <div className="rounded-3xl border border-border bg-surface p-6 md:p-8">
                  <div className="flex items-center justify-between">
                    <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">{t.background}</div>
                    <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">2026</div>
                  </div>

                  <p className="mt-6 font-body text-sm leading-relaxed text-muted">{t.bio}</p>

                  <div className="mt-10 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-border bg-background px-4 py-3">
                      <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">Focus</div>
                      <div className="mt-2 font-display text-sm tracking-tight">Interfaces</div>
                    </div>
                    <div className="rounded-2xl border border-border bg-background px-4 py-3">
                      <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">Strength</div>
                      <div className="mt-2 font-display text-sm tracking-tight">Motion</div>
                    </div>
                    <div className="rounded-2xl border border-border bg-background px-4 py-3">
                      <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">Mode</div>
                      <div className="mt-2 font-display text-sm tracking-tight">Light</div>
                    </div>
                    <div className="rounded-2xl border border-border bg-background px-4 py-3">
                      <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">Detail</div>
                      <div className="mt-2 font-display text-sm tracking-tight">Systems</div>
                    </div>
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </section>

        <section id="work" className="py-20 md:py-28">
          <div className="mx-auto max-w-screen-2xl px-6 md:px-12">
            <div className="flex items-baseline justify-between gap-6 border-b border-border pb-6">
              <h2 className="font-display text-2xl tracking-tight md:text-3xl">{t.featuredTitle}</h2>
              <span className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">Two highlights</span>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-10">
              <motion.a
                href="https://www.learnx.pro"
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="group rounded-3xl border border-border bg-surface p-5 md:p-6"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-background">
                  <motion.div style={{ y: yImage1 }} className="absolute inset-0">
                    <Image
                      src="/LearnX.png"
                      alt="LearnX"
                      fill
                      priority
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                  </motion.div>
                </div>

                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">LearnX</div>
                    <div className="mt-2 font-display text-xl tracking-tight md:text-2xl">Study planning</div>
                    <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-muted">{t.learnxDesc}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-text transition-colors group-hover:border-transparent group-hover:bg-accent group-hover:text-white">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </motion.a>

              <motion.a
                href="https://youtube.com/@NoahsPianoJourney?sub_confirmation=1"
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="group rounded-3xl border border-border bg-surface p-5 md:p-6"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-background">
                  <motion.div style={{ y: yImage2 }} className="absolute inset-0">
                    <Image
                      src="/Noah-Piano-Journey.png"
                      alt="Noah's Piano Journey"
                      fill
                      priority
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                  </motion.div>
                </div>

                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">YouTube</div>
                    <div className="mt-2 font-display text-xl tracking-tight md:text-2xl">Piano journey</div>
                    <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-muted">{t.pianoDesc}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-text transition-colors group-hover:border-transparent group-hover:bg-accent group-hover:text-white">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </motion.a>
            </div>
          </div>
        </section>

        <section id="archive" className="py-20 md:py-28">
          <div className="mx-auto max-w-screen-2xl px-6 md:px-12">
            <div className="flex items-baseline justify-between gap-6 border-b border-border pb-6">
              <h2 className="font-display text-2xl tracking-tight md:text-3xl">{t.directory}</h2>
              <span className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">
                {projects.length} entries
              </span>
            </div>

            <div className="mt-6 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-surface">
              {projects.map((project, idx) => {
                const content = (
                  <div className="group flex flex-col gap-3 px-5 py-5 transition-colors hover:bg-background md:flex-row md:items-center md:justify-between md:gap-10 md:px-6">
                    <div className="flex items-center gap-4 md:gap-6">
                      <span className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">
                        {(idx + 1).toString().padStart(2, "0")}
                      </span>
                      <div className="font-display text-lg tracking-tight md:text-xl">{project.name[lang]}</div>
                    </div>

                    <div className="flex items-center justify-between gap-6 md:w-[56%] md:justify-end md:gap-10">
                      <p className="max-w-[42ch] font-body text-sm leading-relaxed text-muted">{project.description[lang]}</p>
                      <div className="flex items-center gap-3">
                        <span className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">
                          {project.year}
                        </span>
                        <ArrowUpRight className="opacity-0 transition-opacity group-hover:opacity-100" size={18} />
                      </div>
                    </div>
                  </div>
                );

                if (isExternalLink(project.path)) {
                  return (
                    <a
                      key={project.id}
                      href={project.path}
                      target="_blank"
                      rel="noreferrer"
                      className="block"
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <Link key={project.id} href={project.path} className="block">
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <footer className="border-t border-border bg-surface">
          <div className="mx-auto max-w-screen-2xl px-6 py-16 md:px-12 md:py-20">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-5">
                <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">{t.socials}</div>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-muted">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-body text-[11px] uppercase tracking-[0.26em] transition-colors hover:text-text"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                  <a
                    href="https://x.com/Learnmore_smart"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-body text-[11px] uppercase tracking-[0.26em] transition-colors hover:text-text"
                  >
                    <Twitter size={16} />
                    X
                  </a>
                  <a
                    href="https://www.instagram.com/learnmore_smart/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-body text-[11px] uppercase tracking-[0.26em] transition-colors hover:text-text"
                  >
                    <Instagram size={16} />
                    Instagram
                  </a>
                  <a
                    href="https://youtube.com/@NoahsPianoJourney?sub_confirmation=1"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-body text-[11px] uppercase tracking-[0.26em] transition-colors hover:text-text"
                  >
                    <Youtube size={16} />
                    YouTube
                  </a>
                  <a
                    href="mailto:noahzh52@gmail.com"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-body text-[11px] uppercase tracking-[0.26em] transition-colors hover:text-text"
                  >
                    <Mail size={16} />
                    Email
                  </a>
                </div>
              </div>

              <div className="md:col-span-7">
                <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">{t.techSkills}</div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "JavaScript",
                    "C#",
                    "Node.js",
                    "Tailwind",
                    "Framer Motion",
                    "Cloud",
                    "Figma",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border bg-background px-3 py-1 font-body text-[11px] uppercase tracking-[0.26em] text-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
                  <a
                    href="mailto:noahzh52@gmail.com"
                    className="inline-flex items-center gap-2 font-display text-2xl tracking-tight transition-colors hover:text-accent"
                  >
                    {t.cta}
                    <ArrowUpRight size={18} />
                  </a>
                  <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">
                    © 2026 Noah Zixin Zhang
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
