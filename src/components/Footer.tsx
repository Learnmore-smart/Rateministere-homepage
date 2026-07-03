"use client";

import React from "react";
import { ArrowUpRight, Award, Github, Instagram, Youtube, Facebook, Mail } from "lucide-react";
import { useLang } from "./LanguageContext";

const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const BilibiliIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z" />
  </svg>
);

const XiaohongshuIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor" aria-hidden>
    <path d="M 29,0.33332825 C 13.959937,3.4666748 1.5356731,15.204498 0,31 -1.586103,47.314209 0,64.597672 0,81 v 102 c 0,18.76035 -4.7369685,44.19888 7.3333335,60 C 20.372129,260.06897 44.156731,256 63,256 h 111 35 c 5.78276,0 12.33244,0.84741 18,-0.33333 15.0401,-3.13336 27.46432,-14.87115 29,-30.66667 1.58612,-16.31419 0,-33.59769 0,-50 V 73 C 256,54.239685 260.73697,28.801102 248.66667,13 235.62787,-4.0689697 211.84329,0 193,0 H 82 47 C 41.217228,0 34.667561,-0.84741211 29,0.33332825 M 120,91 l -7,19 h 12 l -10,24 9,1 c -0.98794,2.68155 -2.31718,7.73317 -4.33334,9.83334 C 118.18945,146.3721 115.92654,146 114,146 c -4.35942,0 -13.16798,1.80539 -15.5,-3 -1.069664,-2.20416 0.465553,-4.98451 1.333336,-7 1.813624,-4.21228 4.222554,-8.51549 5.166664,-13 -2.17548,0 -4.92464,0.42967 -7,-0.33333 -7.778526,-2.85974 0.874031,-15.36435 2.66666,-19.66667 1.25875,-3.020981 2.75652,-9.584732 5.5,-11.5 C 110.01874,88.810822 115.88325,90.674988 120,91 m -79,63 c 2.750713,0 6.837379,0.81721 8.5,-2 1.769028,-2.99753 0.5,-9.58963 0.5,-13 V 106 C 50,102.90659 48.438198,93.464493 51.166668,91.5 53.41069,89.884308 62.832935,90.226166 63.833332,93 65.47065,97.539825 64,105.16241 64,110 v 32 c 0,5.48389 0.949112,11.8645 -1.333332,17 -2.177158,4.89861 -12.303417,9.27243 -17.333336,5.5 C 43.120155,162.84012 41.545292,156.59013 41,154 M 193,91 v 5 c 3.72887,0 8.4108,-0.763367 12,0.333328 11.97635,3.659424 11,15.422502 11,25.666672 1.99706,0 4.04419,-0.15562 6,0.33333 11.49335,2.87334 10,14.36401 10,23.66667 0,4.95615 0.93086,10.82184 -2.33333,15 -3.59567,4.60246 -9.48195,4 -14.66667,4 -1.6116,0 -4.26318,0.51051 -5.66667,-0.5 -2.62326,-1.88875 -3.78159,-7.50485 -4.33333,-10.5 3.28711,0 9.2179,1.12517 11.83333,-1.33334 C 219.9164,149.76859 218.65411,138.43454 215,136.5 c -1.93661,-1.02527 -4.88672,-0.5 -7,-0.5 h -15 v 29 h -14 v -29 h -14 v -14 h 14 v -12 h -9 V 96 h 9 v -5 h 14 m -32,5 v 14 h -8 v 42 h 13 v 13 H 120 L 125.33334,152.5 138,152 v -42 h -8 V 96 h 31 m 57,14 c 0,-2.84204 -0.51608,-6.25871 0.33333,-9 3.34434,-10.793121 19.61577,-2.093994 11.5,6.83333 -0.92279,1.01507 -2.54419,1.51106 -3.83333,1.83334 C 223.43948,110.30679 220.61993,110 218,110 M 41,110 36.833332,147 30,159 24,143 27,110 h 14 m 46,0 3,33 -6,15 h -2 c -5.366936,-8.49765 -6.053299,-17.26251 -7,-27 -0.672195,-6.91406 -2,-14.04004 -2,-21 h 14 m 106,0 v 12 h 9 v -12 h -9 m -75,42 -5,13 H 91 L 96.333336,151.5 104,151.66666 Z" />
  </svg>
);

type RecognitionMeta = {
  id: string;
  period: string;
};

