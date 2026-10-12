import { features } from '../data/content.js';
import { store } from '../data/store.js';
import Art from '../art/Art.jsx';
import Icon from './ui/Icon.jsx';
import { Ornament } from './ui/SectionHeading.jsx';

export default function WhyUs() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20 bg-ivory-100 py-16 md:py-24">
      <div className="mx-auto grid max-w-site gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-8">
        <div>
          <div className="relative mb-8 hidden aspect-[16/10] overflow-hidden rounded-[24px] ring-1 ring-gold-300/60 sm:block">
            <Art kind="incense" variant="sandal" tone="ivory" title="Sandalwood agarbathi in a wooden holder" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-600">About us</p>
          <h2 id="about-title" className="mt-3 font-serif text-[2rem] font-semibold leading-[1.1] text-maroon-900 sm:text-[2.6rem]">
            Why shop with {store.shortName}?
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-700">{store.description}</p>
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink-500">
            We keep our range focused, so choosing the right agarbathi or samagri feels simple — whether it is your morning deepam or a festival pooja for the whole family.
          </p>
          <Ornament className="mt-6" />
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {features.map((f) => (
            <li key={f.title} className="rounded-2xl border border-ivory-300/80 bg-ivory-50 p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift sm:p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-maroon-900 text-gold-300 ring-4 ring-maroon-100">
                <Icon name={f.icon} size={22} />
              </span>
              <h3 className="mt-5 font-serif text-xl font-semibold text-ink-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
