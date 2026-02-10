import { INITIAL_FOCUS } from '../data/constants';
import Card from './ui/Card';

export default function WeeklyFocus() {
  const focus = INITIAL_FOCUS;

  return (
    <div className="mt-4 mb-10">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-black text-jazz-black uppercase tracking-wider text-left">This Week&apos;s Focus</h3>
      </div>

      <Card className="w-full bg-jazz-purple text-jazz-paper p-8 rounded-md overflow-hidden">
        <div className="max-w-sm mx-auto text-center">
          <h2 className="text-md font-black mb-3 tracking-tight text-jazz-paper">{focus.topic}</h2>

          <div className="w-14 h-1 bg-yellow-400 rounded-full mb-5 mx-auto" />

          <p className="text-jazz-paper/90 font-semibold italic opacity-90 text-3xl leading-tight">{focus.quote}</p>

          {focus.note && (
            <div className="mt-7 pt-4 border-t border-jazz-paper/20">
              <p className="text-xs text-jazz-paper/75 flex items-start justify-center gap-2">
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
