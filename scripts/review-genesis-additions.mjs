import {readFileSync,writeFileSync,readdirSync,existsSync,mkdirSync} from 'node:fs';
import {dirname} from 'node:path';
import YAML from 'yaml';
import {sourceReferences} from './source-references.mjs';
import {sha256} from './intake-lib.mjs';
const registry=YAML.parse(readFileSync('data/registries/sources.yaml','utf8'));
const known=new Set(registry.sources.flatMap(s=>[s.source_id,...(s.source_aliases||[])]));
const rows=[];const apply=process.argv.includes('--apply');
for(const file of readdirSync('.mat-local/conversation-review').filter(f=>f.endsWith('.json'))){
 const d=JSON.parse(readFileSync('.mat-local/conversation-review/'+file,'utf8'));
 for(const turn of d.turns)for(const item of turn.items){if(!item.text)continue;
 const matches=[...item.text.matchAll(/^#{1,6}\s*FILE:\s*([^\n]+)$/gm)];
 for(let n=0;n<matches.length;n++){
  const m=matches[n],path=m[1].replace(/[`*]/g,'').trim();
  if(!/^records\/(0010-Neon-Ne|0013-Aluminium-Al)\/(data\/(spectra|structured))\/[\w.-]+\.yaml$/.test(path)||existsSync(path))continue;
  const segment=item.text.slice(m.index+m[0].length,matches[n+1]?.index??item.text.length);
  const f=segment.match(/^\s*```yaml\s*\n([\s\S]*?)^```\s*$/m);if(!f)continue;
  let value;try{value=YAML.parse(f[1]);}catch{continue;}
  const refs=sourceReferences(value).map(r=>r.value),unresolved=[...new Set(refs.filter(r=>!known.has(r)))];
  const row={path,conversation_id:d.thread.id,message_id:item.id,line:item.text.slice(0,m.index).split('\n').length,sha256:sha256(f[1]),source_ids:[...new Set(refs)],unresolved,action:unresolved.length?'DEFER-UNRESOLVED-SOURCES':'READY-FOR-REVIEW',fields:Object.keys(value)};
  const archive=`archive/source-intake/genesis-recovered/${row.sha256}.txt`;
  mkdirSync(dirname(archive),{recursive:true});if(!existsSync(archive))writeFileSync(archive,f[1]);
  row.archive=archive;rows.push(row);
  if(apply&&!unresolved.length){
   const archive=`archive/source-intake/genesis-recovered/${row.sha256}.txt`;mkdirSync(dirname(archive),{recursive:true});writeFileSync(archive,f[1]);
   value.intake_provenance={conversation_id:row.conversation_id,message_id:row.message_id,line:row.line,source_file:archive,source_sha256:row.sha256,review_status:'NEEDS-SCIENTIFIC-REVIEW',method:'Complete fenced block from a bounded conversation view; existing files never overwritten'};
   value.scientific_validation_status='NEEDS-SCIENTIFIC-REVIEW';
   mkdirSync(dirname(path),{recursive:true});writeFileSync(path,YAML.stringify(value,{lineWidth:120}));row.action='ADDED-RESEARCH-PENDING-REVIEW';
  }
 }
 }}
const out='data/intake/genesis-recovered-additions.json';
if(rows.length)writeFileSync(out,JSON.stringify({date:'2026-09-09',scope:'Only missing Neon/Aluminium spectra and structured files; no isotope-value duplication; no scientific endorsement of conversation assertions',applied:apply,rows},null,2)+'\n');
console.log(JSON.stringify(rows,null,2));
