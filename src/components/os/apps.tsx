"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Package,
  FileLock2,
  AppWindow,
  Github,
  ArrowUpRight,
} from "lucide-react";
import ProtectedImage from "@/components/ProtectedImage";
import { PROFILE, PIANO, PORTRAIT, SOCIALS, FEATURED, SECRET, ARCHIVE } from "@/lib/content";

const mono = "font-body text-[11px]";
const dim = "text-[#9aa483]";
const green = "text-[#7dd87d]";

/* ─── Piano Journey.app ─── */
export function PianoApp() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className={`${mono} uppercase tracking-[0.24em] ${dim}`}>now streaming</p>
          <h3 className="mt-1 font-silk text-lg text-[#e8eedb]">{PIANO.channel}</h3>
          <p className={`${mono} ${dim}`}>{PIANO.handle}</p>
        </div>
        <a
          href={PIANO.url}
          target="_blank"
          rel="noreferrer"
          className="rounded-md bg-[#c22f2f] px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#e03c3c]"
        >
          Subscribe
        </a>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-[#3a3f2c] bg-[#0c0e07] p-3">
          <p className="font-silk text-xl text-[#7dd87d]">{PIANO.views}</p>
          <p className={`${mono} ${dim}`}>total views</p>
        </div>
        <div className="rounded-lg border border-[#3a3f2c] bg-[#0c0e07] p-3">
          <p className="font-silk text-xl text-[#7dd87d]">{PIANO.viralShort}</p>
          <p className={`${mono} ${dim}`}>on one Short</p>
        </div>
      </div>

      <div className="relative mt-4 overflow-hidden rounded-lg border border-[#3a3f2c] bg-black">
        <video
          src={PIANO.demoVideo}
          className="aspect-video w-full object-cover"
          muted
          loop
          playsInline
          controls
          preload="metadata"
        />
        <span className={`pointer-events-none absolute left-2 top-2 rounded bg-black/70 px-1.5 py-0.5 ${mono} text-[9px] uppercase tracking-[0.2em] text-white/80`}>
          Für Elise — tutorial
        </span>
      </div>

      <p className={`mt-3 ${mono} leading-relaxed ${dim}`}>{PIANO.blurb}</p>
    </div>
  );
}

/* ─── Projects/ folder ─── */
interface FileRow {
  name: string;
  kind: "app" | "pkg" | "secret" | "repo";
  note: string;
  action: () => void;
}

export function ProjectsApp({ toast }: { toast: (msg: string) => void }) {
  const open = (url: string) => () => window.open(url, "_blank", "noreferrer");

  const files: FileRow[] = [
    ...FEATURED.map((p) => ({
      name: `${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "")}.app`,
      kind: "app" as const,
      note: p.desc,
      action: open(p.url),
    })),
    {
      name: "[starterkit].pkg",
      kind: "pkg",
      note: "installer package — still compiling",
      action: () => toast("[starterkit].pkg — build at 73%. check back soon."),
    },
    {
      name: `${SECRET.name.toLowerCase()}.secret`,
      kind: "secret",
      note: "encrypted — clearance L5 required",
      action: () => toast("ACCESS DENIED — an unknown project lives here. clearance pending."),
    },
    ...ARCHIVE.slice(0, 5).map((p) => ({
      name: `${p.id}.app`,
      kind: "repo" as const,
      note: p.name,
      action: open(p.url.startsWith("/") ? `https://www.rateministere.com${p.url}` : p.url),
    })),
  ];

  return (
    <div className="max-h-[340px] overflow-y-auto p-2 [scrollbar-width:thin]">
      <p className={`${mono} ${dim} px-2 pb-2 uppercase tracking-[0.2em]`}>
        ~/projects — {files.length} items
      </p>
      {files.map((f) => (
        <button
          key={f.name}
          onDoubleClick={f.action}
          onClick={(e) => {
            if (e.detail === 1 && window.matchMedia("(pointer: coarse)").matches) f.action();
          }}
          title="double-click to open"
          className="group flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-[#7dd87d]/10"
        >
          <span className="text-[#9aa483] group-hover:text-[#7dd87d]">
            {f.kind === "app" && <AppWindow size={16} />}
            {f.kind === "pkg" && <Package size={16} />}
            {f.kind === "secret" && <FileLock2 size={16} />}
            {f.kind === "repo" && <Github size={16} />}
          </span>
          <span className="min-w-0 flex-1">
            <span className={`block truncate ${mono} ${f.kind === "secret" ? "text-[#d98a8a]" : "text-[#e8eedb]"}`}>
              {f.name}
            </span>
            <span className={`block truncate text-[10px] ${dim}`}>{f.note}</span>
          </span>
          <ArrowUpRight size={12} className="opacity-0 transition-opacity group-hover:opacity-60" />
        </button>
      ))}
      <p className={`${mono} ${dim} mt-2 px-2 text-[9px] opacity-60`}>
        tip: double-click to open. some files fight back.
      </p>
    </div>
  );
}

/* ─── Terminal.app — the build; placeholder lives here ─── */
interface TermLine {
  kind: "in" | "out" | "err";
  text: string;
}

