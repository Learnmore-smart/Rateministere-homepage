"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Monitor, Smartphone, ExternalLink, Play, RotateCcw, Volume2, VolumeX, Youtube } from "lucide-react";
import { useLang, TranslationType } from "./LanguageContext";

type PreviewType = "video" | "iframe";

interface BentoItem {
  id: string;
  getLabel: (t: TranslationType) => string;
  getTitle: (t: TranslationType) => string;
  getDescription: (t: TranslationType) => string;
  image: string;
  previewType: PreviewType;
  src: string;
  link: string;
  className: string;
}

const BENTO_ITEMS: BentoItem[] = [
  {
    id: "learnx",
    getLabel: (t) => t.featured.learnx.label,
    getTitle: (t) => t.featured.learnx.heading,
    getDescription: (t) => t.featured.learnx.description,
    image: "/LearnX.png",
    previewType: "video",
    src: "/Videos-demo/LearnX.mp4",
    link: "https://www.learnx.pro",
    className: "sm:col-span-2 md:col-span-2 md:row-span-2 min-h-[380px] md:min-h-[500px]",
  },
  {
    id: "piano",
    getLabel: (t) => t.featured.piano.label,
    getTitle: (t) => t.featured.piano.heading,
    getDescription: (t) => t.featured.piano.description,
    image: "/Noah-Piano-Journey.png",
    previewType: "video",
    src: "/Videos-demo/Für Elise - Easy piano tutorial (1).mp4",
    link: "https://youtube.com/@NoahsPianoJourney?sub_confirmation=1",
    className: "sm:col-span-2 md:col-span-2 md:row-span-1 min-h-[220px] md:min-h-[240px]",
  },
  {
    id: "spinshare",
    getLabel: (t) => t.recent.spinshare.label,
    getTitle: (t) => t.recent.spinshare.heading,
    getDescription: (t) => t.recent.spinshare.description,
    image: "/spinshare-OG.png",
    previewType: "iframe",
    src: "https://spinshare.dev",
    link: "https://spinshare.dev",
    className: "sm:col-span-1 md:col-span-1 md:row-span-1 min-h-[220px] md:min-h-[240px]",
  },
  {
    id: "trae-contest",
    getLabel: (t) => t.recent.traeContest.label,
    getTitle: (t) => t.recent.traeContest.heading,
    getDescription: (t) => t.recent.traeContest.description,
    image: "/trae-contest-ranking.png",
    previewType: "iframe",
    src: "https://www.rateministere.com/trae-contest-2026",
    link: "https://www.rateministere.com/trae-contest-2026",
    className: "sm:col-span-1 md:col-span-1 md:row-span-1 min-h-[220px] md:min-h-[240px]",
  },
];

