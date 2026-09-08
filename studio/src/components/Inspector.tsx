import { ElementData, RecordData, ElementRecord, VisualManifest, GraphManifest, TableManifest } from '../data-loader';

interface InspectorProps {
  element: ElementData | null;
  record: RecordData | null;
  workflowMode: string;
  elementRecord: {
    master: ElementRecord | null;
    visuals: VisualManifest | null;
    graphs: GraphManifest | null;
    tables: TableManifest | null;
  } | null;
}

function InspectorSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-800/50 rounded p-3 mb-2">
      <h3 className="text-xs font-semibold text-gray-300 mb-2">{title}</h3>
      {children}
    </div>
  );
}

function InspectorRow({ label, value, color }: { label: string; value: string | number | null; color?: string }) {
  return (
    <div className="flex justify-between text-xs py-0.5">
      <span className="text-gray-400">{label}</span>
      <span className={color || 'text-gray-200'}>
        {value != null ? value : '—'}
      </span>
    </div>
  );
}

export function Inspector({ element, record, workflowMode, elementRecord }: InspectorProps) {
  if (!element) {
    return (
      <div className="p-3">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Inspector</h2>
        <p className="text-xs text-gray-500">Select an element to inspect its properties.</p>
      </div>
    );
  }

  const isCurated = element.recordStatus === 'CURATED';
  const master = elementRecord?.master;

  return (
    <div className="p-3">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Inspector</h2>

      {/* Element Identity */}
      <InspectorSection title="Identity">
        <InspectorRow label="MAT ID" value={element.matId} />
        <InspectorRow label="Atomic Number" value={element.z} />
        <InspectorRow label="Symbol" value={element.symbol} />
        <InspectorRow label="Name" value={element.name} />
        <InspectorRow
          label="Status"
          value={element.recordStatus}
          color={isCurated ? 'text-green-400' : 'text-blue-400'}
        />
      </InspectorSection>

      {/* Classification */}
      <InspectorSection title="Classification">
        <InspectorRow label="Period" value={element.period} />
        <InspectorRow label="Group" value={element.group} />
        <InspectorRow label="Block" value={element.block} />
        <InspectorRow label="Category" value={element.category} />
      </InspectorSection>

      {/* Properties */}
      <InspectorSection title="Properties">
        <InspectorRow label="Atomic Weight" value={element.atomicWeight} />
        <InspectorRow label="Electronegativity" value={element.electronegativity} />
        <InspectorRow label="Ionization Energy" value={element.ionizationEnergy ? `${element.ionizationEnergy} eV` : null} />
        <InspectorRow label="Phase (STP)" value={element.phase} />
      </InspectorSection>

      {/* Structured Record — if loaded */}
      {master && (
        <InspectorSection title="Structured Record">
          <InspectorRow label="Record Class" value={master.recordClass} />
          <InspectorRow label="Status" value={master.status} />
          <InspectorRow label="Created" value={master.created} />
          <InspectorRow label="Updated" value={master.updated} />

          {/* Completeness */}
          {master.completeness && (
            <div className="mt-2">
              <div className="text-[10px] text-gray-500 mb-1">Completeness</div>
              <div className="grid grid-cols-2 gap-1">
                {Object.entries(master.completeness).map(([key, val]) => (
                  <div key={key} className={`text-[9px] px-1.5 py-0.5 rounded text-center ${
                    val === 'CURATED' ? 'bg-green-900/50 text-green-400' :
                    val === 'PLANNED' ? 'bg-gray-800 text-gray-500' :
                    'bg-yellow-900/50 text-yellow-400'
                  }`}>
                    {key}
                  </div>
                ))}
              </div>
            </div>
          )}
        </InspectorSection>
      )}

      {/* Visual Manifest — if loaded */}
      {elementRecord?.visuals && (
        <InspectorSection title="Visual Manifest">
          <div className="text-[10px] text-gray-500 mb-1">
            {Object.keys(elementRecord.visuals.visuals || {}).length} slots
          </div>
          <div className="grid grid-cols-3 gap-1">
            {Object.entries(elementRecord.visuals.visuals || {}).slice(0, 12).map(([slot, data]) => (
              <div key={slot} className={`text-[9px] px-1 py-0.5 rounded text-center ${
                data.status === 'GENERATED' ? 'bg-green-900/50 text-green-400' :
                data.status === 'SOURCE-IMAGE-REQUIRED' ? 'bg-red-900/50 text-red-400' :
                'bg-gray-800 text-gray-500'
              }`}>
                {slot}
              </div>
            ))}
          </div>
        </InspectorSection>
      )}

      {/* Graph Manifest — if loaded */}
      {elementRecord?.graphs && (
        <InspectorSection title="Graph Manifest">
          <div className="text-[10px] text-gray-500 mb-1">
            {elementRecord.graphs.graphs?.length || 0} graphs
          </div>
          <div className="space-y-0.5">
            {elementRecord.graphs.graphs?.slice(0, 4).map((g) => (
              <div key={g.graphId} className="flex items-center justify-between text-[10px] py-0.5">
                <span className="text-gray-400 truncate">{g.title}</span>
                <span className={`px-1 rounded ${
                  g.status === 'GENERATED' ? 'bg-green-900/50 text-green-400' :
                  'bg-gray-800 text-gray-500'
                }`}>
                  {g.status.substring(0, 4)}
                </span>
              </div>
            ))}
          </div>
        </InspectorSection>
      )}

      {/* Table Manifest — if loaded */}
      {elementRecord?.tables && (
        <InspectorSection title="Table Manifest">
          <div className="text-[10px] text-gray-500 mb-1">
            {elementRecord.tables.tables?.length || 0} tables
          </div>
          <div className="space-y-0.5">
            {elementRecord.tables.tables?.slice(0, 4).map((t) => (
              <div key={t.tableId} className="flex items-center justify-between text-[10px] py-0.5">
                <span className="text-gray-400 truncate">{t.title}</span>
                <span className={`px-1 rounded ${
                  t.status === 'EXISTS' ? 'bg-green-900/50 text-green-400' :
                  'bg-gray-800 text-gray-500'
                }`}>
                  {t.status.substring(0, 4)}
                </span>
              </div>
            ))}
          </div>
        </InspectorSection>
      )}

      {/* Publication info */}
      {record && (
        <InspectorSection title="Publication">
          <InspectorRow label="Section" value={record.section} />
          <InspectorRow label="Lane" value={record.lane} />
          <InspectorRow label="Chapter" value={record.id} />
        </InspectorSection>
      )}

      {/* Workflow mode context */}
      {workflowMode === 'review' && (
        <InspectorSection title="Review">
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2 text-yellow-400">
              <span>⚠</span>
              <span>{isCurated ? 'Full record available' : 'Baseline only — no curated content yet'}</span>
            </div>
            {!element.electronConfiguration && (
              <div className="flex items-center gap-2 text-yellow-400">
                <span>⚠</span>
                <span>Electron configuration unknown</span>
              </div>
            )}
            {!element.phase && (
              <div className="flex items-center gap-2 text-yellow-400">
                <span>⚠</span>
                <span>Phase at STP unknown</span>
              </div>
            )}
          </div>
        </InspectorSection>
      )}

      {/* Quick actions */}
      <InspectorSection title="Actions">
        <div className="space-y-1">
          {isCurated ? (
            <button className="w-full text-left px-2 py-1 text-xs text-green-400 hover:bg-gray-800 rounded">
              Open full MAT record →
            </button>
          ) : (
            <button className="w-full text-left px-2 py-1 text-xs text-blue-400 hover:bg-gray-800 rounded">
              Create full MAT record…
            </button>
          )}
          <button className="w-full text-left px-2 py-1 text-xs text-gray-400 hover:bg-gray-800 rounded">
            View in public reader
          </button>
        </div>
      </InspectorSection>
    </div>
  );
}
