/** Minimal generic game fixtures (neutral fake data) */
export const games = [
  {
    id: 'game-a',
    slug: 'game-a',
    name: 'Game A',
    genres: ['Shooter'],
    regions: ['Global'],
    difficulty: 'Medium',
    competitive: true,
    playerCount: 120000,
    winRate: 50.2,
    prizePool: 50000,
    releaseDate: '2024-01-01',
    description: 'Fast-paced team shooter with objective play and seasonal ranked ladders.',
    maps: [
      { id: 'map-1', name: 'Foundry', recommendedRoles: ['Attacker','Support'], tips: ['Control center','Rotate early'], winRate: 50.0 },
      { id: 'map-2', name: 'Harbor', recommendedRoles: ['Sniper','Support'], tips: ['Hold highground','Use smokes'], winRate: 49.8 }
    ],
    metaComps: [
      { id: 'comp-a', name: 'Alpha Comp', composition: ['Attacker','Support','Flex'], tags: ['Balanced'] },
      { id: 'comp-b', name: 'Rush Comp', composition: ['Attacker','Attacker','Support'], tags: ['Aggressive'] }
    ],
  },
  {
    id: 'game-b',
    slug: 'game-b',
    name: 'Game B',
    genres: ['MOBA'],
    regions: ['Global'],
    difficulty: 'Hard',
    competitive: true,
    playerCount: 90000,
    winRate: 49.1,
    prizePool: 75000,
    releaseDate: '2023-06-15',
    description: 'Strategic team arena with hero drafting and macro objectives.',
    maps: [
      { id: 'map-1', name: 'Summit', recommendedRoles: ['Carry','Support'], tips: ['Secure objectives','Ward choke points'], winRate: 50.5 }
    ],
    metaComps: [
      { id: 'comp-b1', name: 'Control Draft', composition: ['Support','Control','Carry'], tags: ['Objective'] }
    ]
  },
  {
    id: 'game-c',
    slug: 'game-c',
    name: 'Game C',
    genres: ['Battle Royale'],
    regions: ['Global'],
    difficulty: 'Medium',
    competitive: false,
    playerCount: 200000,
    winRate: 13.4,
    prizePool: 25000,
    releaseDate: '2022-09-10',
    description: 'Large-scale survival shooter with shrinking zones and solo/duo modes.',
    maps: [
      { id: 'br-1', name: 'Wastes', recommendedRoles: ['Solo'], tips: ['Loot quickly','Avoid hot zones early'], winRate: 12.8 }
    ],
    metaComps: [
      { id: 'br-comp', name: 'Solo Survival', composition: ['Solo'], tags: ['Solo'] }
    ]
  },
  {
    id: 'game-d',
    slug: 'game-d',
    name: 'Game D',
    genres: ['Sports'],
    regions: ['Global'],
    difficulty: 'Medium',
    competitive: true,
    playerCount: 60000,
    winRate: 48.5,
    prizePool: 30000,
    releaseDate: '2021-04-22',
    description: 'Team-based sports title with seasonal cups and pro circuits.',
    maps: [
      { id: 'sd-1', name: 'Stadium', recommendedRoles: ['Striker','Defender'], tips: ['Press early','Manage stamina'], winRate: 49.0 }
    ],
    metaComps: [ { id: 'sd-comp', name: 'Balanced Roster', composition: ['Striker','Mid','Defender'], tags: ['Balanced'] } ]
  },
  {
    id: 'game-e',
    slug: 'game-e',
    name: 'Game E',
    genres: ['FPS'],
    regions: ['Global'],
    difficulty: 'Hard',
    competitive: true,
    playerCount: 110000,
    winRate: 51.0,
    prizePool: 100000,
    releaseDate: '2020-11-05',
    description: 'Precision shooter focused on mechanical skill and map control.',
    maps: [ { id: 'fe-1', name: 'Crossroads', recommendedRoles: ['AWPer','Entry'], tips: ['Control mid','Isolate duels'], winRate: 50.9 } ],
    metaComps: [ { id: 'fe-comp', name: 'Sniper Setup', composition: ['AWPer','Support','Entry'], tags: ['Long-range'] } ]
  },
  {
    id: 'game-f',
    slug: 'game-f',
    name: 'Game F',
    genres: ['Arcade'],
    regions: ['Global'],
    difficulty: 'Easy',
    competitive: false,
    playerCount: 45000,
    winRate: 46.2,
    prizePool: 5000,
    releaseDate: '2019-02-14',
    description: 'Casual arcade title with seasonal mini-events and cosmetic rewards.',
    maps: [ { id: 'arc-1', name: 'Arcade Plaza', recommendedRoles: ['Casual'], tips: ['Collect powerups','Use cover'], winRate: 46.2 } ],
    metaComps: [ { id: 'arc-comp', name: 'Casual Squad', composition: ['Casual','Casual'], tags: ['Fun'] } ]
  }
];

export function findGameById(id) {
  return games.find(g => g.id === id || g.slug === id) || null;
}
