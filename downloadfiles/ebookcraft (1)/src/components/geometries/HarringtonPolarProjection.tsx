import React, { useState } from 'react';
import { ElementData } from '../../types';
import { ELEMENTS_DATA } from '../../data/elements';
import { Crosshair, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface Props {
  onSelectElement?: (element: ElementData) => void;
  selectedElementId?: number | null;
}

export const HarringtonPolarProjection: React.FC<Props> = ({
  onSelectElement,
  selectedElementId
}) => {
  const [zoom, setZoom] = useState(1);
  const [hoveredElement, setHoveredElement] = useState<ElementData | null>(null);

  const cx = 380;
  const cy = 340;

  // Quadratic AMU shells: 2^2=4, 3^2=9, 4^2=16, 5^2=25, 6^2=36, 7^2=49, 8^2=64
  const shells = [
    { label: '2² Shell (4)', r: 40, color: '#f59e0b' },
    { label: '3² Shell (9)', r: 75, color: '#10b981' },
    { label: '4² Shell (16)', r: 120, color: '#06b6d4' },
    { label: '5² Shell (25)', r: 165, color: '#3b82f6' },
    { label: '6² Shell (36)', r: 210, color: '#8b5cf6' },
    { label: '7² Shell (49)', r: 255, color: '#ec4899' },
    { label: '8² Shell (64)', r: 295, color: '#ef4444' }
  ];

  const harringtonNodes = [
    { z: 1, sym: '1H', deg: -45, r: 40 },
    { z: 6, sym: '12C', deg: 15, r: 75 },
    { z: 14, sym: '28Si', deg: 40, r: 120 },
    { z: 26, sym: '56Fe', deg: 70, r: 165 },
    { z: 47, sym: '107Ag', deg: 130, r: 210 },
    { z: 79, sym: '197Au', deg: 180, r: 255 },
    { z: 92, sym: '238U', deg: 240, r: 295 },
    { z: 94, sym: '244Pu', deg: 270, r: 295 }
  ];

  const handleNodeClick = (z: number) => {
    const el = ELEMENTS_DATA.find((e) => e.atomicNumber === z);
    if (el && onSelectElement) onSelectElement(el);
  };

  return (
    <div id="harrington-projection-container" className="flex flex-col bg-[#0c1519] border border-[#1f373d] rounded-xl overflow-hidden shadow-2xl">
      <div className="flex flex-wrap items-center justify-between p-3 bg-[#132227] border-b border-[#1f373d] gap-2">
        <div className="flex items-center gap-2">
          <Crosshair className="w-5 h-5 text-[#8dd4c6]" />
          <div>
            <h4 className="text-sm font-semibold text-[#e3eceb] tracking-wide">
              Periodic Harrington Projection (270 AMU Structure)
            </h4>
            <p className="text-xs text-[#8ca09e]">
              Quadratic Mass Shells (2² to 8²), Protons vs Counter-Protons Phase Rotation
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
        <div style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }} className="relative w-[760px] h-[680px]">
          <svg viewBox="0 0 760 680" className="w-full h-full overflow-visible">
            {/* Mid-Table Continental Divide Axis */}
            <line x1="200" y1="60" x2="560" y2="620" stroke="#f43f5e" strokeWidth="2" strokeDasharray="5 5" />
            <text x="565" y="630" fill="#fda4af" fontSize="9" fontWeight="bold">
              Mid-Table Continental Divide
            </text>

            {/* Structure Phase 0 Axis of Symmetry */}
            <line x1="380" y1="30" x2="380" y2="650" stroke="#8dd4c6" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="380" y="24" fill="#90e0d0" fontSize="10" fontWeight="bold" textAnchor="middle">
              Axis of Symmetry (Phase 0°)
            </text>

            {/* Concentric Quadratic AMU Shells */}
            {shells.map((sh, idx) => (
              <g key={`sh-${idx}`}>
                <circle cx={cx} cy={cy} r={sh.r} fill="none" stroke={sh.color} strokeWidth="1.2" strokeOpacity="0.4" />
                <text x={cx + sh.r - 20} y={cy - 4} fill={sh.color} fontSize="8.5" opacity="0.8" fontFamily="monospace">
                  {sh.label}
                </text>
              </g>
            ))}

            {/* Protons vs Counter-Protons Phase Arrows */}
            <path d="M 120 180 A 280 280 0 0 1 240 80" fill="none" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="140" y="110" fill="#7dd3fc" fontSize="9" fontWeight="bold">
              Protons Phase (79° / 11°)
            </text>

            <path d="M 640 180 A 280 280 0 0 0 520 80" fill="none" stroke="#f43f5e" strokeWidth="3" />
            <text x="550" y="110" fill="#fca5a5" fontSize="9" fontWeight="bold">
              Counter-Protons (11° / 79°)
            </text>

            {/* Nodes */}
            {harringtonNodes.map((n) => {
              const rad = (n.deg * Math.PI) / 180;
              const x = cx + n.r * Math.cos(rad);
              const y = cy + n.r * Math.sin(rad);
              const isSelected = selectedElementId === n.z;
              const isHovered = hoveredElement?.atomicNumber === n.z;

              return (
                <g
                  key={`harr-${n.z}`}
                  className="cursor-pointer"
                  onClick={() => handleNodeClick(n.z)}
                  onMouseEnter={() => {
                    const full = ELEMENTS_DATA.find((item) => item.atomicNumber === n.z);
                    if (full) setHoveredElement(full);
                  }}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  {(isSelected || isHovered) && (
                    <circle cx={x} cy={y} r="16" fill="none" stroke="#ffffff" strokeWidth="2" className="animate-ping" />
                  )}
                  <circle cx={x} cy={y} r="11" fill="#1e3a44" stroke="#8dd4c6" strokeWidth={isSelected ? 2.5 : 1.5} />
                  <text x={x} y={y + 3.5} fill="#e3eceb" fontSize="8" fontWeight="bold" textAnchor="middle">
                    {n.sym}
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
            <div className="text-xs text-[#8ca09e]">Harrington AMU harmonic shell coordinate.</div>
          </div>
        )}
      </div>

      <div className="p-3 bg-[#0e191d] border-t border-[#1f373d] flex items-center justify-between text-xs text-[#9bb1af]">
        <span>MMF 270 AMU structure with quadratic radii and relativistic phase angles</span>
        <span className="text-[#8dd4c6] font-mono">Reference: angular form walter russel4.png</span>
      </div>
    </div>
  );
};
