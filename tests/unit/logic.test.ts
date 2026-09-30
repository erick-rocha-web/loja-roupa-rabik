import { describe, expect, it } from "vitest";
import { buildSelectionMessage, buildWhatsAppLink, messages } from "../../src/lib/whatsapp";
import { buildExportText } from "../../src/lib/exportSelection";
import { bases, combinationId, combinationTitle, complements } from "../../src/data/pieces";
import { filterLooks } from "../../src/data/looks";
import {
  addReference,
  deserializeSelection,
  readStoredSelection,
  referenceKey,
  removeReference,
  serializeSelection,
  writeStoredSelection,
  type SavedReference,
} from "../../src/state/selection";

const laranja: SavedReference = { kind: "look", id: "look-laranja" };
const combo: SavedReference = { kind: "combination", baseId: "jaqueta", complementId: "tenis" };

describe("buildWhatsAppLink", () => {
  it("aponta para o número da Rabik e codifica acentos, linhas e símbolos", () => {
    const href = buildWhatsAppLink("Olá, Erick!\nCombinação: azul & oliva #1 + 100%?");
    expect(href.startsWith("https://wa.me/5561983645763?text=")).toBe(true);
    const text = href.split("?text=")[1];
    expect(text).not.toMatch(/[ \n&#+]/);
    expect(decodeURIComponent(text)).toBe("Olá, Erick!\nCombinação: azul & oliva #1 + 100%?");
  });

  it("mensagens deixam claro que o assunto é desenvolvimento de site", () => {
    expect(messages.project).toContain("site semelhante para minha loja");
    expect(messages.examples).toContain("outros exemplos de sites");
  });

  it("mensagem de seleção usa somente nomes reais e cai para a principal quando vazia", () => {
    expect(buildSelectionMessage(["Camadas em laranja"])).toContain("Gostei destas referências visuais: Camadas em laranja.");
    expect(buildSelectionMessage([])).toBe(messages.project);
  });
});

describe("seleção", () => {
  it("salvar duas vezes não duplica e remover atualiza a quantidade", () => {
    let items = addReference([], laranja);
    items = addReference(items, laranja);
    items = addReference(items, combo);
    items = addReference(items, { ...combo });
    expect(items).toHaveLength(2);
    items = removeReference(items, referenceKey(laranja));
    expect(items).toEqual([combo]);
  });

  it("serializa e restaura o formato versionado", () => {
    const raw = serializeSelection([laranja, combo]);
    expect(deserializeSelection(raw)).toEqual([laranja, combo]);
  });

  it("rejeita JSON corrompido, versão inválida e referências desconhecidas", () => {
    expect(deserializeSelection("{nope")).toEqual([]);
    expect(deserializeSelection(JSON.stringify({ version: 2, items: [laranja] }))).toEqual([]);
    expect(deserializeSelection(JSON.stringify([laranja]))).toEqual([]);
    const mixed = JSON.stringify({
      version: 1,
      items: [
        laranja,
        { kind: "look", id: "look-inexistente" },
        { kind: "combination", baseId: "jaqueta", complementId: "chapeu" },
        { kind: "combination", baseId: "moletom", complementId: "tenis" },
        { kind: "look", id: "look-laranja", title: "Texto arbitrário" },
        "lixo",
        null,
      ],
    });
    expect(deserializeSelection(mixed)).toEqual([laranja]);
  });

  it("tolera storage indisponível ou que lança erro", () => {
    const broken = {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("quota");
      },
    };
    expect(readStoredSelection(broken)).toEqual([]);
    expect(writeStoredSelection(broken, [laranja])).toBe(false);
    expect(readStoredSelection(null)).toEqual([]);
  });
});

describe("combinações", () => {
  it("gera seis combinações com IDs e nomes determinísticos", () => {
    const ids = bases.flatMap((b) => complements.map((c) => combinationId(b.id, c.id)));
    expect(new Set(ids).size).toBe(6);
    expect(combinationId("jaqueta", "tenis")).toBe("combination-jaqueta-tenis");
    expect(combinationTitle("camiseta-oliva", "acessorios")).toBe("Camiseta oliva + Acessórios");
  });
});

describe("filtros", () => {
  it("retornam somente looks associados", () => {
    expect(filterLooks("Todos")).toHaveLength(3);
    expect(filterLooks("Sobreposições").map((l) => l.id)).toEqual(["look-laranja"]);
    expect(filterLooks("Jeans").map((l) => l.id)).toEqual(["look-azul", "look-oliva"]);
  });
});

describe("exportação", () => {
  it("corresponde exatamente à seleção atual", () => {
    const text = buildExportText([combo, laranja]);
    expect(text).toContain("- Combinação: Jaqueta laranja + Tênis street");
    expect(text).toContain("- Look: Camadas em laranja");
    expect(text).not.toContain("Oversized em azul");
    expect(text).toContain("Não reservam produtos nem representam um pedido.");
    expect(text.match(/^- /gm)).toHaveLength(2);
  });
});
