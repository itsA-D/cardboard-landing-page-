// Remote marketing media for the Cardboard landing page.
// Hosted by Cardboard; hotlinking is permitted (verified). Every consumer must
// degrade to the navy gradient fallback if a file fails to load.

const ASSETS = "https://assets.cardboard.ai/marketing";
const IMAGES = "https://www.cardboard.ai/images/marketing";
const USE = "https://assets.usecardboard.com/marketing";

export type MediaClip = { label: string; src: string; poster?: string };

export const heroCards: (MediaClip & { shape: "portrait" | "landscape" })[] = [
  { label: "Keyframed Portal", src: `${ASSETS}/prompt-hero/key-framed-portal.webm`, shape: "portrait" },
  { label: "Invisible Glass", src: `${ASSETS}/prompt-hero/invisible-glass-v2.webm`, shape: "landscape" },
  { label: "Product Ad", src: `${IMAGES}/prompt-hero/hero-shoe.webm`, shape: "portrait" },
  { label: "Paper Collage", src: `${IMAGES}/prompt-hero/hero-collage.webm`, shape: "portrait" },
  { label: "Talking Head", src: `${IMAGES}/prompt-hero/hero-talking.webm`, shape: "landscape" },
];

const showcase = (name: string) => `${ASSETS}/showcase/${name}`;

export const showcaseClips = {
  documentary: showcase("documentary.webm"),
  productLaunch: showcase("product-launch.webm"),
  ugc: showcase("ugc.webm"),
  vlogMirror: showcase("vlog-mirror.webm"),
  explainer: showcase("explainer.webm"),
  fredAgain: showcase("fred-again.webm"),
  gridParle: showcase("grid-parle.webm"),
  fordFerrari: showcase("ford-ferrari.webm"),
  vlog2: showcase("vlog-2.webm"),
  pro: showcase("pro.webm"),
  basketball: showcase("basketball.webm"),
  newYorkMatchCuts: showcase("new-york-match-cuts.webm"),
  brolls: showcase("brolls.webm"),
  kayeTalkingHead: showcase("kaye-talking-head.webm"),
  victoryLap: showcase("victory-lap.webm"),
  talkingHead: showcase("talking-head.webm"),
  egypt: showcase("egypt.webm"),
  gifMoving: showcase("gif-moving.webm"),
  macLaunch: showcase("mac-launch.webm"),
};

export const productLaunchPoster = `${ASSETS}/showcase/product-launch-poster.jpg`;

export const mosaicRowOne: MediaClip[] = [
  { label: "Documentary", src: showcaseClips.documentary },
  { label: "Vlog", src: showcaseClips.vlogMirror },
  { label: "UGC", src: showcaseClips.ugc },
  { label: "Explainer", src: showcaseClips.explainer },
];

export const mosaicRowTwo: MediaClip[] = [
  { label: "Fred Again", src: showcaseClips.fredAgain },
  { label: "Grid Parle", src: showcaseClips.gridParle },
  { label: "Ford Ferrari", src: showcaseClips.fordFerrari },
  { label: "Vlog 2", src: showcaseClips.vlog2 },
];

export const mosaicExtra: MediaClip[] = [
  { label: "Pro", src: showcaseClips.pro },
  { label: "Basketball", src: showcaseClips.basketball },
  { label: "New York", src: showcaseClips.newYorkMatchCuts },
  { label: "B-roll", src: showcaseClips.brolls },
  { label: "Product Launch", src: showcaseClips.productLaunch, poster: productLaunchPoster },
  { label: "Talking Head", src: showcaseClips.kayeTalkingHead },
  { label: "Victory Lap", src: showcaseClips.victoryLap },
  { label: "Interview", src: showcaseClips.talkingHead },
  { label: "Egypt", src: showcaseClips.egypt },
  { label: "Motion", src: showcaseClips.gifMoving },
  { label: "Mac Launch", src: showcaseClips.macLaunch },
];

