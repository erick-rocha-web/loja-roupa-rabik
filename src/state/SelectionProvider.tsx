import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  addReference,
  getBrowserStorage,
  hasReference,
  readStoredSelection,
  referenceKey,
  removeReference,
  writeStoredSelection,
  type SavedReference,
} from "./selection";

type SelectionContextValue = {
  items: SavedReference[];
  count: number;
  persistent: boolean;
  has: (ref: SavedReference) => boolean;
  save: (ref: SavedReference) => void;
  remove: (key: string) => void;
  toggle: (ref: SavedReference) => void;
  clear: () => SavedReference[];
  restore: (items: SavedReference[]) => void;
  message: string;
  announce: (msg: string) => void;
};

const SelectionContext = createContext<SelectionContextValue | null>(null);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const storage = useRef(getBrowserStorage());
  const [items, setItems] = useState<SavedReference[]>(() => readStoredSelection(storage.current));
  const [persistent, setPersistent] = useState(true);
  const [message, setMessage] = useState("");
  // Alterna um espaço invisível para que mensagens repetidas sejam anunciadas de novo.
  const announce = useCallback((msg: string) => setMessage((cur) => (cur === msg ? msg + " " : msg)), []);

  useEffect(() => {
    setPersistent(writeStoredSelection(storage.current, items));
  }, [items]);

  // Mantém abas diferentes em sincronia, validando o conteúdo recebido.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key.startsWith("rua-studio:selection")) setItems(readStoredSelection(storage.current));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const has = useCallback((ref: SavedReference) => hasReference(items, ref), [items]);
  const save = useCallback((ref: SavedReference) => setItems((cur) => addReference(cur, ref)), []);
  const remove = useCallback((key: string) => setItems((cur) => removeReference(cur, key)), []);
  const toggle = useCallback(
    (ref: SavedReference) =>
      setItems((cur) => (hasReference(cur, ref) ? removeReference(cur, referenceKey(ref)) : addReference(cur, ref))),
    [],
  );
  const clear = useCallback(() => {
    const previous = items;
    setItems([]);
    return previous;
  }, [items]);
  const restore = useCallback((prev: SavedReference[]) => {
    setItems((cur) => prev.reduce(addReference, cur));
  }, []);

  const value = useMemo(
    () => ({ items, count: items.length, persistent, has, save, remove, toggle, clear, restore, message, announce }),
    [items, persistent, has, save, remove, toggle, clear, restore, message, announce],
  );

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export function useSelection(): SelectionContextValue {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error("useSelection precisa de SelectionProvider");
  return ctx;
}
