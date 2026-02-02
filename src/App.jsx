import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import logo from "./assets/jazz-logo.png";

import {
  Calendar,
  MapPin,
  Trophy,
  Users,
  Shield,
  Zap,
  Heart,
  Check,
  X,
  ChevronRight,
  Menu,
  UserCircle,
  Upload,
  FileText,
  AlertCircle,
  Download,
  AlertTriangle,
  Loader,
  Filter,
  Target,
  Crown,
  Activity
} from "lucide-react";

/**
 * CONFIG & LIBRARIES
 */
// Season start date reference (Monday before first game)
const SEASON_START_DATE = new Date('2026-01-12T00:00:00');

const FOCUS_LIBRARY = [
  { week: 1, topic: 'Effort & Hustle', quote: 'Play hard every play.', note: 'Sprint back and chase loose balls.' },
  { week: 2, topic: 'Ball Handling (Eyes Up)', quote: 'Control the ball.', note: 'Dribble both hands and protect it.' },
  { week: 3, topic: 'Passing & Spacing', quote: 'One more pass.', note: 'Pass and move and create space.' },
  { week: 4, topic: 'Defense (Stay Between)', quote: 'Me and the basket.', note: 'Stay between player and hoop.' },
  { week: 5, topic: 'Rebounding', quote: 'Find. Hit. Get.', note: 'Box out then grab with two hands.' },
  { week: 6, topic: 'Shooting Confidence', quote: 'Shoot with confidence.', note: 'Good form then next shot.' },
  { week: 7, topic: 'Fast Break & Transition', quote: 'Run the floor.', note: 'Sprint lanes and pass ahead.' },
  { week: 8, topic: 'Team Play & Sportsmanship', quote: 'Win together.', note: 'Encourage and respect everyone.' },
];

const getAutomatedFocus = () => {
  const now = new Date();
  // If we are before the season starts, show Week 1
  if (now < SEASON_START_DATE) return FOCUS_LIBRARY[0];
  
  const diffTime = Math.abs(now - SEASON_START_DATE);
  const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
  
  // Return the specific week, or the last week if season is over
  const index = Math.min(diffWeeks, FOCUS_LIBRARY.length - 1);
  return FOCUS_LIBRARY[index];
};

/**
 * MOCK DATA
 */
const INITIAL_TEAM_DATA = {
  id: 't1',
  name: 'Team Brown', 
  league: '2026 Ogden Jr Jazz League',
  season: 'Winter 2026',
  record: { w: 0, l: 0 },
  primaryColor: 'bg-jazz-purple-700',
  secondaryColor: 'bg-jazz-purple-50',
};

// Default schedule populated from "Brown, Paul" in the attached CSV
const INITIAL_SCHEDULE = [
  { id: 1, date: 'Sat, Jan 17', time: '11:00 AM', opponent: 'Team Reed', location: 'Mount Ogden Junior High', isHome: false, status: 'upcoming', daysAway: 11, result: null },
  { id: 2, date: 'Sat, Jan 24', time: '11:00 AM', opponent: 'Team Oliver', location: 'James Madison', isHome: true, status: 'upcoming', daysAway: 18, result: null },
  { id: 3, date: 'Sat, Jan 31', time: '11:00 AM', opponent: 'Team Wood', location: 'Highland Junior High', isHome: false, status: 'upcoming', daysAway: 25, result: null },
  { id: 4, date: 'Sat, Feb 07', time: '11:00 AM', opponent: 'Team Reza', location: 'Highland Junior High', isHome: true, status: 'upcoming', daysAway: 32, result: null },
  { id: 5, date: 'Sat, Feb 14', time: '12:00 PM', opponent: 'Team Ross', location: 'Highland Junior High', isHome: false, status: 'upcoming', daysAway: 39, result: null },
  { id: 6, date: 'Sat, Feb 21', time: '12:00 PM', opponent: 'Team Smergut', location: 'James Madison', isHome: true, status: 'upcoming', daysAway: 46, result: null },
  { id: 7, date: 'Sat, Feb 28', time: '12:00 PM', opponent: 'Team Pearce', location: 'Highland Junior High', isHome: false, status: 'upcoming', daysAway: 53, result: null },
  { id: 8, date: 'Sat, Mar 7', time: '12:00 PM', opponent: 'Team Reed', location: 'James Madison', isHome: true, status: 'upcoming', daysAway: 60, result: null }
];


const INITIAL_ROSTER = [
  { id: 'p1', name: 'Graham', fullName: 'Graham Brown', number: '00', role: 'Playmaker' },
  { id: 'p2', name: 'Ryan', fullName: 'Ryan Oliver Corbridge', number: 12, role: 'Hustle' },
  { id: 'p3', name: 'Vino', fullName: 'Vino Mendiola', number: 4, role: 'Lockdown' },
  { id: 'p4', name: 'Tyler', fullName: 'Tyler Moyer', number: 5, role: 'Spark' },
  { id: 'p5', name: 'Roman', fullName: 'Roman Padilla', number: 14, role: 'Energy' },
  { id: 'p6', name: 'Justin', fullName: 'Justin Jr. Rader', number: 33, role: 'Sniper' },
  { id: 'p7', name: 'Benicio', fullName: 'Benicio Sotelo', number: 15, role: 'General' },
  { id: 'p8', name: 'Stella', fullName: 'Stella Zenger', number: 3, role: 'Defender' },
  { id: 'p9', name: 'Dezmond', fullName: 'Dezmond Angel Yanez', number: 13, role: 'Anchor' },
];

