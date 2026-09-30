import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { images } from "../data/assets";
import {
  bases,
  combinationSummary,
  combinationTitle,
  complements,
  defaultCombination,
  getBase,
  getComplement,
  type BaseId,
  type ComplementId,
} from "../data/pieces";
import { gsap, media, prefersReducedMotion, useGSAP } from "../motion/gsap";
import { fadeUp, maskReveal } from "../motion/reveals";
import { useSelection } from "../state/SelectionProvider";
import { Crossfade, SWAP_DURATION } from "./Crossfade";
import { Palette } from "./Lookbook";
import "./LookComposer.css";

export type Combination = { baseId: BaseId; complementId: ComplementId };

type Props = {
  combo: Combination;
  onChange: (next: Combination) => void;
};

export function LookComposer({ combo, onChange }: Props) {
  const root = useRef<HTMLElement>(null);
  const { has, save, announce } = useSelection();
  const base = getBase(combo.baseId);
  const comp = getComplement(combo.complementId);
  const title = combinationTitle(combo.baseId, combo.complementId);
  const summary = combinationSummary(combo.baseId, combo.complementId);
  const ref = { kind: "combination", ...combo } as const;
  const saved = has(ref);

  // Anuncia apenas a escolha final (espera o usuário parar de trocar).
  const [spoken, setSpoken] = useState("");
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const t = setTimeout(() => setSpoken(`Combinação atual: ${title}.`), 450);
    return () => clearTimeout(t);
  }, [title]);

  // Acento: a cor anterior se retira por máscara revelando a nova; o nome editorial
  // troca por máscara de linha. Mesma duração da troca de peças.
  const prevAccent = useRef(base.accent);
  const [oldAccent, setOldAccent] = useState(base.accent);
  useLayoutEffect(() => {
    if (prevAccent.current === base.accent) return;
    const from = prevAccent.current;
    prevAccent.current = base.accent;
    if (prefersReducedMotion() || !root.current) return;
    setOldAccent(from);
    const q = gsap.utils.selector(root.current);
    gsap.killTweensOf(q(".composer__field-old, .composer__name span"));
    gsap.fromTo(
      q(".composer__field-old"),
      { clipPath: "inset(0% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 100%)", duration: SWAP_DURATION, ease: "power3.inOut" },
    );
    gsap.fromTo(
      q(".composer__name span"),
      { yPercent: 105 },
      { yPercent: 0, duration: SWAP_DURATION, ease: "power3.out", clearProps: "transform" },
    );
  }, [base.accent]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        const q = gsap.utils.selector(root);
        maskReveal(q(".composer__board"), root.current!, "left", { duration: 0.65 });
        fadeUp(q(".composer__head > *, .composer__controls > *"), root.current!, { y: 18, stagger: 0.06, delay: 0.1 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      className="composer"
      id="combinacao"
      ref={root}
      aria-labelledby="combinacao-title"
      style={{ ["--accent" as string]: base.accent, ["--tint" as string]: base.tint }}
    >
      <div className="container composer__layout">
        <div className="composer__head">
          <p className="eyebrow composer__kicker">Moodboard interativo</p>
          <h2 id="combinacao-title" className="section-title" tabIndex={-1}>
            Monte sua combinação
          </h2>
          <p className="lede">Escolha uma base e um complemento. As peças ficam lado a lado, como num quadro de referências.</p>
        </div>

        <div className={`composer__board family-${base.family}`}>
          <span className="composer__field" aria-hidden="true">
            <span className="composer__field-old" style={{ background: oldAccent }} />
          </span>
          <div className="composer__base">
            <Crossfade image={images[base.image]} alt={base.alt} sizes="(min-width: 1024px) 34vw, 60vw" />
          </div>
          <div className="composer__complement">
            <Crossfade
              image={images[comp.image]}
              alt={comp.alt}
              sizes="(min-width: 1024px) 26vw, 50vw"
              className="xfade--cover"
              mode="wipe"
            />
          </div>
          <p className="composer__name" aria-hidden="true">
            <span>{base.mood}</span>
          </p>
        </div>

        <div className="composer__controls">
          <fieldset className="composer__group">
            <legend>Escolha uma base</legend>
            <div className="composer__options">
              {bases.map((b) => (
                <label key={b.id} className="option">
                  <input
                    type="radio"
                    name="composer-base"
                    value={b.id}
                    checked={combo.baseId === b.id}
                    onChange={() => onChange({ ...combo, baseId: b.id })}
                  />
                  <img src={images[b.image].small} width="56" height="56" alt="" loading="lazy" />
                  <span>{b.title}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="composer__group">
            <legend>Escolha um complemento</legend>
            <div className="composer__options composer__options--two">
              {complements.map((c) => (
                <label key={c.id} className="option option--dark">
                  <input
                    type="radio"
                    name="composer-complement"
                    value={c.id}
                    checked={combo.complementId === c.id}
                    onChange={() => onChange({ ...combo, complementId: c.id })}
                  />
                  <img src={images[c.image].small} width="56" height="56" alt="" loading="lazy" />
                  <span>{c.title}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="composer__result">
            <p className="eyebrow">Sua combinação</p>
            <h3 className="composer__title">{title}</h3>
            <p className="composer__summary">{summary}</p>
            <Palette look={{ palette: [...base.palette, ...comp.palette.filter((p) => !base.palette.some((b) => b.name === p.name))] }} />
          </div>
          <p className="sr-only" aria-live="polite">
            {spoken}
          </p>

          <div className="composer__actions">
            <button
              type="button"
              className="btn"
              aria-pressed={saved}
              onClick={() => {
                if (saved) {
                  announce(`${title} já está na sua seleção.`);
                  return;
                }
                save(ref);
                announce(`${title} salva na seleção.`);
              }}
            >
              {saved ? "Combinação salva" : "Salvar combinação"}
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => {
                onChange(defaultCombination);
                announce("Escolhas restauradas: jaqueta laranja e tênis street.");
              }}
            >
              Restaurar escolhas
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
