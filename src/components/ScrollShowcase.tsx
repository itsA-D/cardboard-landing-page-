import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { LoopVideo } from "./LoopVideo";
import { nextCategoryNames, nextCategoryVideos } from "@/lib/marketing-media";
import { createVideoLimiter, type VideoLimiter } from "@/lib/video-limit";
import { smoothScrollTo } from "@/lib/scroll-experience";

// The rotating subject word swaps per category while the heading reads:
// "Your next {subject}, made in Cardboard."
const subjects = ["product showcase", "viral trend", "launch video", "UGC ad", "explainer", "vlog", "podcast clip"];
const REST_TILTS = [
  { rx: -7, ry: -10, z: 20 },
  { rx: 8, ry: 10, z: 30 },
  { rx: -8, ry: 11, z: 14 },
  { rx: 9, ry: -9, z: 24 },
];
const PARALLAX_FACTORS = [0.6, 0.8, 1, 1.2];

// Desktop (>=1024, full motion) pins a tall scroll track with the heading,
// progress rail and glass stage advancing over seven categories. Below that,
// or with reduced motion, the same content flattens into chips + swipe.
export function ScrollShowcase() {
  const section = useRef<HTMLElement | null>(null);
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(0);
  const pinnedRef = useRef(false);
  const limiter = useMemo<VideoLimiter>(() => createVideoLimiter(8), []);
  const count = nextCategoryNames.length;

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const motionPref = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      pinnedRef.current = wide.matches && !motionPref.matches;
      setPinned(pinnedRef.current);
    };
    sync();
    wide.addEventListener("change", sync);
    motionPref.addEventListener("change", sync);
    return () => {
      wide.removeEventListener("change", sync);
      motionPref.removeEventListener("change", sync);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const scroll = useSpring(scrollYProgress, { stiffness: 220, damping: 26 });
  useMotionValueEvent(scroll, "change", (value) => {
    if (!pinnedRef.current) return;
    const next = Math.min(count - 1, Math.floor(value * count));
    setActive((current) => (current === next ? current : next));
  });

  const select = (index: number) => {
    const element = section.current;
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.scrollY;
    const range = Math.max(1, element.offsetHeight - window.innerHeight);
    // Land mid-bucket (index + .5) so settling sub-pixels never slip into
    // the previous category's boundary.
    smoothScrollTo(top + range * ((index + 0.5) / count));
    setActive(index);
  };

  return <MotionConfig reducedMotion="user">
    <section ref={section} className="next-scroll" id="next-video" aria-label="Your next video, made in Cardboard">
      {pinned
        ? <PinnedShowcase active={active} scroll={scroll} count={count} onSelect={select} limiter={limiter} />
        : <FluidShowcase active={active} count={count} onSelect={setActive} limiter={limiter} />}
    </section>
  </MotionConfig>;
}

