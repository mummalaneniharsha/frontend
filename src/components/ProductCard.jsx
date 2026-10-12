import { useStore } from '../context/StoreContext.jsx';
import { categoryById } from '../data/categories.js';
import Icon from './ui/Icon.jsx';
import Price from './ui/Price.jsx';
import ProductImage from './ui/ProductImage.jsx';
import QuantityStepper from './ui/QuantityStepper.jsx';
import Rating from './ui/Rating.jsx';

export default function ProductCard({ product }) {
  const { addToCart, qtyOf, setQty, isWished, toggleWishlist } = useStore();
  const qty = qtyOf(product.id);
  const wished = isWished(product.id);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ivory-300/80 bg-white shadow-soft transition duration-300 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="relative aspect-square overflow-hidden bg-ivory-200">
        <div className="h-full w-full transition duration-500 ease-out group-hover:scale-[1.04]">
          <ProductImage image={product.image} art={product.art} variant={product.variant} tone={product.tone} alt={product.name} />
        </div>
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-ivory-50/95 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-maroon-800 shadow-sm">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={wished}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ivory-50/95 shadow-sm transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 active:scale-95 ${
            wished ? 'text-maroon-700' : 'text-ink-700 hover:text-maroon-700'
          }`}
        >
          <Icon name="heart" size={18} className={wished ? 'fill-current' : ''} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="truncate text-[10px] font-semibold uppercase tracking-[0.1em] text-gold-600 sm:text-[10.5px] sm:tracking-[0.16em]">{categoryById[product.category]?.name}</p>
        <h3 className="mt-1.5 font-serif text-[1.15rem] font-semibold leading-snug text-ink-900 sm:text-xl">{product.name}</h3>
        <p className="mt-0.5 text-xs text-ink-500">{product.size}</p>
        <Rating value={product.rating} count={product.reviews} className="mt-2.5" />
        <div className="mt-auto pt-3">
          <Price price={product.price} mrp={product.mrp} />
          <div className="mt-3.5">
            {qty > 0 ? (
              <div className="flex items-center justify-between gap-2">
                <QuantityStepper qty={qty} onChange={(q) => setQty(product.id, q)} label={product.name} />
                <span className="flex items-center gap-1 text-xs font-semibold text-[#1E7B4C]">
                  <Icon name="check" size={14} strokeWidth={2.4} /> In cart
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => addToCart(product.id)}
                className="flex h-10 w-full items-center justify-center gap-2 rounded-full border border-maroon-800 text-[13px] font-semibold tracking-wide text-maroon-800 transition hover:bg-maroon-800 hover:text-ivory-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 focus-visible:ring-offset-2 active:scale-[0.98]"
              >
                <Icon name="bag" size={16} /> Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
