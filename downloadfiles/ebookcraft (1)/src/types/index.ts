export type EvidenceTier = 'core' | 'research' | 'historical';

export type ReadingMode = 'codex' | 'book' | 'focus';

export type ThemeMode = 'dark' | 'light' | 'sepia';

export interface ElementData {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: number;
  period: number;
  group: number;
  block: 's' | 'p' | 'd' | 'f';
  category: string;
  electronConfiguration: string;
  electronegativity: number; // Pauling scale
  abundanceCosmicPPM: number;
  abundanceCrustPPM: number;
  atomicRadiusPM: number;
  valence: number;
  // Alternative geometry coordinates:
  russellOctave?: number; // 1 to 9
  russellTone?: string; // e.g. "0", "+1", "+2", "+3", "±4", "-3", "-2", "-1"
  russellCharging?: 'charging' | 'discharging' | 'inert';
  akhtarDegree?: number; // 0 to 360
  polarRadius?: number; // 1 to 7
  tier: EvidenceTier;
  notes?: string;
}

export interface GeometryModel {
  id: string;
  title: string;
  creator: string;
  year: string;
  concept: string;
  description: string;
  uploadedReference: string;
  keyInsights: string[];
  evidenceTier: EvidenceTier;
  geometryType: 'spiral' | 'polar' | 'cartogram' | 'toroidal' | 'pyramidal' | 'tree' | 'helical' | 'dual-vortex';
}

export interface ChapterSection {
  id: string;
  title: string;
  slug: string;
  tier?: EvidenceTier;
  content: string;
  summary?: string;
  modelId?: string; // if tied to an alternative geometry
  elementId?: number; // if tied to an element record
  subsections?: {
    id: string;
    title: string;
    content: string;
    tier?: EvidenceTier;
  }[];
}

export interface Chapter {
  id: string;
  title: string;
  part: string;
  number: string;
  description: string;
  sections: ChapterSection[];
}

export type AlignmentAxis = 
  | 'noble-gas' 
  | 'carbon-amplitude' 
  | 'alkali-start' 
  | 'blocks-spdf' 
  | 'periods-octaves'
  | 'abundance-distort';

export type OverlayMode = 'ghost' | 'split' | 'rays' | 'side-by-side';

export interface OverlayConfig {
  baseModelId: string;
  overlayModelId: string;
  mode: OverlayMode;
  opacity: number; // 0.1 to 1.0
  rotationOffset: number; // degrees
  scaleOffset: number; // 0.5 to 2.0
  activeAxes: AlignmentAxis[];
  highlightedElement: number | null;
  showGrid: boolean;
  showLabels: boolean;
}

export interface NoteItem {
  id: string;
  chapterId: string;
  sectionId: string;
  selectedText: string;
  userNote: string;
  timestamp: string;
}
