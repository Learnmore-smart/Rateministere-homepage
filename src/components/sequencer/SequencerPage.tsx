"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  Reorder,
  useAnimationFrame,
  useDragControls,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import {
  ArrowUpRight, Circle, GripVertical, Lock, Moon, Play, Sun, Square, Volume2, VolumeX,
} from "lucide-react";
import ProtectedImage from "@/components/ProtectedImage";
import BrandIcon, { type BrandName } from "@/components/icons/brands";
import { useLang, type TranslationType } from "@/components/LanguageContext";
import { audioCtx, blip, deny, pluck } from "@/lib/synth";
import {
  ARCHIVE, FEATURED, PIANO, PORTRAIT, PROFILE, RECOGNITION, SECRET, SOCIALS,
} from "@/lib/content";

/* ── Timeline model ─────────────────────────────────────────── */

const LOOP_MS = 9600;
const BAR = 100 / 16; // one bar = 6.25% of the lane

type ClipDef = { id: string; label: string; at: number; w: number };
type TrackDef = {
  id: string;
  name: string;
  color: string;
  freq: number;
  locked?: boolean;
  clips: ClipDef[];
};

const TRACKS: TrackDef[] = [
  {
    id: "operator", name: "OPERATOR", color: "#a8a8b0", freq: 293.66,
    clips: [
      { id: "bio", label: "noah_zixin_zhang", at: 2, w: 30 },
      { id: "creds", label: "credentials", at: 44, w: 20 },
    ],
  },
  {
    id: "piano", name: "PIANO_JOURNEY", color: "#e8b34a", freq: 261.63,
    clips: [
      { id: "channel", label: "channel — 10M+ views", at: 6, w: 30 },
      { id: "elise", label: "für elise — tutorial", at: 46, w: 24 },
      { id: "short", label: "viral short — 3M+", at: 78, w: 16 },
    ],
  },
  {
    id: "works", name: "WORKS", color: "#3b7bff", freq: 329.63,
    clips: [
      { id: "learnx", label: "LearnX", at: 3, w: 16 },
      { id: "overtake", label: "Overtake.bid", at: 28, w: 16 },
      { id: "opennotes", label: "OpenNotes", at: 53, w: 15 },
    ],
  },
  {
    id: "sketches", name: "SKETCHES", color: "#3f8e7d", freq: 392.0,
    clips: ARCHIVE.map((a, i) => ({ id: a.id, label: a.name.toLowerCase().replace(/\s+/g, "-"), at: 1 + i * 9.5, w: 8 })),
  },
  {
    id: "kit", name: "KIT", color: "#7dd87d", freq: 440.0,
    clips: [{ id: "kit", label: "[STARTERKIT]", at: 10, w: 26 }],
  },
  {
    id: "secret", name: "██████", color: "#4a4a4f", freq: 0, locked: true,
    clips: [{ id: "secret", label: "████████", at: 30, w: 26 }],
  },
  {
    id: "signals", name: "SIGNALS", color: "#c9a15f", freq: 493.88,
    clips: RECOGNITION.map((_, i) => ({
      id: `rec${i}`,
      label: ["trae contributor", "tips vol.3", "tips vol.4", "community star"][i],
      at: 6 + i * 22, w: 17,
    })),
  },
  {
    id: "routes", name: "ROUTES", color: "#3be0ff", freq: 587.33,
    clips: [
      { id: "github", label: "github", at: 4, w: 13 },
      { id: "instagram", label: "instagram", at: 22, w: 13 },
      { id: "bilibili", label: "bilibili", at: 40, w: 13 },
      { id: "rednote", label: "rednote", at: 58, w: 12 },
      { id: "email", label: "email", at: 76, w: 12 },
    ],
  },
  {
    id: "build", name: "BUILD.LOG", color: "#c7432b", freq: 523.25,
    clips: [{ id: "build", label: "build;", at: 60, w: 22 }],
  },
];

/* i18n lookups — clip id → translation key */
const ARCHIVE_I18N: Record<string, string> = {
  wechat: "wechat-read-dashboard", "quote-cloud": "quote-cloud", "trae-echoes": "trae-echoes",
  wyt: "waste-your-tokens", enforcer: "enforcer", atlas: "hidden-china-atlas",
  panic: "release-panic-room", rate: "rateministere", caelum: "caelum", msu: "mari-msu-2026",
};
const REC_I18N = ["trae-annual-contributor", "trae-vol3-quality", "trae-vol4-top", "trae-community-star"];
const ROUTE_ICONS: Record<string, BrandName> = {
  github: "github", instagram: "instagram", bilibili: "bilibili", rednote: "rednote", email: "mail",
};

/* clip customization — cached per visitor */
const SWATCHES = ["#e8b34a", "#3b7bff", "#3f8e7d", "#7dd87d", "#3be0ff", "#c9a15f", "#c7432b", "#ff5c8a"];
const PITCHES = [
  { l: "-12", s: -12 }, { l: "-7", s: -7 }, { l: "-5", s: -5 }, { l: "0", s: 0 },
  { l: "+3", s: 3 }, { l: "+5", s: 5 }, { l: "+7", s: 7 }, { l: "+12", s: 12 },
];
const WAVES: { l: string; w: OscillatorType }[] = [
  { l: "sine", w: "sine" }, { l: "tri", w: "triangle" }, { l: "sqr", w: "square" }, { l: "saw", w: "sawtooth" },
];
type ClipStyle = { c?: string; s?: number; w?: OscillatorType };

