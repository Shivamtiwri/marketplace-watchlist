import { create } from 'zustand';

interface WatchlistState {
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
  favorites: new Set(),

  toggleFavorite: (id) => {
    const next = new Set(get().favorites);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    set({ favorites: next });
  },

  isFavorite: (id) => get().favorites.has(id),
}));
