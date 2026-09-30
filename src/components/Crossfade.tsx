import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ImageAsset } from "../data/assets";
import { gsap, prefersReducedMotion } from "../motion/gsap";

type Layer = { key: string; image: ImageAsset; alt: string };

type Props = {
  image: ImageAsset;
  alt: string;
  sizes: string;
  className?: string;
  /** slide: a peça sai para a esquerda e a nova entra da direita; wipe: a nova entra por máscara. */
  mode?: "slide" | "wipe";
};

export const SWAP_DURATION = 0.28;

// Troca de imagem curta (~280 ms). Cliques rápidos: a camada mais recente vira a saída,
// as intermediárias são descartadas e o tween anterior é cancelado.
export function Crossfade({ image, alt, sizes, className = "", mode = "slide" }: Props) {
  const [layers, setLayers] = useState<Layer[]>([{ key: image.src, image, alt }]);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLayers((prev) => {
      const last = prev[prev.length - 1];
      if (last.key === image.src) return prev;
      const next = { key: image.src, image, alt };
      return prefersReducedMotion() ? [next] : [last, next];
    });
  }, [image, alt]);

  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el || layers.length < 2) return;
    const nodes = el.querySelectorAll<HTMLElement>(".xfade__layer");
    const outgoing = nodes[0];
    const incoming = nodes[nodes.length - 1];
    gsap.killTweensOf(nodes);
    gsap.set(outgoing, { clearProps: "all" });
    const tl = gsap.timeline({ onComplete: () => setLayers((prev) => prev.slice(-1)) });
    if (mode === "wipe") {
      tl.fromTo(
        incoming,
        { clipPath: "inset(0% 0% 0% 100%)", scale: 1.08 },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: SWAP_DURATION, ease: "power3.inOut", clearProps: "clipPath,transform" },
      );
    } else {
      tl.to(outgoing, { opacity: 0, x: -28, duration: SWAP_DURATION * 0.8, ease: "power2.in" }, 0).fromTo(
        incoming,
        { opacity: 0, x: 28, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: SWAP_DURATION, ease: "power2.out", clearProps: "opacity,transform" },
        0.04,
      );
    }
    return () => {
      tl.kill();
    };
  }, [layers, mode]);

  return (
    <div className={`xfade ${className}`} ref={wrap}>
      {layers.map((layer, i) => {
        const current = i === layers.length - 1;
        return (
          <img
            key={layer.key}
            className="xfade__layer"
            src={layer.image.src}
            srcSet={layer.image.srcSet}
            sizes={sizes}
            width={layer.image.width}
            height={layer.image.height}
            alt={current ? layer.alt : ""}
            aria-hidden={current ? undefined : true}
            loading="lazy"
          />
        );
      })}
    </div>
  );
}
