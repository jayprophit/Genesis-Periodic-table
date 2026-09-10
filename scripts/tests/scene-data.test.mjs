import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {normalizeScene} from '../../book/modules/scene-data.mjs';
const read=p=>JSON.parse(readFileSync(new URL('../../book/scenes/'+p,import.meta.url)));
test('all retained 3D scenes have finite coordinates and valid bonds in the viewer',()=>{
 const index=read('index.json');assert.equal(index.scenes.length,24);
 for(const entry of index.scenes){
   const raw=read(entry.file),before=JSON.stringify(raw),scene=normalizeScene(raw);
   assert.equal(scene.atoms.length,raw.atoms.length);assert.equal(scene.units,raw.units);
   assert.equal(JSON.stringify(raw),before,'Source scene mutated');
   for(let i=0;i<raw.atoms.length;i++){
    const original=Array.isArray(raw.atoms[i][0])?raw.atoms[i][0]:raw.atoms[i].slice(0,3);
    assert.deepEqual(scene.atoms[i].slice(0,3),original,entry.id);
   }
 }
});
test('scene adapter preserves labels and colors and rejects corrupt geometry',()=>{
 const result=normalizeScene({atoms:[[[1,2,3],[1,0,.5],'node']]});
 assert.deepEqual(result.atoms[0],[1,2,3,'node','#ff0080']);
 assert.throws(()=>normalizeScene({atoms:[[NaN,0,0]]}),/coordinates/);
 assert.throws(()=>normalizeScene({atoms:[[0,0,0]],bonds:[[0,2]]}),/bond node/);
});
