"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent as ReactFocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent,
} from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Languages,
  Lock,
  Mail,
  Moon,
  Sun,
  Volume2,
  VolumeX,
} from "lucide-react";
import ProtectedImage from "@/components/ProtectedImage";
import BrandIcon from "@/components/icons/brands";
import {
  locales,
  useLang,
  langLabels,
  langOrder,
  type Lang,
} from "@/components/LanguageContext";
import { ToastStack, useToasts } from "@/components/toast";
import {
  ARCHIVE,
  FEATURED,
  PIANO,
  PORTRAIT,
  PROFILE,
  RECOGNITION,
  SECRET,
  SOCIALS,
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

type Theme = "light" | "dark";

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

/* language dropdown — <details>/<summary> popover ported from
   supastack's language-switcher, but items are <button>s calling
   setLang (no cookie, no navigation). Used twice: header (.headerEnd,
   hidden <900px via .langMenuHeader) and the mobile .menuFoot
   (side="top" so the popover opens upward). */
function LangMenu({
  side = "bottom",
  className,
}: {
  side?: "top" | "bottom";
  className?: string;
}) {
  const { lang, setLang, t } = useLang();
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  /* single tracked timer for the animated close — repeated requestClose
     calls would otherwise stack timeouts and a stale one could slam a
     reopened popover shut */
  const closeTimer = useRef(0);

  function requestClose(refocus = false) {
    const el = detailsRef.current;
    if (!el?.open) return;
    if (refocus) summaryRef.current?.focus();
    /* already animating out — bail WITHOUT clearing closeTimer: a second
       call (outside-pointerdown → focusout → onBlur) must let the armed
       finisher run, else open stays true with data-closing and no
       timer — popover frozen invisible/unclosable */
    if (el.dataset.closing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.open = false;
    } else {
      /* let the out-animation play before removing `open` */
      el.dataset.closing = "true";
      closeTimer.current = window.setTimeout(() => {
        el.open = false;
        delete el.dataset.closing;
        closeTimer.current = 0;
      }, 140);
    }
  }

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const el = detailsRef.current;
      if (el?.open && !el.contains(event.target as Node)) requestClose();
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (detailsRef.current?.open) {
        event.preventDefault();
        requestClose(true);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(closeTimer.current);
    };
  }, []);

  function onSummaryClick(event: MouseEvent) {
    /* re-clicking an open summary would toggle it shut natively —
       intercept so the close animates instead */
    if (detailsRef.current?.open) {
      event.preventDefault();
      requestClose();
    } else {
      /* opening — cancel any in-flight animated close and drop its
         marker, or a leftover data-closing keeps the popover invisible */
      window.clearTimeout(closeTimer.current);
      if (detailsRef.current) delete detailsRef.current.dataset.closing;
    }
  }

  function onSummaryKeyDown(event: ReactKeyboardEvent) {
    const el = detailsRef.current;
    if (event.key === "ArrowDown" && el && !el.open) {
      event.preventDefault();
      window.clearTimeout(closeTimer.current);
      delete el.dataset.closing;
      el.open = true;
      (
        el.querySelector<HTMLElement>("button[aria-current]") ??
        el.querySelector<HTMLElement>("ul button")
      )?.focus();
    }
  }

  function onPopoverKeyDown(event: ReactKeyboardEvent) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    const items = Array.from(
      detailsRef.current?.querySelectorAll<HTMLElement>("ul button") ?? [],
    );
    if (items.length === 0) return;
    const index = items.indexOf(document.activeElement as HTMLElement);
    const next =
      event.key === "ArrowDown"
        ? (index + 1) % items.length
        : (index - 1 + items.length) % items.length;
    event.preventDefault();
    items[next]?.focus();
  }

  function onBlur(event: ReactFocusEvent) {
    if (!event.currentTarget.contains(event.relatedTarget)) requestClose();
  }

  function choose(l: Lang) {
    setLang(l);
    /* refocus the trigger — closing otherwise strands keyboard focus */
    requestClose(true);
  }

  return (
    <details
      ref={detailsRef}
      className={className ? `${styles.langMenu} ${className}` : styles.langMenu}
      data-side={side}
      onBlur={onBlur}
    >
      <summary
        ref={summaryRef}
        className={styles.langTrigger}
        aria-label={`${t.stack.langMenuLabel}: ${langLabels[lang]}`}
        onClick={onSummaryClick}
        onKeyDown={onSummaryKeyDown}
      >
        <Languages size={15} aria-hidden="true" className={styles.langGlyph} />
        <span>{langLabels[lang]}</span>
        <ChevronDown size={14} aria-hidden="true" className={styles.langChevron} />
      </summary>
      <ul className={styles.langPop} onKeyDown={onPopoverKeyDown}>
        {langOrder.map((l) => (
          <li key={l}>
            <button
              type="button"
              className={styles.langItem}
              aria-current={l === lang ? "true" : undefined}
              onClick={() => choose(l)}
            >
              <span>{langLabels[l]}</span>
              {l === lang ? (
                <Check size={14} aria-hidden="true" className={styles.langCheck} />
              ) : null}
            </button>
          </li>
        ))}
      </ul>
    </details>
  );
}

