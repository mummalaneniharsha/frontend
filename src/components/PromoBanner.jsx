import { useStore } from '../context/StoreContext.jsx';
import { store } from '../data/store.js';
import ProductImage from './ui/ProductImage.jsx';
import Button from './ui/Button.jsx';
import Icon from './ui/Icon.jsx';

const essentials = ['Agarbathi', 'Camphor', 'Kumkum & haldi', 'Cotton wicks', 'Deepam oil', 'Dhoop'];

export default function PromoBanner() {
  const { goToShop } = useStore();
  return (
    <section aria-labelledby="promo-title" className="bg-ivory-100 pb-16 md:pb-24">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-[28px] bg-saffron-100 ring-1 ring-gold-300/60 md:grid-cols-2">
          <div className="relative flex flex-col justify-center px-6 py-10 sm:px-10 md:py-14 lg:px-14">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-600">Daily pooja essentials</p>
            <h2 id="promo-title" className="mt-3 font-serif text-[2rem] font-semibold leading-[1.08] text-maroon-900 sm:text-[2.6rem]">
              Everything You Need for Your Daily Pooja
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-700">Shop essential items for your sacred daily rituals — restock in a few taps, or pick up our ready Daily Pooja Kit.</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {essentials.map((e) => (
                <li key={e} className="rounded-full border border-gold-400/50 bg-ivory-50/70 px-3 py-1 text-[12.5px] text-ink-700">
                  {e}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => goToShop({ category: 'kits', query: '' })}>
                Explore Essentials <Icon name="arrowRight" size={16} />
              </Button>
              <Button variant="ghost" href="#categories">
                Browse categories
              </Button>
            </div>
          </div>
          <div className="relative min-h-[280px] md:min-h-[440px]">
            <div className="absolute inset-0">
              <ProductImage image={store.promoImage} art="thali" tone="gold" alt="Daily pooja samagri: chandan, betel leaves and nuts, sacred thread, cotton wicks and rice in brass bowls" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
