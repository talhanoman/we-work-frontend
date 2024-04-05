import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FiUser } from 'react-icons/fi';

export default function SelectWithIcon({
  options,
  selectedOption,
  onSelect,
  className,
  placeholder,
}) {
  return (
    <div className='w-full'>
      <Listbox
        value={selectedOption}
        onChange={onSelect}
        className='bg-white w-full'
      >
        <div className='relative'>
          <Listbox.Button className='relative w-full h-11 flex justify-between items-center cursor-default rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs text-gray-900 text-base'>
            <div className='flex items-center gap-2'>
              {selectedOption?.icon ? (
                selectedOption?.icon
              ) : (
                <FiUser className='w-5 h-5 text-gray-500' />
              )}
              <h3
                className={`text-left text-md-regular text-gray-900 truncate ${className}`}
              >
                {selectedOption?.name ??
                  (placeholder ? placeholder : 'Select team member')}
              </h3>
            </div>
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
            <Listbox.Options className='text-md-regular absolute max-h-60 w-full z-10 overflow-auto mt-1 py-1 bg-white rounded-lg border border-gray-100 shadow-lg ring-1 ring-primary-600 ring-opacity-5 outline-none'>
              {options?.map((option, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none px-3.5 py-2.5 text-gray-900 ${
                      active ? 'bg-gray-50' : 'bg-white'
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <div className='flex justify-between items-center gap-2'>
                        <div className='w-full flex items-center gap-2'>
                          {option.icon}
                          <h3
                            className={`text-md-regular text-gray-900 break-all ${className}`}
                          >
                            {option?.name}
                          </h3>
                        </div>
                        {selected ? (
                          <span className='flex items-center text-primary-600'>
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
                      </div>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
