const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const parseGameDateTime = (game) => {
  if (game.rawDate instanceof Date) return game.rawDate;

  const year = 2026;
  const datePart = game.date.split(',')[1]?.trim() || game.date;
  const str = `${datePart} ${year} ${game.time}`;
  const dt = new Date(str);

  return isNaN(dt.getTime()) ? null : dt;
};

export const hydrateSchedule = (games) => {
  const today = startOfToday();
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  const startOfDay = (d) => {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  };

  return games
    .map((g) => {
      const rawDate = parseGameDateTime(g);

      if (!rawDate) {
        return {
          ...g,
          rawDate: g.rawDate ?? null,
          daysAway: null,
          status: g.status ?? 'upcoming',
        };
      }

      const gameDay = startOfDay(rawDate);
      const diffDays = Math.round((gameDay.getTime() - today.getTime()) / MS_PER_DAY);
      const status = g.result ? 'completed' : diffDays < 0 ? 'completed' : 'upcoming';

      return {
        ...g,
        rawDate,
        daysAway: diffDays,
        status,
      };
    })
    .sort((a, b) => {
      const ad = a.rawDate instanceof Date ? a.rawDate.getTime() : Infinity;
      const bd = b.rawDate instanceof Date ? b.rawDate.getTime() : Infinity;
      return ad - bd;
    });
};

export const calculateRecord = (games = []) =>
  games.reduce(
    (record, game) => {
      if (game.result === 'W') record.w += 1;
      if (game.result === 'L') record.l += 1;
      return record;
    },
    { w: 0, l: 0 }
  );

const getTeamLastName = (fullName) => {
  if (!fullName) return 'Unknown';
  const parts = fullName.split(' ');
  return parts.length > 1 ? `Team ${parts[parts.length - 1]}` : `Team ${fullName}`;
};

export const processScheduleImport = (rows, myTeamName) => {
  const processed = rows.map((row, index) => {
    const [year, month, day] = row.date.split('-').map(Number);
    const [hour, minute] = row.start_time.split(':').map(Number);
    const dateObj = new Date(year, month - 1, day, hour, minute);

    const dateStr = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const timeStr = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    const normalizedTeamName = myTeamName?.toLowerCase() ?? '';
    const isHome = normalizedTeamName ? row.home_team.toLowerCase().includes(normalizedTeamName) : false;
    const opponentFull = isHome ? row.away_team : row.home_team;
    const opponent = getTeamLastName(opponentFull);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = dateObj - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      id: `imp-${Date.now()}-${index}`,
      date: dateStr,
      time: timeStr,
      opponent,
      location: row.location,
      isHome,
      status: diffDays < 0 ? 'completed' : 'upcoming',
      daysAway: diffDays,
      rawDate: dateObj,
      result: null,
    };
  });

  return processed.sort((a, b) => a.rawDate - b.rawDate);
};
