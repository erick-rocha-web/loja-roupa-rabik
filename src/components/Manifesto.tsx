import { useRef } from "react";
import { images } from "../data/assets";
import { brand } from "../data/brand";
import { gsap, media, useGSAP } from "../motion/gsap";
import "./Manifesto.css";

export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();
      // O campo laranja atravessa a composição e, na passagem, revela o painel de texto.
      // A textura do pôster desloca-se discretamente em sentido contrário.
      mm.add(media.motion, () => {
        gsap.fromTo(
          q(".manifesto__poster"),
          { yPercent: -4, xPercent: 2, scale: 1.1 },
          {
            yPercent: 4,
            xPercent: -2,
            scale: 1.1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: el, start: "top 75%", end: "center 55%", scrub: 0.6 },
        });
        tl.fromTo(q(".manifesto__sweep"), { xPercent: -120, visibility: "visible" }, { xPercent: 230, duration: 1 }, 0)
          .fromTo(
            q(".manifesto__panel"),
            { clipPath: "inset(0% 100% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.45 },
            0.3,
          )
          .from(q(".manifesto__panel > *"), { y: 18, opacity: 0, stagger: 0.06, duration: 0.3, ease: "power2.out" }, 0.55);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section className="manifesto on-orange" id="conceito" ref={root} aria-labelledby="conceito-title">
      <img
        className="manifesto__poster"
        src={images.poster.src}
        srcSet={images.poster.srcSet}
        sizes="100vw"
        width={images.poster.width}
        height={images.poster.height}
        alt=""
        aria-hidden="true"
        loading="lazy"
      />
      <span className="manifesto__sweep" aria-hidden="true" />
      <div className="container manifesto__inner">
        <div className="manifesto__panel">
          <p className="eyebrow manifesto__kicker">O conceito</p>
          <h2 id="conceito-title" className="manifesto__title">
            Vista a sua fase
          </h2>
          <blockquote className="manifesto__quote">
            <p>Não existe um jeito único de ocupar a rua.</p>
            <p>Escolha a cor. Mude a camada. Faça a combinação ser sua.</p>
          </blockquote>
          <p className="manifesto__note">Manifesto criativo da loja-conceito {brand.name}.</p>
        </div>
      </div>
    </section>
  );
}
