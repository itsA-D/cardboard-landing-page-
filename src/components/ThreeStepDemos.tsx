import { ArrowUp, Check, Download, Link2, MessageSquare, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardboardMark } from "./CardboardBrand";
import { marketingImages, timelineFrames } from "@/lib/marketing-media";

function MiniImage({ src, alt = "" }: { src: string; alt?: string }) {
  return <img src={src} alt={alt} loading="lazy" decoding="async" />;
}

export function DescribeDemo({ onPrompt }: { onPrompt: (value: string) => void }) {
  return <div className="step-demo describe-demo" aria-label="Prompt and footage example">
    <div className="describe-composer">
      <p>Turn my product demo into a launch video</p>
      <div className="describe-controls"><div className="demo-files"><span><MiniImage src={marketingImages.headphones} />demo.mp4</span><span><MiniImage src={marketingImages.clip1} />b-roll.mov</span></div><Button variant="solid" size="icon" className="demo-send" title="Use this prompt" aria-label="Use this example prompt" onClick={() => onPrompt("Turn my product demo into a launch video")}><ArrowUp /></Button></div>
    </div>
  </div>;
}

export function DirectDemo() {
  return <div className="step-demo direct-demo" aria-label="Animated timeline with faster intro and captions">
    <div className="demo-request">Make the intro faster and add captions</div>
    <div className="demo-response"><span className="demo-done"><Check size={10} /></span>Done. Intro trimmed and captions added.</div>
    <div className="demo-editor">
      <div className="demo-ruler">{["0:00", "0:01", "0:02", "0:03", "0:04", "0:05"].map((time) => <span key={time}>{time}</span>)}</div>
      <div className="demo-clips">{timelineFrames.map((frame, index) => <div key={frame} className={index === 0 ? "trimmed-clip" : ""}><MiniImage src={frame} />{index === 0 && <span className="trim-label">4s → 2s</span>}</div>)}</div>
      <div className="demo-captions"><span>Caption</span><span>Caption</span><span>Caption</span></div>
      <div className="demo-audio"><span>soundtrack.mp3</span><svg viewBox="0 0 340 24" preserveAspectRatio="none" aria-hidden="true"><path d="M0 12 5 9 10 13 15 5 20 7 25 3 30 8 35 6 40 10 45 5 50 8 55 4 60 9 65 7 70 11 75 8 80 6 85 3 90 8 95 5 100 9 105 7 110 11 115 7 120 8 125 4 130 9 135 6 140 10 145 8 150 4 155 6 160 3 165 9 170 7 175 10 180 5 185 8 190 6 195 9 200 4 205 7 210 10 215 5 220 3 225 8 230 6 235 10 240 7 245 4 250 8 255 6 260 3 265 7 270 10 275 6 280 8 285 4 290 7 295 10 300 6 305 8 310 4 315 7 320 9 325 5 330 8 335 9 340 12 335 15 330 16 325 19 320 15 315 17 310 20 305 16 300 18 295 14 290 17 285 20 280 16 275 18 270 14 265 17 260 21 255 18 250 16 245 20 240 17 235 14 230 18 225 16 220 21 215 19 210 14 205 17 200 20 195 15 190 18 185 16 180 19 175 14 170 17 165 15 160 21 155 18 150 20 145 16 140 14 135 18 130 15 125 20 120 16 115 17 110 13 105 17 100 15 95 19 90 16 85 21 80 18 75 16 70 13 65 17 60 15 55 20 50 16 45 19 40 14 35 18 30 16 25 21 20 17 15 19 10 13 5 15Z" fill="currentColor" /></svg></div>
      <div className="demo-playhead" />
    </div>
  </div>;
}

export function ShareDemo() {
  return <div className="step-demo share-demo" aria-label="Sharing, team comments and MP4 export example">
    <div className="share-ring share-ring-one" /><div className="share-ring share-ring-two" /><div className="share-ring share-ring-three" />
    <div className="share-center"><CardboardMark /></div>
    <span className="demo-avatar avatar-left"><MiniImage src={marketingImages.teammate1} alt="Leo" /></span>
    <span className="demo-avatar-caption avatar-left-caption">Leo · Viewing</span>
    <span className="demo-avatar avatar-right"><MiniImage src={marketingImages.teammate2} alt="Maya" /></span>
    <span className="demo-avatar-caption avatar-right-caption">Maya · Viewing</span>
    <span className="share-tag tag-export"><Download />Export MP4</span>
    <span className="share-tag tag-link"><Link2 />Link copied</span>
    <span className="share-tag tag-comments"><MessageSquare />3 comments</span>
    <span className="share-tag tag-team"><Users />Shared with team</span>
  </div>;
}
