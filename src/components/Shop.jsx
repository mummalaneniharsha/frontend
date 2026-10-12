import { useMemo } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { products } from '../data/products.js';
import { categories, categoryById } from '../data/categories.js';

const catIndex = Object.fromEntries(categories.map((c, i) => [c.id, i]));
import { matchesQuery } from '../lib/search.js';
import SectionHeading from './ui/SectionHeading.jsx';
import ProductCard from './ProductCard.jsx';
import Icon from './ui/Icon.jsx';
import Button from './ui/Button.jsx';

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
  { id: 'discount', label: 'Biggest Discount' },
];

const discount = (p) => (p.mrp ? (p.mrp - p.price) / p.mrp : 0);

const sorters = {
  featured: (a, b) => catIndex[a.category] - catIndex[b.category] || Number(!!b.bestseller) - Number(!!a.bestseller),
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
  discount: (a, b) => discount(b) - discount(a),
};

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 focus-visible:ring-offset-1 active:scale-[0.98] ${
        active ? 'border-maroon-800 bg-maroon-800 text-ivory-50' : 'border-ivory-300 bg-white text-ink-700 hover:border-gold-400 hover:text-maroon-800'
      }`}
    >
      {children}
    </button>
  );
}

export default function Shop() {
  const { filters, setFilters, wishlist } = useStore();
  const { category, query, sort, wishlistOnly } = filters;
  const set = (patch) => setFilters((f) => ({ ...f, ...patch }));

  const results = useMemo(() => {
    const list = products.filter(
      (p) =>
        (category === 'all' || p.category === category) &&
        (!wishlistOnly || wishlist.includes(p.id)) &&
        matchesQuery(p, query),
    );
    return [...list].sort(sorters[sort] || sorters.featured);
  }, [category, query, sort, wishlistOnly, wishlist]);

  const active = category !== 'all' || query || wishlistOnly;
  const reset = () => setFilters({ category: 'all', query: '', sort: 'featured', wishlistOnly: false });

  return (
    <section id="shop" aria-labelledby="shop-title" className="scroll-mt-16 border-t border-ivory-300/70 bg-ivory-50 py-16 md:py-24">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="shop-title"
          align="left"
          eyebrow="The collection"
          title={wishlistOnly ? 'Your Wishlist' : category === 'all' ? 'Shop All' : categoryById[category]?.name}
          description="Filter by category, search by name, and sort by price or rating. All products, prices and ratings are sample data."
        />

        {/* Toolbar */}
        <div className="flex flex-col gap-4 border-b border-ivory-300 pb-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <label htmlFor="shop-search" className="sr-only">
                Search the shop
              </label>
              <Icon name="search" size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-500" />
              <input
                id="shop-search"
                type="search"
                value={query}
                onChange={(e) => set({ query: e.target.value })}
                placeholder="Search products…"
                className="h-11 w-full rounded-full border border-ivory-300 bg-white pl-11 pr-4 text-[15px] text-ink-900 placeholder:text-ink-300 focus:border-saffron-400 focus:outline-none focus:ring-2 focus:ring-saffron-400/30"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => set({ wishlistOnly: !wishlistOnly })}
                aria-pressed={wishlistOnly}
                className={`flex h-11 items-center gap-2 rounded-full border px-4 text-[13px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 ${
                  wishlistOnly ? 'border-maroon-800 bg-maroon-100/70 text-maroon-800' : 'border-ivory-300 bg-white text-ink-700 hover:border-gold-400'
                }`}
              >
                <Icon name="heart" size={16} className={wishlistOnly ? 'fill-current' : ''} /> Saved ({wishlist.length})
              </button>
              <div className="relative flex-1 md:flex-none">
                <label htmlFor="shop-sort" className="sr-only">
                  Sort products
                </label>
                <select
                  id="shop-sort"
                  value={sort}
                  onChange={(e) => set({ sort: e.target.value })}
                  className="h-11 w-full cursor-pointer appearance-none rounded-full border border-ivory-300 bg-white pl-4 pr-10 text-[13px] font-medium text-ink-700 focus:border-saffron-400 focus:outline-none focus:ring-2 focus:ring-saffron-400/30 md:w-52"
                >
                  {SORTS.map((s) => (
                    <option key={s.id} value={s.id}>
                      Sort: {s.label}
                    </option>
                  ))}
                </select>
                <Icon name="chevronDown" size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-500" />
              </div>
            </div>
          </div>

          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter by category">
            <Chip active={category === 'all'} onClick={() => set({ category: 'all' })}>
              All
            </Chip>
            {categories.map((c) => (
              <Chip key={c.id} active={category === c.id} onClick={() => set({ category: c.id })}>
                {c.name}
              </Chip>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between py-4 text-sm text-ink-500" aria-live="polite">
          <p>
            Showing <span className="font-semibold text-ink-900">{results.length}</span> {results.length === 1 ? 'product' : 'products'}
            {query && (
              <>
                {' '}
                for “<span className="text-ink-900">{query}</span>”
              </>
            )}
          </p>
          {active && (
            <button type="button" onClick={reset} className="rounded-md px-1 font-semibold text-maroon-800 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400">
              Clear filters
            </button>
          )}
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-gold-300 bg-ivory-100 px-6 py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ivory-50 text-gold-500 ring-1 ring-gold-300">
              <Icon name={wishlistOnly ? 'heart' : 'search'} size={24} />
            </span>
            <h3 className="mt-5 font-serif text-2xl font-semibold text-ink-900">{wishlistOnly ? 'Nothing saved yet' : 'No products found'}</h3>
            <p className="mt-2 max-w-sm text-sm text-ink-500">
              {wishlistOnly ? 'Tap the heart on any product to save it here.' : 'Try a different word, or browse all categories. You can also ask us on WhatsApp.'}
            </p>
            <Button variant="outline" className="mt-6" onClick={reset}>
              Show all products
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
