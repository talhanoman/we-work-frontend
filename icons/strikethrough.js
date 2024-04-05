import React from 'react';

export function StrikeThrough({ width, height, color }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4 11.333C4 13.174 5.49238 14.6663 7.33333 14.6663H10.6667C12.5076 14.6663 14 13.174 14 11.333C14 9.49206 12.5076 7.99967 10.6667 7.99967M14 4.66634C14 2.82539 12.5076 1.33301 10.6667 1.33301H7.33333C5.49238 1.33301 4 2.82539 4 4.66634M1.5 7.99967H16.5'
        stroke={color}
        stroke-width='1.66667'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}
