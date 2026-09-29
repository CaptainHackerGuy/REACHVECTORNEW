import React from 'react';

export const YouTubeIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="YouTube">
    <path
      d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
      fill="#FF0000"
    />
    <polygon points="9.6,15.6 15.8,12 9.6,8.4" fill="#FFFFFF" />
  </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => {
  const gradientId = 'ig-grad-' + Math.random().toString(36).substring(2, 7);
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Instagram">
      <defs>
        <radialGradient id={gradientId} cx="20%" cy="110%" r="130%" fx="10%" fy="110%">
          <stop offset="0%" stopColor="#ffd600" />
          <stop offset="25%" stopColor="#ff7a00" />
          <stop offset="50%" stopColor="#ff0169" />
          <stop offset="75%" stopColor="#d300c5" />
          <stop offset="100%" stopColor="#7638fa" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill={`url(#${gradientId})`} />
      <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="#FFFFFF" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.2" stroke="#FFFFFF" strokeWidth="1.8" />
      <circle cx="15.8" cy="8.2" r="0.9" fill="#FFFFFF" />
    </svg>
  );
};

export const XIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="X">
    <rect width="24" height="24" rx="5" fill="#000000" />
    <path
      d="M17.2 5.5h2.15l-4.7 5.37 5.53 7.63H15.8l-3.39-4.44-3.89 4.44H6.37l5.03-5.75L6.05 5.5H8.3l3.05 4.04L17.2 5.5zm-.75 11.4h1.19L9.5 6.78H8.22l8.23 10.12z"
      fill="#FFFFFF"
    />
  </svg>
);

export const GlobeIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Website">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

export const VideoDemoIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Field Demos">
    <rect width="24" height="24" rx="5" fill="#4f46e5" />
    <polygon points="10,8 16,12 10,16" fill="#FFFFFF" />
  </svg>
);
