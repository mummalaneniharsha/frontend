import { testimonials } from '../data/content.js';
import SectionHeading from './ui/SectionHeading.jsx';

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="relative overflow-hidden bg-maroon-900 py-16 text-ivory-50 md:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(#E2C88E 1px, transparent 1px)', backgroundSize: '22px 22px' }} aria-hidden="true" />
      <div className="relative mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="testimonials-title"
          light
          eyebrow="Kind words"
          title="From Our Customers"
          description="Sample testimonials for demonstration only — these will be replaced with genuine customer feedback."
        />
        <ul className="grid gap-5 md:grid-cols-3 md:gap-6">
          {testimonials.map((t, i) => (
            <li key={i}>
              <figure className="flex h-full flex-col rounded-2xl border border-gold-400/25 bg-maroon-800/50 p-7 backdrop-blur-sm">
                <span className="font-serif text-6xl leading-none text-gold-400/70" aria-hidden="true">
                  “
                </span>
                <blockquote className="-mt-4 flex-1 font-serif text-[1.3rem] italic leading-snug text-ivory-100">{t.quote}</blockquote>
                <figcaption className="mt-6 flex items-center justify-between gap-3 border-t border-ivory-50/10 pt-4 text-sm">
                  <span>
                    <span className="block font-semibold text-ivory-50">{t.name}</span>
                    <span className="text-ivory-200/60">{t.place}</span>
                  </span>
                  <span className="rounded-full border border-gold-400/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-300">Sample</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
