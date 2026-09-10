// Build all-element nuclear references from one retained primary evaluation.
import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {join,dirname} from 'node:path';
import YAML from 'yaml';
import {parseNubase} from './nubase.mjs';
import {sha256} from './intake-lib.mjs';
import {decayMetrics} from './decay-metrics.mjs';
const root=join(import.meta.dirname,'..');
const snapshot='data/catalog/sources/nubase_4.mas20.txt';
const bytes=readFileSync(join(root,snapshot));
const rows=parseNubase(bytes.toString('utf8'));
const elements=JSON.parse(readFileSync(join(root,'data/catalog/elements-baseline.json'),'utf8')).elements;
const write=(p,s)=>{mkdirSync(dirname(join(root,p)),{recursive:true});writeFileSync(join(root,p),s);};
const source={source_id:'SRC-000008',title:'The NUBASE2020 evaluation of nuclear physics properties',
 authors:['F. G. Kondev','M. Wang','W. J. Huang','S. Naimi','G. Audi'],
 doi:'10.1088/1674-1137/abddae',evaluation_year:2020,publication_year:2021,retrieved:'2026-09-08',
 url:'https://www-nds.iaea.org/amdc/ame2020/nubase_4.mas20.txt',snapshot,sha256:sha256(bytes),
 evidence_type:'EVALUATED',scope:'Dated evaluation; later measurements remain separate. Not a claim of present-day completeness.'};
