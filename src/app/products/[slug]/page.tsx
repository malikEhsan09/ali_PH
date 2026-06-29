"use client";

import { use } from "react";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import SectionHeading from "@/components/common/SectionHeading";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { Star, Shield, Droplets, Clock, Layers, Sparkles, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import SiteImage from "@/components/common/SiteImage";
import { useHydrated } from "@/lib/use-hydrated";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const { addItem: addToCart } = useCartStore();
  const { toggleItem: toggleWishlist, isInWishlist } = useWishlistStore();
  const hydrated = useHydrated();
  const related = getRelatedProducts(product);
  const isWish = hydrated && isInWishlist(product.id);

  return (
    <LayoutWrapper>
      <div className="py-20 bg-noise min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Main Info Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Visual paint sample card with color glow */}
            <div className="aspect-square bg-bg-secondary border border-border relative overflow-hidden group shadow-lg">
              <SiteImage
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-contain p-8"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute bottom-0 inset-x-0 p-6 glass border-t border-border">
                <span className="text-[10px] uppercase tracking-widest text-accent-brand font-bold">{product.brand} Showroom Spec</span>
                <h4 className="text-xl font-bold font-heading text-text-primary mt-1">{product.name}</h4>
                <p className="text-xs text-text-secondary mt-1">Color: {product.color} • Finish: {product.finish}</p>
              </div>
            </div>

            {/* Info details */}
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-accent-brand font-bold bg-accent-brand/10 border border-accent-brand/20 px-2.5 py-1 rounded-none">
                  {product.brand}
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-text-primary tracking-tight mt-4">
                  {product.name}
                </h1>
                <p className="text-sm text-text-muted mt-2">{product.category}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span>({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-extrabold text-accent-brand">
                  PKR {product.price.toLocaleString()}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-text-muted line-through">
                    PKR {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-sm text-text-secondary leading-relaxed">
                {product.description}
              </p>

              {/* Technical features summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-b border-border">
                <div className="text-center space-y-1">
                  <Shield size={20} className="mx-auto text-accent-brand" />
                  <span className="text-[10px] text-text-muted block uppercase">Protection</span>
                  <span className="font-semibold text-xs text-text-primary">{product.finish}</span>
                </div>
                <div className="text-center space-y-1">
                  <Droplets size={20} className="mx-auto text-accent-brand" />
                  <span className="text-[10px] text-text-muted block uppercase">Coverage</span>
                  <span className="font-semibold text-xs text-text-primary">{product.coverage}</span>
                </div>
                <div className="text-center space-y-1">
                  <Clock size={20} className="mx-auto text-accent-brand" />
                  <span className="text-[10px] text-text-muted block uppercase">Dry Time</span>
                  <span className="font-semibold text-xs text-text-primary">{product.dryTime}</span>
                </div>
                <div className="text-center space-y-1">
                  <Layers size={20} className="mx-auto text-accent-brand" />
                  <span className="text-[10px] text-text-muted block uppercase">Coats</span>
                  <span className="font-semibold text-xs text-text-primary">{product.coats}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={() => addToCart(product, 1)}
                  className="flex-grow inline-flex items-center justify-center gap-2 bg-accent-brand hover:bg-accent-light text-primary-foreground font-bold py-3.5 rounded-none transition-all duration-300 shadow-lg shadow-accent-brand/10 hover:shadow-accent-brand/20"
                >
                  Add to Shopping Cart
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`px-6 py-3.5 rounded-none border ${
                    isWish
                      ? "border-accent-brand text-accent-brand bg-accent-brand/5"
                      : "border-border text-text-secondary hover:text-text-primary hover:bg-bg-secondary"
                  } transition-all font-semibold flex items-center justify-center gap-2`}
                >
                  <Star size={16} fill={isWish ? "currentColor" : "none"} />
                  {isWish ? "In Wishlist" : "Wishlist"}
                </button>
              </div>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20 items-start">
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-xl font-bold font-heading text-text-primary">
                Technical Specifications
              </h3>
              <div className="rounded-none border border-border overflow-hidden">
                <table className="w-full text-xs text-left">
                  <tbody>
                    {product.specifications.map((spec, idx) => (
                      <tr key={idx} className="border-b border-border last:border-0 hover:bg-bg-secondary transition-colors">
                        <td className="py-3 px-4 font-semibold text-text-secondary bg-bg-secondary w-1/3 border-r border-border">
                          {spec.label}
                        </td>
                        <td className="py-3 px-4 text-text-primary font-medium">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Side features list */}
            <div className="space-y-6 bg-bg-secondary border border-border p-6 rounded-none">
              <h3 className="text-lg font-bold font-heading text-text-primary">
                Key Features
              </h3>
              <ul className="space-y-3">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-text-secondary">
                    <CheckCircle2 size={16} className="text-accent-brand mt-0.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Related Products Section */}
          {related.length > 0 && (
            <div>
              <SectionHeading 
                title="Related Paint Products" 
                subtitle="Complete Your Project" 
                centered={true}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </LayoutWrapper>
  );
}
