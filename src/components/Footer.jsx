import { useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { categories } from '../data/categories.js';
import { navLinks } from '../data/content.js';
import { store, whatsappLink } from '../data/store.js';
import Logo from './ui/Logo.jsx';
import Icon, { WhatsAppIcon } from './ui/Icon.jsx';
import PolicyDialog from './PolicyDialog.jsx';

const linkCls = 'rounded-sm text-ivory-200/75 transition hover:text-ivory-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400';

function Col({ title, children }) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-300">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  );
}

export default function Footer() {
  const { goToShop } = useStore();
  const [policy, setPolicy] = useState(null);

  return (
    <footer className="bg-maroon-950 text-ivory-100">
      <div className="mx-auto max-w-site px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1.3fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory-200/70">{store.description}</p>
            <div className="mt-6 flex gap-2">
              {[
                ['instagram', 'Instagram', store.social.instagram],
                ['facebook', 'Facebook', store.social.facebook],
              ].map(([icon, label, href]) => (
                <a key={icon} href={href} aria-label={`${label} (placeholder link)`} className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory-50/15 text-ivory-200 transition hover:border-gold-400 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400">
                  <Icon name={icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          <Col title="Quick links">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className={linkCls}
                  onClick={(e) => {
                    if (l.category) {
                      e.preventDefault();
                      goToShop({ category: l.category, query: '' });
                    }
                  }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </Col>

          <Col title="Categories">
            {categories.map((c) => (
              <li key={c.id}>
                <button type="button" className={`${linkCls} text-left`} onClick={() => goToShop({ category: c.id, query: '' })}>
                  {c.name}
                </button>
              </li>
            ))}
          </Col>

          <Col title="Visit / contact">
            <li className="flex gap-3 text-ivory-200/75">
              <Icon name="pin" size={18} className="mt-0.5 text-gold-400" />
              <address className="not-italic leading-relaxed">
                {store.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </li>
            <li className="flex gap-3 text-ivory-200/75">
              <Icon name="phone" size={18} className="text-gold-400" /> {store.phoneDisplay}
            </li>
            <li className="flex gap-3 text-ivory-200/75">
              <Icon name="mail" size={18} className="text-gold-400" />
              <a href={`mailto:${store.email}`} className={linkCls}>
                {store.email}
              </a>
            </li>
            <li className="flex gap-3 text-ivory-200/75">
              <Icon name="clock" size={18} className="text-gold-400" /> {store.hours}
            </li>
            <li className="pt-2">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full bg-[#1E7B4C] px-5 text-sm font-semibold text-white transition hover:bg-[#186a41] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 focus-visible:ring-offset-2 focus-visible:ring-offset-maroon-950">
                <WhatsAppIcon size={18} /> Chat on WhatsApp
              </a>
            </li>
          </Col>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ivory-50/10 pt-6 text-xs text-ivory-200/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {store.name}. Frontend demo — products, prices, reviews and contact details are placeholders.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {['Privacy Policy', 'Terms of Service', 'Return Policy'].map((p) => (
              <li key={p}>
                <button type="button" onClick={() => setPolicy(p)} className={`${linkCls} text-ivory-200/70`}>
                  {p}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <PolicyDialog title={policy} onClose={() => setPolicy(null)} />
    </footer>
  );
}
