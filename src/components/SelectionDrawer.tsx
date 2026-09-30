import { useEffect, useRef, useState } from "react";
import { images } from "../data/assets";
import { notices } from "../data/brand";
import { buildExportText, copyText, downloadText } from "../lib/exportSelection";
import { buildSelectionMessage, buildWhatsAppLink } from "../lib/whatsapp";
import { resolveReference, type SavedReference } from "../state/selection";
import { useSelection } from "../state/SelectionProvider";
import { CloseButton } from "./Modal";
import "./SelectionDrawer.css";

type Props = { onClose: () => void; onExplore: () => void };

export function SelectionDrawer({ onClose, onExplore }: Props) {
  const { items, remove, clear, restore, persistent } = useSelection();
  const [status, setStatus] = useState("");
  const [undo, setUndo] = useState<SavedReference[] | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const resolved = items.map(resolveReference);

  useEffect(() => {
    if (!undo) return;
    const t = setTimeout(() => setUndo(null), 10000);
    return () => clearTimeout(t);
  }, [undo]);

  const exportFile = () => {
    downloadText(buildExportText(items));
    setStatus("Arquivo rua-studio-referencias.txt gerado.");
  };

  const copy = async () => {
    const ok = await copyText(buildExportText(items));
    setStatus(ok ? "Texto das referências copiado." : "Não foi possível copiar. Use o arquivo .txt.");
  };

  const contactHref = buildWhatsAppLink(buildSelectionMessage(resolved.map((r) => r.title)));

  return (
    <div className="drawer">
      <div className="drawer__head">
        <h2 id="selection-title" className="drawer__title" tabIndex={-1} ref={heading}>
          Minha seleção
        </h2>
        <CloseButton onClick={onClose} />
      </div>
      <p className="drawer__count">
        {items.length === 1 ? "1 referência" : `${items.length} referências`}
        {!persistent && " · salvas apenas nesta visita (armazenamento do navegador indisponível)"}
      </p>

      {items.length === 0 ? (
        <div className="drawer__empty">
          <p>Nenhuma referência salva ainda. Salve looks ou monte uma combinação para revisar aqui.</p>
          <button type="button" className="btn" onClick={onExplore}>
            Explorar os looks
          </button>
        </div>
      ) : (
        <ul className="drawer__list" role="list">
          {resolved.map((r) => (
            <li key={r.key} className="drawer__item">
              <div className={`drawer__thumbs drawer__thumbs--${r.images.length}`} aria-hidden="true">
                {r.images.map((k) => (
                  <img key={k} src={images[k].small} width="64" height="64" alt="" loading="lazy" />
                ))}
              </div>
              <div className="drawer__meta">
                <p className="drawer__kind">{r.kindLabel}</p>
                <p className="drawer__name">{r.title}</p>
              </div>
              <button
                type="button"
                className="drawer__remove"
                aria-label={`Remover ${r.title}`}
                onClick={() => {
                  remove(r.key);
                  setStatus(`${r.title} removida.`);
                  heading.current?.focus();
                }}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}

      {undo && (
        <p className="drawer__undo">
          Seleção limpa.{" "}
          <button
            type="button"
            className="drawer__link"
            onClick={() => {
              restore(undo);
              setUndo(null);
              setStatus("Seleção restaurada.");
            }}
          >
            Desfazer
          </button>
        </p>
      )}

      {items.length > 0 && (
        <div className="drawer__actions">
          <button type="button" className="btn" onClick={exportFile}>
            Exportar referências (.txt)
          </button>
          <button type="button" className="btn btn--ghost" onClick={copy}>
            Copiar texto
          </button>
          <button
            type="button"
            className="drawer__link drawer__clear"
            onClick={() => {
              setUndo(clear());
              setStatus("Seleção limpa. Você pode desfazer.");
              heading.current?.focus();
            }}
          >
            Limpar seleção
          </button>
        </div>
      )}

      <p className="drawer__status" role="status">
        {status}
      </p>

      <p className="drawer__notice">{notices.selection}</p>

      <div className="drawer__contact">
        <a className="text-link" href={contactHref} target="_blank" rel="noopener noreferrer">
          Quero essa experiência para minha loja
          <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
        </a>
        <p>Contato com a Rabik sobre desenvolvimento de sites. Abre o WhatsApp com uma mensagem pronta{items.length > 0 ? " citando as referências escolhidas" : ""}; nada é enviado automaticamente.</p>
      </div>
    </div>
  );
}
