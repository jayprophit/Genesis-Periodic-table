# MAT Universal Schema

## Purpose

The MAT Universal Schema defines the complete information architecture used across the Materials Atlas Table Codex.

It is a superset schema.

Not every field applies to every element, isotope, compound, material, process or state.

However, applicable fields must not be silently omitted.

Each field must resolve to either:

- a value;
- a structured set of values;
- `UNKNOWN`;
- `NOT-MEASURED`;
- `NOT-AVAILABLE`;
- `NOT-APPLICABLE`;
- `NOT-ESTABLISHED`;
- or another formally defined MAT null state.

---

# 1. Core MAT State Model

A MAT state is represented conceptually as:

\[
M_i =
F(
I,
N,
Q,
E,
EM,
SP,
CH,
ST,
TH,
ME,
P,
ENV,
PROC,
G,
t,
s
)
\]

where:

- \(I\) = identity;
- \(N\) = nuclear state;
- \(Q\) = quantum state;
- \(E\) = electronic state;
- \(EM\) = electromagnetic state;
- \(SP\) = spectral state;
- \(CH\) = chemical state;
- \(ST\) = structural state;
- \(TH\) = thermodynamic state;
- \(ME\) = mechanical state;
- \(P\) = pressure/loading state;
- \(ENV\) = environment;
- \(PROC\) = process/history;
- \(G\) = geometry;
- \(t\) = time;
- \(s\) = physical scale.

This function is architectural notation and does not imply that one universal closed-form physical equation exists.

---

# 2. Record Metadata

Every primary record contains:

- MAT identifier;
- canonical name;
- symbol or formula where applicable;
- record class;
- parent identifier;
- record status;
- schema version;
- record version;
- creation date;
- last review date;
- last modification date;
- authors/contributors;
- scientific reviewers where applicable;
- source count;
- evidence summary;
- completeness status;
- notes.

---

# 3. Atomic Identity Layer

Applicable primarily to elements and atomic species.

Fields include:

- atomic number;
- element name;
- chemical symbol;
- atomic mass;
- standard atomic weight;
- isotope-dependent mass;
- proton count;
- neutron count;
- electron count;
- charge state;
- atomic radius;
- empirical atomic radius;
- calculated atomic radius;
- covalent radius;
- ionic radius;
- van der Waals radius;
- periodic-table group;
- period;
- block;
- chemical family;
- natural occurrence;
- synthetic status;
- abundance;
- discovery history;
- naming history.

Different definitions of radius must remain separate.

---

# 4. Isotope and Nuclear Layer

For each isotope:

- isotope identifier;
- nuclide notation;
- proton number;
- neutron number;
- mass number;
- isotopic mass;
- natural abundance;
- nuclear spin;
- nuclear parity;
- nuclear magnetic moment;
- nuclear electric quadrupole moment;
- binding energy;
- binding energy per nucleon;
- mass defect;
- stability;
- half-life;
- mean lifetime;
- decay constant;
- decay modes;
- branching ratios;
- daughter products;
- decay chains;
- decay energy;
- Q-value;
- alpha emissions;
- beta-minus emissions;
- beta-plus emissions;
- electron capture;
- gamma emissions;
- neutron emissions;
- proton emissions;
- internal conversion;
- spontaneous fission;
- nuclear excited states;
- nuclear isomers;
- neutron separation energy;
- proton separation energy;
- neutron capture cross-section;
- reaction cross-sections;
- fission relevance;
- fusion relevance;
- nucleosynthesis pathways.

Radioactive decay may be represented by:

\[
N(t)=N_0e^{-\lambda t}
\]

with:

\[
\lambda=\frac{\ln 2}{t_{1/2}}
\]

when simple exponential decay is applicable.

---

# 5. Quantum State Layer

Applicable fields include:

- quantum-state identifier;
- state vector where meaningful;
- density matrix where meaningful;
- principal quantum number;
- orbital angular momentum;
- magnetic quantum number;
- spin;
- spin projection;
- total angular momentum;
- parity;
- term symbol;
- energy eigenvalue;
- degeneracy;
- occupation;
- selection rules;
- transition probability;
- transition lifetime;
- exchange interaction;
- tunnelling;
- coherence;
- decoherence;
- relaxation;
- entanglement where physically meaningful;
- quantum confinement;
- zero-point contribution;
- Berry phase;
- topological state;
- quantum statistics.

Historical models must be labelled separately from contemporary quantum descriptions.

---

# 6. Electronic Layer

Fields include:

- electron configuration;
- valence electrons;
- core electrons;
- orbital occupation;
- oxidation-state electronic configuration;
- ionisation energies;
- electron affinity;
- electronegativity;
- work function;
- band structure;
- bandgap;
- direct/indirect bandgap;
- Fermi energy;
- Fermi level;
- density of electronic states;
- carrier density;
- electron mobility;
- hole mobility;
- effective mass;
- conductivity mechanism;
- semiconductor type;
- surface electronic states.

