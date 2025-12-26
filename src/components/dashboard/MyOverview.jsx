import React, { useEffect, useMemo, useState } from 'react';
import { getUser } from '../../data/service';

// Simple inline SVG line chart for MMR history. No external deps.
function MMRChart({ points = [], width = 600, height = 160 }) {
  const padding = 12;
  const w = width;
  const h = height;
  if (!points || points.length === 0) return <div className="text-sm">No MMR data</div>;

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = Math.max(1, max - min);

  const stepX = (w - padding * 2) / Math.max(1, points.length - 1);

  const path = points
    .map((p, i) => {
      const x = padding + i * stepX;
      const y = padding + (1 - (p - min) / range) * (h - padding * 2);
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');

  const areaPath = `${path} L ${w - padding} ${h - padding} L ${padding} ${h - padding} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none">
      <defs>
        <linearGradient id="mmrGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#mmrGrad)" />
      <path d={path} fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {points.map((p, i) => {
        const x = padding + i * stepX;
        const y = padding + (1 - (p - min) / range) * (h - padding * 2);
        return <circle key={i} cx={x} cy={y} r={i === points.length - 1 ? 3.5 : 2.2} fill={i === points.length - 1 ? '#3b82f6' : '#93c5fd'} />;
      })}
    </svg>
  );
}

export default function MyOverview() {
  const [u, setU] = useState(null);

  useEffect(() => {
    const data = getUser();
    setU(data);
  }, []);

  const mmrPoints = useMemo(() => (u ? u.mmrHistory || [] : []), [u]);

  const perGame = useMemo(() => {
    if (!u) return [];
    return Object.entries(u.perGameStats || {}).map(([gameId, s]) => ({ gameId, ...s }));
  }, [u]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold">My Overview</h3>
          <p className="text-[11px] text-slate-400">Recent performance and playtime</p>
        </div>
        <div className="text-[11px] text-slate-400">Seasonal</div>
      </div>

      <div className="grid lg:grid-cols-[1fr,220px] gap-4">
        <div className="space-y-3">
          <div className="rounded-lg border border-slate-800 p-3 bg-slate-950/70">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-medium">MMR (last 30)</div>
              <div className="text-[11px] text-slate-400">Current: {mmrPoints.length ? mmrPoints[mmrPoints.length-1] : '—'}</div>
            </div>
            <MMRChart points={mmrPoints} width={700} height={180} />
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            {perGame.map((g) => (
              <div key={g.gameId} className="rounded-lg border border-slate-800 bg-slate-950/70 p-3 text-[11px]">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium">{g.gameId}</div>
                  <div className="text-[12px] text-slate-300">{g.winRate}% WR</div>
                </div>
                <div className="text-sm font-semibold">{g.playtimeHours}h</div>
                <div className="text-[10px] text-slate-400">{g.rank}</div>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-3">
          <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-3 text-[11px]">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">Win rate by title</div>
              <div className="text-[10px] text-slate-400">Overall</div>
            </div>
            <div className="space-y-2">
              {perGame.map((g) => (
                <div key={g.gameId} className="flex items-center gap-3">
                  <div className="w-20 text-[11px] text-slate-300">{g.gameId}</div>
                  <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div style={{ width: `${g.winRate}%` }} className="h-full bg-emerald-400" />
                  </div>
                  <div className="w-10 text-[11px] text-slate-300 text-right">{g.winRate}%</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-3 text-[11px]">
            <div className="font-medium mb-2">Session goals</div>
            <p className="text-[11px] text-slate-400">Manage quick goals from your profile.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
