"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRightLeft, Trash2 } from "lucide-react";
import { useCompareStore } from "@/store/compare-store";
import { useCartStore } from "@/store/cart-store";

export default function CompareDrawer() {
  const { items, removeItem, clearAll } = useCompareStore();
  const { addItem: addToCart } = useCartStore();

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 lg:p-6 bg-bg-secondary/95 backdrop-blur-md border-t border-border shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ArrowRightLeft size={18} className="text-accent-brand" />
            <h4 className="font-semibold font-heading text-text-primary">Compare Products</h4>
            <span className="text-xs text-text-secondary">({items.length} of 4 selected)</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={clearAll}
              className="text-xs text-text-muted hover:text-text-primary transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative p-3 rounded-none bg-bg-secondary border border-border flex flex-col justify-between group"
            >
              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-2 right-2 w-6 h-6 rounded-none bg-bg-tertiary flex items-center justify-center text-text-muted hover:text-error transition-all"
              >
                <X size={14} />
              </button>

              <div>
                <h5 className="font-medium text-xs text-text-primary truncate pr-6">
                  {item.name}
                </h5>
                <p className="text-[10px] text-text-muted mt-0.5">{item.brand}</p>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2 text-[10px] text-text-secondary border-t border-border pt-2">
                  <div>
                    <span className="text-text-muted block">Finish</span>
                    <span className="truncate block font-medium">{item.finish}</span>
                  </div>
                  <div>
                    <span className="text-text-muted block">Coverage</span>
                    <span className="truncate block font-medium">{item.coverage}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-border flex items-center justify-between gap-2">
                <span className="font-bold text-xs text-accent-brand">PKR {item.price.toLocaleString()}</span>
                <button
                  onClick={() => addToCart(item, 1)}
                  className="text-[10px] bg-accent-brand hover:bg-accent-light text-primary-foreground font-bold px-2 py-1.5 rounded transition-all"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
          {Array.from({ length: Math.max(0, 4 - items.length) }).map((_, idx) => (
            <div
              key={`empty-${idx}`}
              className="hidden md:flex border border-dashed border-border rounded-none items-center justify-center text-text-muted text-xs p-4"
            >
              Add product to compare
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