type Sel = { track: TrackDef; clip: ClipDef } | null;

/* ── Page ───────────────────────────────────────────────────── */

export default function SequencerPage() {
  const { t } = useLang();
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [monitor, setMonitor] = useState(false);
  const [light, setLight] = useState(false);
  const [sel, setSel] = useState<Sel>(null);
  const [order, setOrder] = useState(TRACKS);
  const [mutedTracks, setMutedTracks] = useState<Set<string>>(new Set(["secret"]));
  const [soloTracks, setSoloTracks] = useState<Set<string>>(new Set());
  const [clipPos, setClipPos] = useState<Record<string, number>>({});
  const [styles, setStyles] = useState<Record<string, ClipStyle>>({});

  const playheadPct = useMotionValue(0);
  const playheadLeft = useMotionTemplate`calc(150px + (100% - 150px) * ${playheadPct} / 100)`;
  const running = useRef(false);
  const monitorRef = useRef(false);
  const mutedRef = useRef(mutedTracks);
  const soloRef = useRef(soloTracks);
  const startT = useRef(0);
  const posRef = useRef<HTMLSpanElement>(null);
  const clipEls = useRef<{ id: string; el: HTMLElement; s: number; e: number; freq: number; wave: OscillatorType; track: string }[]>([]);
  const trackEls = useRef(new Map<string, HTMLElement>());
  const liveEls = useRef(new Set<HTMLElement>());

  useEffect(() => { monitorRef.current = monitor; }, [monitor]);
  useEffect(() => { mutedRef.current = mutedTracks; }, [mutedTracks]);
  useEffect(() => { soloRef.current = soloTracks; }, [soloTracks]);

  /* hydrate cached clip styles + theme (client-only) */
  useEffect(() => {
    try {
      const s = localStorage.getItem("seq_clip_style");
      if (s) setStyles(JSON.parse(s));
      setLight(localStorage.getItem("seq_theme") === "light");
    } catch { /* private mode */ }
  }, []);

  /* patch registry frequencies/timbres when styles change */
  useEffect(() => {
    for (const r of clipEls.current) {
      const tr = TRACKS.find((x) => x.id === r.track);
      const st = styles[r.id];
      if (tr) {
        r.freq = tr.freq * Math.pow(2, (st?.s ?? 0) / 12);
        r.wave = st?.w ?? "triangle";
      }
    }
  }, [styles]);

  useAnimationFrame((t) => {
    if (!opened) return;
    if (!running.current) {
      startT.current = t - (playheadPct.get() / 100) * LOOP_MS;
      return;
    }
    const p = (((t - startT.current) % LOOP_MS) + LOOP_MS) % LOOP_MS / LOOP_MS;
    playheadPct.set(p * 100);
    if (posRef.current) {
      const bar = Math.floor(p * 16) + 1;
      const beat = Math.floor((p * 64) % 4) + 1;
      posRef.current.textContent = `${String(bar).padStart(3, "0")}.${beat}`;
    }
    const liveTracks = new Set<string>();
    for (const c of clipEls.current) {
      const live = p * 100 >= c.s && p * 100 <= c.e;
      const was = liveEls.current.has(c.el);
      if (live) {
        liveTracks.add(c.track);
        if (!was) {
          liveEls.current.add(c.el);
          c.el.dataset.live = "1";
          const soloActive = soloRef.current.size > 0;
          const audible = !mutedRef.current.has(c.track) && (!soloActive || soloRef.current.has(c.track));
          if (monitorRef.current && c.freq > 0 && audible) pluck(c.freq, 0.4, c.wave);
        }
      } else if (was) {
        liveEls.current.delete(c.el);
        delete c.el.dataset.live;
      }
    }
    for (const [id, el] of trackEls.current) {
      if (liveTracks.has(id)) el.dataset.live = "1";
      else delete el.dataset.live;
    }
  });

  const open = () => {
    audioCtx();
    running.current = true;
    setOpened(true);
  };

  // spacebar = transport (DAW convention); esc = close popover
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" && opened) {
        e.preventDefault();
        running.current = !running.current;
        setPlaying(running.current);
      }
      if (e.key === "Escape") setSel(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [opened]);

  // click outside popover/clip → close
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      const el = e.target as HTMLElement;
      if (!el.closest("[data-pop]") && !el.closest("[data-clip]")) setSel(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);

  const toggleIn = (set: Set<string>, id: string, apply: (s: Set<string>) => void) => {
    const n = new Set(set);
    if (n.has(id)) n.delete(id); else n.add(id);
    apply(n);
  };

  const clipFreq = (tr: TrackDef, cl: ClipDef) =>
    tr.freq * Math.pow(2, (styles[cl.id]?.s ?? 0) / 12);

  const pick = (track: TrackDef, clip: ClipDef) => {
    setSel((s) => (s?.clip.id === clip.id ? null : { track, clip }));
    if (track.locked) deny(); else blip(500 + clipFreq(track, clip) / 8, 0.05, 0.03);
  };

  /* drag a clip along its lane; snap commits to the bar grid; [lo,hi] = no-overlap bounds */
  const moveClip = (clipId: string, at: number, w: number, snap: boolean, lo = 0, hi = 100 - w) => {
    const raw = snap ? Math.round(at / BAR) * BAR : at;
    const v = Math.max(0, Math.min(100 - w, Math.max(lo, Math.min(hi, raw))));
    setClipPos((p) => ({ ...p, [clipId]: v }));
    const r = clipEls.current.find((x) => x.id === clipId);
    if (r) { r.s = v; r.e = v + w; }
  };

  const setStyle = (clipId: string, patch: ClipStyle) => {
    setStyles((prev) => {
      const next = { ...prev, [clipId]: { ...prev[clipId], ...patch } };
      try { localStorage.setItem("seq_clip_style", JSON.stringify(next)); } catch { /* private mode */ }
      return next;
    });
  };

  const setTheme = (v: boolean) => {
    setLight(v);
    try { localStorage.setItem("seq_theme", v ? "light" : "dark"); } catch { /* private mode */ }
  };

  const registerClip = (track: TrackDef, clip: ClipDef) => (el: HTMLElement | null) => {
    if (!el) return;
    if (!clipEls.current.some((r) => r.el === el)) {
      const at = clipPos[clip.id] ?? clip.at;
      clipEls.current.push({ id: clip.id, el, s: at, e: at + clip.w, freq: clipFreq(track, clip), wave: styles[clip.id]?.w ?? "triangle", track: track.id });
    }
  };

  const anySolo = soloTracks.size > 0;

  return (
    <main className={`seq min-h-svh cursor-crosshair bg-(--s-bg) font-body text-(--s-ink) ${light ? "light" : ""}`}>
      {/* ═══ gate ═══ */}
      {!opened && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-(--s-bg)">
          <div className="text-center">
            <p className="font-silk text-[10px] tracking-[0.4em] text-(--s-dim)">{t.seq.gateTag}</p>
            <h1 className="mt-4 font-silk text-2xl text-(--s-ink) sm:text-3xl">session_026.prj</h1>
            <p className="mt-2 font-mono text-[11px] text-(--s-dim)">{t.seq.gateSub}</p>
            <button
              onClick={open}
              className="mt-8 border border-[#e8b34a] px-8 py-3 font-silk text-xs tracking-widest text-[#e8b34a] transition hover:bg-[#e8b34a] hover:text-black"
            >
              ▶ {t.seq.gateOpen}
            </button>
            <p className="mt-4 font-mono text-[10px] text-(--s-faint)">{t.seq.gateHint}</p>
          </div>
        </div>
      )}

      {/* ═══ transport ═══ */}
      <header className="sticky top-0 z-40 border-b border-(--s-line) bg-(--s-head)">
        <div className="flex h-12 items-center gap-2 px-3 sm:gap-4 sm:px-5">
          <span className="relative flex h-2.5 w-2.5">
            <Circle size={10} className="absolute animate-ping text-[#c7432b]" fill="currentColor" />
            <Circle size={10} className="text-[#c7432b]" fill="currentColor" />
          </span>
          <p className="hidden font-mono text-[11px] text-(--s-ink2) sm:block">
            session_026 — <span className="text-[#7dd87d]">build;</span>
            <span className="text-(--s-dim)">*</span>
          </p>

          <button
            onClick={() => { running.current = !running.current; setPlaying(running.current); }}
            className="ml-2 flex h-7 w-9 items-center justify-center border border-(--s-line2) text-(--s-ink) transition hover:border-(--s-dim)"
            aria-label={playing ? "Stop (space)" : "Play (space)"}
            title="space"
          >
            {playing ? <Square size={11} fill="currentColor" /> : <Play size={11} fill="currentColor" />}
          </button>
          <button
            onClick={() => setMonitor((m) => !m)}
            className={`flex h-7 w-9 items-center justify-center border transition ${
              monitor ? "border-[#e8b34a] text-[#e8b34a]" : "border-(--s-line2) text-(--s-dim) hover:border-(--s-dim)"
            }`}
            aria-label="Toggle monitor audio"
            title={t.seq.monitorTip}
          >
            {monitor ? <Volume2 size={12} /> : <VolumeX size={12} />}
          </button>
          <button
            onClick={() => setTheme(!light)}
            className="flex h-7 w-9 items-center justify-center border border-(--s-line2) text-(--s-dim) transition hover:border-(--s-dim) hover:text-(--s-ink2)"
            aria-label="Toggle theme"
            title={t.seq.themeTip}
          >
            {light ? <Moon size={12} /> : <Sun size={12} />}
          </button>

          <div className="ml-1 hidden items-center gap-3 border border-(--s-line) bg-(--s-bg) px-3 py-1 font-mono text-[11px] text-[#7dd87d] md:flex">
            <span ref={posRef}>001.1</span>
            <span className="text-(--s-dim)">124 BPM</span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <a
              href={SOCIALS.x.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 border border-(--s-line2) px-2.5 py-1.5 transition hover:border-[#3be0ff]"
              title="Send — open X"
            >
              <span className="flex items-end gap-[2px]">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.span
                    key={i}
                    className="w-[3px] bg-[#3be0ff]"
                    animate={{ height: [3, 4 + i * 2.5, 3] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.13 }}
                  />
                ))}
              </span>
              <span className="flex items-center gap-1.5 font-silk text-[9px] tracking-widest text-(--s-ink2) group-hover:text-[#3be0ff]">
                {t.seq.send} · <BrandIcon name="x" size={10} />
              </span>
            </a>
            <div className="hidden items-center gap-2 sm:flex">
              <ProtectedImage src={PORTRAIT.square} alt="Noah" className="h-7 w-7 border border-(--s-line2)" watermark="" />
              <span className="font-mono text-[10px] text-(--s-dim)">noah_zhang</span>
            </div>
          </div>
        </div>
      </header>

      {/* ═══ arrangement ═══ */}
      <div className="relative pb-24">
        {/* playhead */}
        <motion.div
          className="pointer-events-none absolute top-0 bottom-0 z-30 w-px bg-[#ff3355]"
          style={{ left: playheadLeft }}
        >
          <span className="absolute -top-0 -left-[5px] border-x-[5px] border-t-[7px] border-x-transparent border-t-[#ff3355]" />
        </motion.div>

        {/* beat ruler */}
        <div className="grid grid-cols-[150px_1fr] border-b border-(--s-line)">
          <div className="border-r border-(--s-line) px-3 py-1 font-silk text-[8px] tracking-widest text-(--s-dim)">
            {t.seq.arrange}
          </div>
          <div className="relative h-6 overflow-hidden">
            {Array.from({ length: 17 }, (_, i) => (
              <span key={i} className="absolute top-0 h-full border-l border-(--s-line) pl-1 font-mono text-[8px] text-(--s-dim)" style={{ left: `${(i / 16) * 100}%` }}>
                {i + 1}
              </span>
            ))}
          </div>
        </div>

        {/* tracks — reorderable */}
        <Reorder.Group axis="y" values={order} onReorder={setOrder}>
          {order.map((tr, ti) => (
            <TrackRow
              key={tr.id}
              tr={tr}
              ti={ti}
              t={t}
              sel={sel}
              pick={pick}
              registerClip={registerClip}
              clipPos={clipPos}
              styles={styles}
              setStyle={setStyle}
              muted={mutedTracks.has(tr.id)}
              soloed={soloTracks.has(tr.id)}
              dimmed={anySolo && !soloTracks.has(tr.id)}
              onMute={() => toggleIn(mutedTracks, tr.id, setMutedTracks)}
              onSolo={() => toggleIn(soloTracks, tr.id, setSoloTracks)}
              onClipDrag={moveClip}
              trackRef={(el) => { if (el) trackEls.current.set(tr.id, el); }}
            />
          ))}
        </Reorder.Group>
      </div>
    </main>
  );
}

