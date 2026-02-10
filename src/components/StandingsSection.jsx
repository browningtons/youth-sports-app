import Card from './ui/Card';

export default function StandingsSection({ standings, teamName }) {
  return (
    <div className="-mx-4 md:mx-0">
      <div className="px-4 md:px-1 mb-4">
        <h3 className="text-sm font-black text-jazz-black uppercase tracking-wider text-left">Standings</h3>
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
                <tr key={team.rank} className={isMyTeam ? 'bg-jazz-purple-50/50' : ''}>
                  <td className="py-3 px-4 font-medium text-jazz-muted/80">{team.rank}</td>
                  <td className={`py-3 px-2 font-bold ${isMyTeam ? 'text-jazz-purple' : 'text-jazz-black/80'}`}>
                    {team.name}
                    {isMyTeam && <span className="ml-2 inline-block w-2 h-2 bg-jazz-purple-600 rounded-full" />}
                  </td>
                  <td className="py-3 px-4 text-right text-jazz-muted tabular-nums">
                    {team.w}-{team.l}
                  </td>
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
}
