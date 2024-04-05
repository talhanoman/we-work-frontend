import React from 'react';

export function Italic({ width, height, color }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4 0V3H6.21L2.79 11H0V14H8V11H5.79L9.21 3H12V0H4Z'
        fill={color}
      />
    </svg>
  );
}
