import { Calendar } from 'lucide-react';
import Card from './ui/Card';
import Badge from './ui/Badge';

export default function ScheduleSection({ schedule }) {
  if (!schedule || schedule.length === 0) {
    return (
      <div className="mb-8">
        <h3 className="text-sm font-black text-jazz-black uppercase tracking-wider text-left">Upcoming</h3>
        <Card className="p-8 text-center bg-jazz-paper border-dashed border-2 border-jazz-muted/30 shadow-none">
          <Calendar className="mx-auto text-jazz-muted/60 mb-3" size={32} />
          <p className="text-jazz-black font-medium">Schedule coming soon.</p>
          <p className="text-jazz-muted text-sm mt-1">First practice builds champions.</p>
        </Card>
      </div>
    );
  }

  const featuredGame =
    schedule.find((game) => !game.result && game.daysAway >= 0) ||
    schedule.find((game) => game.daysAway >= 0) ||
    schedule[0];

  const backgroundGames = schedule.filter((game) => game.id !== featuredGame.id);
  const pastGames = backgroundGames.filter((game) => game.result || game.daysAway < 0);
  const futureGames = backgroundGames.filter((game) => !game.result && game.daysAway >= 0);

  const countdownLabel = (game) => {
    if (game.result) return game.result === 'W' ? 'Win' : 'Loss';
    if (game.daysAway < 0) return 'Pending';
    if (game.daysAway === 0) return 'Today!';
    return `${game.daysAway} days`;
  };

  const compactGameClass =
    'rounded-xl border border-jazz-muted/20 px-3 py-2.5 flex items-center justify-between gap-3 bg-jazz-paper/70';

  return (
    <div className="-mx-4 md:mx-0">
      <div className="flex justify-between items-center px-4 md:px-1 mb-4">
        <h3 className="text-sm font-black text-jazz-black uppercase tracking-wider text-left">Schedule</h3>
      </div>
      <div className="flex flex-col gap-3 px-4 md:px-0">
        <Card key={featuredGame.id} className="relative">
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2 text-left">
                <Badge type={featuredGame.isHome ? 'home' : 'away'}>
                  {featuredGame.isHome ? 'Home' : 'Away'}
                </Badge>
                <span className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-md border border-jazz-muted/25 bg-jazz-muted/10 text-jazz-black/80">
                  {featuredGame.location}
                </span>
              </div>
              {featuredGame.result ? (
                <Badge type={featuredGame.result === 'W' ? 'win' : 'loss'}>{countdownLabel(featuredGame)}</Badge>
              ) : (
                <span className="text-xs font-bold uppercase tracking-wide text-jazz-black/70">
                  {countdownLabel(featuredGame)}
                </span>
              )}
            </div>

            <div className="mb-4">
              <p className="text-xs text-jazz-muted font-semibold uppercase tracking-wide">Next Up</p>
              <p className="text-xl font-black text-jazz-black leading-none mt-1">{featuredGame.opponent}</p>
            </div>

            <div className="flex items-center space-x-2 border-t border-jazz-muted/10 pt-3">
              <div className="flex items-center text-jazz-black/70 text-sm">
                <Calendar size={14} className="mr-2 text-jazz-purple" />
                <span className="font-medium">{featuredGame.date}</span>
              </div>
              <div className="flex items-center text-jazz-black/70 text-sm">
                <span className="text-jazz-muted/60 mr-2">|</span>
                <span className="font-medium">{featuredGame.time}</span>
              </div>
            </div>
          </div>
        </Card>

        {pastGames.length > 0 && (
          <details className="rounded-xl border border-jazz-muted/20 bg-jazz-paper/40">
            <summary className="list-none cursor-pointer px-3 py-2.5 text-xs font-bold uppercase tracking-wide text-jazz-muted">
              Past Games ({pastGames.length})
            </summary>
            <div className="px-2 pb-2 space-y-2 opacity-75">
              {pastGames.map((game) => (
                <div key={game.id} className={compactGameClass}>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-jazz-black truncate">{game.opponent}</p>
                    <p className="text-xs text-jazz-muted">
                      {game.date} • {game.time}
                    </p>
                  </div>
                  <Badge type={game.result === 'W' ? 'win' : 'loss'}>{countdownLabel(game)}</Badge>
                </div>
              ))}
            </div>
          </details>
        )}

        {futureGames.length > 0 && (
          <details className="rounded-xl border border-jazz-muted/20 bg-jazz-paper/50">
            <summary className="list-none cursor-pointer px-3 py-2.5 text-xs font-bold uppercase tracking-wide text-jazz-muted">
              Later Games ({futureGames.length})
            </summary>
            <div className="px-2 pb-2 space-y-2 opacity-80">
              {futureGames.map((game) => (
                <div key={game.id} className={compactGameClass}>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-jazz-black truncate">{game.opponent}</p>
                    <p className="text-xs text-jazz-muted">
                      {game.date} • {game.time}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-jazz-muted">{countdownLabel(game)}</span>
                </div>
              ))}
            </div>
          </details>
        )}

      </div>
    </div>
  );
}
