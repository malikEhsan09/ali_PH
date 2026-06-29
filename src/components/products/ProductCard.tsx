"use client";

import { Star, Eye, Heart, ArrowRightLeft, ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCompareStore } from "@/store/compare-store";
import { useUIStore } from "@/store/ui-store";
import Link from "next/link";
import SiteImage from "@/components/common/SiteImage";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem: addToCart } = useCartStore();
  const { toggleItem: toggleWishlist, isInWishlist } = useWishlistStore();
  const { addItem: addToCompare, removeItem: removeFromCompare, isInCompare } = useCompareStore();
  const { setQuickViewProduct } = useUIStore();

  const isWish = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isCompared) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  return (
    <div className="group relative bg-bg-card border border-border overflow-hidden hover:border-accent-brand/40 transition-all duration-500 hover:shadow-lg flex flex-col justify-between">
      <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-start">
        <div className="flex flex-col gap-1.5">
          {product.discount > 0 && (
            <span className="text-[10px] bg-error text-white font-bold px-2 py-0.5">
              {product.discount}% OFF
            </span>
          )}
          {product.isNew && (
            <span className="text-[10px] bg-accent-brand text-primary-foreground font-bold px-2 py-0.5">
              NEW
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`w-8 h-8 ${
            isWish ? "bg-accent-brand text-primary-foreground" : "bg-bg-card/90 text-text-secondary hover:text-text-primary border border-border"
          } flex items-center justify-center transition-all duration-300`}
        >
          <Heart size={14} fill={isWish ? "currentColor" : "none"} />
        </button>
      </div>

      <Link href={`/products/${product.slug}`} className="block relative aspect-square bg-bg-secondary border-b border-border overflow-hidden">
        <SiteImage
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, 25vw"
        />

        <div className="absolute inset-0 bg-bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              setQuickViewProduct(product);
            }}
            className="w-10 h-10 bg-bg-card hover:bg-bg-secondary border border-border flex items-center justify-center text-text-primary transition-all duration-300 hover:scale-105"
            title="Quick View"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={handleCompareClick}
            className={`w-10 h-10 ${
              isCompared ? "bg-accent-brand text-primary-foreground" : "bg-bg-card hover:bg-bg-secondary"
            } border border-border flex items-center justify-center text-text-primary transition-all duration-300 hover:scale-105`}
            title="Compare"
          >
            <ArrowRightLeft size={18} />
          </button>
        </div>
      </Link>

      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <span className="text-[10px] text-accent-brand uppercase tracking-wider font-semibold">
            {product.brand}
          </span>
          <Link href={`/products/${product.slug}`} className="block mt-1">
            <h4 className="font-heading font-medium text-text-primary group-hover:text-accent-brand transition-colors line-clamp-1">
              {product.name}
            </h4>
          </Link>
          <p className="text-xs text-text-muted mt-1">{product.category}</p>

          <div className="flex items-center gap-1 mt-2">
            <div className="flex text-amber-600">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="text-[10px] text-text-muted">({product.reviewCount})</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-text-primary">
              PKR {product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-[10px] text-text-muted line-through block -mt-1">
                PKR {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
            }}
            className="w-9 h-9 bg-accent-brand/10 hover:bg-accent-brand text-accent-brand hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
