import { useCallback, useEffect, useRef, useState } from "react";
import type { LookId } from "./data/looks";
import { defaultCombination, type BaseId } from "./data/pieces";
import { ScrollTrigger, prefersReducedMotion } from "./motion/gsap";
import { useSelection } from "./state/SelectionProvider";
import { ConceptWorld } from "./components/ConceptWorld";
import { DetailEditorial } from "./components/DetailEditorial";
import { FAQ } from "./components/FAQ";
import { HeroStory } from "./components/HeroStory";
import { LookComposer, type Combination } from "./components/LookComposer";
import { LookDialog } from "./components/LookDialog";
import { Lookbook } from "./components/Lookbook";
import { Manifesto } from "./components/Manifesto";
import { Modal } from "./components/Modal";
import { ProjectCTA } from "./components/ProjectCTA";
import { SelectionDrawer } from "./components/SelectionDrawer";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

// Um único modal ativo por vez.
type ActiveModal = { type: "look"; id: LookId } | { type: "selection" } | null;

function goToSection(sectionId: string, headingId: string) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  section.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  document.getElementById(headingId)?.focus({ preventScroll: true });
}

export default function App() {
  const { message } = useSelection();
  const [modal, setModal] = useState<ActiveModal>(null);
  const [combo, setCombo] = useState<Combination>(defaultCombination);
  const lastLook = useRef<LookId>("look-laranja");
  const afterClose = useRef<(() => void) | null>(null);

  if (modal?.type === "look") lastLook.current = modal.id;

  // Executa a navegação depois que o dialog fechou e a rolagem foi liberada.
  const closeModal = useCallback((type: "look" | "selection") => {
    setModal((m) => (m?.type === type ? null : m));
    const next = afterClose.current;
    afterClose.current = null;
    if (next) requestAnimationFrame(next);
  }, []);

  const closeThen = (fn: () => void) => {
    afterClose.current = fn;
    setModal(null);
  };

  // Recalcula medidas uma vez após fontes e imagens principais (não a cada render).
  useEffect(() => {
    let done = false;
    const refresh = () => {
      if (done) return;
      done = true;
      ScrollTrigger.refresh();
    };
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh, { once: true });
    return () => window.removeEventListener("load", refresh);
  }, []);

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <SiteHeader onOpenSelection={() => setModal({ type: "selection" })} />
      <main id="conteudo" tabIndex={-1}>
        <HeroStory />
        <Lookbook onOpenLook={(id) => setModal({ type: "look", id })} />
        <LookComposer combo={combo} onChange={setCombo} />
        <DetailEditorial />
        <Manifesto />
        <ConceptWorld />
        <FAQ />
        <ProjectCTA />
      </main>
      <SiteFooter />

      <Modal open={modal?.type === "look"} onClose={() => closeModal("look")} labelledBy="look-dialog-title" variant="center">
        <LookDialog
          id={lastLook.current}
          onClose={() => setModal(null)}
          onCompose={(baseId: BaseId) =>
            closeThen(() => {
              setCombo((c) => ({ ...c, baseId }));
              goToSection("combinacao", "combinacao-title");
            })
          }
        />
      </Modal>
      <Modal
        open={modal?.type === "selection"}
        onClose={() => closeModal("selection")}
        labelledBy="selection-title"
        variant="drawer"
      >
        <SelectionDrawer onClose={() => setModal(null)} onExplore={() => closeThen(() => goToSection("looks", "looks-title"))} />
      </Modal>

      <p className="sr-only" aria-live="polite">
        {message}
      </p>
    </>
  );
}
