import { gsap } from "./gsap";

// Timeline principal da hero (modo "cinema"). Isolada: nenhuma outra seção importa este arquivo.
// Parâmetros documentados em docs/HERO.md. Os valores de posição são centros horizontais em
// fração da largura do viewport; o CSS posiciona o laranja em HERO.orangeBase e os demais no centro.

export const HERO = {
  scrollDistance: 1.9, // alturas de viewport adicionais de rolagem (pinSpacing padrão, sem altura manual)
  scrub: 0.8,
  orangeBase: 0.68,
  blueBase: 0.5,
  oliveBase: 0.5,
} as const;

// Durações relativas da timeline (total = 10 unidades = 100% do percurso).
const T = { recede: 2, blueIn: 4.2, trioIn: 7.2, resolve: 9, end: 10 } as const;

export function buildHeroTimeline(root: HTMLElement): gsap.core.Timeline {
  const q = gsap.utils.selector(root);
  const stage = q(".hero__stage")[0];
  const vw = () => window.innerWidth;
  // x relativo à posição de base definida no CSS.
  const toX = (target: number, base: number) => () => (target - base) * vw();

  const orange = q(".hero__fig--orange");
  const blue = q(".hero__fig--blue");
  const olive = q(".hero__fig--olive");
  const slab = q(".hero__slab--orange");
  const slabOlive = q(".hero__slab--olive");
  const panel = q(".hero__panel");

  gsap.set([blue, olive], { transformOrigin: "50% 100%" });
  gsap.set(orange, { transformOrigin: "50% 100%" });
  gsap.set(blue, { x: toX(0.8, HERO.blueBase), autoAlpha: 0 });
  gsap.set(olive, { x: toX(1.12, HERO.oliveBase), autoAlpha: 0 });
  gsap.set(panel, { clipPath: "inset(0% 0% 0% 100%)" });
  gsap.set(slabOlive, { clipPath: "inset(100% 0% 0% 0%)" });
  // Mudança de cena por cortina (máscara), sem fade acinzentado.
  gsap.set(q(".hero__dark"), { clipPath: "inset(0% 0% 0% 100%)" });
  gsap.set(q(".hero__label, .hero__trio-name, .hero__trio-caption"), { autoAlpha: 0, y: 14 });

  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    scrollTrigger: {
      trigger: stage,
      pin: true,
      start: "top top",
      end: () => "+=" + Math.round(window.innerHeight * HERO.scrollDistance),
      scrub: HERO.scrub,
      invalidateOnRefresh: true,
      anticipatePin: 1,
      refreshPriority: 10,
    },
  });

  // 0–20%: título e protagonista dominam (pausa curta; o conteúdo já é utilizável).
  tl.to({}, { duration: T.recede });

  // 20–45%: tipografia recua, protagonista desloca e reduz, cenário ganha profundidade.
  tl.to(q(".hero__copy"), { y: -40, scale: 0.94, opacity: 0.28, transformOrigin: "0% 50%", duration: 2.5 }, T.recede)
    .to(q(".hero__ctas, .hero__meta"), { autoAlpha: 0, duration: 1.2 }, T.recede)
    .to(orange, { x: toX(0.62, HERO.orangeBase), scale: 0.93, duration: 2.5 }, T.recede)
    .to(slab, { x: () => -0.05 * vw(), duration: 2.5 }, T.recede)
    .to(q(".hero__bg img"), { scale: 1.1, yPercent: -3, duration: 2.5 }, T.recede);

  // 45–70%: painel azul entra por máscara, fundo ganha grafite, azul assume destaque.
  tl.to(q(".hero__copy"), { autoAlpha: 0, duration: 0.8 }, T.blueIn)
    .to(q(".hero__dark"), { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "power3.inOut" }, T.blueIn)
    .to(panel, { clipPath: "inset(0% 0% 0% 52%)", duration: 2.5 }, T.blueIn)
    .to(blue, { x: toX(0.72, HERO.blueBase), autoAlpha: 1, scale: 0.9, duration: 2.5 }, T.blueIn)
    .to(orange, { x: toX(0.3, HERO.orangeBase), scale: 0.84, duration: 2.5 }, T.blueIn)
    .to(slab, { x: () => (0.24 - 0.69) * vw(), scaleX: 0.72, duration: 2.5 }, T.blueIn)
    .to(q(".hero__label--blue"), { autoAlpha: 1, y: 0, duration: 0.9 }, T.blueIn + 1.3);

  // 70–90%: oliva entra; composição abre para os três looks.
  tl.to(q(".hero__label--blue"), { autoAlpha: 0, y: -10, duration: 0.6 }, T.trioIn)
    .to(panel, { clipPath: "inset(0% 36% 0% 36%)", duration: 2 }, T.trioIn)
    .to(blue, { x: toX(0.5, HERO.blueBase), scale: 0.78, duration: 2 }, T.trioIn)
    .to(orange, { x: toX(0.2, HERO.orangeBase), scale: 0.76, duration: 2 }, T.trioIn)
    .to(slab, { x: () => (0.2 - 0.69) * vw(), scaleX: 0.62, duration: 2 }, T.trioIn)
    .to(slabOlive, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8 }, T.trioIn + 0.2)
    .to(olive, { x: toX(0.8, HERO.oliveBase), autoAlpha: 1, scale: 0.76, duration: 2 }, T.trioIn);

  // 90–100%: trio editorial resolvido, nomes e legenda conduzem à vitrine.
  tl.to(q(".hero__trio-name"), { autoAlpha: 1, y: 0, stagger: 0.15, duration: 0.6 }, T.resolve)
    .to(q(".hero__trio-caption"), { autoAlpha: 1, y: 0, duration: 0.6 }, T.resolve)
    .to({}, { duration: 0.2 }, T.end - 0.2);

  return tl;
}

// Entrada breve do título por máscara de linha (no carregamento, não depende de rolagem).
export function introTitle(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  return gsap.from(q(".hero__line > span"), {
    yPercent: 108,
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.09,
    delay: 0.05,
    clearProps: "transform",
  });
}
