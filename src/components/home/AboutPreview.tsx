"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SiteImage from "@/components/common/SiteImage";
import { siteImages } from "@/data/images";

export default function AboutPreview() {
  return (
    <section className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] lg:aspect-square border border-border bg-bg-card overflow-hidden shadow-lg"
          >
            <SiteImage
              src={siteImages.about.team}
              alt="ALI Paint team at community event"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute bottom-0 inset-x-0 p-6 glass border-t border-border">
              <span className="text-[10px] uppercase tracking-widest text-accent-brand font-bold">ALI Paint & Hardware</span>
              <h4 className="text-xl font-bold font-heading text-text-primary mt-1">Authorized Gobis Paints Dealer</h4>
              <p className="text-xs text-text-secondary mt-1">Bringing Pakistan&apos;s finest paints to your doorstep</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="text-xs uppercase tracking-widest text-accent-brand font-semibold block">
              About ALI Paint & Hardware
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-text-primary leading-tight">
              Pioneering Luxury Finishes & Technical Paint Engineering
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              For over 15 years, ALI Paint & Hardware has been the premier partner for homeowners, designers, and contractors seeking elite interior and exterior coatings. As an authorized affiliate dealer of Gobis Paints, we combine legendary color science with state-of-the-art computerized mixing systems.
            </p>

            <ul className="space-y-3.5">
              {[
                "100% Genuine Gobis Paints with manufacturer certificates",
                "Advanced computerized paint tinting matching technology",
                "Full warranty backup and on-site paint consultation",
                "Custom texture paint and protective wood polish services",
              ].map((feat, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-text-secondary">
                  <CheckCircle2 size={18} className="text-accent-brand mt-0.5 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-accent-brand hover:bg-accent-light text-primary-foreground font-bold px-6 py-3 transition-all duration-300 group"
              >
                Learn Our Story
                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
