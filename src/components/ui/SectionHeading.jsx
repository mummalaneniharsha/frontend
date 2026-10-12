export function Ornament({ className = '', light = false }) {
  const c = light ? 'bg-gold-300/70' : 'bg-gold-400';
  return (
    <span className={`inline-flex items-center gap-2 ${className}`} aria-hidden="true">
      <span className={`h-px w-8 ${c}`} />
      <span className={`h-1.5 w-1.5 rotate-45 ${c}`} />
      <span className={`h-px w-8 ${c}`} />
    </span>
  );
}

export default function SectionHeading({ eyebrow, title, description, align = 'center', light = false, action, id }) {
  const centered = align === 'center';
  return (
    <div className={`mb-10 flex flex-col gap-4 md:mb-12 ${centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`}>
      <div className={centered ? 'max-w-2xl' : 'max-w-xl'}>
        {eyebrow && (
          <p className={`mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.22em] ${centered ? 'justify-center' : ''} ${light ? 'text-gold-300' : 'text-gold-600'}`}>
            {centered && <Ornament light={light} className="hidden sm:inline-flex" />}
            <span>{eyebrow}</span>
            {centered && <Ornament light={light} className="hidden sm:inline-flex" />}
          </p>
        )}
        <h2 id={id} className={`font-serif text-[2rem] font-semibold leading-[1.1] sm:text-4xl md:text-[2.75rem] ${light ? 'text-ivory-50' : 'text-maroon-900'}`}>
          {title}
        </h2>
        {description && <p className={`mt-4 text-[15px] leading-relaxed ${light ? 'text-ivory-200/80' : 'text-ink-500'}`}>{description}</p>}
      </div>
      {action}
    </div>
  );
}
