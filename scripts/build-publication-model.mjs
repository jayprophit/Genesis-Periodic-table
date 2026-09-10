// Canonical publication projection; Studio never reparses YAML.
import {readFileSync,writeFileSync,renameSync,mkdirSync,existsSync,cpSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {createHash} from 'node:crypto';
import YAML from 'yaml';
import {walkFiles,frontMatter} from './lib.mjs';
const root=join(import.meta.dirname,'..'), out=join(root,'data/publication/generated');
mkdirSync(out,{recursive:true});
const read=p=>readFileSync(join(root,p),'utf8').replace(/\r\n/g,'\n');
const json=p=>JSON.parse(read(p));
const write=(p,v)=>{
 const text=JSON.stringify(v,null,2)+'\n';
 // Avoid needless rewrites of unchanged chapters, including files open in a reader.
 if(existsSync(p)&&readFileSync(p,'utf8').replace(/\r\n/g,'\n')===text)return;
 mkdirSync(dirname(p),{recursive:true});
 const temporary=p+'.'+process.pid+'.tmp';
 writeFileSync(temporary,text);renameSync(temporary,p);
};
const registry=YAML.parse(read('data/registries/sources.yaml')).sources;
const sourceMap=new Map(registry.map(s=>[s.source_id,s]));
const catalog=json('data/catalog/elements-baseline.json');
const elements=json('book/data/elements-118.json').elements;
const records=[],details={};
for(const sec of json('book/manifest.json').chapters||[])for(const item of sec.items||[]){
 if(!existsSync(join(root,item.id)))throw new Error('Missing chapter '+item.id);
 const body=read(item.id),mat=item.id.match(/^records\/(\d{4})-/);
 const id=mat?'MAT:'+mat[1]:null, key=createHash('sha256').update(item.id).digest('hex').slice(0,20);
 const record={id:item.id,key,mat:id,title:item.title,section:sec.section,lane:id==='MAT:0000'?'foundation':id?'science':'reference'};
 records.push(record);
 const folder=mat?item.id.split('/').slice(0,2).join('/'):null;
 const isMain=folder&&item.id===folder+'/'+folder.split('/')[1]+'.md';
 const files=isMain?walkFiles(folder,f=>f.endsWith('.yaml')):[];
 const structured=files.map(path=>{const docs=YAML.parseAllDocuments(read(path));const errors=docs.flatMap(d=>d.errors);if(errors.length)throw new Error(path+': '+errors.map(e=>e.message).join('; '));return {path,data:docs.length===1?docs[0].toJSON():docs.map(d=>d.toJSON())}});
 const sourceIds=[...new Set((id?body+'\n'+files.map(read).join('\n'):'').match(/SRC-\d{6}\b/g)||[])].sort();
 const missingSources=sourceIds.filter(s=>!sourceMap.has(s));
 const assets=isMain?walkFiles(folder,f=>/\.(svg|png|jpg|webp|glb)$/i.test(f)):[];
 details[key]={...record,body,bodyHash:createHash('sha256').update(body).digest('hex'),header:frontMatter(body),
 structured,assets,sources:sourceIds.map(s=>sourceMap.get(s)||{source_id:s,status:'UNRESOLVED'}),
 missingSources,counts:{figures:assets.filter(p=>/\/(images|diagrams)\//.test(p)).length,
 graphs:assets.filter(p=>p.includes('/graphs/')).length,tables:isMain?walkFiles(folder,f=>f.endsWith('.md')).filter(p=>p.includes('/tables/')).length:0,sources:sourceIds.length},
 reviewStatus:missingSources.length?'BLOCKED':'NEEDS_REVIEW'};
 write(join(out,'chapters',key+'.json'),details[key]);
}
const missingSources=[...new Set(Object.values(details).flatMap(d=>d.missingSources))].sort();
// Only a resolvable, explicitly cited curated measurement can override baseline science.
for(const e of elements){
 e.baselineProvenance=structuredClone(e.provenance);e.curatedProvenance={};
 if(e.recordStatus!=='CURATED')continue;
 const d=Object.values(details).find(d=>d.id===e.chapterPath);
 const master=d?.structured.find(s=>s.path.endsWith('/'+e.chapterPath.split('/')[1]+'.yaml'))?.data;
 if(!master||Array.isArray(master))continue;
 const candidates={atomicWeight:master.atomic_weight,firstIonizationEnergy:master.ionization?.first,electronegativity:master.electronegativity};
 for(const [key,m]of Object.entries(candidates)){
  if(!m||!sourceMap.has(m.source_id))continue;
  let value=m.value;
  if(key==='atomicWeight'&&typeof m.minimum==='number'&&typeof m.maximum==='number')value='['+m.minimum+', '+m.maximum+']';
  if(typeof value!=='number'&&typeof value!=='string')continue;
  const measure={...m,value,source:m.source_id,sourceUrl:sourceMap.get(m.source_id).url||null,evidence:m.evidence_type||'CURATED_SOURCE',recordPath:e.chapterPath};
  e.curatedProvenance[key]=measure;e.provenance[key]=measure;e[key]=value;
  if(key==='firstIonizationEnergy')e.ionizationEnergy=value;
 }
}
write(join(out,'publication-records.json'),records);
write(join(out,'publication-elements.json'),{elements,catalog:catalog.catalog});
write(join(out,'publication-metadata.json'),{title:'Materials Atlas Table Codex',schemaVersion:'2.0.0',language:'en',edition:'Working draft',missingSources,releaseReady:false,notice:'Curated denotes chapter coverage, not scientific validation or peer review.'});
write(join(out,'publication-index.json'),{elements:elements.map(e=>({z:e.z,matId:e.matId,name:e.name})),records,sections:[...new Set(records.map(r=>r.section))]});
write(join(out,'publication-periodic.json'),{standard:{elements},historical:{notice:'Russell and alternative models are research references, not established physical laws.',russell:json('book/data/russell-periodic.json')}});
write(join(out,'publication-charts.json'),{charts:[],notice:'Legacy unsourced chart datasets excluded from publication projection.'});
write(join(out,'publication-glossary.json'),{glossary:[],chapter:records.find(r=>/Glossary/.test(r.title))?.id||null});
const pub=join(root,'studio/public');
mkdirSync(pub,{recursive:true});
cpSync(out,join(pub,'data/publication/generated'),{recursive:true});
for(const name of ['records','docs','assets','book'])cpSync(join(root,name),join(pub,name),{recursive:true});
console.log('Publication: '+records.length+' chapters, '+elements.length+' selectable elements; unresolved sources: '+missingSources.join(', '));
