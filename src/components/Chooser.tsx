"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

interface Door {
  key: string;
  href: string;
  index: string;
  name: string;
  tagline: string;
  className: string;
  preview: React.ReactNode;
}

const pianoRoll = (
  <div className="relative w-24">
    <div className="flex h-14 flex-col justify-between border-l border-[#e8b34a]/40 pl-2">
      {[
        { l: 0, w: 55, c: "#e8b34a" },
        { l: 20, w: 40, c: "#3b7bff" },
        { l: 45, w: 30, c: "#7dd87d" },
        { l: 30, w: 25, c: "#4a4a4f" },
        { l: 60, w: 35, c: "#c7432b" },
      ].map((b, i) => (
        <div key={i} className="h-[6px] rounded-[1px] opacity-80" style={{ marginLeft: `${b.l}%`, width: `${b.w}%`, background: b.c }} />
      ))}
    </div>
    <div className="absolute inset-y-[-6px] left-1/2 w-px animate-pulse bg-[#ff3355]" />
  </div>
);

const fighterTile = (
  <div className="grid w-24 grid-cols-3 gap-1">
    {["#ffd23b", "#3b7bff", "#ff3b3b", "#3be0ff", "#7dd87d", "#333"].map((c, i) => (
      <div key={i} className="flex aspect-square items-center justify-center border-2" style={{ borderColor: c }}>
        <span className="font-silk text-[7px]" style={{ color: c }}>{i === 5 ? "?" : "▞"}</span>
      </div>
    ))}
  </div>
);

const contours = (
  <svg viewBox="0 0 96 64" className="w-24 text-[#7d6647]" fill="none" aria-hidden>
    {[8, 15, 22, 29].map((r, i) => (
      <ellipse
        key={i}
        cx="48"
        cy="32"
        rx={r + 6}
        ry={r * 0.62}
        stroke="currentColor"
        strokeWidth="1"
        opacity={0.9 - i * 0.18}
        transform={`rotate(${i * 7 - 10} 48 32)`}
      />
    ))}
    <path d="M6 56 L30 40 L48 52 L70 34 L90 48" stroke="#c7432b" strokeWidth="1.4" strokeDasharray="3 3" />
  </svg>
);

const DOORS: Door[] = [
  {
    key: "1",
    href: "/",
    index: "STUDY 01 — SHIPPED",
    name: "Session 026",
    tagline: "A DAW arrangement. Every section is a track; the playhead never stops — turn the monitor on and it plays. This one won — it lives at / now.",
    className: "bg-[#0a0a0c] text-zinc-200 hover:flex-[1.6]",
    preview: pianoRoll,
  },
  {
    key: "2",
    href: "/arcade",
    index: "STUDY 02",
    name: "Noah Fighters",
    tagline: "A fighting-game select screen. Pick your file — one challenger is still locked.",
    className: "bg-[#050508] text-zinc-200 hover:flex-[1.6]",
    preview: fighterTile,
  },
  {
    key: "3",
    href: "/atlas",
    index: "STUDY 03",
    name: "Field Notes",
    tagline: "An expedition map. Scroll is altitude; one sector is still uncharted.",
    className: "bg-[#e9e3d5] text-[#232620] hover:flex-[1.6]",
    preview: contours,
  },
];

export default function Chooser() {
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const door = DOORS.find((d) => d.key === e.key);
      if (door) router.push(door.href);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col bg-[#060606] text-[#ece5d8]">
      {/* Header strip */}
      <header className="flex items-baseline justify-between px-5 py-4 md:px-8">
        <span className="font-body text-[11px] uppercase tracking-[0.3em] text-white/50">
          Noah Zixin Zhang
        </span>
        <span className="font-body text-[11px] uppercase tracking-[0.3em] text-white/50">
          Three studies — pick one
        </span>
      </header>

      {/* The three doors */}
      <div className="flex flex-1 flex-col md:flex-row">
        {DOORS.map((door) => (
          <Link
            key={door.key}
            href={door.href}
            className={`group relative flex flex-1 basis-0 flex-col justify-between overflow-hidden border-t border-white/10 p-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:border-l md:border-t-0 md:first:border-l-0 md:p-8 ${door.className}`}
          >
            <div className="flex items-start justify-between">
              <span className="font-body text-[10px] uppercase tracking-[0.3em] opacity-50">
                {door.index}
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-current opacity-30 transition-all duration-300 group-hover:opacity-100">
                <ArrowUpRight size={13} />
              </span>
            </div>

            <div className="py-10 opacity-60 transition-opacity duration-300 group-hover:opacity-100">
              {door.preview}
            </div>

            <div>
              <h1 className="font-display text-3xl tracking-tight md:text-4xl">{door.name}</h1>
              <p className="mt-3 max-w-[30ch] font-body text-xs leading-relaxed opacity-60">
                {door.tagline}
              </p>
              <p className="mt-6 font-body text-[10px] uppercase tracking-[0.3em] opacity-40">
                press {door.key} or click
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer strip */}
      <footer className="flex items-center justify-between px-5 py-4 md:px-8">
        <span className="flex items-center gap-4">
          <Link
            href="/classic"
            className="font-body text-[11px] uppercase tracking-[0.3em] text-white/40 transition-colors hover:text-white"
          >
            current site → /classic
          </Link>
          <span className="hidden font-body text-[10px] tracking-[0.2em] text-white/25 sm:block">
            archive: <Link href="/recital" className="hover:text-white/60">/recital</Link> · <Link href="/os" className="hover:text-white/60">/os</Link>
          </span>
        </span>
        <span className="font-body text-[11px] uppercase tracking-[0.3em] text-white/30">
          © 2026
        </span>
      </footer>
    </main>
  );
}
