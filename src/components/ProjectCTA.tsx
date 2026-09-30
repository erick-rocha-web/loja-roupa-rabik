import { useRef } from "react";
import { brand } from "../data/brand";
import { buildWhatsAppLink, messages } from "../lib/whatsapp";
import { gsap, media, useGSAP } from "../motion/gsap";
import { fadeUp } from "../motion/reveals";
import "./ProjectCTA.css";

export function ProjectCTA() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        gsap.from(q(".cta__line"), {
          scaleX: 0,
          transformOrigin: "0% 50%",
          duration: 0.6,
          ease: "power3.inOut",
          clearProps: "transform",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
        fadeUp(q(".cta__inner > *"), el, { y: 16, stagger: 0.07, delay: 0.15 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section className="cta on-orange" aria-labelledby="cta-title" ref={root}>
      <span className="cta__line" aria-hidden="true" />
      <div className="container cta__inner">
        <p className="eyebrow">Projeto conceitual · {brand.author}</p>
        <h2 id="cta-title" className="cta__title">
          Essa experiência pode ganhar a sua marca.
        </h2>
        <p className="cta__text">
          Projeto conceitual desenvolvido pela {brand.author}. Podemos criar uma apresentação para a sua loja com identidade
          própria, material real e funcionalidades definidas para o seu negócio.
        </p>
        <div className="cta__actions">
          <a className="btn" href={buildWhatsAppLink(messages.project)} target="_blank" rel="noopener noreferrer">
            Quero um site assim
            <span className="sr-only"> (WhatsApp da Rabik, abre em nova aba)</span>
          </a>
          <a className="btn btn--ghost" href={buildWhatsAppLink(messages.examples)} target="_blank" rel="noopener noreferrer">
            Pedir outros exemplos
            <span className="sr-only"> (WhatsApp da Rabik, abre em nova aba)</span>
          </a>
        </div>
        <p className="cta__fine">Conversa com a {brand.author} sobre desenvolvimento de sites, pelo WhatsApp. Não é um canal de venda de roupas.</p>
      </div>
    </section>
  );
}
