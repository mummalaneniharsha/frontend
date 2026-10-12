import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { productById } from '../data/products.js';

const StoreContext = createContext(null);

const STORAGE_KEY = 'slps-demo-v1';

function loadSaved() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw);
    return {
      cart: (saved.cart || []).filter((l) => productById[l.id] && l.qty > 0),
      wishlist: (saved.wishlist || []).filter((id) => productById[id]),
    };
  } catch {
    return null;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const existing = state.cart.find((l) => l.id === action.id);
      const cart = existing
        ? state.cart.map((l) => (l.id === action.id ? { ...l, qty: Math.min(l.qty + 1, 99) } : l))
        : [...state.cart, { id: action.id, qty: 1 }];
      return { ...state, cart };
    }
    case 'setQty': {
      const cart =
        action.qty <= 0
          ? state.cart.filter((l) => l.id !== action.id)
          : state.cart.map((l) => (l.id === action.id ? { ...l, qty: Math.min(action.qty, 99) } : l));
      return { ...state, cart };
    }
    case 'remove':
      return { ...state, cart: state.cart.filter((l) => l.id !== action.id) };
    case 'clear':
      return { ...state, cart: [] };
    case 'toggleWish': {
      const has = state.wishlist.includes(action.id);
      return { ...state, wishlist: has ? state.wishlist.filter((x) => x !== action.id) : [...state.wishlist, action.id] };
    }
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => loadSaved() || { cart: [], wishlist: [] });
  const [cartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [filters, setFilters] = useState({ category: 'all', query: '', sort: 'featured', wishlistOnly: false });
  const toastId = useRef(0);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable — the demo still works in memory */
    }
  }, [state]);

  const dismissToast = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const toast = useCallback(
    (message, opts = {}) => {
      const id = ++toastId.current;
      setToasts((t) => [...t.slice(-2), { id, message, ...opts }]);
      window.setTimeout(() => dismissToast(id), opts.duration || 3200);
    },
    [dismissToast],
  );

  const addToCart = useCallback(
    (id) => {
      dispatch({ type: 'add', id });
      toast(`${productById[id]?.name} added to cart`, { kind: 'cart', action: 'View cart' });
    },
    [toast],
  );

  const toggleWishlist = useCallback(
    (id) => {
      const had = state.wishlist.includes(id);
      dispatch({ type: 'toggleWish', id });
      toast(had ? 'Removed from wishlist' : 'Saved to wishlist', { kind: 'wish' });
    },
    [state.wishlist, toast],
  );

  /** Update shop filters and bring the shop section into view. */
  const goToShop = useCallback((patch = {}) => {
    setFilters((f) => ({ ...f, wishlistOnly: false, ...patch }));
    window.requestAnimationFrame(() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }, []);

  const value = useMemo(() => {
    const lines = state.cart.map((l) => ({ ...l, product: productById[l.id] }));
    return {
      cart: lines,
      cartCount: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.product.price, 0),
      savings: lines.reduce((n, l) => n + (l.product.mrp ? (l.product.mrp - l.product.price) * l.qty : 0), 0),
      qtyOf: (id) => state.cart.find((l) => l.id === id)?.qty || 0,
      wishlist: state.wishlist,
      isWished: (id) => state.wishlist.includes(id),
      addToCart,
      setQty: (id, qty) => dispatch({ type: 'setQty', id, qty }),
      removeFromCart: (id) => dispatch({ type: 'remove', id }),
      clearCart: () => dispatch({ type: 'clear' }),
      toggleWishlist,
      cartOpen,
      setCartOpen,
      toasts,
      toast,
      dismissToast,
      filters,
      setFilters,
      goToShop,
    };
  }, [state, addToCart, toggleWishlist, cartOpen, toasts, toast, dismissToast, filters, goToShop]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>');
  return ctx;
}
