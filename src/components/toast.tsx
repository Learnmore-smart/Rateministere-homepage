"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import styles from "./toast.module.css";

export interface ToastItem {
  id: number;
  message: string;
  leaving?: boolean;
}

const EXIT_MS = 170;
const MAX_VISIBLE = 3;

/** Toast queue: `push(message)` shows a pill, auto-dismisses, caps at 3. */
export function useToasts(duration = 4500) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((t) => clearTimeout(t));
  }, []);

  const dismiss = useCallback((id: number) => {
    const pending = timers.current.get(id);
    if (pending) {
      clearTimeout(pending);
      timers.current.delete(id);
    }
    setToasts((ts) =>
      ts.some((t) => t.id === id && !t.leaving)
        ? ts.map((t) => (t.id === id ? { ...t, leaving: true } : t))
        : ts,
    );
    timers.current.set(
      id,
      setTimeout(() => {
        timers.current.delete(id);
        setToasts((ts) => ts.filter((t) => t.id !== id));
      }, EXIT_MS),
    );
  }, []);

  const push = useCallback(
    (message: string) => {
      const id = ++nextId.current;
      setToasts((ts) => [...ts.slice(-(MAX_VISIBLE - 1)), { id, message }]);
      timers.current.set(id, setTimeout(() => dismiss(id), duration));
    },
    [dismiss, duration],
  );

  return { toasts, push, dismiss };
}

/** Live-region stack; render once near the page root. */
export function ToastStack({
  toasts,
  onDismiss,
  dismissLabel,
}: {
  toasts: ToastItem[];
  onDismiss: (id: number) => void;
  dismissLabel: string;
}) {
  return (
    <div className={styles.toasts} role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={styles.toast} {...(t.leaving ? { "data-leaving": "" } : {})}>
          <i className={styles.toastDot} aria-hidden="true" />
          <span className={styles.toastMsg}>{t.message}</span>
          <button
            type="button"
            className={styles.toastDismiss}
            aria-label={dismissLabel}
            onClick={() => onDismiss(t.id)}
          >
            <X size={13} aria-hidden="true" />
          </button>
        </div>
      ))}
    </div>
  );
}