export default function FeaturedGrid() {
  const { t } = useLang();
  const [mounted, setMounted] = useState(false);
  const [activeItem, setActiveItem] = useState<BentoItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [interactActive, setInteractActive] = useState(false);
  
  // Video player specific states
  const [videoMuted, setVideoMuted] = useState(true);

  // Refs for tracking DOM elements
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Mount State check
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update transform origin dynamically relative to window scroll for background stage scaling
  useEffect(() => {
    if (activeItem) {
      const y = window.scrollY + window.innerHeight / 2;
      const stage = document.getElementById("background-stage");
      if (stage) {
        stage.style.transformOrigin = `50% ${y}px`;
      }
      document.body.classList.add("showcase-open");
    } else {
      document.body.classList.remove("showcase-open");
    }
  }, [activeItem]);

  // morph animation trigger
  const handleItemClick = useCallback((item: BentoItem) => {
    setActiveItem(item);
    setIsModalOpen(true);
    setInteractActive(false);

    // Lock scroll bar gutter stable
    document.documentElement.style.overflow = "hidden";
  }, []);

  // Handle closing animation
  const handleClose = useCallback(() => {
    setIsModalOpen(false);
    document.documentElement.style.overflow = "";
    // Wait for morph and cross-fade to complete before unmounting activeItem
    setTimeout(() => {
      setActiveItem(null);
    }, 450);
  }, []);

  // Escape key support for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeItem) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem, handleClose]);

  return (
    <section 
      id="work" 
      className="relative py-20 md:py-28 select-none"
      style={{ contentVisibility: "auto" }}
    >
      <div className="mx-auto max-w-screen-2xl px-6 md:px-12">
        <div className="flex items-baseline justify-between gap-6 border-b border-border pb-6">
          <h2 className="font-display text-2xl tracking-tight md:text-3xl">{t.featured.title}</h2>
          <span className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">
            {t.featured.subtitle}
          </span>
        </div>

        {/* Bento Grid: 4 columns on desktop, 2 columns on tablet, 1 column on mobile */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {BENTO_ITEMS.map((item) => {
            const isHero = item.id === "learnx";
            const cursorVal = item.previewType === "video" ? "play" : "expand";
            
            return (
              <motion.button
                layoutId={`card-container-${item.id}`}
                key={item.id}
                ref={(el) => { cardRefs.current[item.id] = el; }}
                onClick={() => handleItemClick(item)}
                data-cursor={cursorVal}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface p-5 text-left transition-colors duration-300 hover:border-accent/40 focus-visible:outline-none ${item.className}`}
              >
                {/* Image Wrap (fixed heights prevent layout shifts and Next.js console warnings) */}
                <div className={`relative w-full overflow-hidden rounded-2xl border border-border bg-background ${
                  item.id === "learnx" 
                    ? "h-56 sm:h-64 md:h-[340px]" 
                    : item.id === "trae-contest"
                      ? "h-44 sm:h-48 md:h-[140px]"
                      : "h-44 sm:h-48 md:h-[140px]"
                }`}>
                  <Image
                    src={item.image}
                    alt={item.getTitle(t)}
                    fill
                    priority={isHero}
                    sizes={isHero ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 768px) 30vw, 100vw"}
                    className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                  />
                  
                  {/* Play badge / YouTube metrics overlay for Piano channel */}
                  {item.id === "piano" && (
                    <div className="absolute top-3 right-3 z-10 bg-[#ff0000]/95 text-white font-body text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1.5 select-none">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                      10M+ Views
                    </div>
                  )}

                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-black/[0.01] transition-opacity duration-300 group-hover:bg-black/0" />
                </div>

                {/* Meta details */}
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div className="max-w-[85%]">
                    <span className="font-body text-[10px] uppercase tracking-[0.26em] text-muted">
                      {item.getLabel(t)}
                    </span>
                    <h3 className="mt-1 font-display text-lg tracking-tight md:text-xl text-text group-hover:text-accent transition-colors">
                      {item.getTitle(t)}
                    </h3>
                    <p className="mt-2 font-body text-xs leading-relaxed text-muted line-clamp-2">
                      {item.getDescription(t)}
                    </p>
                  </div>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background text-text transition-colors duration-300 group-hover:border-transparent group-hover:bg-accent group-hover:text-white">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Custom Portal for Showcase Overlay */}
      {mounted && createPortal(
        <AnimatePresence>
          {activeItem && (
            <ShowcaseModal
              key={activeItem.id}
              item={activeItem}
              isOpen={isModalOpen}
              onClose={handleClose}
              previewMode={previewMode}
              setPreviewMode={setPreviewMode}
              interactActive={interactActive}
              setInteractActive={setInteractActive}
              videoMuted={videoMuted}
              setVideoMuted={setVideoMuted}
              t={t}
            />
          )}
        </AnimatePresence>,
        document.body
      )}


    </section>
  );
}

interface ShowcaseModalProps {
  item: BentoItem;
  isOpen: boolean;
  onClose: () => void;
  previewMode: "desktop" | "mobile";
  setPreviewMode: (mode: "desktop" | "mobile") => void;
  interactActive: boolean;
  setInteractActive: (val: boolean) => void;
  videoMuted: boolean;
  setVideoMuted: (val: boolean) => void;
  t: TranslationType;
}

function ShowcaseModal({
  item,
  isOpen,
  onClose,
  previewMode,
  setPreviewMode,
  interactActive,
  setInteractActive,
  videoMuted,
  setVideoMuted,
  t,
}: ShowcaseModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8" role="dialog" aria-modal="true">
      {/* Overlay Scrim */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        onClick={onClose}
        className="absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-[3px]"
      />

      {/* Unified Showcase Modal Box */}
      <motion.div
        layoutId={`card-container-${item.id}`}
        className={`relative w-full border border-border bg-surface shadow-2xl overflow-hidden rounded-3xl z-10 flex flex-col ${
          previewMode === "desktop"
            ? "max-w-5xl aspect-[16/10]"
            : "max-w-[340px] aspect-[9/18]"
        }`}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative w-full h-full flex flex-col overflow-hidden">
          {/* Card Mode Content (fades out while opening, fades in while closing) */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-20 bg-surface p-5 flex flex-col justify-between pointer-events-none"
          >
            {/* Image Wrap */}
            <div className={`relative w-full overflow-hidden rounded-2xl border border-border bg-background ${
              item.id === "learnx" 
                ? "h-56 sm:h-64 md:h-[340px]" 
                : item.id === "trae-contest"
                  ? "h-44 sm:h-48 md:h-[140px]"
                  : "h-44 sm:h-48 md:h-[140px]"
            }`}>
              <Image
                src={item.image}
                alt={item.getTitle(t)}
                fill
                priority
                sizes="100vw"
                className="object-cover object-top"
              />
              {item.id === "piano" && (
                <div className="absolute top-3 right-3 z-10 bg-[#ff0000]/95 text-white font-body text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  10M+ Views
                </div>
              )}
            </div>

            {/* Meta details */}
            <div className="mt-5 flex items-start justify-between gap-4">
              <div className="max-w-[85%]">
                <span className="font-body text-[10px] uppercase tracking-[0.26em] text-muted">
                  {item.getLabel(t)}
                </span>
                <h3 className="mt-1 font-display text-lg tracking-tight md:text-xl text-text">
                  {item.getTitle(t)}
                </h3>
                <p className="mt-2 font-body text-xs leading-relaxed text-muted line-clamp-2">
                  {item.getDescription(t)}
                </p>
              </div>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background text-text">
                <ArrowUpRight size={16} />
              </div>
            </div>
          </motion.div>

          {/* Real Showcase Content Mode (fades in while opening, fades out while closing) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex-grow w-full h-full flex flex-col justify-between"
          >
            {/* Browser Chrome Header */}
            <div className="flex items-center justify-between border-b border-border bg-background/50 px-4 py-3 backdrop-blur-sm">
              {/* Controls */}
              <div className="flex gap-1.5 shrink-0">
                <button
                  onClick={onClose}
                  ref={closeButtonRef}
                  data-cursor="close"
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ff5f56] text-transparent hover:text-black/60 transition-colors focus:outline-none cursor-pointer"
                  title="Close"
                >
                  <X size={10} strokeWidth={3} />
                </button>
                <span className="h-5 w-5 rounded-full bg-[#ffbd2e]" />
                <span className="h-5 w-5 rounded-full bg-[#27c93f]" />
              </div>

              {/* Address/URL bar */}
              <div className="flex max-w-[50%] md:max-w-[60%] items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1 font-body text-[10px] text-muted truncate select-none">
                {item.src.startsWith("/") ? (
                  <>
                    <span className="text-muted/40">rateministere.com</span>
                    <span className="text-text/70">{item.src}</span>
                  </>
                ) : (
                  <span className="text-text/70">{item.src.replace(/^https?:\/\//, "")}</span>
                )}
              </div>

              {/* Device Toggles */}
              <div className="flex items-center gap-1 rounded-md border border-border bg-background p-0.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setPreviewMode("desktop")}
                  className={`rounded p-1 transition-colors cursor-pointer ${
                    previewMode === "desktop" ? "bg-text text-background" : "text-muted hover:text-text"
                  }`}
                  title="Desktop view"
                >
                  <Monitor size={12} />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode("mobile")}
                  className={`rounded p-1 transition-colors pointer-events-auto ${
                    previewMode === "mobile" ? "bg-text text-background" : "text-muted hover:text-text"
                  }`}
                  title="Mobile view"
                >
                  <Smartphone size={12} />
                </button>
              </div>
            </div>

            {/* Browser Body preview content */}
            <div className="relative flex-grow w-full bg-background overflow-hidden flex flex-col justify-between">
              
              {/* Render Interactive embed depending on project type */}
              {item.previewType === "video" ? (
                /* Custom Video Player mode */
                <div className="relative w-full h-full bg-black flex items-center justify-center">
                  <video
                    src={item.src}
                    autoPlay
                    loop
                    playsInline
                    muted={videoMuted}
                    className="w-full h-full object-contain"
                  />
                  {/* Video Controls overlay */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-3">
                    <button
                      onClick={() => setVideoMuted(!videoMuted)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 border border-white/10 text-white hover:bg-black/80 transition-colors focus:outline-none cursor-pointer"
                      title={videoMuted ? "Unmute" : "Mute"}
                    >
                      {videoMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                    <button
                      onClick={(e) => {
                        const video = e.currentTarget.parentElement?.parentElement?.querySelector("video");
                        if (video) {
                          video.currentTime = 0;
                          video.play();
                        }
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 border border-white/10 text-white hover:bg-black/80 transition-colors focus:outline-none cursor-pointer"
                      title="Restart Video"
                    >
                      <RotateCcw size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                /* Iframe embed mode */
                <div className="relative w-full h-full bg-background">
                  {interactActive ? (
                    <iframe
                      src={item.src}
                      title={item.getTitle(t)}
                      className="h-full w-full border-none bg-surface"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                    />
                  ) : (
                    /* Click to interact cover */
                    <div
                      onClick={() => setInteractActive(true)}
                      className="group/iframe absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-radial-[circle_at_center,rgba(255,255,255,0.75)_20%,rgba(240,240,240,0.95)_100%] dark:bg-radial-[circle_at_center,rgba(20,20,20,0.75)_20%,rgba(10,10,10,0.95)_100%] p-6 text-center transition-all duration-300 hover:bg-black/[0.02]"
                    >
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-border bg-surface text-muted transition-all duration-500 group-hover/iframe:scale-110 group-hover/iframe:border-accent group-hover/iframe:text-accent group-hover/iframe:shadow-[0_0_20px_rgba(11,95,255,0.15)]">
                        <Play size={24} className="animate-pulse ml-1 text-accent" />
                      </div>
                      <h3 className="mt-6 font-display text-lg tracking-tight group-hover/iframe:text-accent transition-colors">
                        {item.getTitle(t)}
                      </h3>
                      <p className="mt-2 max-w-md font-body text-xs text-muted leading-relaxed">
                        {item.getDescription(t)}
                      </p>
                      <span className="mt-6 rounded-full bg-text px-4 py-2 font-body text-[10px] uppercase tracking-[0.2em] text-background transition-colors group-hover/iframe:bg-accent cursor-pointer">
                        {t.archive.clickToInteract}
                      </span>
                      <p className="mt-3 font-body text-[9px] tracking-wide text-muted/60 opacity-0 transition-opacity duration-300 group-hover/iframe:opacity-100">
                        {t.archive.interactInstructions}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Metadata bar & Links */}
            <div className="border-t border-border bg-surface px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 select-text">
              <div className="text-center sm:text-left">
                <span className="font-body text-[10px] uppercase tracking-[0.26em] text-muted">
                  {item.getLabel(t)}
                </span>
                <h4 className="font-display text-base tracking-tight text-text flex items-center flex-wrap gap-2 justify-center sm:justify-start">
                  <span>{item.getTitle(t)}</span>
                  {item.id === "piano" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ff0000]/10 px-2.5 py-0.5 font-body text-[9px] font-bold uppercase tracking-wider text-[#ff0000] select-none">
                      <span className="h-1 w-1 rounded-full bg-[#ff0000] animate-pulse" />
                      {((t.featured.piano as any).shortViews) || "3M+ Views"}
                    </span>
                  )}
                </h4>
              </div>

              <div className="flex flex-wrap gap-3">
                {item.id === "piano" && (
                  <a
                    href="https://youtube.com/@NoahsPianoJourney?sub_confirmation=1"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 font-body text-[10px] uppercase tracking-[0.2em] text-text hover:border-text/30 transition-colors cursor-pointer"
                  >
                    <Youtube size={12} className="text-[#ff0000]" />
                    <span>YouTube Channel</span>
                    <ExternalLink size={10} />
                  </a>
                )}
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-text px-4 py-2 font-body text-[10px] uppercase tracking-[0.2em] text-background hover:bg-accent transition-colors cursor-pointer"
                >
                  <span>Open Live Site</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
