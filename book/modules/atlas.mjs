/* MAT Reader: Atlas module — periodic table dialog, element cards, dash view. */
import { esc, route } from "../reader-core.mjs";

export function initAtlas({ $, elements, elements118, periodic, identities, byId }) {
  /* --- periodic table dialog --- */
  const dlg = $("periodic-dialog"), grid = $("periodic-grid");
  let built = false;
  function buildGrid() {
    if (built) return;
    built = true;
    const cells = periodic.cells || [];
    const byZ = new Map(elements118.map((e) => [e.z, e]));
    for (let z = 1; z <= 118; z++) {
      const cell = cells.find((c) => c.z === z) || {};
      const el = byZ.get(z);
      const pub = cell.published || (el && el.publishedRecord);
      const num = el ? el.symbol : cell.symbol || "";
      const a = document.createElement("a");
      a.className = "periodic-cell" + (cell.fBlock ? " f-block" : "");
      if (pub) { a.href = route("MAT:" + z); }
      else { a.setAttribute("aria-disabled", "true"); a.tabIndex = -1; }
      a.style.gridColumn = String(cell.col || ((z - 1) % 18) + 1);
      a.style.gridRow = String(cell.row || Math.ceil(z / 18));
      a.title = el ? `${el.name} (${z})` : `Z=${z}`;
      a.innerHTML = `<small>${z}</small><strong>${esc(num)}</strong>`;
      grid.appendChild(a);
    }
    $("origin-link").href = route("MAT:0000");
    $("close-periodic").onclick = () => dlg.close();
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  }
  $("periodic-btn").onclick = () => { buildGrid(); dlg.showModal(); };
  $("periodic-cover").onclick = () => { buildGrid(); dlg.showModal(); };

  /* --- element cards on cover --- */
  function buildCards() {
    const box = $("element-cards");
    if (!box || !elements.length) return;
    box.innerHTML = "";
    elements.forEach((el) => {
      const num = el.mat_number || el.number || el.z;
      const a = document.createElement("a");
      a.className = "element-card";
      a.href = route("MAT:" + num);
      const ident = identities[num] || {};
      a.innerHTML = `<span class="card-symbol">${esc(ident.symbol || el.symbol || "")}</span><span class="card-name">${esc(el.name || ident.name || "")}</span><span class="card-num">${num}</span>`;
      box.appendChild(a);
    });
  }
  buildCards();

  /* --- dash (grid) view for single elements --- */
  function dashView(rec) {
    const box = $("identity");
    if (!rec) return;
    const ident = identities[rec.number] || {};
    const sym = document.createElement("div");
    sym.className = "identity-symbol";
    sym.innerHTML = `<small>MAT · ${esc(rec.number)}</small>${esc(ident.symbol || rec.symbol || "")}`;
    const name = document.createElement("div");
    const rows = [
      ident.record_class ? esc(ident.record_class.replace(/_/g, " ")) : "",
      ident.status ? `Status: ${esc(ident.status.replace(/-/g, " "))}` : "",
      ident.migration ? `Migration: ${esc(ident.migration.replace(/-/g, " "))}` : "",
    ].filter(Boolean).join(" · ");
    name.innerHTML = `<div class="identity-name">${esc(rec.title || rec.name || "")}</div>${rows ? `<div class="identity-desc">${rows}</div>` : ""}`;
    box.replaceChildren(sym, name);
  }
  return { buildGrid, buildCards, dashView };
}
