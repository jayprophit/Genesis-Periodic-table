import React, { useState } from 'react';
import { ElementData } from '../../types';
import { ELEMENTS_DATA } from '../../data/elements';
import { Triangle, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface Props {
  onSelectElement?: (element: ElementData) => void;
  selectedElementId?: number | null;
}

export const PyramidalSubshellTable: React.FC<Props> = ({
  onSelectElement,
  selectedElementId
}) => {
  const [zoom, setZoom] = useState(1);
  const [hoveredElement, setHoveredElement] = useState<ElementData | null>(null);

  // Rows corresponding to Periods K(1), L(2), M(3), N(4), O(5), P(6), Q(7)
  const rows = [
    { shell: 'K', n: 1, maxElectrons: 2, subshells: '1s', elements: [{ z: 1, sym: 'H' }, { z: 2, sym: 'He' }] },
    { shell: 'L', n: 2, maxElectrons: 8, subshells: '2s, 2p', elements: [{ z: 3, sym: 'Li' }, { z: 4, sym: 'Be' }, { z: 5, sym: 'B' }, { z: 6, sym: 'C' }, { z: 7, sym: 'N' }, { z: 8, sym: 'O' }, { z: 9, sym: 'F' }, { z: 10, sym: 'Ne' }] },
    { shell: 'M', n: 3, maxElectrons: 18, subshells: '3s, 3p', elements: [{ z: 11, sym: 'Na' }, { z: 12, sym: 'Mg' }, { z: 13, sym: 'Al' }, { z: 14, sym: 'Si' }, { z: 15, sym: 'P' }, { z: 16, sym: 'S' }, { z: 17, sym: 'Cl' }, { z: 18, sym: 'Ar' }] },
    { shell: 'N', n: 4, maxElectrons: 32, subshells: '4s, 3d, 4p', elements: [{ z: 19, sym: 'K' }, { z: 20, sym: 'Ca' }, { z: 26, sym: 'Fe' }, { z: 27, sym: 'Co' }, { z: 28, sym: 'Ni' }, { z: 29, sym: 'Cu' }, { z: 36, sym: 'Kr' }] },
    { shell: 'O', n: 5, maxElectrons: 50, subshells: '5s, 4d, 5p', elements: [{ z: 37, sym: 'Rb' }, { z: 38, sym: 'Sr' }, { z: 45, sym: 'Rh' }, { z: 47, sym: 'Ag' }, { z: 54, sym: 'Xe' }] },
    { shell: 'P', n: 6, maxElectrons: 72, subshells: '6s, 4f, 5d, 6p', elements: [{ z: 55, sym: 'Cs' }, { z: 56, sym: 'Ba' }, { z: 71, sym: 'Lu' }, { z: 78, sym: 'Pt' }, { z: 79, sym: 'Au' }, { z: 86, sym: 'Rn' }] },
    { shell: 'Q', n: 7, maxElectrons: 98, subshells: '7s, 5f, 6d, 7p', elements: [{ z: 92, sym: 'U' }, { z: 94, sym: 'Pu' }, { z: 118, sym: 'Og' }] }
  ];

  const handleCellClick = (z: number) => {
    const el = ELEMENTS_DATA.find((e) => e.atomicNumber === z);
    if (el && onSelectElement) onSelectElement(el);
  };

  return (
    <div id="pyramidal-subshell-container" className="flex flex-col bg-[#0c1519] border border-[#1f373d] rounded-xl overflow-hidden shadow-2xl">
      <div className="flex flex-wrap items-center justify-between p-3 bg-[#132227] border-b border-[#1f373d] gap-2">
        <div className="flex items-center gap-2">
          <Triangle className="w-5 h-5 text-[#8dd4c6]" />
          <div>
            <h4 className="text-sm font-semibold text-[#e3eceb] tracking-wide">
              Equilateral Pyramidal Subshell Table (2n² Law)
            </h4>
            <p className="text-xs text-[#8ca09e]">
              Step-Pyramid Geometric Packing of Quantum Subshells K through Q
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
        <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }} className="relative w-[840px] h-[560px]">
          <svg viewBox="0 0 840 560" className="w-full h-full overflow-visible">
            {/* Pyramid Triangular Framework Outline */}
            <polygon points="380,30 60,500 700,500" fill="#091417" stroke="#1c3e47" strokeWidth="2" strokeDasharray="3 3" />

            {/* Step Rows */}
            {rows.map((row, idx) => {
              const y = 50 + idx * 64;
              const cellWidth = 38;
              const startX = 380 - (row.elements.length * cellWidth) / 2;

              return (
                <g key={`pyr-row-${row.shell}`}>
                  {/* Left Shell Label */}
                  <text x="35" y={y + 22} fill="#8dd4c6" fontSize="13" fontWeight="bold" fontFamily="serif">
                    {row.shell}
                  </text>
                  <text x="55" y={y + 22} fill="#628583" fontSize="10" fontFamily="sans-serif">
                    (n={row.n})
                  </text>

                  {/* Elements along step row */}
                  {row.elements.map((el, eIdx) => {
                    const x = startX + eIdx * cellWidth;
                    const isSelected = selectedElementId === el.z;
                    const isHovered = hoveredElement?.atomicNumber === el.z;

                    return (
                      <g
                        key={`pyr-el-${el.z}`}
                        className="cursor-pointer"
                        onClick={() => handleCellClick(el.z)}
                        onMouseEnter={() => {
                          const full = ELEMENTS_DATA.find((item) => item.atomicNumber === el.z);
                          if (full) setHoveredElement(full);
                        }}
                        onMouseLeave={() => setHoveredElement(null)}
                      >
                        {(isSelected || isHovered) && (
                          <rect x={x - 2} y={y - 2} width={cellWidth} height="36" rx="4" fill="none" stroke="#90e0d0" strokeWidth="2" />
                        )}
                        <rect
                          x={x}
                          y={y}
                          width={cellWidth - 4}
                          height="32"
                          rx="3"
                          fill={row.n <= 2 ? '#991b1b' : row.n <= 4 ? '#b45309' : row.n === 5 ? '#047857' : '#1d4ed8'}
                          stroke="#374151"
                          strokeWidth="1"
                        />
                        <text x={x + (cellWidth - 4) / 2} y={y + 20} fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                          {el.sym}
                        </text>
                        <text x={x + 3} y={y + 9} fill="#f3f4f6" fontSize="7" opacity="0.7">
                          {el.z}
                        </text>
                      </g>
                    );
                  })}

                  {/* Right Quantum Number Annotations */}
                  <g opacity="0.85">
                    <line x1="610" y1={y + 16} x2="780" y2={y + 16} stroke="#1b3941" strokeDasharray="2 2" />
                    <text x="630" y={y + 20} fill="#a7f3d0" fontSize="10" fontFamily="monospace">
                      2n² = {row.maxElectrons} e⁻
                    </text>
                    <text x="710" y={y + 20} fill="#6ee7b7" fontSize="9.5" fontFamily="monospace">
                      [{row.subshells}]
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Base Block Brackets */}
            <g transform="translate(60, 520)">
              <rect x="20" y="0" width="80" height="12" fill="#991b1b" rx="2" />
              <text x="60" y="10" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">s (2)</text>

              <rect x="110" y="0" width="160" height="12" fill="#7e22ce" rx="2" />
              <text x="190" y="10" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">f (14)</text>

              <rect x="280" y="0" width="140" height="12" fill="#047857" rx="2" />
              <text x="350" y="10" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">d (10)</text>

              <rect x="430" y="0" width="100" height="12" fill="#b45309" rx="2" />
              <text x="480" y="10" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">p (6)</text>
            </g>
          </svg>
        </div>

        {/* Hover Inspector Card */}
        {hoveredElement && (
          <div className="absolute top-4 right-4 max-w-xs bg-[#132227]/95 border border-[#31565f] rounded-lg p-3 shadow-xl backdrop-blur-md z-30 pointer-events-none">
            <div className="flex items-center justify-between pb-1 border-b border-[#213a41]">
              <span className="text-xs font-mono text-[#8dd4c6]">Z={hoveredElement.atomicNumber}</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-[#1f3b43] text-[#e0f2fe] font-semibold">
                Period {hoveredElement.period} | Shell n={hoveredElement.period}
              </span>
            </div>
            <div className="mt-1">
              <div className="text-base font-bold text-[#e3eceb]">
                {hoveredElement.name} ({hoveredElement.symbol})
              </div>
              <div className="text-xs text-[#8ca09e] mt-1">
                Max electrons in shell = 2({hoveredElement.period}²) = {2 * Math.pow(hoveredElement.period, 2)}.
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 bg-[#0e191d] border-t border-[#1f373d] flex flex-wrap items-center justify-between gap-3 text-xs text-[#9bb1af]">
        <span className="font-semibold text-[#8dd4c6]">Subshells (Base Blocks):</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1"><span className="w-3 h-3 bg-[#991b1b] rounded" /><span>s-block (2)</span></div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 bg-[#7e22ce] rounded" /><span>f-block (14)</span></div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 bg-[#047857] rounded" /><span>d-block (10)</span></div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 bg-[#b45309] rounded" /><span>p-block (6)</span></div>
        </div>
      </div>
    </div>
  );
};
