import { LoopVideo } from "./LoopVideo";
import { mosaicExtra, mosaicRowOne, mosaicRowTwo } from "@/lib/marketing-media";
import { createVideoLimiter } from "@/lib/video-limit";

// One shared budget so the dense mosaic never decodes more than ~6 clips at once.
const limiter = createVideoLimiter(6);

export function ShowcaseMosaic() {
  return <div className="showcase-mosaic">
    <div className="mosaic-row mosaic-row-one">
      {mosaicRowOne.map((clip, index) => <LoopVideo key={clip.label} src={clip.src} poster={clip.poster} label={clip.label} chip={false} limiter={limiter} playOnClick={index === 0} className={`mosaic-tile mosaic-one-${index + 1}`} />)}
    </div>
    <div className="mosaic-row mosaic-row-two">
      {mosaicRowTwo.map((clip, index) => <LoopVideo key={clip.label} src={clip.src} poster={clip.poster} label={clip.label} chip={false} limiter={limiter} className={`mosaic-tile mosaic-two-${index + 1}`} />)}
    </div>
    <div className="mosaic-marquee" aria-hidden="true">
      <div className="mosaic-track">
        {[...mosaicExtra, ...mosaicExtra].map((clip, index) => <LoopVideo key={`${clip.label}-${index}`} src={clip.src} poster={clip.poster} chip={false} limiter={limiter} loadMargin="0px" className="mosaic-strip" />)}
      </div>
    </div>
  </div>;
}
