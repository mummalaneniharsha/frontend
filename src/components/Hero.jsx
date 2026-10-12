import { useStore } from '../context/StoreContext.jsx';
import { productById } from '../data/products.js';
import { formatPrice } from '../data/store.js';
import HeroArt from '../art/HeroArt.jsx';
import Button from './ui/Button.jsx';
import Icon from './ui/Icon.jsx';

const featured = productById['sandalwood-agarbathi'];

const points = ['Hand-picked fragrances', 'Daily & festival essentials', 'Easy WhatsApp ordering'];

export default function Hero() {
  const { addToCart, goToShop } = useStore();

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-maroon-900 text-ivory-50">
      {/* faint texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(#E2C88E 1px, transparent 1px)', backgroundSize: '22px 22px' }} aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-saffron-500/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-site items-center gap-10 px-4 pb-14 pt-10 sm:px-6 md:pb-20 md:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="max-w-xl">
          <p className="mb-5 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-gold-300 sm:text-xs sm:tracking-[0.28em]">Agarbathi · Pooja Samagri · Festival Kits</p>
          <h1 id="hero-title" className="font-serif text-[2.75rem] font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.4rem]">
            Bring Home the Fragrance of <em className="font-medium text-saffron-300">Devotion</em>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ivory-200/85 sm:text-[17px]">
            Discover carefully selected agarbathies and pooja essentials for your everyday rituals and special occasions.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="saffron" size="lg" onClick={() => goToShop({ category: 'all', query: '' })}>
              Shop Collection <Icon name="arrowRight" size={17} />
            </Button>
            <Button variant="light" size="lg" href="#categories">
              Explore Pooja Essentials
            </Button>
          </div>
          <ul className="mt-10 flex flex-col gap-3 border-t border-ivory-50/10 pt-6 text-[13px] text-ivory-200/80 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {points.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rotate-45 bg-gold-400" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[460px] lg:max-w-none">
          <div className="absolute -inset-3 rounded-t-[999px] rounded-b-[28px] border border-gold-400/35 sm:-inset-4" aria-hidden="true" />
          <div className="relative aspect-[13/16] overflow-hidden rounded-t-[999px] rounded-b-[24px] shadow-2xl ring-1 ring-gold-400/40">
            <HeroArt />
          </div>

          {/* featured product chip */}
          <div className="absolute -bottom-5 left-3 right-3 flex items-center gap-3 rounded-2xl bg-ivory-50/95 p-3 pr-3 text-ink-900 shadow-lift ring-1 ring-ivory-300 backdrop-blur sm:left-auto sm:right-[-12px] sm:w-[300px] lg:-left-10 lg:right-auto">
            <div className="flex-1 pl-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-600">Bestseller</p>
              <p className="font-serif text-lg font-semibold leading-tight">{featured.name}</p>
              <p className="text-sm">
                <span className="font-bold">{formatPrice(featured.price)}</span> <span className="text-xs text-ink-500">· {featured.size.split('·')[0]}</span>
              </p>
            </div>
            <Button size="sm" onClick={() => addToCart(featured.id)} aria-label={`Add ${featured.name} to cart`}>
              <Icon name="plus" size={15} /> Add
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
