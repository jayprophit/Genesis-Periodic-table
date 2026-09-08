export interface ElementRecord {
  atomicNumber: number;
  symbol: string;
  name: string;
  matId: string;
  period: number;
  group: number;
  block: 's' | 'p' | 'd' | 'f' | 'ref';
  category: string;
  atomicWeight: string | number;
  electronConfiguration: string;
  electronegativity: number | null;
  ionizationEnergy: number | null;
  atomicRadius: number | null;
  density: number | null;
  meltingPoint: number | null;
  boilingPoint: number | null;
  phase: string;
  universeAbundance: number;
  crustAbundance: number;
  humanAbundance: number;
  publishedRecord: boolean;
  chapterPath: string | null;
}

export interface VisualItem {
  file: string;
  src: string;
  name: string;
  category: string;
  path: string;
}

export interface TableItem {
  filename: string;
  title: string;
  raw: string;
  parsed: {
    headers: string[];
    rows: string[][];
  } | null;
}

export interface MatDeepRecord {
  id: string;
  dir: string;
  name: string;
  symbol: string;
  atomicNumber: number;
  class: string;
  status: string;
  period: number;
  group: number;
  block: string;
  category: string;
  electronConfig: string;
  atomicWeight: string;
  electronegativity: number | null;
  ionizationEnergy: number | null;
  density: number | null;
  meltingPoint: number | null;
  boilingPoint: number | null;
  summary: string;
  matId: string;
  tables: TableItem[];
  visuals: VisualItem[];
  prose: string;
}

export interface DocChapter {
  id: string;
  title: string;
  section: string;
  content: string;
}
