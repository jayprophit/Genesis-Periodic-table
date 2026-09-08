/* MAT Reader: Charts module — data visualization using Chart.js. */
export function initCharts({ $, chartData }) {
  if (typeof Chart === "undefined" || !chartData) return;

  const COLORS = {
    core: "#8dd4c6", research: "#dec38b", claims: "#d4b4d5",
    accent: "#8dd4c6", gold: "#edc777", muted: "#acbbb9",
  };

  /* --- Abundance Pie Charts --- */
  function renderAbundancePie(canvasId, dataset) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    new Chart(canvas, {
      type: "pie",
      data: {
        labels: dataset.data.map((d) => d.name),
        datasets: [{ data: dataset.data.map((d) => d.value), backgroundColor: dataset.data.map((d) => d.color), borderColor: "#1b2d33", borderWidth: 1 }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { position: "right", labels: { color: "#e9efea", font: { size: 11 }, padding: 8 } },
          title: { display: true, text: dataset.title, color: "#e9efea", font: { size: 14, family: "Georgia, serif" } },
          tooltip: { callbacks: { afterLabel: (ctx) => dataset.data[ctx.dataIndex]?.info || "" } },
        },
      },
    });
  }

  /* --- Ionization Ladder Bar Chart --- */
  function renderIonizationLadder(canvasId) {
    const data = chartData.ionizationLadders || [];
    if (!data.length) return;
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const labels = data.map((d) => d.symbol);
    const colors = ["#8dd4c6", "#38bdf8", "#fbbf24", "#34d399", "#f472b6", "#818cf8", "#fb7185", "#c084fc", "#facc15", "#60a5fa"];
    new Chart(canvas, {
      type: "bar",
      data: {
        labels,
        datasets: [
          { label: "I₁", data: data.map((d) => d.I1), backgroundColor: colors[0] },
          { label: "I₂", data: data.map((d) => d.I2), backgroundColor: colors[1] },
          { label: "I₃", data: data.map((d) => d.I3), backgroundColor: colors[2] },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        scales: { x: { ticks: { color: "#acbbb9" }, grid: { color: "#385056" } }, y: { title: { display: true, text: "eV", color: "#acbbb9" }, ticks: { color: "#acbbb9" }, grid: { color: "#385056" } } },
        plugins: { legend: { labels: { color: "#e9efea" } }, title: { display: true, text: "Successive Ionization Energies (eV)", color: "#e9efea", font: { size: 14, family: "Georgia, serif" } } },
      },
    });
  }

  /* --- Carbon Allotrope Radar --- */
  function renderRadar(canvasId) {
    const data = chartData.carbonAllotropesRadar || [];
    if (!data.length) return;
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const props = data.map((d) => d.property);
    new Chart(canvas, {
      type: "radar",
      data: {
        labels: props,
        datasets: [
          { label: "Diamond", data: data.map((d) => d.diamond), borderColor: "#38bdf8", backgroundColor: "rgba(56,189,248,0.15)", pointBackgroundColor: "#38bdf8" },
          { label: "Graphite", data: data.map((d) => d.graphite), borderColor: "#94a3b8", backgroundColor: "rgba(148,163,184,0.15)", pointBackgroundColor: "#94a3b8" },
          { label: "Graphene", data: data.map((d) => d.graphene), borderColor: "#34d399", backgroundColor: "rgba(52,211,153,0.15)", pointBackgroundColor: "#34d399" },
          { label: "CNT", data: data.map((d) => d.cnt), borderColor: "#fbbf24", backgroundColor: "rgba(251,191,36,0.15)", pointBackgroundColor: "#fbbf24" },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        scales: { r: { angleLines: { color: "#385056" }, grid: { color: "#385056" }, pointLabels: { color: "#e9efea", font: { size: 10 } }, ticks: { display: false }, suggestedMin: 0, suggestedMax: 10 } },
        plugins: { legend: { labels: { color: "#e9efea" } }, title: { display: true, text: "Carbon Allotrope Properties (normalized)", color: "#e9efea", font: { size: 14, family: "Georgia, serif" } } },
      },
    });
  }

  /* --- Periodic Trend Scatter --- */
  function renderTrend(canvasId, xKey, yKey, xLabel, yLabel) {
    const data = chartData.periodicTrends || [];
    if (!data.length) return;
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const points = data.filter((d) => d[xKey] != null && d[yKey] != null);
    new Chart(canvas, {
      type: "scatter",
      data: {
        datasets: [{
          label: `${yLabel} vs ${xLabel}`,
          data: points.map((d) => ({ x: d[xKey], y: d[yKey], symbol: d.s })),
          backgroundColor: "#8dd4c6",
          pointRadius: 5,
          pointHoverRadius: 8,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        scales: {
          x: { title: { display: true, text: xLabel, color: "#acbbb9" }, ticks: { color: "#acbbb9" }, grid: { color: "#385056" } },
          y: { title: { display: true, text: yLabel, color: "#acbbb9" }, ticks: { color: "#acbbb9" }, grid: { color: "#385056" } },
        },
        plugins: {
          legend: { display: false },
          title: { display: true, text: `${yLabel} vs ${xLabel}`, color: "#e9efea", font: { size: 14, family: "Georgia, serif" } },
          tooltip: { callbacks: { label: (ctx) => `${ctx.raw.symbol}: ${xLabel}=${ctx.raw.x}, ${yLabel}=${ctx.raw.y}` } },
        },
      },
    });
  }

  /* --- Public API --- */
  return { renderAbundancePie, renderIonizationLadder, renderRadar, renderTrend };
}
