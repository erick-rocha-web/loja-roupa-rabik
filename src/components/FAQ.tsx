import { faq } from "../data/faq";
import { buildWhatsAppLink, messages } from "../lib/whatsapp";
import "./FAQ.css";

export function FAQ() {
  return (
    <section className="faq" aria-labelledby="faq-title">
      <div className="container faq__grid">
        <div className="faq__head">
          <p className="eyebrow faq__kicker">Dúvidas</p>
          <h2 id="faq-title" className="section-title">
            Perguntas diretas
          </h2>
        </div>
        <div className="faq__list">
          {faq.map((item) => (
            <details key={item.question} className="faq__item">
              <summary>
                <span>{item.question}</span>
                <span className="faq__icon" aria-hidden="true" />
              </summary>
              <div className="faq__answer">
                <p>{item.answer}</p>
                {item.contact === "examples" && (
                  <a className="text-link" href={buildWhatsAppLink(messages.examples)} target="_blank" rel="noopener noreferrer">
                    Falar com a Rabik no WhatsApp
                    <span className="sr-only"> (desenvolvimento de sites, abre em nova aba)</span>
                  </a>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
