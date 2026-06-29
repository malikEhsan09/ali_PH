import { create } from 'zustand';
import { Product } from '@/types';

interface CompareStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearAll: () => void;
  canAdd: () => boolean;
}

export const useCompareStore = create<CompareStore>()((set, get) => ({
  items: [],
  addItem: (product) => {
    if (get().items.length < 4 && !get().isInCompare(product.id)) {
      set({ items: [...get().items, product] });
    }
  },
  removeItem: (productId) => set({ items: get().items.filter(p => p.id !== productId) }),
  isInCompare: (productId) => get().items.some(p => p.id === productId),
  clearAll: () => set({ items: [] }),
  canAdd: () => get().items.length < 4,
}));
