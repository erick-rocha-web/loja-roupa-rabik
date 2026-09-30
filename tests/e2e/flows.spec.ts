import { expect, test, type Page } from "@playwright/test";

const KEY = "rua-studio:selection:v1";

function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  return errors;
}

const isDesktop = (page: Page) => (page.viewportSize()?.width ?? 0) >= 1024;

test.describe("hero", () => {
  test("cinema: um único pin, saída pelas âncoras e sem duplicar após resize", async ({ page }) => {
    test.skip(!isDesktop(page), "somente desktop");
    const errors = trackErrors(page);
    await page.goto("/");
    await expect(page.locator(".hero.is-cinema")).toHaveCount(1);
    // Pin da hero + fixação curta da cena "O detalhe muda tudo".
    await expect(page.locator(".hero .pin-spacer")).toHaveCount(1);
    await expect(page.locator(".pin-spacer")).toHaveCount(2);

    // Percorre a hero inteira e volta.
    for (const y of [0, 600, 1200, 1800, 2400, 1200, 0]) {
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(150);
    }

    // Resize para mobile e de volta: a hero não pode duplicar.
    await page.setViewportSize({ width: 800, height: 900 });
    await page.waitForTimeout(400);
    await expect(page.locator(".pin-spacer")).toHaveCount(0);
    await expect(page.locator(".hero.is-cinema")).toHaveCount(0);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(400);
    await expect(page.locator(".hero .pin-spacer")).toHaveCount(1);
    await expect(page.locator(".pin-spacer")).toHaveCount(2);

    // Âncora do cabeçalho sai do pin e chega à vitrine.
    await page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Looks" }).click();
    await expect(page.locator("#looks-title")).toBeInViewport({ timeout: 5000 });
    expect(errors).toEqual([]);
  });

  test("mobile: sequência vertical sem pin", async ({ page }) => {
    test.skip(isDesktop(page), "somente mobile");
    await page.goto("/");
    await expect(page.locator(".pin-spacer")).toHaveCount(0);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: "Explorar os looks" })).toBeInViewport();
    await expect(page.locator(".hero__sequence")).toBeVisible();
  });
});

test("menu mobile fecha ao escolher uma seção", async ({ page }) => {
  test.skip(isDesktop(page), "somente mobile");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Menu" });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("link", { name: "Monte sua combinação" }).click();
  await expect(page.locator(".site-header__links")).toBeHidden();
  await expect(page.locator("#combinacao-title")).toBeInViewport({ timeout: 5000 });
});

