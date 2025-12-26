/**
 * Simple match fixtures referencing tournaments and games.
 */

export const matches = [
  { id: 'm1', gameId: 'game-b', tournamentId: 't2-beta', teams: [ { id: 'team-1', name: 'Team Alpha' }, { id: 'team-2', name: 'Team Beta' } ], score: [2,0], startTime: '2025-12-24T14:30:00Z', status: 'finished', map: 'Summit' },
  { id: 'm2', gameId: 'game-b', tournamentId: 't2-beta', teams: [ { id: 'team-3', name: 'Team Gamma' }, { id: 'team-4', name: 'Team Delta' } ], score: [1,2], startTime: '2025-12-24T16:00:00Z', status: 'finished', map: 'Summit' },
  { id: 'm3', gameId: 'game-c', tournamentId: 't3-gamma', teams: [ { id: 'player-1', name: 'Player One' }, { id: 'player-2', name: 'Player Two' } ], score: [12,9], startTime: '2025-12-20T11:00:00Z', status: 'finished', map: 'Wastes' },
  { id: 'm4', gameId: 'game-a', tournamentId: null, teams: [ { id: 'squad-1', name: 'Red Squad' }, { id: 'squad-2', name: 'Blue Squad' } ], score: [13,11], startTime: '2025-12-22T19:00:00Z', status: 'finished', map: 'Foundry' },
  { id: 'm5', gameId: 'game-d', tournamentId: 't4-delta', teams: [ { id: 'team-x', name: 'North Stars' }, { id: 'team-y', name: 'South Strikers' } ], score: [3,2], startTime: '2025-12-28T20:00:00Z', status: 'upcoming', map: 'Stadium' },
  { id: 'm6', gameId: 'game-e', tournamentId: 't5-epsilon', teams: [ { id: 'team-pro', name: 'Prodigy' }, { id: 'team-aces', name: 'Aces' } ], score: [0,0], startTime: '2025-12-23T08:00:00Z', status: 'finished', map: 'Crossroads' },
  { id: 'm7', gameId: 'game-f', tournamentId: null, teams: [ { id: 'arc-1', name: 'Fun Crew' }, { id: 'arc-2', name: 'Playfuls' } ], score: [5,7], startTime: '2025-12-10T12:00:00Z', status: 'finished', map: 'Arcade Plaza' }
];
