// Find source references in parsed YAML, including arrays and unquoted scalars.
export function sourceReferences(value, path='$', result=[]) {
  if(Array.isArray(value)){value.forEach((v,i)=>sourceReferences(v,`${path}[${i}]`,result));return result;}
  if(value&&typeof value==='object'){
    for(const [key,child]of Object.entries(value)){
      if(typeof child==='string'&&/^SRC-[A-Za-z0-9-]+$/.test(child))result.push({value:child,path:`${path}.${key}`,alias:/alias/.test(key)});
      else if(Array.isArray(child)&&/sources?|source_ids?|source_aliases/.test(key))child.forEach((v,i)=>{
        if(typeof v==='string'&&/^SRC-[A-Za-z0-9-]+$/.test(v))result.push({value:v,path:`${path}.${key}[${i}]`,alias:/alias/.test(key)});
        else sourceReferences(v,`${path}.${key}[${i}]`,result);
      });
      else sourceReferences(child,`${path}.${key}`,result);
    }
  }
  return result;
}
