"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useLang, langLabels, langOrder, Lang } from "./LanguageContext";

export default function Header() {
  const { lang, setLang, t } = useLang();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectLang = useCallback((l: Lang) => {
    setLang(l);
    setLangOpen(false);
  }, [setLang]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-12">
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-border/70 bg-background/70 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Link href="/" className="flex items-baseline gap-3">
            <span className="font-display text-sm tracking-tight">{t.header.name}</span>
            <span className="hidden sm:inline font-body text-[11px] uppercase tracking-[0.26em] text-muted">
              {t.header.portfolio}
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden md:flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-body text-[11px] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              {t.hero.ongoing}
            </span>

            <div ref={langRef} className="relative">
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 font-body text-[11px] uppercase tracking-[0.26em] text-muted transition-colors hover:text-text cursor-pointer"
              >
                {langLabels[lang]}
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    langOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`lang-dropdown absolute right-0 top-[calc(100%+8px)] min-w-[120px] overflow-hidden rounded-xl border border-border bg-surface/90 shadow-lg shadow-black/[0.06] backdrop-blur-xl ${
                  langOpen ? "lang-dropdown--open" : ""
                }`}
              >
                {langOrder.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => selectLang(l)}
                    className={`flex w-full items-center gap-2 px-4 py-2.5 font-body text-[11px] uppercase tracking-[0.26em] transition-colors duration-150 hover:bg-accent/8 hover:text-text cursor-pointer ${
                      l === lang ? "text-accent" : "text-muted"
                    }`}
                  >
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                        l === lang
                          ? "scale-100 bg-accent opacity-100"
                          : "scale-0 bg-transparent opacity-0"
                      }`}
                    />
                    {langLabels[l]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
