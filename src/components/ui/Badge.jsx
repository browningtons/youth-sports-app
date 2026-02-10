const styles = {
  neutral: 'bg-jazz-muted/20 text-jazz-black',
  primary: 'bg-jazz-purple text-jazz-paper',
  accent: 'bg-jazz-sky text-jazz-black',
  home: 'bg-jazz-purple text-jazz-paper',
  away: 'bg-jazz-sky text-jazz-black',
  win: 'bg-jazz-purple/15 text-jazz-purple',
  loss: 'bg-jazz-black/10 text-jazz-black',
  warning: 'bg-jazz-sky/20 text-jazz-black',
  error: 'bg-jazz-black text-jazz-paper',
};

export default function Badge({ children, type = 'neutral' }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold tracking-wide ${styles[type]}`}>
      {children}
    </span>
  );
}
