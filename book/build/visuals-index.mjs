// Read YAML structurally so quoted, unquoted and multiline metadata agree.
import {readdirSync,statSync} from 'node:fs';
import {join,relative} from 'node:path';
import YAML from 'yaml';
import {root,writeJson,readText} from './lib.mjs';
export function buildVisualsIndex(){
 const visuals=[];
 for(const folder of readdirSync(join(root,'records'))){
  const m=folder.match(/^(\d{4})-/);if(!m)continue;
  const dir='records/'+folder;let file;
  try{file=readdirSync(join(root,dir,'data/structured')).find(f=>f.endsWith('-Visual-Manifest.yaml'));}catch{continue;}
  if(!file)continue;
  const manifest=YAML.parse(readText(dir+'/data/structured/'+file)),disk=[];
  const walk=p=>{for(const entry of readdirSync(p)){const f=join(p,entry);if(statSync(f).isDirectory())walk(f);else disk.push(relative(join(root,dir),f).replaceAll('\\','/'));}};
  for(const d of ['images','diagrams','graphs','models','tables'])try{walk(join(root,dir,d));}catch{}
  const items=[];
  for(const [slot,s]of Object.entries(manifest.visuals||{})){
   const entries=[...(s.assets||[]),...[s.filename,s.file,...(s.files||[])].filter(Boolean).map(filename=>({filename}))];
   for(const a of entries){
    const name=a.filename||a.file;if(!name)continue;
    const candidates=disk.filter(p=>p===name||p.endsWith('/'+name));
    const at=candidates.find(p=>p===(a.path||s.path||'')+name)||(candidates.length===1?candidates[0]:null);
    items.push({slot,file:name.split('/').at(-1),path:at?at.slice(0,at.lastIndexOf('/')+1):a.path||s.path||'',status:a.status||s.status||'UNKNOWN',found:!!at,alt:a.description||a.alt_text||s.description||s.alt_text||s.alt||''});
   }
  }
  // Keep useful existing graphics discoverable when they await registration.
  const registered=new Set(items.filter(i=>i.found).map(i=>i.path+i.file));
  for(const at of disk.filter(p=>/\.(svg|png|jpe?g|webp)$/i.test(p)&&!registered.has(p))){
   const file=at.split('/').at(-1);items.push({slot:null,file,path:at.slice(0,at.lastIndexOf('/')+1),status:'PRESENT-REGISTRATION-REVIEW',found:true,alt:'Existing visual awaiting catalogue review: '+file});
  }
  visuals.push({record:m[1],dir,items});
 }
 writeJson('visuals-index.json',{visuals},1);console.log(`visuals index: ${visuals.length} records -> book/visuals-index.json`);
}
