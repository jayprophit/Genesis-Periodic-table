interface StatusBarProps {
  recordCount: number;
  selectedRecord: string | null;
}

export function StatusBar({ recordCount, selectedRecord }: StatusBarProps) {
  return (
    <footer className="flex items-center justify-between px-4 py-1.5 border-t border-gray-800 bg-gray-900 text-xs text-gray-500">
      <div className="flex gap-4">
        <span>Records: <span className="text-gray-300">{recordCount}</span></span>
        <span>Sources: <span className="text-gray-300">—</span></span>
        <span>Figures: <span className="text-gray-300">—</span></span>
        <span>Warnings: <span className="text-gray-300">—</span></span>
      </div>
      <div>
        {selectedRecord ? (
          <span className="text-amber-400">{selectedRecord}</span>
        ) : (
          <span>No record selected</span>
        )}
      </div>
    </footer>
  );
}
