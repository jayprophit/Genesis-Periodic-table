import React, { useState } from 'react';
import { ElementData } from '../../types';
import { ELEMENTS_DATA } from '../../data/elements';
import { BarChart3, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface Props {
  onSelectElement?: (element: ElementData) => void;
  selectedElementId?: number | null;
}

export const SheehanAbundanceCartogram: React.FC<Props> = ({
  onSelectElement,
  selectedElementId
}) => {
  const [zoom, setZoom] = useState(1);
  const [hoveredElement, setHoveredElement] = useState<ElementData | null>(null);

  // Cartogram warped tile definitions based on Sheehan's 1976 chart
  // Top row / Period 1 & 2
  const tiles = [
    // Hydrogen: massive block top left
    { z: 1, sym: 'H', x: 40, y: 50, w: 160, h: 110, en: 2.20, abund: '75% (Cosmic)', name: 'Hydrogen' },
    // Helium: small bridge
    { z: 2, sym: 'He', x: 200, y: 110, w: 90, h: 50, en: 0, abund: '23% (Cosmic)', name: 'Helium' },
    // Boron
    { z: 5, sym: 'B', x: 290, y: 80, w: 95, h: 80, en: 2.04, abund: '10 PPM', name: 'Boron' },
    // Carbon: very prominent
    { z: 6, sym: 'C', x: 385, y: 40, w: 120, h: 120, en: 2.55, abund: '5000 PPM', name: 'Carbon' },
    // Nitrogen
    { z: 7, sym: 'N', x: 505, y: 50, w: 85, h: 110, en: 3.04, abund: '1000 PPM', name: 'Nitrogen' },
    // Oxygen: colossal right peak
    { z: 8, sym: 'O', x: 590, y: 35, w: 155, h: 125, en: 3.44, abund: '46.1% (Crust)', name: 'Oxygen' },
    // Fluorine
    { z: 9, sym: 'F', x: 745, y: 70, w: 50, h: 90, en: 3.98, abund: '585 PPM', name: 'Fluorine' },
    // Neon
    { z: 10, sym: 'Ne', x: 795, y: 100, w: 45, h: 60, en: 0, abund: '1300 PPM', name: 'Neon' },

    // Period 2/3: Lithium & Beryllium narrow ribbon
    { z: 3, sym: 'Li', x: 40, y: 160, w: 160, h: 32, en: 0.98, abund: '20 PPM', name: 'Lithium' },
    { z: 4, sym: 'Be', x: 200, y: 160, w: 90, h: 32, en: 1.57, abund: '2.8 PPM', name: 'Beryllium' },

    // Period 3: Sodium, Magnesium, Aluminium, Silicon, Phosphorus, Sulfur, Chlorine, Argon
    { z: 11, sym: 'Na', x: 40, y: 192, w: 110, h: 85, en: 0.93, abund: '2.4% (Crust)', name: 'Sodium' },
    { z: 12, sym: 'Mg', x: 150, y: 192, w: 115, h: 85, en: 1.31, abund: '2.3% (Crust)', name: 'Magnesium' },
    { z: 13, sym: 'Al', x: 265, y: 192, w: 135, h: 85, en: 1.61, abund: '8.2% (Crust)', name: 'Aluminium' },
    { z: 14, sym: 'Si', x: 400, y: 160, w: 155, h: 117, en: 1.90, abund: '28.2% (Crust)', name: 'Silicon' },
    { z: 15, sym: 'P', x: 555, y: 160, w: 75, h: 117, en: 2.19, abund: '1050 PPM', name: 'Phosphorus' },
    { z: 16, sym: 'S', x: 630, y: 160, w: 65, h: 117, en: 2.58, abund: '350 PPM', name: 'Sulfur' },
    { z: 17, sym: 'Cl', x: 695, y: 160, w: 95, h: 117, en: 3.16, abund: '145 PPM', name: 'Chlorine' },
    { z: 18, sym: 'Ar', x: 790, y: 160, w: 50, h: 117, en: 0, abund: '3.5 PPM', name: 'Argon' },

    // Period 4: Potassium, Calcium, Iron, Arsenic, Bromine
    { z: 19, sym: 'K', x: 40, y: 277, w: 90, h: 85, en: 0.82, abund: '2.1% (Crust)', name: 'Potassium' },
    { z: 20, sym: 'Ca', x: 130, y: 277, w: 120, h: 85, en: 1.00, abund: '4.1% (Crust)', name: 'Calcium' },
    // Transition metal squeeze (Ti, V, Cr, Mn)
    { z: 22, sym: 'Ti', x: 250, y: 277, w: 50, h: 85, en: 1.54, abund: '5650 PPM', name: 'Titanium' },
    // Iron: large central metal block
    { z: 26, sym: 'Fe', x: 300, y: 277, w: 140, h: 85, en: 1.83, abund: '5.6% (Crust)', name: 'Iron' },
    { z: 27, sym: 'Co', x: 440, y: 277, w: 35, h: 85, en: 1.88, abund: '25 PPM', name: 'Cobalt' },
    { z: 28, sym: 'Ni', x: 475, y: 277, w: 40, h: 85, en: 1.91, abund: '84 PPM', name: 'Nickel' },
    { z: 29, sym: 'Cu', x: 515, y: 277, w: 45, h: 85, en: 1.90, abund: '60 PPM', name: 'Copper' },
    { z: 30, sym: 'Zn', x: 560, y: 277, w: 45, h: 85, en: 1.65, abund: '70 PPM', name: 'Zinc' },
    { z: 33, sym: 'As', x: 605, y: 277, w: 75, h: 85, en: 2.18, abund: '1.8 PPM', name: 'Arsenic' },
    { z: 34, sym: 'Se', x: 680, y: 277, w: 50, h: 85, en: 2.55, abund: '0.05 PPM', name: 'Selenium' },
    { z: 35, sym: 'Br', x: 730, y: 277, w: 60, h: 85, en: 2.96, abund: '2.4 PPM', name: 'Bromine' },
    { z: 36, sym: 'Kr', x: 790, y: 277, w: 50, h: 85, en: 3.00, abund: '0.0001 PPM', name: 'Krypton' },

    // Period 5 & 6 Heavy Elements & Compressed Lanthanide Cavity
    { z: 37, sym: 'Rb', x: 40, y: 362, w: 60, h: 50, en: 0.82, abund: '90 PPM', name: 'Rubidium' },
    { z: 38, sym: 'Sr', x: 100, y: 362, w: 65, h: 50, en: 0.95, abund: '370 PPM', name: 'Strontium' },
    { z: 39, sym: 'Y', x: 165, y: 362, w: 55, h: 50, en: 1.22, abund: '33 PPM', name: 'Yttrium' },
    { z: 47, sym: 'Ag', x: 450, y: 362, w: 60, h: 50, en: 1.93, abund: '0.075 PPM', name: 'Silver' },
    { z: 50, sym: 'Sn', x: 570, y: 362, w: 65, h: 50, en: 1.96, abund: '2.3 PPM', name: 'Tin' },
    { z: 51, sym: 'Sb', x: 635, y: 362, w: 55, h: 50, en: 2.05, abund: '0.2 PPM', name: 'Antimony' },
    { z: 52, sym: 'Te', x: 690, y: 362, w: 50, h: 50, en: 2.10, abund: '0.001 PPM', name: 'Tellurium' },
    { z: 53, sym: 'I', x: 740, y: 362, w: 50, h: 50, en: 2.66, abund: '0.45 PPM', name: 'Iodine' },
    { z: 54, sym: 'Xe', x: 790, y: 362, w: 50, h: 50, en: 2.60, abund: '0.00003 PPM', name: 'Xenon' },

    // Period 6: Cs, Ba, W, Pt, Au, Hg, Pb, Bi
    { z: 55, sym: 'Cs', x: 40, y: 412, w: 55, h: 55, en: 0.79, abund: '3 PPM', name: 'Caesium' },
    { z: 56, sym: 'Ba', x: 95, y: 412, w: 60, h: 55, en: 0.89, abund: '425 PPM', name: 'Barium' },
    { z: 74, sym: 'W', x: 380, y: 412, w: 50, h: 55, en: 2.36, abund: '1.25 PPM', name: 'Tungsten' },
    { z: 78, sym: 'Pt', x: 430, y: 412, w: 60, h: 55, en: 2.28, abund: '0.005 PPM', name: 'Platinum' },
    { z: 79, sym: 'Au', x: 490, y: 412, w: 60, h: 55, en: 2.54, abund: '0.004 PPM', name: 'Gold' },
    { z: 80, sym: 'Hg', x: 550, y: 412, w: 55, h: 55, en: 2.00, abund: '0.085 PPM', name: 'Mercury' },
    { z: 82, sym: 'Pb', x: 650, y: 412, w: 65, h: 55, en: 2.33, abund: '14 PPM', name: 'Lead' },
    { z: 83, sym: 'Bi', x: 715, y: 412, w: 55, h: 55, en: 2.02, abund: '0.0085 PPM', name: 'Bismuth' },

    // Period 7: Uranium bottom strip
    { z: 92, sym: 'U', x: 160, y: 467, w: 50, h: 45, en: 1.38, abund: '2.7 PPM', name: 'Uranium' },
    { z: 94, sym: 'Pu', x: 210, y: 467, w: 45, h: 45, en: 1.28, abund: 'Trace / Synth', name: 'Plutonium' }
  ];

  // Electronegativity color calculation:
  // Low (<1.5): Deep Blue to Cyan
  // Mid (1.5 - 2.5): Slate to Violet
  // High (>2.5): Amber to Vermilion
  const getElectronegativityColor = (en: number) => {
    if (en === 0) return { fill: '#1e293b', text: '#94a3b8' }; // Noble gas
    if (en < 1.2) return { fill: '#1e3a8a', text: '#bfdbfe' }; // Alkali / alkaline earth
    if (en < 1.7) return { fill: '#0369a1', text: '#e0f2fe' }; // Light metals
    if (en < 2.2) return { fill: '#334155', text: '#f1f5f9' }; // Transition / metalloid
    if (en < 2.8) return { fill: '#b45309', text: '#fef3c7' }; // Moderate nonmetals (C, P, S)
    return { fill: '#b91c1c', text: '#fee2e2' }; // High nonmetals (N, O, Cl, F)
  };

  const handleTileClick = (z: number) => {
    const el = ELEMENTS_DATA.find((e) => e.atomicNumber === z);
    if (el && onSelectElement) onSelectElement(el);
  };

  return (
    <div id="sheehan-cartogram-container" className="flex flex-col bg-[#0c1519] border border-[#1f373d] rounded-xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between p-3 bg-[#132227] border-b border-[#1f373d] gap-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#8dd4c6]" />
          <div>
            <h4 className="text-sm font-semibold text-[#e3eceb] tracking-wide">
              Prof. Wm. F. Sheehan's Relative Abundance Cartogram (1976)
            </h4>
            <p className="text-xs text-[#8ca09e]">
              Element Cell Area Distorted Proportional to Cosmic & Crustal Abundance
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

      {/* Cartogram Stage */}
      <div className="relative w-full h-[600px] overflow-auto bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#112328] via-[#0b1417] to-[#070d0f] flex justify-center p-4">
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out'
          }}
          className="relative w-[880px] h-[540px]"
        >
          <svg viewBox="0 0 880 540" className="w-full h-full overflow-visible">
            <defs>
              <pattern id="crustalTexture" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 0,20 l 20,-20 M -5,5 l 10,-10 M 15,25 l 10,-10" stroke="#1c3a44" strokeWidth="0.8" opacity="0.3" />
              </pattern>
            </defs>

            {/* Background border container */}
            <rect x="25" y="20" width="830" height="500" rx="12" fill="#080e11" stroke="#1d373e" strokeWidth="1.5" />

            {/* PINCHED LANTHANIDE / ACTINIDE CREVASSE FAN */}
            <path
              d="M 220 362 Q 270 410 370 412 L 360 460 Q 250 450 160 412 Z"
              fill="#0f172a"
              stroke="#64748b"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
            <text x="240" y="415" fill="#94a3b8" fontSize="8" fontStyle="italic">
              Lanthanide Fissure
            </text>

            {/* Render Tiles */}
            {tiles.map((t) => {
              const isSelected = selectedElementId === t.z;
              const isHovered = hoveredElement?.atomicNumber === t.z;
              const style = getElectronegativityColor(t.en);

              return (
                <g
                  key={`tile-${t.z}-${t.sym}`}
                  className="cursor-pointer transition-transform duration-100"
                  onClick={() => handleTileClick(t.z)}
                  onMouseEnter={() => {
                    const el = ELEMENTS_DATA.find((e) => e.atomicNumber === t.z);
                    if (el) setHoveredElement(el);
                  }}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  {/* Outer glow on select/hover */}
                  {(isSelected || isHovered) && (
                    <rect
                      x={t.x - 2}
                      y={t.y - 2}
                      width={t.w + 4}
                      height={t.h + 4}
                      rx="6"
                      fill="none"
                      stroke="#8dd4c6"
                      strokeWidth="2.5"
                    />
                  )}

                  {/* Tile body */}
                  <rect
                    x={t.x}
                    y={t.y}
                    width={t.w}
                    height={t.h}
                    rx="4"
                    fill={style.fill}
                    stroke="#2a454d"
                    strokeWidth={isSelected ? 2 : 1}
                  />

                  {/* Element Symbol (scaled by tile size) */}
                  <text
                    x={t.x + t.w / 2}
                    y={t.y + t.h / 2 + (t.h > 70 ? 4 : 3)}
                    fill={style.text}
                    fontSize={t.w > 110 && t.h > 80 ? '36' : t.w > 70 ? '22' : '14'}
                    fontWeight="800"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                  >
                    {t.sym}
                  </text>

                  {/* Atomic number in upper left of tile */}
                  <text
                    x={t.x + 6}
                    y={t.y + 13}
                    fill={style.text}
                    opacity="0.75"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    {t.z}
                  </text>

                  {/* Abundance summary on large tiles */}
                  {t.h > 70 && t.w > 80 && (
                    <text
                      x={t.x + t.w / 2}
                      y={t.y + t.h - 8}
                      fill={style.text}
                      opacity="0.8"
                      fontSize="9"
                      textAnchor="middle"
                      fontFamily="sans-serif"
                    >
                      {t.abund}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Hover Inspector Card */}
        {hoveredElement && (
          <div className="absolute top-4 right-4 max-w-xs bg-[#132227]/95 border border-[#31565f] rounded-lg p-3 shadow-xl backdrop-blur-md z-30 pointer-events-none">
            <div className="flex items-center justify-between pb-1 border-b border-[#213a41]">
              <span className="text-xs font-mono text-[#8dd4c6]">Z={hoveredElement.atomicNumber}</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-[#1f3b43] text-[#e0f2fe] font-semibold">
                EN: {hoveredElement.electronegativity}
              </span>
            </div>
            <div className="mt-1">
              <div className="text-base font-bold text-[#e3eceb]">
                {hoveredElement.name} ({hoveredElement.symbol})
              </div>
              <div className="text-xs text-[#a4b8b6] font-mono mt-1">
                Crust: {hoveredElement.abundanceCrustPPM.toLocaleString()} PPM | Cosmic: {hoveredElement.abundanceCosmicPPM.toLocaleString()} PPM
              </div>
              <div className="text-xs text-[#8ca09e] mt-1">
                Area distorted by log(abundance) in Sheehan’s formulation.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Electronegativity Legend */}
      <div className="p-3 bg-[#0e191d] border-t border-[#1f373d] flex flex-wrap items-center justify-between gap-3 text-xs text-[#9bb1af]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-[#8dd4c6]">Color Scale (Electronegativity):</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-[#1e3a8a]" />
            <span>&lt;1.2 (Electropositive Alkalis)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-[#0369a1]" />
            <span>1.2–1.7 (Light Metals)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-[#334155]" />
            <span>1.7–2.2 (Transition)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-[#b45309]" />
            <span>2.2–2.8 (Nonmetals)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-[#b91c1c]" />
            <span>&gt;2.8 (Electronegative Halogens/Oxygen)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
