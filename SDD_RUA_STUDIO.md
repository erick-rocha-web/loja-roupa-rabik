# SDD | RUA STUDIO | Streetwear interativo para portfólio

Versão 1.0 • 30/09/2026 • Implementação do zero no Claude Code

## Leia isto antes de começar

Implemente uma aplicação completa, não apenas um plano. Este documento é autossuficiente: não é necessário ler os prompts anteriores.

O projeto é uma **loja-conceito fictícia de streetwear para o portfólio de Erick e da Rabik**. Não é um portfólio pessoal com currículo, lista de tecnologias ou cartões de projetos. A pessoa deve entrar numa experiência de moda interativa e descobrir, discretamente, que se trata de uma demonstração.

O nome de trabalho é **RUA STUDIO**. É uma identidade demonstrativa, não uma afirmação de empresa real, registro de marca ou disponibilidade de domínio. Centralize o nome na configuração para que possa ser trocado depois.

A qualidade visual deve conservar o DNA da proposta desenvolvida para a Antunes: protagonista recortado, tipografia forte, laranja/grafite/marfim, rolagem cinematográfica, vitrine editorial e seleção de referências. Substitua integralmente o conteúdo de terceiros por ilustrações fornecidas e conteúdo conceitual.

Não existe acesso ao código-fonte nem aos parâmetros exatos da hero publicada neste pacote. Portanto, recrie a mesma linguagem e o storyboard especificado abaixo; não prometa equivalência pixel a pixel ou timing idêntico. Se Erick fornecer posteriormente um componente ou vídeo de referência da hero, use-o somente com autorização e leitura do material fornecido, sem editar o projeto antigo.

## Missão e prioridades

Crie uma campanha editorial de streetwear que ganhou vida no navegador. O resultado deve ter personalidade adulta e premium, com influência de anime e games no desenho, nos recortes e no movimento, não na cópia de personagens conhecidos.

Ordem de prioridade:

- Segurança: um novo projeto completamente separado da demonstração anterior.
- Composição: uma primeira dobra memorável, equilibrada e legível.
- Hero: a sequência principal de rolagem é a assinatura, não um banner com fade.
- Utilidade: explorar, filtrar, abrir detalhes, montar uma combinação e salvar referências.
- Movimento secundário: acrescentar animações em outras seções sem competir com a hero.
- Qualidade: mobile próprio, acessibilidade, imagens otimizadas e validação real.

Não substitua direção de arte por uma troca de cor. Não encha a tela de cards iguais. Não faça um site de agência disfarçado de loja.

## Isolamento obrigatório do projeto

Este site será criado do zero numa **pasta nova**. Não duplique nem reaproveite o repositório anterior.

Antes de editar:

- Informe o diretório de trabalho e confira instruções locais aplicáveis.
- A pasta pode conter este SDD, o arquivo LEIA_PRIMEIRO.md e assets. Preserve esses arquivos.
- Se houver uma aplicação anterior, arquivos desconhecidos, um remoto antigo, uma pasta .vercel ou um repositório Git ancestral que inclua este diretório, pare antes de alterar. Peça para Erick abrir uma pasta nova e realmente independente.
- Não apague .git para contornar a situação. Não altere remotes, branches ou configurações do projeto anterior.
- Não execute comandos com --force, reset --hard, limpeza destrutiva ou exclusão de pastas do usuário.
- Não faça clone do repositório antigo como ponto de partida.
- Não copie .vercel, projectId, orgId, configurações de deploy, variáveis ou credenciais do projeto anterior.
- Não faça commit, push, login, criação de repositório ou deploy sem uma solicitação posterior explícita.
- Não envie mensagens a nenhum contato durante testes.

A futura publicação deve acontecer em um **novo projeto da Vercel**, ligado ao novo repositório informado por Erick. Não use o domínio da demonstração anterior.

Se uma ferramenta de scaffolding pedir para apagar os arquivos da pasta, recuse. Crie a estrutura preservando o SDD e os assets, ou use um scaffold temporário e incorpore apenas os arquivos novos necessários.

## O que pode e o que não pode entrar

Permitido:

- As dez imagens da pasta assets/generated.
- Texto criativo próprio identificado como conceito.
- Formas geométricas, ícones simples e marca tipográfica/SVG criados no código.
- Nome e contato da Rabik na área de autoria e contratação.
- Categorias editoriais derivadas das imagens: sobreposições, camisetas, jeans, calçados e acessórios.

Não permitido:

- Fotos de modelos, interiores ou fachada da loja anterior, inclusive recortes derivados dessas fotos.
- Logo, nome comercial, Instagram, avaliações, telefone, endereço ou história da loja anterior.
- Screenshots do Maps/Instagram, logotipos de fabricantes ou personagens de anime/jogos existentes.
- Depoimentos, estrelas, contadores de clientes ou alegações de resultados comerciais inventados.
- Estoque, tamanhos disponíveis, preços, descontos, entrega, retirada, loja física ou checkout apresentados como reais.
- Um WhatsApp da Rabik que pareça receber pedidos de roupas.

Aviso discreto obrigatório, legível no topo ou junto da navegação:

> Loja-conceito. Não realiza vendas.

No rodapé:

> Projeto demonstrativo desenvolvido pela Rabik. Looks e peças ilustrativos.

