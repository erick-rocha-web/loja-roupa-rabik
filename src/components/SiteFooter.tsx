import { useRef } from "react";
import { brand, notices } from "../data/brand";
import { gsap, media, useGSAP } from "../motion/gsap";
import { fadeUp } from "../motion/reveals";
import { Wordmark } from "./Logo";
import "./SiteFooter.css";

export function SiteFooter() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        fadeUp(gsap.utils.selector(root)(".footer__grid > *"), root.current!, { y: 12, stagger: 0.06 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <footer className="footer" ref={root}>
      <div className="container footer__grid">
        <div className="footer__brand">
          <Wordmark tone="paper" />
          <p>{notices.footer}</p>
        </div>
        <div className="footer__credit">
          <p className="eyebrow">Autoria</p>
          <p>
            Design e desenvolvimento: {brand.author} · {brand.developer}
          </p>
          <a className="text-link" href={`mailto:${brand.email}`}>
            {brand.email}
          </a>
        </div>
        <div className="footer__end">
          <p className="footer__notice">{notices.top}</p>
          <a className="text-link" href="#inicio">
            Voltar ao topo
          </a>
        </div>
      </div>
    </footer>
  );
}
