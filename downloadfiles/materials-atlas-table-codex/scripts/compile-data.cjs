const fs = require('fs');
const path = require('path');

// 1. Process records 0000 to 0009
const recordMeta = [
  {
    id: "0000",
    dir: "0000-Origin-State",
    name: "Origin State",
    symbol: "OS",
    atomicNumber: 0,
    class: "FOUNDATION_REFERENCE",
    status: "RESEARCHED",
    period: 0,
    group: 0,
    block: "ref",
    category: "Reference Origin",
    electronConfig: "Vacuum / Ground Reference",
    atomicWeight: "0.000 (Reference)",
    electronegativity: null,
    ionizationEnergy: null,
    density: null,
    meltingPoint: null,
    boilingPoint: null,
    summary: "The canonical reference state and coordinate baseline for the Materials Atlas Table Codex. Establishes zero-reference for fields, vacuum energy, coordinates, and transformation paths."
  },
  {
    id: "0001",
    dir: "0001-Hydrogen-H",
    name: "Hydrogen",
    symbol: "H",
    atomicNumber: 1,
    class: "CHEMICAL_ELEMENT",
    status: "RESEARCHED",
    period: 1,
    group: 1,
    block: "s",
    category: "Reactive Nonmetal",
    electronConfig: "1s¹",
    atomicWeight: "1.00784 – 1.00811",
    electronegativity: 2.20,
    ionizationEnergy: 13.598,
    density: 0.00008988,
    meltingPoint: 14.01,
    boilingPoint: 20.28,
    summary: "First element of the universe. Simple single-proton nucleus with rich nuclear (¹H, ²H, ³H), electronic (hyperfine 21-cm transition), molecular (ortho/para-H₂), and extreme-phase (metallic hydrogen) behaviors."
  },
  {
    id: "0002",
    dir: "0002-Helium-He",
    name: "Helium",
    symbol: "He",
    atomicNumber: 2,
    class: "CHEMICAL_ELEMENT",
    status: "RESEARCHED",
    period: 1,
    group: 18,
    block: "s",
    category: "Noble Gas",
    electronConfig: "1s²",
    atomicWeight: "4.002602",
    electronegativity: null,
    ionizationEnergy: 24.587,
    density: 0.0001785,
    meltingPoint: 0.95,
    boilingPoint: 4.22,
    summary: "Closed-shell noble gas. Remarkable quantum fluid exhibiting Superfluid He-II with zero viscosity below lambda point (2.17 K), quantized vortices, and cryogenic relevance."
  },
  {
    id: "0003",
    dir: "0003-Lithium-Li",
    name: "Lithium",
    symbol: "Li",
    atomicNumber: 3,
    class: "CHEMICAL_ELEMENT",
    status: "RESEARCHED",
    period: 2,
    group: 1,
    block: "s",
    category: "Alkali Metal",
    electronConfig: "[He] 2s¹",
    atomicWeight: "6.938 – 6.997",
    electronegativity: 0.98,
    ionizationEnergy: 5.392,
    density: 0.534,
    meltingPoint: 453.69,
    boilingPoint: 1603,
    summary: "Lightest metallic element. Lowest reduction potential (-3.04 V), critical for electrochemical energy storage (intercalation in graphite/metal oxides), nuclear tritium breeding (⁶Li, ⁷Li), and molten salts."
  },
  {
    id: "0004",
    dir: "0004-Beryllium-Be",
    name: "Beryllium",
    symbol: "Be",
    atomicNumber: 4,
    class: "CHEMICAL_ELEMENT",
    status: "RESEARCHED",
    period: 2,
    group: 2,
    block: "s",
    category: "Alkaline Earth Metal",
    electronConfig: "[He] 2s²",
    atomicWeight: "9.0121831",
    electronegativity: 1.57,
    ionizationEnergy: 9.323,
    density: 1.85,
    meltingPoint: 1560,
    boilingPoint: 2742,
    summary: "Exceptional stiffness-to-weight ratio and X-ray transparency. Key neutron moderator and multiplier in nuclear architectures, molten FLiBe salt component, but severely toxic (berylliosis)."
  },
  {
    id: "0005",
    dir: "0005-Boron-B",
    name: "Boron",
    symbol: "B",
    atomicNumber: 5,
    class: "CHEMICAL_ELEMENT",
    status: "RESEARCHED",
    period: 2,
    group: 13,
    block: "p",
    category: "Metalloid",
    electronConfig: "[He] 2s² 2p¹",
    atomicWeight: "10.806 – 10.821",
    electronegativity: 2.04,
    ionizationEnergy: 8.298,
    density: 2.34,
    meltingPoint: 2349,
    boilingPoint: 4200,
    summary: "Complex electron-deficient metalloid forming icosahedral B₁₂ clusters, 3-center 2-electron bonds, superhard ceramic borides, neutron-capture isotopes (¹⁰B), and borosilicate glasses."
  },
  {
    id: "0006",
    dir: "0006-Carbon-C",
    name: "Carbon",
    symbol: "C",
    atomicNumber: 6,
    class: "CHEMICAL_ELEMENT",
    status: "RESEARCHED",
    period: 2,
    group: 14,
    block: "p",
    category: "Reactive Nonmetal",
    electronConfig: "[He] 2s² 2p²",
    atomicWeight: "12.0096 – 12.0116",
    electronegativity: 2.55,
    ionizationEnergy: 11.260,
    density: 2.267,
    meltingPoint: 3823,
    boilingPoint: 4300,
    summary: "The architectural kingpin of matter and organic chemistry. Exhibits diverse hybridization states (sp, sp², sp³) spanning 0D fullerenes, 1D nanotubes, 2D graphene, 3D diamond and graphite, and carbon-14 dating."
  },
  {
    id: "0007",
    dir: "0007-Nitrogen-N",
    name: "Nitrogen",
    symbol: "N",
    atomicNumber: 7,
    class: "CHEMICAL_ELEMENT",
    status: "RESEARCHED",
    period: 2,
    group: 15,
    block: "p",
    category: "Reactive Nonmetal",
    electronConfig: "[He] 2s² 2p³",
    atomicWeight: "14.00643 – 14.00728",
    electronegativity: 3.04,
    ionizationEnergy: 14.534,
    density: 0.0012506,
    meltingPoint: 63.15,
    boilingPoint: 77.36,
    summary: "Forms extraordinarily strong N≡N triple bonds (945 kJ/mol). Dominates Earth's atmosphere (78%), drives biological nitrogen fixation, fertilizer synthesis (Haber-Bosch), and high-energy polynitrogen compounds."
  },
  {
    id: "0008",
    dir: "0008-Oxygen-O",
    name: "Oxygen",
    symbol: "O",
    atomicNumber: 8,
    class: "CHEMICAL_ELEMENT",
    status: "RESEARCHED",
    period: 2,
    group: 16,
    block: "p",
    category: "Reactive Nonmetal",
    electronConfig: "[He] 2s² 2p⁴",
    atomicWeight: "15.99903 – 15.99977",
    electronegativity: 3.44,
    ionizationEnergy: 13.618,
    density: 0.001429,
    meltingPoint: 54.36,
    boilingPoint: 90.20,
    summary: "Paramagnetic triplet ground state (³Σ_g⁻) with two unpaired electrons in antibonding orbitals. Second most electronegative element, essential for aerobic respiration, oxides, and auroral emissions."
  },
  {
    id: "0009",
    dir: "0009-Fluorine-F",
    name: "Fluorine",
    symbol: "F",
    atomicNumber: 9,
    class: "CHEMICAL_ELEMENT",
    status: "RESEARCHED",
    period: 2,
    group: 17,
    block: "p",
    category: "Halogen",
    electronConfig: "[He] 2s² 2p⁵",
    atomicWeight: "18.998403163",
    electronegativity: 3.98,
    ionizationEnergy: 17.423,
    density: 0.001696,
    meltingPoint: 53.48,
    boilingPoint: 85.03,
    summary: "The most electronegative and chemically reactive of all chemical elements. Forms the ultra-inert C-F bond in fluoropolymers (PTFE), molten FLiBe nuclear coolants, superacids, and ¹⁸F radiopharmaceuticals."
  }
];

