import React, { useState } from 'react';
import { ElementData, GeometryModel } from '../../types';
import { GEOMETRY_MODELS, ELEMENTS_DATA } from '../../data/elements';
import { RussellWavelengthSpiral } from '../geometries/RussellWavelengthSpiral';
import { AkhtarAngularTable } from '../geometries/AkhtarAngularTable';
import { SheehanAbundanceCartogram } from '../geometries/SheehanAbundanceCartogram';
import { PozaToroidalMagnetosphere } from '../geometries/PozaToroidalMagnetosphere';
import { PyramidalSubshellTable } from '../geometries/PyramidalSubshellTable';
import { ConcentricRingTable } from '../geometries/ConcentricRingTable';
import { RussellVsMendeleev } from '../geometries/RussellVsMendeleev';
import { DendriticTreeTable } from '../geometries/DendriticTreeTable';
import { HarringtonPolarProjection } from '../geometries/HarringtonPolarProjection';
import { MakeevDualSpiral } from '../geometries/MakeevDualSpiral';
import { TwinConeHelicalTable } from '../geometries/TwinConeHelicalTable';
import {
  Layers,
  Split,
  Eye,
  Sliders,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2,
  Maximize2
} from 'lucide-react';

interface Props {
  onSelectElement?: (element: ElementData) => void;
  selectedElementId?: number | null;
}

export interface AlignmentPreset {
  id: string;
  name: string;
  baseModelId: string;
  overlayModelId: string;
  description: string;
  keyAlignments: string[];
  recommendedOpacity: number;
}

export const ALIGNMENT_PRESETS: AlignmentPreset[] = [
  {
    id: 'russell-vs-akhtar',
    name: 'Russell Octave Spiral ⟷ Akhtar 360° Angular',
    baseModelId: 'akhtar-angular-table',
    overlayModelId: 'russell-wavelength-spiral',
    description:
      'Aligns Russell’s 9-octave wave crests with Akhtar’s 7-period concentric tracks, synchronizing the 0°/360° Noble Gas meridian.',
    keyAlignments: [
      'Noble gas zero-phase at 0° / 360° zenith',
      'Hydrogen core anchor sits at central origin (Z=1)',
      'Octave 4 carbon pinnacle aligns with Group 14 vertical meridian',
      'Auxiliary f-block orbit matches Russell’s detached transuranic loop'
    ],
    recommendedOpacity: 0.6
  },
  {
    id: 'russell-vs-mendeleev',
    name: 'Russell 1926 Prediction ⟷ Mendeleev Rectilinear',
    baseModelId: 'russell-vs-mendeleev',
    overlayModelId: 'russell-wavelength-spiral',
    description:
      'Reveals the historical alignment where Walter Russell mapped Neptunium & Plutonium in 1926, 14 years before cyclotron synthesis.',
    keyAlignments: [
      'Plutonium node sits on the terminal generative spiral turn',
      'Mendeleev detached actinide strip aligns with Russell octave 9',
      'Continuous spiral eliminates arbitrary row breaks'
    ],
    recommendedOpacity: 0.75
  },
  {
    id: 'poza-vs-pyramid',
    name: 'Poza Magnetosphere Torus ⟷ Pyramidal 2n² Subshells',
    baseModelId: 'pyramidal-subshell-table',
    overlayModelId: 'poza-toroidal-magnetosphere',
    description:
      'Aligns Rafael Poza’s magnetic vortex loops with the step-pyramidal quantum subshell capacities (s=2, p=6, d=10, f=14).',
    keyAlignments: [
      'Toroidal vortex eye aligns with the apex Hydrogen shell (K, n=1)',
      'Blue convergent loops envelope s and d subshells',
      'Red divergent loops correspond to p and f expanding blocks',
      '2n² capacity boundaries form the toroidal isobaric boundaries'
    ],
    recommendedOpacity: 0.55
  },
  {
    id: 'concentric-vs-harrington',
    name: 'Stowe Concentric Rings ⟷ Harrington 270 AMU Projection',
    baseModelId: 'concentric-ring-table',
    overlayModelId: 'harrington-polar-projection',
    description:
      'Maps circular period orbits directly against quadratic AMU mass shells (2² to 8²), highlighting relativistic symmetry axes.',
    keyAlignments: [
      'Central Hydrogen anchor perfectly concentric at origin (0,0)',
      'Period 4 iron triad aligns with Harrington 4² shell (Z=26)',
      'Continental divide line crosses the transition metal gap'
    ],
    recommendedOpacity: 0.65
  },
  {
    id: 'sheehan-vs-mendeleev',
    name: 'Sheehan Abundance Cartogram ⟷ Standard Periodicity',
    baseModelId: 'sheehan-abundance-cartogram',
    overlayModelId: 'akhtar-angular-table',
    description:
      'Highlights the colossal volume disparity of Oxygen, Silicon, and Iron relative to the squeezed rare-earth elements.',
    keyAlignments: [
      'Hydrogen top-left dominance matches Group 1 head',
      'Oxygen and Silicon colossal blocks dominate the right p-block sector',
      'Pinched Lanthanide crevasse maps to Akhtar’s auxiliary circle boundary'
    ],
    recommendedOpacity: 0.5
  }
];

