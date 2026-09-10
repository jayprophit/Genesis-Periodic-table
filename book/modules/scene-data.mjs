// Adapt both retained scene formats without changing their geometry or units.
export function normalizeScene(source){
 if(!Array.isArray(source?.atoms)||source.atoms.length===0)throw new Error('Scene has no nodes');
 const point=p=>Array.isArray(p)&&p.length===3&&p.every(Number.isFinite);
 const atoms=source.atoms.map((atom,i)=>{
   const nested=Array.isArray(atom?.[0]);
   const position=nested?atom[0]:atom?.slice(0,3);
   if(!point(position))throw new Error('Invalid node coordinates at '+i);
   let color=nested?atom[1]:atom[4];
   if(Array.isArray(color)){
     if(!point(color)||color.some(c=>c<0||c>1))throw new Error('Invalid node color at '+i);
     color='#'+color.map(c=>Math.round(c*255).toString(16).padStart(2,'0')).join('');
   }
   return [...position,nested?(typeof atom[2]==='string'?atom[2]:''):atom[3]||'',color||'#6cb2ff'];
 });
 for(const bond of source.bonds||[]){
   if(!Array.isArray(bond)||bond.length!==2)throw new Error('Invalid bond');
   if(typeof bond[0]==='number'){
     if(!bond.every(i=>Number.isInteger(i)&&i>=0&&i<atoms.length))throw new Error('Unknown bond node');
   }else if(!bond.every(point))throw new Error('Invalid bond coordinates');
 }
 for(const edge of source.cell||[])if(!Array.isArray(edge)||edge.length!==2||!edge.every(point))throw new Error('Invalid cell edge');
 return {...source,atoms};
}
