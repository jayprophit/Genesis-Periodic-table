import { ElementData, RecordData, ElementRecord, VisualManifest, GraphManifest, TableManifest } from '../data-loader';

interface LivePreviewProps {
  element: ElementData | null;
  record: RecordData | null;
  workflowMode: string;
  allRecords: RecordData[];
  elementRecord: {
    master: ElementRecord | null;
    visuals: VisualManifest | null;
    graphs: GraphManifest | null;
    tables: TableManifest | null;
  } | null;
  recordLoading: boolean;
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{title}</h3>
      {children}
    </div>
  );
}

function DataRow({ label, value, unit }: { label: string; value: string | number | null; unit?: string }) {
  return (
    <div className="flex justify-between py-1 text-sm">
      <span className="text-gray-600">{label}</span>
      <span className="text-gray-900 font-medium">
        {value != null ? value : <span className="text-gray-400 italic">—</span>}
        {unit && value != null && <span className="text-gray-400 ml-1">{unit}</span>}
      </span>
    </div>
  );
}

// Styled circle SVG component with electron configuration
function ElementCircle({ element }: { element: ElementData }) {
  const ec = element.electronConfiguration || 'UNKNOWN';
  const matId = `MAT:${String(element.z).padStart(4, '0')}`;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 632 224" width="632" height="224" role="img" className="w-full max-w-lg mx-auto mb-6">
      <rect width="632" height="224" fill="#0f141b"/>
      <circle cx="112" cy="120" r="72" fill="none" stroke="#8dd4c6" strokeWidth="2"/>
      <circle cx="112" cy="120" r="56" fill="none" stroke="#edc777" strokeWidth="1" opacity="0.4"/>
      <text x="112" y="80" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="12" fill="#8dd4c6">Z = {element.z}</text>
      <text x="112" y="136" textAnchor="middle" fontFamily="Georgia,serif" fontSize="64" fontWeight="700" fill="#e8edf3">{element.symbol}</text>
      <text x="112" y="168" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="10" fill="#9aa7b8">{element.name}</text>
      <rect x="240" y="56" width="360" height="128" rx="8" fill="#161d27" stroke="#26313f"/>
      <text x="260" y="84" fontFamily="system-ui,sans-serif" fontSize="13" fontWeight="700" fill="#6cb2ff">Atomic Identity</text>
      <text x="260" y="106" fontFamily="system-ui,sans-serif" fontSize="11" fill="#9aa7b8">Category: {element.category}</text>
      <text x="260" y="124" fontFamily="system-ui,sans-serif" fontSize="11" fill="#9aa7b8">Phase (STP): {element.phase || '?'}  ·  Weight: {element.atomicWeight || '?'}</text>
      <text x="260" y="142" fontFamily="system-ui,sans-serif" fontSize="11" fill="#9aa7b8">I1: {element.ionizationEnergy ? `${element.ionizationEnergy} eV` : '?'}  ·  Group: {element.group || '?'}  ·  Period: {element.period}  ·  Block: {element.block}</text>
      <text x="260" y="166" fontFamily="Consolas,monospace" fontSize="12" fill="#edc777">{ec}</text>
      <text x="16" y="210" fontFamily="system-ui,sans-serif" fontSize="10" fill="#555">{matId} · IUPAC 2021 + NIST ASD</text>
    </svg>
  );
}

// Placeholder slot component
function PlaceholderSlot({ label, icon }: { label: string; icon: string }) {
  return (
    <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center text-gray-400 text-xs">
      <div className="text-2xl mb-1 opacity-40">{icon}</div>
      <div>{label}</div>
    </div>
  );
}

