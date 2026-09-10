// Read bounded private conversation snapshots; emit path/hash metadata only.
import {readFileSync,writeFileSync,readdirSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import {sha256} from './intake-lib.mjs';
const root=join(import.meta.dirname,'..'),folder=join(root,'.mat-local/conversation-review');
const conversations=new Map(),blocks=[];
for(const file of readdirSync(folder).filter(f=>f.endsWith('.json'))){
 const d=JSON.parse(readFileSync(join(folder,file),'utf8'));
 const c=conversations.get(d.thread.id)||{id:d.thread.id,title:d.thread.title,pages:0,turns:0,truncated_messages:0,reached_beginning:false};
 c.pages++;c.turns+=d.turns.length;c.reached_beginning ||= !d.page.hasMore;
 for(const t of d.turns)for(const i of t.items){
  if(!i.text)continue;if(i.truncated)c.truncated_messages++;
  const matches=[...i.text.matchAll(/^#{1,6}\s*(FILE|UPDATE|PATCH|APPEND TO):\s*([^\n]+)$/gm)];
  for(let n=0;n<matches.length;n++){
   const m=matches[n],path=m[2].replace(/[`*]/g,'').trim();
   if(!/^(records|docs|templates|data)\/[\w/.-]+\.(yaml|yml|md|json|csv)$/.test(path)||path.split('/').includes('..'))continue;
   const segment=i.text.slice(m.index+m[0].length,matches[n+1]?.index??i.text.length);
   const fence=segment.match(/^\s*```(?:yaml|json|md|markdown|text|csv)?\s*\n([\s\S]*?)^```\s*$/m);
   const local=existsSync(join(root,path));
   blocks.push({conversation_id:d.thread.id,message_id:i.id,path,operation:m[1],line:i.text.slice(0,m.index).split('\n').length,message_truncated:!!i.truncated,closed_fenced_block:!!fence,local_exists:local,content_sha256:fence?sha256(fence[1]):null,comparison:!local?'MISSING-PATH':fence&&readFileSync(join(root,path),'utf8').replace(/\r\n/g,'\n').trim()===fence[1].trim()?'EXACT-TEXT-MATCH':'EXISTING-REQUIRES-SEMANTIC-COMPARISON'});
  }
 }
 conversations.set(d.thread.id,c);
}
const report={review_date:'2026-09-09',scope:'Both named conversations paginated to their beginning. Individual long messages are truncated by the connector. No missing tail is inferred; no existing file overwritten.',conversations:[...conversations.values()],blocks,unique_paths:new Set(blocks.map(b=>b.path)).size,missing_paths:[...new Set(blocks.filter(b=>!b.local_exists).map(b=>b.path))]};
writeFileSync(join(root,'data/intake/genesis-template-reconciliation.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({...report,blocks:blocks.length},null,2));
