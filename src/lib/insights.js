const roundTo1Decimal = (value) => Math.round(value * 10) / 10;

const shortName = (teamName) => teamName.replace(/^Team\s+/, '');

const createEmptyTeamStats = () => ({
  games: 0,
  wins: 0,
  losses: 0,
  scored: 0,
  allowed: 0,
});

const buildTeamStatsMap = (results) => {
  const byTeam = new Map();

  const getOrCreate = (team) => {
    if (!byTeam.has(team)) byTeam.set(team, createEmptyTeamStats());
    return byTeam.get(team);
  };

  results.forEach((game) => {
    const home = getOrCreate(game.homeTeam);
    const away = getOrCreate(game.awayTeam);

    home.games += 1;
    away.games += 1;

    home.scored += game.homeScore;
    home.allowed += game.awayScore;
    away.scored += game.awayScore;
    away.allowed += game.homeScore;

    if (game.homeScore > game.awayScore) {
      home.wins += 1;
      away.losses += 1;
    } else {
      away.wins += 1;
      home.losses += 1;
    }
  });

  return byTeam;
};

const formatGameLine = (game) => {
  const homeWon = game.homeScore > game.awayScore;
  const winner = homeWon ? game.homeTeam : game.awayTeam;
  const loser = homeWon ? game.awayTeam : game.homeTeam;
  const winnerScore = homeWon ? game.homeScore : game.awayScore;
  const loserScore = homeWon ? game.awayScore : game.homeScore;

  return `Wk ${game.week}: ${shortName(winner)} ${winnerScore}, ${shortName(loser)} ${loserScore}`;
};

export const buildSeasonInsights = (results, teamName = 'Team Brown') => {
  if (!results?.length) return null;

  const teamStatsMap = buildTeamStatsMap(results);
  const teams = Array.from(teamStatsMap.keys());

  const totalGames = results.length;
  const totalPoints = results.reduce((sum, game) => sum + game.homeScore + game.awayScore, 0);
  const totalMargin = results.reduce((sum, game) => sum + Math.abs(game.homeScore - game.awayScore), 0);
  const closeGames = results.filter((game) => Math.abs(game.homeScore - game.awayScore) <= 3).length;

  const closestGame = results.reduce((closest, game) => {
    if (!closest) return game;
    return Math.abs(game.homeScore - game.awayScore) < Math.abs(closest.homeScore - closest.awayScore) ? game : closest;
  }, null);

  const biggestBlowout = results.reduce((largest, game) => {
    if (!largest) return game;
    return Math.abs(game.homeScore - game.awayScore) > Math.abs(largest.homeScore - largest.awayScore) ? game : largest;
  }, null);

  let highestScore = null;
  results.forEach((game) => {
    const lines = [
      {
        team: game.homeTeam,
        opponent: game.awayTeam,
        points: game.homeScore,
        allowed: game.awayScore,
        week: game.week,
      },
      {
        team: game.awayTeam,
        opponent: game.homeTeam,
        points: game.awayScore,
        allowed: game.homeScore,
        week: game.week,
      },
    ];

    lines.forEach((line) => {
      if (!highestScore || line.points > highestScore.points) {
        highestScore = line;
      }
    });
  });

  const offenseLeader = teams.reduce((bestTeam, currentTeam) => {
    if (!bestTeam) return currentTeam;

    const currentPPG = teamStatsMap.get(currentTeam).scored / teamStatsMap.get(currentTeam).games;
    const bestPPG = teamStatsMap.get(bestTeam).scored / teamStatsMap.get(bestTeam).games;

    return currentPPG > bestPPG ? currentTeam : bestTeam;
  }, null);

  const defenseLeader = teams.reduce((bestTeam, currentTeam) => {
    if (!bestTeam) return currentTeam;

    const currentPAPG = teamStatsMap.get(currentTeam).allowed / teamStatsMap.get(currentTeam).games;
    const bestPAPG = teamStatsMap.get(bestTeam).allowed / teamStatsMap.get(bestTeam).games;

    return currentPAPG < bestPAPG ? currentTeam : bestTeam;
  }, null);

  const undefeatedTeams = teams.filter((team) => {
    const stats = teamStatsMap.get(team);
    return stats.games > 0 && stats.losses === 0;
  });

  const teamGames = results
    .filter((game) => game.homeTeam === teamName || game.awayTeam === teamName)
    .sort((a, b) => a.week - b.week);

  const teamStats = teamStatsMap.get(teamName) || createEmptyTeamStats();
  const teamTrend = teamGames.map((game) => {
    const isHome = game.homeTeam === teamName;
    return {
      week: game.week,
      scored: isHome ? game.homeScore : game.awayScore,
      allowed: isHome ? game.awayScore : game.homeScore,
    };
  });

  const oppRecord = teamGames.reduce(
    (record, game) => {
      const opponent = game.homeTeam === teamName ? game.awayTeam : game.homeTeam;
      const oppStats = teamStatsMap.get(opponent);
      if (!oppStats) return record;

      record.wins += oppStats.wins;
      record.losses += oppStats.losses;
      return record;
    },
    { wins: 0, losses: 0 }
  );

  return {
    gamesAnalyzed: totalGames,
    avgTotalPoints: roundTo1Decimal(totalPoints / totalGames),
    avgMargin: roundTo1Decimal(totalMargin / totalGames),
    closeGames,

    offenseLeader: {
      team: offenseLeader,
      ppg: roundTo1Decimal(teamStatsMap.get(offenseLeader).scored / teamStatsMap.get(offenseLeader).games),
    },
    defenseLeader: {
      team: defenseLeader,
      papg: roundTo1Decimal(teamStatsMap.get(defenseLeader).allowed / teamStatsMap.get(defenseLeader).games),
    },
    undefeatedTeams: undefeatedTeams.map(shortName),

    team: {
      name: shortName(teamName),
      record: `${teamStats.wins}-${teamStats.losses}`,
      ppg: roundTo1Decimal(teamStats.scored / Math.max(teamStats.games, 1)),
      papg: roundTo1Decimal(teamStats.allowed / Math.max(teamStats.games, 1)),
      diff: teamStats.scored - teamStats.allowed,
      opponentRecord: `${oppRecord.wins}-${oppRecord.losses}`,
      trend: teamTrend,
    },

    notableGames: {
      closest: formatGameLine(closestGame),
      blowout: formatGameLine(biggestBlowout),
      topScore: `Wk ${highestScore.week}: ${shortName(highestScore.team)} ${highestScore.points}`,
    },
  };
};
