import type { Transition } from "framer-motion";

export const SPRING: Transition = { type: "spring", stiffness: 220, damping: 26 };
export const EASE_OUT: [number, number, number, number] = [0.2, 0.7, 0.2, 1];