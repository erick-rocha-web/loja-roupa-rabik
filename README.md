# RUA STUDIO — loja-conceito de streetwear

Projeto demonstrativo da Rabik: uma loja-conceito **fictícia**, ilustrada e interativa. Não realiza vendas; looks e peças são ilustrativos. Especificação completa em `SDD_RUA_STUDIO.md`.

## Rodar localmente

Requer Node 20+ (testado com Node 24.14 / npm 11.9).

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Script | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento Vite |
| `npm run build` | Typecheck + build de produção em `dist/` |
| `npm run preview` | Serve o build (`npx vite preview --port 4319`) |
| `npm run typecheck` | `tsc -b` |
| `npm test` | Testes unitários (Vitest) |
| `npm run test:e2e` | Fluxos no navegador (Playwright com o Chrome instalado, porta 4319) |
| `npm run assets` | Regenera WebP, favicons, og-image e imagem do noscript a partir de `assets/generated/*.png` |

## Estrutura

```
assets/generated/      PNGs originais recebidos (não servidos)
scripts/               derivação de imagens (sharp)
public/                favicon, og-image, robots.txt (Disallow), noscript
src/
  assets/generated/    WebP otimizados (560–1672 px, alpha preservado)
  components/          seções + CSS por componente
  data/                brand.ts (nome/contato editáveis), looks, peças, FAQ, assets
  state/               seleção (validação, storage tolerante a falha) + provider
  lib/                 whatsapp.ts, exportSelection.ts
  motion/              gsap.ts (registro + media queries), hero.ts (timeline isolada), reveals.ts
  styles/              tokens.css, global.css
tests/unit, tests/e2e
docs/                  DECISOES, ASSETS, HERO, VALIDACAO, PUBLICACAO
```

Para trocar o nome da marca, edite `src/data/brand.ts`.

Nada foi publicado: sem Git, sem deploy e com `noindex`. Veja `docs/PUBLICACAO.md`.
