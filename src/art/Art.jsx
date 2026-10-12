import { useId } from 'react';

/*
 * Illustrated still-life placeholders for products & categories.
 * Each drawing sits on a 400×400 canvas: a softly lit "wall" and a "table"
 * surface, like a studio product photograph. Swap for real photography by
 * giving a product/category an `image` URL — see components/ui/ProductImage.jsx.
 */

const TONES = {
  saffron: { wall: ['#FDEBD2', '#F1C48C'], table: ['#E7B072', '#D18F4E'], light: 0.55 },
  ivory: { wall: ['#FEF9F0', '#EFE1C6'], table: ['#E6D3AF', '#D2BA8E'], light: 0.6 },
  rose: { wall: ['#FBE9E2', '#EBC0B1'], table: ['#DBA393', '#C68676'], light: 0.5 },
  dusk: { wall: ['#6E1B21', '#2A090C'], table: ['#3C0E12', '#1F0608'], light: 0.08 },
  gold: { wall: ['#FCF2DA', '#E9D09B'], table: ['#D8B775', '#BF9C5C'], light: 0.55 },
  maroon: { wall: ['#8C2B31', '#4A0F14'], table: ['#58161A', '#350A0D'], light: 0.1 },
};

const DEFAULT_TONE = {
  incense: 'saffron',
  dhoop: 'ivory',
  camphor: 'gold',
  powder: 'ivory',
  powders: 'rose',
  diya: 'dusk',
  thali: 'gold',
  kit: 'ivory',
  oil: 'gold',
  wicks: 'rose',
  bell: 'ivory',
  marigold: 'saffron',
};

const BRASS = ['#F1DCA3', '#C9A45C', '#8E6F33'];

/* ------------------------------------------------------------------ helpers */

function Defs({ p }) {
  return (
    <defs>
      <linearGradient id={`${p}brass`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={BRASS[0]} />
        <stop offset="0.45" stopColor={BRASS[1]} />
        <stop offset="1" stopColor={BRASS[2]} />
      </linearGradient>
      <linearGradient id={`${p}brassV`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#F4E2B0" />
        <stop offset="0.5" stopColor="#C9A45C" />
        <stop offset="1" stopColor="#7E5F27" />
      </linearGradient>
      <radialGradient id={`${p}glow`}>
        <stop offset="0" stopColor="#FFD58A" stopOpacity="0.9" />
        <stop offset="0.35" stopColor="#FFB04A" stopOpacity="0.35" />
        <stop offset="1" stopColor="#FF8A1F" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${p}flame`} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor="#FF7A1A" />
        <stop offset="0.45" stopColor="#FFB238" />
        <stop offset="1" stopColor="#FFF1C2" />
      </linearGradient>
      <filter id={`${p}blur`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" />
      </filter>
      <filter id={`${p}soft`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="1.6" />
      </filter>
    </defs>
  );
}

function Backdrop({ p, tone }) {
  const t = TONES[tone] || TONES.ivory;
  return (
    <g>
      <defs>
        <radialGradient id={`${p}wall`} cx="0.35" cy="0.25" r="0.95">
          <stop offset="0" stopColor={t.wall[0]} />
          <stop offset="1" stopColor={t.wall[1]} />
        </radialGradient>
        <linearGradient id={`${p}table`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.table[0]} />
          <stop offset="1" stopColor={t.table[1]} />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill={`url(#${p}wall)`} />
      <rect y="282" width="400" height="118" fill={`url(#${p}table)`} />
      <rect y="282" width="400" height="1.5" fill="#fff" opacity={t.light * 0.5} />
      <ellipse cx="90" cy="60" rx="220" ry="140" fill="#fff" opacity={t.light * 0.35} filter={`url(#${p}blur)`} />
    </g>
  );
}

const Shadow = ({ p, cx, cy, rx, ry = 10, o = 0.28 }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#2B1D16" opacity={o} filter={`url(#${p}blur)`} />
);

function Flame({ p, x, y, s = 1, glow = true }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {glow && <circle r="70" fill={`url(#${p}glow)`} />}
      <g className="origin-bottom animate-flicker" style={{ transformBox: 'fill-box' }}>
        <path d="M0 -46 C 10 -26 15 -14 13 -4 C 11 6 5 10 0 10 C -5 10 -11 6 -13 -4 C -15 -14 -10 -26 0 -46 Z" fill={`url(#${p}flame)`} />
        <path d="M0 -20 C 4 -12 6 -6 5 0 C 4 5 2 7 0 7 C -2 7 -4 5 -5 0 C -6 -6 -4 -12 0 -20 Z" fill="#FFF8E1" />
      </g>
      <rect x="-1.5" y="6" width="3" height="8" rx="1.5" fill="#3A2416" />
    </g>
  );
}

function Smoke({ x, y, h = 220, sway = 18, o = 0.4, light = true }) {
  const c = light ? '#FFFFFF' : '#5A4A40';
  const d = `M${x} ${y} C ${x - sway} ${y - h * 0.2}, ${x + sway * 1.4} ${y - h * 0.38}, ${x + sway * 0.2} ${y - h * 0.55} S ${x - sway * 1.6} ${y - h * 0.82}, ${x + sway * 0.6} ${y - h}`;
  return (
    <g fill="none" strokeLinecap="round">
      <path d={d} stroke={c} strokeWidth="5" opacity={o * 0.35} />
      <path d={d} stroke={c} strokeWidth="1.6" opacity={o} />
    </g>
  );
}

function Marigold({ x, y, r = 16, hue = 'orange' }) {
  const [outer, inner, core] =
    hue === 'yellow' ? ['#F7C02B', '#EDA414', '#B86E06'] : ['#F58A1F', '#E06A12', '#9C3F07'];
  const petals = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return <circle key={i} cx={x + Math.cos(a) * r * 0.72} cy={y + Math.sin(a) * r * 0.72} r={r * 0.36} fill={outer} />;
  });
  return (
    <g>
      {petals}
      <circle cx={x} cy={y} r={r * 0.72} fill={inner} />
      <circle cx={x} cy={y} r={r * 0.42} fill={outer} />
      <circle cx={x} cy={y} r={r * 0.18} fill={core} />
    </g>
  );
}

