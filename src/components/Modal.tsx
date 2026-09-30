import { useEffect, useRef, type ReactNode } from "react";
import "./Modal.css";

type Props = {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  variant: "center" | "drawer";
  children: ReactNode;
};

// <dialog> nativo: foco contido, Escape, fundo inerte. Aqui: retorno de foco,
// bloqueio de rolagem sem deslocamento e fechamento pelo clique no fundo.
export function Modal({ open, onClose, labelledBy, variant, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      returnTo.current = document.activeElement as HTMLElement | null;
      document.body.classList.add("is-locked");
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handleClose = () => {
      const otherOpen = document.querySelector("dialog[open]");
      if (!otherOpen) document.body.classList.remove("is-locked");
      const target = returnTo.current;
      returnTo.current = null;
      if (!otherOpen && target && document.contains(target)) target.focus({ preventScroll: true });
      onCloseRef.current();
    };
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  // Garante o desbloqueio se o componente desmontar aberto.
  useEffect(() => () => document.body.classList.remove("is-locked"), []);

  return (
    <dialog
      ref={ref}
      className={`modal modal--${variant}`}
      aria-labelledby={labelledBy}
      onClick={(e) => {
        if (e.target === e.currentTarget) ref.current?.close();
      }}
    >
      <div className="modal__inner">{open ? children : null}</div>
    </dialog>
  );
}

export function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="modal__close" onClick={onClick}>
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" />
      </svg>
      Fechar
    </button>
  );
}
