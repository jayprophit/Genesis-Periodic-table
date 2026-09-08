/* MAT Codex reader: routes, TOC, search, studio, galleries, 3D links, offline. */
import {
  esc, canonicalId, route, parseRoute, recordOf, laneLabels,
  renderDocument, searchDocuments, snippet,
} from "./reader-core.mjs";
import {
  savePosition, getPosition, addToHistory, getHistory, getLastChapter,
  addBookmark, removeBookmark, getBookmarks, isBookmarked,
  addNote, updateNote, deleteNote, getNotes,
  addSearchHistory, getSearchHistory,
  setPref, getPref, addFavorite, removeFavorite, getFavorites,
  exportReaderData, importReaderData, clearTemporaryCache, clearReadingPreferences, deleteAllData,
} from "./modules/reading-memory.mjs";
import { initSearch as initSearchMod } from "./modules/search.mjs";
import { initAtlas as initAtlasMod } from "./modules/atlas.mjs";
import { initCharts } from "./modules/charts.mjs";

const $ = (id) => document.getElementById(id);
const GUIDE = ["Start here", "Front matter", "Foundations", "Data", "Methodology", "Visualization", "Index", "Governance", "Migration", "Back matter"];
const ATLAS = "Material Atlas Table";
const statusEl = $("book-status");
const say = (t) => { if (statusEl) statusEl.textContent = t; };

