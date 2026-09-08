import React, { useState } from 'react';
import { ElementData } from '../../types';
import { ELEMENTS_DATA } from '../../data/elements';
import { Disc, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface Props {
  onSelectElement?: (element: ElementData) => void;
  selectedElementId?: number | null;
}

export const ConcentricRingTable: React.FC<Props> = ({
  onSelectElement,
  selectedElementId
}) => {
  const [zoom, setZoom] = useState(1);
  const [hoveredElement, setHoveredElement] = useState<ElementData | null>(null);

  const cx = 360;
  const cy = 340;
  const ringCount = 6;
  const ringStep = 45;

  // Elements mapped onto concentric circular rings
  const ringElements = [
    // Ring 1 (Period 1/2 inner)
    { z: 2, sym: 'He', ring: 1, angle: -90, color: '#818cf8' },
    { z: 3, sym: 'Li', ring: 1, angle: -65, color: '#10b981' },
    { z: 4, sym: 'Be', ring: 1, angle: -40, color: '#10b981' },
    { z: 5, sym: 'B', ring: 1, angle: -15, color: '#f59e0b' },
    { z: 6, sym: 'C', ring: 1, angle: 10, color: '#f59e0b' },
    { z: 7, sym: 'N', ring: 1, angle: 35, color: '#f59e0b' },
    { z: 8, sym: 'O', ring: 1, angle: 60, color: '#f59e0b' },
    { z: 9, sym: 'F', ring: 1, angle: 85, color: '#f59e0b' },
    { z: 10, sym: 'Ne', ring: 1, angle: 110, color: '#818cf8' },

    // Ring 2 (Period 3)
    { z: 11, sym: 'Na', ring: 2, angle: -65, color: '#10b981' },
    { z: 12, sym: 'Mg', ring: 2, angle: -40, color: '#10b981' },
    { z: 13, sym: 'Al', ring: 2, angle: -15, color: '#f59e0b' },
    { z: 14, sym: 'Si', ring: 2, angle: 10, color: '#f59e0b' },
    { z: 15, sym: 'P', ring: 2, angle: 35, color: '#f59e0b' },
    { z: 16, sym: 'S', ring: 2, angle: 60, color: '#f59e0b' },
    { z: 17, sym: 'Cl', ring: 2, angle: 85, color: '#f59e0b' },
    { z: 18, sym: 'Ar', ring: 2, angle: -90, color: '#818cf8' },

    // Ring 3 (Period 4)
    { z: 19, sym: 'K', ring: 3, angle: -65, color: '#10b981' },
    { z: 20, sym: 'Ca', ring: 3, angle: -40, color: '#10b981' },
    { z: 26, sym: 'Fe', ring: 3, angle: 0, color: '#3b82f6' },
    { z: 29, sym: 'Cu', ring: 3, angle: 30, color: '#3b82f6' },
    { z: 36, sym: 'Kr', ring: 3, angle: -90, color: '#818cf8' },

    // Ring 4 (Period 5)
    { z: 37, sym: 'Rb', ring: 4, angle: -65, color: '#10b981' },
    { z: 45, sym: 'Rh', ring: 4, angle: 0, color: '#3b82f6' },
    { z: 47, sym: 'Ag', ring: 4, angle: 30, color: '#3b82f6' },
    { z: 54, sym: 'Xe', ring: 4, angle: -90, color: '#818cf8' },

    // Ring 5 (Period 6)
    { z: 55, sym: 'Cs', ring: 5, angle: -65, color: '#10b981' },
    { z: 71, sym: 'Lu', ring: 5, angle: -15, color: '#ec4899' },
    { z: 78, sym: 'Pt', ring: 5, angle: 0, color: '#3b82f6' },
    { z: 79, sym: 'Au', ring: 5, angle: 30, color: '#3b82f6' },
    { z: 86, sym: 'Rn', ring: 5, angle: -90, color: '#818cf8' },

    // Ring 6 (Period 7)
    { z: 92, sym: 'U', ring: 6, angle: -20, color: '#ec4899' },
    { z: 94, sym: 'Pu', ring: 6, angle: 10, color: '#ec4899' },
    { z: 118, sym: 'Og', ring: 6, angle: -90, color: '#818cf8' }
  ];

  const handleElementClick = (z: number) => {
    const el = ELEMENTS_DATA.find((e) => e.atomicNumber === z);
    if (el && onSelectElement) onSelectElement(el);
  };

  return (
    <div id="concentric-ring-container" className="flex flex-col bg-[#0c1519] border border-[#1f373d] rounded-xl overflow-hidden shadow-2xl">
      <div className="flex flex-wrap items-center justify-between p-3 bg-[#132227] border-b border-[#1f373d] gap-2">
        <div className="flex items-center gap-2">
          <Disc className="w-5 h-5 text-[#8dd4c6]" />
          <div>
            <h4 className="text-sm font-semibold text-[#e3eceb] tracking-wide">
              Stowe / Dufour Concentric Polar Periodic System
            </h4>
            <p className="text-xs text-[#8ca09e]">
              Concentric Energy Rings with Central Hydrogen Anchor & Vertical Noble Meridian
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
        <div style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }} className="relative w-[720px] h-[680px]">
          <svg viewBox="0 0 720 680" className="w-full h-full overflow-visible">
            {/* Concentric Rings */}
            {Array.from({ length: ringCount }).map((_, i) => {
              const r = 50 + (i + 1) * ringStep;
              return (
                <circle
                  key={`ring-${i}`}
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke="#1c3e47"
                  strokeWidth="1.2"
                  strokeDasharray={i % 2 === 0 ? 'none' : '4 4'}
                />
              );
            })}

            {/* Radial Group Lines */}
            {[-90, -65, -40, -15, 10, 35, 60, 85, 110, 135, 160, 185, 210].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const x2 = cx + (50 + ringCount * ringStep) * Math.cos(rad);
              const y2 = cy + (50 + ringCount * ringStep) * Math.sin(rad);
              return (
                <line
                  key={`ray-${deg}`}
                  x1={cx}
                  y1={cy}
                  x2={x2}
                  y2={y2}
                  stroke="#162e34"
                  strokeWidth="1"
                />
              );
            })}

            {/* Vertical Noble Gas Ray (-90° / 12 o'clock) */}
            <line
              x1={cx}
              y1={cy - (50 + ringCount * ringStep) - 20}
              x2={cx}
              y2={cy}
              stroke="#818cf8"
              strokeWidth="2.5"
              strokeDasharray="2 2"
            />
            <text x={cx} y={cy - (50 + ringCount * ringStep) - 26} fill="#93c5fd" fontSize="10" fontWeight="bold" textAnchor="middle">
              NOBLE GAS RAY (He, Ar, Kr, Xe, Rn)
            </text>

            {/* Central Hydrogen Origin */}
            <circle cx={cx} cy={cy} r="32" fill="#1e1b18" stroke="#f59e0b" strokeWidth="2.5" />
            <text x={cx} y={cy - 2} fill="#fcd34d" fontSize="13" fontWeight="bold" textAnchor="middle">
              H
            </text>
            <text x={cx} y={cy + 12} fill="#fef3c7" fontSize="8.5" textAnchor="middle">
              Origin (1-1-1)
            </text>

            {/* Render Ring Elements */}
            {ringElements.map((el) => {
              const r = 50 + el.ring * ringStep;
              const rad = (el.angle * Math.PI) / 180;
              const x = cx + r * Math.cos(rad);
              const y = cy + r * Math.sin(rad);
              const isSelected = selectedElementId === el.z;
              const isHovered = hoveredElement?.atomicNumber === el.z;

              return (
                <g
                  key={`ring-el-${el.z}-${el.sym}`}
                  className="cursor-pointer"
                  onClick={() => handleElementClick(el.z)}
                  onMouseEnter={() => {
                    const full = ELEMENTS_DATA.find((item) => item.atomicNumber === el.z);
                    if (full) setHoveredElement(full);
                  }}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  {(isSelected || isHovered) && (
                    <circle cx={x} cy={y} r="16" fill="none" stroke="#e0f2fe" strokeWidth="2" className="animate-ping" />
                  )}
                  <circle cx={x} cy={y} r="11" fill={el.color} stroke="#ffffff" strokeWidth={isSelected ? 3 : 1.5} />
                  <text x={x} y={y + 3.5} fill="#0f172a" fontSize="9" fontWeight="bold" textAnchor="middle">
                    {el.sym}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {hoveredElement && (
          <div className="absolute bottom-4 left-4 max-w-xs bg-[#132227]/95 border border-[#31565f] rounded-lg p-3 shadow-xl backdrop-blur-md z-30 pointer-events-none">
            <span className="text-xs font-mono text-[#8dd4c6]">Z={hoveredElement.atomicNumber}</span>
            <div className="text-base font-bold text-[#e3eceb]">{hoveredElement.name} ({hoveredElement.symbol})</div>
            <div className="text-xs text-[#8ca09e]">Concentric Shell n={hoveredElement.period}</div>
          </div>
        )}
      </div>

      <div className="p-3 bg-[#0e191d] border-t border-[#1f373d] flex items-center justify-between text-xs text-[#9bb1af]">
        <span>Center Hydrogen anchor with outer expansion by period radii</span>
        <span className="text-[#8dd4c6] font-mono">Reference: periodic-table-15.jpg</span>
      </div>
    </div>
  );
};
