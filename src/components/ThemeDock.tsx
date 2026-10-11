import { useEffect, useState, type MutableRefObject, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SilkState } from "./SilkBackground";

export function ThemeDock({ state }: { state: MutableRefObject<SilkState> }) {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    let initial = window.matchMedia("(prefers-color-scheme: dark)").matches;
    try { const saved = localStorage.getItem("cardboard-theme"); if (saved === "dark" || saved === "light") initial = saved === "dark"; } catch { /* Storage is optional. */ }
    state.current.dark = initial;
    document.documentElement.dataset["theme"] = initial ? "dark" : "light";
    setDark(initial);
  }, [state]);
  const change = (value: boolean, event: MouseEvent<HTMLButtonElement>) => {
    if (value === dark) return;
    state.current.burst = 1.6;
    state.current.dark = value;
    const apply = () => {
      flushSync(() => setDark(value));
      document.documentElement.dataset["theme"] = value ? "dark" : "light";
      try { localStorage.setItem("cardboard-theme", value ? "dark" : "light"); } catch { /* Storage is optional. */ }
    };
    if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { apply(); return; }
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.detail === 0 ? rect.x + rect.width / 2 : event.clientX;
    const y = event.detail === 0 ? rect.y + rect.height / 2 : event.clientY;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const transition = document.startViewTransition(apply);
    void transition.ready.then(() => {
      document.documentElement.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] }, { duration: 1000, easing: "cubic-bezier(.6,0,.2,1)", pseudoElement: "::view-transition-new(root)" });
    }).catch(() => { /* Interrupted transitions already applied the theme. */ });
  };
  return <div className="theme-dock glass" role="group" aria-label="Color theme">
    <span className="dock-thumb" aria-hidden="true" />
    <Button variant="quiet" className="dock-button" aria-pressed={dark} onClick={(e) => change(true, e)}><Moon />Dark</Button>
    <Button variant="quiet" className="dock-button" aria-pressed={!dark} onClick={(e) => change(false, e)}><Sun />Light</Button>
  </div>;
}