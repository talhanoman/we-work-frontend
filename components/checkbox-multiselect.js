import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import styles from '../styles/checkbox.module.css';
import { FiChevronDown } from 'react-icons/fi';

export default function CheckboxMultiSelect({
  options,
  selectedOption,
  onSelect,
  className,
  panelWidth,
  label,
}) {
  return (
    <div className='w-full'>
      <Listbox multiple onChange={onSelect} value={selectedOption}>
        <div className='relative'>
          <Listbox.Button className='w-full h-11 bg-white flex justify-between items-center gap-2 cursor-default rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 focus:border-primary-300 outline-none shadow-xs text-gray-900 text-md-regular'>
            <div className='flex items-center gap-3'>
              <h3
                className={`text-xs-semibold 2xl:text-sm-semibold text-gray-700 ${className}`}
              >
                {label?.length > 0 ? label : 'Columns'}
              </h3>
              <span className={`w-[26px] h-5 flex items-center justify-center text-xs-medium text-gray-700 rounded-full bg-gray-100 py-[1px] px-[7px] ${selectedOption.length > 0 ? 'visible' : 'invisible'}`}>
                {selectedOption.length}
              </span>
            </div>
            <FiChevronDown className='w-4 2xl:w-5 h-auto text-gray-700' />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options
              className={`text-md-regular absolute right-0 max-h-60 custom-height-mq:h-48 z-10 overflow-auto mt-2 py-1 bg-white rounded-lg border border-gray-100 shadow-lg ring-1 ring-primary-600 ring-opacity-5 outline-none ${panelWidth} scrollbar-thumb-primary-600 scrollbar-track-primary-100 scrollbar-thin scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg`}
            >
              {options.map((option, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none px-4 py-2.5 text-md-regular text-gray-900 ${active ? 'bg-gray-50' : 'bg-white'
                    }`
                  }
                  value={option}
                >
                  {({ selected, active, checked }) => (
                    <>
                      <div className='w-full flex items-center gap-3'>
                        <input
                          name={`${option?.name}`}
                          type='checkbox'
                          value={option?.name}
                          checked={checked || selected}
                          onChange={() => { }}
                          className={`h-4 w-4 border border-gray-300 text-white rounded-[4px] checked:border-primary-600 checked:text-primary-100 focus:bg-primary-100 focus:ring-1 focus:ring-primary-600 outline-none ${styles['input-checkbox']}`}
                        />
                        <label
                          htmlFor={`${option?.name}`}
                          className={`text-sm-medium text-gray-700 break-all truncate`}
                        >
                          {option?.name}
                        </label>
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
