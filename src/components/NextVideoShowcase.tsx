import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { LoopVideo } from "./LoopVideo";
import { nextCategoryNames, nextCategoryVideos } from "@/lib/marketing-media";

const subjects = ["product showcase", "viral trend", "launch video", "UGC ad", "explainer", "vlog", "podcast clip"];

export function NextVideoShowcase() {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const element = section.current;
      if (!element) return;
      const bounds = element.getBoundingClientRect();
      const range = Math.max(1, bounds.height - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -bounds.top / range));
      setActive(Math.min(nextCategoryNames.length - 1, Math.floor(progress * nextCategoryNames.length)));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, []);
  const select = (index: number) => {
    const element = section.current;
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.scrollY;
    const range = element.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + Math.max(0, range) * (index + .15) / nextCategoryNames.length, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    setActive(index);
  };
  return <section ref={section} className="next-showcase" id="next-video" aria-label="Your next video, made in Cardboard">
    <div className="next-showcase-sticky">
      <div className="next-showcase-inner">
        <div className="next-showcase-heading"><h2>Your next {subjects[active]},<br />made in Cardboard.</h2><p>No editing experience needed.</p></div>
        <div className="next-showcase-grid">
          <nav className="next-category-list" aria-label="Video categories">{nextCategoryNames.map((name, index) => <Button key={name} variant="quiet" className="next-category" aria-pressed={index === active} onClick={() => select(index)}><span>{name}</span></Button>)}</nav>
          <div className="next-preview" aria-label={`${nextCategoryNames[active]} examples`}>
            <div className="next-preview-collage" key={active}>{Array.from({ length: 4 }, (_, position) => {
              const videos = nextCategoryVideos[active] ?? [];
              const url = videos.length ? videos[position % videos.length] : undefined;
              if (!url) return null;
              return <LoopVideo key={position} src={url} chip={false} className={`next-preview-clip next-preview-clip-${position + 1}`} />;
            })}</div>
          </div>
        </div>
      </div>
    </div>
  </section>;
}