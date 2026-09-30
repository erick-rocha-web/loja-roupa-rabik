# Assets

Os dez arquivos vieram do pacote do projeto (`assets/generated/`), como ilustrações geradas para esta direção visual. Não são fotos de produtos nem estoque real. Não se afirma aqui nenhum direito exclusivo sobre eles além do que o pacote informa. Os originais PNG permanecem intactos e **não** são servidos.

| Arquivo | Dimensões | Alpha | Uso no site | Derivações (WebP, `src/assets/generated/`) |
| --- | --- | --- | --- | --- |
| personagem-laranja.png | 1087×1447 | sim | Protagonista da hero, card dominante, dialog | 560w, 1087w |
| look-azul-ilustrado-sem-marca.png | 1086×1448 | sim | Hero (painel azul), sequência mobile, card, dialog | 560w, 1086w |
| look-oliva-ilustrado.png | 1086×1448 | sim | Hero (trio), sequência mobile, card, dialog | 560w, 1086w |
| cenario-urbano-ilustrado.png | 1672×941 | não | Fundo da hero (32% de opacidade); "A rua como cenário" (painel amplo + detalhe enquadrado da pintura laranja) | 960w, 1672w |
| jaqueta-laranja-ilustrada.png | 1312×1199 | sim | Base do editor; peça que atravessa o editorial | 560w, 1100w |
| camiseta-azul-ilustrada.png | 1214×1295 | sim | Base do editor | 520w, 1000w |
| camiseta-oliva-ilustrada.png | 1222×1287 | sim | Base do editor | 520w, 1000w |
| tenis-street-ilustrado.png | 1536×1024 | com vinheta | Complemento do editor (painel grafite, cover); painel "Contraste" | 760w, 1400w |
| acessorios-street-ilustrados.png | 1536×1024 | com vinheta | Complemento do editor; painel "Detalhes" (sem seletores individuais) | 760w, 1400w |
| poster-urbano-laranja.png | 1122×1402 | não | Textura do manifesto "Vista a sua fase" | 600w, 1122w |

Derivados também: `public/og-image.jpg` (1200×630, com o texto "Projeto conceitual"), `public/noscript-look.webp`, `favicon-32.png` e `apple-touch-icon.png` (gerados do SVG original `public/favicon.svg`).

Regras aplicadas: `object-fit: contain` nos recortes e `cover` só em fundos e painéis com vinheta; personagens apoiados na base do quadro; nenhum texto rasterizado; nenhuma edição de rosto, estampa ou desenho. Nenhuma camiseta é desenhada sobre um corpo: o editor é um moodboard com as peças lado a lado.

Primeira visita (medida): somente cenário, laranja, azul e oliva são baixados. O restante é `loading="lazy"`.
