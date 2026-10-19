import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('out');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const files=walk(root).filter(f=>f.endsWith('.html'));
assert(files.length>5,'Expected exported article and tag pages');
const failures=[];
for(const file of files){
 const html=fs.readFileSync(file,'utf8');
 for(const match of html.matchAll(/(?:href|src)="([^"#?]+)[^"]*"/g)){
  const href=match[1];if(!href.startsWith('/')||href.startsWith('//'))continue;
  const target=path.join(root,decodeURIComponent(href).split('?')[0]);
  if(!fs.existsSync(target)&&!fs.existsSync(path.join(target,'index.html')))failures.push(`${path.relative(root,file)} -> ${href}`);
 }
}
assert.deepEqual(failures,[],'Broken local links or assets');
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert(home.includes('maxge.dev'),'Missing domain branding');
assert(home.includes('保持好奇'),'Missing Chinese homepage');
assert(!home.includes('项目名称'),'Placeholder project remains');
assert(fs.readFileSync(path.join(root,'sitemap.xml'),'utf8').includes('https://maxge.dev/blog/'),'Missing article sitemap');
assert(fs.readFileSync(path.join(root,'robots.txt'),'utf8').includes('https://maxge.dev/sitemap.xml'),'Incorrect robots sitemap');
console.log(`PASS: ${files.length} HTML pages, internal links/assets, homepage branding, sitemap and robots`);
const resume=fs.readFileSync(path.join(root,'resume/index.html'),'utf8');
for(const expected of ['葛雨欣','VTLAB Limited','香港恒生大学','AWS Certified AI Practitioner','Early Adopter','mailto:ge19990821@gmail.com','resume-experience','resume-projects','resume-education','resume-skills','resume-certification'])assert(resume.includes(expected),`Missing resume content: ${expected}`);
assert(!resume.includes('TJJM20240312023511'),'Excluded certificate must not be published');
assert(!files.some(f=>/TJJM20240312023511/.test(f)),'Excluded certificate must not be exported');
console.log('PASS: resume sections, experience, education, certification and contact');
const essays=fs.readFileSync(path.join(root,'essays/index.html'),'utf8');
assert(essays.includes('随笔')&&essays.includes('第一篇随笔还在酝酿中'),'Essays page should show its empty state');
assert(home.includes('/essays/'),'Homepage should link to essays');
assert(resume.includes('>m.</div>'),'Resume monogram should match homepage');
console.log('PASS: essays page, navigation and resume monogram');
