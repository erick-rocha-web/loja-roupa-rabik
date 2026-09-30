# Decisões

## Stack

React 19 + TypeScript 7 + Vite 8, GSAP 3.15 + ScrollTrigger + `@gsap/react` (useGSAP), Vitest 5, Playwright 1.63 (usando o Chrome do sistema, `channel: "chrome"`, sem baixar navegadores). CSS simples por componente + tokens globais (sem CSS Modules, para manter os seletores legíveis e a especificidade previsível). Fontes locais via `@fontsource` (Barlow Condensed 600/700/800 e Inter Variable, licença OFL incluída nos pacotes). Sem Lenis, sem biblioteca de ícones, sem backend.

## Composição

- **Hero:** título à esquerda sobre marfim + cenário esmaecido, protagonista recortada sobre um bloco laranja diagonal (sem card). A troca de cena é uma cortina grafite por máscara, e não um fade: o fade de opacidade produzia um cinza "lamacento" no meio do percurso. O trio final usa uma cor-campo por look (laranja, azul, oliva).
- **Lookbook:** grade 6/3/3 com o terceiro card deslocado. A primeira versão (dominante + dois cards horizontais empilhados) deixava as figuras pequenas demais. Com 1 ou 2 resultados, o layout se recompõe para evitar vazios.
- **Editor:** moodboard com campo de acento da família da base, base em `contain` e complemento em painel grafite com corte diagonal (respeitando a vinheta). O nome editorial ("Sinal laranja", "Azul de quadra", "Oliva de concreto") muda com a base; o título da combinação vem dos dados.
- **Editorial:** a jaqueta atravessa o campo marfim entre dois painéis escuros. Inicialmente ela cobria o título; o grid foi reorganizado.
- **Universo:** painel amplo + detalhe enquadrado da pintura laranja. Um recorte da escadaria repetia o painel amplo e foi trocado.
- **Contraste:** texto pequeno em laranja sobre marfim usa `#B53A0C` (`--color-orange-text`); sobre laranja, só texto grafite; o manifesto usa um painel grafite sólido sobre o pôster.

## Interação e acessibilidade

- Um único modal por vez (`ActiveModal` no App), com `<dialog>` nativo: Escape, foco contido, fundo inerte, retorno de foco, bloqueio de rolagem sem deslocamento (`scrollbar-gutter: stable`). Navegar a partir de um modal acontece só depois do evento `close`.
- Filtros com `aria-pressed`; escolhas do editor com radios nativos (setas do teclado); anúncio da combinação com atraso de 450 ms para ler apenas a escolha final.
- O botão "Menu" mantém o nome acessível constante; o estado vai em `aria-expanded`.
- "Salvar combinação" é idempotente (ID `combination-<base>-<complemento>`); repetir apenas anuncia que já está salva.
- Storage: chave `rua-studio:selection:v1`, formato `{version, items}` somente com IDs; itens desconhecidos, versões diferentes e JSON corrompido são descartados; storage bloqueado mantém a seleção em memória e o drawer avisa.

## Contato

Todos os links vão para `wa.me/5561983645763` com mensagem pronta sobre **desenvolvimento de sites**. Nenhum botão de WhatsApp aparece nos cards, e não há "Comprar" nem "Consultar disponibilidade".

## Revisão 2: cenas secundárias e cards (30/09/2026)

**Causa dos cards grandes demais**, medida no navegador: a área da imagem usava `aspect-ratio` proporcional à largura da coluna (`5 / 5.4` e `3 / 4`). Em 1366×768, o card dominante tinha 872 px de altura (imagem de 671 px), mais que a própria tela. Não era overflow (`scrollHeight − clientHeight = 0`) nem transformação (`transform: none` em repouso). Correção: altura explícita por breakpoint (`--media-h`), `clamp(300px, 40vh, 360px)` no dominante e `clamp(260px, 34vh, 300px)` nos complementares, ilustração em `contain` e corpo com altura natural. O card deixou de ter `overflow: hidden`: só a área da imagem recorta o grafismo diagonal. Resultado em 1366×768: cards de 448–483 px.

**Movimento por seção** (cada uma com uma composição própria; hero intocada):

- **Lookbook (desktop):** timeline com scrub. O dominante avança do fundo (y 110, escala 0,9), o azul entra por um plano lateral (x 90, y −50) e o oliva recua do primeiro plano (y 170, escala 1,06). Os grafismos se deslocam e as figuras escalam a partir da base, de modo que nunca são cortadas. Ao completar, a cena é encerrada e as propriedades são limpas, deixando os cards estáveis. Filtrar no meio da entrada também encerra a cena. No celular, entrada curta.
- **O detalhe muda tudo (desktop ≥1024×700):** fixação curta de 0,9 viewport. A jaqueta começa maior e deslocada, depois recua para dar espaço. Os tênis entram por máscara lateral e os acessórios por máscara inferior, ambos com zoom recuando (profundidade). Por fim aparecem os rótulos e a frase. Em tela baixa ou movimento reduzido, a mesma composição fica estática.
- **Manifesto:** um campo laranja diagonal atravessa a seção e, na passagem, revela o painel de texto. O pôster se desloca em sentido contrário (±4%). A faixa fica oculta por padrão e só aparece quando há animação.
- **Universo:** quatro planos ligados à rolagem: a palavra "Cenário" em contorno (horizontal, lenta), o painel amplo (máscara abrindo e zoom recuando), o detalhe enquadrado (mais rápido, à frente) e a tipografia (deslocamento curto).
- **Editor:** o quadro tem altura própria (não segue a coluna de controles) e fica fixo (sticky) ao lado das escolhas no desktop; base e complemento ficam lado a lado. As três trocas têm a mesma duração (0,28 s). A base desliza, o complemento entra por máscara, a cor anterior do acento se retira revelando a nova e o nome editorial troca por máscara de linha. Com movimento reduzido, tudo é imediato.
