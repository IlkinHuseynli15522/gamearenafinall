// src/data/service.js

// -------------------- GAMES (RICH TEST DATA) --------------------
const games = [
  {
    id: 'game-a',
    slug: 'valorant-demo',
    name: 'Valorant Demo',
    genres: ['Tactical FPS', 'Competitive'],
    difficulty: 'Intermediate',
    competitive: true,
    playerCount: 245230,
    prizePool: 95000,
    winRate: '52%',
    description:
      '5v5 tactical shooter with hero abilities, focused on precision aim, utility and team coordination.',
    longDescription:
      'Use this card to demonstrate how a competitive tactical FPS can be tracked: agent meta, map picks, ranked distribution and scrim scheduling.',
    mode: '5v5 bomb‑defusal',
    platforms: 'PC',
    regions: 'EU, NA, MENA',
  },
  {
    id: 'game-b',
    slug: 'cs2-demo',
    name: 'CS2 Demo',
    genres: ['Classic FPS', 'Esports'],
    difficulty: 'Advanced',
    competitive: true,
    playerCount: 331900,
    prizePool: 150000,
    winRate: '50%',
    description:
      'Classic bomb‑defusal FPS focused on utility usage, map control and economy management.',
    longDescription:
      'Ideal for showing integration with demo downloads, analytics providers and round‑by‑round breakdowns in a real platform.',
    mode: '5v5 bomb‑defusal',
    platforms: 'PC',
    regions: 'EU, CIS, NA',
  },
  {
    id: 'game-c',
    slug: 'rocket-demo',
    name: 'Rocket League Demo',
    genres: ['Sports', 'Arcade'],
    difficulty: 'Easy to learn',
    competitive: true,
    playerCount: 182210,
    prizePool: 70000,
    winRate: '50%',
    description:
      'Car football where mechanical skill, rotations and boost management decide who wins.',
    longDescription:
      'In production you could plug in cross‑platform MMR, replay libraries, coaching offers and training pack stats.',
    mode: '3v3 standard',
    platforms: 'PC, Console',
    regions: 'Global',
  },
  {
    id: 'game-d',
    slug: 'fortnite-demo',
    name: 'Fortnite Demo',
    genres: ['Battle Royale', 'Casual'],
    difficulty: 'Casual',
    competitive: false,
    playerCount: 354000,
    prizePool: 0,
    winRate: '50%',
    description:
      'Battle royale with building, rotating metas and seasonal events.',
    longDescription:
      'Great example for showcasing limited‑time modes, event passes and cross‑device engagement stats in the real product.',
    mode: '100‑player BR',
    platforms: 'PC, Console, Mobile',
    regions: 'Global',
  },
  {
    id: 'game-e',
    slug: 'league-demo',
    name: 'League of Legends Demo',
    genres: ['MOBA', 'Esports'],
    difficulty: 'Intermediate',
    competitive: true,
    playerCount: 502340,
    prizePool: 220000,
    winRate: '51%',
    description:
      '5v5 MOBA focused on macro play, champion comfort and objective control.',
    longDescription:
      'Attach draft data, champion pools, scrim results and international event tracking in a production system.',
    mode: '5v5 lanes',
    platforms: 'PC',
    regions: 'EUW, EUNE, NA, TR, RU',
  },
  {
    id: 'game-f',
    slug: 'apex-demo',
    name: 'Apex Legends Demo',
    genres: ['Battle Royale', 'Hero Shooter'],
    difficulty: 'Advanced',
    competitive: true,
    playerCount: 143820,
    prizePool: 60000,
    winRate: '49%',
    description:
      'Hero‑based battle royale with strong emphasis on movement and legend synergy.',
    longDescription:
      'In a real platform you could plug in ALGS standings, legend pick‑rates and zone prediction analytics.',
    mode: '3‑man squads BR',
    platforms: 'PC, Console',
    regions: 'Global',
  },
];

