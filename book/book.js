/* MAT e-book reader: manifest TOC + dependency-free Markdown rendering. */
const tocEl = document.getElementById("toc");
const pageEl = document.getElementById("page");
const contentEl = document.getElementById("content");
const coverEl = document.getElementById("cover");
const crumbEl = document.getElementById("crumb");
const searchEl = document.getElementById("search");
const countEl = document.getElementById("count");
let flat = []; let current = -1;

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function inline(s) {
  s = esc(s);
  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, a, u) =>
    `<img alt="${a}" src="${resolveUrl(u)}">`);
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, u) => {
    if (/\.md(#.*)?$/i.test(u)) return `<a href="#" data-md="${u}">${t}</a>`;
    if (/^https?:/.test(u)) return `<a href="${u}" target="_blank" rel="noopener">${t}</a>`;
    return `<a href="${resolveUrl(u)}">${t}</a>`;
  });
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(^|\W)\*([^*\n]+)\*/g, "$1<em>$2</em>");
  return s;
}
function resolveUrl(u) {
  if (/^(https?:|data:|#)/.test(u)) return u;
  const base = flat[current] ? flat[current].path.split("/").slice(0, -1).join("/") + "/" : "";
  return base + u;
}
function renderMarkdown(src) {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  let html = "", i = 0, inCode = false, codeLang = "", buf = [];
  let listStack = [];
  const closeLists = (depth = 0) => {
    while (listStack.length > depth) html += listStack.pop() === "ul" ? "</ul>" : "</ol>";
  };
  const flushPara = () => {
    if (buf.length) { html += `<p>${inline(buf.join(" "))}</p>`; buf = []; }
  };
  const isTableRow = (l) => /^\s*\|.*\|\s*$/.test(l);
  while (i < lines.length) {
    const line = lines[i];
    const fence = line.match(/^(`{3,})(\w*)/);
    if (fence) {
      if (!inCode) { flushPara(); closeLists(); inCode = true; codeLang = fence[2]; buf = []; }
      else {
        html += `<pre><code>${esc(buf.join("\n"))}</code></pre>`; buf = []; inCode = false;
      }
      i++; continue;
    }
    if (inCode) { buf.push(line); i++; continue; }
    if (/^\s*$/.test(line)) { flushPara(); i++; continue; }
    const h = line.match(/^(#{1,4})\s+(.*)/);
    if (h) { flushPara(); closeLists(); html += `<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`; i++; continue; }
    if (/^---+\s*$/.test(line)) { flushPara(); closeLists(); html += "<hr>"; i++; continue; }
    if (/^>\s?/.test(line)) { flushPara(); html += `<blockquote>${inline(line.replace(/^>\s?/, ""))}</blockquote>`; i++; continue; }
    if (isTableRow(line) && i + 1 < lines.length && /^\s*\|?[\s:|-]+\|?[\s:|-]*$/.test(lines[i + 1])) {
      flushPara(); closeLists();
      const cells = (r) => r.trim().replace(/^\||\|$/g, "").split("|").map((c) => `<th>${inline(c.trim())}</th>`).join("");
      html += `<table><thead><tr>${cells(line)}</tr></thead><tbody>`;
      i += 2;
      while (i < lines.length && isTableRow(lines[i])) {
        const tds = lines[i].trim().replace(/^\||\|$/g, "").split("|").map((c) => `<td>${inline(c.trim())}</td>`).join("");
        html += `<tr>${tds}</tr>`; i++;
      }
      html += "</tbody></table>"; continue;
    }
    const ul = line.match(/^(\s*)[-*]\s+(.*)/);
    const ol = line.match(/^(\s*)\d+[.)]\s+(.*)/);
    if (ul || ol) {
      flushPara();
      const depth = Math.floor(((ul ? ul[1] : ol[1]).length) / 2);
      const tag = ul ? "ul" : "ol";
      closeLists(depth);
      if (listStack[depth] !== tag) { closeLists(depth); html += `<${tag}>`; listStack[depth] = tag; listStack.length = depth + 1; }
      html += `<li>${inline(ul ? ul[2] : ol[2])}</li>`; i++; continue;
    }
    buf.push(line.trim()); i++;
  }
  flushPara(); closeLists();
  return html;
}

async function loadChapter(idx) {
  if (idx < 0 || idx >= flat.length) return;
  current = idx;
  const ch = flat[idx];
  document.querySelectorAll(".toc-item").forEach((b) => b.classList.toggle("active", +b.dataset.idx === idx));
  coverEl.hidden = true; contentEl.hidden = false;
  crumbEl.textContent = `${ch.section} · ${ch.title}`;
  pageEl.innerHTML = "<p>Loading…</p>";
  try {
    const res = await fetch(ch.path);
    if (!res.ok) throw new Error(res.status);
    pageEl.innerHTML = renderMarkdown(await res.text());
  } catch {
    pageEl.innerHTML = "<p><em>Could not load this chapter. Is the preview server running?</em></p>";
  }
  document.getElementById("prev").disabled = idx === 0;
  document.getElementById("next").disabled = idx === flat.length - 1;
  document.getElementById("progress").style.width = `${((idx + 1) / flat.length) * 100}%`;
  window.scrollTo(0, 0);
  if (window.MathJax?.typesetPromise) window.MathJax.typesetPromise();
  location.hash = "#/" + idx;
  // page-turn animation + identifier hover tips
  pageEl.classList.remove("turn");
  void pageEl.offsetWidth;
  pageEl.classList.add("turn");
  tagMatIds();
  buildJump();
  buildRecommend();
  document.getElementById("studio-chapter").textContent = ch.title;
  buildExternal();
}

// External resources for the current chapter: encyclopedia, papers, video,
// citations — derived from the chapter's own topic and DOI references.
async function buildExternal() {
  document.getElementById("extern")?.remove();
  const ch = flat[current];
  if (!ch) return;
  // Topic: record dataset name preferred (e.g. "Hydrogen"), else chapter title.
  let topic = ch.title.replace(/^[0-9—\s–-]+/, "").split("—")[0].split(":")[0].trim();
  const dm = ch.path.match(/records\/\d{4}-([A-Za-z]+)-/);
  if (dm) topic = dm[1];
  if (!topic || /^(MAT|G000|SRC|CALC|TEST)/i.test(topic)) return;
  const q = encodeURIComponent(topic + " element");
  const items = [
    [`Wikipedia — ${topic}`, `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(topic)}`],
    [`Research papers — ${topic}`, `https://scholar.google.com/scholar?q=${q}`],
    [`Videos — ${topic}`, `https://www.youtube.com/results?search_query=${q}`],
  ];
  try {
    const r = await fetch("./search-index.json");
    const dois = ((await r.json()).docs[current] || {}).dois || [];
    dois.slice(0, 4).forEach((d) =>
      items.push([`Citation ${d.slice(0, 32)}…`, `https://doi.org/${d}`]));
  } catch {}
  const div = document.createElement("div");
  div.id = "extern";
  div.innerHTML = `<h3>External resources — ${esc(topic)} <span style="color:var(--muted);font-weight:400">(leaves this book)</span></h3>` +
    "<ul>" + items.map(([t, u]) =>
      `<li><a href="${u}" target="_blank" rel="noopener">${esc(t)}</a></li>`).join("") + "</ul>";
  const anchor = document.getElementById("reco") || pageEl;
  anchor.after(div);
}

// Cascading dropdown: jump to any section inside the current chapter.
function buildJump() {
  const sel = document.getElementById("jump");
  sel.innerHTML = `<option value="">Sections…</option>`;
  pageEl.querySelectorAll("h1,h2,h3").forEach((h, k) => {
    if (!h.id) h.id = "sec-" + k;
    const o = document.createElement("option");
    o.value = h.id;
    o.textContent = `${h.tagName} · ${h.innerText.slice(0, 60)}`;
    sel.appendChild(o);
  });
  sel.onchange = () => {
    if (sel.value) document.getElementById(sel.value)?.scrollIntoView({ behavior: "smooth" });
  };
}

// Recommendations: data-driven "read next" from the shared-reference graph,
// plus a local suggestion box (stored in this browser only).
let recLinks = null;
async function buildRecommend() {
  if (!recLinks) {
    try {
      const r = await fetch("./search-index.json");
      recLinks = (await r.json()).related;
    } catch { return; }
  }
  document.getElementById("reco")?.remove();
  const ids = (recLinks[current] || []).slice(0, 4);
  if (!ids.length) return;
  const div = document.createElement("div");
  div.id = "reco";
  div.innerHTML = `<h3>Recommended next</h3>`;
  ids.forEach((j) => {
    const b = document.createElement("button");
    b.className = "toc-item";
    b.textContent = flat[j] ? flat[j].title : "";
    b.onclick = () => loadChapter(j);
    div.appendChild(b);
  });
  const s = document.createElement("details");
  s.innerHTML = `<summary>Suggest a correction or addition</summary>
    <textarea id="sugg" rows="3" placeholder="Your suggestion (kept in this browser)"></textarea>
    <div><button id="sugg-save">Save</button> <button id="sugg-copy">Copy all</button></div>
    <ul id="sugg-list"></ul>`;
  div.appendChild(s);
  pageEl.after(div);
  const key = "mat-suggestions";
  const renderSugg = () => {
    const all = JSON.parse(localStorage.getItem(key) || "{}");
    const mine = all[current] || [];
    document.getElementById("sugg-list").innerHTML =
      mine.map((t) => `<li>${t.replace(/</g, "&lt;")}</li>`).join("");
  };
  renderSugg();
  document.getElementById("sugg-save").onclick = () => {
    const t = document.getElementById("sugg").value.trim();
    if (!t) return;
    const all = JSON.parse(localStorage.getItem(key) || "{}");
    (all[current] ??= []).push(`${new Date().toISOString().slice(0, 10)}: ${t}`);
    localStorage.setItem(key, JSON.stringify(all));
    document.getElementById("sugg").value = "";
    renderSugg();
  };
  document.getElementById("sugg-copy").onclick = async () => {
    const all = JSON.parse(localStorage.getItem(key) || "{}");
    await navigator.clipboard.writeText(JSON.stringify(all, null, 2)).catch(() => {});
  };
}

// Hover tooltips for MAT record IDs, resolved from the book's own manifest.
let recNames = null;
function tagMatIds() {
  if (!recNames) {
    recNames = {};
    flat.forEach((c, i) => {
      const m = c.path.match(/records\/(\d{4})-[^/]+/);
      if (m && !recNames[m[1]]) recNames[m[1]] = { title: c.title, idx: i };
    });
  }
  const walker = document.createTreeWalker(pageEl, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((n) => {
    if (!/MAT:(000\d|00\d\d)/.test(n.textContent) || n.parentElement.closest("a,code,pre")) return;
    const frag = document.createDocumentFragment();
    let last = 0;
    const re = /MAT:(000\d|00\d\d)(:[A-Z0-9:+-]+)?/g;
    let m;
    while ((m = re.exec(n.textContent))) {
      frag.appendChild(document.createTextNode(n.textContent.slice(last, m.index)));
      const rec = recNames[m[1]];
      const s = document.createElement("span");
      s.className = "mat-id";
      s.textContent = m[0];
      if (rec) {
        s.dataset.tip = rec.title + " — click to open";
        s.dataset.idx = rec.idx;
        s.onclick = () => loadChapter(+s.dataset.idx);
      } else s.dataset.tip = "MAT record reference";
      frag.appendChild(s);
      last = m.index + m[0].length;
    }
    frag.appendChild(document.createTextNode(n.textContent.slice(last)));
    n.replaceWith(frag);
  });
}

function buildTOC(manifest) {
  tocEl.innerHTML = "";
  flat = [];
  const collapsed = JSON.parse(localStorage.getItem("mat-collapsed") || "{}");
  manifest.chapters.forEach((sec, si) => {
    const h = document.createElement("div");
    h.className = "toc-sec collapsible";
    h.innerHTML = `<span class="caret"></span><span>${esc(sec.section)}</span>`;
    const key = "sec-" + si;
    const group = document.createElement("div");
    group.className = "toc-group";
    h.onclick = () => {
      const shut = group.classList.toggle("shut");
      h.classList.toggle("shut", shut);
      collapsed[key] = shut;
      localStorage.setItem("mat-collapsed", JSON.stringify(collapsed));
    };
    if (collapsed[key]) { group.classList.add("shut"); h.classList.add("shut"); }
    tocEl.appendChild(h);
    // Cascade: record chapters nest under their parent record header.
    let sub = null;
    sec.items.forEach((it) => {
      const m = it.path.match(/records\/(\d{4})-([^/]+)\//);
      const idx = flat.length;
      flat.push({ ...it, section: sec.section });
      const b = document.createElement("button");
      b.className = "toc-item"; b.dataset.idx = idx; b.textContent = it.title;
      b.onclick = () => loadChapter(idx);
      if (m && sec.section === "Records") {
        const rkey = "rec-" + m[1];
        if (!sub || sub.dataset.rec !== m[1]) {
          sub = document.createElement("div");
          sub.dataset.rec = m[1];
          const rh = document.createElement("button");
          rh.className = "toc-rec";
          rh.innerHTML = `<span class="caret"></span><span>${esc(m[1] + " " + m[2].replace(/-/g, " "))}</span>`;
          const ritems = document.createElement("div");
          ritems.className = "toc-ritems";
          rh.onclick = () => {
            const shut = ritems.classList.toggle("shut");
            rh.classList.toggle("shut", shut);
          };
          sub.appendChild(rh);
          sub.appendChild(ritems);
          group.appendChild(sub);
        }
        sub.querySelector(".toc-ritems").appendChild(b);
      } else group.appendChild(b);
    });
    tocEl.appendChild(group);
  });
  countEl.textContent = `${flat.length} chapters`;
}

const ready = fetch("./manifest.json").then((r) => r.json()).then((m) => {
  buildTOC(m);
  const secSel = document.getElementById("opt-section");
  m.chapters.forEach((s) => {
    const o = document.createElement("option");
    o.value = s.section;
    o.textContent = s.section;
    secSel.appendChild(o);
  });
  document.getElementById("start-btn").onclick = () => loadChapter(0);
  document.getElementById("prev").onclick = () => loadChapter(current - 1);
  document.getElementById("next").onclick = () => loadChapter(current + 1);
  document.getElementById("print-btn").onclick = () => window.print();
  document.getElementById("toc-toggle").onclick = () => document.body.classList.toggle("toc-open");
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") loadChapter(current + 1);
    if (e.key === "ArrowLeft") loadChapter(current - 1);
  });
  pageEl.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-md]");
    if (!a) return;
    e.preventDefault();
    const target = a.getAttribute("data-md").split("#")[0].toLowerCase();
    const found = flat.findIndex((c) => c.path.toLowerCase().endsWith(target));
    if (found >= 0) loadChapter(found);
  });
  const fromHash = parseInt((location.hash.match(/#\/(\d+)/) || [])[1], 10);
  if (!isNaN(fromHash)) loadChapter(fromHash);
});

// ---- Book tools below attach immediately so slow networks can't strand input ----
{
  // Full-text search over the book's own index, with related-chapter suggestions
  // drawn from shared MAT record references (the "alternative results").
  const resultsEl = document.getElementById("results");
  let searchIdx = null;
  async function ensureIndex() {
    if (!searchIdx) {
      const r = await fetch("./search-index.json");
      searchIdx = await r.json();
    }
    return searchIdx;
  }
  function snippet(text, q) {
    const i = text.toLowerCase().indexOf(q);
    if (i < 0) return text.slice(0, 120);
    const s = Math.max(0, i - 50);
    return (s > 0 ? "…" : "") + text.slice(s, s + 140) + "…";
  }
  function hi(text, q) {
    const i = text.toLowerCase().indexOf(q);
    if (i < 0) return esc(text.slice(0, 140));
    return esc(text.slice(Math.max(0, i - 60), i)) +
      "<mark>" + esc(text.slice(i, i + q.length)) + "</mark>" +
      esc(text.slice(i + q.length, i + 80));
  }
  let searchTimer = null;
  searchEl.oninput = () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(runSearch, 180);
  };
  // Studio home: collapsible section + jump button from the chapter toolbar.
  const studioHead = document.getElementById("studio-head");
  const studioBox = document.getElementById("studio");
  studioHead.onclick = () => {
    const shut = studioBox.classList.toggle("shut");
    studioHead.classList.toggle("shut", shut);
  };
  document.getElementById("goto-studio").onclick = () => {
    studioBox.classList.remove("shut");
    studioHead.classList.remove("shut");
    studioBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  // Advanced search controls.
  document.getElementById("adv-toggle").onclick = () => {
    document.getElementById("adv").hidden = !document.getElementById("adv").hidden;
  };
  async function runSearch() {
    const q = searchEl.value.trim().toLowerCase();
    resultsEl.innerHTML = "";
    if (q.length < 2) { resultsEl.hidden = true; return; }
    await ready;
    if (searchEl.value.trim().toLowerCase() !== q) return; // stale run: user kept typing
    const { docs, related } = await ensureIndex();
    if (searchEl.value.trim().toLowerCase() !== q) return; // stale run: don't swap DOM under cursor
    const titleOnly = document.getElementById("opt-title").checked;
    const secFilter = document.getElementById("opt-section").value;
    const maxN = +document.getElementById("opt-count").value || 8;
    const sortMode = document.getElementById("opt-sort").value;
    const wantRelated = document.getElementById("opt-related").checked;
    // Alias grouping: "h", "hydrogen", "0001" all resolve to the 0001 dataset.
    const aliasHit = new Set();
    docs.forEach((d) => {
      if (d.aks && d.aks.includes(q)) d.aks.forEach(() => aliasHit.add(d.i));
    });
    let scored = docs
      .map((d) => {
        const inTitle = d.title.toLowerCase().includes(q);
        const inAlias = d.aks ? d.aks.includes(q) : false;
        const count = titleOnly ? 0 : d.text.toLowerCase().split(q).length - 1;
        if (secFilter && d.section !== secFilter) return null;
        return { d, score: (inTitle ? 100 : 0) + (inAlias ? 80 : 0) + Math.min(count, 20) };
      })
      .filter((r) => r && r.score > 0);
    if (sortMode === "title") scored.sort((a, b) => a.d.title.localeCompare(b.d.title));
    else scored.sort((a, b) => b.score - a.score);
    scored = scored.slice(0, maxN);
    if (!scored.length) {
      resultsEl.innerHTML = `<div class="res-sec">No matches</div>`;
      resultsEl.hidden = false;
      return;
    }
    // Group dataset chapters together under their dataset header.
    let html = `<div class="res-sec">Matches</div>`;
    let lastDs = null;
    scored.forEach(({ d }) => {
      if (d.dataset && d.dataset !== lastDs) {
        html += `<div class="res-dataset">Dataset ${esc(d.dataset)}</div>`;
        lastDs = d.dataset;
      } else if (!d.dataset) lastDs = null;
      html += `<button class="res-item" data-idx="${d.i}"><div class="rt">${esc(d.title)}</div><div class="rs">${hi(snippet(d.text, q), q)}</div></button>`;
    });
    // Alternative results: chapters linked to the top hit via shared record references.
    if (wantRelated) {
      const relIds = (related[scored[0].d.i] || []).filter((j) => !scored.some((r) => r.d.i === j)).slice(0, 4);
      if (relIds.length) {
        html += `<div class="res-sec">Related in this book</div>`;
        relIds.forEach((j) => {
          const d = docs[j];
          html += `<button class="res-item" data-idx="${d.i}"><div class="rt">${esc(d.title)}</div><div class="rs">${esc(d.section)} · shares record references</div></button>`;
        });
      }
    }
    resultsEl.innerHTML = html;
    resultsEl.hidden = false;
    resultsEl.querySelectorAll(".res-item").forEach((b) => {
      b.onclick = () => {
        resultsEl.hidden = true;
        searchEl.value = "";
        loadChapter(+b.dataset.idx);
        document.body.classList.remove("toc-open");
      };
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") resultsEl.hidden = true;
  });

  // Theme + font size (persisted)
  const themeBtn = document.getElementById("theme-btn");
  const applyTheme = () => document.body.classList.toggle("light", localStorage.getItem("mat-theme") === "light");
  applyTheme();
  themeBtn.onclick = () => {
    localStorage.setItem("mat-theme", localStorage.getItem("mat-theme") === "light" ? "dark" : "light");
    applyTheme();
  };
  let fs = +(localStorage.getItem("mat-fs") || 0);
  const applyFs = () => {
    document.body.classList.remove("fs-1", "fs-2", "fs-3");
    if (fs > 0) document.body.classList.add("fs-" + Math.min(fs, 3));
  };
  applyFs();
  document.getElementById("font-inc").onclick = () => { fs = Math.min(fs + 1, 3); localStorage.setItem("mat-fs", fs); applyFs(); };
  document.getElementById("font-dec").onclick = () => { fs = Math.max(fs - 1, -1); localStorage.setItem("mat-fs", fs); applyFs(); };
  const fromHash = parseInt((location.hash.match(/#\/(\d+)/) || [])[1], 10);
  if (!isNaN(fromHash)) loadChapter(fromHash);
  if (window.MAT_PRINT_ALL) {
    // Linear export mode: render every chapter into one printable document.
    (async () => {
      await ready;
      coverEl.hidden = true; contentEl.hidden = false;
      crumbEl.textContent = "Complete edition — all chapters";
      pageEl.innerHTML = "<p>Assembling complete edition…</p>";
      let out = "";
      for (let k = 0; k < flat.length; k++) {
        try {
          const res = await fetch(flat[k].path);
          const md = await res.text();
          const saved = current; current = k;
          out += `<h1>${esc(flat[k].section)} — ${esc(flat[k].title)}</h1>` + renderMarkdown(md) + "<hr>";
          current = saved;
        } catch { out += `<h1>${esc(flat[k].title)}</h1><p><em>Load failed.</em></p>`; }
      }
      pageEl.innerHTML = out;
      document.getElementById("progress").style.width = "100%";
      if (window.MathJax?.typesetPromise) window.MathJax.typesetPromise();
    })();
  }
  window.addEventListener("hashchange", () => {
    const i = parseInt((location.hash.match(/#\/(\d+)/) || [])[1], 10);
    if (!isNaN(i) && i !== current) loadChapter(i);
  });

  /* ---- Audio read-aloud (built-in Web Speech API, works offline where voices exist) ---- */
  const speakBtn = document.getElementById("speak-btn");
  const stopBtn = document.getElementById("stop-btn");
  const voiceSel = document.getElementById("voice");
  const rateSel = document.getElementById("rate");
  function pickVoices() {
    if (!("speechSynthesis" in window)) {
      speakBtn.disabled = true;
      speakBtn.title = "Speech synthesis not supported in this browser";
      return;
    }
    // Voices grouped by language so every installed language model is visible.
    const vs = speechSynthesis.getVoices().sort((a, b) => a.lang.localeCompare(b.lang));
    let lastLang = "";
    voiceSel.innerHTML = vs.map((v, i) => {
      const grp = v.lang !== lastLang ? ` data-lang="${v.lang}"` : "";
      lastLang = v.lang;
      return `<option value="${i}"${grp}>${v.lang} — ${v.name}${v.default ? " ★" : ""}</option>`;
    }).join("") || `<option value="">(no voices installed)</option>`;
    voiceSel.title = `${vs.length} voices across ${new Set(vs.map((v) => v.lang)).size} languages`;
  }
  if ("speechSynthesis" in window) {
    pickVoices();
    speechSynthesis.onvoiceschanged = pickVoices;
  } else pickVoices();
  speakBtn.onclick = () => {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    // If the chapter was machine-translated, prefer a voice in that language.
    const mtLang = (!document.getElementById("mt-note").hidden && langSel.value) || "";
    const vs = speechSynthesis.getVoices();
    let vIdx = +voiceSel.value;
    if (mtLang) {
      const found = vs.findIndex((v) => v.lang.toLowerCase().startsWith(mtLang.toLowerCase().split("-")[0]));
      if (found >= 0) { vIdx = found; voiceSel.value = String(found); }
    }
    const text = document.getElementById("crumb").textContent + ". " +
      document.getElementById("page").innerText.slice(0, 20000);
    // Chunk so long chapters don't get cut off by engine limits.
    const chunks = text.match(/[^.!?]+[.!?]+|\S.{0,200}[.!? ]/g) || [text];
    let queue = chunks.filter((c) => c.trim().length > 1).slice(0, 400);
    const speakNext = () => {
      if (!queue.length) return;
      const u = new SpeechSynthesisUtterance(queue.shift());
      if (vs[vIdx]) { u.voice = vs[vIdx]; u.lang = u.voice.lang; }
      else if (mtLang) u.lang = mtLang;
      u.rate = parseFloat(rateSel.value || "1");
      u.onend = speakNext;
      speechSynthesis.speak(u);
    };
    speakNext();
  };
  stopBtn.onclick = () => { if ("speechSynthesis" in window) speechSynthesis.cancel(); };

  /* ---- Chapter translation (free MyMemory API, labelled machine output) ---- */
  const langSel = document.getElementById("lang");
  const trBtn = document.getElementById("translate-btn");
  const mtNote = document.getElementById("mt-note");
  trBtn.onclick = async () => {
    const lang = langSel.value;
    if (!lang) { langSel.focus(); return; }
    const paras = [...document.querySelectorAll("#page p, #page li, #page h1, #page h2, #page h3")]
      .slice(0, 60);
    trBtn.disabled = true;
    trBtn.textContent = "Translating…";
    try {
      for (const el of paras) {
        const q = el.innerText.trim().slice(0, 450);
        if (q.length < 2) continue;
        const r = await fetch(
          "https://api.mymemory.translated.net/get?q=" +
          encodeURIComponent(q) + "&langpair=en|" + encodeURIComponent(lang));
        if (!r.ok) throw new Error("HTTP " + r.status);
        const j = await r.json();
        const t = j?.responseData?.translatedText;
        if (t && t.toLowerCase() !== q.toLowerCase()) {
          const d = document.createElement("div");
          d.className = "mt-text";
          d.style.cssText = "border-left:3px solid #e0a100;padding-left:10px;margin:6px 0;color:var(--ink)";
          d.innerText = t;
          el.after(d);
        }
        await new Promise((res) => setTimeout(res, 350)); // stay inside free quota
      }
      mtNote.hidden = false;
    } catch {
      mtNote.hidden = false;
      mtNote.innerHTML = "<em>Translation unavailable (network or quota). English source unchanged.</em>";
    }
    trBtn.disabled = false;
    trBtn.textContent = "Translate";
  };
}