function Bowl({ p, x, y, s = 1, fill, fillDark }) {
  // Brass katori with a mound of powder, centred at (x, y) on the rim.
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-80 0 C -76 40 -40 56 0 56 C 40 56 76 40 80 0 Z" fill={`url(#${p}brassV)`} />
      <path d="M-70 18 C -58 40 58 40 70 18" stroke="#FFF2CC" strokeWidth="3" fill="none" opacity="0.35" />
      <ellipse cx="0" cy="0" rx="80" ry="15" fill="#E7CC8C" />
      <ellipse cx="0" cy="1" rx="72" ry="12" fill="#8E6F33" />
      <path d="M-70 2 C -50 -50 50 -50 70 2 C 40 12 -40 12 -70 2 Z" fill={fill} />
      <path d="M-30 -20 C -15 -34 10 -36 26 -26" stroke="#fff" strokeOpacity="0.28" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M10 -4 C 30 -14 52 -10 66 0 C 40 10 20 8 10 -4 Z" fill={fillDark} opacity="0.55" />
    </g>
  );
}

/* --------------------------------------------------------------- subjects */

const STICK = {
  sandal: { coat: '#8B5A2B', box: '#7A1C22', band: '#C9A45C', accent: '#F1DCA3' },
  rose: { coat: '#7A2B3A', box: '#A63A50', band: '#F3D2C8', accent: '#FBE7E1' },
  jasmine: { coat: '#5B4636', box: '#2F4A3A', band: '#E9DCC0', accent: '#FFFFFF' },
};

