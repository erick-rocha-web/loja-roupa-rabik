import { useRef } from "react";
import { images } from "../data/assets";
import { gsap, media, useGSAP } from "../motion/gsap";
import { fadeUp, maskReveal } from "../motion/reveals";
import "./DetailEditorial.css";

// Cena curta: a jaqueta começa como protagonista e recua para dar espaço a tênis e acessórios.
// Fixação breve (≈0,9 viewport) somente no modo cinema; nos demais modos, composição estática.
export function DetailEditorial() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();

      mm.add(media.cinema, () => {
        const header = document.querySelector<HTMLElement>(".site-header");
        const headerH = () => header?.offsetHeight ?? 76;
        const jacket = q(".detail__jacket")[0];
        const sneakers = q(".detail__sneakers")[0];
        const acc = q(".detail__acc")[0];

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut", duration: 1 },
          scrollTrigger: {
            trigger: el,
            start: () => `top ${headerH()}px`,
            end: () => "+=" + Math.round(window.innerHeight * 0.9),
            pin: true,
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });

        // Estado inicial: jaqueta maior e deslocada ao centro-direita; painéis ocultos por máscara.
        tl.from(jacket, { xPercent: 30, scale: 1.2, transformOrigin: "50% 55%", duration: 1.6 }, 0)
          .from(q(".detail__halo"), { xPercent: -24, scale: 1.08, opacity: 0.4, duration: 1.6 }, 0)
          .fromTo(sneakers, { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, 0.35)
          .from(q(".detail__sneakers img"), { scale: 1.18, xPercent: 8, duration: 1.2 }, 0.35)
          .fromTo(acc, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, 0.8)
          .from(q(".detail__acc img"), { scale: 1.18, yPercent: 8, duration: 1.2 }, 0.8)
          .from(q(".detail__sneakers .detail__tag"), { autoAlpha: 0, x: 16, duration: 0.4 }, 1.2)
          .from(q(".detail__acc .detail__tag"), { autoAlpha: 0, y: 12, duration: 0.4 }, 1.6)
          .from(q(".detail__quote"), { autoAlpha: 0, y: 24, duration: 0.5 }, 1.7)
          .to({}, { duration: 0.2 });

        fadeUp(q(".detail__copy > *"), el, { y: 18 });
      });

      // Desktop sem pin (tela baixa): máscaras curtas ao entrar.
      mm.add("(min-width: 1024px) and (max-height: 699.98px) and (prefers-reduced-motion: no-preference)", () => {
        maskReveal(q(".detail__sneakers"), el, "right");
        maskReveal(q(".detail__acc"), el, "bottom", { delay: 0.15 });
        fadeUp(q(".detail__copy > *, .detail__quote"), el, { y: 18 });
      });

      mm.add(media.mobileMotion, () => {
        fadeUp(q(".detail__copy > *, .detail__frame, .detail__quote"), el, { y: 18, stagger: 0.08 });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section className="detail" aria-labelledby="detalhe-title" ref={root}>
      <div className="container detail__stage">
        <div className="detail__canvas">
          <div className="detail__copy">
            <p className="eyebrow detail__kicker">Editorial</p>
            <h2 id="detalhe-title" className="section-title">
              O detalhe muda tudo
            </h2>
          </div>

          <figure className="detail__frame detail__jacket">
            <span className="detail__halo" aria-hidden="true" />
            <img
              src={images.jaqueta.src}
              srcSet={images.jaqueta.srcSet}
              sizes="(min-width: 1024px) 40vw, 92vw"
              width={images.jaqueta.width}
              height={images.jaqueta.height}
              alt="Jaqueta laranja ilustrada, ampla, com bolsos de lapela e forro oliva."
              loading="lazy"
            />
            <figcaption className="detail__tag">Camadas</figcaption>
          </figure>

          <figure className="detail__frame detail__sneakers">
            <img
              src={images.tenis.src}
              srcSet={images.tenis.srcSet}
              sizes="(min-width: 1024px) 32vw, 92vw"
              width={images.tenis.width}
              height={images.tenis.height}
              alt="Par de tênis robustos ilustrados em marfim, grafite, oliva e laranja."
              loading="lazy"
            />
            <figcaption className="detail__tag detail__tag--light">Contraste</figcaption>
          </figure>

          <figure className="detail__frame detail__acc">
            <img
              src={images.acessorios.src}
              srcSet={images.acessorios.srcSet}
              sizes="(min-width: 1024px) 30vw, 92vw"
              width={images.acessorios.width}
              height={images.acessorios.height}
              alt="Acessórios ilustrados: boné grafite, corrente prateada, anéis e bolsa transversal laranja."
              loading="lazy"
            />
            <figcaption className="detail__tag detail__tag--light">Detalhes</figcaption>
          </figure>

          <p className="detail__quote">Uma cor. Um volume. Um detalhe que muda a composição.</p>
        </div>
      </div>
    </section>
  );
}
