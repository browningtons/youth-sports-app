const SEASON_START_DATE = new Date('2026-01-12T00:00:00');

export const FOCUS_LIBRARY = [
  { week: 1, topic: 'Effort & Hustle', quote: 'Play hard every play.', note: 'Sprint back and chase loose balls.' },
  { week: 2, topic: 'Ball Handling (Eyes Up)', quote: 'Control the ball.', note: 'Dribble both hands and protect it.' },
  { week: 3, topic: 'Passing & Spacing', quote: 'One more pass.', note: 'Pass and move and create space.' },
  { week: 4, topic: 'Defense (Stay Between)', quote: 'Me and the basket.', note: 'Stay between player and hoop.' },
  { week: 5, topic: 'Rebounding', quote: 'Find. Hit. Get.', note: 'Box out then grab with two hands.' },
  { week: 6, topic: 'Shooting Confidence', quote: 'Shoot with confidence.', note: 'Good form then next shot.' },
  { week: 7, topic: 'Fast Break & Transition', quote: 'Run the floor.', note: 'Sprint lanes and pass ahead.' },
  { week: 8, topic: 'Team Play & Sportsmanship', quote: 'Win together.', note: 'Encourage and respect everyone.' },
];

export const getAutomatedFocus = () => {
  const now = new Date();
  if (now < SEASON_START_DATE) return FOCUS_LIBRARY[0];

  const diffTime = Math.abs(now - SEASON_START_DATE);
  const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
  const index = Math.min(diffWeeks, FOCUS_LIBRARY.length - 1);

  return FOCUS_LIBRARY[index];
};

export const INITIAL_TEAM_DATA = {
  id: 't1',
  name: 'Team Brown',
  league: '2026 Ogden Jr Jazz League',
  season: 'Winter 2026',
  record: { w: 1, l: 4 },
  primaryColor: 'bg-jazz-purple-700',
  secondaryColor: 'bg-jazz-purple-50',
};

export const INITIAL_SCHEDULE = [
  {
    id: 1,
    date: 'Sat, Jan 17',
    time: '11:00 AM',
    opponent: 'Team Reed',
    location: 'Mount Ogden Junior High',
    isHome: false,
    result: 'L',
    teamScore: 23,
    oppScore: 27,
  },
  {
    id: 2,
    date: 'Sat, Jan 24',
    time: '11:00 AM',
    opponent: 'Team Oliver',
    location: 'James Madison',
    isHome: true,
    result: 'L',
    teamScore: 8,
    oppScore: 35,
  },
  {
    id: 3,
    date: 'Sat, Jan 31',
    time: '11:00 AM',
    opponent: 'Team Wood',
    location: 'Highland Junior High',
    isHome: false,
    result: 'W',
    teamScore: 47,
    oppScore: 20,
  },
  {
    id: 4,
    date: 'Sat, Feb 07',
    time: '11:00 AM',
    opponent: 'Team Reza',
    location: 'Highland Junior High',
    isHome: true,
    result: 'L',
    teamScore: 18,
    oppScore: 41,
  },
  { id: 5, date: 'Sat, Feb 14', time: '12:00 PM', opponent: 'Team Ross', location: 'Highland Junior High', isHome: false, result: 'L', teamScore: 18, oppScore: 39 },
  { id: 6, date: 'Sat, Feb 21', time: '12:00 PM', opponent: 'Team Smergut', location: 'James Madison', isHome: true, result: null, teamScore: null, oppScore: null },
  { id: 7, date: 'Sat, Feb 28', time: '12:00 PM', opponent: 'Team Pearce', location: 'Highland Junior High', isHome: false, result: null, teamScore: null, oppScore: null },
  { id: 8, date: 'Sat, Mar 7', time: '12:00 PM', opponent: 'Team Reed', location: 'James Madison', isHome: true, result: null, teamScore: null, oppScore: null },
];