function Incense({ p, variant = 'sandal', boxed = true }) {
  const v = STICK[variant] || STICK.sandal;
  const base = { x: 128, y: 298 };
  const tips = [
    [172, 96],
    [204, 108],
    [146, 104],
  ];
  return (
    <g>
      {boxed && (
        <g>
          <Shadow p={p} cx={290} cy={318} rx={70} ry={10} />
          <path d="M318 168 L338 156 L338 296 L318 312 Z" fill={v.box} />
          <path d="M318 168 L338 156 L338 296 L318 312 Z" fill="#000" opacity="0.25" />
          <path d="M248 168 L268 156 L338 156 L318 168 Z" fill={v.box} />
          <path d="M248 168 L268 156 L338 156 L318 168 Z" fill="#fff" opacity="0.15" />
          <rect x="248" y="168" width="70" height="144" fill={v.box} />
          <rect x="248" y="226" width="70" height="30" fill={v.band} />
          <rect x="248" y="226" width="70" height="30" fill="#fff" opacity="0.08" />
          <path d="M283 186 C 290 196 293 202 293 207 A 10 10 0 0 1 273 207 C 273 202 276 196 283 186 Z" fill={v.band} />
          <rect x="262" y="236" width="42" height="3" rx="1.5" fill={v.box} opacity="0.75" />
          <rect x="268" y="243" width="30" height="3" rx="1.5" fill={v.box} opacity="0.5" />
          <rect x="248" y="168" width="6" height="144" fill="#fff" opacity="0.12" />
        </g>
      )}
      <Shadow p={p} cx={140} cy={306} rx={95} ry={8} />
      {/* wooden boat holder */}
      <path d="M44 296 C 80 310 200 310 236 296 C 220 306 60 306 44 296 Z" fill="#6B4423" />
      <path d="M44 296 C 80 292 200 292 236 296 C 200 300 80 300 44 296 Z" fill="#A0703F" />
      {tips.map(([tx, ty], i) => {
        const mx = base.x + (tx - base.x) * 0.22;
        const my = base.y + (ty - base.y) * 0.22;
        return (
          <g key={i}>
            <line x1={base.x} y1={base.y} x2={mx} y2={my} stroke="#D3A86A" strokeWidth="2.2" strokeLinecap="round" />
            <line x1={mx} y1={my} x2={tx} y2={ty} stroke={v.coat} strokeWidth="4.5" strokeLinecap="round" />
            <circle cx={tx} cy={ty} r="9" fill={`url(#${p}glow)`} />
            <circle cx={tx} cy={ty} r="2.6" fill="#FF6A13" />
            <Smoke x={tx} y={ty - 3} h={ty + 10} sway={10 + i * 4} o={0.55} />
          </g>
        );
      })}
    </g>
  );
}

function Dhoop({ p }) {
  return (
    <g>
      <Shadow p={p} cx={150} cy={316} rx={88} />
      <ellipse cx="150" cy="306" rx="84" ry="18" fill={`url(#${p}brass)`} />
      <ellipse cx="150" cy="302" rx="70" ry="12" fill="#B08D45" />
      <ellipse cx="150" cy="302" rx="62" ry="9" fill="#9C7B3A" />
      <path d="M128 302 L150 236 L172 302 Z" fill="#4E3020" />
      <path d="M150 236 L172 302 L160 302 Z" fill="#2E1B10" opacity="0.6" />
      <circle cx="150" cy="238" r="14" fill={`url(#${p}glow)`} />
      <circle cx="150" cy="238" r="3" fill="#FF6A13" />
      <Smoke x={150} y={232} h={232} sway={22} o={0.55} light={false} />
      <Smoke x={152} y={232} h={200} sway={-14} o={0.35} light={false} />
      {/* bundle of dhoop sticks */}
      <Shadow p={p} cx={292} cy={336} rx={80} ry={8} />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={222 + i * 2} y1={344 - i * 7} x2={360 + i * 2} y2={304 - i * 7} stroke={i % 2 ? '#5A3A26' : '#6B4630'} strokeWidth="9" strokeLinecap="round" />
      ))}
      <path d="M285 306 L296 340" stroke="#B3202E" strokeWidth="5" />
      <path d="M291 304 L302 338" stroke="#D43A3A" strokeWidth="2" />
    </g>
  );
}

function Camphor({ p }) {
  const tabs = [
    [150, 296, -6], [196, 300, 4], [242, 296, -3], [172, 286, 8], [222, 286, -8],
    [130, 290, 12], [264, 290, 10], [198, 274, 0],
  ];
  return (
    <g>
      <Shadow p={p} cx={200} cy={322} rx={140} ry={14} />
      <ellipse cx="200" cy="306" rx="140" ry="30" fill={`url(#${p}brass)`} />
      <ellipse cx="200" cy="300" rx="120" ry="22" fill="#C9A45C" />
      <ellipse cx="200" cy="300" rx="104" ry="17" fill="#B08D45" />
      {tabs.map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <rect x="-19" y="-8" width="38" height="18" rx="5" fill="#E9E4DA" />
          <rect x="-19" y="-12" width="38" height="16" rx="5" fill="#FFFFFF" />
          <rect x="-13" y="-9" width="14" height="3" rx="1.5" fill="#F3EFE8" />
        </g>
      ))}
      <Flame p={p} x={198} y={262} s={0.9} />
    </g>
  );
}

