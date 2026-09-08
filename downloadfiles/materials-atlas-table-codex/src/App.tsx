/**
 * Materials Atlas Table Codex (MAT) - Digital Book & Periodic System
 * Authoritative scientific publication and multidimensional explorer
 */

import React, { useState } from 'react';
import { Header, AppMode, ThemeMode } from './components/Header';
import { PeriodicTable } from './components/PeriodicTable';
import { EBookReader } from './components/EBookReader';
import { ChartsStudio } from './components/ChartsStudio';
import { VisualsGallery } from './components/VisualsGallery';
import { TablesCodex } from './components/TablesCodex';
import { MaterialComparator } from './components/MaterialComparator';
import { ALL_ELEMENTS } from './data/mat-store';
import { ElementRecord, VisualItem } from './data/types';
import { Sparkles, BookOpen, Grid3X3, BarChart3, Image as ImageIcon, Table2, GitCompare } from 'lucide-react';

export default function App() {
  const [currentMode, setCurrentMode] = useState<AppMode>('book');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [currentChapterId, setCurrentChapterId] = useState<string>('cover');
  const [selectedElement, setSelectedElement] = useState<ElementRecord | null>(() => {
    return ALL_ELEMENTS.find(e => e.atomicNumber === 1) || null; // Default to Hydrogen
  });
  const [comparatorElements, setComparatorElements] = useState<ElementRecord[]>(() => {
    return [
      ALL_ELEMENTS.find(e => e.symbol === 'H')!,
      ALL_ELEMENTS.find(e => e.symbol === 'He')!,
      ALL_ELEMENTS.find(e => e.symbol === 'C')!
    ].filter(Boolean);
  });

  // Navigation handlers
  const handleOpenBookChapter = (recordIdOrDocId: string) => {
    setCurrentChapterId(recordIdOrDocId);
    setCurrentMode('book');
  };

  const handleSelectElement = (el: ElementRecord) => {
    setSelectedElement(el);
    setCurrentMode('periodic');
  };

  const handleOpenVisualsForRecord = (recordId: string) => {
    setCurrentMode('visuals');
  };

  const handleOpenTablesForRecord = (recordId: string) => {
    setCurrentMode('tables');
  };

  const handleCompareElement = (el: ElementRecord) => {
    if (!comparatorElements.some(e => e.atomicNumber === el.atomicNumber)) {
      setComparatorElements(prev => [...prev, el]);
    }
    setCurrentMode('comparator');
  };

  const handleInspectVisualFromReader = (vis: VisualItem) => {
    setCurrentMode('visuals');
  };

  // Background style based on theme
  const getAppBgClass = () => {
    if (theme === 'light') return 'bg-slate-100 text-slate-900';
    if (theme === 'parchment') return 'bg-[#f4efe4] text-[#2c2824]';
    return 'bg-slate-950 text-slate-100';
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${getAppBgClass()}`}>
      
      {/* Top Application Header & Search */}
      <Header
        currentMode={currentMode}
        onSelectMode={setCurrentMode}
        theme={theme}
        onToggleTheme={setTheme}
        onSelectElement={handleSelectElement}
        onOpenChapter={handleOpenBookChapter}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-6">
        {currentMode === 'book' && (
          <EBookReader
            currentChapterId={currentChapterId}
            onSelectChapter={setCurrentChapterId}
            onInspectVisual={handleInspectVisualFromReader}
            onSelectElement={(z) => {
              const el = ALL_ELEMENTS.find(e => e.atomicNumber === z);
              if (el) handleSelectElement(el);
            }}
            theme={theme}
          />
        )}

        {currentMode === 'periodic' && (
          <PeriodicTable
            selectedElement={selectedElement}
            onSelectElement={setSelectedElement}
            onOpenBookChapter={handleOpenBookChapter}
            onOpenVisualsForRecord={handleOpenVisualsForRecord}
            onOpenTablesForRecord={handleOpenTablesForRecord}
            onCompareElement={handleCompareElement}
          />
        )}

        {currentMode === 'charts' && (
          <ChartsStudio />
        )}

        {currentMode === 'visuals' && (
          <VisualsGallery
            onOpenBookChapter={handleOpenBookChapter}
          />
        )}

        {currentMode === 'tables' && (
          <TablesCodex
            onOpenBookChapter={handleOpenBookChapter}
          />
        )}

        {currentMode === 'comparator' && (
          <MaterialComparator
            initialElements={comparatorElements}
            onOpenBookChapter={handleOpenBookChapter}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-cyan-500 flex items-center justify-center text-[10px] text-black font-bold font-mono">
              M
            </div>
            <span>Materials Atlas Table Codex (MAT) · Peer-reviewed Science & Materials Knowledge Base</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>118 Elements Catalogued</span>
            <span>·</span>
            <span>10 Deep Research Chapters</span>
            <span>·</span>
            <span>172 Visual Schematics</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
