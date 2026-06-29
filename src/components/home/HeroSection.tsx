"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import HudButton from "@/components/common/HudButton";
import VintageTV from "@/components/home/VintageTV";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-noise">
      {/* Professional gradient backdrop — paint-inspired palette */}
      <div className="absolute inset-0 bg-linear-to-br from-bg-primary via-bg-secondary to-bg-tertiary" />

      {/* Theme-aware color orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-25 dark:opacity-20 blur-3xl animate-float bg-[radial-gradient(circle,var(--accent-light)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 -left-24 w-[400px] h-[400px] rounded-full opacity-20 dark:opacity-15 blur-3xl animate-float-delayed bg-[radial-gradient(circle,var(--accent-brand)_0%,transparent_70%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.08] dark:opacity-[0.06] blur-3xl bg-[radial-gradient(circle,var(--success)_0%,var(--warning)_35%,var(--error)_60%,transparent_80%)]" />
      </div>

      <div className="absolute inset-0 bg-linear-to-r from-bg-primary/90 via-bg-primary/70 to-transparent" />
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 py-6 md:py-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-bg-card border border-border text-xs text-accent-brand mb-8"
          >
            <Sparkles size={12} className="animate-pulse" />
            <span>Authorized Gobis Paints Affiliate & Dealer</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading tracking-tight leading-[1.1] mb-6 text-left"
          >
            Transform Your Space With{" "}
            <span className="text-gradient font-extrabold">Premium Coating</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-text-secondary max-w-xl mb-10 leading-relaxed text-left"
          >
            Discover premium emulsions, protective sealants, and industrial coatings — inspired by Pakistan&apos;s leading paint brands.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <HudButton
              href="/products"
              variant="primary"
              icon={<ArrowRight size={16} strokeWidth={2.5} />}
            >
              Explore Catalog
            </HudButton>
            <HudButton href="/calculator" variant="secondary">
              Paint Calculator
            </HudButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center py-4 lg:py-0"
        >
          <VintageTV />
        </motion.div>
      </div>
    </section>
  );
}
