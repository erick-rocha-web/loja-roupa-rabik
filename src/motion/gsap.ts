import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Registro único dos plugins.
gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

export const media = {
  // Hero pinada: desktop largo, altura suficiente e sem preferência por movimento reduzido.
  cinema: "(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
  // Complemento exato do cinema entre quem aceita movimento: sequência vertical sem pin.
  compactMotion:
    "(prefers-reduced-motion: no-preference) and (max-width: 1023.98px), (prefers-reduced-motion: no-preference) and (max-height: 699.98px)",
  motion: "(prefers-reduced-motion: no-preference)",
  desktopMotion: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  mobileMotion: "(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)",
} as const;

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
