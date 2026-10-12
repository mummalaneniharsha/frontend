import { useId } from 'react';
import { Defs, DiyaShape, Incense, Marigold, Thali } from './Art.jsx';

/** Evening pooja still-life for the hero: thali, lit brass diya and agarbathi smoke. */
export default function HeroArt({ className = '' }) {
  const p = `h${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <svg viewBox="30 70 460 566" preserveAspectRatio="xMidYMid slice" className={`block h-full w-full ${className}`} role="img" aria-label="A lit brass diya, a pooja thali with kumkum and haldi, and incense sticks with rising smoke">
      <Defs p={p} />
      <defs>
        <radialGradient id={`${p}wall`} cx="0.62" cy="0.62" r="0.8">
          <stop offset="0" stopColor="#8A2B2C" />
          <stop offset="0.55" stopColor="#4F1015" />
          <stop offset="1" stopColor="#24070A" />
        </radialGradient>
        <linearGradient id={`${p}table`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3E1013" />
          <stop offset="1" stopColor="#170406" />
        </linearGradient>
        <radialGradient id={`${p}warm`}>
          <stop offset="0" stopColor="#FFB45A" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="#E0702A" stopOpacity="0.16" />
          <stop offset="1" stopColor="#E0702A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="520" height="640" fill={`url(#${p}wall)`} />
      <rect y="440" width="520" height="200" fill={`url(#${p}table)`} />
      <rect y="440" width="520" height="1" fill="#E2C88E" opacity="0.18" />
      <circle cx="410" cy="470" r="300" fill={`url(#${p}warm)`} />

      {/* bokeh */}
      {[[70, 120, 10], [120, 70, 6], [450, 110, 8], [390, 60, 5], [300, 150, 4], [470, 220, 6]].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#FFD58A" opacity={0.12 + (i % 3) * 0.05} filter={`url(#${p}soft)`} />
      ))}

      <g transform="translate(70 158) scale(1.05)">
        <Thali p={p} withDiya={false} />
      </g>
      <g transform="translate(-34 262)">
        <Incense p={p} variant="sandal" boxed={false} />
      </g>
      <ellipse cx="300" cy="604" rx="170" ry="16" fill="#000" opacity="0.5" filter={`url(#${p}blur)`} />
      <DiyaShape p={p} variant="brass" x={292} y={548} s={1.2} />
      <Marigold x={56} y={600} r={18} />
      <Marigold x={94} y={616} r={13} hue="yellow" />
      <Marigold x={488} y={606} r={15} />
    </svg>
  );
}
