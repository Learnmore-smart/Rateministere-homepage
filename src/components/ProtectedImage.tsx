"use client";

import React, { useCallback } from "react";

interface ProtectedImageProps {
  src: string;
  alt: string;
  /** Classes for the outer wrapper — must establish size (h-*, aspect-*, etc.) */
  className?: string;
  /** Classes for the <img> itself (object-cover etc.) */
  imgClassName?: string;
  /** Corner watermark attribution */
  watermark?: string;
  /** Extra translucent shield layer (default true) */
  shield?: boolean;
}

/**
 * Deterrence-layered personal photo.
 * - right-click / drag / copy gestures intercepted
 * - transparent shield captures pointer events so the <img> is never the event target
 * - subtle watermark burn-in
 * Server-side, /p/* is additionally guarded by src/proxy.ts (foreign-referer 403)
 * and Cross-Origin-Resource-Policy headers in next.config.ts.
 */
export default function ProtectedImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  watermark = "© NOAH ZIXIN ZHANG",
  shield = true,
}: ProtectedImageProps) {
  const block = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return (
    <div
      className={`relative overflow-hidden select-none ${className}`}
      onContextMenu={block}
      onDragStart={block}
      onCopy={block}
      onCut={block}
      role="img"
      aria-label={alt}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden
        draggable={false}
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover [-webkit-user-drag:none] [user-select:none] ${imgClassName}`}
      />

      {/* Invisible interaction shield — right-click/drag land here, not on the image */}
      {shield && (
        <div
          aria-hidden
          className="absolute inset-0 z-10"
          onContextMenu={block}
          onDragStart={block}
          onMouseDown={(e) => {
            if (e.button === 2) block(e);
          }}
        />
      )}

      {watermark && (
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-1.5 right-2 z-20 font-body text-[8px] uppercase tracking-[0.22em] text-white/45 mix-blend-difference"
        >
          {watermark}
        </div>
      )}
    </div>
  );
}
