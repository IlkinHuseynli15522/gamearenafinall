// src/components/profile/RankProgress.jsx
import React from 'react';

export default function RankProgress({ mmr = [] }) {
  if (!mmr || mmr.length === 0) {
    return (
      <p className="text-[11px] text-slate-400">
        No ranked MMR history in this demo yet.
      </p>
    );
  }

  const max = Math.max(...mmr);
  const min = Math.min(...mmr);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-100">
          MMR over recent matches
        </h3>
        <p className="text-[10px] text-slate-400">
          Highest: {max} • Lowest: {min}
        </p>
      </div>

      {/* Bar chart */}
      <div className="h-28 flex items-end gap-1">
        {mmr.map((value, idx) => {
          const normalized = max === min ? 1 : (value - min) / (max - min);
          const height = 30 + normalized * 60; // 30–90px

          return (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <div
                className="w-4 rounded-t-md bg-gradient-to-t from-sky-500 to-emerald-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                style={{ height: `${height}px` }}
                title={`${value} MMR`}
              />
              <span className="mt-1 text-[9px] text-slate-400">
                G{idx + 1}
              </span>
            </div>
          );
        })}
      </div>

      {/* Small legend */}
      <div className="flex items-center justify-between text-[10px] text-slate-400">
        <span>Each bar = one recent ranked match in this demo.</span>
        <span>
          Trend: {mmr[0]} → {mmr[mmr.length - 1]} MMR
        </span>
      </div>
    </div>
  );
}
