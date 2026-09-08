interface InspectorProps {
  selectedChapter: string | null;
  selectedRecord: string | null;
}

export function Inspector({ selectedChapter, selectedRecord }: InspectorProps) {
  if (!selectedChapter && !selectedRecord) {
    return (
      <div className="p-3">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Inspector</h2>
        <p className="text-xs text-gray-500">Select a chapter to inspect its properties.</p>
      </div>
    );
  }

  return (
    <div className="p-3">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Inspector</h2>
      <div className="space-y-3">
        <div className="bg-gray-800/50 rounded p-3">
          <h3 className="text-xs font-semibold text-gray-300 mb-2">Page</h3>
          <div className="space-y-1 text-xs text-gray-400">
            <div>ID: <span className="text-gray-200 font-mono">{selectedChapter || selectedRecord}</span></div>
            <div>Status: <span className="text-amber-400">Pending</span></div>
          </div>
        </div>
        <div className="bg-gray-800/50 rounded p-3">
          <h3 className="text-xs font-semibold text-gray-300 mb-2">Publication</h3>
          <div className="space-y-1 text-xs text-gray-400">
            <div>Figures: <span className="text-gray-200">0</span></div>
            <div>Tables: <span className="text-gray-200">0</span></div>
            <div>Sources: <span className="text-gray-200">0</span></div>
          </div>
        </div>
        <div className="bg-gray-800/50 rounded p-3">
          <h3 className="text-xs font-semibold text-gray-300 mb-2">Evidence</h3>
          <div className="space-y-1 text-xs text-gray-400">
            <div>Lane: <span className="text-gray-200">—</span></div>
            <div>Confidence: <span className="text-gray-200">—</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
