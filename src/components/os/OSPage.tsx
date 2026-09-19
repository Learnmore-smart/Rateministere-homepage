"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Music4,
  Folder,
  TerminalSquare,
  FileText,
  Radio,
  ImageIcon,
  Command,
} from "lucide-react";
import Window from "./Window";
import { PianoApp, ProjectsApp, TerminalApp, XUplinkApp, ReadmeApp, PhotoApp } from "./apps";
import ProtectedImage from "@/components/ProtectedImage";
import { PROFILE, PORTRAIT } from "@/lib/content";

type WinId = "piano" | "projects" | "terminal" | "xuplink" | "readme" | "photo";
type Phase = "boot" | "login" | "desktop";

const WIN_DEFS: Record<
  WinId,
  { title: string; icon: React.ReactNode; x: number; y: number; width: number; body: (h: { toast: (m: string) => void; openX: () => void }) => React.ReactNode }
> = {
  piano: {
    title: "Piano Journey.app",
    icon: <Music4 size={11} />,
    x: 150, y: 26, width: 500,
    body: () => <PianoApp />,
  },
  projects: {
    title: "Projects",
    icon: <Folder size={11} />,
    x: 590, y: 60, width: 430,
    body: ({ toast }) => <ProjectsApp toast={toast} />,
  },
  terminal: {
    title: "Terminal — zsh",
    icon: <TerminalSquare size={11} />,
    x: 110, y: 340, width: 480,
    body: ({ openX }) => <TerminalApp openX={openX} />,
  },
  xuplink: {
    title: "x_uplink",
    icon: <Radio size={11} />,
    x: 660, y: 320, width: 340,
    body: () => <XUplinkApp />,
  },
  readme: {
    title: "readme.txt",
    icon: <FileText size={11} />,
    x: 660, y: 390, width: 380,
    body: () => <ReadmeApp />,
  },
  photo: {
    title: "portrait.raw",
    icon: <ImageIcon size={11} />,
    x: 420, y: 70, width: 300,
    body: () => <PhotoApp />,
  },
};

const ICONS: { id: WinId; label: string; icon: React.ReactNode }[] = [
  { id: "piano", label: "Piano Journey", icon: <Music4 size={26} strokeWidth={1.4} /> },
  { id: "projects", label: "Projects", icon: <Folder size={26} strokeWidth={1.4} /> },
  { id: "terminal", label: "Terminal", icon: <TerminalSquare size={26} strokeWidth={1.4} /> },
  { id: "xuplink", label: "x_uplink", icon: <Radio size={26} strokeWidth={1.4} /> },
  { id: "photo", label: "portrait.raw", icon: <ImageIcon size={26} strokeWidth={1.4} /> },
  { id: "readme", label: "readme.txt", icon: <FileText size={26} strokeWidth={1.4} /> },
];

const BOOT_LINES = [
  "NOAH BIOS v2.6 — memory check OK",
  "mounting /dev/creativity ……… OK",
  "loading kernel.modules [ piano.so, motion.so, ship_it.so ]",
  "resolving rateministere.com ……… 200",
  "starting window server",
];

/* ── boot ── */
function Boot({ done }: { done: () => void }) {
  const [line, setLine] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const li = setInterval(() => setLine((v) => Math.min(v + 1, BOOT_LINES.length)), 380);
    const pi = setInterval(() => setPct((v) => Math.min(100, v + 7 + Math.random() * 12)), 160);
    const t = setTimeout(done, 2600);
    const skip = () => done();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      clearInterval(li);
      clearInterval(pi);
      clearTimeout(t);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [done]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07080a] font-body text-[12px] text-[#7dd87d]"
    >
      <div className="w-[min(520px,86vw)]">
        <p className="mb-6 font-silk text-[#e8eedb]">NOAH.OS</p>
        {BOOT_LINES.slice(0, line).map((l, i) => (
          <p key={i} className="leading-[2] text-[#9aa483]">
            <span className="text-[#7dd87d]/60">[ {(i * 0.42).toFixed(4)} ]</span> {l}
          </p>
        ))}
        <div className="mt-8 h-2 w-full overflow-hidden rounded-sm border border-[#3a3f2c]">
          <div className="h-full bg-[#7dd87d] transition-all duration-150" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-3 text-[10px] uppercase tracking-[0.24em] text-[#9aa483]/60">press any key to skip</p>
      </div>
    </motion.div>
  );
}

