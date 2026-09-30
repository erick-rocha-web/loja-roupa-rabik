import { useLayoutEffect, useRef, useState } from "react";
import { images } from "../data/assets";
import { filterLooks, lookFilters, type Look, type LookFilter } from "../data/looks";
import { gsap, media, prefersReducedMotion, useGSAP } from "../motion/gsap";
import { fadeUp } from "../motion/reveals";
import { useSelection } from "../state/SelectionProvider";
import "./Lookbook.css";

export function Palette({ look }: { look: Pick<Look, "palette"> }) {
  return (
    <ul className="swatches" role="list" aria-label="Paleta">
      {look.palette.map((s) => (
        <li key={s.name} className="swatch" style={{ ["--sw" as string]: s.hex }}>
          {s.name}
        </li>
      ))}
    </ul>
  );
}

export function SaveLookButton({ look, className = "" }: { look: Look; className?: string }) {
  const { has, toggle, announce } = useSelection();
  const ref = { kind: "look", id: look.id } as const;
  const saved = has(ref);
  return (
    <button
      type="button"
      className={`btn btn--ghost btn--small save-btn ${className}`}
      aria-pressed={saved}
      onClick={() => {
        toggle(ref);
        announce(saved ? `${look.title} removida da seleção.` : `${look.title} salva na seleção.`);
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        {saved ? (
          <path d="M2 7.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2.2" />
        ) : (
          <path d="M3 1h8v12l-4-3-4 3z" fill="none" stroke="currentColor" strokeWidth="1.8" />
        )}
      </svg>
      {saved ? "Referência salva" : "Salvar referência"}
    </button>
  );
}

function LookCard({ look, role, onOpen }: { look: Look; role: "dominant" | "side"; onOpen: (id: Look["id"]) => void }) {
  const img = images[look.image];
  return (
    <article className={`look-card look-card--${role} family-${look.family}`} aria-labelledby={`${look.id}-title`}>
      <div className="look-card__media">
        <span className="look-card__shape" aria-hidden="true" />
        <img
          src={img.src}
          srcSet={img.srcSet}
          sizes={role === "dominant" ? "(min-width: 1024px) 40vw, 90vw" : "(min-width: 1024px) 20vw, 40vw"}
          width={img.width}
          height={img.height}
          alt={look.alt}
          loading="lazy"
        />
      </div>
      <div className="look-card__body">
        <p className="eyebrow look-card__tags">{look.tags.join(" · ")}</p>
        <h3 id={`${look.id}-title`} className="look-card__title">
          {look.title}
        </h3>
        <Palette look={look} />
        <div className="look-card__actions">
          <button type="button" className="btn btn--small" onClick={() => onOpen(look.id)}>
            Ver composição
          </button>
          <SaveLookButton look={look} />
        </div>
      </div>
    </article>
  );
}

export function Lookbook({ onOpenLook }: { onOpenLook: (id: Look["id"]) => void }) {
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const reveal = useRef<gsap.core.Animation | null>(null);
  const [filter, setFilter] = useState<LookFilter>("Todos");
  const [shown, setShown] = useState<LookFilter>("Todos");
  const results = filterLooks(shown);

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);
      mm.add(media.motion, () => {
        fadeUp(q(".lookbook__head > *, .lookbook__filters"), root.current!, { y: 18 });
      });

      // Desktop: os três looks entram por planos diferentes, ligados à rolagem, e se
      // assentam na composição editorial. Ao completar, a cena é encerrada e os cards
      // ficam estáveis (sem transformações residuais) para explorar, abrir e salvar.
      mm.add(media.desktopMotion, () => {
        const cards = q(".look-card");
        const planes = [
          { y: 110, scale: 0.9 }, // plano de fundo que avança
          { x: 90, y: -50 }, // plano lateral
          { y: 170, scale: 1.06 }, // primeiro plano que recua
        ];
        const inner = q(".look-card__shape, .look-card__media img");
        const settle = () => {
          const tl = reveal.current;
          if (!tl) return;
          tl.scrollTrigger?.kill();
          tl.progress(1).kill();
          reveal.current = null;
          gsap.set([...cards, ...inner], { clearProps: "transform,opacity" });
        };
        const tl = gsap.timeline({
          defaults: { ease: "power2.out", duration: 1 },
          scrollTrigger: {
            trigger: grid.current,
            start: "top 92%",
            end: "top 32%",
            scrub: 0.7,
            onUpdate: (self) => self.progress > 0.995 && settle(),
          },
        });
        cards.forEach((card, i) => {
          const at = i * 0.2;
          tl.from(card, { ...planes[i % 3], opacity: 0 }, at)
            .from(card.querySelector(".look-card__shape"), { xPercent: i === 1 ? 70 : -70 }, at)
            // Escala a partir da base: a figura nunca é cortada durante a entrada.
            .from(card.querySelector(".look-card__media img"), { scale: 0.9, transformOrigin: "50% 100%" }, at + 0.1);
        });
        reveal.current = tl;
        return () => {
          reveal.current = null;
        };
      });

      mm.add(media.mobileMotion, () => {
        reveal.current = fadeUp(q(".look-card"), grid.current!, { y: 24, stagger: 0.1 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // Crossfade discreto: some → troca resultados → reaparece. Cliques rápidos cancelam o anterior.
  const changeFilter = contextSafe((next: LookFilter) => {
    setFilter(next);
    // O reveal inicial nunca pode deixar cards invisíveis depois de uma troca de filtro.
    if (reveal.current) {
      reveal.current.scrollTrigger?.kill();
      reveal.current.progress(1).kill();
      reveal.current = null;
      gsap.set(grid.current!.querySelectorAll(".look-card, .look-card__shape, .look-card__media img"), {
        clearProps: "transform,opacity",
      });
    }
    const el = grid.current!;
    gsap.killTweensOf(el);
    if (prefersReducedMotion()) {
      setShown(next);
      return;
    }
    gsap.to(el, { opacity: 0, y: 6, duration: 0.14, ease: "power1.in", onComplete: () => setShown(next) });
  });

  useLayoutEffect(() => {
    const el = grid.current;
    if (!el || prefersReducedMotion()) return;
    gsap.killTweensOf(el);
    gsap.to(el, { opacity: 1, y: 0, duration: 0.24, ease: "power2.out", clearProps: "opacity,transform" });
  }, [shown]);

  return (
    <section className="lookbook" id="looks" ref={root} aria-labelledby="looks-title">
      <div className="container">
        <div className="lookbook__head">
          <p className="eyebrow lookbook__kicker">Lookbook conceitual</p>
          <h2 id="looks-title" className="section-title">
            Encontre sua próxima referência
          </h2>
          <p className="lede">Três looks ilustrados para observar cor, proporção e camadas. Abra a composição e salve o que combina com você.</p>
        </div>

        <div className="lookbook__filters" role="group" aria-label="Filtrar looks por categoria">
          {lookFilters.map((f) => (
            <button
              key={f}
              type="button"
              className="chip"
              aria-pressed={filter === f}
              onClick={() => filter !== f && changeFilter(f)}
            >
              {f}
            </button>
          ))}
          <p className="lookbook__count" aria-live="polite">
            {results.length === 1 ? "1 look" : `${results.length} looks`}
          </p>
        </div>

        <div className={`lookbook__grid lookbook__grid--${results.length}`} ref={grid}>
          {results.map((look, i) => (
            <LookCard key={look.id} look={look} role={i === 0 ? "dominant" : "side"} onOpen={onOpenLook} />
          ))}
        </div>
      </div>
    </section>
  );
}
