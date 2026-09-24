"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Lock, Music, Sparkles, Trophy } from "lucide-react";
import ProtectedImage from "@/components/ProtectedImage";
import { audioCtx, blip, deny } from "@/lib/synth";
import {
  ARCHIVE, PIANO, PORTRAIT, FEATURED, SECRET, SOCIALS,
} from "@/lib/content";

const PIXEL_CURSOR =
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpolygon points='4,2 4,20 9,16 12,22 15,21 12,15 19,15' fill='%23ffd23b' stroke='%23000' stroke-width='1.5'/%3E%3C/svg%3E") 4 2, pointer`;

type Fighter = {
  id: string;
  name: string;
  tag: string;
  color: string;
  desc: string;
  href?: string;
  locked?: boolean;
  stats: { label: string; v: number }[];
};

const FIGHTERS: Fighter[] = [
  {
    id: "piano", name: "PIANO JOURNEY", tag: "MAIN", color: "#ffd23b",
    desc: "The flagship. 12,000,000+ views of keys, plateaus and breakthroughs — documented in public.",
    href: PIANO.url,
    stats: [{ label: "VIEWS", v: 97 }, { label: "TEMPO", v: 82 }, { label: "GRIND", v: 100 }],
  },
  {
    id: "supastack", name: "SUPASTACK", tag: "KIT", color: "#efb779",
    desc: FEATURED[0].desc, href: FEATURED[0].url,
    stats: [{ label: "BASE", v: 92 }, { label: "SHIP", v: 96 }, { label: "DX", v: 88 }],
  },
  {
    id: "learnx", name: "LEARNX", tag: "SHOT", color: "#3b7bff",
    desc: FEATURED[1].desc, href: FEATURED[1].url,
    stats: [{ label: "USERS", v: 74 }, { label: "AI", v: 90 }, { label: "SHIP", v: 85 }],
  },
  {
    id: "opennotes", name: "OPENNOTES", tag: "TECH", color: "#3be0ff",
    desc: FEATURED[2].desc, href: FEATURED[2].url,
    stats: [{ label: "SRC", v: 100 }, { label: "NOTES", v: 78 }, { label: "SHIP", v: 80 }],
  },
  {
    id: "secret", name: "???", tag: "LOCKED", color: "#666", locked: true,
    desc: SECRET.name,
    stats: [{ label: "???", v: 0 }, { label: "???", v: 0 }, { label: "???", v: 0 }],
  },
];

