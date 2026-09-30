import { useEffect, useId, useRef, useState } from "react";
import { notices } from "../data/brand";
import { useSelection } from "../state/SelectionProvider";
import { Wordmark } from "./Logo";
import "./SiteHeader.css";

const links = [
  { href: "#looks", label: "Looks" },
  { href: "#combinacao", label: "Monte sua combinação" },
  { href: "#conceito", label: "O conceito" },
];

export function SiteHeader({ onOpenSelection }: { onOpenSelection: () => void }) {
  const { count } = useSelection();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const countLabel = count === 1 ? "1 referência salva" : `${count} referências salvas`;

  return (
    <header className="site-header">
      <p className="site-header__notice">{notices.top}</p>
      <div className="site-header__bar">
        <a className="site-header__brand" href="#inicio" aria-label="RUA STUDIO, voltar ao início">
          <Wordmark />
        </a>

        <nav className="site-header__nav" aria-label="Principal">
          <button
            ref={toggleRef}
            type="button"
            className="site-header__toggle"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="site-header__toggle-bars" aria-hidden="true" />
            Menu
          </button>
          <ul id={menuId} role="list" className={`site-header__links${open ? " is-open" : ""}`}>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="site-header__selection"
          onClick={() => {
            setOpen(false);
            onOpenSelection();
          }}
          aria-label={`Minha seleção, ${countLabel}`}
        >
          <span className="site-header__selection-label">Minha seleção</span>
          <span className="site-header__count" aria-hidden="true">
            {count}
          </span>
        </button>
      </div>
    </header>
  );
}
