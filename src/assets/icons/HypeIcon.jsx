import React from 'react';

const HypeIcon = ({ width = 32, height = 32, style, ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
    {...props}
  >
    <defs>
      <linearGradient id="hypeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF8C42"/>
        <stop offset="100%" stopColor="#FF6B35"/>
      </linearGradient>
    </defs>
    <circle cx="16" cy="16" r="16" fill="url(#hypeGradient)"/>
    <g transform="translate(7, 9)">
      <path
        d="M2 1h4v2H4v3h2v2H2V1zm0 5h2v3h3v2H2v-5z"
        fill="white"
        opacity="0.95"
      />
      <path
        d="M10 1h5v2h-3v2h2.5v2H12v2h3v2h-5V1z"
        fill="white"
        opacity="0.95"
      />
    </g>
  </svg>
);

export default HypeIcon;
