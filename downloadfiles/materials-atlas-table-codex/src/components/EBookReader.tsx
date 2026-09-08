import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  BookmarkCheck, 
  Type, 
  ListOrdered, 
  FileText, 
  Image as ImageIcon, 
  Table2, 
  Share2, 
  Sparkles,
  ExternalLink,
  Search,
  Maximize2
} from 'lucide-react';
import { MAT_RECORDS, MAT_DOCS } from '../data/mat-store';
import { MatDeepRecord, DocChapter, VisualItem, TableItem } from '../data/types';
import { ThemeMode } from './Header';

interface EBookReaderProps {
  currentChapterId: string;
  onSelectChapter: (chapterId: string) => void;
  onInspectVisual: (vis: VisualItem) => void;
  onSelectElement: (atomicNumber: number) => void;
  theme: ThemeMode;
}

export const EBookReader: React.FC<EBookReaderProps> = ({
  currentChapterId,
  onSelectChapter,
  onInspectVisual,
  onSelectElement,
  theme
}) => {
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans' | 'mono'>('serif');
  const [bookmarkedChapters, setBookmarkedChapters] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'prose' | 'visuals' | 'tables'>('prose');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Determine current chapter (either a Front Matter Doc or a Deep Element Record)
  const isDoc = MAT_DOCS.some(d => d.id === currentChapterId);
  const currentDoc: DocChapter | undefined = MAT_DOCS.find(d => d.id === currentChapterId);
  const currentRecord: MatDeepRecord | undefined = MAT_RECORDS.find(r => r.id === currentChapterId);

  // All ordered chapters list for pagination
  const allChapters = [
    ...MAT_DOCS.map(d => ({ id: d.id, title: d.title, type: 'doc' as const, badge: 'FRONT MATTER' })),
    ...MAT_RECORDS.map(r => ({ id: r.id, title: `${r.matId} — ${r.name} (${r.symbol})`, type: 'record' as const, badge: r.class }))
  ];

  const currentIndex = allChapters.findIndex(c => c.id === currentChapterId);
  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

  const isBookmarked = bookmarkedChapters.includes(currentChapterId);

  const toggleBookmark = () => {
    setBookmarkedChapters(prev => 
      prev.includes(currentChapterId) 
        ? prev.filter(id => id !== currentChapterId) 
        : [...prev, currentChapterId]
    );
  };

  // Keyboard navigation for previous/next chapter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowLeft' && prevChapter) {
        onSelectChapter(prevChapter.id);
      } else if (e.key === 'ArrowRight' && nextChapter) {
        onSelectChapter(nextChapter.id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevChapter, nextChapter, onSelectChapter]);

  // Reader styling tokens based on theme
  const getThemeStyles = () => {
    if (theme === 'light') {
      return {
        bg: 'bg-white text-slate-800',
        card: 'bg-slate-50 border-slate-200',
        sidebar: 'bg-slate-100 border-slate-200 text-slate-700',
        muted: 'text-slate-500',
        highlight: 'bg-cyan-50 border-cyan-200 text-cyan-900',
        border: 'border-slate-200',
        code: 'bg-slate-100 text-slate-800 border-slate-300'
      };
    }
    if (theme === 'parchment') {
      return {
        bg: 'bg-[#f8f5ee] text-[#2c2824]',
        card: 'bg-[#eee8dc] border-[#ded5c4]',
        sidebar: 'bg-[#ede7da] border-[#ded5c4] text-[#4a4238]',
        muted: 'text-[#7a6f62]',
        highlight: 'bg-[#e2d8c3] border-[#cfc1a5] text-[#2c2824]',
        border: 'border-[#ded5c4]',
        code: 'bg-[#e8e0ce] text-[#332e26] border-[#cfc1a5]'
      };
    }
    // Dark Obsidian
    return {
      bg: 'bg-slate-950 text-slate-200',
      card: 'bg-slate-900 border-slate-800',
      sidebar: 'bg-slate-900 border-slate-800 text-slate-300',
      muted: 'text-slate-400',
      highlight: 'bg-cyan-950/60 border-cyan-800 text-cyan-200',
      border: 'border-slate-800',
      code: 'bg-slate-900 text-cyan-300 border-slate-800'
    };
  };

  const ts = getThemeStyles();

  const fontClass = 
    fontFamily === 'serif' ? 'font-reader-serif' :
    fontFamily === 'sans' ? 'font-reader-sans' : 'font-reader-mono';

  const sizeClass =
    fontSize === 'sm' ? 'text-sm leading-relaxed' :
    fontSize === 'base' ? 'text-base leading-relaxed' :
    fontSize === 'lg' ? 'text-lg leading-relaxed' : 'text-xl leading-loose';

  // Basic formatting helper for markdown prose
  const renderMarkdownProse = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBuffer: string[] = [];

    lines.forEach((line, index) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${index}`} className={`p-4 rounded-lg my-4 overflow-x-auto text-xs font-mono ${ts.code}`}>
              <code>{codeBuffer.join('\n')}</code>
            </pre>
          );
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-3xl font-bold tracking-tight mt-8 mb-4 border-b pb-2 border-slate-700/60 font-sans">
            {line.replace('# ', '')}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-2xl font-bold tracking-tight mt-7 mb-3 text-cyan-400 font-sans">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-xl font-semibold mt-5 mb-2 font-sans">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={index} className="pl-4 py-1.5 my-3 border-l-4 border-cyan-500 italic text-slate-300 bg-cyan-950/20 rounded-r">
            {line.replace('> ', '')}
          </blockquote>
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={index} className="ml-6 list-disc my-1">
            {line.replace('- ', '')}
          </li>
        );
      } else if (line.trim() === '---') {
        elements.push(<hr key={index} className="my-6 border-slate-700/60" />);
      } else if (line.trim().length > 0) {
        elements.push(
          <p key={index} className="my-2.5">
            {line}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <div className={`w-full rounded-2xl border shadow-2xl flex flex-col md:flex-row min-h-[800px] overflow-hidden ${ts.bg} ${ts.border}`}>
      
      {/* Table of Contents Sidebar */}
      <aside className={`w-full md:w-80 shrink-0 border-r flex flex-col ${ts.sidebar} ${ts.border} ${sidebarOpen ? 'block' : 'hidden md:block'}`}>
        
        {/* Book Title Banner */}
        <div className="p-4 border-b border-inherit">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <h2 className="font-bold text-sm tracking-tight">MAT Codex Table of Contents</h2>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            A living scientific publication of matter & states.
          </p>
        </div>

        {/* Chapters Navigation List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          
          {/* Section: Front Matter */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-cyan-400 px-2">
              Part I · Foundations & Context
            </span>
            <div className="mt-1.5 space-y-1">
              {MAT_DOCS.map(doc => (
                <button
                  key={doc.id}
                  onClick={() => onSelectChapter(doc.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition ${
                    currentChapterId === doc.id
                      ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                      : 'hover:bg-slate-800/40 text-slate-300 hover:text-white'
                  }`}
                >
                  <span className="truncate">{doc.title}</span>
                  {bookmarkedChapters.includes(doc.id) && (
                    <BookmarkCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Section: Published Records (0000 to 0009) */}
          <div>
            <div className="flex items-center justify-between px-2 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-amber-400">
                Part II · Researched Records
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-800">
                10 Published
              </span>
            </div>
            
            <div className="mt-1.5 space-y-1">
              {MAT_RECORDS.map(record => (
                <button
                  key={record.id}
                  onClick={() => onSelectChapter(record.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition ${
                    currentChapterId === record.id
                      ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                      : 'hover:bg-slate-800/40 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-mono text-[10px] opacity-75">{record.matId}</span>
                    <span className="truncate">{record.name}</span>
                    <span className="font-mono text-[10px] font-bold">({record.symbol})</span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 ml-1">
                    {bookmarkedChapters.includes(record.id) && (
                      <BookmarkCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    )}
                    <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-slate-800 text-slate-400">
                      {record.visuals.length} figs
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Section: Reference Metadata */}
          <div className="pt-3 border-t border-inherit">
            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-slate-500 px-2">
              Book Specification
            </span>
            <div className="mt-2 text-[11px] text-slate-400 px-2 space-y-1">
              <div>Schema: MAT 1.0.0</div>
              <div>Authority: Peer-reviewed NIST / IUPAC / CRC</div>
              <div>Total Schematics: 172 SVG files</div>
            </div>
          </div>

        </div>

      </aside>

      {/* Main Chapter Reading Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* Reader Top Controls Toolbar */}
        <div className={`p-4 border-b flex flex-wrap items-center justify-between gap-3 sticky top-0 z-10 backdrop-blur-md ${ts.bg} ${ts.border}`}>
          
          {/* Breadcrumb & Chapter Title */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-cyan-400">
              {isDoc ? 'Front Matter' : currentRecord?.matId}
            </span>
            <h1 className="text-sm font-bold truncate max-w-xs sm:max-w-md">
              {isDoc ? currentDoc?.title : `${currentRecord?.name} (${currentRecord?.symbol})`}
            </h1>
          </div>

          {/* Reader Preferences (Font Size, Serif/Sans, Bookmark) */}
          <div className="flex items-center gap-2">
            
            {/* Font Family Switcher */}
            <div className="flex items-center bg-slate-800/80 rounded-lg p-0.5 border border-slate-700 text-xs">
              <button
                onClick={() => setFontFamily('serif')}
                className={`px-2 py-1 rounded font-reader-serif ${fontFamily === 'serif' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'}`}
                title="Serif font (Editorial)"
              >
                Serif
              </button>
              <button
                onClick={() => setFontFamily('sans')}
                className={`px-2 py-1 rounded font-reader-sans ${fontFamily === 'sans' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'}`}
                title="Sans font (Modern)"
              >
                Sans
              </button>
              <button
                onClick={() => setFontFamily('mono')}
                className={`px-2 py-1 rounded font-reader-mono ${fontFamily === 'mono' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'}`}
                title="Monospace font (Technical)"
              >
                Mono
              </button>
            </div>

            {/* Font Size Scaling */}
            <div className="flex items-center bg-slate-800/80 rounded-lg p-0.5 border border-slate-700 text-xs">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-2 py-1 rounded ${fontSize === 'sm' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'}`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-2 py-1 rounded ${fontSize === 'base' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-2 py-1 rounded ${fontSize === 'lg' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'}`}
              >
                A+
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={toggleBookmark}
              className={`p-2 rounded-lg border transition ${
                isBookmarked 
                  ? 'bg-amber-950 text-amber-400 border-amber-700' 
                  : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
              }`}
              title={isBookmarked ? 'Bookmarked' : 'Add bookmark'}
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Content Container */}
        <div className="p-6 sm:p-10 max-w-4xl mx-auto w-full flex-1">
          
          {/* If Deep Record: Show Mode Tabs (Prose, Visuals Gallery, Tables) */}
          {currentRecord && (
            <div className="mb-8">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <button
                  onClick={() => setActiveTab('prose')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    activeTab === 'prose' 
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Chapter Prose & Theory</span>
                </button>

                <button
                  onClick={() => setActiveTab('visuals')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    activeTab === 'visuals' 
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Visuals & Schematics ({currentRecord.visuals.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('tables')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    activeTab === 'tables' 
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Table2 className="w-4 h-4" />
                  <span>Scientific Tables ({currentRecord.tables.length})</span>
                </button>

                <button
                  onClick={() => onSelectElement(currentRecord.atomicNumber)}
                  className="ml-auto text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1"
                >
                  <span>Locate on Periodic Grid</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Record Summary Dossier Box */}
              <div className={`p-4 rounded-xl border mt-4 ${ts.card}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold font-sans">{currentRecord.name}</h2>
                      <span className="font-mono text-cyan-400 font-bold">[{currentRecord.symbol}]</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                        {currentRecord.matId}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{currentRecord.summary}</p>
                  </div>

                  <div className="text-right font-mono text-xs text-slate-400 shrink-0">
                    <div>Z: <span className="text-white font-bold">{currentRecord.atomicNumber}</span></div>
                    <div>Mass: <span className="text-white">{currentRecord.atomicWeight}</span></div>
                    <div>Ground: <span className="text-cyan-400">{currentRecord.electronConfig}</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: Prose View */}
          {(!currentRecord || activeTab === 'prose') && (
            <article className={`${fontClass} ${sizeClass}`}>
              {isDoc && currentDoc && renderMarkdownProse(currentDoc.content)}
              {currentRecord && renderMarkdownProse(currentRecord.prose)}
            </article>
          )}

          {/* TAB 2: Visuals Gallery View for Record */}
          {currentRecord && activeTab === 'visuals' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  {currentRecord.visuals.length} Official Schematics & Figures
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  Click any schematic to inspect full-scale
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentRecord.visuals.map((vis, vIdx) => (
                  <div
                    key={vIdx}
                    onClick={() => onInspectVisual(vis)}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-3 hover:border-cyan-500 cursor-pointer transition flex flex-col justify-between group shadow-md"
                  >
                    <div className="h-44 bg-slate-950 rounded-lg p-2 flex items-center justify-center overflow-hidden border border-slate-800/80 group-hover:border-slate-700">
                      <img 
                        src={vis.src} 
                        alt={vis.name}
                        className="max-h-full max-w-full object-contain filter invert opacity-90 group-hover:opacity-100 transition"
                      />
                    </div>
                    <div className="mt-3">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 uppercase">
                        {vis.category}
                      </span>
                      <h4 className="text-xs font-medium text-slate-200 mt-1.5 line-clamp-2 group-hover:text-cyan-300">
                        {vis.name}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Scientific Tables View for Record */}
          {currentRecord && activeTab === 'tables' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  {currentRecord.tables.length} Scientific Data Tables
                </h3>
              </div>

              <div className="space-y-6">
                {currentRecord.tables.map((tbl, tIdx) => (
                  <div key={tIdx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md">
                    <h4 className="text-base font-bold text-cyan-300 mb-3 font-sans">
                      {tbl.title}
                    </h4>

                    {tbl.parsed ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse font-mono">
                          <thead>
                            <tr className="border-b border-slate-700 bg-slate-950/60">
                              {tbl.parsed.headers.map((h, hIdx) => (
                                <th key={hIdx} className="py-2.5 px-3 font-semibold text-slate-300 uppercase text-[10px]">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60">
                            {tbl.parsed.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-slate-800/40">
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="py-2 px-3 text-slate-300 whitespace-nowrap">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <pre className="text-xs font-mono text-slate-300 p-3 bg-slate-950 rounded overflow-x-auto whitespace-pre-wrap">
                        {tbl.raw}
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chapter Bottom Pagination Bar */}
          <div className="mt-12 pt-6 border-t border-slate-800 flex items-center justify-between">
            {prevChapter ? (
              <button
                id="prev-chapter-btn"
                onClick={() => onSelectChapter(prevChapter.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous: {prevChapter.title}</span>
              </button>
            ) : <div />}

            {nextChapter ? (
              <button
                id="next-chapter-btn"
                onClick={() => onSelectChapter(nextChapter.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition shadow-lg shadow-cyan-600/30"
              >
                <span>Next: {nextChapter.title}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : <div />}
          </div>

        </div>

      </main>

    </div>
  );
};
