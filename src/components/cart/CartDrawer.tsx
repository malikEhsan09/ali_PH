"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import SiteImage from "@/components/common/SiteImage";

export default function CartDrawer() {
  const { cartDrawerOpen, setCartDrawerOpen } = useUIStore();
  const { items, updateQuantity, removeItem, getSubtotal, getTotal } = useCartStore();

  const subtotal = getSubtotal();
  const total = getTotal();
  const shipping = subtotal > 5000 ? 0 : 350;

  return (
    <AnimatePresence>
      {cartDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartDrawerOpen(false)}
            className="fixed inset-0 z-55 bg-bg-primary/80 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-55 w-full sm:w-[450px] bg-bg-secondary border-l border-border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-accent-brand" />
                <h3 className="font-semibold text-lg font-heading text-text-primary">Your Cart</h3>
                <span className="text-xs px-2 py-0.5 rounded-none bg-bg-secondary text-text-secondary font-medium border border-border">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              <button
                onClick={() => setCartDrawerOpen(false)}
                className="w-8 h-8 rounded-none bg-bg-secondary border border-border flex items-center justify-center text-text-secondary hover:text-text-primary transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-none bg-bg-secondary flex items-center justify-center text-text-muted border border-border">
                    <ShoppingBag size={32} />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">Your cart is empty</h4>
                    <p className="text-sm text-text-muted mt-1 max-w-[280px]">
                      Add some of our premium paint products to start decorating your spaces.
                    </p>
                  </div>
                  <Link
                    href="/products"
                    onClick={() => setCartDrawerOpen(false)}
                    className="inline-flex items-center gap-2 bg-accent-brand hover:bg-accent-light text-primary-foreground font-semibold px-6 py-2.5 rounded-none text-sm transition-all"
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                    className="flex gap-4 p-4 rounded-none bg-bg-secondary border border-border hover:border-border transition-all duration-300 relative group"
                  >
                    <div className="w-20 h-20 rounded-none bg-bg-secondary flex items-center justify-center border border-border relative overflow-hidden flex-shrink-0">
                      <SiteImage
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-contain p-2"
                        sizes="80px"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-medium text-sm text-text-primary truncate group-hover:text-accent-brand transition-colors">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-text-muted hover:text-error transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-text-secondary mt-0.5">{item.product.brand}</p>
                        <p className="text-xs text-accent-brand mt-1">{item.selectedColor || item.product.color}</p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-border rounded-none overflow-hidden bg-bg-primary">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 px-2.5 text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-3 text-xs font-semibold text-text-primary">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 px-2.5 text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm text-text-primary">
                            PKR {(item.product.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border bg-bg-tertiary space-y-4">
                <div className="space-y-2 text-sm text-text-secondary">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-text-primary font-medium">PKR {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="text-text-primary font-medium">
                      {shipping === 0 ? "Free" : `PKR ${shipping}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-[10px] text-accent-brand/80">
                      Add PKR {(5000 - subtotal).toLocaleString()} more for free delivery
                    </p>
                  )}
                  <div className="border-t border-border pt-2 flex justify-between text-base font-semibold text-text-primary">
                    <span>Total</span>
                    <span className="text-accent-brand">PKR {total.toLocaleString()}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={() => setCartDrawerOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-accent-brand hover:bg-accent-light text-primary-foreground font-bold py-3 rounded-none transition-all duration-300 shadow-lg shadow-accent-brand/10 hover:shadow-accent-brand/20 group"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
