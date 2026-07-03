"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "./LanguageContext";

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="pt-28 md:pt-32 pb-16 md:pb-24">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7"
          >
            <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">
              {t.hero.role} · {t.hero.location}
            </div>

            <h1 className="mt-6 font-display text-[12vw] leading-[0.95] tracking-[-0.05em] sm:text-6xl md:text-7xl">
              Noah Zixin <span className="text-accent">Zhang</span>
            </h1>

            <p className="mt-6 max-w-xl font-body text-sm leading-relaxed text-muted md:text-base">
              {t.hero.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-text px-5 py-2.5 font-body text-[11px] uppercase tracking-[0.26em] text-background transition-colors hover:bg-accent cursor-pointer"
              >
                {t.hero.explore}
                <ArrowUpRight size={16} />
              </Link>

              <Link
                href="#archive"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 font-body text-[11px] uppercase tracking-[0.26em] text-text transition-colors hover:border-text/30 cursor-pointer"
              >
                {t.hero.directory}
              </Link>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5"
          >
            <div className="rounded-3xl border border-border bg-surface p-6 md:p-8">
              <div className="flex items-center justify-between">
                <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">{t.background.title}</div>
                <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">{t.background.year}</div>
              </div>

              <p className="mt-6 font-body text-sm leading-relaxed text-muted">{t.background.bio}</p>

              <div className="mt-10 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-border bg-background px-4 py-3">
                  <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">{t.background.cards.focusLabel}</div>
                  <div className="mt-2 font-display text-sm tracking-tight">{t.background.cards.focusValue}</div>
                </div>
                <div className="rounded-2xl border border-border bg-background px-4 py-3">
                  <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">{t.background.cards.strengthLabel}</div>
                  <div className="mt-2 font-display text-sm tracking-tight">{t.background.cards.strengthValue}</div>
                </div>
                <div className="rounded-2xl border border-border bg-background px-4 py-3">
                  <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">{t.background.cards.modeLabel}</div>
                  <div className="mt-2 font-display text-sm tracking-tight">{t.background.cards.modeValue}</div>
                </div>
                <div className="rounded-2xl border border-border bg-background px-4 py-3">
                  <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">{t.background.cards.detailLabel}</div>
                  <div className="mt-2 font-display text-sm tracking-tight">{t.background.cards.detailValue}</div>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
