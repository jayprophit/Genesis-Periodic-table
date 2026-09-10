import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync}from'node:fs';import YAML from'yaml';
import {walkFiles}from'../lib.mjs';
test('added nuclear membership edges resolve to exact evaluated state and source line',()=>{
 for(const file of walkFiles('records',f=>/Relationships\.yaml$/.test(f))){const d=YAML.parse(readFileSync(file,'utf8'));if(!d.coverage?.source_file)continue;
  const source=YAML.parse(readFileSync(d.coverage.source_file,'utf8'));const states=new Map(source.entries.map(s=>[s.evaluation_entry_id,s.source_line]));
  assert.equal(d.relationships.length,states.size,file);assert.equal(new Set(d.relationships.map(r=>r.relationship_id)).size,states.size,file);
  for(const edge of d.relationships){assert.equal(edge.source_line,states.get(edge.source),edge.source);assert.equal(edge.target,d.record_id);assert.equal(edge.evidence,'EVALUATED');}
 }
});