test("filtro → detalhe → salvar → seleção → exportar", async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto("/#looks");
  const looks = page.locator("#looks");

  await looks.getByRole("button", { name: "Camisetas" }).click();
  await expect(looks.locator(".look-card")).toHaveCount(2);
  await expect(looks.locator(".look-card").first()).toContainText("Oversized em azul");
  await expect(looks.locator(".look-card").first()).toHaveCSS("opacity", "1");
  await expect(looks.locator(".lookbook__grid")).not.toHaveAttribute("style", /opacity/); // crossfade concluído

  // Detalhe: abre, fecha com Escape, devolve o foco e não muda a rolagem.
  const trigger = looks.locator(".look-card").first().getByRole("button", { name: "Ver composição" });
  await trigger.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const y0 = await page.evaluate(() => window.scrollY);
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Oversized em azul" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Referência ilustrada");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  expect(Math.abs((await page.evaluate(() => window.scrollY)) - y0)).toBeLessThan(2);

  // Salvar pelo dialog; favorito sobrevive à troca de filtro.
  await trigger.click();
  await dialog.getByRole("button", { name: "Salvar referência" }).click();
  await expect(dialog.getByRole("button", { name: "Referência salva" })).toHaveAttribute("aria-pressed", "true");
  await dialog.getByRole("button", { name: "Fechar" }).click();
  await expect(dialog).toBeHidden();
  await looks.getByRole("button", { name: "Todos" }).click();
  await expect(looks.locator(".look-card")).toHaveCount(3);
  await expect(looks.getByRole("button", { name: "Referência salva" })).toHaveCount(1);
  await looks.locator(".look-card", { hasText: "Camadas em laranja" }).getByRole("button", { name: "Salvar referência" }).click();

  // Seleção.
  await page.getByRole("button", { name: /Minha seleção, 2 referências salvas/ }).click();
  const drawer = page.getByRole("dialog", { name: "Minha seleção" });
  await expect(drawer).toBeVisible();
  await expect(drawer.locator(".drawer__item")).toHaveCount(2);
  await expect(drawer).toContainText("Não reservam produtos nem representam um pedido.");

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    drawer.getByRole("button", { name: "Exportar referências (.txt)" }).click(),
  ]);
  const text = await (await download.createReadStream()).toArray().then((c) => Buffer.concat(c).toString("utf8"));
  expect(download.suggestedFilename()).toBe("rua-studio-referencias.txt");
  expect(text).toContain("- Look: Oversized em azul");
  expect(text).toContain("- Look: Camadas em laranja");
  expect(text).not.toContain("Oliva e jeans");

  const contact = drawer.getByRole("link", { name: /Quero essa experiência para minha loja/ });
  const href = (await contact.getAttribute("href"))!;
  expect(href.startsWith("https://wa.me/5561983645763?text=")).toBe(true);
  expect(decodeURIComponent(href.split("?text=")[1])).toContain("Gostei destas referências visuais: Oversized em azul, Camadas em laranja.");

  // Remover, limpar e desfazer.
  await drawer.getByRole("button", { name: "Remover Camadas em laranja" }).click();
  await expect(drawer.locator(".drawer__item")).toHaveCount(1);
  await drawer.getByRole("button", { name: "Limpar seleção" }).click();
  await expect(drawer.locator(".drawer__item")).toHaveCount(0);
  await drawer.getByRole("button", { name: "Desfazer" }).click();
  await expect(drawer.locator(".drawer__item")).toHaveCount(1);
  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();
  expect(await page.locator("dialog[open]").count()).toBe(0);
  expect(errors).toEqual([]);
});

