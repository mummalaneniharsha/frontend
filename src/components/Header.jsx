import { useCallback, useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { navLinks } from '../data/content.js';
import { categories } from '../data/categories.js';
import { store, whatsappLink } from '../data/store.js';
import Logo from './ui/Logo.jsx';
import Icon, { WhatsAppIcon } from './ui/Icon.jsx';
import Drawer from './ui/Drawer.jsx';
import SearchPanel from './SearchPanel.jsx';

function IconButton({ label, onClick, children, badge, className = '', ...rest }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={badge ? `${label} (${badge})` : label}
      className={`relative flex h-10 w-10 items-center justify-center rounded-full text-ink-900 transition hover:bg-ivory-200 hover:text-maroon-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 active:scale-95 ${className}`}
      {...rest}
    >
      {children}
      {badge > 0 && (
        <span className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-saffron-500 px-1 text-[10px] font-bold leading-none text-maroon-950 ring-2 ring-ivory-50">
          {badge}
        </span>
      )}
    </button>
  );
}

export default function Header() {
  const { cartCount, setCartOpen, wishlist, goToShop, toast, setFilters } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const onNav = (e, link) => {
    setMenuOpen(false);
    if (link.category) {
      e.preventDefault();
      goToShop({ category: link.category, query: '' });
    }
  };

  const showWishlist = () => {
    if (!wishlist.length) {
      toast('Your wishlist is empty — tap the heart on any product to save it.');
      return;
    }
    setFilters((f) => ({ ...f, wishlistOnly: true, category: 'all', query: '' }));
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`sticky top-0 z-50 border-b bg-ivory-50/95 backdrop-blur transition-shadow ${scrolled ? 'border-ivory-300 shadow-soft' : 'border-ivory-300/60'}`}>
      <div className="mx-auto flex h-[68px] max-w-site items-center gap-3 px-4 sm:px-6 lg:h-[76px] lg:px-8">
        <IconButton label="Open menu" onClick={() => setMenuOpen(true)} className="-ml-2 lg:hidden" aria-expanded={menuOpen} aria-controls="mobile-menu">
          <Icon name="menu" size={22} />
        </IconButton>

        <Logo />

        <nav aria-label="Main" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={(e) => onNav(e, l)}
                  className="relative rounded-md px-2.5 py-2 text-[13.5px] font-medium text-ink-700 transition hover:text-maroon-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 after:absolute after:inset-x-2.5 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold-500 after:transition hover:after:scale-x-100"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-0.5 lg:ml-4">
          <IconButton label="Search products" onClick={() => setSearchOpen((s) => !s)} aria-expanded={searchOpen}>
            <Icon name="search" />
          </IconButton>
          <IconButton label="Account" onClick={() => toast('Customer accounts will be part of the full website.')} className="hidden sm:flex">
            <Icon name="user" />
          </IconButton>
          <IconButton label="Wishlist" badge={wishlist.length} onClick={showWishlist} className="hidden min-[380px]:flex">
            <Icon name="heart" />
          </IconButton>
          <IconButton label="Open cart" badge={cartCount} onClick={() => setCartOpen(true)} className="-mr-2 sm:mr-0">
            <Icon name="bag" />
          </IconButton>
        </div>
      </div>

      <SearchPanel open={searchOpen} onClose={closeSearch} />

      <Drawer open={menuOpen} onClose={closeMenu} side="left" labelledBy="mobile-menu-title" widthClass="w-[86%] max-w-sm">
        <div id="mobile-menu" className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-ivory-300 px-5 py-4">
            <h2 id="mobile-menu-title" className="sr-only">
              Menu
            </h2>
            <Logo compact />
            <button type="button" data-autofocus onClick={closeMenu} aria-label="Close menu" className="flex h-10 w-10 items-center justify-center rounded-full text-ink-700 hover:bg-ivory-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400">
              <Icon name="x" />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-4">
            <ul>
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} onClick={(e) => onNav(e, l)} className="flex items-center justify-between border-b border-ivory-200 py-3.5 font-serif text-xl font-semibold text-ink-900 hover:text-maroon-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400">
                    {l.label}
                    <Icon name="arrowRight" size={16} className="text-gold-500" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mb-3 mt-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-600">Categories</p>
            <ul className="grid grid-cols-2 gap-2">
              {categories.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => {
                      closeMenu();
                      goToShop({ category: c.id, query: '' });
                    }}
                    className="w-full rounded-lg border border-ivory-300 bg-white px-3 py-2.5 text-left text-[13px] font-medium leading-tight text-ink-700 hover:border-gold-400 hover:text-maroon-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t border-ivory-300 p-5">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex h-11 items-center justify-center gap-2 rounded-full bg-[#1E7B4C] text-sm font-semibold text-white hover:bg-[#186a41] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 focus-visible:ring-offset-2">
              <WhatsAppIcon size={18} /> Enquire on WhatsApp
            </a>
            <p className="mt-3 text-center text-xs text-ink-500">{store.phoneDisplay} · placeholder</p>
          </div>
        </div>
      </Drawer>
    </header>
  );
}