const visualsData = JSON.parse(fs.readFileSync("public/book/visuals-index.json")).visuals;

function parseMarkdownTable(markdown) {
  const lines = markdown.split('\n').filter(l => l.trim().startsWith('|'));
  if (lines.length < 2) return null;
  
  const headers = lines[0].split('|').map(s => s.trim()).filter(Boolean);
  const rows = [];
  
  for (let i = 2; i < lines.length; i++) {
    const rawCells = lines[i].split('|');
    const cells = rawCells.slice(1, rawCells.length - 1).map(s => s.trim());
    if (cells.length > 0 && cells.some(c => c.length > 0)) {
      rows.push(cells);
    }
  }
  return { headers, rows };
}

const compiledRecords = recordMeta.map(meta => {
  const recDir = path.join("public/records", meta.dir);
  
  // Tables
  const tables = [];
  const tableDir = path.join(recDir, "tables");
  if (fs.existsSync(tableDir)) {
    const files = fs.readdirSync(tableDir).sort();
    for (const f of files) {
      if (f.endsWith(".md")) {
        const raw = fs.readFileSync(path.join(tableDir, f), "utf8");
        const titleMatch = raw.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1] : f.replace(".md", "").replace(/^[0-9]+-[A-Za-z]+-[A-Za-z]+-/, "");
        const parsed = parseMarkdownTable(raw);
        tables.push({
          filename: f,
          title,
          raw,
          parsed
        });
      }
    }
  }

  // Visuals
  const visuals = [];
  const visRec = visualsData.find(v => v.record === meta.id);
  if (visRec) {
    for (const item of visRec.items) {
      const fullPath = path.join(recDir, item.path, item.file);
      if (fs.existsSync(fullPath)) {
        let category = "General";
        const p = item.path.toLowerCase();
        if (p.includes("quantum")) category = "Quantum & Orbitals";
        else if (p.includes("spectral")) category = "Spectra & Optics";
        else if (p.includes("bonding")) category = "Bonding & Structure";
        else if (p.includes("isotope")) category = "Isotopes & Nuclear";
        else if (p.includes("properties")) category = "Properties & Phases";
        else if (p.includes("processes")) category = "Transformations";
        else if (p.includes("relationships")) category = "Knowledge & Provenance";
        else if (p.includes("applications")) category = "Applications & Technology";
        else if (p.includes("fields")) category = "Fields & Transport";
        else if (p.includes("scientific")) category = "Scientific Identity";

        const cleanName = item.file
          .replace(/^[0-9]{4}-[A-Za-z0-9]+-[A-Za-z0-9]+-/, "")
          .replace(/\.svg$/, "")
          .replace(/[-_]/g, " ");

        visuals.push({
          file: item.file,
          src: `/records/${meta.dir}/${item.path}${item.file}`,
          name: cleanName,
          category,
          path: item.path
        });
      }
    }
  }

  // Markdown chapter prose
  const mainMd = path.join(recDir, `${meta.dir}.md`);
  let prose = "";
  if (fs.existsSync(mainMd)) {
    prose = fs.readFileSync(mainMd, "utf8");
  }

  return {
    ...meta,
    matId: `MAT:${meta.id}`,
    tables,
    visuals,
    prose
  };
});

