import { showcaseClips } from "./marketing-media";

export const showcase = [
  { label: "Documentary", url: showcaseClips.documentary },
  { label: "Product Launch", url: showcaseClips.productLaunch },
  { label: "UGC", url: showcaseClips.ugc },
  { label: "Vlog", url: showcaseClips.vlogMirror },
  { label: "Explainer", url: showcaseClips.explainer },
  { label: "Fred Again", url: showcaseClips.fredAgain },
];
export const heroChips = ["Launch Video", "UGC", "Explainer", "Montage", "Product Demo", "Podcast Clip"];
export const nextChips = ["Product Showcases", "Viral Trends", "Launch Videos", "UGC Ads", "Explainers", "Vlogs", "Podcast Clips"];
export const features = [
  { title: "Build the story", items: ["Generate video, images, music, and sound effects.", "Create motion graphics from a prompt.", "Clone your voice and narrate in it.", "Source relevant B-roll from the internet.", "Use reference links to videos you like."] },
  { title: "Shape the edit", items: ["Cut dead air, filler words, and retakes.", "Pull the best moments from long recordings.", "Captions, reframing, and chat-directed revisions."] },
  { title: "Work and publish your way", items: ["Connect Claude Code or Codex through the desktop app.", "Share work with a link.", "Render an hour of footage in about five minutes."] },
];
export const plans = [
  { name: "Lite", first: 5, monthly: 8, was: 10, items: ["Standard usage", "Generative AI not included", "Captions", "Reframing", "Video cleanup", "Motion graphics", "Full suite of editing tools"] },
  { name: "Starter", first: 9, monthly: 29, was: 40, items: ["2.5x usage", "400 generative credits (base models)", "Everything in Lite", "Unlimited exports", "NLE exports", "AI-generated music", "Stock footage"] },
  { name: "Creator", first: 30, monthly: 59, was: 100, items: ["10x usage", "1,500 generative credits (premium models)", "Everything in Starter", "Larger file support", "Voice cloning", "Web-sourced B-roll", "4K exports", "Direct clips from X, Instagram, YouTube, Vimeo and more", "Match text styles and audio from any video link"] },
  { name: "Pro", first: 89, monthly: 175, was: 250, items: ["30x usage", "5,000 generative credits (all models)", "Everything in Creator", "Priority processing", "Early access to advanced AI features", "Higher usage limits"] },
];
export const faqs = [
  ["Which devices does Cardboard work on?", "Any computer with Chrome, plus a Mac app for Apple Silicon. Phones and tablets aren't supported yet."],
  ["What's the difference between local and cloud processing?", "The Mac app edits and exports on your Mac; in the browser, that happens in the cloud. AI features like transcription and generation use the cloud either way."],
  ["Can I use my own AI agent?", "Yes. The Mac app works with Claude Code and Codex, and any agent can drive Cardboard through its CLI or MCP server."],
  ["Is my footage private?", "Yes. Your footage is yours, and nothing is shared until you create a link. In the Mac app, your projects stay on your Mac."],
  ["How do I share or export my video?", "Share a link people can watch and comment on, or export an MP4, MOV and more at up to 4K. You can also send the timeline to Premiere Pro, Final Cut Pro or DaVinci Resolve."],
];
export const footerLinks = [
  ["Pricing", "https://cardboard.ai/pricing"], ["Blog", "https://cardboard.ai/blog"],
  ["Changelog", "https://cardboard.ai/changelog"], ["Careers", "https://cardboard.ai/careers"],
  ["Status", "https://status.cardboard.ai"], ["Hard problems", "https://cardboard.ai/hard-problems"],
  ["Privacy", "https://cardboard.ai/privacy"], ["Y Combinator", "https://www.ycombinator.com/companies/cardboard"],
  ["Terms of Service", "https://cardboard.ai/terms"], ["Contact", "mailto:founders@cardboard.ai"],
];