import React from 'react';
import hypeOfficialIcon from './hype-official.jpg';

const HypeIcon = ({ width = 32, height = 32, ...props }) => (
  <img
    src={hypeOfficialIcon}
    alt="Hyperliquid (HYPE)"
    width={width}
    height={height}
    style={{
      borderRadius: '50%',
      objectFit: 'cover',
      display: 'block',
      ...props.style
    }}
    {...props}
  />
);

export default HypeIcon;