/* ── Track row (reorderable) ────────────────────────────────── */

function TrackRow({
  tr, ti, t, sel, pick, registerClip, clipPos, styles, setStyle, muted, soloed, dimmed,
  onMute, onSolo, onClipDrag, trackRef,
}: {
  tr: TrackDef; ti: number; t: TranslationType; sel: Sel;
  pick: (t: TrackDef, c: ClipDef) => void;
  registerClip: (t: TrackDef, c: ClipDef) => (el: HTMLElement | null) => void;
  clipPos: Record<string, number>;
  styles: Record<string, ClipStyle>;
  setStyle: (id: string, patch: ClipStyle) => void;
  muted: boolean; soloed: boolean; dimmed: boolean;
  onMute: () => void; onSolo: () => void;
  onClipDrag: (clipId: string, at: number, w: number, snap: boolean, lo?: number, hi?: number) => void;
  trackRef: (el: HTMLElement | null) => void;
}) {
  const controls = useDragControls();
  const laneRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: string; x0: number; at0: number; at1: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);

  const trackName = (t.seq.trackNames as Record<string, string>)[tr.id] ?? tr.name;
  const clipLabel = (cl: ClipDef) => {
    const map = t.seq.clipLabels as Record<string, string>;
    if (map[cl.id]) return map[cl.id];
    const pk = ARCHIVE_I18N[cl.id];
    if (pk) return (t.projects as Record<string, { name: string }>)[pk]?.name ?? cl.label;
    return cl.label;
  };

  const clipDown = (e: React.PointerEvent<HTMLButtonElement>, cl: ClipDef) => {
    if (tr.locked) return;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* synthetic pointer */ }
    const at = clipPos[cl.id] ?? cl.at;
    drag.current = { id: cl.id, x0: e.clientX, at0: at, at1: at, moved: false };
  };
  /* free interval for `cl` — walls = nearest clips on each side (no overlap) */
  const bounds = (cl: ClipDef) => {
    let lo = 0, hi = 100 - cl.w;
    const at = clipPos[cl.id] ?? cl.at;
    for (const o of tr.clips) {
      if (o.id === cl.id) continue;
      const os = clipPos[o.id] ?? o.at, oe = os + o.w;
      if (oe <= at + 0.01) lo = Math.max(lo, oe);
      else if (os >= at + cl.w - 0.01) hi = Math.min(hi, os - cl.w);
    }
    return { lo, hi };
  };

  const clipMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (!d || !laneRef.current) return;
    const w = laneRef.current.getBoundingClientRect().width;
    const dpct = ((e.clientX - d.x0) / w) * 100;
    if (Math.abs(dpct) > 0.6) d.moved = true;
    if (d.moved) {
      const cl = tr.clips.find((c) => c.id === d.id);
      d.at1 = d.at0 + dpct;
      if (cl) {
        const { lo, hi } = bounds(cl);
        onClipDrag(d.id, d.at1, cl.w, false, lo, hi);
      }
    }
  };
  const clipUp = (cl: ClipDef) => {
    const d = drag.current;
    drag.current = null;
    if (d?.moved) {
      const { lo, hi } = bounds(cl);
      onClipDrag(cl.id, d.at1, cl.w, true, lo, hi);
      suppressClick.current = true;
    }
  };

  return (
    <Reorder.Item
      value={tr}
      dragListener={false}
      dragControls={controls}
      className={`grid grid-cols-[150px_1fr] border-b border-(--s-line) bg-(--s-bg) transition-opacity ${dimmed ? "opacity-35" : ""}`}
    >
      {/* label cell */}
      <div
        ref={trackRef}
        className="group/label flex flex-col justify-between border-r border-(--s-line) bg-(--s-panel) px-3 py-2 data-[live]:bg-(--s-lift)"
      >
        <div className="flex items-start justify-between gap-1">
          <div className="min-w-0">
            <p className="font-mono text-[9px] text-(--s-dim)">TR.{String(ti + 1).padStart(2, "0")}</p>
            <p className="mt-0.5 truncate font-silk text-[10px]" style={{ color: tr.color }}>{trackName}</p>
          </div>
          <button
            onPointerDown={(e) => controls.start(e)}
            className="cursor-grab touch-none p-0.5 text-(--s-faint) opacity-0 transition hover:text-(--s-ink2) active:cursor-grabbing group-hover/label:opacity-100"
            aria-label={`Drag to reorder ${trackName}`}
            title={t.seq.reorderTip}
          >
            <GripVertical size={12} />
          </button>
        </div>
        <div className="mt-1 flex items-center gap-1">
          <button
            onClick={onMute}
            className={`flex h-4 w-6 items-center justify-center border font-silk text-[8px] transition ${
              muted ? "border-[#c7432b] bg-[#c7432b]/20 text-[#c7432b]" : "border-(--s-line2) text-(--s-dim) hover:text-(--s-ink2)"
            }`}
            title={tr.locked ? t.seq.lockedTip : t.seq.muteTip}
          >
            M
          </button>
          <button
            onClick={onSolo}
            className={`flex h-4 w-6 items-center justify-center border font-silk text-[8px] transition ${
              soloed ? "border-[#e8b34a] bg-[#e8b34a]/20 text-[#e8b34a]" : "border-(--s-line2) text-(--s-dim) hover:text-(--s-ink2)"
            }`}
            title={t.seq.soloTip}
          >
            S
          </button>
          {/* level meter — lights while this track has a live clip */}
          <span className="ml-auto flex items-end gap-[1px]" aria-hidden>
            {[3, 5, 7].map((h) => (
              <span
                key={h}
                className="w-[3px] bg-(--s-faint) transition-colors duration-100 group-data-[live]/label:bg-[#7dd87d]"
                style={{ height: h }}
              />
            ))}
          </span>
        </div>
      </div>

      {/* clip lane */}
      <div ref={laneRef} className="relative h-20 sm:h-24">
        {Array.from({ length: 16 }, (_, i) => (
          <span key={i} className="pointer-events-none absolute top-0 h-full border-l border-(--s-grid)" style={{ left: `${((i + 1) / 16) * 100}%` }} />
        ))}
        {tr.clips.map((cl) => {
          const at = clipPos[cl.id] ?? cl.at;
          const cc = styles[cl.id]?.c ?? tr.color;
          const open = sel?.clip.id === cl.id;
          return (
            <div
              key={cl.id}
              className="absolute top-2 bottom-2"
              style={{ left: `${at}%`, width: `${cl.w}%` }}
            >
              <button
                ref={registerClip(tr, cl)}
                data-clip
                onPointerDown={(e) => clipDown(e, cl)}
                onPointerMove={clipMove}
                onPointerUp={() => clipUp(cl)}
                onPointerCancel={() => { drag.current = null; }}
                onClick={() => {
                  if (suppressClick.current) { suppressClick.current = false; return; }
                  pick(tr, cl);
                }}
                className={`group absolute inset-0 cursor-grab touch-none overflow-hidden border text-left transition-[transform,filter] active:cursor-grabbing data-[live]:-translate-y-0.5 data-[live]:shadow-[0_0_18px_-4px_var(--clip)] ${
                  open ? "z-10 brightness-125" : "brightness-90 hover:brightness-110"
                } ${muted ? "opacity-40" : ""}`}
                style={{
                  background: `linear-gradient(180deg, ${cc}26, ${cc}0d)`,
                  borderColor: `${cc}66`,
                  ["--clip" as string]: cc,
                }}
                title={tr.locked ? t.seq.lockedTip : t.seq.dragTip}
              >
                <span className="absolute inset-x-0 top-0 h-[3px] transition group-data-[live]:h-1" style={{ background: cc }} />
                <span className="absolute left-1.5 top-1.5 right-1.5 flex items-center gap-1 truncate font-mono text-[9px] sm:text-[10px]" style={{ color: cc }}>
                  {tr.locked && <Lock size={8} className="shrink-0" />}
                  {ROUTE_ICONS[cl.id] && <BrandIcon name={ROUTE_ICONS[cl.id]} size={9} className="shrink-0" />}
                  <span className="truncate">{clipLabel(cl)}</span>
                </span>
                <span className="absolute inset-x-1.5 bottom-1.5 top-6 flex items-center gap-[2px] opacity-60">
                  {Array.from({ length: 28 }, (_, i) => (
                    <span
                      key={i}
                      className="flex-1"
                      style={{ background: cc, height: `${Math.round(18 + 62 * Math.abs(Math.sin(i * 2.7 + cl.at)))}%` }}
                    />
                  ))}
                </span>
              </button>
            </div>
          );
        })}
        {/* popover — positioned at lane level, clamped inside lane bounds */}
        {(() => {
          const openClip = sel?.track.id === tr.id ? tr.clips.find((c) => c.id === sel.clip.id) : undefined;
          if (!openClip) return null;
          const at = clipPos[openClip.id] ?? openClip.at;
          const cc = styles[openClip.id]?.c ?? tr.color;
          return (
            <ClipPopover
              tr={tr}
              cl={openClip}
              label={clipLabel(openClip)}
              ti={ti}
              t={t}
              cc={cc}
              center={at + openClip.w / 2}
              styles={styles}
              setStyle={setStyle}
            />
          );
        })()}
      </div>
    </Reorder.Item>
  );
}