---

# 7. Electromagnetic Layer

## Electrical

- net charge;
- charge states;
- conductivity;
- resistivity;
- dielectric permittivity;
- relative permittivity;
- dielectric susceptibility;
- dielectric loss;
- dielectric strength;
- electrical breakdown field;
- polarisation;
- piezoelectric response;
- pyroelectric response;
- ferroelectric behaviour;
- electrostriction;
- Hall coefficient;
- Hall mobility;
- electrochemical potential.

## Magnetic — Intrinsic/Natural

- atomic magnetic moment;
- nuclear magnetic moment;
- magnetic susceptibility;
- permeability;
- diamagnetism;
- paramagnetism;
- ferromagnetism;
- ferrimagnetism;
- antiferromagnetism;
- magnetic ordering;
- Curie temperature;
- Néel temperature;
- magnetic anisotropy;
- coercivity;
- remanence;
- saturation magnetisation;
- magnetoresistance;
- spin transport.

## Magnetic — Engineered State

Engineered magnetisation is recorded independently from intrinsic magnetic behaviour.

Fields include:

- magnetisation magnitude;
- magnetisation vector;
- field orientation;
- axial magnetisation;
- radial magnetisation;
- diametric magnetisation;
- tangential magnetisation;
- multipole geometry;
- number of poles;
- domain orientation;
- applied magnetising field;
- magnetising procedure;
- applied-field history;
- magnetic-field gradient;
- measured external field;
- measured internal field;
- demagnetisation state;
- remagnetisation state.

This distinction prevents a manufactured magnetic configuration from being mistaken for an intrinsic atomic/material property.

---

# 8. Frequency, Oscillation and Resonance Layer

MAT does not define one universal "frequency of an element."

Frequency-related observations are separated into physical mechanisms.

Possible categories include:

\[
\boldsymbol{\nu}=
[
\nu_\text{nuclear},
\nu_\text{hyperfine},
\nu_\text{electronic},
\nu_\text{rotational},
\nu_\text{vibrational},
\nu_\text{phonon},
\nu_\text{plasma},
\nu_\text{acoustic}
]
\]

Each applicable feature may contain:

- frequency;
- angular frequency;
- wavelength;
- photon/transition energy;
- linewidth;
- lifetime;
- oscillator strength;
- polarisation;
- selection rules;
- harmonic number;
- subharmonic relationship;
- quality factor;
- coupling mechanism;
- excitation method;
- detection method.

---

# 9. Optical and Photonic Layer

Fields include:

- absorption spectrum;
- emission spectrum;
- reflectance;
- transmittance;
- refractive index;
- extinction coefficient;
- optical dispersion;
- fluorescence;
- phosphorescence;
- photoluminescence;
- Raman response;
- infrared response;
- ultraviolet response;
- X-ray response;
- gamma response;
- nonlinear optical response;
- photoelectric response;
- photoconductivity;
- photovoltaic response;
- plasmonic response;
- optical bandgap;
- birefringence;
- scattering properties.

Every wavelength-dependent property should retain wavelength or frequency.

---

# 10. Thermal and Thermodynamic Layer

Fields include:

- temperature;
- melting point;
- boiling point;
- sublimation point;
- triple point;
- critical point;
- heat capacity;
- specific heat capacity;
- thermal conductivity;
- thermal diffusivity;
- thermal expansion;
- latent heat;
- enthalpy;
- entropy;
- Gibbs free energy;
- Helmholtz free energy;
- thermal stability;
- decomposition temperature;
- Debye temperature;
- cryogenic behaviour;
- high-temperature behaviour;
- phase-transition temperatures;
- thermal cycling response.

Thermal history must be recorded where it affects the final material.

---

# 11. Pressure and Mechanical Loading Layer

Fields include:

- pressure;
- compressibility;
- bulk modulus;
- pressure-dependent phase;
- pressure-induced phase transition;
- metallisation pressure;
- superconducting pressure region;
- shock response;
- dynamic compression;
- hydrostatic loading;
- uniaxial loading;
- biaxial loading;
- triaxial loading.

---

# 12. Chemical Layer

Fields include:

- oxidation states;
- reduction states;
- valence;
- bond types;
- bond orders;
- bond energies;
- bond lengths;
- bond angles;
- coordination numbers;
- electronegativity relationships;
- acidity/basicity;
- redox potential;
- electrochemical potential;
- reaction kinetics;
- rate constants;
- activation energies;
- catalytic behaviour;
- corrosion;
- solubility;
- diffusion;
- adsorption;
- absorption;
- chemical potential;
- chemical stability;
- reaction pathways.

---

# 13. Molecular and Compound Layer

For compounds:

