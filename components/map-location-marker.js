import * as React from "react";

function MapLocationMarker({ size = 40 }) {
  return (
    <svg
      width="41"
      height={size}
      viewBox="0 0 41 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
    >
      <g opacity="0.1">
        <rect x="0.5" width="40" height="40" rx="20" fill="#2F68D6" />
      </g>
      <g opacity="0.2">
        <rect x="8.5" y="8" width="24" height="24" rx="12" fill="#2F68D6" />
      </g>
      <rect x="16.5" y="16" width="8" height="8" rx="4" fill="#2F68D6" />
    </svg>
  );
}

export default React.memo(MapLocationMarker);
