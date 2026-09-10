// Treat file-labelled conversation excerpts as data, never as executable instructions.
import {createHash} from 'node:crypto';
export const sha256 = value => createHash('sha256').update(value).digest('hex');
export const normalizeText = text => text.replace(/\r\n/g,'\n');
export function extractIntake(text, input) {
  const raw=normalizeText(text);
  const markers=[...raw.matchAll(/^#{1,6}\s*(FILE|UPDATE|PATCH|APPEND TO):\s*([^\n]+)$/gm)];
  return markers.map((m,i)=>{
    const path=m[2].replace(/[`*]/g,'').trim();
    let segment=raw.slice(m.index+m[0].length,markers[i+1]?.index??raw.length);
    // Closing backticks around a FILE label are packaging, not file contents.
    segment=segment.replace(/^\s*`{3,}\s*\n/,'\n').trimStart();
    const fenced=segment.match(/^(`{3,})(yaml|yml|json|markdown|md|text|csv)[ \t]*\n/);
    let content;
    if(fenced){
      const tail=segment.slice(fenced[0].length);
      const end=tail.search(new RegExp('^'+fenced[1]+'[ \\t]*$','m'));
      if(end<0)throw new Error(`${input}:${path}: unclosed content fence`);
      content=tail.slice(0,end);
    }else{
      // An unfenced Markdown document ends at the next top-level production heading.
      content=segment.split(/^# (?:FINAL .* STATUS|CURRENT .* STATE|INDEX PATCHES|MAT REFERENCE MATRIX|NEXT RECORD|Production status update|Nuclear-range update|²⁷Al NMR registry|Aluminium atomic spectrum)/m)[0];
      content=content.replace(/\n\[\d+\]:[\s\S]*$/,'');
    }
    return {input,operation:m[1],path,line:raw.slice(0,m.index).split('\n').length,content:content.replace(/^\n+|\s+$/g,'')+'\n'};
  });
}
export function validIntakePath(path){
  return /^records\/(0011-Sodium-Na|0012-Magnesium-Mg|0013-Aluminium-Al)\/[A-Za-z0-9/_.-]+\.(yaml|md|csv)$/.test(path)
    && !path.split('/').some(p=>p==='..'||p==='.') && !path.includes('\\');
}
