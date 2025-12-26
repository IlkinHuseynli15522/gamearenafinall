// src/components/games/GameDetailModal.jsx
import React, { useMemo, useState } from 'react';
import { X } from 'lucide-react';
import * as service from '../../data/service';
import { useApp } from '../../context/AppProvider';
import { Users, Trophy, Activity, Tv } from 'lucide-react';

function TabButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'px-3 py-1.5 text-[11px] rounded-full transition-colors ' +
        (active
          ? 'bg-slate-100 text-slate-900'
          : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800')
      }
    >
      {label}
    </button>
  );
}

export default function GameDetailModal({ gameId, onClose }) {
  const g = service.getGameById(gameId);
  const app = useApp();
  const user = app?.user || {};
  const registerTournament = app?.registerTournament || (() => {});
  const toggleFavorite = app?.toggleFavorite || (() => {});

  const [tab, setTab] = useState('overview');

  const matches = useMemo(
    () => service.getMatchesByGame(gameId).slice(0, 5),
    [gameId]
  );

  const potentialTournament = useMemo(() => {
    const all = service.getAllTournaments();
    return (
      all.find(
        (t) =>
          t.gameId === gameId &&
          (t.status === 'upcoming' || t.status === 'live')
      ) || null
    );
  }, [gameId]);

  if (!g) return null;

  React.useEffect(() => {
    function onCloseAll() {
      onClose && onClose();
    }
    window.addEventListener('ga:closeModals', onCloseAll);
    return () => window.removeEventListener('ga:closeModals', onCloseAll);
  }, [onClose]);

  const isFavorite =
    Array.isArray(user.favorites) && user.favorites.includes(g.id);

  const isRegistered =
    potentialTournament &&
    Array.isArray(user.registeredTournaments) &&
    user.registeredTournaments.includes(potentialTournament.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-auto rounded-2xl border border-white/10 bg-slate-950/95 shadow-[0_22px_60px_rgba(0,0,0,0.8)] p-5">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-md hover:bg-slate-800/80"
        >
          <X className="w-4 h-4 text-slate-200" />
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex gap-4">
            <img
              src={`/assets/${g.slug}-banner.jpg`}
              alt={g.name}
              className="w-28 h-20 object-cover rounded-xl border border-slate-700"
              onError={(e) => {
                e.currentTarget.src = '/assets/game-placeholder.jpg';
              }}
            />
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-slate-50">
                {g.name}
              </h2>
              <p className="text-[11px] text-slate-400">
                {(g.genres || []).join(', ')} • {g.mode || 'Competitive mode'}
              </p>
              <p className="text-[11px] text-slate-400">
                Platforms: {g.platforms || 'PC'} • Regions:{' '}
                {g.regions || 'Global'}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 text-[11px]">
            <button
              type="button"
              onClick={() => toggleFavorite(g.id)}
              className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 border border-slate-700 px-3 py-1 hover:border-rose-400/70"
            >
              <span
                className={
                  'w-2 h-2 rounded-full ' +
                  (isFavorite ? 'bg-rose-400' : 'bg-slate-500')
                }
              />
              <span>{isFavorite ? 'Unfavorite' : 'Favorite'}</span>
            </button>
            <div className="grid grid-cols-3 gap-1 text-[10px]">
              <MetricPill
                label="Players"
                value={g.playerCount?.toLocaleString() || '-'}
                icon={Users}
              />
              <MetricPill
                label="Prize pool"
                value={`$${g.prizePool?.toLocaleString() || '0'}`}
                icon={Trophy}
              />
              <MetricPill
                label="Win rate"
                value={g.winRate || '50%'}
                icon={Activity}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-4 flex items-center gap-2 text-[11px]">
          <TabButton
            label="Overview"
            active={tab === 'overview'}
            onClick={() => setTab('overview')}
          />
          <TabButton
            label="Recent matches"
            active={tab === 'matches'}
            onClick={() => setTab('matches')}
          />
          <TabButton
            label="Tournaments"
            active={tab === 'tournament'}
            onClick={() => setTab('tournament')}
          />
        </div>

        {/* Content */}
        <div className="mt-4 space-y-4 text-[11px]">
          {tab === 'overview' && (
            <div className="space-y-3">
              <p className="text-slate-300">
                {g.longDescription ||
                  g.description ||
                  'Competitive title with rich meta and esports presence.'}
              </p>
              <p className="text-slate-400">
                In a live product you could plug in API feeds for ranks, match
                history, pick‑rates, heatmaps and more. This modal demonstrates
                how that information can be framed for players or staff.
              </p>
            </div>
          )}

          {tab === 'matches' && (
            <div className="space-y-2">
              {matches.length === 0 && (
                <p className="text-slate-400">
                  No recent matches in this demo for this title.
                </p>
              )}
              {matches.map((m) => (
                <div
                  key={m.id}
                  className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 flex items-center justify-between"
                >
                  <div>
                    <p className="text-slate-100">
                      {m.teams?.map((t) => t.name).join(' vs ')}
                    </p>
                    <p className="text-slate-400">
                      Map: {m.map} •{' '}
                      {new Date(m.startTime).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right text-slate-300">
                    <p>
                      {Array.isArray(m.score)
                        ? m.score.join(' : ')
                        : m.score}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Status: {m.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'tournament' && (
            <div className="space-y-3">
              {!potentialTournament && (
                <p className="text-slate-400">
                  No linked tournament for this game in the demo right now.
                </p>
              )}
              {potentialTournament && (
                <>
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-50">
                        {potentialTournament.name}
                      </p>
                      <p className="text-slate-400">
                        {potentialTournament.region} •{' '}
                        {potentialTournament.date}
                      </p>
                      <p className="text-slate-400">
                        {potentialTournament.format} •{' '}
                        {potentialTournament.bracketSize} teams
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          registerTournament(potentialTournament.id)
                        }
                        disabled={isRegistered}
                        className={
                          'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ' +
                          (isRegistered
                            ? 'bg-emerald-600/80 text-emerald-50 cursor-default border border-emerald-500/60'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/60')
                        }
                      >
                        <Users className="h-3.5 w-3.5" />
                        {isRegistered
                          ? 'Registered (demo)'
                          : 'Register for event'}
                      </button>
                      {potentialTournament.streamUrl && (
                        <a
                          href={potentialTournament.streamUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-sky-300 hover:underline"
                        >
                          <Tv className="h-3.5 w-3.5" />
                          Watch stream
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-slate-400">
                    Registration here only updates local state for the demo. In
                    production, this would map to your tournament platform or
                    API.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MetricPill({ label, value, icon: Icon }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 border border-slate-700 px-2 py-1">
      <Icon className="h-3 w-3 text-slate-300" />
      <span className="text-[10px] text-slate-400">{label}</span>
      <span className="text-[10px] text-slate-100 font-semibold">
        {value}
      </span>
    </div>
  );
}
