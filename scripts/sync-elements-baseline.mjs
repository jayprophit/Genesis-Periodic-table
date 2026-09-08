// Offline projection from retained reference snapshots.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import YAML from 'yaml';
import { frontMatter } from './lib.mjs';
const root = join(import.meta.dirname, '..');
const read = p => readFileSync(join(root,p),'utf8');
const json = p => JSON.parse(read(p));
const write = (p,v) => writeFileSync(join(root,p),JSON.stringify(v,null,2)+'\n');
const nav = json('data/navigation/periodic-table.json').elements;
const table = json('data/catalog/sources/pubchem-elements.json').Table;
const rows = table.Row.map(r=>Object.fromEntries(table.Columns.Column.map((k,i)=>[k,r.Cell[i]])));
const weights = new Map([...read('data/catalog/sources/ciaaw-atomic-weights.html').matchAll(/<tr><td>(\d+)<\/td><td>[^<]+<\/td><td>[\s\S]*?<\/td><td>([\s\S]*?)<\/td>/g)].map(m=>[+m[1],m[2].replace(/<[^>]*>/g,'').replace(/&nbsp;|\s/g,'')]));
if(rows.length!==118 || weights.size<118) throw new Error('Incomplete source snapshots: '+weights.size);
const sources = [
 {id:'PUBCHEM-PERIODIC',url:'https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/JSON',retrieved:'2026-09-08',snapshot:'pubchem-elements.json'},
 {id:'CIAAW-2024',url:'https://www.ciaaw.org/atomic-weights.htm',retrieved:'2026-09-08',snapshot:'ciaaw-atomic-weights.html'}
].map(s=>({...s,sha256:createHash('sha256').update(read('data/catalog/sources/'+s.snapshot)).digest('hex')}));
const missing=(reason='UNAVAILABLE',unit=null)=>({value:null,nullReason:reason,evidence:reason,source:null,unit});
const categories={'Nonmetal':'Reactive Nonmetal','Noble gas':'Noble Gas','Alkali metal':'Alkali Metal','Alkaline earth metal':'Alkaline Earth Metal','Transition metal':'Transition Metal','Post-transition metal':'Post-Transition Metal','Metalloid':'Metalloid','Halogen':'Halogen','Lanthanide':'Lanthanide','Actinide':'Actinide'};
const elements=rows.map(r=>{
 const z=+r.AtomicNumber, n=nav.find(e=>e.z===z);
 if(!n || n.symbol!==r.Symbol) throw new Error('Identity mismatch '+z);
 const stem=String(z).padStart(4,'0')+'-'+n.name+'-'+r.Symbol;
 const chapterPath='records/'+stem+'/'+stem+'.md';
 const fm=existsSync(join(root,chapterPath))?frontMatter(read(chapterPath)):{};
 const curated=!!fm.status && !['BASELINE','PLANNED','DRAFT'].includes(fm.status);
 const field=(key,unit=null,numeric=false)=>{
   if(!r[key]) return missing('UNAVAILABLE',unit);
   const value=numeric?Number(r[key]):r[key];
   if(numeric&&!Number.isFinite(value)) return missing('UNAVAILABLE',unit);
   return {value,unit,source:'PUBCHEM-PERIODIC',sourceUrl:'https://pubchem.ncbi.nlm.nih.gov/element/'+z,evidence:z>=104?'PREDICTED':'REPORTED'};
 };
 const raw=weights.get(z);
 const atomicWeight=/^\[/.test(raw)?{value:raw,interval:raw.slice(1,-1).split(',').map(Number),source:'CIAAW-2024',evidence:'EVALUATED',kind:'STANDARD_ATOMIC_WEIGHT_INTERVAL'}:
 /^\d/.test(raw)?{value:Number(raw.split('(')[0]),display:raw,source:'CIAAW-2024',evidence:'EVALUATED',kind:'STANDARD_ATOMIC_WEIGHT'}:
 {...missing('NOT_APPLICABLE'),source:'CIAAW-2024',kind:'NO_STANDARD_ATOMIC_WEIGHT'};
 return {z,symbol:r.Symbol,name:n.name,matId:'MAT:'+String(z).padStart(4,'0'),period:n.period,group:n.group,
 block:z===2?'s':(z>=57&&z<=71)||(z>=89&&z<=103)?'f':n.group<=2?'s':n.group>=13?'p':'d',
 category:categories[r.GroupBlock]||r.GroupBlock,recordStatus:curated?'CURATED':'BASELINE',hasFullRecord:curated,
 atomicWeight,electronConfiguration:field('ElectronConfiguration'),electronegativity:z>=104?missing('UNAVAILABLE','Pauling'):field('Electronegativity','Pauling',true),
 firstIonizationEnergy:z>=104?missing('UNAVAILABLE','eV'):field('IonizationEnergy','eV',true),
 phase:z>=104?missing('UNKNOWN'): {...field('StandardState'),conditions:'Source standard state; verify temperature and pressure for reuse'},
 meltingPoint:z>=104||z===2?missing('UNAVAILABLE','K'):field('MeltingPoint','K',true),
 boilingPoint:z>=104?missing('UNAVAILABLE','K'):field('BoilingPoint','K',true),
 density:z>=104?missing('UNAVAILABLE','g/cm3'):{...field('Density','g/cm3',true),conditions:'Source reference conditions; consult element page'},
 oxidationStates:field('OxidationStates'),
 abundance:{universe:missing(),crust:missing(),human:missing()},
 chapterPath:existsSync(join(root,chapterPath))?chapterPath:null};
});
const catalog={catalog:{id:'MAT:ELEMENTS:BASELINE',version:'2.0.0',updated:'2026-09-08',sources,totalElements:118,curatedCount:elements.filter(e=>e.recordStatus==='CURATED').length,baselineCount:elements.filter(e=>e.recordStatus==='BASELINE').length},elements};
write('data/catalog/elements-baseline.json',catalog);
writeFileSync(join(root,'data/catalog/elements-baseline.yaml'),YAML.stringify(catalog));
const flattened=elements.map(e=>({...e,provenance:Object.fromEntries(Object.entries(e).filter(([,v])=>v&&typeof v==='object'&&'value'in v)),
 ...Object.fromEntries(Object.entries(e).filter(([,v])=>v&&typeof v==='object'&&'value'in v).map(([k,v])=>[k,v.value])),
 ionizationEnergy:e.firstIonizationEnergy.value,publishedRecord:!!e.chapterPath}));
write('book/data/elements-118.json',{version:'2.0.0',source:'Retained PubChem and CIAAW snapshots',referenceRecords:[{matId:'MAT:0000',name:'Origin State',symbol:'OS',recordStatus:'REFERENCE',chapterPath:'records/0000-Origin-State/0000-Origin-State.md'}],elements:flattened});
console.log('Synchronized 118 source-backed identities; '+catalog.catalog.curatedCount+' curated chapters (not a validation claim).');

