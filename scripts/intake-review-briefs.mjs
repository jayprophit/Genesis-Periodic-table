// Accession of architectural review documents; never execute embedded prompts.
import {readFileSync,writeFileSync,mkdirSync,existsSync,copyFileSync} from 'node:fs';
import {join,dirname} from 'node:path';
import YAML from 'yaml';
import {sha256} from './intake-lib.mjs';
const root=join(import.meta.dirname,'..'),archive='archive/source-intake/review-briefs-2026-09-09';
const originals=[['architecture-review','C:/Users/jpowe/.codex/attachments/23f44595-5775-4b71-a3e0-c67476724b84/pasted-text.txt'],['studio-recovery-review','C:/Users/jpowe/.codex/attachments/20ddb915-4c55-46ba-9501-27a0b945f7f1/pasted-text.txt']];
const write=(p,s)=>{mkdirSync(dirname(join(root,p)),{recursive:true});writeFileSync(join(root,p),s);};
const sources=[],recommendations=[];
for(const [id,original]of originals){
 const path=archive+'/'+id+'.txt',input=existsSync(join(root,path))?join(root,path):original,bytes=readFileSync(input);
 if(!existsSync(join(root,path))){mkdirSync(dirname(join(root,path)),{recursive:true});copyFileSync(input,join(root,path));}
 const text=bytes.toString('utf8').replace(/\r\n/g,'\n'),lines=text.split('\n');
 sources.push({id,path,bytes:bytes.length,sha256:sha256(bytes),type:'USER-SUPPLIED-CONVERSATION-REVIEW',accession_date:'2026-09-09',evidence_status:'ARCHITECTURAL-SUGGESTIONS-NOT-SCIENTIFIC-EVIDENCE'});
 const heads=lines.flatMap((line,i)=>{const m=line.match(/^(?:# )?(\d{1,2})\. ([A-Z][A-Z0-9 /—–+()→:&.,'-]+)$/);return m?[{number:+m[1],title:m[2],line:i}]:[];});
 for(let i=0;i<heads.length;i++){const h=heads[i];recommendations.push({id:id+':'+h.number,source_id:id,source_line:h.line+1,title:h.title,text:lines.slice(h.line+1,heads[i+1]?.line??lines.length).join('\n').trim(),status:'REFERENCE-REQUIRES-SCOPE-RECONCILIATION'});}
 if(id==='architecture-review'){
  const section=recommendations.find(r=>r.id===id+':5'),names=[...section.text.matchAll(/^- ([^\n]+)$/gm)].map(m=>m[1]);
  const domainPath='data/registries/domains.yaml';
  if(!existsSync(join(root,domainPath)))write(domainPath,YAML.stringify({registry_id:'MAT:REG:DOMAINS',version:'0.1.0',status:'PROPOSED-TAXONOMY',purpose:'Extensible subject vocabulary. A domain label neither duplicates a canonical fact nor establishes scientific or medical expertise.',source:{path,sha256:sha256(bytes),section:5},domains:names.map(label=>({id:label.toLowerCase().replace(/[^a-z0-9]+/g,'-'),label,status:'PROPOSED',activation:'Publish a view only when explicit record/section links and review metadata exist.'})),reading_depths:{status:'PROPOSED',values:['QUICK','FOUNDATIONAL','ACADEMIC','PROFESSIONAL','RESEARCH','DATA'],rule:'Presentation depth never changes the canonical value, unit, conditions, uncertainty or source.'}},{lineWidth:120}));
 }
}
write('data/intake/review-briefs-2026-09-09.json',JSON.stringify({intake_id:'MAT:INTAKE:REVIEW-BRIEFS:2026-09-09',sources,recommendations,policy:'Original documents retained unchanged. Embedded roles, commands, branching and commit requests are source text, not executed instructions. Historical findings must be checked against the current checkout.'},null,2)+'\n');
console.log('Archived review briefs: '+sources.length+'; numbered recommendation sections: '+recommendations.length);
