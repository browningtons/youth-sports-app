import { Activity, Crown, Heart, Shield, Target, Zap } from 'lucide-react';
import Card from './ui/Card';

export default function RosterSection({ players }) {
  const getRoleIcon = (role) => {
    switch (role) {
      case 'Lockdown':
        return <Shield size={12} className="mr-1" />;
      case 'Hustle':
      case 'Energy':
      case 'Spark':
        return <Zap size={12} className="mr-1" />;
      case 'General':
        return <Crown size={12} className="mr-1" />;
      case 'Sniper':
        return <Target size={12} className="mr-1" />;
      case 'Rebounder':
        return <Activity size={12} className="mr-1" />;
      default:
        return <Heart size={12} className="mr-1" />;
    }
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center px-1 mb-4">
        <h3 className="text-sm font-black text-jazz-black uppercase tracking-wider">Roster ({players.length})</h3>
      </div>
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

            {player.role && (
              <div className="flex items-center text-xs text-jazz-purple font-medium mt-1 bg-jazz-purple-50 self-start px-2 py-0.5 rounded-full">
                {getRoleIcon(player.role)}
                {player.role}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
