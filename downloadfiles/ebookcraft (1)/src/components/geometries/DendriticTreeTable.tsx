import React, { useState } from 'react';
import { ElementData } from '../../types';
import { ELEMENTS_DATA } from '../../data/elements';
import { Trees, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface Props {
  onSelectElement?: (element: ElementData) => void;
  selectedElementId?: number | null;
}

export const DendriticTreeTable: React.FC<Props> = ({
  onSelectElement,
  selectedElementId
}) => {
  const [zoom, setZoom] = useState(1);
  const [hoveredElement, setHoveredElement] = useState<ElementData | null>(null);

  // Tree nodes along trunk and lateral branches
  const treeNodes = [
    // Trunk
    { z: 1, sym: 'H', x: 380, y: 50, branch: 'trunk' },
    { z: 6, sym: 'C', x: 380, y: 110, branch: 'trunk' },
    { z: 14, sym: 'Si', x: 380, y: 165, branch: 'trunk' },
    { z: 22, sym: 'Ti', x: 380, y: 220, branch: 'trunk' },
    { z: 40, sym: 'Zr', x: 380, y: 280, branch: 'trunk' },
    { z: 72, sym: 'Hf', x: 380, y: 340, branch: 'trunk' },
    { z: 90, sym: 'Th', x: 380, y: 410, branch: 'trunk' },

    // Left Bough 1 (Boron/Aluminium/Scandium family)
    { z: 5, sym: 'B', x: 260, y: 125, branch: 'left' },
    { z: 13, sym: 'Al', x: 275, y: 160, branch: 'left' },
    { z: 21, sym: 'Sc', x: 295, y: 195, branch: 'left' },
    { z: 39, sym: 'Y', x: 320, y: 240, branch: 'left' },

    // Left Bough 2 (Alkaline earth: Be, Mg, Ca, Sr, Ba, Ra)
    { z: 4, sym: 'Be', x: 160, y: 200, branch: 'left' },
    { z: 12, sym: 'Mg', x: 190, y: 235, branch: 'left' },
    { z: 20, sym: 'Ca', x: 225, y: 270, branch: 'left' },
    { z: 38, sym: 'Sr', x: 265, y: 310, branch: 'left' },
    { z: 56, sym: 'Ba', x: 310, y: 360, branch: 'left' },

    // Left Bough 3 (Alkali metals: Li, Na, K, Rb, Cs, Fr)
    { z: 3, sym: 'Li', x: 120, y: 340, branch: 'left' },
    { z: 11, sym: 'Na', x: 155, y: 365, branch: 'left' },
    { z: 19, sym: 'K', x: 195, y: 395, branch: 'left' },
    { z: 37, sym: 'Rb', x: 245, y: 425, branch: 'left' },
    { z: 55, sym: 'Cs', x: 300, y: 460, branch: 'left' },

    // Right Bough 1 (Nitrogen, Phosphorus, Vanadium)
    { z: 7, sym: 'N', x: 500, y: 125, branch: 'right' },
    { z: 15, sym: 'P', x: 485, y: 160, branch: 'right' },
    { z: 23, sym: 'V', x: 465, y: 195, branch: 'right' },
    { z: 41, sym: 'Nb', x: 440, y: 240, branch: 'right' },

    // Right Bough 2 (Oxygen, Sulfur, Chromium, Selenium, Molybdenum)
    { z: 8, sym: 'O', x: 600, y: 200, branch: 'right' },
    { z: 16, sym: 'S', x: 570, y: 235, branch: 'right' },
    { z: 24, sym: 'Cr', x: 535, y: 270, branch: 'right' },
    { z: 34, sym: 'Se', x: 495, y: 310, branch: 'right' },
    { z: 42, sym: 'Mo', x: 450, y: 360, branch: 'right' },

    // Right Bough 3 (Halogens: F, Cl, Mn, Br, I)
    { z: 9, sym: 'F', x: 640, y: 340, branch: 'right' },
    { z: 17, sym: 'Cl', x: 605, y: 365, branch: 'right' },
    { z: 25, sym: 'Mn', x: 565, y: 395, branch: 'right' },
    { z: 35, sym: 'Br', x: 515, y: 425, branch: 'right' },
    { z: 53, sym: 'I', x: 460, y: 460, branch: 'right' },

    // Base Bough: Noble gases (He, Ne, Ar, Kr, Xe, Rn) & Iron triad (Fe, Co, Ni)
    { z: 2, sym: 'He', x: 120, y: 490, branch: 'base' },
    { z: 10, sym: 'Ne', x: 160, y: 505, branch: 'base' },
    { z: 18, sym: 'Ar', x: 210, y: 520, branch: 'base' },
    { z: 36, sym: 'Kr', x: 265, y: 535, branch: 'base' },
    { z: 26, sym: 'Fe', x: 630, y: 490, branch: 'base' },
    { z: 27, sym: 'Co', x: 590, y: 505, branch: 'base' },
    { z: 28, sym: 'Ni', x: 540, y: 520, branch: 'base' }
  ];

  const isochrons = [110, 165, 220, 280, 340, 410, 470];

  const handleNodeClick = (z: number) => {
    const el = ELEMENTS_DATA.find((item) => item.atomicNumber === z);
    if (el && onSelectElement) onSelectElement(el);
  };

  return (
    <div id="dendritic-tree-container" className="flex flex-col bg-[#0c1519] border border-[#1f373d] rounded-xl overflow-hidden shadow-2xl">
      <div className="flex flex-wrap items-center justify-between p-3 bg-[#132227] border-b border-[#1f373d] gap-2">
        <div className="flex items-center gap-2">
          <Trees className="w-5 h-5 text-[#8dd4c6]" />
          <div>
            <h4 className="text-sm font-semibold text-[#e3eceb] tracking-wide">
              Dendritic Arboreal Periodic Tree
            </h4>
            <p className="text-xs text-[#8ca09e]">
              Phylogenetic Element Branching with Dashed Quantum Isochrons
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
        <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }} className="relative w-[760px] h-[600px]">
          <svg viewBox="0 0 760 600" className="w-full h-full overflow-visible">
            {/* Semicircular Dashed Quantum Isochrons */}
            {isochrons.map((r, i) => (
              <path
                key={`isochron-${i}`}
                d={`M ${380 - r * 0.9} ${50 + r} A ${r} ${r * 0.75} 0 0 1 ${380 + r * 0.9} ${50 + r}`}
                fill="none"
                stroke="#1b3d45"
                strokeDasharray="4 6"
                strokeWidth="1.2"
              />
            ))}

            {/* Tree Limbs and Branches */}
            {/* Trunk */}
            <line x1="380" y1="50" x2="380" y2="560" stroke="#8dd4c6" strokeWidth="6" strokeLinecap="round" opacity="0.9" />

            {/* Main Primary Boughs (Left) */}
            <path d="M 380 250 Q 300 200 260 125" fill="none" stroke="#5fae9e" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 380 320 Q 250 270 160 200" fill="none" stroke="#5fae9e" strokeWidth="4" strokeLinecap="round" />
            <path d="M 380 440 Q 220 380 120 340" fill="none" stroke="#5fae9e" strokeWidth="4" strokeLinecap="round" />
            <path d="M 380 540 Q 230 520 120 490" fill="none" stroke="#5fae9e" strokeWidth="4.5" strokeLinecap="round" />

            {/* Main Primary Boughs (Right) */}
            <path d="M 380 250 Q 460 200 500 125" fill="none" stroke="#5fae9e" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 380 320 Q 510 270 600 200" fill="none" stroke="#5fae9e" strokeWidth="4" strokeLinecap="round" />
            <path d="M 380 440 Q 540 380 640 340" fill="none" stroke="#5fae9e" strokeWidth="4" strokeLinecap="round" />
            <path d="M 380 540 Q 530 520 630 490" fill="none" stroke="#5fae9e" strokeWidth="4.5" strokeLinecap="round" />

            {/* Render Nodes */}
            {treeNodes.map((node) => {
              const isSelected = selectedElementId === node.z;
              const isHovered = hoveredElement?.atomicNumber === node.z;
              const isTrunk = node.branch === 'trunk';

              return (
                <g
                  key={`tree-${node.z}`}
                  className="cursor-pointer"
                  onClick={() => handleNodeClick(node.z)}
                  onMouseEnter={() => {
                    const full = ELEMENTS_DATA.find((item) => item.atomicNumber === node.z);
                    if (full) setHoveredElement(full);
                  }}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  {(isSelected || isHovered) && (
                    <circle cx={node.x} cy={node.y} r="14" fill="none" stroke="#ffffff" strokeWidth="2" className="animate-ping" />
                  )}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isTrunk ? 11 : 9}
                    fill={isTrunk ? '#f59e0b' : node.branch === 'left' ? '#10b981' : node.branch === 'right' ? '#f43f5e' : '#818cf8'}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? 2.5 : 1}
                  />
                  <text x={node.x} y={node.y + 3.5} fill="#0f172a" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                    {node.sym}
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
            <div className="text-xs text-[#8ca09e]">Phylogenetic branch node along energetic trunk.</div>
          </div>
        )}
      </div>

      <div className="p-3 bg-[#0e191d] border-t border-[#1f373d] flex items-center justify-between text-xs text-[#9bb1af]">
        <span>Arboreal botanical metaphor with concentric quantum isochron arcs</span>
        <span className="text-[#8dd4c6] font-mono">Reference: periodic-table-10.png</span>
      </div>
    </div>
  );
};
