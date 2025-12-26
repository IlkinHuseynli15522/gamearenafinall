import React from 'react';
import { X } from 'lucide-react';
import * as service from '../../data/service';

export default function TournamentDetailModal({ id, onClose, onRegister, registered }) {
  const t = service.getTournamentById(id);
  if (!t) return null;

  React.useEffect(() => {
    function onCloseAll() { onClose && onClose(); }
    window.addEventListener('ga:closeModals', onCloseAll);
    return () => window.removeEventListener('ga:closeModals', onCloseAll);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-auto rounded-2xl border border-slate-800 bg-slate-900/95">
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-semibold">{t.name}</h3>
            <div className="text-[11px] text-slate-400">{t.region} • {t.format} • {t.bracketSize} teams</div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="p-2 rounded-md hover:bg-slate-800/60"><X className="h-4 w-4"/></button>
          </div>
        </div>

        <div className="p-4 space-y-4 text-[11px]">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="font-medium">Sponsor</div>
              <div className="text-slate-300">{t.sponsor}</div>
              <div className="font-medium mt-2">Rules</div>
              <div className="text-slate-300">{t.ruleSummary}</div>
            </div>
            <div className="space-y-2">
              <div className="font-medium">Platform & Stream</div>
              <div className="text-slate-300">{t.platform} {t.streamUrl ? (<a className="text-sky-300 hover:underline ml-2" href={t.streamUrl} target="_blank" rel="noreferrer">Watch</a>) : null}</div>
              <div className="font-medium mt-2">Dates</div>
              <div className="text-slate-300">{new Date(t.startDate).toLocaleString()} – {new Date(t.endDate).toLocaleString()}</div>
            </div>
          </div>

          <div>
            <div className="font-medium mb-2">Bracket (preview)</div>
            {t.bracket ? (
              <div className="rounded-lg border border-slate-800 p-3 bg-slate-950/70 text-[11px] overflow-auto">
                {t.bracket.rounds.map((r, idx) => (
                  <div key={idx} className="mb-2">
                    <div className="font-medium">{r.round}</div>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {r.matches.map((m, i) => (
                        <div key={i} className="rounded-md border border-slate-800 p-2 bg-slate-900/60">{m[0]} vs {m[1]}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-400">Bracket will be available closer to the event.</div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-[11px] text-slate-400">Prize pool: ${t.prizePool?.toLocaleString() || 'TBD'}</div>
            <div>
              {!registered ? (
                <button onClick={() => onRegister(t.id)} className="rounded-lg bg-emerald-500/10 border border-emerald-500 px-3 py-1.5 text-[11px] text-emerald-200">Register</button>
              ) : (
                <span className="rounded-full px-3 py-1 text-[11px] bg-sky-700/10 border border-sky-500/30 text-sky-200">Registered</span>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