Não espalhe avisos enormes pela página. O usuário deve entender o contexto sem perder a experiência.

## Identidade e direção de arte

### Conceito criativo

**SEU ESTILO / OCUPA A RUA.**

Esta é a mensagem principal, preservando a linguagem forte da proposta original. Use “Vista a sua fase” como frase secundária no manifesto, não como outro H1 concorrente.

Personalidade: urbana, energética, adulta, ilustrada, editorial e contemporânea. A influência anime/game entra em camadas, enquadramentos, grafismos e sensação de mudança de cena. Não fazer chibi, personagem infantil, interface de RPG cheia de menus ou neon cyberpunk roxo.

### Marca

Crie um wordmark autoral para RUA STUDIO:

- “RUA” em tipografia condensada forte, “STUDIO” em tamanho secundário.
- Pequeno símbolo geométrico original com cortes diagonais, sem reproduzir símbolo de outra marca.
- Produza SVG vetorial no código, legível no header e numa versão simplificada para favicon.
- Não gere uma marca raster borrada nem use imagens da loja anterior como referência de logo.
- Não descreva a identidade demonstrativa como uma marca registrada.

### Tokens de cor

| Token | Valor inicial | Função |
| --- | --- | --- |
| --color-paper | #F3F1EB | Fundo claro dominante |
| --color-ink | #151515 | Texto e blocos escuros |
| --color-orange | #FF5A1F | Campo visual e ações principais |
| --color-muted | #625F59 | Texto secundário em áreas claras |
| --color-blue | #1454C0 | Família do look azul |
| --color-olive | #62694A | Família do look oliva |
| --color-line | #D7D3C8 | Fios e divisores em fundo claro |

Ajuste combinações depois de verificar contraste. Em laranja, prefira texto grafite para conteúdos pequenos. Não suponha que texto branco sobre laranja seja adequado em todos os tamanhos.

Distribua áreas claras, laranja e grafite. A página não pode se transformar num corredor escuro interminável.

### Tipografia e proporções

- Títulos: família condensada de boa qualidade; Barlow Condensed é uma opção.
- Texto e controles: Inter ou outra família neutra adequada.
- Preferir fontes locais em WOFF2, com licenças preservadas e fallbacks explícitos.
- Hero desktop: 84–150 px como ponto de partida, com clamp e quebras controladas.
- Hero mobile: aproximadamente 46–70 px, sem palavra cortada.
- Demais títulos: 30–60 px; corpo: 16–18 px; textos auxiliares legíveis.
- Container: aproximadamente 1280–1360 px; gutters de 24–40 px no desktop e 18–24 px no mobile.
- Header: aproximadamente 64–76 px.
- Controles com área de toque de pelo menos 44 × 44 px.
- Cantos retos ou levemente arredondados; não transformar tudo em cápsulas.
- Texturas sutis. Não sobrepor granulado ao texto de leitura.
- Linhas, tipografia, espaços e enquadramento organizam a página; poucas sombras.

### Antipadrões proibidos

Hero “texto à esquerda, card arredondado à direita”; gradientes roxos; glassmorphism; partículas; cursor personalizado; preloader demorado; marquee em toda seção; carrossel automático; numerar visualmente todos os blocos com 01/02/03; travessões em toda frase; ícones enormes; botões de WhatsApp em cada card; frases genéricas de agência; animação para cada palavra; texto gigantesco em toda página.

Os identificadores de requisitos deste SDD são internos. Não exiba IDs, percentuais do storyboard ou etapas numeradas na interface.

## Assets: pacote completo e independente

O pacote contém apenas imagens ilustrativas geradas para esta direção visual. Não há fotos ou recortes da loja anterior.

Localização inicial: assets/generated/.
Incorpore as imagens ao fluxo de assets do Vite, preferencialmente em src/assets/generated/, preservando os originais recebidos fora de public.

| Arquivo | Dimensões | Papel principal |
| --- | --- | --- |
| personagem-laranja.png | 1087 × 1447 | Personagem protagonista da hero |
| look-azul-ilustrado-sem-marca.png | 1086 × 1448 | Segundo personagem e referência azul; versão revisada sem símbolo esportivo |
| look-oliva-ilustrado.png | 1086 × 1448 | Terceiro personagem e referência oliva |
| cenario-urbano-ilustrado.png | 1672 × 941 | Fundo urbano amplo e cena editorial |
| jaqueta-laranja-ilustrada.png | 1312 × 1199 | Peça isolada para editor e detalhe |
| camiseta-azul-ilustrada.png | 1214 × 1295 | Base azul do editor |
| camiseta-oliva-ilustrada.png | 1222 × 1287 | Base oliva do editor |
| tenis-street-ilustrado.png | 1536 × 1024 | Painel de calçados e complemento |
| acessorios-street-ilustrados.png | 1536 × 1024 | Painel de acessórios e complemento |
| poster-urbano-laranja.png | 1122 × 1402 | Textura editorial vertical e manifesto |

### Aplicação correta das imagens

