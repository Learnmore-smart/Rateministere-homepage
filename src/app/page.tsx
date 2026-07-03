import React from "react";
import { LanguageProvider } from "@/components/LanguageContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedGrid from "@/components/FeaturedGrid";
import ArchiveSection from "@/components/ArchiveSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-background text-text">
        {/* Decorative background grid/gradients */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(11,95,255,0.10),transparent_55%),radial-gradient(900px_circle_at_85%_35%,rgba(16,17,20,0.06),transparent_55%)]"
        />

        <Header />

        <main className="relative">
          {/* Sibling stage to morph showcase portal. Scales down on morph expansion */}
          <div id="background-stage">
            <Hero />
            <FeaturedGrid />
            <ArchiveSection />
            <Footer />
          </div>
        </main>
      </div>
    </LanguageProvider>
  );
}
