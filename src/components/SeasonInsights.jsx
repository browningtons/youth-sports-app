import Card from './ui/Card';
import { buildSeasonInsights } from '../lib/insights';

export default function SeasonInsights({ results, teamName }) {
  const insights = buildSeasonInsights(results, teamName);

  if (!insights) return null;

  return (
    <div className="-mx-4 md:mx-0">
      <div className="px-4 md:px-1 mb-4">
        <h3 className="text-sm font-black text-jazz-black uppercase tracking-wider text-left">Season Insights</h3>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-jazz-muted">
          Based on Weeks 1-4 ({insights.gamesAnalyzed} games)
        </p>
      </div>

      <div className="px-4 md:px-0 space-y-3">
        <Card className="p-4">
          <p className="text-[11px] font-black uppercase tracking-wide text-jazz-muted mb-2">League Snapshot</p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-jazz-paper border border-jazz-muted/20 p-2">
              <p className="text-[10px] uppercase font-bold text-jazz-muted">Pts/Game</p>
              <p className="text-base font-black text-jazz-black">{insights.avgTotalPoints}</p>
            </div>
            <div className="rounded-lg bg-jazz-paper border border-jazz-muted/20 p-2">
              <p className="text-[10px] uppercase font-bold text-jazz-muted">Avg Margin</p>
              <p className="text-base font-black text-jazz-black">{insights.avgMargin}</p>
            </div>
            <div className="rounded-lg bg-jazz-paper border border-jazz-muted/20 p-2">
              <p className="text-[10px] uppercase font-bold text-jazz-muted">Close Games</p>
              <p className="text-base font-black text-jazz-black">{insights.closeGames}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <p className="text-[11px] font-black uppercase tracking-wide text-jazz-muted mb-2">Leaders</p>
          <div className="space-y-1 text-sm text-jazz-black/90">
            <p>
              Top Offense: <span className="font-bold">{insights.offenseLeader.team.replace('Team ', '')}</span> ({insights.offenseLeader.ppg} PPG)
            </p>
            <p>
              Top Defense: <span className="font-bold">{insights.defenseLeader.team.replace('Team ', '')}</span> ({insights.defenseLeader.papg} PAPG)
            </p>
            <p>
              Undefeated: <span className="font-bold">{insights.undefeatedTeams.join(', ')}</span>
            </p>
          </div>
        </Card>

        <Card className="p-4">
          <p className="text-[11px] font-black uppercase tracking-wide text-jazz-muted mb-2">{insights.team.name} Snapshot</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p className="rounded-lg border border-jazz-muted/20 p-2">
              Record: <span className="font-bold">{insights.team.record}</span>
            </p>
            <p className="rounded-lg border border-jazz-muted/20 p-2">
              Point Diff: <span className="font-bold">{insights.team.diff}</span>
            </p>
            <p className="rounded-lg border border-jazz-muted/20 p-2">
              PPG: <span className="font-bold">{insights.team.ppg}</span>
            </p>
            <p className="rounded-lg border border-jazz-muted/20 p-2">
              PAPG: <span className="font-bold">{insights.team.papg}</span>
            </p>
          </div>
          <p className="mt-2 text-xs text-jazz-muted">
            Opponent combined record: <span className="font-bold text-jazz-black">{insights.team.opponentRecord}</span>
          </p>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {insights.team.trend.map((entry) => (
              <div key={entry.week} className="rounded-lg border border-jazz-muted/20 p-2 text-center">
                <p className="text-[10px] uppercase font-bold text-jazz-muted">Wk {entry.week}</p>
                <p className="text-base font-black text-jazz-black">{entry.scored}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <p className="text-[11px] font-black uppercase tracking-wide text-jazz-muted mb-2">Notable Games</p>
          <div className="space-y-1 text-sm text-jazz-black/90">
            <p>
              Closest: <span className="font-bold">{insights.notableGames.closest}</span>
            </p>
            <p>
              Biggest Blowout: <span className="font-bold">{insights.notableGames.blowout}</span>
            </p>
            <p>
              Top Team Score: <span className="font-bold">{insights.notableGames.topScore}</span>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
