"use client";

import { useState } from "react";

/* ─── Street & boundary data ──────────────────────────────────────── */

const ALL_STREETS = [
  { id: "alta-loma", name: "Alta Loma Terrace" },
  { id: "bonita", name: "Bonita Terrace" },
  { id: "broadview", name: "Broadview Terrace" },
  { id: "camrose", name: "Camrose Drive" },
  { id: "franklin", name: "Franklin Avenue", note: "north side, Highland to Sycamore" },
  { id: "glencoe", name: "Glencoe Way" },
  { id: "high-tower", name: "High Tower Drive" },
  { id: "highland", name: "Highland Avenue", note: "west side, Bowl to Franklin" },
  { id: "hillcrest", name: "Hillcrest Road" },
  { id: "la-presa", name: "La Presa Drive", note: "6921\u20136930 only" },
  { id: "los-altos", name: "Los Altos Place" },
  { id: "orchid", name: "Orchid Avenue", note: "blocks 1800 & 1900" },
  { id: "paramount", name: "Paramount Drive" },
  { id: "paseo", name: "Paseo del Serra" },
  { id: "pinehurst", name: "Pinehurst Road" },
  { id: "rockledge", name: "Rockledge Road" },
  { id: "sycamore", name: "N. Sycamore Avenue", note: "blocks 1900 & 2000" },
  { id: "woodland", name: "Woodland Way" },
  { id: "yeager", name: "Yeager Place" },
];

const BOUNDS = [
  { dir: "East", by: "Highland Avenue" },
  { dir: "North", by: "Hollywood Bowl" },
  { dir: "South", by: "Franklin Avenue" },
  { dir: "West", by: "Outpost Estates" },
];

/* ─── SVG geometry ────────────────────────────────────────────────── */

const BOUNDARY_D = [
  "M640,630",
  "C580,638 480,644 400,646",
  "C320,648 240,648 195,645",
  "C175,644 165,630 162,600",
  "C158,550 156,490 160,430",
  "C164,370 172,318 188,272",
  "C206,218 232,182 268,158",
  "C318,118 378,98 438,88",
  "C498,80 538,86 575,105",
  "C605,118 622,142 632,172",
  "C638,198 642,252 643,325",
  "C644,430 643,540 640,630",
  "Z",
].join(" ");

interface Road {
  id: string;
  d: string;
  type: "boundary" | "major" | "minor";
}

const ROADS: Road[] = [
  { id: "franklin",  type: "boundary", d: "M178,644 C280,647 400,646 520,641 C580,638 620,634 643,630" },
  { id: "highland",  type: "boundary", d: "M643,630 C643,555 642,475 641,400 C640,330 638,265 634,210 C631,180 626,158 618,142" },

  { id: "camrose",   type: "major", d: "M225,540 C275,532 330,522 385,512 C435,504 480,500 530,498 C565,497 590,500 610,505" },
  { id: "hillcrest", type: "major", d: "M348,598 C345,572 340,545 335,520 C328,492 322,468 318,445 C314,422 316,398 322,375 C328,355 336,338 345,322" },
  { id: "pinehurst", type: "major", d: "M435,588 C433,555 432,525 434,498 C436,468 440,438 444,408 C448,378 450,348 448,318 C446,290 444,262 440,238" },
  { id: "sycamore",  type: "major", d: "M242,628 C246,592 250,555 256,520 C262,485 268,450 274,418 C280,385 285,352 288,322" },
  { id: "glencoe",   type: "major", d: "M295,310 C338,302 380,296 418,292 C455,288 492,286 535,290" },

  { id: "orchid",     type: "minor", d: "M388,612 C390,580 392,548 394,520 C396,495 396,475 395,458" },
  { id: "broadview",  type: "minor", d: "M250,238 C298,228 345,220 388,218 C428,216 462,220 498,226" },
  { id: "high-tower", type: "minor", d: "M375,375 C373,352 370,332 367,312" },
  { id: "bonita",     type: "minor", d: "M355,518 C385,510 415,506 448,510" },
  { id: "alta-loma",  type: "minor", d: "M310,425 C345,418 375,414 410,418" },
  { id: "rockledge",  type: "minor", d: "M330,278 C365,272 400,268 438,270" },
  { id: "los-altos",  type: "minor", d: "M460,305 L485,298" },
  { id: "paramount",  type: "minor", d: "M345,185 C388,177 428,174 468,178" },
  { id: "la-presa",   type: "minor", d: "M580,570 C583,548 585,528" },
  { id: "paseo",      type: "minor", d: "M280,360 C302,355 322,352" },
  { id: "woodland",   type: "minor", d: "M235,452 L275,446" },
  { id: "yeager",     type: "minor", d: "M505,345 L535,340" },
];

