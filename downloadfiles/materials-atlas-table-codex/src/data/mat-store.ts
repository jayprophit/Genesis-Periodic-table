import allElementsData from './all-elements.json';
import matRecordsData from './mat-records.json';
import matDocsData from './mat-docs.json';
import { ElementRecord, MatDeepRecord, DocChapter } from './types';

export const ALL_ELEMENTS: ElementRecord[] = allElementsData as unknown as ElementRecord[];
export const MAT_RECORDS: MatDeepRecord[] = matRecordsData as unknown as MatDeepRecord[];
export const MAT_DOCS: DocChapter[] = matDocsData as unknown as DocChapter[];

export const ELEMENT_MAP = new Map<number, ElementRecord>(
  ALL_ELEMENTS.map(el => [el.atomicNumber, el])
);

export const RECORD_MAP = new Map<string, MatDeepRecord>(
  MAT_RECORDS.map(rec => [rec.id, rec])
);

export function getRecordBySymbol(symbol: string): MatDeepRecord | undefined {
  return MAT_RECORDS.find(r => r.symbol.toLowerCase() === symbol.toLowerCase());
}

export function getRecordById(id: string): MatDeepRecord | undefined {
  return RECORD_MAP.get(id);
}
