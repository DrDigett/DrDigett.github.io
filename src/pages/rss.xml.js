import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const relatos = await getCollection('relatos', ({ data }) => !data.draft);
  const articulos = await getCollection('articulos', ({ data }) => !data.draft);

  const all = [...relatos, ...articulos];
  const sorted = all.sort((a, b) => {
    const dateA = a.data.date || '0';
    const dateB = b.data.date || '0';
    return dateB.localeCompare(dateA);
  });

  function linkFor(entry) {
    if (entry.collection === 'relatos') return `/relatos/${entry.slug}/`;
    return `/articulos/${entry.slug}/`;
  }

  const items = sorted
    .filter((entry) => {
      if (!entry.data.date) return false;
      const parts = entry.data.date.split(/[\/-]/);
      if (parts.length !== 3) return false;
      let y = parts[2];
      if (y.length === 2) y = '20' + y;
      return !isNaN(new Date(`${y}-${parts[1]}-${parts[0]}`).getTime());
    })
    .map((entry) => {
      const parts = entry.data.date.split(/[\/-]/);
      let y = parts[2];
      if (y.length === 2) y = '20' + y;
      return {
        title: entry.data.title,
        pubDate: new Date(`${y}-${parts[1]}-${parts[0]}`),
        description: entry.data.description || '',
        link: linkFor(entry),
      };
    });

  return rss({
    title: 'DigettNotes+',
    description: 'Artículos y relatos de Dr. Digett',
    site: context.site,
    items: items,
    customData: '<language>es-pe</language>',
  });
}
