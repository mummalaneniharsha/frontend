// ---------------------------------------------------------------------------
// Store configuration — replace these placeholders with the client's details.
// Everything in the UI that mentions the business reads from this file.
// ---------------------------------------------------------------------------

export const store = {
  name: 'Sri Lakshmi Pooja Stores',
  shortName: 'Sri Lakshmi', // logo line 1
  logoSubline: 'Pooja Stores', // logo line 2
  tagline: 'Agarbathi & Pooja Samagri',
  description:
    'A neighbourhood store for agarbathi, dhoop, camphor, diyas and everyday pooja samagri — chosen with care for daily rituals and festival celebrations.',
  announcements: [
    'Bring Home Divine Fragrance',
    'Quality Pooja Essentials',
    'Festival kits now available',
  ],

  // PLACEHOLDER contact details — not a real number or address.
  phoneDisplay: '+91 XXXXX XXXXX',
  // Digits only, with country code, e.g. '919876543210'. Leave empty until the client confirms.
  whatsappNumber: '',
  email: 'hello@yourstore.example',
  address: ['Shop No. —, Street name', 'Area / Locality', 'City, State — PIN'],
  hours: 'Mon – Sun · 8:00 AM – 9:00 PM (placeholder)',

  social: {
    instagram: '#',
    facebook: '#',
  },

  // Wide hero photo (about 16:10, subject on the right, empty space on the left for the headline).
  heroImage: '/images/hero-pooja-setup.jpg',
  promoImage: '/images/pooja-samagri-spread.jpg',

  currency: 'INR',
  freeShippingNote: 'Delivery details to be confirmed by the store',
};

/** Build a WhatsApp link. Falls back to the generic share URL while no number is configured. */
export function whatsappLink(message = '') {
  const text = encodeURIComponent(message || `Namaste ${store.name}, I would like to enquire about your products.`);
  return store.whatsappNumber
    ? `https://wa.me/${store.whatsappNumber}?text=${text}`
    : `https://wa.me/?text=${text}`;
}

export const formatPrice = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: store.currency, maximumFractionDigits: 0 }).format(amount);
