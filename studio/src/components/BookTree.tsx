interface BookTreeProps {
  records: Array<{
    id: string;
    mat: string;
    name: string;
    number: string;
    section: string;
    items: Array<{ id: string; title: string }>;
  }>;
  selectedRecord: string | null;
  onSelectRecord: (id: string) => void;
  onSelectChapter: (id: string) => void;
}

export function BookTree({ records, selectedRecord, onSelectRecord, onSelectChapter }: BookTreeProps) {
  return (
    <div className="p-3">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Book Tree</h2>
      <div className="space-y-1">
        {records.map((rec) => (
          <div key={rec.id}>
            <button
              onClick={() => onSelectRecord(rec.id)}
              className={`w-full text-left px-2 py-1.5 text-sm rounded ${selectedRecord === rec.id ? 'bg-amber-400/20 text-amber-300' : 'text-gray-300 hover:bg-gray-800'}`}
            >
              <span className="font-mono text-xs text-gray-500 mr-2">{rec.mat}</span>
              {rec.name}
            </button>
            {selectedRecord === rec.id && (
              <div className="ml-4 mt-1 space-y-0.5 border-l border-gray-700 pl-2">
                {rec.items?.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSelectChapter(item.id)}
                    className="w-full text-left px-2 py-1 text-xs text-gray-400 hover:text-white hover:bg-gray-800 rounded"
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