const coverage=[];
const show=m=>m.raw?(m.raw+(m.unit?' '+m.unit:'')+(m.uncertainty_raw?' (unc. '+m.uncertainty_raw+')':'')):'UNAVAILABLE';
const cell=s=>String(s).replaceAll('|','\\|').replaceAll('\n',' ');
for(const e of elements){
 const states=rows.filter(r=>r.Z===e.z);
 if(!states.length)throw new Error('No evaluated states for '+e.matId);
 const folder=e.chapterPath.split('/').slice(0,2).join('/'),stem=folder.split('/')[1];
 const file=`${folder}/data/isotopes/${stem}-NUBASE2020-Evaluation.yaml`;
 const chapter=`${folder}/${stem}-Nuclear-Evaluation.md`;
 const data={registry_id:e.matId+':REG:NUBASE2020',record_id:e.matId,evaluation:source,
   interpretation:{hash_sign:'Estimate from systematics; not a measurement',question_mark:'Uncertain assignment or decay branch; retained literally',stbl:'Stable in this evaluation; no numeric half-life substituted',p_unst:'Particle unstable',blank:'Unavailable; not zero',decay_branch_sum:'Delayed branches are not summed as independent decay probabilities',state_index:'Original NUBASE ground/isomer/level/IAS index; distinct states are not merged'},
   entries:states.map(r=>({...r,derived_decay:decayMetrics(r.half_life),isotope_ref:e.matId+':ISO:'+e.symbol+'-'+r.A+(r.state_index?r.state_label:''),evaluation_entry_id:`${e.matId}:NUBASE2020:${r.A}:${r.state_index}`}))};
 write(file,YAML.stringify(data,{lineWidth:130}));
 const body=`# ${e.name} — Evaluated Nuclear States\n\n<!-- generated-by: sync-nuclear-evaluation.mjs -->\n\n**MAT Core Data · dated evaluation.** ${states.length} nuclear states are transcribed from NUBASE2020, published in 2021. This is a reproducible source extraction, not independent experimental validation or a claim that later research is complete.\n\n- [Parent ${e.name} record](${stem}.md)\n- [Structured evaluation](data/isotopes/${stem}-NUBASE2020-Evaluation.yaml)\n- [Retained original source](../../${snapshot})\n- [Evaluation paper](https://doi.org/${source.doi}) · ${source.source_id}\n\n## How to read this table\n\nA is the mass number; N is the neutron count. Ground states, isomers, levels and isobaric analogue states retain the source state index. Mass excess is in keV, not atomic mass units. A \`#\` means an estimate from systematics; \`?\`, inequalities, asymmetric uncertainty text and spin qualifiers are preserved. \`stbl\` means stable in this evaluation, \`p-unst\` means particle unstable. Blank source fields remain unavailable. The final column preserves decay/abundance notation without equating decay branching with natural abundance.\n\n## Nuclear state catalogue\n\n| Nuclide / state | N | Mass excess | Half-life | Spin / parity | Decay or abundance (source text) | Source line |\n|---|---:|---|---|---|---|---:|\n`+
 states.map(r=>`| ${cell(r.source_label)}${r.state_index?' · '+r.state_label+' ['+r.state_index+']':''} | ${r.N} | ${cell(show(r.mass_excess))} | ${cell(show(r.half_life))} | ${cell(r.spin_parity_raw||'UNAVAILABLE')} | ${cell(r.decay_and_abundance_raw||'UNAVAILABLE')} | ${r.source_line} |`).join('\n')+
 `\n\n## Provenance and review\n\nSource snapshot SHA-256: \`${source.sha256}\`. Retrieved ${source.retrieved}. Every structured entry preserves the original line and its line number. The parser is checked against the source's published column specification and representative ground states, isomers, estimates and stable states. Post-2020 findings and supplied research batches retain separate provenance and review status.\n`;
 if(existsSync(join(root,chapter))&&!readFileSync(join(root,chapter),'utf8').includes('generated-by: sync-nuclear-evaluation.mjs'))throw new Error('Refusing to overwrite authored chapter '+chapter);
 const metrics=`\n## Derived decay metrics\n\nThe structured evaluation now includes a decay constant and mean lifetime for each positive numeric half-life. These use the single exponential model, \\(\\lambda=\\ln(2)/T_{1/2}\\) and \\(\\tau=T_{1/2}/\\ln(2)\\). Values retain the original time unit: a half-life in years produces a rate per source year, without silently assuming a calendar conversion. Inequalities reverse for the reciprocal decay constant. Estimates remain estimates. Stable or unavailable half-lives have no numeric result. Symmetric uncertainty is propagated to first order; asymmetric source uncertainties remain unpropagated and visible. These calculations add no new experimental evidence or significant figures.\n`;
 write(chapter,body+metrics);
 // Connect newly available nuclear data at the existing baseline section.
 // Preserve the manuscript's BASELINE status and all authored material.
 const mainPath=join(root,e.chapterPath),main=readFileSync(mainPath,'utf8').replace(/\r\n/g,'\n');
 if(/^status: BASELINE$/m.test(main)){
   const link=`[Evaluated nuclear states](${stem}-Nuclear-Evaluation.md)`;
   let updated=main.replace(/(## Child Records\n\n)None yet\./,`$1${link} · source evaluation and structured isotope data.`);
   updated=updated.replace(/\| Isotope \| Protons \| Neutrons \| Stability \| Half-Life \| Abundance \|\n\|---\|---:\|---:\|---\|---\|---\|/,
     `${link} provides ${states.length} states from NUBASE2020, including ground states and separately indexed excited states. The linked table preserves half-lives, uncertainties, qualifiers and source lines. Later measurements and wider nuclear research still require review.`);
   updated=updated.replace(/^nuclear: PLANNED$/m,'nuclear: PARTIAL # NUBASE2020 reference available; later research and curation pending');
   if(updated!==main)writeFileSync(mainPath,updated);
 }
 coverage.push({mat_id:e.matId,z:e.z,states:states.length,ground_states:states.filter(r=>r.state_index===0).length,stable_ground_states:states.filter(r=>r.state_index===0&&r.half_life.status==='STABLE').length,estimated_masses:states.filter(r=>r.mass_excess.estimated).length,chapter,data:file});
}
write('data/catalog/nuclear-evaluation-index.json',JSON.stringify({source,element_count:coverage.length,total_states:coverage.reduce((s,e)=>s+e.states,0),excluded_non_element_rows:rows.filter(r=>r.Z===0).length,elements:coverage},null,2)+'\n');
console.log(`NUBASE2020: ${coverage.length} elements, ${coverage.reduce((s,e)=>s+e.states,0)} evaluated states; source flags and raw lines retained.`);
