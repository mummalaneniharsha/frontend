import { useStore } from '../context/StoreContext.jsx';
import Icon from './ui/Icon.jsx';

export default function Toasts() {
  const { toasts, dismissToast, setCartOpen, cartOpen } = useStore();
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[70] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:items-end" role="status" aria-live="polite">
      {!cartOpen && toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto flex w-full max-w-sm animate-fade-up items-center gap-3 rounded-xl bg-maroon-950 py-3 pl-4 pr-2 text-sm text-ivory-50 shadow-lift ring-1 ring-gold-500/30">
          <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${t.kind === 'wish' ? 'bg-maroon-700' : 'bg-saffron-500 text-maroon-950'}`}>
            <Icon name={t.kind === 'cart' ? 'check' : t.kind === 'wish' ? 'heart' : 'sparkle'} size={15} strokeWidth={2.2} className={t.kind === 'wish' ? 'fill-current' : ''} />
          </span>
          <p className="flex-1 leading-snug">{t.message}</p>
          {t.action && (
            <button
              type="button"
              onClick={() => {
                dismissToast(t.id);
                setCartOpen(true);
              }}
              className="shrink-0 rounded-md px-2 py-1 text-[13px] font-semibold text-saffron-300 hover:text-saffron-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400"
            >
              {t.action}
            </button>
          )}
          <button type="button" onClick={() => dismissToast(t.id)} aria-label="Dismiss notification" className="shrink-0 rounded-md p-1 text-ivory-200/60 hover:text-ivory-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400">
            <Icon name="x" size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
