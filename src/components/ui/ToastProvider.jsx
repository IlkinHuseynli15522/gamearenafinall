// src/components/ui/ToastProvider.jsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';

const ToastContext = createContext(null);

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const add = useCallback((type, message, opts = {}) => {
    const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const toast = { id, type, message, ...opts };
    setToasts((t) => [toast, ...t]);

    if (!opts.sticky) {
      const duration = opts.duration || 3000;
      setTimeout(() => {
        setToasts((t) => t.filter((x) => x.id !== id));
      }, duration);
    }

    return id;
  }, []);

  const remove = useCallback(
    (id) => setToasts((t) => t.filter((x) => x.id !== id)),
    []
  );

  // Global event listener so toast.js can dispatch events
  useEffect(() => {
    function onGlobal(e) {
      try {
        const { type, message, opts } = e.detail || {};
        if (!type || !message) return;
        add(type, message, opts || {});
      } catch (err) {
        // ignore
      }
    }

    window.addEventListener('ga:toast', onGlobal);
    return () => window.removeEventListener('ga:toast', onGlobal);
  }, [add]);

  return (
    <ToastContext.Provider value={{ add, remove }}>
      {children}
      <div className="fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={
              'pointer-events-auto px-4 py-2 rounded-md shadow-[0_15px_35px_rgba(0,0,0,0.7)] border text-xs flex items-start gap-2 max-w-sm w-full mx-4 sm:mx-0 ' +
              (t.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-600/60 text-emerald-50'
                : t.type === 'error'
                ? 'bg-rose-950/90 border-rose-600/60 text-rose-50'
                : t.type === 'info'
                ? 'bg-slate-950/90 border-slate-600/60 text-slate-50'
                : 'bg-slate-950/90 border-slate-600/60 text-slate-50')
            }
          >
            <div className="flex-1">{t.message}</div>
            <button
              type="button"
              onClick={() => remove(t.id)}
              className="ml-2 text-[10px] text-slate-300 hover:text-slate-100"
            >
              Close
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
