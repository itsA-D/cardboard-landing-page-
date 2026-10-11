import { useEffect, useState } from "react";

const words = ["video", "vlog", "promo", "short", "story"];

export function LiveHeadline() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setInterval> | undefined;
    const sync = () => {
      if (timer) clearInterval(timer);
      if (motion.matches) { setActive(0); return; }
      timer = setInterval(() => setActive((current) => (current + 1) % words.length), 3200);
    };
    sync(); motion.addEventListener("change", sync);
    return () => { if (timer) clearInterval(timer); motion.removeEventListener("change", sync); };
  }, []);
  return <h1 className="hero-headline hero-enter" aria-label="Make any video you can think of">
    <span className="headline-text" aria-hidden="true">Make any <span className="inline-grid w-[2.7em] text-left"><span key={active} className="headline-swap">{words[active]}</span></span><br /><span className="headline-ending">you can think of</span></span>
  </h1>;
}