export default function ArcadePage() {
  const [phase, setPhase] = useState<"attract" | "select">("attract");
  const [idx, setIdx] = useState(0);
  const [denied, setDenied] = useState(0);
  const cur = FIGHTERS[idx];

  const start = useCallback(() => {
    audioCtx(); // unlock audio inside the gesture
    blip(660);
    setPhase("select");
  }, []);

  const select = useCallback(
    (i: number) => {
      setIdx(i);
      if (FIGHTERS[i].locked) {
        deny();
        setDenied((d) => d + 1);
      } else {
        blip(520 + i * 90);
      }
    },
    [],
  );

  // Keyboard nav: arrows move, Enter opens, any key starts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase === "attract") {
        start();
        return;
      }
      const cols = 3;
      let n = idx;
      if (e.key === "ArrowRight") n = (idx + 1) % FIGHTERS.length;
      else if (e.key === "ArrowLeft") n = (idx - 1 + FIGHTERS.length) % FIGHTERS.length;
      else if (e.key === "ArrowDown") n = Math.min(idx + cols, FIGHTERS.length - 1);
      else if (e.key === "ArrowUp") n = Math.max(idx - cols, 0);
      else if (e.key === "Enter") {
        if (cur.locked) { deny(); setDenied((d) => d + 1); }
        else if (cur.href) window.open(cur.href, "_blank");
        return;
      } else return;
      select(n);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, idx, cur, start, select]);

  return (
    <main
      className="relative min-h-svh overflow-hidden bg-[#050508] font-body text-zinc-200"
      style={{ cursor: PIXEL_CURSOR }}
    >
      {/* CRT layers */}
      <div
        className="pointer-events-none fixed inset-0 z-40 opacity-40"
        style={{ background: "repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,0,0,0.35) 2px 4px)" }}
      />
      <div className="pointer-events-none fixed inset-0 z-40" style={{ boxShadow: "inset 0 0 140px rgba(0,0,0,0.85)" }} />
      <motion.div
        className="pointer-events-none fixed inset-0 z-40 bg-white"
        animate={{ opacity: [0, 0.02, 0, 0.03, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* ═══ attract mode ═══ */}
      {phase === "attract" && (
        <button onClick={start} className="fixed inset-0 z-30 grid w-full place-items-center text-center">
          <div>
            <p className="font-silk text-[10px] tracking-[0.5em] text-[#3be0ff]">COGNITION COIN-OP</p>
            <h1
              className="mt-6 font-silk text-4xl leading-tight text-white sm:text-6xl"
              style={{ textShadow: "-3px 0 #ff3b3b, 3px 0 #3be0ff, 0 6px 0 rgba(0,0,0,0.6)" }}
            >
              NOAH<br />FIGHTERS
            </h1>
            <p className="mt-2 font-silk text-xs text-[#ffd23b]">&apos;26 EDITION</p>
            <motion.p
              className="mt-14 font-silk text-sm text-white"
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
            >
              — PRESS START —
            </motion.p>
            <p className="mt-3 font-mono text-[10px] text-zinc-600">or click anywhere · 1 CREDIT</p>
          </div>
        </button>
      )}

      {phase === "select" && (
        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-8">
          {/* marquee */}
          <header className="flex flex-wrap items-center justify-between gap-3 border-b-4 border-zinc-800 pb-4">
            <div>
              <p className="font-silk text-[9px] tracking-[0.4em] text-[#3be0ff]">SELECT YOUR FILE</p>
              <h1 className="mt-1 font-silk text-xl text-white" style={{ textShadow: "-2px 0 #ff3b3b, 2px 0 #3be0ff" }}>
                NOAH FIGHTERS <span className="text-[#ffd23b]">&apos;26</span>
              </h1>
            </div>
            <div className="flex items-center gap-3 border-2 border-zinc-700 bg-black/60 px-3 py-2">
              <ProtectedImage src={PORTRAIT.square} alt="Player 1" className="h-10 w-10 border-2 border-[#ffd23b]" watermark="" />
              <div>
                <p className="font-silk text-[9px] text-[#ffd23b]">PLAYER 1</p>
                <p className="font-mono text-[10px] text-zinc-400">noah_zixin_zhang</p>
              </div>
            </div>
          </header>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
            {/* fighter grid */}
            <div>
              <div className="grid grid-cols-3 gap-3">
                {FIGHTERS.map((f, i) => (
                  <motion.button
                    key={f.id}
                    onMouseEnter={() => select(i)}
                    onClick={() => {
                      if (f.locked) { deny(); setDenied((d) => d + 1); }
                      else if (f.href) window.open(f.href, "_blank");
                    }}
                    animate={i === idx ? { y: [0, -4, 0] } : { y: 0 }}
                    transition={i === idx ? { duration: 0.7, repeat: Infinity } : {}}
                    className={`group relative aspect-square border-4 transition-colors ${
                      i === idx ? "border-[#ffd23b] bg-zinc-900" : "border-zinc-800 bg-black/50 hover:border-zinc-600"
                    }`}
                  >
                    {f.locked ? (
                      <div className="grid h-full place-items-center">
                        <div className="text-center">
                          <Lock size={22} className="mx-auto text-zinc-700" />
                          <p className="mt-2 font-silk text-lg text-zinc-700">???</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-2 p-2">
                        {f.id === "piano" ? (
                          <Music size={26} style={{ color: f.color }} />
                        ) : f.id === "kit" ? (
                          <Sparkles size={24} style={{ color: f.color }} />
                        ) : (
                          <Gamepad2 size={24} style={{ color: f.color }} />
                        )}
                        <p className="font-silk text-[8px] leading-tight sm:text-[10px]" style={{ color: f.color }}>
                          {f.name}
                        </p>
                      </div>
                    )}
                    <span
                      className="absolute left-0 top-0 px-1 font-silk text-[7px] text-black"
                      style={{ background: f.locked ? "#444" : f.color }}
                    >
                      {f.tag}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* stage select — archive */}
              <p className="mt-8 font-silk text-[9px] tracking-[0.35em] text-zinc-600">— STAGE SELECT —</p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {ARCHIVE.slice(0, 8).map((a) => (
                  <a
                    key={a.name}
                    href={a.url}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => blip(700, 0.04, 0.03)}
                    className="border-2 border-zinc-800 bg-black/40 px-2 py-2 text-center transition hover:border-[#3be0ff]"
                  >
                    <p className="truncate font-mono text-[9px] text-zinc-400">{a.name}</p>
                    <p className="font-silk text-[7px] text-zinc-700">{a.year}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* preview pane */}
            <motion.div
              key={cur.id + denied}
              animate={denied ? { x: [0, -6, 6, -4, 4, 0] } : {}}
              transition={{ duration: 0.3 }}
              className="border-4 p-5"
              style={{ borderColor: cur.locked ? "#333" : cur.color, background: "rgba(0,0,0,0.55)" }}
            >
              <div className="flex items-center justify-between">
                <p className="font-silk text-[9px] tracking-widest" style={{ color: cur.locked ? "#555" : cur.color }}>
                  {cur.locked ? "CHALLENGER LOCKED" : `FILE ${String(idx + 1).padStart(2, "0")}`}
                </p>
                {cur.id === "piano" && <Trophy size={14} className="text-[#ffd23b]" />}
              </div>
              <h2
                className="mt-3 font-silk text-2xl"
                style={{ color: cur.locked ? "#555" : cur.color, textShadow: cur.locked ? "none" : `2px 2px 0 rgba(0,0,0,0.7)` }}
              >
                {cur.name}
              </h2>
              <p className="mt-3 min-h-16 text-sm leading-relaxed text-zinc-400">{cur.desc}</p>

              <div className="mt-5 space-y-2">
                {cur.stats.map((s) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <span className="w-12 font-silk text-[8px] text-zinc-500">{s.label}</span>
                    <div className="h-3 flex-1 border border-zinc-800 bg-black">
                      <motion.div
                        className="h-full"
                        style={{ background: cur.locked ? "#333" : cur.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${s.v}%` }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                {cur.locked ? (
                  <p className="border-2 border-dashed border-zinc-700 px-4 py-3 text-center font-silk text-[10px] tracking-widest text-zinc-600">
                    IDENTITY ENCRYPTED — CLEAR DATA PENDING
                  </p>
                ) : cur.href ? (
                  <a
                    href={cur.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block border-2 px-4 py-3 text-center font-silk text-[10px] tracking-widest transition"
                    style={{ borderColor: cur.color, color: cur.color }}
                  >
                    ▶ FIGHT — OPEN LINK
                  </a>
                ) : (
                  <p className="border-2 border-dashed border-zinc-700 px-4 py-3 text-center font-silk text-[10px] tracking-widest text-zinc-500">
                    UNBOXING SOON
                  </p>
                )}
              </div>
            </motion.div>
          </div>

          {/* challenger approaching — X */}
          <a href={SOCIALS.x.url} target="_blank" rel="noreferrer" className="group relative mt-12 block overflow-hidden border-4 border-[#ffd23b]">
            <div
              className="absolute inset-0 opacity-25"
              style={{ background: "repeating-linear-gradient(45deg, #ffd23b 0 16px, #000 16px 32px)" }}
            />
            <motion.p
              className="relative py-5 text-center font-silk text-sm text-white sm:text-base"
              animate={{ opacity: [1, 1, 0.25, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              style={{ textShadow: "0 3px 0 #000" }}
            >
              ⚠ CHALLENGER APPROACHING — @Learnmore_smart ⚠
            </motion.p>
          </a>

          {/* now loading — build; */}
          <div className="mt-10 border-2 border-zinc-800 bg-black/60 p-4">
            <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500">
              <span className="text-[#7dd87d]">&gt; build;</span>
              <span>NOW LOADING…</span>
            </div>
            <div className="mt-2 h-4 border border-zinc-700 bg-black p-[3px]">
              <motion.div
                className="h-full"
                style={{ background: "repeating-linear-gradient(90deg, #7dd87d 0 8px, transparent 8px 10px)" }}
                animate={{ width: ["4%", "96%", "4%"] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <p className="mt-2 font-mono text-[9px] text-zinc-700">TIP: the next project compiles while you watch</p>
          </div>

          <footer className="mt-10 flex items-center justify-between border-t-2 border-zinc-800 pt-4 font-silk text-[8px] tracking-widest text-zinc-600">
            <span>© 2026 NOAH ZHANG BROS.</span>
            <Link href="/" className="transition hover:text-zinc-300">← EJECT CARTRIDGE</Link>
          </footer>
        </div>
      )}
    </main>
  );
}
