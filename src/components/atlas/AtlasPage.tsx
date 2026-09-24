"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowUpRight, Flag, RadioTower } from "lucide-react";
import ProtectedImage from "@/components/ProtectedImage";
import { hill, PEAKS } from "./contours";
import { PROFILE, PIANO, PORTRAIT, SOCIALS, FEATURED, SECRET, ARCHIVE, RECOGNITION } from "@/lib/content";

/* palette: paper #e9e3d5 · ink #232620 · contour #7d6647 · glacier #3f6d8e · signal #c7432b */

const EASE = [0.16, 1, 0.3, 1] as const;

function Rise({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* fixed left rail — altimeter + camp markers */
function Altimeter() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 22 });
  const markerTop = useTransform(smooth, [0, 1], ["0%", "100%"]);
  const [alt, setAlt] = useState(4120);

  useMotionValueEvent(smooth, "change", (v) => {
    setAlt(Math.round(4120 - v * 4000));
  });

  const camps = [
    { at: 0, label: "LAUNCH 4120m" },
    { at: 0.24, label: "C·II KEYS" },
    { at: 0.5, label: "C·III WORKS" },
    { at: 0.74, label: "FIELD LOG" },
    { at: 0.97, label: "BASE 120m" },
  ];

  return (
    <div aria-hidden className="pointer-events-none fixed left-4 top-1/2 z-40 hidden h-[62vh] -translate-y-1/2 md:block lg:left-8">
      <div className="relative h-full w-px bg-[#232620]/30">
        {camps.map((c) => (
          <div key={c.label} className="absolute -left-1 flex items-center gap-2" style={{ top: `${c.at * 100}%` }}>
            <span className="h-[5px] w-[5px] rotate-45 bg-[#232620]/60" />
            <span className="whitespace-nowrap font-body text-[9px] uppercase tracking-[0.24em] text-[#232620]/65">
              {c.label}
            </span>
          </div>
        ))}
        <motion.div style={{ top: markerTop }} className="absolute -left-[7px] -mt-[7px]">
          <div className="flex h-[14px] w-[14px] items-center justify-center rounded-full border-2 border-[#c7432b] bg-[#e9e3d5]">
            <div className="h-[4px] w-[4px] rounded-full bg-[#c7432b]" />
          </div>
        </motion.div>
      </div>
      <div className="absolute -bottom-10 -left-1 whitespace-nowrap font-body text-[13px] font-bold tracking-[0.2em] text-[#232620]/85 tabular-nums">
        ALT {alt.toLocaleString()} m
      </div>
    </div>
  );
}