function PinnedShowcase({ active, scroll, count, onSelect, limiter }: {
  active: number;
  scroll: MotionValue<number>;
  count: number;
  onSelect: (index: number) => void;
  limiter: VideoLimiter;
}) {
  const rail = useTransform(scroll, (value) => Math.max(0, Math.min(1, value)) * 100 + "%");
  return <div className="next-scroll-wrap">
    <div className="next-scroll-sticky">
      <div className="next-scroll-inner">
        <div className="next-scroll-left">
          <div className="next-scroll-heading">
            <h2>Your next <span className="next-subject" key={active}>{subjects[active]}</span>,<br />made in Cardboard.</h2>
            <p>No editing experience needed.</p>
          </div>
          <div className="next-rail">
            <div className="next-rail-track">
              <motion.span className="next-rail-fill" style={{ scaleY: scroll }} />
              <motion.span className="next-rail-dot" style={{ top: rail }} />
            </div>
            <ul className="next-list">
              {nextCategoryNames.map((name, index) => (
                <li key={name}>
                  <motion.button
                    type="button"
                    className="next-item"
                    aria-pressed={active === index}
                    onClick={() => onSelect(index)}
                    animate={{ scale: active === index ? 1 : 0.92, opacity: active === index ? 1 : 0.35 }}
                    transition={{ type: "spring", stiffness: 220, damping: 26 }}
                    style={{ transformOrigin: "left center" }}>
                    <span className="next-item-label">{name}</span>
                    {active === index && <span className="next-item-count">{`${String(index + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`}</span>}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <PinnedStage active={active} scroll={scroll} limiter={limiter} />
      </div>
    </div>
    <PreloadVideos active={active} />
  </div>;
}

function PinnedStage({ active, scroll, limiter }: {
  active: number;
  scroll: MotionValue<number>;
  limiter: VideoLimiter;
}) {
  const clusterZ = useTransform(scroll, (value) => (value - 0.5) * 4);
  const pointerX = useSpring(0, { stiffness: 140, damping: 22 });
  const pointerY = useSpring(0, { stiffness: 140, damping: 22 });
  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const h = (event.clientX - rect.left) / rect.width - 0.5;
    const v = (event.clientY - rect.top) / rect.height - 0.5;
    pointerY.set(-v * 14);
    pointerX.set(h * 14);
  };
  const leave = () => { pointerX.set(0); pointerY.set(0); };
  const clips = nextCategoryVideos[active] ?? [];
  return <div className="next-stage">
    <div className="next-stage-glass">
      <motion.div
        className="next-tile-set"
        style={{ perspective: 1600, transformPerspective: 1600, rotate: clusterZ, rotateX: pointerY, rotateY: pointerX }}
        onPointerMove={move}
        onPointerLeave={leave}>
        <AnimatePresence initial={false}>
          {clips.map((src, index) => (
            <StageTile key={src} src={src} index={index} scroll={scroll} limiter={limiter} tilt={REST_TILTS[index % REST_TILTS.length] ?? { rx: 0, ry: 0, z: 0 }} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
    <div className="next-caption">
      <span className="next-caption-eq" aria-hidden="true"><i /><i /><i /></span>
      <span>{nextCategoryNames[active]} examples</span>
    </div>
  </div>;
}

function StageTile({ src, index, scroll, limiter, tilt }: {
  src: string;
  index: number;
  scroll: MotionValue<number>;
  limiter: VideoLimiter;
  tilt: { rx: number; ry: number; z: number };
}) {
  const y = useTransform(scroll, (value) => value * 26 * (PARALLAX_FACTORS[index % PARALLAX_FACTORS.length] ?? 1));
  return <motion.div className="next-tile" style={{ y }}>
    <motion.div
      className="next-tile-inner"
      initial={{ opacity: 0, rotateY: -24, z: -90, scale: 0.94 }}
      animate={{ opacity: 1, rotateY: tilt.ry, rotateX: tilt.rx, z: tilt.z, scale: 1 }}
      exit={{ opacity: 0, rotateY: 24, z: -120, scale: 0.92, transition: { duration: 0.45, ease: [0.45, 0, 1, 1] } }}
      transition={{ type: "spring", stiffness: 240, damping: 24, delay: index * 0.06 }}>
      <LoopVideo src={src} chip={false} limiter={limiter} className="next-stage-tile" />
    </motion.div>
  </motion.div>;
}

// Warm the first clip of the upcoming category so the next swap never shows a
// blank frame; LoopVideo's own first-frame seek covers the rest.
function PreloadVideos({ active }: { active: number }) {
  const nextSet = nextCategoryVideos[active + 1];
  if (!nextSet?.length) return null;
  return <>{nextSet.slice(0, 1).map((src) => <link key={src} rel="preload" as="video" href={src} />)}</>;
}

function FluidShowcase({ active, count, onSelect, limiter }: {
  active: number;
  count: number;
  onSelect: (index: number) => void;
  limiter: VideoLimiter;
}) {
  const clips = nextCategoryVideos[active] ?? [];
  const navigate = (offset: number) => onSelect((active + offset + count) % count);
  return <div className="next-fluid">
    <div className="next-fluid-heading">
      <h2>Your next <span className="next-subject" key={active}>{subjects[active]}</span>, made in Cardboard.</h2>
      <p>No editing experience needed.</p>
    </div>
    <div className="next-chips" role="group" aria-label="Video categories">
      {nextCategoryNames.map((name, index) => (
        <button
          key={name}
          type="button"
          className={`next-chip${active === index ? " is-active" : ""}`}
          aria-pressed={active === index}
          onClick={() => onSelect(index)}>{name}</button>
      ))}
    </div>
    <div className="next-stage-glass next-fluid-glass">
      <motion.div
        className="next-fluid-drag"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.08}
        dragSnapToOrigin
        onDragEnd={(_, info) => {
          if (info.offset.x < -48) navigate(1);
          else if (info.offset.x > 48) navigate(-1);
        }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="next-fluid-tiles"
            key={active}
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.985 }}
            transition={{ duration: 0.32, ease: "easeOut" }}>
            {clips.map((src) => <LoopVideo key={src} src={src} chip={false} limiter={limiter} className="next-fluid-tile" />)}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
    <div className="next-caption">
      <span className="next-caption-eq" aria-hidden="true"><i /><i /><i /></span>
      <span>{nextCategoryNames[active]} examples</span>
    </div>
  </div>;
}