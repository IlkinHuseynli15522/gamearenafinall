/**
 * Single demo user fixture with mmr history, friends, settings, goals.
 */

export const user = {
  id: 'user-demo',
  username: 'DemoPlayer',
  avatar: '/src/assets/avatar-placeholder.png',
  mmrHistory: (function gen() {
    // Generate 30 semi-random mmr points around 1800
    const base = 1800;
    const out = [];
    for (let i = 0; i < 30; i++) {
      const noise = Math.round((Math.sin(i / 3) * 50) + (Math.random() * 30 - 15));
      out.push(base + noise + i * (i % 5 === 0 ? 3 : 0));
    }
    return out;
  })(),
  perGameStats: {
    'game-a': { playtimeHours: 280, winRate: 51.2, rank: 'Diamond' },
    'game-b': { playtimeHours: 400, winRate: 49.5, rank: 'Platinum' },
    'game-c': { playtimeHours: 150, winRate: 50.0, rank: 'Gold' },
    'game-d': { playtimeHours: 220, winRate: 45.3, rank: 'Diamond' }
  },
  friends: [
    { id: 'f1', username: 'Friend 1', avatar: '/src/assets/avatar-placeholder.png', currentGame: 'Game A', rank: 'High', status: 'In match' },
    { id: 'f2', username: 'Friend 2', avatar: '/src/assets/avatar-placeholder.png', currentGame: 'Game B', rank: 'Mid', status: 'Lobby' },
    { id: 'f3', username: 'Friend 3', avatar: '/src/assets/avatar-placeholder.png', currentGame: 'Game C', rank: 'Low', status: 'AFK' },
    { id: 'f4', username: 'Friend 4', avatar: '/src/assets/avatar-placeholder.png', currentGame: 'Game D', rank: 'Mid', status: 'Lobby' },
    { id: 'f5', username: 'Friend 5', avatar: '/src/assets/avatar-placeholder.png', currentGame: 'Game E', rank: 'Mid', status: 'Streaming' }
  ],
  settings: { theme: 'dark', language: 'en' },
  registeredTournaments: ['t2-beta'],
  favorites: ['game-a','game-c'],
  goals: [
    { id: 'g1', title: 'Play 3 matches', description: 'Play 3 matches today', progress: 0, target: 3, completed: false },
    { id: 'g2', title: 'Win 2 games', description: 'Win 2 games in a row', progress: 0, target: 2, completed: false }
  ]
};
