/* Theme switch as a circular spread from the click point (same move
   the Stack study used). `apply` must mutate the DOM synchronously so
   the ::view-transition-new snapshot already carries the new theme.
   Falls back to an instant switch for reduced motion, a missing
   origin, or browsers without startViewTransition. The root
   pseudo-element setup lives in globals.css. */
export function spreadTheme(apply: () => void, origin?: { x: number; y: number }) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => {
      ready: Promise<void>;
      finished: Promise<void>;
      updateCallbackDone: Promise<void>;
    };
  };
  if (reduced || typeof doc.startViewTransition !== "function" || !origin) {
    apply();
    return;
  }
  const maxR = Math.hypot(
    Math.max(origin.x, window.innerWidth - origin.x),
    Math.max(origin.y, window.innerHeight - origin.y),
  );
  try {
    const vt = doc.startViewTransition(apply);
    /* these reject on skipped or superseded transitions */
    vt.finished.catch(() => {});
    vt.updateCallbackDone.catch(() => {});
    vt.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${origin.x}px ${origin.y}px)`,
              `circle(${maxR}px at ${origin.x}px ${origin.y}px)`,
            ],
          },
          {
            duration: 520,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {});
  } catch {
    /* a synchronous throw must never swallow the theme switch */
    apply();
  }
}
