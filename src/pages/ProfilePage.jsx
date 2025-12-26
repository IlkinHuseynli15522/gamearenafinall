// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppProvider';
import RankProgress from '../components/profile/RankProgress';
import GoalsPanel from '../components/profile/GoalsPanel';
import * as service from '../data/service';
import { User as UserIcon, Target, LineChart } from 'lucide-react';

export default function ProfilePage() {
  const app = useApp();
  const user = app?.user || {};
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 260);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-sm text-slate-400">Loading profile…</p>
      </div>
    );
  }

  const mmr = service.getRecentMMR ? service.getRecentMMR() : [];

  return (
    <div className="space-y-6">
      {/* Header + identity */}
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 backdrop-blur-xl shadow-[0_22px_60px_rgba(0,0,0,0.6)] px-5 py-5 flex flex-col md:flex-row gap-5">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
            <UserIcon className="w-6 h-6 text-slate-200" />
          </div>
          <div className="space-y-1">
            <h1 className="text-lg font-semibold tracking-tight">
              {user.username || 'Player'}
            </h1>
            <p className="text-sm text-slate-400">
              Rank: {user.rank || 'Unranked'} • Country: {user.country || 'N/A'}
            </p>
            <p className="text-[11px] text-slate-400 max-w-md">
              This profile is fully local to the demo. In production, connect it
              to live game accounts, cross‑platform stats or coaching programs.
            </p>
          </div>
        </div>

        <div className="w-full md:w-64 grid grid-cols-2 gap-2 text-[11px]">
          <ProfileMetric
            label="Tracked titles"
            value={service.getAllGames().length}
          />
          <ProfileMetric
            label="Registered tournaments"
            value={
              Array.isArray(user.registeredTournaments)
                ? user.registeredTournaments.length
                : 0
            }
          />
          <ProfileMetric
            label="Goals configured"
            value={Array.isArray(user.goals) ? user.goals.length : 0}
          />
          <ProfileMetric label="Demo region" value="EU / MENA" />
        </div>
      </section>

      {/* MMR + goals */}
      <section className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_18px_45px_rgba(0,0,0,0.55)] p-4 space-y-3">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <LineChart className="h-4 w-4 text-sky-400" />
                Rank progression
              </h2>
              <p className="text-[11px] text-slate-400">
                Recent demo MMR trend for your main competitive title.
              </p>
            </div>
          </div>
          <RankProgress mmr={mmr} />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_18px_45px_rgba(0,0,0,0.55)] p-4 space-y-3">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <Target className="h-4 w-4 text-emerald-400" />
                Session goals
              </h2>
              <p className="text-[11px] text-slate-400">
                Configure small objectives for this demo session. Progress is
                stored locally only.
              </p>
            </div>
          </div>
          <GoalsPanel />
        </div>
      </section>
    </div>
  );
}

function ProfileMetric({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-950/70 border border-slate-800 px-3 py-2 flex flex-col justify-between">
      <p className="text-[10px] text-slate-400">{label}</p>
      <p className="text-xs font-semibold text-slate-50">{value}</p>
    </div>
  );
}
