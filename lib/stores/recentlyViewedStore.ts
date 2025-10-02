import { create } from "zustand";

export type RecentlyViewedItem = {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  image: string;
  viewedAt: number; // timestamp
};

type RecentlyViewedState = {
  items: RecentlyViewedItem[];
  has: (id: string) => boolean;
  add: (item: Omit<RecentlyViewedItem, "viewedAt">) => void;
  clear: () => void;
};

const STORAGE_KEY = "k Vroum:recentlyViewed";
const MAX_ITEMS = 10;

function load(): RecentlyViewedItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RecentlyViewedItem[]) : [];
  } catch {
    return [];
  }
}

function save(items: RecentlyViewedItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export const useRecentlyViewedStore = create<RecentlyViewedState>(
  (set, get) => ({
    items: [],
    has: (id) => get().items.some((i) => i.id === id),
    add: (item) => {
      const newItem = { ...item, viewedAt: Date.now() };
      const existingIndex = get().items.findIndex((i) => i.id === item.id);
      let items = [...get().items];

      if (existingIndex >= 0) {
        // Move to front
        items.splice(existingIndex, 1);
      }

      items.unshift(newItem);

      // Limit to MAX_ITEMS
      if (items.length > MAX_ITEMS) {
        items = items.slice(0, MAX_ITEMS);
      }

      save(items);
      set({ items });
    },
    clear: () => {
      save([]);
      set({ items: [] });
    },
  })
);

// Hydrate on client
if (typeof window !== "undefined") {
  const items = load();
  useRecentlyViewedStore.setState({ items });
}