export function TerminalApp({ openX }: { openX: () => void }) {
  const [history, setHistory] = useState<TermLine[]>([
    { kind: "out", text: "NOAH.OS tty0 — type 'help'" },
    { kind: "in", text: "build;" },
    { kind: "out", text: "compiling placeholder… this space is reserved for the next build." },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [history]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const out: TermLine[] = [{ kind: "in", text: raw }];
    const say = (text: string, kind: TermLine["kind"] = "out") => out.push({ kind, text });

    switch (cmd) {
      case "":
        break;
      case "help":
        say("build; · piano · open x · ls · whoami · quote · clear");
        break;
      case "build":
      case "build;":
        say("[████████████░░░░░░] 73% — reserved for whatever ships next.");
        break;
      case "piano":
        say("opening the channel…");
        window.open(PIANO.url, "_blank", "noreferrer");
        break;
      case "open x":
      case "x":
        say("opening uplink…");
        openX();
        break;
      case "ls":
        say("piano.app  projects/  readme.txt  portrait.raw  x_uplink  ██████.secret");
        break;
      case "whoami":
        say(`${PROFILE.name} — ${PROFILE.role.toLowerCase()}, ${PROFILE.location}`);
        break;
      case "quote":
        say(`"${PROFILE.quotes[Math.floor(Math.random() * PROFILE.quotes.length)]}"`);
        break;
      case "clear":
        setHistory([]);
        return;
      default:
        say(`command not found: ${cmd}`, "err");
    }
    setHistory((h) => [...h, ...out]);
  };

  return (
    <div
      className="h-[280px] overflow-y-auto bg-[#07080a] p-3 font-body text-[11px] leading-[1.8] [scrollbar-width:thin]"
      onClick={(e) => {
        const inputEl = e.currentTarget.querySelector("input");
        if (inputEl && e.target === e.currentTarget) inputEl.focus();
      }}
    >
      {history.map((l, i) => (
        <p key={i} className={l.kind === "in" ? "text-[#e8eedb]" : l.kind === "err" ? "text-[#d98a8a]" : dim}>
          {l.kind === "in" && <span className={green}>noah@rm:~$ </span>}
          {l.text}
        </p>
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(input);
          setInput("");
        }}
        className="flex items-center"
      >
        <span className={green}>noah@rm:~$&nbsp;</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent text-[#e8eedb] caret-[#7dd87d] outline-none"
          autoComplete="off"
          spellCheck={false}
          aria-label="terminal input"
        />
      </form>
      <div ref={endRef} />
    </div>
  );
}

/* ─── x_uplink — the X link as a transmission console ─── */
export function XUplinkApp() {
  return (
    <div className="relative overflow-hidden p-4">
      {/* scanlines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,#7dd87d 0 1px,transparent 1px 3px)" }}
      />
      <p className={`${mono} uppercase tracking-[0.24em] ${dim}`}>uplink — 400.2 MHz</p>
      <div className="mt-3 flex items-end gap-1" aria-hidden>
        {[10, 22, 14, 30, 18, 26, 12, 24, 16, 28, 8, 20].map((h, i) => (
          <span
            key={i}
            className="w-2 animate-pulse bg-[#7dd87d]/80"
            style={{ height: h, animationDelay: `${i * 90}ms`, animationDuration: "900ms" }}
          />
        ))}
      </div>
      <p className="mt-4 font-silk text-base text-[#e8eedb]">signal acquired</p>
      <p className={`${mono} ${dim}`}>
        carrier — x.com · callsign <span className="text-[#7dd87d]">{SOCIALS.x.handle}</span>
      </p>
      <a
        href={SOCIALS.x.url}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-md border border-[#7dd87d]/50 bg-[#7dd87d]/10 px-4 py-2 font-body text-[10px] uppercase tracking-[0.22em] text-[#7dd87d] transition-colors hover:bg-[#7dd87d]/25"
      >
        open channel <ArrowUpRight size={12} />
      </a>
    </div>
  );
}

/* ─── readme.txt ─── */
export function ReadmeApp() {
  return (
    <div className={`${mono} max-h-[300px] overflow-y-auto p-4 leading-[1.9] text-[#c6cfb4] [scrollbar-width:thin]`}>
      <p className={dim}># readme.txt — last touched 2026-09</p>
      <p className="mt-3">
        {PROFILE.name}. {PROFILE.role}, {PROFILE.location}. Studying at {PROFILE.school}.
      </p>
      <p className="mt-3">
        speaks {PROFILE.languages}. types as {PROFILE.type}. builds tools, platforms and
        interactive things that should feel effortless.
      </p>
      <p className="mt-3 italic text-[#8a946f]">
        “{PROFILE.quotes[0]}”
      </p>
      <p className="mt-3 italic text-[#8a946f]">
        “{PROFILE.quotes[1]}” — the secret life of walter mitty
      </p>
      <p className={`mt-3 ${dim}`}># contact: {PROFILE.email}</p>
    </div>
  );
}

/* ─── portrait.raw — protected photo viewer ─── */
export function PhotoApp() {
  return (
    <div className="p-3">
      <ProtectedImage
        src={PORTRAIT.full}
        alt="Noah at the paragliding launch site"
        className="aspect-[3/4] w-full rounded-lg border border-[#3a3f2c]"
        imgClassName="object-top"
      />
      <p className={`${mono} ${dim} mt-2 flex justify-between text-[9px] uppercase tracking-[0.2em]`}>
        <span>portrait.raw</span>
        <span>drm: politely enforced</span>
      </p>
    </div>
  );
}
