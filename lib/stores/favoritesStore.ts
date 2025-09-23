import { create } from "zustand";

export type FavoriteItem = {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  image: string;
};

type FavoritesState = {
  items: FavoriteItem[];
  has: (id: string) => boolean;
  toggle: (item: FavoriteItem) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "kvroom:favorites";

function load(): FavoriteItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FavoriteItem[]) : [];
  } catch {
    return [];
  }
}

function save(items: FavoriteItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  items: [],
  has: (id) => get().items.some((i) => i.id === id),
  toggle: (item) => {
    const exists = get().items.some((i) => i.id === item.id);
    const items = exists
      ? get().items.filter((i) => i.id !== item.id)
      : [{ ...item }, ...get().items];
    save(items);
    set({ items });
  },
  remove: (id) => {
    const items = get().items.filter((i) => i.id !== id);
    save(items);
    set({ items });
  },
  clear: () => {
    save([]);
    set({ items: [] });
  },
}));

// Hydrate on client
if (typeof window !== "undefined") {
  const items = load();
  useFavoritesStore.setState({ items });
}
