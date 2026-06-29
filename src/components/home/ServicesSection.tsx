"use client";

import { motion } from "framer-motion";
import { services } from "@/data/services";
import SectionHeading from "../common/SectionHeading";
import Link from "next/link";
import { ArrowRight, Home, Building2, Paintbrush, TreePine, Droplets, Factory } from "lucide-react";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Home': return <Home className="w-5 h-5 text-accent-brand" />;
    case 'Building2': return <Building2 className="w-5 h-5 text-accent-brand" />;
    case 'Paintbrush': return <Paintbrush className="w-5 h-5 text-accent-brand" />;
    case 'TreePine': return <TreePine className="w-5 h-5 text-accent-brand" />;
    case 'Droplets': return <Droplets className="w-5 h-5 text-accent-brand" />;
    case 'Factory': return <Factory className="w-5 h-5 text-accent-brand" />;
    default: return <Paintbrush className="w-5 h-5 text-accent-brand" />;
  }
};

export default function ServicesSection() {
  // Take first 6 services
  const displayServices = services.slice(0, 6);

  return (
    <section className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
          <div className="flex-1">
            <SectionHeading 
              title="Expert Application Services" 
              subtitle="Precision Finish" 
              centered={false}
            />
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-accent-brand hover:text-accent-light transition-colors text-sm font-semibold group mb-4 md:mb-12"
          >
            Explore All Services
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-none p-6 bg-bg-secondary border border-border hover:border-accent-brand/20 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-none bg-accent-brand/10 border border-accent-brand/20 flex items-center justify-center mb-6">
                {getIcon(service.icon)}
              </div>

              <h3 className="text-xl font-bold font-heading text-text-primary mb-2 group-hover:text-accent-brand transition-colors">
                {service.title}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed mb-6">
                {service.shortDescription}
              </p>

              <ul className="space-y-2 mb-6">
                {service.features.slice(0, 3).map((feat, fidx) => (
                  <li key={fidx} className="text-[10px] text-text-muted flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent-brand" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="text-xs font-semibold text-accent-brand hover:text-accent-light flex items-center gap-1 transition-colors"
              >
                Request Consultation →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
