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

  return (
    <div className="-mx-4 md:mx-0">
      <div className="flex justify-between items-center px-4 md:px-1 mb-4">
        <h3 className="text-sm font-black text-jazz-black uppercase tracking-wider text-left">Schedule</h3>
      </div>
      <div className="flex flex-col gap-3 px-4 md:px-0">
        {schedule.map((game) => (
          <Card key={game.id} className="relative">
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2 text-left">
                  <Badge type={game.isHome ? 'home' : 'away'}>{game.isHome ? 'Home' : 'Away'}</Badge>
                  <span className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-md border border-jazz-muted/25 bg-jazz-muted/10 text-jazz-black/80">
                    {game.location}
                  </span>
                </div>

                {game.result ? (
                  <Badge type={game.result === 'W' ? 'win' : 'loss'}>{game.result === 'W' ? 'Win' : 'Loss'}</Badge>
                ) : (
                  <span
                    className={
                      'text-xs font-bold uppercase tracking-wide ' +
                      (game.daysAway < 0 ? 'text-jazz-muted' : 'text-jazz-black/60')
                    }
                  >
                    {game.daysAway < 0 ? 'Pending' : game.daysAway === 0 ? 'Today!' : `${game.daysAway} days`}
                  </span>
                )}
              </div>

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-start text-left">
                    <p className="text-xs text-jazz-muted font-semibold uppercase tracking-wide">Opponent</p>
                    <p className="text-lg font-bold text-jazz-black leading-none">{game.opponent}</p>
                  </div>
                </div>
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

      </div>
    </div>
  );
}
