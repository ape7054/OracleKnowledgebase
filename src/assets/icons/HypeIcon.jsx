import React from 'react';

const HypeIcon = ({ width = 32, height = 32, ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="hypeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF8C42"/>
        <stop offset="100%" stopColor="#FF6B35"/>
      </linearGradient>
    </defs>
    <circle cx="16" cy="16" r="16" fill="url(#hypeGradient)"/>
    <g transform="translate(6, 8)">
      <path
        d="M2 2h6v2H6v4h2v2H2V2zm0 6h2v4h4v2H2v-6z"
        fill="white"
        opacity="0.9"
      />
      <path
        d="M12 2h6v2h-4v2h3v2h-3v2h4v2h-6V2z"
        fill="white"
        opacity="0.9"
      />
    </g>
    <circle cx="16" cy="16" r="15" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
  </svg>
);

export default HypeIcon;
