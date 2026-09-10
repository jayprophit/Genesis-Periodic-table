// CSS modules are the source; readers and print exports consume one built file.
import {readFileSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
export const styleModules=['variables','base','layout','toc','sidebar-settings','reader','content','visuals','responsive','print','reading-modes','codex-panels','periodic-extra','onboarding'];
export function buildStyles(){
 const book=join(import.meta.dirname,'..');
 writeFileSync(join(book,'styles.css'),'/* Generated from book/styles/*.css. Run npm run build:book. */\n'+styleModules.map(name=>readFileSync(join(book,'styles',name+'.css'),'utf8').replace(/\r\n/g,'\n')).join('\n'));
}
