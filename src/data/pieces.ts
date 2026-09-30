import type { ImageKey } from "./assets";
import type { Swatch } from "./looks";

export type BaseId = "jaqueta" | "camiseta-azul" | "camiseta-oliva";
export type ComplementId = "tenis" | "acessorios";

export type Piece<Id extends string> = {
  id: Id;
  title: string;
  kind: "base" | "complemento";
  image: ImageKey;
  alt: string;
  palette: Swatch[];
};

export type BasePiece = Piece<BaseId> & {
  family: "orange" | "blue" | "olive";
  accent: string;
  tint: string;
  mood: string;
};

export const bases: BasePiece[] = [
  {
    id: "jaqueta",
    title: "Jaqueta laranja",
    kind: "base",
    image: "jaqueta",
    alt: "Jaqueta laranja ilustrada, ampla, com bolsos frontais de lapela e forro oliva.",
    palette: [
      { name: "Laranja", hex: "#FF5A1F" },
      { name: "Oliva", hex: "#4E5238" },
    ],
    family: "orange",
    accent: "#FF5A1F",
    tint: "#F6DDD0",
    mood: "Sinal laranja",
  },
  {
    id: "camiseta-azul",
    title: "Camiseta azul",
    kind: "base",
    image: "camisetaAzul",
    alt: "Camiseta azul ilustrada, oversized, de gola careca canelada.",
    palette: [{ name: "Azul", hex: "#1454C0" }],
    family: "blue",
    accent: "#1454C0",
    tint: "#DDE4F2",
    mood: "Azul de quadra",
  },
  {
    id: "camiseta-oliva",
    title: "Camiseta oliva",
    kind: "base",
    image: "camisetaOliva",
    alt: "Camiseta oliva ilustrada, ampla, com caimento levemente franzido.",
    palette: [{ name: "Oliva", hex: "#62694A" }],
    family: "olive",
    accent: "#62694A",
    tint: "#E4E5D9",
    mood: "Oliva de concreto",
  },
];

export const complements: Piece<ComplementId>[] = [
  {
    id: "tenis",
    title: "Tênis street",
    kind: "complemento",
    image: "tenis",
    alt: "Par de tênis robustos ilustrados em marfim, grafite, oliva e laranja, sobre fundo escuro.",
    palette: [
      { name: "Marfim", hex: "#EDE6D8" },
      { name: "Grafite", hex: "#2E2E2E" },
      { name: "Laranja", hex: "#FF5A1F" },
    ],
  },
  {
    id: "acessorios",
    title: "Acessórios",
    kind: "complemento",
    image: "acessorios",
    alt: "Conjunto ilustrado de acessórios: boné grafite, corrente prateada, dois anéis e bolsa transversal laranja, sobre fundo escuro.",
    palette: [
      { name: "Grafite", hex: "#2E2E2E" },
      { name: "Prata", hex: "#A7A39B" },
      { name: "Laranja", hex: "#FF5A1F" },
    ],
  },
];

export const defaultCombination: { baseId: BaseId; complementId: ComplementId } = {
  baseId: "jaqueta",
  complementId: "tenis",
};

export const isBaseId = (v: unknown): v is BaseId => bases.some((b) => b.id === v);
export const isComplementId = (v: unknown): v is ComplementId => complements.some((c) => c.id === v);

export function getBase(id: BaseId): BasePiece {
  return bases.find((b) => b.id === id)!;
}

export function getComplement(id: ComplementId): Piece<ComplementId> {
  return complements.find((c) => c.id === id)!;
}

export function combinationId(baseId: BaseId, complementId: ComplementId): string {
  return `combination-${baseId}-${complementId}`;
}

export function combinationTitle(baseId: BaseId, complementId: ComplementId): string {
  return `${getBase(baseId).title} + ${getComplement(complementId).title}`;
}

export function combinationSummary(baseId: BaseId, complementId: ComplementId): string {
  const base = getBase(baseId);
  const comp = getComplement(complementId);
  return `${base.mood}: ${base.title.toLowerCase()} ao lado de ${comp.title.toLowerCase()}, com acento na família ${base.palette[0].name.toLowerCase()}.`;
}
