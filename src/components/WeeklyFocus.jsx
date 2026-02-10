import utahLogo from '../assets/utah-logo.png';
import { INITIAL_FOCUS } from '../data/constants';
import Card from './ui/Card';

export default function WeeklyFocus() {
  const focus = INITIAL_FOCUS;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2 px-1">
        <h3 className="text-sm font-black text-jazz-black uppercase tracking-wider text-left">This Week&apos;s Focus</h3>
      </div>

      <Card className="w-full bg-jazz-purple text-jazz-paper p-6 relative rounded-md overflow-hidden">
        <img
          src={utahLogo}
          alt="Utah Jazz Basketball Icon"
          className="absolute left-6 top-1/2 -translate-y-1/2 w-28 h-28 opacity-[0.06] pointer-events-none select-none"
        />

        <div className="relative z-10 pl-16">
          <h2 className="text-md font-black mb-2 tracking-tight text-jazz-paper text-center">{focus.topic}</h2>

          <div className="w-14 h-1 bg-yellow-400 rounded-full mb-4 mx-auto" />

          <p className="text-jazz-paper/90 font-semibold italic opacity-90 text-lg text-center">{focus.quote}</p>

          {focus.note && (
            <div className="mt-5 pt-3 border-t border-jazz-paper/20">
              <p className="text-xs text-jazz-paper/75 flex items-start gap-2">
                <span className="font-bold uppercase tracking-wider opacity-80">Note:</span>
                <span>{focus.note}</span>
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