const STANDINGS_DATA = [
  { rank: 1, name: 'Team Smergut', w: 0, l: 0, pct: '.000' },
  { rank: 2, name: 'Team Oliver', w: 0, l: 0, pct: '.000' },
  { rank: 3, name: 'Team Reed', w: 0, l: 0, pct: '.000' },
  { rank: 4, name: 'Team Brown', w: 0, l: 0, pct: '.000' },
  { rank: 5, name: 'Team Wood', w: 0, l: 0, pct: '.000' },
  { rank: 6, name: 'Team Ross', w: 0, l: 0, pct: '.000' },
  { rank: 7, name: 'Team Pearce', w: 0, l: 0, pct: '.000' },
  { rank: 8, name: 'Team Reza', w: 0, l: 0, pct: '.000' },
];

const INITIAL_FOCUS = getAutomatedFocus();

const PLAYER_ROLES = [
  'Lockdown', 'Hustle', 'General', 'Sniper', 
  'Rebounder', 'Spark', 'Anchor', 'Finisher', 'Energy'
];

const PRACTICE = {
  day: "Friday",
  time: "8:00 PM",
  location: "Mount Ogden Junior High",
};

// Helper to normalize "Last, First" -> "First Last"
const normalizeTeamName = (name) => {
  if (!name) return '';
  let cleanName = name.replace(/^"|"$/g, '').trim();
  
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


const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const parseGameDateTime = (game) => {
  // If we already have a raw Date (imported schedule), use it
  if (game.rawDate instanceof Date) return game.rawDate;

  // Otherwise parse your hardcoded strings like: "Sat, Jan 17" + "11:00 AM"
  // Assume 2026 season; if you ever change seasons, update this.
  const year = 2026;

  // Build a parseable string: "Jan 17 2026 11:00 AM"
  const datePart = game.date.split(",")[1]?.trim() || game.date; // "Jan 17"
  const str = `${datePart} ${year} ${game.time}`;
  const dt = new Date(str);

  // Fallback: if parsing fails, return null
  return isNaN(dt.getTime()) ? null : dt;
};

const hydrateSchedule = (games) => {
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
          status: g.status ?? "upcoming",
        };
      }

      // ✅ calendar-day diff (no time-of-day bleed)
      const gameDay = startOfDay(rawDate);
      const diffDays = Math.round((gameDay.getTime() - today.getTime()) / MS_PER_DAY);

      const status = diffDays < 0 || g.result ? "completed" : "upcoming";

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


// Helper to extract Last Name for team display (e.g. "Paul Brown" -> "Team Brown")
const getTeamLastName = (fullName) => {
  if (!fullName) return 'Unknown';
  const parts = fullName.split(' ');
  return parts.length > 1 ? `Team ${parts[parts.length - 1]}` : `Team ${fullName}`;
};

// Converts CSV rows into App Game Objects
const processScheduleImport = (rows, myTeamName) => {
  // 0. Filter for MY games only
  const myGames = rows.filter(row => 
    (row.home_team && row.home_team.toLowerCase().includes(myTeamName.toLowerCase())) ||
    (row.away_team && row.away_team.toLowerCase().includes(myTeamName.toLowerCase()))
  );

  const processed = myGames.map((row, index) => {
    // 1. Parse Date (YYYY-MM-DD) and Time (HH:MM)
    const [year, month, day] = row.date.split('-').map(Number);
    const [hour, minute] = row.start_time.split(':').map(Number);
    const dateObj = new Date(year, month - 1, day, hour, minute);
    
    // 2. Format for Display
    const dateStr = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const timeStr = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    
    // 3. Logic: Home vs Away
    const isHome = row.home_team.toLowerCase().includes(myTeamName.toLowerCase());
    // Get opponent name based on LAST name of the coach
    const opponentFull = isHome ? row.away_team : row.home_team;
    const opponent = getTeamLastName(opponentFull);
    
    // 4. Days Away Calc
    const today = new Date();
    today.setHours(0,0,0,0);
    const diffTime = dateObj - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return {
      id: `imp-${Date.now()}-${index}`,
      date: dateStr,
      time: timeStr,
      opponent: opponent,
      location: row.location,
      isHome: isHome,
      status: diffDays < 0 ? 'completed' : 'upcoming',
      daysAway: diffDays,
      rawDate: dateObj, // keep for sorting
      result: null // null, 'W', 'L'
    };
  });

  // Sort chronologically
  return processed.sort((a, b) => a.rawDate - b.rawDate);
};