test("editor: seis combinações reais, salvar sem duplicar e restaurar", async ({ page }) => {
  await page.goto("/#combinacao");
  const section = page.locator("#combinacao");
  await expect(section.locator(".composer__title")).toHaveText("Jaqueta laranja + Tênis street");

  await section.getByRole("radio", { name: "Camiseta oliva" }).check({ force: true });
  await section.getByRole("radio", { name: "Acessórios" }).check({ force: true });
  await expect(section.locator(".composer__title")).toHaveText("Camiseta oliva + Acessórios");
  await expect(section).toHaveAttribute("style", /--accent:\s*#62694A/i);
  await expect(section.locator(".composer__base img[alt]:not([alt=''])")).toHaveAttribute("src", /camiseta-oliva/);
  await expect(section.locator(".composer__complement img[alt]:not([alt=''])")).toHaveAttribute("src", /acessorios/);
  await page.waitForTimeout(400);
  await expect(section.locator(".composer__base img")).toHaveCount(1);

  // Cliques rápidos terminam no estado mais recente.
  for (const name of ["Camiseta azul", "Jaqueta laranja", "Camiseta azul"]) {
    await section.getByRole("radio", { name }).check({ force: true });
  }
  await page.waitForTimeout(500);
  await expect(section.locator(".composer__base img")).toHaveCount(1);
  await expect(section.locator(".composer__base img")).toHaveAttribute("src", /camiseta-azul/);

  const save = section.getByRole("button", { name: /Salvar combinação|Combinação salva/ });
  await save.click();
  await save.click();
  await save.click();
  const stored = await page.evaluate((k) => JSON.parse(localStorage.getItem(k) || "{}"), KEY);
  expect(stored.items).toEqual([{ kind: "combination", baseId: "camiseta-azul", complementId: "acessorios" }]);

  await section.getByRole("button", { name: "Restaurar escolhas" }).click();
  await expect(section.locator(".composer__title")).toHaveText("Jaqueta laranja + Tênis street");
  await expect(section.getByRole("radio", { name: "Jaqueta laranja" })).toBeChecked();
});

test("persistência: recarregar mantém; storage corrompido ou bloqueado não quebra", async ({ page, context }) => {
  await page.goto("/#looks");
  await page.locator(".look-card", { hasText: "Oliva e jeans" }).getByRole("button", { name: "Salvar referência" }).click();
  await page.reload();
  await expect(page.getByRole("button", { name: /Minha seleção, 1 referência salva/ })).toBeVisible();

  const errors = trackErrors(page);
  await page.evaluate((k) => localStorage.setItem(k, "{corrompido"), KEY);
  await page.reload();
  await expect(page.getByRole("button", { name: /Minha seleção, 0 referências salvas/ })).toBeVisible();
  expect(errors).toEqual([]);

  const blocked = await context.newPage();
  await blocked.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("SecurityError: storage bloqueado");
      },
    });
  });
  const blockedErrors = trackErrors(blocked);
  await blocked.goto("/#looks");
  await blocked.locator(".look-card", { hasText: "Camadas em laranja" }).getByRole("button", { name: "Salvar referência" }).click();
  await expect(blocked.getByRole("button", { name: /Minha seleção, 1 referência salva/ })).toBeVisible();
  await blocked.getByRole("button", { name: /Minha seleção/ }).click();
  await expect(blocked.getByRole("dialog", { name: "Minha seleção" })).toContainText("salvas apenas nesta visita");
  expect(blockedErrors).toEqual([]);
});

test("links de contratação apontam para a Rabik com mensagem de site", async ({ page }) => {
  await page.goto("/");
  const hrefs = await page.locator('a[href*="wa.me"]').evaluateAll((els) => els.map((e) => e.getAttribute("href")!));
  expect(hrefs.length).toBeGreaterThanOrEqual(3);
  for (const href of hrefs) {
    expect(href.startsWith("https://wa.me/5561983645763?text=")).toBe(true);
    const msg = decodeURIComponent(href.split("?text=")[1]);
    expect(msg).toMatch(/site/);
    expect(msg).not.toMatch(/comprar|pedido|disponibilidade|tamanho/i);
  }
  await expect(page.locator("a", { hasText: /Comprar|Consultar disponibilidade/ })).toHaveCount(0);
});

test("sem overflow horizontal e com um único H1", async ({ page }) => {
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

test.describe("movimento reduzido", () => {
  test.use({ reducedMotion: "reduce" });

  test("composição estática completa, sem pin, conteúdo visível", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".pin-spacer")).toHaveCount(0);
    await expect(page.locator(".hero.is-cinema")).toHaveCount(0);
    await expect(page.locator(".hero__sequence")).toBeVisible();
    await expect(page.locator(".hero__sequence img")).toHaveCount(2);
    for (const sel of [".look-card", ".composer__board", ".manifesto__panel", ".detail__sneakers", ".detail__acc", ".detail__quote", ".cta__title"]) {
      await page.locator(sel).first().scrollIntoViewIfNeeded();
      await expect(page.locator(sel).first()).toHaveCSS("opacity", "1");
    }
    await expect(page.locator(".manifesto__sweep")).toBeHidden();
    await page.locator("#looks").getByRole("button", { name: "Jeans" }).click();
    await expect(page.locator(".look-card")).toHaveCount(2);
  });
});

