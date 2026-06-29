"use client";

import { useState, useMemo } from "react";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import SectionHeading from "@/components/common/SectionHeading";
import { projects } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Check } from "lucide-react";
import SiteImage from "@/components/common/SiteImage";

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "residential" | "commercial" | "industrial">("all");

  const filtered = useMemo(() => {
    if (activeTab === "all") return projects;
    return projects.filter((p) => p.category === activeTab);
  }, [activeTab]);

  return (
    <LayoutWrapper>
      <div className="py-20 bg-noise min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading 
            title="Realized Projects & Case Studies" 
            subtitle="Portfolio" 
            centered={true}
          />

          {/* Tab buttons */}
          <div className="flex justify-center gap-3 mb-12">
            {(["all", "residential", "commercial", "industrial"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-none border text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-accent-brand text-primary-foreground border-accent-brand shadow-lg shadow-accent-brand/10"
                    : "bg-bg-secondary border-border text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group rounded-none bg-bg-card border border-border overflow-hidden hover:border-accent-brand/30 transition-all duration-300 relative flex flex-col justify-between"
                >
                  {/* Visual project header with gradient */}
                  <div className="aspect-[4/3] w-full relative overflow-hidden border-b border-border">
                    <SiteImage
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card/90 to-transparent z-10" />
                    <span className="absolute top-4 left-4 z-20 text-[10px] bg-accent-brand text-primary-foreground font-bold px-2 py-0.5 uppercase tracking-wider">
                      {project.category}
                    </span>
                    
                    {/* Meta details */}
                    <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between text-[10px] text-text-secondary">
                      <span className="flex items-center gap-1">
                        <MapPin size={10} className="text-accent-brand" /> {project.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={10} className="text-accent-brand" /> {project.completedDate}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold font-heading text-text-primary group-hover:text-accent-brand transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {project.productsUsed.map((p, pidx) => (
                        <span
                          key={pidx}
                          className="text-[9px] bg-bg-secondary border border-border px-2 py-0.5 rounded text-text-muted font-medium"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
