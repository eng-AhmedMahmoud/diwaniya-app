/**
 * Diwaniya brand mark — 8-point Islamic geometric star (the Khatim Sulaymani
 * motif common across Gulf majlis tilework), with a warm saffron dot in the
 * centre suggesting the lit lantern that anchors every diwaniya gathering.
 * Two interlocking squares form the star outline; a thin indigo ring binds
 * the composition and reads as "the room you enter".
 */
export function BrandMark({ className = "", title = "Diwaniya" }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <defs>
        <linearGradient id="diwan-star" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#aebae8" />
          <stop offset="55%" stopColor="#5b67c4" />
          <stop offset="100%" stopColor="#2e3a87" />
        </linearGradient>
        <radialGradient id="diwan-lantern" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff7e0" />
          <stop offset="55%" stopColor="#ffc454" />
          <stop offset="100%" stopColor="#b6700a" />
        </radialGradient>
        <linearGradient id="diwan-ring" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#aebae8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffc454" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      {/* Outer binding ring */}
      <circle cx="32" cy="32" r="28" fill="none" stroke="url(#diwan-ring)" strokeWidth="1.5" opacity="0.7" />

      {/* 8-point star = two squares rotated 45° */}
      <g transform="translate(32 32)">
        <rect
          x="-18" y="-18" width="36" height="36" rx="2"
          fill="url(#diwan-star)" opacity="0.9"
        />
        <rect
          x="-18" y="-18" width="36" height="36" rx="2"
          transform="rotate(45)"
          fill="url(#diwan-star)" opacity="0.7"
        />
      </g>

      {/* Inner light circle — the majlis lantern */}
      <circle cx="32" cy="32" r="9" fill="url(#diwan-lantern)" />
      <circle cx="32" cy="32" r="9" fill="none" stroke="#fefaf2" strokeWidth="0.6" opacity="0.6" />

      {/* Centre seed dot */}
      <circle cx="32" cy="32" r="2" fill="#fefaf2" />

      {/* 8 small marker dots at the star tips for crispness at small sizes */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 32 + Math.cos(rad) * 24;
        const cy = 32 + Math.sin(rad) * 24;
        return <circle key={angle} cx={cx} cy={cy} r="1.4" fill="#ffc454" />;
      })}
    </svg>
  );
}