const validateScheduleRow = (row, index) => {
  const errors = [];
  const warnings = [];
  
  const requiredCols = ['week', 'date', 'start_time', 'location', 'home_team', 'away_team'];
  
  if (!row.week || isNaN(row.week) || row.week < 1 || row.week > 30) {
    errors.push(`Row ${index + 1}: 'week' must be a number between 1 and 30.`);
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!row.date || !dateRegex.test(row.date)) {
    errors.push(`Row ${index + 1}: 'date' must be YYYY-MM-DD (e.g., 2026-01-20).`);
  } else {
    if (new Date(row.date) < new Date()) {
      warnings.push(`Row ${index + 1}: Game date is in the past.`);
    }
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
  
  for (let i = 0; i < text.length; i++) {
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
  return result.map(c => c.replace(/^"|"$/g, '').trim());
};

const parseCSV = (text) => {
  const lines = text.split('\n').filter(l => l.trim());
  const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase());
  
  const expectedHeaders = ['week', 'date', 'start_time', 'location', 'home_team', 'away_team'];
  const missingHeaders = expectedHeaders.filter(h => !headers.includes(h));
  
  if (missingHeaders.length > 0) {
    throw new Error(`Missing columns: ${missingHeaders.join(', ')}. Please use the template.`);
  }

  return lines.slice(1).map((line, idx) => {
    const values = parseCSVLine(line);
    const row = {};
    headers.forEach((h, i) => {
      row[h] = values[i];
    });
    return row;
  });
};

/**
 * COMPONENTS
 */

const Card = ({ children, className = "", onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-jazz-paper rounded-2xl shadow-sm border border-jazz-muted/20 overflow-hidden ${className}`}
  >
    {children}
  </div>
);

const Badge = ({ children, type = "neutral" }) => {
  const styles = {
    neutral: "bg-jazz-muted/20 text-jazz-black",
    primary: "bg-jazz-purple text-jazz-paper",
    accent: "bg-jazz-sky text-jazz-black",

    home: "bg-jazz-purple text-jazz-paper",
    away: "bg-jazz-sky text-jazz-black",

    win: "bg-jazz-purple/15 text-jazz-purple",
    loss: "bg-jazz-black/10 text-jazz-black",

    warning: "bg-jazz-sky/20 text-jazz-black",
    error: "bg-jazz-black text-jazz-paper",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold tracking-wide ${styles[type]}`}
    >
      {children}
    </span>
  );
};

