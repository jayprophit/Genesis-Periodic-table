import React, { useState, useRef, useEffect } from 'react';
import { 
  BookOpen, 
  Grid3X3, 
  BarChart3, 
  Image as ImageIcon, 
  Table2, 
  GitCompare, 
  Search, 
  Sun, 
  Moon, 
  BookmarkCheck,
  Compass,
  X
} from 'lucide-react';
import { ALL_ELEMENTS, MAT_RECORDS } from '../data/mat-store';
import { ElementRecord } from '../data/types';

export type AppMode = 'book' | 'periodic' | 'charts' | 'visuals' | 'tables' | 'comparator';
export type ThemeMode = 'dark' | 'light' | 'parchment';

interface HeaderProps {
  currentMode: AppMode;
  onSelectMode: (mode: AppMode) => void;
  theme: ThemeMode;
  onToggleTheme: (theme: ThemeMode) => void;
  onSelectElement: (element: ElementRecord) => void;
  onOpenChapter: (chapterId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  theme,
  onToggleTheme,
  onSelectElement,
  onOpenChapter
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Keyboard shortcut Ctrl+K / Cmd+K to search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      } else if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  const filteredElements = searchQuery.trim() === '' ? [] : ALL_ELEMENTS.filter(el => 
    el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    el.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    el.matId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    el.atomicNumber.toString() === searchQuery.trim() ||
    el.category.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 8);

  const filteredRecords = searchQuery.trim() === '' ? [] : MAT_RECORDS.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.summary.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 4);

  const nextTheme: ThemeMode = theme === 'dark' ? 'light' : theme === 'light' ? 'parchment' : 'dark';

  return (
    <header className="sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-200 border-slate-700/50 bg-slate-900/90 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => onSelectMode('book')}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/20">
              <span className="font-mono text-sm tracking-wider">MAT</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">Materials Atlas Table</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  Codex 1.0
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Multidimensional Atlas of Matter, States & Transformations
              </p>
            </div>
          </div>

          {/* Navigation Mode Tabs */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              id="nav-ebook-reader"
              onClick={() => onSelectMode('book')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                currentMode === 'book'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Digital Book</span>
            </button>

            <button
              id="nav-periodic-table"
              onClick={() => onSelectMode('periodic')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                currentMode === 'periodic'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Grid3X3 className="w-4 h-4 text-amber-400" />
              <span>Periodic Table</span>
            </button>

            <button
              id="nav-charts-studio"
              onClick={() => onSelectMode('charts')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                currentMode === 'charts'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>Charts & Graphs</span>
            </button>

            <button
              id="nav-visuals-gallery"
              onClick={() => onSelectMode('visuals')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                currentMode === 'visuals'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-pink-400" />
              <span>Visuals (172+)</span>
            </button>

            <button
              id="nav-tables-codex"
              onClick={() => onSelectMode('tables')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                currentMode === 'tables'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Table2 className="w-4 h-4 text-indigo-400" />
              <span>Tables</span>
            </button>

            <button
              id="nav-comparator"
              onClick={() => onSelectMode('comparator')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                currentMode === 'comparator'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <GitCompare className="w-4 h-4 text-purple-400" />
              <span>Comparator</span>
            </button>
          </nav>

          {/* Search Button & Theme Switcher */}
          <div className="flex items-center gap-2">
            <button
              id="open-search-button"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition"
              title="Search matter, properties, sources (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Search MAT...</span>
              <kbd className="hidden sm:inline text-[10px] font-mono bg-slate-900 px-1.5 py-0.5 rounded text-slate-400 border border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <button
              id="toggle-theme-button"
              onClick={() => onToggleTheme(nextTheme)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 transition"
              title={`Switch theme (currently ${theme})`}
            >
              {theme === 'dark' ? (
                <Moon className="w-4 h-4 text-indigo-400" />
              ) : theme === 'light' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Compass className="w-4 h-4 text-emerald-400" />
              )}
            </button>
          </div>

        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1 border-t border-slate-800 no-scrollbar">
          {(['book', 'periodic', 'charts', 'visuals', 'tables', 'comparator'] as AppMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => onSelectMode(mode)}
              className={`px-2.5 py-1 rounded text-xs whitespace-nowrap font-medium transition ${
                currentMode === mode
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {mode === 'book' && 'E-Book'}
              {mode === 'periodic' && 'Periodic'}
              {mode === 'charts' && 'Charts'}
              {mode === 'visuals' && 'Visuals'}
              {mode === 'tables' && 'Tables'}
              {mode === 'comparator' && 'Compare'}
            </button>
          ))}
        </div>
      </div>

      {/* Global Search Modal Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center px-4 py-3 border-b border-slate-800">
              <Search className="w-5 h-5 text-cyan-400 mr-3" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search matter, elements, properties, MAT ID (e.g. Carbon, H, MAT:0006, 17.42 eV)..."
                className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
              />
              <button 
                onClick={() => setSearchOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-800/50">
              {searchQuery.trim() === '' ? (
                <div className="p-6 text-center text-xs text-slate-400">
                  Type an element name, symbol, atomic number, or property to explore the Materials Atlas Table.
                  <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                    {['Hydrogen', 'Helium', 'Carbon', 'Superfluid', 'Origin State', 'Diamond', 'PTFE', 'Allotropes'].map(term => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-mono"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {filteredRecords.length > 0 && (
                    <div className="p-2">
                      <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider px-2">
                        Researched MAT Records
                      </span>
                      <div className="mt-1 space-y-1">
                        {filteredRecords.map(r => (
                          <div
                            key={r.id}
                            onClick={() => {
                              onOpenChapter(r.id);
                              setSearchOpen(false);
                            }}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800 cursor-pointer transition"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 rounded bg-cyan-950 border border-cyan-800 flex items-center justify-center font-bold text-cyan-300 font-mono text-sm">
                                {r.symbol}
                              </span>
                              <div>
                                <div className="text-sm font-semibold text-white flex items-center gap-2">
                                  {r.name}
                                  <span className="text-xs font-mono text-cyan-400">{r.matId}</span>
                                </div>
                                <p className="text-xs text-slate-400 line-clamp-1">{r.summary}</p>
                              </div>
                            </div>
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                              {r.visuals.length} visuals · {r.tables.length} tables
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredElements.length > 0 && (
                    <div className="p-2">
                      <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider px-2">
                        Periodic Table Elements
                      </span>
                      <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-1">
                        {filteredElements.map(el => (
                          <div
                            key={el.atomicNumber}
                            onClick={() => {
                              onSelectElement(el);
                              setSearchOpen(false);
                            }}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800 cursor-pointer transition"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-7 h-7 rounded bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-200 font-mono text-xs">
                                {el.symbol}
                              </span>
                              <div>
                                <div className="text-xs font-semibold text-white">
                                  {el.name} <span className="text-slate-400 font-mono text-[10px]">Z={el.atomicNumber}</span>
                                </div>
                                <span className="text-[10px] text-slate-400">{el.category}</span>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono text-cyan-400">
                              {el.matId}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredRecords.length === 0 && filteredElements.length === 0 && (
                    <div className="p-8 text-center text-xs text-slate-400">
                      No matching records or elements found for &quot;{searchQuery}&quot;.
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="p-2 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-500 px-4">
              <span>Press <kbd className="font-mono bg-slate-800 px-1 rounded text-slate-400">ESC</kbd> to close</span>
              <span>MAT Codex Scientific Registry</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
