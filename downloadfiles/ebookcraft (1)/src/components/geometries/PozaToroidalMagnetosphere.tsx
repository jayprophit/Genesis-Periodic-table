import React, { useState } from 'react';
import { ElementData } from '../../types';
import { ELEMENTS_DATA } from '../../data/elements';
import { Orbit, ZoomIn, ZoomOut, RotateCcw, Play, Pause } from 'lucide-react';

interface Props {
  onSelectElement?: (element: ElementData) => void;
  selectedElementId?: number | null;
}

export const PozaToroidalMagnetosphere: React.FC<Props> = ({
  onSelectElement,
  selectedElementId
}) => {
  const [zoom, setZoom] = useState(1);
  const [hoveredElement, setHoveredElement] = useState<ElementData | null>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [activeSublevel, setActiveSublevel] = useState<'all' | 's' | 'p' | 'd' | 'f'>('all');

  // Key element nodes mapped along toroidal geodesic windings
  const toroidalNodes = [
    { z: 1, sym: 'H', u: 0.1, v: 0.2, block: 's', x: 380, y: 260, color: '#f43f5e' },
    { z: 2, sym: 'He', u: 0.15, v: 0.8, block: 's', x: 420, y: 260, color: '#38bdf8' },
    { z: 6, sym: 'C', u: 0.35, v: 0.5, block: 'p', x: 260, y: 220, color: '#fbbf24' },
    { z: 8, sym: 'O', u: 0.4, v: 0.6, block: 'p', x: 220, y: 250, color: '#f97316' },
    { z: 14, sym: 'Si', u: 0.55, v: 0.4, block: 'p', x: 500, y: 220, color: '#fbbf24' },
    { z: 26, sym: 'Fe', u: 0.7, v: 0.3, block: 'd', x: 380, y: 150, color: '#10b981' },
    { z: 79, sym: 'Au', u: 0.85, v: 0.7, block: 'd', x: 340, y: 380, color: '#eab308' },
    { z: 92, sym: 'U', u: 0.95, v: 0.9, block: 'f', x: 180, y: 330, color: '#ec4899' },
    { z: 94, sym: 'Pu', u: 0.98, v: 0.95, block: 'f', x: 580, y: 330, color: '#ec4899' }
  ];

  const handleNodeClick = (z: number) => {
    const el = ELEMENTS_DATA.find((e) => e.atomicNumber === z);
    if (el && onSelectElement) onSelectElement(el);
  };

  return (
    <div id="poza-toroidal-container" className="flex flex-col bg-[#0c1519] border border-[#1f373d] rounded-xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between p-3 bg-[#132227] border-b border-[#1f373d] gap-2">
        <div className="flex items-center gap-2">
          <Orbit className="w-5 h-5 text-[#8dd4c6]" />
          <div>
            <h4 className="text-sm font-semibold text-[#e3eceb] tracking-wide">
              Rafael Poza's Magnetospheric Torus (2008)
            </h4>
            <p className="text-xs text-[#8ca09e]">
              Synthesis of the Periodic System & Magnetosphere: Fractal Geometry of the One
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Subshell filter chips */}
          <div className="flex items-center bg-[#0e191d] rounded-lg border border-[#213b42] p-0.5 text-xs">
            {(['all', 's', 'p', 'd', 'f'] as const).map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSublevel(sub)}
                className={`px-2 py-0.5 rounded font-mono uppercase transition-colors ${
                  activeSublevel === sub
                    ? 'bg-[#1f4e49] text-[#90e0d0] font-bold'
                    : 'text-[#8ca09e] hover:text-[#e3eceb]'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsRotating(!isRotating)}
            className="p-1.5 rounded-lg bg-[#0e191d] border border-[#213b42] text-[#8ca09e] hover:text-[#e3eceb] transition-colors"
            title={isRotating ? 'Pause rotation' : 'Resume rotation'}
          >
            {isRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <div className="flex items-center bg-[#0e191d] rounded-lg border border-[#213b42] p-1">
            <button
              onClick={() => setZoom((z) => Math.max(0.6, z - 0.15))}
              className="p-1 text-[#8ca09e] hover:text-[#e3eceb]"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs px-2 text-[#8ca09e] font-mono">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(1.8, z + 0.15))}
              className="p-1 text-[#8ca09e] hover:text-[#e3eceb]"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Toroidal Canvas */}
      <div className="relative w-full h-[600px] overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#13272d] via-[#091316] to-[#050a0c] flex items-center justify-center p-4">
        <div
          style={{
            transform: `scale(${zoom})`,
            transition: 'transform 0.15s ease-out'
          }}
          className="relative w-[760px] h-[520px] flex items-center justify-center"
        >
          <svg viewBox="0 0 760 520" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="pozaBlueFlux" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.7" />
              </linearGradient>

              <linearGradient id="pozaRedFlux" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#dc2626" stopOpacity="0.7" />
              </linearGradient>

              <radialGradient id="torusCore" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0f2229" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#1e3a43" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0c171a" stopOpacity="0.2" />
              </radialGradient>
            </defs>

            {/* Toroid Shading Doughnut Ring */}
            <ellipse cx="380" cy="260" rx="300" ry="170" fill="none" stroke="#254a54" strokeWidth="24" strokeOpacity="0.3" />
            <ellipse cx="380" cy="260" rx="140" ry="80" fill="#070e10" stroke="#1b3941" strokeWidth="3" />

            {/* Rotating Magnetic Vortex & Poloidal Loops */}
            <g
              style={{
                transformOrigin: '380px 260px',
                animation: isRotating ? 'spin 40s linear infinite' : 'none'
              }}
            >
              {/* Blue Magnetic Convergent Flux Loops */}
              {(activeSublevel === 'all' || activeSublevel === 's' || activeSublevel === 'd') && (
                <>
                  <ellipse cx="380" cy="260" rx="270" ry="110" fill="none" stroke="url(#pozaBlueFlux)" strokeWidth="1.8" transform="rotate(-25 380 260)" strokeDasharray="6 4" opacity="0.85" />
                  <ellipse cx="380" cy="260" rx="270" ry="110" fill="none" stroke="url(#pozaBlueFlux)" strokeWidth="1.8" transform="rotate(35 380 260)" strokeDasharray="6 4" opacity="0.85" />
                  <ellipse cx="380" cy="260" rx="220" ry="90" fill="none" stroke="url(#pozaBlueFlux)" strokeWidth="1.5" transform="rotate(75 380 260)" opacity="0.75" />
                </>
              )}

              {/* Red Electric Divergent Flux Loops */}
              {(activeSublevel === 'all' || activeSublevel === 'p' || activeSublevel === 'f') && (
                <>
                  <ellipse cx="380" cy="260" rx="290" ry="130" fill="none" stroke="url(#pozaRedFlux)" strokeWidth="2" transform="rotate(15 380 260)" opacity="0.85" />
                  <ellipse cx="380" cy="260" rx="290" ry="130" fill="none" stroke="url(#pozaRedFlux)" strokeWidth="2" transform="rotate(-55 380 260)" opacity="0.85" />
                  <ellipse cx="380" cy="260" rx="240" ry="100" fill="none" stroke="url(#pozaRedFlux)" strokeWidth="1.5" transform="rotate(-85 380 260)" opacity="0.75" />
                </>
              )}
            </g>

            {/* Toroidal Knot Geodesics */}
            <path
              d="
                M 120 260 
                C 120 130, 260 90, 380 90
                C 500 90, 640 130, 640 260
                C 640 390, 500 430, 380 430
                C 260 430, 120 390, 120 260
              "
              fill="none"
              stroke="#8dd4c6"
              strokeWidth="2"
              strokeDasharray="4 6"
              opacity="0.6"
            />

            {/* Central Vortex Eye */}
            <circle cx="380" cy="260" r="14" fill="#0e2329" stroke="#8dd4c6" strokeWidth="2" />
            <text x="380" y="264" fill="#90e0d0" fontSize="9" fontWeight="bold" textAnchor="middle">
              ONE
            </text>

            {/* Element Nodes along Toroidal Crossing Points */}
            {toroidalNodes
              .filter((node) => activeSublevel === 'all' || node.block === activeSublevel)
              .map((node) => {
                const isSelected = selectedElementId === node.z;
                const isHovered = hoveredElement?.atomicNumber === node.z;
                return (
                  <g
                    key={`torus-node-${node.z}`}
                    className="cursor-pointer"
                    onClick={() => handleNodeClick(node.z)}
                    onMouseEnter={() => {
                      const el = ELEMENTS_DATA.find((e) => e.atomicNumber === node.z);
                      if (el) setHoveredElement(el);
                    }}
                    onMouseLeave={() => setHoveredElement(null)}
                  >
                    {(isSelected || isHovered) && (
                      <circle cx={node.x} cy={node.y} r="16" fill="none" stroke="#ffffff" strokeWidth="2" className="animate-ping" />
                    )}
                    <circle cx={node.x} cy={node.y} r="11" fill={node.color} stroke="#ffffff" strokeWidth={isSelected ? 3 : 1.5} />
                    <text x={node.x} y={node.y + 4} fill="#0f172a" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                      {node.sym}
                    </text>
                  </g>
                );
              })}
          </svg>
        </div>

        {/* Hover Inspector Card */}
        {hoveredElement && (
          <div className="absolute top-4 left-4 max-w-xs bg-[#132227]/95 border border-[#31565f] rounded-lg p-3 shadow-xl backdrop-blur-md z-30 pointer-events-none">
            <div className="flex items-center justify-between pb-1 border-b border-[#213a41]">
              <span className="text-xs font-mono text-[#8dd4c6]">Z={hoveredElement.atomicNumber}</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-[#1f3b43] text-[#e0f2fe] font-semibold uppercase">
                Sublevel {hoveredElement.block}
              </span>
            </div>
            <div className="mt-1">
              <div className="text-base font-bold text-[#e3eceb]">
                {hoveredElement.name} ({hoveredElement.symbol})
              </div>
              <div className="text-xs text-[#8ca09e] mt-1">
                Mapped as a resonant harmonic knot on the magnetospheric vortex torus.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 bg-[#0e191d] border-t border-[#1f373d] flex flex-wrap items-center justify-between gap-3 text-xs text-[#9bb1af]">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#2563eb]" />
            <span>Magnetic Inward Flux (Convergent)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
            <span>Electric Outward Flux (Divergent)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#8dd4c6]" />
            <span>Nodal Quantum Intersections</span>
          </div>
        </div>
      </div>
    </div>
  );
};
