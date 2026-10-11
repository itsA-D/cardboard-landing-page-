import { useEffect, useRef, useState } from "react";

// Scroll distance below the top of the page where the header is always shown.
const TOP_ALWAYS_VISIBLE = 80;
// Desktop: moving the pointer into the top of the viewport reveals the header.
const POINTER_REVEAL = 48;
// Small movements below this threshold never toggle the header.
const TOGGLE_THRESHOLD = 8;

// True while the page should hide the header. Scrolling down hides it,
// scrolling up or returning near the top shows it again. A passive,
// requestAnimationFrame-throttled listener keeps tiny/overscroll moves from
// toggling the state.
export function useScrollDirection(): boolean {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);
  const frame = useRef<number | null>(null);
  const pointerNearTop = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    const update = () => {
      ticking.current = false;
      const y = window.scrollY;
      // Ignore rubber-band overscroll above the document start.
      if (y < 0) {
        lastY.current = y;
        return;
      }
      if (y < TOP_ALWAYS_VISIBLE) {
        setHidden(false);
        lastY.current = y;
        return;
      }
      const delta = y - lastY.current;
      if (Math.abs(delta) < TOGGLE_THRESHOLD) return;
      lastY.current = y;
      // Reveal (and keep revealed) while the pointer is in the top strip.
      if (pointerNearTop.current) {
        setHidden(false);
        return;
      }
      setHidden(delta > 0);
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      frame.current = window.requestAnimationFrame(update);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerNearTop.current = event.clientY <= POINTER_REVEAL;
      if (pointerNearTop.current) setHidden(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  return hidden;
}
