"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ProtectedImage from "@/components/ProtectedImage";
import { PROFILE, PIANO, PORTRAIT, SOCIALS, FEATURED, SECRET, ARCHIVE, RECOGNITION } from "@/lib/content";

/* ── palette (scoped to this page) ─────────────────────────────
   stage  #0c0a08   paper  #ece5d8   brass  #c9a15f
   mute   #8a817a   velvet #5e1d1d                                   */

const EASE = [0.16, 1, 0.3, 1] as const;

function Rise({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ProgramMark({ n, title, sub }: { n: string; title: string; sub?: string }) {
  return (
    <div className="flex items-baseline gap-5 border-t border-[#ece5d8]/15 pt-5">
      <span className="font-body text-[10px] uppercase tracking-[0.34em] text-[#c9a15f]">{n}</span>
      <h2 className="font-fraunces text-2xl tracking-tight text-[#ece5d8] md:text-3xl">{title}</h2>
      {sub && (
        <span className="ml-auto hidden font-body text-[10px] uppercase tracking-[0.3em] text-[#8a817a] sm:inline">
          {sub}
        </span>
      )}
    </div>
  );
}

/* playback-staff progress bar: the programme "plays" as you scroll */
function StaffProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const left = useTransform(x, [0, 1], ["2%", "98%"]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-[52px] z-40 px-6 md:px-12">
      <div className="relative h-[26px]">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="absolute inset-x-0 h-px bg-[#ece5d8]/12" style={{ top: 4 + i * 5 }} />
        ))}
        {/* note head on the staff */}
        <motion.div style={{ left }} className="absolute top-[8px] -ml-1">
          <div className="h-[10px] w-[13px] -rotate-[18deg] rounded-full bg-[#c9a15f] shadow-[0_0_14px_rgba(201,161,95,0.55)]" />
          <div className="absolute -top-[14px] right-0 h-[16px] w-px bg-[#c9a15f]/80" />
        </motion.div>
      </div>
    </div>
  );
}

/* ♩ = live "tempo" derived from scroll velocity */
function TempoMeter() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 60, damping: 20 });
  const [bpm, setBpm] = useState(76);

  useMotionValueEvent(smooth, "change", (v) => {
    setBpm(Math.min(208, Math.max(60, Math.round(76 + Math.abs(v) * 0.06))));
  });

  return (
    <span className="font-body text-[10px] tracking-[0.3em] text-[#8a817a]">
      <span className="text-[#c9a15f]">♩</span> = {bpm}
    </span>
  );
}

/* warm stage-light following the cursor */
function Spotlight() {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.3);
  const bg = useTransform(
    [mx, my],
    ([x, y]) =>
      `radial-gradient(600px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(233,190,120,0.085), transparent 60%)`
  );

  React.useEffect(() => {
    const move = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [mx, my]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden md:block"
      style={{ background: bg }}
    />
  );
}

/* velvet curtain that parts to reveal the secret premiere */
function Curtain({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const panel =
    "absolute inset-y-0 w-[55%] z-10 transition-transform duration-[1400ms] ease-[cubic-bezier(0.7,0,0.2,1)] " +
    "bg-[repeating-linear-gradient(90deg,#4a1515_0px,#6d2424_14px,#3d1111_28px)] shadow-[inset_0_-30px_50px_rgba(0,0,0,0.6)]";

  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-sm border border-[#c9a15f]/25"
      onClick={() => setOpen((v) => !v)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setOpen((v) => !v)}
      aria-expanded={open}
    >
      {children}
      <div className={`${panel} left-0 ${open ? "-translate-x-[104%]" : "group-hover:-translate-x-[14%]"}`} />
      <div className={`${panel} right-0 ${open ? "translate-x-[104%]" : "group-hover:translate-x-[14%]"}`} />
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 z-20 h-3 bg-[#2a0c0c] transition-opacity duration-700 ${open ? "opacity-0" : ""}`}
      />
      {!open && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <span className="rounded-full border border-[#c9a15f]/50 bg-[#0c0a08]/80 px-4 py-1.5 font-body text-[9px] uppercase tracking-[0.3em] text-[#c9a15f]">
            draw the curtain
          </span>
        </div>
      )}
    </div>
  );
}

function ProgramRow({ op, title, desc, href, meta }: { op: string; title: string; desc: string; href?: string; meta?: string }) {
  const inner = (
    <div className="group grid grid-cols-[52px_1fr_auto] items-baseline gap-4 border-b border-[#ece5d8]/10 py-5 transition-colors md:grid-cols-[72px_1fr_1fr_auto] md:gap-8">
      <span className="font-body text-[10px] tracking-[0.2em] text-[#8a817a]">{op}</span>
      <span className="font-fraunces text-xl tracking-tight text-[#ece5d8] transition-colors group-hover:text-[#c9a15f] md:text-2xl">
        {title}
      </span>
      <span className="hidden max-w-[44ch] font-body text-[11px] leading-relaxed text-[#8a817a] md:block">
        {desc}
      </span>
      <span className="flex items-center gap-3 font-body text-[10px] uppercase tracking-[0.24em] text-[#8a817a]">
        {meta}
        {href && <ArrowUpRight size={13} className="text-[#c9a15f] opacity-0 transition-opacity group-hover:opacity-100" />}
      </span>
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith("/") ? undefined : "_blank"} rel="noreferrer" className="block">
      {inner}
    </a>
  ) : (
    inner
  );
}

