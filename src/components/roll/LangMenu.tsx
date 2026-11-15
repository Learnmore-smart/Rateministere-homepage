"use client";

import {
  useEffect,
  useRef,
  type FocusEvent as ReactFocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent,
} from "react";
import { Check, ChevronDown, Languages } from "lucide-react";
import { langLabels, langOrder, useLang, type Lang } from "@/components/LanguageContext";
import styles from "./roll.module.css";

/* Language dropdown — the <details>/<summary> popover from the Stack
   study, restyled. Items are <button>s calling setLang (no cookie, no
   navigation). Used in the header and, with side="top", in the mobile
   menu so the popover opens upward. */
export default function LangMenu({
  side = "bottom",
  className,
}: {
  side?: "top" | "bottom";
  className?: string;
}) {
  const { lang, setLang, t } = useLang();
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  /* one tracked timer for the animated close — stacked timeouts could
     slam a reopened popover shut */
  const closeTimer = useRef(0);

  function requestClose(refocus = false) {
    const el = detailsRef.current;
    if (!el?.open) return;
    if (refocus) summaryRef.current?.focus();
    /* already animating out — bail WITHOUT clearing closeTimer: a
       second call (outside pointerdown → focusout → onBlur) must let
       the armed finisher run, or the popover freezes open + invisible */
    if (el.dataset.closing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.open = false;
    } else {
      el.dataset.closing = "true";
      closeTimer.current = window.setTimeout(() => {
        el.open = false;
        delete el.dataset.closing;
        closeTimer.current = 0;
      }, 140);
    }
  }

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const el = detailsRef.current;
      if (el?.open && !el.contains(event.target as Node)) requestClose();
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (detailsRef.current?.open) {
        event.preventDefault();
        requestClose(true);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(closeTimer.current);
    };
  }, []);

  function onSummaryClick(event: MouseEvent) {
    if (detailsRef.current?.open) {
      /* animate the close instead of the native instant toggle */
      event.preventDefault();
      requestClose();
    } else {
      window.clearTimeout(closeTimer.current);
      if (detailsRef.current) delete detailsRef.current.dataset.closing;
    }
  }

  function onSummaryKeyDown(event: ReactKeyboardEvent) {
    const el = detailsRef.current;
    if (event.key === "ArrowDown" && el && !el.open) {
      event.preventDefault();
      window.clearTimeout(closeTimer.current);
      delete el.dataset.closing;
      el.open = true;
      (
        el.querySelector<HTMLElement>("button[aria-current]") ??
        el.querySelector<HTMLElement>("ul button")
      )?.focus();
    }
  }

  function onPopoverKeyDown(event: ReactKeyboardEvent) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    const items = Array.from(
      detailsRef.current?.querySelectorAll<HTMLElement>("ul button") ?? [],
    );
    if (items.length === 0) return;
    const index = items.indexOf(document.activeElement as HTMLElement);
    const next =
      event.key === "ArrowDown"
        ? (index + 1) % items.length
        : (index - 1 + items.length) % items.length;
    event.preventDefault();
    items[next]?.focus();
  }

  function onBlur(event: ReactFocusEvent) {
    if (!event.currentTarget.contains(event.relatedTarget)) requestClose();
  }

  function choose(l: Lang) {
    setLang(l);
    /* refocus the trigger — closing otherwise strands keyboard focus */
    requestClose(true);
  }

  return (
    <details
      ref={detailsRef}
      className={className ? `${styles.langMenu} ${className}` : styles.langMenu}
      data-side={side}
      onBlur={onBlur}
    >
      <summary
        ref={summaryRef}
        className={styles.langTrigger}
        aria-label={`${t.stack.langMenuLabel}: ${langLabels[lang]}`}
        onClick={onSummaryClick}
        onKeyDown={onSummaryKeyDown}
      >
        <Languages size={15} aria-hidden="true" />
        <span>{langLabels[lang]}</span>
        <ChevronDown size={14} aria-hidden="true" className={styles.langChevron} />
      </summary>
      <ul className={styles.langPop} onKeyDown={onPopoverKeyDown}>
        {langOrder.map((l) => (
          <li key={l}>
            <button
              type="button"
              className={styles.langItem}
              aria-current={l === lang ? "true" : undefined}
              onClick={() => choose(l)}
            >
              <span>{langLabels[l]}</span>
              {l === lang ? <Check size={14} aria-hidden="true" className={styles.langCheck} /> : null}
            </button>
          </li>
        ))}
      </ul>
    </details>
  );
}
