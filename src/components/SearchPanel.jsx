import { useEffect, useMemo, useRef, useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { products } from '../data/products.js';
import { categoryById } from '../data/categories.js';
import { formatPrice } from '../data/store.js';
import { matchesQuery } from '../lib/search.js';
import Icon from './ui/Icon.jsx';
import ProductImage from './ui/ProductImage.jsx';

const SUGGESTIONS = ['Sandalwood', 'Camphor', 'Diya', 'Kumkum', 'Pooja kit'];

export default function SearchPanel({ open, onClose }) {
  const { goToShop } = useStore();
  const [q, setQ] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    inputRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const results = useMemo(() => (q.trim() ? products.filter((p) => matchesQuery(p, q)).slice(0, 5) : []), [q]);

  const submit = (query) => {
    goToShop({ query, category: 'all' });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="absolute inset-x-0 top-full z-40 border-b border-ivory-300 bg-ivory-50 shadow-lift animate-fade-up">
      <div className="mx-auto max-w-3xl px-4 py-5 sm:py-6">
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            submit(q.trim());
          }}
          className="flex items-center gap-3 rounded-full border border-ivory-300 bg-white px-4 focus-within:border-saffron-400 focus-within:ring-2 focus-within:ring-saffron-400/30"
        >
          <Icon name="search" className="text-ink-500" />
          <label htmlFor="site-search" className="sr-only">
            Search products
          </label>
          <input
            ref={inputRef}
            id="site-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search agarbathi, camphor, diyas…"
            autoComplete="off"
            className="h-12 flex-1 bg-transparent text-[15px] text-ink-900 placeholder:text-ink-300 focus:outline-none"
          />
          <button type="button" onClick={onClose} className="rounded-full p-1.5 text-ink-500 hover:bg-ivory-200 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400" aria-label="Close search">
            <Icon name="x" size={18} />
          </button>
        </form>

        {!q.trim() && (
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-ink-500">Popular:</span>
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" onClick={() => setQ(s)} className="rounded-full border border-ivory-300 bg-white px-3 py-1 text-ink-700 transition hover:border-gold-400 hover:text-maroon-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400">
                {s}
              </button>
            ))}
          </div>
        )}

        {q.trim() && (
          <div className="mt-3" aria-live="polite">
            {results.length === 0 ? (
              <p className="px-2 py-4 text-sm text-ink-500">No products match “{q}”. Try “agarbathi” or “diya”.</p>
            ) : (
              <ul className="divide-y divide-ivory-200">
                {results.map((p) => (
                  <li key={p.id}>
                    <button type="button" onClick={() => submit(p.name)} className="flex w-full items-center gap-4 rounded-lg px-2 py-2.5 text-left transition hover:bg-ivory-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400">
                      <span className="h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                        <ProductImage image={p.image} art={p.art} variant={p.variant} tone={p.tone} alt="" />
                      </span>
                      <span className="flex-1">
                        <span className="block font-medium text-ink-900">{p.name}</span>
                        <span className="block text-xs text-ink-500">{categoryById[p.category]?.name}</span>
                      </span>
                      <span className="text-sm font-semibold text-ink-900">{formatPrice(p.price)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button type="button" onClick={() => submit(q.trim())} className="mt-2 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-semibold text-maroon-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400">
              View all results in shop <Icon name="arrowRight" size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
