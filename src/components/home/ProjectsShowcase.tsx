"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import SectionHeading from "../common/SectionHeading";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import SiteImage from "@/components/common/SiteImage";

export default function ProjectsShowcase() {
  const showcase = projects.slice(0, 3);

  return (
    <section className="py-24 bg-bg-secondary relative overflow-hidden bg-noise">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
          <div className="flex-1">
            <SectionHeading
              title="Beautified Spaces & Case Studies"
              subtitle="Our Portfolio"
              centered={false}
            />
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-accent-brand hover:text-accent-light transition-colors text-sm font-semibold group mb-4 md:mb-12"
          >
            View All Projects
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {showcase.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group bg-bg-card border border-border overflow-hidden hover:border-accent-brand/40 transition-all duration-300 flex flex-col"
            >
              <div className="aspect-[4/3] w-full relative overflow-hidden">
                <SiteImage
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 to-transparent" />
                <span className="absolute top-4 left-4 z-20 text-[10px] bg-accent-brand text-primary-foreground font-bold px-2 py-0.5 uppercase tracking-wider">
                  {project.category}
                </span>
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
                      className="text-[9px] bg-bg-secondary border border-border px-2 py-0.5 text-text-muted font-medium"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
