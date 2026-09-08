import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
export function validateCatalog(c){
 assert.equal(c.elements.length,118,'Exactly 118 identities required');
 const sources=new Set(c.catalog.sources.map(s=>s.id));
 const symbols=new Set();
 for(let z=1;z<=118;z++){const e=c.elements[z-1];assert.equal(e.z,z);assert.equal(e.matId,'MAT:'+String(z).padStart(4,'0'));assert(!symbols.has(e.symbol));symbols.add(e.symbol);
 assert(['BASELINE','CURATED'].includes(e.recordStatus));
 for(const [k,v]of Object.entries(e)){if(v&&typeof v==='object'&&'value'in v){if(v.value===null)assert(['UNKNOWN','UNAVAILABLE','NOT_APPLICABLE'].includes(v.nullReason),e.matId+' '+k+' missing null reason');else assert(sources.has(v.source),e.matId+' '+k+' source must resolve');
 assert.notEqual(v.evidence,'MEASURED','A compiled reference cannot indiscriminately claim measurement');}}
 for(const v of Object.values(e.abundance))assert(v.value===null&&v.nullReason==='UNAVAILABLE','Unsourced abundances must remain unavailable');
 if(z>=104){assert.equal(e.phase.value,null);assert.equal(e.density.value,null);assert.equal(e.electronConfiguration.evidence,'PREDICTED');}
 if(z===43||z===61||z>=84&&![90,91,92].includes(z)){assert.equal(e.atomicWeight.value,null);assert.equal(e.atomicWeight.nullReason,'NOT_APPLICABLE');}
 }
 return true;
}
if(process.argv[1]&&import.meta.url.endsWith(process.argv[1].replace(/\\/g,'/').split('/').pop())){
 const c=JSON.parse(readFileSync(join(import.meta.dirname,'../data/catalog/elements-baseline.json'),'utf8'));validateCatalog(c);console.log('118-element identity, source, uncertainty, prediction and null-state checks passed.');
}

