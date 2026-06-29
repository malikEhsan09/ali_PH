"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import SectionHeading from "../common/SectionHeading";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const active = testimonials[current];

  return (
    <section className="py-24 bg-bg-primary relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-accent-brand/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] bg-accent-brand/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <SectionHeading 
          title="Client Endorsements" 
          subtitle="Customer Voices" 
          centered={true}
        />

        <div className="relative min-h-[320px] flex flex-col justify-between p-8 md:p-12 rounded-none bg-bg-card border border-border shadow-2xl">
          {/* Quote icon overlay */}
          <div className="absolute top-6 left-6 text-accent-brand/10">
            <Quote size={80} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 relative z-10"
            >
              {/* Stars */}
              <div className="flex justify-center text-amber-400 gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < active.rating ? "currentColor" : "none"}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-base sm:text-lg md:text-xl text-text-secondary italic leading-relaxed max-w-2xl mx-auto">
                "{active.comment}"
              </p>

              {/* Author */}
              <div>
                <h4 className="font-heading font-bold text-text-primary text-base">
                  {active.name}
                </h4>
                <p className="text-xs text-text-muted mt-0.5">
                  {active.role} • <span className="text-accent-brand">{active.project}</span>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-none bg-bg-secondary border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent-brand/40 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-xs text-text-muted">
              {current + 1} / {testimonials.length}
            </span>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-none bg-bg-secondary border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent-brand/40 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
