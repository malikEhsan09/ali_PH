"use client";

import { useState } from "react";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import SectionHeading from "@/components/common/SectionHeading";
import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import { Calculator, Sparkles, RefreshCw, Printer } from "lucide-react";

export default function PaintCalculatorPage() {
  const [length, setLength] = useState<number>(12);
  const [width, setWidth] = useState<number>(10);
  const [height, setHeight] = useState<number>(10);
  const [doors, setDoors] = useState<number>(1);
  const [windows, setWindows] = useState<number>(1);
  const [coats, setCoats] = useState<number>(2);
  const [paintId, setPaintId] = useState<string>("p-1");

  const activePaint = products.find((p) => p.id === paintId) || products[0];

  // Mathematical Calculations
  // Total wall area = 2 * (L + W) * H - (doors * 21 sqft) - (windows * 15 sqft)
  const totalWallArea = Math.max(
    0,
    2 * (length + width) * height - doors * 21 - windows * 15
  );

  // Determine coverage per liter based on specifications
  const getCoverageRate = (coverageStr: string): number => {
    // extract digits like '130-150 sq ft/L' -> average is 140
    const matches = coverageStr.match(/\d+/g);
    if (matches && matches.length >= 2) {
      return (Number(matches[0]) + Number(matches[1])) / 2;
    } else if (matches && matches.length === 1) {
      return Number(matches[0]);
    }
    return 120; // default fallback coverage
  };

  const coveragePerLiter = getCoverageRate(activePaint.coverage);
  const litersRequired = Number(
    ((totalWallArea * coats) / coveragePerLiter).toFixed(1)
  );

  const estimatedCost = litersRequired * (activePaint.price / 4); // assume 4L size price base

  const resetCalculator = () => {
    setLength(12);
    setWidth(10);
    setHeight(10);
    setDoors(1);
    setWindows(1);
    setCoats(2);
    setPaintId("p-1");
  };

  return (
    <LayoutWrapper>
      <div className="py-20 bg-noise min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading 
            title="Smart Paint Estimator" 
            subtitle="Calculator" 
            centered={true}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-20">
            {/* Input Form Column */}
            <div className="lg:col-span-2 space-y-6 bg-bg-card border border-border p-6 rounded-none">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <span className="font-semibold text-text-primary flex items-center gap-2 text-sm">
                  <Calculator size={16} /> Room Dimensions
                </span>
                <button
                  onClick={resetCalculator}
                  className="text-xs text-text-muted hover:text-accent-brand flex items-center gap-1 transition-colors"
                >
                  <RefreshCw size={12} /> Reset Inputs
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-text-secondary">Length (ft)</label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-bg-secondary border border-border rounded-none py-2.5 px-3 text-sm text-text-primary focus:outline-none focus:border-accent-brand/40 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-text-secondary">Width (ft)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-bg-secondary border border-border rounded-none py-2.5 px-3 text-sm text-text-primary focus:outline-none focus:border-accent-brand/40 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-text-secondary">Height (ft)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-bg-secondary border border-border rounded-none py-2.5 px-3 text-sm text-text-primary focus:outline-none focus:border-accent-brand/40 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-text-secondary">Number of Doors</label>
                  <input
                    type="number"
                    value={doors}
                    onChange={(e) => setDoors(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-bg-secondary border border-border rounded-none py-2.5 px-3 text-sm text-text-primary focus:outline-none focus:border-accent-brand/40 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-text-secondary">Number of Windows</label>
                  <input
                    type="number"
                    value={windows}
                    onChange={(e) => setWindows(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-bg-secondary border border-border rounded-none py-2.5 px-3 text-sm text-text-primary focus:outline-none focus:border-accent-brand/40 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-text-secondary">Number of Coats</label>
                  <select
                    value={coats}
                    onChange={(e) => setCoats(Number(e.target.value))}
                    className="w-full bg-bg-secondary border border-border rounded-none py-2.5 px-3 text-sm text-text-primary focus:outline-none focus:border-accent-brand/40 transition-colors"
                  >
                    <option value={1} className="bg-bg-card">1 Coat (Touch-up)</option>
                    <option value={2} className="bg-bg-card">2 Coats (Recommended)</option>
                    <option value={3} className="bg-bg-card">3 Coats (Fresh Wall)</option>
                  </select>
                </div>
              </div>

              {/* Paint Selection Dropdown */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold text-text-secondary">Choose Paint Product</label>
                <select
                  value={paintId}
                  onChange={(e) => setPaintId(e.target.value)}
                  className="w-full bg-bg-secondary border border-border rounded-none py-2.5 px-3 text-sm text-text-primary focus:outline-none focus:border-accent-brand/40 transition-colors"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id} className="bg-bg-card">
                      {p.brand} — {p.name} ({p.finish} finish)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Calculations Output Card */}
            <div className="space-y-6 p-6 rounded-none bg-gradient-to-b from-bg-card to-bg-secondary border border-border shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="font-semibold text-text-primary text-xs flex items-center gap-1.5">
                  <Sparkles size={12} className="text-accent-brand animate-pulse" /> Estimate Output
                </span>
                <button
                  onClick={() => window.print()}
                  className="text-text-muted hover:text-text-primary transition-colors"
                  title="Print estimate"
                >
                  <Printer size={14} />
                </button>
              </div>

              <div className="space-y-4 py-2">
                <div className="flex justify-between items-center text-xs border-b border-border pb-2">
                  <span className="text-text-secondary">Total Wall Area</span>
                  <span className="font-bold text-text-primary">{totalWallArea} sq ft</span>
                </div>

                <div className="flex justify-between items-center text-xs border-b border-border pb-2">
                  <span className="text-text-secondary">Coverage Rate</span>
                  <span className="font-bold text-text-primary">{activePaint.coverage}</span>
                </div>

                <div className="flex justify-between items-center text-xs border-b border-border pb-2">
                  <span className="text-text-secondary">Coats Selected</span>
                  <span className="font-bold text-text-primary">{coats}</span>
                </div>

                <div className="p-4 rounded-none bg-bg-secondary border border-border text-center my-4 space-y-1">
                  <span className="text-[10px] text-text-muted uppercase tracking-wider block">Estimated Paint Required</span>
                  <span className="text-3xl font-extrabold text-accent-brand">{litersRequired} Liters</span>
                </div>

                <div className="p-4 rounded-none bg-bg-secondary border border-border text-center space-y-1">
                  <span className="text-[10px] text-text-muted uppercase tracking-wider block">Estimated Paint Cost</span>
                  <span className="text-2xl font-extrabold text-text-primary">
                    PKR {Math.round(estimatedCost).toLocaleString()}
                  </span>
                  <p className="text-[9px] text-text-muted mt-1 leading-relaxed">
                    Estimate excludes labor costs and taxes. Base color mixing may incur extra colorant fees.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Product Recommendation */}
          <div>
            <SectionHeading 
              title="Recommended Paints For Your Space" 
              subtitle="Optimized Choice" 
              centered={true}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
}
