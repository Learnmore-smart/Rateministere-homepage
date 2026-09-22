"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Blocks, Lock, Mail } from "lucide-react";
import ProtectedImage from "@/components/ProtectedImage";
import BrandIcon from "@/components/icons/brands";
import { useLang, langLabels, langOrder } from "@/components/LanguageContext";
import {
  ARCHIVE,
  FEATURED,
  PIANO,
  PORTRAIT,
  PROFILE,
  RECOGNITION,
  SECRET,
  SOCIALS,
  STARTERKIT,
} from "@/lib/content";
import styles from "./stack.module.css";

/* archive clip id → t.projects key (same map the sequencer uses) */
const ARCHIVE_I18N: Record<string, string> = {
  wechat: "wechat-read-dashboard",
  "quote-cloud": "quote-cloud",
  "trae-echoes": "trae-echoes",
  wyt: "waste-your-tokens",
  enforcer: "enforcer",
  atlas: "hidden-china-atlas",
  panic: "release-panic-room",
  rate: "rateministere",
  caelum: "caelum",
  msu: "mari-msu-2026",
};
const REC_I18N = [
  "trae-annual-contributor",
  "trae-vol3-quality",
  "trae-vol4-top",
  "trae-community-star",
];

const PACKS = [
  { id: "obsidian", dot: "#efb779" },
  { id: "graphite", dot: "#c8c8c8" },
  { id: "midnight", dot: "#8eb4e8" },
  { id: "ink", dot: "#ffffff" },
] as const;
type PackId = (typeof PACKS)[number]["id"];

/* brand mark — three fader bars, the middle one signal-hot */
function StackMark() {
  return (
    <svg className={styles.mark} viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="4" height="14" rx="1" stroke="var(--text)" strokeOpacity="0.9" strokeWidth="1.4" />
      <rect x="9" y="7" width="4" height="11" rx="1" fill="var(--accent)" />
      <rect x="15" y="4" width="4" height="14" rx="1" stroke="var(--text)" strokeOpacity="0.9" strokeWidth="1.4" />
    </svg>
  );
}

