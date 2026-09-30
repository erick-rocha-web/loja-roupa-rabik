import type { ImageKey } from "./assets";

export type LookTag = "Sobreposições" | "Camisetas" | "Jeans";
export type LookId = "look-laranja" | "look-azul" | "look-oliva";

export type Swatch = { name: string; hex: string };

export type Look = {
  id: LookId;
  title: string;
  image: ImageKey;
  alt: string;
  tags: LookTag[];
  family: "orange" | "blue" | "olive";
  palette: Swatch[];
  description: string;
  conceptual: true;
};

export const looks: Look[] = [
  {
    id: "look-laranja",
    title: "Camadas em laranja",
    image: "personagemLaranja",
    alt: "Personagem ilustrada caminhando com jaqueta laranja aberta, camiseta clara com grafismo geométrico, calça cargo grafite e tênis claro.",
    tags: ["Sobreposições"],
    family: "orange",
    palette: [
      { name: "Laranja", hex: "#FF5A1F" },
      { name: "Marfim", hex: "#F3F1EB" },
      { name: "Grafite", hex: "#3A3A3A" },
    ],
    description:
      "Jaqueta de presença forte, base clara e tons grafite. Uma combinação que usa a sobreposição como ponto de atenção.",
    conceptual: true,
  },
  {
    id: "look-azul",
    title: "Oversized em azul",
    image: "lookAzul",
    alt: "Personagem ilustrado com boné, óculos escuros, camiseta azul oversized, jeans escuro largo com pequena bolsa laranja e tênis azul e branco.",
    tags: ["Camisetas", "Jeans"],
    family: "blue",
    palette: [
      { name: "Azul", hex: "#1454C0" },
      { name: "Jeans escuro", hex: "#3B3B3E" },
      { name: "Laranja", hex: "#FF5A1F" },
    ],
    description: "Azul como protagonista, linhas amplas e jeans escuro. Uma referência de proporção e contraste.",
    conceptual: true,
  },
  {
    id: "look-oliva",
    title: "Oliva e jeans",
    image: "lookOliva",
    alt: "Personagem ilustrada com tranças longas, camiseta oliva ampla, bermuda jeans escura com recortes claros, meias laranja e tênis grafite.",
    tags: ["Camisetas", "Jeans"],
    family: "olive",
    palette: [
      { name: "Oliva", hex: "#62694A" },
      { name: "Grafite", hex: "#2B2B2B" },
      { name: "Laranja", hex: "#FF5A1F" },
    ],
    description:
      "Tons oliva e grafite, textura jeans e uma silhueta descontraída. Uma combinação de cor sóbria com volume.",
    conceptual: true,
  },
];

export const lookFilters = ["Todos", "Sobreposições", "Camisetas", "Jeans"] as const;
export type LookFilter = (typeof lookFilters)[number];

export function filterLooks(filter: LookFilter): Look[] {
  return filter === "Todos" ? looks : looks.filter((l) => l.tags.includes(filter));
}

export function isLookId(id: unknown): id is LookId {
  return looks.some((l) => l.id === id);
}

export function getLook(id: LookId): Look {
  return looks.find((l) => l.id === id)!;
}
