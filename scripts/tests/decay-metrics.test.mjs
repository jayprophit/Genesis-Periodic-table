import test from 'node:test';
import assert from 'node:assert/strict';
import {decayMetrics} from '../decay-metrics.mjs';
test('decay rate and lifetime reproduce the half-life and propagate uncertainty',()=>{
 const r=decayMetrics({value:10,unit:'s',status:'RADIOACTIVE',relation:'=',uncertainty:1,estimated:false});
 assert.ok(Math.abs(Math.exp(-r.decay_constant.value*10)-0.5)<1e-14);
 assert.ok(Math.abs(r.mean_lifetime.value*r.decay_constant.value-1)<1e-14);
 assert.equal(r.decay_constant.uncertainty,r.decay_constant.value/10);
});
test('stable states, bounds, estimates and asymmetric errors retain their limits',()=>{
 assert.equal(decayMetrics({status:'STABLE'}).decay_constant,null);
 const r=decayMetrics({value:3,unit:'y',status:'RADIOACTIVE',relation:'<',uncertainty:null,estimated:true});
 assert.equal(r.decay_constant.relation,'>');assert.equal(r.mean_lifetime.relation,'<');assert.equal(r.decay_constant.unit,'1/y');assert.equal(r.status,'DERIVED-FROM-ESTIMATE');assert.equal(r.decay_constant.uncertainty,null);
});
