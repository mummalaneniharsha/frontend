// Shared button / link-button. Renders <a> when `href` is set.
const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition duration-200 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 focus-visible:ring-offset-2 ' +
  'active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 select-none';

const variants = {
  primary: 'bg-maroon-800 text-ivory-50 hover:bg-maroon-700 shadow-sm focus-visible:ring-offset-ivory-50',
  saffron: 'bg-saffron-500 text-maroon-950 hover:bg-saffron-400 shadow-sm focus-visible:ring-offset-maroon-900',
  outline: 'border border-maroon-800/80 text-maroon-800 hover:bg-maroon-800 hover:text-ivory-50 focus-visible:ring-offset-ivory-50',
  light: 'border border-ivory-50/40 text-ivory-50 hover:bg-ivory-50 hover:text-maroon-900 focus-visible:ring-offset-maroon-900',
  ghost: 'text-maroon-800 hover:bg-maroon-100/60',
  whatsapp: 'bg-[#1E7B4C] text-white hover:bg-[#186a41] shadow-sm focus-visible:ring-offset-ivory-50',
};

const sizes = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-7 text-[15px]',
};

export default function Button({ as, href, variant = 'primary', size = 'md', className = '', children, ...rest }) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (href || as === 'a') {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
