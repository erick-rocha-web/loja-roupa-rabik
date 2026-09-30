# Publicação — ainda não realizada

Estado atual (30/09/2026):

- Repositório: **nenhum**. A pasta não é um repositório Git; nenhum commit ou push foi feito.
- Hospedagem: **nenhuma**. Não existe pasta `.vercel` nem configuração de deploy.
- Domínio: **ausente** (`brand.domain = null`). Nenhum canonical ou sitemap foi gerado.
- Indexação: bloqueada. `<meta name="robots" content="noindex, nofollow">` e `public/robots.txt` com `Disallow: /`. Isso **não** torna a página privada.

## Passos a confirmar antes de publicar

1. Erick cria um repositório GitHub vazio e novo e informa a URL.
2. Confirmar conta e criar um **novo** projeto na hospedagem, ligado a esse repositório. Não reutilizar o projeto, o domínio nem as variáveis da demonstração anterior.
3. Build: `npm run build`, saída `dist/`.
4. Definir o domínio e, se desejado, atualizar `og:image` para URL absoluta.
5. Indexação é uma aprovação separada: só então remover o `noindex` e o `Disallow` e definir `brand.indexable = true`.
6. Se for preciso restringir o acesso, usar controle de acesso real da hospedagem, não apenas robots.
7. Conferir os termos e o plano do provedor antes de prometer custo ou uso comercial.
