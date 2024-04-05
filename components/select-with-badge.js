import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

export default function SelectWithBadge({ options, selectedOption, onSelect, className }) {

  return (
    <div className="w-40"> 
      <Listbox value={selectedOption} onChange={onSelect} className="bg-white w-full">
        <div className="relative">
          <Listbox.Button className="relative w-full h-11 flex items-center justify-between gap-2 cursor-default rounded-lg border border-gray-300 px-3.5 py-2.5 focus:ring-1 focus:ring-primary-600 outline-none shadow-xs text-gray-900 text-md-regular ">
            <div className="flex items-center gap-1">
              <span className={`block text-left truncate ${className}`}>{selectedOption?.value}</span>
              <span className={`w-[26px] h-5 flex items-center justify-center text-xs-medium text-center text-gray-700 bg-gray-100 py-[1px] px-[7px] rounded-2xl mix-blend-multiply`}>{selectedOption?.count}</span>
            </div>
            <span className="pointer-events-none flex items-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="#979798"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="text-md-regular absolute max-h-60 w-full z-10 overflow-auto mt-1 py-1 bg-white rounded-lg border border-gray-100 shadow-lg ring-1 ring-primary-600 ring-opacity-5 outline-none">
              {options?.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none px-3.5 py-2.5 text-gray-900 ${
                      active ? "bg-gray-50" : "bg-white"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${className}`}
                      >
                        {option?.value}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-primary-600">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.6668 5L7.50016 14.1667L3.3335 10"
                              stroke="#2F68D6"
                              stroke-width="1.66667"
                              stroke-linecap="round"
                              stroke-linejoin="round"
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
    </div>
  );
}
