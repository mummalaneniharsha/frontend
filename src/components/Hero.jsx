import { useStore } from '../context/StoreContext.jsx';
import { productById } from '../data/products.js';
import { formatPrice, store } from '../data/store.js';
import HeroArt from '../art/HeroArt.jsx';
import Button from './ui/Button.jsx';
import Icon from './ui/Icon.jsx';

const featured = productById['sandalwood-agarbathi'];

const points = ['Hand-picked fragrances', 'Daily & festival essentials', 'Easy WhatsApp ordering'];

const heroAlt = 'A lit brass diya, incense sticks, kumkum and haldi bowls and marigolds on a pooja table';

function HeroVisual({ className = '' }) {
  return store.heroImage ? (
    <img src={store.heroImage} alt={heroAlt} fetchpriority="high" className={`h-full w-full object-cover ${className}`} />
  ) : (
    <HeroArt className={className} />
  );
}

function FeaturedChip({ className = '' }) {
  const { addToCart } = useStore();
  return (
    <div className={`flex items-center gap-3 rounded-2xl bg-ivory-50/95 p-3 text-ink-900 shadow-lift ring-1 ring-ivory-300 backdrop-blur ${className}`}>
      {featured.image && <img src={featured.image} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />}
      <div className="min-w-0 flex-1">
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
  );
}

export default function Hero() {
  const { goToShop } = useStore();

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-maroon-900 text-ivory-50">
      {/* Desktop: full-bleed photo with a left-side scrim so the headline stays readable */}
      <div className="absolute inset-0 hidden lg:block" aria-hidden="true">
        <HeroVisual className="object-[75%_50%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-950/90 via-maroon-950/60 via-45% to-transparent to-70%" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-maroon-950/40 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-site px-4 pb-12 pt-10 sm:px-6 md:pt-14 lg:flex lg:min-h-[640px] lg:items-center lg:px-8 lg:py-24 xl:min-h-[700px]">
        <div className="max-w-xl">
          <p className="mb-5 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-gold-300 sm:text-xs sm:tracking-[0.28em]">Agarbathi · Pooja Samagri · Festival Kits</p>
          <h1 id="hero-title" className="font-serif text-[2.75rem] font-semibold leading-[1.02] tracking-tight [text-shadow:0_2px_24px_rgba(46,10,13,0.45)] sm:text-6xl lg:text-[4.4rem]">
            Bring Home the Fragrance of <em className="font-medium text-saffron-300">Devotion</em>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ivory-200/90 sm:text-[17px]">
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
          <ul className="mt-10 flex flex-col gap-3 border-t border-ivory-50/15 pt-6 text-[13px] text-ivory-200/85 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {points.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rotate-45 bg-gold-400" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile & tablet: photo below the text */}
        <div className="relative mt-10 lg:hidden">
          <div className="aspect-[4/3] overflow-hidden rounded-[24px] ring-1 ring-gold-400/30 sm:aspect-[16/9]">
            <HeroVisual className="object-[80%_50%]" />
          </div>
          <FeaturedChip className="relative -mt-8 mx-3 sm:ml-auto sm:mr-6 sm:w-[340px]" />
        </div>

        <FeaturedChip className="absolute bottom-10 right-8 hidden w-[360px] lg:flex" />
      </div>
    </section>
  );
}
