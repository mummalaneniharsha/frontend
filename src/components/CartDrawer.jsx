import { useStore } from '../context/StoreContext.jsx';
import { formatPrice, store, whatsappLink } from '../data/store.js';
import Drawer from './ui/Drawer.jsx';
import Icon, { WhatsAppIcon } from './ui/Icon.jsx';
import ProductImage from './ui/ProductImage.jsx';
import QuantityStepper from './ui/QuantityStepper.jsx';
import Button from './ui/Button.jsx';
import Art from '../art/Art.jsx';

export default function CartDrawer() {
  const { cart, cartCount, subtotal, savings, setQty, removeFromCart, cartOpen, setCartOpen, goToShop, toast } = useStore();
  const close = () => setCartOpen(false);

  const orderMessage = [
    `Namaste ${store.name}, I would like to order:`,
    ...cart.map((l) => `• ${l.product.name} (${l.product.size}) × ${l.qty} — ${formatPrice(l.product.price * l.qty)}`),
    `Subtotal: ${formatPrice(subtotal)}`,
  ].join('\n');

  return (
    <Drawer open={cartOpen} onClose={close} labelledBy="cart-title">
      <div className="flex items-center justify-between border-b border-ivory-300 px-5 py-4 sm:px-6">
        <h2 id="cart-title" className="font-serif text-2xl font-semibold text-maroon-900">
          Your Cart <span className="font-sans text-sm font-medium text-ink-500">({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
        </h2>
        <button type="button" data-autofocus onClick={close} aria-label="Close cart" className="flex h-10 w-10 items-center justify-center rounded-full text-ink-700 hover:bg-ivory-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400">
          <Icon name="x" />
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <div className="h-36 w-36 overflow-hidden rounded-full ring-1 ring-gold-300">
            <Art kind="diya" variant="clay" />
          </div>
          <h3 className="mt-6 font-serif text-2xl font-semibold text-ink-900">Your cart is empty</h3>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-500">Add agarbathi, camphor, diyas or a ready pooja kit — they will appear here.</p>
          <Button
            className="mt-6"
            onClick={() => {
              close();
              goToShop({ category: 'all', query: '' });
            }}
          >
            Start Shopping <Icon name="arrowRight" size={16} />
          </Button>
        </div>
      ) : (
        <>
          <ul className="flex-1 divide-y divide-ivory-200 overflow-y-auto px-5 sm:px-6">
            {cart.map(({ id, qty, product }) => (
              <li key={id} className="flex gap-4 py-4">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl ring-1 ring-ivory-300 sm:h-24 sm:w-24">
                  <ProductImage image={product.image} art={product.art} variant={product.variant} tone={product.tone} alt="" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-serif text-[1.08rem] font-semibold leading-snug text-ink-900">{product.name}</h3>
                      <p className="text-xs text-ink-500">{product.size}</p>
                    </div>
                    <button type="button" onClick={() => removeFromCart(id)} aria-label={`Remove ${product.name}`} className="rounded-full p-1.5 text-ink-300 transition hover:bg-ivory-200 hover:text-maroon-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400">
                      <Icon name="trash" size={17} />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <QuantityStepper size="sm" qty={qty} onChange={(q) => setQty(id, q)} label={product.name} />
                    <div className="text-right">
                      <p className="text-[15px] font-bold text-ink-900">{formatPrice(product.price * qty)}</p>
                      {qty > 1 && <p className="text-[11px] text-ink-500">{formatPrice(product.price)} each</p>}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-ivory-300 bg-ivory-100 px-5 py-5 sm:px-6">
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between text-ink-700">
                <dt>Subtotal</dt>
                <dd className="text-lg font-bold text-ink-900">{formatPrice(subtotal)}</dd>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-[#1E7B4C]">
                  <dt>You save</dt>
                  <dd className="font-semibold">{formatPrice(savings)}</dd>
                </div>
              )}
            </dl>
            <p className="mt-2 text-xs text-ink-500">Delivery and taxes will be confirmed by the store. This is a demo — no payment is taken.</p>
            <div className="mt-4 grid gap-2.5">
              <Button size="lg" onClick={() => toast('Checkout will be connected in the full website.')}>
                Proceed to Checkout
              </Button>
              <Button size="lg" variant="whatsapp" href={whatsappLink(orderMessage)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={18} /> Order via WhatsApp
              </Button>
            </div>
          </div>
        </>
      )}
    </Drawer>
  );
}
