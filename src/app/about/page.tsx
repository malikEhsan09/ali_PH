"use client";

import LayoutWrapper from "@/components/layout/LayoutWrapper";
import SectionHeading from "@/components/common/SectionHeading";
import { motion } from "framer-motion";
import { ShieldCheck, Target, Eye, Award, CheckCircle2 } from "lucide-react";
import SiteImage from "@/components/common/SiteImage";
import { siteImages } from "@/data/images";

export default function AboutPage() {
  return (
    <LayoutWrapper>
      <div className="py-20 bg-noise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading 
            title="Our Identity & Affiliation" 
            subtitle="About Us" 
            centered={true}
          />

          {/* Hero Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold font-heading text-text-primary">
                ALI Paint & Hardware
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                As the leading authorized affiliate and premium dealer of Gobis Paints Pakistan, ALI Paint & Hardware has earned a solid reputation for delivering industrial-grade paint durability, designer shade collections, and unmatched technical services.
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                Our advanced computerized mixing system matches over 1,800 custom Gobis shades instantly, allowing homeowners, architects, and paint contractors to achieve exact design visions without compromise.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs text-text-secondary">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-accent-brand" /> Gobis Authorized Dealer
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-accent-brand" /> 15+ Years Experience
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-accent-brand" /> Computerized Mixing
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="aspect-video lg:aspect-square bg-bg-secondary border border-border relative overflow-hidden"
            >
              <SiteImage
                src={siteImages.about.store}
                alt="ALI Paint showroom with premium paints"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 inset-x-0 p-4 glass border-t border-border">
                <span className="text-[10px] text-accent-brand uppercase tracking-wider font-semibold">Authorized Showroom</span>
                <h4 className="font-heading font-bold text-text-primary text-sm mt-0.5">Main Boulevard Showroom, Lahore</h4>
              </div>
            </motion.div>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-none bg-bg-card border border-border space-y-4"
            >
              <div className="w-10 h-10 rounded-none bg-accent-brand/10 border border-accent-brand/20 flex items-center justify-center text-accent-brand">
                <Target size={20} />
              </div>
              <h3 className="text-lg font-bold font-heading text-text-primary">Our Mission</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                To simplify and beautify construction finishing projects through state-of-the-art paint matching tech, premium eco-friendly materials, and reliable dealer consultations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-none bg-bg-card border border-border space-y-4"
            >
              <div className="w-10 h-10 rounded-none bg-accent-brand/10 border border-accent-brand/20 flex items-center justify-center text-accent-brand">
                <Eye size={20} />
              </div>
              <h3 className="text-lg font-bold font-heading text-text-primary">Our Vision</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                To stand as the gold standard of hardware and paint distribution in Pakistan, known for design-forward solutions, premium brands, and expert contractor support.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-none bg-bg-card border border-border space-y-4"
            >
              <div className="w-10 h-10 rounded-none bg-accent-brand/10 border border-accent-brand/20 flex items-center justify-center text-accent-brand">
                <Award size={20} />
              </div>
              <h3 className="text-lg font-bold font-heading text-text-primary">Core Values</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Authenticity, transparency, absolute quality, and customer-first support guide all our custom mixing and hardware supply services.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
