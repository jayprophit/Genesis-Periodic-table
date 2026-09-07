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
}

function buildTOC(manifest) {
  tocEl.innerHTML = "";
  flat = [];
  manifest.chapters.forEach((sec) => {
    const h = document.createElement("div");
    h.className = "toc-sec"; h.textContent = sec.section;
    tocEl.appendChild(h);
    sec.items.forEach((it) => {
      const idx = flat.length;
      flat.push({ ...it, section: sec.section });
      const b = document.createElement("button");
      b.className = "toc-item"; b.dataset.idx = idx; b.textContent = it.title;
      b.onclick = () => loadChapter(idx);
      tocEl.appendChild(b);
    });
  });
  countEl.textContent = `${flat.length} chapters`;
}

fetch("./manifest.json").then((r) => r.json()).then((m) => {
  buildTOC(m);
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
  searchEl.oninput = () => {
    const q = searchEl.value.toLowerCase();
    document.querySelectorAll(".toc-item").forEach((b) => {
      b.style.display = b.textContent.toLowerCase().includes(q) ? "" : "none";
    });
    document.querySelectorAll(".toc-sec").forEach((s) => {
      let n = s.nextElementSibling, any = false;
      while (n && !n.classList.contains("toc-sec")) {
        if (n.style.display !== "none") { any = true; break; }
        n = n.nextElementSibling;
      }
      s.style.display = any ? "" : "none";
    });
  };
  const fromHash = parseInt((location.hash.match(/#\/(\d+)/) || [])[1], 10);
  if (!isNaN(fromHash)) loadChapter(fromHash);
  if (window.MAT_PRINT_ALL) {
    // Linear export mode: render every chapter into one printable document.
    (async () => {
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
    const vs = speechSynthesis.getVoices();
    voiceSel.innerHTML = vs.map((v, i) =>
      `<option value="${i}">${v.name} (${v.lang})</option>`).join("");
  }
  if ("speechSynthesis" in window) {
    pickVoices();
    speechSynthesis.onvoiceschanged = pickVoices;
  } else pickVoices();
  speakBtn.onclick = () => {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const text = document.getElementById("crumb").textContent + ". " +
      document.getElementById("page").innerText.slice(0, 20000);
    // Chunk so long chapters don't get cut off by engine limits.
    const chunks = text.match(/[^.!?]+[.!?]+|\S.{0,200}[.!? ]/g) || [text];
    let queue = chunks.filter((c) => c.trim().length > 1).slice(0, 400);
    const speakNext = () => {
      if (!queue.length) return;
      const u = new SpeechSynthesisUtterance(queue.shift());
      const vs = speechSynthesis.getVoices();
      if (vs[+voiceSel.value]) { u.voice = vs[+voiceSel.value]; u.lang = u.voice.lang; }
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
});
