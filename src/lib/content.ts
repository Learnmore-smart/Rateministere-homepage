// Shared facts for the homepage (`/` — RollPage) and every archived study
// (/stack, /sequencer, /arcade, /atlas, /recital, /os). English source;
// translated copy lives in src/i18n.

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
  url: "https://www.youtube.com/@pianowithnoah",
  handle: "@pianowithnoah",
  views: "14,000,000+",
  viralShort: "4,500,000+",
  blurb:
    "A piano channel built for beginners: simple practice routines, first pieces, and step-by-step progress. Over fourteen million views, including a Short watched four and a half million times.",
  demoVideo: "/Videos-demo/Für Elise - Easy piano tutorial (1).mp4",
} as const;

export const PORTRAIT = {
  full: "/p/nz-7f3a9d.jpg", // 768×1024
  square: "/p/nz-4e1b8c.jpg", // 1024×1024
} as const;

export const SOCIALS = {
  x: { label: "X", handle: "@noah_z_zhang", url: "https://x.com/noah_z_zhang" },
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
    desc: "The production SaaS starter kit: auth, billing, i18n, themes and AI wiring in one repo.",
    url: "https://supastack.dev",
    image: "/supastack-OG.png",
  },
  {
    id: "learnx",
    name: "LearnX",
    year: "2026",
    desc: "Exam preparation platform that chunks files into units and drills them with spaced repetition.",
    url: "https://www.learnx.pro",
    image: "/LearnX-OG.png",
  },
  {
    id: "cairn",
    name: "Cairn",
    year: "2026",
    desc: "A Windows memory radar, disk bloat treemap and NTFS deny-delete vault with one-way cloud backup.",
    url: "https://cairn.supastack.dev",
    image: "/cairn-OG.png",
  },
  {
    id: "spinshare",
    name: "SpinShare",
    year: "2026",
    desc: "A Windows-native radial file converter. Drag any file, tap Shift, and convert between formats mid-gesture without uploads.",
    url: "https://spinshare.dev",
    image: "/spinshare-OG.png",
  },
  {
    id: "blade",
    name: "BLADE",
    year: "2026",
    desc: "An open-source de-hardening pipeline. It strips BLA defenses from protected artifacts so analyzers read the real logic instead of the decoys.",
    url: "https://github.com/Learnmore-smart/BLADE",
    github: "https://github.com/Learnmore-smart/BLADE",
    image: "/blade-OG.png",
  },
  {
    id: "pluto",
    name: "Pluto",
    year: "2026",
    desc: "A self-hosted AI companion for Discord servers. It answers mentions, browses the web, executes tools, and holds long-term memory.",
    url: "https://pluto.rateministere.com",
    image: "/pluto-OG.png",
  },
  {
    id: "vorlee",
    name: "Vorlee",
    year: "2026",
    desc: "Find leads on X who need what you build. Vorlee drafts personalized first messages while keeping your accounts safe.",
    url: "https://vorlee.com",
    image: "/vorlee-OG.png",
  },
  {
    id: "fklearn",
    name: "FkLearn",
    year: "2026",
    desc: "A student tutoring marketplace with affordable tutoring for students. Waitlist now open.",
    url: "https://fklearn.com",
    image: "/fklearn-OG.png",
  },
];

// Late-2025 launch film for LearnX — pre-rebuild footage, kept as an artifact.
export const LEARNX_FILM = {
  url: "https://youtu.be/u1BplKvekjc",
  embed: "https://www.youtube-nocookie.com/embed/u1BplKvekjc?autoplay=1&rel=0",
  poster: "/learnx-film.jpg", // 1280×720
} as const;

export const SUPASTACK_FILM = {
  url: "https://youtu.be/sAB3zR1uzW4",
  embed: "https://www.youtube-nocookie.com/embed/sAB3zR1uzW4?autoplay=1&rel=0",
  poster: "/supastack-film.jpg", // 1280×720
} as const;

// The unknown secret project — deliberately redacted everywhere.
export const SECRET = {
  name: "██████████",
  alias: "TERRA INCOGNITA",
  year: "████",
  desc: "Details withheld until launch. The house is asked to keep its secrets.",
} as const;

export const ARCHIVE: Project[] = [
  {
    id: "opennotes",
    name: "OpenNotes",
    year: "2025–2026",
    desc: "A quiet, pen-first PDF annotation workspace for Windows.",
    url: "https://learnmore-smart.github.io/OpenNotes/",
    github: "https://github.com/Learnmore-smart/OpenNotes",
  },
  {
    id: "novapuraai",
    name: "NovapuraAI",
    year: "2026",
    desc: "OpenAI-compatible API router and gateway.",
    url: "https://novapuraai.com",
    github: "https://github.com/Learnmore-smart/novapuraai-router",
  },
  {
    id: "file-guardian",
    name: "File Guardian",
    year: "2026",
    desc: "Agent skill that makes AI write documentation before writing code.",
    url: "https://github.com/Learnmore-smart/file-guardian-skill",
    github: "https://github.com/Learnmore-smart/file-guardian-skill",
  },
  { id: "wechat", name: "WeChat Read Dashboard", year: "2026", desc: "Personal reading statistics and visualization.", url: "/wechat-read-stats", github: "https://github.com/Learnmore-smart/Wechat-read-dashboard" },
  { id: "quote-cloud", name: "Quote Cloud", year: "2026", desc: "An interactive cloud of curated quotes.", url: "/quote-cloud", github: "https://github.com/Learnmore-smart/Quote-Cloud" },
  { id: "trae-echoes", name: "Voice Ink Echoes", year: "2026", desc: "3D mood app that paints mountains with sound.", url: "/trae-echoes", github: "https://github.com/Learnmore-smart/Trae-Echoes-2026_contest" },
  { id: "wyt", name: "Waste Your Tokens", year: "2026", desc: "A website to help you waste tokens.", url: "/waste-your-tokens", github: "https://github.com/Learnmore-smart/Waste-your-tokens" },
  { id: "enforcer", name: "Enforcer", year: "2026", desc: "Focus app built in 24 h at MariHacks.", url: "https://www.rateministere.com/Enforcer", github: "https://github.com/Learnmore-smart/Marihacks-IX-2026" },
  { id: "atlas", name: "Hidden China Atlas", year: "2026", desc: "Interactive geographic atlas.", url: "/hidden-china-atlas", github: "https://github.com/Learnmore-smart/Hidden-China-Atlas" },
  { id: "panic", name: "Release Panic Room", year: "2026", desc: "A last-minute stress game.", url: "/release-panic-room", github: "https://github.com/Learnmore-smart/Release-Panic-Room" },
  { id: "msu", name: "Mari MSU 2026", year: "2026", desc: "Student portal design.", url: "/mari-msu-2026", github: "https://github.com/Learnmore-smart/Mari-MSU-2026" },
  { id: "rate", name: "RateMinistere", year: "2025", desc: "Teacher voting platform.", url: "/rateministere", github: "https://github.com/Learnmore-smart/RateMinistere" },
];

export const RECOGNITION = [
  { title: "Trae 2025 Annual Contributor", period: "2025" },
  { title: "Quality Share Award, Tips Vol.3", period: "2025.05" },
  { title: "Top Practical Tips Award, Vol.4", period: "2025" },
  { title: "Community Star", period: "2025–26" },
] as const;