- molecular formula;
- empirical formula;
- structural formula;
- molecular mass;
- constituent MAT identifiers;
- stoichiometry;
- molecular geometry;
- symmetry;
- bond network;
- charge;
- spin state;
- conformers;
- isomers;
- phase;
- crystal structure where applicable;
- decomposition pathways;
- reaction pathways.

---

# 14. Structural and Materials Layer

Fields include:

- allotrope;
- phase;
- crystal system;
- space group;
- lattice parameters;
- unit cell;
- coordination;
- atomic positions;
- amorphous state;
- grain size;
- grain shape;
- grain orientation;
- crystallographic texture;
- porosity;
- pore-size distribution;
- vacancies;
- substitutions;
- interstitials;
- dislocations;
- stacking faults;
- grain boundaries;
- surfaces;
- interfaces;
- defects;
- microstructure;
- nanostructure;
- macrostructure.

---

# 15. Mechanical Properties Layer

Fields include:

- density;
- Young's modulus;
- shear modulus;
- bulk modulus;
- Poisson ratio;
- yield strength;
- ultimate tensile strength;
- compressive strength;
- flexural strength;
- fracture toughness;
- hardness;
- ductility;
- brittleness;
- elasticity;
- plasticity;
- fatigue strength;
- fatigue life;
- creep;
- impact resistance;
- damping;
- wear;
- friction.

Direction-dependent measurements must include orientation.

---

# 16. Physical Scale Layer

Possible scale classes:

- subnuclear;
- nuclear;
- atomic;
- molecular;
- nanoscale;
- microscale;
- mesoscale;
- macroscale;
- bulk;
- planetary;
- astrophysical.

The numeric scale should be recorded where possible rather than relying only on labels.

---

# 17. Geometry Layer

Geometry may materially influence behaviour.

Fields may include:

- sample dimensions;
- thickness;
- cross-section;
- aspect ratio;
- curvature;
- orientation;
- surface area;
- surface-area-to-volume ratio;
- topology;
- shape;
- layer count;
- particle size;
- particle distribution;
- pore geometry;
- lattice geometry;
- field geometry.

---

# 18. Extreme-State Layer

MAT may evaluate records under:

- vacuum;
- ultra-high vacuum;
- cryogenic temperature;
- extreme heat;
- high pressure;
- dynamic pressure;
- plasma conditions;
- strong electric fields;
- strong magnetic fields;
- intense optical fields;
- ionising radiation;
- particle bombardment;
- microgravity;
- high acceleration;
- shock;
- high strain-rate environments.

Extreme states are conditions, not assumed intrinsic properties.

---

# 19. Process and Manufacturing Layer

Every process may contain:

- process identifier;
- input materials;
- output materials;
- process category;
- equipment;
- atmosphere;
- temperature;
- pressure;
- time;
- heating rate;
- cooling rate;
- applied fields;
- energy input;
- feed rate;
- deposition rate;
- strain;
- strain rate;
- geometry;
- catalyst;
- solvent;
- process sequence;
- post-processing;
- measured outcome.

Process families include:

### Thermal
- melting;
- casting;
- annealing;
- quenching;
- tempering;
- sintering;
- calcination;
- pyrolysis;
- combustion;
- thermal decomposition.

### Mechanical
- rolling;
- forging;
- extrusion;
- milling;
- grinding;
- drawing;
- severe plastic deformation.

### Chemical
- precipitation;
- sol-gel;
- oxidation;
- reduction;
- polymerisation;
- hydrothermal synthesis.

### Electrochemical
- electrolysis;
- electroplating;
- electrodeposition;
- electrowinning.

### Electromagnetic
- induction heating;
- RF processing;
- microwave processing;
- field-assisted synthesis.

### Photonic
- laser melting;
- laser sintering;
- laser ablation;
- photopolymerisation.

### Plasma
- plasma spraying;
- plasma deposition;
- plasma etching;
- arc processing.

### Vacuum
- evaporation;
- sputtering;
- physical vapour deposition;
- chemical vapour deposition;
- molecular-beam epitaxy;
- atomic-layer deposition.

### Pressure
- hot isostatic pressing;
- high-pressure synthesis;
- shock synthesis.

### Additive
- powder-bed fusion;
- binder jetting;
- directed-energy deposition;
- material extrusion;
- vat photopolymerisation;
- nanoscale additive methods.

### Biological
- fermentation;
- biomineralisation;
- enzymatic synthesis;
- cell-directed assembly.

Nuclear transformations remain a separate process family.

---

# 20. Nuclear Transformation Layer

Includes:

- fusion;
- fission;
- neutron capture;
- proton capture;
- alpha capture;
- particle bombardment;
- spallation;
- radioactive decay;
- heavy-ion reactions;
- nucleosynthesis.

Fields include:

