"use client";

/* eslint-disable @next/next/no-img-element --
   every frame is a pre-generated static file under public/roll, so the
   page needs no image optimizer (and spends none of its quota) */

import {
  Fragment,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import { Lightbulb, LightbulbOff, Lock, Play, Volume2, VolumeX } from "lucide-react";
import ProtectedImage from "@/components/ProtectedImage";
import BrandIcon from "@/components/icons/brands";
import { locales } from "@/components/LanguageContext";
import { ToastStack, useToasts } from "@/components/toast";
import { PIANO, PORTRAIT, PROFILE, RECOGNITION, SECRET, SOCIALS } from "@/lib/content";
import LangMenu from "./LangMenu";
import { EARLIER, ROLL, SECRET_NO, printSrc, thumbSrc, type Frame } from "./frames";
import { spreadTheme } from "./themeSpread";
import { useShownLang } from "./useShownLang";
import styles from "./roll.module.css";

/* archive frame id → t.projects key (same map the other studies use) */
const ARCHIVE_I18N: Record<string, string> = {
  opennotes: "opennotes",
  novapuraai: "novapuraai",
  "file-guardian": "file-guardian",
  wechat: "wechat-read-dashboard",
  "quote-cloud": "quote-cloud",
  "trae-echoes": "trae-echoes",
  wyt: "waste-your-tokens",
  enforcer: "enforcer",
  atlas: "hidden-china-atlas",
  panic: "release-panic-room",
  rate: "rateministere",
  msu: "mari-msu-2026",
};
const REC_I18N = [
  "trae-annual-contributor",
  "trae-vol3-quality",
  "trae-vol4-top",
  "trae-community-star",
];

/* prints lie on the table the way they were put down */
const TILTS = [
  "-0.7deg", "0.55deg", "0.45deg", "-0.5deg", "-0.4deg",
  "0.6deg", "0.5deg", "-0.6deg", "0.35deg", "-0.45deg",
];

type Theme = "light" | "dark";

const pad = (n: number) => String(n).padStart(2, "0");

const fill = (tpl: string, vars: Record<string, string | number>) =>
  tpl.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ""));

/* like fill(), but a placeholder can be an element */
function rich(tpl: string, parts: Record<string, ReactNode>) {
  return tpl.split(/(\{\w+\})/g).map((seg, i) => {
    const m = /^\{(\w+)\}$/.exec(seg);
    return <Fragment key={i}>{m ? parts[m[1]] : seg}</Fragment>;
  });
}

function linkLabel(url: string) {
  try {
    const u = new URL(url);
    const host = u.host.replace(/^www\./, "");
    return host === "github.com" ? `${host}${u.pathname.replace(/\/$/, "")}` : host;
  } catch {
    return url;
  }
}