- Inspecione os dez arquivos antes de decidir composição e corte.
- Os personagens, as camisetas e a jaqueta possuem canal alpha. Preserve-o e examine o resultado sobre marfim, laranja e grafite.
- Tênis e acessórios possuem alpha e também um tratamento de fundo/vinheta. Use-os em painéis editoriais compatíveis; não presuma um recorte limpo de cada objeto.
- A imagem de acessórios contém vários itens juntos. Não crie seletores individuais de boné/anel/bolsa sem assets separados.
- O cenário e o pôster são opacos. Não os use como se fossem recortes.
- Não desenhe a camiseta por cima do corpo de um personagem fingindo prova virtual. “Montar combinação” é um moodboard de peças lado a lado.
- Respeite o corte dos personagens e apoie-os no limite da composição. Não deixe pernas cortadas flutuando.
- Use object-fit: contain nos recortes e object-fit: cover somente nos fundos ou painéis com ponto focal conferido.
- Não coloque lettering repetido dentro das imagens. Textos devem ser HTML, não rasterizados.
- Não estique uma imagem para virar uma textura 4K se a resolução não sustentar.
- Faça derivações otimizadas WebP/AVIF quando houver ferramenta adequada, preservando alpha e mantendo os PNG originais. Não editar rostos, estampas ou desenho para “completar”.
- Não carregar os dez PNGs originais simultaneamente na primeira dobra.
- Utilize todas as imagens com uma função clara, distribuídas na narrativa; não encaixe todas numa grade só para cumprir quantidade.
- Sem hotlink, imagens aleatórias de banco, vídeo gerado, WebGL ou centenas de frames. Este pacote é suficiente.

## Jornada funcional

A jornada principal é:

Entrar na campanha → explorar referências → filtrar → abrir detalhe → salvar → montar combinação → revisar seleção → exportar.

A jornada comercial secundária é:

Perceber que é uma demonstração → abrir a seção de autoria → solicitar um site semelhante à Rabik.

Esses dois contextos não devem se confundir. A experiência de moda funciona sem depender do WhatsApp. O WhatsApp recebe interessados em desenvolvimento de sites, não compradores de roupa.

## Arquitetura da página

### Cabeçalho

Marca à esquerda. Navegação: **Looks**, **Monte sua combinação**, **O conceito**.

À direita, **Minha seleção**, com quantidade real de referências salvas. Não usar ícone de carrinho com subtotal.

- Header compacto, com contraste estável.
- Mobile com menu acessível e acesso à seleção.
- Menu fecha ao navegar e devolve foco quando adequado.
- Incluir skip link para o conteúdo.
- Se fixo, scroll-margin-top evita encobrir os títulos.
- Nenhum link para loja física, Instagram fictício ou rota de mapa.

### Hero: a assinatura cinematográfica

A hero deve reproduzir a intenção e o ritmo da proposta original, agora com os personagens ilustrados. Não substituir por imagem estática com fade.

**Cena inicial:**

- Base marfim com grande geometria laranja.
- Cenário urbano como camada de fundo, sem competir com a leitura.
- Personagem laranja em primeiro plano, com escala forte e enquadramento controlado.
- H1 condensado “SEU ESTILO / OCUPA A RUA.”.
- Identificação pequena “RUA STUDIO · STREETWEAR CONCEITUAL”.
- Apoio: “Camadas, cores e referências para vestir do seu jeito.”
- CTA principal: **Explorar os looks**, levando à vitrine.
- CTA secundário discreto: **Montar uma combinação**, levando ao editor.

A primeira dobra já deve estar bonita antes de rolar. Não exigir aguardar um preloader nem rolar para a mensagem aparecer.

**Storyboard desktop:**

| Progresso interno aproximado | Encenação | Restrição |
| --- | --- | --- |
| 0–20% | Protagonista laranja e título dominam; título tem entrada breve por máscara de linha | Conteúdo utilizável desde o início |
| 20–45% | Tipografia recua; personagem desloca e reduz discretamente; cenário ganha profundidade | Não distorcer corpo nem animar o container pinado |
| 45–70% | Painel azul entra por máscara; personagem azul assume destaque; fundo ganha grafite | Sem corte abrupto nem desaparecimento de todas as camadas |
| 70–90% | Personagem oliva entra; elementos abrem composição com os três looks | Manter hierarquia e não empilhar textos ilegíveis |
| 90–100% | Cena resolve num trio editorial e conduz à vitrine marfim | Saída natural, sem salto e sem espaço vazio |

Os percentuais são um guia de ritmo. Ajuste conforme a composição, sem torná-los controles visuais.

**Contrato técnico:**

- Uma timeline principal e um único pin para a hero no desktop.
- Ativar o pin somente em largura a partir de aproximadamente 1024 px e altura suficiente, por exemplo 700 px; em telas baixas, usar composição compacta sem pin longo.
- Uma altura de palco próxima ao viewport e distância adicional de rolagem entre 1,6 e 2,2 alturas de viewport como ponto de partida.
- Não somar uma altura manual enorme ao pinSpacing de modo a duplicar o percurso.
- Animar filhos, não o elemento pinado.
- Movimentos associados à rolagem com scrub suave; sem autoplay longo, wheel interceptado ou snap que force a navegação.
- Sem deformação, rotação 360°, simulação 3D ou alteração das ilustrações.
- Navegação e CTAs podem sair da cena e levar diretamente à seção desejada.
- Depois que a hero for validada, mantenha sua configuração isolada. Animações inferiores não podem modificar offsets, duração ou composição da hero inadvertidamente.

**Mobile e tablet:**

