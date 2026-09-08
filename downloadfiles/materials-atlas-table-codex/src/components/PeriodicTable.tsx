import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Layers, 
  Zap, 
  Thermometer, 
  Eye, 
  ChevronRight, 
  Compass, 
  Info,
  CheckCircle2,
  Table2,
  GitCompare
} from 'lucide-react';
import { ALL_ELEMENTS, MAT_RECORDS } from '../data/mat-store';
import { ElementRecord, MatDeepRecord } from '../data/types';

export type HeatmapMode = 'category' | 'block' | 'electronegativity' | 'ionization' | 'radius' | 'density' | 'melting' | 'published';

interface PeriodicTableProps {
  selectedElement: ElementRecord | null;
  onSelectElement: (el: ElementRecord) => void;
  onOpenBookChapter: (recordId: string) => void;
  onOpenVisualsForRecord: (recordId: string) => void;
  onOpenTablesForRecord: (recordId: string) => void;
  onCompareElement: (el: ElementRecord) => void;
}

const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string; label: string }> = {
  "Reference Origin": { bg: "bg-indigo-950/80 hover:bg-indigo-900/90", border: "border-indigo-400", text: "text-indigo-200", label: "Origin Reference" },
  "Reactive Nonmetal": { bg: "bg-sky-950/80 hover:bg-sky-900/90", border: "border-sky-500", text: "text-sky-200", label: "Reactive Nonmetal" },
  "Noble Gas": { bg: "bg-purple-950/80 hover:bg-purple-900/90", border: "border-purple-500", text: "text-purple-200", label: "Noble Gas" },
  "Alkali Metal": { bg: "bg-rose-950/80 hover:bg-rose-900/90", border: "border-rose-500", text: "text-rose-200", label: "Alkali Metal" },
  "Alkaline Earth Metal": { bg: "bg-amber-950/80 hover:bg-amber-900/90", border: "border-amber-500", text: "text-amber-200", label: "Alkaline Earth" },
  "Metalloid": { bg: "bg-teal-950/80 hover:bg-teal-900/90", border: "border-teal-500", text: "text-teal-200", label: "Metalloid" },
  "Halogen": { bg: "bg-emerald-950/80 hover:bg-emerald-900/90", border: "border-emerald-500", text: "text-emerald-200", label: "Halogen" },
  "Post-transition Metal": { bg: "bg-blue-950/80 hover:bg-blue-900/90", border: "border-blue-500", text: "text-blue-200", label: "Post-transition" },
  "Transition Metal": { bg: "bg-slate-800/80 hover:bg-slate-700/90", border: "border-slate-500", text: "text-slate-200", label: "Transition Metal" },
  "Lanthanide": { bg: "bg-cyan-950/80 hover:bg-cyan-900/90", border: "border-cyan-500", text: "text-cyan-200", label: "Lanthanide" },
  "Actinide": { bg: "bg-pink-950/80 hover:bg-pink-900/90", border: "border-pink-500", text: "text-pink-200", label: "Actinide" }
};

const BLOCK_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  s: { bg: "bg-rose-950/80", border: "border-rose-400", text: "text-rose-200" },
  p: { bg: "bg-sky-950/80", border: "border-sky-400", text: "text-sky-200" },
  d: { bg: "bg-amber-950/80", border: "border-amber-400", text: "text-amber-200" },
  f: { bg: "bg-emerald-950/80", border: "border-emerald-400", text: "text-emerald-200" },
  ref: { bg: "bg-indigo-950/80", border: "border-indigo-400", text: "text-indigo-200" }
};

