/** Projection for amCharts worldUltra.svg (viewBox 0 0 1580 903) */
export const WORLD_MAP_VIEW = "0 0 1580 903" as const;
export const WORLD_MAP_SRC = "/maps/worldUltra.svg";

/** Calibrated from Pakistan polygon bounds inside worldUltra.svg */
const PK_BOUNDS = {
  minLng: 60.8994,
  maxLng: 79.6418,
  minLat: 23.6813,
  maxLat: 37.095,
  minX: 1023.115,
  maxX: 1094.728,
  minY: 246.232,
  maxY: 320.044,
};

export function projectWorldLatLng(lng: number, lat: number): [number, number] {
  const { minLng, maxLng, minLat, maxLat, minX, maxX, minY, maxY } = PK_BOUNDS;
  const x = minX + ((lng - minLng) / (maxLng - minLng)) * (maxX - minX);
  const y = minY + ((maxLat - lat) / (maxLat - minLat)) * (maxY - minY);
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}
