import { formatPrice } from '../../data/store.js';

export default function Price({ price, mrp, size = 'md' }) {
  const off = mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
      <span className={`font-bold text-ink-900 ${size === 'lg' ? 'text-xl' : 'text-[17px]'}`}>{formatPrice(price)}</span>
      {off > 0 && (
        <>
          <s className="text-[13px] text-ink-300">
            <span className="sr-only">Original price </span>
            {formatPrice(mrp)}
          </s>
          <span className="text-xs font-semibold text-saffron-600">{off}% off</span>
        </>
      )}
    </div>
  );
}
