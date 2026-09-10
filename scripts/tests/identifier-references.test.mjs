import test from 'node:test';
import assert from 'node:assert/strict';
import {matIdentifiers,childReferenceStatus} from '../identifier-references.mjs';
test('identifier extraction preserves chemical symbols, charges and isomer suffixes',()=>{
 assert.deepEqual(matIdentifiers('MAT:0002:ISO:He-3 MAT:0013:ION:Al+3 MAT:0013:ISO:Al-26m').map(x=>x.id),['MAT:0002:ISO:He-3','MAT:0013:ION:Al+3','MAT:0013:ISO:Al-26m']);
});
test('documented cross-record targets resolve while missing children remain visible',()=>{
 const owned=new Set(['MAT:0002:ISO:He-3']);
 assert.equal(childReferenceStatus('MAT:0002:ISO:He-3','MAT:0001',owned),'RESOLVED-CROSS-REFERENCE');
 assert.equal(childReferenceStatus('MAT:0002:ISO:He-999','MAT:0001',owned),'UNRESOLVED-CHILD-REFERENCE');
});
