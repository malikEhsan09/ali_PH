"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Trophy, Sparkles } from "lucide-react";
import SectionHeading from "../common/SectionHeading";

const stats = [
  { id: 1, number: "1,800+", label: "Color Shades Mixed", desc: "Computerized customized color tinting matching system.", icon: <Sparkles className="w-6 h-6 text-accent-brand" /> },
  { id: 2, number: "100%", label: "Genuine Gobis Paints", desc: "Authorized affiliate dealer with guaranteed manufacturer warranty.", icon: <ShieldCheck className="w-6 h-6 text-accent-brand" /> },
  { id: 3, number: "12,000+", label: "Spaces Beautified", desc: "Premium quality coverage across residences, offices & industrial sites.", icon: <CheckCircle2 className="w-6 h-6 text-accent-brand" /> },
  { id: 4, number: "15+", label: "Years of Excellence", desc: "Trust and support from top builders, painters & homeowners.", icon: <Trophy className="w-6 h-6 text-accent-brand" /> }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-bg-secondary relative overflow-hidden bg-noise">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading 
          title="Why Choose Us" 
          subtitle="Precision & Quality" 
          centered={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-none p-6 bg-bg-secondary border border-border hover:border-accent-brand/20 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Subtle top corner glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-brand/5 rounded-full blur-[20px] group-hover:bg-accent-brand/10 transition-colors" />

              <div className="w-12 h-12 rounded-none bg-accent-brand/10 border border-accent-brand/20 flex items-center justify-center mb-6">
                {stat.icon}
              </div>

              <h3 className="text-3xl font-extrabold font-heading text-text-primary mb-2">
                {stat.number}
              </h3>
              <h4 className="font-semibold text-sm text-accent-brand mb-2">
                {stat.label}
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
