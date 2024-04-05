import React from 'react';

export function ALetter({ color }) {
  return (
    <svg
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M0.75 13.25L6.1485 0.75H7.83447L13.25 13.25H11.4619L6.64237 1.75H7.32357L2.50409 13.25H0.75ZM3.04905 10.125L3.50886 8.69643H10.2187L10.7125 10.125H3.04905Z'
        fill={color}
      />
    </svg>
  );
}
