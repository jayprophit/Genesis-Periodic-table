import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area
} from 'recharts';
import { 
  PieChart as PieIcon, 
  TrendingUp, 
  Layers, 
  Activity, 
  Zap, 
  Flame, 
  Clock, 
  Info, 
  Sparkles 
} from 'lucide-react';
import { 
  ABUNDANCE_DATASETS, 
  IONIZATION_LADDERS, 
  PERIODIC_TRENDS, 
  CARBON_ALLOTROPES_RADAR, 
  ISOTOPE_SCALE,
  PieSlice 
} from '../data/scientific-charts';

export const ChartsStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'abundance' | 'ionization' | 'trends' | 'allotropes' | 'isotopes'>('abundance');
  
  // Abundance Pie dataset selector
  const [abundanceKey, setAbundanceKey] = useState<string>('universe');
  const [selectedPieSlice, setSelectedPieSlice] = useState<PieSlice | null>(null);

  // Periodic trends metric selector
  const [trendMetric, setTrendMetric] = useState<'r' | 'ie' | 'en' | 'mp'>('ie');

  const currentAbundance = ABUNDANCE_DATASETS[abundanceKey];

  return (
    <div className="space-y-6">
      
      {/* Studio Header & Sub-Navigation */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400">
                <Activity className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  MAT Scientific Charts & Analytical Graphs
                </h2>
                <p className="text-xs text-slate-400">
                  Multidimensional data visualizations derived from the Materials Atlas Table Codex.
                </p>
              </div>
            </div>
          </div>

          {/* Subtabs Navigation */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('abundance')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-medium transition ${
                activeTab === 'abundance' 
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <PieIcon className="w-3.5 h-3.5" />
              <span>Abundance Pies</span>
            </button>

            <button
              onClick={() => setActiveTab('ionization')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-medium transition ${
                activeTab === 'ionization' 
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Ionization Ladders</span>
            </button>

            <button
              onClick={() => setActiveTab('trends')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-medium transition ${
                activeTab === 'trends' 
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Periodic Trends</span>
            </button>

            <button
              onClick={() => setActiveTab('allotropes')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-medium transition ${
                activeTab === 'allotropes' 
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Carbon Allotropes Radar</span>
            </button>

            <button
              onClick={() => setActiveTab('isotopes')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-medium transition ${
                activeTab === 'isotopes' 
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Isotope Lifetimes</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: Elemental Abundance Pie Charts */}
      {activeTab === 'abundance' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Chart Area (2 Cols) */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
            
            {/* Abundance Dataset Selector */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white">{currentAbundance.title}</h3>
                <p className="text-xs text-slate-400">{currentAbundance.subtitle}</p>
              </div>

              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                {Object.entries(ABUNDANCE_DATASETS).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setAbundanceKey(key);
                      setSelectedPieSlice(null);
                    }}
                    className={`px-2.5 py-1 rounded transition ${
                      abundanceKey === key 
                        ? 'bg-emerald-600 text-white font-medium' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Pie Chart */}
            <div className="h-[380px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={currentAbundance.data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={140}
                    innerRadius={65}
                    paddingAngle={3}
                    onClick={(slice: any) => setSelectedPieSlice(slice.payload)}
                    cursor="pointer"
                  >
                    {currentAbundance.data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        stroke="#0f172a" 
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload as PieSlice;
                        return (
                          <div className="bg-slate-950 border border-slate-700 p-3 rounded-lg shadow-xl text-xs font-mono">
                            <div className="font-bold text-white flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                              {d.name} ({d.symbol})
                            </div>
                            <div className="text-emerald-400 text-sm font-bold mt-1">
                              {d.value} {currentAbundance.unit}
                            </div>
                            <div className="text-slate-400 text-[11px] mt-1 max-w-xs">{d.info}</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="text-center text-xs text-slate-500 font-mono">
              Click any pie slice to inspect detailed nucleosynthetic origin and biochemical role.
            </div>
          </div>

          {/* Breakdown Sidebar List */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between space-y-4">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Element Fractions ({currentAbundance.unit})
              </h4>

              <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                {currentAbundance.data.map((slice, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedPieSlice(slice)}
                    className={`p-2.5 rounded-lg border transition cursor-pointer flex items-center justify-between ${
                      selectedPieSlice?.name === slice.name
                        ? 'bg-emerald-950/80 border-emerald-500 ring-1 ring-emerald-500/50'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: slice.color }} />
                      <div>
                        <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                          {slice.name} <span className="text-slate-400 font-mono text-[10px]">[{slice.symbol}]</span>
                        </div>
                        <span className="text-[10px] text-slate-400 line-clamp-1">{slice.info}</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400 shrink-0 ml-2">
                      {slice.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Slice Callout */}
            {selectedPieSlice && (
              <div className="p-3 rounded-lg bg-slate-950 border border-emerald-800/60 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-300 font-mono">
                    {selectedPieSlice.name} ({selectedPieSlice.symbol})
                  </span>
                  <span className="text-xs font-mono font-bold text-white">
                    {selectedPieSlice.value} {currentAbundance.unit}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1.5">{selectedPieSlice.info}</p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* VIEW 2: Ionization Energy Ladders */}
      {activeTab === 'ionization' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">
                Successive Ionization Energy Ladders (I₁ to I₅)
              </h3>
              <p className="text-xs text-slate-400">
                Energy required (eV) to sequentially strip outer electrons, revealing underlying quantum electron shell walls.
              </p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-violet-950 text-violet-300 border border-violet-800">
              Elements Z = 1 to 10
            </span>
          </div>

          <div className="h-[420px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={IONIZATION_LADDERS}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="symbol" stroke="#64748b" fontVariant="mono" />
                <YAxis stroke="#64748b" label={{ value: 'Energy (eV)', angle: -90, position: 'insideLeft', fill: '#64748b' }} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-950 border border-slate-700 p-3 rounded-lg shadow-xl text-xs font-mono">
                          <div className="font-bold text-white mb-1.5">{label} Ionization Series:</div>
                          {payload.map((item, idx) => (
                            <div key={idx} className="flex justify-between gap-4 py-0.5">
                              <span style={{ color: item.color }}>{item.name}:</span>
                              <span className="font-bold text-white">{item.value} eV</span>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Bar dataKey="I1" name="1st Ionization (I₁)" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="I2" name="2nd Ionization (I₂)" fill="#a78bfa" radius={[4, 4, 0, 0]} />
                <Bar dataKey="I3" name="3rd Ionization (I₃)" fill="#fb7185" radius={[4, 4, 0, 0]} />
                <Bar dataKey="I4" name="4th Ionization (I₄)" fill="#facc15" radius={[4, 4, 0, 0]} />
                <Bar dataKey="I5" name="5th Ionization (I₅)" fill="#34d399" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
              <span className="font-bold text-sky-400">Noble Gas Threshold:</span> Helium requires 24.59 eV to remove its first electron, the highest I₁ of any neutral element in existence.
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
              <span className="font-bold text-purple-400">Lithium Shell Spike:</span> I₁ for Lithium is only 5.39 eV (loosely bound 2s¹), but I₂ skyrockets to 75.64 eV upon breaching the closed 1s² helium core!
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
              <span className="font-bold text-rose-400">Carbon Tetravalence:</span> Carbon removes 4 valence electrons steadily (11.3 → 24.4 → 47.9 → 64.5 eV) before jumping to 392.1 eV for the 5th.
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: Periodic Trends Across Periods 1-4 */}
      {activeTab === 'trends' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">Periodic Property Curves (Z = 1 to 36)</h3>
              <p className="text-xs text-slate-400">
                Observing the periodicity of physical and atomic metrics across periods 1 through 4.
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setTrendMetric('ie')}
                className={`px-3 py-1 rounded transition ${trendMetric === 'ie' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'}`}
              >
                1st Ionization Energy (eV)
              </button>
              <button
                onClick={() => setTrendMetric('r')}
                className={`px-3 py-1 rounded transition ${trendMetric === 'r' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'}`}
              >
                Atomic Radius (pm)
              </button>
              <button
                onClick={() => setTrendMetric('en')}
                className={`px-3 py-1 rounded transition ${trendMetric === 'en' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'}`}
              >
                Electronegativity
              </button>
              <button
                onClick={() => setTrendMetric('mp')}
                className={`px-3 py-1 rounded transition ${trendMetric === 'mp' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'}`}
              >
                Melting Point (K)
              </button>
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={PERIODIC_TRENDS}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="s" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-slate-950 border border-slate-700 p-3 rounded-lg shadow-xl text-xs font-mono">
                          <div className="font-bold text-white text-sm">
                            {d.s} (Z={d.z}, Period {d.period})
                          </div>
                          <div className="mt-1 text-cyan-400 font-bold">
                            {trendMetric === 'ie' && `Ionization Energy: ${d.ie} eV`}
                            {trendMetric === 'r' && `Atomic Radius: ${d.r} pm`}
                            {trendMetric === 'en' && `Electronegativity: ${d.en} Pauling`}
                            {trendMetric === 'mp' && `Melting Point: ${d.mp} K`}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey={trendMetric}
                  stroke="#38bdf8"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#38bdf8', stroke: '#0f172a', strokeWidth: 2 }}
                  activeDot={{ r: 7, fill: '#38bdf8' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* VIEW 4: Carbon Allotropes Multi-axial Radar Chart */}
      {activeTab === 'allotropes' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
            <div className="pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Carbon Allotrope Comparison Radar</h3>
              <p className="text-xs text-slate-400">
                Evaluating diamond (sp³), graphite (sp² layered), graphene (2D honeycomb), and carbon nanotubes (rolled 1D cylinder).
              </p>
            </div>

            <div className="h-[400px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={140} data={CARBON_ALLOTROPES_RADAR}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="property" stroke="#94a3b8" fontSize={11} />
                  <PolarRadiusAxis stroke="#475569" angle={30} domain={[0, 10]} />
                  <Radar name="Diamond" dataKey="diamond" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.3} />
                  <Radar name="Graphite" dataKey="graphite" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
                  <Radar name="Graphene" dataKey="graphene" stroke="#10b981" fill="#10b981" fillOpacity={0.25} />
                  <Radar name="Nanotubes (CNT)" dataKey="cnt" stroke="#a855f7" fill="#a855f7" fillOpacity={0.2} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Allotropic Characteristics
            </h4>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-sky-800/60">
                <div className="font-bold text-sky-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                  Diamond (sp³)
                </div>
                <p className="text-slate-300 mt-1">
                  Rigid 3D tetrahedral network. Extreme Mohs 10 hardness, high thermal conductivity (2200 W/m·K), wide 5.47 eV electrical insulator bandgap.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-amber-800/60">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  Graphite (sp²)
                </div>
                <p className="text-slate-300 mt-1">
                  Layered hexagonal graphene sheets held by weak Van der Waals forces. Excellent solid lubricant, anisotropic electrical conductor via delocalized π electrons.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-emerald-800/60">
                <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Graphene (2D)
                </div>
                <p className="text-slate-300 mt-1">
                  Single atomic monolayer of carbon. Zero-gap Dirac semimetal with ballistic electron mobility, highest known intrinsic breaking strength (130 GPa).
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-purple-800/60">
                <div className="font-bold text-purple-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                  Carbon Nanotubes (1D)
                </div>
                <p className="text-slate-300 mt-1">
                  Rolled graphene cylinder with chirality determining whether metallic or semiconducting. Outstanding axial tensile stiffness and current carrying capacity.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 5: Isotope Lifetimes Scale */}
      {activeTab === 'isotopes' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">Nuclear Isotope Half-Life Hierarchy</h3>
              <p className="text-xs text-slate-400">
                Spanning 50 orders of magnitude: from resonance states measured in yoctoseconds ($10^{-24}$ s) to cosmological timescales.
              </p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
              MAT:0001 to MAT:0009 Isotopes
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-mono">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-950">
                  <th className="py-3 px-4 text-slate-300 font-semibold">Isotope</th>
                  <th className="py-3 px-4 text-slate-300 font-semibold">Element</th>
                  <th className="py-3 px-4 text-slate-300 font-semibold">Half-Life Value</th>
                  <th className="py-3 px-4 text-slate-300 font-semibold">Classification & Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {ISOTOPE_SCALE.map((iso, i) => (
                  <tr key={i} className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-4 font-bold text-cyan-300">{iso.isotope}</td>
                    <td className="py-2.5 px-4 text-slate-300">{iso.element}</td>
                    <td className="py-2.5 px-4 font-bold text-emerald-400">{iso.display}</td>
                    <td className="py-2.5 px-4 text-slate-400">{iso.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
