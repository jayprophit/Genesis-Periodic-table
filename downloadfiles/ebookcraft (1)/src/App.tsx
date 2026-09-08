import React, { useState } from 'react';
import { ElementData, GeometryModel, Chapter, ChapterSection } from './types';
import { ELEMENTS_DATA, GEOMETRY_MODELS } from './data/elements';
import { CHAPTERS_DATA } from './data/chapters';

// Geometries
import { RussellWavelengthSpiral } from './components/geometries/RussellWavelengthSpiral';
import { AkhtarAngularTable } from './components/geometries/AkhtarAngularTable';
import { SheehanAbundanceCartogram } from './components/geometries/SheehanAbundanceCartogram';
import { PozaToroidalMagnetosphere } from './components/geometries/PozaToroidalMagnetosphere';
import { PyramidalSubshellTable } from './components/geometries/PyramidalSubshellTable';
import { ConcentricRingTable } from './components/geometries/ConcentricRingTable';
import { RussellVsMendeleev } from './components/geometries/RussellVsMendeleev';
import { DendriticTreeTable } from './components/geometries/DendriticTreeTable';
import { HarringtonPolarProjection } from './components/geometries/HarringtonPolarProjection';
import { MakeevDualSpiral } from './components/geometries/MakeevDualSpiral';
import { TwinConeHelicalTable } from './components/geometries/TwinConeHelicalTable';

// Overlays & Inspector
import { GeometryOverlayEngine } from './components/overlays/GeometryOverlayEngine';
import { ElementInspector } from './components/ElementInspector';

