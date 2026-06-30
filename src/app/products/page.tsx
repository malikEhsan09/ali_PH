"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import SectionHeading from "@/components/common/SectionHeading";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { brands } from "@/data/brands";
import ProductCard from "@/components/products/ProductCard";
import { Search, SlidersHorizontal, X } from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [maxPrice, setMaxPrice] = useState(12000);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const q = searchParams.get("q");
    const category = searchParams.get("category");
    if (q) setSearchTerm(q);
    if (category) setSelectedCategory(category);
  }, [searchParams]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedBrand("");
    setMaxPrice(12000);
    setSortBy("default");
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.brand.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          p.finish.toLowerCase().includes(term) ||
          p.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    }

    if (selectedCategory !== "") {
      result = result.filter((p) => p.categorySlug === selectedCategory);
    }

    if (selectedBrand !== "") {
      result = result.filter((p) => p.brandSlug === selectedBrand);
    }

    result = result.filter((p) => p.price <= maxPrice);

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchTerm, selectedCategory, selectedBrand, maxPrice, sortBy]);

  return (
    <div className="py-20 bg-noise min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Browse Our Premium Collection"
          subtitle="Products"
          centered={true}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="space-y-6 lg:sticky lg:top-28 h-fit bg-bg-card border border-border p-6 rounded-none">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="font-semibold text-text-primary flex items-center gap-2 text-sm">
                <SlidersHorizontal size={16} /> Filters
              </span>
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-accent-brand hover:text-accent-light transition-colors cursor-pointer"
              >
                Reset All
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-secondary">Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search paint, brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-bg-secondary border border-border rounded-none py-2 pl-3 pr-9 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-brand/40 transition-colors cursor-text"
                />
                <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-secondary">Categories</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-bg-secondary border border-border rounded-none py-2 px-3 text-xs text-text-primary focus:outline-none focus:border-accent-brand/40 transition-colors cursor-pointer"
              >
                <option value="" className="bg-bg-card">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug} className="bg-bg-card">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-secondary">Brands</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-bg-secondary border border-border rounded-none py-2 px-3 text-xs text-text-primary focus:outline-none focus:border-accent-brand/40 transition-colors cursor-pointer"
              >
                <option value="" className="bg-bg-card">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.slug} className="bg-bg-card">
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-text-secondary">
                <span className="font-semibold">Max Price</span>
                <span className="text-accent-brand font-medium">PKR {maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500"
                max="12000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-accent-brand bg-bg-tertiary h-1 rounded-none appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-secondary">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-bg-secondary border border-border rounded-none py-2 px-3 text-xs text-text-primary focus:outline-none focus:border-accent-brand/40 transition-colors cursor-pointer"
              >
                <option value="default" className="bg-bg-card">Default Sort</option>
                <option value="price-low" className="bg-bg-card">Price: Low to High</option>
                <option value="price-high" className="bg-bg-card">Price: High to Low</option>
                <option value="rating" className="bg-bg-card">Popularity / Rating</option>
              </select>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="flex justify-between items-center text-xs text-text-secondary border-b border-border pb-4">
              <span>Showing {filteredProducts.length} results</span>
              <div className="flex gap-2 flex-wrap justify-end">
                {searchTerm && (
                  <span className="inline-flex items-center gap-1 bg-bg-secondary border border-border px-2 py-0.5 rounded text-[10px] text-accent-brand font-semibold">
                    Search: {searchTerm}
                    <button type="button" aria-label="Clear search" onClick={() => setSearchTerm("")}>
                      <X size={10} className="cursor-pointer" />
                    </button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 bg-bg-secondary border border-border px-2 py-0.5 rounded text-[10px] text-accent-brand font-semibold">
                    Category: {selectedCategory}
                    <button type="button" aria-label="Clear category" onClick={() => setSelectedCategory("")}>
                      <X size={10} className="cursor-pointer" />
                    </button>
                  </span>
                )}
                {selectedBrand && (
                  <span className="inline-flex items-center gap-1 bg-bg-secondary border border-border px-2 py-0.5 rounded text-[10px] text-accent-brand font-semibold">
                    Brand: {selectedBrand}
                    <button type="button" aria-label="Clear brand" onClick={() => setSelectedBrand("")}>
                      <X size={10} className="cursor-pointer" />
                    </button>
                  </span>
                )}
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <p className="text-sm text-text-muted">No products found matching your active filters.</p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="bg-accent-brand hover:bg-accent-light text-primary-foreground font-bold px-6 py-2.5 rounded-none text-xs transition-colors cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <LayoutWrapper>
      <Suspense
        fallback={
          <div className="py-20 bg-noise min-h-screen flex items-center justify-center text-text-muted text-sm">
            Loading products…
          </div>
        }
      >
        <ProductsContent />
      </Suspense>
    </LayoutWrapper>
  );
}
