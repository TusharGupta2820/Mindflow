import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = 'w-full h-full', size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="mb-grad-primary" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2c5e55" />
          <stop offset="100%" stopColor="#4f7e71" />
        </linearGradient>
        <linearGradient id="mb-grad-accent" x1="20" y1="10" x2="20" y2="35" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#82ac9f" />
          <stop offset="100%" stopColor="#2c5e55" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#mb-grad-primary)" />
      <path
        d="M20 7C20 14 13 18 13 25C13 28.866 16.134 32 20 32C23.866 32 27 28.866 27 25C27 18 20 14 20 7Z"
        fill="white"
        fillOpacity="0.95"
      />
      <path
        d="M20 16C17 21 15 24 15 27C15 29.761 17.239 32 20 32C22.761 32 25 29.761 25 27C25 24 23 21 20 16Z"
        fill="url(#mb-grad-accent)"
        fillOpacity="0.4"
      />
      <circle cx="20" cy="27" r="2.5" fill="white" />
    </svg>
  );
};
