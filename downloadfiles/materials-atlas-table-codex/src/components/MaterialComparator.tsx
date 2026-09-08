import React, { useState } from 'react';
import { 
  GitCompare, 
  Plus, 
  X, 
  Sparkles, 
  ArrowRightLeft, 
  BookOpen, 
  ExternalLink 
} from 'lucide-react';
import { ALL_ELEMENTS, MAT_RECORDS } from '../data/mat-store';
import { ElementRecord } from '../data/types';

interface MaterialComparatorProps {
  initialElements?: ElementRecord[];
  onOpenBookChapter: (recordId: string) => void;
}

export const MaterialComparator: React.FC<MaterialComparatorProps> = ({
  initialElements = [],
  onOpenBookChapter
}) => {
  const [selectedElements, setSelectedElements] = useState<ElementRecord[]>(() => {
    if (initialElements.length > 0) return initialElements;
    // Default presets: Hydrogen and Helium and Carbon
    const h = ALL_ELEMENTS.find(e => e.symbol === 'H')!;
    const he = ALL_ELEMENTS.find(e => e.symbol === 'He')!;
    const c = ALL_ELEMENTS.find(e => e.symbol === 'C')!;
    return [h, he, c];
  });

  const [addSelectorOpen, setAddSelectorOpen] = useState(false);

  const addElement = (el: ElementRecord) => {
    if (selectedElements.some(e => e.atomicNumber === el.atomicNumber)) return;
    if (selectedElements.length >= 4) return;
    setSelectedElements([...selectedElements, el]);
    setAddSelectorOpen(false);
  };

  const removeElement = (atomicNumber: number) => {
    if (selectedElements.length <= 1) return;
    setSelectedElements(selectedElements.filter(e => e.atomicNumber !== atomicNumber));
  };

  // Preset comparison sets
  const loadPreset = (symbols: string[]) => {
    const list = symbols
      .map(s => ALL_ELEMENTS.find(e => e.symbol === s))
      .filter((e): e is ElementRecord => !!e);
    setSelectedElements(list);
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Presets */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-purple-950 border border-purple-800 text-purple-400">
                <GitCompare className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Multidimensional Material Comparator
                </h2>
                <p className="text-xs text-slate-400">
                  Side-by-side comparative analysis of atomic configurations, quantum potentials, and thermodynamics.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-medium mr-1">Presets:</span>
            <button
              onClick={() => loadPreset(['H', 'He'])}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              H vs He
            </button>
            <button
              onClick={() => loadPreset(['Li', 'Be'])}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              Li vs Be
            </button>
            <button
              onClick={() => loadPreset(['C', 'Si', 'N'])}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              C vs Si vs N
            </button>
            <button
              onClick={() => loadPreset(['O', 'F', 'Cl'])}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              O vs F vs Cl
            </button>
          </div>
        </div>

        {/* Add Element bar */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
          <span className="text-xs text-slate-400">Comparing {selectedElements.length} / 4 elements:</span>
          {selectedElements.length < 4 && (
            <div className="relative">
              <button
                onClick={() => setAddSelectorOpen(!addSelectorOpen)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-600/80 hover:bg-purple-500 text-white text-xs font-medium transition shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Element</span>
              </button>

              {addSelectorOpen && (
                <div className="absolute top-8 left-0 z-30 w-72 bg-slate-950 border border-slate-700 rounded-xl p-3 shadow-2xl max-h-72 overflow-y-auto">
                  <div className="text-[11px] font-mono text-slate-400 mb-2 font-bold uppercase">
                    Choose Element to Add:
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    {ALL_ELEMENTS.filter(e => e.atomicNumber > 0).map(el => (
                      <button
                        key={el.atomicNumber}
                        onClick={() => addElement(el)}
                        disabled={selectedElements.some(e => e.atomicNumber === el.atomicNumber)}
                        className={`p-1.5 rounded text-xs font-mono font-bold transition flex flex-col items-center ${
                          selectedElements.some(e => e.atomicNumber === el.atomicNumber)
                            ? 'opacity-30 bg-slate-900 cursor-not-allowed text-slate-500'
                            : 'bg-slate-800 hover:bg-purple-900 hover:text-white text-slate-200'
                        }`}
                      >
                        <span className="text-[9px] text-slate-400">{el.atomicNumber}</span>
                        <span>{el.symbol}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Side-by-Side Comparison Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl overflow-x-auto">
        <div className="min-w-[700px]">
          
          {/* Header Row: Element Cards */}
          <div className="grid grid-cols-5 gap-4 pb-6 border-b border-slate-800">
            <div className="text-xs font-mono text-slate-500 font-bold uppercase flex items-center">
              Material Parameters
            </div>

            {selectedElements.map(el => {
              const rec = MAT_RECORDS.find(r => r.atomicNumber === el.atomicNumber);
              return (
                <div key={el.atomicNumber} className="relative bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                  {selectedElements.length > 1 && (
                    <button
                      onClick={() => removeElement(el.atomicNumber)}
                      className="absolute top-2 right-2 p-1 text-slate-500 hover:text-white rounded hover:bg-slate-800 transition"
                      title="Remove"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded bg-cyan-950 border border-cyan-800 flex items-center justify-center font-bold text-cyan-300 font-mono text-sm">
                      {el.symbol}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-tight">{el.name}</h4>
                      <span className="text-[10px] font-mono text-slate-400">{el.matId}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Z: {el.atomicNumber}</span>
                    <span className="text-slate-400">Block-{el.block}</span>
                  </div>

                  {rec && (
                    <button
                      onClick={() => onOpenBookChapter(rec.id)}
                      className="mt-2.5 w-full py-1 rounded bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 text-[10px] font-mono flex items-center justify-center gap-1 transition"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>Read Chapter</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Metric Comparison Rows */}
          <div className="divide-y divide-slate-800 text-xs">
            
            {/* Category */}
            <div className="grid grid-cols-5 gap-4 py-3 items-center">
              <span className="text-slate-400 font-medium">Chemical Classification</span>
              {selectedElements.map(el => (
                <div key={el.atomicNumber} className="text-white font-mono">
                  {el.category}
                </div>
              ))}
            </div>

            {/* Electron Configuration */}
            <div className="grid grid-cols-5 gap-4 py-3 items-center">
              <span className="text-slate-400 font-medium">Ground Configuration</span>
              {selectedElements.map(el => (
                <div key={el.atomicNumber} className="text-cyan-300 font-mono">
                  {el.electronConfiguration}
                </div>
              ))}
            </div>

            {/* Atomic Weight */}
            <div className="grid grid-cols-5 gap-4 py-3 items-center">
              <span className="text-slate-400 font-medium">Atomic Weight (u)</span>
              {selectedElements.map(el => (
                <div key={el.atomicNumber} className="text-white font-mono font-bold">
                  {el.atomicWeight}
                </div>
              ))}
            </div>

            {/* Electronegativity */}
            <div className="grid grid-cols-5 gap-4 py-3 items-center">
              <span className="text-slate-400 font-medium">Electronegativity (Pauling)</span>
              {selectedElements.map(el => {
                const en = el.electronegativity;
                const widthPercent = en ? Math.min(100, (en / 4.0) * 100) : 0;
                return (
                  <div key={el.atomicNumber} className="space-y-1">
                    <div className="font-mono font-bold text-amber-300">
                      {en !== null ? en : '—'}
                    </div>
                    {en !== null && (
                      <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-amber-400 h-full rounded-full" 
                          style={{ width: `${widthPercent}%` }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 1st Ionization Energy */}
            <div className="grid grid-cols-5 gap-4 py-3 items-center">
              <span className="text-slate-400 font-medium">1st Ionization Energy (eV)</span>
              {selectedElements.map(el => {
                const ie = el.ionizationEnergy;
                const widthPercent = ie ? Math.min(100, (ie / 25.0) * 100) : 0;
                return (
                  <div key={el.atomicNumber} className="space-y-1">
                    <div className="font-mono font-bold text-violet-300">
                      {ie !== null ? `${ie} eV` : '—'}
                    </div>
                    {ie !== null && (
                      <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-violet-400 h-full rounded-full" 
                          style={{ width: `${widthPercent}%` }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Atomic Radius */}
            <div className="grid grid-cols-5 gap-4 py-3 items-center">
              <span className="text-slate-400 font-medium">Atomic Radius (pm)</span>
              {selectedElements.map(el => {
                const r = el.atomicRadius;
                const widthPercent = r ? Math.min(100, (r / 260.0) * 100) : 0;
                return (
                  <div key={el.atomicNumber} className="space-y-1">
                    <div className="font-mono font-bold text-emerald-300">
                      {r !== null ? `${r} pm` : '—'}
                    </div>
                    {r !== null && (
                      <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-400 h-full rounded-full" 
                          style={{ width: `${widthPercent}%` }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Density */}
            <div className="grid grid-cols-5 gap-4 py-3 items-center">
              <span className="text-slate-400 font-medium">Density (g/cm³)</span>
              {selectedElements.map(el => (
                <div key={el.atomicNumber} className="text-white font-mono">
                  {el.density !== null ? `${el.density} g/cm³` : '—'}
                </div>
              ))}
            </div>

            {/* Melting Point */}
            <div className="grid grid-cols-5 gap-4 py-3 items-center">
              <span className="text-slate-400 font-medium">Melting Point (K)</span>
              {selectedElements.map(el => (
                <div key={el.atomicNumber} className="text-red-300 font-mono">
                  {el.meltingPoint !== null ? `${el.meltingPoint} K` : '—'}
                </div>
              ))}
            </div>

            {/* Boiling Point */}
            <div className="grid grid-cols-5 gap-4 py-3 items-center">
              <span className="text-slate-400 font-medium">Boiling Point (K)</span>
              {selectedElements.map(el => (
                <div key={el.atomicNumber} className="text-orange-300 font-mono">
                  {el.boilingPoint !== null ? `${el.boilingPoint} K` : '—'}
                </div>
              ))}
            </div>

            {/* Universe Abundance */}
            <div className="grid grid-cols-5 gap-4 py-3 items-center">
              <span className="text-slate-400 font-medium">Cosmic Abundance</span>
              {selectedElements.map(el => (
                <div key={el.atomicNumber} className="text-sky-300 font-mono">
                  {el.universeAbundance ? `${el.universeAbundance}%` : 'Trace'}
                </div>
              ))}
            </div>

            {/* Earth Crust Abundance */}
            <div className="grid grid-cols-5 gap-4 py-3 items-center">
              <span className="text-slate-400 font-medium">Earth's Crust (ppm)</span>
              {selectedElements.map(el => (
                <div key={el.atomicNumber} className="text-white font-mono">
                  {el.crustAbundance ? `${el.crustAbundance} ppm` : 'Trace'}
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
