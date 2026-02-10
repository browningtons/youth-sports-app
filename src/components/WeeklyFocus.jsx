import utahLogo from '../assets/utah-logo.png';
import { INITIAL_FOCUS } from '../data/constants';
import Card from './ui/Card';

export default function WeeklyFocus() {
  const focus = INITIAL_FOCUS;

  return (
    <div className="mt-4 mb-10">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-black text-jazz-black uppercase tracking-wider text-left">This Week&apos;s Focus</h3>
      </div>

      <Card className="w-full bg-jazz-purple text-jazz-paper p-8 relative rounded-md overflow-hidden">
        <img
          src={utahLogo}
          alt="Utah Jazz Basketball Icon"
          className="absolute left-7 top-1/2 -translate-y-1/2 w-28 h-28 opacity-[0.06] pointer-events-none select-none"
        />

        <div className="relative z-10 pl-16 pr-2">
          <h2 className="text-md font-black mb-3 tracking-tight text-jazz-paper text-center">{focus.topic}</h2>

          <div className="w-14 h-1 bg-yellow-400 rounded-full mb-5 mx-auto" />

          <p className="text-jazz-paper/90 font-semibold italic opacity-90 text-3xl text-center leading-tight">{focus.quote}</p>

          {focus.note && (
            <div className="mt-7 pt-4 border-t border-jazz-paper/20">
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
