"use client";

import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle2 } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import SiteImage from "@/components/common/SiteImage";
import { siteImages } from "@/data/images";

export default function CalculatorPreview() {
  return (
    <section className="py-24 bg-bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="border border-border bg-gradient-to-r from-bg-card to-bg-secondary p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-lg">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-brand/10 border border-accent-brand/20 text-xs text-accent-brand">
              <Calculator size={12} />
              <span>Smart Planning Tool</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-text-primary leading-tight">
              Eliminate the Guesswork With Our Paint Calculator
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed max-w-lg">
              Calculate exact wall area, liter requirements, and estimated project cost in seconds — inspired by Bluebird Paints&apos; industry-standard calculator.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-text-secondary">
              {["Room Dimensions Input", "Doors & Windows Excluded", "Gobis Paint Custom Specs", "Instant Cost Estimator"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-accent-brand flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 bg-accent-brand hover:bg-accent-light text-primary-foreground font-bold px-6 py-3.5 transition-all duration-300 group"
              >
                Launch Calculator
                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-[420px] aspect-[4/3] border border-border bg-bg-card overflow-hidden shadow-xl relative">
            <SiteImage
              src={siteImages.calculator.banner}
              alt="Paint calculator tool preview"
              fill
              className="object-cover"
              sizes="420px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
