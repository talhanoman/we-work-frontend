import React, { useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { FiCalendar } from 'react-icons/fi';
import { capitalizeFirstLetter } from '@/utils/utils';

export default function DateInput({
  width,
  srOnly,
  id,
  title,
  selectedDate,
  onSelect,
  disable,
  minDate,
  maxDate,
}) {
  const calRef = useRef();

  return (
    <div className={`${width}`}>
      <label
        className={`block text-gray-700 text-xs-medium 2xl:text-sm-medium mb-1.5 ${srOnly}`}
        htmlFor={id}
      >
        {capitalizeFirstLetter(title)}
        <span className='text-primary-600'>*</span>
      </label>
      <div className='relative'>
        <DatePicker
          id={id}
          ref={calRef}
          selected={selectedDate}
          onChange={(value) => onSelect(id, value)}
          minDate={minDate}
          maxDate={maxDate}
          name={id}
          dateFormat='dd MMM, yyyy'
          showMonthDropdown
          showYearDropdown
          dropdownMode='select'
          isClearable
          popperPlacement='top'
          placeholderText={capitalizeFirstLetter(title) ?? 'Select date'}
          shouldCloseOnSelect={false}
          className={`w-full h-11 block text-gray-900 text-sm-regular 2xl:text-md-regular rounded-lg border border-gray-300 pl-[40px] pr-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs placeholder:text-gray-500 disabled:pointer-events-none disabled:opacity-75`}
          disabled={disable}
          useShortMonthInDropdown
        >
          <div className='h-[1px] w-full bg-gray-200 mt-2.5' />

          <div className='flex justify-between gap-3'>
            <button
              className='w-full h-11 flex justify-center items-center flex-1 text-sm-semibold 2xl:text-md-semibold border border-gray-300 bg-white rounded-lg text-gray-700 py-2.5 shadow-xs'
              onClick={(e) => {
                e.preventDefault();
                onSelect(id, null);
                calRef.current.setOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              className='w-full h-11 py-2.5 flex justify-center items-center flex-1 text-sm-semibold 2xl:text-md-semibold border border-primary-600 bg-primary-600 text-white rounded-lg disabled:pointer-events-none disabled:opacity-75 shadow-xs'
              onClick={(e) => {
                e.preventDefault();
                calRef.current.setOpen(false);
              }}
            >
              Confirm
            </button>
          </div>
        </DatePicker>
        <FiCalendar className='w-4 2xl:w-5 h-auto text-gray-500 absolute top-3.5 2xl:top-3 left-3.5' />
      </div>
    </div>
  );
}
