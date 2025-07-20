import React from 'react';
import hypeOfficialIcon from './hype-official.jpg';

const HypeIcon = ({ width = 32, height = 32, style, ...props }) => (
  <div
    style={{
      width: width,
      height: height,
      borderRadius: '50%',
      overflow: 'hidden',
      display: 'inline-block',
      flexShrink: 0,
      ...style
    }}
    {...props}
  >
    <img
      src={hypeOfficialIcon}
      alt="Hyperliquid (HYPE)"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block'
      }}
    />
  </div>
);

export default HypeIcon;
