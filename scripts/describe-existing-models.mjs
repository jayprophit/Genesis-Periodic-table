// Add bounded text alternatives; binary geometry is read and never rewritten.
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import YAML from 'yaml';
import {walkFiles} from './lib.mjs';
import {sha256} from './intake-lib.mjs';
const changes=[];
for(const file of walkFiles('records',f=>/Visual-Manifest\.yaml$/.test(f))){
 const doc=YAML.parseDocument(readFileSync(file,'utf8')),slots=doc.get('visuals');if(!slots)continue;
 const folder=file.split('/').slice(0,2).join('/'),files=walkFiles(folder,f=>f.endsWith('.glb'));let dirty=false;
 for(const pair of slots.items){
  const slot=pair.value,s=slot.toJSON();if(s.description||s.alt_text||s.alt||s.status!=='GENERATED')continue;
  const names=[s.filename,s.file,...(s.files||[]),...(s.assets||[]).map(a=>a.filename)].filter(Boolean),entries=[];
  for(const name of names){const p=files.find(f=>f.endsWith('/'+name));if(!p)continue;
   const bytes=readFileSync(p);if(bytes.toString('ascii',0,4)!=='glTF')throw Error('Invalid GLB '+p);
   const data=JSON.parse(bytes.subarray(20,20+bytes.readUInt32LE(12)).toString());
   const label=name.replace(/^.*-MODEL-SCI-\d+-/,'').replace(/\.glb$/,'').replaceAll('-',' ');
   entries.push({path:p,sha256:sha256(bytes),caption:`${label}: retained illustrative 3D model with ${data.meshes?.length||0} mesh and ${data.nodes?.length||0} scene node. The filename identifies the intended subject; the geometry has no embedded scientific units or calibration. It must not be read as a measured structure, electron trajectory or quantitative density result.`});
  }
  if(!entries.length)continue;
  slot.set('alt_text',entries.map(e=>e.caption).join(' '));
  slot.set('description_provenance',{method:'Editorial description from retained filename and inspected glTF scene structure',review_status:'STRUCTURE-INSPECTED-SCIENTIFIC-GEOMETRY-UNVERIFIED',sources:entries.map(({caption,...e})=>e)});
  changes.push({file,slot:String(pair.key),assets:entries});dirty=true;
 }
 if(dirty)writeFileSync(file,doc.toString({lineWidth:120}));
}
if(changes.length){const path='data/quality/model-description-review.json',prior=existsSync(path)?JSON.parse(readFileSync(path,'utf8')).changes:[];writeFileSync(path,JSON.stringify({date:'2026-09-09',scope:'Accessible descriptions; binary models unchanged; no scientific calibration asserted',changes:[...prior,...changes]},null,2)+'\n');}
console.log(`Described ${changes.length} previously undescribed model slots.`);