Não reduzir o desktop proporcionalmente. Exibir título, protagonista e CTA na primeira cena; azul e oliva entram numa sequência editorial vertical curta. Sem longa rolagem horizontal pinada. Usar altura baseada em svh/dvh com fallback e considerar safe areas.

**Movimento reduzido:**

Exibir abertura e três personagens em composições estáticas. Sem pin, scrub ou parallax; navegação e referências continuam disponíveis.

### Lookbook: “Encontre sua próxima referência”

Fundo claro e composição assimétrica, com um card dominante e dois complementares. Não repetir a hero em miniatura nem fazer uma grade uniforme de seis caixas.

Referências iniciais:

| ID interno | Nome exibido | Imagem | Tags |
| --- | --- | --- | --- |
| look-laranja | Camadas em laranja | personagem-laranja.png | Sobreposições |
| look-azul | Oversized em azul | look-azul-ilustrado-sem-marca.png | Camisetas, Jeans |
| look-oliva | Oliva e jeans | look-oliva-ilustrado.png | Camisetas, Jeans |

Filtros: **Todos**, **Sobreposições**, **Camisetas**, **Jeans**. Só estes filtros, pois há itens associados. Sem busca textual para três referências.

Cada card contém imagem, nome, paleta, **Ver composição** e **Salvar referência**. Estado salvo deve ficar evidente. Não mostrar preço, SKU, tamanho, disponibilidade ou “Comprar”.

A entrada dos cards tem reveal curto, y entre aproximadamente 16 e 28 px, opacity e stagger suave. Hover e foco acrescentam contorno e deslocamento pequeno. No toque, tudo funciona sem hover.

Filtrar altera resultados, mantém favoritos e não provoca saltos gigantes. Ao trocar filtro, os itens não podem ficar invisíveis porque um ScrollTrigger anterior já foi executado.

### Detalhe da referência

Dialog acessível com:

- Ilustração inteira numa área confortável.
- Nome e paleta.
- Texto específico sobre o desenho.
- Ação de salvar/remover.
- Ação de ir para o editor de combinação, quando útil.
- Informação “Referência ilustrada”.

Copy de partida:

**Camadas em laranja:** “Jaqueta de presença forte, base clara e tons grafite. Uma combinação que usa a sobreposição como ponto de atenção.”

**Oversized em azul:** “Azul como protagonista, linhas amplas e jeans escuro. Uma referência de proporção e contraste.”

**Oliva e jeans:** “Tons oliva e grafite, textura jeans e uma silhueta descontraída. Uma combinação de cor sóbria com volume.”

Não afirmar tecido, qualidade de fabricação, tamanho, gênero obrigatório ou disponibilidade.

Fechar com Escape e botão visível; conter foco; devolver ao gatilho; impedir interação com fundo enquanto aberto; restaurar rolagem sem deslocamento. Use dialog nativo se adequado. Não permitir dois modais ativos ao mesmo tempo.

### Editor: “Monte sua combinação”

Esta é a interação diferenciadora. Não é um provador nem um carrinho.

Layout desktop: uma área visual editorial dominante e um painel lateral compacto de escolha. No mobile, moodboard e controles empilhados.

Escolha uma base:

- Jaqueta laranja.
- Camiseta azul.
- Camiseta oliva.

Escolha um complemento:

- Tênis.
- Acessórios.

Atualize de verdade:

- Imagens do moodboard.
- Cor de fundo/acento, usando a família da base.
- Nome da combinação.
- Resumo textual acessível.
- Estado dos botões selecionados.

A composição mostra as peças lado a lado, não faz montagem no corpo do personagem. Use silhuetas de base compatíveis com o recorte e mantenha tênis/acessórios em painel próprio, respeitando a vinheta.

Troca por crossfade e pequeno deslocamento, aproximadamente 180–280 ms. Se houver cliques rápidos, finalizar/cancelar a transição anterior e mostrar o estado mais recente. Não manter camadas invisíveis no tab order.

Botões **Salvar combinação** e **Restaurar escolhas**. Começar com jaqueta e tênis. O ID é determinístico, por exemplo combination-jaqueta-tenis; clicar repetidamente não duplica.

Use botões com aria-pressed ou um grupo de radios semântico. Os estados precisam funcionar por teclado. Não anunciar cada frame, apenas a escolha final.

### Editorial: “O detalhe muda tudo”

Uma seção de composição livre com jaqueta, tênis e acessórios, não três ícones acompanhados de texto genérico.

Sugestão de ritmo:

- Jaqueta maior atravessando um campo marfim.
- Tênis num painel grafite, com recorte diagonal.
- Acessórios num painel independente.
- Texto curto: “Uma cor. Um volume. Um detalhe que muda a composição.”

Pequenos rótulos editoriais: **Camadas**, **Contraste**, **Detalhes**. Sem 01/02/03.

Animação: reveal de máscara limitado e parallax leve, aproximadamente 12–30 px no desktop, sem outro pin. No mobile, empilhar dois ou três enquadramentos de forma legível e usar entrada simples.

Não animar os elementos com loop infinito de flutuação.

### Manifesto: “Vista a sua fase”

Use poster-urbano-laranja.png como textura de fundo e área gráfica. Texto HTML com contraste:

> Não existe um jeito único de ocupar a rua.  
> Escolha a cor. Mude a camada. Faça a combinação ser sua.

