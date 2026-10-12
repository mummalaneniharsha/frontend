export default function Rating({ value, count, className = '' }) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  return (
    <div className={`flex items-center gap-1.5 text-xs text-ink-500 ${className}`}>
      <span className="relative inline-block leading-none" aria-hidden="true">
        <span className="tracking-[1px] text-ivory-300">★★★★★</span>
        <span className="absolute inset-0 overflow-hidden whitespace-nowrap tracking-[1px] text-saffron-500" style={{ width: `${pct}%` }}>
          ★★★★★
        </span>
      </span>
      <span className="font-semibold text-ink-700">{value.toFixed(1)}</span>
      <span>({count})</span>
      <span className="sr-only">
        Rated {value} out of 5 from {count} reviews (sample data)
      </span>
    </div>
  );
}
