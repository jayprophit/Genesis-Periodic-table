// Chemical symbols and isomer suffixes are case-sensitive identifier components.
export function matIdentifiers(text){return [...text.matchAll(/\bMAT:\d{4}(?::[A-Za-z0-9+-]+)*/g)].map(m=>({id:m[0].replace(/:+$/,''),offset:m.index}));}
export function childReferenceStatus(id,owner,owned){
 if(!/^MAT:\d{4}:/.test(id)||id.startsWith(owner+':'))return 'LOCAL-OR-PARENT';
 return owned.has(id)?'RESOLVED-CROSS-REFERENCE':'UNRESOLVED-CHILD-REFERENCE';
}
