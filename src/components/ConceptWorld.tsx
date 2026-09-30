import { useRef } from "react";
import { images } from "../data/assets";
import { gsap, media, useGSAP } from "../motion/gsap";
import { fadeUp } from "../motion/reveals";
import "./ConceptWorld.css";

export function ConceptWorld() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();
      // Profundidade em quatro planos ligados à rolagem: palavra ao fundo (lenta, horizontal),
      // painel amplo (máscara abrindo + zoom recuando), detalhe enquadrado (mais rápido, à frente)
      // e tipografia (deslocamento curto). Sem pin.
      mm.add(media.desktopMotion, () => {
        const scrub = { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 };
        gsap.fromTo(q(".world__word"), { xPercent: 6 }, { xPercent: -10, ease: "none", scrollTrigger: scrub });
        gsap.fromTo(q(".world__copy"), { y: 40 }, { y: -30, ease: "none", scrollTrigger: scrub });
        gsap.fromTo(q(".world__crop"), { y: 90 }, { y: -60, ease: "none", scrollTrigger: scrub });
        const open = { trigger: q(".world__wide")[0], start: "top 90%", end: "center 55%", scrub: 0.6 };
        gsap.fromTo(
          q(".world__wide"),
          { clipPath: "inset(14% 10% 14% 10%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.out", scrollTrigger: open },
        );
        gsap.fromTo(q(".world__wide img"), { scale: 1.22 }, { scale: 1.04, ease: "power2.out", scrollTrigger: open });
        gsap.fromTo(q(".world__crop img"), { scale: 2.6 }, { scale: 2.3, ease: "none", scrollTrigger: scrub });
      });

      mm.add(media.mobileMotion, () => {
        fadeUp(q(".world__copy > *, .world__wide, .world__crop"), el, { y: 16, stagger: 0.08 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section className="world" aria-labelledby="world-title" ref={root}>
      <p className="world__word" aria-hidden="true">
        Cenário
      </p>
      <div className="container world__grid">
        <div className="world__copy">
          <p className="eyebrow world__kicker">Universo visual</p>
          <h2 id="world-title" className="section-title">
            A rua como cenário
          </h2>
          <p className="lede world__lede">Um universo ilustrado para explorar estilo, proporção e movimento.</p>
        </div>
        <figure className="world__wide">
          <img
            src={images.cenario.src}
            srcSet={images.cenario.srcSet}
            sizes="(min-width: 1024px) 70vw, 100vw"
            width={images.cenario.width}
            height={images.cenario.height}
            alt="Cenário urbano ilustrado: muro de concreto claro com grande pintura laranja em diagonal e escadaria com corrimão à direita."
            loading="lazy"
          />
        </figure>
        <figure className="world__crop" aria-hidden="true">
          <img src={images.cenario.small} width={960} height={540} alt="" loading="lazy" />
        </figure>
      </div>
    </section>
  );
}
