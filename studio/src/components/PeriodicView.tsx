import { ElementData } from '../data-loader';

interface PeriodicViewProps {
  elements: ElementData[];
  selectedElement: ElementData | null;
  onSelectElement: (element: ElementData) => void;
}

// Periodic table layout: [row, col] for each atomic number
const PERIODIC_LAYOUT: Record<number, [number, number]> = {
  1:[1,1], 2:[1,18],
  3:[2,1], 4:[2,2], 5:[2,13], 6:[2,14], 7:[2,15], 8:[2,16], 9:[2,17], 10:[2,18],
  11:[3,1], 12:[3,2], 13:[3,13], 14:[3,14], 15:[3,15], 16:[3,16], 17:[3,17], 18:[3,18],
  19:[4,1], 20:[4,2], 21:[4,3], 22:[4,4], 23:[4,5], 24:[4,6], 25:[4,7], 26:[4,8], 27:[4,9], 28:[4,10], 29:[4,11], 30:[4,12], 31:[4,13], 32:[4,14], 33:[4,15], 34:[4,16], 35:[4,17], 36:[4,18],
  37:[5,1], 38:[5,2], 39:[5,3], 40:[5,4], 41:[5,5], 42:[5,6], 43:[5,7], 44:[5,8], 45:[5,9], 46:[5,10], 47:[5,11], 48:[5,12], 49:[5,13], 50:[5,14], 51:[5,15], 52:[5,16], 53:[5,17], 54:[5,18],
  55:[6,1], 56:[6,2], 57:[9,3], 58:[9,4], 59:[9,5], 60:[9,6], 61:[9,7], 62:[9,8], 63:[9,9], 64:[9,10], 65:[9,11], 66:[9,12], 67:[9,13], 68:[9,14], 69:[9,15], 70:[9,16], 71:[6,3],
  72:[6,4], 73:[6,5], 74:[6,6], 75:[6,7], 76:[6,8], 77:[6,9], 78:[6,10], 79:[6,11], 80:[6,12], 81:[6,13], 82:[6,14], 83:[6,15], 84:[6,16], 85:[6,17], 86:[6,18],
  87:[7,1], 88:[7,2], 89:[10,3], 90:[10,4], 91:[10,5], 92:[10,6], 93:[10,7], 94:[10,8], 95:[10,9], 96:[10,10], 97:[10,11], 98:[10,12], 99:[10,13], 100:[10,14], 101:[10,15], 102:[10,16], 103:[10,17],
  104:[7,4], 105:[7,5], 106:[7,6], 107:[7,7], 108:[7,8], 109:[7,9], 110:[7,10], 111:[7,11], 112:[7,12], 113:[7,13], 114:[7,14], 115:[7,15], 116:[7,16], 117:[7,17], 118:[7,18],
};

const CATEGORY_COLORS: Record<string, string> = {
  'Alkali Metal': 'bg-red-900/40 text-red-300',
  'Alkaline Earth Metal': 'bg-orange-900/40 text-orange-300',
  'Transition Metal': 'bg-yellow-900/40 text-yellow-300',
  'Post-Transition Metal': 'bg-green-900/40 text-green-300',
  'Metalloid': 'bg-teal-900/40 text-teal-300',
  'Reactive Nonmetal': 'bg-blue-900/40 text-blue-300',
  'Halogen': 'bg-indigo-900/40 text-indigo-300',
  'Noble Gas': 'bg-purple-900/40 text-purple-300',
  'Lanthanide': 'bg-pink-900/40 text-pink-300',
  'Actinide': 'bg-rose-900/40 text-rose-300',
};

export function PeriodicView({ elements, selectedElement, onSelectElement }: PeriodicViewProps) {
  const cells: JSX.Element[] = [];

  for (let row = 1; row <= 10; row++) {
    for (let col = 1; col <= 18; col++) {
      const el = elements.find(e => {
        const pos = PERIODIC_LAYOUT[e.z];
        return pos && pos[0] === row && pos[1] === col;
      });

      if (!el) continue;

      const isSelected = selectedElement?.z === el.z;
      const colorClass = CATEGORY_COLORS[el.category] || 'bg-gray-800 text-gray-300';

      cells.push(
        <button
          key={el.z}
          onClick={() => onSelectElement(el)}
          title={`${el.name} (${el.symbol}) — MAT:${String(el.z).padStart(4,'0')} — ${el.recordStatus} — ${el.category}`}
          className={`w-8 h-8 flex flex-col items-center justify-center rounded text-[9px] leading-tight transition-all hover:scale-110 hover:shadow-lg ${
            isSelected ? 'ring-2 ring-amber-400 scale-110 z-10' : ''
          } ${colorClass}`}
          style={{ gridRow: row, gridColumn: col }}
        >
          <span className="font-mono text-[8px] opacity-60">{el.z}</span>
          <span className="font-bold text-[10px]">{el.symbol}</span>
        </button>
      );
    }
  }

  return (
    <div className="p-2 overflow-auto">
      <div className="text-xs text-gray-500 mb-2">Periodic Table — {elements.length} elements</div>
      <div
        className="grid gap-px"
        style={{
          gridTemplateColumns: 'repeat(18, 1fr)',
          gridTemplateRows: 'repeat(10, auto)',
        }}
      >
        {cells}
      </div>

      {/* Lanthanide/Actinide labels */}
      <div className="mt-2 flex gap-4 text-[10px] text-gray-500">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-pink-900/40 rounded"></span>
          Lanthanides
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-rose-900/40 rounded"></span>
          Actinides
        </span>
      </div>

      {/* Category legend */}
      <div className="mt-3 flex flex-wrap gap-2 text-[9px] text-gray-500">
        {Object.entries(CATEGORY_COLORS).map(([cat, cls]) => (
          <span key={cat} className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded ${cls.split(' ')[0]}`}></span>
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}