// Icons
import {
  BookOpen,
  Compass,
  Layers,
  Atom,
  Search,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Sparkles,
  Bookmark,
  Calendar,
  User,
  Info,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'ebook' | 'geometries' | 'overlays' | 'elements'>('ebook');
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [selectedGeometryId, setSelectedGeometryId] = useState<string>(GEOMETRY_MODELS[0].id);
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const currentChapter = CHAPTERS_DATA[currentChapterIndex] || CHAPTERS_DATA[0];
  const currentSection: ChapterSection | undefined = currentChapter.sections[activeSectionIndex] || currentChapter.sections[0];
  const activeGeometry = GEOMETRY_MODELS.find((g) => g.id === selectedGeometryId) || GEOMETRY_MODELS[0];

  // Helper to render individual geometry components
  const renderGeometryComponent = (modelId: string) => {
    switch (modelId) {
      case 'russell-wavelength-spiral':
        return <RussellWavelengthSpiral onSelectElement={setSelectedElement} selectedElementId={selectedElement?.atomicNumber} />;
      case 'akhtar-angular-table':
        return <AkhtarAngularTable onSelectElement={setSelectedElement} selectedElementId={selectedElement?.atomicNumber} />;
      case 'sheehan-abundance-cartogram':
        return <SheehanAbundanceCartogram onSelectElement={setSelectedElement} selectedElementId={selectedElement?.atomicNumber} />;
      case 'poza-toroidal-magnetosphere':
        return <PozaToroidalMagnetosphere onSelectElement={setSelectedElement} selectedElementId={selectedElement?.atomicNumber} />;
      case 'pyramidal-subshell-table':
        return <PyramidalSubshellTable onSelectElement={setSelectedElement} selectedElementId={selectedElement?.atomicNumber} />;
      case 'concentric-ring-table':
        return <ConcentricRingTable onSelectElement={setSelectedElement} selectedElementId={selectedElement?.atomicNumber} />;
      case 'russell-vs-mendeleev':
        return <RussellVsMendeleev onSelectElement={setSelectedElement} selectedElementId={selectedElement?.atomicNumber} />;
      case 'dendritic-tree-table':
        return <DendriticTreeTable onSelectElement={setSelectedElement} selectedElementId={selectedElement?.atomicNumber} />;
      case 'harrington-polar-projection':
        return <HarringtonPolarProjection onSelectElement={setSelectedElement} selectedElementId={selectedElement?.atomicNumber} />;
      case 'makeev-dual-spiral':
        return <MakeevDualSpiral onSelectElement={setSelectedElement} selectedElementId={selectedElement?.atomicNumber} />;
      case 'twin-cone-helical':
        return <TwinConeHelicalTable onSelectElement={setSelectedElement} selectedElementId={selectedElement?.atomicNumber} />;
      default:
        return <RussellWavelengthSpiral onSelectElement={setSelectedElement} selectedElementId={selectedElement?.atomicNumber} />;
    }
  };

  const filteredElements = ELEMENTS_DATA.filter((el) => {
    const q = searchQuery.toLowerCase();
    return (
      el.name.toLowerCase().includes(q) ||
      el.symbol.toLowerCase().includes(q) ||
      el.atomicNumber.toString() === q ||
      el.category.toLowerCase().includes(q)
    );
  });

  return (
    <div id="codex-app-root" className="min-h-screen bg-[#070e10] text-[#e3eceb] flex flex-col font-sans selection:bg-[#8dd4c6] selection:text-[#0c181b]">
      {/* Primary Top Header Navigation */}
      <header className="h-16 bg-[#0c1619] border-b border-[#1c373e] px-4 flex items-center justify-between z-40 sticky top-0 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg text-[#8ca09e] hover:text-[#e3eceb] hover:bg-[#15272c] transition-colors md:hidden"
            aria-label="Toggle sidebar navigation"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#1b3d45] to-[#0c1c20] border border-[#2d5d67] flex items-center justify-center text-[#8dd4c6] shadow-sm">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm md:text-base font-bold text-[#e3eceb] tracking-wider uppercase font-serif">
                Materials Atlas Table Codex
              </h1>
              <p className="text-[11px] text-[#769391] font-mono hidden sm:block">
                Alternative Periodic Geometries & Resonant Harmonics
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center bg-[#091215] p-1 rounded-lg border border-[#1b353b] gap-1 text-xs">
          <button
            onClick={() => setActiveTab('ebook')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all font-medium ${
              activeTab === 'ebook'
                ? 'bg-[#183941] text-[#90e0d0] font-bold shadow'
                : 'text-[#8ca09e] hover:text-[#e3eceb]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Codex Ebook</span>
          </button>

          <button
            onClick={() => setActiveTab('geometries')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all font-medium ${
              activeTab === 'geometries'
                ? 'bg-[#183941] text-[#90e0d0] font-bold shadow'
                : 'text-[#8ca09e] hover:text-[#e3eceb]'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span className="hidden sm:inline">Periodic Tables</span>
          </button>

          <button
            onClick={() => setActiveTab('overlays')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all font-medium ${
              activeTab === 'overlays'
                ? 'bg-[#183941] text-[#90e0d0] font-bold shadow'
                : 'text-[#8ca09e] hover:text-[#e3eceb]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span className="hidden sm:inline">Alignment Overlays</span>
          </button>

          <button
            onClick={() => setActiveTab('elements')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all font-medium ${
              activeTab === 'elements'
                ? 'bg-[#183941] text-[#90e0d0] font-bold shadow'
                : 'text-[#8ca09e] hover:text-[#e3eceb]'
            }`}
          >
            <Atom className="w-4 h-4" />
            <span className="hidden sm:inline">Element Atlas</span>
          </button>
        </nav>
      </header>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Table of Contents Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full w-0 md:translate-x-0 md:w-64'
          } bg-[#0a1316] border-r border-[#1a3339] flex flex-col flex-shrink-0 transition-all duration-300 z-30 overflow-y-auto`}
        >
          {activeTab === 'ebook' && (
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between text-xs text-[#789694] uppercase tracking-wider font-mono">
                <span>Codex Chapters</span>
                <span>{CHAPTERS_DATA.length} Chapters</span>
              </div>

              <div className="space-y-1">
                {CHAPTERS_DATA.map((ch, idx) => {
                  const isCurrent = currentChapterIndex === idx;
                  return (
                    <div key={ch.id} className="space-y-1">
                      <button
                        onClick={() => {
                          setCurrentChapterIndex(idx);
                          setActiveSectionIndex(0);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg text-xs transition-all border ${
                          isCurrent
                            ? 'bg-[#132c32] border-[#8dd4c6] text-[#e3eceb] font-semibold shadow-sm'
                            : 'bg-transparent border-transparent text-[#8ca09e] hover:bg-[#0e1d21] hover:text-[#cadbd9]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] text-[#719290]">{ch.number}.</span>
                          <span className="truncate">{ch.title}</span>
                        </div>
                        <span className="text-[10px] text-[#63807e] block mt-0.5 ml-5 truncate">
                          {ch.part}
                        </span>
                      </button>

                      {/* Subsections when chapter is active */}
                      {isCurrent && ch.sections.length > 1 && (
                        <div className="pl-6 space-y-1 border-l border-[#1c373e] ml-4 my-1">
                          {ch.sections.map((sec, sIdx) => {
                            const isSecActive = activeSectionIndex === sIdx;
                            return (
                              <button
                                key={sec.id}
                                onClick={() => setActiveSectionIndex(sIdx)}
                                className={`w-full text-left py-1 px-2 rounded text-[11px] transition-colors ${
                                  isSecActive
                                    ? 'text-[#8dd4c6] font-medium bg-[#0f2429]'
                                    : 'text-[#6e8886] hover:text-[#b4c8c6]'
                                }`}
                              >
                                {sec.title}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'geometries' && (
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between text-xs text-[#789694] uppercase tracking-wider font-mono">
                <span>Geometries Gallery</span>
                <span>{GEOMETRY_MODELS.length} Models</span>
              </div>

              <div className="space-y-1.5">
                {GEOMETRY_MODELS.map((geo) => {
                  const isSelected = selectedGeometryId === geo.id;
                  return (
                    <button
                      key={geo.id}
                      onClick={() => setSelectedGeometryId(geo.id)}
                      className={`w-full text-left p-2.5 rounded-lg text-xs transition-all border ${
                        isSelected
                          ? 'bg-[#132c32] border-[#8dd4c6] text-[#e3eceb] font-semibold shadow-sm'
                          : 'bg-transparent border-transparent text-[#8ca09e] hover:bg-[#0e1d21] hover:text-[#cadbd9]'
                      }`}
                    >
                      <div className="font-medium text-[#e3eceb] truncate">{geo.title}</div>
                      <div className="flex items-center justify-between text-[10px] text-[#6d8885] mt-1 font-mono">
                        <span>{geo.creator}</span>
                        <span>{geo.year}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'overlays' && (
            <div className="p-4 space-y-4">
              <div className="text-xs text-[#789694] uppercase tracking-wider font-mono">
                <span>Alignment Workflows</span>
              </div>
              <p className="text-xs text-[#8ca09e] leading-relaxed">
                Superimpose alternative periodic geometries to identify structural harmonics, continuous octave spirals, and angular subshell convergences.
              </p>
            </div>
          )}

          {activeTab === 'elements' && (
            <div className="p-4 space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#6c8684]" />
                <input
                  type="text"
                  placeholder="Search elements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#081012] border border-[#1d353b] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#e3eceb] placeholder-[#5c7573] focus:outline-none focus:border-[#8dd4c6]"
                />
              </div>

              <div className="text-[11px] text-[#6c8684] font-mono">
                Showing {filteredElements.length} of {ELEMENTS_DATA.length} elements
              </div>
            </div>
          )}
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-1 overflow-y-auto bg-[#070e10] p-4 md:p-6 lg:p-8 flex flex-col items-center">
          {/* TAB 1: CODEX EBOOK */}
          {activeTab === 'ebook' && (
            <div className="w-full max-w-4xl space-y-8 animate-in fade-in duration-200">
              {/* Chapter Meta Banner */}
              <div className="border-b border-[#1c373e] pb-6">
                <div className="flex items-center justify-between text-xs text-[#8dd4c6] font-mono mb-2">
                  <span>
                    {currentChapter.part} — CHAPTER {currentChapter.number}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      disabled={currentChapterIndex === 0}
                      onClick={() => {
                        setCurrentChapterIndex((i) => Math.max(0, i - 1));
                        setActiveSectionIndex(0);
                      }}
                      className="p-1 rounded bg-[#0f1d21] border border-[#1e373d] text-[#8ca09e] hover:text-[#e3eceb] disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Previous chapter"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      disabled={currentChapterIndex === CHAPTERS_DATA.length - 1}
                      onClick={() => {
                        setCurrentChapterIndex((i) => Math.min(CHAPTERS_DATA.length - 1, i + 1));
                        setActiveSectionIndex(0);
                      }}
                      className="p-1 rounded bg-[#0f1d21] border border-[#1e373d] text-[#8ca09e] hover:text-[#e3eceb] disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Next chapter"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#e3eceb] tracking-wide">
                  {currentChapter.title}
                </h2>
                <h3 className="text-sm md:text-base text-[#8ca09e] mt-1 italic font-serif">
                  {currentChapter.description}
                </h3>
              </div>

              {/* Section Content & Treatise */}
              {currentSection && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-2 border-b border-[#172c31]">
                    <h3 className="text-xl font-bold font-serif text-[#90e0d0]">
                      {currentSection.title}
                    </h3>
                    {currentSection.tier && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#183941] text-[#8dd4c6]">
                        [{currentSection.tier.toUpperCase()}]
                      </span>
                    )}
                  </div>

                  <div className="text-[#cadbd9] font-serif leading-relaxed text-base md:text-lg whitespace-pre-line space-y-4">
                    {currentSection.content}
                  </div>

                  {/* Summary Callout Card if present */}
                  {currentSection.summary && (
                    <div className="p-4 rounded-xl bg-[#0c1619] border border-[#1a3339] flex items-start gap-3 my-6">
                      <Bookmark className="w-5 h-5 text-[#8dd4c6] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-mono font-bold text-[#8dd4c6] uppercase tracking-wider">
                          Section Synopsis
                        </h4>
                        <p className="text-xs text-[#8ca09e] mt-1 leading-relaxed">
                          {currentSection.summary}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Embedded Interactive Geometry Figure if tied to model */}
                  {currentSection.modelId && (
                    <div className="my-8 pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-[#8dd4c6] uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" /> Interactive Codex Plate: {currentSection.title}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedGeometryId(currentSection.modelId!);
                            setActiveTab('geometries');
                          }}
                          className="text-xs text-[#8ca09e] hover:text-[#8dd4c6] flex items-center gap-1 transition-colors"
                        >
                          <span>Open Fullscreen Plate</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {renderGeometryComponent(currentSection.modelId)}
                    </div>
                  )}
                </div>
              )}

              {/* Chapter Bottom Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-[#1a3339] text-xs">
                <button
                  disabled={currentChapterIndex === 0 && activeSectionIndex === 0}
                  onClick={() => {
                    if (activeSectionIndex > 0) {
                      setActiveSectionIndex(activeSectionIndex - 1);
                    } else if (currentChapterIndex > 0) {
                      const prevCh = CHAPTERS_DATA[currentChapterIndex - 1];
                      setCurrentChapterIndex(currentChapterIndex - 1);
                      setActiveSectionIndex(prevCh.sections.length - 1);
                    }
                  }}
                  className="flex items-center gap-1 text-[#8ca09e] hover:text-[#e3eceb] disabled:opacity-30"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Section</span>
                </button>

                <button
                  disabled={
                    currentChapterIndex === CHAPTERS_DATA.length - 1 &&
                    activeSectionIndex === currentChapter.sections.length - 1
                  }
                  onClick={() => {
                    if (activeSectionIndex < currentChapter.sections.length - 1) {
                      setActiveSectionIndex(activeSectionIndex + 1);
                    } else if (currentChapterIndex < CHAPTERS_DATA.length - 1) {
                      setCurrentChapterIndex(currentChapterIndex + 1);
                      setActiveSectionIndex(0);
                    }
                  }}
                  className="flex items-center gap-1 text-[#8dd4c6] hover:text-[#9df2e2] disabled:opacity-30"
                >
                  <span>Next Section</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PERIODIC GEOMETRIES ATLAS */}
          {activeTab === 'geometries' && (
            <div className="w-full max-w-5xl space-y-6 animate-in fade-in duration-200">
              {/* Geometry Overview Details */}
              <div className="p-4 bg-[#0d181b] border border-[#1c373e] rounded-xl flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#183941] text-[#8dd4c6]">
                      {activeGeometry.geometryType}
                    </span>
                    <h3 className="text-lg font-bold text-[#e3eceb]">{activeGeometry.title}</h3>
                  </div>
                  <p className="text-xs text-[#8ca09e] mt-1 max-w-2xl">{activeGeometry.description}</p>
                </div>

                <div className="flex items-center gap-4 text-xs text-[#789694] font-mono">
                  <div>
                    <span className="block text-[10px] uppercase">Formulator</span>
                    <span className="text-[#e3eceb] font-medium">{activeGeometry.creator}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase">Year</span>
                    <span className="text-[#e3eceb] font-medium">{activeGeometry.year}</span>
                  </div>
                </div>
              </div>

              {/* Geometry Interactive Viewer */}
              {renderGeometryComponent(selectedGeometryId)}

              {/* Geometry Structural Features List */}
              <div className="p-4 bg-[#0d181b] border border-[#1c373e] rounded-xl">
                <h4 className="text-xs font-bold text-[#8dd4c6] uppercase tracking-wider mb-2 font-mono">
                  Key Structural Axioms & Geometrical Features
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#a0b8b6]">
                  {activeGeometry.keyInsights.map((insight, fIdx) => (
                    <div key={`feat-${fIdx}`} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8dd4c6]" />
                      <span>{insight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HARMONIC OVERLAY & ALIGNMENT ENGINE */}
          {activeTab === 'overlays' && (
            <div className="w-full max-w-6xl space-y-6 animate-in fade-in duration-200">
              <GeometryOverlayEngine
                onSelectElement={setSelectedElement}
                selectedElementId={selectedElement?.atomicNumber}
              />
            </div>
          )}

          {/* TAB 4: ELEMENT ATLAS INDEX */}
          {activeTab === 'elements' && (
            <div className="w-full max-w-5xl space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#0d181b] border border-[#1c373e] rounded-xl">
                <div>
                  <h3 className="text-base font-bold text-[#e3eceb]">Comprehensive Elemental Index</h3>
                  <p className="text-xs text-[#8ca09e]">
                    Click any element to inspect multi-model coordinates, abundance metrics, and historical notes.
                  </p>
                </div>
              </div>

              {/* Elements Table */}
              <div className="bg-[#0b1417] border border-[#1c373e] rounded-xl overflow-hidden shadow">
                <div className="overflow-x-auto max-h-[640px]">
                  <table className="w-full text-left text-xs text-[#a0b8b6]">
                    <thead className="bg-[#102025] text-[#8dd4c6] font-mono uppercase tracking-wider sticky top-0 border-b border-[#1c373e]">
                      <tr>
                        <th className="p-3">Z</th>
                        <th className="p-3">Symbol</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Period / Block</th>
                        <th className="p-3">Weight (u)</th>
                        <th className="p-3">Electronegativity</th>
                        <th className="p-3">Russell Octave</th>
                        <th className="p-3">Akhtar Angle</th>
                        <th className="p-3">Crust (PPM)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#152a2f]">
                      {filteredElements.map((el) => (
                        <tr
                          key={`row-${el.atomicNumber}`}
                          onClick={() => setSelectedElement(el)}
                          className="hover:bg-[#13272d] cursor-pointer transition-colors"
                        >
                          <td className="p-3 font-mono text-[#8dd4c6]">{el.atomicNumber}</td>
                          <td className="p-3 font-bold text-[#e3eceb]">{el.symbol}</td>
                          <td className="p-3 font-medium">{el.name}</td>
                          <td className="p-3 font-mono">
                            P{el.period} / {el.block.toUpperCase()}-block
                          </td>
                          <td className="p-3 font-mono">{el.atomicMass}</td>
                          <td className="p-3 font-mono">{el.electronegativity ?? '—'}</td>
                          <td className="p-3 font-mono">{el.russellOctave != null ? `Octave ${el.russellOctave}` : '—'}</td>
                          <td className="p-3 font-mono">{el.akhtarDegree != null ? `${el.akhtarDegree}°` : 'f-Aux'}</td>
                          <td className="p-3 font-mono">{el.abundanceCrustPPM.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Slide-out Element Inspector Drawer */}
      <ElementInspector
        element={selectedElement}
        onClose={() => setSelectedElement(null)}
      />
    </div>
  );
}
