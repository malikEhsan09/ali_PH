"use client";

import { motion } from "framer-motion";
import { getFeaturedProducts } from "@/data/products";
import ProductCard from "../products/ProductCard";
import SectionHeading from "../common/SectionHeading";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeaturedProducts() {
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <section className="py-24 bg-bg-secondary relative overflow-hidden bg-noise">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
          <div className="flex-1">
            <SectionHeading 
              title="Featured Collection" 
              subtitle="Authorized Gobis Formulas" 
              centered={false}
            />
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-accent-brand hover:text-accent-light transition-colors text-sm font-semibold mb-12 group"
          >
            View All Products
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
