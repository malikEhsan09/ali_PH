"use client";

import { brands } from "@/data/brands";
import SectionHeading from "../common/SectionHeading";
import SiteImage from "@/components/common/SiteImage";

export default function BrandsSection() {
  return (
    <section className="py-24 bg-bg-secondary relative overflow-hidden bg-noise">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          title="Authorized Brands & Affiliations"
          subtitle="Partner Networks"
          centered={true}
        />

        <div className="relative flex items-center overflow-hidden py-4 border-t border-b border-border bg-bg-card/50">
          <div className="flex gap-12 animate-marquee whitespace-nowrap min-w-full">
            {[...brands, ...brands, ...brands].map((brand, idx) => (
              <div
                key={`${brand.id}-${idx}`}
                className="inline-flex items-center gap-4 px-6 py-3 bg-bg-card border border-border hover:border-accent-brand/30 transition-all duration-300 min-w-[220px]"
              >
                <div className="w-12 h-12 bg-bg-secondary border border-border flex items-center justify-center flex-shrink-0">
                  <SiteImage
                    src={brand.logo}
                    alt={brand.name}
                    width={40}
                    height={40}
                    className="object-contain w-8 h-8"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-heading text-text-primary">{brand.name}</h4>
                  <p className="text-[10px] text-text-muted">Official Partner</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
