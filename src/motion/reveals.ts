import { gsap } from "./gsap";

// Reveals das seções inferiores. Todos usam `once` e limpam as propriedades ao terminar,
// para que nenhum conteúdo fique preso em opacity 0. Não criam pin.

type Targets = gsap.TweenTarget;

const START = "top 88%";

export function fadeUp(targets: Targets, trigger: Element, opts: { y?: number; stagger?: number; delay?: number } = {}) {
  return gsap.from(targets, {
    opacity: 0,
    y: opts.y ?? 22,
    duration: 0.55,
    ease: "power2.out",
    stagger: opts.stagger ?? 0.08,
    delay: opts.delay ?? 0,
    clearProps: "opacity,transform",
    scrollTrigger: { trigger, start: START, once: true },
  });
}

export function maskReveal(
  targets: Targets,
  trigger: Element,
  from: "bottom" | "left" | "right" = "bottom",
  opts: { duration?: number; delay?: number } = {},
) {
  const clip = {
    bottom: "inset(100% 0% 0% 0%)",
    left: "inset(0% 100% 0% 0%)",
    right: "inset(0% 0% 0% 100%)",
  }[from];
  return gsap.fromTo(
    targets,
    { clipPath: clip },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: opts.duration ?? 0.65,
      delay: opts.delay ?? 0,
      ease: "power3.inOut",
      clearProps: "clipPath",
      scrollTrigger: { trigger, start: START, once: true },
    },
  );
}

// Parallax leve e limitado (px), associado à rolagem da própria seção.
export function parallax(target: Element | null, trigger: Element, amount: number) {
  if (!target) return;
  return gsap.fromTo(
    target,
    { y: amount },
    {
      y: -amount,
      ease: "none",
      scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: 0.6 },
    },
  );
}
