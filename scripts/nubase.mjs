// Fixed-width fields follow the format header distributed with NUBASE2020.
// Raw field text is retained alongside every parsed value and qualifier.
export function evaluatedNumber(raw, unit, uncertaintyRaw='') {
  const text=raw.trim(), uncertainty=uncertaintyRaw.trim();
  const match=text.replaceAll('#','').match(/^([<>~]?)([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?)$/);
  return {value:match?Number(match[2]):null,unit:unit||null,raw:text,
    null_reason:match?null:text?'NON-NUMERIC-SOURCE-FIELD':'UNAVAILABLE',
    relation:match?.[1]||'=',estimated:text.includes('#')||uncertainty.includes('#'),
    uncertainty_raw:uncertainty,
    uncertainty:/^[+-]?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?$/.test(uncertainty.replaceAll('#',''))?Number(uncertainty.replaceAll('#','')):null};
}
export function parseNubase(text) {
  const rows=[],seen=new Set();
  for(const [index,line] of text.replace(/\r\n/g,'\n').split('\n').entries()){
    if(!line.trim()||line.startsWith('#'))continue;
    if(!/^\d{3} \d{4}/.test(line))throw new Error(`Unrecognized NUBASE row ${index+1}`);
    const A=Number(line.slice(0,3)),Z=Number(line.slice(4,7)),state=Number(line[7]);
    const key=`${A}:${Z}:${state}`;
    if(seen.has(key))throw new Error('Duplicate NUBASE state '+key);seen.add(key);
    const label=line.slice(11,16).trim(),suffix=line.slice(16,17).trim();
    const rawHalf=line.slice(69,78).trim();
    const half=evaluatedNumber(rawHalf,line.slice(78,80).trim(),line.slice(81,88));
    if(rawHalf==='stbl'){half.status='STABLE';half.null_reason='NOT_APPLICABLE';}
    else if(rawHalf==='p-unst'){half.status='PARTICLE-UNSTABLE';half.null_reason='UNAVAILABLE';}
    else half.status=half.value===null?'UNAVAILABLE':'RADIOACTIVE';
    rows.push({A,Z,N:A-Z,state_index:state,state_label:suffix||'ground',source_label:label,
      mass_excess:evaluatedNumber(line.slice(18,31),'keV',line.slice(31,42)),
      excitation_energy:evaluatedNumber(line.slice(42,54),'keV',line.slice(54,65)),
      excitation_origin:line.slice(65,67).trim(),ordering_uncertain:line[67]==='*',ordering_inverted:line[68]==='&',
      half_life:half,spin_parity_raw:line.slice(88,102).trim(),
      ensdf_update_year_raw:line.slice(102,104).trim(),discovery_year_raw:line.slice(114,118).trim(),
      decay_and_abundance_raw:line.slice(119).trim(),source_line:index+1,raw_line:line});
  }
  return rows;
}
