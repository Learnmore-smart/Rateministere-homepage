"use client";

import React from "react";
import { motion, useDragControls } from "framer-motion";
import { X } from "lucide-react";

interface WindowProps {
  title: string;
  icon?: React.ReactNode;
  x: number;
  y: number;
  width?: number;
  z: number;
  /** drag bounds as deltas from the window's rest position (framer BoundingBox) */
  bounds: { left: number; right: number; top: number; bottom: number };
  onFocus: () => void;
  onClose: () => void;
  children: React.ReactNode;
  bodyClassName?: string;
}

export default function Window({
  title,
  icon,
  x,
  y,
  width = 460,
  z,
  bounds,
  onFocus,
  onClose,
  children,
  bodyClassName = "",
}: WindowProps) {
  const dragControls = useDragControls();

  return (
    <motion.div
      drag
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={bounds}
      initial={{ opacity: 0, scale: 0.94, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 12 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      onPointerDown={onFocus}
      style={{ left: x, top: y, zIndex: z, width: `min(${width}px, calc(100vw - 24px))` }}
      className="absolute overflow-hidden rounded-xl border border-[#3a3f2c] bg-[#12140c]/95 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-md"
    >
      {/* title bar */}
      <div
        onPointerDown={(e) => dragControls.start(e)}
        className="flex cursor-grab select-none items-center justify-between border-b border-[#3a3f2c] bg-[#171a0f] px-3 py-2 active:cursor-grabbing"
      >
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            onPointerDown={(e) => e.stopPropagation()}
            className="group flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#ff5f56] text-black/0 transition-colors hover:text-black/70"
            aria-label={`Close ${title}`}
          >
            <X size={9} strokeWidth={3.5} />
          </button>
          <span className="h-3.5 w-3.5 rounded-full bg-[#ffbd2e]/70" />
          <span className="h-3.5 w-3.5 rounded-full bg-[#27c93f]/70" />
        </div>
        <span className="flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.22em] text-[#9aa483]">
          {icon}
          {title}
        </span>
        <span className="w-[52px]" />
      </div>
      <div className={bodyClassName}>{children}</div>
    </motion.div>
  );
}
