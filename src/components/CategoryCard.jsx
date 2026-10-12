import ProductImage from './ui/ProductImage.jsx';
import Icon from './ui/Icon.jsx';

export default function CategoryCard({ category, count, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(category.id)}
      className="group flex w-full flex-col text-left focus-visible:outline-none"
      aria-label={`Shop ${category.name} — ${count} products`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-ivory-200 ring-1 ring-ivory-300/70 transition duration-300 group-hover:shadow-lift group-focus-visible:ring-2 group-focus-visible:ring-saffron-400 group-focus-visible:ring-offset-2">
        <div className="h-full w-full transition duration-500 ease-out group-hover:scale-105">
          <ProductImage image={category.image} art={category.art} tone={category.tone} alt="" />
        </div>
        <span className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-ivory-50 text-maroon-800 opacity-0 shadow-sm transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Icon name="arrowRight" size={16} />
        </span>
      </div>
      <h3 className="mt-3.5 font-serif text-lg font-semibold leading-tight text-ink-900 transition group-hover:text-maroon-700 sm:text-xl">{category.name}</h3>
      <p className="mt-1 text-[13px] text-ink-500">
        {category.blurb}
        <span className="text-ink-300"> · {count} {count === 1 ? 'item' : 'items'}</span>
      </p>
    </button>
  );
}
