export const normalizeTeamName = (name) => {
  if (!name) return '';

  const cleanName = name.replace(/^"|"$/g, '').trim();

  if (cleanName.includes(',')) {
    const parts = cleanName.split(',');
    if (parts.length >= 2) {
      const last = parts[0].trim();
      const first = parts[1].trim();
      return `${first} ${last}`;
    }
  }

  return cleanName;
};

export const validateScheduleRow = (row, index) => {
  const errors = [];
  const warnings = [];

  if (!row.week || isNaN(row.week) || row.week < 1 || row.week > 30) {
    errors.push(`Row ${index + 1}: 'week' must be a number between 1 and 30.`);
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!row.date || !dateRegex.test(row.date)) {
    errors.push(`Row ${index + 1}: 'date' must be YYYY-MM-DD (e.g., 2026-01-20).`);
  } else if (new Date(row.date) < new Date()) {
    warnings.push(`Row ${index + 1}: Game date is in the past.`);
  }

  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (!row.start_time || !timeRegex.test(row.start_time)) {
    errors.push(`Row ${index + 1}: 'start_time' must be HH:MM 24-hour format (e.g., 13:30).`);
  }

  if (!row.location || row.location.length < 3) {
    errors.push(`Row ${index + 1}: 'location' is too short.`);
  }
  if (!row.home_team || row.home_team.length < 3) errors.push(`Row ${index + 1}: 'home_team' name too short.`);
  if (!row.away_team || row.away_team.length < 3) errors.push(`Row ${index + 1}: 'away_team' name too short.`);

  if (row.home_team && row.away_team && row.home_team.trim().toLowerCase() === row.away_team.trim().toLowerCase()) {
    errors.push(`Row ${index + 1}: Home and Away teams cannot be the same.`);
  }

  return { errors, warnings };
};

const parseCSVLine = (text) => {
  const result = [];
  let cell = '';
  let insideQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      result.push(cell.trim());
      cell = '';
    } else {
      cell += char;
    }
  }

  result.push(cell.trim());
  return result.map((c) => c.replace(/^"|"$/g, '').trim());
};

export const parseCSV = (text) => {
  const lines = text.split('\n').filter((l) => l.trim());
  const headers = parseCSVLine(lines[0]).map((h) => h.toLowerCase());

  const expectedHeaders = ['week', 'date', 'start_time', 'location', 'home_team', 'away_team'];
  const missingHeaders = expectedHeaders.filter((h) => !headers.includes(h));

  if (missingHeaders.length > 0) {
    throw new Error(`Missing columns: ${missingHeaders.join(', ')}. Please use the template.`);
  }

  return lines.slice(1).map((line) => {
    const values = parseCSVLine(line);
    const row = {};

    headers.forEach((h, i) => {
      row[h] = values[i];
    });

    return row;
  });
};
