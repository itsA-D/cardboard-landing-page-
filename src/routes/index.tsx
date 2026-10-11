import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, Check, ChevronDown, Clapperboard, Paperclip, Plus, Send, Sparkles, WandSparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SmartHeader } from "@/components/SmartHeader";
import { MacWindow } from "@/components/MacWindow";
import { SilkBackground, type SilkState } from "@/components/SilkBackground";
import { ThemeDock } from "@/components/ThemeDock";
import { HeroVideos } from "@/components/HeroVideos";
import { CardboardFooter } from "@/components/CardboardFooter";
import { ScrollShowcase } from "@/components/ScrollShowcase";
import { ShowcaseMosaic } from "@/components/ShowcaseMosaic";
import { FeatureShowcase } from "@/components/FeatureShowcase";
import { FinalCtaTiles } from "@/components/FinalCtaTiles";
import { LiveHeadline } from "@/components/LiveHeadline";
import { PageProgress } from "@/components/PageProgress";
import { DescribeDemo, DirectDemo, ShareDemo } from "@/components/ThreeStepDemos";
import { faqs, features, heroChips, plans } from "@/lib/cardboard-content";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Cardboard — Make any video you can think of" },
    { name: "description", content: "Describe your edit, and Cardboard's AI cuts, captions, reframes, and composes your video, in your browser or on your Mac." },
    { property: "og:title", content: "Cardboard — Make any video you can think of" },
    { property: "og:description", content: "Create your next video with Cardboard's agentic AI editor. No editing experience needed." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Index() {
  const silk = useRef<SilkState>({ dark: true, burst: 0 });
  const [prompt, setPrompt] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [improved, setImproved] = useState(false);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const choosePrompt = (value: string, scroll = false) => {
    setPrompt(value); setImproved(false);
    if (scroll) document.getElementById("top")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    textarea.current?.focus({ preventScroll: true });
  };
  const improvePrompt = () => {
    const text = prompt.trim() || "Turn my product demo into a launch video";
    setPrompt(`${text.replace(/[.!?]+$/, "")}. Build a clear story, tighten the pacing, add readable captions, and finish with a strong closing shot.`);
    setImproved(true); textarea.current?.focus();
  };
  const submitPrompt = () => {
    const destination = new URL("https://cardboard.ai/signup");
    if (prompt.trim()) destination.searchParams.set("prompt", prompt.trim());
    window.location.assign(destination.href);
  };
  const icons = [Sparkles, Clapperboard, Send];
  return <>
    <SilkBackground state={silk} />
    <PageProgress />
    <SmartHeader />
    <main className="page-content">
      <section className="hero" id="top">
        <HeroVideos />
        <LiveHeadline />
        <p className="hero-sub hero-enter">Describe your edit, and Cardboard's AI cuts, captions, reframes, and composes your video, in your browser or on your Mac.</p>
        <form className="prompt-box glass hero-enter" onSubmit={(e) => { e.preventDefault(); submitPrompt(); }}>
          <textarea ref={textarea} aria-label="Describe your video" placeholder="Turn my product demo into a launch video" value={prompt} onChange={(e) => { setPrompt(e.target.value); setImproved(false); }} />
          {attachment && <div className="attachment"><Paperclip size={12} /><span>{attachment.name}</span><Button type="button" variant="quiet" size="icon" className="icon-button" aria-label="Remove attachment" title="Remove attachment" onClick={() => { setAttachment(null); if (fileInput.current) fileInput.current.value = ""; }}><X /></Button></div>}
          <div className="prompt-toolbar"><div className="prompt-options"><Button type="button" variant="quiet" size="icon" className="icon-button" aria-label="Attach footage" title="Attach footage" onClick={() => fileInput.current?.click()}><Plus /></Button><input ref={fileInput} type="file" accept="video/*,image/*,audio/*" className="hidden" onChange={(e) => setAttachment(e.target.files?.[0] ?? null)} /><label className="auto-select"><select aria-label="Video format" defaultValue="Auto"><option>Auto</option><option>16:9</option><option>9:16</option><option>1:1</option></select><ChevronDown /></label></div><div className="prompt-send"><Button type="button" variant="quiet" className="improve-button" title="Improve prompt" disabled={improved} onClick={improvePrompt}><WandSparkles />Improve prompt</Button><Button type="submit" variant="solid" size="icon" className="icon-button" aria-label="Create video" title="Create video"><ArrowUp /></Button></div></div>
        </form>
        <div className="prompt-chips hero-enter">{heroChips.map((chip) => <Button variant="chip" key={chip} onClick={() => choosePrompt(chip)}>{chip}</Button>)}</div>
      </section>
      <section className="content-section showcase-section" id="showcase"><div className="section-heading"><p className="section-kicker">Made with Cardboard</p><h2>Remarkable video quality</h2></div><ShowcaseMosaic /></section>
      <section className="content-section" id="how-it-works"><div className="section-heading"><h2>Your first video in three steps</h2><p>Describe it, direct it, and share it. Here's how your first cut comes together.</p></div><div className="steps-grid">
        <article className="step-item"><DescribeDemo onPrompt={(value) => choosePrompt(value, true)} /><span className="step-number">01</span><h3>Describe it</h3><p>Use a prompt, your footage, or both, and Cardboard builds your editable first cut.</p></article>
        <article className="step-item"><DirectDemo /><span className="step-number">02</span><h3>Direct it</h3><p>Refine the first cut through simple chat requests or right on the timeline.</p></article>
        <article className="step-item"><ShareDemo /><span className="step-number">03</span><h3>Share it</h3><p>Send a link to your team for feedback, or export the finished video.</p></article>
      </div></section>
      <section className="content-section" id="features"><div className="section-heading"><h2>Everything you need to make videos</h2><p>Build the story, shape the edit, then share or export it, all in one editor.</p></div><FeatureShowcase /><div className="feature-grid">{features.map((feature, i) => { const Icon = icons[i] ?? Sparkles; return <article className="feature-card glass" key={feature.title}><Icon className="feature-icon" /><h3>{feature.title}</h3><ul>{feature.items.map((item) => <li key={item}>{item}</li>)}</ul></article>; })}</div></section>
      <section className="content-section desktop-section" id="desktop"><div className="desktop-copy"><h2>Make videos the way you do everything else</h2><p>Create directly in Cardboard, use its agent, or connect your agents to bring your project to life.</p><ul>{["Cardboard can connect to Claude Code and Codex.", "Users can work in Cardboard directly or through their agents.", "Lite is free on Apple Silicon because processing runs locally."].map((item) => <li key={item}><Check />{item}</li>)}</ul><Button variant="glass" asChild><a href="https://cardboard.ai/desktop">Learn more<ArrowUpRight /></a></Button></div><MacWindow /></section>
      <ScrollShowcase />
      <section className="content-section" id="pricing"><div className="section-heading"><h2>Pricing for every stage of editing</h2><p>Every plan includes the full editing suite.<br />Launch pricing, up to 78% off your first month.</p></div><div className="pricing-grid">{plans.map((plan) => <article key={plan.name} className={`pricing-card glass${plan.name === "Creator" ? " recommended" : ""}`}>{plan.name === "Creator" && <span className="recommended-label">Recommended</span>}<h3>{plan.name}</h3><div className="price">${plan.first}<span>first month</span></div><p className="renewal">then ${plan.monthly}/mo <s>(was ${plan.was})</s></p><Button variant={plan.name === "Creator" ? "solid" : "glass"} className="plan-cta" asChild><a href="https://cardboard.ai/signup">Get started<ArrowUpRight /></a></Button><ul>{plan.items.map((item) => <li key={item}><Check />{item}</li>)}</ul></article>)}</div><div className="compare-plans"><Button variant="glass" asChild><a href="https://cardboard.ai/pricing">Compare all plans<ArrowUpRight /></a></Button></div></section>
      <section className="content-section faq-section" id="faq"><div className="section-heading"><h2>Frequently asked questions</h2></div><div className="faq-list glass">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<Plus /></summary><p>{answer}</p></details>)}</div></section>
      <section className="content-section final-section"><div className="final-cta glass"><FinalCtaTiles /><h2>Get started with one prompt.</h2><Button variant="solid" asChild><a href="https://cardboard.ai/signup">Get started<ArrowUpRight /></a></Button><p>Launch pricing on every plan. Cancel anytime.</p></div></section>
      <CardboardFooter />
    </main>
    <ThemeDock state={silk} />
  </>;
}
