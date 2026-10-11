export function CardboardMark() {
  return <svg className="brand-mark" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M4 10 16 4l12 6v13l-12 6-12-6V10Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="m4 10 12 6 12-6M16 16v13M10 7l12 6v7l-5 2" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>;
}
export function CardboardBrand() {
  return <a href="#top" className="brand" aria-label="Cardboard home"><CardboardMark /><span>Cardboard</span></a>;
}