/* ── Clip popover — anchored card replacing the old inspector ── */

function ClipPopover({
  tr, cl, label, ti, t, cc, center, styles, setStyle,
}: {
  tr: TrackDef; cl: ClipDef; label: string; ti: number; t: TranslationType; cc: string; center: number;
  styles: Record<string, ClipStyle>;
  setStyle: (id: string, patch: ClipStyle) => void;
}) {
  const below = ti <= 2;
  return (
    <div
      data-pop
      className={`absolute z-50 ${below ? "top-full mt-2" : "bottom-full mb-2"}`}
      style={{
        left: `max(4px, min(calc(${center}% - 150px), calc(100% - 304px)))`,
        width: "min(300px, calc(100% - 8px))",
      }}
    >
    <motion.div
      initial={{ opacity: 0, y: below ? -6 : 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="border bg-(--s-panel) shadow-[0_16px_50px_-12px_rgba(0,0,0,0.55)]"
      style={{ borderColor: `${cc}88` }}
    >
      {/* header */}
      <div className="flex items-center gap-2 border-b border-(--s-line) px-3 py-2">
        <span className="h-2 w-2 shrink-0" style={{ background: cc }} />
        <p className="truncate font-silk text-[9px] tracking-widest text-(--s-ink2)">
          TR.{String(ti + 1).padStart(2, "0")} · {label}
        </p>
      </div>

      {/* body */}
      <div className="px-3 py-3">
        <ClipDetail id={cl.id} t={t} cc={cc} />
      </div>

      {/* customizer — color + pitch, cached */}
      {!tr.locked && (
        <div className="border-t border-(--s-line) px-3 py-2.5">
          <div className="flex items-center gap-2">
            <span className="font-silk text-[8px] tracking-widest text-(--s-dim)">{t.seq.color}</span>
            <div className="flex items-center gap-1">
              {SWATCHES.map((c) => (
                <button
                  key={c}
                  onClick={() => { setStyle(cl.id, { c }); blip(600, 0.04, 0.03); }}
                  className={`h-3.5 w-3.5 border transition hover:scale-125 ${
                    (styles[cl.id]?.c ?? tr.color) === c ? "border-(--s-ink) scale-110" : "border-transparent"
                  }`}
                  style={{ background: c }}
                  aria-label={`color ${c}`}
                />
              ))}
              <button
                onClick={() => setStyle(cl.id, { c: undefined })}
                className="ml-1 font-mono text-[9px] text-(--s-dim) transition hover:text-(--s-ink2)"
                title={t.seq.resetTip}
              >
                ↺
              </button>
            </div>
          </div>
          {tr.freq > 0 && (
            <>
              <div className="mt-2 flex items-center gap-2">
                <span className="font-silk text-[8px] tracking-widest text-(--s-dim)">{t.seq.sound}</span>
                <div className="flex flex-wrap items-center gap-1">
                  {PITCHES.map((p) => (
                    <button
                      key={p.s}
                      onClick={() => { setStyle(cl.id, { s: p.s }); pluck(tr.freq * Math.pow(2, p.s / 12), 0.3, styles[cl.id]?.w ?? "triangle", 0.06); }}
                      className={`border px-1.5 py-0.5 font-mono text-[9px] transition ${
                        (styles[cl.id]?.s ?? 0) === p.s
                          ? "border-(--s-ink) text-(--s-ink)"
                          : "border-(--s-line2) text-(--s-dim) hover:text-(--s-ink2)"
                      }`}
                    >
                      {p.l}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="font-silk text-[8px] tracking-widest text-(--s-dim)">{t.seq.timbre}</span>
                <div className="flex items-center gap-1">
                  {WAVES.map((wv) => (
                    <button
                      key={wv.w}
                      onClick={() => { setStyle(cl.id, { w: wv.w }); pluck(tr.freq * Math.pow(2, (styles[cl.id]?.s ?? 0) / 12), 0.3, wv.w, 0.06); }}
                      className={`border px-1.5 py-0.5 font-mono text-[9px] transition ${
                        (styles[cl.id]?.w ?? "triangle") === wv.w
                          ? "border-(--s-ink) text-(--s-ink)"
                          : "border-(--s-line2) text-(--s-dim) hover:text-(--s-ink2)"
                      }`}
                    >
                      {wv.l}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </motion.div>
    </div>
  );
}

function OpenBtn({ href, color, label }: { href: string; color: string; label: string }) {
  const external = !href.startsWith("/") && !href.startsWith("mailto");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 border px-3 py-1.5 font-silk text-[9px] tracking-widest transition hover:brightness-125"
      style={{ borderColor: color, color }}
    >
      {label} <ArrowUpRight size={10} />
    </a>
  );
}

/* ── Compact clip content (i18n) ────────────────────────────── */

function ClipDetail({ id, t, cc }: { id: string; t: TranslationType; cc: string }) {
  switch (id) {
    case "bio":
      return (
        <div className="flex gap-3">
          <ProtectedImage src={PORTRAIT.full} alt="Noah Zixin Zhang" className="h-20 w-16 shrink-0 border border-(--s-line2)" imgClassName="object-top" />
          <div className="min-w-0">
            <h2 className="font-silk text-sm text-(--s-ink)">{PROFILE.name}</h2>
            <p className="mt-0.5 font-mono text-[10px] text-(--s-dim)">{t.hero.role} · {t.hero.location}</p>
            <p className="mt-1.5 font-mono text-[10px] leading-relaxed text-(--s-ink2)">{t.seq.bioTag}</p>
          </div>
        </div>
      );
    case "creds":
      return (
        <div>
          <h2 className="font-silk text-sm text-(--s-ink)">{t.seq.credsTitle}</h2>
          <div className="mt-2 space-y-1.5">
            {[t.background.quote, `${t.background.walterMitty} — ${t.background.walterMittySource}`].map((q) => (
              <p key={q} className="border-l-2 border-(--s-line2) pl-2 font-mono text-[10px] italic leading-relaxed text-(--s-ink2)">“{q}”</p>
            ))}
          </div>
          <p className="mt-2 font-mono text-[10px] text-(--s-dim)">{t.background.bio}</p>
        </div>
      );
    case "channel":
      return (
        <div>
          <div className="flex items-center gap-2">
            <BrandIcon name="youtube" size={14} className="text-[#ff0033]" />
            <h2 className="font-silk text-sm text-(--s-ink)">{PIANO.channel}</h2>
          </div>
          <p className="mt-1.5 font-mono text-[10px] leading-relaxed text-(--s-ink2)">{t.featured.piano.description}</p>
          <div className="mt-2.5 flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] text-[#e8b34a]">{PIANO.views} {t.seq.stillRecording}</span>
            <a href={PIANO.url} target="_blank" rel="noreferrer"
              className="border border-[#e8b34a] px-3 py-1 font-silk text-[9px] tracking-widest text-[#e8b34a] transition hover:bg-[#e8b34a] hover:text-black">
              {t.seq.subscribe} ↗
            </a>
          </div>
        </div>
      );
    case "elise":
      return (
        <div>
          <h2 className="font-silk text-sm text-(--s-ink)">{t.seq.eliseTitle}</h2>
          <p className="mt-1 font-mono text-[10px] leading-relaxed text-(--s-ink2)">{t.seq.eliseDesc}</p>
          <div className="mt-2 border border-(--s-line)">
            <iframe className="aspect-video w-full" src="https://www.youtube.com/embed/LQvrMzUYxm8"
              title="Für Elise tutorial" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        </div>
      );
    case "short":
      return (
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-silk text-sm text-(--s-ink)">{t.seq.shortTitle}</h2>
            <p className="mt-1 font-mono text-[10px] leading-relaxed text-(--s-ink2)">{t.seq.shortDesc.replace("{n}", PIANO.viralShort)}</p>
          </div>
          <OpenBtn href={PIANO.url} color="#e8b34a" label={t.seq.open} />
        </div>
      );
    case "learnx":
    case "overtake":
    case "opennotes": {
      const p = FEATURED.find((x) => x.id === id);
      if (!p) return null;
      const tr18n = id === "learnx" ? t.featured.learnx : id === "overtake" ? t.recent.overtake : t.recent.opennotes;
      return (
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image} alt="" className="h-14 w-24 shrink-0 border border-(--s-line2) object-cover object-top" />
          <div className="min-w-0 flex-1">
            <h2 className="font-silk text-sm text-(--s-ink)">{p.name} <span className="font-mono text-[9px] text-(--s-dim)">{p.year}</span></h2>
            <p className="mt-1 font-mono text-[10px] leading-relaxed text-(--s-ink2)">{tr18n.description}</p>
          </div>
          <OpenBtn href={p.url} color={cc} label={t.seq.open} />
        </div>
      );
    }
    case "kit":
      return (
        <div>
          <h2 className="font-silk text-sm" style={{ color: cc }}>[STARTERKIT]</h2>
          <p className="mt-1 font-mono text-[10px] leading-relaxed text-(--s-ink2)">{t.seq.kitDesc}</p>
          <p className="mt-1.5 font-mono text-[10px] text-(--s-dim)">{t.seq.statusRendering}</p>
        </div>
      );
    case "secret":
      return (
        <div>
          <h2 className="flex items-center gap-2 font-silk text-sm text-(--s-ink2)"><Lock size={12} /> {SECRET.name}</h2>
          <p className="mt-1.5 font-mono text-[10px] text-(--s-dim)">{t.seq.secretStatus} — {t.seq.secretNote}</p>
        </div>
      );
    case "build":
      return (
        <div>
          <h2 className="font-silk text-sm text-(--s-ink)">build;</h2>
          <p className="mt-1 font-mono text-[10px] leading-relaxed text-(--s-ink2)">{t.seq.buildDesc}</p>
          <div className="mt-2 h-1 w-full bg-(--s-faint)">
            <motion.div className="h-full bg-[#c7432b]" animate={{ width: ["8%", "92%", "8%"] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
          </div>
        </div>
      );
    case "rec0":
    case "rec1":
    case "rec2":
    case "rec3": {
      const i = Number(id.slice(3));
      const recs = t.recognitionItems as Record<string, { title: string; detail: string }>;
      const r = recs[REC_I18N[i]];
      return (
        <div>
          <h2 className="font-silk text-sm text-(--s-ink)">{r?.title ?? RECOGNITION[i].title}</h2>
          <p className="mt-1 font-mono text-[10px] text-(--s-ink2)">{t.seq.recCite} {RECOGNITION[i].period}.</p>
          <div className="mt-2 flex gap-1.5">
            {RECOGNITION.map((x, j) => (
              <span key={x.title} className={`h-1.5 w-1.5 rotate-45 ${j === i ? "bg-[#c9a15f]" : "bg-(--s-faint)"}`} />
            ))}
          </div>
        </div>
      );
    }
    case "github":
    case "instagram":
    case "bilibili":
    case "rednote": {
      const s = SOCIALS[id as "github" | "instagram" | "bilibili" | "rednote"];
      return (
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center border border-(--s-line2) text-(--s-ink2)">
              <BrandIcon name={ROUTE_ICONS[id]} size={15} />
            </span>
            <div>
              <h2 className="font-silk text-sm text-(--s-ink)">{s.label}</h2>
              <p className="font-mono text-[9px] text-(--s-dim)">{s.url.replace("https://", "").replace("www.", "")}</p>
            </div>
          </div>
          <OpenBtn href={s.url} color={cc} label={t.seq.open} />
        </div>
      );
    }
    case "email":
      return (
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center border border-(--s-line2) text-(--s-ink2)">
              <BrandIcon name="mail" size={15} />
            </span>
            <div>
              <h2 className="font-silk text-sm text-(--s-ink)">{t.seq.emailTitle}</h2>
              <p className="font-mono text-[9px] text-(--s-dim)">{PROFILE.email}</p>
            </div>
          </div>
          <OpenBtn href={`mailto:${PROFILE.email}`} color={cc} label={t.seq.open} />
        </div>
      );
    default: {
      const item = ARCHIVE.find((a) => a.id === id);
      const prj = t.projects as Record<string, { name: string; description: string }>;
      const i18nKey = ARCHIVE_I18N[id];
      return (
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-silk text-sm text-(--s-ink)">
              {item?.name ?? id} <span className="font-mono text-[9px] text-(--s-dim)">{item?.year}</span>
            </h2>
            <p className="mt-1 font-mono text-[10px] leading-relaxed text-(--s-ink2)">
              {(i18nKey && prj[i18nKey]?.description) || item?.desc}
            </p>
          </div>
          {item && <OpenBtn href={item.url} color={cc} label={t.seq.open} />}
        </div>
      );
    }
  }
}