export const PeriodicTable: React.FC<PeriodicTableProps> = ({
  selectedElement,
  onSelectElement,
  onOpenBookChapter,
  onOpenVisualsForRecord,
  onOpenTablesForRecord,
  onCompareElement
}) => {
  const [heatmapMode, setHeatmapMode] = useState<HeatmapMode>('category');
  const [filterBlock, setFilterBlock] = useState<string>('all');
  const [filterPhase, setFilterPhase] = useState<string>('all');
  const [filterOnlyPublished, setFilterOnlyPublished] = useState<boolean>(false);

  // Group elements into a 2D map: period (1..7), group (1..18)
  const periodicGrid = useMemo(() => {
    const grid: Record<string, ElementRecord> = {};
    for (const el of ALL_ELEMENTS) {
      if (el.atomicNumber === 0) continue; // Origin state handled separately
      // Lanthanides & Actinides
      if (el.atomicNumber >= 57 && el.atomicNumber <= 71) {
        grid[`lanthanide-${el.atomicNumber - 57 + 3}`] = el;
      } else if (el.atomicNumber >= 89 && el.atomicNumber <= 103) {
        grid[`actinide-${el.atomicNumber - 89 + 3}`] = el;
      } else {
        grid[`${el.period}-${el.group}`] = el;
      }
    }
    return grid;
  }, []);

  const originState = ALL_ELEMENTS.find(el => el.atomicNumber === 0);

  // Compute color based on active heatmap mode
  const getCellStyling = (el: ElementRecord | undefined) => {
    if (!el) return 'invisible pointer-events-none';

    // Filters check
    if (filterBlock !== 'all' && el.block !== filterBlock) {
      return 'opacity-20 grayscale border-slate-800 bg-slate-900/30';
    }
    if (filterPhase !== 'all' && el.phase !== filterPhase) {
      return 'opacity-20 grayscale border-slate-800 bg-slate-900/30';
    }
    if (filterOnlyPublished && !el.publishedRecord) {
      return 'opacity-25 grayscale border-slate-800 bg-slate-900/30';
    }

    const isSelected = selectedElement?.atomicNumber === el.atomicNumber;
    const selectedRing = isSelected ? 'ring-2 ring-cyan-400 scale-105 z-20 shadow-lg shadow-cyan-500/40' : '';

    if (heatmapMode === 'block') {
      const b = BLOCK_COLORS[el.block] || BLOCK_COLORS.s;
      return `${b.bg} ${b.border} ${b.text} ${selectedRing}`;
    }

    if (heatmapMode === 'published') {
      if (el.publishedRecord) {
        return `bg-gradient-to-br from-cyan-950 via-indigo-950 to-cyan-900 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/20 ${selectedRing}`;
      }
      return `bg-slate-900/60 border-slate-800 text-slate-500 ${selectedRing}`;
    }

    if (heatmapMode === 'electronegativity') {
      if (el.electronegativity === null) return `bg-slate-900/60 border-slate-800 text-slate-500 ${selectedRing}`;
      // EN ranges ~0.7 (Fr) to 4.0 (F)
      const ratio = Math.max(0, Math.min(1, (el.electronegativity - 0.7) / 3.3));
      if (ratio > 0.7) return `bg-amber-900/80 border-amber-400 text-amber-100 ${selectedRing}`;
      if (ratio > 0.4) return `bg-emerald-950/80 border-emerald-500 text-emerald-200 ${selectedRing}`;
      return `bg-sky-950/80 border-sky-500 text-sky-200 ${selectedRing}`;
    }

    if (heatmapMode === 'ionization') {
      if (el.ionizationEnergy === null) return `bg-slate-900/60 border-slate-800 text-slate-500 ${selectedRing}`;
      // IE ranges ~3.9 to 24.6 eV
      const ratio = Math.max(0, Math.min(1, (el.ionizationEnergy - 3.5) / 21));
      if (ratio > 0.6) return `bg-violet-950/80 border-violet-400 text-violet-100 ${selectedRing}`;
      if (ratio > 0.3) return `bg-blue-950/80 border-blue-500 text-blue-200 ${selectedRing}`;
      return `bg-slate-800/80 border-slate-600 text-slate-300 ${selectedRing}`;
    }

    if (heatmapMode === 'radius') {
      if (el.atomicRadius === null) return `bg-slate-900/60 border-slate-800 text-slate-500 ${selectedRing}`;
      // Radius ranges ~30 to 260 pm
      const ratio = Math.max(0, Math.min(1, (el.atomicRadius - 30) / 230));
      if (ratio > 0.6) return `bg-rose-950/80 border-rose-400 text-rose-100 ${selectedRing}`;
      if (ratio > 0.3) return `bg-amber-950/80 border-amber-500 text-amber-200 ${selectedRing}`;
      return `bg-cyan-950/80 border-cyan-500 text-cyan-200 ${selectedRing}`;
    }

    if (heatmapMode === 'melting') {
      if (el.meltingPoint === null) return `bg-slate-900/60 border-slate-800 text-slate-500 ${selectedRing}`;
      // MP ranges 0.95 to 3823 K
      const ratio = Math.max(0, Math.min(1, el.meltingPoint / 3800));
      if (ratio > 0.5) return `bg-red-950/80 border-red-400 text-red-100 ${selectedRing}`;
      if (ratio > 0.2) return `bg-orange-950/80 border-orange-500 text-orange-200 ${selectedRing}`;
      return `bg-sky-950/80 border-sky-500 text-sky-200 ${selectedRing}`;
    }

    // Default: Category
    const cat = CATEGORY_COLORS[el.category] || CATEGORY_COLORS["Transition Metal"];
    return `${cat.bg} ${cat.border} ${cat.text} ${selectedRing}`;
  };

  const getPropertyValue = (el: ElementRecord) => {
    switch (heatmapMode) {
      case 'electronegativity':
        return el.electronegativity ? `χ ${el.electronegativity}` : '—';
      case 'ionization':
        return el.ionizationEnergy ? `${el.ionizationEnergy} eV` : '—';
      case 'radius':
        return el.atomicRadius ? `${el.atomicRadius} pm` : '—';
      case 'density':
        return el.density ? `${el.density} g/cm³` : '—';
      case 'melting':
        return el.meltingPoint ? `${el.meltingPoint} K` : '—';
      case 'published':
        return el.publishedRecord ? 'RESEARCHED' : 'CATALOG';
      case 'block':
        return `block-${el.block}`;
      default:
        return el.atomicWeight ? `${typeof el.atomicWeight === 'number' ? el.atomicWeight.toFixed(2) : el.atomicWeight}` : '';
    }
  };

  // Published record matched with selected element
  const deepRecord: MatDeepRecord | undefined = selectedElement 
    ? MAT_RECORDS.find(r => r.atomicNumber === selectedElement.atomicNumber)
    : undefined;

  return (
    <div className="w-full space-y-6">
      
      {/* Top Banner: MAT Origin Reference & Control Palette */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Origin State Prominent Card */}
          <div 
            onClick={() => originState && onSelectElement(originState)}
            className={`flex items-center gap-3.5 p-3 rounded-xl border transition cursor-pointer select-none ${
              selectedElement?.atomicNumber === 0
                ? 'bg-indigo-950/90 border-indigo-400 ring-2 ring-indigo-400/50 shadow-lg shadow-indigo-500/20'
                : 'bg-slate-800/80 border-indigo-900/80 hover:border-indigo-500'
            }`}
          >
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-700 flex flex-col items-center justify-center text-white shadow-md">
              <span className="text-[10px] font-mono leading-none text-indigo-200">MAT:0000</span>
              <span className="text-base font-bold font-mono">OS</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">Origin State</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  Foundation Reference
                </span>
              </div>
              <p className="text-xs text-slate-300 max-w-sm">
                Zero-reference coordinate for vacuum energy, fields, frequencies & state space.
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 ml-auto" />
          </div>

          {/* Heatmap & Filter Controls */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
              <span className="text-slate-400 px-2 font-medium">Overlay:</span>
              <button
                id="heatmap-category"
                onClick={() => setHeatmapMode('category')}
                className={`px-2.5 py-1 rounded transition font-medium ${
                  heatmapMode === 'category' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                Category
              </button>
              <button
                id="heatmap-published"
                onClick={() => setHeatmapMode('published')}
                className={`px-2.5 py-1 rounded transition font-medium flex items-center gap-1 ${
                  heatmapMode === 'published' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                MAT Published (0–9)
              </button>
              <button
                id="heatmap-electronegativity"
                onClick={() => setHeatmapMode('electronegativity')}
                className={`px-2.5 py-1 rounded transition font-medium ${
                  heatmapMode === 'electronegativity' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                Electronegativity
              </button>
              <button
                id="heatmap-ionization"
                onClick={() => setHeatmapMode('ionization')}
                className={`px-2.5 py-1 rounded transition font-medium ${
                  heatmapMode === 'ionization' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                Ionization
              </button>
              <button
                id="heatmap-radius"
                onClick={() => setHeatmapMode('radius')}
                className={`px-2.5 py-1 rounded transition font-medium ${
                  heatmapMode === 'radius' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                Radius
              </button>
              <button
                id="heatmap-melting"
                onClick={() => setHeatmapMode('melting')}
                className={`px-2.5 py-1 rounded transition font-medium ${
                  heatmapMode === 'melting' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
              >
                Melting Point
              </button>
            </div>

            {/* Block Filter */}
            <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
              <span className="text-slate-400 px-1.5">Block:</span>
              {['all', 's', 'p', 'd', 'f'].map(b => (
                <button
                  key={b}
                  onClick={() => setFilterBlock(b)}
                  className={`px-2 py-0.5 rounded font-mono uppercase text-[11px] ${
                    filterBlock === b ? 'bg-slate-700 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>

            {/* Published Toggle */}
            <button
              onClick={() => setFilterOnlyPublished(!filterOnlyPublished)}
              className={`px-2.5 py-1.5 rounded-lg border transition flex items-center gap-1.5 font-medium ${
                filterOnlyPublished
                  ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                  : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Only Researched (0–9)
            </button>
          </div>
        </div>
      </div>

      {/* Main 18-column Periodic Grid */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 sm:p-5 shadow-2xl overflow-x-auto">
        <div className="min-w-[960px]">
          
          {/* Column numbers 1..18 */}
          <div className="grid grid-cols-18 gap-1.5 mb-2 text-center font-mono text-[10px] text-slate-500">
            {Array.from({ length: 18 }, (_, i) => (
              <div key={i + 1}>{i + 1}</div>
            ))}
          </div>

          {/* Periods 1 to 7 */}
          <div className="space-y-1.5">
            {[1, 2, 3, 4, 5, 6, 7].map(period => (
              <div key={period} className="grid grid-cols-18 gap-1.5">
                {Array.from({ length: 18 }, (_, idx) => {
                  const group = idx + 1;
                  const el = periodicGrid[`${period}-${group}`];

                  // Placeholder for Lanthanide/Actinide reference in period 6/7 group 3
                  if (period === 6 && group === 3) {
                    return (
                      <div
                        key="lanthanide-slot"
                        className="h-16 rounded border border-cyan-800/60 bg-cyan-950/40 p-1 flex flex-col justify-center items-center text-center text-cyan-400 font-mono text-[10px]"
                      >
                        <span>57–71</span>
                        <span className="text-[8px] uppercase">La–Lu</span>
                      </div>
                    );
                  }
                  if (period === 7 && group === 3) {
                    return (
                      <div
                        key="actinide-slot"
                        className="h-16 rounded border border-pink-800/60 bg-pink-950/40 p-1 flex flex-col justify-center items-center text-center text-pink-400 font-mono text-[10px]"
                      >
                        <span>89–103</span>
                        <span className="text-[8px] uppercase">Ac–Lr</span>
                      </div>
                    );
                  }

                  if (!el) {
                    return <div key={`${period}-${group}`} className="h-16" />;
                  }

                  const isPublished = el.publishedRecord;
                  const style = getCellStyling(el);

                  return (
                    <button
                      key={el.atomicNumber}
                      id={`element-cell-${el.symbol.toLowerCase()}`}
                      onClick={() => onSelectElement(el)}
                      className={`h-16 rounded border p-1 flex flex-col justify-between text-left transition-all duration-150 cursor-pointer relative group ${style}`}
                    >
                      {/* Top row: Atomic number & MAT marker */}
                      <div className="flex items-center justify-between w-full">
                        <span className="font-mono text-[10px] font-semibold text-slate-300">
                          {el.atomicNumber}
                        </span>
                        {isPublished && (
                          <span 
                            className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" 
                            title="MAT Researched Deep Record"
                          />
                        )}
                      </div>

                      {/* Center: Symbol */}
                      <div className="text-center font-mono font-bold text-sm leading-none tracking-tight">
                        {el.symbol}
                      </div>

                      {/* Bottom: Name or Property Value */}
                      <div className="truncate text-[9px] text-center w-full font-mono text-slate-400">
                        {getPropertyValue(el)}
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Spacer between main grid and F-block */}
          <div className="h-5" />

          {/* Lanthanides and Actinides rows */}
          <div className="space-y-1.5 pl-[11.1%]">
            {/* Lanthanides row */}
            <div className="grid grid-cols-15 gap-1.5">
              {Array.from({ length: 15 }, (_, idx) => {
                const z = 57 + idx;
                const el = ALL_ELEMENTS.find(e => e.atomicNumber === z);
                if (!el) return <div key={z} className="h-14" />;
                const style = getCellStyling(el);

                return (
                  <button
                    key={z}
                    onClick={() => onSelectElement(el)}
                    className={`h-14 rounded border p-1 flex flex-col justify-between text-left transition cursor-pointer ${style}`}
                  >
                    <div className="flex justify-between text-[9px] font-mono">
                      <span>{el.atomicNumber}</span>
                      <span className="text-slate-500">La*</span>
                    </div>
                    <div className="text-center font-mono font-bold text-xs">{el.symbol}</div>
                    <div className="truncate text-[8px] text-center font-mono text-slate-400">{el.name}</div>
                  </button>
                );
              })}
            </div>

            {/* Actinides row */}
            <div className="grid grid-cols-15 gap-1.5">
              {Array.from({ length: 15 }, (_, idx) => {
                const z = 89 + idx;
                const el = ALL_ELEMENTS.find(e => e.atomicNumber === z);
                if (!el) return <div key={z} className="h-14" />;
                const style = getCellStyling(el);

                return (
                  <button
                    key={z}
                    onClick={() => onSelectElement(el)}
                    className={`h-14 rounded border p-1 flex flex-col justify-between text-left transition cursor-pointer ${style}`}
                  >
                    <div className="flex justify-between text-[9px] font-mono">
                      <span>{el.atomicNumber}</span>
                      <span className="text-slate-500">Ac**</span>
                    </div>
                    <div className="text-center font-mono font-bold text-xs">{el.symbol}</div>
                    <div className="truncate text-[8px] text-center font-mono text-slate-400">{el.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Categories Legend */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-500 font-medium">Categories:</span>
              {Object.entries(CATEGORY_COLORS).map(([cat, config]) => (
                <div key={cat} className="flex items-center gap-1.5">
                  <span className={`w-3 h-3 rounded-sm border ${config.bg} ${config.border}`} />
                  <span className="text-[11px] text-slate-400">{config.label}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span>Cyan Dot = Published MAT Codex In-Depth Record (0000–0009)</span>
            </div>
          </div>

        </div>
      </div>

      {/* Selected Element Dossier Drawer / Card */}
      {selectedElement && (
        <div className="bg-slate-900 border border-slate-700/80 rounded-xl p-6 shadow-2xl animate-in fade-in duration-200">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            
            {/* Element Hero Badge */}
            <div className="flex items-center gap-5">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-950 via-slate-900 to-indigo-950 border-2 border-cyan-400 flex flex-col items-center justify-between p-2.5 shadow-xl shadow-cyan-500/20">
                <div className="flex justify-between w-full text-xs font-mono text-cyan-300">
                  <span>{selectedElement.atomicNumber}</span>
                  <span>{selectedElement.block}</span>
                </div>
                <div className="text-3xl font-bold font-mono text-white tracking-wider">
                  {selectedElement.symbol}
                </div>
                <div className="text-[10px] font-mono text-slate-400 truncate w-full text-center">
                  {selectedElement.matId}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-bold text-white tracking-tight">{selectedElement.name}</h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                    {selectedElement.category}
                  </span>
                  {selectedElement.publishedRecord && (
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      MAT Core Publication
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
                  {deepRecord 
                    ? deepRecord.summary 
                    : `Atomic weight: ${selectedElement.atomicWeight} · Ground state configuration: ${selectedElement.electronConfiguration}. Category: ${selectedElement.category}, standard state at STP: ${selectedElement.phase}.`}
                </p>

                {/* Quick stats tags */}
                <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
                  <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                    Mass: {selectedElement.atomicWeight} u
                  </span>
                  {selectedElement.electronegativity && (
                    <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                      EN: {selectedElement.electronegativity} Pauling
                    </span>
                  )}
                  {selectedElement.ionizationEnergy && (
                    <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                      IE: {selectedElement.ionizationEnergy} eV
                    </span>
                  )}
                  {selectedElement.density && (
                    <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                      ρ: {selectedElement.density} g/cm³
                    </span>
                  )}
                  {selectedElement.meltingPoint && (
                    <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                      MP: {selectedElement.meltingPoint} K
                    </span>
                  )}
                  {selectedElement.boilingPoint && (
                    <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                      BP: {selectedElement.boilingPoint} K
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Action Navigation for Dossier */}
            <div className="flex flex-wrap lg:flex-col gap-2 w-full lg:w-auto shrink-0">
              {deepRecord ? (
                <>
                  <button
                    id="open-record-chapter-btn"
                    onClick={() => onOpenBookChapter(deepRecord.id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-medium text-xs shadow-lg shadow-cyan-600/30 transition"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Read Book Chapter ({deepRecord.matId})</span>
                  </button>

                  <button
                    id="open-record-visuals-btn"
                    onClick={() => onOpenVisualsForRecord(deepRecord.id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs transition"
                  >
                    <Eye className="w-4 h-4 text-pink-400" />
                    <span>Explore Visuals ({deepRecord.visuals.length} Schematics)</span>
                  </button>

                  <button
                    id="open-record-tables-btn"
                    onClick={() => onOpenTablesForRecord(deepRecord.id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs transition"
                  >
                    <Table2 className="w-4 h-4 text-indigo-400" />
                    <span>View Tables ({deepRecord.tables.length} Scientific Tables)</span>
                  </button>
                </>
              ) : (
                <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-800 text-slate-400 text-xs text-center">
                  Standard Periodic Catalog Entry.<br />Full MAT research record scheduled.
                </div>
              )}

              <button
                id="compare-element-btn"
                onClick={() => onCompareElement(selectedElement)}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs transition"
              >
                <GitCompare className="w-4 h-4 text-purple-400" />
                <span>Add to Material Comparator</span>
              </button>
            </div>

          </div>

          {/* Deep record preview strip: sample visuals */}
          {deepRecord && deepRecord.visuals.length > 0 && (
            <div className="mt-6 pt-5 border-t border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Featured Scientific Schematics for {deepRecord.name}
                </span>
                <button
                  onClick={() => onOpenVisualsForRecord(deepRecord.id)}
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
                >
                  View all {deepRecord.visuals.length} schematics →
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {deepRecord.visuals.slice(0, 6).map((vis, vIdx) => (
                  <div 
                    key={vIdx}
                    onClick={() => onOpenVisualsForRecord(deepRecord.id)}
                    className="group bg-slate-950 border border-slate-800 rounded-lg p-2 hover:border-cyan-500 cursor-pointer transition flex flex-col justify-between"
                  >
                    <div className="h-20 flex items-center justify-center bg-slate-900/50 rounded overflow-hidden p-1">
                      <img 
                        src={vis.src} 
                        alt={vis.name}
                        className="max-h-full max-w-full object-contain filter invert opacity-90 group-hover:opacity-100 transition"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 truncate mt-1.5 font-medium group-hover:text-cyan-300">
                      {vis.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
