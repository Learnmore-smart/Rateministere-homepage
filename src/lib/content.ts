// Shared facts for the 2026-09 homepage mockups (/recital, /os, /atlas).
// English-only per user decision; classic site keeps i18n.

export const PROFILE = {
  name: "Noah Zixin Zhang",
  short: "N. ZHANG",
  role: "Creative Developer",
  location: "Montreal, QC",
  coords: "45.5019° N / 73.5674° W",
  school: "Marianopolis College",
  languages: "EN · FR · 中文 · ES",
  type: "INTJ",
  email: "noahzh52@gmail.com",
  quotes: [
    "You can give up at any time, so why now?",
    "One day, I'll find my negative No.25",
  ],
} as const;

export const PIANO = {
  channel: "Noah's Piano Journey",
  url: "https://www.youtube.com/@pianowithnoah?sub_confirmation=1",
  handle: "@pianowithnoah",
  views: "12,000,000+",
  viralShort: "3,000,000+",
  blurb:
    "A piano channel built for beginners — simple practice routines, first pieces, and step-by-step progress. Over twelve million views, including a Short watched three million times.",
  demoVideo: "/Videos-demo/Für Elise - Easy piano tutorial (1).mp4",
} as const;

export const PORTRAIT = {
  full: "/p/nz-7f3a9d.jpg", // 768×1024
  square: "/p/nz-4e1b8c.jpg", // 1024×1024
} as const;

export const SOCIALS = {
  x: { label: "X", handle: "@Learnmore_smart", url: "https://x.com/Learnmore_smart" },
  github: { label: "GitHub", url: "https://github.com/Learnmore-smart" },
  youtube: { label: "YouTube", url: PIANO.url },
  instagram: { label: "Instagram", url: "https://www.instagram.com/learnmore_smart/" },
  bilibili: { label: "Bilibili", url: "https://space.bilibili.com/3494364930116218" },
  rednote: { label: "RedNote", url: "https://www.rednote.com/user/profile/5fd4fa600000000001007d2d" },
} as const;

export interface Project {
  id: string;
  name: string;
  year: string;
  desc: string;
  url: string;
  github?: string;
  image?: string;
}

export const FEATURED: Project[] = [
  {
    id: "supastack",
    name: "supastack",
    year: "2026",
    desc: "The production SaaS starter kit — auth, billing, i18n, themes and AI wiring in one repo.",
    url: "https://supastack.dev",
    image: "/supastack-OG.png",
  },
  {
    id: "learnx",
    name: "LearnX",
    year: "2026",
    desc: "Exam preparation platform — chunks files into units, drills them with spaced repetition.",
    url: "https://www.learnx.pro",
    image: "/LearnX-OG.png",
  },
  {
    id: "opennotes",
    name: "OpenNotes",
    year: "2026",
    desc: "A quiet, pen-first PDF annotation workspace for Windows.",
    url: "https://learnmore-smart.github.io/OpenNotes/",
    image: "/OpenNotes.png",
  },
];

// Late-2025 launch film for LearnX — pre-rebuild footage, kept as an artifact.
export const LEARNX_FILM = {
  url: "https://youtu.be/u1BplKvekjc",
  embed: "https://www.youtube-nocookie.com/embed/u1BplKvekjc?autoplay=1&rel=0",
  poster: "/learnx-film.jpg", // 1280×720
} as const;

// The unknown secret project — deliberately redacted everywhere.
export const SECRET = {
  name: "██████████",
  alias: "TERRA INCOGNITA",
  year: "████",
  desc: "Details withheld until launch. The house is asked to keep its secrets.",
} as const;

export const ARCHIVE: Project[] = [
  { id: "wechat", name: "WeChat Read Dashboard", year: "2026", desc: "Personal reading statistics and visualization.", url: "/wechat-read-stats" },
  { id: "quote-cloud", name: "Quote Cloud", year: "2026", desc: "An interactive cloud of curated quotes.", url: "/quote-cloud" },
  { id: "trae-echoes", name: "Voice Ink Echoes", year: "2026", desc: "3D mood app — paints mountains with sound.", url: "/trae-echoes" },
  { id: "wyt", name: "Waste Your Tokens", year: "2026", desc: "A website to help you waste tokens.", url: "/waste-your-tokens" },
  { id: "enforcer", name: "Enforcer", year: "2026", desc: "Focus app built in 24 h at MariHacks.", url: "https://www.rateministere.com/Enforcer" },
  { id: "atlas", name: "Hidden China Atlas", year: "2026", desc: "Interactive geographic atlas.", url: "/hidden-china-atlas" },
  { id: "panic", name: "Release Panic Room", year: "2026", desc: "A last-minute stress game.", url: "/release-panic-room" },
  { id: "rate", name: "RateMinistere", year: "2026", desc: "Teacher voting platform.", url: "/rateministere" },
  { id: "caelum", name: "Caelum", year: "2026", desc: "Windows note-taking app.", url: "https://github.com/Learnmore-smart/Caelum" },
  { id: "msu", name: "Mari MSU 2026", year: "2026", desc: "Student portal design.", url: "/mari-msu-2026" },
];

export const RECOGNITION = [
  { title: "Trae 2025 Annual Contributor", period: "2025" },
  { title: "Quality Share Award — Tips Vol.3", period: "2025.05" },
  { title: "Top Practical Tips Award — Vol.4", period: "2025" },
  { title: "Community Star", period: "2025–26" },
] as const;
