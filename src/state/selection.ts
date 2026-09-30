import type { ImageKey } from "../data/assets";
import { getLook, isLookId, type LookId } from "../data/looks";
import {
  combinationId,
  combinationTitle,
  getBase,
  getComplement,
  isBaseId,
  isComplementId,
  type BaseId,
  type ComplementId,
} from "../data/pieces";

export type SavedReference =
  | { kind: "look"; id: LookId }
  | { kind: "combination"; baseId: BaseId; complementId: ComplementId };

export const STORAGE_KEY = "rua-studio:selection:v1";
export const STORAGE_VERSION = 1;

export function referenceKey(ref: SavedReference): string {
  return ref.kind === "look" ? ref.id : combinationId(ref.baseId, ref.complementId);
}

export function hasReference(items: SavedReference[], ref: SavedReference): boolean {
  const key = referenceKey(ref);
  return items.some((i) => referenceKey(i) === key);
}

export function addReference(items: SavedReference[], ref: SavedReference): SavedReference[] {
  return hasReference(items, ref) ? items : [...items, ref];
}

export function removeReference(items: SavedReference[], key: string): SavedReference[] {
  return items.filter((i) => referenceKey(i) !== key);
}

export type ResolvedReference = {
  key: string;
  kindLabel: "Look" | "Combinação";
  title: string;
  images: ImageKey[];
};

// Nomes e imagens são sempre derivados do catálogo atual, nunca do storage.
export function resolveReference(ref: SavedReference): ResolvedReference {
  if (ref.kind === "look") {
    const look = getLook(ref.id);
    return { key: ref.id, kindLabel: "Look", title: look.title, images: [look.image] };
  }
  return {
    key: combinationId(ref.baseId, ref.complementId),
    kindLabel: "Combinação",
    title: combinationTitle(ref.baseId, ref.complementId),
    images: [getBase(ref.baseId).image, getComplement(ref.complementId).image],
  };
}

function parseReference(value: unknown): SavedReference | null {
  if (!value || typeof value !== "object") return null;
  const v = value as Record<string, unknown>;
  if (v.kind === "look" && isLookId(v.id)) return { kind: "look", id: v.id };
  if (v.kind === "combination" && isBaseId(v.baseId) && isComplementId(v.complementId)) {
    return { kind: "combination", baseId: v.baseId, complementId: v.complementId };
  }
  return null;
}

// Aceita apenas o formato versionado; descarta itens desconhecidos e duplicados.
export function deserializeSelection(raw: string | null | undefined): SavedReference[] {
  if (!raw) return [];
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!data || typeof data !== "object") return [];
  const { version, items } = data as { version?: unknown; items?: unknown };
  if (version !== STORAGE_VERSION || !Array.isArray(items)) return [];
  let result: SavedReference[] = [];
  for (const item of items) {
    const ref = parseReference(item);
    if (ref) result = addReference(result, ref);
  }
  return result;
}

export function serializeSelection(items: SavedReference[]): string {
  const clean = items.map((ref) =>
    ref.kind === "look"
      ? { kind: "look", id: ref.id }
      : { kind: "combination", baseId: ref.baseId, complementId: ref.complementId },
  );
  return JSON.stringify({ version: STORAGE_VERSION, items: clean });
}

// Acesso ao storage tolerante a falhas (modo privado, bloqueio, quota).
export function readStoredSelection(storage: Pick<Storage, "getItem"> | null): SavedReference[] {
  try {
    return deserializeSelection(storage?.getItem(STORAGE_KEY));
  } catch {
    return [];
  }
}

export function writeStoredSelection(storage: Pick<Storage, "setItem"> | null, items: SavedReference[]): boolean {
  try {
    if (!storage) return false;
    storage.setItem(STORAGE_KEY, serializeSelection(items));
    return true;
  } catch {
    return false;
  }
}

export function getBrowserStorage(): Storage | null {
  try {
    return typeof window !== "undefined" ? window.localStorage : null;
  } catch {
    return null;
  }
}
