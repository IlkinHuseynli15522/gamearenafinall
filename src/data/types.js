/**
 * JSDoc type definitions to provide strong types in a JS project.
 * These help IDEs and keep the data layer self-documented.
 */

/**
 * @typedef {'Easy'|'Medium'|'Hard'} Difficulty
 * @typedef {'upcoming'|'live'|'finished'} TournamentStatus
 * @typedef {'BO1'|'BO3'|'Swiss'|'SE'} TournamentFormat
 */

/**
 * @typedef {Object} MapInfo
 * @property {string} id
 * @property {string} name
 * @property {string[]} recommendedRoles
 * @property {string[]} tips
 * @property {number} winRate - percentage (0-100)
 */

/**
 * @typedef {Object} Comp
 * @property {string} id
 * @property {string} name
 * @property {string[]} composition
 * @property {string[]} tags
 */

/**
 * @typedef {Object} Game
 * @property {string} id
 * @property {string} slug
 * @property {string} name
 * @property {string[]} genres
 * @property {string[]} regions
 * @property {Difficulty} difficulty
 * @property {boolean} competitive
 * @property {number} playerCount
 * @property {number} winRate
 * @property {number} prizePool
 * @property {string} releaseDate
 * @property {MapInfo[]} [maps]
 * @property {Comp[]} [metaComps]
 */

/**
 * @typedef {Object} Team
 * @property {string} id
 * @property {string} name
 * @property {string} [logo]
 * @property {number} [seed]
 * @property {string} [region]
 * @property {{w:number,l:number}} [record]
 */

/**
 * @typedef {Object} Tournament
 * @property {string} id
 * @property {string} name
 * @property {string} gameId
 * @property {string} region
 * @property {string} startDate
 * @property {string} endDate
 * @property {TournamentFormat} format
 * @property {number} bracketSize
 * @property {TournamentStatus} status
 * @property {string} sponsor
 * @property {string} platform
 * @property {string} ruleSummary
 * @property {string} [streamUrl]
 * @property {Object} [bracket]
 */

/**
 * @typedef {Object} Match
 * @property {string} id
 * @property {string} gameId
 * @property {string} [tournamentId]
 * @property {Array<Team>} teams
 * @property {number[]} score
 * @property {string} startTime
 * @property {'scheduled'|'live'|'finished'} status
 * @property {string} [map]
 */

/**
 * @typedef {Object} Achievement
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} category
 * @property {string} dateEarned
 */

/**
 * @typedef {Object} FriendRef
 * @property {string} id
 * @property {string} username
 * @property {string} avatar
 * @property {string} currentGame
 * @property {string} rank
 * @property {'In match'|'Lobby'|'AFK'|'Streaming'} status
 */

/**
 * @typedef {Object} Goal
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {number} progress
 * @property {number} target
 * @property {boolean} completed
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} username
 * @property {string} avatar
 * @property {number[]} mmrHistory
 * @property {Object.<string, {playtimeHours:number,winRate:number,rank:string}>} perGameStats
 * @property {FriendRef[]} friends
 * @property {{theme:'dark'|'light',language:string}} settings
 * @property {string[]} registeredTournaments
 * @property {string[]} favorites
 * @property {Goal[]} goals
 */

export {};
