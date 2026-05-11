import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const frasesPath = join(__dirname, '..', 'frases.html');
const outputDir = join(__dirname, '..', 'src', 'content', 'notas');

mkdirSync(outputDir, { recursive: true });

const html = readFileSync(frasesPath, 'utf-8');

// Remove HTML comments first to avoid matching commented-out articles
const cleanHtml = html.replace(/<!--[\s\S]*?-->/g, '');

// Extract all article blocks
const articleRegex = /<article[^>]*>([\s\S]*?)<\/article>/g;
let match;
let index = 0;

while ((match = articleRegex.exec(cleanHtml)) !== null) {
  const articleContent = match[1].trim();
  if (!articleContent) continue;
  
  
  // Extract text content and remove HTML
  let cleanContent = articleContent;

  // Fix relative image paths - add leading /
  cleanContent = cleanContent.replace(/src="\.\//g, 'src="/');
  
  // Extract links
  cleanContent = cleanContent.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, '[$2]($1)');
  
  // Extract images
  cleanContent = cleanContent.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/g, '\n![$2]($1)\n');
  cleanContent = cleanContent.replace(/<img[^>]*src="([^"]*)"[^>]*>/g, '\n![]($1)\n');
  
  // Extract video
  cleanContent = cleanContent.replace(/<video[^>]*>[\s\S]*?<\/video>/g, '');
  cleanContent = cleanContent.replace(/<source[^>]*>/g, '');
  
  // Extract iframes
  cleanContent = cleanContent.replace(/<iframe[^>]*src="([^"]*)"[^>]*>[\s\S]*?<\/iframe>/g, '\n[$1]($1)\n');
  
  // Convert <br>
  cleanContent = cleanContent.replace(/<br\s*\/?>/g, '\n');
  
  // Remove <p> tags
  cleanContent = cleanContent.replace(/<p[^>]*>([\s\S]*?)<\/p>/g, '$1\n');
  
  // Remove remaining HTML
  cleanContent = cleanContent.replace(/<[^>]+>/g, '');
  
  // Decode entities
  cleanContent = cleanContent.replace(/&nbsp;/g, ' ');
  cleanContent = cleanContent.replace(/&amp;/g, '&');
  cleanContent = cleanContent.replace(/&lt;/g, '<');
  cleanContent = cleanContent.replace(/&gt;/g, '>');
  cleanContent = cleanContent.replace(/&quot;/g, '"');
  cleanContent = cleanContent.replace(/&#39;/g, "'");
  
  // Clean up
  cleanContent = cleanContent.trim();
  if (!cleanContent) continue;
  
  // Clean up excessive blank lines
  cleanContent = cleanContent.replace(/\n{4,}/g, '\n\n\n');
  
  // Extract first line as title hint, or generate
  const firstLine = cleanContent.split('\n')[0].substring(0, 60).trim();
  const slug = `nota-${String(++index).padStart(3, '0')}`;
  
  const md = [
    '---',
    `title: "${(firstLine || 'Nota').replace(/"/g, '\\"')}"`,
    '---',
    '',
    cleanContent
  ].join('\n');
  
  writeFileSync(join(outputDir, `${slug}.md`), md);
  console.log(`✓ ${slug}.md`);
}

console.log(`\n✅ Migrated ${index} notas to Markdown`);
