import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { FiMapPin, FiSearch } from 'react-icons/fi';

export default function CheckboxMultiSelectCombobox({
  options,
  selectedOption,
  onSelect,
  className,
  filterTitle,
  panelWidth,
  icon,
  disabled,
  filterTitleClass,
}) {
  const [query, setQuery] = useState('');
  const [view, setView] = useState(false);

  options = Array.from(
    new Set(options?.map((obj) => obj?.name?.toLowerCase())),
    (name) =>
      options.find((obj) => obj?.name?.toLowerCase() === name?.toLowerCase())
  );

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          option?.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  const optionLength = view ? filteredOptions?.length : 3;

  const handleInputChange = (event, selected) => {
    const { name, checked } = event.target;

    const updatedOptionsList = filteredOptions?.map((opt) =>
      opt?.name?.toLowerCase() == name?.toLowerCase()
        ? { ...opt, isChecked: checked }
        : opt
    );
    console.log(updatedOptionsList, 'updated list');
  };

  console.log(selectedOption);

  return (
    <Combobox
      multiple
      value={selectedOption}
      onChange={onSelect}
      disabled={disabled || !options?.length}
      className='bg-white disabled:pointer-events-none disabled:opacity-50'
    >
      <div className='relative'>
        <Combobox.Button
          className='relative w-full h-11 bg-white flex justify-between items-center gap-2 cursor-default rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 focus:border-primary-300 outline-none shadow-xs text-gray-900 text-sm-regular 2xl:text-md-regular disabled:pointer-events-none disabled:opacity-50'
          disabled={disabled}
        >
          <div className='w-full flex items-center gap-2'>
            {icon !== null &&
              icon !== undefined &&
              (icon || (
                <FiMapPin className='w-4 2xl:w-5 h-auto text-gray-900' />
              ))}
            <h3
              className={`text-gray-700 text-xs-semibold 2xl:text-sm-semibold ${filterTitleClass}`}
            >
              {filterTitle}
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
        </Combobox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options
            className={`text-md-regular absolute right-0 max-h-60 custom-height-mq:h-48 z-10 overflow-auto mt-1 py-1 bg-white rounded-lg border border-gray-100 shadow-lg ring-1 ring-primary-600 ring-opacity-5 outline-none ${panelWidth}`}
          >
            <div className='relative w-full flex items-center gap-2 px-4 py-2.5 border-b border-gray-100'>
              <FiSearch className='w-4 h-4 text-gray-200' />
              <Combobox.Input
                placeholder={`Search ${filterTitle.toLowerCase()}`}
                className={`w-full flex items-center text-left text-sm-medium text-gray-900 focus:border-none focus:ring-0 truncate outline-none border-none placeholder:text-sm-medium p-0 placeholder:text-gray-200 ${className}`}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            {selectedOption?.length >= 1 &&
              selectedOption[0]?.name !== undefined && (
                <div className='flex gap-2 flex-wrap px-4 py-2'>
                  {selectedOption?.map((tag, badgeIndex) => (
                    <div
                      key={`badge${badgeIndex + 1}`}
                      className={`text-xs-medium text-gray-900 h-7 text-center inline-flex flex-wrap items-center justify-center gap-1 bg-gray-100 px-3 py-1 rounded-2xl whitespace-nowrap`}
                    >
                      <span>
                        {tag?.name?.replace(' ', '')?.substring(0, 6)}
                        {tag?.name?.length > 6 && '...'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            {filteredOptions?.length === 0 && query !== '' ? (
              <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                Nothing found.
              </div>
            ) : (
              filteredOptions?.slice(0, optionLength).map((option) => (
                <Combobox.Option
                  key={option?.name}
                  className={({ active }) =>
                    `relative cursor-default select-none px-3.5 py-2.5 text-md-regular text-gray-900 ${
                      active ? 'bg-gray-50' : 'bg-white'
                    }`
                  }
                  value={option}
                >
                  {({ selected, active, checked }) => (
                    <>
                      <div className='flex justify-between items-center gap-2'>
                        <div className='w-full flex items-center gap-3'>
                          <input
                            name={`${option?.name}`}
                            type='checkbox'
                            checked={selectedOption?.some(
                              (opt) =>
                                opt?.name?.toLowerCase() ==
                                option?.name?.toLowerCase()
                            )}
                            onChange={() => {}}
                            className='h-4 w-4 border border-gray-300 text-primary-600 rounded-[4px] checked:border-primary-600 focus:ring-1 focus:ring-primary-600 outline-none cursor-default'
                          />
                          <label
                            htmlFor={`${option?.name}`}
                            className={`text-sm-medium text-gray-700 capitalize break-all ${className}`}
                          >
                            {option?.name}
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
            {!view && options.length > 3 && (
              <button
                className='w-full text-sm-medium text-gray-700 text-left px-4 py-2.5'
                onClick={(e) => {
                  e.preventDefault();
                  setView(true);
                }}
              >
                View all...
              </button>
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
