// Publish traceable navigation and a claims ledger without upgrading scientific certainty.
import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {join,dirname,relative} from 'node:path';
import YAML from 'yaml';
import {sha256} from './intake-lib.mjs';
import {parseNubase} from './nubase.mjs';
import {walkFiles} from './lib.mjs';
const root=join(import.meta.dirname,'..');
const read=p=>readFileSync(join(root,p),'utf8').replace(/\r\n/g,'\n');
const write=(p,s)=>{mkdirSync(dirname(join(root,p)),{recursive:true});writeFileSync(join(root,p),s);};
const plan=JSON.parse(read('data/intake/mat-42-52.json'));
const nuclear=JSON.parse(read('data/catalog/nuclear-evaluation-index.json'));
const rows=parseNubase(read(nuclear.source.snapshot));
const sourcesPath='data/registries/sources.yaml',document=YAML.parseDocument(read(sourcesPath));
const nodes=document.get('sources').items,sourceMap=new Map(nodes.map(n=>[n.get('source_id'),n]));
const urls={
 'SRC-000008':nuclear.source.url,
 'SRC-000214':'https://physics.nist.gov/cgi-bin/ASD/ie.pl?spectra=Na&units=1&unc_out=1',
 'SRC-000215':'https://physics.nist.gov/cgi-bin/Compositions/stand_alone.pl?ele=Na',
 'SRC-000216':'https://periodic-table.rsc.org/element/11/sodium',
 'SRC-000217':'https://physics.nist.gov/PhysRefData/Handbook/Tables/sodiumtable3.htm',
 'SRC-000224':'https://www.lnhb.fr/nuclides/Na-24_tables.pdf',
 'SRC-000235':'https://physics.nist.gov/PhysRefData/Handbook/Tables/sodiumtable3.htm',
 'SRC-000236':'https://www.nist.gov/nist-and-nobel/bill-phillips/nobel-moment-bill-phillips',
 'SRC-000239':'https://periodic-table.rsc.org/element/11/sodium',
 'SRC-000242':'https://physics.nist.gov/cgi-bin/ASD/ie.pl?spectra=Mg&units=1&unc_out=1',
 'SRC-000243':'https://physics.nist.gov/cgi-bin/Compositions/stand_alone.pl?ele=Mg',
 'SRC-000244':'https://physics.nist.gov/PhysRefData/Handbook/Tables/magnesiumtable3.htm',
 'SRC-000245':'https://periodic-table.rsc.org/element/12/magnesium',
 'SRC-000246':'https://www.usgs.gov/centers/national-minerals-information-center/magnesium-statistics-and-information',
 'SRC-000248':'https://www.nist.gov/publications/first-principles-zone-center-theory-superconductivity-mgb2',
 'SRC-000252':'https://pmc.ncbi.nlm.nih.gov/articles/PMC11648962/',
 'SRC-000279':'https://physics.nist.gov/cgi-bin/ASD/ie.pl?spectra=Al&units=1&unc_out=1',
 'SRC-000280':'https://physics.nist.gov/cgi-bin/Compositions/stand_alone.pl?ele=Al',
 'SRC-000281':'https://www.ciaaw.org/atomic-weights.htm',
 'SRC-000282':'https://physics.nist.gov/PhysRefData/Handbook/Tables/aluminumtable3.htm',
 'SRC-000284':'https://physics.nist.gov/PhysRefData/Handbook/Tables/aluminumtable4.htm',
 'SRC-000285':'https://physics.nist.gov/cgi-bin/ASD/lines_hold.pl?el=Al'
};
for(const s of plan.sourceEntries){
 const n=sourceMap.get(s.source_id);if(!n)throw new Error('Source missing '+s.source_id);
 if(!n.get('url')&&(urls[s.source_id]||s.doi))n.set('url',urls[s.source_id]||'https://doi.org/'+s.doi);
 const same=s.doi==='10.1088/1674-1137/abddae'?'SRC-000008':s.doi==='10.18434/T4W30F'?'SRC-000005':null;
 if(same){n.set('same_work_as',same);n.set('scope_note','Record-specific accession retained for backwards compatibility; this is not independent corroborating evidence.');}
}
const nubaseNode=sourceMap.get('SRC-000008');
nubaseNode.set('url',nuclear.source.url);nubaseNode.set('snapshot',nuclear.source.snapshot);nubaseNode.set('sha256',nuclear.source.sha256);nubaseNode.set('retrieved',nuclear.source.retrieved);nubaseNode.set('verification_status','PRIMARY-DATASET-RETRIEVED');
write(sourcesPath,document.toString({lineWidth:120}));
const claims=[];
for(const o of plan.operations){
 claims.push({claim_id:'INTAKE-'+sha256(o.path).slice(0,12),record:o.path.split('/')[1].slice(0,4),file:o.path,
  source_file:o.input,source_line:o.line,claim:'Recovered research content and its source assertions',status:'NEEDS-SCIENTIFIC-REVIEW',
  schema_status:o.path.endsWith('.yaml')?'YAML-PARSED':'MARKDOWN-IMPORTED',independent_replication:'NOT-ASSESSED',
  counterevidence:'Not established by this import',source_assertions_do_not_set_validation:true});
}
let comparisons=0;
for(const o of plan.operations.filter(o=>/Isotope-\d+-/.test(o.path))){
 const d=YAML.parse(read(o.path)),n=d.nucleus,A=n?.A??n?.mass_number,Z=n?.Z??n?.protons;
 const s=rows.find(r=>r.A===A&&r.Z===Z&&r.state_index===0);
 const h=d.half_life?.MAT_nuclear_evaluation??d.half_life,v=h?.value??h?.estimated_value;
 if(s&&v!=null&&h.unit===s.half_life.unit&&s.half_life.value!=null){
  comparisons++;
  claims.push({claim_id:'NUCLEAR-COMPARE-'+Z+'-'+A,record:String(Z).padStart(4,'0'),file:o.path,claim:'Half-life numeric transcription in identical units',submitted:v,evaluation:s.half_life.value,unit:h.unit,
   status:Math.abs(v-s.half_life.value)<1e-8?'MATCHES-NUBASE2020':'CONFLICT',source_id:'SRC-000008',source_line:s.source_line,
   limit:'Numeric agreement only; uncertainty, qualifiers, branching, later evidence and scientific validation are separate checks.'});
 }
}
const registry=YAML.parse(read(sourcesPath)).sources;
for(const prefix of ['0011-Sodium-Na','0012-Magnesium-Mg','0013-Aluminium-Al']){
 const dir='records/'+prefix,number=prefix.slice(0,4),name=prefix.split('-')[1];
 const selected=plan.operations.filter(o=>o.path.startsWith(dir+'/'));
 const ids=[...new Set(selected.flatMap(o=>read(o.path).match(/SRC-\d{6}\b/g)||[]))].sort();
 const sources=ids.map(id=>registry.find(s=>s.source_id===id));
 if(sources.some(s=>!s))throw new Error('Bibliography has missing sources for '+prefix);
 const bib=dir+'/sources/'+prefix+'-Recovered-Bibliography.md';
 write(bib,`# ${name} — Recovered Bibliography\n\nThese are source accessions recovered from the supplied conversations. Registration and a working URL do not establish that a source supports every associated claim. Individual citation review remains open. Entries with the same DOI are one work, not independent corroboration.\n\n`+sources.map(s=>`## ${s.source_id}\n\n${s.url?'['+s.title+']('+s.url+')':s.title||s.topic||s.organization}. ${s.organization||s.journal||s.publication||''}${s.year?' · '+s.year:''}.\n\nReview: ${s.verification_status||'CITATION-RECOVERED-NEEDS-REVIEW'}.${s.same_work_as?' Same work as '+s.same_work_as+'.':''}${s.url?'':' **Specific source URL or bibliographic identification still needed.**'}\n`).join('\n'));
 const intake=dir+'/'+prefix+'-Research-Intake.md';
 write(intake,`# ${name} — Research Intake and Review\n\n**Research / Emerging · imported content awaiting review.** ${selected.length} file-level records were recovered, with original source bytes and duplicate history retained. Existing baseline values are retained in the source archive and Git history. \`CORE-VALIDATED\` or \`PASS\` in the original conversation is not a result from the local validator.\n\n- [Parent record](${prefix}.md)\n- [Evaluated nuclear reference](${prefix}-Nuclear-Evaluation.md)\n- [Recovered bibliography](sources/${prefix}-Recovered-Bibliography.md)\n- [Intake ledger](../../data/intake/mat-42-52.json)\n- [Claims ledger](../../data/intake/mat-42-52-claims.json)\n\n## Imported record files\n\n`+selected.filter(o=>!o.path.endsWith('/'+prefix+'.md')).map(o=>`- [${o.path.split('/').at(-1)}](${o.path.slice(dir.length+1)}) — ${o.input}, line ${o.line}; review pending.`).join('\n')+`\n\n## Completion boundary\n\nNuclear source transcription can be checked automatically. Engineering allowables, biological context, experimental replication, equations, spectra, visual rights and source support still require domain review. Pending graphics remain specifications, not generated scientific figures.\n`);
}
// Every published element gets a direct route to its newly populated evaluation.
for(const e of nuclear.elements){
 const folder=e.chapter.split('/').slice(0,2).join('/'),stem=folder.split('/')[1],main=folder+'/'+stem+'.md';
 let text=read(main);
 const note=`\n## Evaluated nuclear data and review\n\nThe [NUBASE2020 nuclear state catalogue](${stem}-Nuclear-Evaluation.md) provides ${e.states} evaluated states with uncertainties, qualifiers and source-line provenance.${['0011','0012','0013'].includes(stem.slice(0,4))?` See the [research intake and claims review](${stem}-Research-Intake.md) for the supplied expansion.`:''} This dated evaluation does not make the whole material record complete.\n`;
 if(text.includes('\n## Evaluated nuclear data and review\n'))text=text.replace(/\n## Evaluated nuclear data and review\n[\s\S]*?(?=\n## |$)/,note);
 else text+=note;
 write(main,text);
}
write('data/intake/mat-42-52-claims.json',JSON.stringify({intake_id:plan.intake_id,claims,numeric_half_life_comparisons:comparisons,conflicts:claims.filter(c=>c.status==='CONFLICT').length,remaining_review:'All source claims retain independent scientific review requirements.'},null,2)+'\n');
console.log(`Intake review: ${claims.length} claims, ${comparisons} numeric half-life comparisons; ${claims.filter(c=>c.status==='CONFLICT').length} conflicts.`);
