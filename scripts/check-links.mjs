// Check parsed Markdown destinations and heading anchors, including reference links.
import {R,walkFiles,exists,issue,summary} from './lib.mjs';
import {Marked} from '../book/vendor/marked.mjs';
import {renderDocument,canonicalId} from '../book/reader-core.mjs';
const parser=new Marked();
const files=[...walkFiles('docs',f=>f.endsWith('.md')),...walkFiles('records',f=>f.endsWith('.md')),'README.md','CHANGELOG.md'];
const headings=new Map();
for(const file of files){
 const source=R(file),tokens=parser.lexer(source);
 parser.walkTokens(tokens,token=>{
  if(!['link','image'].includes(token.type))return;
  const href=token.href;
  if(/^(https?:|mailto:|data:)/i.test(href))return;
  let target,anchor;
  try{const url=new URL(href,'https://mat.invalid/'+file);target=canonicalId(decodeURIComponent(url.pathname.slice(1)));anchor=decodeURIComponent(url.hash.slice(1));}
  catch{issue(file,null,href,'Malformed link','valid URL syntax');return;}
  if(!exists(target)){issue(file,null,href,'Linked resource missing','target file or directory must exist');return;}
  if(anchor&&target.endsWith('.md')){
   if(!headings.has(target))headings.set(target,new Set(renderDocument(R(target),target).outline.map(h=>h.id)));
   if(!headings.get(target).has(anchor))issue(file,null,href,'Heading anchor missing','target must name an actual rendered heading');
  }
 });
}
process.exitCode=summary('validate:links')?1:0;
