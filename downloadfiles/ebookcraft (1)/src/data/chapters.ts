import { Chapter } from '../types';

export const CHAPTERS_DATA: Chapter[] = [
  {
    id: 'front-matter',
    part: 'FRONT MATTER',
    number: '00',
    title: 'Codex Architecture & Publication Standards',
    description: 'Foundational colophon, multi-edition production architecture, and editorial rights policy for the Materials Atlas Table Codex.',
    sections: [
      {
        id: 'colophon',
        title: 'Title Page & Colophon',
        slug: 'colophon',
        content: `
# Materials Atlas Table Codex (MAT)
### A Unified Atlas of Elemental Morphologies, Wave Harmonics, and Material Architectures

**Standard Edition 1.4.0 — Living Reference Release**  
*Compiled under the MAT Digital Book Production Standard*

---

### Colophon & Publication Statement
The **Materials Atlas Table Codex (MAT)** is an interactive, multi-dimensional scientific reference work and computational monograph. It synthesizes established quantum mechanics, historical chemical taxonomies, and non-Euclidean periodic geometries—including Walter Russell's 1926 Wavelength-Spiral, Kamal Akhtar's 360° Angular Projection, William Sheehan's Abundance Cartogram, and Rafael Poza's Magnetospheric Torus.

#### The Evidence-Tier Classification
To maintain rigorous scientific fidelity while exploring cutting-edge and historical hypotheses, every concept, figure, and record in this codex carries an explicit, non-color-dependent classification:

* **[CORE] Established Science**: Validated by empirical spectroscopy, quantum mechanics, IUPAC conventions, and peer-reviewed consensus.
* **[RESEARCH] Emerging & Author Hypotheses**: Novel computational models, the Causali E wave framework, alternative geometric projections, and active laboratory inquiries.
* **[HISTORICAL] Historical & Speculative Models**: Walter Russell's 1926 cosmological octave charts, pre-quantum aether/space-gas hypotheses, and early intuitive classifications.

#### Four Coordinated Editions
1. **Living Reference (Web/PWA)**: Full interactivity, dynamic alignment overlay engine, audio reader, and interactive SVG/Canvas explorers.
2. **Retail/Reflowable Edition (EPUB 3.3)**: Formally validated reflowable standard for Kindle, Apple Books, and Kobo.
3. **Print-Ready Edition (A4 / 6×9 PDF)**: Archival fixed-layout snapshot engineered with CSS Paged Media rules and orphan/widow control.
4. **Citable Dataset Edition**: Canonical JSON/YAML dataset versioned with persistent cryptographic snapshots for formal scientific citation.
        `,
        summary: 'Official colophon, evidence-tier definitions, and four-edition publication hierarchy.'
      },
      {
        id: 'four-editions',
        title: 'The Four-Edition Production Architecture',
        slug: 'four-editions',
        tier: 'core',
        content: `
## Architecture: Four Coordinated Outputs from One Source of Truth

An interactive, multi-geometry, text-to-speech-enabled scientific atlas cannot be reduced to a single generic file without catastrophic loss of utility. The MAT Codex solves this through a coordinated single-source-of-truth pipeline:

| Edition | Primary Medium | Execution Model | Citability Target |
| :--- | :--- | :--- | :--- |
| **Living Reference** | Web / PWA | Interactive SVG, dynamic alignment overlays, Web Speech TTS, reactive filtering | Continuous updates via git commit |
| **Retail EPUB 3.3** | E-Readers | Reflowable XHTML, vector SVG diagrams, semantic markup, EPUB Accessibility 1.1 | Retail ASIN / ISBN |
| **Print Snapshot** | Bound Volume / PDF | Fixed A4 & 6x9 pagination, dual-column typography, high-contrast monochrome fallbacks | Print ISBN |
| **Dataset Release** | Open Science Repositories | Canonical JSON Schemas, machine-validated YAML records, geometric coordinates | Zenodo Concept & Version DOI |

### The Bridge Principle
Where physical or reflowable formats cannot execute live interaction (e.g. 3D spatial orbit rotations, real-time overlay opacity blending), each record provides a canonical permalink and QR-code bridge pointing back to the living reference edition. No reader is left with a broken or silent placeholder.
        `
      }
    ]
  },

  {
    id: 'foundations',
    part: 'PART I',
    number: '01',
    title: 'Foundations of Periodic Morphology',
    description: 'From Mendeleev’s 1869 periodicity to the Madelung quantum rule and the Causali E harmonic wave framework.',
    sections: [
      {
        id: 'quantum-periodic-law',
        title: 'The Quantum Periodic Law & The Madelung Rule',
        slug: 'quantum-periodic-law',
        tier: 'core',
        content: `
## The Quantum Periodic Law: Orbital Topography

The canonical layout of the periodic table is fundamentally an artifact of the **Madelung Rule** (or the $n + \ell$ energy ordering rule). For multi-electron atoms, orbitals fill in order of increasing $(n + \ell)$, and when two orbitals share the same $(n + \ell)$ value, the orbital with the lower principal quantum number $n$ is filled first.

$$1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p < 5s < 4d < 5p < 6s < 4f < 5d < 6p < 7s < 5f < 6d < 7p$$

### The Geometric Paradox
While Mendeleev’s rectilinear grid brilliantly highlights valence periodicity (Groups 1–18), it introduces profound spatial artifacts:
1. **The f-Block Disconnect**: Lanthanides and Actinides are chopped out and exiled into floating footnotes at the bottom of the page, obscuring the seamless progression of electron addition.
2. **Arbitrary Period Ruptures**: Moving from Helium ($Z=2$) to Lithium ($Z=3$), or Argon ($Z=18$) to Potassium ($Z=19$), requires jumping from the far right edge back to the far left, creating an artificial discontinuity in what is physically a smooth, continuous sequence of atomic mass and proton numbers.
3. **Disregard for Elemental Abundance**: A hyper-rare synthetic actinide like Tennessine ($Z=117$) occupies an identical spatial visual area as Oxygen ($Z=8$) or Silicon ($Z=14$), distorting the perceived reality of nature.

These three paradoxes inspired over a century of alternative geometries—from spirals and cones to 360-degree polar wheels and abundance cartograms.
        `
      },
      {
        id: 'causali-e-framework',
        title: 'The Causali E Framework & Harmonic Wave Fields',
        slug: 'causali-e-framework',
        tier: 'research',
        content: `
## The Causali E Framework: Matter as Standing Wave Resonances [RESEARCH]

The **Causali E** framework posits that elemental matter does not consist of static billiard-ball nucleons, but rather localized, self-reinforcing standing wave nodes within a continuous dielectric and magnetic plenum.

### Key Tenets of the Causali E Formulation
1. **Harmonic Octave Progression**: Elemental mass and chemical reactivity correlate with resonant cavity frequencies. Each period represents an octave overtone of the fundamental zero-point vacuum impedance.
2. **Dipolar Vortex Fields**: The nuclear core acts as an intense centripetal vortex (charging phase), while the electron cloud represents a centrifugal decompression envelope (discharging phase).
3. **Crystallographic Cubic Packing**: As wave amplitude peaks at Group 14 (Carbon, Silicon, Germanium), orbital nodes converge into orthogonal tetrahedral and cubic geometries with maximal spatial density.

> **Editorial Note [RESEARCH]**: The Causali E framework represents an exploratory mathematical hypothesis. While its geometric symmetries map with surprising elegance onto the Schrödinger wave equations and Walter Russell's wave-mechanics, it is treated here alongside established quantum electrodynamics to stimulate new analytical perspectives.
        `
      }
    ]
  },

  {
    id: 'alternative-geometries',
    part: 'PART II',
    number: '02',
    title: 'Alternative Periodic Tables & Geometric Morphologies',
    description: 'Exhaustive analysis and interactive recreations of the 11 uploaded alternative periodic systems, with mathematical axioms and spatial blueprints.',
    sections: [
      {
        id: 'russell-wave-spiral',
        title: "Walter Russell's 9-Octave Wavelength-Spiral (1926)",
        slug: 'russell-wave-spiral',
        modelId: 'russell-wavelength-spiral',
        tier: 'historical',
        content: `
## Walter Russell's 9-Octave Wavelength-Spiral [HISTORICAL]

In 1926, artist, philosopher, and independent physicist **Walter Russell** published *The Universal One*, presenting a radical revision of elemental chemistry: the **Periodic Table of Elements Based on the Wavelength-Spiral**.

### Morphological Analysis
Rather than a two-dimensional grid, Russell conceived elements as phase positions along a continuous, nine-octave serpentine cosine wave. 

* **The Zero-Motion Inertia Line**: The central vertical spine consists entirely of inert noble gases: **Alphanon, Betanon, Gammanon, Helium, Neon, Argon, Krypton, Xenon, Radon, and Omeganon**. Russell viewed these not as unreactive chemical anomalies, but as the zero-velocity still points from which all dynamic motion originates and into which it dissolves.
* **The Four Generative Tones**: Within each half-octave, matter accelerates through four tonal steps:
  * $+1$ (Alkali Metals): Red generative inception.
  * $+2$ (Alkaline Earths): Orange compression.
  * $+3$ (Boron/Aluminum groups): Yellow-green transition.
  * $\pm 4$ (Carbon / Group 14): Maximum wave amplitude, true sphere-to-cube crystallization, maximum density, and electrical neutrality.
* **The Discharging Decay Phase**: Past the amplitude crest, the wave reverses into radiation and discharge ($-3, -2, -1$) returning to the next noble gas still-point.

### The 1926 Transuranic Predictions
Remarkably, Russell’s 1926 chart explicitly plotted two undiscovered elements beyond Uranium at the tail of the 9th Octave, labelling them as post-uranic octaves. Fourteen years later, in 1940, Edwin McMillan and Glenn Seaborg confirmed the synthesis of **Neptunium ($Z=93$)** and **Plutonium ($Z=94$)** at the Berkeley Radiation Laboratory.
        `
      },
      {
        id: 'akhtar-angular-projection',
        title: "Kamal Akhtar's 360° Angular Periodic Table",
        slug: 'akhtar-angular-projection',
        modelId: 'akhtar-angular-table',
        tier: 'research',
        content: `
## Kamal Akhtar's 360° Angular Periodic Table [RESEARCH]

Designed by Indian educator and researcher **Kamal Akhtar** (INTEL, Saharanpur, India), the **Angular Form of the Periodic Table** solves the period-discontinuity problem by wrapping the periodic sequence around a 360-degree polar coordinate system.

### Spatial Architecture
The Akhtar model divides polar space into two intersecting geometric entities:

1. **The Principal Circle ($0^\circ - 360^\circ$)**:
   * **s-Block ($0^\circ - 40^\circ$)**: Initiating at the $0^\circ / 360^\circ$ vertical meridian (Alkali and Alkaline Earth metals).
   * **d-Block ($60^\circ - 200^\circ$)**: Transition metals spanning the lower-right hemisphere.
   * **p-Block ($220^\circ - 340^\circ$)**: Nonmetals, metalloids, and halogens sweeping the upper-left quadrants.
   * **Group 18 Noble Gases ($360^\circ$)**: Perfectly closing the loop at the zenith, where Neon, Argon, Krypton, Xenon, and Radon form the bridge directly into the next outer concentric track.
2. **The Auxiliary Circle (The f-Block Orbit)**:
   * Positioned tangentially at the upper right, linked by geometric ray projections.
   * Contains the 14 Lanthanides ($4f$) and 14 Actinides ($5f$) in a self-contained 360-degree auxiliary dial, avoiding the clutter of stretching the main circle while preserving exact angular correspondence.

### Mathematical Alignment
Because angle $\theta$ maps directly to valence configuration and radius $r$ maps to principal quantum number $n$, the Akhtar table allows immediate polar-coordinate vector calculus of chemical periodicity.
        `
      },
      {
        id: 'sheehan-cartogram',
        title: "William Sheehan's Relative Abundance Cartogram",
        slug: 'sheehan-cartogram',
        modelId: 'sheehan-relative-abundance',
        tier: 'core',
        content: `
## William Sheehan's Relative Abundance Cartogram [CORE]

Published in 1976 by Professor **William F. Sheehan** of the University of Santa Clara, this cartographic periodic table provides an indispensable reality check against abstract quantum grids.

### The Topography of Scarcity
In standard tables, rare synthetic laboratory curiosities occupy equal area to the elements that form 99% of all rocks, oceans, and living tissue. Sheehan’s projection rescales each element's cell area proportionally to its **relative geochemical and cosmic abundance**:

* **The Colossi**: **Oxygen ($46.1\%$)**, **Silicon ($28.2\%$)**, **Aluminum ($8.2\%$)**, **Iron ($5.6\%$)**, **Calcium ($4.1\%$)**, and **Sodium ($2.4\%$)** dominate the landscape as gigantic continental masses.
* **The Organic Pinnacle**: **Hydrogen** and **Carbon** loom large in biological and astrophysical proportion.
* **The Collapsed Crevasses**: The entire Lanthanide and Actinide series, alongside precious noble metals (Gold, Platinum, Osmium, Iridium), are compressed into hairline fissures and micro-ribbons.

### Electronegativity Color Mapping
Sheehan overlaid a secondary thermodynamic dimension: **Pauling Electronegativity**.
* Deep **Cerulean Blue**: Strongly electropositive metals (Alkalis, Alkaline earths).
* Neutral **Lilac & Gray**: Transition metals and amphoteric metalloids.
* Vivid **Vermilion & Orange**: Highly electronegative halogens and chalcogens (Oxygen, Fluorine, Chlorine).
        `
      },
      {
        id: 'poza-magnetosphere',
        title: "Rafael Poza's Magnetospheric Torus & Fractal Geometry",
        slug: 'poza-magnetosphere',
        modelId: 'poza-toroidal-magnetosphere',
        tier: 'research',
        content: `
## Rafael Poza's Magnetospheric Torus (2008) [RESEARCH]

Titled *"Síntesis del Sistema Periódico de los Elementos y la Magnetosfera: Geometría Fractal del Uno"* by Spanish researcher **Rafael Poza**, this masterwork unifies atomic subshell structure with planetary and astrophysical magnetic fields.

### The Toroidal Manifold
Poza demonstrates that the electron subshells $s, p, d, f$ correspond to closed toroidal geodesic windings on a double-vortex manifold:
* **s-Sublevel**: Core axial dipole vortex.
* **p-Sublevel**: Dual-lobed poloidal flux circuits.
* **d-Sublevel**: Quadrupole toroidal circulation.
* **f-Sublevel**: Complex higher-order multipole braided geodesics.

Elements appear as resonant nodal intersection points where red (positive electric / divergent) and blue (negative magnetic / convergent) flux lines cross. This geometry offers an intuitive spatial explanation for why electron shells have capacities of $2, 8, 18, 32$: they are the exact topological knot invariants of nested tori.
        `
      },
      {
        id: 'pyramidal-subshell',
        title: "The Pyramidal / Triangular Subshell Table",
        slug: 'pyramidal-subshell',
        modelId: 'pyramidal-subshell-table',
        tier: 'core',
        content: `
## The Pyramidal Subshell Table: Pure 2n² Geometry [CORE]

The step-pyramid periodic table renders the mathematical order of quantum mechanics with architectural clarity.

### Triangular Stacking Rules
Arranging the periods $K, L, M, N, O, P, Q$ ($n=1..7$) into a nested equilateral triangle reveals that the number of elements in each block forms a sequence of even squares:

$$\text{Capacity}(n) = 2n^2 \implies 2(1^2) = 2,\; 2(2^2) = 8,\; 2(3^2) = 18,\; 2(4^2) = 32$$

Along the right slope, precise quantum numbers are annotated:
* Shell Number $n$
* Types of Subshells: $s (0), p (1), d (2), f (3), g (4)$
* Number of Orbitals: $1, 3, 5, 7, 9 = 2\ell + 1$
* Maximum Electrons per Subshell: $2(2\ell + 1) = 2, 6, 10, 14, 18$

The pyramidal table eliminates all empty interstitial spaces found in the IUPAC table, stacking blocks symmetrically from apex to base.
        `
      },
      {
        id: 'concentric-ring-system',
        title: "Stowe / Dufour Concentric Polar System",
        slug: 'concentric-ring-system',
        modelId: 'concentric-ring-table',
        tier: 'core',
        content: `
## Concentric Polar Periodic Rings [CORE]

First popularized in variations by Janet, Dufour, and Philip Stowe, the **Concentric Polar Table** places Hydrogen at the central coordinate origin $(0, 0)$.

### Spatial Mechanics
* Each concentric ring represents a discrete principal energy level $n$.
* As $n$ increases from 1 to 7, the circumference of each ring expands, providing precisely enough metric length to accommodate the expanded orbital capacities ($s \to s+p \to s+d+p \to s+f+d+p$).
* The Noble Gases (He, Ne, Ar, Kr, Xe, Rn) form an unbending vertical ray at the top meridian ($0^\circ$), symbolizing chemical closure and inert stability.
        `
      },
      {
        id: 'dendritic-tree-morphology',
        title: "The Dendritic Arboreal Periodic Tree",
        slug: 'dendritic-tree-morphology',
        modelId: 'dendritic-tree-table',
        tier: 'research',
        content: `
## The Dendritic Arboreal Tree [RESEARCH]

In the **Dendritic Tree of Elements**, atomic evolution is expressed through the morphology of phylogenetic botany.

* **The Trunk**: Ascends from primordial Hydrogen, branching through Carbon and Silicon.
* **The Symmetrical Boughs**:
  * Left Bough: Alkali and Alkaline Earth metals branching outward in order of reactivity.
  * Central Canopy: Transition metals and refractory elements forming the structural crown.
  * Right Bough: Chalcogens, Halogens, and Noble Gases.
* **Dashed Quantum Isochrons**: Semicircular concentric rings cross all branches simultaneously, indicating that despite vastly divergent chemical behaviors, elements on the same isochron share identical valence electron counts.
        `
      },
      {
        id: 'harrington-projection',
        title: "Harrington's 270 AMU Polar Projection",
        slug: 'harrington-projection',
        modelId: 'harrington-polar-projection',
        tier: 'research',
        content: `
## Harrington's 270 AMU Polar Projection [RESEARCH]

Produced by Rainforest Reactor Research, the **Harrington Projection** charts the elements along quadratic mass radii up to 270 AMU (Atomic Mass Units).

### Core Geometric Symmetries
1. **Quadratic Shell Radii**: Concentric boundary rings expand at radii corresponding to integer squares: $2^2 (4), 3^2 (9), 4^2 (16), 5^2 (25), 6^2 (36), 7^2 (49), 8^2 (64)$.
2. **The Continental Divide**: A mid-table diagonal axis separating forward-causal and inverse-causal temporal bias.
3. **Proton vs Counter-Proton Phase Rotation**: Tracks relativistic spin rotation in relative degrees ($79^\circ/11^\circ, 67^\circ/22^\circ, 45^\circ/45^\circ$).
        `
      },
      {
        id: 'makeev-dual-spiral-morph',
        title: "Makeev's Dual-Vortex Sphere-Vector Fractal",
        slug: 'makeev-dual-spiral-morph',
        modelId: 'makeev-dual-spiral',
        tier: 'research',
        content: `
## Makeev's Dual-Vortex Sphere-Vector Fractal [RESEARCH]

Formulated by Russian theorist **A. K. Makeev**, this elliptical dual-spiral unifies atomic masses with photon-electron interactions in what Makeev terms *"Synergy of Sphere-Vector Fractals of the Universe"*.

Originating from a central singularity labeled **nt/n (neutron/proton) / photon-sinergon**, two opposing golden spirals unfurl across five nested harmonic zones, charting elements from Hydrogen ($Z=1$) through current transuranics to hypothetical superheavy element $170$.
        `
      },
      {
        id: 'twin-cone-helical-morph',
        title: "The Twin-Cone Helical 3D Morph",
        slug: 'twin-cone-helical-morph',
        modelId: 'twin-cone-helical',
        tier: 'research',
        content: `
## The Twin-Cone Helical Model [RESEARCH]

Representing early 3D physical periodic models, the **Twin-Cone Helical Model** sculpts element trajectories along two opposing conical spires mounted on circular pedestals.

Helical windings maintain unbroken continuity across periods. As the conical diameter widens with increasing atomic mass, secondary planar flaps emerge tangentially from the spire surface to accommodate the 14-element Lanthanide and Actinide cascades without distorting the primary helical trajectory.
        `
      }
    ]
  },

  {
    id: 'alignment-engine',
    part: 'PART III',
    number: '03',
    title: 'The Multi-Model Alignment & Overlay Engine',
    description: 'Direct mathematical cross-projection: where spiral, angular, pyramidal, and cartographic projections align.',
    sections: [
      {
        id: 'harmonic-unification',
        title: 'Geometric Cross-Alignment & The Universal Invariants',
        slug: 'harmonic-unification',
        tier: 'core',
        content: `
## Cross-Model Alignment: Finding the Invariant Axes of Matter

When we overlay Walter Russell's cosine wave, Kamal Akhtar's 360° polar disc, Sheehan's abundance cartogram, and the standard Mendeleev matrix, an extraordinary mathematical congruence emerges:

### 1. The Noble Gas Zero-Motion Meridian ($Z = 2, 10, 18, 36, 54, 86, 118$)
* **In Mendeleev**: Group 18 (far right vertical column).
* **In Walter Russell**: The exact horizontal zero-motion nodes where wave amplitude passes through zero velocity.
* **In Kamal Akhtar**: The $0^\circ / 360^\circ$ vertical meridian where periods close and restart.
* **In Concentric Rings**: The top vertical zenith ray.
* **Physical Significance**: Closed electron shells ($s^2 p^6$) possess spherical symmetry with zero net orbital dipole moment.

### 2. The Group 14 Tetrahedral Amplitude Peak ($C, Si, Ge, Sn, Pb$)
* **In Mendeleev**: Group 14, perfectly bisecting the main group elements.
* **In Walter Russell**: The positive/negative crest of maximal wave amplitude ($\pm 4$), characterized by tetrahedral-to-cubic crystallization.
* **In Sheehan's Cartogram**: Carbon and Silicon form towering continental plateaus.
* **Physical Significance**: Half-filled p-shells with 4 valence electrons enable maximal covalent catenation and polymeric structural diversity.

### 3. The Alkali Inception Axis ($Li, Na, K, Rb, Cs, Fr$)
* Marks the sudden expansion of atomic radius ($s^1$ electron in an unshielded new shell).
* In all polar models, it immediately borders the noble gas boundary, confirming that period boundaries are continuous phase transitions rather than discrete rectangular breaks.
        `
      }
    ]
  },

  {
    id: 'elemental-monographs',
    part: 'PART IV',
    number: '04',
    title: 'Canonical Element Monographs & Wave Dynamics',
    description: 'Deep physical, structural, and wave-harmonic profiles of cornerstone elements across multiple geometric projections.',
    sections: [
      {
        id: 'element-0001-h',
        title: 'Element 0001: Hydrogen (H) — The Cosmic Genesis',
        slug: 'element-0001-h',
        elementId: 1,
        tier: 'core',
        content: `
## Record 0001: Hydrogen (H)
**Atomic Number**: 1 | **Standard Mass**: 1.008 u | **Electronic Configuration**: $1s^1$  
**Pauling Electronegativity**: 2.20 | **Cosmic Abundance**: ~75% (750,000 PPM)

### Physical Identity & Multi-Geometry Positioning
* **Standard Table**: Sits atop Group 1 (Alkali Metals), though chemically anomalous due to its covalent character and lack of core electrons.
* **Walter Russell Octave 4**: Russell places Hydrogen at the $+1$ tone of the 4th Octave, directly preceded by three octaves of invisible space gases (Alphanon, Betanon, Gammanon).
* **Sheehan Cartogram**: Appears as a gargantuan mountain dominating the upper left corner of the cosmos.
* **Concentric Table**: Occupies the exact geometrical origin $(0, 0)$—the central sun around which all subsequent periods orbit.

### Causali E Wave Profile [RESEARCH]
Hydrogen represents the fundamental dipole: a single proton vortex capturing a solitary dielectric envelope. Its spectrum lines (Lyman, Balmer, Paschen series) represent the natural resonant overtones of a spherical dielectric cavity.
        `
      },
      {
        id: 'element-0006-c',
        title: 'Element 0006: Carbon (C) — The Amplitude Summit',
        slug: 'element-0006-c',
        elementId: 6,
        tier: 'core',
        content: `
## Record 0006: Carbon (C)
**Atomic Number**: 6 | **Standard Mass**: 12.011 u | **Electronic Configuration**: $[He]\,2s^2\,2p^2$  
**Pauling Electronegativity**: 2.55 | **Valence**: 4 | **Crystal Lattice**: Diamond (Cubic Fd3m) / Graphite (Hexagonal P63/mmc)

### Wave-Harmonic Architecture
In Walter Russell's cosmology, Carbon is the **Master Wave Crest of the 4th Octave**:
* Tone: $\pm 4$ (perfect electrical equilibrium).
* Geometry: True cube. Carbon diamond crystals manifest perfect octahedral and cubic symmetry, exhibiting the highest atomic number density and hardness in nature.
* Sheehan Topography: Forms an expansive continental massif adjacent to Oxygen and Nitrogen, reflecting its foundational role in organic chemistry.
        `
      },
      {
        id: 'element-0094-pu',
        title: 'Element 0094: Plutonium (Pu) — The Predicted Actinide',
        slug: 'element-0094-pu',
        elementId: 94,
        tier: 'core',
        content: `
## Record 0094: Plutonium (Pu)
**Atomic Number**: 94 | **Standard Mass**: 244 u | **Electronic Configuration**: $[Rn]\,5f^6\,7s^2$  
**Evidence Tier**: [CORE / HISTORICAL PREDICTION]

### The 1926 Russell Foresight
In 1926, Walter Russell plotted Plutonium on his spiral octave wave under Octave 9, fourteen years before Glenn Seaborg, Arthur Wahl, and Joseph Kennedy isolated isotope $^{238}\text{Pu}$ via deuteron bombardment of uranium in December 1940.

### Structural Allotropes
Plutonium displays six distinct solid-state allotropes at atmospheric pressure ($\alpha, \beta, \gamma, \delta, \delta', \epsilon$) with dramatic density shifts between $19.8\text{ g/cm}^3$ and $15.9\text{ g/cm}^3$—the most complex phase behavior of any element in the periodic table.
        `
      },
      {
        id: 'russell-space-gases',
        title: 'The Primordial Space Gases: Alphanon, Betanon, Gammanon',
        slug: 'russell-space-gases',
        tier: 'historical',
        content: `
## The Pre-Hydrogen Space Gases [HISTORICAL]
**Alphanon** (Octave 1, Tone 0) | **Betanon** (Octave 2, Tone 0) | **Gammanon** (Octave 3, Tone 0)

### Historical Context & Conceptual Heritage
In Walter Russell's 1926 treatise, three entire octaves of matter exist prior to Hydrogen. Russell posited that just as high-frequency radio waves exist beyond visible perception, these "space-gases" or "inertial aetheric octaves" constitute the gravitational and zero-point matrix of space:

* **Alphanon**: The ultimate universal seed of light and gravitation.
* **Betanon**: The intermediate charging octave.
* **Gammanon**: The immediate precursor gas condensing into Hydrogen ($1s^1$).

While modern quantum electrodynamics accounts for the vacuum via quantum fluctuations and dark matter rather than chemical elements, Russell's intuition that Hydrogen is not the ultimate beginning mirrors modern astrophysical inquiries into the primordial inflationary epoch.
        `
      }
    ]
  }
];
