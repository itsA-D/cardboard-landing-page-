import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { VideoLimiter } from "@/lib/video-limit";

type LoopVideoProps = {
  src: string;
  poster?: string | undefined;
  className?: string | undefined;
  playOnClick?: boolean | undefined;
  label?: string | undefined;
  limiter?: VideoLimiter | undefined;
  objectPosition?: string | undefined;
  chip?: boolean | undefined;
  loadMargin?: string | undefined;
};

// Autoplay muted, only while on screen, with a navy gradient fallback and a
// first-frame seek. Never tints the footage; the glass treatment lives on the
// rounded border and the label chip only. We seek the first frame ourselves
// instead of using a "#t=0.1" URL fragment, which trips Chromium's media cache.
export function LoopVideo({ src, poster, className = "", playOnClick = false, label, limiter, objectPosition, chip = true, loadMargin = "600px 0px" }: LoopVideoProps) {
  const firstFrame = (element: HTMLVideoElement) => { try { if (element.readyState > 0 && element.currentTime < 0.05) element.currentTime = 0.1; } catch { /* Seek before full metadata is safe to ignore. */ } };
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(motion.matches);
    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const element = wrapRef.current;
    if (!element) return;
    const loadObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { setNear(true); loadObserver.disconnect(); }
    }, { rootMargin: loadMargin });
    loadObserver.observe(element);
    const playObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setInView(entry.isIntersecting));
    }, { threshold: 0.25 });
    playObserver.observe(element);
    return () => { loadObserver.disconnect(); playObserver.disconnect(); };
  }, [loadMargin]);

  useEffect(() => {
    const element = videoRef.current;
    if (!element || !near || playOnClick) return;
    let unsubscribe: (() => void) | undefined;
    const attempt = () => {
      if (reduced || !inView || element.paused === false) return true;
      if (limiter && !limiter.acquire(element)) return false;
      const promise = element.play();
      if (promise) promise.catch(() => {});
      return true;
    };
    if (inView && !reduced) {
      if (!attempt()) {
        element.pause();
        unsubscribe = limiter?.subscribe(() => { if (inView && !reduced) attempt(); });
      }
    } else {
      element.pause();
      limiter?.release(element);
    }
    return () => { unsubscribe?.(); limiter?.release(element); };
  }, [inView, near, reduced, playOnClick, limiter]);

  const toggle = () => {
    const element = videoRef.current;
    if (!element) return;
    if (element.paused) {
      element.muted = false;
      const promise = element.play();
      if (promise) promise.catch(() => {});
    } else {
      element.pause();
    }
  };

  const rootClass = ["loop-video", className, ready ? "is-ready" : "", failed ? "is-failed" : "", playOnClick ? "is-clickable" : ""].filter(Boolean).join(" ");

  return <div ref={wrapRef} className={rootClass} data-playing={playing} data-media={label ? "clip" : "tile"}>
    <span className="loop-video-fallback" aria-hidden="true" />
    {near && !failed && <video
      ref={videoRef}
      className="loop-video-el"
      src={src}
      poster={poster}
      style={objectPosition ? { objectPosition } : undefined}
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      disableRemotePlayback
      controlsList="nodownload noplaybackrate noremoteplayback"
      aria-label={label}
      onLoadedData={(event) => { setReady(true); firstFrame(event.currentTarget); }}
      onLoadedMetadata={(event) => firstFrame(event.currentTarget)}
      onPlay={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      onError={() => setFailed(true)}
    />}
    {playOnClick && !failed && <button type="button" className="loop-video-toggle" data-playing={playing} aria-label={`${playing ? "Pause" : "Play"} ${label ?? "video"}`} aria-pressed={playing} onClick={toggle}>
      <span className="loop-video-play">{playing ? <Pause /> : <Play />}</span>
    </button>}
    {label && chip && <span className="loop-video-label">{label}</span>}
  </div>;
}
