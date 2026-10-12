import Icon from './Icon.jsx';

export default function QuantityStepper({ qty, onChange, label, size = 'md' }) {
  const h = size === 'sm' ? 'h-8' : 'h-10';
  const btn =
    `flex ${h} w-9 items-center justify-center text-maroon-800 transition hover:bg-maroon-100/70 ` +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-saffron-400 active:bg-maroon-100';
  return (
    <div className={`inline-flex ${h} items-center overflow-hidden rounded-full border border-maroon-800/30 bg-white`} role="group" aria-label={`Quantity for ${label}`}>
      <button type="button" className={btn} onClick={() => onChange(qty - 1)} aria-label={qty === 1 ? `Remove ${label}` : `Decrease quantity of ${label}`}>
        <Icon name="minus" size={16} />
      </button>
      <span className="min-w-[2rem] text-center text-sm font-semibold tabular-nums text-ink-900" aria-live="polite">
        {qty}
      </span>
      <button type="button" className={btn} onClick={() => onChange(qty + 1)} aria-label={`Increase quantity of ${label}`}>
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}