let flat = [], byId = new Map(), legacy = [];
let searchDocs = [], searchById = new Map(), related = [];
let visuals = [], elements = [], identities = {}, periodic = { cells: [] };
let currentId = "";
let lastExpandedRecord = null;

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

  // Material Atlas Table first: one nested folder per record, with a
  // second level grouped from actual subdirectories (no empty groups).
  // The main NNNN chapter always comes first.
  const atlas = document.createElement("div");
  atlas.innerHTML = `<div class="atlas-head"><h2>${esc(ATLAS)}</h2></div>`;
  const GROUP_OF = [
    [/\/calculations\//, "Calculations"],
    [/\/data\//, "Data & Properties"],
    [/\/(images|diagrams)\//, "Visuals & Diagrams"],
    [/\/(tables|graphs)\//, "Tables & Graphs"],
    [/\/models\//, "3D Models"],
    [/\/experiments\//, "Processes & Experiments"],
    [/People-and-Intellectual-Lineage/, "People / Lineage"],
    [/\/relationships\//, "Relationships"],
    [/\/sources\//, "Sources & Evidence"],
    [/-(Schema-Validation|Migration-Audit|Visual-Specification)\.md$/, "Validation & Migration"],
  ];
  const groupOf = (d) => {
    const hit = GROUP_OF.find(([re]) => re.test("/" + d.id));
    return hit ? hit[1] : "Record Companion";
  };
  const aDocs = flat.filter((d) => d.section === ATLAS);
  let lastRec = "";
  let recDetails = null, recBox = null, groups = null, mainCount = 0;
  const flushRecord = () => { recDetails = recBox = groups = null; };
  aDocs.forEach((d) => {
    const rec = recordOf(d.id);
    const key = rec ? rec.number : "other";
    if (key !== lastRec) {
      lastRec = key;
      mainCount = 0;
      recDetails = document.createElement("details");
      recDetails.className = "atlas-record";
      recDetails.open = open["rec-" + key] ?? false;
      recDetails.ontoggle = () => {
        open["rec-" + key] = recDetails.open;
        persist();
        if (recDetails.open && lastExpandedRecord && lastExpandedRecord !== recDetails) {
          lastExpandedRecord.open = false;
        }
        lastExpandedRecord = recDetails.open ? recDetails : null;
      };
      const label = rec ? `${rec.number} · ${rec.name}` : "Annex";
      recDetails.innerHTML = `<summary>${esc(label)}</summary>`;
      recBox = document.createElement("div");
      recDetails.appendChild(recBox);
      groups = new Map();
      atlas.appendChild(recDetails);
    }
    const isMain = rec && d.id === `${rec.dir}/${key}-${rec.name.replace(/ /g, "-")}-${rec.symbol}.md`;
    if (isMain && mainCount === 0) {
      mainCount++;
      const b = chapterLink(d);
      b.classList.add("toc-main");
      recBox.appendChild(b);
      return;
    }
    const g = groupOf(d);
    if (!groups.has(g)) {
      const det = document.createElement("details");
      det.className = "atlas-sub";
      det.open = open[`rec-${key}-${g}`] ?? false;
      det.ontoggle = () => { open[`rec-${key}-${g}`] = det.open; persist(); };
      det.innerHTML = `<summary>${esc(g)}</summary>`;
      const box = document.createElement("div");
      det.appendChild(box);
      groups.set(g, box);
      recBox.appendChild(det);
    }
    groups.get(g).appendChild(chapterLink(d));
  });
  flushRecord();
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
  /* Reading memory: record history + restore position */
  addToHistory(doc.id, doc.title, recordOf(doc.id)?.number || null).catch(() => {});
  updateBookmarkBtn();
  getPosition(doc.id).then((pos) => {
    if (pos && pos.scrollPct > 5) {
      const h = page.scrollHeight - page.clientHeight;
      if (h > 0) page.scrollTop = Math.round(h * (pos.scrollPct / 100));
    }
  }).catch(() => {});
}
function showCover() {
  currentId = "";
  markActive();
  $("content").hidden = true;
  $("cover").hidden = false;
  document.title = "MAT Codex — Materials Atlas Table";
  $("progress").style.width = "0%";
  renderCoverHistory();
  renderMyReading();
}
function routeFromHash() {
  const r = parseRoute(location.hash, legacy);
  if (!r || !r.id) { showCover(); return; }
  if (r.id !== currentId) showChapter(r.id, r.anchor);
  else if (r.anchor) document.getElementById(r.anchor)?.scrollIntoView();
}

/* ---------- search ---------- */
/* ---------- search (delegated to modules/search.mjs) ---------- */
function initSearch() {
  initSearchMod({ $, searchDocs, related, flat, route: (id) => route(id) });
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
  const zs = elements.filter((e) => e.z).map((e) => e.number);
  if (zs.length) {
    const lo = zs.reduce((a, b) => (a < b ? a : b)).slice(2);
    const hi = zs.reduce((a, b) => (a > b ? a : b)).slice(2);
    $("cover-range").textContent = `${lo}–${hi}`;
  }
  const origin = identities["0000"];
  if (origin && origin.status) $("cover-origin").textContent = `origin reference · ${origin.status.toLowerCase().replace(/-/g, " ")}`;
  const howto = flat.find((d) => d.id.endsWith("03-How-to-Use-MAT-Codex.md"));
  if (howto) $("guide-link").href = route(howto.id);
  $("start-btn").onclick = () => { const c = elementChapter("0000") || (flat.find((d) => d.section === ATLAS) || {}).id; if (c) location.hash = route(c); };

  // Periodic grid: 118-element layout with heatmap support.
  const grid = $("periodic-grid");
  grid.innerHTML = "";
  const elByZ = new Map(elements118.map((e) => [e.z, e]));
  const allCells = periodic.cells || [];

  function heatClass(val, min, max) {
    if (val == null || val === 0) return "";
    const norm = Math.min(1, Math.max(0, (val - min) / (max - min || 1)));
    return "heat-" + Math.ceil(norm * 7);
  }

  function buildGrid(mode) {
    grid.innerHTML = "";
    let vals = [];
    if (mode) {
      vals = elements118.map((e) => e[mode]).filter((v) => v != null && v !== 0);
    }
    const min = vals.length ? Math.min(...vals) : 0;
    const max = vals.length ? Math.max(...vals) : 1;

    allCells.filter((c) => !c.f).forEach((c) => {
      const el = elByZ.get(c.z);
      const cell = document.createElement(c.published ? "a" : "span");
      cell.className = "periodic-cell";
      if (mode && el) {
        const hc = heatClass(el[mode], min, max);
        if (hc) cell.classList.add(hc);
      }
      cell.style.gridColumn = String(c.group);
      cell.style.gridRow = String(c.period);
      if (c.published) cell.href = route(c.chapter);
      else cell.setAttribute("aria-disabled", "true");
      cell.innerHTML = `<small>${c.z}</small><strong>${esc(c.symbol)}</strong>`;
      cell.title = c.published ? `${c.mat} · ${esc(c.name)}` : `${esc(c.name)} (Z ${c.z}) — record pending`;
      cell.dataset.z = c.z;
      cell.addEventListener("click", (e) => { if (!c.published) { e.preventDefault(); showDossier(c.z); } });
      grid.appendChild(cell);
    });
    ["lanthanide", "actinide"].forEach((series, r) => {
      allCells.filter((c) => c.f === series).forEach((c) => {
        const el = elByZ.get(c.z);
        const cell = document.createElement(c.published ? "a" : "span");
        cell.className = "periodic-cell f-block";
        if (mode && el) {
          const hc = heatClass(el[mode], min, max);
          if (hc) cell.classList.add(hc);
        }
        cell.style.gridColumn = String(3 + c.fOrder);
        cell.style.gridRow = String(9 + r);
        if (c.published) cell.href = route(c.chapter);
        else cell.setAttribute("aria-disabled", "true");
        cell.innerHTML = `<small>${c.z}</small><strong>${esc(c.symbol)}</strong>`;
        cell.title = c.published ? `${c.mat} · ${esc(c.name)}` : `${esc(c.name)} (Z ${c.z}) — record pending`;
        cell.dataset.z = c.z;
        cell.addEventListener("click", (e) => { if (!c.published) { e.preventDefault(); showDossier(c.z); } });
        grid.appendChild(cell);
      });
    });
  }
  buildGrid("");

  // Heatmap mode switcher.
  $("heatmap-mode").onchange = (e) => buildGrid(e.target.value || null);

  // Element dossier (expandable details for unpublished elements).
  function showDossier(z) {
    const el = elByZ.get(z);
    const dossier = $("element-dossier");
    if (!el) { dossier.hidden = true; return; }
    dossier.hidden = false;
    const fields = [
      ["Symbol", el.symbol], ["Atomic Weight", el.atomicWeight],
      ["Electronegativity", el.electronegativity], ["Ionization Energy", el.ionizationEnergy ? el.ionizationEnergy + " eV" : null],
      ["Atomic Radius", el.atomicRadius ? el.atomicRadius + " pm" : null], ["Density", el.density ? el.density + " g/cm³" : null],
      ["Melting Point", el.meltingPoint ? el.meltingPoint + " K" : null], ["Boiling Point", el.boilingPoint ? el.boilingPoint + " K" : null],
      ["Phase", el.phase], ["Category", el.category], ["Electron Config", el.electronConfiguration],
    ].filter(([k, v]) => v != null && v !== "");
    dossier.innerHTML = `<h3>${esc(el.name)} (Z=${z})</h3><div class="dossier-grid">${fields.map(([k, v]) => `<div class="dossier-item"><small>${esc(k)}</small><strong>${esc(String(v))}</strong></div>`).join("")}</div>`;
  }

  const dlg = $("periodic-dialog");
  const open = () => { if (typeof dlg.showModal === "function") dlg.showModal(); };
  $("periodic-cover").onclick = open;
  $("periodic-btn").onclick = open;
  $("close-periodic").onclick = () => { dlg.close(); $("element-dossier").hidden = true; };
  dlg.addEventListener("click", (e) => { if (e.target === dlg) { dlg.close(); $("element-dossier").hidden = true; } });
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
  // Offline snapshot: the generated index lists every local resource so a
  // complete save caches chapters, figures, scenes and libraries — and says so honestly.
  $("offline-btn").onclick = async () => {
    const st = $("offline-status");
    try {
      const idx = await getJSON("./offline-index.json", null);
      if (!idx || !idx.all) throw new Error("no index");
      const c = await caches.open("mat-ebook-v2");
      let ok = 0;
      const failedUrls = [];
      for (const u of idx.all) {
        try { await c.add(u); ok++; }
        catch { failedUrls.push(u); }
      }
      st.textContent = failedUrls.length
        ? `Partial save: ${ok}/${idx.all.length} cached (${failedUrls.length} failed).`
        : `Saved · complete book offline (${ok} resources).`;
      if (failedUrls.length) console.warn("offline failures", failedUrls);
    } catch { st.textContent = "Offline save failed in this browser."; }
  };
  if (!navigator.onLine) $("offline-status").textContent = "Offline · showing saved pages.";
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
}

/* ---------- reading memory: scroll position save ---------- */
let scrollSaveTimer = null;
let scrollProgressEl = null;
function initScrollSave() {
  scrollProgressEl = $("progress");
  const reader = $("reader");
  reader.addEventListener("scroll", () => {
    /* Progress bar */
    if (scrollProgressEl) {
      const h = reader.scrollHeight - reader.clientHeight;
      const pct = h > 0 ? Math.round((reader.scrollTop / h) * 100) : 0;
      scrollProgressEl.style.width = pct + "%";
    }
    /* Save position */
    if (!currentId) return;
    clearTimeout(scrollSaveTimer);
    scrollSaveTimer = setTimeout(() => {
      const h = reader.scrollHeight - reader.clientHeight;
      if (h > 10) {
        const pct = Math.round((reader.scrollTop / h) * 100);
        savePosition(currentId, pct).catch(() => {});
      }
    }, 800);
  });
}

/* ---------- citation export ---------- */
function initCitations() {
  const dlg = $("cite-dialog");
  $("cite-btn").onclick = () => {
    if (!currentId) return;
    const doc = byId.get(currentId);
    const rec = recordOf(currentId);
    const num = rec?.number || "0000";
    $("cite-apa").onclick = () => {
      $("cite-output").value = `Powe, J. (2025). ${doc?.title || "MAT:" + num}. In Materials Atlas Table Codex. MAT:${num}. Retrieved from ${location.href}`;
    };
    $("cite-bibtex").onclick = () => {
      const key = `powe2025mat${num}`;
      $("cite-output").value = `@misc{${key},\n  author = {Powe, Jay},\n  title = {${doc?.title || "MAT:" + num}},\n  year = {2025},\n  howpublished = {Materials Atlas Table Codex, MAT:${num}},\n  url = {${location.href}}\n}`;
    };
    $("cite-ris").onclick = () => {
      $("cite-output").value = `TY  - GEN\nAU  - Powe, Jay\nTI  - ${doc?.title || "MAT:" + num}\nPY  - 2025\nPB  - Materials Atlas Table Codex\nUR  - ${location.href}\nER  -`;
    };
    $("cite-apa").click();
    dlg.showModal();
  };
  $("cite-copy").onclick = () => { navigator.clipboard.writeText($("cite-output").value).catch(() => {}); $("cite-copy").textContent = "Copied!"; setTimeout(() => $("cite-copy").textContent = "Copy", 1500); };
  $("cite-close").onclick = () => dlg.close();
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
}

/* ---------- hover glossary ---------- */
const GLOSSARY = {
  "electronegativity": "A measure of an atom's ability to attract bonding electrons (Pauling scale).",
  "ionization energy": "The energy required to remove an electron from a gaseous atom or ion.",
  "atomic radius": "Half the distance between two nuclei of the same element in a bonded state.",
  "isotope": "Atoms of the same element with different numbers of neutrons.",
  "allotrope": "Different structural forms of the same element (e.g., diamond vs. graphite for carbon).",
  "halflife": "The time for half of a radioactive sample to decay.",
  "oxidation state": "The degree of oxidation (loss of electrons) of an atom in a compound.",
  "electron configuration": "The distribution of electrons in an atom's orbitals.",
  "periodic table": "A tabular arrangement of chemical elements organized by atomic number.",
  "covalent bond": "A chemical bond formed by sharing electron pairs between atoms.",
  "metallic bond": "A bond formed by the sharing of free electrons among a lattice of metal atoms.",
  "band gap": "The energy difference between the top of the valence band and the bottom of the conduction band.",
  "crystal field": "The model describing the breaking of degeneracy of electron orbital energies in a solid.",
  "causali e": "An original theoretical framework by the author exploring causal relationships in material states.",
};
let glossaryTooltip = null;
function initGlossary() {
  glossaryTooltip = document.createElement("div");
  glossaryTooltip.className = "glossary-tooltip";
  glossaryTooltip.hidden = true;
  document.body.appendChild(glossaryTooltip);
  const reader = $("reader");
  reader.addEventListener("mouseover", (e) => {
    const text = e.target.textContent?.toLowerCase().trim();
    if (text && GLOSSARY[text]) {
      glossaryTooltip.textContent = GLOSSARY[text];
      glossaryTooltip.hidden = false;
      const rect = e.target.getBoundingClientRect();
      glossaryTooltip.style.left = rect.left + "px";
      glossaryTooltip.style.top = (rect.bottom + 4) + "px";
    }
  });
  reader.addEventListener("mouseout", (e) => {
    if (glossaryTooltip) glossaryTooltip.hidden = true;
  });
}

/* ---------- reading memory: cover sections ---------- */
function timeAgo(iso) {
  const ms = Date.now() - new Date(iso).getTime();
  if (ms < 60000) return "just now";
  if (ms < 3600000) return `${Math.floor(ms / 60000)}m ago`;
  if (ms < 86400000) return `${Math.floor(ms / 3600000)}h ago`;
  return `${Math.floor(ms / 86400000)}d ago`;
}

async function renderCoverHistory() {
  try {
    const last = await getLastChapter();
    const contEl = $("continue-reading");
    const listEl = $("continue-list");
    if (last) {
      contEl.hidden = false;
      listEl.innerHTML = `<a class="continue-item" href="${route(last.chapterId)}"><small>${esc(last.record || last.chapterId)}</small><strong>${esc(last.title)}</strong></a>`;
    } else {
      contEl.hidden = true;
    }
    const hist = await getHistory();
    const recEl = $("recently-read");
    const recList = $("recent-list");
    if (hist.length > 1) {
      recEl.hidden = false;
      recList.innerHTML = hist.slice(1, 6).map((h) =>
        `<a class="recent-item" href="${route(h.chapterId)}"><span class="recent-time">${timeAgo(h.openedAt)}</span><small>${esc(h.record || h.chapterId)}</small><strong>${esc(h.title)}</strong></a>`
      ).join("");
    } else {
      recEl.hidden = true;
    }
  } catch {}
}

/* ---------- search history ---------- */
function trackSearch(query) {
  if (query.length >= 2) addSearchHistory(query).catch(() => {});
}

/* ---------- bookmarks, highlights, my reading panel ---------- */
async function updateBookmarkBtn() {
  const btn = $("bookmark-btn");
  if (!btn || !currentId) return;
  const bm = await isBookmarked(currentId, null);
  btn.textContent = bm ? "★ Bookmarked" : "☆ Bookmark";
  btn.classList.toggle("bookmarked", !!bm);
}

function initBookmarks() {
  $("bookmark-btn").onclick = async () => {
    if (!currentId) return;
    const bm = await isBookmarked(currentId, null);
    if (bm) {
      await removeBookmark(bm.id);
    } else {
      const doc = byId.get(currentId);
      await addBookmark(currentId, doc?.title || null, recordOf(currentId)?.number || null);
    }
    updateBookmarkBtn();
    renderMyReading();
  };
}

function initHighlights() {
  $("highlight-btn").onclick = async () => {
    if (!currentId) return;
    const sel = window.getSelection();
    const text = sel?.toString().trim();
    if (!text || text.length < 2) return;
    await addHighlight(currentId, text, null, "#f0d887");
    renderMyReading();
  };
}

/* ---------- export / import / reset ---------- */
function initDataManagement() {
  $("export-btn").onclick = async () => {
    const data = await exportReaderData();
    const blob = new Blob([data], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `mat-reader-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  $("import-btn").onclick = () => $("import-file").click();
  $("import-file").onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      await importReaderData(text);
      alert("Data imported successfully.");
      renderMyReading();
    } catch (err) {
      alert("Import failed: " + err.message);
    }
    e.target.value = "";
  };
  $("clear-cache-btn").onclick = async () => {
    if (!confirm("Clear translation cache? This won't affect bookmarks or notes.")) return;
    await clearTemporaryCache();
    alert("Cache cleared.");
  };
  $("clear-prefs-btn").onclick = async () => {
    if (!confirm("Reset reading preferences (theme, font size)?")) return;
    await clearReadingPreferences();
    alert("Preferences reset. Reload to apply.");
  };
  $("delete-all-btn").onclick = async () => {
    if (!confirm("DELETE ALL saved data? This cannot be undone.")) return;
    if (!confirm("Are you absolutely sure?")) return;
    await deleteAllData();
    alert("All data deleted.");
    renderMyReading();
  };
}

async function renderMyReading() {
  try {
    const bms = await getBookmarks();
    const bmList = $("bookmarks-list");
    if (bms.length) {
      bmList.innerHTML = bms.map((b) =>
        `<div class="bookmark-entry"><a href="${route(b.chapterId)}"><strong>${esc(b.heading || b.chapterId)}</strong> <span>${esc(b.record || "")}</span></a><button data-bm="${b.id}" title="Remove">✕</button></div>`
      ).join("");
      bmList.querySelectorAll("button[data-bm]").forEach((btn) => {
        btn.onclick = async () => { await removeBookmark(btn.dataset.bm); renderMyReading(); };
      });
    } else {
      bmList.innerHTML = `<p class="empty-note">No bookmarks yet.</p>`;
    }

    const notes = await getNotes();
    const notesList = $("notes-list");
    if (notes.length) {
      notesList.innerHTML = notes.map((n) =>
        `<div class="note-entry"><a href="${route(n.chapterId)}"><strong>${esc(n.heading || n.chapterId)}</strong><span class="note-text">${esc(n.text)}</span></a><button data-note="${n.id}" title="Delete">✕</button></div>`
      ).join("");
      notesList.querySelectorAll("button[data-note]").forEach((btn) => {
        btn.onclick = async () => { await deleteNote(btn.dataset.note); renderMyReading(); };
      });
    } else {
      notesList.innerHTML = `<p class="empty-note">No notes yet.</p>`;
    }

    const favs = await getFavorites();
    const favList = $("favorites-list");
    if (favs.length) {
      favList.innerHTML = favs.map((f) =>
        `<div class="favorite-entry"><a href="${route("MAT:" + f.recordNumber)}">MAT:${esc(f.recordNumber)}</a><button data-fav="${f.recordNumber}" title="Remove">✕</button></div>`
      ).join("");
      favList.querySelectorAll("button[data-fav]").forEach((btn) => {
        btn.onclick = async () => { await removeFavorite(btn.dataset.fav); renderMyReading(); };
      });
    } else {
      favList.innerHTML = `<p class="empty-note">No favorites yet.</p>`;
    }

    const sh = await getSearchHistory();
    const shList = $("search-history-list");
    if (sh.length) {
      shList.innerHTML = sh.map((s) =>
        `<div class="search-hist-entry"><a href="#" onclick="document.getElementById('search').value='${esc(s.query)}';document.getElementById('search').dispatchEvent(new Event('input'));return false;">${esc(s.query)}</a></div>`
      ).join("");
    } else {
      shList.innerHTML = `<p class="empty-note">No search history.</p>`;
    }
  } catch {}
}

/* ---------- CSS concatenation ---------- */
const CSS_MODULES = [
  "variables.css", "base.css", "layout.css", "toc.css",
  "sidebar-settings.css", "reader.css", "content.css",
  "visuals.css", "responsive.css", "print.css"
];

async function concatCSS() {
  const parts = [];
  for (const mod of CSS_MODULES) {
    try {
      const resp = await fetch(`styles/${mod}`);
      if (resp.ok) parts.push(await resp.text());
    } catch {}
  }
  const blob = new Blob([parts.join("\n")], { type: "text/css" });
  const link = document.getElementById("styles-link");
  if (link) link.href = URL.createObjectURL(blob);
}

/* ---------- 118-element data ---------- */
let elements118 = [];
let chartData = null;
async function loadElements118() {
  const d = await getJSON("./data/elements-118.json", { elements: [] });
  elements118 = d.elements || [];
}
async function loadChartData() {
  chartData = await getJSON("./data/chart-datasets.json", null);
}

/* ---------- init ---------- */
(async function init() {
  await concatCSS();
  const [manifest, sidx, vidx, els, ids, per] = await Promise.all([
    getJSON("./manifest.json", null),
    getJSON("./search-index.json", { docs: [], related: [] }),
    getJSON("./visuals-index.json", { visuals: [] }),
    getJSON("./elements.json", { elements: [] }),
    getJSON("./identities.json", { identities: {} }),
    getJSON("./periodic.json", { cells: [] }),
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
  periodic = per;
  await loadElements118();
  await loadChartData();
  buildTOC(manifest);
  initChrome();
  initSearch();
  initStudio();
  initAtlas();
  initScrollSave();
  initBookmarks();
  initHighlights();
  initDataManagement();
  initCitations();
  /* Hover glossary */
  initGlossary();
  /* Charts: wait for Chart.js to load */
  function tryInitCharts() {
    if (typeof Chart !== "undefined" && chartData) {
      const charts = initCharts({ $, chartData });
      if (charts && chartData.abundanceDatasets) {
        if (chartData.abundanceDatasets.universe) charts.renderAbundancePie("chart-cosmic", chartData.abundanceDatasets.universe);
        if (chartData.abundanceDatasets.crust) charts.renderAbundancePie("chart-crust", chartData.abundanceDatasets.crust);
        if (chartData.abundanceDatasets.human) charts.renderAbundancePie("chart-human", chartData.abundanceDatasets.human);
        charts.renderRadar("chart-radar");
      }
    } else {
      setTimeout(tryInitCharts, 200);
    }
  }
  tryInitCharts();
  window.addEventListener("hashchange", routeFromHash);
  routeFromHash();
  renderCoverHistory();
  renderMyReading();
})();
