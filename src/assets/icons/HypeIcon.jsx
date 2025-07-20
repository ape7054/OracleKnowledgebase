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
    <circle cx="16" cy="16" r="16" fill="#FF6B35"/>
    <path 
      d="M8 12h6v8h-2v-6h-2v6h-2V12zm8 0h6v2h-4v2h3v2h-3v2h4v2h-6V12z" 
      fill="white"
    />
  </svg>
);

export default HypeIcon;
