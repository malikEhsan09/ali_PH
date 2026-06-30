import { products } from "@/data/products";
import type { Product } from "@/types";

export function searchProducts(query: string, limit = 8): Product[] {
  const term = query.trim().toLowerCase();
  if (!term) return [];

  return products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.finish.toLowerCase().includes(term) ||
        p.tags.some((tag) => tag.toLowerCase().includes(term))
    )
    .slice(0, limit);
}

export function countSearchResults(query: string): number {
  const term = query.trim().toLowerCase();
  if (!term) return 0;

  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(term) ||
      p.brand.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.finish.toLowerCase().includes(term) ||
      p.tags.some((tag) => tag.toLowerCase().includes(term))
  ).length;
}
