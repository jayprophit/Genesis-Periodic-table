/* MAT Codex reader: routes, TOC, search, studio, galleries, 3D links, offline. */
import {
  esc, canonicalId, route, parseRoute, recordOf, laneLabels,
  renderDocument, searchDocuments, snippet,
} from "./reader-core.mjs";

const $ = (id) => document.getElementById(id);
const GUIDE = ["Start here", "Front matter", "Foundations", "Data", "Methodology", "Visualization", "Index", "Governance", "Migration", "Back matter"];
const ATLAS = "Material Atlas Table";
const statusEl = $("book-status");
const say = (t) => { if (statusEl) statusEl.textContent = t; };

let flat = [], byId = new Map(), legacy = [];
let searchDocs = [], searchById = new Map(), related = [];
let visuals = [], elements = [], identities = {};
let currentId = "";

/* ---------- data ---------- */
async function getJSON(path, fallback) {
  try {
    const r = await fetch(path);
    if (!r.ok) throw new Error(r.status);
    return await r.json();
  } catch { return fallback; }
}

/* ---------- table of contents ---------- */
function chapterLink(doc) {
  const a = document.createElement("a");
  a.className = "toc-item";
  a.href = route(doc.id);
  a.textContent = doc.title;
  a.dataset.doc = doc.id;
  return a;
}
function markActive() {
  document.querySelectorAll(".toc-item").forEach((a) => {
    if (a.dataset.doc === currentId) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}
function buildTOC(manifest) {
  const toc = $("toc");
  toc.innerHTML = "";
  flat = [];
  byId = new Map();
  legacy = [];
  manifest.chapters.forEach((sec) => sec.items.forEach((it) => {
    const doc = { ...it, section: sec.section };
    flat.push(doc);
    byId.set(doc.id, doc);
    legacy.push(doc.id);
  }));
  const open = JSON.parse(localStorage.getItem("mat-toc-open") || "{}");
  const persist = () => localStorage.setItem("mat-toc-open", JSON.stringify(open));

  // Material Atlas Table first: one nested folder per record.
  const atlas = document.createElement("div");
  atlas.innerHTML = `<div class="atlas-head"><h2>${esc(ATLAS)}</h2></div>`;
  const aDocs = flat.filter((d) => d.section === ATLAS);
  let lastRec = "";
  let recDetails = null, recBox = null;
  aDocs.forEach((d) => {
    const rec = recordOf(d.id);
    const key = rec ? rec.number : "other";
    if (key !== lastRec) {
      lastRec = key;
      recDetails = document.createElement("details");
      recDetails.className = "atlas-record";
      recDetails.open = open["rec-" + key] ?? true;
      recDetails.ontoggle = () => { open["rec-" + key] = recDetails.open; persist(); };
      const label = rec ? `${rec.number} · ${rec.name}` : "Annex";
      recDetails.innerHTML = `<summary>${esc(label)}</summary>`;
      recBox = document.createElement("div");
      recDetails.appendChild(recBox);
      atlas.appendChild(recDetails);
    }
    recBox.appendChild(chapterLink(d));
  });
  toc.appendChild(atlas);

  // Guide, Reference & Book Information: the ten supporting sections as one group.
  const guide = document.createElement("details");
  guide.id = "guide-group";
  guide.open = open.guide ?? false;
  guide.ontoggle = () => { open.guide = guide.open; persist(); };
  guide.innerHTML = `<summary>Guide, Reference &amp; Book Information</summary>`;
  manifest.chapters.forEach((sec) => {
    if (sec.section === ATLAS || !GUIDE.includes(sec.section)) return;
    const sub = document.createElement("details");
    sub.open = open["sec-" + sec.section] ?? false;
    sub.ontoggle = () => { open["sec-" + sec.section] = sub.open; persist(); };
    sub.innerHTML = `<summary>${esc(sec.section)}</summary>`;
    const box = document.createElement("div");
    flat.filter((d) => d.section === sec.section).forEach((d) => box.appendChild(chapterLink(d)));
    sub.appendChild(box);
    guide.appendChild(sub);
  });
  // Anything unexpected stays visible outside the guide group.
  manifest.chapters.forEach((sec) => {
    if (sec.section === ATLAS || GUIDE.includes(sec.section)) return;
    const h = document.createElement("div");
    h.className = "atlas-head";
    h.innerHTML = `<h2>${esc(sec.section)}</h2>`;
    toc.appendChild(h);
    flat.filter((d) => d.section === sec.section).forEach((d) => toc.appendChild(chapterLink(d)));
  });
  toc.appendChild(guide);
  $("count").textContent = `${flat.length} chapters · ${elements.length || ""} records`;
}

/* ---------- chapter view ---------- */
function laneOf(doc) {
  return (searchById.get(doc.id) || {}).lane || "core";
}
function fillIdentity(doc) {
  const box = $("identity");
  box.innerHTML = "";
  const rec = recordOf(doc.id);
  if (!rec) return;
  const ident = identities[rec.number] || {};
  const lane = laneOf(doc);
  const sym = document.createElement("div");
  sym.className = "identity-symbol";
  sym.innerHTML = `<small>MAT · ${esc(rec.number)}</small>${esc(ident.symbol || rec.symbol || "")}`;
  const name = document.createElement("div");
  const rows = [
    ident.record_class ? esc(ident.record_class.replace(/_/g, " ")) : "",
    ident.status ? `Status: ${esc(ident.status.replace(/-/g, " "))}` : "",
    ident.migration ? `Migration: ${esc(ident.migration.replace(/-/g, " "))}` : "",
  ].filter(Boolean).join(" · ");
  name.innerHTML = `<div class="identity-name">${esc(ident.name || rec.name)}</div>` +
    `<div class="identity-desc">${rows}</div> ` +
    `<span class="evidence-label ${lane}">${laneLabels[lane]}</span>`;
  box.append(sym, name);
}
function fillGlance(doc) {
  const box = $("at-glance");
  box.innerHTML = "";
  const rec = recordOf(doc.id);
  if (!rec) return;
  const ident = identities[rec.number];
  if (!ident) return;
  const nums = [];
  if (ident.z) nums.push(["Atomic number", String(ident.z)]);
  if (ident.weight) nums.push(["Standard weight", ident.weight]);
  nums.push(["Tables", String(ident.tables)], ["Graphs", String(ident.graphs)],
    ["3D models", String(ident.models)], ["Calculations", String(ident.calculations)]);
  const g = document.createElement("div");
  g.className = "glance";
  g.innerHTML = `<h2>At a glance</h2><div class="key-numbers">` +
    nums.map(([k, v]) => `<div class="key-number"><small>${esc(k)}</small><strong>${esc(v)}</strong></div>`).join("") +
    `</div><p>Record values only — empty slots are shown as pending, never filled in.</p>`;
  box.appendChild(g);
}
function fillContext(doc) {
  const lane = laneOf(doc);
  const el = $("page-context");
  const notes = {
    core: "<strong>MAT Core Data.</strong> Reference properties, conditions and traceable sources.",
    research: "<strong>Research / Emerging.</strong> Models, predictions or developing results — validation limits apply.",
    claims: "<strong>Historical / Alternative / Claims.</strong> Preserved with provenance; not established measurement.",
  };
  el.className = "page-context " + (lane === "core" ? "" : lane);
  el.innerHTML = notes[lane];
}
function fillSummary(doc, outline) {
  const box = $("chapter-summary");
  box.innerHTML = "";
  const tops = outline.filter((o) => o.level <= 2).slice(0, 10);
  if (!tops.length) return;
  box.innerHTML = `<h2>In this chapter</h2><ul>` +
    tops.map((o) => `<li><a href="${route(doc.id, o.id)}">${esc(o.text.slice(0, 80))}</a></li>`).join("") + `</ul>`;
}
function fillSupplement(doc) {
  const sup = $("supplement");
  sup.innerHTML = "";
  const rec = recordOf(doc.id);
  // Record visuals gallery (GENERATED SVGs render; pending slots listed honestly).
  if (rec) {
    const entry = visuals.find((v) => v.record === rec.number);
    if (entry) {
      const gen = entry.items.filter((it) => it.found && /\.svg$/i.test(it.file));
      const pend = entry.items.filter((it) => !it.found);
      if (gen.length || pend.length) {
        const s = document.createElement("section");
        s.setAttribute("aria-label", "Record visuals");
        let html = `<h2>Record visuals — ${esc(rec.number)}</h2>`;
        if (gen.length) html += `<div class="vis-grid">` + gen.map((it) => {
          const cap = it.file.replace(/^.*-(FIG|DIAGRAM|GRAPH)-/, "").replace(/\.svg$/i, "").replace(/-/g, " ");
          return `<figure class="vis-cell"><img src="../${entry.dir}/${it.path}${it.file}" alt="${esc(it.file)}"><figcaption>${esc(cap)}</figcaption></figure>`;
        }).join("") + `</div>`;
        if (pend.length) html += `<details class="vis-pend"><summary>Pending visuals (${pend.length}) — not yet generated</summary><ul>` +
          pend.map((it) => `<li>${esc(it.file)} — <em>${esc(String(it.status).replace(/-/g, " "))}</em></li>`).join("") + `</ul></details>`;
        s.innerHTML = html;
        sup.appendChild(s);
      }
    }
  }
  // External resources: encyclopedia, papers, video, chapter citations.
  {
    const sdoc = searchById.get(doc.id) || {};
    let topic = doc.title.replace(/^[0-9—\s–-]+/, "").split("—")[0].split(":")[0].trim();
    if (rec && rec.number !== "0000") topic = rec.name;
    if (topic && !/^(MAT|G000|SRC|CALC|TEST)/i.test(topic)) {
      const q = encodeURIComponent(topic + " element");
      const items = [
        [`Wikipedia — ${topic}`, `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(topic)}`],
        [`Research papers — ${topic}`, `https://scholar.google.com/scholar?q=${q}`],
        [`Videos — ${topic}`, `https://www.youtube.com/results?search_query=${q}`],
        ...(sdoc.dois || []).slice(0, 4).map((d) => [`Citation ${d.slice(0, 34)}…`, `https://doi.org/${d}`]),
      ];
      const s = document.createElement("section");
      s.setAttribute("aria-label", "External resources");
      s.innerHTML = `<h2>External resources — ${esc(topic)}</h2><p class="tool-note">These links leave this book.</p><div class="related-links">` +
        items.map(([t, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(t)} ↗</a>`).join("") + `</div>`;
      sup.appendChild(s);
    }
  }
  // Related chapters + local suggestions.
  {
    const idx = flat.findIndex((d) => d.id === doc.id);
    const ids = (related[idx] || []).slice(0, 4).map(Number).filter((j) => flat[j]);
    const s = document.createElement("section");
    s.setAttribute("aria-label", "Recommended and suggestions");
    let html = ids.length ? `<h2>Recommended next</h2><div class="related-links">` +
      ids.map((j) => `<a href="${route(flat[j].id)}">${esc(flat[j].title)}</a>`).join("") + `</div>` : "";
    html += `<details class="suggestions"><summary>Suggest a correction or addition (kept in this browser)</summary>
      <label>Your suggestion<textarea id="sugg" rows="3"></textarea></label>
      <div class="button-row"><button id="sugg-save">Save</button><button id="sugg-copy">Copy all</button></div>
      <ul id="sugg-list"></ul></details>`;
    s.innerHTML = html;
    sup.appendChild(s);
    const key = "mat-suggestions-v2";
    const renderSugg = () => {
      const all = JSON.parse(localStorage.getItem(key) || "{}");
      $("sugg-list").innerHTML = (all[doc.id] || []).map((t) => `<li>${esc(t)}</li>`).join("");
    };
    renderSugg();
    $("sugg-save").onclick = () => {
      const t = $("sugg").value.trim();
      if (!t) return;
      const all = JSON.parse(localStorage.getItem(key) || "{}");
      (all[doc.id] ??= []).push(`${new Date().toISOString().slice(0, 10)}: ${t}`);
      localStorage.setItem(key, JSON.stringify(all));
      $("sugg").value = "";
      renderSugg();
    };
    $("sugg-copy").onclick = async () => {
      const all = JSON.parse(localStorage.getItem(key) || "{}");
      await navigator.clipboard.writeText(JSON.stringify(all, null, 2)).catch(() => {});
    };
  }
}
function fillPagers(doc) {
  const i = flat.findIndex((d) => d.id === doc.id);
  const set = (el, j, label) => {
    const a = $(el);
    if (j < 0 || j >= flat.length) { a.removeAttribute("href"); a.innerHTML = ""; return; }
    a.href = route(flat[j].id);
    a.innerHTML = `<small>${label}</small>${esc(flat[j].title)}`;
  };
  set("prev", i - 1, "Previous page");
  set("next", i + 1, "Next page");
  // Element pager across main record chapters only.
  const mains = elements.map((e) => e.chapter);
  const k = mains.indexOf(doc.id);
  const pe = $("prev-element"), ne = $("next-element");
  const eset = (a, m, label) => {
    if (m < 0 || m >= mains.length) { a.removeAttribute("href"); a.innerHTML = ""; return; }
    a.href = route(mains[m]);
    a.innerHTML = `<small>${label}</small>${esc(elements[m].number + " · " + elements[m].name)}`;
  };
  eset(pe, k - 1, "Previous element");
  eset(ne, k + 1, "Next element");
  document.querySelector(".element-pager").hidden = k < 0;
  $("progress").style.width = `${((i + 1) / flat.length) * 100}%`;
}
function typeset() {
  try {
    const p = window.MathJax?.typesetPromise?.();
    if (p?.catch) p.catch(() => {});
  } catch {}
}
async function showChapter(id, anchor) {
  const doc = byId.get(canonicalId(id));
  if (!doc) { location.hash = "#cover"; return; }
  currentId = doc.id;
  markActive();
  $("cover").hidden = true;
  $("content").hidden = false;
  $("mt-note").hidden = true;
  document.querySelectorAll(".mt-text").forEach((n) => n.remove());
  $("crumb").innerHTML = `${esc(doc.section)} · ${esc(doc.title)} <span class="evidence-label ${laneOf(doc)}">${laneLabels[laneOf(doc)]}</span>`;
  $("source-link").href = "../" + doc.id;
  $("studio-chapter").textContent = doc.title;
  fillIdentity(doc);
  fillContext(doc);
  fillGlance(doc);
  const page = $("page");
  page.setAttribute("aria-busy", "true");
  page.innerHTML = "<p>Loading…</p>";
  try {
    const res = await fetch(doc.path);
    if (!res.ok) throw new Error(res.status);
    const { html, outline } = renderDocument(await res.text(), doc.id, { docs: flat });
    page.innerHTML = html;
    const jump = $("jump");
    jump.innerHTML = `<option value="">On this page</option>`;
    outline.forEach((o) => {
      const op = document.createElement("option");
      op.value = o.id;
      op.textContent = `${"–".repeat(Math.max(0, o.level - 1))} ${o.text.slice(0, 70)}`;
      jump.appendChild(op);
    });
    jump.onchange = () => { if (jump.value) document.getElementById(jump.value)?.scrollIntoView(); jump.value = ""; };
    fillSummary(doc, outline);
  } catch {
    page.innerHTML = "<p><em>Could not load this chapter. Is the preview server running?</em></p>";
    $("chapter-summary").innerHTML = "";
  }
  page.setAttribute("aria-busy", "false");
  fillSupplement(doc);
  fillPagers(doc);
  document.title = `${doc.title} — MAT Codex`;
  typeset();
  say(`Opened ${doc.title}`);
  if (anchor) setTimeout(() => document.getElementById(anchor)?.scrollIntoView(), 60);
  else $("reader").focus({ preventScroll: true });
}
function showCover() {
  currentId = "";
  markActive();
  $("content").hidden = true;
  $("cover").hidden = false;
  document.title = "MAT Codex — Materials Atlas Table";
  $("progress").style.width = "0%";
}
function routeFromHash() {
  const r = parseRoute(location.hash, legacy);
  if (!r || !r.id) { showCover(); return; }
  if (r.id !== currentId) showChapter(r.id, r.anchor);
  else if (r.anchor) document.getElementById(r.anchor)?.scrollIntoView();
}

/* ---------- search ---------- */
function initSearch() {
  const input = $("search"), box = $("results"), live = $("search-status");
  let t = null;
  input.addEventListener("input", () => { clearTimeout(t); t = setTimeout(run, 180); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { box.hidden = true; } });
  $("adv-toggle").onclick = () => {
    const adv = $("adv"), open = adv.hidden;
    adv.hidden = !open;
    $("adv-toggle").setAttribute("aria-expanded", String(open));
  };
  async function run() {
    const q = input.value.trim();
    if (q.length < 2) { box.hidden = true; return; }
    const hits = searchDocuments(searchDocs, q, {
      titleOnly: $("opt-title").checked,
      section: $("opt-section").value,
      lane: $("opt-lane").value,
      sort: $("opt-sort").value === "title" ? "title" : "relevance",
    }).slice(0, +$("opt-count").value || 8);
    if (!hits.length) {
      box.innerHTML = `<div class="res-sec">No matches</div>`;
      box.hidden = false;
      live.textContent = "No matches";
      return;
    }
    let html = `<div class="res-sec">Matches</div>`;
    let lastDs = null;
    hits.forEach(({ d }) => {
      if (d.dataset && d.dataset !== lastDs) { html += `<div class="res-sec">${esc("Dataset " + d.dataset)}</div>`; lastDs = d.dataset; }
      else if (!d.dataset) lastDs = null;
      const target = d.id;
      html += `<a class="res-item" href="${route(target)}"><strong>${esc(d.title)}</strong><span>${esc(snippet(d.text, q).slice(0, 140))}</span></a>`;
    });
    if ($("opt-related").checked) {
      const rel = (related[hits[0].d.i] || []).filter((j) => !hits.some((h) => h.d.i === j)).slice(0, 4);
      if (rel.length) {
        html += `<div class="res-sec">Related in this book</div>`;
        rel.forEach((j) => {
          const f = flat[j];
          if (f) html += `<a class="res-item" href="${route(f.id)}"><strong>${esc(f.title)}</strong><span>${esc(f.section)} · shares record references</span></a>`;
        });
      }
    }
    box.innerHTML = html;
    box.hidden = false;
    live.textContent = `${hits.length} matches`;
  }
}

/* ---------- studio: speech + translation ---------- */
function initStudio() {
  const voiceSel = $("voice"), rateSel = $("rate"), langSel = $("lang");
  voiceSel.value = localStorage.getItem("mat-voice") || "";
  rateSel.value = localStorage.getItem("mat-rate") || "1";
  langSel.value = localStorage.getItem("mat-lang") || "";
  voiceSel.onchange = () => localStorage.setItem("mat-voice", voiceSel.value);
  rateSel.onchange = () => localStorage.setItem("mat-rate", rateSel.value);
  langSel.onchange = () => localStorage.setItem("mat-lang", langSel.value);
  function pickVoices() {
    if (!("speechSynthesis" in window)) {
      $("speak-btn").disabled = true;
      $("speech-status").textContent = "Speech synthesis is not supported in this browser.";
      return;
    }
    const vs = speechSynthesis.getVoices().sort((a, b) => a.lang.localeCompare(b.lang));
    voiceSel.innerHTML = vs.map((v) =>
      `<option value="${esc(v.voiceURI)}">${esc(v.lang + " — " + v.name)}${v.default ? " ★" : ""}</option>`).join("") ||
      `<option value="">(no voices installed)</option>`;
    const saved = localStorage.getItem("mat-voice");
    if (saved && [...voiceSel.options].some((o) => o.value === saved)) voiceSel.value = saved;
    voiceSel.title = `${vs.length} voices across ${new Set(vs.map((v) => v.lang)).size} languages`;
  }
  if ("speechSynthesis" in window) {
    pickVoices();
    speechSynthesis.onvoiceschanged = pickVoices;
  } else pickVoices();
  $("speak-btn").onclick = () => {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const mtLang = (!$("mt-note").hidden && langSel.value) || "";
    const vs = speechSynthesis.getVoices();
    let v = vs.find((x) => x.voiceURI === voiceSel.value);
    if (mtLang && (!v || !v.lang.toLowerCase().startsWith(mtLang.split("-")[0].toLowerCase()))) {
      v = vs.find((x) => x.lang.toLowerCase().startsWith(mtLang.split("-")[0].toLowerCase())) || v;
    }
    const text = ($("crumb").textContent || "") + ". " + $("page").innerText.slice(0, 20000);
    const queue = (text.match(/[^.!?]+[.!?]+|\S.{0,200}[.!? ]/g) || [text]).filter((c) => c.trim().length > 1).slice(0, 400);
    $("speech-status").textContent = `Reading aloud (${queue.length} passages).`;
    const next = () => {
      if (!queue.length) { $("speech-status").textContent = "Finished reading."; return; }
      const u = new SpeechSynthesisUtterance(queue.shift());
      if (v) { u.voice = v; u.lang = v.lang; }
      else if (mtLang) u.lang = mtLang;
      u.rate = parseFloat(rateSel.value || "1");
      u.onend = next;
      u.onerror = () => { $("speech-status").textContent = "Speech was interrupted."; };
      speechSynthesis.speak(u);
    };
    next();
  };
  $("stop-btn").onclick = () => {
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    $("speech-status").textContent = "Stopped.";
  };
  $("translate-btn").onclick = async () => {
    const lang = langSel.value;
    if (!lang) { langSel.focus(); return; }
    const btn = $("translate-btn");
    btn.disabled = true;
    btn.textContent = "Translating…";
    try {
      const paras = [...document.querySelectorAll("#page p, #page li, #page h1, #page h2, #page h3")].slice(0, 60);
      for (const el of paras) {
        const q = el.innerText.trim().slice(0, 450);
        if (q.length < 2) continue;
        const r = await fetch("https://api.mymemory.translated.net/get?q=" + encodeURIComponent(q) + "&langpair=en|" + encodeURIComponent(lang));
        if (!r.ok) throw new Error("HTTP " + r.status);
        const j = await r.json();
        const tr = j?.responseData?.translatedText;
        if (tr && tr.toLowerCase() !== q.toLowerCase()) {
          const d = document.createElement("div");
          d.className = "mt-text";
          d.innerText = tr;
          el.after(d);
        }
        await new Promise((res) => setTimeout(res, 350));
      }
      $("mt-note").hidden = false;
      $("mt-note").innerHTML = "<em>Machine translation — the English source remains authoritative.</em>";
    } catch {
      $("mt-note").hidden = false;
      $("mt-note").innerHTML = "<em>Translation unavailable (network or quota). English source unchanged.</em>";
    }
    btn.disabled = false;
    btn.textContent = "Translate prose";
  };
  $("clear-translation").onclick = () => {
    document.querySelectorAll(".mt-text").forEach((n) => n.remove());
    $("mt-note").hidden = true;
  };
}

/* ---------- periodic table + cover ---------- */
function elementChapter(number) {
  return (elements.find((e) => e.number === number) || {}).chapter || "";
}
function initAtlas() {
  // Cover element cards.
  const cards = $("element-cards");
  cards.innerHTML = "";
  elements.forEach((e) => {
    const a = document.createElement("a");
    a.className = "element-card";
    a.href = route(e.chapter);
    a.innerHTML = `<small>${esc(e.number)}${e.z ? " · Z " + e.z : ""}</small><strong>${esc(e.symbol)}</strong><span>${esc(e.name)}</span>`;
    cards.appendChild(a);
  });
  $("record-count").textContent = elements.length;
  const howto = flat.find((d) => d.id.endsWith("03-How-to-Use-MAT-Codex.md"));
  if (howto) $("guide-link").href = route(howto.id);
  $("start-btn").onclick = () => { const c = elementChapter("0000") || (flat.find((d) => d.section === ATLAS) || {}).id; if (c) location.hash = route(c); };
  // Periodic grid (true columns for Z 1–18; muted cells await records).
  const grid = $("periodic-grid");
  grid.innerHTML = "";
  const cols = { 1: [1, 18], 2: [1, 2, 13, 14, 15, 16, 17, 18], 3: [1, 2, 13, 14, 15, 16, 17, 18] };
  const byZ = new Map(elements.filter((e) => e.z).map((e) => [e.z, e]));
  const symByZ = { 1: "H", 2: "He", 3: "Li", 4: "Be", 5: "B", 6: "C", 7: "N", 8: "O", 9: "F", 10: "Ne", 11: "Na", 12: "Mg", 13: "Al", 14: "Si", 15: "P", 16: "S", 17: "Cl", 18: "Ar" };
  [1, 2, 3].forEach((row) => cols[row].forEach((col, k) => {
    const z = row === 1 ? (col === 1 ? 1 : 2) : row === 2 ? [3, 4, 5, 6, 7, 8, 9, 10][k] : [11, 12, 13, 14, 15, 16, 17, 18][k];
    const e = byZ.get(z);
    const cell = document.createElement(e ? "a" : "span");
    cell.className = "periodic-cell";
    cell.style.gridColumn = String(col);
    if (e) cell.href = route(e.chapter);
    else cell.setAttribute("aria-disabled", "true");
    cell.innerHTML = `<small>${z}</small><strong>${e ? esc(e.symbol) : symByZ[z]}</strong>`;
    cell.title = e ? `${e.number} · ${e.name}` : `Z ${z} — record pending`;
    grid.appendChild(cell);
  }));
  const dlg = $("periodic-dialog");
  const open = () => { if (typeof dlg.showModal === "function") dlg.showModal(); };
  $("periodic-cover").onclick = open;
  $("periodic-btn").onclick = open;
  $("close-periodic").onclick = () => dlg.close();
  const oc = elementChapter("0000");
  if (oc) $("origin-link").href = route(oc);
}
function initChrome() {
  // Section filter options from the manifest.
  const secSel = $("opt-section");
  [...new Set(flat.map((d) => d.section))].forEach((s) => {
    const o = document.createElement("option");
    o.value = s;
    o.textContent = s === ATLAS ? s : s;
    secSel.appendChild(o);
  });
  $("print-btn").onclick = () => window.print();
  const toggle = $("toc-toggle"), scrim = $("scrim");
  const setToc = (open) => {
    document.body.classList.toggle("toc-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    scrim.hidden = !open;
  };
  toggle.onclick = () => setToc(!document.body.classList.contains("toc-open"));
  scrim.onclick = () => setToc(false);
  $("goto-studio").onclick = () => {
    $("studio").open = true;
    $("studio").scrollIntoView({ behavior: "smooth", block: "nearest" });
  };
  $("citations-link").onclick = (e) => {
    e.preventDefault();
    const sdoc = searchById.get(currentId) || {};
    if ((sdoc.dois || []).length) fillSupplement(byId.get(currentId));
    $("supplement").scrollIntoView({ behavior: "smooth" });
  };
  document.addEventListener("keydown", (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || "");
    if (e.key === "Escape") { setToc(false); const d = $("periodic-dialog"); if (d.open) d.close(); }
    if (typing) return;
    if (e.key === "/" && document.activeElement !== $("search")) { e.preventDefault(); $("search").focus(); }
    if (e.key === "ArrowRight") $("next").click?.();
    if (e.key === "ArrowLeft") $("prev").click?.();
  });
  // Theme + font size (persisted).
  const applyTheme = () => {
    const light = localStorage.getItem("mat-theme") !== "dark";
    document.body.classList.toggle("light", light);
    $("theme-btn").textContent = light ? "Dark theme" : "Light theme";
    $("theme-btn").setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
  };
  applyTheme();
  $("theme-btn").onclick = () => {
    localStorage.setItem("mat-theme", document.body.classList.contains("light") ? "dark" : "light");
    applyTheme();
  };
  let fs = +(localStorage.getItem("mat-fs") || 17);
  const applyFs = () => document.body.style.setProperty("--font-size", fs + "px");
  applyFs();
  $("font-inc").onclick = () => { fs = Math.min(fs + 1, 21); localStorage.setItem("mat-fs", fs); applyFs(); };
  $("font-dec").onclick = () => { fs = Math.max(fs - 1, 14); localStorage.setItem("mat-fs", fs); applyFs(); };
  // Offline snapshot.
  $("offline-btn").onclick = async () => {
    const st = $("offline-status");
    try {
      const c = await caches.open("mat-ebook-v2");
      await c.addAll(["./", "./index.html", "./styles.css", "./book.js", "./reader-core.mjs",
        "./math-config.js", "./manifest.json", "./search-index.json", "./visuals-index.json",
        "./elements.json", "./identities.json", "./manifest.webmanifest", "./scenes/index.json",
        "./vendor/marked.mjs", "./vendor/tex-svg.js", "./vendor/three.module.js", "./vendor/OrbitControls.js"]);
      st.textContent = "Saved · this book now opens offline.";
    } catch { st.textContent = "Offline save failed in this browser."; }
  };
  if (!navigator.onLine) $("offline-status").textContent = "Offline · showing saved pages.";
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
}

/* ---------- init ---------- */
(async function init() {
  const [manifest, sidx, vidx, els, ids] = await Promise.all([
    getJSON("./manifest.json", null),
    getJSON("./search-index.json", { docs: [], related: [] }),
    getJSON("./visuals-index.json", { visuals: [] }),
    getJSON("./elements.json", { elements: [] }),
    getJSON("./identities.json", { identities: {} }),
  ]);
  if (!manifest) {
    $("book-status").textContent = "Could not load the book manifest. Is the preview server running?";
    return;
  }
  searchDocs = sidx.docs || [];
  related = sidx.related || [];
  searchById = new Map(searchDocs.map((d) => [d.id, d]));
  visuals = (vidx.visuals || []).map((v) => ({ ...v, items: v.items || [] }));
  elements = els.elements || [];
  identities = ids.identities || {};
  buildTOC(manifest);
  initChrome();
  initSearch();
  initStudio();
  initAtlas();
  window.addEventListener("hashchange", routeFromHash);
  routeFromHash();
})();