Não atribuir uma missão histórica a uma empresa real. Isto é manifesto criativo da loja-conceito.

Reveal de um bloco ou máscara ao entrar no viewport, sem exigir rolagem longa. Se usar uma faixa de palavras repetidas, deve ser uma faixa secundária, pausável e estática em movimento reduzido. A faixa automática não é obrigatória.

### Universo visual: “A rua como cenário”

Esta seção substitui a apresentação de loja física da proposta anterior.

Use somente cenario-urbano-ilustrado.png, em uma composição ampla e um detalhe enquadrado, se fizer sentido. Pode combinar linhas e formas no código com a imagem.

Texto: “Um universo ilustrado para explorar estilo, proporção e movimento.”

Não dizer que é a fachada, cidade, interior ou ambiente de uma loja existente. Não criar endereço, mapa, horário ou “Como chegar”. Se a repetição do cenário ficar artificial, prefira um painel amplo único bem composto.

Animação: imagem entra por máscara curta; parallax até cerca de 20 px no desktop; nenhuma fixação adicional.

### Minha seleção

Drawer ou dialog acessível, acessível pelo header:

- Miniatura, nome e ação de remover.
- Looks salvos e combinações salvas numa única lista.
- Estado vazio com **Explorar os looks**.
- **Limpar seleção** com confirmação leve ou possibilidade de desfazer.
- **Exportar referências** gera um arquivo .txt no navegador ou permite copiar texto com confirmação.
- Mensagem: “Referências de uma loja-conceito. Não reservam produtos nem representam um pedido.”

Persistência local versionada, somente IDs e escolhas, sem nome, e-mail, telefone ou cadastro. Chave sugerida: rua-studio:selection:v1.

Ao carregar, validar formato, IDs conhecidos e escolhas permitidas. Descartar itens inválidos sem quebrar a aplicação. Tratar storage indisponível, quota ou JSON corrompido; a experiência continua em memória.

Gerar o texto a partir dos dados atuais, não confiar em texto arbitrário salvo no storage. Remover duplicações; filtros não apagam favoritos.

Dentro da seleção, um link secundário pode dizer **Quero essa experiência para minha loja**, identificado como contato com a Rabik. A mensagem pode mencionar as referências escolhidas, deixando explícito que se pede desenvolvimento de site, não compra de roupas.

### FAQ

Quatro perguntas diretas:

**Posso comprar as roupas aqui?**  
“Não. Esta é uma loja-conceito criada para demonstrar uma experiência digital. As peças são ilustrativas.”

**O que acontece quando salvo uma referência?**  
“A seleção fica neste navegador. Você pode revisar, remover e exportar as combinações que gostou.”

**Vocês criam um site assim para uma loja real?**  
“A Rabik pode adaptar a experiência à identidade, ao material e às necessidades do seu negócio. O escopo é definido conforme o projeto.”

**Como pedir uma proposta ou ver outros exemplos?**  
“Fale com a Rabik pelo WhatsApp.” Link com mensagem pronta; não um texto para copiar manualmente.

FAQ em details/summary ou accordion acessível. Sem formulários ou coleta de dados.

### CTA de autoria e rodapé

Só perto do final a autoria ganha mais espaço.

Título: **Essa experiência pode ganhar a sua marca.**

Apoio: “Projeto conceitual desenvolvido pela Rabik. Podemos criar uma apresentação para a sua loja com identidade própria, material real e funcionalidades definidas para o seu negócio.”

CTA principal: **Quero um site assim**, abrindo o WhatsApp de Erick.
CTA secundário: **Pedir outros exemplos**, também por link direto, com mensagem própria.

Não anunciar preço fixo deste projeto, aprovação da loja anterior ou garantia de resultados.

Rodapé: RUA STUDIO em wordmark; crédito Rabik; aviso de demonstração; e-mail de contato; voltar ao topo. Nada de Instagram, endereço, CNPJ ou unidades inventados.

Animação: linha ou campo laranja se revela ao entrar no viewport; texto sempre legível. Footer com entrada simples. Não acrescentar outro espetáculo competindo com a hero.

## Contrato das animações

| Área | Movimento desktop | Mobile | Movimento reduzido |
| --- | --- | --- | --- |
| Hero | Timeline única, pin, scrub, máscaras e profundidade | Sequência vertical curta, sem pin longo | Composição estática completa |
| Lookbook | Reveal curto, stagger e hover/focus pequeno | Entrada curta, controles por toque | Sem deslocamento |
| Filtros | Troca de resultados com crossfade discreto | Mesmo comportamento | Troca imediata |
| Editor | Crossfade de peças e mudança de acento | Mesmo fluxo em layout empilhado | Troca imediata |
| Detalhes | Parallax leve de camadas e máscara pontual | Reveal simples | Imagens estáticas |
| Manifesto | Reveal de campo gráfico | Entrada curta | Texto e imagem visíveis |
| Universo | Máscara e deslocamento sutil | Composição estática ou fade curto | Estático |
| CTA/footer | Linha/bloco e entrada breve | Entrada breve | Tudo visível |

Microinterações: aproximadamente 160–280 ms. Reveals: aproximadamente 400–650 ms. Não prolongar cada entrada para obrigar o visitante a esperar.

“Mais animações” significa movimentos coordenados em composições diferentes, não animar todo texto, girar peças ou criar efeitos aleatórios.