/* ── login ── */
function Login({ done }: { done: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") done();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [done]);

  return (
    <motion.button
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35 }}
      onClick={done}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0b0d07]"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, #7dd87d 0, transparent 40%), radial-gradient(circle at 75% 75%, #c9a15f 0, transparent 45%)",
        }}
      />
      <ProtectedImage
        src={PORTRAIT.square}
        alt="Noah — account avatar"
        className="h-24 w-24 rounded-full border-2 border-[#3a3f2c] shadow-[0_0_50px_rgba(125,216,125,0.15)]"
        watermark=""
      />
      <p className="mt-5 font-silk text-lg text-[#e8eedb]">{PROFILE.name}</p>
      <p className="mt-1 font-body text-[10px] uppercase tracking-[0.3em] text-[#9aa483]">
        {PROFILE.role} — {PROFILE.location}
      </p>
      <p className="mt-8 animate-pulse font-body text-[10px] uppercase tracking-[0.3em] text-[#7dd87d]">
        click or press ⏎ to log in
      </p>
    </motion.button>
  );
}

/* ── menu bar ── */
function MenuBar({ openWin }: { openWin: (id: WinId) => void }) {
  const [now, setNow] = useState("");
  useEffect(() => {
    const tick = () =>
      setNow(
        new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-between border-b border-[#3a3f2c]/70 bg-[#0b0d07]/85 px-4 py-1.5 backdrop-blur-md">
      <div className="pointer-events-auto flex items-center gap-4">
        <span className="flex items-center gap-1.5 font-silk text-[11px] text-[#e8eedb]">
          <Command size={12} /> NOAH.OS
        </span>
        {["File", "Projects", "Piano", "Help"].map((m) => (
          <button
            key={m}
            onClick={() => openWin(m === "Piano" ? "piano" : m === "Projects" ? "projects" : "readme")}
            className="hidden font-body text-[10px] uppercase tracking-[0.2em] text-[#9aa483] transition-colors hover:text-[#e8eedb] sm:block"
          >
            {m}
          </button>
        ))}
      </div>
      <div className="pointer-events-auto flex items-center gap-4">
        <button
          onClick={() => openWin("xuplink")}
          className="flex items-center gap-1.5 font-body text-[10px] uppercase tracking-[0.2em] text-[#7dd87d] transition-colors hover:text-[#a5eca5]"
        >
          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#7dd87d]" />
          𝕏 uplink
        </button>
        <Link href="/" className="font-body text-[10px] uppercase tracking-[0.2em] text-[#9aa483] transition-colors hover:text-[#e8eedb]">
          exit
        </Link>
        <span className="font-body text-[10px] tracking-[0.14em] text-[#9aa483] tabular-nums">{now}</span>
      </div>
    </div>
  );
}

/* ── desktop ── */
export default function OSPage() {
  const [phase, setPhase] = useState<Phase>("boot");
  const [open, setOpen] = useState<WinId[]>([]);
  const [order, setOrder] = useState<WinId[]>([]);
  const [selected, setSelected] = useState<WinId | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 2600);
  }, []);

  const focus = useCallback((id: WinId) => {
    setOrder((o) => [...o.filter((w) => w !== id), id]);
  }, []);

  const openWin = useCallback(
    (id: WinId) => {
      setOpen((o) => (o.includes(id) ? o : [...o, id]));
      focus(id);
    },
    [focus]
  );

  const closeWin = useCallback((id: WinId) => {
    setOpen((o) => o.filter((w) => w !== id));
  }, []);

  // entering desktop: open the two greeting windows
  useEffect(() => {
    if (phase === "desktop") {
      const t1 = setTimeout(() => openWin("piano"), 250);
      const t2 = setTimeout(() => openWin("readme"), 550);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [phase, openWin]);

  return (
    <main className="h-[100svh] overflow-hidden bg-[#07080a]">
      <AnimatePresence>
        {phase === "boot" && <Boot key="boot" done={() => setPhase("login")} />}
        {phase === "login" && <Login key="login" done={() => setPhase("desktop")} />}
      </AnimatePresence>

      {phase === "desktop" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative h-full w-full"
        >
          {/* wallpaper */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(1100px circle at 20% 0%, rgba(125,216,125,0.07), transparent 55%), radial-gradient(900px circle at 90% 90%, rgba(201,161,95,0.06), transparent 55%), linear-gradient(180deg,#0b0d07,#07080a)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(#7dd87d 1px, transparent 1px), linear-gradient(90deg, #7dd87d 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />

          <MenuBar openWin={openWin} />

          {/* desktop icons */}
          <div className="absolute left-4 top-12 z-10 grid grid-cols-1 gap-1 md:left-6">
            {ICONS.map((ic) => (
              <button
                key={ic.id}
                onClick={() => setSelected(ic.id)}
                onDoubleClick={() => openWin(ic.id)}
                className={`flex w-[92px] flex-col items-center gap-1.5 rounded-lg px-2 py-2.5 transition-colors ${
                  selected === ic.id ? "bg-[#7dd87d]/15" : "hover:bg-white/5"
                }`}
                title="double-click to open"
              >
                <span className={selected === ic.id ? "text-[#7dd87d]" : "text-[#9aa483]"}>{ic.icon}</span>
                <span
                  className={`font-silk text-[9px] leading-tight ${
                    selected === ic.id ? "bg-[#1c2413] text-[#7dd87d]" : "text-[#c6cfb4]"
                  } rounded px-1`}
                >
                  {ic.label}
                </span>
              </button>
            ))}
          </div>

          {/* window layer */}
          <div className="absolute inset-0 z-20 pt-8">
            <AnimatePresence>
              {/* eslint-disable-next-line react-hooks/refs -- dragConstraints uses a pixel BoundingBox, no ref access in render */}
              {open.map((id) => {
                const def = WIN_DEFS[id];
                const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
                const vh = typeof window !== "undefined" ? window.innerHeight : 900;
                const w = Math.min(def.width, vw - 24);
                const x = Math.max(8, Math.min(def.x, vw - w - 8));
                const y = Math.max(40, Math.min(def.y, vh - 160));
                return (
                  <Window
                    key={id}
                    title={def.title}
                    icon={def.icon}
                    x={x}
                    y={y}
                    width={def.width}
                    z={20 + order.indexOf(id)}
                    bounds={{ left: 8 - x, right: vw - x - w - 8, top: 40 - y, bottom: vh - y - 60 }}
                    onFocus={() => focus(id)}
                    onClose={() => closeWin(id)}
                  >
                    {def.body({ toast, openX: () => openWin("xuplink") })}
                  </Window>
                );
              })}
            </AnimatePresence>
          </div>

          {/* toast */}
          <AnimatePresence>
            {toastMsg && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-[#7dd87d]/40 bg-[#0b0d07]/95 px-4 py-2.5 font-body text-[10px] uppercase tracking-[0.2em] text-[#7dd87d] shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
              >
                {toastMsg}
              </motion.div>
            )}
          </AnimatePresence>

          {/* bottom hint */}
          <p className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap font-body text-[9px] uppercase tracking-[0.3em] text-[#9aa483]/50">
            drag the windows · terminal knows ‘help’ · /classic for the old site
          </p>
        </motion.div>
      )}
    </main>
  );
}