export const categories = [
  ["Product Showcases", [showcaseClips.productLaunch, showcaseClips.macLaunch, showcaseClips.brolls, showcaseClips.pro]],
  ["Viral Trends", [showcaseClips.gridParle, showcaseClips.basketball, showcaseClips.newYorkMatchCuts, showcaseClips.gifMoving]],
  ["Launch Videos", [showcaseClips.macLaunch, showcaseClips.productLaunch, showcaseClips.brolls, showcaseClips.egypt]],
  ["UGC Ads", [showcaseClips.ugc, showcaseClips.kayeTalkingHead, showcaseClips.victoryLap, showcaseClips.basketball]],
  ["Explainers", [showcaseClips.explainer, showcaseClips.documentary, showcaseClips.talkingHead, showcaseClips.egypt]],
  ["Vlogs", [showcaseClips.vlog2, showcaseClips.vlogMirror, showcaseClips.fredAgain, showcaseClips.egypt]],
  ["Podcast Clips", [showcaseClips.talkingHead, showcaseClips.kayeTalkingHead, showcaseClips.fredAgain, showcaseClips.vlog2]],
] as const;

export const nextCategoryNames = categories.map(([name]) => name);
export const nextCategoryVideos = categories.map(([, clips]) => clips);

export const marketingImages = {
  headphones: `${IMAGES}/three-steps/headphones.png`,
  clip1: `${IMAGES}/prompt-hero/clip-1.png`,
  crowd: `${IMAGES}/three-steps/crowd.png`,
  neonPortrait: `${IMAGES}/three-steps/neon-portrait.png`,
  clip4: `${IMAGES}/prompt-hero/clip-4.png`,
  perfectStory: `${IMAGES}/three-steps/perfect-story.png`,
  mountains: `${IMAGES}/three-steps/mountains.png`,
  editorScreen: `${IMAGES}/three-steps/editor-screen.png`,
  goldenField: `${IMAGES}/three-steps/golden-field.png`,
  teammate1: `${IMAGES}/three-steps/teammate-1.png`,
  teammate2: `${IMAGES}/three-steps/teammate-2.png`,
  adidasPoster: `${IMAGES}/prompt-hero/product-adidas-poster.jpg`,
  podcastWide: `${IMAGES}/feature-chapters/podcast-wide.jpg`,
  podcastShort1: `${IMAGES}/feature-chapters/podcast-short-1.jpg`,
  podcastShort2: `${IMAGES}/feature-chapters/podcast-short-2.jpg`,
  podcastShort3: `${IMAGES}/feature-chapters/podcast-short-3.jpg`,
  documentaryPoster: `${IMAGES}/desktop-spotlight/documentary/poster.jpg`,
  documentaryFurnace: `${IMAGES}/desktop-spotlight/documentary/furnace-wide.jpg`,
  documentaryWeld: `${IMAGES}/desktop-spotlight/documentary/weld-11.jpg`,
  documentaryCnc: `${IMAGES}/desktop-spotlight/documentary/stock-cnc.jpg`,
  documentaryPlane: `${IMAGES}/desktop-spotlight/documentary/stock-plane.jpg`,
};

// web-clip-8 is not published on the CDN; keep the rest of the sequence.
export const timelineFrames = [
  marketingImages.crowd,
  marketingImages.neonPortrait,
  marketingImages.clip4,
  marketingImages.perfectStory,
  marketingImages.mountains,
];

export const webClips = Array.from({ length: 11 }, (_, index) => index + 1)
  .filter((index) => index !== 8)
  .map((index) => `${IMAGES}/feature-chapters/web-clip-${index}.jpg`);

export const libraryThumbs = [
  marketingImages.documentaryFurnace,
  marketingImages.documentaryWeld,
  marketingImages.documentaryCnc,
  marketingImages.documentaryPlane,
  marketingImages.documentaryPoster,
];

export const captionsClip = `${USE}/features-captions.webm`;
export const desktopPreview = `${ASSETS}/desktop/documentary-preview.webm`;

const getStarted = (name: string) => `${IMAGES}/get-started/${name}.mp4`;
export const finalCtaClips = [
  getStarted("clip-top-left"),
  getStarted("clip-top-center"),
  getStarted("clip-top-right"),
  getStarted("clip-bottom-left"),
  getStarted("clip-bottom-center"),
  getStarted("clip-bottom-right"),
];