export const GeometryOverlayEngine: React.FC<Props> = ({
  onSelectElement,
  selectedElementId
}) => {
  const [activePresetId, setActivePresetId] = useState<string>(ALIGNMENT_PRESETS[0].id);
  const [overlayMode, setOverlayMode] = useState<'ghost' | 'split' | 'side-by-side'>('ghost');
  const [opacity, setOpacity] = useState<number>(0.6);
  const [splitPosition, setSplitPosition] = useState<number>(50); // percentage
  const [rotationOffset, setRotationOffset] = useState<number>(0);
  const [scaleOffset, setScaleOffset] = useState<number>(1);
  const [showAlignmentRays, setShowAlignmentRays] = useState<boolean>(true);

  const activePreset =
    ALIGNMENT_PRESETS.find((p) => p.id === activePresetId) || ALIGNMENT_PRESETS[0];

  const renderGeometry = (modelId: string) => {
    switch (modelId) {
      case 'russell-wavelength-spiral':
        return <RussellWavelengthSpiral onSelectElement={onSelectElement} selectedElementId={selectedElementId} />;
      case 'akhtar-angular-table':
        return <AkhtarAngularTable onSelectElement={onSelectElement} selectedElementId={selectedElementId} />;
      case 'sheehan-abundance-cartogram':
        return <SheehanAbundanceCartogram onSelectElement={onSelectElement} selectedElementId={selectedElementId} />;
      case 'poza-toroidal-magnetosphere':
        return <PozaToroidalMagnetosphere onSelectElement={onSelectElement} selectedElementId={selectedElementId} />;
      case 'pyramidal-subshell-table':
        return <PyramidalSubshellTable onSelectElement={onSelectElement} selectedElementId={selectedElementId} />;
      case 'concentric-ring-table':
        return <ConcentricRingTable onSelectElement={onSelectElement} selectedElementId={selectedElementId} />;
      case 'russell-vs-mendeleev':
        return <RussellVsMendeleev onSelectElement={onSelectElement} selectedElementId={selectedElementId} />;
      case 'dendritic-tree-table':
        return <DendriticTreeTable onSelectElement={onSelectElement} selectedElementId={selectedElementId} />;
      case 'harrington-polar-projection':
        return <HarringtonPolarProjection onSelectElement={onSelectElement} selectedElementId={selectedElementId} />;
      case 'makeev-dual-spiral':
        return <MakeevDualSpiral onSelectElement={onSelectElement} selectedElementId={selectedElementId} />;
      case 'twin-cone-helical':
        return <TwinConeHelicalTable onSelectElement={onSelectElement} selectedElementId={selectedElementId} />;
      default:
        return <RussellWavelengthSpiral onSelectElement={onSelectElement} selectedElementId={selectedElementId} />;
    }
  };

  const handlePresetSelect = (preset: AlignmentPreset) => {
    setActivePresetId(preset.id);
    setOpacity(preset.recommendedOpacity);
    setRotationOffset(0);
    setScaleOffset(1);
  };

  return (
    <div id="geometry-overlay-engine" className="flex flex-col bg-[#0b1417] border border-[#1d373e] rounded-xl overflow-hidden shadow-2xl">
      {/* Top Banner */}
      <div className="p-4 bg-[#112126] border-b border-[#1d373e] flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#8dd4c6]" />
            <h3 className="text-base font-bold text-[#e3eceb] tracking-wide">
              Harmonic Overlay & Alignment Engine
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#1b3d44] text-[#8dd4c6] border border-[#2b5760]">
              Multi-Model Convergence
            </span>
          </div>
          <p className="text-xs text-[#8ca09e] mt-1">
            Superimpose alternative periodic geometries to discover hidden symmetries, quantum phase alignments, and historical predictions.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center bg-[#0a1215] p-1 rounded-lg border border-[#203a42]">
          <button
            onClick={() => setOverlayMode('ghost')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              overlayMode === 'ghost'
                ? 'bg-[#1b3e46] text-[#90e0d0] font-bold shadow'
                : 'text-[#8ca09e] hover:text-[#e3eceb]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ghost Superposition</span>
          </button>
          <button
            onClick={() => setOverlayMode('split')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              overlayMode === 'split'
                ? 'bg-[#1b3e46] text-[#90e0d0] font-bold shadow'
                : 'text-[#8ca09e] hover:text-[#e3eceb]'
            }`}
          >
            <Split className="w-3.5 h-3.5" />
            <span>Split Wipe</span>
          </button>
          <button
            onClick={() => setOverlayMode('side-by-side')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              overlayMode === 'side-by-side'
                ? 'bg-[#1b3e46] text-[#90e0d0] font-bold shadow'
                : 'text-[#8ca09e] hover:text-[#e3eceb]'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Side by Side</span>
          </button>
        </div>
      </div>

      {/* Preset Selector Carousel */}
      <div className="p-3 bg-[#0d181c] border-b border-[#1d373e] overflow-x-auto flex items-center gap-2">
        <span className="text-xs font-semibold text-[#8dd4c6] uppercase tracking-wider flex-shrink-0 mr-1 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Alignment Pairs:
        </span>
        {ALIGNMENT_PRESETS.map((p) => {
          const isSelected = activePresetId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => handlePresetSelect(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-[#17333a] border-[#8dd4c6] text-[#e3eceb] shadow-md'
                  : 'bg-[#0f1d21] border-[#1f373d] text-[#8ca09e] hover:border-[#3b6670] hover:text-[#c4d6d4]'
              }`}
            >
              {p.name}
            </button>
          );
        })}
      </div>

      {/* Fine-Tuning Controls Strip */}
      <div className="p-3 bg-[#0f1d22] border-b border-[#1d373e] flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-6 flex-wrap">
          {/* Opacity slider */}
          {overlayMode === 'ghost' && (
            <div className="flex items-center gap-2">
              <span className="text-[#8ca09e] font-mono">Overlay Opacity:</span>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                className="w-28 accent-[#8dd4c6] cursor-pointer"
              />
              <span className="font-mono text-[#8dd4c6] w-8">{Math.round(opacity * 100)}%</span>
            </div>
          )}

          {/* Split position slider */}
          {overlayMode === 'split' && (
            <div className="flex items-center gap-2">
              <span className="text-[#8ca09e] font-mono">Curtain Divider:</span>
              <input
                type="range"
                min="5"
                max="95"
                step="1"
                value={splitPosition}
                onChange={(e) => setSplitPosition(parseInt(e.target.value))}
                className="w-32 accent-[#8dd4c6] cursor-pointer"
              />
              <span className="font-mono text-[#8dd4c6] w-8">{splitPosition}%</span>
            </div>
          )}

          {/* Rotation calibration */}
          <div className="flex items-center gap-2">
            <span className="text-[#8ca09e] font-mono">Angular Alignment:</span>
            <input
              type="range"
              min="-180"
              max="180"
              step="5"
              value={rotationOffset}
              onChange={(e) => setRotationOffset(parseInt(e.target.value))}
              className="w-24 accent-[#8dd4c6] cursor-pointer"
            />
            <span className="font-mono text-[#8dd4c6] w-10">{rotationOffset}°</span>
          </div>

          {/* Scale calibration */}
          <div className="flex items-center gap-2">
            <span className="text-[#8ca09e] font-mono">Scale Ratio:</span>
            <input
              type="range"
              min="0.7"
              max="1.3"
              step="0.05"
              value={scaleOffset}
              onChange={(e) => setScaleOffset(parseFloat(e.target.value))}
              className="w-24 accent-[#8dd4c6] cursor-pointer"
            />
            <span className="font-mono text-[#8dd4c6] w-10">{Math.round(scaleOffset * 100)}%</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 cursor-pointer text-[#8ca09e] hover:text-[#e3eceb]">
            <input
              type="checkbox"
              checked={showAlignmentRays}
              onChange={(e) => setShowAlignmentRays(e.target.checked)}
              className="rounded accent-[#8dd4c6]"
            />
            <span>Show Meridian Alignment Rays</span>
          </label>

          <button
            onClick={() => {
              setOpacity(activePreset.recommendedOpacity);
              setRotationOffset(0);
              setScaleOffset(1);
            }}
            className="p-1 rounded bg-[#132429] border border-[#213b42] text-[#8ca09e] hover:text-[#e3eceb] ml-2"
            title="Reset calibration"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Overlay Stage Area */}
      <div className="relative min-h-[640px] bg-[#070e10] p-4 flex items-center justify-center overflow-hidden">
        {/* Ghost Mode: Superimposed with Opacity and Transform */}
        {overlayMode === 'ghost' && (
          <div className="relative w-full max-w-5xl flex items-center justify-center">
            {/* Base Layer */}
            <div className="w-full relative z-10 opacity-90">
              {renderGeometry(activePreset.baseModelId)}
            </div>

            {/* Superimposed Overlay Layer */}
            <div
              style={{
                opacity: opacity,
                transform: `rotate(${rotationOffset}deg) scale(${scaleOffset})`,
                transformOrigin: 'center center',
                transition: 'opacity 0.1s ease-out'
              }}
              className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center mix-blend-screen"
            >
              <div className="w-full">{renderGeometry(activePreset.overlayModelId)}</div>
            </div>

            {/* Alignment Meridian Rays Indicator */}
            {showAlignmentRays && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible">
                {/* Central Vertical Axis */}
                <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.75" />
                {/* Central Horizontal Axis */}
                <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.75" />
                {/* 45° Diagonal Axes */}
                <line x1="15%" y1="15%" x2="85%" y2="85%" stroke="#f59e0b" strokeWidth="1" strokeDasharray="6 6" opacity="0.4" />
                <line x1="85%" y1="15%" x2="15%" y2="85%" stroke="#f59e0b" strokeWidth="1" strokeDasharray="6 6" opacity="0.4" />
                {/* Origin Bullseye */}
                <circle cx="50%" cy="50%" r="20" fill="none" stroke="#8dd4c6" strokeWidth="2" opacity="0.8" />
                <circle cx="50%" cy="50%" r="4" fill="#8dd4c6" />
              </svg>
            )}
          </div>
        )}

        {/* Split Wipe Mode: Split-screen horizontal curtain */}
        {overlayMode === 'split' && (
          <div className="relative w-full max-w-5xl h-[640px] overflow-hidden rounded-xl border border-[#1f373d]">
            {/* Left Layer: Base Model */}
            <div className="absolute inset-0 w-full h-full">
              {renderGeometry(activePreset.baseModelId)}
            </div>

            {/* Right Layer: Overlay Model with Clip Path */}
            <div
              style={{
                clipPath: `polygon(${splitPosition}% 0, 100% 0, 100% 100%, ${splitPosition}% 100%)`
              }}
              className="absolute inset-0 w-full h-full pointer-events-auto"
            >
              {renderGeometry(activePreset.overlayModelId)}
            </div>

            {/* Split Curtain Line */}
            <div
              style={{ left: `${splitPosition}%` }}
              className="absolute top-0 bottom-0 w-0.5 bg-[#8dd4c6] shadow-[0_0_12px_rgba(141,212,198,0.8)] z-40 pointer-events-none"
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#132227] border-2 border-[#8dd4c6] flex items-center justify-center text-[#8dd4c6] shadow-lg">
                <Split className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        )}

        {/* Side-by-Side Mode */}
        {overlayMode === 'side-by-side' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-6xl">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#8dd4c6] uppercase tracking-wider mb-2">
                Base Model: {GEOMETRY_MODELS.find((m) => m.id === activePreset.baseModelId)?.title}
              </span>
              <div className="flex-1">{renderGeometry(activePreset.baseModelId)}</div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#8dd4c6] uppercase tracking-wider mb-2">
                Overlay Model: {GEOMETRY_MODELS.find((m) => m.id === activePreset.overlayModelId)?.title}
              </span>
              <div className="flex-1">{renderGeometry(activePreset.overlayModelId)}</div>
            </div>
          </div>
        )}
      </div>

      {/* Alignment Insights Card Footer */}
      <div className="p-4 bg-[#0e191d] border-t border-[#1d373e]">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-[#8dd4c6] flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-bold text-[#e3eceb]">{activePreset.name}</h4>
            <p className="text-xs text-[#8ca09e] mt-0.5">{activePreset.description}</p>

            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
              {activePreset.keyAlignments.map((alignment, idx) => (
                <div key={`align-${idx}`} className="flex items-center gap-2 text-xs text-[#b8ccc9]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] flex-shrink-0" />
                  <span>{alignment}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
