"use client";

import React, { useState, useRef, useCallback, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Monitor,
  Smartphone,
  MousePointerClick,
  ExternalLink,
  Github,
  Globe,
  ArrowUpRight,
} from "lucide-react";
import { useLang } from "./LanguageContext";

interface ProjectMeta {
  id: string;
  path: string;
  year: string;
  github?: string;
}

const projects: ProjectMeta[] = [
  { id: "wechat-read-dashboard", path: "/wechat-read-stats", year: "2026", github: "https://github.com/Learnmore-smart/Wechat-read-dashboard" },
  { id: "quote-cloud", path: "/quote-cloud", year: "2026", github: "https://github.com/Learnmore-smart/Quote-Cloud" },
  { id: "waste-your-tokens", path: "/waste-your-tokens", year: "2026", github: "https://github.com/Learnmore-smart/Waste-your-tokens" },
  { id: "enforcer", path: "https://www.rateministere.com/Enforcer", year: "2026", github: "https://github.com/Learnmore-smart/Marihacks-IX-2026" },
  { id: "hidden-china-atlas", path: "/hidden-china-atlas", year: "2026", github: "https://github.com/Learnmore-smart/Hidden-China-Atlas" },
  { id: "release-panic-room", path: "/release-panic-room", year: "2026", github: "https://github.com/Learnmore-smart/Release-Panic-Room" },
  { id: "rateministere", path: "/rateministere", year: "2026", github: "https://github.com/Learnmore-smart/RateMinistere" },
  { id: "caelum", path: "https://github.com/Learnmore-smart/Caelum", year: "2026", github: "https://github.com/Learnmore-smart/Caelum" },
  { id: "mari-msu-2026", path: "/mari-msu-2026", year: "2026", github: "https://github.com/Learnmore-smart/Mari-MSU-2026" },
  { id: "zhich-pvp", path: "https://github.com/Learnmore-smart/zhich-pvp-auto_aim_bot", year: "2025", github: "https://github.com/Learnmore-smart/zhich-pvp-auto_aim_bot" },
  { id: "code-share", path: "https://github.com/Learnmore-smart/Trae-code-share", year: "2025", github: "https://github.com/Learnmore-smart/Trae-code-share" },
  { id: "discord-fish", path: "https://github.com/Learnmore-smart/Discord_fish", year: "2025", github: "https://github.com/Learnmore-smart/Discord_fish" },
];

const webProjects = projects.filter((p) => !p.path.includes("github.com"));

const sideProjects: ProjectMeta[] = [
  { id: "2d-shooter", path: "https://github.com/Learnmore-smart/2D-shooter", year: "2026" },
  { id: "christmas-2025-cyberpunk", path: "https://github.com/Learnmore-smart/7-Trae-opens-Christmas-2025-cyberpunk", year: "2025" },
  { id: "christmas-2025-snow", path: "https://github.com/Learnmore-smart/6-Trae-opens-Christmas-2025-snow", year: "2025" },
  { id: "academic-tutoring", path: "https://github.com/Learnmore-smart/TUTORING-LANDING-PAGE", year: "2025" },
];

