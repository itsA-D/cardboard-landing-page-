import { useState } from "react";
import { Search } from "lucide-react";
import { LoopVideo } from "./LoopVideo";
import { captionsClip, marketingImages, webClips } from "@/lib/marketing-media";

const podcastThumbs = [marketingImages.podcastWide, marketingImages.podcastShort1, marketingImages.podcastShort2, marketingImages.podcastShort3];

export function FeatureShowcase() {
  const [slide, setSlide] = useState(0);
  const slides = 3;
  return <div className="feature-showcase" style={{ backgroundImage: `linear-gradient(180deg, rgba(11,27,47,.82), rgba(7,18,34,.94)), url(${marketingImages.mountains})` }}>
    <div className="feature-carousel">
      <div className="feature-track" style={{ transform: `translateX(-${slide * 100}%)` }}>
        <div className={`feature-slide feature-slide-broll${slide === 0 ? " is-active" : ""}`} aria-hidden={slide !== 0}>
          <div className="feature-slide-body">
            <div className="feature-search"><Search aria-hidden="true" /><span>moody mountain documentary</span></div>
            <div className="feature-thumbs">
              {webClips.map((src, index) => <img className="feature-thumb" src={src} alt="" loading="lazy" decoding="async" key={src} />)}
            </div>
            <div className="feature-best">Best match</div>
          </div>
        </div>
        <div className={`feature-slide feature-slide-podcast${slide === 1 ? " is-active" : ""}`} aria-hidden={slide !== 1}>
          <div className="feature-podcasts">
            {podcastThumbs.map((src, index) => <img className={`feature-podcast feature-podcast-${index + 1}`} src={src} alt="" loading="lazy" decoding="async" key={src} />)}
          </div>
        </div>
        <div className={`feature-slide feature-slide-phone${slide === 2 ? " is-active" : ""}`} aria-hidden={slide !== 2}>
          <div className="feature-phone"><LoopVideo src={captionsClip} label="Reframed 9:16 example" chip={false} objectPosition="center" /></div>
        </div>
      </div>
    </div>
    <div className="feature-dots" role="group" aria-label="Chapters">
      {Array.from({ length: slides }, (_, index) => <button key={index} type="button" className={`feature-dot${slide === index ? " is-active" : ""}`} aria-label={`Chapter ${index + 1}`} aria-pressed={slide === index} onClick={() => setSlide(index)} />)}
    </div>
  </div>;
}