/* brand mark — three bars, the middle one marked */
function Mark() {
  return (
    <svg className={styles.mark} viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="4" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="7" width="4" height="11" rx="1" fill="var(--grease)" />
      <rect x="15" y="4" width="4" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/* the frame-marker arrow printed on film edges — this page's "go" glyph */
function Tri() {
  return (
    <svg className={styles.tri} viewBox="0 0 8 10" width="8" height="10" aria-hidden="true">
      <path d="M0 0 8 5 0 10z" fill="currentColor" />
    </svg>
  );
}

/* A figure that counts up like a frame counter: every digit is a
   column of 0–9 that rolls to its value when it scrolls into view.
   Screen readers get the plain number. */
function Roller({ value }: { value: string }) {
  return (
    <b className={styles.roller} data-reveal="">
      <span className={styles.srOnly}>{value}</span>
      <span aria-hidden="true">
        {Array.from(value).map((ch, i) =>
          /[0-9]/.test(ch) ? (
            <span key={i} className={styles.digit} style={{ "--d": Number(ch), "--k": i } as CSSProperties}>
              <span>
                {Array.from("0123456789").map((n) => (
                  <i key={n}>{n}</i>
                ))}
              </span>
            </span>
          ) : (
            <Fragment key={i}>{ch}</Fragment>
          ),
        )}
      </span>
    </b>
  );
}

/* One frame's image. Film frames stack a negative under the positive;
   prints carry the positive alone. `lazy` marks frames the page may
   hold back until they scroll in (see the develop effect). */
function Pic({
  src,
  print,
  lazy,
  eager,
  ratio,
}: {
  src: string;
  print?: boolean;
  lazy?: boolean;
  eager?: boolean;
  ratio?: string;
}) {
  const loading = eager ? "eager" : "lazy";
  return (
    <span
      className={print ? `${styles.pic} ${styles.picPrint}` : styles.pic}
      data-lazy={lazy ? "" : undefined}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {print ? null : (
        <img className={styles.neg} src={src} alt="" aria-hidden="true" loading={loading} decoding="async" />
      )}
      <img className={styles.pos} src={src} alt="" loading={loading} decoding="async" />
    </span>
  );
}

export default function RollPage() {
  const [reduced, setReduced] = useState(false);
  const { shown, swapping } = useShownLang(reduced);
  const t = locales[shown];
  const s = t.stack;
  const r = t.roll;
  const [scrolled, setScrolled] = useState(false);
  /* the video stays `muted` in the DOM so autoplay keeps working —
     the toggle flips the property on the element */
  const [soundOn, setSoundOn] = useState(false);
  /* film prints stay poster facades until clicked — no YouTube request
     exists before then */
  const [playing, setPlaying] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>("light");
  /* which section sits at mid-screen — lights its nav link */
  const [active, setActive] = useState("");
  const { toasts, push, dismiss } = useToasts();
  const root = useRef<HTMLDivElement>(null);
  const sheet = useRef<HTMLOListElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const menuTitle = useId();

  /* theme boot: localStorage → <html data-roll-theme> + state */
  useEffect(() => {
    let saved: Theme | null = null;
    try {
      const raw = localStorage.getItem("roll_theme");
      if (raw === "light" || raw === "dark") saved = raw;
    } catch {
      /* private mode */
    }
    document.documentElement.dataset.rollTheme = saved ?? "light";
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqNow = mq.matches;
    /* async hydration — sync setState in an effect body is disallowed */
    const id = window.setTimeout(() => {
      if (saved) setTheme(saved);
      setReduced(mqNow);
    }, 0);
    const onMq = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onMq);
    return () => {
      window.clearTimeout(id);
      mq.removeEventListener("change", onMq);
      /* don't leak this page's theme onto the archived studies */
      delete document.documentElement.dataset.rollTheme;
    };
  }, []);

  /* removing autoPlay alone doesn't pause a video that already started */
  useEffect(() => {
    if (reduced) video.current?.pause();
  }, [reduced]);

  useEffect(() => {
    if (video.current) video.current.muted = !soundOn;
  }, [soundOn]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    const id = window.setTimeout(onScroll, 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* The sheet develops on its own (pure CSS, so it also runs without
     JS). If the frames are still downloading when we hydrate, hold the
     wave until they land — developing blank frames wastes the moment. */
  useEffect(() => {
    const el = sheet.current;
    if (!el) return;
    const pending = Array.from(el.querySelectorAll("img")).filter((img) => !img.complete);
    if (pending.length === 0) return;
    el.dataset.hold = "";
    let left = pending.length;
    const release = () => {
      delete el.dataset.hold;
    };
    const tick = () => {
      left -= 1;
      if (left <= 0) release();
    };
    pending.forEach((img) => {
      img.addEventListener("load", tick, { once: true });
      img.addEventListener("error", tick, { once: true });
    });
    const timeout = window.setTimeout(release, 3500);
    return () => {
      window.clearTimeout(timeout);
      pending.forEach((img) => {
        img.removeEventListener("load", tick);
        img.removeEventListener("error", tick);
      });
    };
  }, []);

  /* Scroll choreography. Anything below the fold waits — frames
     undeveloped ([data-lazy] → data-dev), blocks out of sight
     ([data-reveal]) — and plays once when it scrolls in. The waiting
     state is set here, never in markup, so no-JS and reduced motion
     always get the finished page. */
  useEffect(() => {
    const host = root.current;
    if (!host) return;
    /* a finished frame drops its mask and animation */
    const onEnd = (e: AnimationEvent) => {
      const el = e.target as HTMLElement;
      if (el.classList?.contains(styles.pos) && el.parentElement) {
        el.parentElement.dataset.dev = "done";
      }
    };
    host.addEventListener("animationend", onEnd);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => host.removeEventListener("animationend", onEnd);
    }
    const timers: number[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        let together = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          if (el.dataset.dev === "wait") el.dataset.dev = "run";
          if (el.dataset.reveal === "wait") {
            /* things that arrive together step in one after another */
            el.style.setProperty("--s", String(together));
            together += 1;
            el.dataset.reveal = "in";
            /* once it has played, let go — otherwise the reveal's
               transition list keeps overriding the element's own */
            timers.push(
              window.setTimeout(() => {
                el.dataset.reveal = "done";
              }, 2600),
            );
          }
          io.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    const fold = window.innerHeight * 0.92;
    host.querySelectorAll<HTMLElement>("[data-lazy], [data-reveal]").forEach((el) => {
      /* already on screen — holding it back now would flash */
      if (el.getBoundingClientRect().top < fold) return;
      if (el.hasAttribute("data-lazy")) el.dataset.dev = "wait";
      if (el.hasAttribute("data-reveal")) el.dataset.reveal = "wait";
      io.observe(el);
    });
    return () => {
      io.disconnect();
      timers.forEach((id) => window.clearTimeout(id));
      host.removeEventListener("animationend", onEnd);
    };
  }, []);

  /* whichever section crosses mid-screen owns the nav highlight; the
     hero and the contact block own none */
  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          setActive(id === "contact" ? "" : id);
        }
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    host.querySelectorAll("main > section").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const toggleTheme = (e?: MouseEvent<HTMLElement>) => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.rollTheme = next;
      setTheme(next);
      try {
        localStorage.setItem("roll_theme", next);
      } catch {
        /* private mode */
      }
    };
    /* click point → spread origin; keyboard clicks (0,0) use the
       button's centre */
    let origin: { x: number; y: number } | undefined;
    if (e) {
      if (e.clientX || e.clientY) {
        origin = { x: e.clientX, y: e.clientY };
      } else {
        const box = e.currentTarget.getBoundingClientRect();
        origin = { x: box.left + box.width / 2, y: box.top + box.height / 2 };
      }
    }
    spreadTheme(apply, origin);
  };

  const openMenu = () => dialog.current?.showModal();
  const closeMenu = () => dialog.current?.close();

  const top = ROLL[0];
  const channel = ROLL.find((f) => f.kind === "channel") ?? ROLL[0];
  const elise = ROLL.find((f) => f.kind === "video") ?? ROLL[0];
  const selects = ROLL.filter((f) => f.kind === "product" || f.kind === "film");
  const archive = ROLL.filter((f) => f.kind === "archive");
  const products = selects.filter((f) => f.kind === "product").length;
  const anyFresh = ROLL.some((f) => f.fresh);
  const span = (list: Frame[]) =>
    list.length ? `${pad(list[0].n)}–${pad(list[list.length - 1].n)}` : "";

  const NAV = [
    { id: "work", label: s.nav.work, range: span(selects) },
    { id: "piano", label: s.nav.piano, range: span([channel, elise]) },
    { id: "archive", label: s.nav.archive, range: span(archive) },
    { id: "about", label: s.nav.about, range: "" },
  ];

  const featuredDesc = (id: string) => {
    const f = t.featured as Record<string, { description?: string }>;
    const rc = t.recent as Record<string, { description?: string }>;
    const p = t.projects as Record<string, { description?: string }>;
    return f[id]?.description ?? rc[id]?.description ?? p[id]?.description ?? "";
  };
  const archiveI18n = (id: string) => {
    const named = t.projects as Record<string, { name: string; description: string }>;
    return named[ARCHIVE_I18N[id] ?? id];
  };
  const label = (f: Frame) =>
    f.kind === "archive"
      ? (archiveI18n(f.id)?.name ?? f.name)
      : f.kind === "film"
        ? `${f.name} · ${r.film}`
        : f.name;
  const filmCopy: Record<string, { title: string; note: string; play: string }> = {
    "supastack-film": {
      title: s.supastackFilmTitle,
      note: s.supastackFilmNote,
      play: s.supastackFilmPlay,
    },
    "learnx-film": { title: s.filmTitle, note: s.filmNote, play: s.filmPlay },
  };

  const dark = theme === "dark";
  const lightsLabel = dark ? r.lightsOn : r.lightsOff;

  return (
    <div ref={root} className={styles.roll} data-lang-swap={swapping || undefined}>
      {/* pre-paint theme restore (SSR'd inline so there's no flash) */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            "try{document.documentElement.dataset.rollTheme=localStorage.getItem('roll_theme')==='dark'?'dark':'light'}catch(e){document.documentElement.dataset.rollTheme='light'}",
        }}
      />
      <a className={styles.skip} href="#main">
        {r.skip}
      </a>

      {/* ═══ header ═══ */}
      <header className={scrolled ? `${styles.header} ${styles.headerScrolled}` : styles.header}>
        <div className={styles.headerInner}>
          <Link aria-label="Noah Zixin Zhang, home" className={styles.brand} href="/">
            <Mark />
            <span>Noah Zixin Zhang</span>
          </Link>
          <nav aria-label={r.sections} className={styles.nav}>
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} aria-current={active === n.id ? "location" : undefined}>
                {n.label}
                {n.range ? <small>{n.range}</small> : null}
              </a>
            ))}
          </nav>
          <div className={styles.headerEnd}>
            <LangMenu className={styles.langHeader} />
            <button
              type="button"
              className={styles.iconBtn}
              aria-pressed={dark}
              aria-label={lightsLabel}
              title={lightsLabel}
              onClick={toggleTheme}
            >
              {dark ? <Lightbulb size={17} aria-hidden="true" /> : <LightbulbOff size={17} aria-hidden="true" />}
            </button>
            <a className={`${styles.btn} ${styles.headerCta}`} href={`mailto:${PROFILE.email}`}>
              {s.hello}
            </a>
            <button
              type="button"
              className={`${styles.iconBtn} ${styles.menuBtn}`}
              aria-haspopup="dialog"
              aria-label={r.openMenu}
              onClick={openMenu}
            >
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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
        onClose={() => {
          const d = dialog.current?.querySelector("details");
          if (d) {
            d.open = false;
            delete d.dataset.closing;
          }
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMenu();
        }}
      >
        <div className={styles.menuPanel}>
          <div className={styles.menuTop}>
            <p id={menuTitle}>{s.menu}</p>
            <button type="button" className={styles.iconBtn} aria-label={r.closeMenu} onClick={closeMenu}>
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav aria-label={r.sections} className={styles.mobileNav}>
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={closeMenu}>
                {n.label}
                {n.range ? <small>{n.range}</small> : null}
              </a>
            ))}
          </nav>
          <div className={styles.menuFoot}>
            <LangMenu side="top" />
            <button type="button" className={styles.menuLights} aria-pressed={dark} onClick={toggleTheme}>
              {dark ? <Lightbulb size={16} aria-hidden="true" /> : <LightbulbOff size={16} aria-hidden="true" />}
              {lightsLabel}
            </button>
            <a className={styles.btn} href={`mailto:${PROFILE.email}`} onClick={closeMenu}>
              {s.hello}
            </a>
          </div>
        </div>
      </dialog>

      <main className={styles.main} id="main">
        {/* ═══ the sheet ═══ */}
        <section className={`${styles.wrap} ${styles.hero}`} aria-labelledby="hero-title">
          <div className={styles.heroHead}>
            <h1 className={styles.title} id="hero-title">
              <span>{s.heroTitleA}</span>
              <span>{s.heroTitleB}</span>
            </h1>
            <div className={styles.heroSide}>
              <p className={styles.lede}>{fill(r.lede, { n: ROLL.length, m: SECRET_NO })}</p>
              <ul className={styles.meta}>
                <li>{PROFILE.location}</li>
                <li>{PROFILE.school}</li>
                <li>{PROFILE.languages}</li>
              </ul>
            </div>
          </div>

          <nav aria-label={fill(r.sheetLabel, { n: ROLL.length })}>
            <ol className={styles.sheet} ref={sheet}>
              {ROLL.map((f, i) => (
                <li
                  key={f.id}
                  className={styles.cell}
                  style={{ "--w": (i % 8) + Math.floor(i / 8) } as CSSProperties}
                >
                  <a
                    className={styles.seg}
                    href={`#f-${f.id}`}
                    aria-label={`${fill(r.frame, { n: f.n })}: ${label(f)}`}
                  >
                    <span className={styles.film} aria-hidden="true" />
                    <Pic src={thumbSrc(f)} eager />
                    <span className={styles.edge} aria-hidden="true">
                      <b>{pad(f.n)}</b>
                      <span>{label(f)}</span>
                    </span>
                    {f.fresh ? <i className={styles.dot} aria-hidden="true" /> : null}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className={styles.sheetFoot}>
            <p>{r.sheetHint}</p>
            <p className={styles.legend}>
              {anyFresh ? (
                <span>
                  <i className={styles.dotKey} aria-hidden="true" />
                  {r.fresh}
                </span>
              ) : null}
              <span>{fill(r.sheetCount, { n: ROLL.length, m: SECRET_NO })}</span>
            </p>
          </div>
        </section>

        {/* ═══ selected work — the enlargements ═══ */}
        <section className={`${styles.wrap} ${styles.section}`} id="work" aria-labelledby="work-title">
          <header className={styles.head} data-reveal="">
            <h2 className={styles.h2} id="work-title">
              {s.workTitle}
            </h2>
            <p>{fill(r.workSub, { p: products, f: selects.length - products })}</p>
          </header>
          <ol className={styles.prints}>
            {selects.map((f, i) => {
              const film = f.film ? filmCopy[f.id] : undefined;
              const title = film?.title ?? f.name;
              return (
                <li
                  key={f.id}
                  id={`f-${f.id}`}
                  className={styles.print}
                  data-reveal=""
                  data-size={i < 4 ? (i % 2 === 0 ? "wide" : "side") : undefined}
                  style={{ "--tilt": TILTS[i % TILTS.length] } as CSSProperties}
                >
                  {f.film ? (
                    <div className={styles.paper}>
                      {playing === f.id ? (
                        <iframe
                          className={styles.filmFrame}
                          src={f.film.embed}
                          title={title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : (
                        <button
                          type="button"
                          className={styles.filmBtn}
                          aria-label={film?.play ?? title}
                          title={film?.play ?? title}
                          onClick={() => setPlaying(f.id)}
                        >
                          <Pic print src={printSrc(f)} ratio="16 / 9" lazy />
                          <span className={styles.playBadge} aria-hidden="true">
                            <Play size={20} fill="currentColor" />
                          </span>
                        </button>
                      )}
                    </div>
                  ) : (
                    <a
                      className={styles.paper}
                      href={f.url}
                      target="_blank"
                      rel="noreferrer"
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <Pic print src={printSrc(f)} lazy />
                    </a>
                  )}
                  <div className={styles.cap}>
                    <div className={styles.capTop}>
                      <span className={styles.no}>{pad(f.n)}</span>
                      <h3>{title}</h3>
                      {f.fresh ? <span className={styles.tag}>{r.fresh}</span> : null}
                      <span className={styles.year}>{f.year}</span>
                    </div>
                    <p>{film?.note ?? (featuredDesc(f.id) || f.project?.desc)}</p>
                    <div className={styles.capLinks}>
                      <a className={styles.link} href={f.url} target="_blank" rel="noreferrer">
                        {f.project?.github === f.url ? (
                          <span className={styles.ghMark} aria-hidden="true">
                            <BrandIcon name="github" size={15} />
                          </span>
                        ) : null}
                        {linkLabel(f.url)}
                        <Tri />
                      </a>
                      {f.project?.github && f.project.github !== f.url ? (
                        <a
                          className={styles.capGh}
                          href={f.project.github}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={fill(s.ghLabel, { name: f.project.name })}
                          title={fill(s.ghLabel, { name: f.project.name })}
                        >
                          <BrandIcon name="github" size={15} />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {/* ═══ piano ═══ */}
        <section className={`${styles.wrap} ${styles.section} ${styles.piano}`} id="piano" aria-labelledby="piano-title">
          <div className={`${styles.pianoCopy} ${styles.riseGroup}`} data-reveal="">
            <h2 className={styles.h2} id="piano-title">
              {PIANO.channel}
            </h2>
            <p className={styles.pianoLine}>
              {rich(r.pianoLine, {
                views: <Roller value={PIANO.views} />,
                short: <Roller value={PIANO.viralShort} />,
              })}
            </p>
            <p className={styles.body}>{s.pianoBlurb}</p>
            <a className={styles.btn} href={PIANO.url} target="_blank" rel="noreferrer">
              {s.pianoCta}
              <Tri />
            </a>
            <div className={`${styles.cell} ${styles.stub}`} id={`f-${channel.id}`}>
              <a
                className={styles.seg}
                href={PIANO.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${r.channelOpen}: ${PIANO.channel}`}
              >
                <span className={styles.film} aria-hidden="true" />
                <Pic src={printSrc(channel)} lazy />
                <span className={styles.edge} aria-hidden="true">
                  <b>{pad(channel.n)}</b>
                  <span>{PIANO.handle}</span>
                </span>
              </a>
            </div>
          </div>

          <figure className={styles.reel} id={`f-${elise.id}`} data-reveal="">
            <div className={styles.reelSeg}>
              <div className={styles.reelInner}>
                <span className={styles.reelFilm} aria-hidden="true" />
                <span className={styles.reelEdge} aria-hidden="true">
                  <b>{pad(elise.n)}</b>
                  <span>{elise.name}</span>
                </span>
                <div className={styles.gate}>
                  <video
                    ref={video}
                    src={PIANO.demoVideo}
                    poster="/roll/elise-poster.webp"
                    autoPlay={!reduced}
                    controls={reduced}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                  <button
                    type="button"
                    className={styles.sound}
                    aria-pressed={soundOn}
                    aria-label={s.pianoSound}
                    title={s.pianoSound}
                    onClick={() => setSoundOn((v) => !v)}
                  >
                    {soundOn ? <Volume2 size={17} aria-hidden="true" /> : <VolumeX size={17} aria-hidden="true" />}
                  </button>
                </div>
                <span className={styles.reelEdge} aria-hidden="true">
                  <span>{PIANO.handle}</span>
                </span>
              </div>
            </div>
            <figcaption className={styles.reelCap}>
              <p>{s.pianoCaption}</p>
              <span className={styles.chip}>
                <i aria-hidden="true" />
                {r.tutorial} · {s.pianoRecording}
              </span>
            </figcaption>
          </figure>
        </section>

        {/* ═══ archive — the rest of the roll, as an index ═══ */}
        <section className={`${styles.wrap} ${styles.section}`} id="archive" aria-labelledby="archive-title">
          <header className={styles.head} data-reveal="">
            <h2 className={styles.h2} id="archive-title">
              {s.archiveTitle}
            </h2>
            <p>{fill(r.archiveSub, { n: archive.length })}</p>
          </header>
          <ol className={styles.index}>
            {archive.map((f) => {
              const i18n = archiveI18n(f.id);
              const external = f.url.startsWith("http");
              return (
                <li key={f.id} id={`f-${f.id}`} data-reveal="">
                  <a
                    className={styles.row}
                    href={f.url}
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    <span className={styles.no}>{pad(f.n)}</span>
                    <span className={styles.mini}>
                      <Pic src={thumbSrc(f)} lazy />
                    </span>
                    <span className={styles.rowName}>
                      {i18n?.name ?? f.name} <Tri />
                    </span>
                    <span className={styles.rowDesc}>{i18n?.description ?? f.project?.desc}</span>
                    <span className={styles.year}>{f.year}</span>
                  </a>
                  {f.project?.github ? (
                    <a
                      className={styles.gh}
                      href={f.project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={fill(s.ghLabel, { name: i18n?.name ?? f.name })}
                      title={fill(s.ghLabel, { name: i18n?.name ?? f.name })}
                    >
                      <BrandIcon name="github" size={15} />
                    </a>
                  ) : null}
                </li>
              );
            })}
          </ol>
          {EARLIER.length ? (
            <div className={styles.earlier}>
              <h3>{r.earlier}</h3>
              <ul>
                {EARLIER.map((p) => (
                  <li key={p.id}>
                    <a
                      href={p.url}
                      {...(p.url.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                    >
                      {archiveI18n(p.id)?.name ?? p.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>

        {/* ═══ about ═══ */}
        <section className={`${styles.wrap} ${styles.section}`} id="about" aria-labelledby="about-title">
          <header className={styles.head} data-reveal="">
            <h2 className={styles.h2} id="about-title">
              {s.aboutTitle}
            </h2>
          </header>
          <div className={styles.about}>
            <div className={styles.portrait} data-reveal="">
              <ProtectedImage src={PORTRAIT.full} alt="Noah Zixin Zhang" className={styles.portraitImg} />
              <span className={styles.portraitCap} aria-hidden="true">
                {PROFILE.short}
              </span>
            </div>
            <div className={`${styles.aboutCopy} ${styles.riseGroup}`} data-reveal="">
              <p className={styles.bio}>{s.aboutBio}</p>
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
              <blockquote className={styles.quote}>
                <p>“{s.quote1}”</p>
                <footer>{s.quote1src}</footer>
              </blockquote>
              <div className={styles.rec}>
                <h3>{s.recTitle}</h3>
                <ul>
                  {RECOGNITION.map((rec, i) => {
                    const item = (t.recognitionItems as Record<string, { title: string }>)[REC_I18N[i]];
                    return (
                      <li key={rec.title}>
                        <span>{item?.title ?? rec.title}</span>
                        <time>{rec.period}</time>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ No. 25 — cut from the strip ═══ */}
        <section className={`${styles.wrap} ${styles.section}`} aria-labelledby="missing-title">
          <div className={styles.tail} data-reveal="">
            <div className={styles.cell}>
              <a
                className={styles.seg}
                href={`#f-${top.id}`}
                aria-label={`${fill(r.frame, { n: top.n })}: ${label(top)}`}
              >
                <span className={styles.film} aria-hidden="true" />
                <Pic src={thumbSrc(top)} lazy />
                <span className={styles.edge} aria-hidden="true">
                  <b>{pad(top.n)}</b>
                  <span>{label(top)}</span>
                </span>
              </a>
            </div>
            <div className={styles.cell}>
              <div className={styles.gap}>
                <button
                  type="button"
                  className={styles.cut}
                  aria-label={s.hiddenAria}
                  onClick={() => push(s.hiddenToast)}
                >
                  <span className={styles.cutNo}>{SECRET_NO}</span>
                  <Lock size={15} strokeWidth={1.8} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className={styles.cell}>
              <div className={styles.seg}>
                <span className={styles.film} aria-hidden="true" />
                <span className={`${styles.pic} ${styles.blank}`}>
                  <code className={styles.build}>build;</code>
                </span>
                <span className={styles.edge} aria-hidden="true">
                  <b>{pad(SECRET_NO + 1)}</b>
                  <span>{r.unexposed}</span>
                </span>
              </div>
            </div>
            {/* the rest of the strip is still unexposed */}
            {[2, 3, 4].map((k) => (
              <div className={styles.cell} key={k}>
                <div className={styles.seg}>
                  <span className={styles.film} aria-hidden="true" />
                  <span className={`${styles.pic} ${styles.blank}`} />
                  <span className={styles.edge} aria-hidden="true">
                    <b>{pad(SECRET_NO + k)}</b>
                    <span>{r.unexposed}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.missing}>
            <div className={`${styles.missingCopy} ${styles.riseGroup}`} data-reveal="">
              <h2 className={styles.h2} id="missing-title">
                {fill(r.missingTitle, { m: SECRET_NO })}
              </h2>
              <p className={styles.body}>
                {r.missingBody} {s.secretNote}
              </p>
              <p className={styles.redactLine}>
                <span className={styles.redacted} aria-hidden="true">
                  {SECRET.name}
                </span>
                <span className={styles.chip}>
                  <i aria-hidden="true" />
                  {s.secretStatus}
                </span>
              </p>
              <p className={styles.buildNote}>
                <code>build;</code>
                {s.buildDesc}
              </p>
            </div>
            <blockquote className={`${styles.quote} ${styles.mitty} ${styles.rise}`} data-reveal="">
              <p>“{s.quote2}”</p>
              <footer>{s.quote2src}</footer>
            </blockquote>
          </div>
        </section>

        {/* ═══ contact ═══ */}
        <section
          className={`${styles.wrap} ${styles.contact} ${styles.riseGroup}`}
          id="contact"
          aria-labelledby="cta-title"
          data-reveal=""
        >
          <h2 id="cta-title">{s.ctaTitle}</h2>
          <p>{s.ctaSub}</p>
          <a className={styles.mail} href={`mailto:${PROFILE.email}`}>
            {PROFILE.email}
          </a>
          <a className={styles.xLine} href={SOCIALS.x.url} target="_blank" rel="noreferrer">
            <BrandIcon name="x" size={14} />
            {SOCIALS.x.handle}
            <Tri />
          </a>
        </section>
      </main>

      {/* ═══ footer ═══ */}
      <footer className={styles.footer}>
        <div className={`${styles.wrap} ${styles.footerTop}`}>
          <div className={styles.footerBrand}>
            <Link className={styles.brand} href="/">
              <Mark />
              <span>Noah Zixin Zhang</span>
            </Link>
            <p>{r.footerNote}</p>
          </div>
          <nav className={styles.socials} aria-label={r.social}>
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
        <div className={`${styles.wrap} ${styles.footerBottom}`}>
          <small>{s.copyright}</small>
          <a className={styles.builtWith} href="https://supastack.dev" target="_blank" rel="noreferrer">
            <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="1.4" y="1.4" width="9.2" height="9.2" rx="1.8" fill="#f5f5f5" stroke="#686868" strokeWidth="0.25" />
              <rect x="13.4" y="1.4" width="9.2" height="9.2" rx="1.8" fill="#929292" stroke="#686868" strokeWidth="0.25" />
              <rect x="1.4" y="13.4" width="9.2" height="9.2" rx="1.8" fill="#929292" stroke="#686868" strokeWidth="0.25" />
              <rect x="13.4" y="13.4" width="9.2" height="9.2" rx="1.8" fill="#f5f5f5" stroke="#686868" strokeWidth="0.25" />
            </svg>
            {s.builtWith}
          </a>
        </div>
      </footer>

      <ToastStack toasts={toasts} onDismiss={dismiss} dismissLabel={s.toastDismiss} />
    </div>
  );
}
