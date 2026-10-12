import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/** Accessible slide-over panel: Esc to close, scroll lock, focus in/out, simple focus trap. */
export default function Drawer({ open, onClose, side = 'right', labelledBy, children, widthClass = 'w-full max-w-md' }) {
  const panelRef = useRef(null);
  const lastFocus = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    lastFocus.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector('[data-autofocus]')?.focus() || panelRef.current?.focus();
    }, 30);

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      lastFocus.current?.focus?.({ preventScroll: true });
    };
  }, [open, onClose]);

  const hidden = side === 'right' ? 'translate-x-full' : '-translate-x-full';

  return createPortal(
    <div className={`fixed inset-0 z-[60] ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-maroon-950/50 backdrop-blur-[2px] transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        inert={open ? undefined : ''}
        className={`absolute top-0 ${side === 'right' ? 'right-0' : 'left-0'} flex h-full ${widthClass} flex-col bg-ivory-50 shadow-2xl outline-none transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : hidden
        }`}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
