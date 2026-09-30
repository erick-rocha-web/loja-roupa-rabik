export type FaqItem = { question: string; answer: string; contact?: "examples" };

export const faq: FaqItem[] = [
  {
    question: "Posso comprar as roupas aqui?",
    answer: "Não. Esta é uma loja-conceito criada para demonstrar uma experiência digital. As peças são ilustrativas.",
  },
  {
    question: "O que acontece quando salvo uma referência?",
    answer: "A seleção fica neste navegador. Você pode revisar, remover e exportar as combinações que gostou.",
  },
  {
    question: "Vocês criam um site assim para uma loja real?",
    answer:
      "A Rabik pode adaptar a experiência à identidade, ao material e às necessidades do seu negócio. O escopo é definido conforme o projeto.",
  },
  {
    question: "Como pedir uma proposta ou ver outros exemplos?",
    answer: "Fale com a Rabik pelo WhatsApp.",
    contact: "examples",
  },
];
