// src/context/AppProvider.jsx
import React, { createContext, useContext, useState, useMemo } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState({
    username: 'Ilkin',
    rank: 'Immortal II',
    country: 'AZ',
    favorites: ['game-a', 'game-b'],
    registeredTournaments: ['t2-beta'],
    goals: [
      {
        id: 'g-1',
        title: 'Play 3 ranked matches',
        description: '',
        progress: 1,
        target: 3,
        completed: false,
      },
      {
        id: 'g-2',
        title: 'Watch 1 live tournament',
        description: '',
        progress: 0,
        target: 1,
        completed: false,
      },
    ],
  });

  function toggleFavorite(gameId) {
    setUser((u) => {
      const favorites = Array.isArray(u.favorites) ? [...u.favorites] : [];
      const idx = favorites.indexOf(gameId);
      if (idx === -1) favorites.push(gameId);
      else favorites.splice(idx, 1);
      return { ...u, favorites };
    });
  }

  function registerTournament(tournamentId) {
    setUser((u) => {
      const regs = Array.isArray(u.registeredTournaments)
        ? [...u.registeredTournaments]
        : [];
      if (!regs.includes(tournamentId)) regs.push(tournamentId);
      return { ...u, registeredTournaments: regs };
    });
  }

  function addGoal(goal) {
    setUser((u) => ({
      ...u,
      goals: [...(u.goals || []), goal],
    }));
  }

  function updateGoal(goal) {
    setUser((u) => ({
      ...u,
      goals: (u.goals || []).map((g) => (g.id === goal.id ? goal : g)),
    }));
  }

  const value = useMemo(
    () => ({
      user,
      toggleFavorite,
      registerTournament,
      addGoal,
      updateGoal,
    }),
    [user]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
