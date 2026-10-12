import { useEffect, useRef } from 'react';
import { store } from '../data/store.js';
import Button from './ui/Button.jsx';

/** Placeholder policy pages, shown in a native <dialog>. */
export default function PolicyDialog({ title, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (title && !d.open) d.showModal();
    if (!title && d.open) d.close();
  }, [title]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="policy-title"
      className="w-[min(92vw,520px)] rounded-2xl bg-ivory-50 p-0 text-ink-900 shadow-2xl backdrop:bg-maroon-950/50 backdrop:backdrop-blur-[2px]"
    >
      <div className="p-7 sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-600">{store.name}</p>
        <h2 id="policy-title" className="mt-2 font-serif text-3xl font-semibold text-maroon-900">
          {title}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-ink-700">
          This page is a placeholder in the frontend demo. The store&apos;s final {title?.toLowerCase()} will be written with the client and added before the website goes live.
        </p>
        <div className="mt-7 flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </dialog>
  );
}
