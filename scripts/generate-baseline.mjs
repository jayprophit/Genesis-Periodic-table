import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {join,dirname} from 'node:path';
import YAML from 'yaml';
import {properties,baselineTable,identitySVG} from './baseline-record.mjs';
const root=join(import.meta.dirname,'..');
const elements=JSON.parse(readFileSync(join(root,'data/catalog/elements-baseline.json'),'utf8')).elements;
const write=(p,v)=>{p=join(root,p);if(existsSync(p))return;mkdirSync(dirname(p),{recursive:true});writeFileSync(p,v)};
for(const e of elements){if(e.recordStatus==='CURATED')continue;const stem=String(e.z).padStart(4,'0')+'-'+e.name+'-'+e.symbol,folder='records/'+stem;
const header={mat_id:e.matId,record_name:e.name,symbol:e.symbol,atomic_number:e.z,record_class:'CHEMICAL_ELEMENT',parent_id:'MAT:0000',status:'BASELINE',schema_version:'1.0.0',record_version:'1.1.0'};
write(folder+'/'+stem+'.md','# '+e.z+' — '+e.name+'\n\n'+String.fromCharCode(96).repeat(3)+'yaml\n'+YAML.stringify(header)+String.fromCharCode(96).repeat(3)+'\n\n# Baseline properties\n\n'+baselineTable(e)+'\n\n# Curation gaps\n\nNuclear, spectra, electrical, magnetic, mechanical, safety and applications: UNAVAILABLE pending source-backed curation.\n\n# Sources\n\n[PubChem](https://pubchem.ncbi.nlm.nih.gov/ptable/) and [CIAAW](https://www.ciaaw.org/atomic-weights.htm). See catalogue snapshots and hashes.\n');
write(folder+'/data/structured/'+stem+'.yaml',YAML.stringify({...header,properties:properties(e)}));
write(folder+'/images/scientific/'+stem+'-FIG-002-Atomic-Identity.svg',identitySVG(e));
}
console.log('Created missing baseline files only; existing authored content preserved.');

