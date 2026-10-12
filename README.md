# Sri Lakshmi Pooja Stores — Frontend Demo

This is a clickable homepage prototype for an agarbathi and pooja samagri store, made to show the client before the full site is built. It is a **frontend demo only**. There is no backend, no payments and no login. All products, prices, ratings, testimonials and contact details are placeholders.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the build
```

Stack: React 18, Vite 5, Tailwind CSS 3. The fonts (Cormorant Garamond and Manrope) are bundled through `@fontsource`, so they also work offline. There are no other runtime dependencies.

## Replacing demo content

| What | Where |
| --- | --- |
| Store name, logo text, announcements, phone, **WhatsApp number**, email, address, hours, social links | `src/data/store.js` |
| Products (name, size, price, MRP, rating, badge, image) | `src/data/products.js` |
| Categories | `src/data/categories.js` |
| Feature points, festival collections, sample testimonials, nav links | `src/data/content.js` |

**Images:** every product and category has an `image` field. While it is `null`, the site draws an illustrated placeholder (`src/art/Art.jsx`). To use a real photo, set `image` to a URL or to a file in `public/` (for example `image: '/products/sandalwood.jpg'`). If a photo fails to load, the illustration is shown instead.

**WhatsApp:** set `whatsappNumber` to the number with country code and digits only (for example `'919876543210'`). Until then, the buttons open WhatsApp's generic share screen with the message filled in. The cart's "Order via WhatsApp" button sends the full order list.

## What works

- Header search shows live results and opens the shop with your search applied.
- The Shop section lets you filter by category, search, sort (price, rating, discount) and show only saved items.
- Category cards, the nav links and the footer links all go to the shop with the right filter set.
- Add to cart updates the cart count. Each product card then shows +/- quantity buttons.
- The cart drawer has quantity controls, remove, subtotal and savings, an empty-cart state and an "Order via WhatsApp" button.
- The wishlist (heart button) toggles and keeps a count. Toasts appear for actions.
- On mobile there is a slide-out menu. The menu and cart close with Esc, keep keyboard focus inside them and lock page scrolling while open.
- The cart and wishlist are saved in `localStorage` (the demo still works if storage is blocked).

## Structure

```
src/
  data/         all replaceable business content
  context/      cart, wishlist, toasts and shop filters (StoreContext)
  art/          SVG illustrated placeholders and the hero still-life
  components/   page sections (Header, Hero, Categories, Bestsellers, Shop, …)
  components/ui reusable pieces (Button, Drawer, Icon, ProductImage, Price, Rating, …)
  lib/search.js product search matching
```
