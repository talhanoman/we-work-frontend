import React from "react";

function ProgressBar({ progress, width }) {
  return (
    <div className={`w-full flex justify-between items-center gap-3 ${width}`}>
      {/* Progress bar */}
      <div className="h-2 flex-1 w-full bg-gray-100 rounded-full">
        {progress != 0 ? <div
          className={`h-full rounded-full bg-primary-600`}
          style={{
            width: `${progress}%`,
            transition: "width 0.3s",
          }}
        /> : <div className="w-2 h-full bg-primary-600 rounded-full" />}
      </div>
      <p className="text-xs-medium 2xl:text-sm-medium text-gray-700">{progress}%</p>
    </div>
  );
}

export default ProgressBar;
