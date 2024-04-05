import React from "react";

function Dots({ progressDots }) {
  return (
    <div className="flex gap-x-4 justify-center mt-8">
      {[...Array(5)].map((_, index) => (
        <div
          key={`dot${index + 1}`}
          className={`${
            index < progressDots ? "bg-gray-900" : "bg-gray-300"
          } rounded-full w-[10px] h-[10px]`}
        />
      ))}
    </div>
  );
}

export default Dots;
