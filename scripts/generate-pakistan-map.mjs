#!/usr/bin/env node
/**
 * Regenerate Pakistan SVG + TypeScript paths from amCharts geodata.
 * Source: https://cdn.amcharts.com/lib/5/geodata/json/pakistanLow.json
 * Generator reference: https://dojo.amcharts.com/svg-map-generator/
 */
import fs from "fs";
import https from "https";

const GEO_URL = "https://cdn.amcharts.com/lib/5/geodata/json/pakistanLow.json";
const W = 800;
const H = 900;
const PAD = 40;

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve(JSON.parse(data)));
    }).on("error", reject);
  });
}

function main(geo) {
  let minLng = Infinity, minLat = Infinity, maxLng = -Infinity, maxLat = -Infinity;

  function walkCoords(coords) {
    if (typeof coords[0] === "number") {
      const [lng, lat] = coords;
      minLng = Math.min(minLng, lng);
      maxLng = Math.max(maxLng, lng);
      minLat = Math.min(minLat, lat);
      maxLat = Math.max(maxLat, lat);
    } else coords.forEach(walkCoords);
  }

  geo.features.forEach((f) => walkCoords(f.geometry.coordinates));

  function project(lng, lat) {
    const x = PAD + ((lng - minLng) / (maxLng - minLng)) * (W - PAD * 2);
    const y = PAD + (1 - (lat - minLat) / (maxLat - minLat)) * (H - PAD * 2);
    return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
  }

  function ringToPath(ring) {
    return ring
      .map((c, i) => {
        const [x, y] = project(c[0], c[1]);
        return `${i === 0 ? "M" : "L"}${x},${y}`;
      })
      .join(" ") + " Z";
  }

  function polyToPath(coords) {
    if (coords[0][0][0] !== undefined && typeof coords[0][0][0] === "number") {
      return coords.map(ringToPath).join(" ");
    }
    return coords.map(polyToPath).join(" ");
  }

  const paths = geo.features.map((f) => polyToPath(f.geometry.coordinates));

  const svgPaths = paths
    .map((d, i) => `  <path id="pk-${i}" d="${d}" />`)
    .join("\n");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" fill="#cfd8dc" stroke="#90a4ae" stroke-width="1" stroke-linejoin="round">\n${svgPaths}\n</svg>`;

  fs.mkdirSync("public/maps", { recursive: true });
  fs.writeFileSync("public/maps/pakistan.svg", svg);

  const ts = `/** Pakistan map paths — generated from amCharts pakistanLow geodata */
export const PAKISTAN_MAP_VIEWBOX = { width: ${W}, height: ${H} } as const;
export const PAKISTAN_MAP_VIEW = "0 0 ${W} ${H}" as const;

export const pakistanMapPaths: string[] = ${JSON.stringify(paths, null, 2)};

export function projectLatLng(lng: number, lat: number): [number, number] {
  const minLng = ${minLng};
  const minLat = ${minLat};
  const maxLng = ${maxLng};
  const maxLat = ${maxLat};
  const pad = ${PAD};
  const w = ${W};
  const h = ${H};
  const x = pad + ((lng - minLng) / (maxLng - minLng)) * (w - pad * 2);
  const y = pad + (1 - (lat - minLat) / (maxLat - minLat)) * (h - pad * 2);
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}
`;

  fs.writeFileSync("src/data/pakistan-map.ts", ts);
  console.log(`Generated public/maps/pakistan.svg and src/data/pakistan-map.ts (${paths.length} paths)`);
}

fetchJson(GEO_URL).then(main).catch((e) => {
  console.error(e);
  process.exit(1);
});
