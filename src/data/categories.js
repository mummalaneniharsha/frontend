// Category ids are referenced by products (`category`) and by the shop filter.
// `art` selects an illustrated placeholder; set `image` to a photo URL to replace it.

export const categories = [
  { id: 'agarbathi', name: 'Agarbathi & Incense', blurb: 'Sandalwood, rose, jasmine & more', art: 'incense', tone: 'saffron', image: null },
  { id: 'camphor-dhoop', name: 'Camphor & Dhoop', blurb: 'For aarti and a purifying aroma', art: 'dhoop', tone: 'ivory', image: null },
  { id: 'kumkum-turmeric', name: 'Kumkum & Turmeric', blurb: 'Haldi, kumkum, chandan', art: 'powders', tone: 'rose', image: null },
  { id: 'diyas-oil', name: 'Diyas & Oil', blurb: 'Brass & clay diyas, deepam oil', art: 'diya', tone: 'dusk', image: null },
  { id: 'thalis', name: 'Pooja Thalis', blurb: 'Brass & decorated thalis', art: 'thali', tone: 'gold', image: null },
  { id: 'kits', name: 'Pooja Kits', blurb: 'Everything in one box', art: 'kit', tone: 'maroon', image: null },
  { id: 'festival', name: 'Festival Essentials', blurb: 'Diwali, Navratri, Ganesh Chaturthi', art: 'marigold', tone: 'saffron', image: null },
  { id: 'samagri', name: 'Other Pooja Samagri', blurb: 'Wicks, bells, kalash & more', art: 'bell', tone: 'ivory', image: null },
];

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c]));
