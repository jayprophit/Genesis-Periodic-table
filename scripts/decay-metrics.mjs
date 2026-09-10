// Single exponential decay model; native source units avoid an assumed year convention.
export function decayMetrics(half){
 const empty=reason=>({status:'NOT-CALCULATED',reason,decay_constant:null,mean_lifetime:null});
 if(half.status==='STABLE')return empty('Stable in the dated evaluation; no finite half-life supplied');
 if(!(half.value>0)||!half.unit)return empty('A positive numeric half-life and unit are required');
 const t=half.value,lambda=Math.LN2/t,tau=t/Math.LN2;
 const uncertaintyAvailable=half.relation==='='&&half.uncertainty!==null&&half.uncertainty>=0;
 return {status:half.estimated?'DERIVED-FROM-ESTIMATE':'DERIVED-FROM-EVALUATION',model:'Single exponential decay; lambda = ln(2)/T_half; tau = T_half/ln(2)',
  decay_constant:{value:lambda,unit:`1/${half.unit}`,relation:half.relation==='<'?'>':half.relation==='>'?'<':half.relation,uncertainty:uncertaintyAvailable?lambda*half.uncertainty/t:null},
  mean_lifetime:{value:tau,unit:half.unit,relation:half.relation,uncertainty:uncertaintyAvailable?half.uncertainty/Math.LN2:null},
  uncertainty_method:uncertaintyAvailable?'First-order propagation of the source symmetric uncertainty; no new confidence level assigned':'Not propagated: limit, absent or asymmetric source uncertainty retained in half_life',
  caveat:'Arithmetic model result, not a new measurement. Source estimates and bounds remain estimates and bounds; displayed floating-point digits do not imply additional precision.'};
}
