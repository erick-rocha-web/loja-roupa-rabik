# Validação — 30/09/2026

Ambiente: Windows 11, Node 24.14, npm 11.9, Chrome (canal do sistema) via Playwright 1.63. Tudo foi medido no build de produção (`vite preview`, porta 4319), sem publicar.

## Comandos executados

| Comando | Resultado |
| --- | --- |
| `npm run typecheck` | OK, sem erros |
| `npm test` | 10/10 testes passaram (WhatsApp/encode, salvar sem duplicar, remover, (de)serialização, JSON corrompido/versão/IDs desconhecidos, storage que lança erro, 6 combinações, filtros, exportação exata) |
| `npm run build` | OK. JS 380 KB (126 KB gzip), CSS 37 KB (7,7 KB gzip) |
| `npm run test:e2e` | 15 passaram e 3 foram pulados de propósito (testes só de desktop no projeto mobile e vice-versa) |

Os E2E cobrem: pin único e saída por âncora; resize 1440→800→1440 sem duplicar a hero; menu mobile fecha ao navegar; filtro → detalhe (Escape, retorno de foco, rolagem inalterada) → salvar → favorito preservado entre filtros → seleção → exportação `.txt` com conteúdo exato → remover/limpar/desfazer; editor (imagem, acento e nome mudam; cliques rápidos terminam no último estado; salvar 3× grava 1 item; restaurar); persistência ao recarregar; storage corrompido; `localStorage` bloqueado (seleção em memória + aviso); todos os `wa.me` com o número e a mensagem da Rabik; sem overflow; H1 único; `noindex`; movimento reduzido sem pin e com conteúdo visível. Não houve erros de console nas execuções.

## Tamanhos conferidos visualmente

360×800, 390×844, 768×1024, 1440×900, 1440×650 (desktop baixo: sem pin, composição estática), 1920×1080 e 1440×900 com movimento reduzido. Overflow horizontal medido: 0 em 360, 768 e 390. As capturas estão em `docs/capturas/`.

Problemas encontrados e corrigidos durante a validação: transição grafite acinzentada (virou cortina por máscara); legenda final sobre o bloco laranja; cards complementares com figura pequena; jaqueta encobrindo o título do editorial; recorte repetido do cenário; gutter do menu mobile; botão "Fechar" fora da primeira tela do dialog no celular; nome acessível do botão Menu mudando junto com `aria-expanded`.

## Desempenho (medição local, sem CDN)

| Cenário | LCP | CLS | Transferido na primeira carga |
| --- | --- | --- | --- |
| Desktop 1440×900 | 348 ms | 0,000 | 1.180 KB |
| Mobile 390×844 | 240 ms | 0,000 | 750 KB |
| Mobile, rede ~1,6 Mbps / 150 ms + CPU 4× | 1.852 ms | 0,000 | 681 KB |

Na primeira carga só são baixadas 4 das 10 imagens (cenário, laranja, azul, oliva).

## Limitações

- Medições locais; não é uma nota de Lighthouse nem de rede real. Não houve teste em Safari/iOS nem em aparelho físico.
- O leitor de tela não foi testado manualmente; a semântica foi conferida por papéis/nomes nos testes.
- Os links de WhatsApp foram verificados pelo `href`; nenhuma mensagem foi enviada.
- A porta 4173 estava ocupada por outro projeto local do usuário e não foi tocada. Por isso os testes usam a porta 4319, com `reuseExistingServer: false`.
- Busca por resíduos da loja anterior (nome, telefone antigo, endereço, avaliações, `assets/antunes`, Instagram, CNPJ, Pix) em `src`, `public`, `index.html`, `dist`, `tests` e `scripts`: nenhuma ocorrência.

## Revisão 2 — cenas secundárias e cards

| Comando | Resultado |
| --- | --- |
| `npm run typecheck` | OK |
| `npm test` | 10/10 |
| `npm run build` | OK |
| `npm run test:e2e` | 25 passaram e 5 foram pulados por projeto (desktop/mobile) |

Testes novos: cards compactos, inteiros (`contain`), sem transformação residual e com opacidade 1 em 1366×768, 1440×900, 768×1024 e 390×844; filtro acionado durante a entrada; cena do detalhe termina com as peças e a frase visíveis; em movimento reduzido, detalhe e manifesto aparecem completos e a faixa laranja fica oculta. A contagem de pins agora verifica um pin dentro da hero (dois na página).

Medidas dos cards após a correção: em 1366×768, dominante 624×448 com imagem de 307 px e complementares 300×483 com imagem de 261 px; em 1440×900, 648×501 (360) e 312×523 (300); em 768×1024, 704×342 (340) e 342×497 (280); em 390×844, 339×546 (320) e 339×242.

Cenas conferidas **durante** a animação (várias posições de rolagem) em 1440×900 e 1366×768. Correções feitas: painel grafite dos tênis que havia sumido, halo da jaqueta cortado no início da cena, palavra "Cenário" escondida atrás das imagens e painéis do editorial grandes demais no tablet.

A hero foi comparada pixel a pixel com as capturas aprovadas: nenhuma diferença.

## Revisão 3 — quadro do editor

Causa: no desktop, o quadro ocupava as duas linhas da grade (título + controles) e tinha `min-height: 680px`, esticando até 844 px em 1366×768. No tablet, `aspect-ratio: 4/4.6` gerava 809 px. Correção: altura explícita (`clamp(380px, 60vh, 520px)` no desktop, fixo ao lado dos controles com `position: sticky`; 440 px no tablet; `clamp(300px, 80vw, 380px)` no celular). Base e complemento foram redistribuídos lado a lado, sem que o painel cubra a peça.

| Tela | Antes | Depois |
| --- | --- | --- |
| 1366×768 | 844 px | 461 px |
| 1440×900 | 846 px | 520 px |
| 768×1024 | 809 px | 440 px |
| 390×844 | 390 px | 312 px |

`npm run typecheck` OK · `npm test` 10/10 · `npm run test:e2e`: 33 passaram e 5 foram pulados por projeto (inclui o teste novo de altura do quadro nas quatro telas).
