// Reproducible, non-executing import of the user-supplied MAT batches 42–52.
// Run with --apply only after reviewing the generated plan. No source files are changed.
import {readFileSync,writeFileSync,mkdirSync,existsSync,copyFileSync} from 'node:fs';
import {join,dirname,relative} from 'node:path';
import YAML from 'yaml';
import {extractIntake,validIntakePath,sha256,normalizeText} from './intake-lib.mjs';
const root=join(import.meta.dirname,'..');
const arg=process.argv.find(a=>a.startsWith('--input='));
const input=arg?arg.slice(8):join(root,'archive/source-intake/mat-42-52');
const dependency=process.argv.find(a=>a.startsWith('--sodium-predecessor='))?.slice(21);
const inputFile=n=>n===41&&dependency?dependency:join(input,n+'.txt');
const apply=process.argv.includes('--apply');
const archive='archive/source-intake/mat-42-52';
const planPath='data/intake/mat-42-52.json';
// This is a one-time accession. Later editorial changes belong to the review
// ledger; replay must never overwrite them or replace the original intake plan.
if(apply&&existsSync(join(root,planPath))) {
 const previous=JSON.parse(readFileSync(join(root,planPath),'utf8'));
 for(const s of previous.sources)if(sha256(readFileSync(inputFile(parseInt(s.file))))!==s.sha256)
  throw new Error('Previously accessioned input changed: '+s.file+'. Create a new intake instead.');
 console.log('Intake MAT:INTAKE:42-52 is already applied. Preserving all subsequent edits.');
 process.exit(0);
}
const write=(path,text)=>{mkdirSync(dirname(join(root,path)),{recursive:true});writeFileSync(join(root,path),text);};
const sources=[],blocks=[];
for(let n=41;n<=52;n++){
 const bytes=readFileSync(inputFile(n)),text=bytes.toString('utf8');
 sources.push({file:n+'.txt',sha256:sha256(bytes),bytes:bytes.length,archive:archive+'/'+n+'.txt',role:n===41?'Cited Sodium predecessor; resolves missing bibliography':'User-supplied batch'});
 blocks.push(...extractIntake(text,n+'.txt'));
 if(apply&&!existsSync(join(root,archive,n+'.txt'))){mkdirSync(join(root,archive),{recursive:true});copyFileSync(inputFile(n),join(root,archive,n+'.txt'));}
}
// The recovered complete batches explicitly supersede their shorter copies.
const priority=['47.txt','44.txt','45.txt','46.txt','41.txt','42.txt','43.txt','50.txt','51.txt','52.txt','48.txt','49.txt'];
blocks.sort((a,b)=>priority.indexOf(a.input)-priority.indexOf(b.input));
const selected=new Map(),sourceEntries=new Map(),operations=[],review=[];
for(const b of blocks){
 if(b.path==='data/registries/sources.yaml'&&b.operation==='APPEND TO'){
  const data=YAML.parse(b.content);for(const s of Array.isArray(data)?data:data.sources||[]) sourceEntries.set(s.source_id,{...s,intake_origin:b.input,verification_status:'CITATION-RECOVERED-NEEDS-REVIEW'});
  continue;
 }
 if(!validIntakePath(b.path)||b.operation==='PATCH'){review.push({...b,content:undefined,reason:'Editorial patch or non-record instruction retained in archive; not executed'});continue;}
 selected.set(b.path,b);
}
// Recover the complete unlabelled Magnesium parent chapter, stopping before its first FILE.
const mgRaw=normalizeText(readFileSync(join(input,'50.txt'),'utf8'));
const mgStart=mgRaw.indexOf('# 0012 — Magnesium — Mg');
const mgEnd=mgRaw.indexOf('# FILE:',mgStart);
if(mgStart<0||mgEnd<mgStart)throw new Error('Magnesium parent chapter boundaries not found');
selected.set('records/0012-Magnesium-Mg/0012-Magnesium-Mg.md',{input:'50.txt',operation:'PARENT-CHAPTER',line:mgRaw.slice(0,mgStart).split('\n').length,path:'records/0012-Magnesium-Mg/0012-Magnesium-Mg.md',content:mgRaw.slice(mgStart,mgEnd).trim()+'\n'});
const naRaw=normalizeText(readFileSync(inputFile(41),'utf8'));
const naStart=naRaw.indexOf('# 0011 — Sodium — Na'),naEnd=naRaw.indexOf('# FILE:',naStart);
if(naStart<0||naEnd<naStart)throw new Error('Sodium parent chapter boundaries not found');
selected.set('records/0011-Sodium-Na/0011-Sodium-Na.md',{input:'41.txt',operation:'PARENT-CHAPTER',line:naRaw.slice(0,naStart).split('\n').length,path:'records/0011-Sodium-Na/0011-Sodium-Na.md',content:naRaw.slice(naStart,naEnd).trim()+'\n'});
const provenance = b => ({intake_id:'MAT:INTAKE:42-52',source_file:archive+'/'+b.input,source_sha256:sources.find(s=>s.file===b.input).sha256,source_line:b.line,review_status:'NEEDS-SCIENTIFIC-REVIEW',import_date:'2026-09-08',note:'Recovered conversation content; imported validation assertions are not independent verification.'});
const regPath='data/registries/sources.yaml',regText=readFileSync(join(root,regPath),'utf8');
const registry=YAML.parse(regText),known=new Map(registry.sources.map(s=>[s.source_id,s]));
for(const b of selected.values())if(/Sources-Part/.test(b.path)){
 const d=YAML.parse(b.content);for(const s of d.sources||[])sourceEntries.set(s.source_id,{...s,intake_origin:b.input,verification_status:'CITATION-RECOVERED-NEEDS-REVIEW'});
}
const sourceConflicts=[];
for(const [id,s]of sourceEntries){if(known.has(id)){if(known.get(id).title!==s.title)sourceConflicts.push({id,existing:known.get(id).title,incoming:s.title});}else known.set(id,s);}
for(const [path,b]of selected){
 let content=b.content;
 // Keep calculator pages focused: later conversational transitions stay in the raw input.
 if(path.includes('CALC-003-Al28-to-Si28'))content=content.split('\nThe mechanical layer')[0].trim()+'\n';
 if(path.endsWith('.yaml')){
  const doc=YAML.parseDocument(content);if(doc.errors.length)throw new Error(path+': '+doc.errors.map(e=>e.message).join('; '));
  const data=doc.toJS();if(!data||typeof data!=='object'||Array.isArray(data))throw new Error('Expected YAML mapping: '+path);
  if(existsSync(join(root,path))&&!/Production-Status/.test(path)){
   const existing=YAML.parse(readFileSync(join(root,path),'utf8'));
   // Retain existing baseline fields and visual slots. Incoming fields are explicit extensions.
   for(const [key,value]of Object.entries(existing||{}))if(!(key in data))data[key]=value;
  }
  data.intake_provenance=provenance(b);
  if(/\/(0011-Sodium-Na|0012-Magnesium-Mg|0013-Aluminium-Al)\.yaml$/.test(path)){
   data.status='RESEARCHED-IN-PROGRESS';data.scientific_validation_status='NEEDS-REVIEW';
  }
  if(/Production-Status/.test(path)){data.imported_status=data.status;data.status='RESEARCHED-IN-PROGRESS';data.scientific_core='NEEDS-REVIEW';data.schema_validation_status='NOT-RUN-BY-SOURCE';}
  content=YAML.stringify(data,{lineWidth:120});
 } else if(path.endsWith('.md')){
  if(/Schema-Validation|Migration-Audit/.test(path)){
   content=content.replace(/"PASS"/g,'"SOURCE-ASSERTION-UNVERIFIED"').replace(/"CORE-VALIDATED"/g,'"NEEDS-SCIENTIFIC-REVIEW"');
  }
  const archiveRel=relative(dirname(join(root,path)),join(root,archive,b.input)).replaceAll('\\','/');
  const notice=`> **Imported research — review pending.** Recovered from [${b.input}, line ${b.line}](${archiveRel}). Source assertions of validation are historical statements, not independent test results. See the intake ledger for duplicates and unresolved references.\n\n`;
  // Keep the parent identity header immediately after its title for existing validators.
  if(b.operation==='PARENT-CHAPTER'){
   const end=content.indexOf('\n```',content.indexOf('```yaml')+7)+4;
   content=content.slice(0,end)+'\n\n'+notice+content.slice(end).trimStart();
   content=content.replace(/^status: RESEARCHED$/m,'status: RESEARCHED-IN-PROGRESS');
  }else content=notice+content;
  // Numeric citation definitions belong to the containing source message.
  const raw=normalizeText(readFileSync(inputFile(parseInt(b.input)),'utf8'));
  const refs=[...raw.matchAll(/^\[\d+\]:[^\n]+$/gm)].map(m=>m[0]);
  if(refs.length)content+='\n'+refs.join('\n')+'\n';
 }
 const prior=existsSync(join(root,path))?readFileSync(join(root,path)):null;
 const priorHash=prior?sha256(prior):null;
 const previous=blocks.filter(v=>v.path===path).map(v=>({input:v.input,line:v.line,sha256:sha256(v.content)}));
 operations.push({path,input:b.input,line:b.line,action:prior?'merge-or-replace-baseline':'add',prior_sha256:priorHash,output_sha256:sha256(content),versions:previous,review_status:'NEEDS-SCIENTIFIC-REVIEW'});
 if(apply){
  if(prior){const backup=archive+'/prior/'+path;if(!existsSync(join(root,backup)))write(backup,prior);}
  write(path,content);
 }
}
const referenced=new Set([...selected.values()].flatMap(b=>b.content.match(/SRC-\d{6}\b/g)||[]));
const missing=[...referenced].filter(id=>!known.has(id)).sort();
const plan={intake_id:'MAT:INTAKE:42-52',date:'2026-09-08',sources,operations,review,sourceConflicts,missingSources:missing,sourceEntries:[...sourceEntries.values()],policy:'No embedded commands executed. Duplicates retained in source archive; selected versions traceable. Scientific review remains open.'};
if(sourceConflicts.length)throw new Error('Conflicting source identities: '+JSON.stringify(sourceConflicts));
if(apply){
 const additions=[...sourceEntries.values()].filter(s=>!registry.sources.some(v=>v.source_id===s.source_id));
 if(additions.length){const document=YAML.parseDocument(regText);for(const item of additions)document.get('sources').add(item);write(regPath,document.toString({lineWidth:120}));}
 write(planPath,JSON.stringify(plan,null,2)+'\n');
}
mkdirSync(join(root,'.mat-local'),{recursive:true});
write('.mat-local/intake-plan.json',JSON.stringify(plan,null,2)+'\n');
console.log(JSON.stringify({apply,files:operations.length,sourceEntries:sourceEntries.size,missingSources:missing,sourceConflicts,reviewOnly:review.length},null,2));
