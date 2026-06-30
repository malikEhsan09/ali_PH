export type LocationType = "showroom" | "hardware" | "service";

export interface ShopLocation {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  type: LocationType;
  /** WGS84 longitude */
  lng: number;
  /** WGS84 latitude */
  lat: number;
  mapsUrl: string;
  phone: string;
}

export const locationTypeMeta: Record<
  LocationType,
  { label: string; color: string; pin: string }
> = {
  showroom: {
    label: "Flagship Showroom",
    color: "#2D7A4F",
    pin: "#3d9a62",
  },
  hardware: {
    label: "Hardware Counter",
    color: "#B8860B",
    pin: "#d4a017",
  },
  service: {
    label: "Color Consultation",
    color: "#4A7C8C",
    pin: "#5a9aad",
  },
};

/** Shop network — coordinates for Islamabad / Rawalpindi */
export const shopLocations: ShopLocation[] = [
  {
    id: "dha-phase-5",
    name: "Islamabad",
    subtitle: "DHA Phase 5 · Ari Syedan",
    badge: "1. SHOWROOM",
    type: "showroom",
    lng: 73.138,
    lat: 33.521,
    mapsUrl: "https://maps.google.com/?q=Ari+Syedan+DHA+Phase+5+Islamabad",
    phone: "+92 324 5555630",
  },
  {
    id: "blue-area",
    name: "Blue Area",
    subtitle: "Commercial Hub · Islamabad",
    badge: "2. SERVICE",
    type: "service",
    lng: 73.075,
    lat: 33.71,
    mapsUrl: "https://maps.google.com/?q=Blue+Area+Islamabad",
    phone: "+92 324 5555630",
  },
  {
    id: "i8-markaz",
    name: "I-8 Markaz",
    subtitle: "Hardware Supply · Islamabad",
    badge: "3. HARDWARE",
    type: "hardware",
    lng: 73.052,
    lat: 33.668,
    mapsUrl: "https://maps.google.com/?q=I-8+Markaz+Islamabad",
    phone: "+92 324 5555630",
  },
  {
    id: "rawalpindi",
    name: "Rawalpindi",
    subtitle: "Saddar · Partner Outlet",
    badge: "4. OUTLET",
    type: "hardware",
    lng: 73.047,
    lat: 33.565,
    mapsUrl: "https://maps.google.com/?q=Saddar+Rawalpindi",
    phone: "+92 324 5555630",
  },
];

export const locationRoute = ["dha-phase-5", "blue-area", "i8-markaz", "rawalpindi"];
