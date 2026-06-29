import { create } from 'zustand';
import { Product } from '@/types';

interface UIStore {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
}

export const useUIStore = create<UIStore>()((set) => ({
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  searchOpen: false,
  setSearchOpen: (open) => set({ searchOpen: open }),
  cartDrawerOpen: false,
  setCartDrawerOpen: (open) => set({ cartDrawerOpen: open }),
  quickViewProduct: null,
  setQuickViewProduct: (product) => set({ quickViewProduct: product }),
}));
