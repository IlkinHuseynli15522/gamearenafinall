// src/pages/TournamentsPage.jsx
import React, { useState, useEffect } from 'react';
import * as service from '../data/service';
import TournamentsList from '../components/tournaments/TournamentsList';
import TournamentDetailModal from '../components/tournaments/TournamentDetailModal';
import { useApp } from '../context/AppProvider';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Gamepad2, Users } from 'lucide-react';

export default function TournamentsPage() {
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('upcoming');
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 320);
    return () => clearTimeout(t);
  }, []);

  const app = useApp() || {};
  const user = app.user || {};
  const registerTournament = app.registerTournament || (() => {});
  const navigate = useNavigate();

  const upcoming = service.getTournamentsByStatus('upcoming');
  const live = service.getTournamentsByStatus('live');
  const finished = service.getTournamentsByStatus('finished');
  const items = tab === 'upcoming' ? upcoming : tab === 'live' ? live : finished;

  const myRegs = Array.isArray(user.registeredTournaments)
    ? user.registeredTournaments
    : [];

  function handleRegister(id) {
    registerTournament(id);
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-7 w-56 bg-slate-800/60 animate-pulse rounded" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 h-24 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-sky-400" />
            Tournaments
          </h2>
          <p className="text-[11px] text-slate-400">
            Move between upcoming, live and finished events. Registration is
            simulated via local state.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/games')}
          className="inline-flex items-center gap-2 text-xs rounded-full px-3 py-1 bg-slate-900/80 border border-slate-700 text-slate-100 hover:border-sky-500"
        >
          <Gamepad2 className="h-3.5 w-3.5" />
          Browse games
        </button>
      </header>

      {/* Tabs + summary */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="inline-flex rounded-full bg-slate-950/80 border border-slate-800 p-1 text-xs">
          <TabButton
            active={tab === 'upcoming'}
            onClick={() => setTab('upcoming')}
          >
            Upcoming
          </TabButton>
          <TabButton
            active={tab === 'live'}
            onClick={() => setTab('live')}
          >
            Live
          </TabButton>
          <TabButton
            active={tab === 'finished'}
            onClick={() => setTab('finished')}
          >
            Finished
          </TabButton>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            <span>Registered demo spots: {myRegs.length}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            <span>
              Active brackets: {live.length} • Upcoming events: {upcoming.length}
            </span>
          </div>
        </div>
      </div>

      {/* List */}
      <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_18px_45px_rgba(0,0,0,0.55)] p-4">
        <TournamentsList
          items={items}
          onOpen={(id) => setOpenId(id)}
          onRegister={handleRegister}
          myRegs={myRegs}
        />
      </section>

      {/* Detail modal */}
      {openId && (
        <TournamentDetailModal
          id={openId}
          onClose={() => setOpenId(null)}
          onRegister={handleRegister}
          registered={myRegs.includes(openId)}
        />
      )}
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'px-3 py-1 rounded-full transition-colors ' +
        (active
          ? 'bg-slate-100 text-slate-900'
          : 'text-slate-300 hover:text-slate-50')
      }
    >
      {children}
    </button>
  );
}