function hostOf(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function StackPage() {
  const { t, lang, setLang } = useLang();
  const s = t.stack;
  const [scrolled, setScrolled] = useState(false);
  const [pack, setPack] = useState<PackId>("obsidian");
  const [reduced, setReduced] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const menuTitle = useId();

  /* pack boot: localStorage → <html data-stack-pack> + state */
  useEffect(() => {
    let saved: PackId | null = null;
    try {
      const raw = localStorage.getItem("stack_pack") as PackId | null;
      if (raw && PACKS.some((p) => p.id === raw)) saved = raw;
    } catch {
      /* private mode */
    }
    if (saved) document.documentElement.dataset.stackPack = saved;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqNow = mq.matches;
    /* async hydration — sync setState in effect body is disallowed */
    setTimeout(() => {
      if (saved) setPack(saved);
      setReduced(mqNow);
    }, 0);
    const onMq = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  /* pack → <html data-stack-pack> (kept in an effect: DOM mutation) */
  useEffect(() => {
    document.documentElement.dataset.stackPack = pack;
  }, [pack]);

  const pickPack = (id: PackId) => {
    setPack(id);
    try {
      localStorage.setItem("stack_pack", id);
    } catch {
      /* private mode */
    }
  };

  /* header condenses once the hero scrolls under it */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* once-only reveals — marked here so no-JS never hides content */
  useEffect(() => {
    const els = root.current?.querySelectorAll("[data-reveal]");
    if (!els?.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.revealed = "true";
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => {
      (el as HTMLElement).dataset.revealed = "false";
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const openMenu = () => dialog.current?.showModal();
  const closeMenu = () => dialog.current?.close();

  const NAV = [
    { href: "#piano", label: s.nav.piano },
    { href: "#work", label: s.nav.work },
    { href: "#archive", label: s.nav.archive },
    { href: "#about", label: s.nav.about },
  ];

  const featuredDesc = (id: string) => {
    const f = t.featured as Record<string, { description?: string }>;
    const r = t.recent as Record<string, { description?: string }>;
    const p = t.projects as Record<string, { description?: string }>;
    return f[id]?.description ?? r[id]?.description ?? p[id]?.description ?? "";
  };
  const archiveI18n = (id: string) => {
    const named = t.projects as Record<string, { name: string; description: string }>;
    return named[ARCHIVE_I18N[id] ?? id];
  };

  return (
    <div ref={root} className={styles.stack}>
      {/* pre-paint pack restore (SSR'd inline so there's no flash) */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            "try{var p=localStorage.getItem('stack_pack');if(p)document.documentElement.dataset.stackPack=p}catch(e){}",
        }}
      />
      <a className={styles.skip} href="#main">
        Skip to content
      </a>

      {/* ═══ header ═══ */}
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
        <div className={styles.headerInner}>
          <Link aria-label="Noah Zixin Zhang — home" className={styles.brand} href="/">
            <StackMark />
            <span>Noah Zixin Zhang</span>
          </Link>
          <nav aria-label="Page sections" className={styles.desktopNav}>
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className={styles.headerEnd}>
            <div className={styles.langs} role="group" aria-label="Language">
              {langOrder.map((l) => (
                <button
                  key={l}
                  type="button"
                  aria-pressed={lang === l}
                  onClick={() => setLang(l)}
                >
                  {langLabels[l]}
                </button>
              ))}
            </div>
            <a className={`${styles.btn} ${styles.btnPrimary} ${styles.headerCta}`} href={`mailto:${PROFILE.email}`}>
              {s.hello}
            </a>
            <button
              type="button"
              className={styles.menuButton}
              aria-haspopup="dialog"
              aria-label="Open menu"
              onClick={openMenu}
            >
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      <dialog
        ref={dialog}
        className={styles.menuDialog}
        aria-labelledby={menuTitle}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMenu();
        }}
      >
        <div className={styles.menuPanel}>
          <div className={styles.menuTop}>
            <p id={menuTitle}>{s.menu}</p>
            <button type="button" className={styles.menuClose} aria-label="Close menu" onClick={closeMenu}>
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav aria-label="Page sections" className={styles.mobileNav}>
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={closeMenu}>
                {n.label}
              </a>
            ))}
            <Link href="/concepts" onClick={closeMenu}>
              {s.nav.concepts}
            </Link>
          </nav>
          <div className={styles.menuFoot}>
            <div className={styles.langs} role="group" aria-label="Language">
              {langOrder.map((l) => (
                <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>
                  {langLabels[l]}
                </button>
              ))}
            </div>
            <a className={`${styles.btn} ${styles.btnPrimary}`} href={`mailto:${PROFILE.email}`} onClick={closeMenu}>
              {s.hello}
            </a>
          </div>
        </div>
      </dialog>

      <main className={styles.main} id="main">
        {/* ═══ hero ═══ */}
        <section className={styles.hero} aria-labelledby="hero-title">
          <p className={styles.heroKicker}>{s.heroKicker}</p>
          <h1 className={styles.heroTitle} id="hero-title">
            {s.heroTitleA}
            <em>{s.heroTitleB}</em>
          </h1>
          <p className={styles.heroLede}>{s.heroLede}</p>
          <div className={styles.heroActions}>
            <a className={`${styles.btn} ${styles.btnPrimary}`} href="#work">
              {s.heroPrimary}
            </a>
            <a
              className={`${styles.btn} ${styles.btnSecondary}`}
              href={PIANO.url}
              target="_blank"
              rel="noreferrer"
            >
              {s.heroSecondary}
              <ArrowUpRight className={styles.btnArrow} size={15} aria-hidden="true" />
            </a>
          </div>
          <div className={styles.heroMeta}>
            <span>{PROFILE.location}</span>
            <span>{PROFILE.school}</span>
            <span>{PROFILE.languages}</span>
          </div>
        </section>

        {/* ═══ piano spotlight ═══ */}
        <section className={styles.section} id="piano" aria-labelledby="piano-title">
          <div className={styles.pianoGrid}>
            <div className={styles.pianoCopy} data-reveal>
              <p className={styles.kicker}>{s.pianoKicker}</p>
              <h2 id="piano-title">
                Noah’s <em>Piano Journey</em>
              </h2>
              <p>{s.pianoBlurb}</p>
              <div className={styles.statRow}>
                <div className={styles.stat}>
                  <b>{PIANO.views}</b>
                  <span>{s.pianoViews}</span>
                </div>
                <div className={styles.stat}>
                  <b>{PIANO.viralShort}</b>
                  <span>{s.pianoShort}</span>
                </div>
                <span className={styles.statLive}>
                  <i aria-hidden="true" />
                  {s.pianoRecording}
                </span>
              </div>
              <div className={styles.pianoActions}>
                <a className={`${styles.btn} ${styles.btnPrimary}`} href={PIANO.url} target="_blank" rel="noreferrer">
                  {s.pianoCta}
                  <ArrowUpRight className={styles.btnArrow} size={15} aria-hidden="true" />
                </a>
              </div>
            </div>
            <figure className={styles.videoFrame} data-reveal>
              <video
                src={PIANO.demoVideo}
                poster="/Noah-Piano-Journey.png"
                autoPlay={!reduced}
                controls={reduced}
                muted
                loop
                playsInline
                preload="metadata"
              />
              <figcaption className={styles.videoCaption}>
                <p>{s.pianoCaption}</p>
                <span className={styles.rec}>
                  <i aria-hidden="true" />
                  Tutorial
                </span>

              </figcaption>
            </figure>
          </div>
        </section>

        {/* ═══ selected work ═══ */}
        <section className={styles.section} id="work" aria-labelledby="work-title">
          <div className={styles.sectionHead} data-reveal>
            <h2 id="work-title">{s.workTitle}</h2>
            <p>{s.workSub}</p>
          </div>
          <div className={styles.workGrid}>
            {FEATURED.map((p, i) => (
              <a
                key={p.id}
                className={styles.card}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                aria-label={p.name}
                data-reveal
                style={i ? { transitionDelay: `${i * 70}ms` } : undefined}
              >
                <div className={styles.cardImg}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt="" loading="lazy" />
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <h3>{p.name}</h3>
                    <span>{p.year}</span>
                  </div>
                  <p>{featuredDesc(p.id)}</p>
                  <span className={styles.cardLink}>
                    {hostOf(p.url)}
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </span>
                </div>
              </a>
            ))}
            <div className={`${styles.card} ${styles.cardGhost}`} data-reveal style={{ transitionDelay: "210ms" }}>
              <div className={styles.cardImg}>
                <Blocks size={40} strokeWidth={1.2} aria-hidden="true" />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <h3>{STARTERKIT.name}</h3>
                  <span>{STARTERKIT.year}</span>
                </div>
                <p>{STARTERKIT.desc}</p>
                <span className={styles.chip}>
                  <i aria-hidden="true" />
                  {s.kitStatus}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ archive ═══ */}
        <section className={styles.section} id="archive" aria-labelledby="archive-title">
          <div className={styles.sectionHead} data-reveal>
            <h2 id="archive-title">{s.archiveTitle}</h2>
            <p>{s.archiveSub}</p>
          </div>
          <div className={styles.archiveList} data-reveal>
            {ARCHIVE.map((p) => {
              const i18n = archiveI18n(p.id);
              const external = p.url.startsWith("http");
              return (
                <a
                  key={p.id}
                  className={styles.archiveRow}
                  href={p.url}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  <span className={styles.archiveName}>
                    {i18n?.name ?? p.name}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </span>
                  <span className={styles.archiveDesc}>{i18n?.description ?? p.desc}</span>
                  <span className={styles.archiveYear}>{p.year}</span>
                </a>
              );
            })}
          </div>
        </section>

        {/* ═══ about ═══ */}
        <section className={styles.section} id="about" aria-labelledby="about-title">
          <div className={styles.sectionHead} data-reveal>
            <h2 id="about-title">{s.aboutTitle}</h2>
          </div>
          <div className={styles.aboutGrid}>
            <div data-reveal>
              <ProtectedImage src={PORTRAIT.full} alt="Noah Zixin Zhang" className={styles.portrait} />
            </div>
            <div data-reveal>
              <p style={{ color: "var(--muted)", maxWidth: "36rem", textWrap: "pretty" }}>{s.aboutBio}</p>
              <dl className={styles.facts}>
                <div>
                  <dt>{s.factLocation}</dt>
                  <dd>{PROFILE.location}</dd>
                </div>
                <div>
                  <dt>{s.factSchool}</dt>
                  <dd>{PROFILE.school}</dd>
                </div>
                <div>
                  <dt>{s.factLanguages}</dt>
                  <dd>{PROFILE.languages}</dd>
                </div>
                <div>
                  <dt>{s.factType}</dt>
                  <dd>{PROFILE.type}</dd>
                </div>
              </dl>
              <blockquote className={styles.quote}>“{s.quote1}”</blockquote>
              <p className={styles.quoteSmall}>
                “{s.quote2}” — {s.quote2src}
              </p>
              <div className={styles.recStrip}>
                <p>{s.recTitle}</p>
                <div className={styles.recItems}>
                  {RECOGNITION.map((r, i) => {
                    const item = (
                      t.recognitionItems as Record<string, { title: string }>
                    )[REC_I18N[i]];
                    return (
                      <div key={r.title}>
                        <span>{item?.title ?? r.title}</span>
                        <time>{r.period}</time>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ secret + build band ═══ */}
        <section className={styles.section} aria-label="Under wraps">
          <div className={styles.band} data-reveal>
            <div className={styles.bandRow}>
              <Lock size={18} aria-hidden="true" />
              <span className={styles.redacted}>{SECRET.name}</span>
              <span className={styles.alias}>{SECRET.alias}</span>
              <span className={styles.chip}>
                <i aria-hidden="true" />
                {s.secretStatus}
              </span>
              <p className={styles.note}>{s.secretNote}</p>
            </div>
            <div className={styles.bandRow}>
              <span className={styles.buildMark}>build;</span>
              <p className={styles.note}>{s.buildDesc}</p>
            </div>
          </div>
        </section>

        {/* ═══ cta ═══ */}
        <section className={styles.cta} id="contact" aria-labelledby="cta-title">
          <h2 id="cta-title" data-reveal>
            {s.ctaTitle}
          </h2>
          <p data-reveal>{s.ctaSub}</p>
          <div className={styles.ctaRow} data-reveal>
            <a className={`${styles.btn} ${styles.btnPrimary}`} href={`mailto:${PROFILE.email}`}>
              <Mail size={15} aria-hidden="true" />
              {PROFILE.email}
            </a>
          </div>
          <a className={styles.xLine} href={SOCIALS.x.url} target="_blank" rel="noreferrer" data-reveal>
            <BrandIcon name="x" size={13} />
            {SOCIALS.x.handle}
            <ArrowUpRight size={12} aria-hidden="true" />
          </a>
        </section>
      </main>

      {/* ═══ footer ═══ */}
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <Link className={styles.brand} href="/">
              <StackMark />
              <span>Noah Zixin Zhang</span>
            </Link>
            <p>{s.footerNote}</p>
          </div>
          <nav className={styles.socials} aria-label="Social links">
            <a href={SOCIALS.github.url} target="_blank" rel="noreferrer">
              <BrandIcon name="github" size={14} />
              GitHub
            </a>
            <a href={SOCIALS.youtube.url} target="_blank" rel="noreferrer">
              <BrandIcon name="youtube" size={14} />
              YouTube
            </a>
            <a href={SOCIALS.instagram.url} target="_blank" rel="noreferrer">
              <BrandIcon name="instagram" size={14} />
              Instagram
            </a>
            <a href={SOCIALS.bilibili.url} target="_blank" rel="noreferrer">
              <BrandIcon name="bilibili" size={14} />
              Bilibili
            </a>
            <a href={SOCIALS.rednote.url} target="_blank" rel="noreferrer">
              <BrandIcon name="rednote" size={14} />
              RedNote
            </a>
          </nav>
        </div>
        <div className={styles.footerBottom}>
          <small>
            {s.copyright} ·{" "}
            <Link href="/concepts" style={{ color: "inherit" }}>
              /concepts
            </Link>
          </small>
          <div className={styles.picker} role="group" aria-label={s.theme}>
            <span>{s.theme}</span>
            {PACKS.map((p) => (
              <button
                key={p.id}
                type="button"
                aria-pressed={pack === p.id}
                onClick={() => pickPack(p.id)}
              >
                <i style={{ background: p.dot }} aria-hidden="true" />
                {p.id}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
