import Image from 'next/image';

export default function Loading() {
  const NAVY = '#12182B';
  const AMBER = '#C7954A';
  const CREAM = '#F7F6F2';
  const MUTED = '#6B7184';

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: CREAM, fontFamily: "'Manrope', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&display=swap');

        @keyframes fld-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.06); opacity: 0.85; }
        }
        @keyframes fld-ring-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fld-dot {
          0%, 80%, 100% { opacity: 0.25; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-3px); }
        }
        @keyframes fld-fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Logo mark with rotating ring around it */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: 96, height: 96, animation: 'fld-fade-in 0.5s ease-out' }}
      >
        {/* Rotating partial ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: `3px solid ${NAVY}14`,
            borderTopColor: AMBER,
            borderRightColor: `${AMBER}66`,
            animation: 'fld-ring-spin 1s linear infinite',
          }}
        />

        {/* Logo itself gently pulsing */}
        <div
          className="relative flex items-center justify-center rounded-full bg-white shadow-md"
          style={{ width: 72, height: 72, animation: 'fld-pulse 1.8s ease-in-out infinite' }}
        >
          <Image
            src="/logo-512.png"
            alt="Founders Legal Desk"
            width={44}
            height={44}
            priority
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* Wordmark */}
      <div
        className="mt-6 flex flex-col items-center gap-1"
        style={{ animation: 'fld-fade-in 0.6s ease-out 0.1s both' }}
      >
        <p
          className="text-[15px] font-extrabold tracking-[0.02em]"
          style={{ color: NAVY }}
        >
          FOUNDERS <span style={{ color: AMBER }}>LEGAL DESK</span>
        </p>
        <p
          className="text-[10.5px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: MUTED }}
        >
          Legal Support. Founder Focused.
        </p>
      </div>

      {/* Loading dots */}
      <div className="mt-6 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block h-1.5 w-1.5 rounded-full"
            style={{
              background: AMBER,
              animation: `fld-dot 1.2s ease-in-out ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}