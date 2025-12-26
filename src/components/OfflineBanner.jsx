// src/components/OfflineBanner.jsx
import React, { useEffect, useState } from 'react';

export default function OfflineBanner() {
  const [online, setOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem('ga:offlineBannerDismissed') === '1';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    function onOnline() {
      setOnline(true);
    }
    function onOffline() {
      setOnline(false);
    }
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  if (online || dismissed) return null;

  function dismiss() {
    try {
      localStorage.setItem('ga:offlineBannerDismissed', '1');
    } catch (e) {}
    setDismissed(true);
  }

  return (
    <div className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-3 pointer-events-none">
      <div className="pointer-events-auto max-w-3xl w-full rounded-2xl border border-amber-500/40 bg-amber-950/90 text-amber-50 px-4 py-2.5 text-[11px] flex items-center justify-between gap-3 shadow-[0_18px_45px_rgba(0,0,0,0.7)]">
        <div>
          <p className="font-medium">You appear to be offline.</p>
          <p className="text-amber-200/90">
            This demo keeps working with local state, but real APIs would not be reachable until your connection returns.
          </p>
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="text-[11px] font-medium rounded-full border border-amber-400/70 px-3 py-1 bg-amber-900/60 hover:bg-amber-800/80"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
