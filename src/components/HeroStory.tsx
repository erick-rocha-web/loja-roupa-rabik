import { useRef } from "react";
import { images } from "../data/assets";
import { brand } from "../data/brand";
import { gsap, media, ScrollTrigger, useGSAP } from "../motion/gsap";
import { buildHeroTimeline, introTitle } from "../motion/hero";
import { fadeUp, maskReveal } from "../motion/reveals";
import "./HeroStory.css";

const FIG_SIZES = "(min-width: 1024px) 50vw, 90vw";

export function HeroStory() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const mm = gsap.matchMedia();

      mm.add(media.motion, () => {
        introTitle(el);
      });

      // Um único pin e uma única timeline, somente no modo cinema.
      mm.add(media.cinema, () => {
        el.classList.add("is-cinema");
        buildHeroTimeline(el);
        ScrollTrigger.sort();
        return () => el.classList.remove("is-cinema");
      });

      // Sequência editorial vertical curta (mobile e desktop baixo), sem pin.
      mm.add(media.compactMotion, () => {
        const q = gsap.utils.selector(el);
        const seq = q(".hero__sequence")[0];
        if (!seq) return;
        maskReveal(q(".seq__panel"), seq, "bottom", { duration: 0.6 });
        fadeUp(q(".seq__fig, .seq figcaption, .hero__sequence-intro"), seq, { y: 20, stagger: 0.1 });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section className="hero" id="inicio" ref={root} aria-labelledby="hero-title">
      <div className="hero__stage">
        <div className="hero__bg" aria-hidden="true">
          <img
            src={images.cenario.src}
            srcSet={images.cenario.srcSet}
            sizes="100vw"
            width={images.cenario.width}
            height={images.cenario.height}
            alt=""
            fetchPriority="low"
          />
        </div>
        <div className="hero__wash" aria-hidden="true" />
        <div className="hero__dark cinema-only" aria-hidden="true" />
        <div className="hero__panel cinema-only" aria-hidden="true" />
        <div className="hero__slab hero__slab--orange" aria-hidden="true" />
        <div className="hero__slab hero__slab--olive cinema-only" aria-hidden="true" />

        <div className="hero__copy">
          <p className="eyebrow hero__kicker">
            {brand.name} · Streetwear conceitual
          </p>
          <h1 id="hero-title" className="hero__title">
            <span className="hero__line">
              <span>Seu estilo</span>
            </span>{" "}
            <span className="hero__line">
              <span>ocupa a rua.</span>
            </span>
          </h1>
          <p className="hero__support">Camadas, cores e referências para vestir do seu jeito.</p>
          <div className="hero__ctas">
            <a className="btn" href="#looks">
              Explorar os looks
            </a>
            <a className="text-link hero__secondary" href="#combinacao">
              Montar uma combinação
            </a>
          </div>
        </div>

        <p className="hero__meta" aria-hidden="true">
          <span>Em cena</span> Camadas em laranja · laranja, marfim e grafite
        </p>

        <figure className="hero__fig hero__fig--orange">
          <img
            src={images.personagemLaranja.src}
            srcSet={images.personagemLaranja.srcSet}
            sizes={FIG_SIZES}
            width={images.personagemLaranja.width}
            height={images.personagemLaranja.height}
            alt="Personagem ilustrada com jaqueta laranja, camiseta clara e calça cargo grafite, caminhando."
            fetchPriority="high"
          />
        </figure>
        <figure className="hero__fig hero__fig--blue cinema-only" aria-hidden="true">
          <img
            src={images.lookAzul.src}
            srcSet={images.lookAzul.srcSet}
            sizes={FIG_SIZES}
            width={images.lookAzul.width}
            height={images.lookAzul.height}
            alt=""
          />
        </figure>
        <figure className="hero__fig hero__fig--olive cinema-only" aria-hidden="true">
          <img
            src={images.lookOliva.src}
            srcSet={images.lookOliva.srcSet}
            sizes={FIG_SIZES}
            width={images.lookOliva.width}
            height={images.lookOliva.height}
            alt=""
          />
        </figure>

        <p className="hero__label hero__label--blue cinema-only" aria-hidden="true">
          <span className="eyebrow">Em cena</span>
          Oversized em azul
        </p>
        <div className="hero__trio cinema-only" aria-hidden="true">
          <p className="hero__trio-caption">
            <span className="eyebrow">Três looks, uma rua</span>
            Encontre a sua referência logo abaixo.
          </p>
          <span className="hero__trio-name" style={{ left: "20%" }}>
            Camadas em laranja
          </span>
          <span className="hero__trio-name" style={{ left: "50%" }}>
            Oversized em azul
          </span>
          <span className="hero__trio-name" style={{ left: "80%" }}>
            Oliva e jeans
          </span>
        </div>
      </div>

      {/* Sequência vertical: mobile, desktop baixo e movimento reduzido. Oculta no modo cinema. */}
      <div className="hero__sequence">
        <div className="hero__sequence-intro">
          <p className="eyebrow">Três looks, uma rua</p>
          <p className="hero__sequence-text">Azul e oliva entram em cena. Cada look é uma referência para explorar e salvar.</p>
        </div>
        <figure className="seq seq--blue">
          <div className="seq__panel" aria-hidden="true" />
          <img
            className="seq__fig"
            src={images.lookAzul.src}
            srcSet={images.lookAzul.srcSet}
            sizes="(min-width: 1024px) 30vw, 50vw"
            width={images.lookAzul.width}
            height={images.lookAzul.height}
            loading="lazy"
            alt="Personagem com camiseta azul oversized, jeans escuro e boné."
          />
          <figcaption>Oversized em azul</figcaption>
        </figure>
        <figure className="seq seq--olive">
          <div className="seq__panel" aria-hidden="true" />
          <img
            className="seq__fig"
            src={images.lookOliva.src}
            srcSet={images.lookOliva.srcSet}
            sizes="(min-width: 1024px) 30vw, 50vw"
            width={images.lookOliva.width}
            height={images.lookOliva.height}
            loading="lazy"
            alt="Personagem com camiseta oliva ampla, bermuda jeans escura e meias laranja."
          />
          <figcaption>Oliva e jeans</figcaption>
        </figure>
      </div>
    </section>
  );
}
