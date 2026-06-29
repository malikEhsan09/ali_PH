"use client";

import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import SectionHeading from "../common/SectionHeading";
import Link from "next/link";
import SiteImage from "@/components/common/SiteImage";

export default function FeaturedCategories() {
  const bentoCats = categories.slice(0, 5);

  return (
    <section className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          title="Curated Categories"
          subtitle="Explore Finishes"
          centered={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {bentoCats.slice(0, 2).map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="md:col-span-3 bg-bg-card border border-border overflow-hidden hover:border-accent-brand/40 transition-all duration-300 relative group min-h-[300px]"
            >
              <SiteImage
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/95 via-bg-primary/50 to-transparent" />
              <div className="relative z-10 h-full p-8 flex flex-col justify-end">
                <h3 className="text-2xl font-bold font-heading text-text-primary mb-2">{cat.name}</h3>
                <p className="text-sm text-text-secondary max-w-sm mb-4">{cat.description}</p>
                <Link
                  href={`/products?category=${cat.slug}`}
                  className="self-start text-xs font-bold text-accent-brand hover:text-accent-light transition-colors"
                >
                  Browse Products →
                </Link>
              </div>
            </motion.div>
          ))}

          {bentoCats.slice(2).map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (idx + 2) * 0.1 }}
              className="md:col-span-2 bg-bg-card border border-border overflow-hidden hover:border-accent-brand/40 transition-all duration-300 relative group min-h-[220px]"
            >
              <SiteImage
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="relative z-10 h-full p-6 flex flex-col justify-between bg-bg-card/80">
                <div>
                  <h4 className="text-lg font-bold font-heading text-text-primary mb-1">{cat.name}</h4>
                  <p className="text-xs text-text-secondary line-clamp-2">{cat.description}</p>
                </div>
                <Link
                  href={`/products?category=${cat.slug}`}
                  className="self-start text-xs font-bold text-accent-brand hover:text-accent-light transition-colors mt-4"
                >
                  Explore →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
