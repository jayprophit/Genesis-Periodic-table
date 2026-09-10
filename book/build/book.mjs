// Canonical book build entry point. Run: npm run build:book
// Deterministic: identical sources produce identical outputs.
import { buildManifest } from "./manifest.mjs";
import { buildSearchIndex } from "./search-index.mjs";
import { buildVisualsIndex } from "./visuals-index.mjs";
import { buildIdentityIndex } from "./identity-index.mjs";
import { buildPeriodicIndex } from "./periodic-index.mjs";
import { buildOfflineIndex } from "./offline-index.mjs";
import { buildStyles } from "./styles.mjs";

buildStyles();
const { chapters, flat } = buildManifest();
buildSearchIndex(flat);
buildVisualsIndex();
buildIdentityIndex();
buildPeriodicIndex();
await import('../export-single.mjs');
buildOfflineIndex({ chapters });
