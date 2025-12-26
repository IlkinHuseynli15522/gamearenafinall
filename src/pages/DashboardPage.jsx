// src/pages/DashboardPage.jsx
import React from 'react';
import * as service from '../data/service';
import { Trophy, Gamepad2, Users, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const topGames = service.getTopGames({ limit: 4 });
  const liveTournaments = service.getLiveTournaments();
  const achievements = service.getAchievements();

  const totalPrize = service
    .getAllTournaments()
    .reduce((sum, t) => sum + (t.prizePool || 0), 0);

  return (
    <div className="space-y-6">
      {/* Hero section */}
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 backdrop-blur-xl shadow-[0_22px_60px_rgba(0,0,0,0.6)] px-5 py-5 flex flex-col md:flex-row gap-5">
        <div className="flex-1 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-400/40 px-3 py-1 text-[11px] text-emerald-100">
            <Sparkles className="h-3.5 w-3.5" />
            Interactive demo — all data is simulated
          </div>

          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h1 className="text-lg md:text-xl font-semibold tracking-tight">
              GameArena Control Center
            </h1>
          </div>

          <p className="text-[11px] text-slate-300 max-w-xl">
            Monitor competitive titles, follow tournaments and show a unified
            view of your esports or gaming platform. Everything here is wired to
            test data so you can demo real flows without a backend.
          </p>

          <div className="grid grid-cols-3 gap-2 text-[11px] mt-1">
            <MetricCard
              label="Tracked games"
              value={topGames.length}
              icon={Gamepad2}
            />
            <MetricCard
              label="Active tournaments"
              value={liveTournaments.length}
              icon={Users}
            />
            <MetricCard
              label="Total demo prize pool"
              value={`$${totalPrize.toLocaleString()}`}
              icon={Trophy}
            />
          </div>
        </div>

        <div className="w-full md:w-64 rounded-2xl border border-slate-800 bg-slate-950/80 p-3 flex flex-col justify-between">
          <p className="text-[11px] text-slate-400 mb-2">
            This side panel can host cross‑game stats, sponsor blocks or
            onboarding hints in a real product. In the demo it shows unlocked
            achievements.
          </p>
          <div className="space-y-2 text-[11px]">
            {achievements.map((a) => (
              <div
                key={a.id}
                className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-slate-50">{a.title}</p>
                  <p className="text-slate-400">{a.description}</p>
                </div>
                <span
                  className={
                    'ml-2 inline-flex px-2 py-0.5 rounded-full text-[10px] border ' +
                    (a.unlocked
                      ? 'bg-emerald-500/20 text-emerald-100 border-emerald-400/40'
                      : 'bg-slate-800 text-slate-300 border-slate-600')
                  }
                >
                  {a.unlocked ? 'Unlocked' : 'Locked'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top games */}
      <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_18px_45px_rgba(0,0,0,0.55)] p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Gamepad2 className="h-4 w-4 text-sky-400" />
              Top trending games
            </h3>
            <p className="text-[11px] text-slate-400">
              Snapshot of the main titles you track in this environment.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 text-[11px]">
          {topGames.map((g) => (
            <div
              key={g.id}
              className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 flex gap-3 hover:border-sky-500/60 transition-colors"
            >
              <img
                src={`/assets/${g.slug}-banner.jpg`}
                alt={g.name}
                className="w-20 h-16 object-cover rounded-md border border-slate-700"
                onError={(e) => {
                  e.currentTarget.src = '/assets/game-placeholder.jpg';
                }}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-50">{g.name}</span>
                  <span className="text-[10px] text-emerald-300">
                    {g.winRate} WR
                  </span>
                </div>
                <p className="text-slate-400 mb-1">
                  {(g.genres || []).join(', ')}
                </p>
                <div className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-1.5">
                    Players {g.playerCount.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1.5">
                    Prize {g.prizePool.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live tournaments */}
      <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_18px_45px_rgba(0,0,0,0.55)] p-4">
        <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
          <Users className="h-4 w-4 text-emerald-400" />
          Live tournaments
        </h3>
        <div className="space-y-2 text-[11px]">
          {liveTournaments.map((t) => (
            <div
              key={t.id}
              className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 flex items-center justify-between"
            >
              <div>
                <span className="font-medium text-slate-50">{t.name}</span>
                <p className="text-slate-400">
                  {t.gameName} • {t.region}
                </p>
              </div>
              <div className="text-right text-slate-400">
                <p>
                  {t.format} • {t.bracketSize} teams
                </p>
                <p>Prize {t.prizePool.toLocaleString()}</p>
              </div>
            </div>
          ))}
          {liveTournaments.length === 0 && (
            <p className="text-[11px] text-slate-400">
              No live tournaments in the demo data.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

function MetricCard({ label, value, icon: Icon }) {
  return (
    <div className="rounded-xl bg-slate-950/70 border border-slate-800 px-3 py-2 flex items-center gap-2">
      <div className="w-7 h-7 rounded-full bg-slate-900 flex items-center justify-center">
        <Icon className="h-3.5 w-3.5 text-slate-200" />
      </div>
      <div className="flex-1">
        <p className="text-[10px] text-slate-400">{label}</p>
        <p className="text-xs font-semibold text-slate-50">{value}</p>
      </div>
    </div>
  );
}
