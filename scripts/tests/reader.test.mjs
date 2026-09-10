import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {renderDocument,route,parseRoute,resolveDocument,HOW_TO_OLD,HOW_TO_NEW,searchDocuments} from '../../book/reader-core.mjs';
import {sha256} from '../intake-lib.mjs';
const root=join(import.meta.dirname,'../..'),read=p=>readFileSync(join(root,p),'utf8'),json=p=>JSON.parse(read(p));
test('headings preserve punctuation in outlines and use functional anchors',()=>{
 const r=renderDocument("# Book\n\n## What's **new** & useful\n\n## What's **new** & useful",'book.md');
 assert.deepEqual(r.outline.map(h=>h.id),['book','whats-new--useful','whats-new--useful-1']);
 assert.equal(r.outline[1].text,"What's new & useful");
});
test('reader neutralizes HTML and unsafe URLs while retaining equations',()=>{
 const r=renderDocument('# Example\n\n<script>alert(1)</script>\n\n[bad](javascript:alert(1))\n\n$$E=mc^2$$\n','example.md');
 assert(!r.html.includes('<script>'));assert(!r.html.includes('href="javascript:'));assert(r.html.includes('class="math"'));assert(r.html.includes('E=mc^2'));
});
test('reader presents identity metadata once while keeping ordinary YAML examples',()=>{
 const identity=renderDocument('# Hydrogen\n\n```yaml\nmat_id: MAT:0001\nstatus: RESEARCHED\n```\n\n## Identity\n\nText','record.md');
 assert(!identity.html.includes('mat_id'));assert(identity.html.includes('Text'));
 const example=renderDocument('# Schema\n\n```yaml\nexample: true\n```','schema.md');
 assert(example.html.includes('example'));
});
test('renamed how-to routes and internal links resolve consistently',()=>{
 assert.equal(parseRoute(route(HOW_TO_OLD)).id,HOW_TO_NEW);
 assert.deepEqual(resolveDocument('README.md',HOW_TO_OLD+'#help',[{id:HOW_TO_NEW}]),{id:HOW_TO_NEW,anchor:'help'});
});
test('full-text index includes chapter endings and research intake is separate',()=>{
 const docs=json('book/search-index.json').docs;
 const mg=docs.find(d=>d.id==='records/0012-Magnesium-Mg/0012-Magnesium-Mg.md');
 assert(mg.text.length>4000);assert(searchDocuments(docs,'whole material record complete').some(h=>h.d.id===mg.id));
 assert.equal(docs.find(d=>d.id.endsWith('0012-Magnesium-Mg-Research-Intake.md')).lane,'research');
 assert.equal(searchDocuments(docs,'H')[0].d.id,'records/0001-Hydrogen-H/0001-Hydrogen-H.md');
});
test('offline manifest includes runtime modules, queried shell resources and all nuclear datasets',()=>{
 const idx=json('book/offline-index.json'),all=new Set(idx.all);
 for(const match of read('book/index.html').matchAll(/(?:src|href)="(\.\/[^"#]+)"/g)){
  const path=match[1];assert(all.has(path),'Missing offline shell resource '+path);
 }
 for(const e of json('data/catalog/nuclear-evaluation-index.json').elements)assert(all.has('../'+e.data));
 for(const url of all)assert(existsSync(join(root,'book',decodeURIComponent(url))),'Missing '+url);
 assert(read('book/cache-version.js').includes(idx.cacheName));
});
test('replaying an accession preserves editorial changes and its original ledger',()=>{
 const p='data/intake/mat-42-52.json',before=sha256(read(p)),plan=json(p);
 const hashes=plan.operations.map(o=>sha256(read(o.path)));
 const r=spawnSync(process.execPath,['scripts/import-mat-intake.mjs','--apply'],{cwd:root,encoding:'utf8'});
 assert.equal(r.status,0,r.stderr);assert.match(r.stdout,/already applied/);assert.equal(sha256(read(p)),before);
 assert.deepEqual(plan.operations.map(o=>sha256(read(o.path))),hashes);
});
