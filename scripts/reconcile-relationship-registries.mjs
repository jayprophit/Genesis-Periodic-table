// Preserve legacy labels while assigning canonical edge identities and explicit endpoint vocabulary.
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import YAML from 'yaml';
import {walkFiles} from './lib.mjs';
import {sha256} from './intake-lib.mjs';
const files=walkFiles('records',f=>/relationship/i.test(f)&&f.endsWith('.yaml'));
const docs=files.map(file=>({file,doc:YAML.parseDocument(readFileSync(file,'utf8'))}));
const maxima=new Map(),changes=[],concepts=new Map();
for(const {doc}of docs)for(const m of doc.toString().matchAll(/MAT:(\d{4}):REL:(\d+)/g))maxima.set(m[1],Math.max(maxima.get(m[1])||0,Number(m[2])));
for(const {file,doc}of docs){
 const owner=file.match(/^records\/(\d{4})-/)[1],parent='MAT:'+owner;const original=readFileSync(file,'utf8');let dirty=false;
 const coverage=doc.get('coverage');if(coverage?.get('source_file')){const source=coverage.get('source_file');const hash=sha256(readFileSync(source));if(coverage.get('source_sha256')!==hash){coverage.set('source_sha256',hash);dirty=true;}}
 const nodes=[];
 for(const key of ['relationships','materials','compounds','processes','entries','items']){
  const c=doc.get(key);if(YAML.isSeq(c))c.items.forEach((obj,i)=>nodes.push({obj,label:`${key}[${i}]`}));
  else if(YAML.isMap(c))c.items.forEach(pair=>nodes.push({obj:pair.value,label:`MAP:${pair.key}`}));
 }
 if(!nodes.length&&doc.get('relationship_id'))nodes.push({obj:doc.contents,label:doc.get('relationship_id')});
 if(!nodes.length&&YAML.isSeq(doc.get('relationships'))){
  const folder=file.split('/').slice(0,2).join('/'),stem=folder.split('/')[1],source=`${folder}/data/isotopes/${stem}-NUBASE2020-Evaluation.yaml`;
  if(existsSync(source)){
   const data=YAML.parse(readFileSync(source,'utf8'));
   for(const state of data.entries){const id=`${parent}:REL:${String((maxima.get(owner)||0)+1).padStart(4,'0')}`;maxima.set(owner,(maxima.get(owner)||0)+1);
    doc.get('relationships').add({relationship_id:id,source:state.evaluation_entry_id,type:'EVALUATED-NUCLEAR-STATE-OF',target:parent,evidence:'EVALUATED',status:'DATED-CATALOGUE-MEMBERSHIP',source_id:data.evaluation.source_id,source_line:state.source_line});}
   doc.set('coverage',{scope:'NUBASE2020 catalogue membership only; chemistry and process relationships remain uncurated',source_file:source,source_sha256:sha256(readFileSync(source)),nuclear_states:data.entries.length});
   changes.push({file,action:'ADD-EVALUATED-STATE-MEMBERSHIP',edges:data.entries.length});dirty=true;
  }
 }
 for(const {obj,label}of nodes){if(!YAML.isMap(obj))continue;const value=obj.toJSON();const old=value.relationship_id;
  if(!/^MAT:\d{4}:REL:\d+$/.test(old||'')){
   const id=`${parent}:REL:${String((maxima.get(owner)||0)+1).padStart(4,'0')}`;maxima.set(owner,(maxima.get(owner)||0)+1);
   if(old)obj.set('legacy_relationship_ids',[...new Set([...(value.legacy_relationship_ids||[]),old])]);
   obj.set('relationship_id',id);changes.push({file,action:'CANONICAL-IDENTITY',locator:label,previous:old||null,id});dirty=true;
  }
  const vals=[].concat(value.source||value.from||value.element_relationships||value.elements||[],value.target||value.to||value.future_id||value.compound?.id||[]).flat();
  for(const raw of vals){const label=String(raw);if(!label||/^MAT:\d{4}/.test(label)||label.includes('RESERVED-PENDING-RECORD'))continue;
   const c=concepts.get(label)||{label,kind:/^G\d{4}$/.test(label)?'LEGACY-RECORD-LOCATOR':label==='CAUSALI-E'?'AUTHOR-FRAMEWORK':/^(alpha|NEUTRON)$/.test(label)?'PARTICLE-LABEL':'DOMAIN-CONCEPT-LABEL',status:'LABEL-REGISTERED-CONTENT-REVIEW-PENDING',scope:'Explicit graph endpoint label; registration does not create a curated material or verify a scientific claim',used_in:[]};
   if(!c.used_in.includes(file))c.used_in.push(file);concepts.set(label,c);
  }
 }
 if(dirty){const out=doc.toString({lineWidth:120});writeFileSync(file,out);changes.push({file,action:'PROVENANCE',before_sha256:sha256(original),after_sha256:sha256(out)});}
}
writeFileSync('data/registries/relationship-concepts.yaml',YAML.stringify({registry_id:'MAT:REG:RELATIONSHIP-CONCEPTS',version:'1.0.0',concepts:[...concepts.values()].sort((a,b)=>a.label.localeCompare(b.label))},{lineWidth:120}));
if(changes.length){const file='data/quality/relationship-reconciliation.json',prior=existsSync(file)?JSON.parse(readFileSync(file,'utf8')).changes:[];writeFileSync(file,JSON.stringify({date:'2026-09-09',changes:[...prior,...changes]},null,2)+'\n');}
console.log(JSON.stringify({canonical_ids:changes.filter(c=>c.action==='CANONICAL-IDENTITY').length,extended_registries:changes.filter(c=>c.action==='ADD-EVALUATED-STATE-MEMBERSHIP').length,added_memberships:changes.reduce((n,c)=>n+(c.edges||0),0),concept_labels:concepts.size}));
