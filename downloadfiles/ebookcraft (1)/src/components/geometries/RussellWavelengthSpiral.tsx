import React, { useState } from 'react';
import { ElementData } from '../../types';
import { ELEMENTS_DATA } from '../../data/elements';
import { Info, Sparkles, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface Props {
  onSelectElement?: (element: ElementData) => void;
  selectedElementId?: number | null;
  highlightNobleGases?: boolean;
  highlightCarbonPeak?: boolean;
  showWaveNodes?: boolean;
}

export const RussellWavelengthSpiral: React.FC<Props> = ({
  onSelectElement,
  selectedElementId,
  highlightNobleGases = false,
  highlightCarbonPeak = false,
  showWaveNodes = true
}) => {
  const [zoom, setZoom] = useState(1);
  const [hoveredElement, setHoveredElement] = useState<ElementData | null>(null);

  // Walter Russell's 9 Octaves structure
  const octaves = [
    { num: 1, name: '1st Octave: Gravitational Light', gas: 'Alphanon (A-non)', z: -3, color: '#6366f1' },
    { num: 2, name: '2nd Octave: Dielectric Precursor', gas: 'Betanon (B-non)', z: -2, color: '#8b5cf6' },
    { num: 3, name: '3rd Octave: Seed of Visible Cosmos', gas: 'Gammanon (G-non)', z: -1, color: '#a855f7' },
    { num: 4, name: '4th Octave: First Visible Elements', gas: 'Helium (He)', z: 2, peak: 'Carbon (C, ±4)', peakZ: 6, color: '#06b6d4' },
    { num: 5, name: '5th Octave: Terrestrial Minerals', gas: 'Neon (Ne)', z: 10, peak: 'Silicon (Si, ±4)', peakZ: 14, color: '#10b981' },
    { num: 6, name: '6th Octave: Ferromagnetic Peak', gas: 'Argon (Ar)', z: 18, peak: 'Cobalt (Co, ±4)', peakZ: 27, color: '#eab308' },
    { num: 7, name: '7th Octave: Catalytic Nobles', gas: 'Krypton (Kr)', z: 36, peak: 'Rhodium (Rh, ±4)', peakZ: 45, color: '#f97316' },
    { num: 8, name: '8th Octave: Dense Lanthanides', gas: 'Xenon (Xe)', z: 54, peak: 'Lutetium (Lu, ±4)', peakZ: 71, color: '#ec4899' },
    { num: 9, name: '9th Octave: Radioactive Decay & Transuranics', gas: 'Radon (Rn)', z: 86, peak: 'Plutonium (Pu, ±4)', peakZ: 94, terminal: 'Omeganon (118)', terminalZ: 118, color: '#ef4444' }
  ];

  // Specific elements along the wave
  const keyNodes = [
    // Pre-hydrogen space gases
    { z: -3, sym: 'A-non', name: 'Alphanon', oct: 1, tone: '0', x: 260, y: 70, type: 'inert' },
    { z: -2, sym: 'B-non', name: 'Betanon', oct: 2, tone: '0', x: 260, y: 130, type: 'inert' },
    { z: -1, sym: 'G-non', name: 'Gammanon', oct: 3, tone: '0', x: 260, y: 190, type: 'inert' },
    // Octave 4
    { z: 1, sym: 'H', name: 'Hydrogen', oct: 4, tone: '+1', x: 310, y: 230, type: 'charge' },
    { z: 2, sym: 'He', name: 'Helium', oct: 4, tone: '0', x: 260, y: 260, type: 'inert' },
    { z: 3, sym: 'Li', name: 'Lithium', oct: 4, tone: '+1', x: 210, y: 285, type: 'charge' },
    { z: 4, sym: 'Be', name: 'Beryllium', oct: 4, tone: '+2', x: 175, y: 310, type: 'charge' },
    { z: 5, sym: 'B', name: 'Boron', oct: 4, tone: '+3', x: 155, y: 335, type: 'charge' },
    { z: 6, sym: 'C', name: 'Carbon', oct: 4, tone: '±4', x: 145, y: 360, type: 'peak' },
    { z: 7, sym: 'N', name: 'Nitrogen', oct: 4, tone: '-3', x: 170, y: 385, type: 'discharge' },
    { z: 8, sym: 'O', name: 'Oxygen', oct: 4, tone: '-2', x: 205, y: 405, type: 'discharge' },
    { z: 9, sym: 'F', name: 'Fluorine', oct: 4, tone: '-1', x: 235, y: 420, type: 'discharge' },
    { z: 10, sym: 'Ne', name: 'Neon', oct: 5, tone: '0', x: 260, y: 435, type: 'inert' },
    // Octave 5
    { z: 11, sym: 'Na', name: 'Sodium', oct: 5, tone: '+1', x: 310, y: 460, type: 'charge' },
    { z: 12, sym: 'Mg', name: 'Magnesium', oct: 5, tone: '+2', x: 345, y: 485, type: 'charge' },
    { z: 13, sym: 'Al', name: 'Aluminium', oct: 5, tone: '+3', x: 365, y: 510, type: 'charge' },
    { z: 14, sym: 'Si', name: 'Silicon', oct: 5, tone: '±4', x: 375, y: 535, type: 'peak' },
    { z: 15, sym: 'P', name: 'Phosphorus', oct: 5, tone: '-3', x: 350, y: 560, type: 'discharge' },
    { z: 16, sym: 'S', name: 'Sulfur', oct: 5, tone: '-2', x: 315, y: 580, type: 'discharge' },
    { z: 17, sym: 'Cl', name: 'Chlorine', oct: 5, tone: '-1', x: 285, y: 595, type: 'discharge' },
    { z: 18, sym: 'Ar', name: 'Argon', oct: 6, tone: '0', x: 260, y: 610, type: 'inert' },
    // Octave 6 (Ferromagnetic peak)
    { z: 19, sym: 'K', name: 'Potassium', oct: 6, tone: '+1', x: 205, y: 635, type: 'charge' },
    { z: 20, sym: 'Ca', name: 'Calcium', oct: 6, tone: '+2', x: 165, y: 660, type: 'charge' },
    { z: 26, sym: 'Fe', name: 'Iron', oct: 6, tone: '±4', x: 130, y: 700, type: 'peak' },
    { z: 27, sym: 'Co', name: 'Cobalt', oct: 6, tone: '±4', x: 125, y: 720, type: 'peak' },
    { z: 28, sym: 'Ni', name: 'Nickel', oct: 6, tone: '-3', x: 145, y: 745, type: 'discharge' },
    { z: 29, sym: 'Cu', name: 'Copper', oct: 6, tone: '-2', x: 185, y: 770, type: 'discharge' },
    { z: 36, sym: 'Kr', name: 'Krypton', oct: 7, tone: '0', x: 260, y: 800, type: 'inert' },
    // Octave 7
    { z: 45, sym: 'Rh', name: 'Rhodium', oct: 7, tone: '±4', x: 395, y: 880, type: 'peak' },
    { z: 47, sym: 'Ag', name: 'Silver', oct: 7, tone: '-2', x: 340, y: 920, type: 'discharge' },
    { z: 54, sym: 'Xe', name: 'Xenon', oct: 8, tone: '0', x: 260, y: 960, type: 'inert' },
    // Octave 8
    { z: 71, sym: 'Lu', name: 'Lutetium', oct: 8, tone: '±4', x: 110, y: 1040, type: 'peak' },
    { z: 78, sym: 'Pt', name: 'Platinum', oct: 8, tone: '-3', x: 160, y: 1080, type: 'discharge' },
    { z: 79, sym: 'Au', name: 'Gold', oct: 8, tone: '-2', x: 195, y: 1100, type: 'discharge' },
    { z: 86, sym: 'Rn', name: 'Radon', oct: 9, tone: '0', x: 260, y: 1130, type: 'inert' },
    // Octave 9 (Radioactive Transuranics)
    { z: 92, sym: 'U', name: 'Uranium', oct: 9, tone: '-3', x: 360, y: 1200, type: 'discharge' },
    { z: 94, sym: 'Pu', name: 'Plutonium', oct: 9, tone: '±4', x: 410, y: 1230, type: 'peak' },
    { z: 118, sym: 'Og', name: 'Omeganon', oct: 9, tone: '0', x: 260, y: 1300, type: 'inert' }
  ];

  const handleElementClick = (z: number) => {
    const found = ELEMENTS_DATA.find((e) => e.atomicNumber === z);
    if (found && onSelectElement) {
      onSelectElement(found);
    }
  };

  return (
    <div id="russell-wavelength-spiral-container" className="flex flex-col bg-[#0c1519] border border-[#1f373d] rounded-xl overflow-hidden shadow-2xl">
      {/* Control Header */}
      <div className="flex flex-wrap items-center justify-between p-3 bg-[#132227] border-b border-[#1f373d] gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#8dd4c6]" />
          <div>
            <h4 className="text-sm font-semibold text-[#e3eceb] tracking-wide">
              Walter Russell's 9-Octave Wavelength-Spiral (1926)
            </h4>
            <p className="text-xs text-[#8ca09e]">
              Continuous Serpentine Cosine Wave & Zero-Motion Inertia Line
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

      {/* Main Diagram Area */}
      <div className="relative w-full h-[620px] overflow-auto bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#112328] via-[#0b1417] to-[#070d0f] flex justify-center p-4">
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out'
          }}
          className="relative w-[520px] h-[1350px]"
        >
          <svg
            viewBox="0 0 520 1350"
            className="w-full h-full overflow-visible"
            style={{ filter: 'drop-shadow(0 0 15px rgba(0,0,0,0.8))' }}
          >
            <defs>
              <linearGradient id="zeroMotionGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.8" />
              </linearGradient>

              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background grid markings & octave dividers */}
            {octaves.map((oct, idx) => {
              const yPos = 70 + idx * 135;
              return (
                <g key={`oct-bg-${oct.num}`} opacity="0.35">
                  <line
                    x1="20"
                    y1={yPos}
                    x2="500"
                    y2={yPos}
                    stroke="#23424a"
                    strokeDasharray="4 6"
                    strokeWidth="1"
                  />
                  <rect
                    x="24"
                    y={yPos - 12}
                    width="120"
                    height="18"
                    rx="4"
                    fill="#11242a"
                  />
                  <text
                    x="30"
                    y={yPos}
                    fill="#759392"
                    fontSize="9.5"
                    fontFamily="sans-serif"
                    fontWeight="600"
                  >
                    OCTAVE {oct.num}
                  </text>
                </g>
              );
            })}

            {/* Central Vertical Zero-Motion Inertia Axis */}
            <line
              x1="260"
              y1="40"
              x2="260"
              y2="1320"
              stroke="url(#zeroMotionGlow)"
              strokeWidth={highlightNobleGases ? '4' : '2'}
              strokeDasharray={highlightNobleGases ? 'none' : '3 3'}
              opacity={highlightNobleGases ? '1' : '0.6'}
            />

            <text
              x="260"
              y="30"
              fill="#93c5fd"
              fontSize="11"
              fontWeight="bold"
              textAnchor="middle"
              className="tracking-widest"
            >
              ZERO-MOTION INERTIA SPINE (NOBLE GASES)
            </text>

            {/* Sine Wave Spiral Trajectory (Continuous Serpentine Cosine Wave) */}
            <path
              d="
                M 260 70
                C 260 90, 275 110, 260 130
                C 245 150, 245 170, 260 190
                C 320 220, 320 240, 260 260
                C 140 310, 140 400, 260 435
                C 380 470, 380 570, 260 610
                C 120 660, 120 760, 260 800
                C 400 840, 400 920, 260 960
                C 100 1000, 100 1090, 260 1130
                C 420 1170, 420 1260, 260 1300
              "
              fill="none"
              stroke="#4ecdc4"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Charging (Red/Centripetal) and Discharging (Blue/Centrifugal) overlay paths */}
            {/* Octave 4 wave */}
            <path
              d="M 260 260 C 140 310, 140 360, 145 360"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="3.5"
              strokeDasharray="2 3"
              opacity="0.75"
            />
            <path
              d="M 145 360 C 140 360, 140 400, 260 435"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3.5"
              strokeDasharray="2 3"
              opacity="0.75"
            />

            {/* Peak Amplitude Indicators (Carbon, Silicon, Cobalt, Rhodium, Lutetium, Plutonium) */}
            {highlightCarbonPeak && (
              <g>
                <line x1="20" y1="360" x2="500" y2="360" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
                <rect x="25" y="348" width="130" height="22" rx="4" fill="#1e1808" stroke="#f59e0b" strokeWidth="1" />
                <text x="32" y="363" fill="#fcd34d" fontSize="10" fontWeight="bold">
                  AMPLITUDE SUMMIT (C ±4)
                </text>
              </g>
            )}

            {/* Render Key Elements on the Wave */}
            {keyNodes.map((node) => {
              const isSelected = selectedElementId === node.z;
              const isHovered = hoveredElement?.atomicNumber === node.z;
              const isPeak = node.type === 'peak';
              const isInert = node.type === 'inert';
              const isCharge = node.type === 'charge';

              let fillColor = '#38bdf8';
              let strokeColor = '#0284c7';
              let radius = 9;

              if (isInert) {
                fillColor = '#818cf8';
                strokeColor = '#c7d2fe';
                radius = 11;
              } else if (isPeak) {
                fillColor = '#f59e0b';
                strokeColor = '#fef08a';
                radius = 13;
              } else if (isCharge) {
                fillColor = '#f43f5e';
                strokeColor = '#fda4af';
              }

              return (
                <g
                  key={`node-${node.z}-${node.sym}`}
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => handleElementClick(node.z)}
                  onMouseEnter={() => {
                    const el = ELEMENTS_DATA.find((e) => e.atomicNumber === node.z);
                    if (el) setHoveredElement(el);
                  }}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  {/* Outer glow ring when selected or hovered */}
                  {(isSelected || isHovered) && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={radius + 7}
                      fill="none"
                      stroke={isPeak ? '#f59e0b' : '#38bdf8'}
                      strokeWidth="2.5"
                      className="animate-pulse"
                    />
                  )}

                  {/* Main Element Sphere */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={radius}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={isSelected ? 3 : 1.5}
                    filter="url(#glow)"
                  />

                  {/* Symbol */}
                  <text
                    x={node.x}
                    y={node.y + (node.sym.length > 2 ? 3 : 3.5)}
                    fill={isPeak ? '#18181b' : isInert ? '#0f172a' : '#ffffff'}
                    fontSize={node.sym.length > 2 ? '7.5' : '9'}
                    fontWeight="800"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                  >
                    {node.sym}
                  </text>

                  {/* Label on side */}
                  <text
                    x={node.x > 260 ? node.x + radius + 6 : node.x - radius - 6}
                    y={node.y + 3}
                    fill={isSelected ? '#ffffff' : '#b2c8c6'}
                    fontSize="9"
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    textAnchor={node.x > 260 ? 'start' : 'end'}
                    fontFamily="sans-serif"
                  >
                    {node.name} ({node.tone})
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Floating Detail Card on Hover */}
        {hoveredElement && (
          <div className="absolute top-4 right-4 max-w-xs bg-[#132227]/95 border border-[#31565f] rounded-lg p-3 shadow-xl backdrop-blur-md z-30 pointer-events-none animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-1 border-b border-[#213a41]">
              <span className="text-xs font-mono text-[#8dd4c6]">Z={hoveredElement.atomicNumber}</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-[#1f3b43] text-[#e0f2fe] font-semibold">
                Octave {hoveredElement.russellOctave}
              </span>
            </div>
            <div className="mt-1">
              <div className="text-base font-bold text-[#e3eceb]">
                {hoveredElement.name} ({hoveredElement.symbol})
              </div>
              <div className="text-xs text-[#a4b8b6] font-mono">
                Tone: {hoveredElement.russellTone} | {hoveredElement.russellCharging?.toUpperCase()}
              </div>
              <div className="text-xs text-[#8ca09e] mt-1 line-clamp-2">
                {hoveredElement.notes || hoveredElement.category}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend Footer */}
      <div className="p-3 bg-[#0e191d] border-t border-[#1f373d] flex flex-wrap items-center justify-between gap-3 text-xs text-[#9bb1af]">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#818cf8]" />
            <span>Zero-Motion Node (Noble Gases)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#f43f5e]" />
            <span>Centripetal Compression (+ Tones)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#38bdf8]" />
            <span>Centrifugal Radiation (- Tones)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
            <span>Amplitude Summit (±4 Peak Carbon / Transuranics)</span>
          </div>
        </div>
        <span className="text-[11px] text-[#6d8482] font-mono">
          Click any element to inspect in Codex
        </span>
      </div>
    </div>
  );
};
