// Structural coverage of actual files. Counts do not certify scientific completeness.
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {join} from 'node:path';
import YAML from 'yaml';
import {recordDirs,walkFiles,frontMatter} from './lib.mjs';
import {sourceReferences} from './source-references.mjs';
const root=join(import.meta.dirname,'..'),read=p=>readFileSync(join(root,p),'utf8').replace(/\r\n/g,'\n');
const registry=YAML.parse(read('data/registries/sources.yaml')).sources,known=new Set(registry.flatMap(s=>[s.source_id,...(s.source_aliases||[])]));
const nuclear=JSON.parse(read('data/catalog/nuclear-evaluation-index.json'));
const families=['data','calculations','experiments','relationships','tables','graphs','images','diagrams','models','sources'];
const records=[];
for(const folder of recordDirs()){
 const dir='records/'+folder,files=walkFiles(dir),main=dir+'/'+folder+'.md',text=read(main),header=frontMatter(text);
 const sourceIds=new Set(),fieldCounts={value_objects:0,unit_fields:0,condition_fields:0,numeric_uncertainty_fields:0,null_values:0},parseErrors=[];
 for(const file of files.filter(f=>/\.ya?ml$/.test(f))){
  try{
   const documents=YAML.parseAllDocuments(read(file));
   for(const doc of documents)if(doc.errors.length)throw doc.errors[0];
   const data=documents.map(doc=>doc.toJS());for(const ref of sourceReferences(data))sourceIds.add(ref.value);
   const visit=x=>{if(!x||typeof x!=='object')return;if(!Array.isArray(x)){
    if(Object.hasOwn(x,'value')){fieldCounts.value_objects++;if(x.value===null)fieldCounts.null_values++;}
    if(x.unit!=null)fieldCounts.unit_fields++;
    if(x.conditions!=null||x.temperature!=null||x.pressure!=null)fieldCounts.condition_fields++;
    if(typeof x.uncertainty==='number')fieldCounts.numeric_uncertainty_fields++;
   }Object.values(x).forEach(visit);};visit(data);
  }catch(e){parseErrors.push({file,error:e.message.split('\n')[0]});}
 }
 for(const file of files.filter(f=>f.endsWith('.md')))for(const id of read(file).match(/SRC-(?:\d{6}|[A-Z0-9]+-\d+)\b/g)||[])sourceIds.add(id);
 const counts=Object.fromEntries(families.map(f=>[f,files.filter(p=>p.startsWith(dir+'/'+f+'/')).length]));
 const n=nuclear.elements.find(e=>e.z===Number(folder.slice(0,4)));
 records.push({mat_id:'MAT:'+folder.slice(0,4),name:header.record_name||folder.split('-').slice(1,-1).join(' '),chapter:main,record_class:header.record_class,manuscript_status:header.status||'UNKNOWN',headings:(text.match(/^#{1,6} /gm)||[]).length,files:files.length,families:counts,structured_field_occurrences:fieldCounts,source_ids:[...sourceIds].sort(),unresolved_source_ids:[...sourceIds].filter(id=>!known.has(id)).sort(),nuclear_states:n?.states??'NOT_APPLICABLE',parse_errors:parseErrors,scientific_review:'REQUIRES_REVIEW',interpretation:'Presence and syntactic field counts only. No field-level support, uncertainty completeness, domain expertise or independent validation is implied.'});
}
mkdirSync(join(root,'data/quality'),{recursive:true});
writeFileSync(join(root,'data/quality/record-coverage.json'),JSON.stringify({schema_version:'1.0.0',generated_by:'scripts/build-record-coverage.mjs',scope:'119 record packages, including non-element Origin State. Data presence is not scientific completeness.',records},null,2)+'\n');
const metadata=registry.map(s=>({source_id:s.source_id,title:s.title||s.topic||null,url:s.url||null,doi:s.doi||null,verification_status:s.verification_status||'NOT-RECORDED',same_work_as:s.same_work_as||null,link_health:'NOT-CHECKED-BY-THIS-AUDIT',claim_support:'REQUIRES-CLAIM-LEVEL-REVIEW'}));
writeFileSync(join(root,'data/quality/source-review.json'),JSON.stringify({scope:'Bibliographic metadata inventory; network reachability and claim support are separate checks.',sources:metadata},null,2)+'\n');
const body='# MAT Codex — Record Coverage Matrix\n\nGenerated from actual record files. File and field counts show where material exists; they do not measure correctness or completeness. Every record retains scoped scientific review requirements. A missing engineering field is not filled by adding nuclear data.\n\n- [Detailed machine-readable matrix](../../data/quality/record-coverage.json)\n- [Bibliography review inventory](../../data/quality/source-review.json)\n- [Review brief reconciliation](../09-production/04-Review-Brief-Reconciliation.md)\n\n| Record | Manuscript status | Sections | Data files | Calculations | Experiments | Tables | Graphs | Visual files | Models | Source IDs | Nuclear states |\n|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|\n'+records.map(r=>`| [${r.mat_id} ${r.name}](../../${r.chapter}) | ${r.manuscript_status} | ${r.headings} | ${r.families.data} | ${r.families.calculations} | ${r.families.experiments} | ${r.families.tables} | ${r.families.graphs} | ${r.families.images+r.families.diagrams} | ${r.families.models} | ${r.source_ids.length} | ${r.nuclear_states} |`).join('\n')+'\n\n## Interpreting the gaps\n\nThe detailed matrix reports numeric-uncertainty, condition and unit field occurrences, explicit nulls, source references and YAML parsing issues. These counts include heterogeneous legacy and nuclear schemas; they are not percentages of verified properties. Domain coverage, narrative quality, figure rights and expert review cannot be inferred from filenames and remain unscored.\n';
writeFileSync(join(root,'docs/05-index/Record-Coverage.md'),body);
console.log('Coverage: '+records.length+' records, '+metadata.length+' source accessions; '+records.reduce((n,r)=>n+r.parse_errors.length,0)+' YAML parse errors.');
