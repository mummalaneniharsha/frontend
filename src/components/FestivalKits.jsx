import { useStore } from '../context/StoreContext.jsx';
import { festivals } from '../data/content.js';
import { productById } from '../data/products.js';
import Art from '../art/Art.jsx';
import SectionHeading from './ui/SectionHeading.jsx';
import Button from './ui/Button.jsx';
import Icon from './ui/Icon.jsx';
import Price from './ui/Price.jsx';
import ProductImage from './ui/ProductImage.jsx';

const featuredKit = productById['festival-kit'];
const dailyKit = productById['daily-pooja-kit'];

export default function FestivalKits() {
  const { addToCart, goToShop } = useStore();

  return (
    <section id="kits" aria-labelledby="kits-title" className="scroll-mt-20 bg-ivory-50 py-16 md:py-24">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="kits-title"
          eyebrow="Pooja kits & seasonal essentials"
          title="Ready for Every Festival"
          description="Curated kits that bring every item for the pooja together in one box — plus seasonal collections as each festival approaches."
        />

        <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr] lg:gap-6">
          {/* Feature kit */}
          <article className="relative flex flex-col justify-end overflow-hidden rounded-[28px] bg-maroon-950 text-ivory-50 lg:min-h-[600px]">
            <div className="relative aspect-[5/4] lg:absolute lg:inset-x-0 lg:top-0 lg:aspect-auto lg:h-[66%]">
              {featuredKit.image ? (
                <ProductImage image={featuredKit.image} art="kit" variant="saffron" tone="maroon" alt={featuredKit.name} />
              ) : (
                <Art kind="kit" variant="saffron" tone="maroon" viewBox="20 110 360 290" title="Festival pooja essentials gift box" />
              )}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-maroon-950" aria-hidden="true" />
            </div>
            <div className="relative -mt-10 p-6 pt-0 sm:p-9 sm:pt-0 lg:mt-0 lg:pt-9">
              <span className="inline-block rounded-full bg-saffron-500 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-maroon-950">Festival edition</span>
              <h3 className="mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl">{featuredKit.name}</h3>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ivory-200/85">
                Agarbathi, dhoop, camphor, kumkum, haldi, chandan, cotton wicks, deepam oil, clay diyas and more — {featuredKit.size}.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <div className="rounded-full bg-ivory-50 px-4 py-2 [&_*]:!text-[15px]">
                  <Price price={featuredKit.price} mrp={featuredKit.mrp} />
                </div>
                <Button variant="saffron" onClick={() => addToCart(featuredKit.id)}>
                  <Icon name="bag" size={16} /> Add Kit to Cart
                </Button>
              </div>
            </div>
          </article>

          <div className="flex flex-col gap-5 lg:gap-6">
            {festivals.map((f) => (
              <article key={f.id} className="group grid grid-cols-[112px_1fr] overflow-hidden rounded-2xl border border-ivory-300/80 bg-white shadow-soft transition hover:shadow-lift sm:grid-cols-[168px_1fr]">
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 transition duration-500 group-hover:scale-105">
                    <Art kind={f.art} variant={f.variant} tone={f.tone} />
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-gold-600">{f.note}</p>
                  <h3 className="mt-1 font-serif text-2xl font-semibold text-maroon-900">{f.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{f.text}</p>
                  <button
                    type="button"
                    onClick={() => goToShop({ category: f.category, query: '' })}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-md text-[13px] font-semibold text-maroon-800 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400"
                  >
                    Shop {f.name} essentials <Icon name="arrowRight" size={15} />
                  </button>
                </div>
              </article>
            ))}
            <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-saffron-100 p-5 ring-1 ring-gold-300/60 sm:flex-row sm:items-center sm:p-6">
              <div>
                <p className="font-serif text-xl font-semibold text-maroon-900">{dailyKit.name}</p>
                <p className="text-sm text-ink-700">{dailyKit.size} — for everyday rituals</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => addToCart(dailyKit.id)}>
                Add · ₹{dailyKit.price}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
