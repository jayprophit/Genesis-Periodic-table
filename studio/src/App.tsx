import { useState, useEffect, useCallback } from 'react';
import { BookTree } from './components/BookTree';
import { LivePreview } from './components/LivePreview';
import { Inspector } from './components/Inspector';
import { StatusBar } from './components/StatusBar';
import { PeriodicView } from './components/PeriodicView';
import { loadData, loadElementRecord, MATData, ElementData, RecordData, ElementRecord, VisualManifest, GraphManifest, TableManifest } from './data-loader';

type NavMode = 'tree' | 'periodic';
type WorkflowMode = 'write' | 'design' | 'data' | 'review' | 'preview' | 'export';

export default function App() {
  const [data, setData] = useState<MATData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [navMode, setNavMode] = useState<NavMode>('tree');
  const [workflowMode, setWorkflowMode] = useState<WorkflowMode>('write');
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<RecordData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'curated' | 'baseline'>('all');

  // Structured record data
  const [elementRecord, setElementRecord] = useState<{
    master: ElementRecord | null;
    visuals: VisualManifest | null;
    graphs: GraphManifest | null;
    tables: TableManifest | null;
  } | null>(null);
  const [recordLoading, setRecordLoading] = useState(false);

  useEffect(() => {
    loadData()
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Load structured record when element is selected
  useEffect(() => {
    if (!selectedElement) {
      setElementRecord(null);
      return;
    }

    setRecordLoading(true);
    loadElementRecord(selectedElement)
      .then(record => {
        setElementRecord(record);
        setRecordLoading(false);
      })
      .catch(() => {
        setElementRecord(null);
        setRecordLoading(false);
      });
  }, [selectedElement]);

  const handleSelectElement = useCallback((element: ElementData) => {
    setSelectedElement(element);
    if (data) {
      const record = data.records.find(r => r.mat === element.matId);
      setSelectedRecord(record || null);
    }
  }, [data]);

  const handleSelectRecord = useCallback((record: RecordData) => {
    setSelectedRecord(record);
    if (data) {
      const element = data.elements.find(e => e.matId === record.mat);
      setSelectedElement(element || null);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950 text-gray-100">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-sm text-gray-400">Loading MAT publication data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950 text-gray-100">
        <div className="text-center max-w-md">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-lg font-semibold text-red-400 mb-2">MAT Studio could not load publication data.</h2>
          <p className="text-sm text-gray-400 mb-4">{error}</p>
          <div className="bg-gray-800 rounded p-4 text-xs text-gray-300 font-mono">
            Expected: data/publication/generated/*.json<br/>
            Try: npm run prepare:studio
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-gray-900">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-amber-400">MAT</span>
            <span className="text-sm text-gray-400">Studio</span>
          </div>
          <div className="h-4 w-px bg-gray-700"></div>
          <nav className="flex gap-1">
            {(['write', 'design', 'data', 'review', 'preview', 'export'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setWorkflowMode(mode)}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  workflowMode === mode
                    ? 'bg-amber-400 text-black font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search element… (Ctrl+K)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-1 text-sm bg-gray-800 border border-gray-700 rounded text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-400 w-48"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
            className="px-2 py-1 text-sm bg-gray-800 border border-gray-700 rounded text-gray-300"
          >
            <option value="all">All</option>
            <option value="curated">Curated</option>
            <option value="baseline">Baseline</option>
          </select>
          <div className="text-xs text-gray-500">v0.2.0</div>
        </div>
      </header>

      {/* Main workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel: Book Tree or Periodic Table */}
        <aside className="w-72 border-r border-gray-800 overflow-y-auto bg-gray-900/50">
          <div className="flex items-center gap-1 p-2 border-b border-gray-800">
            <button
              onClick={() => setNavMode('tree')}
              className={`flex-1 px-2 py-1 text-xs rounded ${navMode === 'tree' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Tree
            </button>
            <button
              onClick={() => setNavMode('periodic')}
              className={`flex-1 px-2 py-1 text-xs rounded ${navMode === 'periodic' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Periodic
            </button>
          </div>
          {navMode === 'tree' ? (
            <BookTree
              elements={data?.elements || []}
              records={data?.records || []}
              selectedElement={selectedElement}
              searchQuery={searchQuery}
              filterStatus={filterStatus}
              onSelectElement={handleSelectElement}
              onSelectRecord={handleSelectRecord}
            />
          ) : (
            <PeriodicView
              elements={data?.elements || []}
              selectedElement={selectedElement}
              onSelectElement={handleSelectElement}
            />
          )}
        </aside>

        {/* Center: Live Preview */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <LivePreview
            element={selectedElement}
            record={selectedRecord}
            workflowMode={workflowMode}
            allRecords={data?.records || []}
            elementRecord={elementRecord}
            recordLoading={recordLoading}
          />
        </main>

        {/* Right panel: Inspector */}
        <aside className="w-80 border-l border-gray-800 overflow-y-auto bg-gray-900/50">
          <Inspector
            element={selectedElement}
            record={selectedRecord}
            workflowMode={workflowMode}
            elementRecord={elementRecord}
          />
        </aside>
      </div>

      {/* Status bar */}
      <StatusBar
        elementCount={data?.elements.length || 0}
        curatedCount={data?.elements.filter(e => e.recordStatus === 'CURATED').length || 0}
        baselineCount={data?.elements.filter(e => e.recordStatus === 'BASELINE').length || 0}
        selectedElement={selectedElement}
      />
    </div>
  );
}
