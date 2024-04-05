import React, { useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default function DateCalender({dateRange, setDateRange, onClose, className}) {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div ref={modalRef} className={`flex items-center justify-center max-w-sm mx-auto mb-2 rounded-xl border border-gray-300 shadow absolute bottom-full left-1/2 -translate-x-1/2 z-50 ${className}`}>
        <DateRange
            editableDateInputs={true}
            ranges={dateRange}
            moveRangeOnFirstSelection={false}
            rangeColors={["#2F68D6"]}
            onChange={item => setDateRange([item.selection])}
          />
    </div>
  )
}
