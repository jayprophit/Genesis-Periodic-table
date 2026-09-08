import { ElementData } from '../data-loader';

interface StatusBarProps {
  elementCount: number;
  curatedCount: number;
  baselineCount: number;
  selectedElement: ElementData | null;
}

export function StatusBar({ elementCount, curatedCount, baselineCount, selectedElement }: StatusBarProps) {
  return (
    <footer className="flex items-center justify-between px-4 py-1.5 border-t border-gray-800 bg-gray-900 text-xs text-gray-500">
      <div className="flex gap-4">
        <span>Elements: <span className="text-gray-300">{elementCount}</span></span>
        <span>Curated: <span className="text-green-400">{curatedCount}</span></span>
        <span>Baseline: <span className="text-blue-400">{baselineCount}</span></span>
      </div>
      <div>
        {selectedElement ? (
          <span className="text-amber-400">
            MAT:{String(selectedElement.z).padStart(4, '0')} {selectedElement.symbol} {selectedElement.name}
            <span className={`ml-2 ${selectedElement.recordStatus === 'CURATED' ? 'text-green-400' : 'text-blue-400'}`}>
              [{selectedElement.recordStatus}]
            </span>
          </span>
        ) : (
          <span>No element selected</span>
        )}
      </div>
    </footer>
  );
}
