import { Search } from "lucide-react";
import { LoopVideo } from "./LoopVideo";
import { captionsClip, marketingImages, webClips } from "@/lib/marketing-media";

const podcastThumbs = [marketingImages.podcastWide, marketingImages.podcastShort1, marketingImages.podcastShort2, marketingImages.podcastShort3];

export function FeatureShowcase() {
  return <div className="feature-showcase" style={{ backgroundImage: `linear-gradient(180deg, rgba(11,27,47,.82), rgba(7,18,34,.94)), url(${marketingImages.mountains})` }}>
    <div className="feature-window glass">
      <div className="feature-search"><Search aria-hidden="true" /><span>moody mountain documentary</span></div>
      <div className="feature-thumbs">
        {webClips.map((src, index) => <figure className={`feature-thumb${index === 3 ? " is-best" : ""}`} key={src}>
          <img src={src} alt="" loading="lazy" decoding="async" />
          {index === 3 && <figcaption>Best match</figcaption>}
        </figure>)}
      </div>
    </div>
    <div className="feature-side">
      <div className="feature-phone"><LoopVideo src={captionsClip} label="Reframed 9:16 example" chip={false} objectPosition="center" /></div>
      <div className="feature-podcasts">
        {podcastThumbs.map((src, index) => <img className={`feature-podcast feature-podcast-${index + 1}`} src={src} alt="" loading="lazy" decoding="async" key={src} />)}
      </div>
    </div>
  </div>;
}
