import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {parseNubase,evaluatedNumber} from '../nubase.mjs';
import {extractIntake,validIntakePath,sha256} from '../intake-lib.mjs';
import {sourceReferences} from '../source-references.mjs';
import YAML from 'yaml';
const raw=readFileSync(new URL('../../data/catalog/sources/nubase_4.mas20.txt',import.meta.url),'utf8');
const rows=parseNubase(raw);
const rawLines=raw.replace(/\r\n/g,'\n').split('\n');
test('NUBASE covers 118 elements and keeps neutron outside the element namespace',()=>{
 assert.equal(new Set(rows.filter(r=>r.Z>0).map(r=>r.Z)).size,118);
 assert.equal(rows.filter(r=>r.Z===0).length,1);
 assert.equal(rows.filter(r=>r.Z>0).length,5842);
 for(const r of rows){assert.equal(r.N,r.A-r.Z);assert.equal(rawLines[r.source_line-1],r.raw_line);}
});
test('evaluated half-lives, stable states and isomers have distinct semantics',()=>{
 const na24=rows.find(r=>r.Z===11&&r.A===24&&r.state_index===0);
 assert.equal(na24.half_life.value,14.9560);assert.equal(na24.half_life.unit,'h');assert.equal(na24.half_life.uncertainty,0.0015);
 const al27=rows.find(r=>r.Z===13&&r.A===27&&r.state_index===0);
 assert.equal(al27.half_life.status,'STABLE');assert.equal(al27.half_life.value,null);assert.equal(al27.half_life.null_reason,'NOT_APPLICABLE');
 const mg40=rows.find(r=>r.Z===12&&r.A===40&&r.state_index===0);
 assert(mg40.mass_excess.estimated);assert(mg40.half_life.estimated);
 assert(rows.some(r=>r.Z===13&&r.A===26&&r.state_index===1&&r.excitation_energy.value>0));
});
test('limits, estimated uncertainty and asymmetric uncertainty are not flattened',()=>{
 assert.equal(evaluatedNumber('<180','ns').relation,'<');
 assert.equal(evaluatedNumber('1#','ms').estimated,true);
 assert.equal(evaluatedNumber('10','ms','+5-3').uncertainty,null);
 assert.equal(evaluatedNumber('10','ms','+5-3').uncertainty_raw,'+5-3');
 assert.equal(evaluatedNumber('','keV').value,null);
});
test('intake parser keeps Markdown headings and source list indentation',()=>{
 const a=extractIntake('# FILE: records/0011-Sodium-Na/test.md\n\n# Heading\n\n```yaml\nstatus: PASS\n```\n# APPEND TO: data/registries/sources.yaml\n\n```yaml\n  - source_id: SRC-000999\n    title: Test\n```\n','test');
 assert(a[0].content.startsWith('# Heading'));
 assert(a[1].content.startsWith('  - source_id:'));
 assert.equal(validIntakePath('records/0011-Sodium-Na/../../book.js'),false);
 assert.equal(validIntakePath('records/0011-Sodium-Na/data/isotopes/test.yaml'),true);
});
test('intake source archive is byte-preserved and each selected file has provenance',()=>{
 const p=JSON.parse(readFileSync(new URL('../../data/intake/mat-42-52.json',import.meta.url)));
 assert.equal(p.missingSources.length,0);assert.equal(p.sourceConflicts.length,0);
 for(const s of p.sources)assert.equal(sha256(readFileSync(new URL('../../'+s.archive,import.meta.url))),s.sha256);
 assert(p.operations.every(o=>o.input&&o.line>0&&o.output_sha256));
});
test('source references include unquoted scalars and nested lists',()=>{
 const refs=sourceReferences({source_id:'SRC-000001',nested:{source_ids:['SRC-000002','SRC-NO-003']},source_aliases:['SRC-OLD-001']});
 assert.deepEqual(refs.map(r=>r.value),['SRC-000001','SRC-000002','SRC-NO-003','SRC-OLD-001']);
 assert(refs.at(-1).alias);
});
test('review suggestions retain exact source bytes and line-level locators',()=>{
 const read=p=>readFileSync(new URL('../../'+p,import.meta.url));
 const ledger=JSON.parse(read('data/intake/review-briefs-2026-09-09.json'));
 assert.equal(ledger.sources.length,2);assert.equal(ledger.recommendations.length,107);
 for(const source of ledger.sources){
  const bytes=read(source.path);assert.equal(bytes.length,source.bytes);assert.equal(sha256(bytes),source.sha256);
  const lines=bytes.toString('utf8').replace(/\r\n/g,'\n').split('\n');
  for(const r of ledger.recommendations.filter(r=>r.source_id===source.id)){
   assert(lines[r.source_line-1].includes(r.title));assert.match(r.status,/REFERENCE/);
  }
 }
 const domains=YAML.parse(read('data/registries/domains.yaml').toString());
 assert.equal(new Set(domains.domains.map(d=>d.id)).size,domains.domains.length);
 assert(domains.domains.every(d=>d.status==='PROPOSED'));
});
test('record coverage resolves multi-document YAML sources without claiming curation',()=>{
 const coverage=JSON.parse(readFileSync(new URL('../../data/quality/record-coverage.json',import.meta.url)));
 assert.equal(coverage.records.length,119);
 assert(coverage.records.every(r=>r.parse_errors.length===0&&r.unresolved_source_ids.length===0));
 assert(coverage.records.every(r=>r.scientific_review==='REQUIRES_REVIEW'));
 const carbon=coverage.records.find(r=>r.mat_id==='MAT:0006');
 assert(carbon.source_ids.length>7);assert(carbon.structured_field_occurrences.value_objects>0);
 assert.equal(coverage.records.filter(r=>Number.isInteger(r.nuclear_states)).length,118);
});
