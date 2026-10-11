import { Sparkles } from "lucide-react";
import { LoopVideo } from "./LoopVideo";
import { finalCtaClips } from "@/lib/marketing-media";
import { createVideoLimiter } from "@/lib/video-limit";

const limiter = createVideoLimiter(6);

export function FinalCtaTiles() {
  return <div className="final-tiles" aria-hidden="true">
    {finalCtaClips.map((src, index) => <LoopVideo key={src} src={src} chip={false} limiter={limiter} loadMargin="0px" className={`final-tile final-tile-${index + 1}`} />)}
    <Sparkles className="final-sparkle final-sparkle-1" />
    <Sparkles className="final-sparkle final-sparkle-2" />
    <Sparkles className="final-sparkle final-sparkle-3" />
  </div>;
}
