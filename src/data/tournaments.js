/**
 * Tournament fixtures with varying formats and statuses.
 */

/** Generic tournament fixtures using neutral fake names */
export const tournaments = [
  { id: 't1-alpha', name: 'Alpha Cup', gameId: 'game-a', region: 'Global', startDate: '2026-01-10T18:00:00Z', endDate: '2026-01-12T23:00:00Z', format: 'BO3', bracketSize: 16, status: 'upcoming', sponsor: 'SponsorX', platform: 'PlatformA', ruleSummary: 'Standard rules; best-of-three.', streamUrl: 'https://stream.example.com/alpha', prizePool: 50000, bracket: null },
  { id: 't2-beta', name: 'Beta Qualifiers', gameId: 'game-b', region: 'EU', startDate: '2025-12-24T14:00:00Z', endDate: '2025-12-24T20:00:00Z', format: 'SE', bracketSize: 8, status: 'live', sponsor: 'SponsorY', platform: 'PlatformB', ruleSummary: 'Single elimination; standard veto.', streamUrl: 'https://stream.example.com/beta', prizePool: 10000, bracket: { rounds: [ { round: 'Quarterfinals', matches: [ ['Team Alpha','Team Beta'], ['Team Gamma','Team Delta'], ['Team Epsilon','Team Zeta'], ['Team Eta','Team Theta'] ] } ] } },
  { id: 't3-gamma', name: 'Gamma Open', gameId: 'game-c', region: 'Global', startDate: '2025-12-20T10:00:00Z', endDate: '2025-12-20T16:00:00Z', format: 'BO1', bracketSize: 128, status: 'finished', sponsor: 'SponsorZ', platform: 'PlatformC', ruleSummary: 'Solo format; points per placement.', streamUrl: 'https://stream.example.com/gamma', prizePool: 5000, bracket: null },
  { id: 't4-delta', name: 'Delta Invitational', gameId: 'game-d', region: 'NA', startDate: '2025-12-28T19:00:00Z', endDate: '2025-12-29T01:00:00Z', format: 'Swiss', bracketSize: 32, status: 'upcoming', sponsor: 'SponsorA', platform: 'PlatformA', ruleSummary: 'Swiss then top bracket.', streamUrl: 'https://stream.example.com/delta', prizePool: 15000, bracket: null },
  { id: 't5-epsilon', name: 'Epsilon Showcase', gameId: 'game-e', region: 'APAC', startDate: '2025-12-23T06:00:00Z', endDate: '2025-12-23T12:00:00Z', format: 'BO1', bracketSize: 64, status: 'finished', sponsor: 'SponsorB', platform: 'PlatformB', ruleSummary: 'Squad format; top placements.', streamUrl: 'https://stream.example.com/epsilon', prizePool: 8000, bracket: null },
  { id: 't6-zeta', name: 'Zeta Mini-Tourney', gameId: 'game-f', region: 'EU', startDate: '2026-01-05T12:00:00Z', endDate: '2026-01-07T20:00:00Z', format: 'BO3', bracketSize: 16, status: 'upcoming', sponsor: 'SponsorC', platform: 'PlatformC', ruleSummary: 'Best-of-three; demo rules.', streamUrl: 'https://stream.example.com/zeta', prizePool: 30000, bracket: null }
];
