// Repeatable local engineering checks; not a certification or user-adoption rating.
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {performance} from 'node:perf_hooks';
import os from 'node:os';
import {searchDocuments} from '../book/reader-core.mjs';
const root=join(import.meta.dirname,'..');
const read=p=>JSON.parse(readFileSync(join(root,p),'utf8'));
const suites=[['unit',['--test','scripts/tests/*.test.mjs']],
 ...['validate-records','validate-sources','validate-relationships','validate-assets','check-links','check-identifiers','check-book-sync','validate-elements'].map(s=>[s,['scripts/'+s+'.mjs']])];
mkdirSync(join(root,'.mat-local/benchmark'),{recursive:true});
const checks=[];
for(const [name,args]of suites){
 const start=performance.now(),r=spawnSync(process.execPath,args,{cwd:root,encoding:'utf8',maxBuffer:32*1024*1024});
 const output=(r.stdout||'')+(r.stderr||'');writeFileSync(join(root,'.mat-local/benchmark',name+'.log'),output);
 const summary=[...output.matchAll(/\d+ error\(s\), \d+ warning\(s\)/g)].map(m=>m[0]);
 const result={name,passed:r.status===0,exit_code:r.status,milliseconds:Math.round(performance.now()-start),summary};checks.push(result);console.log(JSON.stringify(result));
}
const docs=read('book/search-index.json').docs;
const queries=['hydrogen','H','magnesium','14.956','mass excess','source','Oganesson','NEEDS-REVIEW','nonexistent_mat_query'];
for(const q of queries)searchDocuments(docs,q);
const timings=[];
for(let i=0;i<30;i++)for(const q of queries){const start=performance.now();searchDocuments(docs,q);timings.push(performance.now()-start);}
timings.sort((a,b)=>a-b);const pct=p=>Number(timings[Math.ceil(timings.length*p)-1].toFixed(2));
const search={samples:timings.length,p50_ms:pct(.5),p95_ms:pct(.95),max_ms:pct(1),budget_p95_ms:100,passed:pct(.95)<=100,scope:'Local Node search engine; no rendering, network, mobile throttling or field Core Web Vitals included.'};
const nuclear=read('data/catalog/nuclear-evaluation-index.json'),intake=read('data/intake/mat-42-52.json');
const report={run_at:new Date().toISOString(),environment:{node:process.version,platform:os.platform(),architecture:os.arch(),cpu:os.cpus()[0]?.model},
 scope:'Local engineering acceptance. No independent scientific peer review, WCAG certification or mass-adoption rating is implied.',
 coverage:{chapters:docs.length,records:read('book/elements.json').elements.length,elements:nuclear.element_count,nuclear_states:nuclear.total_states,intake_files:intake.operations.length,raw_sources:intake.sources.length,source_accessions:intake.sourceEntries.length},
 checks,search,passed:checks.every(c=>c.passed)&&search.passed,
 not_measured:['real-user Core Web Vitals','cross-browser assistive-technology conformance','independent scientific review','production load and adoption','visual rights clearance']};
mkdirSync(join(root,'data/quality'),{recursive:true});writeFileSync(join(root,'data/quality/benchmark.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({passed:report.passed,search,coverage:report.coverage},null,2));process.exitCode=report.passed?0:1;