test.describe("cards e cenas secundárias", () => {
  for (const vp of [
    { width: 1366, height: 768 },
    { width: 1440, height: 900 },
    { width: 768, height: 1024 },
    { width: 390, height: 844 },
  ]) {
    test(`cards compactos, inteiros e estáveis em ${vp.width}×${vp.height}`, async ({ page }) => {
      await page.setViewportSize(vp);
      await page.goto("/");
      const grid = page.locator(".lookbook__grid");
      await grid.scrollIntoViewIfNeeded();
      // Rola além do fim da entrada para que a cena se encerre.
      await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.6));
      await page.waitForTimeout(1200);
      const cards = await page.locator(".look-card").evaluateAll((els) =>
        els.map((c) => {
          const media = c.querySelector(".look-card__media")!.getBoundingClientRect();
          const img = c.querySelector(".look-card__media img") as HTMLImageElement;
          return {
            card: c.getBoundingClientRect().height,
            media: media.height,
            overflow: c.scrollHeight - c.clientHeight,
            transform: getComputedStyle(c).transform,
            opacity: getComputedStyle(c).opacity,
            fit: getComputedStyle(img).objectFit,
          };
        }),
      );
      for (const c of cards) {
        expect(c.card).toBeLessThan(vp.height - 76); // o card inteiro cabe abaixo do cabeçalho
        expect(c.media).toBeLessThanOrEqual(360);
        expect(c.overflow).toBeLessThanOrEqual(0);
        expect(c.transform).toBe("none");
        expect(c.opacity).toBe("1");
        expect(c.fit).toBe("contain");
      }
      if (vp.width >= 1024) for (const c of cards) expect(c.media).toBeGreaterThanOrEqual(260);
    });
  }

  for (const vp of [
    { width: 1366, height: 768 },
    { width: 1440, height: 900 },
    { width: 768, height: 1024 },
    { width: 390, height: 844 },
  ]) {
    test(`quadro do editor cabe na tela em ${vp.width}×${vp.height}`, async ({ page }) => {
      await page.setViewportSize(vp);
      await page.goto("/#combinacao");
      await page.waitForTimeout(800);
      const h = await page.locator(".composer__board").evaluate((el) => el.getBoundingClientRect().height);
      expect(h).toBeLessThanOrEqual(Math.min(520, vp.height * 0.62));
      expect(h).toBeGreaterThanOrEqual(300);
    });
  }

  test("filtrar durante a entrada não deixa cards invisíveis", async ({ page }) => {
    test.skip(!isDesktop(page), "entrada por planos só no desktop");
    await page.goto("/");
    const top = await page.locator(".lookbook__grid").evaluate((el) => el.getBoundingClientRect().top + window.scrollY);
    await page.evaluate((y) => window.scrollTo(0, y - window.innerHeight * 0.8), top);
    await page.waitForTimeout(600);
    await page.locator("#looks").getByRole("button", { name: "Jeans" }).click();
    await page.waitForTimeout(600);
    for (const card of await page.locator(".look-card").all()) {
      await expect(card).toHaveCSS("opacity", "1");
      await expect(card).toHaveCSS("transform", "none");
    }
  });

  test("cena do detalhe termina com todas as peças e o texto visíveis", async ({ page }) => {
    test.skip(!isDesktop(page), "cena fixada só no desktop");
    await page.goto("/");
    await page.locator(".detail").scrollIntoViewIfNeeded();
    const top = await page.locator(".detail").evaluate((el) => el.getBoundingClientRect().top + window.scrollY);
    await page.evaluate((y) => window.scrollTo(0, y + window.innerHeight * 0.95), top);
    await page.waitForTimeout(1200);
    for (const sel of [".detail__jacket", ".detail__sneakers", ".detail__acc", ".detail__quote"]) {
      await expect(page.locator(sel)).toBeInViewport({ ratio: 0.95 });
    }
    await expect(page.locator(".detail__quote")).toHaveCSS("opacity", "1");
    await expect(page.locator(".detail__sneakers")).toHaveCSS("clip-path", /inset\(0(%|px)?( 0(%|px)?)*\)|none/);
  });
});
