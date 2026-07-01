"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, MapPin, Phone } from "lucide-react";
import {
  locationRoute,
  locationTypeMeta,
  shopLocations,
  type LocationType,
  type ShopLocation,
} from "@/data/locations";
import { WORLD_MAP_VIEW, WORLD_MAP_SRC, projectWorldLatLng } from "@/data/world-map";

function PinIcon({ color, active, scale = 1 }: { color: string; active: boolean; scale?: number }) {
  const w = 26 * scale;
  const h = 34 * scale;
  return (
    <svg width={w} height={h} viewBox="0 0 28 36" fill="none" aria-hidden>
      <path
        d="M14 0C6.82 0 1 5.82 1 13c0 9.75 13 23 13 23s13-13.25 13-23C27 5.82 21.18 0 14 0Z"
        fill={color}
        stroke="white"
        strokeWidth={active ? 2.5 : 1.5}
      />
      <circle cx="14" cy="13" r="5" fill="white" fillOpacity={0.95} />
      <circle cx="14" cy="13" r="2.5" fill={color} />
    </svg>
  );
}

function LocationLabel({ loc, active }: { loc: ShopLocation; active: boolean }) {
  const meta = locationTypeMeta[loc.type];
  return (
    <div className={`pointer-events-none whitespace-nowrap ${active ? "z-20" : "z-10"}`}>
      <p className="text-[10px] text-text-muted font-medium">{loc.subtitle}</p>
      <p className={`text-sm font-bold font-heading ${active ? "text-accent-brand" : "text-text-primary"}`}>
        {loc.name}
      </p>
      <span
        className="inline-block mt-1 px-2 py-0.5 text-[9px] font-bold tracking-wider text-white"
        style={{ backgroundColor: meta.color }}
      >
        {loc.badge}
      </span>
    </div>
  );
}

type ProjectedLocation = ShopLocation & { x: number; y: number };

