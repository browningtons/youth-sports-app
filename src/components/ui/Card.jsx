export default function Card({ children, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-jazz-paper rounded-2xl shadow-sm border border-jazz-muted/20 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}