const POWDER = {
  kumkum: ['#C8142F', '#86091C'],
  haldi: ['#F2B01E', '#C27A04'],
  chandan: ['#EBD3AB', '#C29E6A'],
};

function Powder({ p, variant = 'kumkum' }) {
  const [c, d] = POWDER[variant] || POWDER.kumkum;
  return (
    <g>
      <Shadow p={p} cx={200} cy={330} rx={100} ry={12} />
      <Bowl p={p} x={190} y={272} fill={c} fillDark={d} />
      {/* spilled heap & spoon */}
      <path d="M296 330 C 306 316 330 316 342 330 Z" fill={c} />
      <path d="M318 320 C 324 318 330 320 334 326" stroke="#fff" strokeOpacity="0.3" strokeWidth="2" fill="none" />
      <g transform="translate(70 330) rotate(-12)">
        <ellipse cx="0" cy="0" rx="20" ry="9" fill={`url(#${p}brass)`} />
        <ellipse cx="0" cy="-1" rx="14" ry="5" fill={c} />
        <rect x="18" y="-3" width="70" height="6" rx="3" fill={`url(#${p}brass)`} />
      </g>
    </g>
  );
}

function Powders({ p }) {
  return (
    <g>
      <Shadow p={p} cx={200} cy={334} rx={170} ry={14} />
      <Bowl p={p} x={110} y={286} s={0.62} fill={POWDER.haldi[0]} fillDark={POWDER.haldi[1]} />
      <Bowl p={p} x={290} y={286} s={0.62} fill={POWDER.chandan[0]} fillDark={POWDER.chandan[1]} />
      <Bowl p={p} x={200} y={304} s={0.72} fill={POWDER.kumkum[0]} fillDark={POWDER.kumkum[1]} />
      {[[60, 360], [84, 368], [330, 362], [352, 352], [150, 372]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="4" ry="2" fill="#FFF8EA" transform={`rotate(${i * 40} ${x} ${y})`} />
      ))}
    </g>
  );
}

function DiyaShape({ p, variant = 'brass', x = 0, y = 0, s = 1, flame = true }) {
  const clay = variant === 'clay';
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {!clay && <ellipse cx="0" cy="44" rx="38" ry="8" fill="#7E5F27" />}
      {!clay && <path d="M-30 30 L30 30 L36 44 L-36 44 Z" fill={`url(#${p}brassV)`} />}
      <path
        d="M-90 0 C -86 36 -40 48 0 48 C 50 48 86 30 96 4 L 128 -16 C 112 -6 100 -4 90 -4 Z"
        fill={clay ? '#B4532A' : `url(#${p}brassV)`}
      />
      {clay && <path d="M-90 0 C -86 36 -40 48 0 48 C 50 48 86 30 96 4" stroke="#7A2E12" strokeWidth="2" fill="none" />}
      {clay &&
        [-66, -40, -14, 12, 38, 62].map((dx, i) => (
          <g key={dx}>
            <circle cx={dx} cy={28 + Math.abs(dx) * -0.06} r="4" fill={i % 2 ? '#F5C342' : '#FFF4DE'} />
            <circle cx={dx + 13} cy={32} r="2" fill="#F5C342" />
          </g>
        ))}
      <ellipse cx="0" cy="0" rx="90" ry="16" fill={clay ? '#D06C3A' : '#E7CC8C'} />
      <ellipse cx="0" cy="2" rx="80" ry="12" fill={clay ? '#5A2410' : '#6E521F'} />
      <ellipse cx="-6" cy="3" rx="64" ry="8" fill="#B8862A" opacity="0.85" />
      <path d="M60 -2 L 118 -14" stroke="#F4EEE2" strokeWidth="5" strokeLinecap="round" />
      {flame && <Flame p={p} x={122} y={-24} s={0.95} />}
    </g>
  );
}

