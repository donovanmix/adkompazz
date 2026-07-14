"use client";

import { useEffect, useState, useRef } from "react";

type Source = {
  name: string;
  color: string;
  // Normalized values (0-1) over time, rising
  points: number[];
};

// More points = smoother, wavier curves like the reference
const sources: Source[] = [
  { name: "Reddit", color: "#ff4500", points: [0.05, 0.06, 0.08, 0.18, 0.26, 0.28, 0.27, 0.3, 0.36, 0.34, 0.4, 0.56, 0.66, 0.74, 0.82, 0.88] },
  { name: "Wikipedia", color: "#202124", points: [0.04, 0.05, 0.07, 0.14, 0.22, 0.26, 0.25, 0.27, 0.31, 0.29, 0.34, 0.5, 0.6, 0.68, 0.74, 0.8] },
  { name: "YouTube", color: "#ff0000", points: [0.04, 0.06, 0.1, 0.13, 0.18, 0.21, 0.2, 0.22, 0.26, 0.24, 0.28, 0.42, 0.52, 0.6, 0.66, 0.72] },
  { name: "LinkedIn", color: "#0a66c2", points: [0.03, 0.04, 0.07, 0.1, 0.14, 0.17, 0.16, 0.18, 0.22, 0.2, 0.24, 0.36, 0.45, 0.53, 0.6, 0.66] },
  { name: "Forbes", color: "#4b4b4b", points: [0.02, 0.03, 0.05, 0.08, 0.11, 0.13, 0.12, 0.14, 0.17, 0.15, 0.19, 0.3, 0.38, 0.45, 0.5, 0.56] },
  { name: "Business Insider", color: "#1f6f78", points: [0.01, 0.02, 0.04, 0.06, 0.08, 0.1, 0.09, 0.1, 0.13, 0.11, 0.15, 0.24, 0.31, 0.38, 0.44, 0.5] },
];

const CHART_W = 1000;
const CHART_H = 460;
const PAD_X = 8;
const PAD_TOP = 24;
const PAD_BOTTOM = 16;

// Where the vertical guide line + value dots sit (fraction across the chart)
const MARKER_FRAC = 0.46;

function coordsFor(points: number[]) {
  const innerW = CHART_W - PAD_X * 2;
  const innerH = CHART_H - PAD_TOP - PAD_BOTTOM;
  return points.map((v, i) => ({
    x: PAD_X + (i / (points.length - 1)) * innerW,
    y: PAD_TOP + (1 - v) * innerH,
  }));
}

function buildSmoothPath(points: number[]): { d: string; length: number } {
  const coords = coordsFor(points);
  let d = `M ${coords[0].x},${coords[0].y}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const p0 = coords[i];
    const p1 = coords[i + 1];
    const cx = (p0.x + p1.x) / 2;
    d += ` C ${cx},${p0.y} ${cx},${p1.y} ${p1.x},${p1.y}`;
  }
  let length = 0;
  for (let i = 0; i < coords.length - 1; i++) {
    length += Math.hypot(coords[i + 1].x - coords[i].x, coords[i + 1].y - coords[i].y);
  }
  return { d, length: length * 1.2 };
}

// Interpolate the y value at the marker fraction for the value dots
function markerPoint(points: number[]) {
  const innerW = CHART_W - PAD_X * 2;
  const innerH = CHART_H - PAD_TOP - PAD_BOTTOM;
  const pos = MARKER_FRAC * (points.length - 1);
  const i = Math.floor(pos);
  const t = pos - i;
  const v = points[i] + (points[Math.min(i + 1, points.length - 1)] - points[i]) * t;
  return {
    x: PAD_X + MARKER_FRAC * innerW,
    y: PAD_TOP + (1 - v) * innerH,
  };
}

export function CitationsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const markerX = PAD_X + MARKER_FRAC * (CHART_W - PAD_X * 2);

  return (
    <section id="citations" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Citation sources
            <span className="w-8 h-px bg-foreground/30" />
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6 text-balance">
            See exactly which citations drive your visibility
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed text-pretty">
            Our reports tell you exactly where they are — which sources, pages, and domains
            AI search engines actually reference, so you know where to focus.
          </p>
        </div>

        {/* Chart card */}
        <div
          className={`border border-foreground/10 overflow-hidden transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Source labels row */}
          <div className="grid grid-cols-3 md:grid-cols-6 border-b border-foreground/10">
            {sources.map((source) => (
              <div
                key={source.name}
                className="flex items-center justify-center gap-2 px-3 py-5 border-r border-foreground/10 last:border-r-0"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: source.color }}
                />
                <span className="text-sm font-medium truncate">{source.name}</span>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="relative p-4 md:p-8">
            <svg
              viewBox={`0 0 ${CHART_W} ${CHART_H}`}
              className="w-full h-auto"
              preserveAspectRatio="none"
              role="img"
              aria-label="Line chart showing citation growth over time by source"
            >
              {/* Horizontal gridlines */}
              {[0.25, 0.5, 0.75].map((g) => (
                <line
                  key={g}
                  x1={PAD_X}
                  x2={CHART_W - PAD_X}
                  y1={PAD_TOP + g * (CHART_H - PAD_TOP - PAD_BOTTOM)}
                  y2={PAD_TOP + g * (CHART_H - PAD_TOP - PAD_BOTTOM)}
                  className="stroke-foreground/5"
                  strokeWidth={1}
                />
              ))}

              {/* Vertical guide line at the marker */}
              <line
                x1={markerX}
                x2={markerX}
                y1={PAD_TOP - 8}
                y2={CHART_H - PAD_BOTTOM + 4}
                className="stroke-foreground/15"
                strokeWidth={1}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transition: "opacity 0.5s ease 1.1s",
                }}
              />

              {sources.map((source, index) => {
                const { d, length } = buildSmoothPath(source.points);
                return (
                  <path
                    key={source.name}
                    d={d}
                    fill="none"
                    stroke={source.color}
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: length,
                      strokeDashoffset: isVisible ? 0 : length,
                      transition: `stroke-dashoffset 1.6s cubic-bezier(0.22, 1, 0.36, 1) ${index * 120 + 200}ms`,
                    }}
                  />
                );
              })}

              {/* Value dots at the marker */}
              {sources.map((source, index) => {
                const p = markerPoint(source.points);
                return (
                  <circle
                    key={source.name}
                    cx={p.x}
                    cy={p.y}
                    r={4}
                    fill={source.color}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transition: `opacity 0.4s ease ${index * 80 + 1200}ms`,
                    }}
                  />
                );
              })}
            </svg>

            {/* Floating legend card */}
            <div
              className="absolute hidden md:block bg-card border border-foreground/10 shadow-lg rounded-md px-4 py-3"
              style={{
                left: `calc(${MARKER_FRAC * 100}% + 1rem)`,
                top: "30%",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.5s ease 1.3s, transform 0.5s ease 1.3s",
              }}
            >
              <ul className="space-y-1.5">
                {sources.map((source) => (
                  <li key={source.name} className="flex items-center gap-2.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: source.color }}
                    />
                    <span className="text-sm text-foreground whitespace-nowrap">{source.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