interface Label {
  text: string;
  x: number;
  y: number;
  rotate?: number;
  size: number;
  road?: string;
  outside?: boolean;
  spacing: string;
  weight: number;
}

const LABELS: Label[] = [
  { text: "HOLLYWOOD HEIGHTS", x: 405, y: 420, size: 18, spacing: "0.3em", weight: 500 },

  { text: "FRANKLIN AVE",    x: 415, y: 668, size: 12, road: "franklin",  spacing: "0.15em", weight: 400 },
  { text: "HIGHLAND AVE",    x: 668, y: 415, size: 12, road: "highland",  spacing: "0.15em", weight: 400, rotate: -90 },

  { text: "CAMROSE DR",      x: 415, y: 490, size: 10.5, road: "camrose",   spacing: "0.12em", weight: 400, rotate: -4 },
  { text: "HILLCREST RD",    x: 300, y: 460, size: 10,   road: "hillcrest", spacing: "0.1em",  weight: 400, rotate: -78 },
  { text: "PINEHURST RD",    x: 465, y: 425, size: 10,   road: "pinehurst", spacing: "0.1em",  weight: 400, rotate: -82 },
  { text: "GLENCOE WAY",     x: 408, y: 282, size: 10,   road: "glencoe",   spacing: "0.1em",  weight: 400, rotate: -2 },
  { text: "N. SYCAMORE AVE", x: 225, y: 480, size: 10,   road: "sycamore",  spacing: "0.1em",  weight: 400, rotate: -82 },

  { text: "BROADVIEW TER",   x: 368, y: 208, size: 9,   road: "broadview",  spacing: "0.08em", weight: 400, rotate: -2 },
  { text: "HIGH TOWER DR",   x: 350, y: 345, size: 8.5, road: "high-tower", spacing: "0.08em", weight: 400, rotate: -80 },

  { text: "HOLLYWOOD BOWL",  x: 530, y: 55,  size: 11.5, spacing: "0.15em", weight: 400, outside: true },
  { text: "OUTPOST ESTATES", x: 108, y: 430, size: 10.5, spacing: "0.12em", weight: 400, outside: true, rotate: -90 },
];

/* ─── Color helper ────────────────────────────────────────────────── */

const cream = (a: number) => `rgba(231,227,220,${a})`;

/* ─── Component ───────────────────────────────────────────────────── */