function Diya({ p, variant = 'brass' }) {
  return (
    <g>
      <Shadow p={p} cx={196} cy={340} rx={130} ry={14} o={0.4} />
      <DiyaShape p={p} variant={variant} x={176} y={290} />
      {variant === 'clay' && (
        <>
          <DiyaShape p={p} variant="clay" x={66} y={352} s={0.42} />
          <DiyaShape p={p} variant="clay" x={324} y={360} s={0.38} />
        </>
      )}
    </g>
  );
}

function Thali({ p, withDiya = true }) {
  return (
    <g>
      <Shadow p={p} cx={200} cy={334} rx={170} ry={20} o={0.32} />
      <ellipse cx="200" cy="312" rx="172" ry="62" fill="#7E5F27" />
      <ellipse cx="200" cy="304" rx="172" ry="62" fill={`url(#${p}brass)`} />
      <ellipse cx="200" cy="304" rx="150" ry="52" fill="#C9A45C" />
      <ellipse cx="200" cy="304" rx="150" ry="52" fill="none" stroke="#F1DCA3" strokeWidth="1.5" strokeDasharray="2 6" />
      <ellipse cx="200" cy="304" rx="128" ry="42" fill="#B8954E" />
      {/* rice */}
      {Array.from({ length: 22 }, (_, i) => {
        const a = i * 2.4;
        const r = 30 + (i % 5) * 16;
        const x = 200 + Math.cos(a) * r * 1.8;
        const y = 310 + Math.sin(a) * r * 0.55;
        return <ellipse key={i} cx={x} cy={y} rx="3.4" ry="1.6" fill="#FFF8E8" transform={`rotate(${i * 33} ${x} ${y})`} />;
      })}
      {/* betel leaf */}
      <path d="M96 300 C 110 270 150 268 168 292 C 150 312 116 316 96 300 Z" fill="#4F7A3A" />
      <path d="M100 300 C 124 292 146 290 166 292" stroke="#A9C98A" strokeWidth="1.5" fill="none" />
      {/* bowls */}
      <g transform="translate(250 300)">
        <ellipse cx="0" cy="8" rx="30" ry="10" fill="#8E6F33" />
        <ellipse cx="0" cy="2" rx="30" ry="10" fill="#E7CC8C" />
        <ellipse cx="0" cy="2" rx="24" ry="7" fill="#C8142F" />
      </g>
      <g transform="translate(296 318)">
        <ellipse cx="0" cy="8" rx="26" ry="9" fill="#8E6F33" />
        <ellipse cx="0" cy="2" rx="26" ry="9" fill="#E7CC8C" />
        <ellipse cx="0" cy="2" rx="20" ry="6" fill="#F2B01E" />
      </g>
      <Marigold x={150} y={334} r={15} />
      <Marigold x={178} y={346} r={12} hue="yellow" />
      <Marigold x={312} y={290} r={11} />
      {withDiya && <DiyaShape p={p} variant="brass" x={196} y={296} s={0.36} />}
    </g>
  );
}

const KIT = {
  maroon: { box: '#7A1C22', side: '#4A0F14', ribbon: '#C9A45C' },
  saffron: { box: '#D96E1E', side: '#A24E10', ribbon: '#7A1C22' },
  rose: { box: '#A63A50', side: '#6E2233', ribbon: '#E2C88E' },
};

