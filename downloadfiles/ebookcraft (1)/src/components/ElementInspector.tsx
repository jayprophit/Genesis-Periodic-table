import React from 'react';
import { ElementData } from '../types';
import { X, Atom, Compass, Activity, BarChart2, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

interface Props {
  element: ElementData | null;
  onClose: () => void;
}

export const ElementInspector: React.FC<Props> = ({ element, onClose }) => {
  if (!element) return null;

  return (
    <div
      id="element-inspector-panel"
      className="fixed inset-y-0 right-0 w-full max-w-md bg-[#0c1619]/95 backdrop-blur-xl border-l border-[#1f373e] shadow-2xl z-50 flex flex-col transition-all duration-300 animate-in slide-in-from-right"
    >
      {/* Drawer Header */}
      <div className="p-4 bg-[#112227] border-b border-[#1f373e] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#19333a] border border-[#2d565f] flex items-center justify-center text-[#8dd4c6] font-bold text-lg font-serif shadow-inner">
            {element.symbol}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#e3eceb]">{element.name}</h3>
              <span className="text-xs font-mono text-[#8dd4c6]">Z = {element.atomicNumber}</span>
            </div>
            <p className="text-xs text-[#8ca09e] capitalize">{element.category.replace('-', ' ')}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-[#8ca09e] hover:text-[#e3eceb] hover:bg-[#182e34] transition-colors"
          title="Close panel"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Body Scroll */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Core Physical & Electronic Parameters */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-[#0e1b1f] border border-[#1d353b]">
            <span className="text-[11px] text-[#789694] block uppercase tracking-wider font-mono">Standard Atomic Weight</span>
            <span className="text-sm font-semibold text-[#e3eceb] font-mono">{element.atomicMass} u</span>
          </div>

          <div className="p-3 rounded-lg bg-[#0e1b1f] border border-[#1d353b]">
            <span className="text-[11px] text-[#789694] block uppercase tracking-wider font-mono">Electronegativity (Pauling)</span>
            <span className="text-sm font-semibold text-[#e3eceb] font-mono">
              {element.electronegativity ? element.electronegativity : 'N/A'}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[#0e1b1f] border border-[#1d353b]">
            <span className="text-[11px] text-[#789694] block uppercase tracking-wider font-mono">Electron Configuration</span>
            <span className="text-xs font-semibold text-[#8dd4c6] font-mono break-all">
              {element.electronConfiguration}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[#0e1b1f] border border-[#1d353b]">
            <span className="text-[11px] text-[#789694] block uppercase tracking-wider font-mono">Quantum Period & Block</span>
            <span className="text-sm font-semibold text-[#e3eceb] font-mono">
              Period {element.period}, {element.block.toUpperCase()}-block (Gr. {element.group})
            </span>
          </div>
        </div>

        {/* Abundance Stats (Sheehan Cartogram Metric) */}
        <div className="p-4 rounded-xl bg-[#0f1d21] border border-[#1e383f]">
          <div className="flex items-center gap-2 mb-3">
            <BarChart2 className="w-4 h-4 text-[#8dd4c6]" />
            <h4 className="text-xs font-bold text-[#e3eceb] uppercase tracking-wider">
              Relative Abundance (Sheehan Metrics)
            </h4>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <div className="flex justify-between text-[#8ca09e] mb-1">
                <span>Earth Crust Abundance:</span>
                <span className="font-mono text-[#e3eceb]">{element.abundanceCrustPPM.toLocaleString()} PPM</span>
              </div>
              <div className="w-full bg-[#16272b] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#10b981] h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, Math.max(1, (Math.log10(element.abundanceCrustPPM + 1) / 5.7) * 100))}%` }}
                />
              </div>
            </div>

            <div className="pt-2">
              <div className="flex justify-between text-[#8ca09e] mb-1">
                <span>Cosmic Abundance:</span>
                <span className="font-mono text-[#e3eceb]">{element.abundanceCosmicPPM.toLocaleString()} PPM</span>
              </div>
              <div className="w-full bg-[#16272b] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#38bdf8] h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, Math.max(1, (Math.log10(element.abundanceCosmicPPM + 1) / 6.0) * 100))}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Alternative Geometries Cross-Mapping Matrix */}
        <div className="p-4 rounded-xl bg-[#0f1d21] border border-[#1e383f]">
          <div className="flex items-center gap-2 mb-3">
            <Compass className="w-4 h-4 text-[#8dd4c6]" />
            <h4 className="text-xs font-bold text-[#e3eceb] uppercase tracking-wider">
              Codex Geometry Coordinates
            </h4>
          </div>

          <div className="space-y-2.5 text-xs text-[#9bb1af]">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#182b30]">
              <span className="text-[#789694]">Walter Russell Octave Wave:</span>
              <span className="font-mono text-[#8dd4c6] font-semibold">
                Octave {element.russellOctave ?? '—'} (Tone {element.russellTone ?? '—'})
              </span>
            </div>

            <div className="flex items-center justify-between pb-1.5 border-b border-[#182b30]">
              <span className="text-[#789694]">Kamal Akhtar Angular Meridian:</span>
              <span className="font-mono text-[#8dd4c6] font-semibold">
                {element.akhtarDegree != null ? `${element.akhtarDegree}°` : 'Tangent Auxiliary f-Orbit'}
              </span>
            </div>

            <div className="flex items-center justify-between pb-1.5 border-b border-[#182b30]">
              <span className="text-[#789694]">Pyramidal Shell (2n² Law):</span>
              <span className="font-mono text-[#8dd4c6] font-semibold">
                Shell n={element.period} ({2 * Math.pow(element.period, 2)} e⁻ capacity)
              </span>
            </div>

            <div className="flex items-center justify-between pb-1.5 border-b border-[#182b30]">
              <span className="text-[#789694]">Poza Magnetosphere Resonance:</span>
              <span className="font-mono text-[#8dd4c6] font-semibold uppercase">
                {element.block === 's' || element.block === 'd' ? 'Magnetic Convergent Loop' : 'Electric Divergent Loop'}
              </span>
            </div>
          </div>
        </div>

        {/* Discovery & Historical Context */}
        <div className="p-4 rounded-xl bg-[#112227] border border-[#213f47]">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-[#f59e0b]" />
            <h4 className="text-xs font-bold text-[#e3eceb] uppercase tracking-wider">
              Historical Discovery & Prediction
            </h4>
          </div>
          <p className="text-xs text-[#b0c4c2] leading-relaxed">
            Discovered in <span className="text-[#f59e0b] font-semibold">{element.yearDiscovered}</span> by{' '}
            <span className="text-[#e3eceb] font-semibold">{element.discoverer}</span>.
          </p>

          {element.atomicNumber === 94 && (
            <div className="mt-2.5 p-2.5 rounded bg-[#2e1215] border border-[#651e26] text-[11px] text-[#fca5a5] leading-normal">
              <span className="font-bold block text-[#f87171] mb-0.5">Historical Codex Highlight:</span>
              Walter Russell's 1926 spiral predicted Plutonium (element 94) under the name "Uridium", placed at the 9th octave wave crest 14 years before its physical synthesis in 1940 by Seaborg.
            </div>
          )}

          {element.atomicNumber === 92 && (
            <div className="mt-2.5 p-2.5 rounded bg-[#17252a] border border-[#20444d] text-[11px] text-[#8dd4c6] leading-normal">
              <span className="font-bold block text-[#90e0d0] mb-0.5">Historical Codex Highlight:</span>
              Russell mapped Uranium as the generative apex of Octave 9, prior to the post-uranium harmonic decays.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
