"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Award, ChevronDown, Facebook, Github, Globe, Instagram, Mail, Youtube } from "lucide-react";

const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const BilibiliIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z" />
  </svg>
);

const XiaohongshuIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor" aria-hidden>
    <path d="M 29,0.33332825 C 13.959937,3.4666748 1.5356731,15.204498 0,31 -1.586103,47.314209 0,64.597672 0,81 v 102 c 0,18.76035 -4.7369685,44.19888 7.3333335,60 C 20.372129,260.06897 44.156731,256 63,256 h 111 35 c 5.78276,0 12.33244,0.84741 18,-0.33333 15.0401,-3.13336 27.46432,-14.87115 29,-30.66667 1.58612,-16.31419 0,-33.59769 0,-50 V 73 C 256,54.239685 260.73697,28.801102 248.66667,13 235.62787,-4.0689697 211.84329,0 193,0 H 82 47 C 41.217228,0 34.667561,-0.84741211 29,0.33332825 M 120,91 l -7,19 h 12 l -10,24 9,1 c -0.98794,2.68155 -2.31718,7.73317 -4.33334,9.83334 C 118.18945,146.3721 115.92654,146 114,146 c -4.35942,0 -13.16798,1.80539 -15.5,-3 -1.069664,-2.20416 0.465553,-4.98451 1.333336,-7 1.813624,-4.21228 4.222554,-8.51549 5.166664,-13 -2.17548,0 -4.92464,0.42967 -7,-0.33333 -7.778526,-2.85974 0.874031,-15.36435 2.66666,-19.66667 1.25875,-3.020981 2.75652,-9.584732 5.5,-11.5 C 110.01874,88.810822 115.88325,90.674988 120,91 m -79,63 c 2.750713,0 6.837379,0.81721 8.5,-2 1.769028,-2.99753 0.5,-9.58963 0.5,-13 V 106 C 50,102.90659 48.438198,93.464493 51.166668,91.5 53.41069,89.884308 62.832935,90.226166 63.833332,93 65.47065,97.539825 64,105.16241 64,110 v 32 c 0,5.48389 0.949112,11.8645 -1.333332,17 -2.177158,4.89861 -12.303417,9.27243 -17.333336,5.5 C 43.120155,162.84012 41.545292,156.59013 41,154 M 193,91 v 5 c 3.72887,0 8.4108,-0.763367 12,0.333328 11.97635,3.659424 11,15.422502 11,25.666672 1.99706,0 4.04419,-0.15562 6,0.33333 11.49335,2.87334 10,14.36401 10,23.66667 0,4.95615 0.93086,10.82184 -2.33333,15 -3.59567,4.60246 -9.48195,4 -14.66667,4 -1.6116,0 -4.26318,0.51051 -5.66667,-0.5 -2.62326,-1.88875 -3.78159,-7.50485 -4.33333,-10.5 3.28711,0 9.2179,1.12517 11.83333,-1.33334 C 219.9164,149.76859 218.65411,138.43454 215,136.5 c -1.93661,-1.02527 -4.88672,-0.5 -7,-0.5 h -15 v 29 h -14 v -29 h -14 v -14 h 14 v -12 h -9 V 96 h 9 v -5 h 14 m -32,5 v 14 h -8 v 42 h 13 v 13 H 120 L 125.33334,152.5 138,152 v -42 h -8 V 96 h 31 m 57,14 c 0,-2.84204 -0.51608,-6.25871 0.33333,-9 3.34434,-10.793121 19.61577,-2.093994 11.5,6.83333 -0.92279,1.01507 -2.54419,1.51106 -3.83333,1.83334 C 223.43948,110.30679 220.61993,110 218,110 M 41,110 36.833332,147 30,159 24,143 27,110 h 14 m 46,0 3,33 -6,15 h -2 c -5.366936,-8.49765 -6.053299,-17.26251 -7,-27 -0.672195,-6.91406 -2,-14.04004 -2,-21 h 14 m 106,0 v 12 h 9 v -12 h -9 m -75,42 -5,13 H 91 L 96.333336,151.5 104,151.66666 Z" />
  </svg>
);

