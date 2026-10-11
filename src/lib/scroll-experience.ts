import Lenis from "lenis";

// One page-wide inertia-scroll instance, shared by anchor jumps and the
// pinned showcase. Never started on touch devices or with reduced motion.
let lenis: Lenis | null = null;

export function initLenis(): Lenis | null {
  if (lenis) return lenis;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  if (reduced || coarse) return null;
  const instance = new Lenis({ lerp: 0.1 });
  lenis = instance;
  let frame = 0;
  const raf = (time: number) => {
    instance.raf(time);
    frame = requestAnimationFrame(raf);
  };
  frame = requestAnimationFrame(raf);
  return instance;
}

export function getLenis(): Lenis | null {
  return lenis;
}

export function smoothScrollTo(to: number): void {
  const target = Math.max(0, to);
  if (lenis) {
    lenis.scrollTo(target, { immediate: false });
    return;
  }
  window.scrollTo({ top: target, behavior: "smooth" });
}