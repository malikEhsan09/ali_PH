"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SiteImage from "@/components/common/SiteImage";
import { countSearchResults, searchProducts } from "@/lib/search-products";
import { useUIStore } from "@/store/ui-store";

export default function SearchDialog() {
  const router = useRouter();
  const { searchOpen, setSearchOpen } = useUIStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => searchProducts(query), [query]);
  const total = useMemo(() => countSearchResults(query), [query]);

  useEffect(() => {
    if (searchOpen) {
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setSearchOpen]);

  const close = () => setSearchOpen(false);

  const goToAllResults = () => {
    const q = query.trim();
    close();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
  };

  const openProduct = (slug: string) => {
    close();
    router.push(`/products/${slug}`);
  };

  return (
    <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
      <DialogContent className="sm:max-w-xl bg-bg-card border-border p-0 gap-0 overflow-hidden" showCloseButton>
        <DialogHeader className="px-4 pt-4 pb-2">
          <DialogTitle className="text-text-primary font-heading">Search Products</DialogTitle>
          <DialogDescription className="text-text-muted">
            Find paints, brands, and finishes. Press{" "}
            <kbd className="px-1.5 py-0.5 text-[10px] bg-bg-secondary border border-border">Ctrl+K</kbd> anytime.
          </DialogDescription>
        </DialogHeader>

        <div className="px-4 pb-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") goToAllResults();
              }}
              placeholder="Search by name, brand, category..."
              className="w-full bg-bg-secondary border border-border py-2.5 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-brand/50 transition-colors"
            />
          </div>
        </div>

        <div className="max-h-72 overflow-y-auto border-t border-border">
          {query.trim() === "" ? (
            <p className="px-4 py-6 text-sm text-text-muted text-center">
              Start typing to search our catalog
            </p>
          ) : results.length === 0 ? (
            <p className="px-4 py-6 text-sm text-text-muted text-center">
              No products found for &ldquo;{query}&rdquo;
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {results.map((product) => (
                <li key={product.id}>
                  <button
                    type="button"
                    onClick={() => openProduct(product.slug)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-bg-secondary transition-colors cursor-pointer"
                  >
                    <div className="relative w-10 h-10 shrink-0 bg-bg-secondary border border-border">
                      <SiteImage
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-contain p-1"
                        sizes="40px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-text-primary truncate">{product.name}</p>
                      <p className="text-xs text-text-muted truncate">
                        {product.brand} · {product.category}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-accent-brand shrink-0">
                      PKR {product.price.toLocaleString()}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {query.trim() !== "" && total > 0 && (
          <div className="border-t border-border p-3">
            <button
              type="button"
              onClick={goToAllResults}
              className="w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold text-accent-brand hover:bg-bg-secondary transition-colors cursor-pointer"
            >
              View all {total} results
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
