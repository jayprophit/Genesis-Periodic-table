import {describe,it,expect} from 'vitest';
import {parseProject,emptyProject} from './drafts';
import {filterElements,ElementData} from './data-loader';
import {resolveLink} from './components/Markdown';
import {epubBytes} from './exports';
import {unzipSync,strFromU8} from 'fflate';
describe('draft recovery',()=>{
 it('round trips without losing unknown scientific strings',()=>{const p=emptyProject();p.drafts['records/test.md']={body:'UNKNOWN\nNOT_APPLICABLE',baseHash:'abc',updated:'2026-09-08'};expect(parseProject(JSON.stringify(p))).toEqual(p)});
 it('rejects malformed imports and unsafe preferences',()=>{expect(()=>parseProject('{"version":2}')).toThrow();expect(()=>parseProject(JSON.stringify({...emptyProject(),fontSize:1000}))).toThrow()});
});
describe('navigation and safe rendering',()=>{
 it('finds stable IDs and trims search',()=>{const e={z:118,name:'Oganesson',symbol:'Og',matId:'MAT:0118',category:'Noble Gas',recordStatus:'BASELINE'} as ElementData;expect(filterElements([e],' mat:0118 ','all')).toEqual([e]);expect(filterElements([e],'','CURATED')).toEqual([])});
 it('blocks executable link schemes',()=>{expect(resolveLink('javascript:alert(1)','records/H/H.md')).toBe('');expect(resolveLink('https://example.org','records/H/H.md')).toBe('https://example.org');expect(resolveLink('../He/He.md','records/H/H.md')).toContain('records/He/He.md')});
});
describe('EPUB container',()=>{
 it('stores mimetype first and includes navigation and package metadata',()=>{const b=epubBytes([]);expect(strFromU8(b.slice(30,38))).toBe('mimetype');const zip=unzipSync(b);expect(strFromU8(zip.mimetype)).toBe('application/epub+zip');expect(strFromU8(zip['EPUB/package.opf'])).toContain('Working Draft');expect(zip['META-INF/container.xml']).toBeTruthy();expect(zip['EPUB/nav.xhtml']).toBeTruthy()});
});