export default function ArchiveSection() {
  const { t } = useLang();

  const [activeWebIndex, setActiveWebIndex] = useState(0);
  const [interactActive, setInteractActive] = useState(false);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const previewRef = useRef<HTMLDivElement>(null);

  const handlePrev = useCallback(() => {
    setActiveWebIndex((prev) => (prev === 0 ? webProjects.length - 1 : prev - 1));
    setInteractActive(false);
  }, []);

  const handleNext = useCallback(() => {
    setActiveWebIndex((prev) => (prev === webProjects.length - 1 ? 0 : prev + 1));
    setInteractActive(false);
  }, []);

  const handleSelectProject = useCallback((index: number) => {
    setActiveWebIndex(index);
    setInteractActive(false);
  }, []);

  const scrollToPreviewAndSelect = useCallback((index: number) => {
    setActiveWebIndex(index);
    setInteractActive(false);
    previewRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const handleProjectClick = useCallback((project: ProjectMeta) => {
    const webIdx = webProjects.findIndex((wp) => wp.id === project.id);
    if (webIdx !== -1) {
      scrollToPreviewAndSelect(webIdx);
    } else {
      window.open(project.path, "_blank");
    }
  }, [scrollToPreviewAndSelect]);

  const activeProject = webProjects[activeWebIndex];
  const activePt = useMemo(() => {
    return (
      t.projects[activeProject.id as keyof typeof t.projects] || {
        name: "",
        description: "",
      }
    );
  }, [t, activeProject.id]);

  return (
    <section id="archive" className="py-20 md:py-28">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-12">
        <div className="flex items-baseline justify-between gap-6 border-b border-border pb-6">
          <h2 className="font-display text-2xl tracking-tight md:text-3xl">{t.archive.title}</h2>
          <span className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">
            {projects.length} {t.archive.entries}
          </span>
        </div>

        {/* Live Web Preview Section */}
        <div ref={previewRef} className="mt-10 mb-16">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-4 md:gap-8 px-4 sm:px-6">
            {/* Left Side Navigation Button (Desktop/Tablet) */}
            <button
              type="button"
              onClick={handlePrev}
              className="hidden sm:flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-muted shadow-md cursor-pointer transition-all hover:border-text/30 hover:text-text hover:scale-105 active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Mockup Browser Window */}
            <div
              className={`w-full border border-border bg-surface shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden shrink ${
                previewMode === "desktop"
                  ? "max-w-4xl rounded-2xl aspect-[16/10]"
                  : "max-w-[340px] rounded-3xl aspect-[9/18]"
              }`}
            >
              {/* Browser Header Bar */}
              <div className="flex items-center justify-between border-b border-border bg-background/50 px-4 py-3 backdrop-blur-sm">
                {/* Left: Window controls */}
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                </div>

                {/* Middle: Mockup URL/Address bar */}
                <div className="flex max-w-[60%] items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1 font-body text-[10px] text-muted truncate select-none">
                  {activeProject.path.startsWith("/") ? (
                    <>
                      <span className="text-muted/40">rateministere.com</span>
                      <span className="text-text/70">{activeProject.path}</span>
                    </>
                  ) : (
                    <span className="text-text/70">{activeProject.path.replace(/^https?:\/\//, "")}</span>
                  )}
                </div>

                {/* Right: Desktop/Mobile toggles */}
                <div className="flex items-center gap-1 rounded-md border border-border bg-background p-0.5">
                  <button
                    type="button"
                    onClick={() => setPreviewMode("desktop")}
                    className={`rounded px-1.5 py-0.5 transition-colors cursor-pointer ${
                      previewMode === "desktop" ? "bg-text text-background" : "text-muted hover:text-text"
                    }`}
                    title={t.archive.desktopView}
                  >
                    <Monitor size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode("mobile")}
                    className={`rounded px-1.5 py-0.5 transition-colors cursor-pointer ${
                      previewMode === "mobile" ? "bg-text text-background" : "text-muted hover:text-text"
                    }`}
                    title={t.archive.mobileView}
                  >
                    <Smartphone size={12} />
                  </button>
                </div>
              </div>

              {/* Browser Body / Live Preview Area */}
              <div className="relative h-[calc(100%-41px)] w-full bg-background overflow-hidden">
                {interactActive ? (
                  <iframe
                    src={
                      activeProject.path.startsWith("/")
                        ? `https://www.rateministere.com${activeProject.path}`
                        : activeProject.path
                    }
                    title={activePt.name}
                    className="h-full w-full border-none bg-surface"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                ) : (
                  /* Click-to-Interact Overlay */
                  <div
                    onClick={() => setInteractActive(true)}
                    className="group/iframe absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-radial-[circle_at_center,rgba(255,255,255,0.75)_20%,rgba(240,240,240,0.95)_100%] dark:bg-radial-[circle_at_center,rgba(20,20,20,0.75)_20%,rgba(10,10,10,0.95)_100%] p-6 text-center transition-all duration-300 hover:bg-black/[0.02]"
                  >
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-border bg-surface text-muted transition-all duration-500 group-hover/iframe:scale-110 group-hover/iframe:border-accent group-hover/iframe:text-accent group-hover/iframe:shadow-[0_0_20px_rgba(11,95,255,0.15)]">
                      <MousePointerClick size={24} className="animate-pulse" />
                    </div>
                    <h3 className="mt-6 font-display text-lg tracking-tight group-hover/iframe:text-accent transition-colors">
                      {activePt.name}
                    </h3>
                    <p className="mt-2 max-w-md font-body text-xs text-muted leading-relaxed">
                      {activePt.description}
                    </p>
                    <span className="mt-6 rounded-full bg-text px-4 py-2 font-body text-[10px] uppercase tracking-[0.2em] text-background transition-colors group-hover/iframe:bg-accent">
                      {t.archive.clickToInteract}
                    </span>
                    <p className="mt-3 font-body text-[9px] tracking-wide text-muted/60 opacity-0 transition-opacity duration-300 group-hover/iframe:opacity-100">
                      {t.archive.interactInstructions}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side Navigation Button (Desktop/Tablet) */}
            <button
              type="button"
              onClick={handleNext}
              className="hidden sm:flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-muted shadow-md cursor-pointer transition-all hover:border-text/30 hover:text-text hover:scale-105 active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Active Project Metadata below preview */}
          <div className="mt-8 flex flex-col items-center text-center px-4 select-text">
            <div className="flex items-center gap-3">
              <span className="font-body text-xs text-muted uppercase tracking-widest">
                {activeProject.year}
              </span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span className="font-body text-xs text-muted uppercase tracking-widest">
                {`0${activeWebIndex + 1} / 0${webProjects.length}`}
              </span>
            </div>

            <h3 className="mt-2 font-display text-2xl tracking-tight">
              {activePt.name}
            </h3>
            
            <p className="mt-3 max-w-xl font-body text-sm text-muted leading-relaxed">
              {activePt.description}
            </p>

            {/* Actions: Open / View on Github */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href={
                  activeProject.path.startsWith("/")
                    ? `https://www.rateministere.com${activeProject.path}`
                    : activeProject.path
                }
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-text px-4 py-2 font-body text-[10px] uppercase tracking-[0.2em] text-background transition-colors hover:bg-accent cursor-pointer"
              >
                <span>{t.archive.openInNewTab}</span>
                <ExternalLink size={12} />
              </a>

              {activeProject.github && (
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 font-body text-[10px] uppercase tracking-[0.2em] text-text transition-colors hover:border-text/30 cursor-pointer"
                >
                  <Github size={12} />
                  <span>{t.archive.viewGithub}</span>
                </a>
              )}
            </div>

            {/* Indicator dots & Mobile Navigation arrows */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={handlePrev}
                className="flex sm:hidden h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-muted cursor-pointer hover:text-text hover:border-text/30"
                title="Previous"
              >
                <ChevronLeft size={14} />
              </button>

              <div className="flex items-center gap-1.5">
                {webProjects.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectProject(i)}
                    className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                      i === activeWebIndex ? "w-6 bg-accent" : "w-1.5 bg-border hover:bg-text/30"
                    }`}
                    title={(t.projects[webProjects[i].id as keyof typeof t.projects] || {}).name}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="flex sm:hidden h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-muted cursor-pointer hover:text-text hover:border-text/30"
                title="Next"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Complete Archive List */}
        <div className="mt-16 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-surface select-text">
          {projects.map((project, idx) => {
            const pt = t.projects[project.id as keyof typeof t.projects];
            const hasWebsite = !project.path.includes("github.com");
            return (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project)}
                className="block cursor-pointer"
              >
                <div className="group flex flex-col gap-3 px-5 py-5 transition-colors hover:bg-background md:flex-row md:items-center md:justify-between md:gap-10 md:px-6">
                  <div className="flex items-center gap-4 md:gap-6">
                    <span className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>
                    <div className="font-display text-lg tracking-tight md:text-xl flex items-center gap-2">
                      <span>{pt.name}</span>
                      {hasWebsite ? (
                        <div className="flex items-center gap-3">
                          <span title="Visit Website / Set Preview" className="flex items-center text-muted/50 hover:text-accent transition-colors">
                            <Globe size={14} />
                          </span>
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-muted/50 hover:text-accent transition-colors flex items-center"
                              title="View GitHub Repository"
                            >
                              <Github size={14} />
                            </a>
                          )}
                        </div>
                      ) : (
                        project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-muted/50 hover:text-accent transition-colors flex items-center"
                            title="View GitHub Repository"
                          >
                            <Github size={14} />
                          </a>
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-6 md:w-[56%] md:justify-end md:gap-10">
                    <p className="max-w-[42ch] font-body text-sm leading-relaxed text-muted">{pt.description}</p>
                    <div className="flex items-center gap-3">
                      <span className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">
                        {project.year}
                      </span>
                      <ArrowUpRight className="opacity-0 transition-opacity group-hover:opacity-100" size={18} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Side Projects Section */}
        <div className="mt-20 flex items-baseline justify-between gap-6 border-b border-border pb-6">
          <div>
            <h2 className="font-display text-2xl tracking-tight md:text-3xl">{t.sideProjects.title}</h2>
            <p className="mt-2 font-body text-xs text-muted">{t.sideProjects.description}</p>
          </div>
          <span className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">
            {sideProjects.length} {t.sideProjects.entries}
          </span>
        </div>

        <div className="mt-6 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-surface select-text">
          {sideProjects.map((project, idx) => {
            const pt = t.sideProjectItems[project.id as keyof typeof t.sideProjectItems];
            return (
              <a
                key={project.id}
                href={project.path}
                target="_blank"
                rel="noreferrer"
                className="block"
              >
                <div className="group flex flex-col gap-3 px-5 py-5 transition-colors hover:bg-background md:flex-row md:items-center md:justify-between md:gap-10 md:px-6">
                  <div className="flex items-center gap-4 md:gap-6">
                    <span className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>
                    <div className="font-display text-lg tracking-tight md:text-xl flex items-center gap-2">
                      <span>{pt.name}</span>
                      {project.path.includes("github.com") ? (
                        <Github size={14} className="text-muted/50 group-hover:text-accent transition-colors" />
                      ) : (
                        <Globe size={14} className="text-muted/50 group-hover:text-accent transition-colors" />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-6 md:w-[56%] md:justify-end md:gap-10">
                    <p className="max-w-[42ch] font-body text-sm leading-relaxed text-muted">{pt.description}</p>
                    <div className="flex items-center gap-3">
                      <span className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">
                        {project.year}
                      </span>
                      <ArrowUpRight className="opacity-0 transition-opacity group-hover:opacity-100" size={18} />
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
