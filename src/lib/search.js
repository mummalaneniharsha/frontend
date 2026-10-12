import { categoryById } from '../data/categories.js';

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ');

/** Every word of the query must appear in the product's name, category, size or variant. */
export function matchesQuery(product, query) {
  const words = norm(query).split(/\s+/).filter(Boolean);
  if (!words.length) return true;
  const hay = norm(
    [product.name, categoryById[product.category]?.name, product.size, product.variant, product.badge].filter(Boolean).join(' '),
  );
  return words.every((w) => hay.includes(w) || (w.endsWith('s') && hay.includes(w.slice(0, -1))));
}
