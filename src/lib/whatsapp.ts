import { brand } from "../data/brand";

// Links abrem uma mensagem preparada para a Rabik (desenvolvimento de sites). Nunca enviam nada sozinhos.
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${brand.whatsappDigits}?text=` + encodeURIComponent(message);
}

export const messages = {
  project: `Olá, Erick! Vi o projeto conceitual ${brand.name} da Rabik e gostaria de conversar sobre um site semelhante para minha loja.`,
  examples: `Olá, Erick! Conheci a Rabik pelo projeto ${brand.name}. Pode me enviar outros exemplos de sites e explicar as opções para o meu negócio?`,
};

export function buildSelectionMessage(titles: string[]): string {
  if (titles.length === 0) return messages.project;
  return `Olá, Erick! Vi o projeto conceitual ${brand.name} e quero uma experiência de site para minha loja. Gostei destas referências visuais: ${titles.join(", ")}. Podemos conversar sobre o projeto?`;
}