function hostOf(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/* theme switch as a circular color-spread from the click point.
   The apply callback must mutate the DOM synchronously (dataset +
   setState) so the ::view-transition-new snapshot sees the new theme.
   Falls back to an instant switch for reduced-motion, missing origin,
   or browsers without startViewTransition. */
function transitionTo(apply: () => void, origin?: { x: number; y: number }) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => {
      ready: Promise<void>;
      finished: Promise<void>;
      updateCallbackDone: Promise<void>;
    };
  };
  if (reduced || typeof doc.startViewTransition !== "function" || !origin) {
    apply();
    return;
  }
  const maxR = Math.hypot(
    Math.max(origin.x, window.innerWidth - origin.x),
    Math.max(origin.y, window.innerHeight - origin.y),
  );
  try {
    const vt = doc.startViewTransition(apply);
    /* finished/updateCallbackDone reject on skipped or superseded
       transitions — swallow them so they never surface as unhandled */
    vt.finished.catch(() => {});
    vt.updateCallbackDone.catch(() => {});
    vt.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${origin.x}px ${origin.y}px)`,
              `circle(${maxR}px at ${origin.x}px ${origin.y}px)`,
            ],
          },
          {
            duration: 520,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {});
  } catch {
    /* a synchronous throw must never swallow the theme switch */
    apply();
  }
}

export default function StackPage() {
  const { lang } = useLang();
  /* shown trails lang by one 170ms fade — text swaps while the page is
     blurred/dimmed, then data-lang-swap clears and it crossfades back.
     Also masks the localStorage-restore swap on first load. */
  const [shown, setShown] = useState<Lang>(lang);
  const [langSwap, setLangSwap] = useState(false);
  /* mirror of langSwap for the swap effect — the flag is deliberately
     NOT an effect dep, so setting it mid-flight never re-runs the
     effect and kills the pending midpoint timer */
  const langSwapRef = useRef(false);
  const t = locales[shown];
  const s = t.stack;
  const [scrolled, setScrolled] = useState(false);
  /* the video stays `muted` in the DOM so autoplay keeps working —
     the toggle just flips the property on the element */
  const [soundOn, setSoundOn] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [reduced, setReduced] = useState(false);
  const { toasts, push, dismiss } = useToasts();
  const root = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const menuTitle = useId();

  /* theme boot: localStorage → <html data-stack-theme> + state
     (legacy stack_pack visits migrate — every old pack was dark) */
  useEffect(() => {
    let saved: Theme | null = null;
    try {
      const raw = localStorage.getItem("stack_theme");
      if (raw === "light" || raw === "dark") saved = raw;
      else if (localStorage.getItem("stack_pack")) saved = "dark";
    } catch {
      /* private mode */
    }
    if (saved) document.documentElement.dataset.stackTheme = saved;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqNow = mq.matches;
    /* async hydration — sync setState in effect body is disallowed */
    setTimeout(() => {
      if (saved) setTheme(saved);
      setReduced(mqNow);
    }, 0);
    const onMq = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onMq);
    return () => {
      mq.removeEventListener("change", onMq);
      /* don't leak the stack theme (and its dark body bg) onto other routes */
      delete document.documentElement.dataset.stackTheme;
    };
  }, []);

  /* pauses the already-autoplaying piano video when reduced motion is
     detected — removing the autoPlay attribute alone doesn't pause it */
  useEffect(() => {
    if (reduced) video.current?.pause();
  }, [reduced]);

  /* sound toggle — unmute/mute the element directly (muting in JSX
     would fight the muted-autoplay requirement) */
  useEffect(() => {
    if (video.current) video.current.muted = !soundOn;
  }, [soundOn]);

  /* language crossfade: fade out (data-lang-swap) → swap `shown` at the
     dimmed midpoint → fade back in. setState is deferred a tick because
     React compiler lint bans sync setState in effects. The `lang ===
     shown` branch doubles as the release: it fires when setShown lands
     AND rescues a cancelled A→B→A swap where the flag is stuck on —
     clearing it ~60ms after the text mounts gives the fade-in something
     to reveal. All timer ids are tracked and wiped on cleanup so rapid
     A→B→C swaps can't strand a stale clear. */
  useEffect(() => {
    const timers: number[] = [];
    if (lang === shown) {
      if (langSwapRef.current) {
        timers.push(
          window.setTimeout(() => {
            langSwapRef.current = false;
            setLangSwap(false);
          }, 60),
        );
      }
      return () => timers.forEach((id) => window.clearTimeout(id));
    }
    if (reduced) {
      timers.push(window.setTimeout(() => setShown(lang), 0));
    } else {
      timers.push(
        window.setTimeout(() => {
          langSwapRef.current = true;
          setLangSwap(true);
        }, 0),
      );
      timers.push(window.setTimeout(() => setShown(lang), 170));
    }
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [lang, shown, reduced]);

  const toggleTheme = (e?: MouseEvent<HTMLElement>) => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.stackTheme = next;
      setTheme(next);
      try {
        localStorage.setItem("stack_theme", next);
      } catch {
        /* private mode */
      }
    };
    /* click coords → spread origin; synthetic/keyboard clicks (0,0)
       fall back to the button's center */
    let origin: { x: number; y: number } | undefined;
    if (e) {
      if (e.clientX || e.clientY) {
        origin = { x: e.clientX, y: e.clientY };
      } else {
        const r = e.currentTarget.getBoundingClientRect();
        origin = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      }
    }
    transitionTo(apply, origin);
  };

  /* header condenses once the hero scrolls under it — first read is
     deferred a tick (sync setState in effect bodies is banned) */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const id = window.setTimeout(onScroll, 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* once-only reveals — marked here so no-JS never hides content */
  useEffect(() => {
    const els = root.current?.querySelectorAll("[data-reveal]");
    if (!els?.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.dataset.revealed = "true";
            /* the [data-revealed] transition only exists to run the
               reveal — once it ends, drop the attribute (and the inline
               stagger delay) so the element's own transitions (card
               hover lift, xLine color…) run at their authored speeds */
            let fallback = 0;
            const finish = () => {
              delete el.dataset.revealed;
              el.style.transitionDelay = "";
              el.removeEventListener("transitionend", onEnd);
              window.clearTimeout(fallback);
            };
            const onEnd = (ev: TransitionEvent) => {
              /* bubbled descendant transitionends (cardImg img, link
                 arrows…) must not fire this early — only the element's
                 own reveal counts */
              if (ev.target === el) finish();
            };
            el.addEventListener("transitionend", onEnd);
            /* no transition → no transitionend (:focus-within
               force-reveal, reduced-motion, transitioncancel) —
               idempotent fallback just past the longest reveal
               (210ms stagger + 700ms transition) */
            fallback = window.setTimeout(finish, 900);
            io.unobserve(el);
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
    <div ref={root} className={styles.stack} data-lang-swap={langSwap || undefined}>
      {/* pre-paint theme restore (SSR'd inline so there's no flash) */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            "try{var t=localStorage.getItem('stack_theme');if(t!=='dark'&&t!=='light')t=localStorage.getItem('stack_pack')?'dark':'light';document.documentElement.dataset.stackTheme=t}catch(e){}",
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
            <LangMenu className={styles.langMenuHeader} />
            <button
              type="button"
              className={styles.themeBtn}
              aria-pressed={theme === "dark"}
              aria-label={theme === "dark" ? s.themeLight : s.themeDark}
              title={theme === "dark" ? s.themeLight : s.themeDark}
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <Sun size={17} aria-hidden="true" />
              ) : (
                <Moon size={17} aria-hidden="true" />
              )}
            </button>
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
          </nav>
          <div className={styles.menuFoot}>
            <LangMenu side="top" />
            <button
              type="button"
              className={styles.menuTheme}
              aria-pressed={theme === "dark"}
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <Sun size={16} aria-hidden="true" />
              ) : (
                <Moon size={16} aria-hidden="true" />
              )}
              {theme === "dark" ? s.themeLight : s.themeDark}
            </button>
            <a className={`${styles.btn} ${styles.btnPrimary}`} href={`mailto:${PROFILE.email}`} onClick={closeMenu}>
              {s.hello}
            </a>
          </div>
        </div>
      </dialog>

      <main className={styles.main} id="main">
        {/* ═══ hero ═══ */}
        <section className={styles.hero} aria-labelledby="hero-title">
          <h1 className={styles.heroTitle} id="hero-title">
            <span className={styles.heroLine}>{s.heroTitleA}</span>
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
                ref={video}
                src={PIANO.demoVideo}
                poster="/Noah-Piano-Journey.png"
                autoPlay={!reduced}
                controls={reduced}
                muted
                loop
                playsInline
                preload="metadata"
              />
              <button
                type="button"
                className={styles.soundToggle}
                aria-pressed={soundOn}
                aria-label={s.pianoSound}
                title={s.pianoSound}
                onClick={() => setSoundOn((v) => !v)}
              >
                {soundOn ? (
                  <Volume2 size={17} aria-hidden="true" />
                ) : (
                  <VolumeX size={17} aria-hidden="true" />
                )}
              </button>
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
            <button
              type="button"
              className={`${styles.card} ${styles.cardGhost} ${styles.cardSecret}`}
              aria-label={s.hiddenAria}
              data-reveal
              style={{ transitionDelay: "210ms" }}
              onClick={() => push(s.hiddenToast)}
            >
              <div className={styles.cardImg}>
                <Lock size={40} strokeWidth={1.2} aria-hidden="true" />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <h3 className={styles.redacted}>{SECRET.name}</h3>
                  <span>{SECRET.year}</span>
                </div>
                <p>{s.secretNote}</p>
                <span className={styles.chip}>
                  <i aria-hidden="true" />
                  {s.hiddenStatus}
                </span>
              </div>
            </button>
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
              <blockquote className={styles.quote}>
                “{s.quote1}”
                <span className={styles.quoteSrc}>— {s.quote1src}</span>
              </blockquote>
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
          <small>{s.copyright}</small>
          <a
            className={styles.builtWith}
            href="https://supastack.dev"
            target="_blank"
            rel="noreferrer"
          >
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