import en from "@/i18n/en.json";
import zh from "@/i18n/zh.json";
import fr from "@/i18n/fr.json";

const locales = { en, zh, fr } as const;
type Lang = keyof typeof locales;

const langLabels: Record<Lang, string> = { en: "EN", zh: "中文", fr: "FR" };
const langOrder: Lang[] = ["en", "zh", "fr"];

type ProjectMeta = {
  id: string;
  path: string;
  year: string;
  github?: string;
};

const projects: ProjectMeta[] = [
  { id: "wechat-read-dashboard", path: "/wechat-read-stats", year: "2026", github: "https://github.com/Learnmore-smart/Wechat-read-dashboard" },
  { id: "quote-cloud", path: "/quote-cloud", year: "2026", github: "https://github.com/Learnmore-smart/Quote-Cloud" },
  { id: "waste-your-tokens", path: "/waste-your-tokens", year: "2026", github: "https://github.com/Learnmore-smart/Waste-your-tokens" },
  { id: "enforcer", path: "https://www.rateministere.com/Enforcer", year: "2026", github: "https://github.com/Learnmore-smart/Marihacks-IX-2026" },
  { id: "hidden-china-atlas", path: "/hidden-china-atlas", year: "2026", github: "https://github.com/Learnmore-smart/Hidden-China-Atlas" },
  { id: "release-panic-room", path: "/release-panic-room", year: "2026", github: "https://github.com/Learnmore-smart/Release-Panic-Room" },
  { id: "rateministere", path: "/rateministere", year: "2026", github: "https://github.com/Learnmore-smart/RateMinistere" },
  { id: "caelum", path: "https://github.com/Learnmore-smart/Caelum", year: "2026", github: "https://github.com/Learnmore-smart/Caelum" },
  { id: "mari-msu-2026", path: "/mari-msu-2026", year: "2026", github: "https://github.com/Learnmore-smart/Mari-MSU-2026" },
  { id: "zhich-pvp", path: "https://github.com/Learnmore-smart/zhich-pvp-auto_aim_bot", year: "2025", github: "https://github.com/Learnmore-smart/zhich-pvp-auto_aim_bot" },
  { id: "code-share", path: "https://github.com/Learnmore-smart/Trae-code-share", year: "2025", github: "https://github.com/Learnmore-smart/Trae-code-share" },
  { id: "discord-fish", path: "https://github.com/Learnmore-smart/Discord_fish", year: "2025", github: "https://github.com/Learnmore-smart/Discord_fish" },
];

const sideProjects: ProjectMeta[] = [
  { id: "2d-shooter", path: "https://github.com/Learnmore-smart/2D-shooter", year: "2026" },
  { id: "christmas-2025-cyberpunk", path: "https://github.com/Learnmore-smart/7-Trae-opens-Christmas-2025-cyberpunk", year: "2025" },
  { id: "christmas-2025-snow", path: "https://github.com/Learnmore-smart/6-Trae-opens-Christmas-2025-snow", year: "2025" },
  { id: "academic-tutoring", path: "https://github.com/Learnmore-smart/TUTORING-LANDING-PAGE", year: "2025" },
];

type RecognitionMeta = {
  id: string;
  period: string;
};

