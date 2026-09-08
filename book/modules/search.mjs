/* MAT Reader: Search module — full-text search with filters. */
import { esc, searchDocuments, snippet } from "../reader-core.mjs";
import { addSearchHistory } from "./reading-memory.mjs";

export function initSearch({ $, searchDocs, related, flat, route }) {
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
    if (q.length >= 2) addSearchHistory(q).catch(() => {});
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
