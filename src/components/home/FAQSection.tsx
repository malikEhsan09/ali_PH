"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/data/faq";
import SectionHeading from "../common/SectionHeading";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  // Take first 6 FAQs
  const displayFaqs = faqs.slice(0, 6);
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-24 bg-bg-secondary relative overflow-hidden bg-noise">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading 
          title="Frequently Asked Questions" 
          subtitle="Support & Advice" 
          centered={true}
        />

        <div className="space-y-4">
          {displayFaqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-none border border-border bg-bg-secondary overflow-hidden hover:border-border transition-colors"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between font-heading font-semibold text-sm text-text-primary hover:text-accent-brand py-4 px-6 text-left transition-colors focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={16}
                    className={`text-text-secondary transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-accent-brand" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="text-xs text-text-secondary leading-relaxed pb-4 pt-1 px-6 border-t border-border mt-1">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