export default function LocationMap() {
  const [activeId, setActiveId] = useState(shopLocations[0].id);
  const [filter, setFilter] = useState<LocationType | "all">("all");

  const projected = useMemo(
    () =>
      shopLocations.map((loc) => {
        const [x, y] = projectWorldLatLng(loc.lng, loc.lat);
        return { ...loc, x, y };
      }),
    []
  );

  const visible = useMemo(
    () => (filter === "all" ? projected : projected.filter((l) => l.type === filter)),
    [projected, filter]
  );

  useEffect(() => {
    if (!visible.some((l) => l.id === activeId) && visible.length > 0) {
      setActiveId(visible[0].id);
    }
  }, [visible, activeId]);

  const active = projected.find((l) => l.id === activeId) ?? projected[0];

  const routePoints = useMemo(
    () =>
      locationRoute
        .map((id) => projected.find((l) => l.id === id))
        .filter(Boolean) as ProjectedLocation[],
    [projected]
  );

  const islamabadCenter = projected.find((p) => p.id === "dha-phase-5") ?? projected[0];

  return (
    <section className="mt-16 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-6 text-center">
        <h3 className="text-sm sm:text-base font-heading font-bold tracking-[0.25em] text-text-primary uppercase">
          Ali Paint Shop Network
        </h3>
        <p className="text-xs text-text-muted mt-1">Pakistan · Islamabad · Rawalpindi</p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {(Object.keys(locationTypeMeta) as LocationType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilter(filter === type ? "all" : type)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold border transition-colors cursor-pointer ${
                filter === type
                  ? "border-accent-brand bg-accent-brand/10 text-accent-brand"
                  : "border-border bg-bg-secondary text-text-secondary hover:border-accent-brand/30"
              }`}
            >
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: locationTypeMeta[type].pin }} />
              {locationTypeMeta[type].label}
            </button>
          ))}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as LocationType | "all")}
            className="px-3 py-1.5 text-[10px] font-semibold border border-border bg-bg-secondary text-text-secondary cursor-pointer focus:outline-none focus:border-accent-brand/40"
          >
            <option value="all">All locations</option>
            <option value="showroom">Showrooms only</option>
            <option value="hardware">Hardware only</option>
            <option value="service">Service desks only</option>
          </select>
        </div>
      </div>

      {/* Edge-to-edge world map — breaks out of page container */}
      <div className="relative w-screen left-1/2 -translate-x-1/2 bg-[#2d2d2d]">
        <svg
          viewBox={WORLD_MAP_VIEW}
          className="w-full h-auto block min-h-[240px] sm:min-h-[320px] lg:min-h-[420px]"
          role="img"
          aria-label="World map showing Ali Paint shop location in Islamabad, Pakistan"
          preserveAspectRatio="xMidYMid slice"
        >
          <image href={WORLD_MAP_SRC} width="1580" height="903" preserveAspectRatio="xMidYMid meet" />

          {/* Pulse ring on Islamabad cluster */}
          <circle
            cx={islamabadCenter.x}
            cy={islamabadCenter.y}
            r="18"
            fill="none"
            stroke="#3d9a62"
            strokeWidth="1.5"
            strokeOpacity="0.6"
            className="animate-pulse"
          />

          {/* Dashed routes between local shops */}
          {routePoints.map((point, i) => {
            if (i === routePoints.length - 1) return null;
            const next = routePoints[i + 1];
            return (
              <line
                key={`route-${point.id}`}
                x1={point.x}
                y1={point.y}
                x2={next.x}
                y2={next.y}
                stroke="white"
                strokeWidth="1"
                strokeDasharray="4 3"
                strokeOpacity="0.45"
              />
            );
          })}

          {/* Shop pins */}
          {visible.map((loc) => {
            const meta = locationTypeMeta[loc.type];
            const isActive = loc.id === activeId;

            return (
              <g key={loc.id}>
                {isActive && (
                  <foreignObject
                    x={loc.x + 14}
                    y={loc.y - 50}
                    width="130"
                    height="52"
                    className="overflow-visible hidden md:block"
                  >
                    <LocationLabel loc={loc} active={isActive} />
                  </foreignObject>
                )}

                <g
                  transform={`translate(${loc.x - 13}, ${loc.y - 34})`}
                  className="cursor-pointer"
                  onClick={() => setActiveId(loc.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${loc.name}, ${loc.subtitle}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveId(loc.id);
                    }
                  }}
                >
                  <motion.g
                    animate={{ scale: isActive ? 1.25 : 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  >
                    <PinIcon color={meta.pin} active={isActive} />
                  </motion.g>
                </g>
              </g>
            );
          })}

          {/* Islamabad callout label on map */}
          <text
            x={islamabadCenter.x + 20}
            y={islamabadCenter.y - 22}
            fill="white"
            fontSize="11"
            fontWeight="700"
            fontFamily="var(--font-outfit), sans-serif"
            className="pointer-events-none select-none"
          >
            ISLAMABAD
          </text>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="py-4 border-t border-border bg-bg-secondary/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${locationTypeMeta[active.type].color}22` }}
            >
              <MapPin size={18} style={{ color: locationTypeMeta[active.type].color }} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-text-muted">{active.badge}</p>
              <h4 className="font-bold font-heading text-text-primary">{active.name}</h4>
              <p className="text-xs text-text-secondary mt-0.5">{active.subtitle}, Pakistan</p>
              <p className="text-xs text-text-muted mt-1 flex items-center gap-1.5">
                <Phone size={12} className="text-accent-brand" />
                {active.phone}
              </p>
            </div>
          </div>
          <a
            href={active.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-accent-brand hover:bg-accent-light text-primary-foreground text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
          >
            Get Directions
            <ExternalLink size={14} />
          </a>
          </motion.div>
        </AnimatePresence>

        <div className="md:hidden border-t border-border divide-y divide-border">
          {projected.map((loc) => (
            <button
              key={loc.id}
              type="button"
              onClick={() => setActiveId(loc.id)}
              className={`w-full text-left py-3 flex items-center gap-3 cursor-pointer transition-colors ${
                loc.id === activeId ? "bg-accent-brand/10" : "hover:bg-bg-secondary"
              }`}
            >
              <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: locationTypeMeta[loc.type].pin }} />
              <div>
                <p className="text-sm font-semibold text-text-primary">{loc.name}</p>
                <p className="text-xs text-text-muted">{loc.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
