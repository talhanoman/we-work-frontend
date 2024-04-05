import Image from "next/image";
import React from "react";

function Logo({src, alt, className}) {
  return (
    <div className={`w-full flex justify-center h-auto ${className}`}>
      <Image
        src={`/images/${src}.svg`}
        alt={alt}
        className="object-contain"
        layout="fill"
      />
    </div>
  );
}

export default Logo;
