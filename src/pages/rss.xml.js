import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const relatos = await getCollection('relatos', ({ data }) => !data.draft);
  const sorted = relatos.sort((a, b) => {
    const dateA = a.data.date || '0';
    const dateB = b.data.date || '0';
    return dateB.localeCompare(dateA);
  });

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
        link: `/relatos/${entry.slug}/`,
      };
    });

  return rss({
    title: 'DigettNotes+',
    description: 'Notas mentales y relatos de Dr. Digett',
    site: context.site,
    items: items,
    customData: '<language>es-pe</language>',
  });
}
