import { Fragment, useMemo } from 'react';
import { Listbox, Transition } from '@headlessui/react';

const ethnicities = [
  { ethnicity: 'White' },
  { ethnicity: 'Black or African American' },
  { ethnicity: 'Asian' },
  { ethnicity: 'Hispanic or Latino/Latina' },
  { ethnicity: 'Native American or Alaska Native' },
  { ethnicity: 'Native Hawaiian or Other Pacific' },
  { ethnicity: 'Islander' },
  { ethnicity: 'Middle Eastern or North African' },
  { ethnicity: 'Mixed or Multiracial' },
  { ethnicity: 'Prefer not to disclose' },
  { ethnicity: 'Other' },
];

const native_languages = [
  { language: 'English' },
  { language: 'Punjabi' },
  { language: 'Urdu' },
  { language: 'Persian' },
  { language: 'Arabic' },
];

export default function Select({
  options,
  selectedOption,
  onSelect,
  className,
  placeholder,
  panelPosition,
  disabled,
}) {
  const sortedOptions = useMemo(
    () =>
      options?.sort((a, b) =>
        String(a.label)?.toLowerCase() > String(b.label)?.toLowerCase() ? 1 : -1
      ),
    [options]
  );

  return (
    <Listbox
      value={selectedOption}
      onChange={onSelect}
      disabled={disabled || !options?.length}
      className='bg-white w-full disabled:opacity-50'
    >
      <div className='relative'>
        <Listbox.Button
          disabled={disabled}
          className='relative w-full h-11 flex justify-between items-center gap-2 cursor-default rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs text-sm-regular 2xl:text-md-regular disabled:pointer-events-none disabled:opacity-50'
        >
          <span
            className={`block text-left truncate ${
              selectedOption?.label?.length > 1
                ? 'text-gray-900'
                : 'text-gray-500'
            } ${className}`}
          >
            {selectedOption?.label ?? placeholder}
          </span>
          <span className='pointer-events-none flex items-center'>
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M5 7.5L10 12.5L15 7.5'
                stroke='#979798'
                stroke-width='1.66667'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options
            className={`text-sm-regular 2xl:text-md-regular text-gray-900 absolute max-h-60 w-full z-10 overflow-auto mt-1 py-1 bg-white rounded-lg border border-gray-100 shadow-lg ring-1 ring-primary-600 ring-opacity-5 outline-none ${panelPosition}`}
          >
            {sortedOptions?.map((option, optionIdx) => (
              <Listbox.Option
                key={optionIdx}
                className={({ active }) =>
                  `relative cursor-default select-none px-3.5 py-2.5 text-gray-900 ${
                    active ? 'bg-gray-50' : 'bg-white'
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${className}`}>
                      {option?.label}
                    </span>
                    {selected ? (
                      <span className='absolute inset-y-0 right-0 flex items-center pr-3 text-primary-600'>
                        <svg
                          width='20'
                          height='20'
                          viewBox='0 0 20 20'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M16.6668 5L7.50016 14.1667L3.3335 10'
                            stroke='#2F68D6'
                            stroke-width='1.66667'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                          />
                        </svg>
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
