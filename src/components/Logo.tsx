import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'dark' | 'light';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
  theme = 'light',
}) => {
  const sizeHeights = {
    sm: variant === 'icon' ? 26 : 28,
    md: variant === 'icon' ? 36 : 38,
    lg: variant === 'icon' ? 48 : 50,
    xl: variant === 'icon' ? 62 : 64,
  };

  const height = sizeHeights[size];

  // Injects smooth live status breathing animation safely across all browsers
  const liveAnimationStyles = (
    <style>{`
      @keyframes liveStatusBreathe {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
      .animate-live-logo {
        animation: liveStatusBreathe 3.5s ease-in-out infinite;
      }
    `}</style>
  );

  if (variant === 'icon') {
    return (
      <div className={`inline-block shrink-0 animate-live-logo ${className}`}>
        {liveAnimationStyles}
        <svg
          viewBox="65 75 260 260" // Safe square canvas calculations prevent node truncation
          height={height}
          width={height}
          fill="none"
          xmlns="http://w3.org"
          className="shrink-0 transition-transform duration-300 group-hover:scale-105"
          aria-hidden="true"
        >
          {/* Connecting Infrastructure Lines */}
          <line x1="90" y1="105" x2="198" y2="102" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="90" y1="105" x2="148" y2="198" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="90" y1="105" x2="234" y2="172" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="198" y1="102" x2="148" y2="198" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="198" y1="102" x2="234" y2="172" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="198" y1="102" x2="308" y2="198" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="148" y1="198" x2="90" y2="295" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="148" y1="198" x2="198" y2="298" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="148" y1="198" x2="220" y2="228" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="234" y1="172" x2="308" y2="198" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="234" y1="172" x2="220" y2="228" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="234" y1="172" x2="198" y2="298" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="308" y1="198" x2="220" y2="228" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="308" y1="198" x2="198" y2="298" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="90" y1="295" x2="198" y2="298" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="220" y1="228" x2="198" y2="298" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />

          {/* Data Nodes */}
          <circle cx="90" cy="105" r="14" fill="#7e9988" />
          <circle cx="198" cy="102" r="14.5" fill="#0e223b" />
          <circle cx="148" cy="198" r="14.5" fill="#0e223b" />
          <circle cx="234" cy="172" r="13" fill="#7e9988" />
          <circle cx="220" cy="228" r="13" fill="#0e223b" />
          <circle cx="308" cy="198" r="13.5" fill="#7e9988" />
          <circle cx="90" cy="295" r="13.5" fill="#7e9988" />
          <circle cx="198" cy="298" r="14.5" fill="#0e223b" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center min-w-max animate-live-logo ${className}`}>
      {liveAnimationStyles}
      <svg
        viewBox="65 75 1080 245"
        height={height}
        style={{ height: `${height}px`, width: 'auto' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block shrink-0 transition-transform duration-300 group-hover:scale-[1.01] select-none"
        aria-label="ReachVector Intelligence"
      >
        {/* Vector Network Mark (Arrow Constellation) */}
        <g id="vector-mark">
          {/* Connecting Infrastructure Lines */}
          <line x1="90" y1="105" x2="198" y2="102" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="90" y1="105" x2="148" y2="198" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="90" y1="105" x2="234" y2="172" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="198" y1="102" x2="148" y2="198" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="198" y1="102" x2="234" y2="172" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="198" y1="102" x2="308" y2="198" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="148" y1="198" x2="90" y2="295" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="148" y1="198" x2="198" y2="298" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="148" y1="198" x2="220" y2="228" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="234" y1="172" x2="308" y2="198" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="234" y1="172" x2="220" y2="228" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="234" y1="172" x2="198" y2="298" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="308" y1="198" x2="220" y2="228" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="308" y1="198" x2="198" y2="298" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="90" y1="295" x2="198" y2="298" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="220" y1="228" x2="198" y2="298" stroke="#8c9da9" strokeWidth="4.2" strokeLinecap="round" />

          {/* Data Nodes */}
          <circle cx="90" cy="105" r="14" fill="#7e9988" />
          <circle cx="198" cy="102" r="14.5" fill="#0e223b" />
          <circle cx="148" cy="198" r="14.5" fill="#0e223b" />
          <circle cx="234" cy="172" r="13" fill="#7e9988" />
          <circle cx="220" cy="228" r="13" fill="#0e223b" />
          <circle cx="308" cy="198" r="13.5" fill="#7e9988" />
          <circle cx="90" cy="295" r="13.5" fill="#7e9988" />
          <circle cx="198" cy="298" r="14.5" fill="#0e223b" />
        </g>

        {/* Brand Typography */}
        <text
          x="360"
          y="180"
          fill={theme === 'dark' ? '#ffffff' : '#0e1f36'}
          style={{
            fontFamily: '"Space Grotesk", "Plus Jakarta Sans", sans-serif',
            fontWeight: 800,
            fontSize: '68px',
            letterSpacing: '0.11em',
          }}
        >
          REACHVECTOR
        </text>
        <text
          x="362"
          y="246"
          fill={theme === 'dark' ? '#cbd5e1' : '#1e2e42'}
          style={{
            fontFamily: '"Space Grotesk", "Plus Jakarta Sans", sans-serif',
            fontWeight: 500,
            fontSize: '46px',
            letterSpacing: '0.38em',
          }}
        >
          INTELLIGENCE
        </text>
      </svg>
    </div>
  );
};