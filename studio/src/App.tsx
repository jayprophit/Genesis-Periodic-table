import { useState, useEffect } from 'react';
import { BookTree } from './components/BookTree';
import { LivePreview } from './components/LivePreview';
import { Inspector } from './components/Inspector';
import { StatusBar } from './components/StatusBar';

interface MATRecord {
  id: string;
  mat: string;
  name: string;
  number: string;
  section: string;
  items: Array<{ id: string; title: string }>;
}

export default function App() {
  const [records, setRecords] = useState<MATRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'book' | 'data' | 'preview' | 'validate' | 'export'>('book');

  useEffect(() => {
    fetch('./manifest.json')
      .then((r) => r.json())
      .then((m) => {
        const atlas = m.chapters?.find((s: { section: string }) => s.section === 'Material Atlas Table');
        if (atlas) setRecords(atlas.items as MATRecord[]);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-gray-100">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-gray-900">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-amber-400">MAT</span>
          <span className="text-sm text-gray-400">Studio</span>
        </div>
        <nav className="flex gap-1">
          {(['book', 'data', 'preview', 'validate', 'export'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-sm rounded ${activeTab === tab ? 'bg-amber-400 text-black font-semibold' : 'text-gray-400 hover:text-white'}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
        <div className="text-xs text-gray-500">v0.1.0</div>
      </header>

      {/* Main workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Book tree */}
        <aside className="w-64 border-r border-gray-800 overflow-y-auto bg-gray-900/50">
          <BookTree
            records={records}
            selectedRecord={selectedRecord}
            onSelectRecord={setSelectedRecord}
            onSelectChapter={setSelectedChapter}
          />
        </aside>

        {/* Live preview */}
        <main className="flex-1 overflow-y-auto bg-white">
          <LivePreview
            selectedChapter={selectedChapter}
            selectedRecord={selectedRecord}
          />
        </main>

        {/* Inspector */}
        <aside className="w-72 border-l border-gray-800 overflow-y-auto bg-gray-900/50">
          <Inspector
            selectedChapter={selectedChapter}
            selectedRecord={selectedRecord}
          />
        </aside>
      </div>

      {/* Status bar */}
      <StatusBar
        recordCount={records.length}
        selectedRecord={selectedRecord}
      />
    </div>
  );
}