export const INITIAL_ROSTER = [
  { id: 'p1', name: 'Graham', fullName: 'Graham Brown', number: '00', role: 'Playmaker' },
  { id: 'p2', name: 'Ryan', fullName: 'Ryan Oliver Corbridge', number: 12, role: 'Hustle' },
  { id: 'p3', name: 'Vino', fullName: 'Vino Mendiola', number: 32, role: 'Lockdown' },
  { id: 'p4', name: 'Tyler', fullName: 'Tyler Moyer', number: 5, role: 'Spark' },
  { id: 'p5', name: 'Roman', fullName: 'Roman Padilla', number: 14, role: 'Energy' },
  { id: 'p6', name: 'Justin', fullName: 'Justin Jr. Rader', number: 32, role: 'Sniper' },
  { id: 'p7', name: 'Benicio', fullName: 'Benicio Sotelo', number: 15, role: 'General' },
  { id: 'p8', name: 'Stella', fullName: 'Stella Zenger', number: 3, role: 'Defender' },
  { id: 'p9', name: 'Dezmond', fullName: 'Dezmond Angel Yanez', number: 13, role: 'Anchor' },
];

export const STANDINGS_DATA = [
  { rank: 1, name: 'Team Oliver', w: 5, l: 0, pct: '1.000' },
  { rank: 2, name: 'Team Reza', w: 4, l: 1, pct: '.800' },
  { rank: 3, name: 'Team Reed', w: 4, l: 1, pct: '.800' },
  { rank: 4, name: 'Team Ross', w: 3, l: 2, pct: '.600' },
  { rank: 5, name: 'Team Wood', w: 2, l: 3, pct: '.400' },
  { rank: 6, name: 'Team Brown', w: 1, l: 4, pct: '.200' },
  { rank: 7, name: 'Team Smergut', w: 1, l: 4, pct: '.200' },
  { rank: 8, name: 'Team Pearce', w: 0, l: 5, pct: '.000' },
];

export const LEAGUE_RESULTS_WEEKS_1_TO_4 = [
  { week: 1, homeTeam: 'Team Smergut', awayTeam: 'Team Oliver', homeScore: 14, awayScore: 55 },
  { week: 1, homeTeam: 'Team Reed', awayTeam: 'Team Brown', homeScore: 27, awayScore: 23 },
  { week: 1, homeTeam: 'Team Wood', awayTeam: 'Team Ross', homeScore: 15, awayScore: 33 },
  { week: 1, homeTeam: 'Team Pearce', awayTeam: 'Team Reza', homeScore: 8, awayScore: 45 },

  { week: 2, homeTeam: 'Team Reed', awayTeam: 'Team Ross', homeScore: 14, awayScore: 13 },
  { week: 2, homeTeam: 'Team Brown', awayTeam: 'Team Oliver', homeScore: 8, awayScore: 35 },
  { week: 2, homeTeam: 'Team Smergut', awayTeam: 'Team Reza', homeScore: 10, awayScore: 59 },
  { week: 2, homeTeam: 'Team Wood', awayTeam: 'Team Pearce', homeScore: 13, awayScore: 10 },

  { week: 3, homeTeam: 'Team Wood', awayTeam: 'Team Brown', homeScore: 20, awayScore: 47 },
  { week: 3, homeTeam: 'Team Smergut', awayTeam: 'Team Reed', homeScore: 12, awayScore: 44 },
  { week: 3, homeTeam: 'Team Reza', awayTeam: 'Team Oliver', homeScore: 36, awayScore: 41 },
  { week: 3, homeTeam: 'Team Ross', awayTeam: 'Team Pearce', homeScore: 30, awayScore: 6 },

  { week: 4, homeTeam: 'Team Brown', awayTeam: 'Team Reza', homeScore: 18, awayScore: 41 },
  { week: 4, homeTeam: 'Team Smergut', awayTeam: 'Team Pearce', homeScore: 37, awayScore: 8 },
  { week: 4, homeTeam: 'Team Reed', awayTeam: 'Team Wood', homeScore: 25, awayScore: 10 },
  { week: 4, homeTeam: 'Team Oliver', awayTeam: 'Team Ross', homeScore: 53, awayScore: 17 },
];

export const INITIAL_FOCUS = getAutomatedFocus();

export const PLAYER_ROLES = [
  'Lockdown',
  'Hustle',
  'General',
  'Sniper',
  'Rebounder',
  'Spark',
  'Anchor',
  'Finisher',
  'Energy',
];
