import React, { useState, useMemo } from 'react';
import { 
  Image as ImageIcon, 
  Search, 
  Filter, 
  Eye, 
  X, 
  Download, 
  BookOpen, 
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';
import { MAT_RECORDS } from '../data/mat-store';
import { VisualItem, MatDeepRecord } from '../data/types';

interface VisualsGalleryProps {
  onOpenBookChapter: (recordId: string) => void;
}

export const VisualsGallery: React.FC<VisualsGalleryProps> = ({ onOpenBookChapter }) => {
  const [selectedElementFilter, setSelectedElementFilter] = useState<string>('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalVisual, setActiveModalVisual] = useState<{ visual: VisualItem; record: MatDeepRecord } | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Flatten all visuals with their parent record reference
  const allVisualsWithRecord = useMemo(() => {
    const list: { visual: VisualItem; record: MatDeepRecord }[] = [];
    for (const record of MAT_RECORDS) {
      for (const visual of record.visuals) {
        list.push({ visual, record });
      }
    }
    return list;
  }, []);

  // Collect distinct categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const item of allVisualsWithRecord) {
      set.add(item.visual.category);
    }
    return Array.from(set).sort();
  }, [allVisualsWithRecord]);

  // Filtered visuals
  const filteredVisuals = useMemo(() => {
    return allVisualsWithRecord.filter(({ visual, record }) => {
      if (selectedElementFilter !== 'all' && record.id !== selectedElementFilter) {
        return false;
      }
      if (selectedCategoryFilter !== 'all' && visual.category !== selectedCategoryFilter) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return (
          visual.name.toLowerCase().includes(q) ||
          record.name.toLowerCase().includes(q) ||
          record.symbol.toLowerCase().includes(q) ||
          visual.category.toLowerCase().includes(q) ||
          visual.file.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allVisualsWithRecord, selectedElementFilter, selectedCategoryFilter, searchQuery]);

  return (
    <div className="space-y-6">
      
      {/* Header & Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-pink-950 border border-pink-800 text-pink-400">
                <ImageIcon className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Materials Atlas Visual Schematics & Figures
                </h2>
                <p className="text-xs text-slate-400">
                  Authentic scientific SVG diagrams, orbital density fields, spectra, and process transformations.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
              Showing <strong className="text-pink-400">{filteredVisuals.length}</strong> of {allVisualsWithRecord.length} figures
            </span>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-800 text-xs">
          
          {/* Search input */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search figure name, process, orbital..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Element Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">Record:</span>
            <select
              value={selectedElementFilter}
              onChange={(e) => setSelectedElementFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Elements (0–9)</option>
              {MAT_RECORDS.map(r => (
                <option key={r.id} value={r.id}>
                  {r.matId}: {r.name} ({r.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">Category:</span>
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Grid of Visual Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredVisuals.map(({ visual, record }, idx) => (
          <div
            key={idx}
            onClick={() => {
              setActiveModalVisual({ visual, record });
              setZoomLevel(1);
            }}
            className="group bg-slate-900 border border-slate-800 rounded-xl p-3 hover:border-cyan-500 cursor-pointer transition-all duration-150 flex flex-col justify-between shadow-md hover:shadow-cyan-500/10"
          >
            {/* SVG Image Preview Container with high contrast inverted render */}
            <div className="h-44 bg-slate-950 rounded-lg p-2.5 flex items-center justify-center overflow-hidden border border-slate-800/80 group-hover:border-slate-700 relative">
              <img
                src={visual.src}
                alt={visual.name}
                loading="lazy"
                className="max-h-full max-w-full object-contain filter invert opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-200"
              />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition p-1 rounded bg-slate-900/80 text-cyan-300">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Visual Metadata Footer */}
            <div className="mt-3 space-y-1">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 uppercase">
                  {visual.category}
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  {record.symbol} ({record.matId})
                </span>
              </div>
              <h3 className="text-xs font-semibold text-slate-200 line-clamp-2 group-hover:text-cyan-300 transition">
                {visual.name}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {filteredVisuals.length === 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-slate-400">
          No schematics match the selected filters or search query.
        </div>
      )}

      {/* High-Resolution Schematic Lightbox Modal */}
      {activeModalVisual && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center font-bold text-cyan-300 font-mono text-sm">
                  {activeModalVisual.record.symbol}
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {activeModalVisual.visual.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                    <span>{activeModalVisual.record.matId}</span>
                    <span>·</span>
                    <span className="text-cyan-400">{activeModalVisual.visual.category}</span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomLevel(prev => Math.max(0.6, prev - 0.2))}
                  className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.2))}
                  className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    onOpenBookChapter(activeModalVisual.record.id);
                    setActiveModalVisual(null);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium ml-2"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Go to Chapter</span>
                </button>

                <button
                  onClick={() => setActiveModalVisual(null)}
                  className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white border border-slate-700 ml-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Body with Zoom */}
            <div className="flex-1 bg-slate-950 p-6 overflow-auto flex items-center justify-center min-h-[400px]">
              <div 
                style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.15s ease-out' }}
                className="max-w-full max-h-full flex items-center justify-center"
              >
                <img
                  src={activeModalVisual.visual.src}
                  alt={activeModalVisual.visual.name}
                  className="max-h-[68vh] max-w-full object-contain filter invert"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono px-5">
              <span>Path: {activeModalVisual.visual.src}</span>
              <a 
                href={activeModalVisual.visual.src} 
                download={activeModalVisual.visual.file}
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save SVG</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
