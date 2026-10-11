import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { initLenis } from "@/lib/scroll-experience";

// Fine 3px reading-guide across the top of the viewport, under the nav pill.
// The shared Lenis instance starts here so anchor jumps and the pinned
// showcase share one smooth-scroll engine.
export function PageProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 26 });
  useEffect(() => { initLenis(); }, []);
  return <motion.div className="page-progress" style={{ scaleX }} aria-hidden="true" />;
}