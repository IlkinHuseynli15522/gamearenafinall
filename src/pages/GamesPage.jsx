// src/pages/GamesPage.jsx
import React, { useMemo, useState, useEffect } from 'react';
import * as service from '../data/service';
import GameDetailModal from '../components/games/GameDetailModal';
import { useApp } from '../context/AppProvider';
import { Heart, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function GamesPage() {
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 280);
    return () => clearTimeout(t);
  }, []);

  const app = useApp() || {};
  const user = app.user || {};
  const toggleFavorite = app.toggleFavorite || (() => {});
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [filterCompetitive, setFilterCompetitive] = useState('all');

  const all = service.getAllGames();
  const favorites = Array.isArray(user.favorites) ? user.favorites : [];

  const filtered = useMemo(() => {
    let out = Array.isArray(all) ? all.slice() : [];
    if (query) {
      out = out.filter((g) =>
        (g.name || '').toLowerCase().includes(query.toLowerCase())
      );
    }
    if (filterCompetitive === 'competitive') {
      out = out.filter((g) => !!g.competitive);
    }
    if (filterCompetitive === 'casual') {
      out = out.filter((g) => !g.competitive);
    }
    return out;
  }, [all, query, filterCompetitive]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-7 w-48 bg-slate-800/60 animate-pulse rounded" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 h-32 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header + controls */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-400" />
            Featured games
          </h2>
          <p className="text-[11px] text-slate-400">
            Browse titles, see quick specs and favorite what you want to track.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 bg-slate-950/70 border border-slate-800 rounded-xl px-2 py-1.5">
            <input
              data-search
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search games…"
              className="bg-transparent text-xs outline-none placeholder:text-slate-500"
            />
          </div>
          <div className="flex items-center gap-1 bg-slate-950/70 border border-slate-800 rounded-xl px-2 py-1.5 text-[11px]">
            <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={filterCompetitive}
              onChange={(e) => setFilterCompetitive(e.target.value)}
              className="bg-transparent outline-none text-xs"
            >
              <option value="all">All</option>
              <option value="competitive">Competitive only</option>
              <option value="casual">Casual / party</option>
            </select>
          </div>
        </div>
      </header>

      {/* Favorites strip */}
      {favorites.length > 0 && (
        <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_18px_45px_rgba(0,0,0,0.55)] px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-medium flex items-center gap-2">
              <Heart className="h-3.5 w-3.5 text-rose-400" />
              Favorites
            </h3>
            <button
              onClick={() => navigate('/tournaments')}
              className="text-[11px] text-sky-300 hover:text-sky-200"
            >
              View tournaments →
            </button>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px]">
            {favorites.map((fid) => {
              const g = all.find((x) => x.id === fid);
              if (!g) return null;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setOpenId(g.id)}
                  className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 border border-slate-700 px-3 py-1 hover:border-sky-500 hover:bg-slate-900 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{g.name}</span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Game cards */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((g) => (
          <article
            key={g.id}
            onClick={() => setOpenId(g.id)}
            className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_18px_45px_rgba(0,0,0,0.55)] p-3 flex flex-col gap-3 cursor-pointer transition-transform hover:-translate-y-0.5 hover:border-sky-400/60"
          >
            <div className="relative">
              <img
                src={`/assets/${g.slug}-banner.jpg`}
                alt={g.name}
                className="w-full h-32 object-cover rounded-xl border border-slate-700/80"
                onError={(e) => {
                  e.currentTarget.src = '/assets/game-placeholder.jpg';
                }}
              />
              {g.competitive && (
                <span className="absolute top-2 left-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-100 border border-emerald-500/50">
                  Ranked / Esports
                </span>
              )}
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold leading-tight">
                    {g.name || 'Untitled'}
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    {g.difficulty || 'Unknown'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {(g.genres || []).join(', ')}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(g.id);
                }}
                className="p-1.5 rounded-full bg-slate-900/80 border border-slate-700 hover:bg-slate-800"
                title="Toggle favorite"
              >
                <Heart
                  className={
                    'h-4 w-4 ' +
                    (favorites.includes(g.id)
                      ? 'text-rose-400'
                      : 'text-slate-500')
                  }
                />
              </button>
            </div>

            <p className="text-[11px] text-slate-300 line-clamp-3">
              {g.description ||
                'Competitive title with rich meta and esports presence.'}
            </p>

            <div className="grid grid-cols-3 gap-2 text-[11px] mt-1">
              <div className="rounded-xl bg-slate-950/70 border border-slate-800 px-2 py-1.5">
                <p className="text-slate-400">Players</p>
                <p className="text-xs font-semibold text-slate-50">
                  {g.playerCount.toLocaleString()}
                </p>
              </div>
              <div className="rounded-xl bg-slate-950/70 border border-slate-800 px-2 py-1.5">
                <p className="text-slate-400">Prize pool</p>
                <p className="text-xs font-semibold text-slate-50">
                  ${g.prizePool.toLocaleString()}
                </p>
              </div>
              <div className="rounded-xl bg-slate-950/70 border border-slate-800 px-2 py-1.5">
                <p className="text-slate-400">Win rate</p>
                <p className="text-xs font-semibold text-slate-50">
                  {g.winRate || '50%'}
                </p>
              </div>
            </div>
          </article>
        ))}

        {filtered.length === 0 && (
          <p className="text-[11px] text-slate-400">
            No games match your filters in this demo dataset.
          </p>
        )}
      </section>

      {openId && (
        <GameDetailModal gameId={openId} onClose={() => setOpenId(null)} />
      )}
    </div>
  );
}