export default function RecitalPage() {
  return (
    <main className="relative min-h-screen bg-[#0c0a08] text-[#ece5d8]">
      {/* faint paper grain */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <Spotlight />
      <StaffProgress />

      {/* ── program header ── */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#ece5d8]/10 bg-[#0c0a08]/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-5 py-3.5 md:px-12">
          <span className="font-body text-[10px] uppercase tracking-[0.34em] text-[#8a817a]">
            Season MMXXVI
          </span>
          <span className="font-fraunces text-sm italic tracking-wide text-[#ece5d8]">
            rateministère — programme
          </span>
          <TempoMeter />
        </div>
      </header>

      {/* ── hero: the headliner ── */}
      <section className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 pb-24 pt-32 text-center">
        <Rise>
          <p className="font-body text-[10px] uppercase tracking-[0.4em] text-[#c9a15f]">
            Principal feature · by kind permission of YouTube
          </p>
        </Rise>
        <Rise delay={0.08}>
          <h1 className="mt-8 font-fraunces text-[13.5vw] leading-[0.92] tracking-[-0.02em] sm:text-[11vw] lg:text-[8.5rem]">
            Noah&rsquo;s <em className="text-[#c9a15f]">Piano</em>
            <br />
            Journey
          </h1>
        </Rise>
        <Rise delay={0.16}>
          <p className="mt-8 max-w-md font-body text-xs leading-relaxed text-[#8a817a] md:text-sm">
            {PIANO.blurb}
          </p>
        </Rise>
        <Rise delay={0.22}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-body text-[10px] uppercase tracking-[0.28em] text-[#8a817a]">
            <span><b className="font-fraunces text-xl normal-case tracking-tight text-[#ece5d8]">{PIANO.views}</b> views</span>
            <span className="h-3 w-px bg-[#ece5d8]/20" />
            <span><b className="font-fraunces text-xl normal-case tracking-tight text-[#ece5d8]">{PIANO.viralShort}</b> on one Short</span>
            <span className="h-3 w-px bg-[#ece5d8]/20" />
            <span>est. repertoire for beginners</span>
          </div>
        </Rise>
        <Rise delay={0.3}>
          <a
            href={PIANO.url}
            target="_blank"
            rel="noreferrer"
            className="group mt-10 inline-flex items-center gap-3 border-b border-[#c9a15f] pb-2 font-body text-[11px] uppercase tracking-[0.3em] text-[#ece5d8] transition-colors hover:text-[#c9a15f]"
          >
            Attend the channel
            <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Rise>

        {/* the soloist, plate I — arched like a recital poster */}
        <Rise delay={0.38} className="mt-16">
          <div className="relative">
            <div className="absolute -inset-6 rounded-t-full bg-[radial-gradient(ellipse_at_50%_0%,rgba(233,190,120,0.16),transparent_65%)]" aria-hidden />
            <ProtectedImage
              src={PORTRAIT.full}
              alt="Noah at the launch site, Alps"
              className="relative aspect-[3/4] w-[240px] rounded-t-[999px] border border-[#c9a15f]/30 md:w-[300px]"
              imgClassName="object-top"
            />
            <p className="mt-4 font-body text-[9px] uppercase tracking-[0.3em] text-[#8a817a]">
              pl. I — the soloist, at altitude
            </p>
          </div>
        </Rise>
      </section>

      {/* ── programme ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-32 md:px-10">

        {/* PRELUDE */}
        <section className="pt-24">
          <Rise><ProgramMark n="№ 01" title="Prelude" sub="the performer" /></Rise>
          <Rise delay={0.06}>
            <div className="mt-8 grid gap-10 md:grid-cols-[1fr_320px]">
              <p className="font-fraunces text-xl leading-relaxed tracking-tight text-[#ece5d8]/90 md:text-2xl">
                {PROFILE.name} — {PROFILE.role.toLowerCase()}, presently of {PROFILE.location}.
                Reads scores in four languages; argues with compilers in the rest.
                Currently enrolled at {PROFILE.school}.
              </p>
              <div className="space-y-3 border-l border-[#ece5d8]/15 pl-6 font-body text-[11px] leading-loose text-[#8a817a]">
                <p>{PROFILE.coords}</p>
                <p>{PROFILE.languages}</p>
                <p>disposition — {PROFILE.type}</p>
                <p className="italic text-[#ece5d8]/70">&ldquo;{PROFILE.quotes[0]}&rdquo;</p>
              </div>
            </div>
          </Rise>
        </section>

        {/* PART I — WORKS */}
        <section className="pt-24">
          <Rise><ProgramMark n="№ 02" title="Part I — Works" sub="opere scelte" /></Rise>
          <Rise delay={0.05}>
            <div className="mt-6">
              {FEATURED.map((p, i) => (
                <ProgramRow
                  key={p.id}
                  op={`Op. ${i + 1}`}
                  title={p.name}
                  desc={p.desc}
                  meta={p.year}
                  href={p.url}
                />
              ))}
            </div>
          </Rise>
        </section>

        {/* INTERMISSION — build; */}
        <section className="pt-24">
          <Rise><ProgramMark n="№ 03" title="Intermission" sub="the work in progress" /></Rise>
          <Rise delay={0.06}>
            <div className="mt-8 overflow-hidden rounded-sm border border-[#ece5d8]/15 bg-[#080706]">
              <div className="flex items-center justify-between border-b border-[#ece5d8]/10 px-4 py-2.5">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#5e4a3a]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#5e4a3a]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#5e4a3a]" />
                </div>
                <span className="font-body text-[9px] uppercase tracking-[0.3em] text-[#8a817a]">
                  greenroom — tty1
                </span>
              </div>
              <div className="px-6 py-10 font-body text-sm text-[#7dd87d] md:px-10 md:text-base">
                <p className="text-[#8a817a]"># while the hall resets, backstage:</p>
                <p className="mt-4">
                  noah@rateministere<span className="text-[#8a817a]">:~$</span>{" "}
                  <span className="text-[#ece5d8]">build;</span>
                  <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-[#7dd87d] align-middle" />
                </p>
                <p className="mt-4 text-[#8a817a]"># output reserved. the next piece is still being written.</p>
              </div>
            </div>
          </Rise>
        </section>

        {/* PART II — ÉTUDES */}
        <section className="pt-24">
          <Rise><ProgramMark n="№ 04" title="Part II — Études & Sketches" sub={`${ARCHIVE.length} entries`} /></Rise>
          <Rise delay={0.05}>
            <div className="mt-6 grid gap-x-12 md:grid-cols-2">
              {ARCHIVE.map((p) => (
                <a
                  key={p.id}
                  href={p.url}
                  target={p.url.startsWith("/") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group flex items-baseline justify-between gap-4 border-b border-[#ece5d8]/10 py-3.5"
                >
                  <span className="font-fraunces text-lg tracking-tight text-[#ece5d8]/90 transition-colors group-hover:text-[#c9a15f]">
                    {p.name}
                  </span>
                  <span className="font-body text-[10px] uppercase tracking-[0.22em] text-[#8a817a]">
                    {p.year}
                  </span>
                </a>
              ))}
            </div>
          </Rise>
        </section>

        {/* ENCORE — premiere */}
        <section className="pt-24">
          <Rise><ProgramMark n="№ 05" title="Encore" sub="by request" /></Rise>
          <Rise delay={0.08}>
            <Curtain>
              <div className="flex min-h-[240px] flex-col items-center justify-center gap-4 bg-[#0a0806] px-8 py-12 text-center">
                <span className="font-body text-[10px] uppercase tracking-[0.4em] text-[#c9a15f]">
                  World premiere
                </span>
                <span className="font-fraunces text-4xl tracking-tight text-[#ece5d8] md:text-5xl">
                  {SECRET.name}
                </span>
                <p className="max-w-sm font-body text-[11px] leading-relaxed text-[#8a817a]">
                  {SECRET.desc}
                </p>
                <span className="font-body text-[9px] uppercase tracking-[0.3em] text-[#8a817a]/60">
                  date withheld · {SECRET.year}
                </span>
              </div>
            </Curtain>
          </Rise>
        </section>

        {/* CRITICAL ACCLAIM */}
        <section className="pt-24">
          <Rise><ProgramMark n="№ 06" title="Critical Acclaim" sub="the press" /></Rise>
          <Rise delay={0.05}>
            <div className="mt-6 grid gap-px overflow-hidden rounded-sm border border-[#ece5d8]/10 bg-[#ece5d8]/10 md:grid-cols-2">
              {RECOGNITION.map((r) => (
                <div key={r.title} className="bg-[#0c0a08] p-6">
                  <p className="font-fraunces text-lg italic tracking-tight text-[#ece5d8]/90">
                    &ldquo;{r.title}&rdquo;
                  </p>
                  <p className="mt-3 font-body text-[10px] uppercase tracking-[0.28em] text-[#8a817a]">
                    — Trae, {r.period}
                  </p>
                </div>
              ))}
            </div>
          </Rise>
        </section>

        {/* THE SOLOIST — square plate + marginalia X link */}
        <section className="pt-24">
          <Rise><ProgramMark n="№ 07" title="The Soloist" sub="backstage door" /></Rise>
          <Rise delay={0.06}>
            <div className="relative mt-10 grid items-center gap-10 md:grid-cols-[300px_1fr]">
              {/* marginalia — the X link as a hand-annotated program note */}
              <a
                href={SOCIALS.x.url}
                target="_blank"
                rel="noreferrer"
                className="group absolute -top-14 right-0 hidden -rotate-6 items-center gap-2 font-fraunces text-lg italic text-[#c9a15f] underline decoration-[#c9a15f]/40 underline-offset-4 transition-colors hover:decoration-[#c9a15f] md:flex"
              >
                dispatches between performances — {SOCIALS.x.handle} ↗
              </a>
              <ProtectedImage
                src={PORTRAIT.square}
                alt="Noah, square plate"
                className="aspect-square w-full max-w-[300px] rounded-sm border border-[#ece5d8]/20"
              />
              <div>
                <p className="font-fraunces text-2xl leading-relaxed tracking-tight text-[#ece5d8]/90">
                  Signs programmes at <span className="italic text-[#c9a15f]">{PROFILE.email}</span>.
                </p>
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 font-body text-[10px] uppercase tracking-[0.26em] text-[#8a817a]">
                  {Object.values(SOCIALS).map((s) => (
                    <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#c9a15f]">
                      {s.label} ↗
                    </a>
                  ))}
                  <a href={`mailto:${PROFILE.email}`} className="transition-colors hover:text-[#c9a15f]">Email ↗</a>
                </div>
              </div>
            </div>
          </Rise>
        </section>
      </div>

      {/* ── colophon ── */}
      <footer className="relative z-10 border-t border-[#ece5d8]/10 px-6 py-14 text-center md:px-12">
        <p className="font-fraunces text-5xl italic tracking-tight text-[#ece5d8]">Fin.</p>
        <p className="mt-6 font-body text-[9px] uppercase tracking-[0.3em] text-[#8a817a]">
          set in fraunces & jetbrains mono · © 2026 {PROFILE.name} ·{" "}
          <Link href="/" className="underline decoration-[#8a817a]/40 underline-offset-4 hover:text-[#c9a15f]">
            other studies
          </Link>
        </p>
      </footer>
    </main>
  );
}
