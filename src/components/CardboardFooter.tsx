import { Heart, Instagram, Linkedin } from "lucide-react";
import { useId, useRef, type PointerEvent } from "react";
import { Button } from "@/components/ui/button";
import { footerLinks } from "@/lib/cardboard-content";

const groups = [
  { title: "Product", labels: ["Pricing", "Changelog", "Status"] },
  { title: "Legal", labels: ["Privacy", "Terms of Service"] },
  { title: "Company", labels: ["Blog", "Careers", "Hard problems", "Y Combinator", "Contact"] },
];

export function CardboardFooter() {
  const lightId = useId().replace(/:/g, "");
  const light = useRef<SVGRadialGradientElement>(null);
  const moveLight = (event: PointerEvent<SVGSVGElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    light.current?.setAttribute("cx", String((event.clientX - bounds.left) / bounds.width * 1100));
    light.current?.setAttribute("cy", String((event.clientY - bounds.top) / bounds.height * 245));
  };
  return <footer className="cardboard-footer">
    <div className="footer-inner">
      <div className="footer-ruler" aria-hidden="true" />
      <div className="footer-top">
        <div className="footer-intro">
          <p>Create stunning<br />content 10x faster<br />with our agentic<br />video editor.</p>
          <nav className="footer-socials" aria-label="Social media">
            <Button variant="quiet" size="icon" asChild><a href="https://x.com/usecardboard" aria-label="Cardboard on X" title="X"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 4h4.5L20 20h-4.5L4 4Zm0 16L20 4" stroke="currentColor" strokeWidth="1.7" /></svg></a></Button>
            <Button variant="quiet" size="icon" asChild><a href="https://www.instagram.com/usecardboard" aria-label="Cardboard on Instagram" title="Instagram"><Instagram /></a></Button>
            <Button variant="quiet" size="icon" asChild><a href="https://www.linkedin.com/company/cardboardinc" aria-label="Cardboard on LinkedIn" title="LinkedIn"><Linkedin /></a></Button>
          </nav>
        </div>
        {groups.map((group) => <nav className="footer-group" aria-label={group.title} key={group.title}>
          <h3>{group.title}</h3>
          {group.labels.map((label) => {
            const link = footerLinks.find(([name]) => name === label);
            return link ? <a href={link[1]} key={label}>{label}</a> : null;
          })}
        </nav>)}
      </div>
      <div className="footer-wordmark" aria-label="Cardboard">
        <svg viewBox="0 0 1100 245" role="img" aria-label="Cardboard" onPointerMove={moveLight}>
          <defs><radialGradient ref={light} id={lightId} gradientUnits="userSpaceOnUse" cx="550" cy="120" r="210"><stop className="wordmark-light-stop" offset="0" /><stop className="wordmark-light-stop" offset=".35" stopOpacity=".75" /><stop className="wordmark-light-stop" offset="1" stopOpacity="0" /></radialGradient></defs>
          <text x="550" y="199" textAnchor="middle">Cardboard</text>
          <text className="wordmark-light" x="550" y="199" textAnchor="middle" fill={`url(#${lightId})`} aria-hidden="true">Cardboard</text>
        </svg>
      </div>
      <div className="footer-bottom"><span>© 2026 Cardboard Inc. All rights reserved.</span><span className="footer-made">Made with <Heart aria-label="love" /> in SF</span></div>
    </div>
  </footer>;
}