### Regras GSAP e React

- Usar GSAP, ScrollTrigger e a integração React apropriada, preferencialmente useGSAP de @gsap/react.
- Registrar plugins uma vez e usar escopo por componente.
- Separar a timeline da hero dos reveals inferiores.
- Usar gsap.matchMedia para layouts e preferência de movimento.
- Fazer cleanup/revert ao desmontar e ao mudar breakpoint. Evitar triggers duplicados no StrictMode.
- Encapsular handlers animados com contextSafe quando necessário ou fazer cleanup explícito.
- Preferir transform/opacity e poucas máscaras. Sem blur/sombra pesada a cada frame.
- Não animar a mesma propriedade pelo CSS e GSAP ao mesmo tempo.
- Não usar will-change em todos os elementos permanentemente.
- Não adicionar Lenis/segunda biblioteca de scroll por padrão.
- Atualizar medidas após fontes/imagens relevantes com refresh controlado, não a cada render.
- Não animar o pin container nem colocá-lo dentro de ancestor transformado sem necessidade.
- Filtros e seleção não recriam a timeline principal.
- Mostrar a página mesmo se GSAP falhar. Conteúdo essencial nunca fica permanentemente em opacity: 0.
- Sem autoplay com som, flashes, partículas, vídeo, WebGL ou sequência de frames.

## Stack e estrutura de implementação

Stack escolhida para o projeto novo:

- React + TypeScript + Vite.
- CSS organizado por componentes e tokens globais; CSS Modules é adequado.
- GSAP + ScrollTrigger + @gsap/react.
- Vitest para utilitários/estado.
- Playwright para fluxos de navegador se houver ambiente disponível.
- Sem backend, banco de dados, login, painel ou integrações de pagamento.

Use versões estáveis compatíveis com o ambiente, confira requisitos reais do Vite e registre versões no lockfile. Não instalar versões antigas só porque aparecem num exemplo.

Organização sugerida, sem arquitetura excessiva:

~~~text
src/
  assets/generated/
  components/
    SiteHeader.tsx
    HeroStory.tsx
    Lookbook.tsx
    LookDialog.tsx
    LookComposer.tsx
    DetailEditorial.tsx
    Manifesto.tsx
    ConceptWorld.tsx
    SelectionDrawer.tsx
    FAQ.tsx
    ProjectCTA.tsx
    SiteFooter.tsx
  data/
    brand.ts
    assets.ts
    looks.ts
    pieces.ts
    faq.ts
  state/
    selection.ts
    SelectionProvider.tsx
  lib/
    whatsapp.ts
    exportSelection.ts
  motion/
    hero.ts
    reveals.ts
  styles/
    tokens.css
    global.css
  App.tsx
  main.tsx
public/
  favicon.svg
  favicon-32.png
  apple-touch-icon.png
docs/
  DECISOES.md
  ASSETS.md
  HERO.md
  VALIDACAO.md
  PUBLICACAO.md
tests/
SDD_RUA_STUDIO.md
README.md
~~~

Os nomes são uma organização sugerida. Pode condensar componentes pequenos. Não crie uma lib interna, CMS ou sistema de design enorme para este site.

## Modelo de dados

Centralize conteúdo e autoria em brand.ts:

~~~ts
export const brand = {
  name: "RUA STUDIO",
  kind: "fictional-portfolio-demo",
  author: "Rabik",
  developer: "Erick Roberto Araújo Rocha",
  whatsappDigits: "5561983645763",
  email: "rabik.digital@gmail.com",
  domain: null,
  indexable: false,
};
~~~

domain fica null até um endereço real ser fornecido. indexable permanece false nesta entrega.

Cada look: ID, título, asset, alt, tags, paleta, descrição e marcação conceptual. Cada peça: ID, título, asset, tipo e paleta. Não definir campos price/stock como zero para depois escondê-los.

Estado da seleção como união tipada:

~~~ts
type SavedReference =
  | { kind: "look"; id: string }
  | {
      kind: "combination";
      baseId: "jaqueta" | "camiseta-azul" | "camiseta-oliva";
      complementId: "tenis" | "acessorios";
    };
~~~

Derivar nomes e imagens a partir dos dados atuais. IDs de combinações gerados pela dupla base/complemento. Manter exports, badge e drawer sincronizados por uma única fonte de estado.

## Links de contato: Rabik, não loja de roupas

Número confirmado pelo usuário para construção dos links: **+55 61 98364-5763**.
Somente dígitos no URL: **5561983645763**.
E-mail: **rabik.digital@gmail.com**.

Função central:

~~~ts
export function buildWhatsAppLink(message: string): string {
  return "https://wa.me/5561983645763?text=" + encodeURIComponent(message);
}
~~~

Codificar uma vez. Não usar espaços/sinal de mais no número. O clique abre mensagem preparada; nunca envia automaticamente.

Mensagem principal:

> Olá, Erick! Vi o projeto conceitual RUA STUDIO da Rabik e gostaria de conversar sobre um site semelhante para minha loja.

Mensagem de exemplos:

> Olá, Erick! Conheci a Rabik pelo projeto RUA STUDIO. Pode me enviar outros exemplos de sites e explicar as opções para o meu negócio?

Mensagem opcional a partir da seleção:

