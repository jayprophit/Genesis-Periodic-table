// Internal five-gate engineering score. Never label this as independent certification.
import {readFileSync,writeFileSync} from 'node:fs';
const benchmark=JSON.parse(readFileSync('data/quality/benchmark.json','utf8'));
const browsers=JSON.parse(readFileSync('data/quality/reader-browser-results.json','utf8'));
const specs=[];function visit(s){for(const x of s.specs||[])specs.push(x);for(const child of s.suites||[])visit(child);}for(const s of browsers.suites||[])visit(s);
const tests=specs.flatMap(s=>s.tests.map(t=>({title:s.title,project:t.projectName,status:t.results.at(-1)?.status})));
const successful=title=>['chromium','firefox','webkit'].every(project=>tests.some(t=>t.project===project&&t.title.includes(title)&&t.status==='passed'));
const validation=benchmark.checks.filter(c=>c.name!=='unit');
const gates=[
 {name:'Automated data and reader invariants',passed:benchmark.checks.some(c=>c.name==='unit'&&c.passed),evidence:'benchmark.json: unit'},
 {name:'Structural validation without errors or warnings',passed:validation.length>=8&&validation.every(c=>c.passed&&!(c.summary||[]).some(s=>/[1-9]\d* (?:error|warning)\(s\)/.test(s))),evidence:'benchmark.json: eight validation checks'},
 {name:'Local search latency budget',passed:benchmark.search.passed,evidence:`270 local samples; p95 ${benchmark.search.p95_ms} ms; target ${benchmark.search.budget_p95_ms} ms`},
 {name:'Reader content across three browser engines',passed:successful('reviewed Neon optics'),evidence:'reader-browser-results.json: Chromium, Firefox and WebKit'},
 {name:'Keyboard, cascading navigation and scoped automated accessibility',passed:successful('cascading contents'),evidence:'reader-browser-results.json: desktop/sidebar and mobile/cover scans; WCAG-tagged automated rules'}
];
const report={assessed_at:new Date().toISOString(),assessor:'Codex automated local assessment',rating_type:'INTERNAL-ENGINEERING-ACCEPTANCE',rubric_version:'1.0.0',method:'One star for each of five explicitly defined passing local gates; this rubric is project-specific, not an industry rating standard',stars:gates.filter(g=>g.passed).length,maximum_stars:5,gates,source_runs:{benchmark:benchmark.run_at,browsers:browsers.stats?.startTime},whole_product_rating:null,independent_rating:null,not_established:['Independent scientific review of all elements','Complete advanced engineering and material-state data for every element','Real-user performance and production load','Screen-reader testing with disabled readers','Tagged PDF and visual rights clearance','Independent industry certification or adoption rating']};
writeFileSync('data/quality/acceptance-rating.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
