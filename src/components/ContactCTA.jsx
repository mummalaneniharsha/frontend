import { useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { store, whatsappLink } from '../data/store.js';
import Button from './ui/Button.jsx';
import Icon, { WhatsAppIcon } from './ui/Icon.jsx';

export default function ContactCTA() {
  const { toast } = useStore();
  const [email, setEmail] = useState('');

  const subscribe = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast('Please enter a valid email address.');
      return;
    }
    setEmail('');
    toast('Thank you! You are on the list (demo — nothing is stored).', { kind: 'cart' });
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 bg-ivory-100 py-16 md:py-24">
      <div className="mx-auto grid max-w-site gap-5 px-4 sm:px-6 md:grid-cols-2 lg:gap-6 lg:px-8">
        <div className="flex flex-col rounded-[28px] bg-ivory-50 p-7 shadow-soft ring-1 ring-ivory-300 sm:p-10">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1E7B4C]/10 text-[#1E7B4C]">
            <WhatsAppIcon size={24} />
          </span>
          <h2 id="contact-title" className="mt-5 font-serif text-3xl font-semibold leading-tight text-maroon-900 sm:text-[2.3rem]">
            Have a question? Ask us on WhatsApp
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
            Not sure which fragrance to choose, or need items for a specific pooja? Send us a message and we will help you put it together.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button variant="whatsapp" size="lg" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={18} /> Enquire on WhatsApp
            </Button>
            <span className="flex items-center gap-2 text-sm text-ink-500">
              <Icon name="phone" size={16} /> {store.phoneDisplay}
            </span>
          </div>
          <p className="mt-4 text-xs text-ink-300">Placeholder contact number — the store&apos;s WhatsApp number will be added before launch.</p>
        </div>

        <div className="relative flex flex-col justify-center overflow-hidden rounded-[28px] bg-maroon-900 p-7 text-ivory-50 sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-saffron-500/20 blur-3xl" aria-hidden="true" />
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-ivory-50/10 text-gold-300">
            <Icon name="mail" size={22} />
          </span>
          <h2 className="relative mt-5 font-serif text-3xl font-semibold leading-tight sm:text-[2.3rem]">Festival reminders & new arrivals</h2>
          <p className="relative mt-3 text-[15px] leading-relaxed text-ivory-200/80">
            Get a gentle note before major festivals, along with new fragrances and kits. No spam — unsubscribe any time.
          </p>
          <form onSubmit={subscribe} className="relative mt-7 flex flex-col gap-3 sm:flex-row" noValidate>
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              autoComplete="email"
              className="h-12 flex-1 rounded-full border border-ivory-50/20 bg-ivory-50/10 px-5 text-[15px] text-ivory-50 placeholder:text-ivory-200/50 focus:border-saffron-400 focus:outline-none focus:ring-2 focus:ring-saffron-400/40"
            />
            <Button type="submit" variant="saffron" size="lg">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