function Kit({ p, variant = 'maroon' }) {
  const k = KIT[variant] || KIT.maroon;
  return (
    <g>
      <Shadow p={p} cx={210} cy={330} rx={150} ry={14} o={0.35} />
      {/* box */}
      <path d="M290 196 L326 178 L326 304 L290 324 Z" fill={k.side} />
      <rect x="110" y="196" width="180" height="128" fill={k.box} />
      <rect x="110" y="196" width="180" height="128" fill="#fff" opacity="0.05" />
      {/* lid */}
      <path d="M100 172 L136 154 L338 154 L302 172 Z" fill={k.box} />
      <path d="M100 172 L136 154 L338 154 L302 172 Z" fill="#fff" opacity="0.18" />
      <path d="M302 172 L338 154 L338 184 L302 204 Z" fill={k.side} />
      <rect x="100" y="172" width="202" height="32" fill={k.box} />
      <rect x="100" y="200" width="202" height="4" fill="#000" opacity="0.18" />
      {/* ribbon */}
      <rect x="192" y="172" width="18" height="152" fill={k.ribbon} />
      <path d="M201 172 L237 154 L255 154 L219 172 Z" fill={k.ribbon} opacity="0.9" />
      <path d="M201 160 C 170 128 150 150 176 164 Z" fill={k.ribbon} />
      <path d="M216 160 C 248 128 268 150 240 164 Z" fill={k.ribbon} />
      <circle cx="208" cy="161" r="8" fill={k.ribbon} />
      <circle cx="208" cy="161" r="8" fill="#000" opacity="0.12" />
      {/* label plaque */}
      <rect x="128" y="240" width="52" height="34" rx="3" fill="#FBF6EC" />
      <rect x="132" y="244" width="44" height="26" rx="2" fill="none" stroke={k.ribbon} strokeWidth="1" />
      <rect x="140" y="252" width="28" height="3" rx="1.5" fill={k.side} />
      <rect x="144" y="259" width="20" height="3" rx="1.5" fill={k.side} opacity="0.6" />
      {/* items beside */}
      <Marigold x={86} y={322} r={14} />
      <Marigold x={112} y={338} r={10} hue="yellow" />
      <DiyaShape p={p} variant="brass" x={318} y={330} s={0.32} />
    </g>
  );
}

