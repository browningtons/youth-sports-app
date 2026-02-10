import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import RosterSection from './components/RosterSection';
import ScheduleSection from './components/ScheduleSection';
import StandingsSection from './components/StandingsSection';
import WeeklyFocus from './components/WeeklyFocus';
import {
  INITIAL_ROSTER,
  INITIAL_SCHEDULE,
  INITIAL_TEAM_DATA,
  STANDINGS_DATA,
} from './data/constants';
import { calculateRecord, hydrateSchedule } from './lib/schedule';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [schedule] = useState(() => hydrateSchedule(INITIAL_SCHEDULE));
  const [teamData] = useState(INITIAL_TEAM_DATA);
  const [roster] = useState(INITIAL_ROSTER);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const teamRecord = calculateRecord(schedule);

  return (
    <div className="min-h-screen bg-jazz-paper pb-24 font-sans text-jazz-black selection:bg-yellow-200">
      <Header team={{ ...teamData, record: teamRecord }} scrolled={scrolled} schedule={schedule} />

      <div className="bg-jazz-muted/10">
        <main className="max-w-md mx-auto px-4 pt-4">
          <ScheduleSection schedule={schedule} />

          <WeeklyFocus />

          <div className="grid grid-cols-1 gap-6">
            <StandingsSection standings={STANDINGS_DATA} teamName={teamData.name} />
            <RosterSection players={roster} />
          </div>

          <div className="mt-8 mb-8 text-center px-8">
            <p className="text-jazz-muted/80 text-xs leading-relaxed italic">
              "We build confidence through preparation and sportsmanship. The scoreboard is secondary to our growth."
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