const recognitions: RecognitionMeta[] = [
  { id: "trae-annual-contributor", period: "2025" },
  { id: "trae-vol3-quality", period: "2025.05" },
  { id: "trae-vol4-top", period: "2025" },
  { id: "trae-community-star", period: "2025–26" },
];

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");

  const workRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: workRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.6,
  });

  const yImage1 = useTransform(smoothProgress, [0, 1], ["-8%", "8%"]);
  const yImage2 = useTransform(smoothProgress, [0, 1], ["8%", "-8%"]);

  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userLang = navigator.language.toLowerCase();
    if (userLang.includes("zh")) setLang("zh");
    else if (userLang.includes("fr")) setLang("fr");
    else setLang("en");
  }, []);

  const t = useMemo(() => locales[lang], [lang]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectLang = useCallback((l: Lang) => {
    setLang(l);
    setLangOpen(false);
  }, []);

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
              <span className="font-display text-sm tracking-tight">{t.header.name}</span>
              <span className="hidden sm:inline font-body text-[11px] uppercase tracking-[0.26em] text-muted">
                {t.header.portfolio}
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <span className="hidden md:flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-body text-[11px] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {t.hero.ongoing}
              </span>

              <div ref={langRef} className="relative">
                <button
                  type="button"
                  onClick={() => setLangOpen((v) => !v)}
                  className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 font-body text-[11px] uppercase tracking-[0.26em] text-muted transition-colors hover:text-text"
                >
                  {langLabels[lang]}
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      langOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`lang-dropdown absolute right-0 top-[calc(100%+8px)] min-w-[120px] overflow-hidden rounded-xl border border-border bg-surface/90 shadow-lg shadow-black/[0.06] backdrop-blur-xl ${
                    langOpen ? "lang-dropdown--open" : ""
                  }`}
                >
                  {langOrder.map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => selectLang(l)}
                      className={`flex w-full items-center gap-2 px-4 py-2.5 font-body text-[11px] uppercase tracking-[0.26em] transition-colors duration-150 hover:bg-accent/8 hover:text-text ${
                        l === lang ? "text-accent" : "text-muted"
                      }`}
                    >
                      <span
                        className={`inline-block h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                          l === lang
                            ? "scale-100 bg-accent opacity-100"
                            : "scale-0 bg-transparent opacity-0"
                        }`}
                      />
                      {langLabels[l]}
                    </button>
                  ))}
                </div>
              </div>
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
                  {t.hero.role} · {t.hero.location}
                </div>

                <h1 className="mt-6 font-display text-[12vw] leading-[0.95] tracking-[-0.05em] sm:text-6xl md:text-7xl">
                  Noah Zixin <span className="text-accent">Zhang</span>
                </h1>

                <p className="mt-6 max-w-xl font-body text-sm leading-relaxed text-muted md:text-base">
                  {t.hero.description}
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Link
                    href="#work"
                    className="inline-flex items-center gap-2 rounded-full bg-text px-5 py-2.5 font-body text-[11px] uppercase tracking-[0.26em] text-background transition-colors hover:bg-accent"
                  >
                    {t.hero.explore}
                    <ArrowUpRight size={16} />
                  </Link>

                  <Link
                    href="#archive"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 font-body text-[11px] uppercase tracking-[0.26em] text-text transition-colors hover:border-text/30"
                  >
                    {t.hero.directory}
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
                    <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">{t.background.title}</div>
                    <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">{t.background.year}</div>
                  </div>

                  <p className="mt-6 font-body text-sm leading-relaxed text-muted">{t.background.bio}</p>

                  <div className="mt-10 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-border bg-background px-4 py-3">
                      <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">{t.background.cards.focusLabel}</div>
                      <div className="mt-2 font-display text-sm tracking-tight">{t.background.cards.focusValue}</div>
                    </div>
                    <div className="rounded-2xl border border-border bg-background px-4 py-3">
                      <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">{t.background.cards.strengthLabel}</div>
                      <div className="mt-2 font-display text-sm tracking-tight">{t.background.cards.strengthValue}</div>
                    </div>
                    <div className="rounded-2xl border border-border bg-background px-4 py-3">
                      <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">{t.background.cards.modeLabel}</div>
                      <div className="mt-2 font-display text-sm tracking-tight">{t.background.cards.modeValue}</div>
                    </div>
                    <div className="rounded-2xl border border-border bg-background px-4 py-3">
                      <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">{t.background.cards.detailLabel}</div>
                      <div className="mt-2 font-display text-sm tracking-tight">{t.background.cards.detailValue}</div>
                    </div>
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </section>

        <section id="work" ref={workRef} className="py-20 md:py-28">
          <div className="mx-auto max-w-screen-2xl px-6 md:px-12">
            <div className="flex items-baseline justify-between gap-6 border-b border-border pb-6">
              <h2 className="font-display text-2xl tracking-tight md:text-3xl">{t.featured.title}</h2>
              <span className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">{t.featured.subtitle}</span>
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
                  <motion.div style={{ y: yImage1 }} className="absolute -top-[10%] -bottom-[10%] inset-x-0">
                    <Image
                      src="/LearnX.png"
                      alt="LearnX"
                      fill
                      priority
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                  </motion.div>
                </div>

                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">{t.featured.learnx.label}</div>
                    <div className="mt-2 font-display text-xl tracking-tight md:text-2xl">{t.featured.learnx.heading}</div>
                    <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-muted">{t.featured.learnx.description}</p>
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
                  <motion.div style={{ y: yImage2 }} className="absolute -top-[10%] -bottom-[10%] inset-x-0">
                    <Image
                      src="/Noah-Piano-Journey.png"
                      alt="Noah's Piano Journey"
                      fill
                      priority
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                  </motion.div>
                </div>

                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">{t.featured.piano.label}</div>
                    <div className="mt-2 font-display text-xl tracking-tight md:text-2xl">{t.featured.piano.heading}</div>
                    <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-muted">{t.featured.piano.description}</p>
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
              <h2 className="font-display text-2xl tracking-tight md:text-3xl">{t.archive.title}</h2>
              <span className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">
                {projects.length} {t.archive.entries}
              </span>
            </div>

            <div className="mt-6 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-surface">
              {projects.map((project, idx) => {
                const pt = t.projects[project.id as keyof typeof t.projects];
                const hasWebsite = !project.path.includes("github.com");
                return (
                  <div
                    key={project.id}
                    onClick={() => window.open(project.path, "_blank")}
                    className="block cursor-pointer"
                  >
                    <div className="group flex flex-col gap-3 px-5 py-5 transition-colors hover:bg-background md:flex-row md:items-center md:justify-between md:gap-10 md:px-6">
                      <div className="flex items-center gap-4 md:gap-6">
                        <span className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">
                          {(idx + 1).toString().padStart(2, "0")}
                        </span>
                        <div className="font-display text-lg tracking-tight md:text-xl flex items-center gap-2">
                          <span>{pt.name}</span>
                          {hasWebsite ? (
                            <div className="flex items-center gap-3">
                              <span title="Visit Website" className="flex items-center">
                                <Globe size={14} className="text-muted/50 hover:text-accent transition-colors" />
                              </span>
                              {project.github && (
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="p-1 hover:bg-muted rounded-full transition-colors"
                                  title="View GitHub Repository"
                                >
                                  <Github size={14} className="text-muted/50 hover:text-accent transition-colors" />
                                </a>
                              )}
                            </div>
                          ) : (
                            <span title="View GitHub Repository" className="flex items-center">
                              <Github size={14} className="text-muted/50 hover:text-accent transition-colors" />
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-6 md:w-[56%] md:justify-end md:gap-10">
                        <p className="max-w-[42ch] font-body text-sm leading-relaxed text-muted">{pt.description}</p>
                        <div className="flex items-center gap-3">
                          <span className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">
                            {project.year}
                          </span>
                          <ArrowUpRight className="opacity-0 transition-opacity group-hover:opacity-100" size={18} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Side Projects Section */}
            <div className="mt-20 flex items-baseline justify-between gap-6 border-b border-border pb-6">
              <div>
                <h2 className="font-display text-2xl tracking-tight md:text-3xl">{t.sideProjects.title}</h2>
                <p className="mt-2 font-body text-xs text-muted">{t.sideProjects.description}</p>
              </div>
              <span className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">
                {sideProjects.length} {t.sideProjects.entries}
              </span>
            </div>

            <div className="mt-6 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-surface">
              {sideProjects.map((project, idx) => {
                const pt = t.sideProjectItems[project.id as keyof typeof t.sideProjectItems];
                return (
                  <a
                    key={project.id}
                    href={project.path}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                  >
                    <div className="group flex flex-col gap-3 px-5 py-5 transition-colors hover:bg-background md:flex-row md:items-center md:justify-between md:gap-10 md:px-6">
                      <div className="flex items-center gap-4 md:gap-6">
                        <span className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">
                          {(idx + 1).toString().padStart(2, "0")}
                        </span>
                        <div className="font-display text-lg tracking-tight md:text-xl flex items-center gap-2">
                          <span>{pt.name}</span>
                          {project.path.includes("github.com") ? (
                            <Github size={14} className="text-muted/50 group-hover:text-accent transition-colors" />
                          ) : (
                            <Globe size={14} className="text-muted/50 group-hover:text-accent transition-colors" />
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-6 md:w-[56%] md:justify-end md:gap-10">
                        <p className="max-w-[42ch] font-body text-sm leading-relaxed text-muted">{pt.description}</p>
                        <div className="flex items-center gap-3">
                          <span className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">
                            {project.year}
                          </span>
                          <ArrowUpRight className="opacity-0 transition-opacity group-hover:opacity-100" size={18} />
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Recognition — kept understated */}
            <div className="mt-20 flex items-baseline justify-between gap-6 border-b border-border pb-6">
              <h2 className="font-display text-2xl tracking-tight md:text-3xl">{t.recognition.title}</h2>
              <span className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">
                {t.recognition.badge}
              </span>
            </div>

            <div className="mt-6 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-surface">
              {recognitions.map((item) => {
                const rt = t.recognitionItems[item.id as keyof typeof t.recognitionItems];
                return (
                  <div
                    key={item.id}
                    className="group flex flex-col gap-3 px-5 py-5 md:flex-row md:items-center md:justify-between md:gap-10 md:px-6"
                  >
                    <div className="flex items-center gap-4 md:gap-6">
                      <Award size={14} className="text-muted/40" />
                      <div className="font-display text-lg tracking-tight md:text-xl">
                        {rt.title}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-6 md:w-[56%] md:justify-end md:gap-10">
                      <p className="max-w-[42ch] font-body text-sm leading-relaxed text-muted">
                        {rt.detail}
                      </p>
                      <span className="font-body text-[11px] uppercase tracking-[0.26em] text-muted whitespace-nowrap">
                        {item.period}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <footer className="border-t border-border bg-surface">
          <div className="mx-auto max-w-screen-2xl px-6 py-16 md:px-12 md:py-20">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-5">
                <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">{t.footer.socials}</div>
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
                    <XIcon size={16} />
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
                    href="https://www.facebook.com/profile.php?id=100076544922605"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-body text-[11px] uppercase tracking-[0.26em] transition-colors hover:text-text"
                  >
                    <Facebook size={16} />
                    Facebook
                  </a>
                  <a
                    href="https://space.bilibili.com/3494364930116218"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-body text-[11px] uppercase tracking-[0.26em] transition-colors hover:text-text"
                  >
                    <BilibiliIcon size={16} />
                    Bilibili
                  </a>
                  <a
                    href="https://www.rednote.com/user/profile/5fd4fa600000000001007d2d"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-body text-[11px] uppercase tracking-[0.26em] transition-colors hover:text-text"
                  >
                    <XiaohongshuIcon size={16} />
                    RedNote
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
                <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">{t.footer.capabilities}</div>
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

              </div>
            </div>

            <div className="mt-12 flex flex-col gap-6 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
              <a
                href="mailto:noahzh52@gmail.com"
                className="inline-flex items-center gap-2 font-display text-2xl tracking-tight transition-colors hover:text-accent whitespace-nowrap"
              >
                {t.footer.cta}
                <ArrowUpRight size={18} />
              </a>
              <div className="flex flex-col gap-1 items-center md:items-center text-muted font-body text-xs italic text-center">
                <p>&ldquo;{t.background.quote}&rdquo;</p>
                <p>&ldquo;{t.background.walterMitty}&rdquo;</p>
              </div>
              <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted whitespace-nowrap">
                {t.footer.copyright}
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
