"use client";

import { useEffect, useRef, useState } from "react";
import { useLang, type Lang } from "@/components/LanguageContext";

/* Language crossfade, ported from the Stack study: `shown` trails
   `lang` by one 170ms fade so the text swaps while the page is dimmed.
   The swap flag is mirrored in a ref and kept OUT of the effect deps —
   as a dep, setting it would re-run the effect and kill the pending
   midpoint timer. The `lang === shown` branch is also the release: it
   rescues a cancelled A→B→A swap that would otherwise leave the page
   dimmed for good. */
export function useShownLang(reduced: boolean) {
  const { lang } = useLang();
  const [shown, setShown] = useState<Lang>(lang);
  const [swapping, setSwapping] = useState(false);
  const swapRef = useRef(false);

  useEffect(() => {
    const timers: number[] = [];
    if (lang === shown) {
      if (swapRef.current) {
        timers.push(
          window.setTimeout(() => {
            swapRef.current = false;
            setSwapping(false);
          }, 60),
        );
      }
      return () => timers.forEach((id) => window.clearTimeout(id));
    }
    if (reduced) {
      timers.push(window.setTimeout(() => setShown(lang), 0));
    } else {
      timers.push(
        window.setTimeout(() => {
          swapRef.current = true;
          setSwapping(true);
        }, 0),
      );
      timers.push(window.setTimeout(() => setShown(lang), 170));
    }
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [lang, shown, reduced]);

  return { shown, swapping };
}
