import { brand, notices } from "../data/brand";
import { resolveReference, type SavedReference } from "../state/selection";

// O texto é gerado a partir do estado atual + catálogo, nunca de texto salvo.
export function buildExportText(items: SavedReference[]): string {
  const lines = [
    `${brand.name} · Minha seleção de referências`,
    notices.selection,
    "",
  ];
  if (items.length === 0) {
    lines.push("Nenhuma referência salva.");
  } else {
    items.forEach((ref) => {
      const r = resolveReference(ref);
      lines.push(`- ${r.kindLabel}: ${r.title}`);
    });
  }
  lines.push("", `Projeto demonstrativo desenvolvido pela ${brand.author}. Looks e peças ilustrativos.`);
  return lines.join("\n");
}

export function downloadText(text: string, filename = "rua-studio-referencias.txt"): void {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
