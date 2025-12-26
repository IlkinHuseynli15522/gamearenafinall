// src/components/tournaments/TournamentsList.jsx
import React from 'react';
import { Users, Gift, PlayCircle, Tv } from 'lucide-react';

export default function TournamentsList({
  items = [],
  onOpen,
  onRegister,
  myRegs = [],
}) {
  if (!items.length) {
    return (
      <p className="text-[11px] text-slate-400">
        No tournaments in this category for demo data.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((t) => {
        const registered = myRegs.includes(t.id);
        return (
          <article
            key={t.id}
            className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 hover:border-sky-500/60 transition-colors"
          >
            <div className="flex-1 space-y-1">
              <button
                type="button"
                onClick={() => onOpen && onOpen(t.id)}
                className="text-sm font-semibold text-slate-100 hover:underline"
              >
                {t.name}
              </button>
              <p className="text-[11px] text-slate-400">
                {t.gameName} • {t.region} • {t.date}
              </p>
              {t.ruleSummary && (
                <p className="text-[11px] text-slate-400">
                  {t.ruleSummary}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 mt-1">
                <span className="inline-flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  {t.bracketSize} teams • {t.format}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Gift className="h-3.5 w-3.5 text-amber-300" />
                  Prize {t.prizePool?.toLocaleString() || 'TBD'}
                </span>
                {t.streamUrl && (
                  <span className="inline-flex items-center gap-1.5">
                    <Tv className="h-3.5 w-3.5 text-sky-300" />
                    Stream ready
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 text-[11px]">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 border border-slate-700 text-slate-300">
                {t.status === 'live'
                  ? 'Live now'
                  : t.status === 'upcoming'
                  ? 'Upcoming'
                  : 'Finished (demo)'}
              </span>
              <button
                type="button"
                onClick={() => onRegister && onRegister(t.id)}
                disabled={registered || t.status === 'finished'}
                className={
                  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ' +
                  (registered
                    ? 'bg-emerald-600/80 text-emerald-50 cursor-default border border-emerald-500/60'
                    : t.status === 'finished'
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/60')
                }
              >
                <PlayCircle className="h-4 w-4" />
                {registered
                  ? 'Registered (demo)'
                  : t.status === 'finished'
                  ? 'Registration closed'
                  : 'Register'}
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
