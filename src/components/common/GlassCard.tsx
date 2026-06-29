"use client";

import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: boolean;
}

export default function GlassCard({ children, className = "", hoverGlow = true }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`glass rounded-none p-6 relative overflow-hidden transition-all duration-500 ${
        hoverGlow ? "hover:border-accent-brand/30 hover:shadow-2xl hover:shadow-accent-brand/5" : ""
      } ${className}`}
    >
      {/* Subtle top edge lighting */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
}
