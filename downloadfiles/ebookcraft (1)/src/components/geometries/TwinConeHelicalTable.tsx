import React, { useState } from 'react';
import { ElementData } from '../../types';
import { ELEMENTS_DATA } from '../../data/elements';
import { Sparkles, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface Props {
  onSelectElement?: (element: ElementData) => void;
  selectedElementId?: number | null;
}

export const TwinConeHelicalTable: React.FC<Props> = ({
  onSelectElement,
  selectedElementId
}) => {
  const [zoom, setZoom] = useState(1);
  const [hoveredElement, setHoveredElement] = useState<ElementData | null>(null);

  // Upper Cone (Spire 1 - light elements) and Lower Cone (Spire 2 - heavy elements)
  const coneNodes = [
    // Apex 1: Hydrogen
    { z: 1, sym: 'H', x: 380, y: 70, block: 's' },
    { z: 2, sym: 'He', x: 380, y: 110, block: 's' },
    // Spire 1 winding
    { z: 3, sym: 'Li', x: 330, y: 140, block: 's' },
    { z: 6, sym: 'C', x: 420, y: 170, block: 'p' },
    { z: 8, sym: 'O', x: 440, y: 190, block: 'p' },
    { z: 10, sym: 'Ne', x: 340, y: 200, block: 'p' },
    { z: 14, sym: 'Si', x: 460, y: 230, block: 'p' },
    { z: 26, sym: 'Fe', x: 280, y: 270, block: 'd' },

    // Equator / Waist
    { z: 47, sym: 'Ag', x: 500, y: 320, block: 'd' },
    { z: 54, sym: 'Xe', x: 260, y: 320, block: 'p' },

    // Spire 2 winding
    { z: 79, sym: 'Au', x: 470, y: 390, block: 'd' },
    { z: 86, sym: 'Rn', x: 290, y: 430, block: 'p' },
    { z: 92, sym: 'U', x: 380, y: 490, block: 'f' },
    { z: 94, sym: 'Pu', x: 380, y: 530, block: 'f' },

    // Detached f-block Wing Flaps
    { z: 57, sym: 'La', x: 620, y: 340, block: 'f' },
    { z: 71, sym: 'Lu', x: 670, y: 370, block: 'f' },
    { z: 89, sym: 'Ac', x: 620, y: 420, block: 'f' }
  ];

  const handleNodeClick = (z: number) => {
    const el = ELEMENTS_DATA.find((e) => e.atomicNumber === z);
    if (el && onSelectElement) onSelectElement(el);
  };

  return (
    <div id="twin-cone-container" className="flex flex-col bg-[#0c1519] border border-[#1f373d] rounded-xl overflow-hidden shadow-2xl">
      <div className="flex flex-wrap items-center justify-between p-3 bg-[#132227] border-b border-[#1f373d] gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#8dd4c6]" />
          <div>
            <h4 className="text-sm font-semibold text-[#e3eceb] tracking-wide">
              Twin-Cone Helical Periodic Model (3D Projection)
            </h4>
            <p className="text-xs text-[#8ca09e]">
              Inverted Cones Joined at Base with Tangent f-Block Wing Projections
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
        <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }} className="relative w-[780px] h-[600px]">
          <svg viewBox="0 0 780 600" className="w-full h-full overflow-visible">
            {/* Upper Cone Outline */}
            <polygon points="380,60 220,320 540,320" fill="#091418" stroke="#1d3d46" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Lower Inverted Cone Outline */}
            <polygon points="220,320 540,320 380,560" fill="#091418" stroke="#1d3d46" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Central Axis */}
            <line x1="380" y1="40" x2="380" y2="580" stroke="#8dd4c6" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />

            {/* Helical wrapping curves around cones */}
            <path
              d="
                M 380 60 
                C 420 100, 440 140, 380 160
                C 320 180, 290 220, 380 240
                C 470 260, 520 300, 380 320
                C 240 340, 270 380, 380 400
                C 490 420, 460 480, 380 500
                C 320 520, 340 550, 380 560
              "
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3"
              strokeOpacity="0.8"
            />

            {/* Wing Flap Bracket for f-block */}
            <path
              d="M 540 320 Q 640 280 680 340 Q 640 440 540 360"
              fill="#1e1026"
              stroke="#c084fc"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <text x="630" y="320" fill="#d8b4fe" fontSize="10" fontWeight="bold">
              f-Block Wing Flap
            </text>

            {/* Nodes */}
            {coneNodes.map((n) => {
              const isSelected = selectedElementId === n.z;
              const isHovered = hoveredElement?.atomicNumber === n.z;

              let col = '#3b82f6';
              if (n.block === 's') col = '#10b981';
              if (n.block === 'p') col = '#f59e0b';
              if (n.block === 'f') col = '#c084fc';

              return (
                <g
                  key={`cone-${n.z}`}
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
                  <circle cx={n.x} cy={n.y} r="11" fill={col} stroke="#ffffff" strokeWidth={isSelected ? 2.5 : 1} />
                  <text x={n.x} y={n.y + 3.5} fill="#0f172a" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                    {n.sym}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {hoveredElement && (
          <div className="absolute top-4 left-4 max-w-xs bg-[#132227]/95 border border-[#31565f] rounded-lg p-3 shadow-xl backdrop-blur-md z-30 pointer-events-none">
            <span className="text-xs font-mono text-[#8dd4c6]">Z={hoveredElement.atomicNumber}</span>
            <div className="text-base font-bold text-[#e3eceb]">{hoveredElement.name} ({hoveredElement.symbol})</div>
            <div className="text-xs text-[#8ca09e]">Twin-cone helical spire coordinate.</div>
          </div>
        )}
      </div>

      <div className="p-3 bg-[#0e191d] border-t border-[#1f373d] flex items-center justify-between text-xs text-[#9bb1af]">
        <span>Double-cone 3D helix with tangential lanthanide/actinide flaps</span>
        <span className="text-[#8dd4c6] font-mono">Reference: periodic-table-14.png</span>
      </div>
    </div>
  );
};
