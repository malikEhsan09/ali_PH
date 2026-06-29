"use client";

import { motion } from "framer-motion";
import { getPopularProducts } from "@/data/products";
import ProductCard from "../products/ProductCard";
import SectionHeading from "../common/SectionHeading";

export default function PopularProducts() {
  const popular = getPopularProducts().slice(0, 4);

  return (
    <section className="py-24 bg-bg-secondary relative overflow-hidden bg-noise">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading 
          title="Most Popular Paints" 
          subtitle="Customer Favorites" 
          centered={true}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popular.map((product, idx) => (
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