> Olá, Erick! Vi o projeto conceitual RUA STUDIO e quero uma experiência de site para minha loja. Gostei destas referências visuais: [nomes reais selecionados]. Podemos conversar sobre o projeto?

Só incluir seleção se houver itens. Usar nomes derivados do catálogo interno; não inventar referências na mensagem.

Cada link deve dizer que fala com a Rabik. No drawer, não usar “Consultar disponibilidade”, “Comprar look” ou texto ambíguo de pedido. Nenhum Pix, pagamento ou cobrança neste site.

Testar o href e a mensagem não exige enviar WhatsApp. Não iniciar conversas durante a validação.

## Acessibilidade e fallbacks

- HTML semântico, lang pt-BR, um H1 e títulos em ordem.
- Links para navegação; botões para ações; nomes acessíveis em ícones.
- Foco visível e contraste conferido, inclusive sobre laranja.
- Alt específico nas imagens de referência; camadas repetidas/decorativas com alt vazio e aria-hidden quando adequado.
- Elementos visualmente ocultos não recebem foco.
- Dialogs com foco, Escape, retorno de foco e bloqueio correto de fundo.
- Filtros, escolhas e favoritos com estado selecionado anunciado sem excesso.
- Links externos com comportamento previsível; se abrir nova aba, indicar quando necessário e usar rel adequado.
- Nenhuma informação disponível somente no hover.
- Sem barra fixa cobrindo conteúdo, CTA ou safe area.
- Preferência de movimento pode mudar com a página aberta; atualizar sem duplicar triggers.
- localStorage indisponível não impede salvar na sessão atual.
- Se GSAP não inicializar, o aplicativo React continua como página estática.
- Se todo JavaScript estiver desativado, fornecer no index.html um noscript com título, aviso de conceito, uma composição ilustrada e link de contato. Não prometer filtros/dialogs funcionando sem JavaScript numa aplicação client-side.
- Não adicionar banner de cookies decorativo, rastreadores ou analytics nesta entrega.

## Responsividade e desempenho

Validar em 360×800, 390×844, 768×1024 e 1440×900. Quando possível, conferir 1920 px e uma tela desktop de pouca altura.

- Sem overflow horizontal global.
- Imagens reservam dimensões; evitar layout shift.
- Protagonista e fundo essencial com prioridade adequada; imagens inferiores sob demanda.
- Derivações responsivas; preservar alpha e pontos focais.
- Não servir o pacote de prompts nem os PNGs de origem por acidente em public.
- Não carregar os dez PNGs grandes na primeira visita se apenas parte é visível.
- Planejar pré-carregamento limitado do azul/oliva, próximos frames da hero, sem baixar todo o editorial.
- Não carregar vídeo para substituir uma timeline de camadas.
- Bundle sem bibliotecas redundantes ou ícones inteiros desnecessários.
- Medir LCP, CLS, tamanho transferido e fluidez quando possível. Metas de referência: LCP até cerca de 2,5 s, CLS até 0,1 em teste apropriado; não afirmar aprovação sem medir.
- Se o ambiente não permitir testes, registrar a limitação. Não inventar nota de Lighthouse.

## Metadados e publicação segura

- Título: “RUA STUDIO | Streetwear interativo · Projeto Rabik”.
- Descrição: “Uma loja-conceito de streetwear criada pela Rabik. Explore referências ilustradas, monte combinações e conheça uma experiência digital para marcas de moda.”
- Favicon original derivado do símbolo geométrico, não da marca anterior.
- Social preview com as ilustrações e texto “Projeto conceitual”.
- Sem canonical inventado, sitemap com localhost, LocalBusiness, Product, AggregateRating ou MerchantListing fictícios.
- noindex para o projeto inicial. Isso não torna a página privada.
- Se for necessária restrição de acesso, usar controle real numa etapa posterior, não apenas robots.
- Quando Erick autorizar publicação, confirmar repositório, conta, projeto e domínio novos antes de qualquer deploy.
- A aprovação futura de indexação do case é separada da aprovação do deploy. Manter descrição clara de demonstração.
- Não declarar que hospedagem gratuita serve a qualquer uso comercial; conferir termos/plano do provedor antes de prometer custos.
- Crédito de autoria da Rabik não pode insinuar que uma loja real contratou ou aprovou este projeto.

## Requisitos de aceitação

| ID interno | Requisito | Evidência esperada |
| --- | --- | --- |
| SAFE-A | Projeto isolado do zero | Caminho e ausência de ligação/configuração antiga |
| SAFE-B | Nenhum material da loja anterior | Inventário de assets e busca no código/build |
| VIS-A | Hero cinematográfica com os três personagens | Capturas de começo, meio e saída no desktop |
| VIS-B | Hierarquia e contraste | Desktop/mobile conferidos |
| FUN-A | Filtros funcionais | Itens corretos e seleção preservada |
| FUN-B | Dialog de detalhe | Toque, teclado, Escape e retorno do foco |
| FUN-C | Editor com seis combinações possíveis | Imagens, paleta e nome mudam de verdade |
| FUN-D | Salvar/remover sem duplicações | Teste de estado e interação |
| FUN-E | Persistência tolerante a falha | Recarregar e storage inválido/bloqueado |
| FUN-F | Exportação real | Texto somente com referências escolhidas |
| CTA-A | WhatsApp real da Rabik e mensagem preenchida | href conferido sem enviar mensagem |
| MOT-A | Animações secundárias não alteram a hero | Nova rolagem após filtros, modal e resize |
| A11Y-A | Movimento reduzido completo | Conteúdo e controles funcionam sem pin |
| A11Y-B | Foco e semântica | Navegação por teclado |
| PERF-A | Assets otimizados e dimensões reservadas | Rede e layout conferidos |
| PUB-A | Sem publicação nem indexação acidental | noindex, domínio ausente e nenhum deploy executado |

