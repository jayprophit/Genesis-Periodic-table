import {renderToStaticMarkup} from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {zipSync,strToU8} from 'fflate';
import {Chapter} from './data-loader';
export function download(name:string,text:string|Uint8Array,type:string){const blob=new Blob([typeof text==='string'?text:new Uint8Array(text).buffer as ArrayBuffer],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
const esc=(v:string)=>v.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
function content(c:Chapter,body:string){return renderToStaticMarkup(<><h1>MAT working draft</h1><p>Unreviewed edition. Unresolved citations: {c.missingSources.join(', ')||'none detected in this chapter'}. Scientific and rights review required.</p><ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml components={{img:({alt})=><p>[Figure: {alt||'description unavailable'}. See canonical web edition.]</p>,a:({href,children})=>href&&/^https?:/.test(href)?<a href={href}>{children}</a>:<span>{children}</span>}}>{body}</ReactMarkdown></>)}
const css='body{font-family:Georgia,serif;line-height:1.6;margin:2em;color:#17242a;background:white}h1,h2,h3{font-family:system-ui,sans-serif}table{border-collapse:collapse;width:100%}th,td{border:1px solid #aaa;padding:.4em;text-align:left}pre{white-space:pre-wrap;overflow-wrap:anywhere}img{max-width:100%}';
export function exportHTML(c:Chapter,body:string){download((c.mat||'MAT').replace(':','-')+'-draft.html','<!doctype html><html lang="en"><meta charset="utf-8"><title>'+esc(c.title)+'</title><style>'+css+'</style><body>'+content(c,body)+'</body></html>','text/html')}
export function epubBytes(chapters:Chapter[]):Uint8Array{
 const entries:Parameters<typeof zipSync>[0]={mimetype:[strToU8('application/epub+zip'),{level:0}]};
 const xml='<?xml version="1.0" encoding="UTF-8"?>';
 entries['META-INF/container.xml']=strToU8(xml+'<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="EPUB/package.opf" media-type="application/oebps-package+xml"/></rootfiles></container>');
 entries['EPUB/style.css']=strToU8(css);
 const items:string[]=[],refs:string[]=[],nav:string[]=[];
 chapters.forEach((c,i)=>{const id='chapter'+i;entries['EPUB/'+id+'.xhtml']=strToU8(xml+'<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en"><head><title>'+esc(c.title)+'</title><link rel="stylesheet" type="text/css" href="style.css"/></head><body>'+content(c,c.body)+'</body></html>');items.push('<item id="'+id+'" href="'+id+'.xhtml" media-type="application/xhtml+xml"/>');refs.push('<itemref idref="'+id+'"/>');nav.push('<li><a href="'+id+'.xhtml">'+esc(c.title)+'</a></li>')});
 entries['EPUB/nav.xhtml']=strToU8(xml+'<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="en" xml:lang="en"><head><title>Contents</title></head><body><nav epub:type="toc" id="toc"><h1>MAT working draft</h1><ol>'+nav.join('')+'</ol></nav></body></html>');
 entries['EPUB/package.opf']=strToU8(xml+'<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="uid"><metadata xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:identifier id="uid">urn:mat:working-draft:'+Date.now()+'</dc:identifier><dc:title>Materials Atlas Table Codex — Working Draft</dc:title><dc:language>en</dc:language><meta property="dcterms:modified">'+new Date().toISOString().replace(/\.\d{3}Z$/,'Z')+'</meta></metadata><manifest><item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/><item id="css" href="style.css" media-type="text/css"/>'+items.join('')+'</manifest><spine>'+refs.join('')+'</spine></package>');
 return zipSync(entries,{level:6});
}
export function exportEPUB(chapters:Chapter[]){download('MAT-118-elements-WORKING-DRAFT.epub',epubBytes(chapters),'application/epub+zip')}