// -------------------- TOURNAMENTS (MULTIPLE PER GAME) --------------------
const tournaments = [
  // Valorant
  {
    id: 't1-alpha',
    gameId: 'game-a',
    gameName: 'Valorant Demo',
    name: 'Immortal Clash #1',
    status: 'upcoming',
    date: '2025‑12‑30',
    region: 'EU / MENA',
    format: 'Double Elimination',
    bracketSize: 16,
    prizePool: 5000,
    ruleSummary:
      'Bo3 matches with overtime enabled, map veto from 7‑map pool.',
    sponsor: 'AzerCloud Esports',
    platform: 'PC',
    streamUrl: 'https://twitch.tv/example',
    startDate: '2025-12-30T16:00:00Z',
    endDate: '2025-12-30T22:00:00Z',
    bracket: null,
  },
  {
    id: 't4-delta',
    gameId: 'game-a',
    gameName: 'Valorant Demo',
    name: 'Night Shift Cup',
    status: 'upcoming',
    date: '2026‑01‑05',
    region: 'MENA',
    format: 'Single Elimination',
    bracketSize: 8,
    prizePool: 2000,
    ruleSummary:
      'Bo1 until finals, Bo3 grand final. Tactical pause rules enabled.',
    sponsor: 'Midnight Energy',
    platform: 'PC',
    streamUrl: null,
    startDate: '2026-01-05T18:00:00Z',
    endDate: '2026-01-05T23:00:00Z',
    bracket: null,
  },

  // CS2
  {
    id: 't2-beta',
    gameId: 'game-b',
    gameName: 'CS2 Demo',
    name: 'Dust Masters Beta Cup',
    status: 'live',
    date: '2025‑12‑26',
    region: 'EU',
    format: 'Swiss into Single Elim',
    bracketSize: 32,
    prizePool: 12000,
    ruleSummary:
      'Swiss stage into top‑8 single elimination playoff. MR12 economy.',
    sponsor: 'Baku Digital Arena',
    platform: 'PC',
    streamUrl: 'https://youtube.com/example',
    startDate: '2025-12-26T14:00:00Z',
    endDate: '2025-12-26T22:00:00Z',
    bracket: {
      rounds: [
        {
          round: 'Quarterfinals',
          matches: [
            ['Team Alpha', 'Team Beta'],
            ['Team Gamma', 'Team Delta'],
          ],
        },
      ],
    },
  },
  {
    id: 't5-epsilon',
    gameId: 'game-b',
    gameName: 'CS2 Demo',
    name: 'City Clash Showdown',
    status: 'upcoming',
    date: '2026‑01‑10',
    region: 'EU / CIS',
    format: 'Round Robin',
    bracketSize: 6,
    prizePool: 8000,
    ruleSummary:
      'Round robin group into top‑2 grand final. MR12, timeouts allowed.',
    sponsor: 'City Arena Baku',
    platform: 'PC',
    streamUrl: 'https://twitch.tv/example2',
    startDate: '2026-01-10T14:00:00Z',
    endDate: '2026-01-10T21:00:00Z',
    bracket: null,
  },

  // Rocket League
  {
    id: 't3-gamma',
    gameId: 'game-c',
    gameName: 'Rocket League Demo',
    name: 'Aerial Cup Gamma',
    status: 'finished',
    date: '2025‑12‑20',
    region: 'EU',
    format: 'Single Elimination',
    bracketSize: 8,
    prizePool: 3000,
    ruleSummary:
      'Bo5 matches, cross‑platform allowed, standard maps only.',
    sponsor: 'Demo Energy Drink',
    platform: 'PC / Console',
    streamUrl: null,
    startDate: '2025-12-20T12:00:00Z',
    endDate: '2025-12-20T18:00:00Z',
    bracket: null,
  },
  {
    id: 't6-zeta',
    gameId: 'game-c',
    gameName: 'Rocket League Demo',
    name: 'Aerial Masters Zeta',
    status: 'live',
    date: '2025‑12‑27',
    region: 'EU / NA',
    format: 'Double Elimination',
    bracketSize: 16,
    prizePool: 6000,
    ruleSummary:
      'Bo5 series, cross‑platform, standard maps only, pause rules enforced.',
    sponsor: 'CarBall League',
    platform: 'PC / Console',
    streamUrl: 'https://youtube.com/example3',
    startDate: '2025-12-27T13:00:00Z',
    endDate: '2025-12-27T22:00:00Z',
    bracket: {
      rounds: [
        {
          round: 'Upper Semis',
          matches: [
            ['Aerial Kings', 'Boost Masters'],
            ['Ceiling Shot', 'Kickoff Crew'],
          ],
        },
      ],
    },
  },

  // LoL
  {
    id: 't7-lol-split1',
    gameId: 'game-e',
    gameName: 'League of Legends Demo',
    name: 'Split 1 Regional Demo',
    status: 'upcoming',
    date: '2026‑01‑15',
    region: 'EUW',
    format: 'League + Playoffs',
    bracketSize: 10,
    prizePool: 15000,
    ruleSummary:
      'Best‑of‑1 double round robin into top‑4 Bo5 playoffs.',
    sponsor: 'Summoner Studio',
    platform: 'PC',
    streamUrl: 'https://twitch.tv/example4',
    startDate: '2026-01-15T16:00:00Z',
    endDate: '2026-02-20T21:00:00Z',
    bracket: null,
  },

  // Apex
  {
    id: 't8-apex-circuit',
    gameId: 'game-f',
    gameName: 'Apex Legends Demo',
    name: 'Circuit Stage MENA',
    status: 'finished',
    date: '2025‑12‑10',
    region: 'MENA',
    format: 'Points Series',
    bracketSize: 20,
    prizePool: 9000,
    ruleSummary:
      '10 map series, placement and kills based scoring, top‑5 advance.',
    sponsor: 'Skyline Esports',
    platform: 'PC / Console',
    streamUrl: null,
    startDate: '2025-12-10T15:00:00Z',
    endDate: '2025-12-10T22:00:00Z',
    bracket: null,
  },
];

