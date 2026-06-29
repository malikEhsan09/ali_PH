"use client";

import LayoutWrapper from "@/components/layout/LayoutWrapper";
import SectionHeading from "@/components/common/SectionHeading";
import { services } from "@/data/services";
import { Home, Building2, Paintbrush, TreePine, Droplets, Factory, MessageSquare, MapPin } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Home': return <Home size={24} className="text-accent-brand" />;
    case 'Building2': return <Building2 size={24} className="text-accent-brand" />;
    case 'Paintbrush': return <Paintbrush size={24} className="text-accent-brand" />;
    case 'TreePine': return <TreePine size={24} className="text-accent-brand" />;
    case 'Droplets': return <Droplets size={24} className="text-accent-brand" />;
    case 'Factory': return <Factory size={24} className="text-accent-brand" />;
    case 'MessageSquare': return <MessageSquare size={24} className="text-accent-brand" />;
    case 'MapPin': return <MapPin size={24} className="text-accent-brand" />;
    default: return <Paintbrush size={24} className="text-accent-brand" />;
  }
};

export default function ServicesPage() {
  return (
    <LayoutWrapper>
      <div className="py-20 bg-noise min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading 
            title="Premium Finishing & Application Services" 
            subtitle="Services" 
            centered={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="rounded-none p-6 bg-bg-card border border-border hover:border-accent-brand/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-none bg-accent-brand/10 border border-accent-brand/20 flex items-center justify-center mb-6">
                    {getIcon(service.icon)}
                  </div>
                  <h3 className="text-xl font-bold font-heading text-text-primary mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-6 pt-4 border-t border-border">
                  <ul className="space-y-2">
                    {service.features.map((feat, fidx) => (
                      <li key={fidx} className="text-[10px] text-text-secondary flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-accent-brand" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 bg-bg-secondary hover:bg-accent-brand border border-border hover:border-accent-brand hover:text-primary-foreground font-bold py-2.5 rounded-none transition-all duration-300 text-xs text-text-primary"
                  >
                    Request Quote
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