## Testes obrigatórios e honestidade da validação

Configurar scripts utilizáveis:

- npm run dev
- npm run build
- npm run typecheck
- npm test
- npm run test:e2e, se Playwright for configurado

Não declarar que um script passou se ele não foi executado.

Testes unitários úteis:

- buildWhatsAppLink aponta para 5561983645763 e codifica corretamente acentos, linhas e caracteres.
- Salvar duas vezes não duplica; remover atualiza a quantidade.
- Deserialização rejeita referências desconhecidas, versões inválidas e JSON corrompido.
- Exportação corresponde exatamente à seleção atual.
- Combinação determina nome e ID com base nas opções reais.

Fluxos de navegador:

- Hero entra/sai sem salto; links de âncora conseguem sair do pin.
- Navegação mobile fecha ao escolher seção.
- Filtro, detalhe, salvar e seleção funcionam em sequência.
- Combinação base/complemento muda imagem, nome e paleta.
- Favoritos persistem ao recarregar quando storage funciona.
- Dialogs não se empilham, não deixam foco preso após fechar e não mudam a posição de scroll.
- A hero não duplica após resize ou preferência de movimento reduzido.
- Todos os assets carregam; console sem erros inesperados.
- Links de contratação não parecem consulta de roupa.

Faça uma busca no conteúdo gerado por resíduos da empresa anterior: nomes comerciais, username, telefone 5561993299875, endereço de Riacho Fundo, dados de avaliação e paths assets/antunes. Não copiar o material anterior para a aplicação.

Esta especificação pode mencionar a referência histórica apenas em documentação; o site, os assets servidos, metadados, texto exportado e mensagens de contato não devem mencioná-la.

## Execução por marcos locais

### Fundação

Conferir isolamento, inventariar os dez assets, criar React/TS/Vite, tokens, marca e conteúdo centralizado. Não ficar apenas no planejamento.

### Composição antes do efeito

Fazer a hero estática, o lookbook e os layouts de celular. Ajustar recortes, contraste, título e respiro antes de acrescentar movimento.

### Fluxos completos

Implementar filtros, detalhe, seleção, persistência, exportação, editor e contato da Rabik. Nenhum botão decorativo.

### Assinatura de movimento

Implementar a timeline da hero, confirmar os estados desktop/mobile/reduced-motion e isolá-la. Documentar parâmetros em docs/HERO.md.

### Expansão coordenada

Adicionar reveals, transições do editor, detalhe com parallax, manifesto, universo e CTA. Conferir que a hero continua com a mesma composição/ritmo aprovado nesta implementação.

### Validação e entrega

Rodar scripts e navegador quando disponíveis. Corrigir overflow, recortes, espaçamento, foco, erros e assets antes de concluir. Registrar resultados reais.

Não solicitar confirmação para cada detalhe criativo já definido neste SDD. Decidir dentro da direção de arte e registrar escolhas. Pedir esclarecimento somente se isolamento, autoridade, ambiente ou dados essenciais realmente bloquearem o trabalho.

## Documentação final

README.md: instalação, execução, scripts, estrutura e indicação de loja-conceito.

docs/DECISOES.md: opções de composição, stack e motivo dos ajustes.

docs/ASSETS.md: os dez arquivos, origem ilustrativa, dimensões e derivações. Não tratar imagens como estoque real ou afirmar direitos absolutos/exclusivos não verificados.

docs/HERO.md: storyboard implementado, breakpoints, duração de scroll, comportamento reduzido e limites para não quebrar a hero.

docs/VALIDACAO.md: comandos executados, resultados, capturas, tamanhos testados e limitações.

docs/PUBLICACAO.md: novo repositório ainda não informado, novo projeto de hospedagem, domínio ainda ausente, noindex e passos a confirmar. Não alterar publicação anterior.

## Critério final de qualidade

A primeira tela deve parecer uma campanha de moda com direção de arte, não um template recolorido. A hero é a cena principal. As seções inferiores exploram outras composições, não repetem o mesmo bloco. As dez imagens têm função. O visitante consegue montar e salvar referências antes de sair do site. Mobile recebe um desenho próprio.

“Premium” aqui significa proporção, hierarquia, acabamento, fluidez e funcionalidade, não texto enorme, fundo preto e mais efeitos.

Entregue o site local funcionando, comandos de execução, inventário de arquivos, validação real e capturas se possível. Não publique nem toque no projeto anterior.

## Referências técnicas primárias

Consultar a documentação atual durante a implementação:

- Vite: https://vite.dev/guide/
- ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- matchMedia: https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/
- Integração React: https://gsap.com/resources/React/

Estas referências orientam a engenharia do movimento. A direção de arte, o conteúdo e a interface são especificados neste documento e não dependem de copiar outro site.