const WeeklyFocus = ({ focus, isCoach, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTopic, setTempTopic] = useState(focus.topic);
  const [tempQuote, setTempQuote] = useState(focus.quote);
  const [tempNote, setTempNote] = useState(focus.note || "");

  useEffect(() => {
    if (!isEditing) {
      setTempTopic(focus.topic);
      setTempQuote(focus.quote);
      setTempNote(focus.note || "");
    }
  }, [focus, isEditing]);

  const handleSave = () => {
    onSave({ topic: tempTopic, quote: tempQuote, note: tempNote });
    setIsEditing(false);
  };

  const loadFromLibrary = (weekIndex) => {
    const data = FOCUS_LIBRARY[weekIndex];
    setTempTopic(data.topic);
    setTempQuote(data.quote);
    setTempNote(data.note);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2 px-1">
        <h3 className="text-sm font-black text-jazz-black uppercase tracking-wider text-left">
          This Week's Focus
        </h3>

        {isCoach && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-yellow-600 text-xs font-semibold flex items-center hover:bg-yellow-50 px-2 py-1 rounded-full transition-colors"
          >
            <Edit2 size={12} className="mr-1" /> Edit
          </button>
        )}
      </div>

      <Card className="w-full bg-jazz-purple text-jazz-paper p-6 relative rounded-md overflow-hidden">
        <img
          src={utahLogo}
          alt="Utah Jazz Basketball Icon"
          className="absolute left-6 top-1/2 -translate-y-1/2 w-28 h-28 opacity-[0.06] pointer-events-none select-none"
        />

        {isEditing ? (
          <div className="space-y-2 relative z-10">
            <div className="bg-jazz-paper/10 p-3 rounded-lg border border-jazz-paper/20 mb-4">
              <label className="text-[10px] text-jazz-paper/80 block mb-1 uppercase font-bold flex items-center gap-1">
                <BookOpen size={10} /> Load from Curriculum
              </label>
              <select
                onChange={(e) => loadFromLibrary(e.target.value)}
                className="w-full bg-jazz-paper/20 border-none rounded text-xs text-jazz-paper p-2 focus:ring-1 focus:ring-yellow-400"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a week to auto-fill...
                </option>
                {FOCUS_LIBRARY.map((item, idx) => (
                  <option key={item.week} value={idx}>
                    Week {item.week}: {item.topic}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-jazz-paper/80 block mb-1">Technical Focus</label>
              <input
                value={tempTopic}
                onChange={(e) => setTempTopic(e.target.value)}
                className="w-full bg-jazz-paper/10 border border-jazz-paper/20 rounded-lg px-3 py-2 text-jazz-paper focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
              />
            </div>

            <div>
              <label className="text-xs text-jazz-paper/80 block mb-1">Mantra / Quote</label>
              <textarea
                value={tempQuote}
                onChange={(e) => setTempQuote(e.target.value)}
                className="w-full bg-jazz-paper/10 border border-jazz-paper/20 rounded-lg px-3 py-2 text-jazz-paper focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                rows={2}
              />
            </div>

            <div>
              <label className="text-xs text-jazz-paper/80 block mb-1">Coach Note (Private/Small)</label>
              <input
                value={tempNote}
                onChange={(e) => setTempNote(e.target.value)}
                className="w-full bg-jazz-paper/10 border border-jazz-paper/20 rounded-lg px-3 py-2 text-jazz-paper focus:outline-none focus:ring-2 focus:ring-yellow-400/50 text-xs"
              />
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-yellow-400 text-jazz-purple font-bold py-2 rounded-lg text-sm hover:bg-yellow-300 transition-colors"
              >
                Save Update
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 bg-transparent border border-jazz-paper/30 text-jazz-paper font-semibold py-2 rounded-lg text-sm hover:bg-jazz-paper/10 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="relative z-10 pl-16">
            <h2 className="text-md font-black mb-2 tracking-tight text-jazz-paper text-center">
              {focus.topic}
            </h2>

            <div className="w-14 h-1 bg-yellow-400 rounded-full mb-4 mx-auto" />

            <p className="text-jazz-paper/90 font-semibold italic opacity-90 text-lg text-center">
              {focus.quote}
            </p>

            {focus.note && (
              <div className="mt-5 pt-3 border-t border-jazz-paper/20">
                <p className="text-xs text-jazz-paper/75 flex items-start gap-2">
                  <span className="font-bold uppercase tracking-wider opacity-80">Coach Note:</span>
                  <span>{focus.note}</span>
                </p>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

const ScheduleSection = ({ schedule, isCoach, onUpdateResult }) => {
  if (!schedule || schedule.length === 0) {
    return (
      <div className="mb-8">
        <h3 className="text-sm font-black text-jazz-black uppercase tracking-wider text-left">
          Upcoming
        </h3>
        <Card className="p-8 text-center bg-jazz-paper border-dashed border-2 border-jazz-muted/30 shadow-none">
          <Calendar className="mx-auto text-jazz-muted/60 mb-3" size={32} />
          <p className="text-jazz-black font-medium">Schedule coming soon.</p>
          <p className="text-jazz-muted text-sm mt-1">First practice builds champions.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="-mx-4 md:mx-0">
      <div className="flex justify-between items-center px-4 md:px-1 mb-4">
        <h3 className="text-sm font-black text-jazz-black uppercase tracking-wider text-left">
          Schedule
        </h3>
      </div>
      <div className="flex flex-col gap-3 px-4 md:px-0">
        {schedule.map((game) => (
          <Card key={game.id} className="relative">
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2 text-left">
                  {/* Keep Home/Away with color background via Badge styles */}
                  <Badge type={game.isHome ? "home" : "away"}>
                    {game.isHome ? "Home" : "Away"}
                  </Badge>

                  {/* Location: NO color-coding, neutral pill */}
                  <span className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-md border border-jazz-muted/25 bg-jazz-muted/10 text-jazz-black/80">
                    {game.location}
                  </span>
                </div>

                {/* Result or Countdown */}
                {game.result ? (
                  <Badge type={game.result === "W" ? "win" : "loss"}>
                    {game.result === "W" ? "Win" : "Loss"}
                  </Badge>
                ) : (
                  <span
                    className={
                      "text-xs font-bold uppercase tracking-wide " +
                      (game.daysAway < 0 ? "text-jazz-muted" : "text-jazz-black/60")
                    }
                  >
                    {game.daysAway < 0
                      ? "Pending"
                      : game.daysAway === 0
                      ? "Today!"
                      : `${game.daysAway} days`}
                  </span>
                )}
              </div>

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-start text-left">
                    <p className="text-xs text-jazz-muted font-semibold uppercase tracking-wide">
                      Opponent
                    </p>
                    <p className="text-lg font-bold text-jazz-black leading-none">
                      {game.opponent}
                    </p>
                  </div>
                </div>

                {/* Coach Action Buttons */}
                {isCoach && !game.result && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => onUpdateResult(game.id, "W")}
                      className="w-8 h-8 rounded-full border border-jazz-purple/25 bg-jazz-purple/10 text-jazz-purple font-bold text-xs hover:bg-jazz-purple/15 flex items-center justify-center"
                      title="Mark Win"
                    >
                      W
                    </button>
                    <button
                      onClick={() => onUpdateResult(game.id, "L")}
                      className="w-8 h-8 rounded-full border border-jazz-black/15 bg-jazz-black/5 text-jazz-black font-bold text-xs hover:bg-jazz-black/10 flex items-center justify-center"
                      title="Mark Loss"
                    >
                      L
                    </button>
                  </div>
                )}

                {isCoach && game.result && (
                  <button
                    onClick={() => onUpdateResult(game.id, null)}
                    className="text-[10px] text-jazz-muted underline"
                  >
                    Undo
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-2 border-t border-jazz-muted/10 pt-3">
                <div className="flex items-center text-jazz-black/70 text-sm">
                  <Calendar size={14} className="mr-2 text-jazz-purple" />
                  <span className="font-medium">{game.date}</span>
                </div>
                <div className="flex items-center text-jazz-black/70 text-sm">
                  <span className="text-jazz-muted/60 mr-2">|</span>
                  <span className="font-medium">{game.time}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {isCoach && (
          <div className="mt-2">
            <button className="w-full py-3 rounded-2xl border-2 border-dashed border-jazz-muted/40 text-jazz-muted font-bold text-sm hover:text-jazz-purple hover:border-jazz-purple/40 hover:bg-jazz-purple/5 transition-all flex items-center justify-center">
              <span className="text-lg mr-2">+</span> Add Game Manually
            </button>
          </div>
        )}
      </div>
    </div>
  );
};



const RosterSection = ({ players, isCoach, onUpdateRole }) => {
  const getRoleIcon = (role) => {
    switch (role) {
      case 'Lockdown': return <Shield size={12} className="mr-1" />;
      case 'Hustle': return <Zap size={12} className="mr-1" />;
      case 'Energy': return <Zap size={12} className="mr-1" />;
      case 'Spark': return <Zap size={12} className="mr-1" />;
      case 'General': return <Crown size={12} className="mr-1" />;
      case 'Sniper': return <Target size={12} className="mr-1" />;
      case 'Rebounder': return <Activity size={12} className="mr-1" />;
      default: return <Heart size={12} className="mr-1" />;
    }
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center px-1 mb-4">
        <h3 className="text-sm font-black text-jazz-black uppercase tracking-wider">
          Roster ({players.length})
        </h3>
      </div>
        {isCoach && <button className="text-xs font-semibold text-jazz-purple hover:text-jazz-purple">Edit Roster</button>}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
        {players.map((player) => (
          <Card key={player.id} className="p-3 flex flex-col justify-between h-full">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-10 h-10 bg-jazz-paper rounded-full flex items-center justify-center text-jazz-muted font-bold text-lg shrink-0">
                {player.number}
              </div>
              <div>
                <p className="font-bold text-jazz-black text-xl leading-tight">{player.name}</p>
              </div>
            </div>
            
            {isCoach ? (
              <select 
                value={player.role || ''}
                onChange={(e) => onUpdateRole(player.id, e.target.value)}
                className="w-full mt-2 text-xs border border-jazz-muted/25 rounded p-1 text-jazz-muted focus:outline-none focus:border-jazz-purple/30 bg-jazz-paper"
              >
                <option value="">Select Role</option>
                {PLAYER_ROLES.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            ) : (
              player.role && (
                <div className="flex items-center text-xs text-jazz-purple font-medium mt-1 bg-jazz-purple-50 self-start px-2 py-0.5 rounded-full">
                  {getRoleIcon(player.role)}
                  {player.role}
                </div>
              )
            )}
          </Card>
        ))}
        {isCoach && (
          <button className="border-2 border-dashed border-jazz-muted/25 rounded-2xl flex flex-col items-center justify-center py-4 text-jazz-muted/80 hover:bg-jazz-paper hover:border-jazz-muted/35 transition-colors h-full min-h-[100px]">
            <span className="text-xl mb-1">+</span>
            <span className="text-xs font-medium">Add Kid</span>
          </button>
        )}
      </div>
    </div>
  );
};

const StandingsSection = ({ standings, teamName }) => (
  <div className="mt-10 -mx-4 md:mx-0">
    <div className="px-4 md:px-1 mb-4">
      <h3 className="text-sm font-black text-jazz-black uppercase tracking-wider text-left">
        Standings
      </h3>
    </div>
    <Card className="overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-jazz-paper text-jazz-muted/80 font-medium">
          <tr>
            <th className="py-3 px-4 w-10">#</th>
            <th className="py-3 px-2">Team</th>
            <th className="py-3 px-4 text-right">W-L</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {standings.map((team) => {
            const isMyTeam = teamName.includes(team.name) || teamName.includes(team.name.split(' ')[1]); 
            return (
              <tr key={team.rank} className={isMyTeam ? "bg-jazz-purple-50/50" : ""}>
                <td className="py-3 px-4 font-medium text-jazz-muted/80">{team.rank}</td>
                <td className={`py-3 px-2 font-bold ${isMyTeam ? 'text-jazz-purple' : 'text-jazz-black/80'}`}>
                  {team.name}
                  {isMyTeam && <span className="ml-2 inline-block w-2 h-2 bg-jazz-purple-600 rounded-full"></span>}
                </td>
                <td className="py-3 px-4 text-right text-jazz-muted tabular-nums">{team.w}-{team.l}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="bg-jazz-paper p-3 text-center border-t border-jazz-muted/20">
        <p className="text-xs text-jazz-muted/80">Regular Season • 2026 Ogden Jr Jazz</p>
      </div>
    </Card>
  </div>
);

const Header = ({ team, scrolled, schedule }) => (
  <header
    className={
      `sticky top-0 z-40 transition-all duration-300 ` +
      (scrolled
        ? "bg-jazz-paper/95 backdrop-blur-md"
        : "bg-jazz-paper")
    }
  >
    <div className={"max-w-md mx-auto " + (scrolled ? "pt-2" : "pt-2") + " pb-3"}>
      {/* Logo spans full header width */}
      <div className="px-4">
        <img
          src={logo}
          alt="Utah Jazz Basketball"
          className={
            "w-full object-contain " +
            (scrolled ? "max-h-[64px]" : "max-h-[96px]")
          }
        />
      </div>

      {/* League name then Coach/Team name */}
      <div className="mt-1 flex flex-col items-center text-center px-4">
        <p className="text-[13px] font-bold uppercase tracking-wider text-jazz-muted">
          {team.league}
        </p>
        <h1
          className={
            "font-black leading-tight text-jazz-black " +
            (scrolled ? "text-2xl" : "text-3xl")
          }
        >
          {team.name}
        </h1>
        <div className="mt-1 text-xs font-semibold text-jazz-black/70">
          Record {team.record.w}-{team.record.l} • {" "}
          <span className="text-jazz-muted">{schedule.length} Games</span>
        </div>
      </div>
    </div>
  </header>
);

const CSVWizard = ({ onImport, type, onClose }) => {
  const [step, setStep] = useState('upload'); // upload, validating, results, success
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [validationResults, setValidationResults] = useState(null);
  const [uniqueTeams, setUniqueTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const inputRef = useRef(null);

  const handleFile = (selectedFile) => {
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      processFile(selectedFile);
    } else {
      alert("Please upload a .csv file");
    }
  };

  const processFile = (file) => {
    setStep('validating');
    const reader = new FileReader();
    reader.onload = (e) => {
      setTimeout(() => { // Simulate processing delay
        try {
          const rawRows = parseCSV(e.target.result);
          
          // Normalize Team Names (Last, First -> First Last)
          const rows = rawRows.map(row => ({
            ...row,
            home_team: normalizeTeamName(row.home_team),
            away_team: normalizeTeamName(row.away_team)
          }));

          const results = {
            total: rows.length,
            validRows: [],
            errors: [],
            warnings: []
          };

          // Extract Unique Teams if this is a Schedule upload
          if (type === 'Schedule') {
            const allTeams = new Set();
            rows.forEach(r => {
              if (r.home_team) allTeams.add(r.home_team);
              if (r.away_team) allTeams.add(r.away_team);
            });
            const sortedTeams = Array.from(allTeams).sort();
            setUniqueTeams(sortedTeams);
            if (sortedTeams.length > 0) setSelectedTeam(sortedTeams[0]);
          }

          rows.forEach((row, idx) => {
            const { errors, warnings } = validateScheduleRow(row, idx);
            if (errors.length > 0) {
              results.errors.push({ row: idx + 1, messages: errors });
            } else {
              results.validRows.push(row);
            }
            if (warnings.length > 0) {
              results.warnings.push({ row: idx + 1, messages: warnings });
            }
          });

          setValidationResults(results);
          setStep('results');
        } catch (err) {
          alert(err.message);
          setStep('upload');
          setFile(null);
        }
      }, 1500);
    };
    reader.readAsText(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const finishImport = () => {
    if (validationResults?.validRows) {
      onImport(validationResults.validRows, selectedTeam);
    }
    setStep('success');
  };

  return (
    <Card className="p-6 mb-6 border-jazz-purple/25 shadow-md">
      <div className="flex justify-between items-start mb-4">
         <div>
           <h4 className="font-bold text-jazz-black text-lg">Import {type}</h4>
           <p className="text-xs text-jazz-muted">Step {step === 'upload' ? '1' : step === 'validating' ? '2' : '3'} of 3</p>
         </div>
         {step !== 'success' && (
           <button onClick={onClose} className="text-jazz-muted/80 hover:text-jazz-muted"><X size={20}/></button>
         )}
      </div>

      {step === 'upload' && (
        <div 
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${dragActive ? 'border-jazz-purple/40 bg-jazz-purple-50' : 'border-jazz-muted/35 hover:border-jazz-purple/35 hover:bg-jazz-paper'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current.click()}
        >
          <input 
            ref={inputRef}
            type="file" 
            className="hidden" 
            accept=".csv"
            onChange={(e) => handleFile(e.target.files[0])}
          />
          <div className="w-12 h-12 bg-jazz-purple-100 rounded-full flex items-center justify-center text-jazz-purple mx-auto mb-3">
            <Upload size={24} />
          </div>
          <p className="text-sm font-semibold text-jazz-black/80">Click to upload or drag and drop</p>
          <p className="text-xs text-jazz-muted/80 mt-1">.CSV files only (Max 300 rows)</p>
          <div className="mt-6">
            <button className="text-xs font-bold text-jazz-purple flex items-center justify-center mx-auto hover:underline">
              <Download size={12} className="mr-1" /> Download Template
            </button>
          </div>
        </div>
      )}

      {step === 'validating' && (
        <div className="py-12 text-center">
          <Loader size={32} className="animate-spin text-jazz-purple mx-auto mb-4" />
          <h5 className="font-bold text-jazz-black/80">Checking your file...</h5>
          <p className="text-xs text-jazz-muted mt-1">Looking for typos and format issues.</p>
        </div>
      )}

      {step === 'results' && validationResults && (
        <div className="animate-in fade-in zoom-in duration-300">
          
          {/* TEAM SELECTOR - NEW */}
          {type === 'Schedule' && uniqueTeams.length > 0 && (
             <div className="mb-6 bg-jazz-purple-50 border border-jazz-purple/20 p-4 rounded-xl">
               <div className="flex items-start gap-3">
                 <div className="bg-jazz-paper p-2 rounded-lg text-jazz-purple shadow-sm mt-1">
                   <Filter size={20} />
                 </div>
                 <div className="flex-1">
                   <label className="block text-sm font-bold text-jazz-purple mb-1">
                     Which team are you coaching?
                   </label>
                   <p className="text-xs text-jazz-purple mb-2">
                     We found {uniqueTeams.length} teams. Select yours to filter the dashboard.
                   </p>
                   <select 
                     value={selectedTeam}
                     onChange={(e) => setSelectedTeam(e.target.value)}
                     className="w-full p-2 rounded-lg border border-jazz-purple/25 text-sm font-medium text-jazz-black/80 focus:outline-none focus:ring-2 focus:ring-jazz-purple/40"
                   >
                     {uniqueTeams.map(t => (
                       <option key={t} value={t}>{t}</option>
                     ))}
                   </select>
                 </div>
               </div>
             </div>
          )}

          <div className="flex gap-4 mb-6">
            <div className="flex-1 bg-jazz-paper p-3 rounded-lg border border-jazz-muted/20 text-center">
              <p className="text-xs text-jazz-muted/80 uppercase font-bold">Total Rows</p>
              <p className="text-xl font-black text-jazz-black/80">{validationResults.total}</p>
            </div>
            <div className={`flex-1 p-3 rounded-lg border text-center ${validationResults.errors.length > 0 ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
              <p className={`text-xs uppercase font-bold ${validationResults.errors.length > 0 ? 'text-red-400' : 'text-green-600'}`}>Errors</p>
              <p className={`text-xl font-black ${validationResults.errors.length > 0 ? 'text-red-700' : 'text-green-700'}`}>{validationResults.errors.length}</p>
            </div>
            <div className="flex-1 bg-orange-50 p-3 rounded-lg border border-orange-100 text-center">
              <p className="text-xs text-orange-400 uppercase font-bold">Warnings</p>
              <p className="text-xl font-black text-orange-700">{validationResults.warnings.length}</p>
            </div>
          </div>

          {validationResults.errors.length > 0 ? (
            <div className="mb-6 bg-red-50 border border-red-100 rounded-lg p-4 max-h-48 overflow-y-auto">
              <h5 className="flex items-center text-sm font-bold text-red-800 mb-2">
                <AlertCircle size={16} className="mr-2" /> Action Required
              </h5>
              <ul className="space-y-2">
                {validationResults.errors.map((err, i) => (
                  <li key={i} className="text-xs text-red-700 bg-jazz-paper p-2 rounded border border-red-100">
                    <span className="font-bold mr-1">Row {err.row}:</span> 
                    {err.messages.join(" ")}
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-center">
                 <button onClick={() => {setStep('upload'); setFile(null);}} className="text-sm font-bold text-red-700 hover:underline">
                   Upload corrected file
                 </button>
              </div>
            </div>
          ) : (
            <div className="mb-6 bg-green-50 border border-green-100 rounded-lg p-4 text-center">
               <p className="text-sm font-bold text-green-800 flex items-center justify-center">
                 <Check size={16} className="mr-2" /> Ready to Import
               </p>
               <p className="text-xs text-green-700 mt-1">All {validationResults.validRows.length} games look good.</p>
            </div>
          )}

          {validationResults.warnings.length > 0 && (
             <div className="mb-6 bg-orange-50 border border-orange-100 rounded-lg p-3">
               <h5 className="flex items-center text-xs font-bold text-orange-800 mb-1">
                 <AlertTriangle size={12} className="mr-1" /> Warnings (Will not block import)
               </h5>
               <ul className="space-y-1">
                {validationResults.warnings.map((warn, i) => (
                  <li key={i} className="text-[10px] text-orange-700 pl-4">
                    Row {warn.row}: {warn.messages.join(" ")}
                  </li>
                ))}
              </ul>
             </div>
          )}

          <button 
            disabled={validationResults.errors.length > 0}
            onClick={finishImport}
            className={`w-full py-3 rounded-xl font-bold text-sm shadow-md transition-all ${validationResults.errors.length > 0 ? 'bg-jazz-muted/10 text-jazz-muted/80 cursor-not-allowed' : 'bg-jazz-purple-600 text-jazz-paper hover:bg-jazz-purple-700'}`}
          >
            {validationResults.errors.length > 0 ? 'Fix Errors to Import' : 'Import Schedule'}
          </button>
        </div>
      )}

      {step === 'success' && (
        <div className="text-center py-8 animate-in zoom-in duration-300">
           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
             <Check size={32} />
           </div>
           <h4 className="text-xl font-black text-jazz-black mb-2">Success!</h4>
           <p className="text-sm text-jazz-muted mb-6">Your schedule has been published and parents have been notified.</p>
           <button onClick={onClose} className="bg-jazz-paper text-jazz-black/80 px-6 py-2 rounded-lg font-bold text-sm hover:bg-jazz-muted/10">
             Done
           </button>
        </div>
      )}
    </Card>
  );
};


const AdminTools = ({ isCoach, onImportSchedule }) => {
  const [activeWizard, setActiveWizard] = useState(null); // 'Schedule' or 'Roster'

  if (!isCoach) return null;

  const handleImport = (data, selectedTeam) => {
    if (activeWizard === 'Schedule') {
      onImportSchedule(data, selectedTeam);
    }
  };

  return (
    <div className="mb-6 border-t border-jazz-muted/25 pt-8 mt-8">
      <div className="flex items-start justify-between mb-4 px-1">
        <h3 className="text-sm font-black text-jazz-black uppercase tracking-wider text-left">
          <Shield size={14} /> Team Admin
        </h3>
      </div>
      
      {activeWizard ? (
        <CSVWizard 
          type={activeWizard} 
          onImport={handleImport} 
          onClose={() => setActiveWizard(null)} 
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 hover:border-jazz-purple/30 transition-colors cursor-pointer" onClick={() => setActiveWizard('Roster')}>
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-jazz-black/80">Import Roster</h4>
                <p className="text-xs text-jazz-muted/80 mt-1">CSV: Name, Number, Contact</p>
              </div>
              <div className="bg-jazz-purple-50 p-2 rounded-lg text-jazz-purple">
                <Users size={20} />
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:border-jazz-purple/30 transition-colors cursor-pointer" onClick={() => setActiveWizard('Schedule')}>
             <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-jazz-black/80">Import Schedule</h4>
                <p className="text-xs text-jazz-muted/80 mt-1">CSV: Date, Time, Location...</p>
              </div>
              <div className="bg-jazz-purple-50 p-2 rounded-lg text-jazz-purple">
                <Calendar size={20} />
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [isCoach, setIsCoach] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [schedule, setSchedule] = useState(() => hydrateSchedule(INITIAL_SCHEDULE));
  const [teamData, setTeamData] = useState(INITIAL_TEAM_DATA);
  const [roster, setRoster] = useState(INITIAL_ROSTER);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScheduleImport = (rows, selectedTeamName) => {
    // 1. Update the Team Name based on coach last name
    if (selectedTeamName) {
      const lastName = getTeamLastName(selectedTeamName);
      setTeamData(prev => ({ 
        ...prev, 
        name: lastName
      }));
    }

    // 2. Process the validated CSV rows into app-ready data, filtered by team
    const newSchedule = processScheduleImport(rows, selectedTeamName || "Hornets");
    setSchedule(newSchedule);
  };

  const handleUpdateResult = (gameId, result) => {
    setSchedule(prev => prev.map(game => {
      if (game.id === gameId) {
        return { ...game, result };
      }
      return game;
    }));
    
    // Update Record (Simplified calc for demo)
    if (result) {
      setTeamData(prev => {
        const newRecord = { ...prev.record };
        if (result === 'W') newRecord.w += 1;
        if (result === 'L') newRecord.l += 1;
        return { ...prev, record: newRecord };
      });
    } else {
        // If undoing, logic would be complex without history, 
        // effectively resetting record in this simple mock
    }
  };

  const handleUpdateRole = (playerId, newRole) => {
    setRoster(prev => prev.map(p => 
      p.id === playerId ? { ...p, role: newRole } : p
    ));
  };

  return (
    <div className="min-h-screen bg-jazz-paper pb-24 font-sans text-jazz-black selection:bg-yellow-200">
      <Header team={teamData} scrolled={scrolled} schedule={schedule} />

      <div className="bg-jazz-muted/10">

        <main className="max-w-md mx-auto px-4 pt-4">
          {/* Schedule at top */}
          <ScheduleSection 
            schedule={schedule} 
            isCoach={isCoach} 
            onUpdateResult={handleUpdateResult}
          />

          <div className="grid grid-cols-1 gap-6">
            <StandingsSection standings={STANDINGS_DATA} teamName={teamData.name} />
            <RosterSection 
              players={roster} 
              isCoach={isCoach} 
              onUpdateRole={handleUpdateRole}
            />
          </div>

          <AdminTools isCoach={isCoach} onImportSchedule={handleScheduleImport} />

          <div className="mt-8 mb-8 text-center px-8">
            <p className="text-jazz-muted/80 text-xs leading-relaxed italic">
              "We build confidence through preparation and sportsmanship. The scoreboard is secondary to our growth."
            </p>
          </div>
        </main>

        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-jazz-black/90 backdrop-blur-md text-jazz-paper p-1.5 rounded-full shadow-2xl flex items-center space-x-2 border border-jazz-black/25/50">
            <button 
              onClick={() => setIsCoach(false)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${!isCoach ? 'bg-jazz-paper text-jazz-black shadow-md' : 'text-jazz-muted/80 hover:text-jazz-paper'}`}
            >
              Parent
            </button>
            <button 
              onClick={() => setIsCoach(true)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${isCoach ? 'bg-jazz-purple-600 text-jazz-paper shadow-md' : 'text-jazz-muted/80 hover:text-jazz-paper'}`}
            >
              Coach
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}