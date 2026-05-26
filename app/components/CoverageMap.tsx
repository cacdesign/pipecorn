"use client";

import { useState, useMemo, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

/* TopoJSON world data (countries, 110m). Loaded once from jsDelivr CDN. */
const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

/* ── Data ─────────────────────────────────────────────────────────────── */

type Country = {
  id: string;
  name: string;
  /** [longitude, latitude] for geo projection */
  coords: [number, number];
  findRate: number;
  emailRate: number;
  mobileRate: number;
};

const COUNTRIES: Country[] = [
  // North America
  { id: "US", name: "United States",    coords: [-98,  38], findRate: 87, emailRate: 91, mobileRate: 79 },
  { id: "CA", name: "Canada",           coords: [-100, 56], findRate: 83, emailRate: 88, mobileRate: 74 },
  { id: "MX", name: "Mexico",           coords: [-102, 23], findRate: 68, emailRate: 72, mobileRate: 58 },
  // Europe
  { id: "GB", name: "United Kingdom",   coords: [ -2,  54], findRate: 84, emailRate: 89, mobileRate: 76 },
  { id: "FR", name: "France",           coords: [  2,  46], findRate: 80, emailRate: 85, mobileRate: 72 },
  { id: "DE", name: "Germany",          coords: [ 10,  51], findRate: 82, emailRate: 88, mobileRate: 74 },
  { id: "ES", name: "Spain",            coords: [ -4,  40], findRate: 76, emailRate: 82, mobileRate: 68 },
  { id: "IT", name: "Italy",            coords: [ 12,  42], findRate: 75, emailRate: 80, mobileRate: 66 },
  { id: "NL", name: "Netherlands",      coords: [  5,  52], findRate: 85, emailRate: 90, mobileRate: 78 },
  { id: "BE", name: "Belgium",          coords: [  4,  50], findRate: 82, emailRate: 87, mobileRate: 74 },
  { id: "SE", name: "Sweden",           coords: [ 16,  62], findRate: 80, emailRate: 86, mobileRate: 72 },
  { id: "NO", name: "Norway",           coords: [ 10,  64], findRate: 79, emailRate: 85, mobileRate: 70 },
  { id: "DK", name: "Denmark",          coords: [ 10,  56], findRate: 81, emailRate: 87, mobileRate: 73 },
  { id: "FI", name: "Finland",          coords: [ 26,  64], findRate: 78, emailRate: 84, mobileRate: 70 },
  { id: "CH", name: "Switzerland",      coords: [  8,  47], findRate: 83, emailRate: 88, mobileRate: 76 },
  { id: "AT", name: "Austria",          coords: [ 14,  47], findRate: 80, emailRate: 85, mobileRate: 73 },
  { id: "PT", name: "Portugal",         coords: [ -8,  39], findRate: 74, emailRate: 79, mobileRate: 65 },
  { id: "PL", name: "Poland",           coords: [ 19,  52], findRate: 78, emailRate: 83, mobileRate: 70 },
  { id: "IE", name: "Ireland",          coords: [ -8,  53], findRate: 83, emailRate: 88, mobileRate: 75 },
  { id: "GR", name: "Greece",           coords: [ 22,  39], findRate: 72, emailRate: 78, mobileRate: 62 },
  { id: "RO", name: "Romania",          coords: [ 25,  46], findRate: 70, emailRate: 76, mobileRate: 60 },
  // Middle East
  { id: "TR", name: "Turkey",           coords: [ 35,  39], findRate: 68, emailRate: 74, mobileRate: 58 },
  { id: "IL", name: "Israel",           coords: [ 35,  31], findRate: 75, emailRate: 80, mobileRate: 66 },
  { id: "SA", name: "Saudi Arabia",     coords: [ 45,  24], findRate: 65, emailRate: 70, mobileRate: 56 },
  { id: "AE", name: "UAE",              coords: [ 54,  24], findRate: 72, emailRate: 78, mobileRate: 62 },
  // Asia
  { id: "RU", name: "Russia",           coords: [100,  61], findRate: 62, emailRate: 68, mobileRate: 50 },
  { id: "IN", name: "India",            coords: [ 78,  22], findRate: 65, emailRate: 70, mobileRate: 54 },
  { id: "CN", name: "China",            coords: [105,  35], findRate: 60, emailRate: 66, mobileRate: 50 },
  { id: "JP", name: "Japan",            coords: [138,  36], findRate: 68, emailRate: 74, mobileRate: 58 },
  { id: "KR", name: "South Korea",      coords: [128,  37], findRate: 70, emailRate: 76, mobileRate: 60 },
  { id: "SG", name: "Singapore",        coords: [104,   1.4], findRate: 78, emailRate: 84, mobileRate: 70 },
  { id: "MY", name: "Malaysia",         coords: [102,   4], findRate: 70, emailRate: 76, mobileRate: 60 },
  { id: "ID", name: "Indonesia",        coords: [113,  -2], findRate: 60, emailRate: 66, mobileRate: 50 },
  { id: "PH", name: "Philippines",      coords: [122,  13], findRate: 62, emailRate: 68, mobileRate: 52 },
  { id: "TH", name: "Thailand",         coords: [101,  15], findRate: 65, emailRate: 70, mobileRate: 55 },
  { id: "VN", name: "Vietnam",          coords: [108,  16], findRate: 63, emailRate: 68, mobileRate: 52 },
  { id: "TW", name: "Taiwan",           coords: [121,  24], findRate: 68, emailRate: 73, mobileRate: 58 },
  { id: "PK", name: "Pakistan",         coords: [ 70,  30], findRate: 55, emailRate: 60, mobileRate: 45 },
  { id: "BD", name: "Bangladesh",       coords: [ 90,  24], findRate: 52, emailRate: 58, mobileRate: 42 },
  // Africa
  { id: "ZA", name: "South Africa",     coords: [ 25, -29], findRate: 65, emailRate: 72, mobileRate: 54 },
  { id: "NG", name: "Nigeria",          coords: [  9,   9], findRate: 55, emailRate: 60, mobileRate: 44 },
  { id: "EG", name: "Egypt",            coords: [ 30,  26], findRate: 62, emailRate: 68, mobileRate: 52 },
  { id: "MA", name: "Morocco",          coords: [ -6,  32], findRate: 60, emailRate: 65, mobileRate: 50 },
  { id: "KE", name: "Kenya",            coords: [ 38,   0], findRate: 58, emailRate: 63, mobileRate: 48 },
  // South America
  { id: "BR", name: "Brazil",           coords: [-55, -10], findRate: 68, emailRate: 74, mobileRate: 58 },
  { id: "AR", name: "Argentina",        coords: [-64, -34], findRate: 65, emailRate: 70, mobileRate: 55 },
  { id: "CO", name: "Colombia",         coords: [-74,   4], findRate: 63, emailRate: 68, mobileRate: 52 },
  { id: "CL", name: "Chile",            coords: [-71, -30], findRate: 62, emailRate: 68, mobileRate: 52 },
  { id: "PE", name: "Peru",             coords: [-75, -10], findRate: 60, emailRate: 65, mobileRate: 50 },
  // Oceania
  { id: "AU", name: "Australia",        coords: [134, -25], findRate: 80, emailRate: 86, mobileRate: 72 },
  { id: "NZ", name: "New Zealand",      coords: [173, -41], findRate: 78, emailRate: 84, mobileRate: 70 },
];

type Industry = { name: string; rate: number };
const INDUSTRIES: Industry[] = [
  { name: "SaaS & Technology",       rate: 89 },
  { name: "Financial Services",      rate: 83 },
  { name: "Professional Services",   rate: 81 },
  { name: "Real Estate",             rate: 74 },
  { name: "Healthcare",              rate: 71 },
  { name: "Retail & E-commerce",     rate: 67 },
  { name: "Manufacturing",           rate: 64 },
  { name: "Education",               rate: 61 },
];

function rateColor(r: number): string {
  if (r >= 80) return "#16A34A";
  if (r >= 70) return "#2D77E3";
  if (r >= 60) return "#F59E0B";
  return "#E8513A";
}

function flagEmoji(code: string): string {
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("");
}

const INDUSTRY_BOOST: Record<string, Partial<Record<string, number>>> = {
  US: { "SaaS & Technology": 5, Healthcare: 5, "Real Estate": 4 },
  CA: { "Real Estate": 5, "SaaS & Technology": 3 },
  MX: { "Retail & E-commerce": 6, Manufacturing: 5 },
  GB: { "Financial Services": 7, "SaaS & Technology": 4 },
  FR: { "Retail & E-commerce": 6, Manufacturing: 4, Healthcare: 2 },
  DE: { Manufacturing: 11, "SaaS & Technology": -4, "Financial Services": 3 },
  ES: { "Retail & E-commerce": 7, "Real Estate": 5, Manufacturing: 2 },
  IT: { Manufacturing: 8, "Retail & E-commerce": 5 },
  NL: { "SaaS & Technology": 6, "Financial Services": 5 },
  BE: { "Financial Services": 4, "SaaS & Technology": 4 },
  SE: { "SaaS & Technology": 8, Manufacturing: 3 },
  NO: { "SaaS & Technology": 6, Healthcare: 5 },
  DK: { "SaaS & Technology": 6, Healthcare: 4 },
  FI: { "SaaS & Technology": 7, Education: 4 },
  CH: { "Financial Services": 12, Healthcare: 7, "SaaS & Technology": 2 },
  AT: { Manufacturing: 6, "Financial Services": 4 },
  PT: { "Retail & E-commerce": 5, "Real Estate": 4 },
  PL: { Manufacturing: 7, "Retail & E-commerce": 4 },
  IE: { "SaaS & Technology": 8, "Financial Services": 5 },
  GR: { "Real Estate": 5, "Retail & E-commerce": 4 },
  RO: { Manufacturing: 6, "Retail & E-commerce": 3 },
  TR: { Manufacturing: 7, "Retail & E-commerce": 6 },
  IL: { "SaaS & Technology": 12, "Financial Services": 5 },
  SA: { "Real Estate": 12, "Retail & E-commerce": 6, "Financial Services": 3 },
  AE: { "Real Estate": 14, "Financial Services": 8, "Retail & E-commerce": 5 },
  RU: { Manufacturing: 8, "Retail & E-commerce": 4 },
  IN: { "SaaS & Technology": 10, Education: 8, Manufacturing: -2 },
  CN: { Manufacturing: 13, "Retail & E-commerce": 8, "SaaS & Technology": -6 },
  JP: { Manufacturing: 12, Healthcare: 4, "SaaS & Technology": -5 },
  KR: { Manufacturing: 10, "SaaS & Technology": 5 },
  SG: { "Financial Services": 10, "SaaS & Technology": 6 },
  MY: { Manufacturing: 6, "Retail & E-commerce": 5 },
  ID: { "Retail & E-commerce": 7, Manufacturing: 5 },
  TH: { "Retail & E-commerce": 5, Manufacturing: 4 },
  VN: { Manufacturing: 8, "Retail & E-commerce": 5 },
  TW: { Manufacturing: 10, "SaaS & Technology": 3 },
  AU: { "Real Estate": 9, Education: 6, "Financial Services": 3 },
  NZ: { "Real Estate": 6, Education: 5 },
  ZA: { "Financial Services": 5, "Retail & E-commerce": 4 },
  NG: { "Retail & E-commerce": 5, "Financial Services": 3 },
  EG: { "Real Estate": 4, "Retail & E-commerce": 5 },
  BR: { "Retail & E-commerce": 8, Manufacturing: 5, "Financial Services": 2 },
  AR: { "Real Estate": 5, "Retail & E-commerce": 4 },
  CO: { "Retail & E-commerce": 5, Manufacturing: 3 },
};

function getCountryIndustries(c: Country) {
  const scale = c.findRate / 80;
  const boosts = INDUSTRY_BOOST[c.id] ?? {};
  return [...INDUSTRIES]
    .map((ind) => ({
      name: ind.name,
      rate: Math.min(
        96,
        Math.max(42, Math.round(ind.rate * scale + (boosts[ind.name] ?? 0)))
      ),
    }))
    .sort((a, b) => b.rate - a.rate);
}

/* ── Component ────────────────────────────────────────────────────────── */

export default function CoverageMap() {
  const [selectedId, setSelectedId] = useState<string>("US");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [displayedId, setDisplayedId] = useState<string>("US");
  const [isAnimating, setIsAnimating] = useState(false);

  const DEFAULT_CENTER: [number, number] = [10, 12];
  const DEFAULT_ZOOM = 1;
  const [zoom, setZoom] = useState<number>(DEFAULT_ZOOM);
  const [center, setCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const handleMoveEnd = (pos: { coordinates: [number, number]; zoom: number }) => {
    setZoom(pos.zoom);
    setCenter(pos.coordinates);
  };
  const zoomIn = () => setZoom((z) => Math.min(z * 1.6, 6));
  const zoomOut = () => setZoom((z) => Math.max(z / 1.6, 1));
  const zoomReset = () => {
    setZoom(DEFAULT_ZOOM);
    setCenter(DEFAULT_CENTER);
  };

  const filterZoomEvent = (e: Event) => {
    if (e.type === "wheel") return (e as WheelEvent).ctrlKey;
    return true;
  };

  useEffect(() => {
    setIsAnimating(true);
    const t = setTimeout(() => {
      setDisplayedId(selectedId);
      setIsAnimating(false);
    }, 200);
    return () => clearTimeout(t);
  }, [selectedId]);

  const activeId = hoveredId ?? selectedId;
  const active = COUNTRIES.find((c) => c.id === activeId) ?? COUNTRIES[0];

  const displayedCountry =
    COUNTRIES.find((c) => c.id === displayedId) ?? COUNTRIES[0];
  const industries = getCountryIndustries(displayedCountry);

  const sortedCountries = useMemo(
    () => [...COUNTRIES].sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  return (
    <div className="cm">
      <div className="cm__body">
        {/* LEFT: map */}
        <div className="cm__map-wrap">
          <ComposableMap
            className="cm__svg"
            projection="geoEqualEarth"
            projectionConfig={{ scale: 165, center: [10, 12] }}
            width={960}
            height={500}
          >
            <ZoomableGroup
              zoom={zoom}
              center={center}
              minZoom={1}
              maxZoom={6}
              onMoveEnd={handleMoveEnd}
              filterZoomEvent={
                filterZoomEvent as unknown as (element: SVGElement) => boolean
              }
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }: { geographies: Array<{ rsmKey: string }> }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      className="cm__country"
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {COUNTRIES.map((c) => {
                const isActive = c.id === selectedId;
                const isHovered = c.id === hoveredId;
                const col = rateColor(c.findRate);
                const z = Math.max(zoom, 1);
                const baseR = isActive ? 6 : isHovered ? 8 : 4.2;
                const r = baseR / Math.sqrt(z);
                const sw =
                  (isActive ? 2 : isHovered ? 2.2 : 1.4) / Math.sqrt(z);
                return (
                  <Marker
                    key={c.id}
                    coordinates={c.coords}
                    className="cm__dot"
                    onClick={() => setSelectedId(c.id)}
                    onMouseEnter={() => setHoveredId(c.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {(isActive || isHovered) && (
                      <circle
                        r={r + 6 / Math.sqrt(z)}
                        fill={col}
                        opacity={isHovered ? 0.22 : 0.16}
                      />
                    )}
                    {isHovered && (
                      <circle
                        r={r + 2.5 / Math.sqrt(z)}
                        fill="none"
                        stroke={col}
                        strokeWidth={1.4 / Math.sqrt(z)}
                        opacity={0.45}
                      />
                    )}
                    <circle
                      r={r}
                      fill={col}
                      stroke="#fff"
                      strokeWidth={sw}
                      style={{
                        filter:
                          isActive || isHovered
                            ? `drop-shadow(0 0 6px ${col}99)`
                            : undefined,
                      }}
                    />
                  </Marker>
                );
              })}
            </ZoomableGroup>
          </ComposableMap>

          <div className="cm__zoom" aria-label="Map zoom controls">
            <button
              type="button"
              className="cm__zoom-btn"
              onClick={zoomIn}
              disabled={zoom >= 6}
              aria-label="Zoom in"
            >
              +
            </button>
            <button
              type="button"
              className="cm__zoom-btn"
              onClick={zoomOut}
              disabled={zoom <= 1}
              aria-label="Zoom out"
            >
              −
            </button>
            <button
              type="button"
              className="cm__zoom-btn"
              onClick={zoomReset}
              disabled={
                zoom === DEFAULT_ZOOM &&
                center[0] === DEFAULT_CENTER[0] &&
                center[1] === DEFAULT_CENTER[1]
              }
              aria-label="Reset view"
            >
              ↺
            </button>
          </div>

          {hoveredId &&
            (() => {
              const h = COUNTRIES.find((c) => c.id === hoveredId);
              if (!h) return null;
              return (
                <div className="cm__tip" role="tooltip">
                  <div className="cm__tip-name">
                    <span className="cm__tip-flag">{flagEmoji(h.id)}</span>
                    {h.name}
                  </div>
                  <div className="cm__tip-stats">
                    <span>✉ {h.emailRate}%</span>
                    <span className="cm__tip-dot">·</span>
                    <span>📱 {h.mobileRate}%</span>
                  </div>
                </div>
              );
            })()}

          <div className="cm__legend">
            {[
              { label: "80%+",   color: "#16A34A" },
              { label: "70–79%", color: "#2D77E3" },
              { label: "60–69%", color: "#F59E0B" },
              { label: "<60%",   color: "#E8513A" },
            ].map((item) => (
              <div key={item.label} className="cm__legend-item">
                <span
                  className="cm__legend-dot"
                  style={{ background: item.color }}
                />
                {item.label}
              </div>
            ))}
            <span className="cm__legend-label">Find rate</span>
          </div>
        </div>

        {/* RIGHT: panel */}
        <div className="cm__panel">
          <div className="cm__select-wrap">
            <label className="cm__select-label">Select country</label>
            <div className="cm__select-box">
              <select
                className="cm__select"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
              >
                {sortedCountries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {flagEmoji(c.id)} {c.name}
                  </option>
                ))}
              </select>
              <span className="cm__select-arrow">▾</span>
            </div>
          </div>

          <div className="cm__stat-grid">
            <div className="cm__stat">
              <div className="cm__stat-icon cm__stat-icon--email">✉</div>
              <div>
                <div className="cm__stat-num">{active.emailRate}%</div>
                <div className="cm__stat-label">Email find rate</div>
              </div>
            </div>
            <div className="cm__stat">
              <div className="cm__stat-icon cm__stat-icon--phone">📱</div>
              <div>
                <div className="cm__stat-num">{active.mobileRate}%</div>
                <div className="cm__stat-label">Mobile find rate</div>
              </div>
            </div>
          </div>

          <div className="cm__chart">
            <div className="cm__chart-header">
              <span className="cm__chart-title">
                {flagEmoji(displayedCountry.id)} Find rate by industry
              </span>
            </div>
            <div className="cm__bars">
              {industries.map((ind, i) => (
                <div
                  key={ind.name}
                  className="cm__bar"
                  style={{
                    opacity: isAnimating ? 0 : 1,
                    transform: isAnimating
                      ? "translateX(-6px)"
                      : "translateX(0)",
                    transition: isAnimating
                      ? "none"
                      : `opacity 0.35s ease ${i * 45}ms, transform 0.35s ease ${i * 45}ms`,
                  }}
                >
                  <div className="cm__bar-label">{ind.name}</div>
                  <div className="cm__bar-track">
                    <div
                      className="cm__bar-fill"
                      style={{
                        width: isAnimating ? "0%" : `${ind.rate}%`,
                        background: rateColor(ind.rate),
                        transition: isAnimating
                          ? "none"
                          : `width 0.45s cubic-bezier(0.22,1,0.36,1) ${i * 45}ms`,
                      }}
                    />
                  </div>
                  <div className="cm__bar-pct">{ind.rate}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
