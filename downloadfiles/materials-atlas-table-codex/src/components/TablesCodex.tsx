import React, { useState, useMemo } from 'react';
import { 
  Table2, 
  Search, 
  Copy, 
  Check, 
  Download, 
  BookOpen, 
  ExternalLink 
} from 'lucide-react';
import { MAT_RECORDS } from '../data/mat-store';
import { TableItem, MatDeepRecord } from '../data/types';

interface TablesCodexProps {
  onOpenBookChapter: (recordId: string) => void;
}

export const TablesCodex: React.FC<TablesCodexProps> = ({ onOpenBookChapter }) => {
  const [selectedRecordId, setSelectedRecordId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedTableIndex, setCopiedTableIndex] = useState<number | null>(null);

  // Flatten all tables with record association
  const allTablesWithRecord = useMemo(() => {
    const list: { table: TableItem; record: MatDeepRecord }[] = [];
    for (const record of MAT_RECORDS) {
      for (const table of record.tables) {
        list.push({ table, record });
      }
    }
    return list;
  }, []);

  // Filtered tables
  const filteredTables = useMemo(() => {
    return allTablesWithRecord.filter(({ table, record }) => {
      if (selectedRecordId !== 'all' && record.id !== selectedRecordId) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return (
          table.title.toLowerCase().includes(q) ||
          table.filename.toLowerCase().includes(q) ||
          record.name.toLowerCase().includes(q) ||
          record.symbol.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allTablesWithRecord, selectedRecordId, searchQuery]);

  const copyTableAsCsv = (table: TableItem, idx: number) => {
    if (!table.parsed) {
      navigator.clipboard.writeText(table.raw);
    } else {
      const csvLines = [
        table.parsed.headers.join(','),
        ...table.parsed.rows.map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(','))
      ];
      navigator.clipboard.writeText(csvLines.join('\n'));
    }
    setCopiedTableIndex(idx);
    setTimeout(() => setCopiedTableIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-indigo-950 border border-indigo-800 text-indigo-400">
                <Table2 className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Materials Atlas Scientific Tables Codex
                </h2>
                <p className="text-xs text-slate-400">
                  Authoritative datasets covering isotopes, decay modes, spectral lines, cross-sections, and state matrices.
                </p>
              </div>
            </div>
          </div>

          <div className="text-xs font-mono text-slate-400">
            Total Catalogued Tables: <strong className="text-indigo-400">{allTablesWithRecord.length}</strong>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-800 text-xs">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search table title (e.g. Isotope, Spectral, Transition, Reference)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">Record:</span>
            <select
              value={selectedRecordId}
              onChange={(e) => setSelectedRecordId(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Elements (0–9)</option>
              {MAT_RECORDS.map(r => (
                <option key={r.id} value={r.id}>
                  {r.matId}: {r.name} ({r.tables.length} tables)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tables Stream */}
      <div className="space-y-6">
        {filteredTables.map(({ table, record }, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
            
            {/* Table Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded bg-indigo-950 border border-indigo-800 flex items-center justify-center font-bold text-indigo-300 font-mono text-xs">
                  {record.symbol}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    {table.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                    <span>{record.name} ({record.matId})</span>
                    <span>·</span>
                    <span>File: {table.filename}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyTableAsCsv(table, idx)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition border border-slate-700"
                  title="Copy as CSV"
                >
                  {copiedTableIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy CSV</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onOpenBookChapter(record.id)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-cyan-600/80 hover:bg-cyan-500 text-white text-xs transition"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Chapter</span>
                </button>
              </div>
            </div>

            {/* Formatted Table Content */}
            {table.parsed ? (
              <div className="overflow-x-auto rounded-lg border border-slate-800">
                <table className="w-full text-left text-xs border-collapse font-mono">
                  <thead>
                    <tr className="border-b border-slate-700 bg-slate-950">
                      {table.parsed.headers.map((h, hIdx) => (
                        <th key={hIdx} className="py-2.5 px-3 font-semibold text-slate-300 uppercase text-[10px]">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                    {table.parsed.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-800/40 transition">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="py-2 px-3 text-slate-300 whitespace-nowrap">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <pre className="text-xs font-mono text-slate-300 p-3 bg-slate-950 rounded border border-slate-800 overflow-x-auto whitespace-pre-wrap">
                {table.raw}
              </pre>
            )}

          </div>
        ))}
      </div>

      {filteredTables.length === 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-slate-400">
          No tables found matching your search.
        </div>
      )}

    </div>
  );
};
