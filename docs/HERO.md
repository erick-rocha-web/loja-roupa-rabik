# Hero — storyboard implementado

Código: `src/motion/hero.ts` (timeline) + `src/components/HeroStory.tsx/.css` (camadas). Nenhuma outra seção importa `hero.ts`.

## Modos

| Modo | Condição (gsap.matchMedia) | Comportamento |
| --- | --- | --- |
| Cinema | `min-width: 1024px` **e** `min-height: 700px` **e** sem movimento reduzido | Um pin, uma timeline com scrub; o JS adiciona `.is-cinema` |
| Compacto | largura < 1024 **ou** altura < 700 (com movimento) | Primeira cena empilhada + sequência vertical curta (azul e oliva) com reveal simples, sem pin |
| Reduzido | `prefers-reduced-motion: reduce` | Mesma composição do compacto, totalmente estática |

Sem `.is-cinema` (inclusive se o GSAP falhar), as camadas de cinema ficam ocultas por CSS e a sequência estática aparece: a página nunca depende da timeline para exibir conteúdo.

## Parâmetros

- Palco: `100svh` (mín. 620 px); personagens com altura `100svh − header − 28px`, apoiados na base.
- Pin: `start: top top`, `end: +=1.9 × innerHeight` (pinSpacing padrão, sem altura manual), `scrub: 0.8`, `invalidateOnRefresh`, `anticipatePin: 1`.
- Animam-se só filhos do palco; o elemento pinado não recebe tweens.
- Posições horizontais = centros em fração do viewport, recalculadas no refresh.

## Storyboard (timeline de 10 unidades)

| Unidades | Cena |
| --- | --- |
| 0–2 | Protagonista laranja e título dominam. O título já entrou por máscara de linha no carregamento (0,7 s). |
| 2–4,5 | Título recua (y −40, escala 0,94, opacidade 0,28); CTAs e legenda saem; protagonista 0,68 → 0,62, escala 0,93; cenário escala 1,1. |
| 4,2–6,7 | Cortina grafite (clip-path) cobre a cena; painel azul entra por máscara; azul assume destaque (0,72, escala 0,9); laranja vai a 0,30 com seu bloco laranja; rótulo "Oversized em azul". |
| 7,2–9,2 | Oliva entra (0,80) com bloco oliva revelado por máscara; painel azul vira coluna central; trio 0,20 / 0,50 / 0,80. |
| 9–10 | Nomes dos três looks e legenda "Três looks, uma rua"; o pin termina e a vitrine marfim sobe naturalmente. |

## Limites para não quebrar a hero

- Não animar `.hero__stage` nem colocar a hero dentro de ancestral transformado.
- Além da hero, existe **uma** fixação curta (≈0,9 viewport) na cena "O detalhe muda tudo", nas mesmas condições do modo cinema e com prioridade de refresh menor. As demais seções usam scrub sem pin, e filtros, modais e seleção não recriam a timeline da hero.
- Revisão de 30/09/2026: os quadros da hero (início, meio, trio e saída) foram comparados pixel a pixel com as capturas aprovadas. Resultado: 0 pixels diferentes acima do limiar de 24/255.
- A ordem dos triggers é garantida por `refreshPriority: 10` + `ScrollTrigger.sort()`; `App.tsx` faz um refresh após fontes e `load`.
- Verificado por E2E: um único `.pin-spacer` dentro de `.hero` (dois na página, contando a cena do detalhe); resize para 800 px remove o pin e o retorno a 1440 px recria exatamente um.
