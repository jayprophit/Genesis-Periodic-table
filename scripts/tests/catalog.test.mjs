import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateCatalog} from '../validate-elements.mjs';
import {validateSchema,frontMatter} from '../lib.mjs';
const root=new URL('../../',import.meta.url);
const catalog=JSON.parse(readFileSync(new URL('data/catalog/elements-baseline.json',root),'utf8'));
test('catalogue rejects fabricated abundance and source-free values',()=>{assert(validateCatalog(catalog));const c=structuredClone(catalog);c.elements[117].abundance.crust.value=0.000001;assert.throws(()=>validateCatalog(c));const d=structuredClone(catalog);d.elements[0].atomicWeight.source='invented';assert.throws(()=>validateCatalog(d));});
test('schema accepts 0118 and rejects 0119',()=>{const h={mat_id:'MAT:0118',record_name:'Oganesson',record_class:'CHEMICAL_ELEMENT',status:'BASELINE'};assert.deepEqual(validateSchema('data/schema/1.0.0/mat-record.schema.json',h),[]);assert(validateSchema('data/schema/1.0.0/mat-record.schema.json',{...h,mat_id:'MAT:0119'}).length)});
test('front matter reads identity rather than later sample blocks',()=>{const text=readFileSync(new URL('records/0030-Zinc-Zn/0030-Zinc-Zn.md',root),'utf8').replace(/\r\n/g,'\n');assert.equal(frontMatter(text).record_name,'Zinc');assert.equal(frontMatter(text).status,'BASELINE')});
test('publication retains Carbon blockers and all chapter paths',()=>{const e=JSON.parse(readFileSync(new URL('data/publication/generated/publication-elements.json',root)));assert.equal(e.elements.length,118);assert(e.elements.every(e=>e.chapterPath));const m=JSON.parse(readFileSync(new URL('data/publication/generated/publication-metadata.json',root)));assert(m.missingSources.includes('SRC-000084'));assert.equal(m.releaseReady,false)});

