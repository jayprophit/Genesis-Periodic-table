import { useMemo } from 'react';
import { ElementData, RecordData } from '../data-loader';

interface BookTreeProps {
  elements: ElementData[];
  records: RecordData[];
  selectedElement: ElementData | null;
  searchQuery: string;
  filterStatus: 'all' | 'curated' | 'baseline';
  onSelectElement: (element: ElementData) => void;
  onSelectRecord: (record: RecordData) => void;
}

// Mini element icon component
function ElementIcon({ element }: { element: ElementData }) {
  const isCurated = element.recordStatus === 'CURATED';
  return (
    <svg viewBox="0 0 32 32" width="28" height="28" className="flex-shrink-0">
      <circle cx="16" cy="16" r="14" fill="none" stroke={isCurated ? '#8dd4c6' : '#484f58'} strokeWidth="1.5"/>
      <text x="16" y="20" textAnchor="middle" fontFamily="Georgia,serif" fontSize="14" fontWeight="700" fill={isCurated ? '#8dd4c6' : '#e6edf3'}>{element.symbol}</text>
    </svg>
  );
}

export function BookTree({ elements, selectedElement, searchQuery, filterStatus, onSelectElement }: BookTreeProps) {
  const filtered = useMemo(() => {
    let els = [...elements];

    if (filterStatus !== 'all') {
      els = els.filter(e => e.recordStatus.toLowerCase() === filterStatus);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      els = els.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.symbol.toLowerCase().includes(q) ||
        e.matId.toLowerCase().includes(q) ||
        String(e.z) === q
      );
    }

    return els;
  }, [elements, searchQuery, filterStatus]);

  return (
    <div className="p-2">
      <div className="text-xs text-gray-500 mb-2 px-2">{filtered.length} elements</div>
      <div className="space-y-0.5">
        {filtered.map((el) => (
          <button
            key={el.z}
            onClick={() => onSelectElement(el)}
            className={`w-full text-left px-2 py-1.5 text-sm rounded flex items-center gap-2 transition-colors ${
              selectedElement?.z === el.z
                ? 'bg-amber-400/20 text-amber-300'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <ElementIcon element={el} />
            <span className="w-8 text-right font-mono text-xs text-gray-500">{String(el.z).padStart(3, '0')}</span>
            <span className="flex-1 truncate">
              <span className="font-semibold text-xs">{el.symbol}</span>
              <span className="text-[10px] text-gray-500 ml-1">{el.name}</span>
            </span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded ${
              el.recordStatus === 'CURATED'
                ? 'bg-green-900/50 text-green-400'
                : 'bg-blue-900/50 text-blue-400'
            }`}>
              {el.recordStatus === 'CURATED' ? 'C' : 'B'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