const recognitions: RecognitionMeta[] = [
  { id: "trae-annual-contributor", period: "2025" },
  { id: "trae-vol3-quality", period: "2025.05" },
  { id: "trae-vol4-top", period: "2025" },
  { id: "trae-community-star", period: "2025–26" },
];

export default function Footer() {
  const { t } = useLang();

  return (
    <>
      {/* Recognition Section */}
      <section className="py-20 md:py-28 mx-auto max-w-screen-2xl px-6 md:px-12">
        <div className="flex items-baseline justify-between gap-6 border-b border-border pb-6">
          <h2 className="font-display text-2xl tracking-tight md:text-3xl">{t.recognition.title}</h2>
          <span className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">
            {t.recognition.badge}
          </span>
        </div>

        <div className="mt-6 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-surface">
          {recognitions.map((item) => {
            const rt = t.recognitionItems[item.id as keyof typeof t.recognitionItems];
            return (
              <div
                key={item.id}
                className="group flex flex-col gap-3 px-5 py-5 md:flex-row md:items-center md:justify-between md:gap-10 md:px-6"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <Award size={14} className="text-muted/40" />
                  <div className="font-display text-lg tracking-tight md:text-xl">
                    {rt.title}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-6 md:w-[56%] md:justify-end md:gap-10">
                  <p className="max-w-[42ch] font-body text-sm leading-relaxed text-muted">
                    {rt.detail}
                  </p>
                  <span className="font-body text-[11px] uppercase tracking-[0.26em] text-muted whitespace-nowrap">
                    {item.period}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Footer */}
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto max-w-screen-2xl px-6 py-16 md:px-12 md:py-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-5">
              <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">{t.footer.socials}</div>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-muted">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-body text-[11px] uppercase tracking-[0.26em] transition-colors hover:text-text cursor-pointer"
                >
                  <Github size={16} />
                  GitHub
                </a>
                <a
                  href="https://x.com/Learnmore_smart"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-body text-[11px] uppercase tracking-[0.26em] transition-colors hover:text-text cursor-pointer"
                >
                  <XIcon size={16} />
                  X
                </a>
                <a
                  href="https://www.instagram.com/learnmore_smart/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-body text-[11px] uppercase tracking-[0.26em] transition-colors hover:text-text cursor-pointer"
                >
                  <Instagram size={16} />
                  Instagram
                </a>
                <a
                  href="https://youtube.com/@NoahsPianoJourney?sub_confirmation=1"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-body text-[11px] uppercase tracking-[0.26em] transition-colors hover:text-text cursor-pointer"
                >
                  <Youtube size={16} />
                  YouTube
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100076544922605"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-body text-[11px] uppercase tracking-[0.26em] transition-colors hover:text-text cursor-pointer"
                >
                  <Facebook size={16} />
                  Facebook
                </a>
                <a
                  href="https://space.bilibili.com/3494364930116218"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-body text-[11px] uppercase tracking-[0.26em] transition-colors hover:text-text cursor-pointer"
                >
                  <BilibiliIcon size={16} />
                  Bilibili
                </a>
                <a
                  href="https://www.rednote.com/user/profile/5fd4fa600000000001007d2d"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-body text-[11px] uppercase tracking-[0.26em] transition-colors hover:text-text cursor-pointer"
                >
                  <XiaohongshuIcon size={16} />
                  RedNote
                </a>
                <a
                  href="mailto:noahzh52@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-body text-[11px] uppercase tracking-[0.26em] transition-colors hover:text-text cursor-pointer"
                >
                  <Mail size={16} />
                  Email
                </a>
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted">{t.footer.capabilities}</div>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "JavaScript",
                  "C#",
                  "Node.js",
                  "Tailwind",
                  "Framer Motion",
                  "Cloud",
                  "Figma",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border bg-background px-3 py-1 font-body text-[11px] uppercase tracking-[0.26em] text-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-6 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
            <a
              href="mailto:noahzh52@gmail.com"
              className="inline-flex items-center gap-2 font-display text-2xl tracking-tight transition-colors hover:text-accent whitespace-nowrap cursor-pointer"
            >
              {t.footer.cta}
              <ArrowUpRight size={18} />
            </a>
            <div className="flex flex-col gap-1 items-center md:items-center text-muted font-body text-xs italic text-center">
              <p>&ldquo;{t.background.quote}&rdquo;</p>
              <p>&ldquo;{t.background.walterMitty}&rdquo;</p>
            </div>
            <div className="font-body text-[11px] uppercase tracking-[0.26em] text-muted whitespace-nowrap">
              {t.footer.copyright}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
