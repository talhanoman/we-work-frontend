import { Fragment, useReducer, useRef, useState } from 'react';
import { Combobox, Transition, Disclosure, Menu } from '@headlessui/react';
import {
  FiCalendar,
  FiChevronDown,
  FiChevronRight,
  FiSearch,
} from 'react-icons/fi';
import DateCalender from './date-calender';
import CheckboxLocationMultiSelectCombobox from './checkbox-location-multiselect-combobox';
import CheckboxMultiSelectCombobox from './checkbox-multiselect-combobox';
import DateInput from './talent/Forms/date-input';
import DateInputRange from './date-input-range';
import { format } from 'date-fns';
import CheckboxMultiSelectComboboxMenu from './checkbox-multiselect-combobox-menu';

const initial_date_range = {
  startDate: new Date(),
  endDate: null,
};

export default function CheckboxAllFilterMultiSelectCombobox({
  options,
  selectedOption,
  // onSelect,
  className,
  panelWidth,
  allFiltersOptions,
  setAllFiltersOptions,
}) {
  const options_title = options?.map((opt) => opt?.title.toLowerCase());
  const initial_selected_filter_options = Object.assign(
    {},
    ...options_title.map((key) => key !== 'date' && { [key]: [] })
  );

  const [dateRange, setDateRange] = useState(initial_date_range);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedFilterOptions, setSelectedFilterOptions] = useState(
    initial_selected_filter_options
  );
  const calenderRef = useRef(null);

  const handleMultiCheckboxSelect = (name, option) => {
    setSelectedFilterOptions((prevValues) => ({
      ...prevValues,
      [name]: option,
    }));

    console.log(option, 'opt');

    setAllFiltersOptions({
      ...allFiltersOptions,
      [name]: option,
    });
  };

  const handleDateChange = (dates) => {
    if (dates != null) {
      const [start, end] = dates;
      setDateRange({
        startDate: start,
        endDate: end,
      });

      setAllFiltersOptions({
        ...allFiltersOptions,
        date: `${start} - ${end}`,
      });
    } else {
      setDateRange(initial_date_range);

      setAllFiltersOptions(allFiltersOptions);
    }
  };

  console.log(allFiltersOptions, 'filtersData');
  console.log(selectedFilterOptions, 'selc filt opt');
  console.log(initial_selected_filter_options, 'init sel opt');

  console.log(dateRange, 'date range');
  console.log(calendarOpen, 'clender open');
  return (
    <Menu as='div' className='relative bg-white w-full'>
      {({ open, close }) => (
        <div className='relative'>
          <Menu.Button className='w-full h-11 text-xs-semibold text-gray-700 text-center inline-flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg border border-gray-300 shadow-xs cursor-default focus:ring-1 focus:ring-primary-600 outline-none'>
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='w-4 2xl:w-5 h-auto'
            >
              <path
                d='M5 10H15M2.5 5H17.5M7.5 15H12.5'
                stroke='#5D5B5C'
                stroke-width='1.67'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
            <h3 className={`text-gray-700 ${className}`}>Filters</h3>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            {
              <Menu.Items
                className={`text-md-regular absolute right-0 max-h-60 custom-height-mq:h-48 z-10 overflow-y-auto mt-4 bg-white rounded-lg border border-gray-100 shadow-lg ring-1 ring-primary-600 ring-opacity-5 outline-none ${panelWidth}`}
                static
              >
                {options?.map((filter) => (
                  <Disclosure as='div'>
                    {({ open, close }) => (
                      <>
                        <Disclosure.Button
                          className={`w-full flex items-center gap-3 px-4 py-2.5 ${
                            open ? 'bg-gray-50' : 'bg-white'
                          }`}
                        >
                          <span className='flex items-center'>
                            {open ? (
                              <FiChevronDown
                                className='h-4 w-4 text-gray-700'
                                aria-hidden='true'
                              />
                            ) : (
                              <FiChevronRight
                                className='h-4 w-4 text-gray-700'
                                aria-hidden='true'
                              />
                            )}
                          </span>
                          <span className='block text-xs-medium 2xl:text-sm-medium text-gray-700'>
                            {filter?.title}
                          </span>
                          {selectedFilterOptions[filter?.title.toLowerCase()]
                            ?.length > 0 && (
                            <span className='text-xs-medium text-success-700 flex items-center justify-center rounded-full bg-success-50 py-[1px] px-[7px]'>
                              {
                                selectedFilterOptions[
                                  filter?.title.toLowerCase()
                                ]?.length
                              }
                            </span>
                          )}
                        </Disclosure.Button>
                        <Disclosure.Panel>
                          {filter?.title.toLowerCase() !== 'date' ? (
                            <CheckboxMultiSelectComboboxMenu
                              className={'text-sm-normal'}
                              filterTitle={filter?.title}
                              options={filter?.filterOptions}
                              selectedOption={
                                selectedFilterOptions[
                                  filter?.title.toLowerCase()
                                ]
                              }
                              onSelect={(value) =>
                                handleMultiCheckboxSelect(
                                  `${filter?.title.toLowerCase()}`,
                                  value
                                )
                              }
                            />
                          ) : (
                            <div className='relative'>
                              <button
                                className={`w-full h-11 overflow-visible block text-gray-900 text-xs-regular 2xl:text-sm-regular text-left rounded-lg border border-gray-300 pl-[40px] pr-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs cursor-pointer placeholder:text-gray-500 disabled:pointer-events-none disabled:opacity-75`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCalendarOpen(!calendarOpen);
                                }}
                              >
                                {/* <DateInputRange
                              width={"w-full"}
                              id={"filter_date"}
                              title={"Filter Range Date"}
                              startDate={dateRange.startDate}
                              endDate={dateRange.endDate}
                              selectedDate={dateRange.startDate}
                              onSelect={handleDateChange}
                              srOnly={"sr-only"}
                              className={"text-xs-regular"}
                            /> */}
                                {`${format(
                                  dateRange?.startDate,
                                  'dd MMM, yyyy'
                                )} - ${
                                  dateRange?.endDate
                                    ? format(dateRange?.endDate, 'dd MMM, yyyy')
                                    : ''
                                }`}
                              </button>

                              <FiCalendar className='w-4 2xl:w-5 h-auto text-gray-500 absolute top-3.5 2xl:top-3 left-3.5' />
                            </div>
                          )}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </Menu.Items>
            }
          </Transition>
          {calendarOpen && (
            <div className='absolute top-16 right-60 z-50'>
              <DateInputRange
                id={'filter_date'}
                title={'Filter Range Date'}
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
                selectedDate={dateRange.startDate}
                onSelect={handleDateChange}
                srOnly={'sr-only'}
                width={'w-full'}
                setCalendarOpen={(value) => setCalendarOpen(value)}
              />
            </div>
          )}
        </div>
      )}
    </Menu>
  );
}