export default function BoundaryMap() {
  const [active, setActive] = useState<string | null>(null);
  const [regionActive, setRegionActive] = useState(false);

  const roadStroke = (road: Road) => {
    if (active === road.id) return cream(0.88);
    if (active) return road.type === "boundary" ? cream(0.15) : cream(0.06);
    return road.type === "boundary"
      ? cream(0.38)
      : road.type === "major"
        ? cream(0.24)
        : cream(0.16);
  };

  const roadWidth = (road: Road) => {
    if (active === road.id) return 3.2;
    return road.type === "boundary" ? 2.4 : road.type === "major" ? 1.6 : 1.1;
  };

  const labelFill = (label: Label) => {
    if (label.outside) return cream(active ? 0.12 : 0.32);
    if (!label.road) return cream(active ? 0.12 : 0.35);
    if (active === label.road) return cream(0.92);
    if (active) return cream(0.1);
    return cream(0.42);
  };

  const streetOpacity = (id: string) => {
    if (active === id) return 1;
    if (active) return 0.22;
    return 0.55;
  };

  const transition = "200ms ease";

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
      {/* ── Interactive SVG map ────────────────────────────────────── */}
      <div className="min-w-0 flex-1 overflow-hidden rounded-3xl">
        <svg
          viewBox="0 0 800 700"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Interactive boundary map of the Hollywood Heights neighborhood showing streets and borders"
          className="w-full h-auto"
          style={{ fontFamily: '"Statius", serif' }}
        >
          <rect width="800" height="700" fill={cream(0.04)} rx="8" />

          {/* Boundary region */}
          <path
            d={BOUNDARY_D}
            strokeLinejoin="round"
            data-name="Hollywood Heights"
            onClick={() => setRegionActive((v) => !v)}
            style={{
              fill: cream(regionActive ? 0.08 : 0.025),
              stroke: cream(regionActive ? 0.6 : 0.38),
              strokeWidth: 1.5,
              cursor: "pointer",
              transition: `fill ${transition}, stroke ${transition}`,
            }}
          />

          {/* Roads */}
          <g id="roads">
            {ROADS.map((road) => (
              <g key={road.id}>
                <path
                  d={road.d}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={14}
                  strokeLinecap="round"
                  style={{ pointerEvents: "stroke", cursor: "pointer" }}
                  onMouseEnter={() => setActive(road.id)}
                  onMouseLeave={() => setActive(null)}
                />
                <path
                  d={road.d}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    stroke: roadStroke(road),
                    strokeWidth: roadWidth(road),
                    pointerEvents: "none",
                    transition: `stroke ${transition}, stroke-width ${transition}`,
                  }}
                />
              </g>
            ))}
          </g>

          {/* Labels */}
          <g id="labels" style={{ pointerEvents: "none" }}>
            {LABELS.map((label) => (
              <text
                key={label.text}
                x={label.x}
                y={label.y}
                textAnchor="middle"
                fontSize={label.size}
                fontWeight={label.weight}
                transform={
                  label.rotate
                    ? `rotate(${label.rotate}, ${label.x}, ${label.y})`
                    : undefined
                }
                style={{
                  fill: labelFill(label),
                  letterSpacing: label.spacing,
                  transition: `fill ${transition}`,
                }}
              >
                {label.text}
              </text>
            ))}
          </g>

          {/* Compass */}
          <g transform="translate(748, 48)" style={{ pointerEvents: "none" }}>
            <line
              x1="0" y1="18" x2="0" y2="0"
              stroke={cream(0.28)}
              strokeWidth={1.2}
            />
            <polygon points="0,-2 -3,4 3,4" fill={cream(0.28)} />
            <text
              x="0" y="30"
              textAnchor="middle"
              fontSize={8}
              fontWeight={500}
              style={{ fill: cream(0.28), letterSpacing: "0.1em" }}
            >
              N
            </text>
          </g>
        </svg>
      </div>

      {/* ── Sidebar ────────────────────────────────────────────────── */}
      <div className="shrink-0 lg:w-72">
        <div className="mb-8">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-cream">
            Bounded by
          </h3>
          <ul className="space-y-1.5">
            {BOUNDS.map((b) => (
              <li key={b.dir} className="text-sm text-cream">
                → to the <span className="font-bold">{b.dir}</span>, by {b.by}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-cream">
            Comprising these streets
          </h3>
          <ul className="space-y-1">
            {ALL_STREETS.map((s) => (
              <li
                key={s.id}
                onMouseEnter={() => setActive(s.id)}
                onMouseLeave={() => setActive(null)}
                className="cursor-pointer text-sm text-cream"
                style={{
                  opacity: streetOpacity(s.id),
                  transition: `opacity ${transition}`,
                }}
              >
                → {s.name}
                {"note" in s && s.note && (
                  <span className="opacity-50"> ({s.note})</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-cream">
          Hollywood Heights lies within the{" "}
          <span className="font-bold">90068</span> zip code.
        </p>
      </div>
    </div>
  );
}
