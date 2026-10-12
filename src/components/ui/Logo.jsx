import { store } from '../../data/store.js';

export function LogoMark({ className = 'h-11 w-11', light = false }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="22.5" fill={light ? 'transparent' : '#4A0F14'} stroke="#C9A45C" strokeWidth="1.2" />
      <circle cx="24" cy="24" r="19" fill="none" stroke="#C9A45C" strokeWidth="0.6" strokeDasharray="1 2.4" />
      <path d="M24 10.5c3.6 5.3 6.2 8.6 6.2 12.4a6.2 6.2 0 0 1-12.4 0c0-3.8 2.6-7.1 6.2-12.4Z" fill="#E07B24" />
      <path d="M24 17.5c1.7 2.6 3 4.2 3 6a3 3 0 0 1-6 0c0-1.8 1.3-3.4 3-6Z" fill="#F7D88E" />
      <path d="M12.5 30.5h23c-1.4 4.4-6 7-11.5 7s-10.1-2.6-11.5-7Z" fill="#C9A45C" />
      <path d="M33 30.5l3.6-2.2" stroke="#C9A45C" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({ light = false, compact = false }) {
  return (
    <a href="#top" className="group flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400" aria-label={`${store.name} — home`}>
      <LogoMark className={compact ? 'h-9 w-9' : 'h-10 w-10 sm:h-11 sm:w-11'} light={light} />
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-[1.35rem] font-semibold tracking-tight sm:text-2xl ${light ? 'text-ivory-50' : 'text-maroon-900'}`}>
          {store.shortName}
        </span>
        <span className={`mt-1 text-[9.5px] font-semibold uppercase tracking-[0.32em] ${light ? 'text-gold-300' : 'text-gold-600'}`}>
          {store.logoSubline}
        </span>
      </span>
    </a>
  );
}
