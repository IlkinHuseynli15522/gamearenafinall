// src/App.jsx
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import {
  Trophy,
  Users,
  Gamepad2,
  Menu,
  X,
  User as UserIcon,
} from 'lucide-react';

import ToastProvider from './components/ui/ToastProvider';
import { AppProvider } from './context/AppProvider';
import ErrorBoundary from './components/ErrorBoundary';
import OfflineBanner from './components/OfflineBanner';

import DashboardPage from './pages/DashboardPage';
import GamesPage from './pages/GamesPage';
import TournamentsPage from './pages/TournamentsPage';
import ProfilePage from './pages/ProfilePage';
import * as service from './data/service';

function MainApp() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [countdown, setCountdown] = useState(3600 * 6);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Welcome to GameArena',
      message: 'All data here is fake but fully interactive.',
      type: 'info',
    },
  ]);

  const navigate = useNavigate();
  const location = useLocation();

  // Restore last route on first load
  useEffect(() => {
    try {
      const last = localStorage.getItem('ga:lastRoute');
      if (last && last !== location.pathname) {
        navigate(last, { replace: true });
      }
    } catch (e) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist last route
  useEffect(() => {
    try {
      localStorage.setItem('ga:lastRoute', location.pathname);
    } catch (e) {}
  }, [location.pathname]);

  // Simple countdown + demo notification
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 0) return prev - 1;
        const id = Date.now();
        setNotifications((n) => [
          {
            id,
            title: 'New test tournament',
            message: 'A fresh simulated event has been added to the schedule.',
            type: 'success',
          },
          ...n,
        ]);
        return 3600 * 6;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const games = service.getAllGames();
  const tournaments = service.getAllTournaments();
  const achievements = service.getAchievements();

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e) {
      if (e.key === '/') {
        const el = document.querySelector('[data-search]');
        if (el) {
          e.preventDefault();
          el.focus();
        }
      }
      if (e.key === '1') navigate('/');
      if (e.key === '2') navigate('/games');
      if (e.key === '3') navigate('/tournaments');
      if (e.key === '4') navigate('/profile');
      if (e.key === 'Escape') {
        window.dispatchEvent(new CustomEvent('ga:closeModals'));
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);

  return (
    <div
      className="min-h-screen text-slate-50"
      style={{
        backgroundImage: 'url(/assets/page_bg_raw.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="min-h-screen bg-slate-950/85">
        <OfflineBanner />

        {/* Top bar */}
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>GameArena Demo</span>
          </button>

          <div className="hidden sm:flex items-center gap-6 text-xs">
            <span className="text-slate-400">
              Next test tournament in {formatTime(countdown)}
            </span>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => navigate('/games')}
                className="flex items-center gap-1 text-slate-300 hover:text-slate-50"
              >
                <Gamepad2 className="w-4 h-4" />
                Games
              </button>
              <button
                type="button"
                onClick={() => navigate('/tournaments')}
                className="flex items-center gap-1 text-slate-300 hover:text-slate-50"
              >
                <Users className="w-4 h-4" />
                Tournaments
              </button>
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="flex items-center gap-1 text-slate-300 hover:text-slate-50"
              >
                <UserIcon className="w-4 h-4" />
                Profile
              </button>
            </div>
          </div>

          <button
            type="button"
            className="sm:hidden p-2 rounded-md border border-slate-700"
            onClick={() => setMobileNavOpen((v) => !v)}
          >
            {mobileNavOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileNavOpen && (
          <div className="sm:hidden px-4 pb-4 flex flex-col gap-2 text-sm">
            <button onClick={() => navigate('/')}>Dashboard</button>
            <button onClick={() => navigate('/games')}>Games</button>
            <button onClick={() => navigate('/tournaments')}>Tournaments</button>
            <button onClick={() => navigate('/profile')}>Profile</button>
          </div>
        )}

        {/* Main content */}
        <div className="max-w-6xl mx-auto px-4 pb-10 space-y-4">
          <div className="space-y-1 text-xs text-slate-400">
            <p>
              Track ongoing tournaments, monitor your favorite games and see
              where to queue next. Everything you see is test data wired to real
              interactions.
            </p>
            <p>
              Games loaded: {games.length} • Tournaments: {tournaments.length} •
              Achievements: {achievements.length}
            </p>
          </div>

          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/tournaments" element={<TournamentsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>

        {/* Notifications */}
        <div className="fixed bottom-4 right-4 space-y-2 text-xs">
          {notifications.slice(0, 3).map((n) => (
            <div
              key={n.id}
              className="rounded-md bg-slate-900/90 border border-slate-700 px-3 py-2"
            >
              <p className="font-medium text-slate-50">{n.title}</p>
              <p className="text-slate-400">{n.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <MainApp />
          </ErrorBoundary>
        </BrowserRouter>
      </AppProvider>
    </ToastProvider>
  );
}
