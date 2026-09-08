import React, { useState } from 'react';
import { ElementData } from '../../types';
import { ELEMENTS_DATA } from '../../data/elements';
import { Compass, ZoomIn, ZoomOut, RotateCcw, Crosshair } from 'lucide-react';

interface Props {
  onSelectElement?: (element: ElementData) => void;
  selectedElementId?: number | null;
  highlightFBlock?: boolean;
  highlightNobleGases?: boolean;
}

export const AkhtarAngularTable: React.FC<Props> = ({
  onSelectElement,
  selectedElementId,
  highlightFBlock = false,
  highlightNobleGases = false
}) => {
  const [zoom, setZoom] = useState(1);
  const [hoveredElement, setHoveredElement] = useState<ElementData | null>(null);
  const [activeTrack, setActiveTrack] = useState<number | null>(null);

  // Center of Principal Circle
  const cx = 320;
  const cy = 340;
  const maxRadius = 260;
  const trackSpacing = 32;

  // Center of Auxiliary Circle (f-block Lanthanides & Actinides)
  const auxCx = 620;
  const auxCy = 210;
  const auxRadius = 110;

  // Tracks correspond to periods 1 to 7
  const tracks = [1, 2, 3, 4, 5, 6, 7];

  // Helper to calculate polar coordinates
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    // 0 degrees is at the top (12 o'clock), sweeping clockwise
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  // Helper for SVG arc path
  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ');
  };

  // Representative elements positioned on the angular grid
  const angularElements = [
    // Core
    { z: 1, sym: 'H', track: 1, deg: 0, block: 's' },
    { z: 2, sym: 'He', track: 1, deg: 360, block: 's' },
    // Track 2
    { z: 3, sym: 'Li', track: 2, deg: 20, block: 's' },
    { z: 4, sym: 'Be', track: 2, deg: 40, block: 's' },
    { z: 5, sym: 'B', track: 2, deg: 240, block: 'p' },
    { z: 6, sym: 'C', track: 2, deg: 260, block: 'p' },
    { z: 7, sym: 'N', track: 2, deg: 280, block: 'p' },
    { z: 8, sym: 'O', track: 2, deg: 300, block: 'p' },
    { z: 9, sym: 'F', track: 2, deg: 320, block: 'p' },
    { z: 10, sym: 'Ne', track: 2, deg: 360, block: 'p' },
    // Track 3
    { z: 11, sym: 'Na', track: 3, deg: 20, block: 's' },
    { z: 12, sym: 'Mg', track: 3, deg: 40, block: 's' },
    { z: 13, sym: 'Al', track: 3, deg: 240, block: 'p' },
    { z: 14, sym: 'Si', track: 3, deg: 260, block: 'p' },
    { z: 15, sym: 'P', track: 3, deg: 280, block: 'p' },
    { z: 16, sym: 'S', track: 3, deg: 300, block: 'p' },
    { z: 17, sym: 'Cl', track: 3, deg: 320, block: 'p' },
    { z: 18, sym: 'Ar', track: 3, deg: 360, block: 'p' },
    // Track 4 (includes d-block)
    { z: 19, sym: 'K', track: 4, deg: 20, block: 's' },
    { z: 20, sym: 'Ca', track: 4, deg: 40, block: 's' },
    { z: 21, sym: 'Sc', track: 4, deg: 60, block: 'd' },
    { z: 26, sym: 'Fe', track: 4, deg: 140, block: 'd' },
    { z: 27, sym: 'Co', track: 4, deg: 160, block: 'd' },
    { z: 28, sym: 'Ni', track: 4, deg: 180, block: 'd' },
    { z: 29, sym: 'Cu', track: 4, deg: 200, block: 'd' },
    { z: 36, sym: 'Kr', track: 4, deg: 360, block: 'p' },
    // Track 5
    { z: 45, sym: 'Rh', track: 5, deg: 160, block: 'd' },
    { z: 47, sym: 'Ag', track: 5, deg: 200, block: 'd' },
    { z: 54, sym: 'Xe', track: 5, deg: 360, block: 'p' },
    // Track 6
    { z: 78, sym: 'Pt', track: 6, deg: 180, block: 'd' },
    { z: 79, sym: 'Au', track: 6, deg: 200, block: 'd' },
    { z: 86, sym: 'Rn', track: 6, deg: 360, block: 'p' },
    // Track 7
    { z: 118, sym: 'Og', track: 7, deg: 360, block: 'p' }
  ];

  // Auxiliary f-block elements (Lanthanides and Actinides)
  const auxElements = [
    { z: 57, sym: 'La', name: 'Lanthanum', deg: 30, track: 1 },
    { z: 58, sym: 'Ce', name: 'Cerium', deg: 60, track: 1 },
    { z: 71, sym: 'Lu', name: 'Lutetium', deg: 330, track: 1 },
    { z: 89, sym: 'Ac', name: 'Actinium', deg: 30, track: 2 },
    { z: 92, sym: 'U', name: 'Uranium', deg: 100, track: 2 },
    { z: 94, sym: 'Pu', name: 'Plutonium', deg: 140, track: 2 }
  ];

  const handleElementClick = (z: number) => {
    const found = ELEMENTS_DATA.find((e) => e.atomicNumber === z);
    if (found && onSelectElement) {
      onSelectElement(found);
    }
  };

  return (
    <div id="akhtar-angular-table-container" className="flex flex-col bg-[#0c1519] border border-[#1f373d] rounded-xl overflow-hidden shadow-2xl">
      {/* Control Header */}
      <div className="flex flex-wrap items-center justify-between p-3 bg-[#132227] border-b border-[#1f373d] gap-2">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-[#8dd4c6]" />
          <div>
            <h4 className="text-sm font-semibold text-[#e3eceb] tracking-wide">
              Kamal Akhtar's Angular Form of Periodic Table (2005)
            </h4>
            <p className="text-xs text-[#8ca09e]">
              360° Principal Circle with Tangential Auxiliary f-Block Orbit
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#0e191d] rounded-lg border border-[#213b42] p-1">
            <button
              onClick={() => setZoom((z) => Math.max(0.6, z - 0.15))}
              className="p-1 text-[#8ca09e] hover:text-[#e3eceb] transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs px-2 text-[#8ca09e] font-mono">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(1.8, z + 0.15))}
              className="p-1 text-[#8ca09e] hover:text-[#e3eceb] transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="p-1 text-[#8ca09e] hover:text-[#e3eceb] transition-colors ml-1 border-l border-[#213b42]"
              title="Reset view"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Angular Workspace */}
      <div className="relative w-full h-[620px] overflow-auto bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#112328] via-[#0b1417] to-[#070d0f] flex justify-center p-4">
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
            transition: 'transform 0.15s ease-out'
          }}
          className="relative w-[780px] h-[660px]"
        >
          <svg viewBox="0 0 780 660" className="w-full h-full overflow-visible">
            <defs>
              <radialGradient id="principalCenterGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0.2" />
              </radialGradient>
              <radialGradient id="auxCenterGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#be185d" stopOpacity="0.1" />
              </radialGradient>
            </defs>

            {/* BLOCK SECTOR WEDGES */}
            {/* s-Block Sector (0° to 40°) */}
            <path
              d={`M ${cx} ${cy} L ${polarToCartesian(cx, cy, maxRadius, 0).x} ${polarToCartesian(cx, cy, maxRadius, 0).y} A ${maxRadius} ${maxRadius} 0 0 1 ${polarToCartesian(cx, cy, maxRadius, 40).x} ${polarToCartesian(cx, cy, maxRadius, 40).y} Z`}
              fill="#10b981"
              fillOpacity="0.08"
              stroke="#10b981"
              strokeOpacity="0.3"
              strokeWidth="1"
            />
            {/* d-Block Sector (60° to 200°) */}
            <path
              d={`M ${cx} ${cy} L ${polarToCartesian(cx, cy, maxRadius, 60).x} ${polarToCartesian(cx, cy, maxRadius, 60).y} A ${maxRadius} ${maxRadius} 0 0 1 ${polarToCartesian(cx, cy, maxRadius, 200).x} ${polarToCartesian(cx, cy, maxRadius, 200).y} Z`}
              fill="#3b82f6"
              fillOpacity="0.08"
              stroke="#3b82f6"
              strokeOpacity="0.3"
              strokeWidth="1"
            />
            {/* p-Block Sector (220° to 340°) */}
            <path
              d={`M ${cx} ${cy} L ${polarToCartesian(cx, cy, maxRadius, 220).x} ${polarToCartesian(cx, cy, maxRadius, 220).y} A ${maxRadius} ${maxRadius} 0 0 1 ${polarToCartesian(cx, cy, maxRadius, 340).x} ${polarToCartesian(cx, cy, maxRadius, 340).y} Z`}
              fill="#f59e0b"
              fillOpacity="0.08"
              stroke="#f59e0b"
              strokeOpacity="0.3"
              strokeWidth="1"
            />

            {/* Sector Labels on Outer Perimeter */}
            <text x={polarToCartesian(cx, cy, maxRadius + 18, 20).x} y={polarToCartesian(cx, cy, maxRadius + 18, 20).y} fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
              s-BLOCK (ns¹)
            </text>
            <text x={polarToCartesian(cx, cy, maxRadius + 18, 130).x} y={polarToCartesian(cx, cy, maxRadius + 18, 130).y} fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">
              d-BLOCK ((n-1)d)
            </text>
            <text x={polarToCartesian(cx, cy, maxRadius + 18, 280).x} y={polarToCartesian(cx, cy, maxRadius + 18, 280).y} fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">
              p-BLOCK (np¹)
            </text>

            {/* Concentric Period Tracks (1 to 7) */}
            {tracks.map((t) => {
              const r = 40 + t * trackSpacing;
              const isTrackHovered = activeTrack === t;
              return (
                <g key={`track-${t}`} onMouseEnter={() => setActiveTrack(t)} onMouseLeave={() => setActiveTrack(null)}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill="none"
                    stroke={isTrackHovered ? '#8dd4c6' : '#23444d'}
                    strokeWidth={isTrackHovered ? 2 : 1}
                    strokeDasharray={t % 2 === 0 ? 'none' : '4 4'}
                    opacity={isTrackHovered ? 0.9 : 0.6}
                  />
                  {/* Track number badge */}
                  <text
                    x={cx + 6}
                    y={cy - r + 11}
                    fill="#759392"
                    fontSize="9"
                    fontFamily="sans-serif"
                    fontWeight="600"
                  >
                    n={t}
                  </text>
                </g>
              );
            })}

            {/* Radial Degree Spoke Lines */}
            {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map((deg) => {
              const pStart = polarToCartesian(cx, cy, 35, deg);
              const pEnd = polarToCartesian(cx, cy, maxRadius + 5, deg);
              return (
                <g key={`spoke-${deg}`} opacity="0.4">
                  <line
                    x1={pStart.x}
                    y1={pStart.y}
                    x2={pEnd.x}
                    y2={pEnd.y}
                    stroke="#23424a"
                    strokeWidth="1"
                  />
                  <text
                    x={pEnd.x + (pEnd.x > cx ? 6 : -6)}
                    y={pEnd.y + (pEnd.y > cy ? 8 : -4)}
                    fill="#5c7a78"
                    fontSize="8"
                    textAnchor={pEnd.x > cx ? 'start' : 'end'}
                    fontFamily="monospace"
                  >
                    {deg}°
                  </text>
                </g>
              );
            })}

            {/* 0° / 360° Noble Gas Zenith Line */}
            <line
              x1={cx}
              y1={cy - maxRadius - 15}
              x2={cx}
              y2={cy}
              stroke={highlightNobleGases ? '#818cf8' : '#38bdf8'}
              strokeWidth={highlightNobleGases ? 3.5 : 2}
              strokeDasharray={highlightNobleGases ? 'none' : '2 2'}
            />
            <text x={cx} y={cy - maxRadius - 22} fill="#93c5fd" fontSize="10" fontWeight="bold" textAnchor="middle">
              0° / 360° MERIDIAN (NOBLE GASES)
            </text>

            {/* Central Hydrogen Hub */}
            <circle cx={cx} cy={cy} r="28" fill="url(#principalCenterGlow)" stroke="#f59e0b" strokeWidth="2" />
            <text x={cx} y={cy - 2} fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
              H
            </text>
            <text x={cx} y={cy + 10} fill="#fef3c7" fontSize="8" textAnchor="middle">
              Core Z=1
            </text>

            {/* CONNECTOR RAYS TO AUXILIARY CIRCLE (f-block projection) */}
            <path
              d={`M ${polarToCartesian(cx, cy, 40 + 6 * trackSpacing, 55).x} ${polarToCartesian(cx, cy, 40 + 6 * trackSpacing, 55).y} L ${auxCx - auxRadius} ${auxCy + 25}`}
              stroke="#ec4899"
              strokeWidth="2"
              strokeDasharray="4 3"
              opacity={highlightFBlock ? 1 : 0.75}
            />
            <path
              d={`M ${polarToCartesian(cx, cy, 40 + 7 * trackSpacing, 60).x} ${polarToCartesian(cx, cy, 40 + 7 * trackSpacing, 60).y} L ${auxCx - auxRadius} ${auxCy + 45}`}
              stroke="#ec4899"
              strokeWidth="2"
              strokeDasharray="4 3"
              opacity={highlightFBlock ? 1 : 0.75}
            />
            <text x={(cx + auxCx) / 2 - 20} y={(cy + auxCy) / 2 + 10} fill="#f472b6" fontSize="9.5" fontWeight="bold" transform="rotate(-15, 470, 270)">
              f-Block Projection Rays ➔
            </text>

            {/* AUXILIARY CIRCLE FOR f-BLOCK (LANTHANIDES & ACTINIDES) */}
            <g>
              {/* Outer boundary */}
              <circle
                cx={auxCx}
                cy={auxCy}
                r={auxRadius}
                fill="#150a1b"
                fillOpacity="0.8"
                stroke="#be185d"
                strokeWidth={highlightFBlock ? 3 : 1.5}
                style={{ filter: 'drop-shadow(0 0 10px rgba(190, 24, 93, 0.4))' }}
              />
              <circle cx={auxCx} cy={auxCy} r={auxRadius * 0.7} fill="none" stroke="#831843" strokeDasharray="3 3" />
              <circle cx={auxCx} cy={auxCy} r={auxRadius * 0.38} fill="url(#auxCenterGlow)" stroke="#be185d" strokeWidth="1" />

              <text x={auxCx} y={auxCy - 4} fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                f-BLOCK
              </text>
              <text x={auxCx} y={auxCy + 8} fill="#fbcfe8" fontSize="8" textAnchor="middle">
                AUXILIARY
              </text>

              {/* Spoke divisions in auxiliary circle */}
              {[30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
                const p1 = polarToCartesian(auxCx, auxCy, auxRadius * 0.38, deg);
                const p2 = polarToCartesian(auxCx, auxCy, auxRadius, deg);
                return (
                  <line key={`aux-spoke-${deg}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#701a75" strokeWidth="1" strokeDasharray="2 2" />
                );
              })}

              {/* Render Auxiliary Elements */}
              {auxElements.map((el) => {
                const r = el.track === 1 ? auxRadius * 0.85 : auxRadius * 0.55;
                const pos = polarToCartesian(auxCx, auxCy, r, el.deg);
                const isSelected = selectedElementId === el.z;
                return (
                  <g
                    key={`aux-el-${el.z}`}
                    className="cursor-pointer"
                    onClick={() => handleElementClick(el.z)}
                    onMouseEnter={() => {
                      const full = ELEMENTS_DATA.find((e) => e.atomicNumber === el.z);
                      if (full) setHoveredElement(full);
                    }}
                    onMouseLeave={() => setHoveredElement(null)}
                  >
                    <circle cx={pos.x} cy={pos.y} r="8.5" fill="#db2777" stroke="#fbcfe8" strokeWidth={isSelected ? 2.5 : 1} />
                    <text x={pos.x} y={pos.y + 3} fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                      {el.sym}
                    </text>
                  </g>
                );
              })}

              <text x={auxCx} y={auxCy + auxRadius + 18} fill="#f472b6" fontSize="10" fontWeight="bold" textAnchor="middle">
                AUXILIARY CIRCLE (4f & 5f)
              </text>
            </g>

            {/* Render Principal Circle Elements */}
            {angularElements.map((el) => {
              const r = 40 + el.track * trackSpacing;
              const pos = polarToCartesian(cx, cy, r, el.deg);
              const isSelected = selectedElementId === el.z;
              const isHovered = hoveredElement?.atomicNumber === el.z;

              let fillColor = '#3b82f6';
              if (el.block === 's') fillColor = '#10b981';
              if (el.block === 'p') fillColor = '#f59e0b';
              if (el.deg === 0 || el.deg === 360) fillColor = '#818cf8';

              return (
                <g
                  key={`ang-el-${el.z}-${el.sym}`}
                  className="cursor-pointer transition-transform duration-150"
                  onClick={() => handleElementClick(el.z)}
                  onMouseEnter={() => {
                    const full = ELEMENTS_DATA.find((e) => e.atomicNumber === el.z);
                    if (full) setHoveredElement(full);
                  }}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  {(isSelected || isHovered) && (
                    <circle cx={pos.x} cy={pos.y} r="14" fill="none" stroke="#e0f2fe" strokeWidth="2" className="animate-ping" />
                  )}
                  <circle cx={pos.x} cy={pos.y} r="9.5" fill={fillColor} stroke="#e2e8f0" strokeWidth={isSelected ? 2.5 : 1} />
                  <text x={pos.x} y={pos.y + 3.5} fill="#0f172a" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                    {el.sym}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Hover Inspector Card */}
        {hoveredElement && (
          <div className="absolute bottom-4 left-4 max-w-xs bg-[#132227]/95 border border-[#31565f] rounded-lg p-3 shadow-xl backdrop-blur-md z-30 pointer-events-none">
            <div className="flex items-center justify-between pb-1 border-b border-[#213a41]">
              <span className="text-xs font-mono text-[#8dd4c6]">Atomic No. {hoveredElement.atomicNumber}</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-[#1f3b43] text-[#e0f2fe] font-semibold">
                Track n={hoveredElement.period} | θ={hoveredElement.akhtarDegree ?? 0}°
              </span>
            </div>
            <div className="mt-1">
              <div className="text-base font-bold text-[#e3eceb]">
                {hoveredElement.name} ({hoveredElement.symbol})
              </div>
              <div className="text-xs text-[#a4b8b6] font-mono">
                Block: {hoveredElement.block.toUpperCase()} | Group {hoveredElement.group}
              </div>
              <div className="text-xs text-[#8ca09e] mt-1">
                Config: {hoveredElement.electronConfiguration}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend Footer */}
      <div className="p-3 bg-[#0e191d] border-t border-[#1f373d] flex flex-wrap items-center justify-between gap-3 text-xs text-[#9bb1af]">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#10b981]" />
            <span>s-Block (0°-40°)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#3b82f6]" />
            <span>d-Block (60°-200°)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#f59e0b]" />
            <span>p-Block (220°-340°)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#db2777]" />
            <span>Auxiliary f-Block (4f / 5f)</span>
          </div>
        </div>
        <span className="text-[11px] text-[#6d8482] font-mono">
          Continuous 360° wrapping with no period breaks
        </span>
      </div>
    </div>
  );
};
