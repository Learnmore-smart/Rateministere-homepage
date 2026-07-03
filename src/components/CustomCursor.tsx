"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

type CursorMode = "idle" | "hover" | "expand" | "play" | "close";

const INTERACTIVE_SELECTOR = "[data-cursor], a, button, [role='button'], select, input[type='submit']";

function isActionCursorMode(value: string | null): value is Extract<CursorMode, "expand" | "play" | "close"> {
  return value === "expand" || value === "play" || value === "close";
}

function getCursorModeFromTarget(target: EventTarget | null): CursorMode {
  if (!(target instanceof Element)) return "idle";

  const interactiveElement = target.closest(INTERACTIVE_SELECTOR);
  if (!interactiveElement) return "idle";

  const cursorValue = interactiveElement.getAttribute("data-cursor");
  return isActionCursorMode(cursorValue) ? cursorValue : "hover";
}

export default function CustomCursor() {
  const [cursorMode, setCursorMode] = useState<CursorMode>("idle");
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const cursorX = useSpring(mouseX, { stiffness: 350, damping: 28 });
  const cursorY = useSpring(mouseY, { stiffness: 350, damping: 28 });

  useEffect(() => {
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const checkTouch = () => {
      setIsTouchDevice(!finePointerQuery.matches);
    };
    checkTouch();
    finePointerQuery.addEventListener("change", checkTouch);

    const handlePointerMove = (e: PointerEvent) => {
      if (!finePointerQuery.matches) return;
      setIsCursorVisible((current) => (current ? current : true));
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const nextMode = getCursorModeFromTarget(e.target);
      setCursorMode((current) => (current === nextMode ? current : nextMode));
    };

    const handlePointerLeave = () => {
      setIsCursorVisible(false);
    };

    const handlePointerDown = () => {
      setIsClicked(true);
    };

    const handlePointerUp = () => {
      setIsClicked(false);
    };

    window.addEventListener("pointermove", handlePointerMove);
    document.body.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      finePointerQuery.removeEventListener("change", checkTouch);
      window.removeEventListener("pointermove", handlePointerMove);
      document.body.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [mouseX, mouseY]);

  if (typeof document === "undefined" || isTouchDevice || !isCursorVisible) return null;

  const isCircleMode = cursorMode === "idle" || cursorMode === "hover";
  const isActionMode = cursorMode === "play" || cursorMode === "expand" || cursorMode === "close";

  return createPortal(
    <motion.div
      style={{
        position: "fixed",
        left: cursorX,
        top: cursorY,
        x: "-50%",
        y: "-50%",
        zIndex: 99999,
        pointerEvents: "none",
      }}
      animate={{
        width: cursorMode === "idle" ? 14 : cursorMode === "hover" ? 42 : 104,
        height: cursorMode === "idle" ? 14 : cursorMode === "hover" ? 42 : 36,
        borderRadius: cursorMode === "idle" || cursorMode === "hover" ? "50%" : "18px",
        boxShadow:
          cursorMode === "idle" || cursorMode === "hover"
            ? "none"
            : cursorMode === "close"
            ? "0 12px 30px rgba(255, 95, 86, 0.24)"
            : "0 12px 30px rgba(11, 95, 255, 0.24)",
        scale: isClicked ? 0.82 : 1,
      }}
      transition={{ type: "spring", stiffness: 450, damping: 28 }}
      aria-hidden="true"
      className="relative flex items-center justify-center overflow-hidden text-white"
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-[inherit]"
        animate={{
          backgroundColor:
            cursorMode === "idle"
              ? "rgba(11, 95, 255, 0)"
              : cursorMode === "hover"
              ? "rgba(11, 95, 255, 0.12)"
              : cursorMode === "close"
              ? "rgba(255, 95, 86, 0.9)"
              : "#0b5fff",
        }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 rounded-full bg-[#0b5fff]"
        style={{ x: "-50%", y: "-50%" }}
        animate={{
          width: cursorMode === "hover" ? 6 : 8,
          height: cursorMode === "hover" ? 6 : 8,
          opacity: isCircleMode ? 1 : 0,
          scale: isCircleMode ? 1 : 0.55,
        }}
        transition={{ type: "spring", stiffness: 520, damping: 34 }}
      />
      <AnimatePresence mode="wait">
        {isActionMode && (
          <motion.span
            key={cursorMode}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.12 }}
            className="relative font-body text-[9px] uppercase tracking-[0.16em] font-semibold whitespace-nowrap text-center text-white"
          >
            {cursorMode === "play" ? "Play Demo" : cursorMode === "close" ? "Close" : "Expand"}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>,
    document.body
  );
}