- reactants;
- reaction channel;
- product nuclides;
- reaction Q-value;
- activation energy or incident energy;
- reaction cross-section;
- particle flux;
- temperature;
- density;
- confinement;
- duration;
- radiation output;
- decay products.

---

# 21. Energy Layer

## Generation
- chemical;
- nuclear;
- photovoltaic;
- thermoelectric;
- piezoelectric;
- pyroelectric;
- triboelectric;
- magnetohydrodynamic;
- fuel-cell;
- radioactive-decay conversion.

## Storage
- electrochemical;
- capacitor;
- supercapacitor;
- chemical;
- hydrogen;
- thermal;
- mechanical.

## Transport
- electrical;
- ionic;
- protonic;
- thermal;
- photonic;
- spin.

## Conversion

A conversion route is stored as:

\[
E_\text{input}
\rightarrow
\text{conversion mechanism}
\rightarrow
E_\text{output}
\]

with theoretical and demonstrated efficiency separated.

---

# 22. Environment and Sustainability Layer

Fields include:

- geological abundance;
- crustal abundance;
- ocean abundance;
- atmospheric abundance;
- extraterrestrial occurrence;
- natural occurrence;
- extraction route;
- extraction energy;
- water requirement;
- recyclability;
- recovery rate;
- reuse;
- critical-resource classification;
- supply risk;
- toxicity;
- persistence;
- bioaccumulation;
- biodegradability where meaningful;
- environmental fate;
- substitute materials;
- closed-loop recovery.

---

# 23. Biological Context Layer

Fields may include:

- biological essentiality;
- metabolic role;
- enzyme role;
- transport mechanisms;
- cellular uptake;
- bioavailability;
- toxicity;
- protein binding;
- nucleic-acid interactions;
- biomineralisation;
- biocompatibility;
- biological half-life;
- excretion pathway.

A biological association must not be interpreted as proof of medical benefit.

---

# 24. Application Layer

Possible domains include:

- construction;
- aerospace;
- marine;
- space;
- electronics;
- computing;
- quantum technology;
- communications;
- optics;
- photonics;
- energy;
- batteries;
- fusion;
- fission;
- medicine;
- biotechnology;
- agriculture;
- robotics;
- sensors;
- actuators;
- transport;
- manufacturing;
- additive manufacturing;
- nanotechnology;
- superconductivity;
- radiation shielding.

Application links require evidence or an explicit theoretical/hypothetical classification.

---

# 25. Safety Layer

Fields include:

- chemical toxicity;
- acute toxicity;
- chronic toxicity;
- radiotoxicity;
- carcinogenicity;
- mutagenicity;
- reproductive hazard;
- corrosivity;
- flammability;
- explosivity;
- oxidising behaviour;
- water reactivity;
- air reactivity;
- radiation hazard;
- neutron hazard;
- criticality risk;
- electrical hazard;
- high-pressure hazard;
- vacuum hazard;
- cryogenic hazard;
- thermal hazard;
- environmental hazard;
- biological hazard;
- shielding requirements;
- handling requirements.

---

# 26. Evidence Layer

Every scientific assertion should carry:

- evidence type;
- source identifier;
- provenance;
- acquisition method;
- uncertainty where applicable;
- confidence;
- replication state;
- review state.

See:

`05-Evidence-and-Provenance.md`

---

# 27. Temporal Layer

Fields include:

- observation time;
- measurement duration;
- age of sample;
- process duration;
- relaxation time;
- decay time;
- service life;
- ageing;
- degradation;
- corrosion progression;
- diffusion time;
- fatigue cycles;
- timestamp where required.

---

# 28. Failure and Negative-Result Layer

MAT may explicitly record:

- failed synthesis;
- failed replication;
- unstable product;
- no detected reaction;
- unexpected product;
- partial transformation;
- measurement below detection limit;
- condition-dependent failure;
- computational non-convergence.

A negative result must retain its test conditions.

---

# 29. History and Provenance Layer

A material may have path-dependent properties.

Therefore MAT can store:

\[
S_\text{final}
=
F(S_\text{initial},P_1,P_2,\ldots,P_n)
\]

where \(P_n\) represents successive processes or environmental exposures.

---

# 30. Visualisation Layer

Each record may reference:

- photographs;
- scientific diagrams;
- atomic models;
- probability-density visualisations;
- crystal models;
- molecular structures;
- spectra;
- plots;
- phase diagrams;
- magnetic-field maps;
- electric-field maps;
- process diagrams;
- 3D models;
- data-extruded models.

Visuals must distinguish measured geometry from conceptual illustration.

---

# 31. Record Completeness

MAT records may carry:

- `SKELETON`
- `PARTIAL`
- `RESEARCHED`
- `VALIDATED`
- `REVIEWED`
- `SUPERSEDED`

Completeness does not equal scientific certainty.

A `REVIEWED` record may still contain explicitly labelled unknown values.
