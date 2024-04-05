import React from 'react';

export function Underline({ width, height, color }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12.6667 1.33301V7.16634C12.6667 9.92776 10.4281 12.1663 7.66667 12.1663C4.90524 12.1663 2.66667 9.92776 2.66667 7.16634V1.33301M1 15.4997H14.3333'
        stroke={color}
        stroke-width='1.66667'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}
