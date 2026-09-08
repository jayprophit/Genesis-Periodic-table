import React, { useState } from 'react';
import { ElementData } from '../../types';
import { ELEMENTS_DATA } from '../../data/elements';
import { Waves, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface Props {
  onSelectElement?: (element: ElementData) => void;
  selectedElementId?: number | null;
}

export const MakeevDualSpiral: React.FC<Props> = ({
  onSelectElement,
  selectedElementId
}) => {
  const [zoom, setZoom] = useState(1);
  const [hoveredElement, setHoveredElement] = useState<ElementData | null>(null);

  const makeevNodes = [
    { z: 1, sym: '1 H', x: 380, y: 320, color: '#f59e0b' },
    { z: 6, sym: '6 C', x: 440, y: 300, color: '#f59e0b' },
    { z: 8, sym: '8 O', x: 410, y: 270, color: '#f59e0b' },
    { z: 10, sym: '10 Ne', x: 350, y: 290, color: '#f59e0b' },
    { z: 14, sym: '14 Si', x: 330, y: 340, color: '#f59e0b' },
    { z: 26, sym: '26 Fe', x: 490, y: 260, color: '#10b981' },
    { z: 29, sym: '29 Cu', x: 450, y: 220, color: '#10b981' },
    { z: 47, sym: '47 Ag', x: 440, y: 440, color: '#10b981' },
    { z: 54, sym: '54 Xe', x: 570, y: 340, color: '#f43f5e' },
    { z: 79, sym: '79 Au', x: 230, y: 220, color: '#10b981' },
    { z: 92, sym: '92 U', x: 190, y: 380, color: '#06b6d4' },
    { z: 94, sym: '94 Pu', x: 200, y: 410, color: '#06b6d4' },
    { z: 118, sym: '118 Uuo', x: 580, y: 370, color: '#f43f5e' }
  ];

  const handleNodeClick = (z: number) => {
    const el = ELEMENTS_DATA.find((e) => e.atomicNumber === z);
    if (el && onSelectElement) onSelectElement(el);
  };

  return (
    <div id="makeev-dual-spiral-container" className="flex flex-col bg-[#0c1519] border border-[#1f373d] rounded-xl overflow-hidden shadow-2xl">
      <div className="flex flex-wrap items-center justify-between p-3 bg-[#132227] border-b border-[#1f373d] gap-2">
        <div className="flex items-center gap-2">
          <Waves className="w-5 h-5 text-[#8dd4c6]" />
          <div>
            <h4 className="text-sm font-semibold text-[#e3eceb] tracking-wide">
              Makeev's Dual-Vortex Sphere-Vector Fractal (2012)
            </h4>
            <p className="text-xs text-[#8ca09e]">
              Cardioid Fractal Helix Connecting Elements 1 to 170 from Central Sinergon
            </p>
          </div>
        </div>

        <div className="flex items-center bg-[#0e191d] rounded-lg border border-[#213b42] p-1">
          <button onClick={() => setZoom((z) => Math.max(0.6, z - 0.15))} className="p-1 text-[#8ca09e] hover:text-[#e3eceb]"><ZoomOut className="w-4 h-4" /></button>
          <span className="text-xs px-2 text-[#8ca09e] font-mono">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom((z) => Math.min(1.8, z + 0.15))} className="p-1 text-[#8ca09e] hover:text-[#e3eceb]"><ZoomIn className="w-4 h-4" /></button>
          <button onClick={() => setZoom(1)} className="p-1 text-[#8ca09e] hover:text-[#e3eceb] ml-1 border-l border-[#213b42]"><RotateCcw className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      <div className="relative w-full h-[600px] overflow-auto bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#112328] via-[#0b1417] to-[#070d0f] flex justify-center p-4">
        <div style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }} className="relative w-[760px] h-[660px]">
          <svg viewBox="0 0 760 660" className="w-full h-full overflow-visible">
            {/* Outer Elliptical Boundary Rings */}
            <ellipse cx="380" cy="330" rx="280" ry="240" fill="none" stroke="#23424a" strokeWidth="1.5" />
            <ellipse cx="380" cy="330" rx="240" ry="200" fill="none" stroke="#1d373e" strokeWidth="1" strokeDasharray="3 3" />

            {/* Dual Vortex Helical Paths */}
            {/* Right Arm: Golden Spiral */}
            <path
              d="
                M 380 330
                C 420 310, 480 270, 520 220
                C 560 170, 520 100, 450 80
                C 380 60, 260 100, 200 160
                C 140 220, 150 360, 220 440
                C 290 520, 450 540, 540 480
                C 630 420, 640 280, 600 200
              "
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeOpacity="0.85"
            />

            {/* Left Arm: Opposing Golden Spiral */}
            <path
              d="
                M 380 330
                C 340 350, 280 390, 240 440
                C 200 490, 240 560, 310 580
                C 380 600, 500 560, 560 500
                C 620 440, 610 300, 540 220
                C 470 140, 310 120, 220 180
                C 130 240, 120 380, 160 460
              "
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2.5"
              strokeOpacity="0.85"
            />

            {/* Central Sinergon / Photon Seed Point */}
            <circle cx="380" cy="330" r="16" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
            <text x="380" y="333" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
              nt / n
            </text>
            <text x="380" y="358" fill="#fda4af" fontSize="8.5" fontWeight="bold" textAnchor="middle">
              Sinergon Seed
            </text>

            {/* Nodes */}
            {makeevNodes.map((n) => {
              const isSelected = selectedElementId === n.z;
              const isHovered = hoveredElement?.atomicNumber === n.z;
              return (
                <g
                  key={`makeev-${n.z}`}
                  className="cursor-pointer"
                  onClick={() => handleNodeClick(n.z)}
                  onMouseEnter={() => {
                    const full = ELEMENTS_DATA.find((item) => item.atomicNumber === n.z);
                    if (full) setHoveredElement(full);
                  }}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  {(isSelected || isHovered) && (
                    <circle cx={n.x} cy={n.y} r="16" fill="none" stroke="#ffffff" strokeWidth="2" className="animate-ping" />
                  )}
                  <circle cx={n.x} cy={n.y} r="11" fill={n.color} stroke="#ffffff" strokeWidth={isSelected ? 2.5 : 1} />
                  <text x={n.x} y={n.y + 3.5} fill="#0f172a" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                    {n.sym}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {hoveredElement && (
          <div className="absolute top-4 right-4 max-w-xs bg-[#132227]/95 border border-[#31565f] rounded-lg p-3 shadow-xl backdrop-blur-md z-30 pointer-events-none">
            <span className="text-xs font-mono text-[#8dd4c6]">Z={hoveredElement.atomicNumber}</span>
            <div className="text-base font-bold text-[#e3eceb]">{hoveredElement.name} ({hoveredElement.symbol})</div>
            <div className="text-xs text-[#8ca09e]">Makeev cardioid sphere-vector coordinate.</div>
          </div>
        )}
      </div>

      <div className="p-3 bg-[#0e191d] border-t border-[#1f373d] flex items-center justify-between text-xs text-[#9bb1af]">
        <span>Fractal dual-vortex cardioid with elements 1 to 170</span>
        <span className="text-[#8dd4c6] font-mono">Reference: angular form walter russel2.png</span>
      </div>
    </div>
  );
};