function Stamp({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block -rotate-6 rounded-sm border-2 border-[#c7432b]/80 px-2.5 py-0.5 font-body text-[11px] font-bold uppercase tracking-[0.3em] text-[#c7432b]/90"
      style={{
        maskImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='40'%3E%3Cfilter id='d'%3E%3CfeTurbulence baseFrequency='0.4' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='40' filter='url(%23d)' opacity='0.85'/%3E%3C/svg%3E\")",
        maskSize: "cover",
      }}
    >
      {children}
    </span>
  );
}

export default function AtlasPage() {
  const contours = useMemo(
    () => PEAKS.flatMap((p) => hill(p.cx, p.cy, 60, 46, 9, p.seed)),
    []
  );

  return (
    <main className="relative min-h-screen cursor-crosshair bg-[#e9e3d5] text-[#232620]">
      {/* topo sheet */}
      <svg
        aria-hidden
        className="pointer-events-none fixed inset-0 h-full w-full opacity-[0.24]"
        viewBox="0 0 1400 1700"
        preserveAspectRatio="xMidYMid slice"
      >
        {contours.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#7d6647" strokeWidth={i % 4 === 0 ? 1.6 : 0.7} />
        ))}
      </svg>
      {/* grid graticule */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#232620 1px, transparent 1px), linear-gradient(90deg,#232620 1px, transparent 1px)",
          backgroundSize: "140px 140px",
        }}
      />

      <Altimeter />

      {/* collar strip */}
      <header className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-[#232620]/25 px-5 py-3 font-body text-[10px] uppercase tracking-[0.28em] text-[#232620]/80 md:px-14">
        <span>Survey sheet NZ-001</span>
        <span className="hidden sm:inline">scale 1:1 · datum wgs-84</span>
        <span>surveyed 2026 · {PROFILE.location}</span>
      </header>

      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-14 lg:pl-32">
        {/* ── hero ── */}
        <section className="grid gap-10 pb-24 pt-16 md:grid-cols-[1fr_360px] md:pt-24">
          <div>
            <Rise>
              <p className="font-body text-[10px] uppercase tracking-[0.34em] text-[#c7432b]">
                expedition record · {PROFILE.coords}
              </p>
            </Rise>
            <Rise delay={0.08}>
              <h1 className="mt-6 font-space text-[13vw] font-bold leading-[0.9] tracking-[-0.04em] sm:text-7xl md:text-8xl">
                NOAH
                <br />
                ZIXIN
                <br />
                ZHANG
              </h1>
            </Rise>
            <Rise delay={0.16}>
              <p className="mt-8 max-w-md font-body text-sm leading-relaxed text-[#232620]/85">
                {PROFILE.role}. Builds at altitude, ships on descent. This page is the
                flight down — scroll to lose elevation. Sections are camps; projects are
                triangulated points.
              </p>
            </Rise>
            <Rise delay={0.24}>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 font-body text-[11px] uppercase tracking-[0.26em] text-[#232620]/75">
                <span>{PROFILE.school}</span>
                <span>{PROFILE.languages}</span>
                <span>type — {PROFILE.type}</span>
              </div>
            </Rise>
          </div>

          <Rise delay={0.2}>
            {/* PLATE I — expedition photograph */}
            <figure className="relative">
              <div className="absolute -left-2 -top-2 h-4 w-4 border-l-2 border-t-2 border-[#232620]/60" aria-hidden />
              <div className="absolute -right-2 -top-2 h-4 w-4 border-r-2 border-t-2 border-[#232620]/60" aria-hidden />
              <div className="absolute -bottom-2 -left-2 h-4 w-4 border-b-2 border-l-2 border-[#232620]/60" aria-hidden />
              <div className="absolute -bottom-2 -right-2 h-4 w-4 border-b-2 border-r-2 border-[#232620]/60" aria-hidden />
              <ProtectedImage
                src={PORTRAIT.full}
                alt="Plate I — the pilot at launch site"
                className="aspect-[3/4] w-full border border-[#232620]/40 bg-[#d9d2c0] p-2"
                imgClassName="object-top"
              />
              <figcaption className="mt-3 flex justify-between font-body text-[10px] uppercase tracking-[0.24em] text-[#232620]/70">
                <span>pl. I — the pilot, launch site</span>
                <span>alt. 2,080 m</span>
              </figcaption>
            </figure>
          </Rise>
        </section>

        {/* ── THE DESCENT — piano journey ── */}
        <section className="border-t border-[#232620]/25 py-20">
          <Rise>
            <div className="flex items-baseline justify-between">
              <h2 className="font-space text-3xl font-bold tracking-tight md:text-4xl">The Descent</h2>
              <span className="font-body text-[11px] uppercase tracking-[0.3em] text-[#232620]/65">
                route: piano journey
              </span>
            </div>
          </Rise>

          <div className="mt-10 grid gap-10 md:grid-cols-[1fr_300px]">
            {/* route with waypoints */}
            <div className="relative">
              <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                  d="M4 8 C 30 20, 18 42, 44 50 S 78 74, 96 92"
                  fill="none"
                  stroke="#c7432b"
                  strokeWidth="1.4"
                  strokeDasharray="3 2"
                  vectorEffect="non-scaling-stroke"
                  opacity={0.9}
                />
              </svg>
              {[
                { wpt: "WPT-01", label: "First upload — channel opens", pos: "top-[0%] left-[6%]" },
                { wpt: "WPT-02", label: "Daily practice logs, pieces for beginners", pos: "top-[34%] left-[38%]" },
                { wpt: "WPT-03", label: `One Short passes ${PIANO.viralShort} views`, pos: "top-[58%] left-[62%]" },
                { wpt: "SUMMIT", label: `${PIANO.views} total views`, pos: "top-[88%] left-[84%]" },
              ].map((w, i) => (
                <Rise key={w.wpt} delay={i * 0.08} className={`absolute ${w.pos} w-[46%] md:w-[38%]`}>
                  <div className="flex items-start gap-2">
                    <Flag size={13} className="mt-0.5 shrink-0 text-[#c7432b]" />
                    <div className="bg-[#e9e3d5]/90 px-2 py-1.5 shadow-[2px_2px_0_rgba(35,38,32,0.12)]">
                      <p className="font-body text-[10px] font-bold uppercase tracking-[0.26em] text-[#c7432b]">
                        {w.wpt}
                      </p>
                      <p className="mt-1 font-body text-xs font-medium leading-snug text-[#232620]/90">{w.label}</p>
                    </div>
                  </div>
                </Rise>
              ))}
              {/* spacer to give the absolute waypoints height */}
              <div className="invisible h-[440px] md:h-[380px]" aria-hidden />
            </div>

            {/* field radio — channel card */}
            <Rise delay={0.1}>
              <div className="border border-[#232620]/40 bg-[#e2dbc9] p-5 shadow-[4px_4px_0_rgba(35,38,32,0.15)]">
                <div className="flex items-center justify-between">
                  <p className="font-body text-[10px] uppercase tracking-[0.28em] text-[#232620]/70">
                    field radio — operator
                  </p>
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#c7432b]" />
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <ProtectedImage
                    src={PORTRAIT.square}
                    alt="Operator"
                    className="h-12 w-12 rounded-full border border-[#232620]/40"
                    watermark=""
                  />
                  <div>
                    <p className="font-space text-sm font-bold tracking-tight">{PIANO.channel}</p>
                    <p className="font-body text-[11px] text-[#232620]/70">{PIANO.handle}</p>
                  </div>
                </div>
                <p className="mt-4 font-body text-xs leading-relaxed text-[#232620]/85">
                  {PIANO.blurb}
                </p>
                <a
                  href={PIANO.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 flex items-center justify-center gap-2 border-2 border-[#232620] bg-[#c7432b] px-4 py-2.5 font-body text-[10px] font-bold uppercase tracking-[0.26em] text-[#e9e3d5] transition-transform hover:-translate-y-0.5"
                >
                  tune in <ArrowUpRight size={13} />
                </a>
              </div>
            </Rise>
          </div>
        </section>

        {/* ── TRIANGULATION — projects ── */}
        <section className="border-t border-[#232620]/25 py-20">
          <Rise>
            <div className="flex items-baseline justify-between">
              <h2 className="font-space text-3xl font-bold tracking-tight md:text-4xl">Triangulation</h2>
              <span className="font-body text-[11px] uppercase tracking-[0.3em] text-[#232620]/65">
                {FEATURED.length + ARCHIVE.length + 1} points fixed
              </span>
            </div>
          </Rise>

          <Rise delay={0.05}>
            <div className="mt-8">
              {FEATURED.map((p, i) => (
                <a
                  key={p.id}
                  href={p.url}
                  target={p.url.startsWith("/") || p.url === "#" ? undefined : "_blank"}
                  rel="noreferrer"
                  onClick={p.url === "#" ? (e) => e.preventDefault() : undefined}
                  className="group grid grid-cols-[64px_1fr_auto] items-baseline gap-4 border-b border-[#232620]/20 py-4 md:grid-cols-[80px_1.2fr_1fr_140px_auto]"
                >
                  <span className="font-body text-[11px] tracking-[0.2em] text-[#3f6d8e]">
                    PT.{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-space text-xl font-bold tracking-tight transition-colors group-hover:text-[#c7432b] md:text-2xl">
                    {p.name}
                  </span>
                  <span className="hidden font-body text-xs leading-snug text-[#232620]/75 md:block">
                    {p.desc}
                  </span>
                  <span className="hidden font-body text-[10px] uppercase tracking-[0.2em] text-[#232620]/60 md:block">
                    brg {((i * 47 + 12) % 360).toString().padStart(3, "0")}° · {p.year}
                  </span>
                  <ArrowUpRight size={14} className="text-[#c7432b] opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </Rise>

          {/* terra incognita — the secret project under fog */}
          <Rise delay={0.08}>
            <div className="group relative mt-6 overflow-hidden border-2 border-dashed border-[#c7432b]/60">
              {/* hidden hints under the fog */}
              <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 bg-[#ddd5c2] px-8 py-12 text-center">
                <p className="font-space text-3xl font-bold tracking-tight text-[#232620]">{SECRET.name}</p>
                <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#232620]/70">
                  {SECRET.alias} · est. {SECRET.year}
                </p>
                <p className="max-w-sm font-body text-xs leading-relaxed text-[#232620]/85">
                  a structure is visible on the plate but not yet surveyed.
                </p>
              </div>
              {/* fog layer */}
              <div
                aria-hidden
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#e9e3d5]/85 backdrop-blur-[7px] transition-all duration-700 group-hover:bg-[#e9e3d5]/60 group-hover:backdrop-blur-[3px]"
              >
                {["?", "?", "?"].map((q, i) => (
                  <span
                    key={i}
                    className="absolute font-fraunces italic text-[#7d6647]/50"
                    style={{
                      left: `${18 + i * 28}%`,
                      top: `${20 + (i % 2) * 45}%`,
                      fontSize: 20 + i * 8,
                    }}
                  >
                    {q}
                  </span>
                ))}
                <span className="font-body text-[11px] font-bold uppercase tracking-[0.4em] text-[#c7432b]">
                  terra incognita
                </span>
                <span className="font-body text-[10px] uppercase tracking-[0.24em] text-[#232620]/65">
                  sector reserved — expedition pending
                </span>
              </div>
            </div>
          </Rise>

          {/* remaining surveyed points */}
          <Rise delay={0.05}>
            <div className="mt-6 grid gap-x-12 md:grid-cols-2">
              {ARCHIVE.map((p, i) => (
                <a
                  key={p.id}
                  href={p.url}
                  target={p.url.startsWith("/") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group flex items-baseline justify-between gap-4 border-b border-[#232620]/15 py-3"
                >
                  <span className="font-space text-base font-medium tracking-tight text-[#232620]/85 transition-colors group-hover:text-[#c7432b]">
                    <span className="mr-3 font-body text-[10px] tracking-[0.2em] text-[#3f6d8e]">
                      PT.{String(i + 5).padStart(2, "0")}
                    </span>
                    {p.name}
                  </span>
                  <span className="font-body text-[10px] uppercase tracking-[0.2em] text-[#232620]/60">{p.year}</span>
                </a>
              ))}
            </div>
          </Rise>
        </section>

        {/* ── FIELD LOG — build; ── */}
        <section className="border-t border-[#232620]/25 py-20">
          <Rise>
            <div className="flex items-baseline justify-between">
              <h2 className="font-space text-3xl font-bold tracking-tight md:text-4xl">Field Log</h2>
              <span className="font-body text-[11px] uppercase tracking-[0.3em] text-[#232620]/65">entry 017</span>
            </div>
          </Rise>
          <Rise delay={0.06}>
            <div className="relative mt-8 border border-[#232620]/40 bg-[#e2dbc9] p-6 md:p-8">
              <div className="absolute right-6 top-6">
                <Stamp>in progress</Stamp>
              </div>
              <p className="font-body text-[11px] uppercase tracking-[0.28em] text-[#232620]/70">
                log 017 — day without weather
              </p>
              <p className="mt-6 font-body text-lg text-[#232620] md:text-xl">
                <span className="text-[#3f6d8e]">&gt;</span> build;
                <span className="ml-2 inline-block h-4 w-2 animate-pulse bg-[#232620] align-middle" />
              </p>
              <p className="mt-4 max-w-lg font-body text-xs leading-relaxed text-[#232620]/80">
                the next instrument is being assembled at this camp. coordinates withheld
                until the frame holds weight.
              </p>
            </div>
          </Rise>
        </section>

        {/* ── citations + radio beacon ── */}
        <section className="grid gap-10 border-t border-[#232620]/25 py-20 md:grid-cols-2">
          <div>
            <Rise>
              <h2 className="font-space text-2xl font-bold tracking-tight">Margin Citations</h2>
            </Rise>
            <Rise delay={0.05}>
              <ul className="mt-6 space-y-3">
                {RECOGNITION.map((r) => (
                  <li key={r.title} className="flex items-baseline justify-between gap-4 border-b border-[#232620]/15 pb-3">
                    <span className="font-body text-xs text-[#232620]/85">{r.title}</span>
                    <span className="font-body text-[10px] uppercase tracking-[0.2em] text-[#232620]/60">{r.period}</span>
                  </li>
                ))}
              </ul>
            </Rise>
          </div>

          {/* RADIO BEACON — X */}
          <Rise delay={0.08}>
            <a
              href={SOCIALS.x.url}
              target="_blank"
              rel="noreferrer"
              className="group relative block overflow-hidden border border-[#232620]/40 bg-[#232620] p-6 text-[#e9e3d5] md:p-8"
            >
              <div aria-hidden className="absolute right-6 top-6 opacity-40">
                <RadioTower size={26} className="relative z-10 text-[#e9e3d5]" />
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="absolute inset-0 animate-ping rounded-full border border-[#e9e3d5]/50"
                    style={{ animationDuration: `${1.8 + i * 0.7}s`, animationDelay: `${i * 0.45}s` }}
                  />
                ))}
              </div>
              <p className="font-body text-[10px] uppercase tracking-[0.34em] text-[#e9e3d5]/70">
                radio beacon — open frequency
              </p>
              <p className="mt-4 font-space text-2xl font-bold tracking-tight">
                CQ CQ — <span className="text-[#e8b34a]">{SOCIALS.x.handle}</span>
              </p>
              <p className="mt-2 font-body text-xs text-[#e9e3d5]/80">
                transmissions between builds. hail on x.com — channel always open.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.26em] text-[#e8b34a]">
                raise the tower <ArrowUpRight size={12} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>
          </Rise>
        </section>

        {/* ── footer: compass + colophon ── */}
        <footer className="flex flex-col items-center gap-6 border-t border-[#232620]/25 py-14 text-center">
          <svg viewBox="0 0 64 64" className="h-14 w-14 text-[#232620]" aria-hidden>
            <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            <path d="M32 8 L36 32 L32 56 L28 32 Z" fill="#c7432b" />
            <path d="M8 32 L32 28 L56 32 L32 36 Z" fill="currentColor" opacity="0.4" />
            <text x="32" y="5.5" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="currentColor">N</text>
          </svg>
          <p className="font-body text-[10px] uppercase tracking-[0.3em] text-[#232620]/70">
            surveyed &amp; drawn by {PROFILE.name} · © 2026 ·{" "}
            <Link href="/" className="underline underline-offset-4 hover:text-[#c7432b]">
              other charts
            </Link>
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 font-body text-[10px] uppercase tracking-[0.24em] text-[#232620]/65">
            {Object.values(SOCIALS).map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="hover:text-[#c7432b]">
                {s.label} ↗
              </a>
            ))}
            <a href={`mailto:${PROFILE.email}`} className="hover:text-[#c7432b]">Email ↗</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
