// Recover accessible descriptions from existing SVG content; create no images.
import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {join,dirname} from 'node:path';
import YAML from 'yaml';
import {walkFiles} from './lib.mjs';
import {headingText} from '../book/reader-core.mjs';
import {sha256} from './intake-lib.mjs';
const root=join(import.meta.dirname,'..'),read=p=>readFileSync(join(root,p),'utf8');
const changes=[];
for(const file of walkFiles('records',p=>/Visual-Manifest\.yaml$/.test(p))){
 const doc=YAML.parseDocument(read(file)),visuals=doc.get('visuals');if(!visuals)continue;
 const folder=file.split('/').slice(0,2).join('/'),svgFiles=walkFiles(folder,p=>p.endsWith('.svg'));
 let dirty=false;
 for(const item of visuals.items){
  const slot=item.value,s=slot.toJSON();if(s.description||s.alt_text||s.alt)continue;
  const filenames=[s.filename,s.file,...(s.files||[]),...(s.assets||[]).map(a=>a.filename)].filter(Boolean);
  const recovered=[];
  for(const filename of filenames){
  const matches=svgFiles.filter(p=>p.endsWith('/'+filename));if(matches.length!==1)continue;
  const raw=read(matches[0]);
  const tags=tag=>[...raw.matchAll(new RegExp('<'+tag+'\\b[^>]*>([\\s\\S]*?)</'+tag+'>','g'))].map(m=>headingText(m[1]).trim()).filter(Boolean);
  const description=tags('desc'),title=tags('title'),labels=tags('text');
  const text=(description.length?[...title,...description]:labels).join('. ');if(!text)continue;
  recovered.push({text,source:matches[0],sha256:sha256(raw)});
  }
  if(!recovered.length)continue;
  slot.set('alt_text',recovered.map(r=>r.text).join(' / '));slot.set('description_provenance',{method:'Transcribed from existing SVG title/description or visible text; no new scientific interpretation',sources:recovered.map(({text,...rest})=>rest),review_status:'TRANSCRIBED-NEEDS-ACCESSIBILITY-REVIEW'});
  changes.push(...recovered.map(r=>({file,slot:String(item.key),source:r.source,source_sha256:r.sha256})));dirty=true;
 }
 if(dirty)writeFileSync(join(root,file),doc.toString({lineWidth:120}));
}
const ledger=join(root,'data/quality/asset-description-provenance.json');
if(changes.length){const prior=existsSync(ledger)?JSON.parse(readFileSync(ledger,'utf8')).changes:[];mkdirSync(dirname(ledger),{recursive:true});writeFileSync(ledger,JSON.stringify({method:'Description transcription only; images unchanged',changes:[...prior,...changes]},null,2)+'\n');}
console.log('Existing SVG descriptions recovered: '+changes.length);
