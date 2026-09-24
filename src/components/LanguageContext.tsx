"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import en from "@/i18n/en.json";
import zh from "@/i18n/zh.json";
import fr from "@/i18n/fr.json";

export const locales = { en, zh, fr } as const;
export type Lang = keyof typeof locales;

export const langLabels: Record<Lang, string> = { en: "EN", zh: "中文", fr: "FR" };
export const langOrder: Lang[] = ["en", "zh", "fr"];

export type TranslationType = typeof en;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: TranslationType;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("portfolio_lang", l);
      } catch {
        /* private mode */
      }
      /* SSR stays lang="en" — the client keeps <html lang> in sync */
      document.documentElement.lang = l;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check local storage first (guarded — a private-mode throw would
      // otherwise kill the provider effect)
      let stored: Lang | null = null;
      try {
        stored = localStorage.getItem("portfolio_lang") as Lang | null;
      } catch {
        /* private mode */
      }
      let initialLang: Lang = "en";
      if (stored && locales[stored]) {
        initialLang = stored;
      } else {
        // Fallback to browser locale
        const userLang = navigator.language.toLowerCase();
        if (userLang.includes("zh")) {
          initialLang = "zh";
        } else if (userLang.includes("fr")) {
          initialLang = "fr";
        }
      }

      setTimeout(() => {
        setLangState(initialLang);
        document.documentElement.lang = initialLang;
      }, 0);
    }
  }, []);

  const t = useMemo(() => locales[lang], [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLang must be used within a LanguageProvider");
  }
  return context;
}
