import React, { useState } from 'react';
import { ElementData } from '../../types';
import { ELEMENTS_DATA } from '../../data/elements';
import { Layers, ZoomIn, ZoomOut, RotateCcw, ArrowRight } from 'lucide-react';

interface Props {
  onSelectElement?: (element: ElementData) => void;
  selectedElementId?: number | null;
}

export const RussellVsMendeleev: React.FC<Props> = ({
  onSelectElement,
  selectedElementId
}) => {
  const [zoom, setZoom] = useState(1);
  const [hoveredElement, setHoveredElement] = useState<ElementData | null>(null);
  const [activeTab, setActiveTab] = useState<'comparative' | 'prediction-detail'>('comparative');

  // Mendeleev Grid Elements (Miniature standard table)
  const mendeleevGrid = [
    { z: 1, sym: 'H', r: 0, c: 0, block: 's' },
    { z: 2, sym: 'He', r: 0, c: 17, block: 'p' },
    { z: 3, sym: 'Li', r: 1, c: 0, block: 's' },
    { z: 4, sym: 'Be', r: 1, c: 1, block: 's' },
    { z: 5, sym: 'B', r: 1, c: 12, block: 'p' },
    { z: 6, sym: 'C', r: 1, c: 13, block: 'p' },
    { z: 7, sym: 'N', r: 1, c: 14, block: 'p' },
    { z: 8, sym: 'O', r: 1, c: 15, block: 'p' },
    { z: 9, sym: 'F', r: 1, c: 16, block: 'p' },
    { z: 10, sym: 'Ne', r: 1, c: 17, block: 'p' },
    { z: 11, sym: 'Na', r: 2, c: 0, block: 's' },
    { z: 12, sym: 'Mg', r: 2, c: 1, block: 's' },
    { z: 13, sym: 'Al', r: 2, c: 12, block: 'p' },
    { z: 14, sym: 'Si', r: 2, c: 13, block: 'p' },
    { z: 26, sym: 'Fe', r: 3, c: 7, block: 'd' },
    { z: 29, sym: 'Cu', r: 3, c: 10, block: 'd' },
    { z: 92, sym: 'U', r: 6, c: 2, block: 'f' },
    { z: 94, sym: 'Pu', r: 6, c: 4, block: 'f' }
  ];

  // Russell Spiral nodes (Polar coords)
  const russellSpiralNodes = [
    { z: 1, sym: 'H', turns: 0.5, radius: 40 },
    { z: 6, sym: 'C', turns: 1.2, radius: 75 },
    { z: 14, sym: 'Si', turns: 1.8, radius: 105 },
    { z: 26, sym: 'Fe', turns: 2.3, radius: 135 },
    { z: 92, sym: 'U', turns: 3.1, radius: 175 },
    { z: 94, sym: 'Pu', turns: 3.4, radius: 200 }
  ];

  const handleElementClick = (z: number) => {
    const el = ELEMENTS_DATA.find((item) => item.atomicNumber === z);
    if (el && onSelectElement) onSelectElement(el);
  };

  return (
    <div id="russell-vs-mendeleev-container" className="flex flex-col bg-[#0c1519] border border-[#1f373d] rounded-xl overflow-hidden shadow-2xl">
      <div className="flex flex-wrap items-center justify-between p-3 bg-[#132227] border-b border-[#1f373d] gap-2">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#8dd4c6]" />
          <div>
            <h4 className="text-sm font-semibold text-[#e3eceb] tracking-wide">
              Russell's Spiral (1926) vs. Mendeleev's Table
            </h4>
            <p className="text-xs text-[#8ca09e]">
              Aussallspiral & Historical Transuranic Predictions (Plutonium, Neptunium)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#0e191d] rounded-lg border border-[#213b42] p-1">
            <button onClick={() => setZoom((z) => Math.max(0.6, z - 0.15))} className="p-1 text-[#8ca09e] hover:text-[#e3eceb]"><ZoomOut className="w-4 h-4" /></button>
            <span className="text-xs px-2 text-[#8ca09e] font-mono">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom((z) => Math.min(1.8, z + 0.15))} className="p-1 text-[#8ca09e] hover:text-[#e3eceb]"><ZoomIn className="w-4 h-4" /></button>
            <button onClick={() => setZoom(1)} className="p-1 text-[#8ca09e] hover:text-[#e3eceb] ml-1 border-l border-[#213b42]"><RotateCcw className="w-3.5 h-3.5" /></button>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[600px] overflow-auto bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#112328] via-[#0b1417] to-[#070d0f] flex justify-center p-4">
        <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }} className="relative w-[840px] h-[540px] grid grid-cols-2 gap-4">
          {/* Left Side: Mendeleev's Periodic Table */}
          <div className="bg-[#091316] border border-[#1b3941] rounded-lg p-4 flex flex-col items-center">
            <div className="text-xs font-bold text-[#8dd4c6] uppercase tracking-wider mb-2">
              Mendeleev's Periodic Table (Rectilinear Grid)
            </div>
            <p className="text-[11px] text-[#6d8885] text-center mb-4">
              Arbitrary line cuts and detached Lanthanide/Actinide row
            </p>

            <svg viewBox="0 0 360 280" className="w-full h-[280px]">
              {mendeleevGrid.map((cell) => {
                const x = cell.c * 19 + 8;
                const y = cell.r * 28 + 20;
                const isSelected = selectedElementId === cell.z;
                const isHighlightPu = cell.z === 94;

                return (
                  <g
                    key={`mend-${cell.z}`}
                    className="cursor-pointer"
                    onClick={() => handleElementClick(cell.z)}
                    onMouseEnter={() => {
                      const found = ELEMENTS_DATA.find((e) => e.atomicNumber === cell.z);
                      if (found) setHoveredElement(found);
                    }}
                    onMouseLeave={() => setHoveredElement(null)}
                  >
                    <rect
                      x={x}
                      y={y}
                      width="18"
                      height="24"
                      rx="2"
                      fill={isHighlightPu ? '#dc2626' : isSelected ? '#8dd4c6' : '#13282e'}
                      stroke={isHighlightPu ? '#fca5a5' : '#224a54'}
                      strokeWidth={isSelected || isHighlightPu ? 1.5 : 1}
                    />
                    <text x={x + 9} y={y + 15} fill={isSelected ? '#0c1a1e' : '#ffffff'} fontSize="9" fontWeight="bold" textAnchor="middle">
                      {cell.sym}
                    </text>
                  </g>
                );
              })}

              {/* Detached Actinide Row indication */}
              <rect x="20" y="210" width="310" height="38" rx="4" fill="#142125" stroke="#f59e0b" strokeDasharray="3 3" strokeWidth="1" />
              <text x="175" y="234" fill="#fbbf24" fontSize="10" textAnchor="middle">
                Detached Actinide Footnote (U, Np, Pu)
              </text>
            </svg>

            <div className="mt-auto p-2 bg-[#102026] border border-[#1f3a43] rounded text-[11px] text-[#8ca09e]">
              <span className="text-[#f59e0b] font-bold">1940 Labs:</span> Seaborg & McMillan synthesize Neptunium & Plutonium at UC Berkeley.
            </div>
          </div>

          {/* Right Side: Russell's Spiral Periodic Table (1926) */}
          <div className="bg-[#091316] border border-[#1b3941] rounded-lg p-4 flex flex-col items-center">
            <div className="text-xs font-bold text-[#8dd4c6] uppercase tracking-wider mb-2">
              Russell's Spiral Table (1926 Involute)
            </div>
            <p className="text-[11px] text-[#6d8885] text-center mb-4">
              Continuous vortex spiral predicting transuranics 14 years before discovery
            </p>

            <svg viewBox="0 0 360 280" className="w-full h-[280px]">
              {/* Spiral Curve */}
              <path
                d="
                  M 180 140 
                  A 20 20 0 0 1 180 170 
                  A 45 45 0 0 1 140 120 
                  A 75 75 0 0 1 230 110 
                  A 105 105 0 0 1 120 210 
                  A 135 135 0 0 1 280 200
                "
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="4 3"
                opacity="0.8"
              />

              {/* Central Nucleus */}
              <circle cx="180" cy="140" r="10" fill="#f59e0b" />
              <text x="180" y="143" fill="#1c1917" fontSize="7" fontWeight="bold" textAnchor="middle">H</text>

              {/* Key Nodes */}
              <circle cx="180" cy="170" r="8" fill="#10b981" />
              <text x="180" y="173" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">C</text>

              <circle cx="140" cy="120" r="8" fill="#10b981" />
              <text x="140" y="123" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">Si</text>

              <circle cx="230" cy="110" r="8" fill="#3b82f6" />
              <text x="230" y="113" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">Fe</text>

              <circle cx="120" cy="210" r="8" fill="#ec4899" />
              <text x="120" y="213" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">U</text>

              {/* 1926 Prediction of Pu */}
              <circle cx="280" cy="200" r="12" fill="#ef4444" stroke="#fecaca" strokeWidth="2" className="animate-pulse" />
              <text x="280" y="204" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Pu</text>

              <path d="M 280 185 L 295 160" stroke="#fca5a5" strokeWidth="1.5" />
              <rect x="250" y="135" width="90" height="24" rx="4" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
              <text x="295" y="151" fill="#fecaca" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                1926 (Russell)
              </text>
            </svg>

            <div className="mt-auto p-2 bg-[#1f1015] border border-[#431d27] rounded text-[11px] text-[#fca5a5]">
              <span className="text-[#f87171] font-bold">1926 Prediction:</span> Walter Russell charts Plutonium & Neptunium 14 years before cyclotron discovery.
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 bg-[#0e191d] border-t border-[#1f373d] flex items-center justify-between text-xs text-[#9bb1af]">
        <span>Continuous spiral vs rectilinear fragmentation comparison</span>
        <span className="text-[#8dd4c6] font-mono">Reference: images (1).jfif</span>
      </div>
    </div>
  );
};