export function LivePreview({ element, record, workflowMode: _workflowMode, allRecords: _allRecords, elementRecord, recordLoading }: LivePreviewProps) {
  if (!element) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <div className="text-center">
          <div className="text-6xl mb-4 opacity-20">⚛</div>
          <h3 className="text-lg font-semibold text-gray-300">MAT Studio</h3>
          <p className="text-sm mt-2">Select an element from the Tree or Periodic Table.</p>
          <p className="text-xs mt-4 text-gray-500 max-w-sm">
            Browse 118 elements. View baseline and curated scientific data.
            Use Write, Design, Data, Review, Preview, and Export modes.
          </p>
        </div>
      </div>
    );
  }

  const isCurated = element.recordStatus === 'CURATED';
  const master = elementRecord?.master;

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        {/* Paper surface */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          {/* Styled circle with element identity */}
          <ElementCircle element={element} />

          {/* Status badge */}
          <div className="text-center mb-4">
            {isCurated && record && (
              <div className="text-xs text-green-700 bg-green-50 border border-green-200 rounded px-2 py-1 inline-block">
                FULL MAT RECORD
              </div>
            )}
            {!isCurated && (
              <div className="text-xs text-blue-700 bg-blue-50 border border-blue-200 rounded px-2 py-1 inline-block">
                BASELINE ELEMENT RECORD
              </div>
            )}
          </div>

          {/* At a Glance */}
          <SectionCard title="At a Glance">
            <div className="grid grid-cols-2 gap-x-8">
              <DataRow label="Atomic Number" value={element.z} />
              <DataRow label="Atomic Weight" value={element.atomicWeight} />
              <DataRow label="Group" value={element.group} />
              <DataRow label="Period" value={element.period} />
              <DataRow label="Block" value={element.block} />
              <DataRow label="Category" value={element.category} />
              <DataRow label="Phase (STP)" value={element.phase} />
              <DataRow label="Electronegativity" value={element.electronegativity} unit="Pauling" />
            </div>
          </SectionCard>

          {/* Electronic Structure */}
          <SectionCard title="Electronic Structure">
            <DataRow label="Electron Configuration" value={element.electronConfiguration} />
            <DataRow label="First Ionization Energy" value={element.ionizationEnergy} unit="eV" />
          </SectionCard>

          {/* Physical Properties */}
          <SectionCard title="Physical Properties">
            <DataRow label="Melting Point" value={element.meltingPoint} unit="K" />
            <DataRow label="Boiling Point" value={element.boilingPoint} unit="K" />
            <DataRow label="Density" value={element.density} unit="g/cm³" />
          </SectionCard>

          {/* Visual Placeholders */}
          <SectionCard title="Visual Assets">
            <div className="grid grid-cols-3 gap-2">
              <PlaceholderSlot label="Natural State" icon="📸" />
              <PlaceholderSlot label="Atomic Diagram" icon="⚛" />
              <PlaceholderSlot label="Bonding" icon="🔗" />
              <PlaceholderSlot label="Quantum" icon="🌊" />
              <PlaceholderSlot label="Isotopes" icon="☢" />
              <PlaceholderSlot label="Spectra" icon="🌈" />
              <PlaceholderSlot label="Properties" icon="📊" />
              <PlaceholderSlot label="3D Model" icon="🧊" />
              <PlaceholderSlot label="Applications" icon="🔧" />
            </div>
          </SectionCard>

          {/* Structured Data — if loaded */}
          {master && (
            <SectionCard title="Structured Record">
              <div className="grid grid-cols-2 gap-x-8">
                <DataRow label="Record Class" value={master.recordClass} />
                <DataRow label="Status" value={master.status} />
                <DataRow label="Created" value={master.created} />
                <DataRow label="Updated" value={master.updated} />
              </div>

              {/* Completeness */}
              {master.completeness && (
                <div className="mt-4">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Completeness</div>
                  <div className="grid grid-cols-4 gap-1">
                    {Object.entries(master.completeness).map(([key, val]) => (
                      <div key={key} className={`text-[10px] px-2 py-1 rounded text-center ${
                        val === 'CURATED' ? 'bg-green-100 text-green-700' :
                        val === 'PLANNED' ? 'bg-gray-100 text-gray-500' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {key}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </SectionCard>
          )}

          {/* Visual Manifest Slots */}
          {elementRecord?.visuals && (
            <SectionCard title="Visual Manifest">
              <div className="text-xs text-gray-500 mb-2">
                {Object.keys(elementRecord.visuals.visuals || {}).length} visual slots registered
              </div>
              <div className="grid grid-cols-4 gap-1">
                {Object.entries(elementRecord.visuals.visuals || {}).map(([slot, data]) => (
                  <div key={slot} className={`text-[10px] px-2 py-1 rounded text-center ${
                    data.status === 'GENERATED' ? 'bg-green-100 text-green-700' :
                    data.status === 'SOURCE-IMAGE-REQUIRED' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {slot}
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {/* Graph Manifest */}
          {elementRecord?.graphs && (
            <SectionCard title="Graph Manifest">
              <div className="text-xs text-gray-500 mb-2">
                {elementRecord.graphs.graphs?.length || 0} graphs registered
              </div>
              <div className="space-y-1">
                {elementRecord.graphs.graphs?.slice(0, 4).map((g) => (
                  <div key={g.graphId} className="flex items-center justify-between text-xs py-1 border-b border-gray-100">
                    <span className="text-gray-700">{g.title}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                      g.status === 'GENERATED' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {g.status}
                    </span>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {/* Table Manifest */}
          {elementRecord?.tables && (
            <SectionCard title="Table Manifest">
              <div className="text-xs text-gray-500 mb-2">
                {elementRecord.tables.tables?.length || 0} tables registered
              </div>
              <div className="space-y-1">
                {elementRecord.tables.tables?.slice(0, 4).map((t) => (
                  <div key={t.tableId} className="flex items-center justify-between text-xs py-1 border-b border-gray-100">
                    <span className="text-gray-700">{t.title}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                      t.status === 'EXISTS' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {/* Curated content — show chapter info if available */}
          {isCurated && record && (
            <SectionCard title="Chapter Content">
              <div className="text-sm text-gray-600">
                <p><strong>Section:</strong> {record.section}</p>
                <p><strong>Lane:</strong> {record.lane}</p>
                <p className="mt-2 text-gray-400 italic">Full chapter preview renders in the public reader.</p>
              </div>
            </SectionCard>
          )}

          {/* Status footer */}
          <div className="mt-8 pt-4 border-t border-gray-200 text-xs text-gray-400 text-center">
            Status: {isCurated ? 'Fully curated MAT record' : 'Baseline element — awaiting curated MAT expansion'}
            {recordLoading && <span className="ml-2 text-amber-500">Loading structured data...</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
