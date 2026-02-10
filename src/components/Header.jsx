import logo from '../assets/jazz-logo.png';

export default function Header({ team, scrolled, schedule }) {
  return (
    <header
      className={
        `sticky top-0 z-40 transition-all duration-300 ` +
        (scrolled ? 'bg-jazz-paper/95 backdrop-blur-md' : 'bg-jazz-paper')
      }
    >
      <div className={`max-w-md mx-auto ${scrolled ? 'pt-2' : 'pt-2'} pb-3`}>
        <div className="px-4">
          <img
            src={logo}
            alt="Utah Jazz Basketball"
            className={`w-full object-contain ${scrolled ? 'max-h-[64px]' : 'max-h-[96px]'}`}
          />
        </div>

        <div className="mt-1 flex flex-col items-center text-center px-4">
          <p className="text-[13px] font-bold uppercase tracking-wider text-jazz-muted">{team.league}</p>
          <h1 className={`font-black leading-tight text-jazz-black ${scrolled ? 'text-2xl' : 'text-3xl'}`}>
            {team.name}
          </h1>
          <div className="mt-1 text-xs font-semibold text-jazz-black/70">
            Record {team.record.w}-{team.record.l} • <span className="text-jazz-muted">{schedule.length} Games</span>
          </div>
        </div>
      </div>
    </header>
  );
}
