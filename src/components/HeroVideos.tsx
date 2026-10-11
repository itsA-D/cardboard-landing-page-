import { useEffect, useRef, type CSSProperties } from "react";
import { LoopVideo } from "./LoopVideo";
import { heroCards } from "@/lib/marketing-media";

export function HeroVideos() {
  const orbit = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    const render = () => {
      frame = 0;
      const element = orbit.current;
      if (element) element.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
    };
    const move = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth - .5) * -18;
      targetY = (event.clientY / window.innerHeight - .5) * -14;
      if (!frame) frame = requestAnimationFrame(render);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => { window.removeEventListener("pointermove", move); if (frame) cancelAnimationFrame(frame); };
  }, []);

  return <div className="hero-video-orbit" ref={orbit} aria-hidden="true">
    {heroCards.map((card, index) => <div className={`orbit-video orbit-video-${index + 1}`} key={card.label} style={{ ["--i" as string]: index } as CSSProperties}>
      <LoopVideo src={card.src} label={card.label} />
    </div>)}
  </div>;
}