// Front matter docs
const frontMatter = [
  {
    id: "cover",
    title: "The Atlas of What Things Can Become",
    section: "Cover",
    content: fs.readFileSync("public/docs/00-front-matter/00-Front-Page.md", "utf8")
  },
  {
    id: "context",
    title: "Project Context & Genesis",
    section: "Front Matter",
    content: fs.readFileSync("public/docs/00-front-matter/01-Project-Context.md", "utf8")
  },
  {
    id: "purpose",
    title: "Purpose and Scope",
    section: "Front Matter",
    content: fs.readFileSync("public/docs/00-front-matter/02-Purpose-and-Scope.md", "utf8")
  },
  {
    id: "guide",
    title: "How to Use MAT Codex",
    section: "Front Matter",
    content: fs.readFileSync("public/docs/00-front-matter/03-How-to-Use-MAT-Codex.md", "utf8")
  },
  {
    id: "reading",
    title: "MAT Reading Guide",
    section: "Front Matter",
    content: fs.readFileSync("public/docs/00-front-matter/04-Reading-Guide.md", "utf8")
  },
  {
    id: "methodology",
    title: "Scientific Research Methodology",
    section: "Methodology",
    content: fs.readFileSync("public/docs/03-methodology/00-Research-Method.md", "utf8")
  }
];

fs.writeFileSync("src/data/mat-records.json", JSON.stringify(compiledRecords, null, 2));
fs.writeFileSync("src/data/mat-docs.json", JSON.stringify(frontMatter, null, 2));
console.log("SUCCESS: compiled mat-records.json and mat-docs.json!");