function Oil({ p }) {
  return (
    <g>
      <defs>
        <linearGradient id={`${p}oil`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#C98A12" />
          <stop offset="0.4" stopColor="#F2C14E" />
          <stop offset="1" stopColor="#B07408" />
        </linearGradient>
      </defs>
      <Shadow p={p} cx={180} cy={330} rx={80} ry={10} />
      <rect x="182" y="120" width="34" height="22" rx="4" fill="#7A1C22" />
      <rect x="186" y="140" width="26" height="22" fill="#E8D9B8" opacity="0.7" />
      <path d="M150 182 C 150 168 186 162 186 150 L 212 150 C 212 162 248 168 248 182 L 248 314 C 248 324 240 330 230 330 L 168 330 C 158 330 150 324 150 314 Z" fill="#FFF8E6" opacity="0.35" />
      <path d="M154 200 L244 200 L244 314 C 244 322 238 326 230 326 L 168 326 C 160 326 154 322 154 314 Z" fill={`url(#${p}oil)`} />
      <rect x="154" y="226" width="90" height="58" fill="#FBF6EC" />
      <rect x="154" y="226" width="90" height="10" fill="#7A1C22" />
      <rect x="170" y="248" width="58" height="4" rx="2" fill="#7A1C22" opacity="0.7" />
      <rect x="178" y="258" width="42" height="3" rx="1.5" fill="#7A1C22" opacity="0.4" />
      <path d="M162 190 L162 312" stroke="#fff" strokeWidth="5" opacity="0.4" strokeLinecap="round" />
      <DiyaShape p={p} variant="brass" x={300} y={318} s={0.42} />
    </g>
  );
}

function Wicks({ p }) {
  const wick = (x, y, s = 1, k) => (
    <g key={k} transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="0" rx="17" ry="7" fill="#FFFFFF" />
      <ellipse cx="0" cy="1.5" rx="17" ry="6" fill="#ECE6DA" opacity="0.6" />
      <path d="M-5 -1 C -3 -14 0 -22 0 -24 C 0 -22 3 -14 5 -1 Z" fill="#FFFFFF" />
      <path d="M0 -24 C 2 -14 3 -8 5 -1" stroke="#E2DBCD" strokeWidth="1" fill="none" />
    </g>
  );
  const inBowl = [[-46, 0], [-16, 4], [14, 2], [44, -2], [-30, -12], [0, -10], [30, -12], [-14, -22], [16, -22]];
  return (
    <g>
      <Shadow p={p} cx={200} cy={332} rx={140} ry={12} />
      <g transform="translate(190 286)">
        <path d="M-90 0 C -86 44 -44 60 0 60 C 44 60 86 44 90 0 Z" fill={`url(#${p}brassV)`} />
        <ellipse cx="0" cy="0" rx="90" ry="17" fill="#E7CC8C" />
        <ellipse cx="0" cy="1" rx="80" ry="13" fill="#8E6F33" />
        {inBowl.map(([x, y], i) => wick(x, y, 0.95, i))}
      </g>
      {wick(310, 344, 0.8, 'a')}
      {wick(336, 330, 0.7, 'b')}
      {wick(80, 352, 0.75, 'c')}
    </g>
  );
}

function Bell({ p }) {
  return (
    <g>
      <Shadow p={p} cx={200} cy={322} rx={96} ry={12} o={0.35} />
      {/* handle */}
      <rect x="192" y="96" width="16" height="70" rx="5" fill={`url(#${p}brass)`} />
      {[110, 128, 146].map((y) => (
        <ellipse key={y} cx="200" cy={y} rx="13" ry="4.5" fill="#B08D45" stroke="#F1DCA3" strokeWidth="1" />
      ))}
      <path d="M200 52 C 214 70 216 82 210 94 L 190 94 C 184 82 186 70 200 52 Z" fill={`url(#${p}brass)`} />
      <circle cx="200" cy="90" r="9" fill="#C9A45C" />
      {/* body */}
      <path d="M200 160 C 160 160 152 196 148 236 C 144 268 128 288 116 300 L 284 300 C 272 288 256 268 252 236 C 248 196 240 160 200 160 Z" fill={`url(#${p}brass)`} />
      <path d="M176 176 C 164 206 162 250 146 290" stroke="#FFF2CC" strokeWidth="7" opacity="0.45" fill="none" strokeLinecap="round" />
      <path d="M156 230 C 184 240 216 240 244 230" stroke="#8E6F33" strokeWidth="2" fill="none" />
      <path d="M152 250 C 184 262 216 262 248 250" stroke="#F1DCA3" strokeWidth="1.5" fill="none" opacity="0.7" />
      <ellipse cx="200" cy="300" rx="84" ry="11" fill="#7E5F27" />
      <ellipse cx="200" cy="298" rx="84" ry="9" fill="#E7CC8C" />
      <circle cx="206" cy="312" r="9" fill="#8E6F33" />
    </g>
  );
}

function MarigoldScene({ p }) {
  const pts = Array.from({ length: 17 }, (_, i) => {
    const t = i / 16;
    return [t * 440 - 20, 70 + Math.sin(t * Math.PI) * 90];
  });
  return (
    <g>
      <path d="M-20 70 Q 200 250 420 70" stroke="#6B4630" strokeWidth="1.5" fill="none" />
      {pts.map(([x, y], i) => (
        <g key={i}>
          {i % 3 === 1 && (
            <path d={`M${x} ${y + 10} C ${x - 9} ${y + 30} ${x - 4} ${y + 52} ${x} ${y + 60} C ${x + 4} ${y + 52} ${x + 9} ${y + 30} ${x} ${y + 10} Z`} fill="#3F6B34" />
          )}
          <Marigold x={x} y={y} r={14} hue={i % 2 ? 'yellow' : 'orange'} />
        </g>
      ))}
      <Shadow p={p} cx={210} cy={336} rx={150} ry={12} />
      <Marigold x={120} y={318} r={20} />
      <Marigold x={156} y={334} r={15} hue="yellow" />
      <Marigold x={290} y={332} r={17} />
      <DiyaShape p={p} variant="clay" x={210} y={316} s={0.5} />
    </g>
  );
}

const SUBJECTS = {
  incense: Incense,
  dhoop: Dhoop,
  camphor: Camphor,
  powder: Powder,
  powders: Powders,
  diya: Diya,
  thali: Thali,
  kit: Kit,
  oil: Oil,
  wicks: Wicks,
  bell: Bell,
  marigold: MarigoldScene,
};

export default function Art({ kind = 'incense', variant, tone, title, className = '', viewBox = '0 0 400 400' }) {
  const p = `a${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const Subject = SUBJECTS[kind] || Incense;
  const t = tone || DEFAULT_TONE[kind] || 'ivory';
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      className={`block h-full w-full ${className}`}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <Defs p={p} />
      <Backdrop p={p} tone={t} />
      <Subject p={p} variant={variant} />
    </svg>
  );
}

export { DiyaShape, Marigold, Flame, Smoke, Defs, Incense, Thali };