// -------------------- MATCHES (PER GAME) --------------------
export const matches = [
  // CS2
  {
    id: 'm1',
    gameId: 'game-b',
    tournamentId: 't2-beta',
    teams: [
      { id: 'team-1', name: 'Team Alpha' },
      { id: 'team-2', name: 'Team Beta' },
    ],
    score: [2, 0],
    startTime: '2025-12-24T14:30:00Z',
    status: 'finished',
    map: 'Anubis',
  },
  {
    id: 'm2',
    gameId: 'game-b',
    tournamentId: 't2-beta',
    teams: [
      { id: 'team-3', name: 'Team Gamma' },
      { id: 'team-4', name: 'Team Delta' },
    ],
    score: [1, 2],
    startTime: '2025-12-24T16:00:00Z',
    status: 'finished',
    map: 'Mirage',
  },
  // Rocket League
  {
    id: 'm3',
    gameId: 'game-c',
    tournamentId: 't3-gamma',
    teams: [
      { id: 'player-1', name: 'Team Aerial' },
      { id: 'player-2', name: 'Team Grounded' },
    ],
    score: [4, 2],
    startTime: '2025-12-20T11:00:00Z',
    status: 'finished',
    map: 'DFH Stadium',
  },
  {
    id: 'm4',
    gameId: 'game-c',
    tournamentId: 't6-zeta',
    teams: [
      { id: 'player-3', name: 'Boost Masters' },
      { id: 'player-4', name: 'Ceiling Kings' },
    ],
    score: [3, 3],
    startTime: '2025-12-27T18:30:00Z',
    status: 'live',
    map: 'Champions Field',
  },
  // Valorant
  {
    id: 'm5',
    gameId: 'game-a',
    tournamentId: null,
    teams: [
      { id: 'squad-1', name: 'Red Squad' },
      { id: 'squad-2', name: 'Blue Squad' },
    ],
    score: [13, 11],
    startTime: '2025-12-22T19:00:00Z',
    status: 'finished',
    map: 'Ascent',
  },
  // LoL
  {
    id: 'm6',
    gameId: 'game-e',
    tournamentId: null,
    teams: [
      { id: 'lol-1', name: 'Baron Hunters' },
      { id: 'lol-2', name: 'Dragon Slayers' },
    ],
    score: [1, 0],
    startTime: '2025-12-18T20:00:00Z',
    status: 'finished',
    map: 'Summoner\'s Rift',
  },
  // Apex
  {
    id: 'm7',
    gameId: 'game-f',
    tournamentId: 't8-apex-circuit',
    teams: [
      { id: 'apex-1', name: 'Jumpmasters' },
      { id: 'apex-2', name: 'Zone Controllers' },
    ],
    score: [98, 86], // points
    startTime: '2025-12-10T18:00:00Z',
    status: 'finished',
    map: 'World\'s Edge',
  },
];

// -------------------- ACHIEVEMENTS & PROFILE DATA --------------------
const achievements = [
  {
    id: 'a1',
    title: 'First Blood',
    description: 'Won your first ranked match in this demo.',
    unlocked: true,
  },
  {
    id: 'a2',
    title: 'Hot Streak',
    description: 'Simulated 3 wins in a row.',
    unlocked: false,
  },
  {
    id: 'a3',
    title: 'Cross‑game Explorer',
    description: 'Visited all main sections of the dashboard.',
    unlocked: true,
  },
  {
    id: 'a4',
    title: 'Collector',
    description: 'Favorited at least two different titles.',
    unlocked: false,
  },
];

const recentMMR = [1420, 1445, 1460, 1450, 1475, 1490, 1510, 1525];

// -------------------- SERVICE API USED BY PAGES --------------------
export function getAllGames() {
  return games;
}

export function getGameById(id) {
  return games.find((g) => g.id === id);
}

export function getAllTournaments() {
  return tournaments;
}

export function getTournamentById(id) {
  return tournaments.find((t) => t.id === id);
}

export function getTournamentsByStatus(status) {
  return tournaments.filter((t) => t.status === status);
}

export function getTopGames({ limit = 4 } = {}) {
  return games.slice(0, limit);
}

export function getLiveTournaments() {
  return tournaments.filter((t) => t.status === 'live');
}

export function getMatchesByGame(gameId) {
  return matches.filter((m) => m.gameId === gameId);
}

export function getAchievements() {
  return achievements;
}

export function getRecentMMR() {
  return recentMMR;
}
