import { store } from '../data/store.js';

export default function AnnouncementBar() {
  return (
    <div className="bg-maroon-950 text-ivory-100">
      <div className="mx-auto flex h-9 max-w-site items-center justify-center px-4 text-[12px] tracking-wide sm:justify-between">
        <span className="hidden text-ivory-200/60 sm:inline">Demo preview · sample products & prices</span>
        <p className="flex items-center gap-3 text-center">
          {store.announcements.slice(0, 2).map((a, i) => (
            <span key={a} className={`flex items-center gap-3 ${i > 0 ? 'hidden min-[420px]:flex' : ''}`}>
              {i > 0 && <span className="h-1 w-1 rotate-45 bg-gold-400" aria-hidden="true" />}
              <span>{a}</span>
            </span>
          ))}
        </p>
        <a href="#contact" className="hidden text-gold-300 underline-offset-4 hover:underline sm:inline">
          Enquire on WhatsApp
        </a>
      </div>
    </div>
  );
}
