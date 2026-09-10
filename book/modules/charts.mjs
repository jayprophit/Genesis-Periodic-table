/* MAT Reader: Charts module — data visualization using Chart.js. */
export function initCharts({ $, chartData }) {
  if (typeof Chart === "undefined" || !chartData) return;

  const ink = () => getComputedStyle(document.body).getPropertyValue('--ink').trim();
  // Every visual has a readable data alternative and an explicit review status.
  function describe(canvas, title, columns, rows, unit) {
    canvas.setAttribute('role','img');
    canvas.setAttribute('aria-label',title+'. Illustrative compilation; source review pending. Data table follows.');
    const card=canvas.closest('.viz-card');
    if(!card || card.querySelector('.chart-evidence'))return;
    const note=document.createElement('p');note.className='chart-evidence evidence-label research';
    note.textContent='Illustrative compilation · source review pending';card.append(note);
    const details=document.createElement('details'),summary=document.createElement('summary');
    summary.textContent='Read chart values and limitations';details.append(summary);
    const limit=document.createElement('p');limit.textContent=(unit||'Scale not specified')+'. '+(chartData.provenance_note||'');details.append(limit);
    const wrap=document.createElement('div');wrap.className='table-scroll';wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label',title+' values');
    const table=document.createElement('table'),caption=document.createElement('caption');caption.textContent=title;table.append(caption);
    const head=table.createTHead().insertRow();for(const name of columns){const cell=document.createElement('th');cell.scope='col';cell.textContent=name;head.append(cell);}
    const body=table.createTBody();for(const values of rows){const row=body.insertRow();for(const value of values)row.insertCell().textContent=String(value);}
    wrap.append(table);details.append(wrap);card.append(details);
  }
  const updateTheme = () => {
    for(const chart of Object.values(Chart.instances)) {
      const color=ink();
      if(chart.options.plugins.legend)chart.options.plugins.legend.labels.color=color;
      if(chart.options.plugins.title)chart.options.plugins.title.color=color;
      for(const scale of Object.values(chart.options.scales||{})){
        if(scale.ticks)scale.ticks.color=color;
        if(scale.title)scale.title.color=color;
        if(scale.pointLabels)scale.pointLabels.color=color;
      }
      chart.update('none');
    }
  };
  new MutationObserver(updateTheme).observe(document.body,{attributes:true,attributeFilter:['class']});

  const COLORS = {
    core: "#8dd4c6", research: "#dec38b", claims: "#d4b4d5",
    accent: "#8dd4c6", gold: "#edc777", muted: "#acbbb9",
  };

  /* --- Abundance Pie Charts --- */
  function renderAbundancePie(canvasId, dataset) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    describe(canvas,dataset.title,['Constituent',dataset.unit||'Value'],dataset.data.map(d=>[d.name,d.value]),dataset.unit);
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
    updateTheme();
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
    describe(canvas,'Carbon allotropes',['Property','Diamond','Graphite','Graphene','CNT'],data.map(d=>[d.property,d.diamond,d.graphite,d.graphene,d.cnt]),'Illustrative 0–10 scores; normalization and measurement conditions are not documented. These are not engineering allowables');
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
    updateTheme();
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
