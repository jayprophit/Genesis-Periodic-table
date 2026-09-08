/* Shared rendering, addressing and search for the reader, export and checks. */
import { Marked } from './vendor/marked.mjs';

export const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const HOW_TO_OLD = 'docs/00-front-matter/03-How-to-Use-MAT.md';
export const HOW_TO_NEW = 'docs/00-front-matter/03-How-to-Use-MAT-Codex.md';
export const canonicalId = id => id === HOW_TO_OLD ? HOW_TO_NEW : id;
export const route = (id, anchor = '') => `#read/${encodeURIComponent(canonicalId(id))}${anchor ? '?section=' + encodeURIComponent(anchor) : ''}`;
export function parseRoute(hash, legacy = []) {
  try {
    const old = hash.match(/^#\/(\d+)$/);
    if (old) return {id: canonicalId(legacy[+old[1]] || ''), anchor: ''};
    const m = hash.match(/^#read\/([^?]+)(?:\?section=(.*))?$/);
    return m ? {id: canonicalId(decodeURIComponent(m[1])), anchor: decodeURIComponent(m[2] || '')} : null;
  } catch { return null; }
}
export function safeUrl(url, baseId) {
  try {
    const u = new URL(url, 'https://mat.invalid/' + baseId);
    if (!['https:', 'http:', 'mailto:'].includes(u.protocol)) return '';
    if (u.origin === 'https://mat.invalid') return '../' + u.pathname.slice(1) + u.search + u.hash;
    return u.href;
  } catch { return ''; }
}
export function resolveDocument(fromId, href, docs) {
  try {
    const u = new URL(href, 'https://mat.invalid/' + fromId);
    if (u.origin !== 'https://mat.invalid') return null;
    let id = canonicalId(decodeURIComponent(u.pathname.slice(1)));
    let doc = docs.find(d => d.id === id);
    if (!doc && id.endsWith('/')) doc = docs.find(d => d.id.startsWith(id));
    return doc ? {id: doc.id, anchor: decodeURIComponent(u.hash.slice(1))} : null;
  } catch { return null; }
}
export function recordOf(id) {
  const m = id.match(/^records\/(\d{4})-([^/]+)\//);
  if (!m) return null;
  const parts = m[2].split('-');
  return {number: m[1], name: m[1] === '0000' ? 'Origin State' : parts.slice(0, -1).join(' '), symbol: m[1] === '0000' ? 'OS' : parts.at(-1), dir: id.split('/').slice(0, 2).join('/')};
}
export function evidenceLane(text) {
  if (/causali|historical|alternative|unconventional|unverified|hypothes|claims?(?:\b|[-_])|rife|russell/i.test(text)) return 'claims';
  if (/research|emerging|prediction|computational|proposed|speculative/i.test(text)) return 'research';
  return 'core';
}
export const laneLabels = {core: 'MAT Core Data', research: 'Research / Emerging', claims: 'Historical / Alternative / Claims'};
export function slug(text) {
  return text.toLowerCase().replace(/<[^>]*>/g, '').replace(/&\w+;/g, '').replace(/[^\p{L}\p{N}_\s-]/gu, '').trim().replace(/\s/g, '-');
}
export function renderDocument(source, id, {linkFor = (target, anchor) => route(target, anchor), docs = []} = {}) {
  const outline = [], slugs = new Map();
  const multipleH1 = (source.match(/^# /gm) || []).length > 1;
  let first = true;
  const math = (name, level, re, start) => ({
    name, level, start: src => src.search(start),
    tokenizer(src) { const m = src.match(re); if (m) return {type:name,raw:m[0],text:m[0].trim()}; },
    renderer: token => `<${level === 'block' ? 'div' : 'span'} class="math">${esc(token.text)}</${level === 'block' ? 'div' : 'span'}>`
  });
  const parser = new Marked({gfm:true, breaks:false, renderer: {
    html({text}) { return esc(text); },
    heading({tokens, depth}) {
      const text = this.parser.parseInline(tokens);
      const plain = text.replace(/<[^>]+>/g, '');
      const base = slug(plain), count = slugs.get(base) || 0;
      slugs.set(base, count + 1);
      const anchor = base + (count ? '-' + count : '');
      const level = first ? 1 : Math.min(6, depth + (multipleH1 ? 1 : 0));
      first = false;
      outline.push({id:anchor,text:plain,level});
      const lane = evidenceLane(plain);
      const badge = lane !== 'core' ? `<span class="evidence-label ${lane}">${laneLabels[lane]}</span>` : '';
      return `<h${level} id="${esc(anchor)}" tabindex="-1">${text}</h${level}>${badge}\n`;
    },
    link({href, title, tokens}) {
      const label = this.parser.parseInline(tokens);
      const resolved = resolveDocument(id, href, docs);
      const url = resolved ? linkFor(resolved.id, resolved.anchor) : safeUrl(href, id);
      if (!url) return label;
      return `<a href="${esc(url)}"${title ? ` title="${esc(title)}"` : ''}${/^(https?:)/.test(url) ? ' target="_blank" rel="noopener noreferrer"' : ''}>${label}</a>`;
    },
    image({href, text, title}) {
      const url = safeUrl(href, id);
      if (!url) return esc(text);
      return `<img src="${esc(url)}" alt="${esc(text)}" loading="lazy"${title ? ` title="${esc(title)}"` : ''}>`;
    },
    table(token) {
      const cell = (c, tag) => `<${tag}${tag === 'th' ? ' scope="col"' : ''}${c.align ? ` class="align-${c.align}"` : ''}>${this.parser.parseInline(c.tokens)}</${tag}>`;
      return `<div class="table-scroll" role="region" aria-label="Data table; scroll horizontally if needed" tabindex="0"><table><thead><tr>${token.header.map(c=>cell(c,'th')).join('')}</tr></thead><tbody>${token.rows.map(row=>`<tr>${row.map(c=>cell(c,'td')).join('')}</tr>`).join('')}</tbody></table></div>`;
    }
  }});
  parser.use({extensions:[
    math('displayMath','block', /^(?:\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\])(?:\n|$)/, /\$\$|\\\[/),
    math('inlineMath','inline', /^(?:\\\([\s\S]+?\\\)|\$(?!\$)[^$\n]+?\$)/, /\\\(|\$/)
  ]});
  const html = source.trim() ? parser.parse(source) : '<h1>Content pending</h1><p class="empty-state">This source file is currently empty. Its place in the atlas is reserved; no scientific content has been supplied here yet.</p>';
  return {html, outline};
}
export function searchDocuments(docs, query, {titleOnly=false, section='', lane='', sort='relevance'} = {}) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return docs.flatMap(d => {
    if ((section && d.section !== section) || (lane && d.lane !== lane)) return [];
    const inTitle = d.title.toLowerCase().includes(q);
    const alias = d.aks?.includes(q);
    const occurrences = titleOnly ? 0 : d.text.toLowerCase().split(q).length - 1;
    const score = (inTitle ? 100 : 0) + (!titleOnly && alias ? 80 : 0) + Math.min(occurrences, 20);
    return score ? [{d,score}] : [];
  }).sort((a,b) => sort === 'title' ? a.d.title.localeCompare(b.d.title) : b.score-a.score || a.d.i-b.d.i);
}
export function snippet(text, query) {
  const i = text.toLowerCase().indexOf(query.toLowerCase()), start = Math.max(0, i-55);
  return (start ? '…' : '') + text.slice(start, start+180) + (text.length > start+180 ? '…' : '');
}
