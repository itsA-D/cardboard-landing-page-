import { ArrowUp, Film, Music2, Play, SlidersHorizontal, Type } from "lucide-react";
import { CardboardMark } from "./CardboardBrand";
import { LoopVideo } from "./LoopVideo";
import { desktopPreview, libraryThumbs, marketingImages } from "@/lib/marketing-media";

const projects = [
  { poster: marketingImages.adidasPoster, name: "Piece Runner launch" },
  { poster: marketingImages.documentaryPoster, name: "Makers documentary" },
];

export function MacWindow() {
  return <div className="mac-window glass" aria-label="Cardboard Mac editor preview">
    <div className="window-bar"><div className="window-dots"><i /><i /><i /></div><span>Product launch</span><SlidersHorizontal /></div>
    <div className="window-main">
      <div className="window-sidebar">
        <div className="mini-brand"><CardboardMark />Cardboard</div>
        <div className="window-projects">{projects.map((project) => <figure className="window-project" key={project.name}><img src={project.poster} alt="" loading="lazy" decoding="async" /><figcaption>{project.name}</figcaption></figure>)}</div>
        <div className="window-chat">Turn my product demo into a launch video</div>
        <div className="window-chat-reply">Make the intro faster and add captions</div>
        <div className="window-compose"><span>Describe your edit</span><ArrowUp /></div>
      </div>
      <div className="window-preview">
        <LoopVideo src={desktopPreview} label="Product launch video preview" chip={false} className="window-clip" /><Play className="preview-play" />
      </div>
    </div>
    <div className="window-library" aria-hidden="true">{libraryThumbs.map((src, index) => <img src={src} alt="" loading="lazy" decoding="async" key={src} data-index={index} />)}</div>
    <div className="timeline"><div className="timeline-controls"><span>▶ &nbsp; 00:12 / 00:30</span><span>− &nbsp; 100% &nbsp; +</span></div><div className="timeline-track"><Film /><span /><span /><span /><span /></div><div className="timeline-track"><Music2 /><span /><span /></div><div className="timeline-track"><Type /><span /><span /><span /></div></div>
  </div>;
}
