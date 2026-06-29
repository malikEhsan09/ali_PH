"use client";

import { useUIStore } from "@/store/ui-store";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useHydrated } from "@/lib/use-hydrated";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, Star, ShoppingCart, Heart } from "lucide-react";
import SiteImage from "@/components/common/SiteImage";

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct } = useUIStore();
  const { addItem: addToCart } = useCartStore();
  const { toggleItem: toggleWishlist, isInWishlist } = useWishlistStore();
  const hydrated = useHydrated();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWish = hydrated && isInWishlist(product.id);

  return (
    <Dialog open={!!product} onOpenChange={(open) => !open && setQuickViewProduct(null)}>
      <DialogContent className="max-w-3xl bg-bg-secondary border-border text-text-primary p-6 rounded-none glow shadow-2xl">
        <div className="flex justify-between items-start mb-2">
          <DialogTitle className="text-xl font-bold font-heading text-text-primary">
            Quick View
          </DialogTitle>
          <button
            onClick={() => setQuickViewProduct(null)}
            className="w-8 h-8 rounded-none bg-bg-secondary border border-border flex items-center justify-center text-text-secondary hover:text-text-primary transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Visual paint sample card with color glow */}
          <div className="aspect-square bg-bg-secondary border border-border relative overflow-hidden">
            <SiteImage
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain p-4"
              sizes="400px"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-accent-brand bg-accent-brand/10 border border-accent-brand/20 px-2 py-0.5 font-medium">
                  {product.brand}
                </span>
                <h3 className="text-2xl font-bold font-heading text-text-primary mt-2">{product.name}</h3>
                <p className="text-xs text-text-secondary mt-1">{product.category}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span>({product.reviewCount} reviews)</span>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed">
                {product.shortDescription || product.description}
              </p>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-bg-secondary p-3 rounded-none border border-border">
                <div>
                  <span className="text-text-muted">Finish</span>
                  <p className="font-medium text-text-primary">{product.finish}</p>
                </div>
                <div>
                  <span className="text-text-muted">Coverage</span>
                  <p className="font-medium text-text-primary">{product.coverage}</p>
                </div>
                <div>
                  <span className="text-text-muted">Dry Time</span>
                  <p className="font-medium text-text-primary">{product.dryTime}</p>
                </div>
                <div>
                  <span className="text-text-muted">Size</span>
                  <p className="font-medium text-text-primary">{product.size}</p>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-accent-brand">
                  PKR {product.price.toLocaleString()}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-text-muted line-through">
                    PKR {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  addToCart(product, 1);
                  setQuickViewProduct(null);
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-accent-brand hover:bg-accent-light text-primary-foreground font-bold py-3 rounded-none transition-all"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-none border ${
                  isWish
                    ? "border-accent-brand text-accent-brand bg-accent-brand/5"
                    : "border-border text-text-secondary hover:text-text-primary hover:bg-bg-secondary"
                } transition-all`}
              >
                <Heart size={18} fill={isWish ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
