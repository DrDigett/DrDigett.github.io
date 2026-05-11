import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const relatosDir = join(__dirname, '..', 'relatos');
const outputDir = join(__dirname, '..', 'src', 'content', 'relatos');

mkdirSync(outputDir, { recursive: true });

const files = readdirSync(relatosDir).filter(f => f.endsWith('.html') && f !== 'relato.html' && f !== 'relato_.html');

function extractMeta(html, tag, className) {
  const regex = new RegExp(`<${tag}[^>]*class="${className}"[^>]*>([\\s\\S]*?)<\\/${tag}>`);
  const match = html.match(regex);
  if (match) return match[1].trim();
  return '';
}

function extractTitle(html) {
  const containerMatch = html.match(/<div[^>]*class="titulo_container[^"]*"[^>]*>[\s\S]*?<h1>([\s\S]*?)<\/h1>/);
  if (containerMatch) {
    return containerMatch[1].replace(/\.\.\./g, '').trim();
  }
  const match = html.match(/<h1>([\s\S]*?)<\/h1>/);
  if (match) {
    return match[1].replace(/\.\.\./g, '').trim();
  }
  return 'Sin título';
}

function extractDate(html) {
  const match = html.match(/<h4>([\s\S]*?)<\/h4>/);
  if (match) {
    let date = match[1].replace(/<[^>]*>/g, '').trim();
    return date || 'Fecha desconocida';
  }
  return 'Fecha desconocida';
}

function extractImage(html) {
  const containerMatch = html.match(/<div[^>]*class="image_container[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<div[^>]*class="historia_container/);
  if (containerMatch) {
    const imgMatch = containerMatch[1].match(/<img[^>]*src="([^"]+)"/);
    if (imgMatch) return imgMatch[1];
  }
  const simpleImgMatch = html.match(/<div[^>]*class="image_container[^"]*"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"/);
  if (simpleImgMatch) return simpleImgMatch[1];
  return '';
}

function extractBody(html) {
  const match = html.match(/<div[^>]*class="historia_container[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<div\s+id="disqus_thread/);
  if (match) return match[1].trim();
  
  const match2 = html.match(/<div[^>]*class="historia_container[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<div\s+id="disqus/);
  if (match2) return match2[1].trim();

  const match3 = html.match(/<div[^>]*class="historia_container[^"]*"[^>]*>([\s\S]*?)<\/div>/);
  if (match3) return match3[1].trim();

  return '';
}

function htmlToMarkdown(html) {
  let md = html;
  
  // Remove HTML comments
  md = md.replace(/<!--[\s\S]*?-->/g, '');
  
  // Convert headings
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/g, '### $1');
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/g, '## $1');
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/g, '# $1');
  
  // Convert bold/italic
  md = md.replace(/<b>([\s\S]*?)<\/b>/g, '**$1**');
  md = md.replace(/<strong>([\s\S]*?)<\/strong>/g, '**$1**');
  md = md.replace(/<i>([\s\S]*?)<\/i>/g, '*$1*');
  md = md.replace(/<em>([\s\S]*?)<\/em>/g, '*$1*');
  
  // Convert images
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/g, '![$2]($1)');
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*>/g, '![]($1)');
  
  // Convert links
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, '[$2]($1)');
  
  // Convert <br>
  md = md.replace(/<br\s*\/?>/g, '\n');
  
  // Convert paragraphs
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/g, '$1\n\n');
  
  // Convert article and inciso containers
  md = md.replace(/<article[^>]*class="inciso__container"[^>]*>([\s\S]*?)<\/article>/g, '> $1\n\n');
  md = md.replace(/<article[^>]*>([\s\S]*?)<\/article>/g, '$1');
  md = md.replace(/<div[^>]*class="inciso__container"[^>]*>([\s\S]*?)<\/div>/g, '> $1\n\n');
  
  // Remove remaining divs (inline-styled ones)
  md = md.replace(/<div[^>]*style="[^"]*"[^>]*>([\s\S]*?)<\/div>/g, '$1');
  md = md.replace(/<div[^>]*>([\s\S]*?)<\/div>/g, '$1');
  
  // Remove nav elements inside body
  md = md.replace(/<nav[^>]*>[\s\S]*?<\/nav>/g, '');
  
  // Remove any remaining HTML tags
  md = md.replace(/<[^>]+>/g, '');
  
  // Decode HTML entities
  md = md.replace(/&nbsp;/g, ' ');
  md = md.replace(/&amp;/g, '&');
  md = md.replace(/&lt;/g, '<');
  md = md.replace(/&gt;/g, '>');
  md = md.replace(/&quot;/g, '"');
  md = md.replace(/&#39;/g, "'");
  
  // Clean up excessive blank lines
  md = md.replace(/\n{4,}/g, '\n\n\n');
  
  // Trim each line
  md = md.split('\n').map(l => l.trim()).join('\n');
  
  // Ensure paragraphs have proper spacing
  md = md.replace(/\n{3,}/g, '\n\n');
  
  return md.trim();
}

function slugify(filename) {
  return filename.replace(/\.html$/, '');
}

for (const file of files) {
  const html = readFileSync(join(relatosDir, file), 'utf-8');
  const slug = slugify(file);
  
  let title = extractTitle(html);
  let date = extractDate(html);
  let image = extractImage(html);
  let body = extractBody(html);
  
  // Clean up relative image paths for Markdown (from ../images/ to /images/)
  image = image.replace(/^\.\.\//, '/');
  
  // Fix image paths in body content
  body = body.replace(/src="\.\.\//g, 'src="/');
  
  // Clean up non-date dates
  if (date && !date.match(/[\d/]/) && date.length > 10) {
    date = '';
  }
  
  const bodyMd = htmlToMarkdown(body);
  
  const frontmatter = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `date: "${date}"`,
    image ? `image: "${image}"` : '',
    '---',
    '',
    bodyMd
  ].filter(Boolean).join('\n');
  
  writeFileSync(join(outputDir, `${slug}.md`), frontmatter);
  console.log(`✓ ${slug}.md`);
}

console.log(`\n✅ Migrated ${files.length} relatos to Markdown`);
