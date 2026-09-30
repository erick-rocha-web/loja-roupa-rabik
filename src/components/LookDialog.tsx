import { images } from "../data/assets";
import { getLook, type LookId } from "../data/looks";
import type { BaseId } from "../data/pieces";
import { Palette, SaveLookButton } from "./Lookbook";
import { CloseButton } from "./Modal";
import "./LookDialog.css";

const baseForLook: Record<LookId, BaseId> = {
  "look-laranja": "jaqueta",
  "look-azul": "camiseta-azul",
  "look-oliva": "camiseta-oliva",
};

const baseLabel: Record<BaseId, string> = {
  jaqueta: "Montar com a jaqueta laranja",
  "camiseta-azul": "Montar com a camiseta azul",
  "camiseta-oliva": "Montar com a camiseta oliva",
};

type Props = {
  id: LookId;
  onClose: () => void;
  onCompose: (base: BaseId) => void;
};

export function LookDialog({ id, onClose, onCompose }: Props) {
  const look = getLook(id);
  const img = images[look.image];
  const base = baseForLook[id];
  return (
    <div className={`look-dialog family-${look.family}`}>
      <div className="look-dialog__media">
        <span className="look-dialog__shape" aria-hidden="true" />
        <img src={img.src} srcSet={img.srcSet} sizes="(min-width: 860px) 480px, 90vw" width={img.width} height={img.height} alt={look.alt} />
      </div>
      <div className="look-dialog__body">
        <div className="look-dialog__top">
          <p className="eyebrow">Referência ilustrada</p>
          <CloseButton onClick={onClose} />
        </div>
        <h2 id="look-dialog-title" className="look-dialog__title">
          {look.title}
        </h2>
        <p className="look-dialog__tags">{look.tags.join(" · ")}</p>
        <Palette look={look} />
        <p className="look-dialog__text">{look.description}</p>
        <div className="look-dialog__actions">
          <SaveLookButton look={look} />
          <button type="button" className="btn btn--small" onClick={() => onCompose(base)}>
            {baseLabel[base]}
          </button>
        </div>
        <p className="look-dialog__note">Ilustração conceitual. Não representa um produto à venda.</p>
      </div>
    </div>
  );
}
